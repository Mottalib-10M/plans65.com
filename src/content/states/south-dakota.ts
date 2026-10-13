import { defineState } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const s = K.state('south-dakota');
const top = K.counties('south-dakota', 'std');
const low = K.counties('south-dakota', 'std', true);
const mh = K.county('south-dakota', 'minnehaha');
const pen = K.county('south-dakota', 'pennington');
const cost = s.std - s.hmo - s.ppo - s.pffs;
const CFR417 = 'https://www.ecfr.gov/current/title-42/chapter-IV/subchapter-B/part-417/subpart-K';

export default defineState({
  slug: 'south-dakota',
  title: `Medicare Advantage Plans South Dakota 2027: Cost Plans, PPOs`,
  description: `South Dakota Medicare Advantage 2027: ${s.std} open plans, ${cost} Medica cost plans, only ${s.zero} at $0 with drugs, Sioux Falls with ${mh.std} and Rapid City with ${pen.std}. Every plan listed.`,
  intro: `East River has far more choice than the Black Hills, and the plan with the lowest out-of-pocket cap in the state is not technically a Medicare Advantage plan.`,
  resume: `South Dakota's 2027 market is small and lopsided. ${s.std} plans are open to anyone with Parts A and B: ${s.ppo} PPOs and ${cost} Medicare cost plans, with no HMO. Sioux Falls and the southeast corner get the most, ${top[0].std} in Minnehaha, Lincoln and neighboring counties, while Pennington County, around Rapid City, has ${pen.std}. Only ${s.zero} drug-covering plans charge a $0 premium, so most people here pay something each month, up to ${K.usd(s.premMax!)}. The lowest in-network cap, ${K.usd(s.moopMin!)}, belongs to a cost plan, ${s.lowMoop!.n}, at ${K.usd(s.lowMoop!.m!)} a month; nearly every other plan caps at ${K.usd(s.moopMed!)}. ${s.star4} plans hold four stars or more. Medica files ${s.orgList[0][1]} of the open plans, and Sanford Health, the Sioux Falls hospital system, ${s.orgList.find(([o]) => o.startsWith('Sanford'))![1]}. ${s.pdp} stand-alone drug plans are listed below.`,
  body: (h) => `
<h2>The cost plan that sets the state's lowest cap</h2>
<p>Medica's Prime Solution plans are cost plans, an older model that the 2027 file still lists in only a few states. The rules that govern them sit in a different part of federal law, 42 CFR Part 417. The practical difference for a member: the plan has to disclose that services may be received through any Medicare provider and supplier, not just its own (${h.ext(CFR417, '42 CFR 417.436')}), and it must open enrollment for at least 30 consecutive days a year. In South Dakota the richest of these, ${s.lowMoop!.n}, pairs the state's lowest cap with its highest monthly price. That is a deliberate trade: a large fixed cost for a small worst case.</p>
<h3>Prime Solution with or without drugs</h3>
<p>Some of the ${cost} cost plans include Part D and carry "w/Rx" in the name; the others leave drugs to a stand-alone plan. Whichever route you take, the 2027 Part D rules let you spread a large pharmacy bill over the year instead of paying it at the counter in January.</p>
${h.mini('drugSmooth')}
<h2>East River and West River</h2>
<p>${top.filter((c) => c.std === top[0].std).map((c) => c.name).join(', ')}: these counties share the longest list, ${top[0].std} plans each, all in the southeast around Sioux Falls. Across the Missouri, ${low.slice(0, 4).map((c) => c.name).join(', ')} and others have ${low[0].std}. ${s.orgList.map(([o, n]) => `${o} (${n})`).join(', ')} are the only parent companies filing. The statewide total compares with ${s.std26} in 2026, ${K.change(s.std, s.std26)}, but ${mh.gone} plan IDs in Minnehaha County were replaced or withdrawn, so check your plan's name in the county table.</p>
`,
  faqs: [
    { q: 'What is a Medica Prime Solution cost plan in South Dakota?', a: `Prime Solution is Medica's line of Medicare cost plans, ${cost} of which are filed in South Dakota for 2027. A cost plan has its own network but must tell members they may also use any Medicare provider. It runs an open enrollment of at least 30 days each year. Some versions include Part D; others pair with a stand-alone drug plan.` },
    { q: 'How many Medicare Advantage plans are there in Rapid City for 2027?', a: `Pennington County, which includes Rapid City, has ${pen.std} open plans for 2027, per the CMS landscape file of September 2026, against ${mh.std} in Minnehaha County around Sioux Falls. ${pen.zero} of the Rapid City plans charge a $0 premium with drug coverage. Its lowest cap is ${K.usd(pen.moopMin!)}.` },
    { q: 'Why are so few South Dakota Medicare Advantage plans $0 in 2027?', a: `Only ${s.zero} drug-covering open plans in South Dakota have a $0 premium for 2027, and the highest premium reaches ${K.usd(s.premMax!)} a month. Insurers set premiums plan by plan and county by county, and in South Dakota most chose to charge one. The lowest-cap plan is also the most expensive, so the county table, with premium and cap side by side, is the place to compare.` },
  ],
  related: ['state:north-dakota', 'state:nebraska', 'state:minnesota', 'state:wyoming', 'part-d-plans'],
  extraSources: [{ name: '42 CFR Part 417, Subpart K (Medicare cost plans)', url: 'https://www.ecfr.gov/current/title-42/chapter-IV/subchapter-B/part-417/subpart-K' }],
});
