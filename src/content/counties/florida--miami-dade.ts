import { defineCounty } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const c = K.county('florida', 'miami-dade');
const br = K.county('florida', 'broward');

export default defineCounty({
  state: 'florida',
  county: 'miami-dade',
  title: `Medicare Advantage Plans Miami-Dade 2027: ${c.std} Plans Listed`,
  description: `All ${c.std} Medicare Advantage plans open to everyone in Miami-Dade County for 2027, ${c.zero} at $0 with drugs, caps from ${K.usd(c.moopMin!)}, plus ${c.snp} special needs plans, no phone.`,
  intro: `${c.std} plans open to everyone and ${c.snp} special needs plans: Miami-Dade has more plans built around Medicaid and chronic illness than open ones.`,
  resume: `Miami-Dade County has ${c.std} Medicare Advantage plans open to anyone with Parts A and B for 2027, and ${c.zero} of those with drug coverage charge no monthly premium. The lowest in-network out-of-pocket cap is ${K.usd(c.moopMin!)}, filed by ${c.lowMoop!.n} (${c.lowMoop!.o}); the median cap is ${K.usd(c.moopMed!)} and the highest ${K.usd(c.moopMax!)}. ${c.star4} open plans hold a 2027 rating of four stars or more. What sets the county apart is the size of its special needs market: ${c.snp} plans, of which ${c.dsnp} for people with both Medicare and Medicaid and ${c.csnp} for chronic conditions, more than the open plans. Compared with 2026, the county lost ${c.gone} plan IDs and gained ${c.new}. Every plan is in the list above, sorted by premium.`,
  body: (h) => `
<h2>A market built on medical groups</h2>
<p>${c.orgList.map(([o, n]) => `${o} (${n})`).join(', ')} file the most open plan segments here. Many Miami-Dade HMOs are tied to a network of primary care centers that are paid a fixed amount per member, and the plan chooses which centers you can use. Before picking a $0 plan with a low cap, check that the doctor you see today is in its directory for 2027: the landscape file does not list networks.</p>
<h3>Broward next door</h3>
<p>Broward County lists ${br.std} open plans and ${br.snp} special needs plans, with a lowest cap of ${K.usd(br.moopMin!)}. People who live near the county line can only join plans filed for their county of residence, even if their doctors are on the other side.</p>
${h.mini('zeroTrue')}
<h2>If you have Medicaid too</h2>
<p>With ${c.dsnp} dual-eligible plans, a resident who has full Medicaid often has a wider choice than other beneficiaries. These plans coordinate Medicare and Medicaid benefits, and some charge no cost sharing at all. Enrollment rules for people with Medicaid differ from the annual calendar, and a plan that integrates both programs can replace several cards with one: see ${h.a('special-needs-plans', 'special needs plans')} before you switch.</p>
`,
  faqs: [
    { q: 'What is the lowest out-of-pocket maximum for a Miami-Dade Medicare Advantage plan in 2027?', a: `${K.usd(c.moopMin!)} in network, for ${c.lowMoop!.n} offered by ${c.lowMoop!.o}, according to the CMS landscape file of September 2026. The median cap among the county's ${c.std} open plans is ${K.usd(c.moopMed!)}. Premiums, drugs and out-of-network care are not counted in that cap.` },
    { q: 'Which Miami-Dade plans were not renewed for 2027?', a: `${c.gone} plan IDs offered in the county in 2026 are not filed for it in 2027; they are listed at the bottom of this page. A missing ID can mean a closure or a merger into another plan, so read the Annual Notice of Change your insurer mailed by September 30, 2026.` },
    { q: 'How many Miami-Dade plans have five stars for 2027?', a: `The best 2027 rating among the county's open plans is ${c.starMax} stars, published by CMS on October 8, 2026; ${c.star4} plans have four stars or more. Sort the list above by stars to see them. Ratings belong to the insurer's contract, so several plans can share one.` },
  ],
  related: ['state:florida', 'county:florida/broward', 'compare-plans', 'special-needs-plans'],
});
