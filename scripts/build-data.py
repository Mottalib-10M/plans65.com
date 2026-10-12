#!/usr/bin/env python3
"""Rebuilds the plan data of the site from the CMS public files (RECETTE §4, §22).

Inputs (in .cache-raw/, not in the repository; download links in CONTRIBUTING-PAGES.md):
  cy2027.csv  CMS "CY2027 Landscape (202609.1)", data last updated 09/22/2026, revised 09/30/2026
  cy2026.csv  CMS "CY2026 Landscape (202609)", the 2026 plans, used only for the 2026 to 2027 comparison
  stars27/2027 Star Ratings Data Table - Summary Ratings (Oct 8 2026).csv   star ratings by contract

Outputs:
  src/data/plans/<st>.json   one file per state or territory: every plan, every county, the PDPs
  public/data/plans/<st>.json  the same file, served to the county finder in the browser
  src/data/summary.json      national, state and county aggregates used by the pages

Works of the US federal government: public domain (17 U.S.C. §105).
Run: python3 scripts/build-data.py
"""
import csv, json, os, re, statistics, collections

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RAW = os.path.join(ROOT, '.cache-raw')
OUT_SRC = os.path.join(ROOT, 'src', 'data', 'plans')
OUT_PUB = os.path.join(ROOT, 'public', 'data', 'plans')
os.makedirs(OUT_SRC, exist_ok=True); os.makedirs(OUT_PUB, exist_ok=True)


def money(s):
    s = (s or '').strip()
    if not s or s.startswith('Not') or s == '-':
        return None
    neg = s.startswith('(')
    v = float(re.sub(r'[^0-9.]', '', s) or 0)
    return -v if neg else v


def slug(s):
    s = s.lower().replace('&', 'and').replace("'", '').replace('.', '')
    return re.sub(r'[^a-z0-9]+', '-', s).strip('-')


def col(row, *names):
    for n in names:
        if n in row:
            return row[n]
    raise KeyError(names)


# ── star ratings 2027 by contract ──────────────────────────────────────────────
STARS = {}
sf = os.path.join(RAW, 'stars27', '2027 Star Ratings Data Table - Summary Ratings (Oct 8 2026).csv')
lines = open(sf, encoding='latin-1').read().splitlines()[1:]
for r in csv.DictReader(lines):
    cid = r['Contract Number'].strip()
    def sv(v):
        v = (v or '').strip()
        try:
            return float(v)
        except ValueError:
            if v.startswith('Plan too new'): return 'new'
            if v.startswith('Not enough'): return 'nd'
            return None
    STARS[cid] = {'c': sv(r['2027 Part C Summary']), 'd': sv(r['2027 Part D Summary']), 'o': sv(r['2027 Overall'])}

SNP = {'Dual-Eligible': 'D', 'Chronic or Disabling Condition': 'C', 'Institutional': 'I'}


def base_type(pt):
    for t in ('Regional PPO', 'HMO-POS', 'HMO', 'PPO', 'PFFS', 'MSA', 'Cost'):
        if pt.startswith(t):
            return t
    return pt


def read(path):
    """-> states{st: {name, territory, counties{name: set(ids)}, plans{id: rec}, pdp{id: rec}}}"""
    states = {}
    for row in csv.DictReader(open(path, encoding='utf-8-sig')):
        st = row['State Territory Abbreviation']
        S = states.setdefault(st, {'name': row['State Territory Name'], 'terr': row['US Territory'] == 'Yes', 'counties': collections.defaultdict(set), 'plans': {}, 'pdp': {}})
        pid = col(row, 'Contract Plan Segment ID', 'ContractPlanSegmentID').replace('_', '-')
        cid = row['Contract ID']
        cat = row['Contract Category Type']
        hasd = row['Part D Coverage Indicator'] == 'Yes'
        rec = {
            'k': pid, 'n': row['Plan Name'].strip(), 'o': row['Organization Marketing Name'].strip(), 'p': row['Parent Organization Name'].strip(),
            'dd': money(row['Annual Part D Deductible Amount']) if hasd else None,
            'd': money(row['Part D Total Premium']) if hasd else None,
            'lis': money(row['Part D Low Income Beneficiary Premium Amount']) if hasd else None,
        }
        if cat == 'PDP':
            s = STARS.get(cid, {})
            rec.update({'b': row['Drug Benefit Type'].strip(), 'cat': row['Drug Benefit Category'].strip(), 'star': s.get('d'), 'nat': row['National PDP'] == 'Yes', 'bench': row['Low Income Subsidy (LIS) Auto Enrollment'] == 'Yes'})
            S['pdp'][pid] = rec
            continue
        s = STARS.get(cid, {})
        rec.update({
            't': base_type(row['Plan Type']), 'snp': SNP.get(row['SNP Type'], ''),
            'c': money(row['Part C Premium']),
            'm': money(row['Monthly Consolidated Premium (Part C + D)']),
            'moop': money(row['In-Network Maximum Out-of-Pocket (MOOP) Amount']),
            'hd': hasd,
            'star': s.get('o') if hasd else s.get('c'),
            'sanc': row['Sanctioned Plan'] == 'Yes',
        })
        if rec['m'] is None and rec['c'] is not None:
            rec['m'] = rec['c'] + (rec['d'] or 0)
        S['plans'][pid] = rec
        S['counties'][row['County Name'].strip()].add(pid)
    return states


