import { defineState } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const s = K.state('new-jersey');
const top = K.counties('new-jersey', 'std');
const low = K.counties('new-jersey', 'std', true);
const camden = K.county('new-jersey', 'camden');

export default defineState({
  slug: 'new-jersey',
  title: `Medicare Advantage Plans New Jersey 2027: ${s.std} Plans, Big Caps`,
  description: `New Jersey Medicare Advantage for 2027: ${s.std} open plans, a median cap of ${K.usd(s.moopMed!)} near the federal limit, ${s.zero} at $0 with drugs. Every county and plan, no agent.`,
  intro: `Plenty of plans in every county, from Sussex to Cape May, but most of them come with an out-of-pocket ceiling close to the highest amount federal rules allow.`,
  resume: `The figure that matters most in New Jersey for 2027 is not the premium but the cap: the median in-network out-of-pocket maximum among the state's ${s.std} open Medicare Advantage plans is ${K.usd(s.moopMed!)}, against ${K.usd(K.nat.moopMed)} nationally and a federal ceiling of ${K.usd(K.nat.moopMax)}. Choice itself is broad and even. Every one of the ${s.counties} counties has at least ${low[0].std} open plans, and ${top[0].name} County leads with ${top[0].std}. ${s.zero} drug-covering plans charge a $0 premium, and the lowest cap filed is ${K.usd(s.moopMin!)}, so low-cap plans exist; they are simply the minority. ${s.star4} plans hold four stars or better for 2027, and the top rating is ${s.starMax}. ${s.snp} special needs plans and ${s.pdp} stand-alone drug plans, with a median premium of ${K.cents(s.pdpMed!)}, are listed below.`,
  body: (h) => `
<h2>Why so many New Jersey plans sit near ${K.usd(K.nat.moopMax)}</h2>
<p>Each year CMS sets an upper limit on what a plan may charge you for covered in-network care, and an insurer may choose any cap at or below it. In New Jersey most chose to stay near the top. Half of the open plans have a cap of ${K.usd(s.moopMed!)} or more. That design keeps premiums and copays low in a normal year, and shifts the risk onto the member in a bad one: a cancer treatment, a joint replacement with rehab, a long cardiac stay. The calculator below starts from the state's median cap.</p>
${h.mini('capVsOriginal', { moop: s.moopMed })}
<p>Against Original Medicare alone, which has no yearly limit at all, any cap is protection. Against a Medigap policy, which covers nearly all of the 20% coinsurance, a ${K.usd(s.moopMed!)} cap is a real exposure, and that comparison is the one many New Jersey retirees face.</p>
<h2>A star plan with a high ceiling</h2>
<p>The highest-rated open plan, ${s.best!.n}, holds ${s.best!.star} stars and a $0 premium, with a cap of ${K.usd(s.best!.moop!)}. Ratings measure quality and member experience, not your worst-case bill, so the two columns in the county table deserve to be read together. For a lower ceiling, ${s.lowMoop!.n} has the state's minimum at ${K.usd(s.lowMoop!.moop!)}.</p>
<h3>From Camden to Hunterdon</h3>
<p>South Jersey has the deepest menus: ${top.slice(0, 3).map((c) => `${c.name} ${c.std}`).join(', ')}. Camden County alone has ${camden.zero} plans at $0. The thinner end is still generous: ${low.slice(0, 3).map((c) => `${c.name} ${c.std}`).join(', ')}. ${s.orgList.slice(0, 5).map(([o, n]) => `${o} (${n})`).join(', ')} file the most plans. The total went from ${s.std26} in 2026 to ${s.std}, ${K.change(s.std, s.std26)}; county pages list the plan IDs that ended.</p>
`,
  faqs: [
    { q: 'What is the average out-of-pocket maximum for Medicare Advantage in New Jersey in 2027?', a: `The median cap among New Jersey's ${s.std} open plans is ${K.usd(s.moopMed!)} for in-network care, much higher than the national median of ${K.usd(K.nat.moopMed)}. The range runs from ${K.usd(s.moopMin!)} to ${K.usd(s.moopMax!)}, per the CMS landscape file of September 2026. Drugs are capped separately at ${K.usd(K.P.partD['2027'].oopCap)} for the year.` },
    { q: 'Which New Jersey county has the most Medicare Advantage plans for 2027?', a: `${top[0].name} County leads with ${top[0].std} open plans, followed by ${top[1].name} and ${top[2].name} with ${top[1].std} and ${top[2].std}. The smallest menu, in ${low[0].name} County, still holds ${low[0].std}. In New Jersey the gap between counties is narrow, so network and cap usually separate plans more than availability does.` },
    { q: 'Is a $0 premium plan in New Jersey worth it with a high cap?', a: `That depends on your health spending, which only you can weigh. ${s.zero} New Jersey plans with drug coverage have a $0 premium for 2027. In a year with little care, the premium saving dominates; in a year with a hospital stay, the cap sets the bill. The whole-year cost calculator shows both cases for any plan.` },
  ],
  related: ['state:new-york', 'state:pennsylvania', 'state:delaware', 'compare-plans', 'star-ratings', 'medigap-plan-g'],
});
