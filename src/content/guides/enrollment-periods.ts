import { defineGuide } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const per = K.P.periods;
const ex = K.iep('1962-03-20');
const ex1 = K.iep('1962-03-01');

export default defineGuide({
  id: 'enrollment-periods',
  group: 'enroll',
  order: 20,
  slug: 'enrollment-periods',
  nav: 'Enrollment periods and dates',
  card: 'October 15 to December 7, the January to March windows, your own dates',
  title: 'Medicare Open Enrollment 2026: Dates, Deadlines, Your Window',
  description: `Medicare open enrollment runs ${K.day(per.aep.start)} to ${K.day(per.aep.end)} for 2027 coverage. The January to March windows, your 7-month window at 65, special periods.`,
  h1: 'Medicare enrollment periods: every window, and yours',
  intro: 'Enter your date of birth: the calculator gives your seven-month window at 65 and tells you which yearly windows are open today.',
  resume: `Medicare has fixed windows for each kind of change. The annual open enrollment, officially the annual coordinated election period, runs from ${K.day(per.aep.start)} to ${K.day(per.aep.end)}: during it anyone on Medicare can join, switch or drop a Medicare Advantage plan or a Part D plan, for coverage starting ${K.day(per.aep.effective)}. From January 1 to March 31, people already in an Advantage plan get one more change, to another Advantage plan or back to Original Medicare with a drug plan. The general enrollment period, also January 1 to March 31, is for people who missed signing up for Part A or Part B. Before all of that comes the initial enrollment period, seven months around your 65th birthday, and the six-month Medigap window that starts with Part B. Special enrollment periods cover moves, the end of a job's coverage, a plan leaving your area, Medicaid, Extra Help and five-star plans.`,
  body: (h) => `
<h2>The calendar for 2026 and 2027</h2>
${h.table(['Window', 'Dates', 'What you can do', 'Rule'], [
  ['Annual open enrollment', `${K.day(per.aep.start)} to ${K.day(per.aep.end)}`, 'Join, switch or drop an Advantage or Part D plan; coverage starts January 1, 2027', h.src('cfr_422_62', '42 CFR 422.62(a)(2)')],
  ['Advantage open enrollment', 'January 1 to March 31, 2027', 'One change if you are in an Advantage plan: another Advantage plan, or Original Medicare plus Part D', '42 CFR 422.62(a)(3)'],
  ['General enrollment (Parts A and B)', 'January 1 to March 31 each year', 'Sign up for Part A or B if you missed your initial window; coverage starts the month after', h.src('cfr_407_15', '42 CFR 407.15')],
  ['Initial enrollment at 65', '7 months around your 65th birthday', 'Sign up for Parts A, B and D, or an Advantage plan', h.src('cfr_407_14', '42 CFR 407.14')],
  ['Medigap open enrollment', '6 months from the month you are 65 and in Part B', 'Buy any Medigap policy at the standard price', h.src('usc_1395ss', 'SSA §1882(s)(2)')],
  ['Five-star special period', 'December 8 to November 30', 'Switch once into a plan rated 5 stars', '42 CFR 422.62(b)(15)'],
], 'Windows for people living in the United States. Special enrollment periods below add other dates.', ['l', 'l', 'l', 'l'])}
<h2>Your initial window at 65</h2>
<p>The initial enrollment period lasts seven months: the three months before the month you turn 65, that month, and the three months after. For someone born on March 20, 1962, it runs from ${K.day(ex.start)} to ${K.day(ex.end)}, and coverage can start ${K.day(ex.eligible)} if you sign up in the first three months. Signing up later in the window starts coverage the month after you apply. Medicare counts you as 65 the day before your birthday (${h.src('cfr_407_10', '42 CFR 407.10')}), so someone born on March 1 is eligible from ${K.day(ex1.eligible)} and the whole window moves one month earlier.</p>
${h.mini('iep')}
<h3>Under 65 with a disability</h3>
<p>The same seven-month rule applies to people who qualify through Social Security disability benefits: the window opens three months before the first month of Medicare eligibility and closes three months after it (${h.src('cfr_407_14', '42 CFR 407.14(a)')}). Part A starts with the 25th month of disability benefits, and people already receiving benefits are enrolled automatically. Reaching 65 later opens a new initial enrollment period, which is also a fresh chance to choose Part D and an Advantage plan.</p>
<h3>Drug coverage at 65</h3>
<p>Part D has its own initial enrollment period, which for most people matches the seven months of Part B. Joining a drug plan, or an Advantage plan that includes drugs, within it keeps you clear of the Part D penalty. If your drugs are covered by an employer plan that sends you a creditable coverage notice, you can wait, and join within 63 days after that coverage ends.</p>
<h2>The fall window, in practice</h2>
<p>Insurers send the Annual Notice of Change for the next year by September 30, and plans can be compared from October 1, when their 2027 information is published. Choices made between October 15 and December 7 all take effect on January 1; if you change your mind within the window, the last choice made before December 7 counts. Doing nothing keeps you in your current plan, with its new premium and benefits, if the plan continues.</p>
${h.mini('starsSep')}
<h2>Special enrollment periods</h2>
<p>Outside the fixed windows, many life events open a special period (${h.src('cfr_422_62', '42 CFR 422.62(b)')} for Advantage plans, ${h.src('cfr_423_38', '42 CFR 423.38(c)')} for Part D). Among the most common:</p>
<ul>
<li>You move out of your plan's service area, or to a place with new plan options.</li>
<li>Your plan leaves your area or its contract ends.</li>
<li>You leave a job or a union plan, or its coverage ends: an eight-month window for Part B, and a window for Advantage and Part D that ends two months after the employer coverage stops.</li>
<li>You have Medicaid or Extra Help: one drug plan change a month, and for people with full Medicaid one change a month into an integrated dual-eligible plan.</li>
<li>A plan rated five stars is offered where you live: one switch into it between December 8 and November 30.</li>
<li>You joined an Advantage plan for the first time and dropped a Medigap policy to do so: within the first 12 months you can return to Original Medicare.</li>
<li>A government declares an emergency or major disaster that affected you: a special period that lasts until two full months after the declared end.</li>
</ul>
<h3>Planning around the end of a job</h3>
<p>When work coverage ends in the middle of the year, two clocks start at once. Part B has eight months from the end of the job or of the coverage, whichever comes first, but an Advantage or drug plan must be chosen within two months after the employer coverage stops. Signing up for Part B a month before the job ends, with a start date on the first day of the following month, avoids any gap and leaves time to pick the plan.</p>
<p>Each special period has its own start and end, and some need proof such as a letter from an employer. Your plan, Medicare or your State Health Insurance Assistance Program can confirm whether one applies to you.</p>
`,
  faqs: [
    { q: 'When is Medicare open enrollment for 2027 coverage?', a: `From ${K.day(per.aep.start)} to ${K.day(per.aep.end)}. During those weeks you can join, switch or leave a Medicare Advantage plan or a Part D drug plan, and every change takes effect on ${K.day(per.aep.effective)}. If you make several changes, the last one made before December 7 is the one that counts.` },
    { q: 'Can I change my Medicare Advantage plan after December 7?', a: 'Yes, once, between January 1 and March 31, if you are already in an Advantage plan: you can switch to another Advantage plan or go back to Original Medicare and add a Part D plan. Outside that window you need a special enrollment period, such as a move or a five-star plan in your area.' },
    { q: 'What happens if I miss my initial enrollment period at 65?', a: 'Unless you or your spouse have group coverage from current work, you wait for the general enrollment period, January 1 to March 31, with coverage starting the month after you sign up, and you may owe a Part B penalty of 10% for each full year of delay. Missing Part D adds its own monthly penalty.' },
    { q: 'Do I have to re-enroll in my Medicare plan every year?', a: 'No. If your plan continues in your area, you stay enrolled automatically for the next year, with the premium and benefits described in its Annual Notice of Change. Reviewing it each fall is still worth the time: premiums, caps, drug lists and networks change every January.' },
  ],
  tool: 'periods',
  related: ['eligibility', 'late-enrollment-penalty', 'star-ratings', 'plans-leaving', 'medigap'],
  sources: ['cfr_422_62', 'cfr_423_38', 'cfr_407_14', 'cfr_407_15', 'cfr_407_10'],
});
