import { defineState } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const s = K.state('alabama');
const top = K.counties('alabama', 'std');
const low = K.counties('alabama', 'std', true);
const mob = K.county('alabama', 'mobile');
const jef = K.county('alabama', 'jefferson');

export default defineState({
  slug: 'alabama',
  title: `Medicare Advantage Plans Alabama 2027: ${s.std} Plans by County`,
  description: `Alabama Medicare Advantage for 2027: ${s.std} open plans in ${s.counties} counties, ${s.zero} with drugs at a $0 premium, caps from ${K.usd(s.moopMin!)}. Each county listed in full, no sales call.`,
  intro: `In Alabama the smallest out-of-pocket cap belongs to the plan with the steepest premium, so the cheapest plan on paper is rarely the cheapest year.`,
  resume: `Alabama residents with Parts A and B can choose among ${s.std} Medicare Advantage plans open to the general public for 2027, filed by ${s.orgs} parent companies, and ${s.zero} of the plans that include drug coverage charge nothing per month. The in-network out-of-pocket maximum runs from ${K.usd(s.moopMin!)} to ${K.usd(s.moopMax!)}, with a median of ${K.usd(s.moopMed!)} against ${K.usd(K.nat.moopMed)} nationally. The plan with the ${K.usd(s.lowMoop!.moop)} ceiling, ${s.lowMoop!.n}, costs ${K.prem(s.lowMoop!.m)} a month, the highest premium in the state. ${s.star4} plans earn four stars or better for 2027 and the top score is ${s.starMax}. Rural counties fare better here than in many Southern states: the thinnest county, ${low[0].name}, still has ${low[0].std} open plans, while ${top[0].name} leads with ${top[0].std}. There are also ${s.snp} special needs plans and ${s.pdp} stand-alone Part D plans, all listed below.`,
  body: (h) => `
<h2>Premium against ceiling: the Alabama trade-off</h2>
<p>Look at the two ends of the Alabama list and the same pattern keeps showing up. ${s.lowMoop!.n}, from ${s.lowMoop!.o}, promises that in-network spending on covered medical care stops at ${K.usd(s.lowMoop!.moop)} for the year, but it bills ${K.prem(s.lowMoop!.m)} every month to get there, which comes to ${K.usd(s.lowMoop!.m * 12)} before any copay. At the other end, ${s.cheapHigh!.n} charges ${K.prem(s.cheapHigh!.m)} with a ${s.cheapHigh!.star}-star rating and a ${K.usd(s.cheapHigh!.moop)} cap. A healthy year favors the second; a year with a surgery and a hospital stay can favor the first. The MOOP, short for maximum out of pocket, is the figure that decides the bad year, while the premium decides every month.</p>
${h.mini('zeroTrue')}
<h3>Which companies file the most plans</h3>
<p>${s.orgList.map(([o, n]) => `${o} (${n})`).join(', ')} account for the largest counts of open plan segments. Triton Health Systems is the one regional parent among the national groups on that list. The plan that scores highest on the 2027 ratings, ${s.best!.n}, holds ${s.best!.star} stars at ${K.prem(s.best!.m)} with a ${K.usd(s.best!.moop)} cap; the word giveback in a plan name means it pays back part of your Part B premium.</p>
<h2>From Mobile Bay to the Black Belt</h2>
<p>Mobile County lists ${mob.std} open plans and Jefferson County, around Birmingham, ${jef.std}. In the Black Belt and the southwestern counties, the menu shrinks to about half that size, with ${low[0].name} at ${low[0].std}, yet no Alabama county is left without a choice of HMO and PPO. A PPO lets you see out-of-network doctors at a higher copay; an HMO generally does not, outside emergencies. The state splits almost evenly: ${s.hmo} HMOs and ${s.ppo} PPOs.</p>
<h3>Plans for people on Medicaid or with chronic illness</h3>
<p>Of the ${s.snp} special needs plans, ${s.dsnp} are D-SNPs for people who qualify for both Medicare and Alabama Medicaid, ${s.csnp} are C-SNPs for conditions such as diabetes or heart failure, and ${s.isnp} serve nursing-home residents. Compared with 2026, the open list moved from ${s.std26} to ${s.std} plans (${K.change(s.std, s.std26)}). See ${h.a('special-needs-plans', 'how special needs plans work')} before you switch.</p>
`,
  faqs: [
    { q: 'Why does the Alabama plan with the lowest out-of-pocket maximum cost so much each month?', a: `${s.lowMoop!.n} caps in-network costs at ${K.usd(s.lowMoop!.moop)} for 2027 but charges ${K.prem(s.lowMoop!.m)} a month, the top premium among Alabama's open plans in the CMS landscape file. A low ceiling shifts cost from copays to premiums, so it pays off only if you expect heavy use of care.` },
    { q: 'Do rural Alabama counties have fewer Medicare Advantage choices for 2027?', a: `Yes, but the gap is moderate. ${top[0].name} County has ${top[0].std} open plans and ${low[0].name} County, the thinnest, has ${low[0].std}, according to CMS data of September 2026. Every county keeps at least one HMO and one PPO. Open the county in the table to see each plan with its premium and cap.` },
    { q: 'How many stand-alone Part D plans can Alabama residents buy for 2027?', a: `${s.pdp} stand-alone drug plans are offered statewide, with premiums from ${K.prem(s.pdpMin!)} to ${K.prem(s.pdpMax!)} a month; the cheapest is ${s.pdpMinName}. ${s.pdpBench} of them cost nothing for people with full Extra Help. They suit people who keep Original Medicare, with or without a Medigap policy.` },
  ],
  related: ['state:georgia', 'state:mississippi', 'state:tennessee', 'special-needs-plans', 'zero-premium-plans'],
});
