import { defineGuide } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const I = K.P.irmaa['2026'];
const B = K.P.partB['2026'];
const P27 = K.P.irmaa['2027'];
const tot = (i: number) => K.cents(Math.round((B.premium + I.partB[i]) * 100) / 100);

export default defineGuide({
  id: 'irmaa-brackets',
  group: 'costs',
  order: 30,
  slug: 'irmaa-brackets',
  nav: 'IRMAA brackets 2026',
  card: 'Income limits, Part B and Part D surcharges, and your own tier',
  title: 'IRMAA Brackets 2026: Part B and D Surcharges by Income',
  description: `IRMAA brackets 2026 start at ${K.usd(I.single[0])} single and ${K.usd(I.joint[0])} joint (2024 income): Part B ${tot(1)} to ${tot(5)} a month, Part D +$14.50 to +$91. See your tier.`,
  h1: 'IRMAA brackets for 2026, and the tier your income lands in',
  intro: `Above ${K.usd(I.single[0])} of modified AGI on a single 2024 return (${K.usd(I.joint[0])} joint), Part B costs ${tot(1)} a month or more instead of ${K.cents(B.premium)}, and every drug plan premium gets a surcharge.`,
  resume: `IRMAA, the income-related monthly adjustment amount, raises the Part B and Part D premiums of people whose modified adjusted gross income passed ${K.usd(I.single[0])} on a single return or ${K.usd(I.joint[0])} on a joint return two years earlier: for 2026 the Social Security Administration reads the 2024 tax return. There are five tiers. At the first, Part B costs ${tot(1)} a month instead of the standard ${K.cents(B.premium)}, and ${K.cents(I.partD[1])} is added to whatever drug plan you have; at the fifth, from ${K.usd(I.single[4])} single or ${K.usd(I.joint[4])} joint, Part B reaches ${tot(5)} and the drug surcharge ${K.cents(I.partD[5])}. The tiers are cliffs: one dollar over a threshold triggers the whole surcharge for the year. Married people who file separately and lived together face a steeper scale, with the fourth tier from the first dollar above ${K.usd(I.separate[0])}. The calculator above applies the CMS and SSA tables to your own figure and shows how far you are from the next line.`,
  body: (h) => `
<h2>The 2026 table, as CMS and SSA publish it</h2>
${h.table(['Single return, 2024 MAGI', 'Joint return, 2024 MAGI', 'Part B per month', 'Part D surcharge'], [
  [`${K.usd(I.single[0])} or less`, `${K.usd(I.joint[0])} or less`, K.cents(B.premium), '$0'],
  [`over ${K.usd(I.single[0])} to ${K.usd(I.single[1])}`, `over ${K.usd(I.joint[0])} to ${K.usd(I.joint[1])}`, tot(1), K.cents(I.partD[1])],
  [`over ${K.usd(I.single[1])} to ${K.usd(I.single[2])}`, `over ${K.usd(I.joint[1])} to ${K.usd(I.joint[2])}`, tot(2), K.cents(I.partD[2])],
  [`over ${K.usd(I.single[2])} to ${K.usd(I.single[3])}`, `over ${K.usd(I.joint[2])} to ${K.usd(I.joint[3])}`, tot(3), K.cents(I.partD[3])],
  [`over ${K.usd(I.single[3])}, under ${K.usd(I.single[4])}`, `over ${K.usd(I.joint[3])}, under ${K.usd(I.joint[4])}`, tot(4), K.cents(I.partD[4])],
  [`${K.usd(I.single[4])} or more`, `${K.usd(I.joint[4])} or more`, tot(5), K.cents(I.partD[5])],
], `Sources: ${h.src('cms_fs_2026', 'CMS fact sheet of November 14, 2025')}; ${h.src('ssa_poms_irmaa', 'SSA POMS HI 01101.020')}. The Part D surcharge is added to the premium of your own drug plan or Advantage plan.`, ['l', 'l', 'r', 'r'])}
<p>The adjustment is not a tax and not a means test of your savings: it looks only at one line of income, two years back. Modified AGI here means adjusted gross income (line 11 of Form 1040) plus tax-exempt interest. Roth withdrawals do not count; a traditional IRA conversion, a large capital gain or the sale of a business in that year all do.</p>
${h.mini('irmaaCouple')}
<h2>Why 2024 decides your 2026 premium</h2>
<p>Social Security receives your tax data from the IRS in the fall and sends an initial determination letter, usually in November or December, before the year starts. When the 2024 return is not yet processed, SSA uses 2023 and corrects later. That lag is the trap of the first year of retirement: a last full salary, a severance package or a deferred bonus can place a new retiree in the third tier for a year when the paychecks have already stopped.</p>
<p>The law gives a way out. After a life-changing event (stopping work or cutting hours, marriage, divorce, the death of a spouse, the loss of a pension or of income-producing property), you can ask SSA to use a more recent year, or an estimate of the current one, with form SSA-44. The ${h.a('irmaa-appeal', 'IRMAA appeal page')} walks through the evidence SSA accepts.</p>
${h.mini('irmaaDrop')}
<h2>2027: what is known and what is not</h2>
<p>For 2027 the income year becomes 2025. CMS will publish the 2027 thresholds and amounts with the Part B premium, usually in November. The thresholds move with inflation, so they will be a little higher than the 2026 ones; the amounts follow the Part B premium. The ${h.src('trustees_2026', '2026 Trustees Report')} projects a standard Part B premium of ${K.cents(K.P.partB['2027'].premium)} and adjustments of ${K.cents(P27.partB[1])} at the first tier up to ${K.cents(P27.partB[5])} at the fifth. Those are projections: the calculator labels any 2027 result as such and keeps the 2026 income limits until CMS publishes the new ones.</p>
<h2>How the surcharge is collected</h2>
<p>Most people never write a check for IRMAA. When you receive Social Security or Railroad Retirement benefits, the Part B premium and both adjustments are taken from the monthly payment, so the first sign of a higher tier is a smaller deposit in January. People who have not claimed benefits yet receive a bill from Medicare, every month or every quarter, and can pay it online. The Part D adjustment goes to Medicare, not to the drug plan: paying the plan premium on time does not cover it, and an unpaid adjustment can end the drug coverage after the grace period.</p>
<h2>Couples, and the separate-return trap</h2>
<p>Each spouse on Medicare pays the adjustment separately, based on the joint income. A couple with a 2024 joint MAGI of $260,000 is in the first tier: each pays ${tot(1)} for Part B, so the household pays ${K.usd((I.partB[1] + I.partD[1]) * 24)} a year more than at $218,000. Filing separately does not help couples who lived together at any time in the year: SSA then applies its own scale, where every dollar above ${K.usd(I.separate[0])} puts a spouse straight into the fourth tier (${tot(4)}), and ${K.usd(I.separate[1])} or more into the fifth. A spouse who lived apart all year is treated as single.</p>
<h2>Ways people stay under a line</h2>
<ul>
<li>Spread a Roth conversion over several years so that each one keeps MAGI under the next threshold; the "room before the next bracket" line of the calculator gives the margin.</li>
<li>Give from an IRA directly to charity (a qualified charitable distribution) after age 70½: it never enters AGI.</li>
<li>Time a capital gain: one sale in a single year can move you up two tiers, while two halves in two years may move you none.</li>
<li>Remember the two-year lag when you plan: income earned at 63 sets the premiums at 65.</li>
</ul>
<p>The Part D surcharge applies even if your drug coverage comes inside a $0 Advantage plan: Social Security deducts it from your benefit or Medicare bills you directly. If you have no Part D coverage at all, there is nothing to surcharge, but a late penalty may wait for you later; see the ${h.a('late-enrollment-penalty', 'penalty calculator')}.</p>
`,
  faqs: [
    { q: 'What income does Social Security use for IRMAA in 2026?', a: `The modified adjusted gross income on your 2024 federal return: adjusted gross income plus tax-exempt interest. If SSA does not have the 2024 return yet, it uses 2023 and corrects when the 2024 data arrives. Single filers above ${K.usd(I.single[0])} and joint filers above ${K.usd(I.joint[0])} pay an adjustment.` },
    { q: 'I am $2,000 over an IRMAA threshold. Do I pay only on the extra $2,000?', a: `No. IRMAA brackets are cliffs: being one dollar above a threshold triggers the full adjustment of that tier for all twelve months. At the first tier that means ${K.cents(I.partB[1])} more for Part B and ${K.cents(I.partD[1])} more for Part D every month in 2026, about ${K.usd((I.partB[1] + I.partD[1]) * 12)} a year per person.` },
    { q: 'Do I pay the Part D IRMAA if my Advantage plan has a $0 premium?', a: `Yes, if your Advantage plan includes drug coverage. The Part D adjustment, from ${K.cents(I.partD[1])} to ${K.cents(I.partD[5])} a month in 2026, is owed to Medicare on top of the plan premium, whatever that premium is, and is usually deducted from your Social Security payment.` },
    { q: 'When will the 2027 IRMAA brackets be published?', a: `CMS publishes them with the 2027 Part B premium, usually in November of the year before. Until then only projections exist: the 2026 Trustees Report expects a standard premium of ${K.cents(K.P.partB['2027'].premium)} and first-tier adjustment of ${K.cents(P27.partB[1])}. The 2027 brackets will apply to income on 2025 returns.` },
    { q: 'Is IRMAA charged per couple or per person?', a: `Per person. Each spouse enrolled in Part B pays the adjustment that matches the couple's joint income. A married couple with $300,000 of joint MAGI in 2024 is in the second tier, so each spouse pays ${tot(2)} a month for Part B in 2026, and each drug plan carries ${K.cents(I.partD[2])} more.` },
  ],
  tool: 'irmaa',
  related: ['irmaa-appeal', 'part-b-premium', 'annual-cost-calculator', 'part-d-plans'],
  sources: ['cms_fs_2026', 'ssa_poms_irmaa', 'trustees_2026'],
});
