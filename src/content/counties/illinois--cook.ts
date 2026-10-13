import { defineCounty } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const c = K.county('illinois', 'cook');
const dp = K.county('illinois', 'dupage');
const wl = K.county('illinois', 'will');
const lk = K.county('illinois', 'lake');
const il = K.state('illinois');
const ir = K.P.irmaa['2026'];

export default defineCounty({
  state: 'illinois',
  county: 'cook',
  title: `Medicare Advantage Plans Cook County 2027: HMO or PPO, ${c.std}`,
  description: `Cook County, Illinois: ${c.std} open Medicare Advantage plans for 2027, ${c.ppo} of them PPOs, ${c.zero} at $0 with drugs and caps from ${K.usd(c.moopMin!)}. Chicago's full list, no agent.`,
  intro: `Chicago is one of the few big markets where PPOs make up nearly half the open plans, and where Blue Cross pulled most of its plans for 2027.`,
  resume: `Cook County has ${c.std} Medicare Advantage plans open to anyone with Parts A and B for 2027, and the split between plan types is close to even: ${c.hmo} HMOs, ${c.ppo} PPOs and ${c.pffs} private fee-for-service plan. ${c.zero} drug-covering plans charge no premium, the most expensive costs ${K.usd(c.premMax!)} a month, and in-network caps run from ${K.usd(c.moopMin!)} (${c.lowMoop!.n}) to ${K.usd(c.moopMax!)}, with a median of ${K.usd(c.moopMed!)}. ${c.star4} plans hold a 2027 rating of four stars or more, led by ${c.best!.n} at ${c.starMax} stars. The menu is shorter than last year: ${c.std26} open plans in 2026, ${c.gone} IDs not filed again, ${c.new} new. Most of the exits are Blue Cross Medicare Advantage HMO and PPO plans, along with Clear Spring Health and Molina. Special needs plans are fewer than in the Sun Belt: ${c.snp} in all, ${c.dsnp} of them for people who also have Medicaid.`,
  body: (h) => `
<h2>PPOs for Chicago's hospital map</h2>
<p>A PPO pays for visits outside its network at a higher coinsurance, while an HMO generally does not pay at all. In a county where many people see specialists at academic medical centers downtown and a primary care doctor in the suburbs, that flexibility is the reason ${c.ppo} PPOs survive here. The price is usually a higher cap: compare the in-network cap and the combined in and out-of-network cap, both shown in each plan's Summary of Benefits.</p>
<h3>Blue Cross plans that left</h3>
<p>For 2027 the Blue Cross Medicare Advantage Basic Plus, Premier Plus, Secure, Choice Plus and Choice Premier plans are not in the CMS file for Cook County, and only one Blue Cross and Blue Shield of Illinois plan remains open to all. Health Care Service Corporation, its parent, still counts ${c.orgList.find(([o]) => o.startsWith('Health Care Service'))?.[1] ?? 0} open plans here through HealthSpring. Members of a closed plan received a notice and can choose until December 7.</p>
<h2>Who files the most</h2>
<p>${c.orgList.map(([o, n]) => `${o} ${n}`).join(', ')}. Essence Healthcare and Zing Health add smaller lines. DuPage County lists ${dp.std} open plans, Will ${wl.std} and Lake ${lk.std}, with almost the same insurers; Illinois as a whole has ${il.std}.</p>
<h3>Premiums and IRMAA</h3>
<p>Plans with a premium charge it on top of Part B. For higher incomes, Social Security also adds IRMAA, an income-related surcharge on Part B and drug coverage, starting above ${K.usd(ir.single[0])} of modified adjusted gross income for a single filer in 2026, using the 2024 return.</p>
${h.mini('irmaaQuick')}
`,
  faqs: [
    { q: 'Which Blue Cross Medicare Advantage plans are not offered in Cook County for 2027?', a: `The CMS 2027 landscape file drops Blue Cross Medicare Advantage Basic Plus, Premier Plus, Secure, Choice Plus and Choice Premier for Cook County; one Blue Cross and Blue Shield of Illinois plan remains open to all. Their members can choose among the county's ${c.std} open plans until December 7, 2026, or use the special enrollment period that follows a plan ending.` },
    { q: 'How many PPO Medicare Advantage plans are there in Cook County, Illinois for 2027?', a: `${c.ppo} of the ${c.std} open plans are PPOs, against ${c.hmo} HMOs, based on the CMS landscape data of September 2026. A PPO covers out-of-network doctors at a higher cost share. That makes it the usual choice for people who want to keep seeing specialists who do not contract with a given HMO.` },
    { q: 'What is the lowest out-of-pocket cap for a Cook County Medicare Advantage plan in 2027?', a: `${K.usd(c.moopMin!)} in network, with ${c.lowMoop!.n} from ${c.lowMoop!.o}. The median cap among the ${c.std} open plans is ${K.usd(c.moopMed!)}, below the national median of ${K.usd(K.nat.moopMed)}. Caps do not include premiums or drug costs, which have their own yearly limit under Part D.` },
  ],
  related: ['state:illinois', 'hmo-vs-ppo', 'plans-leaving', 'irmaa-brackets'],
});
