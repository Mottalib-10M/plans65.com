import { defineState } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const s = K.state('mississippi');
const top = K.counties('mississippi', 'std');
const thin = K.counties('mississippi', 'std', true);
const hinds = K.county('mississippi', 'hinds');
const desoto = K.county('mississippi', 'desoto');

export default defineState({
  slug: 'mississippi',
  title: `Medicare Advantage Plans Mississippi 2027: ${s.std} Plans, SNPs`,
  description: `Mississippi Medicare Advantage 2027: ${s.std} open plans, as many special needs plans (${s.snp}), ${s.zero} at $0 with drugs and caps from ${K.usd(s.moopMin!)}. Every county, no phone asked.`,
  intro: `Mississippi has as many special needs plans as open plans, a sign of how many residents have both Medicare and Medicaid.`,
  resume: `Mississippi has ${s.std} Medicare Advantage plans open to anyone with Parts A and B for 2027, two more than the ${s.std26} of 2026, and exactly as many special needs plans, ${s.snp}, of which ${s.dsnp} are reserved for people who also have Medicaid. Among the open plans with drug coverage, ${s.zero} of ${s.mapd} charge no premium. Caps start at ${K.usd(s.moopMin!)} and the median is ${K.usd(s.moopMed!)}. The list is long around Jackson, on the Gulf Coast and in the Memphis suburbs: ${top[0].name}, ${top[1].name} and ${desoto.name} counties list ${desoto.std} or more open plans each. In the northeast hills it is shorter, with ${thin[0].std} plans in ${thin[0].name} County. ${s.orgList.slice(0, 3).map(([o]) => o).join(', ')} file the most plans. ${s.star4} open plans are rated four stars or more. People on Original Medicare can choose among ${s.pdp} stand-alone drug plans, from ${K.prem(s.pdpMin)} a month.`,
  body: (h) => `
<h2>Medicaid, Medicare and the dual-eligible plans</h2>
<p>With ${s.dsnp} dual-eligible special needs plans, a Mississippian who has Medicaid as well as Medicare often has more choice than a neighbor without it. These plans coordinate the two programs, and people with full Medicaid can switch into an integrated plan once a month rather than waiting for the fall. Extra Help, which almost everyone with Medicaid receives, cuts drug copays to a few dollars: see ${h.a('special-needs-plans', 'special needs plans')} for who qualifies.</p>
${h.mini('snpDual')}
<h2>Jackson, the Coast and DeSoto County</h2>
<p>Hinds County lists ${hinds.std} open plans, ${hinds.zero} free with drugs. DeSoto County, south of Memphis, lists ${desoto.std}; residents there often use Memphis hospitals, so check that a plan filed in Mississippi counts the Tennessee hospital you use as in network. ${top.slice(0, 4).map((c) => `${c.name} (${c.std})`).join(', ')} have the most plans, ${thin.slice(0, 3).map((c) => `${c.name} (${c.std})`).join(', ')} the fewest, around Tupelo and Oxford.</p>
<h3>Rural counties and the PPO option</h3>
<p>Across the Delta and the northeast hills, PPOs make up a large part of the list (${s.ppo} PPOs against ${s.hmo} HMOs statewide). A PPO keeps paying when you see a doctor outside its network, at a higher share, which matters where the nearest in-network specialist may be in Jackson, Tupelo or Memphis. The trade is usually a higher cap than a local HMO's.</p>
<h3>A regional PPO with the lowest cap</h3>
<p>The lowest cap in the state, ${K.usd(s.lowMoop!.moop)}, belongs to ${s.lowMoop!.n}, at ${K.prem(s.lowMoop!.m)} a month: a regional PPO, which covers a whole multi-state region with one plan. The best-rated plan, ${s.best!.n}, costs ${K.prem(s.best!.m)} with a ${K.usd(s.best!.moop)} cap. Neighbors: ${h.a('state:alabama', 'Alabama')}, ${h.a('state:louisiana', 'Louisiana')}, ${h.a('state:tennessee', 'Tennessee')}.</p>
`,
  faqs: [
    { q: 'How many Medicare Advantage plans are there in Mississippi for 2027?', a: `${s.std} plans open to anyone with Parts A and B and ${s.snp} special needs plans, according to the CMS landscape file of September 2026. ${s.zero} of the open plans with drug coverage have a $0 premium. Counties range from ${thin[0].std} open plans in ${thin[0].name} to ${top[0].std} in ${top[0].name}.` },
    { q: 'Can I use a Memphis hospital with a Mississippi Medicare Advantage plan?', a: 'Only if the plan includes that hospital in its network for 2027. You join plans filed for your county of residence, such as DeSoto, but networks can cross the state line. Look up the hospital in each plan’s provider directory before choosing, especially for an HMO, which covers non-emergency care only in network.' },
    { q: 'What is a dual-eligible special needs plan in Mississippi?', a: `A Medicare Advantage plan only for people who have both Medicare and Mississippi Medicaid. For 2027 the state has ${s.dsnp} of them. They coordinate the benefits of both programs, often with extra services, and members with full Medicaid can change into an integrated plan once a month.` },
  ],
  related: ['state:alabama', 'state:louisiana', 'state:tennessee', 'state:arkansas', 'special-needs-plans', 'zero-premium-plans'],
});
