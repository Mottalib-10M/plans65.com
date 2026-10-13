import { defineGuide } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const B = K.P.partB;
const b26 = B['2026'], b27 = B['2027'];
const I = K.P.irmaa['2026'];
const rise = b26.premium - b26.prev.premium;
const hist = Object.entries(B.history).filter(([y]) => y !== 'src') as Array<[string, number]>;

export default defineGuide({
  id: 'part-b-premium',
  group: 'costs',
  order: 10,
  slug: 'part-b-premium',
  nav: 'Part B premium 2026',
  card: 'The $202.90 premium, the $283 deductible and the 2027 projection',
  title: 'Medicare Part B Premium 2026: $202.90 a Month, 2027 Outlook',
  description: `Medicare Part B premium 2026: ${K.cents(b26.premium)} a month, deductible ${K.usd(b26.deductible)}, more above ${K.usd(I.single[0])} of income. The 2027 figure is projected at ${K.cents(b27.premium)} until CMS decides.`,
  h1: 'The Medicare Part B premium for 2026, and what 2027 may bring',
  intro: `${K.cents(b26.premium)} a month for most people in 2026, up ${K.cents(rise)} from 2025: the calculator adds the deductible, the 20% and your income bracket.`,
  resume: `The standard Medicare Part B premium is ${K.cents(b26.premium)} a month in 2026, up ${K.cents(rise)} from ${K.cents(b26.prev.premium)} in 2025, and the yearly Part B deductible is ${K.usd(b26.deductible)}, up from ${K.usd(b26.prev.deductible)}, according to the CMS fact sheet of November 14, 2025. After the deductible you pay 20% of the Medicare-approved amount for most doctor visits, outpatient care and medical equipment, with no yearly cap unless you have a Medigap policy or a Medicare Advantage plan. People whose modified adjusted gross income on their 2024 return was above ${K.usd(I.single[0])} (single) or ${K.usd(I.joint[0])} (joint) pay more, up to ${K.cents(b26.premium + I.partB[5])}. Everyone on Part B pays this premium, including members of $0 Advantage plans. For 2027, CMS will publish the amounts in November; the 2026 Trustees Report projects ${K.cents(b27.premium)} and a deductible of ${K.usd(b27.deductible)}.`,
  body: (h) => `
<h2>The 2026 amounts, as CMS published them</h2>
${h.table(['Part B, 2026', 'Amount', '2025'], [
  ['Standard monthly premium', K.cents(b26.premium), K.cents(b26.prev.premium)],
  ['Yearly deductible', K.usd(b26.deductible), K.usd(b26.prev.deductible)],
  ['Coinsurance after the deductible', '20%', '20%'],
  ['Premium for immunosuppressive drug coverage only', K.cents(b26.immunoPremium), ''],
  ['Highest premium with IRMAA', K.cents(b26.premium + I.partB[5]), ''],
], `Source: ${h.src('cms_fs_2026', 'CMS fact sheet, November 14, 2025')}.`, ['l', 'r', 'r'])}
<p>CMS explains the ${K.cents(rise)} increase by projected price changes and growth in the use of services, and notes that without the payment changes it made for skin substitutes in the 2026 physician fee schedule, the rise would have been about $11 a month higher. The premium is set each year so that enrollees' premiums cover about a quarter of Part B spending, the rest coming from general federal revenue.</p>
${h.table(['Year', 'Standard premium'], hist.map(([y, p]) => [y, K.cents(p)]), `Historical standard premiums, ${h.src('trustees_2026', '2026 Trustees Report, Table V.E2')}.`, ['l', 'r'])}
<h2>How the premium is paid</h2>
<p>If you receive Social Security or Railroad Retirement benefits, the premium is taken from the monthly payment, so the January deposit is the first place the new amount shows. If you do not draw benefits yet, Medicare sends a bill every three months, payable online, by bank debit or by mail. Some states pay the premium for people with limited income and savings through the Medicare Savings Programs; your state Medicaid office handles the application.</p>
<h3>The hold-harmless rule</h3>
<p>For most people whose premium is deducted from Social Security, the law limits the dollar increase in the Part B premium to the dollar increase in their benefit from the cost-of-living adjustment, so the net check does not go down. The Trustees estimate that this protection applies to roughly 70% of Part B enrollees. It does not apply to people who pay IRMAA, to new enrollees in their first year, or to people whose state pays their premium.</p>
${h.mini('partB2027')}
<h2>2027: a projection, not a price</h2>
<p>CMS normally announces the next year's Part B premium and deductible in November. Until then the only official figure is the projection of the ${h.src('trustees_2026', '2026 Trustees Report')}: ${K.cents(b27.premium)} a month and a deductible of ${K.usd(b27.deductible)}, published before the actual 2027 spending estimates were final. This site labels every 2027 Part B result as projected and will switch to the final amount the day CMS publishes it.</p>
<h2>Situations that change what you pay</h2>
<h3>You still work at 65</h3>
<p>If you or your spouse are covered by a group health plan through current employment, you can delay Part B without penalty and enroll later during a special enrollment period that lasts eight months after the job or the coverage ends (${h.src('cfr_407_20', '42 CFR 407.20')}). Retiree coverage, COBRA and individual marketplace plans do not count as current employment: delaying Part B on them leads to the late penalty described in ${h.a('late-enrollment-penalty', 'the penalty guide')}.</p>
<h3>Your income dropped</h3>
<p>The income-related amount is based on the tax return from two years earlier. After retirement, a divorce or the death of a spouse, Social Security can use a more recent year if you ask with form SSA-44; the ${h.a('irmaa-appeal', 'IRMAA appeal guide')} explains which events qualify and what evidence to send.</p>
<h3>Your state pays it</h3>
<p>With limited income and savings, a Medicare Savings Program run by your state can pay the Part B premium and sometimes the deductible and the 20%. Qualifying also gives you Extra Help for drugs automatically. Income and asset limits are set by each state within federal rules; your state Medicaid office or the State Health Insurance Assistance Program can tell you whether you qualify.</p>
<h3>You signed up late</h3>
<p>A late enrollment penalty adds 10% of the standard premium for each full twelve months you could have had Part B and did not, for as long as you keep Part B. Two full years of delay add 20%, or ${K.cents(K.penaltyB(24, 2026).monthly)} a month at the 2026 premium, and the surcharge grows every time the standard premium does.</p>
<h2>Premium, deductible and 20%: the year in one figure</h2>
<p>The premium is only the fixed part. With ${K.usd(3000)} of Medicare-approved outpatient care in 2026, Original Medicare without a supplement leaves ${K.usd(b26.deductible)} of deductible plus 20% of the remaining ${K.usd(3000 - b26.deductible)}, so ${K.usd(K.original({ partBServices: 3000, admissions: 0 }, 2026).partB)}, on top of ${K.usd(b26.premium * 12)} of premiums. With ${K.usd(40000)} of care, a cancer treatment year for instance, the 20% alone reaches ${K.usd(K.original({ partBServices: 40000, admissions: 0 }, 2026).partB)}: the reason so few people keep Part B without either Medigap or an Advantage plan. The calculator above does this sum for your figures, including your income bracket.</p>
`,
  faqs: [
    { q: 'How much is the Medicare Part B premium in 2026?', a: `The standard Part B premium is ${K.cents(b26.premium)} a month in 2026, up from ${K.cents(b26.prev.premium)} in 2025, according to CMS. People with a 2024 modified adjusted gross income above ${K.usd(I.single[0])} single or ${K.usd(I.joint[0])} joint pay an income-related amount on top, for a total of up to ${K.cents(b26.premium + I.partB[5])} a month.` },
    { q: 'What is the Part B deductible for 2026?', a: `${K.usd(b26.deductible)} for the year, up from ${K.usd(b26.prev.deductible)} in 2025. You pay Medicare-approved Part B costs in full until you reach it, then generally 20% of the approved amount. Medigap Plan G does not pay this deductible; Advantage plans set their own cost sharing instead of the deductible and the 20%.` },
    { q: 'What will the Part B premium be in 2027?', a: `CMS has not published it yet and normally does so in November. The 2026 Medicare Trustees Report projects ${K.cents(b27.premium)} a month and a deductible of ${K.usd(b27.deductible)} for 2027. These are projections made in the spring, and the final figures can differ.` },
    { q: 'Do I pay the Part B premium if I have a $0 Medicare Advantage plan?', a: 'Yes. Joining an Advantage plan does not replace Part B; you must stay enrolled in Part B and keep paying its premium. A $0 plan only means the plan adds no premium of its own. Some plans, often called giveback plans, reduce the Part B premium by an amount stated in their benefits.' },
    { q: 'Why did my Part B premium go up more than the standard increase?', a: 'Usually because of IRMAA, based on income two years earlier, or because the hold-harmless protection does not cover you: it does not apply in your first year of benefits, if you pay IRMAA, or if your premium is not deducted from Social Security. A late enrollment penalty also raises the premium by 10% per full year of delay.' },
  ],
  tool: 'part-b',
  related: ['irmaa-brackets', 'part-b', 'annual-cost-calculator', 'zero-premium-plans', 'late-enrollment-penalty'],
  sources: ['cms_fs_2026', 'trustees_2026', 'ssa_poms_irmaa'],
});
