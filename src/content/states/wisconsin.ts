import { defineState } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const s = K.state('wisconsin');
const top = K.counties('wisconsin', 'std');
const thin = K.counties('wisconsin', 'std', true);
const mil = K.county('wisconsin', 'milwaukee');
const dane = K.county('wisconsin', 'dane');

export default defineState({
  slug: 'wisconsin',
  title: `Medicare Advantage Plans Wisconsin 2027: ${s.std} Plans, Low Caps`,
  description: `Wisconsin Medicare Advantage 2027: ${s.std} open plans from ${s.orgs} insurers, ${s.cost} cost plans, caps from ${K.usd(s.moopMin!)} and a median of ${K.usd(s.moopMed!)}. Every county is listed here.`,
  intro: `Wisconsin has one of the lowest median caps in the country and an unusual mix of insurers: health systems, a university plan and ${s.cost} cost plans.`,
  resume: `Wisconsin has ${s.std} Medicare plans open to anyone with Parts A and B for 2027, against ${s.std26} in 2026, filed by ${s.orgs} organizations, more than in most states of its size. The median in-network cap is ${K.usd(s.moopMed!)}, well under the national ${K.usd(K.nat.moopMed)}, and the lowest is ${K.usd(s.moopMin!)}, for ${s.lowMoop!.n} at ${K.prem(s.lowMoop!.m)} a month. Free plans are less common than in the South: ${s.zero} of the ${s.mapd} drug-covering plans. The list includes ${s.cost} cost plans, which let Original Medicare pay for care outside their network. The insurers are partly local: ${s.orgList.slice(0, 4).map(([o]) => o).join(', ')}. The northeast has the longest lists, ${top.slice(0, 2).map((c) => `${c.name} (${c.std})`).join(' and ')}, while ${thin.slice(0, 3).map((c) => c.name).join(', ')} in the southwest list ${thin[0].std}. ${s.star4} plans are rated four stars or more. Stand-alone drug plans are cheap here, with a median premium of ${K.prem(s.pdpMed)}.`,
  body: (h) => `
<h2>Health systems that sell plans</h2>
<p>Dean Advantage, linked to SSM Health, Quartz, owned in part by UW Health and Gundersen, and Medica file many Wisconsin plans next to Humana and UnitedHealthcare. Their plans are built around specific hospitals: Madison's, La Crosse's or Green Bay's. Dane County lists ${dane.std} open plans, with the lowest cap in the state, ${K.usd(dane.moopMin!)}, but only ${dane.zero} at $0 with drugs; Milwaukee County lists ${mil.std}, ${mil.zero} of them free. The difference reflects which systems contract in each county.</p>
${h.mini('capVsOriginal', { moop: s.moopMed })}
<h2>Cost plans next to Advantage plans</h2>
<p>The ${s.cost} cost plans on the list keep a network for routine care but let you see any provider who accepts Medicare, with Original Medicare paying as usual for out-of-network care. They usually carry a premium and often no drug coverage, so members add a stand-alone Part D plan. In Wisconsin, with a median stand-alone premium of ${K.prem(s.pdpMed)}, that addition costs less than in many states.</p>
<h3>Ratings and the trade between premium and cap</h3>
<p>The best 2027 rating, ${s.starMax} stars, goes to plans such as ${s.best!.n}, at ${K.prem(s.best!.m)} with a ${K.usd(s.best!.moop)} cap. The lowest caps in Wisconsin come with premiums, as with ${s.lowMoop!.n} at ${K.prem(s.lowMoop!.m)}: someone expecting a surgery may save money paying that premium, someone in good health usually will not.</p>
<h3>From Green Bay to the Driftless</h3>
<p>${top.slice(0, 4).map((c) => `${c.name} (${c.std})`).join(', ')} lead; ${thin.slice(0, 3).map((c) => `${c.name} (${c.std})`).join(', ')} close the list, where La Crosse, Dubuque or Madison hospitals may be the nearest. Wisconsin counts ${s.snp} special needs plans, ${s.dsnp} for people with Medicaid. Neighbors: ${h.a('state:minnesota', 'Minnesota')}, ${h.a('state:michigan', 'Michigan')}, ${h.a('state:illinois', 'Illinois')}, ${h.a('state:iowa', 'Iowa')}.</p>
`,
  faqs: [
    { q: 'What is the lowest out-of-pocket maximum for a Wisconsin Medicare Advantage plan in 2027?', a: `${K.usd(s.moopMin!)} in network, for ${s.lowMoop!.n}, offered by ${s.lowMoop!.o} at a ${K.prem(s.lowMoop!.m)} monthly premium where it is sold, according to the CMS landscape file of September 2026. The median cap among Wisconsin's ${s.std} open plans is ${K.usd(s.moopMed!)}.` },
    { q: 'How many Medicare Advantage plans are there in Milwaukee County for 2027?', a: `${mil.std} plans open to everyone, ${mil.zero} of them at $0 with drug coverage, with a lowest in-network cap of ${K.usd(mil.moopMin!)}. Dane County, around Madison, lists ${dane.std}. Check each plan's hospital network, since several Wisconsin plans are built around one health system.` },
    { q: 'Are there Medicare cost plans in Wisconsin?', a: `Yes, ${s.cost} cost plans are open to the public in Wisconsin for 2027. They have a network for routine care, but Original Medicare pays for covered care you receive outside it. Many do not include drugs, so members add a stand-alone Part D plan, which is relatively cheap in Wisconsin.` },
  ],
  related: ['state:minnesota', 'state:michigan', 'state:illinois', 'state:iowa', 'hmo-vs-ppo', 'compare-plans'],
});