Y27 = read(os.path.join(RAW, 'cy2027.csv'))
Y26 = read(os.path.join(RAW, 'cy2026.csv'))

summary = {'source': {
    'file2027': 'CY2027 Landscape (202609.1)', 'updated2027': '2026-09-22', 'revised2027': '2026-09-30',
    'file2026': 'CY2026 Landscape (202609)', 'stars': '2027 Star Ratings Data Tables (Oct 8 2026)'},
    'states': {}, 'national': {}}


def is_std(p):
    """A plan anyone with Parts A and B can join: not a special needs plan, not sanctioned."""
    return not p['snp'] and not p.get('sanc')


def county_stats(ids, plans):
    ps = [plans[i] for i in ids]
    std = [p for p in ps if is_std(p)]
    mapd = [p for p in std if p['hd'] and p['t'] not in ('Cost', 'MSA')]
    moops = sorted(p['moop'] for p in std if p['moop'] is not None)
    stars = [p['star'] for p in std if isinstance(p['star'], float)]
    zero = [p for p in mapd if (p['m'] or 0) == 0]
    orgs = collections.Counter(p['p'] for p in std)
    types = collections.Counter(p['t'] for p in std)
    return {
        'all': len(ps), 'std': len(std), 'mapd': len(mapd), 'zero': len(zero),
        'snp': len(ps) - len(std), 'dsnp': sum(1 for p in ps if p['snp'] == 'D'), 'csnp': sum(1 for p in ps if p['snp'] == 'C'), 'isnp': sum(1 for p in ps if p['snp'] == 'I'),
        'moopMin': moops[0] if moops else None, 'moopMed': statistics.median(moops) if moops else None, 'moopMax': moops[-1] if moops else None,
        'starMax': max(stars) if stars else None, 'star4': sum(1 for s in stars if s >= 4),
        'premMax': max((p['m'] or 0) for p in mapd) if mapd else None,
        'orgs': len(orgs), 'topOrg': orgs.most_common(1)[0][0] if orgs else None, 'topOrgN': orgs.most_common(1)[0][1] if orgs else 0,
        'orgList': [[o, n] for o, n in orgs.most_common(6)],
        'lowMoop': (lambda q: {'n': q['n'], 'o': q['o'], 'moop': q['moop'], 'm': q['m']} if q else None)(min((p for p in std if p['moop'] is not None), key=lambda p: (p['moop'], p['m'] or 0), default=None)),
        'cheapHigh': (lambda q: {'n': q['n'], 'o': q['o'], 'star': q['star'], 'm': q['m'], 'moop': q['moop']} if q else None)(min((p for p in mapd if isinstance(p['star'], float) and p['star'] >= 4), key=lambda p: (p['m'] or 0, p['moop'] or 9e9), default=None)),
        'best': (lambda q: {'n': q['n'], 'o': q['o'], 'star': q['star'], 'm': q['m'], 'moop': q['moop']} if q else None)(max((p for p in std if isinstance(p['star'], float)), key=lambda p: (p['star'], -(p['m'] or 0)), default=None)),
        'hmo': types.get('HMO', 0) + types.get('HMO-POS', 0), 'ppo': types.get('PPO', 0) + types.get('Regional PPO', 0), 'pffs': types.get('PFFS', 0),
    }


