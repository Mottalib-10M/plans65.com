import { defineState } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const s = K.state('iowa');
const all = K.counties('iowa', 'std');
const low = K.counties('iowa', 'std', true);
const cost = s.std - s.hmo - s.ppo - s.pffs;
const costCounties = all.filter((c) => c.std - c.hmo - c.ppo - c.pffs > 0).length;
const story = K.county('iowa', 'story');
const dbq = K.county('iowa', 'dubuque');
const COST = 'https://www.medicare.gov/health-drug-plans/health-plans/your-health-plan-options/other-medicare-health-plans';

export default defineState({
  slug: 'iowa',
  title: `Medicare Advantage Plans Iowa 2027: ${s.std} Plans, ${cost} Cost Plans`,
  description: `Iowa Medicare Advantage 2027: ${s.std} open plans including ${cost} cost plans, ${s.zero} at $0 with drugs, caps from ${K.usd(s.moopMin!)}, eastern Iowa far ahead of the west. Every county.`,
  intro: `Iowa is one of the last states where Medicare cost plans, a hybrid between Original Medicare and a managed plan, are still sold in numbers.`,
  resume: `Iowa residents with Parts A and B can choose from ${s.std} Medicare Advantage and cost plans open to the public for 2027. Of those, ${cost} are Medicare cost plans, sold in ${costCounties} counties, and ${s.mapd} are Advantage plans with drug coverage, ${s.zero} of them at a $0 premium. The lowest in-network cap is ${K.usd(s.moopMin!)}, for ${s.lowMoop!.n} at ${K.prem(s.lowMoop!.m)}, and the median ${K.usd(s.moopMed!)}. Choice is highest in eastern Iowa, where ${all[0].name} County lists ${all[0].std} plans and Dubuque ${dbq.std}, served by clinic groups from Dubuque and from Wisconsin. Story County, home to Ames, has only ${story.std}, and ${low[0].name} County ${low[0].std}. ${s.star4} plans hold four stars or more for 2027. For Original Medicare, ${s.pdp} stand-alone drug plans start at ${K.prem(s.pdpMin!)} a month, with ${s.pdpBench} free for people with full Extra Help.`,
  body: (h) => `
<h2>How an Iowa cost plan works</h2>
<p>A cost plan has a network like an HMO, but it does not lock you in. If you see a provider outside the network who accepts Medicare, Original Medicare pays as usual and you owe its deductibles and coinsurance. You can join whenever the plan is taking members, even with Part B only, and leave at any time for Original Medicare. Drug coverage can come from the plan or from a separate Part D plan (${h.ext(COST, 'Medicare.gov, other Medicare health plans')}). In Iowa, ${cost} cost plans are filed for 2027, from Medical Associates in Dubuque, Medica and a Mercy plan in Cedar Rapids. Their premiums run well above typical Advantage plans, which buys that freedom.</p>
<h3>Plans without drug coverage</h3>
<p>Only ${s.mapd} of Iowa's ${s.std} open plans are Advantage plans that bundle Part D. The rest are cost plans or medical-only plans, which make sense if you hold drug coverage from a former employer or the VA. Without creditable drug coverage, a late Part D penalty builds up month by month.</p>
<h2>East against west</h2>
<p>${all.slice(0, 4).map((c) => `${c.name} (${c.std})`).join(', ')} lead the state, all in the east along the Mississippi. ${s.orgList.map(([o, n]) => `${o} (${n})`).join(', ')} file the most open segments; two of them are clinic systems based in Dubuque and in Madison, Wisconsin. In the west and the south, ${low[0].name} (${low[0].std}), ${low[1].name} (${low[1].std}) and ${low[2].name} (${low[2].std}) have the shortest lists.</p>
${h.mini('drug2026')}
<h3>Drug costs from 2026 to 2027</h3>
<p>For 2027 the Part D deductible rises to ${K.usd(K.P.partD['2027'].deductible)} and the yearly cap to ${K.usd(K.P.partD['2027'].oopCap)}, from ${K.usd(K.P.partD['2026'].deductible)} and ${K.usd(K.P.partD['2026'].oopCap)}. The calculator above compares the two years for the same drugs. Iowa's ${s.dsnp} D-SNPs serve people with Iowa Medicaid. The open list went from ${s.std26} plans to ${s.std}. See ${h.a('part-d-deductible', 'the 2027 Part D deductible')}.</p>
`,
  faqs: [
    { q: 'Can I leave an Iowa Medicare cost plan in the middle of the year?', a: `Yes. Medicare.gov states that you can leave a cost plan at any time and return to Original Medicare. Drug coverage follows its own calendar, so time the change with your Part D enrollment. Iowa has ${cost} cost plans for 2027, sold in ${costCounties} counties, per the CMS landscape file of September 2026.` },
    { q: 'Why does Ames, Iowa have so few Medicare Advantage plans for 2027?', a: `Story County, which includes Ames, lists ${story.std} open plans for 2027, against ${all[0].std} in ${all[0].name} County, according to CMS. Insurers file plans county by county where they hold provider contracts, and the clinic-based sponsors that crowd eastern Iowa do not file in Story County.` },
    { q: 'How many Iowa Medicare Advantage plans include Part D drug coverage in 2027?', a: `${s.mapd} of the ${s.std} plans open to everyone combine medical and drug coverage, and ${s.zero} of those charge no premium. The others are cost plans or medical-only plans, which you pair with a stand-alone Part D plan or with other creditable drug coverage to avoid a late penalty.` },
  ],
  related: ['state:minnesota', 'state:illinois', 'state:wisconsin', 'state:missouri', 'part-d-deductible', 'late-enrollment-penalty'],
});
