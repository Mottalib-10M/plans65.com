import { defineState } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const s = K.state('arkansas');
const top = K.counties('arkansas', 'std');
const low = K.counties('arkansas', 'std', true);
const pul = K.county('arkansas', 'pulaski');
const ben = K.county('arkansas', 'benton');

export default defineState({
  slug: 'arkansas',
  title: `Medicare Advantage Plans Arkansas 2027: ${s.std} Open Plans`,
  description: `Arkansas Medicare Advantage 2027: ${s.std} open plans across ${s.counties} counties, ${s.pffs} private fee-for-service, no cap under ${K.usd(s.moopMin!)}. Full plan list for each county, free.`,
  intro: `Arkansas still lists private fee-for-service plans, a type that has become rare, and its lowest out-of-pocket cap sits higher than in any neighboring state.`,
  resume: `For 2027, Arkansas residents with Parts A and B can pick from ${s.std} Medicare Advantage plans open to the public, ${s.zero} of which combine drug coverage with a $0 monthly premium. The lowest in-network cap is ${K.usd(s.moopMin!)}, set by ${s.lowMoop!.n}, and the median is ${K.usd(s.moopMed!)}, compared with ${K.usd(K.nat.moopMed)} for the country. PPOs outnumber HMOs, ${s.ppo} to ${s.hmo}, and ${s.pffs} private fee-for-service plans remain on the list. Northwest Arkansas and the Little Rock area have the deepest menus: ${top[0].name} County shows ${top[0].std} open plans and Pulaski ${pul.std}. The Delta and the southeast are thinner, with ${low[0].name} County at ${low[0].std}. ${s.star4} plans hold four or more stars for 2027. People who prefer Original Medicare can choose among ${s.pdp} stand-alone drug plans, priced from ${K.prem(s.pdpMin!)} a month.`,
  body: (h) => `
<h2>Private fee-for-service: a rare plan type that survives here</h2>
<p>Arkansas lists ${s.pffs} PFFS plans for 2027. A private fee-for-service plan sets what it pays doctors and hospitals, and you can see any provider who accepts those payment terms and agrees to treat you; the provider can decide at each visit (${h.ext('https://www.medicare.gov/health-drug-plans/health-plans/your-health-plan-options/pffs', 'Medicare.gov, Private Fee-for-Service plans')}). That flexibility helps in counties where no HMO has built a network, but it carries a risk: a clinic that took the plan last month can decline it today. Ask your doctors before choosing one, and check whether the plan includes Part D, because if it does not you need a separate drug plan.</p>
<h3>Why no Arkansas cap goes below ${K.usd(s.moopMin!)}</h3>
<p>The floor of ${K.usd(s.moopMin!)} comes from ${s.lowMoop!.o}, an HMO at ${K.prem(s.lowMoop!.m)}. Arkansas has fewer of the tightly managed HMOs that file very low ceilings in larger markets. The median, ${K.usd(s.moopMed!)}, means half the open plans could leave you paying more than that in a year of heavy treatment, before drug costs.</p>
${h.mini('partBYear')}
<h2>Bentonville and Little Rock against the Delta</h2>
<p>Benton County has ${ben.std} open plans and ${ben.zero} at $0 with drugs. Pulaski follows with ${pul.std}. In ${low[0].name}, ${low[1].name} and ${low[2].name} counties, the list drops to ${low[0].std} to ${low[2].std} plans, mostly national PPOs. The county table shows every figure.</p>
<h3>The companies behind the plans</h3>
<p>${s.orgList.map(([o, n]) => `${o} (${n})`).join(', ')} file the most open segments. USAble Mutual Insurance Company is the Arkansas Blue Cross parent. The top rating for 2027 is ${s.starMax} stars, held by ${s.best!.n} with a ${K.usd(s.best!.moop)} cap; a plan with "giveback" in its name returns part of the Part B premium to members.</p>
<p>Arkansas counts ${s.dsnp} D-SNPs for people with both Medicare and Medicaid and ${s.csnp} C-SNPs for chronic conditions. The open list moved from ${s.std26} plans in 2026 to ${s.std}, ${K.change(s.std, s.std26)}. Among drug plans, ${s.pdpZeroDed} charges no deductible.</p>
`,
  faqs: [
    { q: 'Are private fee-for-service Medicare plans still sold in Arkansas for 2027?', a: `Yes. The CMS landscape file of September 2026 lists ${s.pffs} PFFS plans open to Arkansas residents. You may use any Medicare provider who accepts the plan's payment terms, but each provider can refuse at any visit, so confirm with your doctors and hospital first.` },
    { q: 'Which Arkansas counties have the fewest Medicare Advantage plans in 2027?', a: `${low[0].name} County has the shortest list, ${low[0].std} open plans, followed by ${low[1].name} with ${low[1].std} and ${low[2].name} with ${low[2].std}, all in the southeastern part of the state. ${top[0].name} County, in the northwest, has the longest, ${top[0].std}. Figures come from the CMS 2027 landscape file.` },
    { q: 'Is there an Arkansas Part D plan with no deductible in 2027?', a: `${s.pdpZeroDed} of the ${s.pdp} stand-alone drug plans sold in Arkansas charges no deductible for 2027; the others charge up to ${K.usd(K.P.partD['2027'].deductible)}. A plan without a deductible usually costs more each month, so compare the yearly total for your own prescriptions in the drug plan table below.` },
  ],
  related: ['state:missouri', 'state:louisiana', 'state:mississippi', 'state:oklahoma', 'hmo-vs-ppo', 'part-d-deductible'],
});
