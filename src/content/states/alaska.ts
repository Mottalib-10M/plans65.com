import { defineState } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const s = K.state('alaska');
const d = K.P.partD['2027'];
const gap = K.P.medigap.hdDeductible['2027'];

export default defineState({
  slug: 'alaska',
  title: `Medicare Advantage Plans Alaska 2027: None Filed, Options`,
  description: `Alaska has no Medicare Advantage plan for 2027: ${s.all} filed with CMS. What Alaskans use instead: Original Medicare, ${s.pdp} Part D plans from ${K.prem(s.pdpMin!)} and Medigap.`,
  intro: `Alaska is the one state where the 2027 Medicare Advantage list is empty, so every beneficiary builds coverage from Original Medicare, a drug plan and, often, a Medigap policy.`,
  resume: `No insurer filed a Medicare Advantage plan for Alaska for 2027: the CMS landscape file of September 2026 counts ${s.all} plans in the state, against ${K.num(K.nat.std)} open plans nationwide. Alaskans with Medicare therefore stay in Original Medicare, which pays doctors and hospitals directly and has no network and no annual ceiling on the ${K.pct(K.P.partB['2026'].coinsurance, 0)} coinsurance. Drug coverage comes from a separate Part D plan: ${s.pdp} stand-alone plans are sold statewide, with premiums from ${K.prem(s.pdpMin!)} to ${K.prem(s.pdpMax!)} a month and a median of ${K.prem(s.pdpMed!)}. The lowest premium belongs to ${s.pdpMinName}. For 2027, any Part D plan can charge a deductible of up to ${K.usd(d.deductible)} and your yearly drug spending stops at ${K.usd(d.oopCap)}. Most residents who want protection from large medical bills add a Medigap policy, bought privately and priced by the insurer.`,
  body: (h) => `
<h2>Building coverage without a private Medicare plan</h2>
<p>Because the CMS file holds no Alaska plan, the state has no network rules, no prior authorization from a private plan and no extra benefits such as dental or gym cards bundled with Medicare. Original Medicare covers hospital care under Part A and doctor visits under Part B anywhere in the country, which suits a state where specialty care often means flying to Anchorage or to Seattle. The weak point is cost: Part B leaves you ${K.pct(K.P.partB['2026'].coinsurance, 0)} of each approved bill with no limit, and a hospital stay starts with the Part A deductible of ${K.cents(K.P.partA['2026'].deductible)} in 2026.</p>
<h3>Three layers instead of one card</h3>
<ul>
<li>Parts A and B from the federal program, with the Part B premium of ${K.cents(K.P.partB['2026'].premium)} a month in 2026.</li>
<li>A stand-alone Part D plan from the ${s.pdp} listed below, chosen for your own drugs and pharmacy.</li>
<li>A Medigap policy, sold by private insurers, that pays some or all of the gaps Original Medicare leaves.</li>
</ul>
<h2>Picking an Alaska drug plan for 2027</h2>
<p>Premium is only the visible part. A plan priced at ${K.prem(s.pdpMin!)} may put your brand-name drug on a high tier or apply the full deductible, while a plan near ${K.prem(s.pdpMed!)} can lower both. The 2027 cap of ${K.usd(d.oopCap)} applies in every plan, and insulin is capped at ${K.usd(d.insulinMonthly)} a month. People who qualify for Extra Help can join any of the ${s.pdpBench} benchmark plans with no premium. Signing up late costs ${K.pct(K.P.periods.partDPenaltyPerMonth, 0)} of the national base premium per month without creditable coverage, for life: see ${h.a('late-enrollment-penalty', 'the late enrollment penalty')}.</p>
<h3>Medigap: the window that matters</h3>
<p>Your Medigap open enrollment lasts ${K.P.periods.medigapOpenMonths} months from the month you are 65 or older and enrolled in Part B. During that window an insurer cannot turn you down for a pre-existing health problem, and later you may not be able to buy a policy at all, or only at a higher price (${h.ext('https://www.medicare.gov/health-drug-plans/medigap/basics', 'Medicare.gov, Medigap basics')}). A high-deductible Plan G trades a lower premium for a ${K.usd(gap)} deductible in 2027. The calculator below weighs the two.</p>
${h.mini('hdg')}
<p>Alaska's free counseling service on Medicare, part of the national SHIP network, and 1-800-MEDICARE can walk you through the drug plan finder at no charge. Compare ${h.a('medigap-plan-g', 'Medigap Plan G')} prices from several insurers before the window closes.</p>
`,
  faqs: [
    { q: 'Can I join a Medicare Advantage plan if I live in Alaska in 2027?', a: `No plan is available to Alaska residents for 2027: the CMS landscape file of September 2026 lists none for the state. You stay in Original Medicare and can add a stand-alone Part D plan and a Medigap policy. If you move to another state, a move is a special enrollment period to join a plan there.` },
    { q: 'What is the cheapest Part D drug plan in Alaska for 2027?', a: `${s.pdpMinName} has the lowest monthly premium, ${K.prem(s.pdpMin!)}, among the ${s.pdp} stand-alone plans sold in Alaska. A low premium can come with a deductible of up to ${K.usd(d.deductible)} and higher copays on brand drugs, so compare your own prescriptions in the Plan Finder at Medicare.gov before you enroll.` },
    { q: 'Do Alaska retirees with Medicare need a Medigap policy?', a: `It is optional, but without one Original Medicare leaves ${K.pct(K.P.partB['2026'].coinsurance, 0)} of Part B bills with no yearly ceiling, plus the Part A deductible of ${K.cents(K.P.partA['2026'].deductible)} per benefit period in 2026. During the ${K.P.periods.medigapOpenMonths}-month Medigap open enrollment an insurer cannot deny you a policy because of a pre-existing health problem, according to Medicare.gov.` },
  ],
  related: ['state:washington', 'state:hawaii', 'part-d-plans', 'medigap-plan-g', 'late-enrollment-penalty', 'medigap'],
});