nat_ids = set(); nat_counties = 0
for st, S in sorted(Y27.items()):
    P = S['plans']
    ids = sorted(P)
    index = {k: i for i, k in enumerate(ids)}
    prev = Y26.get(st, {'counties': {}, 'plans': {}, 'pdp': {}})
    counties = []
    cstats = {}
    for cname in sorted(S['counties']):
        cid = slug(cname)
        cur = S['counties'][cname]
        old = prev['counties'].get(cname, set())
        gone = sorted(k for k in old if k not in cur and is_std(prev['plans'][k]))
        new = sorted(k for k in cur if k not in old and is_std(P[k]))
        stt = county_stats(cur, P)
        stt['std26'] = sum(1 for k in old if is_std(prev['plans'][k]))
        stt['zero26'] = sum(1 for k in old if is_std(prev['plans'][k]) and prev['plans'][k]['hd'] and prev['plans'][k]['t'] not in ('Cost', 'MSA') and (prev['plans'][k]['m'] or 0) == 0)
        stt['gone'] = len(gone); stt['new'] = len(new)
        cstats[cid] = {'name': cname, **stt}
        counties.append({'n': cname, 's': cid, 'p': sorted(index[k] for k in cur),
                         'x': [{'k': k, 'n': prev['plans'][k]['n'], 'o': prev['plans'][k]['o'], 'same': k[:5] in {i[:5] for i in cur}} for k in gone]})
    plans = []
    for k in ids:
        p = dict(P[k]); p.pop('sanc', None) if not P[k].get('sanc') else None
        p26 = prev['plans'].get(k)
        if p26 and is_std(p26):
            p['m26'] = p26['m']; p['moop26'] = p26['moop']
        plans.append(p)
    pdp = sorted(S['pdp'].values(), key=lambda r: (r['d'] if r['d'] is not None else 9e9, r['n']))
    for r in pdp:
        o = prev['pdp'].get(r['k'])
        if o: r['d26'] = o['d']; r['dd26'] = o['dd']
    pdp26 = len(prev['pdp'])
    data = {'st': st, 'name': S['name'], 'terr': S['terr'], 'plans': plans, 'counties': counties, 'pdp': pdp}
    js = json.dumps(data, separators=(',', ':'), ensure_ascii=False)
    for d in (OUT_SRC, OUT_PUB):
        open(os.path.join(d, f'{st.lower()}.json'), 'w').write(js)
    allc = set().union(*S['counties'].values()) if S['counties'] else set()
    sst = county_stats(allc, P)
    pdpd = [r['d'] for r in pdp if r['d'] is not None]
    summary['states'][st] = {
        'name': S['name'], 'slug': slug(S['name']), 'terr': S['terr'], 'counties': len(S['counties']),
        **sst,
        'std26': sum(1 for k, p in prev['plans'].items() if is_std(p)),
        'pdp': len(pdp), 'pdp26': pdp26, 'pdpMin': min(pdpd) if pdpd else None, 'pdpMax': max(pdpd) if pdpd else None,
        'pdpMinName': pdp[0]['n'] if pdp else None,
        'pdpMed': statistics.median(pdpd) if pdpd else None,
        'pdpBench': sum(1 for r in pdp if r['bench']),
        'pdpZeroDed': sum(1 for r in pdp if (r['dd'] or 0) == 0),
        'countyStats': cstats,
        'bytes': len(js),
    }
    nat_ids |= {k for k in P}
    nat_counties += len(S['counties'])

allp = {k: p for S in Y27.values() for k, p in S['plans'].items()}
std = [p for p in allp.values() if is_std(p)]
pdp_all = {k: r for S in Y27.values() for k, r in S['pdp'].items()}
moops = [p['moop'] for p in std if p['moop'] is not None]
summary['national'] = {
    'segments': len(allp), 'std': len(std), 'snp': len(allp) - len(std), 'counties': nat_counties,
    'pdp': len(pdp_all), 'moopMax': max(moops), 'moopMin': min(moops), 'moopMed': statistics.median(moops),
    'moopAtMax': sum(1 for m in moops if m == max(moops)),
    'zeroMapd': sum(1 for p in std if p['hd'] and p['t'] not in ('Cost', 'MSA') and (p['m'] or 0) == 0),
    'mapd': sum(1 for p in std if p['hd'] and p['t'] not in ('Cost', 'MSA')),
    'segments26': len({k for S in Y26.values() for k in S['plans']}),
    'std26': len({k for S in Y26.values() for k, p in S['plans'].items() if is_std(p)}),
    'pdp26': len({k for S in Y26.values() for k in S['pdp']}),
    'types': collections.Counter(p['t'] for p in std).most_common(),
    'dsnp': sum(1 for p in allp.values() if p['snp'] == 'D'), 'csnp': sum(1 for p in allp.values() if p['snp'] == 'C'), 'isnp': sum(1 for p in allp.values() if p['snp'] == 'I'),
    'pdpDed': collections.Counter(r['dd'] for r in pdp_all.values()).most_common(),
    'starDist': collections.Counter(str(p['star']) for p in std).most_common(),
}
json.dump(summary, open(os.path.join(ROOT, 'src', 'data', 'summary.json'), 'w'), separators=(',', ':'), ensure_ascii=False)
print('states', len(Y27), 'segments', len(allp), 'std', len(std), 'pdp', len(pdp_all), 'counties', nat_counties)
print('largest file', max((v['bytes'], k) for k, v in summary['states'].items()))
