import { defineGuide } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const A = K.P.partA['2026'];
const ex = K.iep('1961-11-20');

export default defineGuide({
  id: 'eligibility',
  group: 'enroll',
  order: 10,
  slug: 'eligibility',
  nav: 'Medicare eligibility',
  card: 'Age 65, disability, kidney failure, residence rules and free Part A',
  title: 'Medicare Eligibility 2026: Age 65, Disability, Free Part A',
  description: `Medicare eligibility 2026: age 65 (citizen or 5 years of residence), 24 months of disability benefits, or kidney failure. Part A free with 40 quarters of work.`,
  h1: 'Who is eligible for Medicare, and from when',
  intro: 'Enter your date of birth: the calculator gives the month Medicare can start and your seven-month sign-up window.',
  resume: `You can get Medicare in three ways. At 65, if you are a U.S. citizen, or a permanent resident who has lived in the United States continuously for the five years before applying (42 CFR 407.10). Before 65, after you have been entitled to Social Security or Railroad Retirement disability benefits for 24 months: Medicare Part A starts in the 25th month (42 CFR 406.12). At any age, with end-stage renal disease requiring dialysis or a kidney transplant, if you or a spouse or parent worked long enough under Social Security (42 CFR 406.13). Part A is free when you or your spouse have at least 40 quarters of Medicare-covered work; with 30 to 39 quarters it costs ${K.usd(A.premiumReduced)} a month in 2026, and with fewer, ${K.usd(A.premiumFull)}. Part B is open to everyone eligible for Part A and costs the standard premium. Medicare counts you as 65 the day before your birthday.`,
  body: (h) => `
<h2>At 65</h2>
<p>Two conditions: age and status. Age is reached, for Medicare, on the day before your 65th birthday (${h.src('cfr_407_10', '42 CFR 407.10')}), so coverage can start on the first day of the month you turn 65, or of the previous month if your birthday falls on the 1st. Status means U.S. citizenship, or lawful permanent residence with five years of continuous residence in the United States before you apply. If you already receive Social Security or Railroad Retirement retirement benefits, you are entitled to Part A automatically (${h.src('cfr_406_10', '42 CFR 406.10')}) and enrolled in Part B unless you refuse it.</p>
<p>For someone born on November 20, 1961, Medicare can start ${K.day(ex.eligible)}; the sign-up window runs from ${K.day(ex.start)} to ${K.day(ex.end)}.</p>
${h.mini('iep')}
<h3>Free or paid Part A</h3>
<p>Part A is premium-free for people who, alone or through a current, former or deceased spouse, have 40 quarters of work in jobs that paid Medicare tax, about ten years. Others can buy it: ${K.usd(A.premiumReduced)} a month in 2026 with 30 to 39 quarters, ${K.usd(A.premiumFull)} with fewer. Someone who buys Part A must also take Part B. Working a few more years to reach 40 quarters, or qualifying through a spouse's record, can save thousands of dollars a year: Social Security can tell you how many quarters you have.</p>
<h2>Before 65: disability</h2>
<p>People under 65 who receive Social Security disability benefits, or a disabled widow's, widower's or adult child's benefit, become entitled to Part A after 24 months of benefits, in the 25th month (${h.src('cfr_406_12', '42 CFR 406.12')}). Earlier periods of disability benefits can count toward the 24 months under conditions the rule spells out. Enrollment is automatic, with a Medicare card sent ahead of the start date. Railroad workers qualify the same way through the Railroad Retirement Board.</p>
<h2>Kidney failure</h2>
<p>End-stage renal disease, meaning permanent kidney failure that needs regular dialysis or a transplant, opens Medicare at any age if you, your spouse or a parent you depend on have enough work under Social Security or the railroad system, or if you receive their benefits (${h.src('cfr_406_13', '42 CFR 406.13')}). Entitlement starts after a waiting period that depends on the treatment: the rule gives earlier starts for home dialysis training and for a kidney transplant.</p>
<h2>Common situations</h2>
<ul>
<li>Still working at 65 with a job plan: you are eligible and can take free Part A at once; Part B can wait without penalty while the coverage comes from current work.</li>
<li>Married to someone older or younger: each spouse qualifies at his or her own 65th birthday, even when the free Part A comes from the other's work record.</li>
<li>Divorced after ten years of marriage, or widowed: an ex-spouse's or late spouse's record can give you free Part A.</li>
<li>Receiving disability benefits when you turn 65: Medicare continues, now based on age, and a new enrollment window opens.</li>
</ul>
<h2>What eligibility does not decide</h2>
<p>Being eligible does not enroll you everywhere. Part B, Part D, an Advantage plan and Medigap each have their own windows and, for B and D, penalties when you sign up late without a valid reason; see the ${h.a('enrollment-periods', 'enrollment dates')} and the ${h.a('late-enrollment-penalty', 'penalty calculator')}. People who keep working past 65 with group health coverage from that job, or a spouse's, can usually delay Part B without penalty. And Medicare eligibility does not depend on income: higher incomes pay more for Parts B and D through IRMAA, but nobody is excluded.</p>
<h3>Moving to the United States late in life</h3>
<p>A permanent resident who arrives at 60 can buy Medicare from 65 only after five years of continuous residence, so from 65 at the earliest if the five years are complete, and will usually pay for Part A without 40 quarters of U.S. work. Quarters earned in some countries with a Social Security agreement with the United States may count toward Social Security benefits, but not toward premium-free Part A in every case: ask Social Security before planning on them.</p>
`,
  faqs: [
    { q: 'Can I get Medicare before 65?', a: 'Yes, in two cases. After 24 months of Social Security or Railroad Retirement disability benefits, Part A starts in the 25th month and enrollment is automatic. And at any age with end-stage renal disease needing dialysis or a kidney transplant, if you or your spouse or parent have enough work under Social Security.' },
    { q: 'Do I qualify for Medicare if I never worked?', a: `If you are a citizen, or a permanent resident with five years of continuous residence, you can enroll at 65. Part A is free if your current, former or deceased spouse has 40 quarters of covered work; otherwise you can buy it for ${K.usd(A.premiumFull)} a month in 2026 (${K.usd(A.premiumReduced)} with 30 to 39 quarters), and Part B at the standard premium.` },
    { q: 'If my birthday is on the 1st, when does Medicare start?', a: 'One month earlier than for other people born that month. Medicare considers that you reach 65 on the day before your birthday, so someone born on June 1 is 65 on May 31 and can have Medicare from May 1. The seven-month enrollment window moves one month earlier as well.' },
    { q: 'Does my income affect whether I can get Medicare?', a: 'No. Eligibility depends on age, disability or kidney failure, citizenship or residence, and, for free Part A, work history. Income only changes what you pay: above the IRMAA thresholds, Part B and Part D premiums are higher, and with low income and savings, Medicare Savings Programs and Extra Help lower costs.' },
  ],
  tool: 'eligibility',
  related: ['enrollment-periods', 'part-a', 'part-b', 'late-enrollment-penalty'],
  sources: ['cfr_406_10', 'cfr_406_12', 'cfr_406_13', 'cfr_407_10', 'cms_fs_2026'],
});
