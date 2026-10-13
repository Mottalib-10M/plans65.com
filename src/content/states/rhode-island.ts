import { defineState } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const s = K.state('rhode-island');
const prov = K.county('rhode-island', 'providence');
const newp = K.county('rhode-island', 'newport');
const d26 = K.P.partD['2026'];
const d27 = K.P.partD['2027'];

export default defineState({
  slug: 'rhode-island',
  title: `Medicare Advantage Plans Rhode Island 2027: ${s.std} Plans Listed`,
  description: `Rhode Island Medicare Advantage 2027: ${s.std} open plans, the same list in all ${s.counties} counties, ${s.zero} at $0 with drugs, caps from ${K.usd(s.moopMin!)}. Every plan and drug plan listed.`,
  intro: `One short list for the whole state: the same handful of plans from Woonsocket to Westerly, written by three companies.`,
  resume: `Rhode Island has one of the easiest Medicare Advantage markets to read for 2027. ${s.std} plans are open to anyone with Parts A and B, and nearly all of them are sold statewide: Providence and Kent counties have ${prov.std}, Bristol, Newport and Washington ${newp.std}. Three parent companies file them, the local Blue Cross plan with ${s.orgList[0][1]}, CVS Health (Aetna) and UnitedHealth with ${s.orgList[1][1]} each. ${s.zero} drug-covering plans charge no premium. In-network caps sit in a tight band from ${K.usd(s.moopMin!)} to ${K.usd(s.moopMax!)}, around a median of ${K.usd(s.moopMed!)}. ${s.star4} plans rate four stars or more, the best ${s.starMax}. The ${s.snp} special needs plans include ${s.dsnp} for people who also have Medicaid. Stand-alone drug plans cost more here than in most states, from ${K.cents(s.pdpMin!)} to ${K.cents(s.pdpMax!)} a month; all ${s.pdp} are listed below.`,
  body: (h) => `
<h2>A state-sized service area</h2>
<p>Because insurers usually file Rhode Island as a single block, the county you live in barely changes the menu. That makes comparison easy and switching between towns painless, but it also means that if a plan's network does not suit you, there is no richer county next door to look at. The question is less which plans you can buy than which hospital groups each one contracts with in the Providence area and on Aquidneck Island.</p>
<h3>BlueCHiP and the national pair</h3>
<p>${s.lowMoop!.n}, from ${s.lowMoop!.o}, holds the lowest cap at ${K.usd(s.lowMoop!.moop!)} and a $0 premium. ${s.best!.n} has the top rating, ${s.best!.star} stars, with a ${K.usd(s.best!.moop!)} cap; its name signals a Part B giveback, money returned toward the Part B premium. ${s.hmo} of the open plans are HMOs and ${s.ppo} PPOs. Rhode Island had ${s.std26} open plans in 2026, ${K.change(s.std, s.std26)}.</p>
<h3>Plans reserved for Medicaid members and nursing-home residents</h3>
<p>Next to the ${s.std} open plans, Rhode Island has ${s.snp} special needs plans: ${s.dsnp} for people enrolled in both Medicare and Medicaid, ${s.csnp} for a chronic condition and ${s.isnp} for nursing-home residents. A person who qualifies for a D-SNP can still pick an open plan instead; the D-SNP's advantage is that it coordinates both programs' benefits in one plan.</p>
<h2>Drug plans: pricier in Rhode Island</h2>
<p>The cheapest stand-alone drug plan here costs ${K.cents(s.pdpMin!)} a month and the median ${K.cents(s.pdpMed!)}, both high next to most of the country. ${s.pdpZeroDed} of the ${s.pdp} has no deductible. Every Part D plan follows the 2027 rules: a deductible of up to ${K.usd(d27.deductible)} against ${K.usd(d26.deductible)} in 2026, and a yearly cap on covered drug costs of ${K.usd(d27.oopCap)} against ${K.usd(d26.oopCap)} (${h.src('ann_2027', 'CMS 2027 Rate Announcement')}). The calculator compares one drug bill under both years.</p>
${h.mini('drug2026')}
`,
  faqs: [
    { q: 'Are Medicare Advantage plans the same in every Rhode Island county for 2027?', a: `Almost. Providence and Kent counties have ${prov.std} open plans for 2027, and Bristol, Newport and Washington have ${newp.std}, per the CMS landscape file of September 2026. The difference is one plan. Networks can still differ inside a plan, so check that your doctors are listed before you enroll.` },
    { q: 'Which insurers sell Medicare Advantage in Rhode Island in 2027?', a: `Three parent companies file open plans: ${s.orgList.map(([o, n]) => `${o} (${n})`).join(', ')}. The state's Blue Cross plan sells under the BlueCHiP for Medicare name. Special needs plans for people with Medicaid or chronic conditions are listed separately in the county table.` },
    { q: 'Why do Part D drug plans cost more in Rhode Island in 2027?', a: `Stand-alone drug plan premiums are set by region, and Rhode Island's ${s.pdp} plans range from ${K.cents(s.pdpMin!)} to ${K.cents(s.pdpMax!)} a month for 2027, with a median of ${K.cents(s.pdpMed!)}. The alternative is a Medicare Advantage plan that includes drug coverage; ${s.zero} of those charge $0. The drug plan table below shows each premium and deductible.` },
  ],
  related: ['state:massachusetts', 'state:connecticut', 'part-d-plans', 'part-d-deductible', 'compare-plans'],
});
