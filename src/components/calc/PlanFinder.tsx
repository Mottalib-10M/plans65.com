/**
 * County plan finder: every 2027 Medicare Advantage plan of a county, with premium, drug deductible,
 * in-network out-of-pocket limit (MOOP) and 2027 star rating, read from the CMS landscape file.
 * First render = the county chosen at build (RECETTE §17.5); another state loads its static file
 * (/data/plans/<st>.json) from this site: nothing typed leaves the browser.
 */
import { useEffect, useMemo, useState } from 'react';
import SelectField from '../ui/SelectField';
import { Choice, ResultCard, ShareRow } from './parts';
import { readParams, str, updateURL } from '../../lib/url-state';
import type { Plan, Pdp, StateFile } from '../../lib/data';

export interface FinderInit { st: string; county: string; counties: Array<{ n: string; s: string }>; plans: Plan[]; gone: number; pdp: Pdp[] }
interface Props {
  init: FinderInit; states: Array<{ st: string; name: string }>; lock?: 'none' | 'state' | 'county';
  mode?: 'ma' | 'zero' | 'snp' | 'pdp'; methodHref?: string; idPrefix?: string;
  /** Links to the state and county pages that exist: { "FL": "/en/florida/", "FL/miami-dade": "/en/florida/miami-dade/" }. */
  pages?: Record<string, string>;
}

const money = (x: number | null | undefined) => (x === null || x === undefined ? 'n/a' : x === 0 ? '$0' : `$${x.toLocaleString('en-US', { minimumFractionDigits: Number.isInteger(x) ? 0 : 2, maximumFractionDigits: 2 })}`);
const whole = (x: number | null | undefined) => (x === null || x === undefined ? 'none' : `$${Math.round(x).toLocaleString('en-US')}`);
const star = (s: Plan['star']) => (typeof s === 'number' ? `${s.toFixed(1)}★` : s === 'new' ? 'new' : s === 'nd' ? 'too few data' : 'n/a');
const SNP: Record<string, string> = { D: 'dual-eligible', C: 'chronic condition', I: 'institutional' };

function fromFile(f: StateFile, county: string) {
  const c = f.counties.find((x) => x.s === county) ?? f.counties[0];
  return { st: f.st, county: c?.s ?? '', counties: f.counties.map((x) => ({ n: x.n, s: x.s })), plans: c ? c.p.map((i) => f.plans[i]) : [], gone: c ? c.x.length : 0, pdp: f.pdp };
}

