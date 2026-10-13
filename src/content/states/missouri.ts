import { defineState } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const s = K.state('missouri');
const top = K.counties('missouri', 'std');
const thin = K.counties('missouri', 'std', true);
const stl = K.county('missouri', 'st-louis');
const jack = K.county('missouri', 'jackson');

export default defineState({
  slug: 'missouri',
  title: `Medicare Advantage Plans Missouri 2027: ${s.std} Plans, Low Caps`,
  description: `Missouri Medicare Advantage 2027: ${s.std} open plans, ${s.zero} at $0 with drugs, caps from ${K.usd(s.moopMin!)} and a median of ${K.usd(s.moopMed!)}. All ${s.counties} counties are listed, no agent call.`,
  intro: `Missouri gained open plans for 2027 and has one of the lowest median caps in the Midwest, with the St. Louis area at the top of the list.`,
  resume: `Missouri has ${s.std} Medicare Advantage plans open to anyone with Parts A and B for 2027, up from ${s.std26} in 2026, against the national trend. ${s.zero} of the ${s.mapd} drug-covering plans charge a $0 premium, and caps are relatively low: the lowest is ${K.usd(s.moopMin!)}, for ${s.lowMoop!.n} at ${K.prem(s.lowMoop!.m)}, and the median ${K.usd(s.moopMed!)}, below the national ${K.usd(K.nat.moopMed)}. St. Louis County, St. Charles and Jefferson list ${stl.std} open plans each, St. Louis City ${K.county('missouri', 'st-louis-city').std}; Jackson County, around Kansas City, ${jack.std}. At the bottom, ${thin[0].name} County lists ${thin[0].std}. Every one of the ${s.counties} counties and St. Louis City has at least one plan. ${s.orgList.slice(0, 4).map(([o]) => o).join(', ')} file the most plans, and ${s.star4} plans carry four stars or more. ${s.pdp} stand-alone drug plans are sold, from ${K.prem(s.pdpMin)} a month.`,
  body: (h) => `
<h2>A market that grew for 2027</h2>
<p>Most states lost open plans between 2026 and 2027; Missouri gained ${s.std - s.std26}. ${s.orgList.map(([o, n]) => `${o} (${n})`).join(', ')} file the most segments, Devoted Health being a newer entrant built around its own care teams. More plans is not automatically better: each new plan comes with its own network, and a low cap only helps if your doctors are in it.</p>
${h.mini('zeroTrue')}
<h2>St. Louis and Kansas City, then the Ozarks</h2>
<p>${top.slice(0, 4).map((c) => `${c.name} (${c.std} open plans, ${c.zero} at $0)`).join(', ')} have the widest choice. Jackson County lists ${jack.std}, with a lowest cap of ${K.usd(jack.moopMin!)}. Residents of the Kansas City area who use hospitals on the Kansas side should check each plan's network across the state line. ${thin.slice(0, 3).map((c) => `${c.name} (${c.std})`).join(', ')} have the shortest lists, where PPOs and the few private fee-for-service plans (${s.pffs} in Missouri) fill the gap.</p>
<h3>Two regions, one state line</h3>
<p>Kansas City straddles two states, and so do its health systems. A Missouri resident joins plans filed for his or her Missouri county, but the plan's network can include hospitals in Kansas; the reverse holds for Kansans. The same applies around St. Louis with the Illinois side of the metro area.</p>
<h3>Ratings and special needs plans</h3>
<p>The best 2027 rating, ${s.starMax} stars, goes to plans such as ${s.best!.n}, at ${K.prem(s.best!.m)} with a ${K.usd(s.best!.moop)} cap. Missouri also lists ${s.snp} special needs plans, ${s.dsnp} for people with MO HealthNet, the state Medicaid program, ${s.csnp} for chronic conditions and ${s.isnp} for nursing-home residents. Neighbors: ${h.a('state:kansas', 'Kansas')}, ${h.a('state:illinois', 'Illinois')}, ${h.a('state:arkansas', 'Arkansas')}.</p>
`,
  faqs: [
    { q: 'How many Medicare Advantage plans are there in St. Louis County for 2027?', a: `${stl.std} plans open to everyone, ${stl.zero} of them at $0 with drug coverage, according to the CMS landscape file of September 2026. The lowest in-network cap in the county is ${K.usd(stl.moopMin!)}. St. Charles and Jefferson counties have similar lists, as most insurers file the St. Louis area as one market.` },
    { q: 'What is the lowest out-of-pocket maximum for a Missouri Medicare Advantage plan in 2027?', a: `${K.usd(s.moopMin!)} in network, for ${s.lowMoop!.n} offered by ${s.lowMoop!.o} at a ${K.prem(s.lowMoop!.m)} premium where it is sold. The median cap among Missouri's ${s.std} open plans is ${K.usd(s.moopMed!)}. Premiums, Part D drugs and out-of-network care do not count toward that cap.` },
    { q: 'Did Missouri gain or lose Medicare Advantage plans for 2027?', a: `It gained: ${s.std} open plans in the 2027 CMS file against ${s.std26} in 2026, while most states lost plans. Individual plans can still close or leave a county, so read your Annual Notice of Change, and compare the 2027 list of your county during the annual period.` },
  ],
  related: ['state:kansas', 'state:illinois', 'state:arkansas', 'state:iowa', 'zero-premium-plans', 'compare-plans'],
});
