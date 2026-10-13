import { defineGuide } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';
import { STATE_LIST } from '../../lib/data';

const D = K.P.partD['2027'];
const D26 = K.P.partD['2026'];
const n = K.nat;
const rows = STATE_LIST.map((s) => K.state(s.slug));
const cheapest = [...rows].sort((a, b) => (a.pdpMin ?? 9e9) - (b.pdpMin ?? 9e9))[0];
const dearest = [...rows].sort((a, b) => (b.pdpMed ?? 0) - (a.pdpMed ?? 0))[0];
const ded700 = (n.pdpDed.find(([d]) => d === D.deductible) ?? [0, 0])[1];

export default defineGuide({
  id: 'part-d-plans',
  group: 'plans',
  order: 10,
  slug: 'part-d-plans',
  nav: 'Part D drug plans 2027',
  card: 'Every stand-alone drug plan by state, premium and deductible',
  title: 'Medicare Part D Plans 2027: Every Drug Plan by State',
  description: `Medicare Part D plans for 2027: ${n.pdp} stand-alone drug plans in the CMS file, ${n.pdp26} in 2026, a ${K.usd(D.deductible)} standard deductible and a ${K.usd(D.oopCap)} cap on yearly drug costs.`,
  h1: 'Medicare Part D drug plans for 2027, state by state',
  intro: `Pick a state: every stand-alone drug plan filed for 2027 appears with its monthly premium, its deductible and its 2027 star rating.`,
  resume: `Medicare Part D is the drug coverage of Medicare, sold by private plans in two forms: stand-alone prescription drug plans (PDPs), which you add to Original Medicare, and the drug coverage built into most Medicare Advantage plans (MA-PDs). For 2027, insurers filed ${n.pdp} stand-alone plan versions across the regions drawn by CMS (a region is one state or a group of small states), down from ${n.pdp26} in 2026; a given state usually has between eight and twelve. Whatever the plan, the 2027 rules cap what you pay at the pharmacy at ${K.usd(D.oopCap)} a year, after a deductible of at most ${K.usd(D.deductible)} and 25% coinsurance in between. Premiums are where plans differ most: CMS projects an average stand-alone premium of ${K.cents(D.avgPdpPremium)} a month in 2027, while the drug part of Advantage plans averages ${K.cents(D.avgMapdDrugPremium)}. The table above lists every plan of the chosen state, cheapest first.`,
  body: (h) => `
<h2>Stand-alone plan or drug coverage inside an Advantage plan</h2>
<p>You cannot buy a stand-alone drug plan on top of most Medicare Advantage plans: if your Advantage plan includes drugs, joining a PDP ends the Advantage enrollment. A PDP makes sense with Original Medicare (with or without Medigap), with a Medicare Advantage plan that has no drug coverage of the PFFS or MSA type, or with a cost plan. People who keep Original Medicare because they travel or want any doctor who accepts Medicare need a PDP to avoid the late penalty described in ${h.a('late-enrollment-penalty', 'the penalty guide')}.</p>
<h2>2027: the year the premium subsidy ends</h2>
<p>From 2025 to 2026, CMS ran a premium stabilization demonstration that paid stand-alone plans a monthly amount to hold premiums down. In its ${h.src('cms_namba_2027', 'memo of July 28, 2026')}, CMS announced that the demonstration ends with 2026. The same memo set the national average monthly bid at ${K.cents(D.namba)} and the base beneficiary premium, used for late penalties, at ${K.cents(D.nbbp)} (${K.cents(D26.nbbp)} in 2026). In its ${h.src('cms_pr_2027', 'release of September 28, 2026')}, CMS projected the average total stand-alone premium to move from ${K.cents(D.avgPdpPremium26)} to ${K.cents(D.avgPdpPremium)}, and the drug premium of Advantage plans to fall from ${K.cents(D.avgMapdDrugPremium26)} to ${K.cents(D.avgMapdDrugPremium)} after rebates. Averages hide wide spreads: in ${cheapest.name} the cheapest stand-alone plan costs ${K.prem(cheapest.pdpMin)} a month, and in ${dearest.name} the median plan costs ${K.prem(dearest.pdpMed)}.</p>
${h.mini('drugQuick', { c: 350 })}
<h2>How to read a drug plan line</h2>
<p>The premium is what you pay each month whether or not you fill a prescription. The deductible is what you pay in full before the plan shares costs; ${ded700} of the ${n.pdp} stand-alone plan versions use the full ${K.usd(D.deductible)} standard deductible in 2027, the others set a lower one, sometimes on certain tiers only. "Basic" plans give the standard benefit or its actuarial equivalent; "enhanced" plans add coverage and usually cost more. A plan marked as a benchmark plan has a premium at or below the regional Extra Help amount: people with full Extra Help pay no premium there.</p>
<p>What the CMS file cannot tell you is the most important part: whether your drugs are on the plan's formulary, on which tier, with what restrictions (prior authorization, step therapy, quantity limits), and which pharmacies are preferred. Before choosing, look up your exact drugs in the plan's formulary or on Medicare.gov. Two plans with the same premium can produce very different bills for the same prescriptions.</p>
<h2>The ${K.usd(D.oopCap)} cap and the payment plan</h2>
<p>Every Part D plan, stand-alone or inside an Advantage plan, must stop charging you once your covered drug costs reach ${K.usd(D.oopCap)} in 2027 (${K.usd(D26.oopCap)} in 2026). The premium does not count toward that cap. If a large share of the cap falls due in January, the Medicare Prescription Payment Plan lets you pay it in monthly installments over the rest of the year, at no interest (${h.src('cfr_423_137', '42 CFR 423.137')}); the ${h.a('part-d-deductible', 'deductible and cap guide')} has the calculator.</p>
<h2>Extra Help and the $0 drug plan</h2>
<p>Extra Help, the low-income subsidy of Part D, pays all or part of the premium up to a regional amount and replaces the deductible and coinsurance with small copays: in 2027, at most ${K.cents(D.lisCopayGeneric)} for a generic and ${K.cents(D.lisCopayOther)} for a brand-name drug for most enrollees, less for people with full Medicaid and income at or below the poverty line. In each region, the basic plans priced at or below that amount are flagged in the CMS file as benchmark plans; people who have both Medicare and full Medicaid and no drug plan are assigned to one of them by CMS, as note 5 of the landscape file explains. The state pages show these plans, and the premium a full Extra Help enrollee would pay, from the same file. Resources count as well as income: the ${h.src('ann_2027', 'Rate Announcement')} gives a 2026 limit of ${K.usd(D.lisResources2026)} for a single person and ${K.usd(D.lisResources2026Couple)} for a couple, burial funds included; the 2027 limits follow a later CMS memo.</p>
<p>If your plan's line shows a premium above zero but you have Extra Help, the subsidy may still bring it to $0 or close: the column "low-income premium" of the landscape file, used on the state pages, is the amount you would actually pay. Switching to a non-benchmark plan is allowed, but you pay the difference.</p>
<h2>Every state at a glance</h2>
${h.table(['State', 'Stand-alone plans 2027', 'Lowest premium', 'Median premium', 'Plans in 2026'], rows.map((s) => [h.a(`state:${s.slug}`, s.name), s.pdp, K.prem(s.pdpMin), K.prem(s.pdpMed), s.pdp26]), 'Monthly premiums of the stand-alone plans filed for 2027, CMS landscape file of September 2026. Each state name opens the state page with the full list.', ['l', 'r', 'r', 'r', 'r'])}
`,
  faqs: [
    { q: 'How many stand-alone Part D plans are there for 2027?', a: `The CMS landscape file of September 2026 lists ${n.pdp} stand-alone plan versions for 2027, against ${n.pdp26} for 2026. Each version is sold in one PDP region, a state or a group of small states, so a single state usually sees between eight and twelve plans; the table on this page gives the exact count for yours.` },
    { q: 'Do I need a Part D plan if I have a Medicare Advantage plan with drug coverage?', a: 'No. An Advantage plan that includes drugs already gives you Part D coverage, and joining a separate stand-alone plan would end your Advantage enrollment. You need a stand-alone plan only with Original Medicare, a cost plan, or an Advantage plan without drug coverage such as a private fee-for-service or medical savings account plan.' },
    { q: 'Why did my Part D premium go up for 2027?', a: `CMS ended the premium stabilization demonstration that held stand-alone premiums down in 2025 and 2026, and the base beneficiary premium rose from ${K.cents(D26.nbbp)} to ${K.cents(D.nbbp)}. CMS still projects the average stand-alone premium to rise by less than a dollar, but individual plans can move much more in either direction.` },
    { q: 'Does the Part D premium count toward the $2,400 cap?', a: `No. The ${K.usd(D.oopCap)} yearly cap of 2027 counts what you pay for covered drugs: the deductible, coinsurance and copays. Premiums, drugs not on the formulary and drugs bought outside the plan do not count. Once the cap is reached, covered drugs cost you nothing for the rest of the calendar year.` },
    { q: 'Is the cheapest Part D plan the best one?', a: 'Only if it covers your drugs on a reasonable tier at a pharmacy you use. A low premium paired with a full deductible and your drugs on a high tier can cost more over a year than a plan with a higher premium. Add twelve months of premium to the drug cost the calculator gives you, plan by plan.' },
  ],
  tool: 'pdp',
  related: ['part-d-deductible', 'late-enrollment-penalty', 'annual-cost-calculator', 'compare-plans'],
  sources: ['cms_landscape', 'ann_2027', 'cms_namba_2027', 'cms_pr_2027', 'cfr_423_137'],
});
