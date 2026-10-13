import { defineState } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const s = K.state('colorado');
const top = K.counties('colorado', 'std');
const none = K.counties('colorado', 'std', true).filter((c) => c.std === 0);
const routt = K.county('colorado', 'routt');
const den = K.county('colorado', 'denver');
const names = none.map((c) => c.name);

export default defineState({
  slug: 'colorado',
  title: `Medicare Advantage Plans Colorado 2027: ${none.length} Counties Lack One`,
  description: `Colorado Medicare Advantage 2027: ${s.std} open plans, yet ${none.length} counties, from Eagle to the eastern plains, have no open plan. Every county and plan, caps from ${K.usd(s.moopMin!)}.`,
  intro: `Front Range residents pick from dozens of plans for 2027, while ${none.length} Colorado counties, including ski country around Vail, have none open to the general public.`,
  resume: `Colorado has ${s.std} Medicare Advantage plans open to anyone with Parts A and B for 2027, and ${s.zero} of the drug-covering ones charge no monthly premium. Those plans are not spread evenly: ${none.length} of the state's ${s.counties} counties have no open plan at all, among them ${names.slice(0, 4).join(', ')} and ${names[4]}, and Routt County has ${routt.std}. Along the Front Range the list is long, with ${top[0].name} County at ${top[0].std} and Denver at ${den.std}. In-network caps run from ${K.usd(s.moopMin!)} to ${K.usd(s.moopMax!)}, median ${K.usd(s.moopMed!)}. ${s.star4} plans score four stars or more for 2027, a high share. The open list shrank from ${s.std26} plans in 2026, ${K.change(s.std, s.std26)}. In counties with no plan, Original Medicare with a Medigap policy and one of the ${s.pdp} stand-alone drug plans is the usual route.`,
  body: (h) => `
<h2>Mountain resorts and plains counties with no plan</h2>
<p>The ${none.length} Colorado counties without an open Medicare Advantage plan for 2027 are ${names.slice(0, -1).join(', ')} and ${names[names.length - 1]}. Some are on the eastern plains near Kansas and Nebraska, others in the San Luis Valley or on the Western Slope; Eagle County, home to Vail, is on the list. Insurers file a plan only where they can sign enough doctors and hospitals, and small, remote populations make that hard. A few of these counties may still show special needs plans, which are reserved for people with Medicaid or specific conditions.</p>
<h3>What residents of those counties can buy instead</h3>
<p>Original Medicare works at any provider that accepts Medicare. A Medigap policy covers part or all of the deductibles and coinsurance it leaves, and a stand-alone Part D plan adds drugs: ${s.pdp} are sold statewide from ${K.prem(s.pdpMin!)} a month. The cheapest way to cap a bad year in Medigap is often a high-deductible Plan G, with a ${K.usd(K.P.medigap.hdDeductible['2027'])} deductible in 2027. Weigh the premium saved against that deductible here.</p>
${h.mini('hdg')}
<h2>The Front Range market</h2>
<p>${top.slice(0, 4).map((c) => `${c.name} (${c.std})`).join(', ')} have the longest lists. Kaiser Permanente runs its own clinics in the Denver and Boulder area, and Intermountain Health Care files plans as well. ${s.orgList.map(([o, n]) => `${o} (${n})`).join(', ')} file the most open segments. The lowest cap, ${K.usd(s.lowMoop!.moop)}, belongs to ${s.lowMoop!.n}, which costs ${K.prem(s.lowMoop!.m)} a month, so the best protection again comes at a price. The highest-rated plan is ${s.best!.n}, at ${s.best!.star} stars.</p>
<h3>HMO country with a few PPOs</h3>
<p>Colorado has ${s.hmo} HMOs against ${s.ppo} PPOs. If you split the year between Colorado and another state, an HMO covers routine care only at home. Colorado also offers ${s.dsnp} D-SNPs for people enrolled in Health First Colorado, the state Medicaid program, and ${s.csnp} C-SNPs for chronic conditions. See ${h.a('hmo-vs-ppo', 'HMO versus PPO')} for the difference.</p>
`,
  faqs: [
    { q: 'Which Colorado counties have no Medicare Advantage plan open to everyone in 2027?', a: `${none.length} counties: ${names.join(', ')}. The CMS landscape file of September 2026 lists no open plan for them, although some may have special needs plans. Residents usually choose Original Medicare with a Medigap policy and a Part D plan.` },
    { q: 'If I move from Denver to a Colorado county with no plan, what happens to my coverage?', a: `Your Medicare Advantage plan ends when you leave its service area, and the move opens a special enrollment period to choose new coverage, including a return to Original Medicare and a Part D plan. Medigap insurers may ask health questions at that point unless a federal or Colorado guarantee applies; ask the SHIP before you move.` },
    { q: 'How much did the number of Colorado Medicare Advantage plans change for 2027?', a: `The open list went from ${s.std26} plans in 2026 to ${s.std} for 2027, ${K.change(s.std, s.std26)}, based on the CMS landscape files. Members of a plan not renewed are notified by their insurer and can pick another plan during the annual period that ends on ${K.day(K.P.periods.aep.end)}.` },
  ],
  related: ['state:utah', 'state:kansas', 'state:new-mexico', 'state:wyoming', 'medigap-plan-g', 'hmo-vs-ppo'],
});
