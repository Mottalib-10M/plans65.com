import { defineCounty } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const c = K.county('florida', 'hillsborough');
const pas = K.county('florida', 'pasco');
const pin = K.county('florida', 'pinellas');
const pol = K.county('florida', 'polk');
const a26 = K.P.partA['2026'];

export default defineCounty({
  state: 'florida',
  county: 'hillsborough',
  title: `Medicare Advantage Plans Hillsborough 2027: ${c.snp} Special Needs`,
  description: `Hillsborough County (Tampa) 2027: ${c.std} open Medicare Advantage plans and ${c.snp} special needs plans, ${c.isnp} for nursing-home care. Caps from ${K.usd(c.moopMin!)}. Every plan, no call.`,
  intro: `Tampa's county has more special needs plans than any other county with its own page here, including a cluster of plans for people in nursing homes.`,
  resume: `Hillsborough County lists ${c.snp} special needs plans for 2027, more than its ${c.std} Medicare Advantage plans open to anyone with Parts A and B. They split into ${c.dsnp} plans for people with both Medicare and Medicaid, ${c.csnp} for chronic conditions such as diabetes, heart failure or COPD, and ${c.isnp} institutional plans for residents of nursing homes or people who need that level of care at home. On the open side, ${c.zero} plans with drug coverage charge no premium, the lowest in-network cap is ${K.usd(c.moopMin!)}, with ${c.lowMoop!.n}, and the median is ${K.usd(c.moopMed!)}. ${c.star4} plans hold four stars or more in the 2027 ratings, and ${c.best!.n} reaches ${c.starMax}. Year-over-year changes are modest: ${c.std26} open plans in 2026, ${c.std} now, ${c.gone} IDs gone and ${c.new} new. Humana leads with ${c.topOrgN} plans.`,
  body: (h) => `
<h2>Institutional plans: what an I-SNP does</h2>
<p>An institutional special needs plan (I-SNP) enrolls people who live in a nursing home or assisted setting, or who are expected to need that level of care for months. The plan usually works with clinicians who visit the facility, so a resident can be seen there instead of being sent to an emergency room for every change. With ${c.isnp} such plans, Hillsborough families choosing a facility can ask which plans it works with. Joining requires an assessment, and you can switch out of an I-SNP more often than during the fall window.</p>
<h3>When a stay starts in the hospital</h3>
<p>Under Original Medicare, a nursing-home stay is covered only after a qualifying hospital stay, and the hospital part has its own costs: in 2026 the Part A deductible is ${K.usd(a26.deductible)}, then daily coinsurance on very long stays.</p>
${h.mini('stay')}
<h2>The open plans, from Optimum to BayCare</h2>
<p>${c.orgList.map(([o, n]) => `${o} (${n})`).join(', ')}. Optimum HealthCare and Freedom Health sit at the low end of the cap ranking, along with CareOne Plus and Ultimate Health Plans. BayCare Health Plans, tied to the BayCare hospitals, stays in the list; BayCarePlus Premier is among the 2026 IDs that did not return, with several Humana giveback PPOs and the Simply plans.</p>
<h3>Pasco, Pinellas, Polk</h3>
<p>Pasco County lists ${pas.std} open plans and ${pas.snp} special needs plans; Pinellas ${pin.std} and ${pin.snp}; Polk ${pol.std} and ${pol.snp}. The Tampa Bay counties share most insurers, but each plan is filed county by county, so check yours after a move across the bay.</p>
`,
  faqs: [
    { q: 'What is an institutional special needs plan in Hillsborough County?', a: `It is a Medicare Advantage plan for people who live in a nursing home, or who need that level of care at home. Hillsborough County has ${c.isnp} of them for 2027, among ${c.snp} special needs plans, according to CMS landscape data. They coordinate medical care inside the facility. You must meet the level-of-care requirement to join.` },
    { q: 'Which Hillsborough County Medicare Advantage plan has the lowest out-of-pocket cap for 2027?', a: `${c.lowMoop!.n}, from ${c.lowMoop!.o}, with an in-network cap of ${K.usd(c.moopMin!)} and a ${K.usd(c.lowMoop!.m)} premium, according to the CMS landscape file of September 2026. The median cap among the county's ${c.std} open plans is ${K.usd(c.moopMed!)}. Drugs have their own 2027 limit.` },
    { q: 'Does BayCare have a Medicare Advantage plan in Hillsborough County for 2027?', a: `Yes. BayCare Health Plans still files open plans in the county for 2027, while BayCarePlus Premier, offered in 2026, was not renewed. A health-system plan centers its network on that system's hospitals, which suits patients already treated there. Check the 2027 directory before you switch.` },
  ],
  related: ['state:florida', 'county:florida/orange', 'special-needs-plans', 'county:florida/palm-beach'],
});
