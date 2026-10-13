/**
 * Data access for pages (build time). The plan files are big: a page imports only its own state through
 * `statePlans()`, which reads the JSON with a glob so that Vite never bundles every state into a page.
 */
import SUMMARY from '../data/summary.json';
import P from '../data/params-2027.json';

export { P };
export type Star = number | 'new' | 'nd' | null;
export interface Plan {
  k: string; n: string; o: string; p: string; t: string; snp: '' | 'D' | 'C' | 'I';
  c: number | null; d: number | null; m: number | null; dd: number | null; moop: number | null; hd: boolean;
  star: Star; lis: number | null; m26?: number | null; moop26?: number | null; sanc?: boolean;
}
export interface Pdp { k: string; n: string; o: string; p: string; d: number | null; dd: number | null; lis: number | null; b: string; cat: string; star: Star; nat: boolean; bench: boolean; d26?: number | null; dd26?: number | null }
export interface CountyRow { n: string; s: string; p: number[]; x: Array<{ k: string; n: string; o: string; same: boolean }> }
export interface StateFile { st: string; name: string; terr: boolean; plans: Plan[]; counties: CountyRow[]; pdp: Pdp[] }
export interface CountyStats {
  name: string; all: number; std: number; mapd: number; zero: number; snp: number; dsnp: number; csnp: number; isnp: number;
  moopMin: number | null; moopMed: number | null; moopMax: number | null; starMax: number | null; star4: number; premMax: number | null;
  orgs: number; topOrg: string | null; topOrgN: number; hmo: number; ppo: number; pffs: number; cost: number; std26: number; zero26: number; gone: number; new: number;
}
export interface StateSummary extends Omit<CountyStats, 'name' | 'zero26' | 'gone' | 'new'> {
  name: string; slug: string; terr: boolean; counties: number; std26: number; pdp: number; pdp26: number;
  pdpMin: number | null; pdpMax: number | null; pdpMinName: string | null; pdpMed: number | null; pdpBench: number; pdpZeroDed: number;
  countyStats: Record<string, CountyStats>;
}
export const S = SUMMARY as unknown as { source: Record<string, string>; national: Record<string, number | unknown>; states: Record<string, StateSummary> };
export const NAT = S.national as unknown as {
  segments: number; std: number; snp: number; counties: number; pdp: number; moopMax: number; moopMin: number; moopMed: number; moopAtMax: number;
  zeroMapd: number; mapd: number; segments26: number; std26: number; pdp26: number; types: Array<[string, number]>; dsnp: number; csnp: number; isnp: number;
  pdpDed: Array<[number, number]>; starDist: Array<[string, number]>;
  byType: Record<string, { n: number; moopMed: number | null; zero: number; premMed: number }>;
};

/** The 50 states, DC and Puerto Rico get a page; the four smaller territories are in the finder only. */
const NO_PAGE = new Set(['AS', 'GU', 'MP', 'VI']);
export const STATE_LIST = Object.entries(S.states)
  .filter(([st]) => !NO_PAGE.has(st))
  .map(([st, v]) => ({ st, name: v.name, slug: v.slug }))
  .sort((a, b) => a.name.localeCompare(b.name));
export const ALL_STATES = Object.entries(S.states).map(([st, v]) => ({ st, name: v.name, slug: v.slug })).sort((a, b) => a.name.localeCompare(b.name));
export const bySlug = (slug: string) => { const s = STATE_LIST.find((x) => x.slug === slug); if (!s) throw new Error(`Unknown state slug ${slug}`); return s; };
export const stateSummary = (st: string) => { const s = S.states[st]; if (!s) throw new Error(`Unknown state ${st}`); return s; };

const files = import.meta.glob<{ default: StateFile }>('../data/plans/*.json');
const cache = new Map<string, StateFile>();
/** The full plan file of a state (build time only). */
export async function statePlans(st: string): Promise<StateFile> {
  const key = `../data/plans/${st.toLowerCase()}.json`;
  if (cache.has(key)) return cache.get(key)!;
  const loader = files[key];
  if (!loader) throw new Error(`No plan file for ${st}`);
  const f = (await loader()).default;
  cache.set(key, f);
  return f;
}
/** Plans of one county, sorted by monthly premium then MOOP. */
export function countyPlans(f: StateFile, countySlug: string) {
  const c = f.counties.find((x) => x.s === countySlug);
  if (!c) throw new Error(`Unknown county ${countySlug} in ${f.st}`);
  const plans = c.p.map((i) => f.plans[i]).sort((a, b) => (a.m ?? 9e9) - (b.m ?? 9e9) || (a.moop ?? 9e9) - (b.moop ?? 9e9) || a.n.localeCompare(b.n));
  return { county: c, plans };
}
export const isStd = (p: Plan) => !p.snp && !p.sanc;
export const starNum = (s: Star) => (typeof s === 'number' ? s : null);
export const starText = (s: Star) => (typeof s === 'number' ? s.toFixed(1) : s === 'new' ? 'New plan' : s === 'nd' ? 'Too few data' : 'n/a');
export const SNP_LABEL: Record<string, string> = { D: 'Dual-eligible SNP', C: 'Chronic-condition SNP', I: 'Institutional SNP' };
