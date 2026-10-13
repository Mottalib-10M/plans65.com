import { defineCounty } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const c = K.county('new-york', 'kings');
const qn = K.county('new-york', 'queens');
const mn = K.county('new-york', 'new-york');
const si = K.county('new-york', 'richmond');
const ny = K.state('new-york');

export default defineCounty({
  state: 'new-york',
  county: 'kings',
  title: `Medicare Advantage Plans Brooklyn (Kings) 2027: ${c.std} Plans`,
  description: `Brooklyn (Kings County) 2027: ${c.std} open Medicare Advantage plans, ${c.zero} at $0 with drugs, up from ${c.zero26}, but a median network cap of ${K.usd(c.moopMed!)}. Every plan, no agent.`,
  intro: `Brooklyn gained $0 plans for 2027 while most big counties lost some, yet half its open plans sit at the highest out-of-pocket cap filed anywhere.`,
  resume: `Brooklyn, which Medicare files as Kings County, is a market of low premiums and high caps for 2027. It lists ${c.std} Medicare Advantage plans open to anyone with Parts A and B, and ${c.zero} of the drug-covering ones charge no premium, a small gain over the ${c.zero26} of 2026 at a time when most large counties lost $0 plans. The other half of the bill moves the other way: the median in-network cap is ${K.usd(c.moopMed!)}, equal to the highest cap any plan filed in the country this year, and the lowest is ${K.usd(c.moopMin!)}, with ${c.lowMoop!.n}. ${c.best!.n} holds a ${c.starMax}-star rating, the maximum, but only ${c.star4} open plans reach four stars or more. Special needs plans number ${c.snp}, and ${c.dsnp} of them serve people with both Medicare and Medicaid. The open list went from ${c.std26} to ${c.std}, with ${c.gone} IDs gone, Elderplan's among them, and ${c.new} new.`,
  body: (h) => `
<h2>Why caps are so high in New York City</h2>
<p>Insurers set the cap within federal limits, and in New York they tend to set it at the top, often while keeping the premium at zero. For a healthy year, that costs nothing. For a year with surgery or dialysis, it means paying up to ${K.usd(c.moopMed!)} in copays before the plan covers everything in network. The national median cap is ${K.usd(K.nat.moopMed)}; in New York State it is ${K.usd(ny.moopMed!)}. Compare the cap with what Original Medicare would cost you in a heavy year.</p>
${h.mini('capVsOriginal', { moop: c.moopMed })}
<h3>The five-star plan and its cap</h3>
<p>${c.best!.n}, from ${c.best!.o}, earns ${c.starMax} stars for 2027 and charges ${K.usd(c.best!.m)} a month, with a ${K.usd(c.best!.moop!)} cap. A top rating can be joined once during the year through the five-star special enrollment period. The lowest cap in Brooklyn belongs to ${c.lowMoop!.n}, a PPO without drug coverage aimed at veterans; ${c.cheapHigh!.n} combines a $0 premium with ${c.cheapHigh!.star} stars.</p>
<h2>Insurers and the Elderplan exits</h2>
<p>${c.orgList.map(([o, n]) => `${o} ${n}`).join(', ')} file the most open plans. Elderplan Extra Help and Elderplan Flex are among the IDs not filed again, with two Wellcare plans, an Aetna PPO and Anthem Veteran under its old ID. Healthfirst, EmblemHealth and MetroPlus remain the city-based names.</p>
<h3>Queens, Manhattan, Staten Island</h3>
<p>Queens lists ${qn.std} open plans, Manhattan ${mn.std} and Staten Island ${si.std}. Brooklyn has the longest menu of the five boroughs, but each borough is a separate county with its own filings.</p>
`,
  faqs: [
    { q: 'How many $0 premium Medicare Advantage plans are there in Brooklyn for 2027?', a: `${c.zero} plans with drug coverage and no monthly premium in Kings County, up from ${c.zero26} in 2026, according to the CMS landscape file of September 2026. Their caps are mostly high: half of Brooklyn's ${c.std} open plans have an in-network cap of ${K.usd(c.moopMed!)}. The Part B premium is still owed.` },
    { q: 'Is there a five-star Medicare Advantage plan in Brooklyn for 2027?', a: `Yes. ${c.best!.n}, from ${c.best!.o}, holds ${c.starMax} stars in the 2027 ratings released by CMS on October 8, 2026, with a ${K.usd(c.best!.m)} premium and a ${K.usd(c.best!.moop!)} cap. Only ${c.star4} of the ${c.std} open plans in Kings County reach four stars or more.` },
    { q: 'Why are Brooklyn Medicare Advantage out-of-pocket maximums so high?', a: `Insurers choose the cap, up to a federal ceiling, and most Brooklyn plans set it near the top: the median is ${K.usd(c.moopMed!)} and the lowest ${K.usd(c.moopMin!)}, per CMS 2027 data. Premiums stay low in exchange. Someone expecting heavy care may compare these caps with Original Medicare and a Medigap policy.` },
  ],
  related: ['state:new-york', 'county:new-york/queens', 'county:new-york/new-york', 'star-ratings', 'medigap'],
});
