import { defineState } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const s = K.state('puerto-rico');
const top = K.counties('puerto-rico', 'std');
const low = K.counties('puerto-rico', 'std', true);
const sj = K.county('puerto-rico', 'san-juan');

export default defineState({
  slug: 'puerto-rico',
  title: `Medicare Advantage Plans Puerto Rico 2027: $0 Plans by Town`,
  description: `Puerto Rico Medicare Advantage 2027: ${s.std} open plans, all at a $0 premium, ${s.dsnp} D-SNPs for people with Medicaid, caps near ${K.usd(s.moopMed!)}. All ${s.counties} municipios listed.`,
  intro: `Every open plan on the island charges $0, almost all are HMOs, and the special needs plans for people with Medicaid are nearly as many as the open plans.`,
  resume: `Puerto Rico's Medicare Advantage market for 2027 looks like no other in the landscape file: all ${s.std} plans open to anyone with Parts A and B have a $0 monthly premium, the median in-network cap is ${K.usd(s.moopMed!)}, far below the ${K.usd(K.nat.moopMed)} national median, and every one of them carries a 2027 rating of four stars or more. Three insurers file them, MMM, MCS Classicare and Triple-S, and ${s.hmo} of the ${s.std} are HMOs. Alongside, ${s.dsnp} dual-eligible special needs plans serve people who also have Medicaid through the island's program; their names usually end in Platino. Choice barely varies by place: each of the ${s.counties} municipios has between ${low[0].std} and ${top[0].std} open plans. Only ${s.pdp} stand-alone drug plans are sold, listed below for anyone who keeps Original Medicare.`,
  body: (h) => `
<h2>An island where every open plan is $0</h2>
<p>No other part of the country looks like this. The highest premium filed for an open plan in Puerto Rico for 2027 is $0, and ${s.zero} of the ${s.mapd} plans that include drug coverage are among them. The competition happens elsewhere: in the cap, in dental and vision extras, in the network of clinics and specialists in your area. The lowest cap is ${K.usd(s.moopMin!)}, on ${s.lowMoop!.n}; the top-rated plan, ${s.best!.n}, holds ${s.best!.star} stars with a ${K.usd(s.best!.moop!)} cap.</p>
${h.mini('zeroTrue')}
<p>A $0 plan still leaves the Part B premium and the copays until the cap is reached. The calculator above shows the real yearly cost.</p>
<h2>Platino plans and Medicaid</h2>
<p>The ${s.dsnp} D-SNPs are for people enrolled in both Medicare and Medicaid. Nationally D-SNPs are a small slice of the market, ${K.num(K.nat.dsnp)} out of ${K.num(K.nat.segments)} plan segments; in Puerto Rico they nearly match the ${s.std} open plans. Someone who qualifies can choose between a Platino plan and an ordinary open plan, and should compare drug coverage and extras on both, since the Platino plans are built to coordinate with Medicaid benefits.</p>
<h3>From Aguada to Yabucoa, nearly the same list</h3>
<p>The western municipios such as ${top.slice(0, 4).map((c) => c.name).join(', ')} have ${top[0].std} open plans; San Juan has ${sj.std}; the eastern towns ${low.slice(0, 3).map((c) => c.name).join(', ')} have ${low[0].std}. The difference is a handful of plans, usually networks that stop at a regional boundary. If you move between the metro area and the island's west, confirm that your plan and your primary care doctor still match.</p>
<h3>If you live part of the year on the mainland</h3>
<p>A Puerto Rico HMO covers routine care only in its service area on the island; on the mainland it covers emergencies and urgent care. Someone splitting the year with Florida or New York may need a plan where they spend most of their time. Island plans went from ${s.std26} in 2026 to ${s.std} now.</p>
`,
  faqs: [
    { q: 'Do all Medicare Advantage plans in Puerto Rico cost $0 a month in 2027?', a: `All ${s.std} open plans in Puerto Rico have a $0 monthly plan premium for 2027, according to the CMS landscape file of September 2026. You still pay the Part B premium, ${K.cents(K.P.partB['2026'].premium)} a month in 2026, unless another program pays it for you, and copays up to the plan's yearly cap, which starts at ${K.usd(s.moopMin!)}.` },
    { q: 'What is a Platino plan in Puerto Rico?', a: `Platino is the name used in Puerto Rico for many dual-eligible special needs plans, built for people who have both Medicare and Medicaid. The island has ${s.dsnp} D-SNPs for 2027, nearly as many as its ${s.std} open plans. To join one you must be enrolled in Medicaid; the plan coordinates the two programs' benefits.` },
    { q: 'Which municipios in Puerto Rico have the most Medicare Advantage plans for 2027?', a: `The western municipios lead, including ${top.slice(0, 4).map((c) => c.name).join(', ')}, with ${top[0].std} open plans each. San Juan has ${sj.std}. The smallest lists, in ${low.slice(0, 3).map((c) => c.name).join(', ')}, still hold ${low[0].std}, so the gap across the island is narrow, and it usually reflects where a plan's provider network stops.` },
  ],
  related: ['state:florida', 'special-needs-plans', 'zero-premium-plans', 'star-ratings', 'hmo-vs-ppo'],
});
