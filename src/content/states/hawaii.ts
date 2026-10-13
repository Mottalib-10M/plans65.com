import { defineState } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const s = K.state('hawaii');
const hon = K.county('hawaii', 'honolulu');
const maui = K.county('hawaii', 'maui');
const kauai = K.county('hawaii', 'kauai');
const big = K.county('hawaii', 'hawaii');
const kal = K.county('hawaii', 'kalawao');

export default defineState({
  slug: 'hawaii',
  title: `Medicare Advantage Plans Hawaii 2027: ${s.std} Plans by Island`,
  description: `Hawaii Medicare Advantage for 2027: ${s.std} open plans, ${hon.std} on Oahu, ${big.std} on the Big Island, ${s.zero} at $0 with drugs and caps from ${K.usd(s.moopMin!)}. Every plan, island by island.`,
  intro: `In Hawaii, each county is an island or a group of islands, and the choice of Medicare Advantage plans for 2027 narrows the farther you are from Honolulu.`,
  resume: `Hawaii has ${s.std} Medicare Advantage plans open to anyone with Parts A and B for 2027, and ${s.zero} of the ${s.mapd} with drug coverage charge no monthly premium. Oahu, which is Honolulu County, has the most, ${hon.std}; Maui County has ${maui.std}, Kauai ${kauai.std} and Hawaii County, the Big Island, ${big.std}. Kalawao County, the small settlement on Molokai's north shore, has ${kal.std}. Caps on in-network spending run from ${K.usd(s.moopMin!)} to ${K.usd(s.moopMax!)}, with a median of ${K.usd(s.moopMed!)}, above the national ${K.usd(K.nat.moopMed)}. PPOs make up ${s.ppo} of the list, HMOs ${s.hmo}. ${s.star4} plans hold four stars or more for 2027. Premiums reach ${K.prem(s.premMax!)} a month at the top end. The state also counts ${s.snp} special needs plans and ${s.pdp} stand-alone drug plans, with a median premium of ${K.prem(s.pdpMed!)}.`,
  body: (h) => `
<h2>Four island markets, one state</h2>
<p>Honolulu's lowest cap is ${K.usd(hon.moopMin!)}, Maui's ${K.usd(maui.moopMin!)}, Kauai's ${K.usd(kauai.moopMin!)} and the Big Island's ${K.usd(big.moopMin!)}. Specialist care and some hospital services are concentrated on Oahu, so a plan's network on your own island matters as much as its coverage for a trip to a Honolulu hospital. Before choosing, ask each plan how it handles a referral to Oahu and whether travel is covered as a supplemental benefit.</p>
<h3>Why PPOs lead here</h3>
<p>With ${s.ppo} PPOs against ${s.hmo} HMOs, Hawaii leans toward plans that allow out-of-network care at a higher share. That flexibility helps people who move between islands or spend part of the year on the mainland. ${s.orgList.map(([o, n]) => `${o} (${n})`).join(', ')} file the most open segments; Hawaii Medical Service Association, known as HMSA, is the state's Blue Cross Blue Shield plan, and Kaiser Permanente runs its own clinics.</p>
<h2>The cost of a hospital stay</h2>
<p>Under Original Medicare, a stay starts with the Part A deductible of ${K.cents(K.P.partA['2026'].deductible)} in 2026, and days 61 to 90 cost ${K.cents(K.P.partA['2026'].coin61)} each. Medicare Advantage plans replace that with their own daily copays up to the cap, which for the lowest-capped plan, ${s.lowMoop!.n}, is ${K.usd(s.lowMoop!.moop)} at ${K.prem(s.lowMoop!.m)} a month. The calculator shows the Original Medicare side.</p>
${h.mini('stay')}
<h3>Ratings, Medicaid plans and changes</h3>
<p>The top 2027 score in Hawaii is ${s.starMax} stars, held by ${s.best!.n}. Of the ${s.snp} special needs plans, ${s.dsnp} serve people with both Medicare and Med-QUEST, the state Medicaid program. The open list went from ${s.std26} plans in 2026 to ${s.std}, ${K.change(s.std, s.std26)}. For stand-alone drug coverage, the cheapest of the ${s.pdp} plans costs ${K.prem(s.pdpMin!)} a month, and ${s.pdpBench} are free with full Extra Help.</p>
`,
  faqs: [
    { q: 'How many Medicare Advantage plans are available on the Big Island of Hawaii for 2027?', a: `Hawaii County, the Big Island, has ${big.std} plans open to everyone for 2027, ${big.zero} of them at $0 with drug coverage, per the CMS landscape file of September 2026. Its lowest in-network cap is ${K.usd(big.moopMin!)}. Oahu has ${hon.std} open plans and the most choice in the state.` },
    { q: 'Does a Hawaii Medicare Advantage plan cover care when I fly to Honolulu?', a: `If the Honolulu hospital or specialist is in your plan's network, care is covered at in-network rates; a PPO also pays out of network at a higher share. Travel is a separate matter: some plans add transportation as an extra benefit and others do not, so ask the plan in writing before you enroll.` },
    { q: 'What is the most expensive Medicare Advantage premium in Hawaii for 2027?', a: `The highest monthly premium among Hawaii's ${s.std} open plans is ${K.prem(s.premMax!)}, according to CMS data. Most plans cost far less: ${s.zero} drug-covering plans charge nothing. A higher premium often buys a lower cap, such as ${K.usd(s.lowMoop!.moop)} for ${s.lowMoop!.n}.` },
  ],
  related: ['state:california', 'state:alaska', 'hmo-vs-ppo', 'part-a', 'compare-plans'],
});
