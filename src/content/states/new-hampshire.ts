import { defineState } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const s = K.state('new-hampshire');
const hil = K.county('new-hampshire', 'hillsborough');
const che = K.county('new-hampshire', 'cheshire');
const car = K.county('new-hampshire', 'carroll');
const graf = K.county('new-hampshire', 'grafton');
const seacoast = K.county('new-hampshire', 'rockingham');

export default defineState({
  slug: 'new-hampshire',
  title: `Medicare Advantage Plans New Hampshire 2027: ${s.std} Options`,
  description: `New Hampshire Medicare Advantage 2027: ${s.std} open plans from ${s.orgs} insurers, ${s.zero} at $0 with drugs, no Medicaid D-SNP, premiums up to ${K.usd(s.premMax!)}. Each county is listed.`,
  intro: `Three insurers, ${s.std} open plans, and a sharp split between the southern tier around Manchester and Nashua and the lakes and mountains to the north.`,
  resume: `New Hampshire has ${s.std} Medicare Advantage plans open to everyone with Parts A and B for 2027, filed by just ${s.orgs} parent companies, and nearly all of them are sold in the southern counties. Hillsborough County, with Manchester and Nashua, has the full ${hil.std}; Rockingham and Strafford have ${seacoast.std} each. Cheshire County around Keene has ${che.std}, and Carroll County has no open plan. ${s.zero} drug-covering plans charge no premium, and the highest premium in the state is a modest ${K.usd(s.premMax!)} a month. Caps run from ${K.usd(s.moopMin!)} to ${K.usd(s.moopMax!)} with a median of ${K.usd(s.moopMed!)}. Unlike most states, New Hampshire has no special needs plan for people with both Medicare and Medicaid; its ${s.snp} special needs plans target chronic conditions or nursing-home residents. ${s.pdp} stand-alone drug plans are listed below.`,
  body: (h) => `
<h2>No plan for dual eligibles, and why that stands out</h2>
<p>Almost every state's 2027 file includes D-SNPs, the special needs plans reserved for people who qualify for both Medicare and Medicaid. Nationally there are ${K.num(K.nat.dsnp)} of them. New Hampshire has ${s.dsnp}. A Granite Stater with Medicaid keeps Original Medicare and the state's Medicaid coverage, or joins an ordinary open plan. The ${s.csnp} chronic-condition plans and ${s.isnp} institutional plan are open only to people with a qualifying diagnosis or living in a nursing facility.</p>
<h2>Southern tier against the North Country</h2>
<p>Choice follows the population. The ${hil.std} plans in Hillsborough include ${hil.zero} at $0 and caps from ${K.usd(hil.moopMin!)}. Merrimack, around Concord, keeps most of that menu. Cross into the Lakes Region and the White Mountains and it shrinks: Grafton has ${graf.std}, Cheshire ${che.std}, and Carroll none, with only ${car.all} special needs plan filed there. Coos County does not appear in the 2027 file at all. In those counties the realistic routes are Original Medicare with a Medigap policy, or a plan sold in a neighboring county if you move there.</p>
<h3>Three companies, and the giveback plans</h3>
<p>${s.orgList.map(([o, n]) => `${o} files ${n}`).join(', ')}. Several plan names carry the word Giveback: these plans return part of the Part B premium to you through your Social Security check. The best-rated is ${s.best!.n}, at ${s.best!.star} stars with a ${K.usd(s.best!.moop!)} cap. The state had ${s.std26} open plans in 2026.</p>
${h.mini('partB2027')}
<p>That Part B premium is the bill a giveback offsets. For 2027 it is a Trustees projection of ${K.cents(K.P.partB['2027'].premium)} a month, not yet the final figure, which CMS normally sets in the fall.</p>
`,
  faqs: [
    { q: 'Is there a Medicare Advantage plan for people with Medicaid in New Hampshire?', a: `Not for 2027: the CMS landscape file lists ${s.dsnp} dual-eligible special needs plans in New Hampshire. People with both Medicare and Medicaid can enroll in any of the ${s.std} open plans sold in their county or stay with Original Medicare, which Medicaid then supplements. The state's SHIP counselors explain that choice free of charge.` },
    { q: 'Can I get a Medicare Advantage plan in Carroll County or Coos County, New Hampshire?', a: `Carroll County has no open-to-all plan for 2027, only ${car.all} special needs plan, and Coos County does not appear in the CMS file at all. People there keep Original Medicare, can add a Medigap policy, and choose from ${s.pdp} stand-alone drug plans. Grafton County, next door, has ${graf.std} open plans.` },
    { q: 'What does a giveback plan in New Hampshire pay back each month?', a: `A giveback plan lowers your Part B premium by an amount the plan sets, which shows up as a smaller deduction from your Social Security payment. New Hampshire plans with Giveback in the name include ${s.lowMoop!.n}, which also has the lowest cap in the state at ${K.usd(s.lowMoop!.moop!)}. The amount is listed in the plan's Summary of Benefits.` },
  ],
  related: ['state:vermont', 'state:maine', 'state:massachusetts', 'special-needs-plans', 'part-b-premium'],
});
