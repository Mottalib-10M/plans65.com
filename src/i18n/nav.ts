import { route, type Locale } from './routes';
import { GUIDES, guideById, statePageById, countyPageById, STATE_PAGES, stateId } from '../lib/pages';
import { bySlug, S } from '../lib/data';
import type { Group } from '../lib/page-types';
export interface NavLink { href: string; label: string } export interface NavCategory { label: string; links: NavLink[] }
const CORE: Record<string, string> = { home: '2027 plans by county', method: 'How the data is read', about: 'About', widget: 'Embed the plan finder', contact: 'Contact', editorial: 'Editorial policy', privacy: 'Privacy', terms: 'Legal notice', cookies: 'Cookies' };
export const GROUPS: Array<{ id: Group; label: string }> = [
  { id: 'plans', label: 'Plans and drug coverage' },
  { id: 'costs', label: 'Premiums and costs' },
  { id: 'enroll', label: 'Eligibility and dates' },
];
export const label = (id: string, _lang?: Locale) => {
  if (CORE[id]) return CORE[id];
  const g = guideById(id); if (g) return g.nav;
  const s = statePageById(id); if (s) return `${bySlug(s.slug).name} plans`;
  const c = countyPageById(id); if (c) { const st = bySlug(c.state).st; return `${S.states[st].countyStats[c.county].name} County, ${S.states[st].name}`; }
  return id;
};
const link = (id: string, lang: Locale): NavLink => ({ href: route(id, lang), label: label(id) });
export const inGroup = (g: Group, lang: Locale): NavLink[] => GUIDES.filter((p) => p.group === g).map((p) => link(p.id, lang));
export function navCategories(lang: Locale): NavCategory[] {
  return GROUPS.map((g) => ({ label: g.label, links: inGroup(g.id, lang) })).filter((c) => c.links.length);
}
export const navDirect = (lang: Locale): NavLink[] => [link('method', lang)];
export const footerColumns = (lang: Locale): NavCategory[] => [
  ...GROUPS.map((g) => ({ label: g.label, links: inGroup(g.id, lang) })).filter((c) => c.links.length),
  { label: 'This site', links: ['home', 'method', 'about', 'contact', 'editorial', 'widget', 'terms', 'privacy', 'cookies'].map((i) => link(i, lang)) },
];
/** Every state page from the footer: each is one click from any page (RECETTE §18.2). */
export const popularLinks = (lang: Locale): NavLink[] => STATE_PAGES.map((s) => ({ href: route(stateId(s.slug), lang), label: bySlug(s.slug).name }));
