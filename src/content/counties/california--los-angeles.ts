import { defineCounty } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const c = K.county('california', 'los-angeles');
const oc = K.county('california', 'orange');
const vt = K.county('california', 'ventura');
const sb = K.county('california', 'san-bernardino');
const ca = K.state('california');

export default defineCounty({
  state: 'california',
  county: 'los-angeles',
  title: `Medicare Advantage Plans Los Angeles 2027: Caps From ${K.usd(c.moopMin!)}`,
  description: `Los Angeles County lists ${c.std} open Medicare Advantage plans in 2027, ${c.zero} with drugs at $0 and a yearly medical cap as low as ${K.usd(c.moopMin!)}. Every plan, sorted by price.`,
  intro: `The smallest out-of-pocket cap in the whole 2027 landscape file is sold here, inside a market where almost every plan is an HMO.`,
  resume: `No county in the country has a lower out-of-pocket cap than Los Angeles for 2027: ${c.lowMoop!.n}, from ${c.lowMoop!.o}, limits in-network spending on covered medical care to ${K.usd(c.moopMin!)} for the year, the smallest MOOP (maximum out of pocket) in the CMS landscape file, where the national median is ${K.usd(K.nat.moopMed)}. Los Angeles County lists ${c.std} plans that anyone with Parts A and B can join, and ${c.zero} of the ones that include drug coverage charge no monthly premium. Half the open plans stop your costs at ${K.usd(c.moopMed!)} or less. HMOs make up ${c.hmo} of the ${c.std}; only ${c.ppo} are PPOs. ${c.star4} plans carry four stars or more for 2027, with ${c.best!.n} at ${c.starMax} stars. The 2026 file had ${c.std26} open plans here; ${c.gone} plan IDs were not filed again and ${c.new} appear for the first time.`,
  body: (h) => `
<h2>Why a ${K.usd(c.moopMin!)} cap can exist in Los Angeles</h2>
<p>The highest cap any plan filed for 2027 is ${K.usd(K.nat.moopMax)}, and most of the country sits far above Los Angeles. Here, ${c.orgList.slice(0, 3).map(([o, n]) => `${o} with ${n}`).join(', ')} lead the count of open plan segments, and much of their business runs through contracted medical groups that manage your care from a primary care office. The result is a menu where low caps are ordinary rather than rare. The catch is the network: in an HMO, every visit outside the plan's group, other than emergencies and urgent care, is yours to pay, and the cap does not apply to it.</p>
<h3>Health systems with their own plans</h3>
<p>Kaiser Permanente and UCLA Health both file plans in the county. ${c.best!.n} holds the best 2027 rating here, and the same Kaiser plan is also sold in Orange County, which lists ${oc.std} open plans and a median cap of ${K.usd(oc.moopMed!)}. A plan run by a hospital system usually means you get care inside that system, so it fits best if your doctors already practice there.</p>
${h.mini('capVsOriginal', { moop: c.moopMed })}
<h2>Chronic-condition plans outnumber Medicaid plans</h2>
<p>Los Angeles has ${c.snp} special needs plans, and ${c.csnp} of them are chronic-condition SNPs, built for people with diabetes, heart failure or similar diagnoses; just ${c.dsnp} are for people who also have Medicaid. That balance is unusual next to most large counties, where Medicaid plans lead. Across California the count is ${ca.snp} special needs plans.</p>
<h3>Next door and last year</h3>
<p>Ventura County, to the west, has only ${vt.std} open plans; San Bernardino, to the east, has ${sb.std}. Your plan must be filed for the county where you live. Among the ${c.gone} IDs that did not return for 2027 are several Central Health plans and Molina Medicare Choice Care: their members were told in the Annual Notice of Change where they will be moved, or that they must choose again by December 7.</p>
`,
  faqs: [
    { q: 'Which Los Angeles County Medicare Advantage plan has the lowest out-of-pocket cap in 2027?', a: `${c.lowMoop!.n}, from ${c.lowMoop!.o}, with an in-network cap of ${K.usd(c.moopMin!)} and a ${K.usd(c.lowMoop!.m)} monthly premium, per the CMS landscape file of September 2026. That cap is the lowest filed anywhere in the country. It covers Part A and B services in network only; drug costs fall under the separate Part D limit.` },
    { q: 'Are there PPO Medicare Advantage plans in Los Angeles County for 2027?', a: `Yes, but few: ${c.ppo} of the ${c.std} open plans are PPOs, against ${c.hmo} HMOs. A PPO pays part of the bill when you see a doctor outside its network, which matters if you split the year between Los Angeles and another state. Expect a higher cap than the cheapest HMOs; compare the out-of-network cap too.` },
    { q: 'How many Los Angeles Medicare Advantage plans are rated four stars or higher for 2027?', a: `${c.star4} of the ${c.std} open plans, based on the 2027 Star Ratings that CMS released on October 8, 2026. The highest score in the county is ${c.starMax} stars. A star rating is given to the insurer's contract, not the single plan, and a newly launched contract shows no rating yet.` },
  ],
  related: ['state:california', 'county:california/orange', 'county:california/san-bernardino', 'county:california/riverside', 'hmo-vs-ppo'],
});
