import { defineCounty } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const c = K.county('massachusetts', 'middlesex');
const suf = K.county('massachusetts', 'suffolk');
const ess = K.county('massachusetts', 'essex');

export default defineCounty({
  state: 'massachusetts',
  county: 'middlesex',
  title: `Medicare Advantage Plans Middlesex County 2027: ${c.std} Plans`,
  description: `Middlesex County, Massachusetts: ${c.std} Medicare Advantage plans for 2027, ${c.zero} at $0 with drugs, caps from ${K.usd(c.moopMin!)}, ${c.star4} rated four stars or more. Full list, no agent.`,
  intro: `Same number of open plans as in 2026, but not the same plans: ${c.gone} IDs left Middlesex County and ${c.new} new ones replaced them.`,
  resume: `Middlesex County, from Cambridge and Somerville to Lowell and Framingham, has ${c.std} Medicare Advantage plans open to anyone with Parts A and B for 2027, exactly as many as in 2026, yet ${c.gone} of the 2026 plan IDs are not filed again here and ${c.new} new IDs appear. ${c.zero} drug-covering plans charge a $0 premium. Caps run from ${K.usd(c.moopMin!)}, for ${c.lowMoop!.n} at ${K.prem(c.lowMoop!.m)} a month, to ${K.usd(c.moopMax!)}, with a median of ${K.usd(c.moopMed!)}. Quality is high: ${c.star4} plans carry four stars or more for 2027. HMOs dominate with ${c.hmo} plans against ${c.ppo} PPOs. ${c.orgList.slice(0, 4).map(([o]) => o).join(', ')} file the most. The county also lists ${c.snp} special needs plans, ${c.dsnp} of them for people with MassHealth. The list above shows every open plan with its premium, drug deductible and cap.`,
  body: (h) => `
<h2>A renamed menu</h2>
<p>The 2026 plan IDs not filed again in Middlesex include plans from Blue Cross Blue Shield of Massachusetts, Tufts and Fallon, some of which reappear under a new ID; the full list is at the bottom of this page. Many of their members were moved by the insurer to another plan of the same family, with a different premium or cap. If you were in one of them, compare the plan you were moved to with the alternatives before December 7, rather than assuming it is the same plan under a new name.</p>
<h3>Low cap, high premium; $0 premium, high cap</h3>
<p>The two ends of the list are far apart. ${c.lowMoop!.n} limits in-network spending to ${K.usd(c.lowMoop!.moop)} but costs ${K.prem(c.lowMoop!.m)} a month. The best-rated plan, ${c.best!.n}, costs ${K.prem(c.best!.m)} but caps spending at ${K.usd(c.best!.moop)}. Over a calm year the second wins; in a year with surgery the first does.</p>
${h.mini('capVsOriginal', { moop: c.best!.moop })}
<h2>Boston hospitals and network lines</h2>
<p>Many Middlesex residents use hospitals in Boston, in Suffolk County, which lists ${suf.std} open plans of its own, and Essex County to the north lists ${ess.std}. You join plans filed for the county where you live, but the network decides which hospitals you can use: an HMO built around a community hospital system may not include the Boston teaching hospitals. Check your specialists before choosing. The ${h.a('state:massachusetts', 'Massachusetts page')} compares all counties.</p>
`,
  faqs: [
    { q: 'How many Medicare Advantage plans are there in Middlesex County, Massachusetts for 2027?', a: `${c.std} plans open to anyone with Parts A and B, the same number as in 2026, plus ${c.snp} special needs plans, according to the CMS landscape file of September 2026. ${c.zero} of the open plans include drug coverage for a $0 premium, and ${c.star4} carry four stars or more.` },
    { q: 'Which Middlesex County Medicare Advantage plan has the lowest out-of-pocket cap in 2027?', a: `${c.lowMoop!.n}, from ${c.lowMoop!.o}, with an in-network cap of ${K.usd(c.lowMoop!.moop)} and a premium of ${K.prem(c.lowMoop!.m)} a month. The median cap among the county's ${c.std} open plans is ${K.usd(c.moopMed!)}. Premiums and Part D drug costs are not counted in that cap.` },
    { q: 'Why did my Middlesex County plan change its name for 2027?', a: `${c.gone} plan IDs offered in Middlesex in 2026 are not filed for the county in 2027, and ${c.new} new IDs appear. Insurers often merge plans and move members to a new ID, with new premiums and caps. Your Annual Notice of Change, mailed by September 30, 2026, says which plan you are in for 2027.` },
  ],
  related: ['state:massachusetts', 'compare-plans', 'plans-leaving', 'star-ratings'],
});
