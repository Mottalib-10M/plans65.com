import { defineCounty } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const c = K.county('ohio', 'franklin');
const del = K.county('ohio', 'delaware');
const lic = K.county('ohio', 'licking');

export default defineCounty({
  state: 'ohio',
  county: 'franklin',
  title: `Medicare Advantage Plans Franklin County OH 2027: Columbus`,
  description: `Franklin County, Ohio: ${c.std} Medicare Advantage plans for 2027 around Columbus, ${c.ppo} PPOs, ${c.zero} at $0 with drugs and caps from ${K.usd(c.moopMin!)}. ${c.gone} plans of 2026 gone.`,
  intro: `Columbus has more PPOs than HMOs on its 2027 list, and its lowest cap comes from a Cleveland-based mutual insurer.`,
  resume: `Franklin County, home of Columbus, has ${c.std} Medicare Advantage plans open to anyone with Parts A and B for 2027, against ${c.std26} in 2026. PPOs slightly outnumber HMOs, ${c.ppo} to ${c.hmo}. ${c.zero} of the drug-covering plans have a $0 premium, ${c.zero26 - c.zero} fewer than a year earlier. The lowest in-network cap, ${K.usd(c.moopMin!)}, belongs to ${c.lowMoop!.n}, from ${c.lowMoop!.o}, at ${K.prem(c.lowMoop!.m)} a month; the median cap is ${K.usd(c.moopMed!)}. ${c.star4} plans carry four stars or more for 2027. ${c.orgList.slice(0, 4).map(([o, n]) => `${o} (${n})`).join(', ')} file the most plans. Among the ${c.gone} IDs of 2026 not filed again are an Aetna Enhanced plan, two Wellcare plans, a Mount Carmel MediGold PPO and a USAA giveback plan with drugs; ${c.new} new IDs appear. The county also counts ${c.snp} special needs plans, ${c.dsnp} for people with Medicaid.`,
  body: (h) => `
<h2>Hospital plans and the Mount Carmel exit</h2>
<p>Central Ohio's hospital systems have sold their own Medicare plans, and one of them, the MediGold Premium Choice PPO linked to Mount Carmel, is among the 2026 IDs missing from Franklin County for 2027. Members of a hospital-sponsored plan that leaves often lose the simplest path to their usual doctors: check which remaining plans include those doctors before December 7. The insurer's letter says whether members were moved to another plan, and which one.</p>
<h3>Paying for a lower cap</h3>
<p>The lowest caps in the county come with premiums: ${c.lowMoop!.n} costs ${K.prem(c.lowMoop!.m)} a month for a ${K.usd(c.lowMoop!.moop)} limit. A $0 plan with a cap near the median saves that premium in a healthy year and costs more in a year with a hospital stay. The calculator below shows the gap for a bad year, and the whole-year calculator adds premiums and drugs.</p>
${h.mini('capVsOriginal', { moop: c.moopMed })}
<h2>Delaware and Licking counties</h2>
<p>Delaware County to the north lists ${del.std} open plans and Licking County to the east ${lic.std}. You join plans filed for your county of residence; a move between counties of the Columbus area can change the list. The ${h.a('state:ohio', 'Ohio page')} gives every county, and ${h.a('county:ohio/cuyahoga', 'Cuyahoga County')} covers Cleveland.</p>
`,
  faqs: [
    { q: 'How many Medicare Advantage plans are there in Franklin County, Ohio for 2027?', a: `${c.std} plans open to anyone with Parts A and B, against ${c.std26} in 2026, according to the CMS landscape file of September 2026. ${c.ppo} are PPOs and ${c.hmo} HMOs, and ${c.zero} include drug coverage for a $0 premium. The county also lists ${c.snp} special needs plans.` },
    { q: 'What is the lowest out-of-pocket cap for a Columbus Medicare Advantage plan in 2027?', a: `${K.usd(c.lowMoop!.moop)} in network, for ${c.lowMoop!.n} from ${c.lowMoop!.o}, which charges ${K.prem(c.lowMoop!.m)} a month in Franklin County. The median cap among the county's open plans is ${K.usd(c.moopMed!)}; premiums and Part D drug costs are not counted in it.` },
    { q: 'Is MediGold still offered in Franklin County for 2027?', a: 'The MediGold Premium Choice PPO offered in Franklin County in 2026 is not filed for the county in the CMS 2027 landscape file. Members should read the notice from their plan, which says whether they are moved to another plan, and compare the county’s 2027 plans before December 7, 2026.' },
  ],
  related: ['state:ohio', 'county:ohio/cuyahoga', 'plans-leaving', 'compare-plans'],
});
