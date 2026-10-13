import { defineGuide } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const I = K.P.irmaa['2026'];
const before = K.irmaa(190000, 'single');
const after = K.irmaa(85000, 'single');
const couple0 = K.irmaa(300000, 'joint');
const couple1 = K.irmaa(150000, 'single');

export default defineGuide({
  id: 'irmaa-appeal',
  group: 'costs',
  order: 40,
  slug: 'irmaa-appeal',
  nav: 'Lower IRMAA after retirement (SSA-44)',
  card: 'Life-changing events, form SSA-44 and when the new amount applies',
  title: 'IRMAA Appeal 2026: Form SSA-44 After Retirement or a Loss',
  description: `IRMAA appeal 2026: after retirement, divorce or a spouse’s death, ask SSA to use your newer, lower income with form SSA-44. The 8 qualifying events, evidence.`,
  h1: 'Lowering IRMAA after a life-changing event',
  intro: 'Enter the income Social Security used and your new income: the calculator shows the bracket each one puts you in for 2026.',
  resume: `Social Security sets IRMAA from your tax return of two years earlier, which can be badly out of date. If one of eight life-changing events reduced your income since then, you can ask for a "new initial determination" based on a more recent year, or on an estimate of the current one, instead of filing an appeal. The qualifying events listed in the SSA operations manual (POMS HI 01120.001) are the death of a spouse, marriage, divorce or annulment, a reduction of work, the end of work, the loss of income-producing property, the loss of an employer pension, and the receipt of a settlement payment from an employer. Retirement is the usual case: someone whose 2024 income was ${K.usd(190000)} pays ${K.cents(before.partBTotal)} a month for Part B in 2026, but at ${K.usd(85000)} of current income would pay the standard ${K.cents(after.partBTotal)}. The request is made with form SSA-44, or in person, with evidence of the event and of the new income.`,
  body: (h) => `
<h2>Two routes: new determination or appeal</h2>
<p>A new initial determination is a fresh decision using information you provide. It does not require showing that SSA made a mistake, and it is the right route when your income really dropped after one of the qualifying events (${h.src('ssa_poms_nid', 'POMS HI 01120.001')}). An appeal, by contrast, challenges the original decision, for example when the IRS data SSA used was wrong or belongs to someone else. You can do both at once if you are within the appeal deadline written on your notice.</p>
<p>Other situations also allow a new determination without any life-changing event: you filed an amended return for the year SSA used, the IRS information was wrong, or SSA used a return three years old when a two-year-old one now exists.</p>
<h2>The eight qualifying events</h2>
<ul>
<li>Death of your spouse.</li>
<li>Marriage.</li>
<li>Divorce or annulment.</li>
<li>Work reduction: fewer hours or a lower-paid job.</li>
<li>Work stoppage: retirement or leaving a job.</li>
<li>Loss of income-producing property, when the loss is not your choice (a disaster, theft, fraud).</li>
<li>Loss or reduction of an employer pension, for example when a plan ends or cuts benefits.</li>
<li>Receipt of a settlement payment from a current or former employer because of its closure, bankruptcy or reorganization.</li>
</ul>
<p>A large one-time gain you chose, such as selling a house or a business, or a Roth conversion, is not on the list. The income it creates stays on your return and counts for IRMAA two years later.</p>
${h.mini('irmaaDrop')}
<h2>What SSA asks for</h2>
<p>Two things: proof of the event, and the more recent income. For the event, a death certificate, a marriage or divorce decree, or a letter from your employer showing the date your work ended or your hours were cut. For the income, the federal tax return of the more recent year if you have filed it; if not, a signed estimate of your modified adjusted gross income for the current year, which SSA accepts under penalty of perjury and later checks against the IRS data (${h.src('ssa_poms_lce', 'POMS HI 01120.005')}). You can give a second estimate for the following year at the same time; if you do not, SSA reuses the first.</p>
<h3>When the lower amount starts</h3>
<p>If the event changed your income in the current year, the new determination applies from January of that year, or from the first month you had Part B or drug coverage if later, and SSA refunds the difference already paid. A request generally does not reach back to an earlier premium year, except when the event happened between October 1 and December 31 of the previous year and you ask by March 31.</p>
<h2>Couples: one request each</h2>
<p>A new determination applies only to the person who asks. If both spouses pay IRMAA, both must file. The case of a widow or widower shows why it matters: a couple with ${K.usd(300000)} of joint income in 2024 paid ${K.cents(couple0.partBTotal)} each for Part B; the surviving spouse, now filing as single with ${K.usd(150000)}, falls in the bracket that costs ${K.cents(couple1.partBTotal)} a month, but only once the change is reported. Filing status matters as much as income: the single brackets start at ${K.usd(I.single[0])}, half the joint threshold.</p>
<h2>Practical points</h2>
<ul>
<li>File as soon as the event happens and you can estimate the income: waiting until the following year does not increase the refund.</li>
<li>Keep a copy of everything you send and note the date; SSA field offices can take weeks to process.</li>
<li>If your estimate turns out too low, SSA corrects it when the IRS data arrives, and you may owe the difference. Estimate honestly, including required distributions from IRAs.</li>
<li>If SSA refuses the request, the decision letter explains how to ask for reconsideration and by when; a refusal on one year does not prevent a new request when your income changes again.</li>
<li>Check the result on your next benefit statement or premium bill. The ${h.a('irmaa-brackets', 'IRMAA brackets page')} gives the 2026 amounts for each tier.</li>
</ul>
`,
  faqs: [
    { q: 'Does retirement count as a life-changing event for IRMAA?', a: 'Yes. Stopping work, or reducing your hours, is one of the eight life-changing events Social Security accepts. You can ask SSA to use your current-year income, with an estimate if you have not filed yet, by sending form SSA-44 with proof of the date your work ended, such as a letter from your employer.' },
    { q: 'Can I lower IRMAA after selling a house or a business?', a: 'Not through a life-changing event request. A gain you chose to realize is not one of the qualifying events, so the income it adds counts for IRMAA two years later. Only if the IRS data SSA used is wrong, or you amended that return, can you ask for a new determination on another basis.' },
    { q: 'How long does a new IRMAA determination take to apply?', a: 'Once SSA processes the request, the new amount applies from January of the year your income changed, or from the start of your Part B or drug coverage that year, and the overpaid premiums are refunded or credited. Processing times vary by field office, so file as soon as you can document the event.' },
    { q: 'Do both spouses need to file form SSA-44?', a: 'Yes, if both pay IRMAA. A new initial determination applies only to the person who asks for it, even when the event, such as one spouse retiring, changes the joint income of both. Each spouse files separately, with the same evidence of the event and the same income figures.' },
  ],
  tool: 'irmaa',
  related: ['irmaa-brackets', 'part-b-premium', 'annual-cost-calculator', 'part-d-plans'],
  sources: ['ssa_poms_nid', 'ssa_poms_lce', 'ssa_poms_irmaa', 'cms_fs_2026'],
});
