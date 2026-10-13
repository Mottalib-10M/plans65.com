import { defineGuide } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const M = K.P.medigap;
const hd26 = M.hdDeductible['2026'], hd27 = M.hdDeductible['2027'];
const bd26 = K.P.partB['2026'].deductible, bd27 = K.P.partB['2027'].deductible;
const g = 170, h = 55;
const gap = (g - h) * 12;
const extra = hd27 - bd27;
const light = { partBServices: 1500, admissions: 0 };
const heavy = { partBServices: 30000, admissions: 1 };
const yr = (prem: number, plan: 'G' | 'HDG', use: typeof light) => prem * 12 + K.medigap(use, 2027, plan);

export default defineGuide({
  id: 'medigap-plan-g',
  group: 'costs',
  order: 80,
  slug: 'medigap-plan-g',
  nav: 'Medigap Plan G cost',
  card: 'Plan G against high-deductible G, the 2027 deductible and break-even',
  title: 'Medigap Plan G Cost 2027: Plan G or High-Deductible G',
  description: `Medigap Plan G cost 2027: you pay only the Part B deductible; high-deductible G starts paying after ${K.usd(hd27)} (${K.usd(hd26)} in 2026). Compare both with your own quotes.`,
  h1: 'Medigap Plan G: what it costs, and when high-deductible G wins',
  intro: 'Enter your two quotes and a level of care: the calculator shows which version of Plan G costs less over 2027, and each one’s worst case.',
  resume: `Medigap Plan G pays everything Original Medicare leaves to you except the Part B deductible, ${K.usd(bd26)} in 2026 and projected at ${K.usd(bd27)} for 2027. Once that deductible is paid, hospital stays, nursing facility days, the 20% of Part B and doctors' excess charges cost you nothing more for the year; only the monthly premium remains. That makes Plan G the most complete plan sold to people who became eligible for Medicare in 2020 or later. Its weak point is the premium, which depends on your state, age, sex, tobacco use and ZIP code, and which no public file lists nationally: ask several insurers. The high-deductible version pays nothing until your Medicare cost sharing reaches ${K.usd(hd27)} in 2027 (${K.usd(hd26)} in 2026, announced by CMS in October), then works like Plan G. It costs much less each month, and the calculator shows at what level of care the saving disappears.`,
  body: (h2) => `
<h2>What you pay with Plan G in a year</h2>
<p>With Plan G your yearly costs are the Part B premium, the Plan G premium, the Part B deductible and your drug plan. With a quote of $${g} a month, the Medigap part comes to ${K.usd(yr(g, 'G', light))} in a light year of care in 2027 and ${K.usd(yr(g, 'G', heavy))} in a heavy one: the difference is only the Part B deductible, already paid in the light year. That predictability is what people buy. The worst case is known in January.</p>
<h2>High-deductible G: the arithmetic</h2>
<p>Take a high-deductible G quote of $${h} a month against $${g} for Plan G. The premium saving is ${K.usd(gap)} a year. In exchange, in a year where your Medicare cost sharing reaches the high deductible, you pay up to ${K.usd(extra)} more than with Plan G (the high deductible of ${K.usd(hd27)} minus the Part B deductible you would pay anyway). So with these quotes:</p>
<ul>
<li>In a light year (${K.usd(light.partBServices)} of approved care), high-deductible G costs ${K.usd(yr(h, 'HDG', light))} against ${K.usd(yr(g, 'G', light))} for Plan G.</li>
<li>In a heavy year (${K.usd(heavy.partBServices)} of care and one admission), it costs ${K.usd(yr(h, 'HDG', heavy))} against ${K.usd(yr(g, 'G', heavy))}.</li>
</ul>
<p>When the yearly premium gap is larger than the extra deductible, high-deductible G is cheaper even in the worst year. When it is smaller, high-deductible G wins in light years and loses in heavy ones, and the choice depends on how likely a heavy year is for you and on how easily you could pay the deductible at once.</p>
${h2.mini('hdg')}
<h3>What counts toward the high deductible</h3>
<p>The deductible is met by the cost sharing Medicare leaves you: the Part A deductible, hospital coinsurance, the Part B deductible and the 20%. Premiums do not count, and neither do drugs under Part D. A single hospital admission brings the Part A deductible of ${K.usd(K.P.partA['2026'].deductible)} (2026) toward it at once.</p>
<h2>Why people choose Plan G anyway</h2>
<p>The numbers rarely make Plan G the cheapest option in a healthy year: a $0 Advantage plan or high-deductible G usually costs less. People choose it for three other reasons. It works with every doctor and hospital in the country that accepts Medicare, without a network, so snowbirds, people with family in several states and patients of a distant specialist center keep their access. It needs no referral or plan authorization for services Medicare covers. And it pays doctors' excess charges, the up to 15% that a doctor who does not accept Medicare's approved amount may add, which Plan N and most other letters leave to you.</p>
<h3>Plan G and the Part B deductible in practice</h3>
<p>The Part B deductible is usually met with the first visits or tests of the year, in January or February. After that, Plan G pays the 20% of every Medicare-approved service for the rest of the calendar year, and the bills you receive should show a zero balance. A bill for more than that is worth a call to the insurer.</p>
<h2>Plan G against Plan F and Plan N</h2>
<p>Plan F differs from G only by paying the Part B deductible, and it is closed to anyone first eligible for Medicare since January 1, 2020 (${h2.src('cms_medigap_hd_2027', 'CMS announcement on the F, G and J deductibles')}). Plan N costs less than G but adds small office and emergency copays and leaves the Part B excess charges: the ${h2.a('medigap', 'Medigap comparison')} shows the full chart.</p>
<h2>Buying Plan G at the right moment</h2>
<p>Plan G is easiest to buy in the six months that begin when you are 65 and enrolled in Part B: no health questions, standard price. Later, in most states, insurers may underwrite. Prices rise over time in almost every state, with age or with the insurer's costs, so compare the rate history an insurer gives you, not only this year's premium. Remember to add a stand-alone drug plan in the same window: Plan G covers no prescriptions, and a gap in drug coverage builds a Part D penalty.</p>
`,
  faqs: [
    { q: 'What does Medigap Plan G not cover?', a: `The Part B deductible, ${K.usd(bd26)} in 2026, and anything Original Medicare does not cover: prescription drugs (you need a Part D plan), routine dental, vision and hearing care, long-term custodial care, and care abroad beyond the plan’s emergency benefit, which pays 80% after a small deductible up to a lifetime limit.` },
    { q: 'What is the high-deductible Plan G deductible for 2027?', a: `${K.usd(hd27)} for 2027, up from ${K.usd(hd26)} in 2026, according to the CMS announcement of October 2026. It is indexed each year to consumer prices. Until your Medicare cost sharing reaches it, the policy pays nothing; after that, it pays like a regular Plan G for the rest of the year.` },
    { q: 'Is high-deductible Plan G worth it?', a: 'Compare the yearly premium saving with the extra amount you could owe in a bad year, the high deductible minus the Part B deductible. If the saving is larger, high-deductible G is cheaper in every year. If it is smaller, it is a bet on staying healthy, and it suits people who could pay the deductible at once.' },
    { q: 'Why can’t I buy Medigap Plan F anymore?', a: 'Since January 1, 2020, Medigap plans that pay the Part B deductible, Plans C and F, cannot be sold to people who first became eligible for Medicare on or after that date. People eligible earlier can keep or buy them. For new enrollees, Plan G gives the same coverage except the Part B deductible.' },
  ],
  tool: 'medigap',
  related: ['medigap', 'annual-cost-calculator', 'part-b-premium', 'part-d-plans'],
  sources: ['cms_medigap_hd_2027', 'medigap_compare', 'usc_1395ss', 'cms_fs_2026'],
});
