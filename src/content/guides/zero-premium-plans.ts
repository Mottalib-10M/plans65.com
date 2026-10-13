import { defineGuide } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';
import { STATE_LIST } from '../../lib/data';

const n = K.nat;
const B = K.P.partB;
const share = n.zeroMapd / n.mapd;
const states = STATE_LIST.map((s) => K.state(s.slug)).filter((s) => s.mapd > 0);
const most = [...states].sort((a, b) => b.zero / b.mapd - a.zero / a.mapd)[0];
const least = [...states].filter((s) => s.mapd >= 10).sort((a, b) => a.zero / a.mapd - b.zero / b.mapd)[0];
const worst = K.year({ year: 2027, magi: 60000, filing: 'single', planPremium: 0, medigapPremium: 0, moop: n.moopMax, annualDrugCost: 0, partBServices: 200000, admissions: 2, path: 'ma' });

export default defineGuide({
  id: 'zero-premium-plans',
  group: 'plans',
  order: 40,
  slug: 'zero-premium-plans',
  nav: '$0 premium plans 2027',
  card: 'Every $0 plan of a county, sorted by out-of-pocket cap',
  title: '$0 Premium Medicare Advantage Plans 2027: What They Cost',
  description: `$0 premium Medicare Advantage plans 2027: ${K.num(n.zeroMapd)} of ${K.num(n.mapd)} open plans with drugs charge nothing a month. See yours by county, sorted by out-of-pocket cap.`,
  h1: '$0 premium Medicare Advantage plans for 2027',
  intro: 'The finder keeps only plans with drug coverage and no premium of their own, sorted from the lowest out-of-pocket cap: the cheapest worst case first.',
  resume: `For 2027, ${K.num(n.zeroMapd)} of the ${K.num(n.mapd)} Medicare Advantage plans that are open to everyone and include drug coverage charge a monthly premium of $0, about ${K.pct(share, 0)} of them, according to the CMS landscape file of September 2026. A $0 premium means the plan asks nothing on top of what Medicare already takes: you still pay the Part B premium, ${K.cents(B['2026'].premium)} a month in 2026 and projected at ${K.cents(B['2027'].premium)} for 2027, plus any IRMAA. You also pay the plan's copays and coinsurance until its in-network out-of-pocket maximum, which ranges up to ${K.usd(n.moopMax)} in 2027, and drug costs up to the ${K.usd(K.P.partD['2027'].oopCap)} Part D cap. The share of $0 plans varies a lot by state: ${K.pct(most.zero / most.mapd, 0)} of drug-covering plans in ${most.name}, ${K.pct(least.zero / least.mapd, 0)} in ${least.name}. The list above puts the $0 plans of a county in order of their cap.`,
  body: (h) => `
<h2>How a plan can charge nothing</h2>
<p>Medicare pays each Advantage plan a monthly amount per member, set from a county benchmark and the plan's bid. When a plan bids below the benchmark, part of the difference comes back as a rebate that the plan must spend on its members: lower cost sharing, extra benefits, or a lower premium. The landscape file shows the result: the Part D basic premium of an Advantage plan is net of the rebates used to "buy down" the drug premium, as note 7 of the file's read-me puts it. Plans that use the whole rebate this way reach a consolidated premium of $0.</p>
<p>This is why $0 plans cluster where benchmarks are high and medical groups compete: ${K.num(K.state('florida').zero)} in Florida, ${K.num(K.state('california').zero)} in California, ${K.num(K.state('texas').zero)} in Texas. Where few insurers compete, as in parts of the Northeast and the rural Mountain West, more plans keep a premium.</p>
<h2>The cap is the price you do not see</h2>
<p>Among $0 plans the main difference is the out-of-pocket maximum. A $0 plan with a cap at ${K.usd(n.moopMax)}, the highest filed for 2027, can leave a person with a major illness, ${K.usd(200000)} of approved care and two admissions with ${K.usd(worst.total)} to pay over 2027, Part B premiums included. A $0 plan capped at a few thousand dollars in the same county limits the same year far more. That is why the finder sorts $0 plans by cap and not by name: the first lines are the cheapest bad year.</p>
${h.mini('zeroTrue')}
<h3>Plans that pay part of your Part B premium</h3>
<p>Some plans go further and reduce the Part B premium itself; insurers usually call them "giveback" plans, and the word often appears in the plan name in the county list. The reduction is deducted from the Part B amount withheld from your Social Security payment. The landscape file does not give the reduction amount, so the plan's Summary of Benefits is the place to read it. Giveback plans tend to have narrower benefits elsewhere or a higher cap: compare the whole year, not the monthly line.</p>
<h2>Reading a $0 line in the list</h2>
<p>Each line of the finder gives four facts filed with CMS. The premium column says $0. The drug deductible column says how much of your first drug costs the plan leaves to you; among $0 plans it ranges from nothing to the full standard amount, and that single figure can be worth several hundred dollars a year if you take brand-name drugs from January. The cap column is the in-network out-of-pocket maximum. The stars column carries the 2027 rating of the insurer's contract, or "new plan" when the contract is too recent to be rated.</p>
<p>The plan ID under each name (for example H1234-005-0) is how the plan is identified everywhere: on Medicare.gov, in the plan's own documents and in your Annual Notice of Change. Note it before you call a plan or enroll online, so you are sure you are joining the plan you compared and not another plan of the same insurer with a similar name.</p>
<h2>Who should look twice at a $0 plan</h2>
<ul>
<li>People with a doctor or hospital outside the plan's network: a $0 HMO pays nothing for routine out-of-network care.</li>
<li>People who spend months away from home: emergencies are covered everywhere, routine care only in the service area.</li>
<li>People with expensive drugs: a $0 plan with a full ${K.usd(K.P.partD['2027'].deductible)} drug deductible and your drugs on a high tier can cost more over the year than a plan with a premium. The ${h.a('part-d-deductible', 'Part D calculator')} shows the drug side.</li>
<li>People who may want a Medigap policy later: after the first year in an Advantage plan, most states let Medigap insurers refuse you or charge more for health reasons when you come back to Original Medicare.</li>
</ul>
<p>None of this makes $0 plans a bad deal; for many people with a working network and moderate care they are the cheapest route. The point is that the premium is only one of four numbers, and the ${h.a('compare-plans', 'two-plan comparator')} shows the other three.</p>
`,
  faqs: [
    { q: 'How many $0 premium Medicare Advantage plans are there for 2027?', a: `${K.num(n.zeroMapd)} of the ${K.num(n.mapd)} plans open to everyone that include drug coverage have a $0 monthly premium in 2027, according to the CMS landscape file of September 2026. Special needs plans are not counted. The number in your county is what matters: the finder lists them, sorted by out-of-pocket cap.` },
    { q: 'Do I still pay the Part B premium with a $0 Advantage plan?', a: `Yes. A $0 plan premium is in addition to the Part B premium, which is ${K.cents(B['2026'].premium)} a month in 2026 and projected at ${K.cents(B['2027'].premium)} for 2027 by the Trustees, plus any income-related adjustment. Only plans that reduce the Part B premium, often called giveback plans, lower that amount, and only by the reduction they state.` },
    { q: 'What is the catch with $0 premium Medicare Advantage plans?', a: `There is no single catch, but the cost moves elsewhere: copays and coinsurance up to an out-of-pocket cap that can reach ${K.usd(n.moopMax)} in network in 2027, a provider network you must use, prior authorization for some services, and a drug list. Sorting the county's $0 plans by cap shows which limit the worst case most.` },
    { q: 'Can a $0 plan start charging a premium next year?', a: 'Yes. Premiums, caps and benefits are set for one calendar year at a time, and insurers can change them, or leave a county, for the following year. Each September your plan mails an Annual Notice of Change for the next year. Compare it during the annual period from October 15 to December 7.' },
  ],
  tool: 'zero',
  related: ['compare-plans', 'annual-cost-calculator', 'part-b-premium', 'hmo-vs-ppo', 'state:florida'],
  sources: ['cms_landscape', 'cms_fs_2026', 'trustees_2026', 'ann_2027'],
});
