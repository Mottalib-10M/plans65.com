import { defineCounty } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const c = K.county('north-carolina', 'mecklenburg');
const un = K.county('north-carolina', 'union');
const ga = K.county('north-carolina', 'gaston');

export default defineCounty({
  state: 'north-carolina',
  county: 'mecklenburg',
  title: `Medicare Advantage Plans Mecklenburg 2027: Charlotte's ${c.std}`,
  description: `Mecklenburg County, NC: ${c.std} Medicare Advantage plans for 2027 around Charlotte, ${c.zero} at $0 with drugs, a lowest cap of ${K.usd(c.moopMin!)}, and ${c.gone} plans of 2026 gone.`,
  intro: `In Charlotte, the plan with the lowest cap is also the best rated, and it costs nothing a month.`,
  resume: `Mecklenburg County, home of Charlotte, has ${c.std} Medicare Advantage plans open to anyone with Parts A and B for 2027, against ${c.std26} in 2026: ${c.gone} plan IDs are not filed again and ${c.new} new ones appear. ${c.zero} of the drug-covering plans charge no premium, the same number as a year earlier. The standout is ${c.lowMoop!.n}, from ${c.lowMoop!.o}: a ${K.prem(c.lowMoop!.m)} plan with the county's lowest in-network cap, ${K.usd(c.lowMoop!.moop)}, and its best 2027 rating, ${c.starMax} stars. The median cap is ${K.usd(c.moopMed!)}, and the highest ${K.usd(c.moopMax!)}. PPOs (${c.ppo}) slightly outnumber HMOs (${c.hmo}). ${c.orgList.slice(0, 4).map(([o, n]) => `${o} (${n})`).join(', ')} file the most plans. The county also lists ${c.snp} special needs plans, ${c.dsnp} of them for people with Medicaid. Every open plan is in the list above.`,
  body: (h) => `
<h2>The plans that left Charlotte</h2>
<p>Among the ${c.gone} 2026 IDs missing for 2027 are a Wellcare giveback PPO, an AARP UnitedHealthcare PPO, an Aetna Signature Care HMO, a Blue Medicare Choice HMO and two HumanaChoice PPOs. Some members were moved by their insurer to a successor plan; others must choose by December 7. The list at the bottom of this page gives every ID.</p>
<h3>Two health systems, one county</h3>
<p>Charlotte's care is split largely between two large hospital systems, and plans differ on which one they contract with. Before choosing even the best-rated plan, check that your primary care doctor and the hospital you would use are in its network for 2027; an HMO pays nothing for routine care outside it. A PPO is the safer pick if your doctors work in both systems, at the cost of a higher cap in most cases on this list.</p>
${h.mini('zeroTrue')}
<h2>Union and Gaston next door</h2>
<p>Union County lists ${un.std} open plans and Gaston County ${ga.std}. Residents just across the line in South Carolina choose among plans filed for their own county, even when they use Charlotte hospitals. The ${h.a('state:north-carolina', 'North Carolina page')} lists every county, and the ${h.a('compare-plans', 'comparator')} puts two Mecklenburg plans side by side.</p>
`,
  faqs: [
    { q: 'What is the best-rated Medicare Advantage plan in Mecklenburg County for 2027?', a: `${c.best!.n}, from ${c.best!.o}, with a ${c.starMax}-star rating in the CMS 2027 Star Ratings, a ${K.prem(c.best!.m)} premium and an in-network cap of ${K.usd(c.best!.moop)}, the lowest in the county. ${c.star4} of Mecklenburg's ${c.std} open plans carry four stars or more for 2027.` },
    { q: 'How many $0 Medicare Advantage plans are there in Charlotte for 2027?', a: `${c.zero} plans open to everyone in Mecklenburg County include drug coverage for a $0 premium in 2027, the same number as in 2026, according to the CMS landscape file. Their caps differ widely, up to ${K.usd(c.moopMax!)}, so sort the list by maximum out of pocket.` },
    { q: 'Did Mecklenburg County lose Medicare Advantage plans for 2027?', a: `Yes: ${c.std} open plans for 2027 against ${c.std26} for 2026, with ${c.gone} plan IDs not filed again in the county and ${c.new} new ones. If your plan is among those gone, your notice says whether you were moved to another plan; otherwise choose a new one before December 7, 2026.` },
  ],
  related: ['state:north-carolina', 'state:south-carolina', 'compare-plans', 'plans-leaving', 'star-ratings'],
});