export default function PlanFinder({ init, states, lock = 'none', mode = 'ma', methodHref, idPrefix = 'pf', pages = {} }: Props) {
  const [d, setD] = useState<FinderInit>(init);
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState<'all' | 'hmo' | 'ppo'>('all');
  const [drugs, setDrugs] = useState<'any' | 'yes'>(mode === 'zero' ? 'yes' : 'any');
  const [sort, setSort] = useState<'premium' | 'moop' | 'stars'>(mode === 'zero' ? 'moop' : 'premium');
  const [snp, setSnp] = useState<'hide' | 'only'>(mode === 'snp' ? 'only' : 'hide');
  const cache = useMemo(() => new Map<string, StateFile>(), []);

  async function load(st: string, county?: string) {
    setLoading(true);
    try {
      let f = cache.get(st);
      if (!f) { const r = await fetch(`/data/plans/${st.toLowerCase()}.json`); f = (await r.json()) as StateFile; cache.set(st, f); }
      setD(fromFile(f, county ?? ''));
    } finally { setLoading(false); }
  }
  useEffect(() => {
    if (lock !== 'none') return;
    const u = readParams(window.location.search);
    const st = str(u, 'st', ''), c = str(u, 'c', '');
    if (st && states.some((s) => s.st === st) && (st !== init.st || (c && c !== init.county))) void load(st, c || undefined);
  }, []);
  useEffect(() => { updateURL(lock === 'none' ? { st: d.st, c: d.county } : lock === 'state' ? { c: d.county } : {}); }, [d.st, d.county]);

  const list = useMemo(() => {
    let ps = d.plans.filter((p) => (snp === 'only' ? !!p.snp : !p.snp && !p.sanc));
    if (type === 'hmo') ps = ps.filter((p) => p.t.startsWith('HMO'));
    if (type === 'ppo') ps = ps.filter((p) => p.t.includes('PPO'));
    if (drugs === 'yes') ps = ps.filter((p) => p.hd);
    if (mode === 'zero') ps = ps.filter((p) => (p.m ?? 1) === 0);
    const k = (p: Plan) => (sort === 'premium' ? [p.m ?? 9e9, p.moop ?? 9e9] : sort === 'moop' ? [p.moop ?? 9e9, p.m ?? 9e9] : [-(typeof p.star === 'number' ? p.star : 0), p.m ?? 9e9]);
    return [...ps].sort((a, b) => { const x = k(a), y = k(b); return x[0] - y[0] || x[1] - y[1] || a.n.localeCompare(b.n); });
  }, [d, type, drugs, sort, snp, mode]);

  const std = d.plans.filter((p) => !p.snp && !p.sanc);
  const zero = std.filter((p) => p.hd && (p.m ?? 1) === 0).length;
  const moops = std.map((p) => p.moop).filter((x): x is number => x !== null);
  const best = Math.max(0, ...std.map((p) => (typeof p.star === 'number' ? p.star : 0)));
  const cName = d.counties.find((c) => c.s === d.county)?.n ?? '';
  const sName = states.find((s) => s.st === d.st)?.name ?? d.st;
  const pdpSorted = [...d.pdp].sort((a, b) => (a.d ?? 9e9) - (b.d ?? 9e9));
  const pageHref = pages[`${d.st}/${d.county}`] ?? pages[d.st];

  return (
    <div className="rounded-xl border border-navy-200 bg-white p-4 sm:p-5">
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)]">
        <form className="grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
          {lock === 'none' && <SelectField id={`${idPrefix}-st`} label="State" value={d.st} onChange={(v) => void load(v)} options={states.map((s) => ({ value: s.st, label: s.name }))} />}
          {mode !== 'pdp' && lock !== 'county' && <SelectField id={`${idPrefix}-c`} label={d.st === 'LA' ? 'Parish' : 'County'} value={d.county} onChange={(v) => void load(d.st, v)} options={d.counties.map((c) => ({ value: c.s, label: c.n }))} help={d.counties.length ? `${d.counties.length} with at least one plan` : 'No Advantage plan filed in this state'} />}
          {mode !== 'pdp' && <>
            <Choice id={`${idPrefix}-t`} label="Network" value={type} onChange={setType} options={[{ value: 'all', label: 'All' }, { value: 'hmo', label: 'HMO' }, { value: 'ppo', label: 'PPO' }]} />
            <Choice id={`${idPrefix}-d`} label="Drug coverage" value={drugs} onChange={setDrugs} options={[{ value: 'any', label: 'Any' }, { value: 'yes', label: 'Included' }]} />
            <Choice id={`${idPrefix}-s`} label="Sort by" value={sort} onChange={setSort} options={[{ value: 'premium', label: 'Premium' }, { value: 'moop', label: 'Max OOP' }, { value: 'stars', label: 'Stars' }]} />
            <Choice id={`${idPrefix}-n`} label="Plan kind" value={snp} onChange={setSnp} options={[{ value: 'hide', label: 'Open to all' }, { value: 'only', label: 'Special needs' }]} />
          </>}
        </form>
        {mode === 'pdp'
          ? <ResultCard label={`Stand-alone drug plans in ${sName}, 2027`} value={`${d.pdp.length} plans`} sub={pdpSorted[0] ? <>Lowest premium {money(pdpSorted[0].d)} a month ({pdpSorted[0].n})</> : 'None filed'}>
              <ShareRow methodHref={methodHref} />
            </ResultCard>
          : <ResultCard label={`${cName ? `${cName}, ` : ''}${sName}: plans open to everyone on Parts A and B`} value={loading ? '…' : `${std.length} plans`}
              sub={std.length ? <>{zero} with a $0 premium and drug coverage {moops.length ? ` · out-of-pocket limits ${whole(Math.min(...moops))} to ${whole(Math.max(...moops))}` : ''} · best rating {best ? `${best.toFixed(1)}★` : 'n/a'}{d.gone ? ` · ${d.gone} plan IDs of 2026 not renewed here` : ''}</> : 'No Medicare Advantage plan is filed for this county in 2027: Original Medicare with a drug plan and a Medigap policy is the route.'}>
              {pageHref && <p className="mt-2 text-sm"><a className="font-medium text-accent-700 underline" href={pageHref}>Full page for {cName || sName}</a></p>}
              <ShareRow methodHref={methodHref} />
            </ResultCard>}
      </div>
      {mode === 'pdp'
        ? <div className="mt-4 overflow-x-auto"><table className="journal w-full text-sm"><caption className="mb-2 text-left text-sm text-navy-700">Every stand-alone Part D plan filed for {sName} in 2027, sorted by monthly premium (CMS landscape file, September 2026).</caption>
            <thead><tr><th scope="col" className="px-2 py-2 text-left">Plan</th><th scope="col" className="px-2 py-2 text-right">Premium</th><th scope="col" className="px-2 py-2 text-right">Deductible</th><th scope="col" className="px-2 py-2 text-right">2026 premium</th><th scope="col" className="px-2 py-2 text-right">Stars</th></tr></thead>
            <tbody>{pdpSorted.map((p) => <tr key={p.k} className="border-b border-navy-100"><td className="px-2 py-2"><span className="font-medium text-navy-900">{p.n}</span><span className="block text-xs text-navy-600">{p.o} · {p.k} · {p.cat}</span></td><td className="tabular-nums px-2 py-2 text-right">{money(p.d)}</td><td className="tabular-nums px-2 py-2 text-right">{money(p.dd)}</td><td className="tabular-nums px-2 py-2 text-right text-navy-600">{p.d26 === undefined ? 'new' : money(p.d26)}</td><td className="px-2 py-2 text-right">{star(p.star)}</td></tr>)}</tbody></table></div>
        : <div className="mt-4 overflow-x-auto">
            <table className="journal w-full text-sm">
              <caption className="mb-2 text-left text-sm text-navy-700">{list.length} {snp === 'only' ? 'special needs plans' : 'plans'} shown · monthly premium = Part C + Part D, before your Part B premium · stars: 2027 ratings published October 8, 2026</caption>
              <thead><tr><th scope="col" className="px-2 py-2 text-left">Plan</th><th scope="col" className="px-2 py-2 text-right">Premium</th><th scope="col" className="px-2 py-2 text-right">Drug deductible</th><th scope="col" className="px-2 py-2 text-right">Max out of pocket</th><th scope="col" className="px-2 py-2 text-right">Stars</th></tr></thead>
              <tbody>
                {list.map((p) => (
                  <tr key={p.k} className="border-b border-navy-100 align-top">
                    <td className="px-2 py-2"><span className="font-medium text-navy-900">{p.n}</span><span className="block text-xs text-navy-600">{p.o} · {p.t}{p.snp ? ` · ${SNP[p.snp]} SNP` : ''} · {p.k}{p.m26 !== undefined && p.m26 !== null && p.m !== null && p.m26 !== p.m ? ` · was ${money(p.m26)} in 2026` : ''}</span></td>
                    <td className="tabular-nums px-2 py-2 text-right">{money(p.m)}</td>
                    <td className="tabular-nums px-2 py-2 text-right">{p.hd ? money(p.dd) : 'no drugs'}</td>
                    <td className="tabular-nums px-2 py-2 text-right">{whole(p.moop)}</td>
                    <td className="px-2 py-2 text-right">{star(p.star)}</td>
                  </tr>
                ))}
                {list.length === 0 && <tr><td colSpan={5} className="px-2 py-3 text-navy-600">No plan matches these filters here.</td></tr>}
              </tbody>
            </table>
          </div>}
    </div>
  );
}
