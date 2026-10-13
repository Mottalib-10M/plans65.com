import { defineGuide } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const D = K.P.partD;
const B = K.P.partB['2026'];
const b30 = K.penaltyB(30, 2026), b11 = K.penaltyB(11, 2026), b60 = K.penaltyB(60, 2026);
const d20 = K.penaltyD(20, 2027), d20b = K.penaltyD(20, 2026), d48 = K.penaltyD(48, 2027);

export default defineGuide({
  id: 'late-enrollment-penalty',
  group: 'enroll',
  order: 30,
  slug: 'late-enrollment-penalty',
  nav: 'Late enrollment penalties',
  card: 'Part B 10% per full year, Part D 1% per month, and how to avoid both',
  title: 'Medicare Late Enrollment Penalty 2027: Part B and D Costs',
  description: `Medicare late enrollment penalty: Part B adds 10% per full year late (${K.cents(b30.monthly)} a month for 30 months in 2026), and Part D 1% of ${K.cents(D['2027'].nbbp)} per month in 2027.`,
  h1: 'Medicare late enrollment penalties for Part B and Part D',
  intro: 'Enter the months without coverage: the calculator gives the monthly surcharge on each part, which you would pay for as long as you keep that coverage.',
  resume: `Medicare charges two lifelong surcharges to people who sign up late without a valid reason. The Part B penalty adds 10% of the standard premium for each full twelve months you could have had Part B and did not (42 CFR 408.22): 30 months late count as ${b30.periods} full years, so ${K.pct(b30.pct, 0)} more, ${K.cents(b30.monthly)} a month on top of the 2026 premium of ${K.cents(B.premium)}. The Part D penalty adds 1% of the national base beneficiary premium for each full month without Part D or other creditable drug coverage after a gap of 63 days or more (42 CFR 423.286): with the 2027 base premium of ${K.cents(D['2027'].nbbp)}, twenty uncovered months add about ${K.cents(d20.monthly)} a month to any drug plan. Both penalties follow you for as long as you have the coverage, and both grow when the premium they are based on grows. Group coverage from current work, and drug coverage at least as good as Part D, protect you.`,
  body: (h) => `
<h2>Part B: 10% per full year</h2>
<p>The count starts at the end of your initial enrollment period, the seven months around your 65th birthday, and stops when Part B begins. Only full twelve-month periods count: 11 months late adds ${K.pct(b11.pct, 0)}, 30 months adds ${K.pct(b30.pct, 0)}, five years adds ${K.pct(b60.pct, 0)}, or ${K.cents(b60.monthly)} a month at the 2026 premium. Months during which you or your spouse had group health coverage from current employment do not count (${h.src('cfr_407_20', '42 CFR 407.20')}); months with retiree coverage, COBRA, an individual marketplace plan or VA care alone do count.</p>
${h.mini('penaltyB')}
<p>The penalty is a percentage, not a fixed amount: as the standard premium rises each year, so does the surcharge. And because late enrollees outside a special period can only sign up from January 1 to March 31, a late Part B often comes with months of no medical coverage at all before it starts.</p>
<h2>Part D: 1% per month</h2>
<p>The Part D penalty counts every full month, after your initial enrollment period, during which you went 63 days or more in a row without Part D or creditable drug coverage. Creditable means expected to pay at least as much as standard Part D: employer and union plans, TRICARE, VA drug benefits and the Federal Employees plans usually qualify, and they must tell you each year in writing. Each counted month adds 1% of the national base beneficiary premium (${h.src('cfr_423_286', '42 CFR 423.286(d)(3)')}), which is ${K.cents(D['2027'].nbbp)} in 2027 and was ${K.cents(D['2026'].nbbp)} in 2026 (${h.src('cms_namba_2027', 'CMS memo of July 28, 2026')}). Twenty months add about ${K.cents(d20.monthly)} a month in 2027 (${K.cents(d20b.monthly)} with the 2026 base), four years about ${K.cents(d48.monthly)}. The calculator rounds to the nearest ten cents.</p>
${h.mini('penaltyD')}
<p>The Part D penalty is recalculated each year with the new base premium and added to the premium of whatever drug plan you have, including the drug part of an Advantage plan. People who get Extra Help do not pay it.</p>
<h2>Two people, two penalties</h2>
<p>Consider a retiree who left a job at 66 with COBRA, kept it for eighteen months, then signed up for Part B and a drug plan. For Part B, the months at work did not count, but the months on COBRA do: eighteen months contain one full year, so 10% for life, and since the eight-month special period after the job ended was missed, Part B can only start after the general enrollment period. For Part D, COBRA drug coverage from a large employer is often creditable; if the notice confirms it, those months do not count, and only the gap between the end of COBRA and the new drug plan matters if it lasted 63 days or more. The same eighteen months can cost a penalty on one part and none on the other. Keep every coverage letter until you are sure no penalty applies.</p>
<h2>How to avoid both</h2>
<ul>
<li>Sign up for Part B during your initial enrollment period unless you or your spouse are covered by a group plan from current work; then sign up within eight months after that work or coverage ends.</li>
<li>Keep the yearly notice that says your employer drug coverage is creditable: you will need it to prove you owe no Part D penalty.</li>
<li>When you leave creditable drug coverage, join a Part D plan or an Advantage plan with drugs before 63 days have passed.</li>
<li>If you are told you owe a Part D penalty and believe you had creditable coverage, you can ask for a reconsideration, using the form your drug plan sends with the notice, within the deadline it gives.</li>
</ul>
<h2>Premium-free Part A and the other exceptions</h2>
<p>Part A has no penalty for people who get it free. Those who buy Part A because they lack 40 quarters of work can owe a 10% Part A surcharge for twice the number of years they delayed. Some states pay Part B penalties for people in a Medicare Savings Program, and SSA can waive a penalty when a federal employee's error caused the delay. The ${h.a('enrollment-periods', 'enrollment dates page')} lists the windows that keep you clear of all of this.</p>
`,
  faqs: [
    { q: 'How is the Medicare Part B late enrollment penalty calculated?', a: `It is 10% of the standard Part B premium for each full twelve months you could have had Part B but did not, counted from the end of your initial enrollment period. With two full years, you pay 20% more, ${K.cents(K.penaltyB(24, 2026).monthly)} a month on the 2026 premium, for as long as you have Part B.` },
    { q: 'How much is the Medicare Part D late penalty in 2027?', a: `1% of the national base beneficiary premium, ${K.cents(D['2027'].nbbp)} in 2027, for each full month you went without Part D or creditable drug coverage after a gap of 63 days or more. Twelve uncovered months add about ${K.cents(K.penaltyD(12, 2027).monthly)} a month to your drug plan premium in 2027.` },
    { q: 'Does the late enrollment penalty ever go away?', a: 'For Part B and Part D, generally no: you pay it for as long as you keep that coverage, and it rises with the premium it is based on. People under 65 with a disability lose the Part B penalty when they turn 65 and get a new enrollment period. Extra Help removes the Part D penalty.' },
    { q: 'Does retiree coverage protect me from the Part B penalty?', a: 'No. Only group health coverage based on your or your spouse’s current employment lets you delay Part B without penalty. Retiree plans, COBRA and individual marketplace plans do not, even though some of them pay well. Sign up for Part B when you first become eligible if your coverage is not tied to current work.' },
  ],
  tool: 'penalty',
  related: ['part-b', 'enrollment-periods', 'part-d-plans', 'eligibility'],
  sources: ['cfr_408_22', 'cfr_423_286', 'cms_namba_2027', 'cfr_407_20', 'cms_fs_2026'],
});
