import { defineGuide } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';
import { STATE_LIST } from '../../lib/data';

const n = K.nat;
const D = K.P.partD['2027'];
const states = STATE_LIST.map((s) => K.state(s.slug));
const topDsnp = [...states].sort((a, b) => b.dsnp - a.dsnp).slice(0, 3);
const topCsnp = [...states].sort((a, b) => b.csnp - a.csnp)[0];
const pr = K.state('puerto-rico');

export default defineGuide({
  id: 'special-needs-plans',
  group: 'plans',
  order: 50,
  slug: 'special-needs-plans',
  nav: 'Special needs plans (SNP)',
  card: 'D-SNP, C-SNP and I-SNP plans of a county, and who can join',
  title: 'Special Needs Plans 2027: D-SNP, C-SNP, I-SNP by County',
  description: `Special needs plans 2027: ${K.num(n.dsnp)} dual-eligible, ${K.num(n.csnp)} chronic-condition and ${K.num(n.isnp)} institutional plan segments in the CMS file. Who qualifies, county by county.`,
  h1: 'Special needs plans for 2027: who can join, and where',
  intro: 'The finder switches to plans reserved for people with Medicaid, a qualifying chronic condition or an institutional level of care.',
  resume: `A special needs plan (SNP) is a Medicare Advantage plan that only enrolls people in a defined group, and builds its network and care management around them. For 2027 the CMS landscape file lists ${K.num(n.snp)} SNP segments, more than a third of all Advantage plans: ${K.num(n.dsnp)} dual-eligible plans (D-SNPs) for people who have both Medicare and Medicaid, ${K.num(n.csnp)} chronic-condition plans (C-SNPs) for people with conditions such as diabetes, heart failure or chronic lung disease, and ${K.num(n.isnp)} institutional plans (I-SNPs) for people who live in a nursing home or need that level of care at home. Anyone outside these groups cannot join them, which is why the main lists of this site leave them out. The finder above shows them for any county; ${topDsnp[0].name}, ${topDsnp[1].name} and ${topDsnp[2].name} have the most dual-eligible plans.`,
  body: (h) => `
<h2>Three kinds of plans, three entry tickets</h2>
<h3>Dual-eligible plans (D-SNP)</h3>
<p>To join a D-SNP you need Medicare Parts A and B and Medicaid. Some plans accept only people with full Medicaid benefits, others also people whose state pays only their Medicare premiums or cost sharing (the Medicare Savings Programs); the plan's eligibility section says which. The landscape file marks how far each D-SNP integrates the two programs: from plans that only coordinate with the state Medicaid agency to "fully integrated" and "highly integrated" plans that also deliver Medicaid long-term care, and "applicable integrated plans" where one insurer covers both. A few D-SNPs charge no Medicare cost sharing at all because Medicaid picks it up.</p>
<p>Puerto Rico shows how central these plans can be: ${pr.dsnp} of its ${pr.all} Advantage plan segments for 2027 are D-SNPs.</p>
<h3>Chronic-condition plans (C-SNP)</h3>
<p>A C-SNP accepts people with one of the severe or disabling chronic conditions it is designed for, confirmed by the plan with your doctor after you apply. ${topCsnp.name} has the most of them for 2027 (${topCsnp.csnp}). If the plan finds after enrollment that you do not have the condition, you get a special period to choose another plan: it runs through the end of the month of the plan's notice and the two following months (${h.src('cfr_422_62', '42 CFR 422.62(b)(13)')}).</p>
<h3>Institutional plans (I-SNP)</h3>
<p>I-SNPs serve residents of nursing homes and similar facilities, or people living at home who need a nursing-home level of care as assessed by the state. They usually staff their own clinicians in the facilities they contract with, so the plan only works if your facility is one of them.</p>
<h2>Joining and leaving outside the usual calendar</h2>
<p>The annual period from October 15 to December 7 applies to SNPs as to other plans, but several special periods fit their members better. Under ${h.src('cfr_423_38', '42 CFR 423.38(c)(4)')}, people with Extra Help can make one drug plan election per month. Under 423.38(c)(35), people with full Medicaid can make one election per month into an integrated D-SNP aligned with their Medicaid plan. If you lose the status a SNP requires (for example your Medicaid ends), the plan cannot keep you, and you have a special period that starts the month your status changes and ends three calendar months after the plan disenrolls you, or when you choose a new plan (42 CFR 422.62(b)(11)).</p>
${h.mini('snpDual')}
<h3>Moving from a regular plan into a SNP</h3>
<p>Someone who qualifies does not have to wait for the fall. Becoming eligible for Medicaid, or receiving a confirmed diagnosis that a C-SNP of the county covers, opens these special periods, and the new plan usually starts on the first day of the month after the plan receives your request. What changes is mostly behind the scenes: a care coordinator, a network chosen around the group, in some plans transport or meals that a regular plan does not offer. What does not change is the need to check the network: a D-SNP built around one hospital system is a poor fit if your specialists work for another.</p>
<h2>Extra Help inside a D-SNP</h2>
<p>Almost everyone with Medicaid also has Extra Help for drugs, so in a D-SNP the Part D deductible disappears and copays are capped at ${K.cents(D.lisCopayGeneric)} for a generic and ${K.cents(D.lisCopayOther)} for a brand-name drug in 2027, or ${K.cents(D.lisCopayGenericLow)} and ${K.cents(D.lisCopayOtherLow)} with income at or below the poverty line (${h.src('ann_2027', 'Rate Announcement, Table V-2')}). The drug premium shown in the county list is the full premium; with full Extra Help, the amount actually charged is usually $0 when the plan's basic drug premium is at or below the regional subsidy.</p>
<h2>How to read a SNP line in the list</h2>
<p>The plan type tells you the network model (HMO, HMO-POS, PPO), and the label after it the kind of SNP. The out-of-pocket cap still applies, though for people with full Medicaid the state pays most Medicare cost sharing anyway. Star ratings are those of the insurer's contract, shared with its other plans. Before joining, check that your Medicaid plan, your doctors and, for an I-SNP, your facility work with the SNP: the CMS file cannot tell you that, the plan's provider directory can.</p>
`,
  faqs: [
    { q: 'Who can join a dual-eligible special needs plan (D-SNP) in 2027?', a: `People enrolled in Medicare Parts A and B who also have Medicaid and live in the plan's service area. Some D-SNPs take only people with full Medicaid benefits, others also people in a Medicare Savings Program. The 2027 CMS file lists ${K.num(n.dsnp)} D-SNP segments; the finder shows the ones of your county.` },
    { q: 'Can I join a chronic condition special needs plan without a diagnosis?', a: 'No. A C-SNP verifies with your doctor that you have one of the chronic conditions it is built for. If the plan later finds you do not qualify, it must notify you and you get a special enrollment period through the end of that month and the next two months to choose another plan or Original Medicare.' },
    { q: 'What happens if I lose Medicaid while in a D-SNP?', a: 'The plan must disenroll you once you no longer meet its special needs status, often after a grace period it announces. You get a special election period that starts the month your status changes and ends three calendar months after the disenrollment takes effect, or when you choose a new plan, under 42 CFR 422.62(b)(11).' },
    { q: 'Do special needs plans count in the number of plans in my county?', a: 'Not on this site. Counts of plans open to everyone, $0 plans and caps leave special needs plans out, because most people cannot join them. Each county line shows them separately, and the finder lists them when you choose "Special needs" as the plan kind.' },
  ],
  tool: 'snp',
  related: ['part-d-deductible', 'zero-premium-plans', 'enrollment-periods', 'state:puerto-rico', 'county:florida/miami-dade'],
  sources: ['cms_landscape', 'cfr_422_62', 'cfr_423_38', 'ann_2027'],
});
