import { defineCounty } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const c = K.county('florida', 'palm-beach');
const bw = K.county('florida', 'broward');
const mt = K.county('florida', 'martin');
const md = K.county('florida', 'miami-dade');
const fl = K.state('florida');
const ir = K.P.irmaa['2026'];

export default defineCounty({
  state: 'florida',
  county: 'palm-beach',
  title: `Medicare Advantage Plans Palm Beach 2027: ${c.star4} Rated 4+ Stars`,
  description: `Palm Beach County 2027: ${c.star4} of ${c.std} open Medicare Advantage plans rated four stars or more, ${c.ppo} PPOs, caps from ${K.usd(c.moopMin!)}, ${c.zero} at $0 with drugs. Full list.`,
  intro: `Most open plans in Palm Beach County score four stars or more for 2027, and PPOs fill a larger slice of the menu than in Broward or Miami-Dade.`,
  resume: `Palm Beach County scores well on quality in 2027: ${c.star4} of its ${c.std} Medicare Advantage plans open to anyone with Parts A and B carry four stars or more in the ratings CMS released on October 8, 2026, against ${bw.star4} of ${bw.std} in Broward. The menu also leans more toward PPOs than the rest of South Florida, with ${c.ppo} PPOs and ${c.hmo} HMOs (Broward has ${bw.ppo} PPOs, Miami-Dade ${md.ppo}), which suits residents who split the year between Florida and a home up north. ${c.zero} drug-covering plans have a $0 premium; the lowest in-network cap is ${K.usd(c.moopMin!)}, with ${c.lowMoop!.n}, and the median ${K.usd(c.moopMed!)}. ${c.best!.n} pairs ${c.starMax} stars with a ${K.usd(c.best!.moop!)} cap. Humana files ${c.topOrgN} plans, and Prominence Health Plan adds a local network. There were ${c.std26} open plans in 2026; ${c.gone} IDs ended and ${c.new} are new. ${c.snp} special needs plans complete the list.`,
  body: (h) => `
<h2>Four stars are common here, so look one level deeper</h2>
<p>When most plans carry four stars or more, the rating stops separating them. What still differs is the cap, the drug deductible, and whether your doctors are in the network. Prominence Plus and Prominence Extra Help, from the Prominence Health Plan tied to Universal Health Services hospitals, sit near the bottom of the cap ranking. Humana Gold Plus and the CarePlus plans fill the middle. Read the cap first, then the network, then the stars.</p>
<h3>PPOs for two-home retirees</h3>
<p>An HMO covers routine care only in its Florida network; out of state, it pays for emergencies and urgent care. A PPO from Florida Blue, UnitedHealthcare, Humana or Devoted pays part of the cost of a doctor in New York or Ohio too. Several Aetna PPOs, among them Aetna Medicare Signature, Premier and Signature Extra, are not in the 2027 file, so former members must choose again by December 7.</p>
<h2>A retirement income that dropped</h2>
<p>Many new retirees are surprised by IRMAA, the surcharge on Part B and drug premiums for higher incomes, which starts above ${K.usd(ir.single[0])} for a single filer in 2026. It uses the tax return from two years earlier. If your income fell after you stopped working, Social Security can use the newer figure.</p>
${h.mini('irmaaDrop')}
<h3>North to Martin, south to Broward</h3>
<p>Martin County lists ${mt.std} open plans with caps from ${K.usd(mt.moopMin!)}; Broward has ${bw.std}. Florida as a whole has ${fl.std}.</p>
`,
  faqs: [
    { q: 'How many four-star Medicare Advantage plans are in Palm Beach County for 2027?', a: `${c.star4} of the ${c.std} open plans have a 2027 rating of four stars or more, and the highest is ${c.starMax}, based on the Star Ratings CMS published on October 8, 2026. Ratings are given per contract, so several plans from one insurer share a score. New contracts show no rating.` },
    { q: 'Are there Medicare Advantage PPO plans in Palm Beach County for 2027?', a: `Yes, ${c.ppo} of the ${c.std} open plans are PPOs, according to the CMS landscape file of September 2026. They pay part of the cost of out-of-network doctors, which helps if you live part of the year in another state. Their in-network caps are often higher than those of the cheapest local HMOs.` },
    { q: 'What is Prominence Health Plan in Palm Beach County?', a: `Prominence Health Plan is an insurer owned by Universal Health Services that files ${c.orgList.find(([o]) => o.startsWith('Universal'))?.[1] ?? 0} open Medicare Advantage plans in Palm Beach County for 2027, among them Prominence Plus and Prominence Extra Help. Its networks lean on its parent's hospitals. Check the directory before joining if your doctors are elsewhere.` },
  ],
  related: ['state:florida', 'county:florida/broward', 'county:florida/miami-dade', 'star-ratings', 'irmaa-appeal'],
});
