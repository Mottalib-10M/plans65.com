import { defineState } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const s = K.state('ohio');
const top = K.counties('ohio', 'std');
const low = K.counties('ohio', 'std', true);
const cuy = K.county('ohio', 'cuyahoga');
const fra = K.county('ohio', 'franklin');
const ham = K.county('ohio', 'hamilton');
const pa = K.P.partA['2026'];

export default defineState({
  slug: 'ohio',
  title: `Medicare Advantage Plans Ohio 2027: ${s.std} Plans by County`,
  description: `Ohio Medicare Advantage 2027: ${s.std} open plans, ${s.zero} at $0 with drugs, caps from ${K.usd(s.moopMin!)}, Akron and Cleveland with ${top[0].std}. All ${s.counties} counties listed, no agent call.`,
  intro: `Northeast Ohio has one of the deepest Medicare Advantage markets in the Midwest, built partly by insurers that exist only in Ohio.`,
  resume: `Ohio has ${s.std} Medicare Advantage plans open to everyone with Parts A and B for 2027, ${s.std26 - s.std} fewer than in 2026, and the northeast corner holds the richest choice: ${top.slice(0, 3).map((c) => `${c.name} (${c.std})`).join(', ')}. Franklin County, around Columbus, lists ${fra.std}; Hamilton, around Cincinnati, ${ham.std}. In the Appalachian southeast the menu shrinks to ${low[0].std} in ${low[0].name} County. ${s.zero} drug-covering plans charge no premium. The median in-network cap is ${K.usd(s.moopMed!)}, below the national ${K.usd(K.nat.moopMed)}, and the lowest is ${K.usd(s.moopMin!)}. Home-grown carriers matter here: Medical Mutual of Ohio files ${s.orgList.find(([o]) => o.startsWith('MEDICAL MUTUAL'))![1]} plans, and SummaCare, tied to the Akron area, holds the lowest cap. ${s.star4} plans rate four stars or more, so a high rating alone rarely narrows the field. ${s.snp} special needs plans and ${s.pdp} stand-alone drug plans follow.`,
  body: (h) => `
<h2>Ohio-only carriers next to the national names</h2>
<p>The list of parent companies reads ${s.orgList.map(([o, n]) => `${o} (${n})`).join(', ')}, with ${s.orgs} in total. Medical Mutual is a Cleveland-based mutual insurer, and SummaCare is the plan of an Akron health system. Their networks are narrow geographically but deep locally, which is the reverse of a national PPO. ${s.lowMoop!.n} carries the state's lowest cap, ${K.usd(s.lowMoop!.moop!)}, at ${K.usd(s.lowMoop!.m!)} a month: a plan priced for someone who expects heavy use of one hospital system.</p>
<h2>A hospital stay, inside and outside a plan</h2>
<p>Cleveland and Columbus are destinations for complex surgery, and that is when the structure of coverage shows. Under Original Medicare, a 2026 inpatient stay starts with a Part A deductible of ${K.cents(pa.deductible)} per benefit period, and daily coinsurance begins on day 61. A Medicare Advantage plan replaces that with its own per-day copays, all counted toward the plan's yearly cap. The calculator shows the Original Medicare side.</p>
${h.mini('stay')}
<h3>From Summit County to Scioto County</h3>
<p>The eight counties with the most open plans all sit in the northeast, between Cleveland, Akron, Canton and Youngstown, each with ${top[7].std} or more. Cuyahoga has ${cuy.std}, of which ${cuy.zero} at $0. In ${low.slice(0, 3).map((c) => `${c.name} (${c.std})`).join(', ')}, choice is far narrower, though no Ohio county is without plans. ${s.hmo} of the state's open plans are HMOs and ${s.ppo} PPOs, so in rural counties check which hospital each HMO uses before signing up, since a closer hospital outside the network is covered only for emergencies and urgent care.</p>
`,
  faqs: [
    { q: 'Which part of Ohio has the most Medicare Advantage plans for 2027?', a: `Northeast Ohio. ${top.slice(0, 4).map((c) => `${c.name} (${c.std})`).join(', ')} counties top the CMS landscape file of September 2026, ahead of Franklin at ${fra.std} and Hamilton at ${ham.std}. The fewest are in the southeast, with ${low[0].std} in ${low[0].name} County. Every one of Ohio's ${s.counties} counties has at least one open plan.` },
    { q: 'What is the lowest out-of-pocket maximum on an Ohio Medicare Advantage plan in 2027?', a: `${K.usd(s.moopMin!)} in-network, on ${s.lowMoop!.n}, which charges ${K.usd(s.lowMoop!.m!)} a month. Among $0 premium plans, ${s.cheapHigh!.n} offers a ${K.usd(s.cheapHigh!.moop!)} cap with ${s.cheapHigh!.star} stars. Caps apply only to covered medical services; Part D drug costs have their own ${K.usd(K.P.partD['2027'].oopCap)} limit.` },
    { q: 'How many Medicare Advantage plans did Ohio lose for 2027?', a: `The state went from ${s.std26} open plans in 2026 to ${s.std} in 2027, ${K.change(s.std, s.std26)}, according to the CMS landscape files. Cuyahoga County alone saw ${cuy.gone} plan IDs not filed again. Members of an ending plan receive a notice and a special enrollment period to choose again or return to Original Medicare.` },
  ],
  related: ['county:ohio/cuyahoga', 'county:ohio/franklin', 'state:pennsylvania', 'state:michigan', 'state:indiana', 'part-a'],
});
