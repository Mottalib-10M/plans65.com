import { defineState } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const s = K.state('wyoming');
const top = K.counties('wyoming', 'std');
const thin = K.counties('wyoming', 'std', true);
const lar = K.county('wyoming', 'laramie');
const nat = K.county('wyoming', 'natrona');

export default defineState({
  slug: 'wyoming',
  title: `Medicare Advantage Plans Wyoming 2027: ${s.std} PPOs, None at $0`,
  description: `Medicare Advantage in Wyoming for 2027: ${s.std} open plans, all PPOs, no $0 plan with drug coverage, caps from ${K.usd(s.moopMin!)}. Every county from Laramie to Teton, no agent.`,
  intro: `Wyoming lost ${s.std26 - s.std} of its ${s.std26} open plans for 2027, and none of the remaining drug-covering plans is free.`,
  resume: `Wyoming has ${s.std} Medicare Advantage plans open to anyone with Parts A and B for 2027, against ${s.std26} in 2026, filed by just ${s.orgs} insurers, ${s.orgList.map(([o]) => o).join(' and ')}. All are PPOs. Of the ${s.mapd} plans that include drug coverage, none has a $0 premium; the free plans that exist are giveback plans without drugs, such as ${s.lowMoop!.n}. Caps are high, from ${K.usd(s.moopMin!)} up. Every county has at least one plan, but the spread is wide: Laramie County, around Cheyenne, lists ${lar.std}, while Natrona County, around Casper, and much of the center of the state list ${nat.std}. ${s.star4} plans carry four stars or more. No special needs plan is filed. For most residents, Original Medicare with one of the ${s.pdp} stand-alone drug plans (from ${K.prem(s.pdpMin)} a month) and a Medigap policy remains the main route, especially for anyone who travels to Denver, Billings or Salt Lake City for specialist care.`,
  body: (h) => `
<h2>A thin market across a big state</h2>
<p>With few people spread over long distances, Wyoming has always been a hard market for networks. For 2027, ${s.orgList.map(([o, n]) => `${o} files ${n}`).join(' and ')} open plans. Because every plan is a PPO, out-of-network care is covered at a higher share, which matters when the specialist you need is in Colorado, Montana or Utah.</p>
<h3>Where the eight plans are sold</h3>
<p>${top.filter((c) => c.std === top[0].std).map((c) => c.name).join(', ')} counties get the full list of ${top[0].std}. ${thin.slice(0, 6).map((c) => c.name).join(', ')} and several others get ${thin[0].std}. Teton and Park counties sit in between.</p>
${h.mini('capVsOriginal', { moop: s.moopMin })}
<h3>Giveback plans and VA care</h3>
<p>The giveback PPOs on the Wyoming list are designed mainly for people who already get drugs through the VA: they reduce the Part B premium, cover medical care in a PPO network and include no Part D. For anyone without VA drug coverage, such a plan means buying a separate drug plan, or facing the Part D late penalty later.</p>
<h2>The Original Medicare route</h2>
<p>Most Wyoming hospitals and doctors accept Original Medicare, which works anywhere in the country without a network. Its weakness is the 20% of Part B with no yearly limit, which a Medigap policy closes. Drugs come from a stand-alone plan: ${s.pdp} are sold in Wyoming for 2027, with a median premium of ${K.prem(s.pdpMed)}. The comparison with a PPO comes down to premium against flexibility: the ${h.a('annual-cost-calculator', 'whole-year calculator')} shows both for your care.</p>
<p>Plans that left for 2027: ${s.std26 - s.std} fewer open plans than in 2026. If yours is among them, see ${h.a('plans-leaving', 'plans leaving')} for the deadlines and your guaranteed Medigap rights. Neighbors: ${h.a('state:colorado', 'Colorado')}, ${h.a('state:montana', 'Montana')}, ${h.a('state:utah', 'Utah')}.</p>
`,
  faqs: [
    { q: 'Are there $0 premium Medicare Advantage plans in Wyoming for 2027?', a: `Not with drug coverage: none of Wyoming's ${s.mapd} drug-covering open plans has a $0 premium in the CMS 2027 file. A few giveback plans without drug coverage cost $0, such as ${s.lowMoop!.n}, but they leave you to buy a separate Part D plan unless you have VA or other drug coverage.` },
    { q: 'How many Medicare Advantage plans are there in Cheyenne, Wyoming?', a: `Laramie County, which includes Cheyenne, has ${lar.std} plans open to everyone for 2027, the most in Wyoming, all of them PPOs, with a lowest in-network cap of ${K.usd(lar.moopMin!)}, according to the CMS landscape file of September 2026. Several central counties have only ${thin[0].std}.` },
    { q: 'Why did Wyoming lose Medicare Advantage plans for 2027?', a: `Insurers filed ${s.std} open plans for 2027 against ${s.std26} for 2026, as some plans were closed or withdrawn from counties. Members of a plan that ends get a special enrollment period and guaranteed rights to buy certain Medigap policies within 63 days after the coverage ends.` },
  ],
  related: ['state:colorado', 'state:montana', 'state:utah', 'state:idaho', 'medigap', 'plans-leaving'],
});
