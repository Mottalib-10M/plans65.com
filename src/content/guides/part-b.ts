import { defineGuide } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const B = K.P.partB['2026'];
const ex = K.original({ partBServices: 25000, admissions: 0 }, 2026);
const pen = K.penaltyB(38, 2026);

export default defineGuide({
  id: 'part-b',
  group: 'costs',
  order: 20,
  slug: 'part-b',
  nav: 'Part B: coverage and sign-up',
  card: 'What Part B pays, the 20% with no cap, when to enroll, the penalty',
  title: 'Medicare Part B 2026: What It Covers, Costs, When to Enroll',
  description: `Medicare Part B in 2026: doctors, outpatient care and equipment at 20% after a ${K.usd(B.deductible)} deductible, ${K.cents(B.premium)} a month. When to enroll and the 10% a year late penalty.`,
  h1: 'Medicare Part B: what it pays for, and when to sign up',
  intro: 'Part B is the medical half of Original Medicare. The calculator shows the lifetime surcharge a late sign-up adds to its premium.',
  resume: `Medicare Part B is the medical insurance part of Original Medicare: it pays for doctor visits, outpatient hospital care, preventive services, lab tests, imaging, durable medical equipment such as walkers and oxygen, ambulance trips and some drugs given in a clinic. In 2026 it costs ${K.cents(B.premium)} a month for most people, plus a deductible of ${K.usd(B.deductible)} a year, after which you generally pay 20% of the Medicare-approved amount, with no yearly limit. Unlike Part A, Part B is voluntary and never free: you choose to enroll, and you must keep it to join a Medicare Advantage plan or buy a Medigap policy. The timing matters. If you do not sign up when first eligible and have no group coverage from current work, a penalty of 10% of the standard premium is added for each full year of delay, for life, and coverage may only start after the general enrollment period.`,
  body: (h) => `
<h2>What Part B covers, and what it leaves out</h2>
<p>Part B covers medically necessary services outside a hospital stay and a long list of preventive services. Most preventive care, such as the yearly wellness visit, many cancer screenings and the flu and pneumonia vaccines, costs nothing when the doctor accepts Medicare's approved amount. For the rest, you pay the 20%.</p>
<p>Several things are not covered at all: routine dental care and dentures, routine eye exams and glasses, hearing aids, long-term custodial care, and most care outside the United States. Many Advantage plans add some of them as extra benefits, and that is a large part of their appeal; the CMS landscape file does not detail those extras, so the plan's Summary of Benefits is where to check them.</p>
<h2>The 20% has no ceiling</h2>
<p>Original Medicare has no yearly out-of-pocket maximum. A year with ${K.usd(25000)} of approved outpatient care, a few rounds of chemotherapy or dialysis for example, leaves ${K.usd(ex.partB)} to pay under Part B alone, before premiums. This open-ended exposure is why most people on Original Medicare add a Medigap policy, and why Advantage plans must cap in-network spending. The ${h.a('annual-cost-calculator', 'whole-year calculator')} shows the difference for your own level of care.</p>
${h.mini('partBYear')}
<h2>When to sign up</h2>
<p>Your initial enrollment period lasts seven months around your 65th birthday: the three months before the month you turn 65, that month, and the three months after (${h.src('cfr_407_14', '42 CFR 407.14')}). If you already receive Social Security benefits, you are enrolled in Parts A and B automatically and receive your card about three months before. If you do not, you apply with Social Security.</p>
<h3>Delaying because you still work</h3>
<p>If you or your spouse have group health coverage through current employment, you can wait. When that work or coverage ends, a special enrollment period of eight months lets you sign up without penalty (${h.src('cfr_407_20', '42 CFR 407.20')}). The protection depends on the coverage being based on current work: retiree plans, COBRA, VA care and individual marketplace plans do not qualify, and delaying on them builds the penalty.</p>
<h3>Missing the window</h3>
<p>Without a special period, the next chance is the general enrollment period, from January 1 to March 31 of each year, with coverage starting the month after you sign up (${h.src('cfr_407_15', '42 CFR 407.15')}).</p>
<h2>The late penalty, in dollars</h2>
<p>The penalty is 10% of the standard premium for each full twelve months you could have had Part B but did not (${h.src('cfr_408_22', '42 CFR 408.22')}). A person who waits 38 months without a qualifying reason counts ${pen.periods} full years: ${K.pct(pen.pct, 0)} more, or ${K.cents(pen.monthly)} a month on top of the 2026 premium, and the surcharge rises with the premium every year. Months shorter than a full year are not counted, so 23 months of delay cost one period, not two. The calculator above does the count; the ${h.a('late-enrollment-penalty', 'penalty guide')} covers the Part D penalty as well.</p>
${h.mini('penaltyB')}
<h3>Doctors who do not accept assignment</h3>
<p>The 20% is computed on the Medicare-approved amount. Most doctors accept that amount as full payment ("assignment"). A doctor who does not can charge up to 15% more than the approved amount for most services, and that excess charge is yours to pay on top of the 20% unless your Medigap policy covers it (Plans F and G do). Before a costly procedure, asking whether the doctor accepts assignment is a one-minute question that can save hundreds of dollars.</p>
<h2>Part B with an Advantage plan or Medigap</h2>
<p>Both routes require Part B. In an Advantage plan, the plan replaces the deductible and the 20% with its own copays up to its cap, and some plans reduce your Part B premium. With Medigap, the policy pays the 20% (and, depending on the letter, the deductible). The best moment to buy Medigap is the six months starting with your Part B start date at 65, when insurers cannot refuse you or price you by health status.</p>
`,
  faqs: [
    { q: 'What does Medicare Part B cover?', a: `Doctor services, outpatient hospital care, preventive services and screenings, lab tests, imaging, durable medical equipment, ambulance services, outpatient mental health care and some drugs given in a clinic. After the 2026 deductible of ${K.usd(B.deductible)} you generally pay 20% of the approved amount. Routine dental, vision and hearing aids are not covered.` },
    { q: 'Is Medicare Part B mandatory?', a: 'No, it is voluntary. But you need Part B to join a Medicare Advantage plan or buy Medigap, and skipping it without group coverage from current work leads to a lifelong penalty of 10% of the premium per full year of delay. People still covered through their own or their spouse’s current job can usually wait without penalty.' },
    { q: 'Is there a maximum out of pocket with Medicare Part B?', a: 'Not with Original Medicare alone. The 20% coinsurance has no yearly limit, so a costly treatment can lead to large bills. A Medigap policy covers most or all of that 20%, and Medicare Advantage plans must set an in-network out-of-pocket maximum for Part A and Part B services.' },
    { q: 'Can I sign up for Part B at any time?', a: 'No. Outside your seven-month initial enrollment period around age 65 and the eight-month special period after group coverage from current work ends, you can only enroll during the general enrollment period, January 1 to March 31, with coverage starting the month after you sign up, and a penalty may apply.' },
  ],
  tool: 'penalty',
  related: ['part-b-premium', 'late-enrollment-penalty', 'enrollment-periods', 'medigap', 'eligibility'],
  sources: ['cms_fs_2026', 'cfr_407_14', 'cfr_407_15', 'cfr_407_20', 'cfr_408_22'],
});
