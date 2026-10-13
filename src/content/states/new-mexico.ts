import { defineState } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const s = K.state('new-mexico');
const ber = K.county('new-mexico', 'bernalillo');
const sf = K.county('new-mexico', 'santa-fe');
const low = K.counties('new-mexico', 'std', true);
const [lead, leadN] = s.orgList[0];

export default defineState({
  slug: 'new-mexico',
  title: `Medicare Advantage Plans New Mexico 2027: ${s.std} Plans, Exits`,
  description: `New Mexico Medicare Advantage 2027: ${s.std} open plans after ${s.std26 - s.std} exits, ${s.zero} at $0 with drugs, caps from ${K.usd(s.moopMin!)}. Albuquerque to Lea County, every plan listed.`,
  intro: `A market in retreat: Albuquerque lost more plan IDs than it kept, one insurer files most of what remains, and premiums stay low across the board.`,
  resume: `New Mexico enters 2027 with ${s.std} Medicare Advantage plans open to anyone with Parts A and B, ${s.std26 - s.std} fewer than the ${s.std26} filed for 2026, and the cuts hit the cities hardest. Bernalillo County, home to Albuquerque, now lists ${ber.std} open plans after ${ber.gone} plan IDs from 2026 were not renewed. What remains is cheap at the counter: ${s.zero} of the drug-covering plans charge no premium, the highest premium anywhere in the state is ${K.usd(s.premMax!)} a month, and the median in-network cap is ${K.usd(s.moopMed!)}, below the national ${K.usd(K.nat.moopMed)}. ${lead} files ${leadN} of the open plans. Rural counties such as ${low.slice(0, 3).map((c) => c.name).join(', ')} have only ${low[0].std} to ${low[2].std}. ${s.snp} special needs plans, ${s.csnp} of them for chronic conditions, and ${s.pdp} stand-alone drug plans are listed below.`,
  body: (h) => `
<h2>Albuquerque's shrinking menu</h2>
<p>Of all the changes in New Mexico's 2027 file, the turnover in the Rio Grande corridor is the one most likely to land in a mailbox. Bernalillo and Sandoval each had ${ber.std26} open plans for 2026; each has ${ber.std} now. Santa Fe County went from ${sf.std26} to ${sf.std}. If your plan is among those ended, the insurer's notice is not a formality: you have a special window to pick a replacement, either another Advantage plan or Original Medicare (${h.src('cfr_422_62', '42 CFR 422.62')}). The county pages list every plan ID that ended.</p>
${h.mini('starsSep')}
<p>The fall window closes on ${K.day(K.P.periods.aep.end)}. After that, a Medicare Advantage member can still make one change between ${K.day(K.P.periods.maOep.start)} and ${K.day(K.P.periods.maOep.end)}.</p>
<h2>One dominant carrier</h2>
<p>${s.orgList.map(([o, n]) => `${o} (${n})`).join(', ')}: that is the full list of parent companies filing open plans, ${s.orgs} in all. When one company holds more than half the plans, its provider contracts shape access for the whole state, so check whether your clinic and hospital are in a plan's network before looking at the premium.</p>
<h3>A plan that leads on every measure</h3>
<p>${s.best!.n} is at once the highest-rated open plan (${s.best!.star} stars), a $0 premium plan, and the plan with the lowest cap in the state, ${K.usd(s.best!.moop!)}. It is an HMO, and HMO networks in New Mexico concentrate in the larger towns. In ${low.slice(0, 3).map((c) => c.name).join(', ')}, with ${low[0].std} plans each, the choice is mostly between PPOs from national carriers, which by definition also pay for covered care outside their network (${h.ext('https://www.ecfr.gov/current/title-42/chapter-IV/subchapter-B/part-422/subpart-A/section-422.4', '42 CFR 422.4')}).</p>
`,
  faqs: [
    { q: 'Why are so many Medicare Advantage plans leaving New Mexico in 2027?', a: `Insurers withdrew ${s.std26 - s.std} open plans statewide between the 2026 and 2027 CMS files, most visibly in Bernalillo County, where ${ber.gone} plan IDs ended. Companies decide county by county, based on costs and payments. Affected members get a notice and a special enrollment period to choose another plan or Original Medicare.` },
    { q: 'What is the most expensive Medicare Advantage premium in New Mexico for 2027?', a: `The highest monthly premium among New Mexico's open plans is ${K.usd(s.premMax!)}, low by national standards, and ${s.zero} drug-covering plans charge $0. Premiums are in addition to the Part B premium, ${K.cents(K.P.partB['2026'].premium)} a month in 2026. A low premium can come with a high cap, so compare both.` },
    { q: 'How many Medicare Advantage plans are there in rural New Mexico counties?', a: `The smallest menus for 2027 are in ${low.slice(0, 3).map((c) => `${c.name} (${c.std})`).join(', ')} counties, per the CMS file of September 2026. Every New Mexico county has at least one open plan. In those counties the plans are mostly PPOs, which still pay for covered care outside their network, so a long drive to an in-network clinic is not the only option.` },
  ],
  related: ['state:arizona', 'state:texas', 'state:colorado', 'state:oklahoma', 'plans-leaving', 'enrollment-periods'],
});
