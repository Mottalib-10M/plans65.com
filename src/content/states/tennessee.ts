import { defineState } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const s = K.state('tennessee');
const top = K.counties('tennessee', 'std');
const low = K.counties('tennessee', 'std', true);
const knox = K.county('tennessee', 'knox');
const dav = K.county('tennessee', 'davidson');
const shel = K.county('tennessee', 'shelby');
const ham = K.county('tennessee', 'hamilton');

export default defineState({
  slug: 'tennessee',
  title: `Medicare Advantage Plans Tennessee 2027: ${s.std} Plans, Low Caps`,
  description: `Tennessee Medicare Advantage 2027: ${s.std} open plans, up from ${s.std26}, caps from ${K.usd(s.moopMin!)}, ${s.zero} at $0 with drugs. Memphis, Nashville, Knoxville and all ${s.counties} counties listed.`,
  intro: `One of the few states where the plan count grew for 2027, with Knoxville holding the lowest out-of-pocket cap in the state.`,
  resume: `Tennessee bucks the 2027 trend: while the national count of open plans fell from ${K.num(K.nat.std26)} to ${K.num(K.nat.std)}, the state gained, from ${s.std26} open-to-all plans in 2026 to ${s.std}. The other standout is the floor on out-of-pocket costs. ${s.lowMoop!.n} caps in-network spending at ${K.usd(s.lowMoop!.moop!)} for ${K.usd(s.lowMoop!.m!)} a month, and ${s.cheapHigh!.n} offers ${K.usd(s.cheapHigh!.moop!)} at $0 with ${s.cheapHigh!.star} stars. The statewide median cap is ${K.usd(s.moopMed!)}, under the national ${K.usd(K.nat.moopMed)}. ${s.zero} drug-covering plans charge no premium. Shelby County (Memphis) has the most open plans, ${shel.std}; Davidson (Nashville) has ${dav.std} and Knox (Knoxville) ${knox.std}, while ${low[0].name} County has ${low[0].std}. ${s.orgList[0][0]} files ${s.orgList[0][1]} plans, ahead of BlueCross BlueShield of Tennessee and Humana with ${s.orgList[1][1]} each. ${s.snp} special needs plans, ${s.csnp} of them for chronic conditions, and ${s.pdp} drug plans are listed below.`,
  body: (h) => `
<h2>East Tennessee's low ceilings</h2>
<p>Knox County received ${knox.new} new plan IDs for 2027, more than any of the big Tennessee counties, and its lowest cap is ${K.usd(knox.moopMin!)}. Chattanooga's Hamilton County reaches ${K.usd(ham.moopMin!)}. In Memphis and Nashville the lowest cap is ${K.usd(shel.moopMin!)}. A low cap is most valuable to someone who expects a surgery or a hospital admission, and that is where Tennessee plans differ most from Original Medicare.</p>
<h3>What Original Medicare charges for a stay</h3>
<p>Without a plan or supplement, a 2026 admission costs the Part A deductible of ${K.cents(K.P.partA['2026'].deductible)}, then daily coinsurance once the stay passes 60 days. Medicare Advantage plans replace that with their own daily copays, which count toward the cap. Compare a plan's hospital copay in its Summary of Benefits with the figure below.</p>
${h.mini('stay')}
<h2>Growth in the suburbs, cuts in the middle</h2>
<p>The gain is not everywhere. Davidson County went from ${dav.std26} to ${dav.std}, and ${low[0].name} County, south of Nashville, from ${K.county('tennessee', 'bedford').std26} to ${low[0].std}. The counties with the longest lists are ${top.slice(0, 4).map((c) => `${c.name} (${c.std})`).join(', ')}. ${s.hmo} HMOs and ${s.ppo} PPOs make up the field.</p>
<h3>Who files the plans</h3>
<p>${s.orgList.map(([o, n]) => `${o} (${n})`).join(', ')}: ${s.orgs} parent companies in all. The state's Blue Cross plan competes county by county with national carriers, and a newer entrant now files the most plans. A long filing list does not mean a large membership; it often means one company split a county into several premium and network variants.</p>
<h3>Chronic-condition plans</h3>
<p>Tennessee has ${s.csnp} C-SNPs, special needs plans limited to people with conditions such as diabetes or chronic heart failure. They tailor drug lists and care coordination to that condition. You need a qualifying diagnosis to join, and they are listed apart from the open plans in each county.</p>
`,
  faqs: [
    { q: 'Did Tennessee gain or lose Medicare Advantage plans for 2027?', a: `It gained. The CMS landscape files show ${s.std26} open plans in Tennessee for 2026 and ${s.std} for 2027, ${K.change(s.std, s.std26)}. Knox County was among the gainers, with ${knox.new} new plan IDs, while Davidson and ${low[0].name} counties lost plans. Every county has at least ${low[0].std} open plans.` },
    { q: 'What is the lowest out-of-pocket maximum on a Tennessee Medicare Advantage plan in 2027?', a: `${K.usd(s.moopMin!)} in-network, on ${s.lowMoop!.n}, which charges ${K.usd(s.lowMoop!.m!)} a month. Among $0 plans, ${s.cheapHigh!.n} caps costs at ${K.usd(s.cheapHigh!.moop!)}. Both are HMOs, sold only in some counties. The cap does not include Part D drugs, which have their own ${K.usd(K.P.partD['2027'].oopCap)} limit.` },
    { q: 'How many Medicare Advantage plans are available in Nashville for 2027?', a: `Davidson County has ${dav.std} open plans for 2027, ${dav.zero} of them at $0 with drug coverage, down from ${dav.std26} in 2026. Williamson County next door has ${K.county('tennessee', 'williamson').std}. The lowest cap in Davidson is ${K.usd(dav.moopMin!)}, according to the CMS file of September 2026.` },
  ],
  related: ['state:north-carolina', 'state:kentucky', 'state:georgia', 'state:alabama', 'special-needs-plans', 'part-a'],
});
