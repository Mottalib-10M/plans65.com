import { defineState } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const s = K.state('maine');
const top = K.counties('maine', 'std');
const thin = K.counties('maine', 'std', true);
const ken = K.county('maine', 'kennebec');
const aro = K.county('maine', 'aroostook');

export default defineState({
  slug: 'maine',
  title: `Medicare Advantage Plans Maine 2027: ${s.std} Plans, Few at $0`,
  description: `Medicare Advantage plans in Maine for 2027: ${s.std} open to all, only ${s.zero} at $0 with drugs, caps from ${K.usd(s.moopMin!)}. Every county from York to Aroostook, no agent call.`,
  intro: `A small market with a local player: Martin's Point files as many plans as Humana, and fewer than one Maine plan in three is free.`,
  resume: `Maine has ${s.std} Medicare Advantage plans open to anyone with Parts A and B for 2027, down from ${s.std26} in 2026, filed by ${s.orgs} insurers. Only ${s.zero} of the ${s.mapd} drug-covering plans charge a $0 premium, a much lower share than in the South or the Sun Belt. Caps are on the high side: the lowest in-network out-of-pocket maximum is ${K.usd(s.moopMin!)} and the median ${K.usd(s.moopMed!)}, against a national median of ${K.usd(K.nat.moopMed)}. The good news is quality: ${s.star4} plans hold four stars or more for 2027. Choice narrows from south to north, from ${top[0].std} open plans in ${top[0].name} County to ${thin[0].std} in ${thin[0].name}. Every Maine county has at least one plan. For people who keep Original Medicare, ${s.pdp} stand-alone drug plans are sold statewide, the cheapest at ${K.prem(s.pdpMin)} a month.`,
  body: (h) => `
<h2>A local insurer next to the national brands</h2>
<p>${s.orgList.map(([o, n]) => `${o} (${n})`).join(', ')} file the most open plans in Maine. Martin's Point, a Portland-based nonprofit with its own primary care centers, files as many plan segments as Humana. That matters for people who already see a Martin's Point doctor, and less for those whose care is in Bangor or the County, where networks thin out.</p>
<h3>Giveback plans</h3>
<p>Several Maine plans carry "Giveback" in their names, such as ${s.lowMoop!.n}, which also has the state's lowest cap at ${K.usd(s.lowMoop!.moop)}. These plans return part of the Part B premium through the Social Security deduction; the amount is in the plan's Summary of Benefits, not in the CMS file. Some of them have no drug coverage, which suits veterans who use VA pharmacies but would leave others without Part D.</p>
${h.mini('capVsOriginal', { moop: s.moopMed })}
<h2>From Kennebec to Aroostook</h2>
<p>Kennebec County, around Augusta, lists ${ken.std} open plans, ${ken.zero} of them free with drugs. Aroostook, the largest county east of the Mississippi, lists ${aro.std}, with a lowest cap of ${K.usd(aro.moopMin!)}. Distances there make the network question decisive: check that the hospital in Presque Isle, Caribou or Houlton is in network before choosing an HMO. ${top.slice(0, 4).map((c) => `${c.name} (${c.std})`).join(', ')} lead the state; ${thin.slice(0, 3).map((c) => `${c.name} (${c.std})`).join(', ')} close the list.</p>
<p>The open list fell by ${s.std26 - s.std} plans from 2026, and stand-alone drug plans from ${s.pdp26} to ${s.pdp}. Next door, compare ${h.a('state:new-hampshire', 'New Hampshire')} and ${h.a('state:vermont', 'Vermont')}.</p>
`,
  faqs: [
    { q: 'How many $0 premium Medicare Advantage plans are there in Maine for 2027?', a: `${s.zero} of the ${s.mapd} Maine plans that are open to everyone and include drug coverage charge no premium in 2027, according to the CMS landscape file of September 2026. Several more $0 plans have no drug coverage, often giveback plans aimed at veterans who use VA pharmacy benefits.` },
    { q: 'Which insurers offer Medicare Advantage plans in Maine in 2027?', a: `${s.orgs} parent organizations file open plans in Maine for 2027. The largest numbers come from ${s.orgList.slice(0, 3).map(([o]) => o).join(', ')}. Plan counts are not enrollment shares: check the plans of your own county in the finder, with their caps and 2027 star ratings.` },
    { q: 'Is there a Medicare Advantage plan in Aroostook County, Maine?', a: `Yes. Aroostook County has ${aro.std} plans open to everyone for 2027, ${aro.zero} of them at $0 with drug coverage, and a lowest in-network cap of ${K.usd(aro.moopMin!)}. Check each plan's hospital network before joining: in the County, the nearest in-network hospital can be far away.` },
  ],
  related: ['state:new-hampshire', 'state:vermont', 'state:massachusetts', 'zero-premium-plans', 'medigap'],
});
