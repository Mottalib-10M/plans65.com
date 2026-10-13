import { defineCounty } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const c = K.county('michigan', 'wayne');
const oak = K.county('michigan', 'oakland');
const mac = K.county('michigan', 'macomb');
const wt = K.county('michigan', 'washtenaw');
const mi = K.state('michigan');
const hd = K.P.medigap.hdDeductible['2027'];

export default defineCounty({
  state: 'michigan',
  county: 'wayne',
  title: `Medicare Advantage Plans Wayne County 2027: ${c.hmo} HMOs, ${c.ppo} PPOs`,
  description: `Wayne County (Detroit) 2027: ${c.std} open Medicare Advantage plans split evenly by plan type, caps from ${K.usd(c.moopMin!)}, Blue Cross, Henry Ford and Corewell plans listed.`,
  intro: `Detroit's Medicare Advantage market belongs to Michigan's own health systems and Blues plans more than to the national insurers.`,
  resume: `Wayne County's ${c.std} Medicare Advantage plans open to anyone with Parts A and B for 2027 come mostly from Michigan organizations: Blue Cross Blue Shield of Michigan and its Blue Care Network file ${c.orgList[0][1]}, Henry Ford Health's HAP plans ${c.orgList[1][1]}, and Corewell Health's Priority Health ${c.orgList.find(([o]) => o.startsWith('Corewell'))?.[1] ?? 0}, alongside Humana's ${c.orgList.find(([o]) => o.startsWith('Humana'))?.[1] ?? 0}. The split between plan types is exact: ${c.hmo} HMOs and ${c.ppo} PPOs. ${c.zero} drug-covering plans charge no premium. Caps are high by big-county standards: no open plan limits in-network costs below ${K.usd(c.moopMin!)}, the floor set by ${c.lowMoop!.n}, and the median is ${K.usd(c.moopMed!)}. Quality scores are strong: ${c.star4} plans have four stars or more for 2027, with ${c.best!.n} at ${c.starMax}. The 2026 file had ${c.std26} open plans; ${c.gone} IDs ended and ${c.new} began. Special needs plans number ${c.snp}.`,
  body: (h) => `
<h2>Choosing by hospital system</h2>
<p>In Detroit the plan often follows the hospital. A HAP or Henry Ford Select plan leans on Henry Ford Health; Priority Health plans on Corewell; Trinity Health Plan of Michigan on Trinity's hospitals; McLaren Medicare on McLaren's. The Blue Cross PPOs and the national insurers tend to contract more broadly. Start from where your doctors admit patients, then compare caps inside that short list.</p>
<h3>Plan names that changed or ended</h3>
<p>${c.gone} plan IDs from 2026 are not in the 2027 file, among them Medicare Plus Blue + Meijer, PriorityMedicare Vintage, Vital and Thrive, BCN Advantage Elements under its 2026 ID and several Humana Full Access and USAA Honor plans. A name that reappears under a new ID usually means the plan was refiled; your notice tells you if you were moved.</p>
<h2>A high floor on caps, and the Medigap comparison</h2>
<p>Because the lowest cap is ${K.usd(c.moopMin!)}, Wayne County residents who expect heavy care sometimes weigh Original Medicare with a Medigap policy. Plan G covers nearly all cost sharing after the Part B deductible; high-deductible Plan G starts paying once you have spent ${K.usd(hd)} in 2027, in exchange for a lower premium. Insurers set Medigap prices, so ask several for a quote.</p>
${h.mini('hdg')}
<h3>Oakland, Macomb, Washtenaw</h3>
<p>Oakland County lists ${oak.std} open plans, Macomb ${mac.std} and Washtenaw ${wt.std}, most from the same organizations. Michigan has ${mi.std} open plans in all.</p>
`,
  faqs: [
    { q: 'Does Henry Ford Health offer a Medicare Advantage plan in Wayne County for 2027?', a: `Yes. Health Alliance Plan, part of Henry Ford Health, files ${c.orgList.find(([o]) => o.startsWith('Henry Ford'))?.[1] ?? 0} open plans in Wayne County for 2027, including HAP Medicare and Henry Ford Select plans, according to CMS landscape data. Their networks center on Henry Ford hospitals and physicians, so check the directory if your doctors practice elsewhere.` },
    { q: 'What is the lowest out-of-pocket maximum for a Wayne County Medicare Advantage plan in 2027?', a: `${K.usd(c.moopMin!)} in network, with ${c.lowMoop!.n} from ${c.lowMoop!.o}, which charges ${K.usd(c.lowMoop!.m)} a month. The median cap among the ${c.std} open plans in Wayne County is ${K.usd(c.moopMed!)}, according to the CMS landscape file of September 2026. Drug costs have a separate yearly limit.` },
    { q: 'Are there more HMO or PPO Medicare Advantage plans in Wayne County for 2027?', a: `Exactly as many of each: ${c.hmo} HMOs and ${c.ppo} PPOs among the ${c.std} open plans. A PPO covers doctors outside its network at a higher cost share, useful for snowbirds who winter in Florida or Arizona. An HMO limits routine care to its network but often has a lower premium.` },
  ],
  related: ['state:michigan', 'medigap-plan-g', 'hmo-vs-ppo', 'compare-plans'],
});
