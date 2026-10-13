import { defineState } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const s = K.state('west-virginia');
const top = K.counties('west-virginia', 'std');
const thin = K.counties('west-virginia', 'std', true);
const kan = K.county('west-virginia', 'kanawha');

export default defineState({
  slug: 'west-virginia',
  title: `Medicare Advantage Plans West Virginia 2027: ${s.std} Plans`,
  description: `West Virginia Medicare Advantage 2027: ${s.std} open plans, a five-star local plan, ${s.zero} at $0 with drugs, caps from ${K.usd(s.moopMin!)}. All ${s.counties} counties are listed, no phone asked.`,
  intro: `Every West Virginia county has at least ${thin[0].std} open plans, an even spread for a rural state, and a small local insurer holds the only five-star rating.`,
  resume: `West Virginia has ${s.std} Medicare Advantage plans open to anyone with Parts A and B for 2027, against ${s.std26} in 2026. The list is unusually even for a mountain state: from ${top[0].std} open plans in ${top[0].name}, ${top[1].name} and ${top[2].name} counties down to ${thin[0].std} in ${thin[0].name}, so no county is left with only one or two choices. PPOs dominate, ${s.ppo} against ${s.hmo} HMOs. ${s.zero} of the ${s.mapd} drug-covering plans charge no premium, and the lowest cap, ${K.usd(s.moopMin!)}, belongs to ${s.lowMoop!.n}, a regional PPO at ${K.prem(s.lowMoop!.m)}. The median cap is ${K.usd(s.moopMed!)}. The only five-star plan in the state is ${s.best!.n}, from a local insurer, at ${K.prem(s.best!.m)} with a ${K.usd(s.best!.moop)} cap. ${s.orgList.slice(0, 3).map(([o]) => o).join(', ')} file the most plans. ${s.pdp} stand-alone drug plans are sold for 2027, against ${s.pdp26} in 2026.`,
  body: (h) => `
<h2>A five-star plan from Morgantown</h2>
<p>Peak Health, the insurer linked to the WVU Medicine system, files ${s.best!.n}, rated ${s.starMax} stars for 2027. A five-star plan in your county opens a special enrollment period: you can switch into it once between December 8 and November 30 of the plan year, even outside the fall window. As with any plan built around one health system, check that your doctors and the hospital you would use are in its network, particularly in the southern counties far from Morgantown.</p>
${h.mini('starsSep')}
<h2>PPOs in the hollows</h2>
<p>With ${s.ppo} PPOs among ${s.std} open plans, West Virginia leans toward plans that keep paying out of network, at a higher share. That fits a state where the nearest specialist may be across the line in Ohio, Kentucky, Pennsylvania or Virginia. Kanawha County, around Charleston, lists ${kan.std} plans, ${kan.zero} at $0 with drugs; ${top.slice(0, 4).map((c) => c.name).join(', ')} share the longest list, and ${thin.slice(0, 3).map((c) => `${c.name} (${c.std})`).join(', ')} the shortest.</p>
<h3>Regional PPOs</h3>
<p>Regional PPOs cover a whole Medicare Advantage region, which can span several states, with a single plan. The state's lowest cap comes from one of them, ${s.lowMoop!.n}. A regional plan can be the simplest choice for someone who receives care on both sides of a state line, provided the hospitals used are in its network.</p>
<h3>Changes for 2027</h3>
<p>Open plans fell by ${s.std26 - s.std} and stand-alone drug plans from ${s.pdp26} to ${s.pdp}. West Virginia lists ${s.snp} special needs plans, ${s.dsnp} for people with Medicaid. Neighbors: ${h.a('state:ohio', 'Ohio')}, ${h.a('state:kentucky', 'Kentucky')}, ${h.a('state:virginia', 'Virginia')}, ${h.a('state:pennsylvania', 'Pennsylvania')}.</p>
`,
  faqs: [
    { q: 'Is there a five-star Medicare Advantage plan in West Virginia for 2027?', a: `Yes: ${s.best!.n}, offered by ${s.best!.o}, carries a ${s.starMax}-star overall rating in the CMS 2027 Star Ratings of October 8, 2026. Where it is offered, it opens a special enrollment period that lets you switch into it once, from December 8 to November 30 of the plan year.` },
    { q: 'How many Medicare Advantage plans are there in Kanawha County, West Virginia?', a: `${kan.std} plans open to everyone for 2027, ${kan.zero} of them at $0 with drug coverage, with a lowest in-network cap of ${K.usd(kan.moopMin!)}, according to the CMS landscape file of September 2026. Several neighboring counties around Charleston and Huntington share the same list.` },
    { q: 'Are most West Virginia Medicare Advantage plans HMOs or PPOs?', a: `PPOs: ${s.ppo} of the state's ${s.std} open plans for 2027 are PPOs, against ${s.hmo} HMO-type plans. PPOs pay for out-of-network care at a higher cost share, which helps people who use hospitals in neighboring states or travel far from home for care.` },
  ],
  related: ['state:ohio', 'state:kentucky', 'state:virginia', 'state:pennsylvania', 'star-ratings', 'hmo-vs-ppo'],
});
