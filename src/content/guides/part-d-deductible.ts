import { defineGuide } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const D = K.P.partD['2027'];
const D26 = K.P.partD['2026'];
const breakEven = D.deductible + (D.oopCap - D.deductible) / D.coinsurance;
const ex = K.drug(6000);
const big = K.drug(30000);
const ded700 = (K.nat.pdpDed.find(([d]) => d === D.deductible) ?? [0, 0])[1];

export default defineGuide({
  id: 'part-d-deductible',
  group: 'plans',
  order: 20,
  slug: 'part-d-deductible',
  nav: 'Part D deductible and cap 2027',
  card: 'The $700 deductible, 25% coinsurance and the $2,400 cap, month by month',
  title: 'Part D Deductible 2027: $700, 25% Coinsurance, $2,400 Cap',
  description: `Part D deductible 2027: ${K.usd(D.deductible)} (was ${K.usd(D26.deductible)}), then 25% until you have paid ${K.usd(D.oopCap)}, then $0. See the month your drugs hit the cap and the payment plan amount.`,
  h1: 'The Part D deductible, coinsurance and yearly cap in 2027',
  intro: `Enter what your drugs cost each month: the calculator applies the 2027 standard benefit and shows when the ${K.usd(D.oopCap)} cap stops your spending.`,
  resume: `In 2027 the standard Part D benefit has three steps. You pay the full price of covered drugs until you reach the deductible of ${K.usd(D.deductible)}, up from ${K.usd(D26.deductible)} in 2026; then you pay 25% of the cost; and once your own spending reaches ${K.usd(D.oopCap)}, up from ${K.usd(D26.oopCap)}, you pay nothing more for covered drugs until December 31. These amounts come from Attachment V of the CMS Rate Announcement of April 6, 2026, and apply to every drug plan, stand-alone or inside a Medicare Advantage plan. A plan can be more generous, with a lower deductible or flat copays, but never less. With full-price drugs of ${K.usd(breakEven / 12)} a month or more, you reach the cap within the year. Covered insulin costs at most ${K.usd(D.insulinMonthly)} a month and skips the deductible, and recommended adult vaccines cost nothing.`,
  body: (h) => `
<h2>The three steps, in dollars</h2>
${h.table(['Step', '2026', '2027', 'What you pay'], [
  ['Deductible', K.usd(D26.deductible), K.usd(D.deductible), 'The full negotiated price'],
  ['Initial coverage', '25%', '25%', 'A quarter of the price, or the plan’s copay'],
  ['Out-of-pocket threshold', K.usd(D26.oopCap), K.usd(D.oopCap), 'Nothing after it, until December 31'],
], `Defined standard benefit. Source: ${h.src('ann_2027', 'CY 2027 Rate Announcement, Table V-2')}.`, ['l', 'r', 'r', 'l'])}
<p>The yearly cap is reached when your own payments (deductible plus coinsurance or copays) add up to ${K.usd(D.oopCap)}. Under the standard benefit that happens when the full price of your covered drugs reaches ${K.usd(breakEven)} for the year: ${K.usd(D.deductible)} paid in full, plus 25% of the next ${K.usd(breakEven - D.deductible)}. Someone whose drugs cost ${K.usd(6000)} a year pays ${K.usd(ex.oop)}; someone on a specialty drug costing ${K.usd(30000)} pays ${K.usd(big.oop)} and hits the cap in ${big.capMonth === 1 ? 'January' : `month ${big.capMonth}`}.</p>
${h.mini('drug2026')}
<h2>Your plan's own deductible</h2>
<p>The standard deductible is a maximum. In the 2027 landscape file, ${ded700} of the ${K.nat.pdp} stand-alone plan versions charge the full ${K.usd(D.deductible)}; the others charge less, and many Medicare Advantage plans charge $0 or apply the deductible only to brand-name tiers. A plan that "offers drug tiers with no deductible" covers its cheaper tiers from the first fill. Put your plan's figure in the second field of the calculator: it comes from the state or county list, in the column "Drug deductible".</p>
<p>Many plans replace the 25% with flat copays per tier, for instance a few dollars for a preferred generic and a percentage for specialty drugs. The calculator keeps the standard 25%, which is the legal benchmark: actual plans must be at least as generous on average, but a particular drug can cost you more or less than 25% in a particular plan. The plan's formulary and its Evidence of Coverage give the exact copay.</p>
<h3>When a lower deductible is worth a higher premium</h3>
<p>Compare twelve months of premium difference with the deductible saved. A plan that charges $25 a month more but has no deductible saves you up to ${K.usd(D.deductible)} at the pharmacy, against $300 of extra premiums: worth it only if your drugs cost at least that much in the first months. If you take one cheap generic, the deductible may never be reached on that drug, and the cheaper premium wins. If you will reach the ${K.usd(D.oopCap)} cap anyway, the deductible changes nothing to your yearly total: you pay the cap in every plan, and only the premium separates them.</p>
<h2>A large bill in January: the Medicare Prescription Payment Plan</h2>
<p>With an expensive drug, the cap can fall due almost entirely in the first months of the year. Since 2025 every Part D plan must offer the Medicare Prescription Payment Plan (${h.src('cfr_423_137', '42 CFR 423.137')}): instead of paying at the pharmacy, you receive a monthly bill from the plan that spreads your out-of-pocket costs over the remaining months of the year, with no interest and no fee. The total does not change; only the timing does. Joining in January spreads the year over twelve bills. Joining later in the year spreads what is left over fewer months, so it helps less.</p>
${h.mini('drugSmooth')}
<h2>Insulin, vaccines and Extra Help</h2>
<p>Each covered insulin product costs at most ${K.usd(D.insulinMonthly)} for a month's supply, whatever the plan and whether or not you have met the deductible; those payments count toward the cap. Adult vaccines recommended by the Advisory Committee on Immunization Practices, such as shingles and Tdap, cost nothing under Part D. People with Extra Help pay no deductible in 2027 and copays of at most ${K.cents(D.lisCopayGeneric)} for a generic or ${K.cents(D.lisCopayOther)} for a brand-name drug, or ${K.cents(D.lisCopayGenericLow)} and ${K.cents(D.lisCopayOtherLow)} with full Medicaid and income at or below the poverty line.</p>
${h.mini('snpDual')}
<h2>What never counts toward the cap</h2>
<ul>
<li>The monthly premium of the plan, and any IRMAA added to it.</li>
<li>Drugs that are not on your plan's formulary, unless the plan approved an exception.</li>
<li>Drugs bought outside the plan, for example with a discount card at a pharmacy, when the purchase is not submitted to the plan.</li>
<li>Drugs covered by Part B instead of Part D, such as many infusions given in a doctor's office: they follow the 20% rule of Part B, or your Advantage plan's medical cap.</li>
</ul>
<p>The cap resets every January 1. If you switch plans in the middle of the year, which is possible only with a special enrollment period, your spending already counted carries over to the new plan.</p>
`,
  faqs: [
    { q: 'What is the Part D deductible for 2027?', a: `The standard Part D deductible is ${K.usd(D.deductible)} in 2027, up from ${K.usd(D26.deductible)} in 2026, according to the CMS Rate Announcement of April 6, 2026. It is a maximum: your plan can set a lower deductible, apply it only to some tiers, or have none. Insulin is never subject to the deductible.` },
    { q: 'How much do I have to spend before Part D drugs become free in 2027?', a: `Your own spending on covered drugs must reach ${K.usd(D.oopCap)} in 2027 (${K.usd(D26.oopCap)} in 2026). Under the standard benefit, that happens when the full price of your covered drugs reaches about ${K.usd(breakEven)} for the year. After that, covered drugs cost you nothing until December 31; premiums are still due.` },
    { q: 'Does the Medicare Prescription Payment Plan lower what I pay for drugs?', a: 'No. It changes when you pay, not how much. Instead of paying the pharmacy, you get a monthly bill from your drug plan that spreads your yearly out-of-pocket cost evenly over the remaining months, with no interest or fees. It helps most when you join early in the year and expect to reach the cap quickly.' },
    { q: 'Is insulin capped at $35 under every Part D plan in 2027?', a: `Yes. For each covered insulin product, a month's supply costs at most ${K.usd(D.insulinMonthly)} under every Part D plan, stand-alone or inside a Medicare Advantage plan, and the deductible does not apply. What you pay for insulin counts toward the ${K.usd(D.oopCap)} yearly cap.` },
    { q: 'Do Part B drugs count toward the Part D cap?', a: 'No. Drugs that Part B covers, such as many infusions and injections given in a clinic, are paid under Part B: 20% coinsurance with Original Medicare and no yearly limit unless you have Medigap, or your Advantage plan’s cost sharing up to its medical out-of-pocket maximum. Only Part D drugs count toward the Part D cap.' },
  ],
  tool: 'part-d',
  related: ['part-d-plans', 'annual-cost-calculator', 'late-enrollment-penalty', 'compare-plans'],
  sources: ['ann_2027', 'cfr_423_137', 'cms_landscape'],
});
