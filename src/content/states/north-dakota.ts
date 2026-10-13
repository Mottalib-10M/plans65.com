import { defineState } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const s = K.state('north-dakota');
const top = K.counties('north-dakota', 'std');
const low = K.counties('north-dakota', 'std', true);
const cass = K.county('north-dakota', 'cass');
const bur = K.county('north-dakota', 'burleigh');
const cost = s.std - s.hmo - s.ppo - s.pffs;
const CFR417 = 'https://www.ecfr.gov/current/title-42/chapter-IV/subchapter-B/part-417/subpart-K';
const [lead, leadN] = s.orgList[0];

export default defineState({
  slug: 'north-dakota',
  title: `Medicare Advantage Plans North Dakota 2027: PPOs, Cost Plans`,
  description: `North Dakota Medicare Advantage 2027: ${s.std} open plans, ${cost} of them Medicare cost plans, no HMO at all, ${s.zero} at $0 with drugs. Fargo to Williston, each plan listed.`,
  intro: `No HMO anywhere in the state, a third of the open plans built on the older cost-plan model, and one regional insurer behind most of the list.`,
  resume: `North Dakota's 2027 Medicare Advantage list looks unlike almost any other state's. Of the ${s.std} plans open to anyone with Parts A and B, ${s.ppo} are PPOs, ${cost} are Medicare cost plans, and none is an HMO. ${lead} files ${leadN} of them, including every cost plan. Only ${s.zero} drug-covering plans charge a $0 premium, and the cap on in-network spending sits at ${K.usd(s.moopMed!)} for most plans, with the lowest at ${K.usd(s.moopMin!)}. The eastern counties along the Red River, Cass among them, carry ${top[0].std} plans; Ward, Stark and Williams in the west have ${low[0].std}. ${s.star4} plans rate four stars or more, the best ${s.starMax}. ${s.snp} special needs plans exist, ${s.dsnp} of them for people with Medicaid. Below, the county table lists every plan, and ${s.pdp} stand-alone drug plans are shown for people on Original Medicare or on a cost plan without drugs.`,
  body: (h) => `
<h2>How a North Dakota cost plan works</h2>
<p>The ${cost} cost plans in the state's 2027 file are Medica's Prime Solution plans, and they behave differently from the PPOs next to them. Under federal rules a cost plan must disclose that members may receive services through any Medicare provider and supplier (${h.ext(CFR417, '42 CFR 417.436')}). It must hold open enrollment for at least 30 consecutive days each contract year (42 CFR 417.426), and it may enroll someone who has Part B without Part A (42 CFR 417.422). For a farmer two hours from Fargo who sometimes sees a doctor across the Minnesota line, that design is the appeal.</p>
<h3>With drugs or without</h3>
<p>Some Prime Solution plans include Part D, marked "w/Rx" in the name, and some do not. A member of a cost plan without drugs can pair it with one of the stand-alone drug plans sold in the state. The calculator estimates the pharmacy bill under the 2027 standard benefit.</p>
${h.mini('drugQuick', { c: 350 })}
<h3>Paying more for a lower ceiling</h3>
<p>The lowest in-network cap in the state, ${K.usd(s.lowMoop!.moop!)}, comes with ${s.lowMoop!.n} at ${K.usd(s.lowMoop!.m!)} a month, which is also the top premium filed here. At the other end, ${s.best!.n} charges $0 and holds ${s.best!.star} stars with a ${K.usd(s.best!.moop!)} cap. Between those two sits most of the market, and the difference in a year with surgery can exceed the whole premium gap.</p>
<h2>Red River Valley versus the oil patch</h2>
<p>${top.slice(0, 5).map((c) => c.name).join(', ')} and several neighbors each have ${top[0].std} open plans. Burleigh, around Bismarck, has ${bur.std}. Toward the west and the Canadian border, ${low.slice(0, 4).map((c) => c.name).join(', ')} and others drop to ${low[0].std}. ${s.orgList.slice(1).map(([o, n]) => `${o} files ${n}`).join(', ')}. North Dakota had ${s.std26} open plans in 2026; Cass County alone lost ${cass.gone} plan IDs, so check the county page if your plan does not appear.</p>
`,
  faqs: [
    { q: 'Are there any HMO Medicare Advantage plans in North Dakota for 2027?', a: `No. The CMS landscape file for 2027 lists ${s.hmo} HMOs among North Dakota's ${s.std} open plans. The state's options are ${s.ppo} PPOs, which also pay for covered care outside their network, and ${cost} Medicare cost plans from Medica. Special needs plans exist for people with Medicaid, chronic conditions or nursing-home care.` },
    { q: 'Can I join a North Dakota Medicare cost plan with only Part B?', a: `Federal rules let a cost plan enroll someone entitled to Part B only, while Medicare Advantage plans require both Parts A and B. North Dakota has ${cost} cost plans for 2027, all from Medica's Prime Solution line. Each must also hold an open enrollment of at least 30 days every year.` },
    { q: 'How many Medicare Advantage plans are available in Fargo for 2027?', a: `Cass County, which includes Fargo and West Fargo, has ${cass.std} open plans for 2027, down from ${cass.std26} in 2026, according to the CMS file of September 2026. ${cass.zero} of them charge $0 with drug coverage. The lowest cap in the county is ${K.usd(cass.moopMin!)}.` },
  ],
  related: ['state:south-dakota', 'state:minnesota', 'state:montana', 'part-d-plans', 'hmo-vs-ppo'],
  extraSources: [{ name: '42 CFR Part 417, Subpart K (Medicare cost plans: enrollment and entitlement)', url: 'https://www.ecfr.gov/current/title-42/chapter-IV/subchapter-B/part-417/subpart-K' }],
});
