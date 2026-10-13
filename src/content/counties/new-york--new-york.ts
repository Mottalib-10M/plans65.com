import { defineCounty } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const c = K.county('new-york', 'new-york');
const bx = K.county('new-york', 'bronx');
const bk = K.county('new-york', 'kings');
const qn = K.county('new-york', 'queens');
const d27 = K.P.partD['2027'];

export default defineCounty({
  state: 'new-york',
  county: 'new-york',
  title: `Medicare Advantage Plans Manhattan 2027: ${c.std} Open, ${c.snp} SNPs`,
  description: `Manhattan (New York County) 2027: ${c.std} open Medicare Advantage plans, ${c.snp} special needs plans, ${c.dsnp} for Medicaid members, only ${c.star4} rated four stars or more. Listed.`,
  intro: `Manhattan has more Medicare Advantage plans for people with Medicaid or special conditions than plans open to everyone.`,
  resume: `Manhattan, filed by Medicare as New York County, has a short open menu and a long specialized one for 2027: ${c.std} Medicare Advantage plans accept anyone with Parts A and B, while ${c.snp} special needs plans serve narrower groups, ${c.dsnp} of them people who have both Medicare and Medicaid. The open list lost ground, from ${c.std26} plans in 2026 to ${c.std}, with ${c.gone} IDs gone and only ${c.new} new. Ratings are thin at the top: ${c.star4} open plans hold four stars or more, even though ${c.best!.n} reaches ${c.starMax}. Caps are high, as everywhere in the city: the lowest is ${K.usd(c.moopMin!)}, with ${c.lowMoop!.n}, and the median ${K.usd(c.moopMed!)}. ${c.zero} drug-covering plans charge no premium; ${c.cheapHigh!.n}, from the city's MetroPlus Health Plan, is one of them, with ${c.cheapHigh!.star} stars. Wellcare files ${c.orgList[0][1]} open plans under Centene, the most of any parent company.`,
  body: (h) => `
<h2>Medicare and Medicaid together</h2>
<p>Many Manhattan residents over 65 have both programs. For them, a dual-eligible SNP (D-SNP) combines Medicare coverage with Medicaid's help on cost sharing, and some plans also coordinate home care. Even without a D-SNP, anyone with Medicaid or a Medicare Savings Program automatically receives Extra Help with drug costs, which in 2027 caps a generic at ${K.cents(d27.lisCopayGeneric)} and a brand drug at ${K.cents(d27.lisCopayOther)}, less for those with the lowest incomes.</p>
${h.mini('snpDual')}
<h3>Enrollment for dual-eligible members</h3>
<p>People with both programs are not limited to the fall window: Medicare gives dual-eligible and Extra Help members their own special enrollment periods during the year. New York's Medicaid office and the free HIICAP counselors, the state's SHIP, explain the current terms and which integrated plans apply.</p>
<h2>Few four-star plans, and why that matters</h2>
<p>Only ${c.star4} of ${c.std} open plans reach four stars. A low rating is not a verdict on your own care, but it reflects complaints, appeals, preventive care and member surveys measured by CMS. ${c.best!.n} has the top rating with a premium of ${K.usd(c.best!.m)} and a ${K.usd(c.best!.moop!)} cap. Healthfirst, VNS Health and VillageCareMAX also file plans here, and ${c.orgList.map(([o, n]) => `${o} ${n}`).slice(1).join(', ')} complete the leading names.</p>
<h3>The Bronx, Brooklyn, Queens</h3>
<p>The Bronx lists ${bx.std} open plans, Brooklyn ${bk.std} and Queens ${qn.std}. Aetna Medicare Elite and Enhanced PPOs, Elderplan Extra Help and Flex and Anthem Veteran under its old ID are among the Manhattan exits.</p>
`,
  faqs: [
    { q: 'How many Medicare Advantage special needs plans are there in Manhattan for 2027?', a: `${c.snp}, against ${c.std} plans open to everyone, according to the CMS landscape file of September 2026. ${c.dsnp} are for people with both Medicare and Medicaid, ${c.csnp} for chronic conditions and ${c.isnp} for people needing nursing-home care. Each checks eligibility, usually Medicaid status or a diagnosis, after you apply.` },
    { q: 'Which Manhattan Medicare Advantage plans have four stars or more for 2027?', a: `${c.star4} of the ${c.std} open plans in New York County reach four stars or better in the 2027 ratings CMS published on October 8, 2026, and ${c.best!.n} has ${c.starMax}. Sort the list above by stars. A plan under a new contract has no rating yet, which is different from a low one.` },
    { q: 'Is MetroPlus offering a Medicare Advantage plan in Manhattan for 2027?', a: `Yes. ${c.cheapHigh!.n} is filed for New York County with a ${K.usd(c.cheapHigh!.m)} premium and a ${c.cheapHigh!.star}-star rating, and its in-network cap is ${K.usd(c.cheapHigh!.moop!)}, according to CMS 2027 data. MetroPlus Health Plan is tied to the city's public hospital system, so check the directory against your doctors.` },
  ],
  related: ['state:new-york', 'county:new-york/kings', 'county:new-york/queens', 'special-needs-plans'],
});
