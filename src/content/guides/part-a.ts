import { defineGuide } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const A = K.P.partA['2026'];
const A27 = K.P.partA['2027'];
const s75 = K.stay(75, 0, 2026);
const rehab = K.stay(5, 30, 2026);
const two = K.stay(4, 0, 2026).hospital * 2;

export default defineGuide({
  id: 'part-a',
  group: 'costs',
  order: 50,
  slug: 'part-a',
  nav: 'Part A costs 2026',
  card: 'Hospital deductible, daily coinsurance, nursing facility days, premium',
  title: 'Medicare Part A 2026: $1,736 Deductible, Hospital Day Costs',
  description: `Medicare Part A 2026: ${K.usd(A.deductible)} deductible per benefit period, ${K.usd(A.coin61)} a day from day 61, ${K.usd(A.coinLR)} on reserve days, ${K.usd(A.snf)} a day in skilled nursing from day 21 on.`,
  h1: 'Medicare Part A in 2026: what a hospital or nursing stay costs you',
  intro: 'Enter the days of a stay: the calculator applies the 2026 Part A deductible and daily amounts, and flags the days Medicare stops paying.',
  resume: `Part A, the hospital insurance of Medicare, is free for about 99% of people because they or a spouse paid Medicare taxes for at least 40 quarters; others pay ${K.usd(A.premiumReduced)} or ${K.usd(A.premiumFull)} a month in 2026. Free does not mean without cost sharing. For each benefit period, you pay a deductible of ${K.usd(A.deductible)} in 2026, which covers days 1 to 60 of a hospital stay; then ${K.usd(A.coin61)} a day for days 61 to 90, and ${K.usd(A.coinLR)} a day for each of 60 lifetime reserve days. In a skilled nursing facility after a qualifying hospital stay, days 1 to 20 cost nothing and days 21 to 100 cost ${K.usd(A.snf)} a day; after day 100, nothing is covered. A benefit period ends after 60 days in a row without hospital or skilled nursing care, so two admissions in one year can mean two deductibles. Medigap and Advantage plans change these amounts: the calculator shows Original Medicare alone.`,
  body: (h) => `
<h2>The 2026 amounts, and the projection for 2027</h2>
${h.table(['Part A', '2026', '2027 (projected)'], [
  ['Deductible per benefit period', K.usd(A.deductible), K.usd(A27.deductible)],
  ['Hospital, days 61 to 90, per day', K.usd(A.coin61), K.usd(A27.coin61)],
  ['Lifetime reserve days, per day', K.usd(A.coinLR), K.usd(A27.coinLR)],
  ['Skilled nursing, days 21 to 100, per day', K.cents(A.snf), K.cents(A27.snf)],
  ['Premium with 30 to 39 quarters', K.usd(A.premiumReduced), K.usd(A27.premiumReduced)],
  ['Premium with fewer than 30 quarters', K.usd(A.premiumFull), K.usd(A27.premiumFull)],
], `2026: ${h.src('cms_fs_2026', 'CMS fact sheet, November 14, 2025')}. 2027: ${h.src('trustees_2026', '2026 Trustees Report, intermediate estimates')}, not final until CMS publishes them.`, ['l', 'r', 'r'])}
<h2>The benefit period, the rule that surprises people</h2>
<p>The Part A deductible is not yearly. It applies per benefit period, which starts the day you are admitted as an inpatient and ends once you have spent 60 consecutive days out of the hospital and out of skilled nursing care. Two short admissions three months apart are two benefit periods, so two deductibles: ${K.usd(two)} in 2026 for two four-day stays. Two admissions three weeks apart fall in the same period, with one deductible. The calendar year does not reset anything: a stay that runs from December into January counts as one period.</p>
${h.mini('stay')}
<h3>Long stays</h3>
<p>Under Original Medicare alone, a 75-day stay costs ${K.usd(s75.hospital)} in 2026: the deductible plus fifteen days at ${K.usd(A.coin61)}. Beyond day 90, each day draws on 60 lifetime reserve days at ${K.usd(A.coinLR)} a day; once they are used, they never come back, and the following days are not covered at all, whatever the reason for the stay. Medigap policies cover these daily amounts and add 365 extra hospital days, which is why even the basic Plan A of Medigap is built around them.</p>
<h2>Skilled nursing after a hospital stay</h2>
<p>Part A pays for a skilled nursing facility only after an inpatient hospital stay of at least three days, counting the day of admission but not the day of discharge, and only for daily skilled care such as rehabilitation therapy or wound care. Days spent "under observation" in the hospital are outpatient days and do not count toward the three, a frequent source of unexpected bills: ask the hospital about your status. A five-day hospital stay followed by thirty days of rehabilitation costs ${K.usd(rehab.total)} in 2026 under Original Medicare alone. Custodial care, help with bathing or dressing in a nursing home, is not covered at any point.</p>
<h2>What a hospital bill contains besides Part A</h2>
<p>The Part A deductible covers the hospital's own charges for a stay: the room, meals, nursing, drugs given during the stay and the operating room. The doctors who treat you in the hospital, the surgeon, the anesthesiologist, the radiologist reading your scan, bill separately under Part B. Their fees go through the Part B deductible and the 20% coinsurance, without a cap under Original Medicare. A surgical stay therefore produces two kinds of bills, and the Part B part can exceed the Part A deductible. The ${h.a('part-b', 'Part B guide')} explains that side.</p>
<h3>Inpatient or outpatient: ask on day one</h3>
<p>Whether you are an inpatient decides which part pays and how much you owe. Under observation, even overnight in a regular room, you are an outpatient: Part B rules apply to each service, the drugs you usually take at home may not be covered, and the days do not count toward the three needed for skilled nursing. Hospitals must give a written notice when you stay more than 24 hours under observation; read it, and ask whether a doctor has written an inpatient admission order.</p>
<h2>Who pays a Part A premium</h2>
<p>People with 40 quarters of Medicare-covered work, or whose spouse has them, pay no premium. With 30 to 39 quarters, the 2026 premium is ${K.usd(A.premiumReduced)} a month; with fewer, ${K.usd(A.premiumFull)}. Buying Part A late can also trigger a penalty for premium-paying enrollees. Those who would pay the full premium should compare carefully: some states help through Medicare Savings Programs, and the ${h.a('eligibility', 'eligibility page')} explains how quarters are counted.</p>
<h2>Part A inside a Medicare Advantage plan</h2>
<p>An Advantage plan replaces these amounts with its own: often a daily copay for the first days of a hospital stay and a different schedule for skilled nursing, all counted toward the plan's in-network out-of-pocket cap. Some plans drop the three-day hospital requirement before skilled nursing. The plan's Summary of Benefits states its hospital and nursing copays; the county lists of this site give each plan's cap, the figure that limits a long stay.</p>
`,
  faqs: [
    { q: 'What is the Medicare Part A deductible for 2026?', a: `${K.usd(A.deductible)} per benefit period, up from the 2025 amount, according to CMS. It covers your share of the first 60 days of an inpatient hospital stay. A new benefit period, and a new deductible, starts if you are admitted again after 60 days in a row out of the hospital and out of skilled nursing care.` },
    { q: 'How many days does Medicare pay for in a skilled nursing facility?', a: `Up to 100 days per benefit period, after a qualifying inpatient hospital stay of at least three days. Days 1 to 20 cost nothing; days 21 to 100 cost ${K.cents(A.snf)} a day in 2026. From day 101, Original Medicare pays nothing, and custodial care is never covered.` },
    { q: 'Do I have to pay a premium for Medicare Part A?', a: `Not if you or your spouse worked at least 40 quarters in jobs that paid Medicare taxes, which is the case of about 99% of people with Medicare. Otherwise, the 2026 premium is ${K.usd(A.premiumReduced)} a month with 30 to 39 quarters and ${K.usd(A.premiumFull)} a month with fewer than 30.` },
    { q: 'What are Medicare lifetime reserve days?', a: `Sixty extra hospital days you can use, once in your life, after day 90 of a benefit period. Each costs ${K.usd(A.coinLR)} in 2026 under Original Medicare. Once used, they are gone for good. Medigap policies pay this coinsurance and add up to 365 more hospital days.` },
  ],
  tool: 'part-a',
  related: ['part-b', 'medigap', 'annual-cost-calculator', 'eligibility'],
  sources: ['cms_fs_2026', 'trustees_2026'],
});
