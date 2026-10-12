/** llms.txt (RECETTE §21), generated from the page registry. */
import { GUIDES, STATE_PAGES, COUNTY_PAGES, stateId, countyId } from '../lib/pages';
import { SITE_URL, LAST_UPDATED, SITE_NAMES } from '../data/site-config';
import { route } from '../i18n/routes';
import { GROUPS, label } from '../i18n/nav';
export function GET() {
  const lines = [
    `# ${SITE_NAMES.en}`, '',
    `> Every 2027 Medicare Advantage plan of every US county with its monthly premium, Part D deductible, in-network out-of-pocket limit (MOOP) and 2027 star rating, read from the CMS CY2027 landscape file (202609.1, data of September 22, 2026) and the CMS 2027 Star Ratings of October 8, 2026; every stand-alone Part D plan by state; calculators for the 2026 Part B premium and IRMAA (CMS and SSA tables), the 2027 Part D benefit ($700 deductible, $2,400 cap), Medigap Plan G, late penalties, enrollment dates and the whole-year cost. No ZIP code, phone number or agent. Independent site published by Radif Partners, not affiliated with the U.S. government. Last updated ${LAST_UPDATED}.`, '',
    ...GROUPS.flatMap((g) => [`## ${g.label}`, ...GUIDES.filter((p) => p.group === g.id).map((p) => `- [${p.nav}](${SITE_URL}${route(p.id, 'en')}): ${p.card}`), '']),
    '## States', ...STATE_PAGES.map((s) => `- [${label(stateId(s.slug))}](${SITE_URL}${route(stateId(s.slug), 'en')}): ${s.intro}`), '',
    '## Large counties', ...COUNTY_PAGES.map((c) => `- [${label(countyId(c.state, c.county))}](${SITE_URL}${route(countyId(c.state, c.county), 'en')}): ${c.intro}`), '',
    '## About', `- [How the data is read](${SITE_URL}${route('method', 'en')})`, `- [About](${SITE_URL}${route('about', 'en')})`,
  ];
  return new Response(lines.join('\n') + '\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
