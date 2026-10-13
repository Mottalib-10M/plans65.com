import { defineGuide } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';
import type { Path } from '../../lib/engine/medicare';

const base = { year: 2027 as const, magi: 70000, filing: 'single' as const, moop: 5900, annualDrugCost: 3600, insulinMonths: 0 };
const run = (path: Path, planPremium: number, medigapPremium: number, partBServices: number, admissions: number) => K.year({ ...base, path, planPremium, medigapPremium, partBServices, admissions });
const quiet = { ma: run('ma', 0, 0, 2500, 0), orig: run('original', 36, 0, 2500, 0), g: run('medigapG', 36, 165, 2500, 0), hd: run('medigapHDG', 36, 55, 2500, 0) };
const bad = { ma: run('ma', 0, 0, 60000, 2), orig: run('original', 36, 0, 60000, 2), g: run('medigapG', 36, 165, 60000, 2), hd: run('medigapHDG', 36, 55, 60000, 2) };
const rich = K.year({ ...base, magi: 180000, path: 'ma', planPremium: 0, medigapPremium: 0, partBServices: 2500, admissions: 0 });
const row = (l: string, a: { total: number }, b: { total: number }) => [l, K.usd(a.total), K.usd(b.total)];

export default defineGuide({
  id: 'annual-cost-calculator',
  group: 'costs',
  order: 60,
  slug: 'annual-cost-calculator',
  nav: 'Whole-year cost calculator',
  card: 'Premiums, IRMAA, care and drugs for 2026 or 2027, four routes compared',
  title: 'Medicare Cost Calculator 2027: What You Will Pay This Year',
  description: `Medicare cost calculator for 2026 and 2027: Part B, IRMAA, plan or Medigap premiums, care up to the cap and drugs up to ${K.usd(K.P.partD['2027'].oopCap)}, in one yearly total for you.`,
  h1: 'How much will Medicare cost you this year?',
  intro: 'Choose a route, enter your income and your expected care and drugs: the total adds every premium and every share you would pay.',
  resume: `What Medicare costs in a year is the sum of five pieces: the Part B premium (${K.cents(K.P.partB['2026'].premium)} a month in 2026, projected at ${K.cents(K.P.partB['2027'].premium)} for 2027), any income-related adjustment if your income two years earlier passed the IRMAA thresholds, the premium of your plan or of your Medigap and drug policies, your share of medical care, and your share of drug costs. The route you choose moves the last three. With Original Medicare alone, medical cost sharing has no ceiling; a Medicare Advantage plan caps it at its in-network maximum; Medigap Plan G leaves only the Part B deductible. Drugs are capped at ${K.usd(K.P.partD['2027'].oopCap)} in 2027 on every route that includes Part D. For a single person with ${K.usd(base.magi)} of income, ${K.usd(base.annualDrugCost)} of drugs a year and a quiet year of care, a $0 Advantage plan comes to ${K.usd(quiet.ma.total)} in 2027 and Medigap G with a drug plan to ${K.usd(quiet.g.total)}; in a year with two hospital stays the order can flip.`,
  body: (h) => `
<h2>Four routes, two kinds of years</h2>
${h.table(['2027, single, $70,000 income, $300/month of drugs', 'Quiet year', 'Hard year'], [
  row('$0 Advantage plan, cap $5,900', quiet.ma, bad.ma),
  row('Original Medicare + $36 drug plan', quiet.orig, bad.orig),
  row('Medigap G at $165 + $36 drug plan', quiet.g, bad.g),
  row('High-deductible G at $55 + $36 drug plan', quiet.hd, bad.hd),
], 'Quiet year: $2,500 of approved care, no admission. Hard year: $60,000 of approved care and two admissions. Part B at the Trustees’ 2027 projection; premiums of plans and Medigap are example inputs, not prices of a given insurer.', ['l', 'r', 'r'])}
<p>The table shows the pattern the calculator reproduces with your figures. In a quiet year, the routes with the lowest premiums win: the $0 Advantage plan and Original Medicare cost little more than the Part B premium and the drugs. In a hard year, Original Medicare alone is the most expensive by far, because the 20% has no limit; the Advantage plan stops at its cap; Plan G is the most predictable, since almost everything is covered after the Part B deductible. The Medigap and drug-plan premiums here are examples: Medigap prices depend on your state, age and ZIP code, so enter the quotes you receive.</p>
${h.mini('zeroTrue')}
<h2>How each piece is computed</h2>
<h3>Part B and IRMAA</h3>
<p>The Part B premium for 2026 is the CMS figure; for 2027 the calculator uses the Trustees' projection and says so. If your modified adjusted gross income two years earlier is above the first threshold, it adds the Part B and Part D adjustments of your bracket: with ${K.usd(180000)} of income instead of ${K.usd(base.magi)}, the same quiet year in the $0 plan costs ${K.usd(rich.total)} instead of ${K.usd(quiet.ma.total)}. The ${h.a('irmaa-brackets', 'IRMAA page')} has the brackets.</p>
<h3>Medical care</h3>
<p>Enter the Medicare-approved value of the care you expect, not what a hospital lists as its price. For Original Medicare, the calculator applies the Part B deductible and 20%, plus the Part A deductible for each admission. For an Advantage plan, it applies the same amounts up to the plan's cap, because the CMS landscape file gives the cap but not each copay; real plans charge more for some services and less for others, so the cap is the only figure you can rely on in a bad year. For Medigap G, only the Part B deductible remains; for high-deductible G, everything up to its deductible of ${K.usd(K.P.medigap.hdDeductible['2027'])} in 2027.</p>
<h3>Late penalties</h3>
<p>If you already pay a Part B or Part D late enrollment penalty, it comes on top of every route, for as long as you keep that coverage, and it rises when the premium it is based on rises. The ${h.a('late-enrollment-penalty', 'penalty calculator')} gives the monthly amount to add.</p>
<h3>Drugs</h3>
<p>Enter the full price of your drugs per month. The calculator applies the 2027 standard Part D benefit: deductible, 25% coinsurance, and the yearly cap. A plan with a lower deductible or flat copays can cost less; the ${h.a('part-d-deductible', 'Part D calculator')} lets you enter a plan's own deductible.</p>
${h.mini('capVsOriginal')}
<h2>2026 or 2027: what moves between the two years</h2>
<p>The year switch at the top changes four things at once. The Part B premium and deductible move from the final 2026 amounts to the Trustees' 2027 projection. The Part A deductible follows the same projection. The high-deductible Medigap threshold rises to the amount CMS announced for 2027. The IRMAA bracket is read from the return of two years earlier, 2024 for 2026 and 2025 for 2027, with the 2026 income limits kept for 2027 until CMS publishes the new ones. The drug side always uses the 2027 Part D rules, the year people are choosing plans for during this open enrollment.</p>
<p>Plan premiums and caps do not change with the switch: they are what you type, and the county lists show the 2027 values filed with CMS. To see how a plan changed, compare its 2027 line with the 2026 premium shown under its name in the finder.</p>
<h2>Reading the result</h2>
<p>Two numbers matter: the expected total, and the worst case for medical care shown on the last line. A route with a lower expected total and a much higher worst case is a bet on your health. People with a chronic illness, a planned surgery or simply a low tolerance for surprise often prefer paying a known premium to lower the worst case. To compare two specific Advantage plans of your county with the same inputs, use the ${h.a('compare-plans', 'two-plan comparator')}, which reads each plan's premium, cap and drug deductible from the CMS file.</p>
`,
  faqs: [
    { q: 'How much does Medicare cost per month in 2027?', a: `At least the Part B premium, projected at ${K.cents(K.P.partB['2027'].premium)} a month for 2027 by the Trustees until CMS publishes the final amount, plus any plan, Medigap or drug plan premium and IRMAA if your 2025 income is high. Care and drug costs come on top, up to the caps of your coverage: the calculator adds everything for your case.` },
    { q: 'Is Medicare Advantage or Medigap cheaper over a year?', a: 'It depends on the year you have. With little care, a low-premium Advantage plan is usually cheaper, because Medigap premiums are paid every month. With heavy care, Medigap Plan G limits your medical costs to the Part B deductible while an Advantage plan stops at its cap, which can be several thousand dollars. Run both routes with your own figures.' },
    { q: 'What medical cost should I enter in the Medicare cost calculator?', a: 'The Medicare-approved value of the care you expect over the year: a few hundred dollars for annual checkups, a few thousand with regular specialist visits and tests, tens of thousands for a surgery, chemotherapy or dialysis. Your past Medicare Summary Notices or plan statements show the approved amounts of earlier years.' },
    { q: 'Does the calculator include dental, vision or hearing costs?', a: 'No. Original Medicare does not cover routine dental, vision or hearing aids, and Advantage plans that add them describe the benefit in their Summary of Benefits, which the CMS landscape file does not include. Add your expected costs for these separately when you compare routes.' },
  ],
  tool: 'year-cost',
  related: ['compare-plans', 'medigap', 'irmaa-brackets', 'part-d-deductible', 'zero-premium-plans'],
  sources: ['cms_fs_2026', 'trustees_2026', 'ann_2027', 'cms_medigap_hd_2027', 'cms_landscape'],
});
