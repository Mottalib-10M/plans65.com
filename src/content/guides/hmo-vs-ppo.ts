import { defineGuide } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const T = K.nat.byType;
const g = (t: string) => T[t] ?? { n: 0, moopMed: null, zero: 0, premMed: 0 };
const hmo = g('HMO'), pos = g('HMO-POS'), ppo = g('PPO'), rppo = g('Regional PPO'), pffs = g('PFFS'), cost = g('Cost'), msa = g('MSA');
const rows = [['HMO', hmo], ['HMO-POS', pos], ['PPO', ppo], ['Regional PPO', rppo], ['PFFS', pffs], ['Cost plan', cost], ['MSA', msa]] as const;

export default defineGuide({
  id: 'hmo-vs-ppo',
  group: 'plans',
  order: 80,
  slug: 'hmo-vs-ppo',
  nav: 'HMO vs PPO plans',
  card: 'Network types, their 2027 caps and who each one suits',
  title: 'HMO vs PPO Medicare Advantage 2027: Networks, Caps, Costs',
  description: `HMO vs PPO Medicare Advantage plans for 2027: ${K.num(hmo.n + pos.n)} HMO-type and ${K.num(ppo.n + rppo.n)} PPO-type plans, median caps of ${K.usd(hmo.moopMed!)} and ${K.usd(ppo.moopMed!)}. Compare two in your own county.`,
  h1: 'HMO or PPO: choosing a Medicare Advantage network for 2027',
  intro: 'Put an HMO and a PPO of your county side by side: same care, two network rules, and the year’s cost of each.',
  resume: `Medicare Advantage plans come in a few network models, and the model decides which doctors you can see and what happens when you leave the network. For 2027 the CMS landscape file holds ${K.num(hmo.n)} HMO plans, ${K.num(pos.n)} HMO plans with a point-of-service option, ${K.num(ppo.n)} local PPOs and ${K.num(rppo.n)} regional PPOs open to everyone, plus a handful of private fee-for-service, cost and medical savings account plans. HMOs cover routine care only in their network and usually need a referral to a specialist; PPOs also pay out of network, at a higher cost share. The trade shows up in the caps: the median in-network out-of-pocket maximum is ${K.usd(hmo.moopMed!)} for HMOs and ${K.usd(ppo.moopMed!)} for local PPOs, and ${K.num(hmo.zero)} HMOs against ${K.num(ppo.zero)} PPOs charge a $0 premium with drug coverage.`,
  body: (h) => `
<h2>The network models in the 2027 file</h2>
${h.table(['Type', 'Plans open to all', 'Median max out of pocket', '$0 with drugs', 'Median premium'], rows.map(([l, x]) => [l, x.n, x.moopMed === null ? 'none' : K.usd(x.moopMed), x.zero, K.prem(x.premMed)]), 'CMS CY2027 landscape file (202609.1), plans that are not special needs plans. For PPOs the cap shown is the in-network one.', ['l', 'r', 'r', 'r', 'r'])}
<h3>HMO</h3>
<p>A health maintenance organization pays for care from its own network of doctors and hospitals, except emergencies and urgent care, which are covered anywhere in the country. Most HMOs ask you to choose a primary care doctor who refers you to specialists. In exchange, HMOs are the most common $0 plans and have the lowest median cap. They suit people whose doctors are in the network and who receive their care close to home.</p>
<h3>HMO with point of service</h3>
<p>An HMO-POS works like an HMO but pays for some services out of network, usually with a higher copay and sometimes a separate yearly limit. The list of services covered out of network varies by plan and is in its Evidence of Coverage, not in the CMS file.</p>
<h3>Local and regional PPO</h3>
<p>A preferred provider organization pays in and out of network. In network you pay the lower copays and the in-network cap applies; out of network you pay more, and a second, higher "combined" cap covers in-network and out-of-network spending together. Regional PPOs cover a whole region of one or more states with one plan, which helps in rural areas; for 2027 none of them is filed at a $0 premium.</p>
${h.mini('capVsOriginal', { moop: ppo.moopMed })}
<h3>Private fee-for-service, cost and MSA plans</h3>
<p>A PFFS plan sets its own payment terms and lets you see any provider who accepts them, visit by visit, which makes access less predictable. A cost plan, found mostly in a few Midwestern states, lets you go out of network and fall back on Original Medicare for that care. A Medicare medical savings account plan pairs a high deductible with a deposit into a savings account and has no drug coverage; one is filed for 2027.</p>
<h2>Why PPO caps run higher</h2>
<p>A PPO promises to pay for care it does not control: out-of-network doctors bill at their own pace, and the plan cannot steer patients to the hospitals it has negotiated with. Insurers price that risk into the cap and the premium. An HMO, by contrast, negotiates its rates with a closed network and often pays its medical groups a fixed amount per member, which lets it keep both the premium and the cap lower. That is the pattern of the table above: the median HMO cap is ${K.usd(ppo.moopMed! - hmo.moopMed!)} below the median local PPO cap for 2027.</p>
<p>The same table shows that HMO-POS plans sit between the two, with a median cap of ${K.usd(pos.moopMed!)}: the out-of-network option they add is narrower than a PPO's, and cheaper to insure. In the finder, the plan type is written under each plan name, and the "Network" buttons filter HMO-type or PPO-type plans in one click, so you can see in your own county whether the gap is as large as the national medians suggest.</p>
<h2>Which model fits which life</h2>
<ul>
<li>You split the year between two states: a PPO, or Original Medicare with Medigap, follows you for routine care; an HMO covers only emergencies away from home.</li>
<li>You live near a state line and your hospital is on the other side: check that the hospital is in network, whatever the model.</li>
<li>You need a referral-free route to a specialist you already see every month: an HMO-POS or a PPO avoids a gatekeeper visit before each appointment.</li>
<li>You see one primary care doctor and a few specialists of the same health system: an HMO built around that system is usually the cheapest.</li>
<li>You want to keep a specific specialist who is in no local HMO: a PPO lets you see him or her at the out-of-network rate, which can still cost less than changing doctors in the middle of a treatment.</li>
</ul>
<p>Whatever the model, the network can change during the year when contracts between plans and hospitals end. Plans must tell you, and for significant network changes CMS can grant a special enrollment period. Compare the actual plans of your county with the ${h.a('compare-plans', 'two-plan comparator')} and check the ${h.a('star-ratings', '2027 ratings')} of each contract.</p>
`,
  faqs: [
    { q: 'Is an HMO or a PPO cheaper for Medicare Advantage in 2027?', a: `Usually an HMO. In the 2027 CMS file the median in-network cap is ${K.usd(hmo.moopMed!)} for HMOs and ${K.usd(ppo.moopMed!)} for local PPOs, and ${K.num(hmo.zero)} of the ${K.num(hmo.n)} HMOs charge no premium with drug coverage. A PPO costs more for the freedom to go out of network, which matters only if you use it.` },
    { q: 'Does a Medicare Advantage HMO cover me when I travel?', a: 'For emergencies and urgent care, yes, anywhere in the United States. Routine visits, tests and planned surgery are covered only in the plan’s network and service area, except in an HMO with a point-of-service option for the services it lists. People who travel for long periods often prefer a PPO or Original Medicare.' },
    { q: 'What is a combined out-of-pocket maximum in a PPO?', a: 'It is the yearly limit on what you pay for covered Part A and Part B services in and out of network together. A PPO has a lower in-network cap, the figure shown in this site’s lists, and a higher combined cap for all care. Once you reach the in-network cap, in-network care is covered in full for the rest of the year.' },
    { q: 'What is a regional PPO?', a: `A PPO that covers an entire Medicare Advantage region, one or several states, with a single plan. The 2027 file lists ${K.num(rppo.n)} regional PPOs open to everyone, none with a $0 premium; they are most useful in rural counties where local plans are few.` },
  ],
  tool: 'compare',
  related: ['compare-plans', 'zero-premium-plans', 'star-ratings', 'medigap'],
  sources: ['cms_landscape', 'cms_stars_data'],
});
