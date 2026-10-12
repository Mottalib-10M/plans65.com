/** Every page id the site is meant to have (guides, states, large counties). Content tests accept links to
 *  these ids while pages are being written; the "all planned pages exist" test fails until each has its file. */
import { STATE_LIST } from './data';
export const PLANNED_GUIDES = ['irmaa-brackets', 'irmaa-appeal', 'part-b-premium', 'part-b', 'part-a', 'annual-cost-calculator', 'medigap', 'medigap-plan-g',
  'part-d-plans', 'part-d-deductible', 'compare-plans', 'zero-premium-plans', 'special-needs-plans', 'star-ratings', 'plans-leaving', 'hmo-vs-ppo',
  'eligibility', 'enrollment-periods', 'late-enrollment-penalty'];
export const PLANNED_COUNTIES: Record<string, string[]> = {
  california: ['los-angeles', 'san-diego', 'orange', 'riverside', 'san-bernardino', 'santa-clara'], illinois: ['cook'], texas: ['harris', 'dallas', 'tarrant', 'bexar'],
  arizona: ['maricopa'], florida: ['miami-dade', 'broward', 'palm-beach', 'hillsborough', 'orange'], 'new-york': ['kings', 'queens', 'new-york', 'suffolk'],
  washington: ['king'], nevada: ['clark'], michigan: ['wayne'], pennsylvania: ['philadelphia', 'allegheny'], ohio: ['cuyahoga', 'franklin'],
  massachusetts: ['middlesex'], 'north-carolina': ['mecklenburg'],
};
export const PLANNED_IDS = new Set<string>([
  ...PLANNED_GUIDES, ...STATE_LIST.map((s) => `state:${s.slug}`),
  ...Object.entries(PLANNED_COUNTIES).flatMap(([s, cs]) => cs.map((c) => `county:${s}/${c}`)),
]);
