import { defineState } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const s = K.state('south-carolina');
const top = K.counties('south-carolina', 'std');
const low = K.counties('south-carolina', 'std', true);
const bft = K.county('south-carolina', 'beaufort');
const hry = K.county('south-carolina', 'horry');
const chs = K.county('south-carolina', 'charleston');

export default defineState({
  slug: 'south-carolina',
  title: `Medicare Advantage Plans South Carolina 2027: Caps, Choices`,
  description: `South Carolina Medicare Advantage 2027: ${s.std} open plans, no cap below ${K.usd(s.moopMin!)}, a median of ${K.usd(s.moopMed!)}, ${s.zero} at $0 with drugs. Upstate to the Lowcountry, every plan.`,
  intro: `Lots of plans in every county, and not one of them with a low out-of-pocket ceiling: South Carolina's floor sits where many states' medians do.`,
  resume: `South Carolina offers ${s.std} Medicare Advantage plans open to anyone with Parts A and B for 2027, and every county has at least ${low[0].std}, yet the protection against a bad year is thin. The lowest in-network out-of-pocket cap filed anywhere in the state is ${K.usd(s.moopMin!)}, roughly the national median of ${K.usd(K.nat.moopMed)}, and the median South Carolina cap is ${K.usd(s.moopMed!)}. Premiums are the strong side: ${s.zero} drug-covering plans charge $0. The Upstate leads on choice, with ${top.slice(0, 2).map((c) => `${c.name} (${c.std})`).join(' and ')}; the Pee Dee trails, with ${low[0].name} at ${low[0].std}. Beaufort County, around Hilton Head, has ${bft.std}. ${s.star4} plans rate four stars or more, and the top is ${s.starMax}. ${s.orgList[0][0]} files the most plans, ${s.orgList[0][1]}. ${s.snp} special needs plans and ${s.pdp} stand-alone drug plans are in the tables below.`,
  body: (h) => `
<h2>A floor of ${K.usd(s.moopMin!)}</h2>
<p>Nationally the lowest cap filed for 2027 is ${K.usd(K.nat.moopMin)}. South Carolina's file has nothing close: ${s.lowMoop!.n}, from ${s.lowMoop!.o}, and ${s.cheapHigh!.n} share the lowest ceiling, ${K.usd(s.moopMin!)}. Half the open plans sit at ${K.usd(s.moopMed!)} or more, close to the ${K.usd(K.nat.moopMax)} federal limit. For a healthy year this hardly matters. For a year with a heart procedure or cancer treatment, the cap is the bill.</p>
${h.mini('capVsOriginal', { moop: s.moopMin })}
<p>Run the calculator with your own expected care. Against Original Medicare without a supplement, even the highest cap is a ceiling the program alone does not offer; against a Medigap policy, it is a sizable exposure.</p>
<h2>Five stars, high cap</h2>
<p>${s.best!.n} is the state's top-rated open plan at ${s.best!.star} stars, with a $0 premium and a part of the Part B premium given back each month. Its cap is ${K.usd(s.best!.moop!)}. Ratings describe quality and service; they say nothing about the worst-case cost, so read both columns in the county table.</p>
<h3>Upstate, Midlands, Lowcountry</h3>
<p>${top.slice(0, 5).map((c) => `${c.name} ${c.std}`).join(', ')}: the I-85 corridor carries the most plans, with Berkeley and Dorchester, outside Charleston, close behind at ${K.county('south-carolina', 'berkeley').std} each. Charleston itself has ${chs.std}, Horry, around Myrtle Beach, ${hry.std}. ${low.slice(0, 3).map((c) => `${c.name} (${c.std})`).join(', ')} have the fewest. The parent companies with the most filings are ${s.orgList.slice(0, 4).map(([o, n]) => `${o} (${n})`).join(', ')}. The state had ${s.std26} open plans in 2026. PPOs outnumber HMOs here, ${s.ppo} to ${s.hmo}, which suits people who see doctors in two states.</p>
`,
  faqs: [
    { q: 'What is the lowest Medicare Advantage out-of-pocket maximum in South Carolina for 2027?', a: `${K.usd(s.moopMin!)} for in-network care, per the CMS landscape file of September 2026; no South Carolina plan goes lower. The median among the ${s.std} open plans is ${K.usd(s.moopMed!)}. Drug costs are capped separately at ${K.usd(K.P.partD['2027'].oopCap)} for 2027 under Part D, whichever plan you choose.` },
    { q: 'How many Medicare Advantage plans are available around Hilton Head and Beaufort for 2027?', a: `Beaufort County has ${bft.std} open plans for 2027, ${bft.zero} of them at $0 with drug coverage, and a lowest cap of ${K.usd(bft.moopMin!)}. That is fewer than the Upstate, where ${top[0].name} County lists ${top[0].std}. Check that a plan's network includes the hospitals your specialists use, since some are across the Georgia line.` },
    { q: 'Is there a five-star Medicare Advantage plan in South Carolina for 2027?', a: `Yes. ${s.best!.n} holds ${s.best!.star} stars for 2027, with a $0 premium and a ${K.usd(s.best!.moop!)} cap. Five-star plans can be joined once during the year through a special enrollment period, not only in the fall. ${s.star4} South Carolina open plans have four stars or more.` },
  ],
  related: ['state:north-carolina', 'state:georgia', 'medigap-plan-g', 'compare-plans', 'star-ratings'],
});
