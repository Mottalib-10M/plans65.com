import { defineState } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const s = K.state('illinois');
const top = K.counties('illinois', 'std');
const low = K.counties('illinois', 'std', true);
const cook = K.county('illinois', 'cook');
const jo = K.county('illinois', 'jo-daviess');
const cost = s.std - s.hmo - s.ppo - s.pffs;
const joCost = jo.std - jo.hmo - jo.ppo - jo.pffs;
const COST = 'https://www.medicare.gov/health-drug-plans/health-plans/your-health-plan-options/other-medicare-health-plans';

export default defineState({
  slug: 'illinois',
  title: `Medicare Advantage Plans Illinois 2027: ${s.std} Plans, ${s.std26 - s.std} Fewer`,
  description: `Illinois Medicare Advantage for 2027: ${s.std} open plans after ${s.std26 - s.std} left the list, ${s.zero} at $0 with drugs, caps from ${K.usd(s.moopMin!)} and Cook County at ${cook.std}. Every county.`,
  intro: `Illinois loses more open Medicare Advantage plans for 2027 than most states, so members of a closed plan have until ${K.day(K.P.periods.aep.end)} to choose a new one.`,
  resume: `Illinois has ${s.std} Medicare Advantage plans open to anyone with Parts A and B for 2027, down from ${s.std26} in 2026, a net loss of ${s.std26 - s.std}. ${s.zero} of the plans with drug coverage still charge no monthly premium. The lowest in-network cap is ${K.usd(s.moopMin!)}, for ${s.lowMoop!.n} at ${K.prem(s.lowMoop!.m)}, and the median is ${K.usd(s.moopMed!)}, below the national ${K.usd(K.nat.moopMed)}. Cook County has the longest list, ${cook.std} open plans, followed by ${top[1].name} with ${top[1].std}; ${low[0].name} County, in southern Illinois, has ${low[0].std}. PPOs and HMOs are close to even, ${s.ppo} and ${s.hmo}, with ${s.pffs} private fee-for-service plans and ${cost} cost plans in the far northwest. ${s.star4} plans earn four or more stars for 2027. Illinois also lists ${s.snp} special needs plans and ${s.pdp} stand-alone drug plans from ${K.prem(s.pdpMin!)} a month.`,
  body: (h) => `
<h2>A shorter list for 2027</h2>
<p>The CMS file counts ${s.std26 - s.std} fewer open plans in Illinois than in 2026. Some members were moved by their insurer into another plan of the same company; others received a notice that their plan ends on December 31. If you got that notice, you have a special enrollment period and can also use the annual period, which closes on ${K.day(K.P.periods.aep.end)}. Doing nothing sends you back to Original Medicare, without Part D unless you pick a drug plan. Count your remaining days here.</p>
${h.mini('starsSep')}
<h3>Cook County and the collar counties</h3>
<p>${top.slice(0, 4).map((c) => `${c.name} (${c.std})`).join(', ')} lead the state, and Cook's lowest cap is ${K.usd(cook.moopMin!)}. The details for Chicago and its suburbs are on the ${h.a('county:illinois/cook', 'Cook County page')}. Downstate, the list shortens: ${low[0].name} County has ${low[0].std} open plans and ${low[1].name} ${low[1].std}, with caps closer to the national level.</p>
<h2>Cost plans in Jo Daviess County</h2>
<p>Illinois has ${cost} Medicare cost plans, all filed for Jo Daviess County near Dubuque by an Iowa medical group. A cost plan has a network, but you may also use any provider that accepts Medicare and pay Original Medicare's costs there; you can join whenever the plan accepts members and leave at any time for Original Medicare (${h.ext(COST, 'Medicare.gov, other Medicare health plans')}). Jo Daviess shows ${joCost} such plans among its ${jo.std} open ones.</p>
<h3>Who files the plans</h3>
<p>${s.orgList.map(([o, n]) => `${o} (${n})`).join(', ')} file the most open segments; Lumeris is the parent of Essence Healthcare. The top 2027 score is ${s.starMax} stars, held by ${s.best!.n}, a ${K.prem(s.best!.m)} plan with a ${K.usd(s.best!.moop)} cap. Of the ${s.snp} special needs plans, ${s.csnp} target chronic conditions and only ${s.dsnp} serve people with both Medicare and Medicaid, a low count for a state this size.</p>
`,
  faqs: [
    { q: 'How many Illinois Medicare Advantage plans were dropped for 2027?', a: `The open list went from ${s.std26} plans in 2026 to ${s.std} for 2027, a net drop of ${s.std26 - s.std}, according to the CMS landscape files. Members of a plan that ends receive a notice and can choose another plan until ${K.day(K.P.periods.aep.end)}, or later under a special enrollment period.` },
    { q: 'What is a Medicare cost plan, and where is one sold in Illinois?', a: `A cost plan has its own network but lets you see any Medicare provider outside it, paying Original Medicare's share, and you may leave at any time. For 2027 Illinois has ${cost}, all in Jo Daviess County, per CMS. Premiums are higher than for most Advantage plans.` },
    { q: 'Which part of Illinois has the fewest Medicare Advantage plans in 2027?', a: `Southern Illinois. ${low[0].name} County has ${low[0].std} open plans and ${low[1].name} ${low[1].std}, against ${cook.std} in Cook County, according to CMS data of September 2026. Each downstate county's plans, with premium, cap and stars, are listed one by one in the county table on this page.` },
  ],
  related: ['county:illinois/cook', 'state:indiana', 'state:wisconsin', 'state:missouri', 'plans-leaving', 'enrollment-periods'],
});
