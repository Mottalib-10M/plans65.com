#!/usr/bin/env python3
"""Fact sheets for writers (research/facts/): what K.state() and K.county() return, in readable form.
Never copy a number from these files into a page: write the K.* expression. Run after build-data.py."""
import json, os
R = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
S = json.load(open(f'{R}/src/data/summary.json'))
os.makedirs(f'{R}/research/facts', exist_ok=True)
for st, v in S['states'].items():
    cs = sorted(v['countyStats'].items(), key=lambda kv: -kv[1]['std'])
    pf = json.load(open(f'{R}/src/data/plans/{st.lower()}.json'))
    out = {k: x for k, x in v.items() if k != 'countyStats'}
    out['st'] = st
    out['countiesMostPlans'] = [{'slug': k, **{f: c[f] for f in ('name', 'std', 'zero', 'moopMin', 'moopMed', 'star4', 'snp', 'std26', 'gone', 'new')}} for k, c in cs[:8]]
    out['countiesFewestPlans'] = [{'slug': k, **{f: c[f] for f in ('name', 'std', 'zero', 'moopMin', 'snp')}} for k, c in cs[-6:]]
    out['countiesNoOpenPlan'] = [c['name'] for k, c in cs if c['std'] == 0]
    out['pdpList'] = [{'n': p['n'], 'o': p['o'], 'd': p['d'], 'dd': p['dd'], 'd26': p.get('d26'), 'star': p['star']} for p in pf['pdp']]
    out['planTypes'] = {'hmo': v['hmo'], 'ppo': v['ppo'], 'pffs': v['pffs']}
    out['costPlans'] = sum(1 for p in pf['plans'] if p['t'] == 'Cost')
    json.dump(out, open(f'{R}/research/facts/{v["slug"]}.json', 'w'), indent=1, ensure_ascii=False)
# large counties of src/lib/planned.ts: the open plans one by one, and the 2026 IDs not renewed
import re
plan = open(f'{R}/src/lib/planned.ts').read()
block = re.search(r'PLANNED_COUNTIES[^{]*\{(.*?)\};', plan, re.S).group(1)
slug2st = {v['slug']: k for k, v in S['states'].items()}
os.makedirs(f'{R}/research/facts/counties', exist_ok=True)
for st_slug, cs in re.findall(r"'?([a-z-]+)'?: \[([^\]]*)\]", block):
    st = slug2st[st_slug]; f = json.load(open(f'{R}/src/data/plans/{st.lower()}.json'))
    for c in re.findall(r"'([a-z-]+)'", cs):
        row = next(x for x in f['counties'] if x['s'] == c)
        std = [f['plans'][i] for i in row['p'] if not f['plans'][i]['snp'] and not f['plans'][i].get('sanc')]
        out = {'state': st_slug, 'county': c, **S['states'][st]['countyStats'][c],
               'openPlans': sorted([{k: p.get(k) for k in ('n', 'o', 't', 'm', 'dd', 'moop', 'star', 'm26')} for p in std], key=lambda p: (p['m'] or 0, p['moop'] or 9e9)),
               'exits': row['x']}
        json.dump(out, open(f'{R}/research/facts/counties/{st_slug}--{c}.json', 'w'), indent=1, ensure_ascii=False)
print('facts written:', len(S['states']), 'states')
