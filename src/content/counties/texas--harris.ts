import { defineCounty } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const c = K.county('texas', 'harris');
const fb = K.county('texas', 'fort-bend');
const mo = K.county('texas', 'montgomery');
const gv = K.county('texas', 'galveston');
const tx = K.state('texas');

export default defineCounty({
  state: 'texas',
  county: 'harris',
  title: `Medicare Advantage Plans Harris County 2027: ${K.change(c.std, c.std26)}`,
  description: `Harris County (Houston) went from ${c.std26} to ${c.std} open Medicare Advantage plans for 2027; ${c.gone} IDs left, Memorial Hermann among them. ${c.zero} at $0 with drugs, all listed.`,
  intro: `Houston has ${K.change(c.std, c.std26)} open to everyone for 2027 than a year ago, and the cheapest cap now belongs to a local HMO in its first year.`,
  resume: `Harris County lost more open Medicare Advantage plans for 2027 than almost any large county: the CMS landscape file lists ${c.std} plans open to anyone with Parts A and B, against ${c.std26} in 2026, after ${c.gone} plan IDs were not filed again and only ${c.new} new ones arrived. Memorial Hermann's two Advantage plans, the four Erickson Advantage plans, and a long run of Blue Cross Medicare Advantage HMOs and PPOs are among the exits. The plans that remain still offer real choice: ${c.zero} include drug coverage at a $0 premium, and the median in-network cap is ${K.usd(c.moopMed!)}. The lowest cap, ${K.usd(c.moopMin!)}, belongs to ${c.lowMoop!.n}, a first-year plan from ${c.lowMoop!.o}. ${c.star4} plans hold four stars or more, with ${c.best!.n} at ${c.starMax}. Special needs plans outnumber open ones: ${c.snp}, of which ${c.dsnp} for people with Medicare and Medicaid.`,
  body: (h) => `
<h2>If your Houston plan is on the exit list</h2>
<p>The insurer had to mail an Annual Notice of Change or a non-renewal letter by the fall of 2026. For a plan that ends, there are two clean options: pick a new plan between October 15 and December 7 so that coverage starts January 1 without a gap, or use the special enrollment period that a non-renewal opens, which runs into early 2027 (${h.src('cfr_422_62', '42 CFR 422.62')}). Doing nothing returns you to Original Medicare without drug coverage. The plan IDs that did not return are listed at the bottom of this page.</p>
${h.mini('starsSep')}
<h3>Newcomers have no star rating yet</h3>
<p>${c.lowMoop!.n} has the cheapest cap here but no 2027 rating, because its contract is too new to be measured. A missing rating says nothing good or bad about quality. Larger names with history include ${c.cheapHigh!.n}, rated ${c.cheapHigh!.star} stars with a ${K.usd(c.cheapHigh!.moop!)} cap, and KelseyCare Advantage, tied to the Kelsey-Seybold clinics.</p>
<h2>Insurers in Harris County</h2>
<p>${c.orgList.map(([o, n]) => `${o}, ${n}`).join('; ')}. Humana alone files ${c.topOrgN} of the ${c.std} open plans, including several Part B giveback PPOs, which lower the Part B premium you pay.</p>
<h3>Fort Bend, Montgomery and Galveston</h3>
<p>Fort Bend County lists ${fb.std} open plans, Montgomery ${mo.std} and Galveston ${gv.std}. Texas has ${tx.std} across all its counties. A move across one of those lines, from Pasadena to Sugar Land for instance, can change the list, so check your county again when you change address.</p>
`,
  faqs: [
    { q: 'Is Memorial Hermann offering a Medicare Advantage plan in Harris County for 2027?', a: `No. Memorial Hermann Advantage and Memorial Hermann Prime Value MA Only, both offered in 2026, are not in the CMS 2027 landscape file for Harris County. Members can choose among ${c.std} open plans until December 7, 2026. Hospital access is a separate question: check whether Memorial Hermann facilities are in the network of the plan you pick.` },
    { q: 'How many Medicare Advantage plans left Harris County for 2027?', a: `${c.gone} plan IDs offered in Harris County in 2026 are not filed for 2027, and ${c.new} new IDs were added, which brings the open-to-all count from ${c.std26} to ${c.std}, according to CMS landscape data of September 2026. Some exits are mergers into another plan of the same insurer; your notice says which.` },
    { q: 'Are there more special needs plans than regular plans in Harris County?', a: `Slightly: ${c.snp} special needs plans against ${c.std} open plans in 2027. ${c.dsnp} serve people with both Medicare and Medicaid, ${c.csnp} people with qualifying chronic conditions and ${c.isnp} people who need nursing-home level care. You must meet the plan's condition to join, and the plan checks it after enrollment.` },
  ],
  related: ['state:texas', 'county:texas/bexar', 'county:texas/dallas', 'plans-leaving', 'special-needs-plans'],
});
