/**
 * Writing kit (CONTRIBUTING-PAGES.md): every figure written in a page comes from here, never typed by hand.
 *   K.state('florida')               summary of a state (plans, $0 plans, MOOP range, PDPs, 2026 counts…)
 *   K.county('florida', 'miami-dade') summary of a county (same fields + exits and new plans)
 *   K.nat                            national counts of the 2027 landscape file
 *   K.P                              params-2027.json (Part B, IRMAA, Part D, Medigap, periods)
 *   K.irmaa(…), K.drug(…), K.year(…), K.penaltyB(…), K.penaltyD(…), K.iep(…), K.stay(…)  the engine
 *   K.usd, K.cents, K.prem, K.num, K.pct, K.day   formats
 */
import { P, NAT, S, bySlug, stateSummary, type StateSummary, type CountyStats } from './data';
import { usd, cents, prem, num, pct, day } from './fmt';
import * as E from './engine/medicare';

function state(slug: string): StateSummary & { st: string } {
  const s = bySlug(slug);
  return { ...stateSummary(s.st), st: s.st };
}
function county(stateSlug: string, countySlug: string): CountyStats & { st: string; stateName: string } {
  const s = state(stateSlug);
  const c = s.countyStats[countySlug];
  if (!c) throw new Error(`Unknown county ${countySlug} in ${stateSlug}`);
  return { ...c, st: s.st, stateName: s.name };
}
/** Counties of a state sorted by a field (desc by default). */
function counties(stateSlug: string, by: keyof CountyStats = 'std', asc = false) {
  const s = state(stateSlug);
  return Object.entries(s.countyStats).map(([slug, c]) => ({ slug, ...c }))
    .sort((a, b) => { const x = (a[by] as number) ?? 0, y = (b[by] as number) ?? 0; return asc ? x - y : y - x; });
}

export const KIT = {
  P, nat: NAT, source: S.source, state, county, counties,
  irmaa: E.irmaa, drug: E.drugCost, year: E.yearCost, penaltyB: E.partBPenalty, penaltyD: E.partDPenalty, iep: E.initialPeriod, stay: E.hospitalStay,
  original: E.originalMedicalOop, medigap: E.medigapOop,
  usd, cents, prem, num, pct, day,
  /** "2 more" / "3 fewer" / "the same number of": change between 2026 and 2027. */
  change: (now: number, before: number, unit = 'plans') => (now === before ? `the same number of ${unit}` : now > before ? `${now - before} more ${unit}` : `${before - now} fewer ${unit}`),
};
export type Kit = typeof KIT;
