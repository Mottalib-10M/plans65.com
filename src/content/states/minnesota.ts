import { defineState } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const s = K.state('minnesota');
const top = K.counties('minnesota', 'std');
const none = K.counties('minnesota', 'std', true).filter((c) => c.std === 0).map((c) => c.name);
const thin = K.counties('minnesota', 'std', true).filter((c) => c.std > 0);
const hen = K.county('minnesota', 'hennepin');

export default defineState({
  slug: 'minnesota',
  title: `Medicare Advantage Plans Minnesota 2027: ${s.std} Plans, Cost`,
  description: `Minnesota Medicare Advantage 2027: ${s.std} open plans after ${s.std26} in 2026, ${s.cost} cost plans, only ${s.zero} at $0 with drugs, ${none.length} counties with no open plan. All counties.`,
  intro: `Minnesota still has Medicare cost plans, a model that lets you go out of network on Original Medicare, and it lost ${s.std26 - s.std} open plans for 2027.`,
  resume: `Minnesota has ${s.std} Medicare plans open to anyone with Parts A and B for 2027, against ${s.std26} in 2026, one of the largest proportional drops in the country. The list is unlike any other state's: ${s.cost} of those plans are cost plans, an older model in which Original Medicare pays for care you get outside the plan's network. PPOs dominate the Advantage side with ${s.ppo} plans, against ${s.hmo} HMOs. Free plans are rare: ${s.zero} of the ${s.mapd} drug-covering plans charge a $0 premium. The lowest cap, ${K.usd(s.moopMin!)}, belongs to a cost plan with a premium of ${K.prem(s.lowMoop!.m)}. The Twin Cities counties list about ${top[0].std} plans each, while ${none.length} counties, ${none.join(', ')}, have no open plan at all in 2027. Medica and Aware Integrated, the parent of Blue Cross and Blue Shield of Minnesota, file the most plans. ${s.pdp} stand-alone drug plans are sold, from ${K.prem(s.pdpMin)} a month.`,
  body: (h) => `
<h2>Cost plans: the Minnesota exception</h2>
<p>A cost plan, contracted under section 1876 of the Social Security Act, has a network like an HMO, but if you see a provider outside it, Original Medicare pays as it normally would and you owe Original Medicare's cost sharing. Many cost plans do not include drugs: you add a stand-alone Part D plan. They tend to have higher premiums than Advantage plans and, in Minnesota, some of the lowest caps for in-network care: ${s.lowMoop!.n} caps spending at ${K.usd(s.lowMoop!.moop)} for ${K.prem(s.lowMoop!.m)} a month. They suit people who want a network for routine care and the freedom to use any Medicare provider, for example during winters in the South. When a cost plan does not renew in your area, its members get a special period from December 8 to the last day of February to choose an Advantage plan (${h.src('cfr_422_62', '42 CFR 422.62(b)(6)')}).</p>
${h.mini('capVsOriginal', { moop: s.moopMed })}
<h2>Twin Cities, Iron Range and the empty counties</h2>
<p>${top.slice(0, 4).map((c) => `${c.name} (${c.std})`).join(', ')} lead the state; Hennepin County lists ${hen.std}, ${hen.zero} of them free with drugs. In the northwest, ${thin.slice(0, 3).map((c) => `${c.name} (${c.std})`).join(', ')} have only a couple of plans each, and ${none.join(', ')} have none. People there keep Original Medicare, a Part D plan and often a Medigap policy.</p>
<h3>Who files the plans</h3>
<p>${s.orgList.map(([o, n]) => `${o} (${n})`).join(', ')} file the most plans. The best-rated is ${s.best!.n}, at ${K.prem(s.best!.m)} with a ${K.usd(s.best!.moop)} cap. If your 2026 plan is gone, read the ${h.a('plans-leaving', 'guide to plans leaving')}: a plan ending in your area opens a special period and guaranteed Medigap rights. Neighbors: ${h.a('state:wisconsin', 'Wisconsin')}, ${h.a('state:iowa', 'Iowa')}, ${h.a('state:north-dakota', 'North Dakota')}.</p>
`,
  faqs: [
    { q: 'What is a Medicare cost plan in Minnesota?', a: `A plan with its own network in which Original Medicare still pays for covered care you get outside that network, with Original Medicare's cost sharing. Minnesota has ${s.cost} cost plans open to everyone for 2027. Many do not include drug coverage, so members add a stand-alone Part D plan.` },
    { q: 'Which Minnesota counties have no Medicare Advantage plan for 2027?', a: `${none.join(', ')} have no plan open to the general public in the CMS landscape file of September 2026. Residents can keep Original Medicare, add one of the ${s.pdp} stand-alone Part D plans sold in Minnesota, and buy a Medigap policy for the costs Medicare leaves.` },
    { q: 'Why are there fewer Medicare Advantage plans in Minnesota for 2027?', a: `Insurers filed ${s.std} open plans for 2027 against ${s.std26} for 2026. Some plans closed or left counties, others were merged. Your Annual Notice of Change says what happens to your plan; if it ends in your area, you have a special enrollment period to choose another plan or Original Medicare.` },
  ],
  related: ['state:wisconsin', 'state:iowa', 'state:north-dakota', 'state:south-dakota', 'plans-leaving', 'hmo-vs-ppo'],
});
