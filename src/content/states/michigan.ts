import { defineState } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const s = K.state('michigan');
const top = K.counties('michigan', 'std');
const thin = K.counties('michigan', 'std', true);
const wayne = K.county('michigan', 'wayne');
const kent = K.county('michigan', 'kent');

export default defineState({
  slug: 'michigan',
  title: `Medicare Advantage Plans Michigan 2027: ${s.std} Plans, PPO-Led`,
  description: `Michigan Medicare Advantage 2027: ${s.std} plans open to all, ${s.ppo} PPOs, ${s.zero} at $0 with drugs, caps from ${K.usd(s.moopMin!)}, from Detroit to the Upper Peninsula, no agent call.`,
  intro: `One of the few states where PPOs outnumber HMOs, Michigan has a dense list around Detroit and Ann Arbor and a thin one across the Upper Peninsula.`,
  resume: `Michigan has ${s.std} Medicare Advantage plans open to anyone with Parts A and B for 2027, down from ${s.std26} in 2026. Unusually, PPOs lead with ${s.ppo} plans against ${s.hmo} HMOs, and Blue Cross Blue Shield of Michigan files ${s.orgList[0][1]} plans, followed by ${s.orgList[1][0]} (${s.orgList[1][1]}). ${s.zero} of the ${s.mapd} drug-covering plans charge a $0 premium. Caps start at ${K.usd(s.moopMin!)}, with a median of ${K.usd(s.moopMed!)}. Southeast Michigan has the widest choice: ${top[0].name}, ${top[1].name}, ${top[2].name} and ${top[3].name} counties list ${top[3].std} or more open plans each. The Upper Peninsula is another market, with ${thin[0].std} plans in ${thin[0].name} County. ${s.star4} plans hold four stars or more for 2027, a high share. For people who keep Original Medicare, ${s.pdp} stand-alone drug plans are sold, from ${K.prem(s.pdpMin)} a month.`,
  body: (h) => `
<h2>Why PPOs lead in Michigan</h2>
<p>Michigan is one of the few states where the open list is mostly PPOs. Blue Cross Blue Shield of Michigan, through its Medicare Plus Blue PPOs, and Corewell Health, the system formed from Beaumont and Spectrum Health, file the most plans. A PPO's in-network cap is the figure in the county list; out-of-network care has a higher combined limit, and the premium is often higher too. The lowest cap in the state, ${K.usd(s.lowMoop!.moop)}, belongs to ${s.lowMoop!.n}, at ${K.prem(s.lowMoop!.m)} a month.</p>
${h.mini('zeroTrue')}
<h3>Health systems as insurers</h3>
<p>Henry Ford Health, Corewell and the University of Michigan region's systems sell plans built around their hospitals. For a patient of one of them, a plan from the same system usually means fewer network surprises; for someone with doctors in two systems, a PPO or a broad HMO is safer.</p>
<h2>Detroit, Grand Rapids and the Upper Peninsula</h2>
<p>Wayne County lists ${wayne.std} open plans, ${wayne.zero} of them at $0 with drugs; Kent County, around Grand Rapids, ${kent.std}. ${top.slice(0, 4).map((c) => `${c.name} (${c.std})`).join(', ')} lead the state. In the Upper Peninsula, ${thin.slice(0, 3).map((c) => `${c.name} (${c.std})`).join(', ')} have the shortest lists, and the nearest in-network specialist may be in Marquette or across the border in Wisconsin, a question to ask before joining an HMO. Ask also whether the plan covers the small critical access hospitals of the peninsula.</p>
<p>The state counts ${s.snp} special needs plans, ${s.dsnp} of them for people who also have Medicaid. Compared with 2026, ${s.std26 - s.std} fewer open plans were filed, and stand-alone drug plans went from ${s.pdp26} to ${s.pdp}; anyone whose plan is gone should read the ${h.a('plans-leaving', 'guide to plans leaving')} before December 7. Neighbors: ${h.a('state:ohio', 'Ohio')}, ${h.a('state:indiana', 'Indiana')}, ${h.a('state:wisconsin', 'Wisconsin')}.</p>
`,
  faqs: [
    { q: 'Are there more PPO or HMO Medicare Advantage plans in Michigan for 2027?', a: `More PPOs: ${s.ppo} PPO plans against ${s.hmo} HMO-type plans among the ${s.std} plans open to everyone in Michigan, according to the CMS landscape file of September 2026. PPOs let you see out-of-network providers at a higher cost share, which suits people who travel within the state.` },
    { q: 'How many Medicare Advantage plans are there in the Upper Peninsula of Michigan?', a: `Fewer than downstate: counties such as ${thin.slice(0, 3).map((c) => c.name).join(', ')} list ${thin[0].std} plans open to everyone for 2027, against ${top[0].std} in ${top[0].name} County. Check each plan's hospital network in the Upper Peninsula carefully, where distances between in-network facilities can be long.` },
    { q: 'Did Michigan lose Medicare Advantage plans for 2027?', a: `Yes, the CMS files show ${s.std} open plans for 2027 against ${s.std26} for 2026. Some plans closed, others merged or left counties. Your Annual Notice of Change says what happens to your plan, and a plan leaving your area gives you a special enrollment period and some guaranteed Medigap rights.` },
  ],
  related: ['county:michigan/wayne', 'state:ohio', 'state:indiana', 'state:wisconsin', 'hmo-vs-ppo', 'plans-leaving'],
});
