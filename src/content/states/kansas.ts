import { defineState } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const s = K.state('kansas');
const top = K.counties('kansas', 'std');
const none = K.counties('kansas', 'std', true).filter((c) => c.std === 0).map((c) => c.name);
const john = K.county('kansas', 'johnson');
const sedg = K.county('kansas', 'sedgwick');
const finney = K.county('kansas', 'finney');
const ford = K.county('kansas', 'ford');
const PFFS = 'https://www.medicare.gov/health-drug-plans/health-plans/your-health-plan-options/pffs';

export default defineState({
  slug: 'kansas',
  title: `Medicare Advantage Plans Kansas 2027: ${s.std} Plans, Western Gaps`,
  description: `Kansas Medicare Advantage 2027: ${s.std} open plans, ${s.zero} at $0 with drugs, caps from ${K.usd(s.moopMin!)}, and ${none.length} western counties with no open plan at all. All counties listed.`,
  intro: `${none.length} Kansas counties, most of them on the High Plains, have no Medicare Advantage plan open to the public for 2027, while the Kansas City suburbs have close to thirty.`,
  resume: `Kansas has ${s.std} Medicare Advantage plans open to anyone with Parts A and B for 2027, against ${s.std26} in 2026, and ${s.zero} of the drug-covering ones charge no monthly premium. The map is split. Johnson, Wyandotte and the other Kansas City counties list about ${john.std} open plans each, and Sedgwick County, around Wichita, ${sedg.std}. But ${none.length} of the state's ${s.counties} counties have none, including ${finney.name} County, around Garden City, and ${ford.name} County, around Dodge City. The lowest in-network cap is ${K.usd(s.moopMin!)}, for ${s.lowMoop!.n} at ${K.prem(s.lowMoop!.m)}, and the median ${K.usd(s.moopMed!)}, below the national ${K.usd(K.nat.moopMed)}. PPOs lead with ${s.ppo}, HMOs follow with ${s.hmo}, and ${s.pffs} private fee-for-service plans remain. ${s.star4} plans earn four stars or more. For western Kansans, ${s.pdp} stand-alone Part D plans and Medigap are the main route.`,
  body: (h) => `
<h2>The High Plains without a plan</h2>
<p>The counties with no open plan for 2027 are ${none.join(', ')}. They cover much of southwest and northwest Kansas, where towns are small and hospitals far apart, and no insurer has filed a plan open to the general public there. Residents rely on Original Medicare, accepted by nearly all hospitals and most doctors, and they add a Part D plan and often a Medigap policy. The cost of Original Medicare on its own, before any supplement, is easy to underestimate.</p>
${h.mini('partBYear')}
<h3>Moving within Kansas</h3>
<p>A member of a Wichita plan who moves to Garden City leaves the plan's service area. The move opens a special enrollment period, and since no open plan serves the new county, the choice is Original Medicare with a drug plan. Medigap insurers may then review your health, outside your first ${K.P.periods.medigapOpenMonths}-month window; a person who loses an Advantage plan this way has guaranteed rights in some situations, which the Kansas SHIP can confirm for your case.</p>
<h2>Private fee-for-service on the prairie</h2>
<p>Kansas keeps ${s.pffs} PFFS plans. These pay any Medicare provider who accepts the plan's terms, visit by visit (${h.ext(PFFS, 'Medicare.gov, PFFS plans')}), which can work in a county where no network exists. Ask your doctor before each visit whether they accept the plan.</p>
<h3>Kansas City, Wichita and the insurers</h3>
<p>${top.slice(0, 4).map((c) => `${c.name} (${c.std})`).join(', ')} have the longest lists. ${s.orgList.map(([o, n]) => `${o} (${n})`).join(', ')} file the most open segments. The best 2027 rating is ${s.starMax} stars, for ${s.best!.n}, a ${K.prem(s.best!.m)} plan with a ${K.usd(s.best!.moop)} cap. Kansas lists ${s.snp} special needs plans, ${s.dsnp} of them for people in KanCare, the state Medicaid program. The open list fell by ${s.std26 - s.std} plans from 2026. Across the line, compare ${h.a('state:missouri', 'Missouri')} and ${h.a('state:colorado', 'Colorado')}.</p>
`,
  faqs: [
    { q: 'Which Kansas counties have no Medicare Advantage plan for 2027?', a: `${none.length} counties have no plan open to the general public in the CMS 2027 landscape file, among them ${none.slice(0, 6).join(', ')}. Most lie in western Kansas. Residents keep Original Medicare and can add one of the ${s.pdp} stand-alone Part D plans and a Medigap policy.` },
    { q: 'How many Medicare Advantage plans are there in Johnson County, Kansas for 2027?', a: `${john.std} plans open to everyone, ${john.zero} of them at $0 with drug coverage, according to the CMS landscape file of September 2026. The lowest in-network cap in the county is ${K.usd(john.moopMin!)}. Johnson shares the top of the Kansas list with the other Kansas City area counties.` },
    { q: 'What happens to my Kansas Medicare Advantage plan if I move to a county with no plan?', a: `The plan ends when you leave its service area, and the move gives you a special enrollment period to choose other coverage. In a Kansas county with no open plan, that means Original Medicare plus a Part D plan, which you should join within that window to avoid a gap and a late penalty.` },
  ],
  related: ['state:missouri', 'state:colorado', 'state:nebraska', 'state:oklahoma', 'medigap', 'enrollment-periods'],
});
