import { defineState } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const s = K.state('north-carolina');
const top = K.counties('north-carolina', 'std');
const low = K.counties('north-carolina', 'std', true);
const meck = K.county('north-carolina', 'mecklenburg');
const wake = K.county('north-carolina', 'wake');
const d26 = K.P.partD['2026'];
const d27 = K.P.partD['2027'];

export default defineState({
  slug: 'north-carolina',
  title: `Medicare Advantage Plans North Carolina 2027: ${s.std} Plans`,
  description: `North Carolina Medicare Advantage 2027: ${s.std} open plans, ${s.zero} at $0 with drugs, Triad ${top[0].std}-plan menus against the coast. All ${s.counties} counties and their caps listed.`,
  intro: `The Piedmont Triad, not Charlotte or Raleigh, has the longest plan lists in the state; the Crystal Coast has the shortest.`,
  resume: `North Carolina has ${s.std} Medicare Advantage plans open to anyone with Parts A and B for 2027, and a resident of Greensboro or Winston-Salem sees more of them than anyone else in the state: ${top.slice(0, 3).map((c) => c.name).join(', ')} counties each list ${top[2].std} or more. Mecklenburg County, with Charlotte, has ${meck.std}; Wake, with Raleigh, ${wake.std}. Along the coast the count falls to ${low[0].std} in ${low[0].name} County. ${s.zero} drug-covering plans charge no premium, among the largest such groups in the country. Caps on in-network spending run from ${K.usd(s.moopMin!)} to ${K.usd(s.moopMax!)}, median ${K.usd(s.moopMed!)}. ${s.star4} plans earn at least four stars for 2027. Two companies tie for the most filings, ${s.orgList[0][0]} and ${s.orgList[1][0]}, with ${s.orgList[0][1]} each. ${s.snp} special needs plans and ${s.pdp} stand-alone drug plans complete the tables below.`,
  body: (h) => `
<h2>Why the Triad outnumbers the big metros</h2>
<p>Plan counts follow service areas, and service areas follow hospital networks. The counties between Greensboro, Winston-Salem and High Point sit within reach of several large systems at once, so insurers file overlapping HMOs and PPOs there: ${top.slice(0, 5).map((c) => `${c.name} ${c.std}`).join(', ')}. Charlotte and Raleigh have fewer, though still a wide choice. A plan's name may be identical in two counties while its network differs, which is why the county page, not the state total, is the place to compare.</p>
<h2>The coast and the drug-free plans</h2>
<p>${low.slice(0, 3).map((c) => `${c.name} (${c.std})`).join(', ')} have the thinnest menus, a contrast with the Triad that surprises people who retire to the Outer Banks or Morehead City. Statewide, ${s.std - s.mapd} of the open plans leave out Part D entirely; their names usually say "No Rx" or "MA only". They exist for people who already have drug coverage from another creditable source, and joining one without such coverage can trigger a lifetime late penalty on drug coverage later.</p>
<h3>Low caps in the right places</h3>
<p>The lowest in-network maximum, ${K.usd(s.lowMoop!.moop!)}, belongs to ${s.lowMoop!.n}, which also rates ${s.cheapHigh!.star} stars at a $0 premium. ${s.best!.n} pairs ${s.best!.star} stars with a ${K.usd(s.best!.moop!)} cap. These plans are not sold in every county; the table shows where.</p>
<h2>The drug side of a North Carolina plan</h2>
<p>Every plan with drug coverage applies the 2027 standard benefit at most: a deductible of up to ${K.usd(d27.deductible)}, up from ${K.usd(d26.deductible)}, and a yearly cap on drug spending of ${K.usd(d27.oopCap)}, up from ${K.usd(d26.oopCap)} (${h.src('ann_2027', 'CMS 2027 Rate Announcement')}). Many Advantage plans set a lower deductible; ${s.pdpZeroDed} of the stand-alone plans sold in the state has none.</p>
${h.mini('drug2026')}
`,
  faqs: [
    { q: 'Which North Carolina counties have the most Medicare Advantage plans in 2027?', a: `${top.slice(0, 3).map((c) => `${c.name} (${c.std})`).join(', ')} lead the state in the CMS landscape file of September 2026, ahead of Mecklenburg at ${meck.std} and Wake at ${wake.std}. ${low[0].name} County on the coast has the fewest, ${low[0].std}. Plans are approved county by county, so moving across a county line can change your options.` },
    { q: 'Why do coastal North Carolina counties have fewer Medicare Advantage plans?', a: `Insurers file plans county by county, and fewer of them chose the coastal counties for 2027. ${low.slice(0, 3).map((c) => `${c.name} (${c.std})`).join(', ')} have the smallest menus for 2027, against ${top[0].std} in ${top[0].name} County, per the CMS file of September 2026. A plan sold inland may not be filed on the coast at all.` },
    { q: 'Are $0 Medicare Advantage plans common in North Carolina for 2027?', a: `Very: ${s.zero} North Carolina plans that include drug coverage have a $0 monthly premium for 2027. You still pay the Part B premium, ${K.cents(K.P.partB['2026'].premium)} in 2026, and your copays up to the plan's cap. The lowest cap filed in the state is ${K.usd(s.moopMin!)}; the median is ${K.usd(s.moopMed!)}.` },
  ],
  related: ['county:north-carolina/mecklenburg', 'state:south-carolina', 'state:virginia', 'state:tennessee', 'part-d-deductible', 'zero-premium-plans'],
});
