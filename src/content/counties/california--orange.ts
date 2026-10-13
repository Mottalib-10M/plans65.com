import { defineCounty } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const c = K.county('california', 'orange');
const la = K.county('california', 'los-angeles');
const rv = K.county('california', 'riverside');
const sd = K.county('california', 'san-diego');

export default defineCounty({
  state: 'california',
  county: 'orange',
  title: `Medicare Advantage Plans Orange County CA 2027: ${c.std} Plans`,
  description: `Orange County, California: ${c.std} Medicare Advantage plans open to all for 2027, a median cap of ${K.usd(c.moopMed!)}, ${c.zero} at $0 with drugs. Each plan listed, no ZIP code.`,
  intro: `Half the plans open to everyone in Orange County cap yearly medical costs at ${K.usd(c.moopMed!)} or less, a figure few counties anywhere come near.`,
  resume: `Orange County, California, has the lowest median out-of-pocket cap of the large Southern California counties for 2027: half of its ${c.std} open Medicare Advantage plans limit in-network spending to ${K.usd(c.moopMed!)} or less, against ${K.usd(la.moopMed!)} in Los Angeles and a national median of ${K.usd(K.nat.moopMed)}. The cheapest cap is ${K.usd(c.moopMin!)}, with ${c.lowMoop!.n}. Prices are low too: ${c.zero} drug-covering plans have a $0 premium and the most expensive open plan costs ${K.usd(c.premMax!)} a month. ${c.star4} plans hold four stars or more in the 2027 ratings, topped by ${c.best!.n} at ${c.starMax} stars. Nearly all of the menu is HMO (${c.hmo} plans, ${c.ppo} PPOs). Compared with 2026, the county went from ${c.std26} to ${c.std} open plans, with ${c.gone} IDs dropped and ${c.new} new ones. Special needs plans number ${c.snp}, most of them for chronic conditions.`,
  body: (h) => `
<h2>A median cap near ${K.usd(c.moopMed!)}: how to read it</h2>
<p>A median this low means that in half of the open plans, a bad year with a hospital stay and months of treatment costs you no more than a four-figure sum, as long as you stay in network. That is the strong side. The other side is that low-cap HMOs here are organized around medical groups: you pick one when you enroll, and specialists are reached through its referrals. Before you switch for a lower cap, check that your current physician belongs to the group the plan assigns, not only to the plan.</p>
${h.mini('zeroTrue')}
<h3>Insurers by number of plans</h3>
<p>${c.orgList.map(([o, n]) => `${o} (${n})`).join(', ')}. Imperial Health Plan, SCAN and Blue Shield fill the bottom of the cap ranking; Kaiser's LA and Orange Value plan has the highest rating. Providence Medicare Sycamore, an Alignment Health PPO and four Central Health plans are among the IDs not filed for 2027.</p>
<h2>Few plans for people with Medi-Cal</h2>
<p>Only ${c.dsnp} of the ${c.snp} special needs plans are for people with both Medicare and Medi-Cal, while ${c.csnp} serve chronic conditions. Dual-eligible residents should ask the county's Medi-Cal office or the HICAP counseling program which integrated option applies to them before the annual window closes on December 7.</p>
<h3>Neighboring menus</h3>
<p>Los Angeles lists ${la.std} open plans, Riverside ${rv.std} and San Diego ${sd.std}. A move across any of those lines changes the plans you can join.</p>
`,
  faqs: [
    { q: 'What is the median out-of-pocket maximum for Orange County, California Medicare Advantage plans in 2027?', a: `${K.usd(c.moopMed!)} in network, across ${c.std} plans open to anyone with Parts A and B, according to the CMS landscape file of September 2026. The lowest cap is ${K.usd(c.moopMin!)} and the highest ${K.usd(c.moopMax!)}. The cap counts copays and coinsurance for covered medical care, not premiums or drugs.` },
    { q: 'Do Orange County CA Medicare Advantage plans have monthly premiums in 2027?', a: `Most do not: ${c.zero} plans with drug coverage charge $0, and the highest premium among the open plans is ${K.usd(c.premMax!)} a month. You keep paying the Part B premium of ${K.cents(K.P.partB['2026'].premium)} a month in 2026 to Social Security either way, unless a plan's Part B giveback reduces it.` },
    { q: 'Which Orange County CA Medicare Advantage plans were discontinued for 2027?', a: `${c.gone} plan IDs offered in 2026 are not in the 2027 CMS file, including Providence Medicare Sycamore + Rx and several Central Health plans. The full list is at the bottom of this page. Members of a closed plan can choose a new one until December 7, 2026, or later through a special enrollment period.` },
  ],
  related: ['state:california', 'county:california/los-angeles', 'county:california/riverside', 'county:california/san-diego', 'zero-premium-plans'],
});
