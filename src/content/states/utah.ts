import { defineState } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const s = K.state('utah');
const top = K.counties('utah', 'std');
const none = K.counties('utah', 'std', true).filter((c) => c.std === 0).map((c) => c.name);
const thin = K.counties('utah', 'std', true).filter((c) => c.std > 0);
const slc = K.county('utah', 'salt-lake');

export default defineState({
  slug: 'utah',
  title: `Medicare Advantage Plans Utah 2027: ${s.std} Plans, Wasatch Front`,
  description: `Medicare Advantage plans in Utah for 2027: ${s.std} open to all, ${s.zero} at $0 with drugs, caps from ${K.usd(s.moopMin!)}, and ${none.length} counties with none. Every Utah county, no agent call.`,
  intro: `Along the Wasatch Front, from Ogden to Provo, Utah lists close to thirty plans per county; in the south and east the list drops to a handful, and ${none.length} counties have none.`,
  resume: `Utah has ${s.std} Medicare Advantage plans open to anyone with Parts A and B for 2027, down from ${s.std26} in 2026. ${s.zero} of the ${s.mapd} drug-covering plans charge no premium, the lowest cap is ${K.usd(s.moopMin!)}, for ${s.lowMoop!.n}, and the median is ${K.usd(s.moopMed!)}. Quality is high: ${s.star4} of the ${s.std} plans carry four stars or more for 2027. Choice follows the Wasatch Front, where ${top.slice(0, 3).map((c) => c.name).join(', ')} counties list ${top[2].std} or more open plans each; ${thin.slice(0, 3).map((c) => c.name).join(', ')} counties list ${thin[0].std}, and ${none.join(' and ')} counties have no open plan at all. PPOs outnumber HMOs, ${s.ppo} to ${s.hmo}. ${s.orgList.slice(0, 3).map(([o]) => o).join(', ')} file the most plans, and Intermountain Health, the state's largest hospital system, files its own. ${s.pdp} stand-alone drug plans are sold, from ${K.prem(s.pdpMin)} a month.`,
  body: (h) => `
<h2>Intermountain and the hospital question</h2>
<p>In Utah, choosing an Advantage plan is largely choosing which hospital system you will use. Intermountain Health runs many of the hospitals along the Wasatch Front and sells plans through its own insurer, SelectHealth, while University of Utah Health and other systems contract with the national carriers. A plan's network decides whether your surgeon at one system or the other is covered. The ${s.orgList.map(([o, n]) => `${o} (${n})`).join(', ')} plans of 2027 do not all include both.</p>
${h.mini('zeroTrue')}
<h2>Salt Lake County, and the long drive south</h2>
<p>Salt Lake County lists ${slc.std} open plans, ${slc.zero} of them at $0 with drugs, and a lowest cap of ${K.usd(slc.moopMin!)}. In the southern and eastern counties, where St. George, Moab or Vernal residents may travel hours for a specialist, the list is short and made mostly of PPOs, which pay out of network at a higher share. In ${none.join(" and ")} counties, Original Medicare with a drug plan and Medigap is the only route; a move into one of them ends an Advantage plan and opens a special enrollment period.</p>
<h3>Ratings</h3>
<p>The best 2027 rating, ${s.starMax} stars, goes to plans such as ${s.best!.n}, a ${K.prem(s.best!.m)} plan with a ${K.usd(s.best!.moop)} cap: a high rating does not always come with a low cap, so read both columns before you decide. Utah also lists ${s.snp} special needs plans, ${s.dsnp} for people with Medicaid. Neighbors: ${h.a('state:idaho', 'Idaho')}, ${h.a('state:nevada', 'Nevada')}, ${h.a('state:colorado', 'Colorado')}, ${h.a('state:arizona', 'Arizona')}.</p>
`,
  faqs: [
    { q: 'How many Medicare Advantage plans are there in Salt Lake County for 2027?', a: `${slc.std} plans open to everyone, ${slc.zero} of them at $0 with drug coverage, according to the CMS landscape file of September 2026. The lowest in-network cap in the county is ${K.usd(slc.moopMin!)}. Davis and Utah counties have lists of similar length along the Wasatch Front.` },
    { q: 'Which Utah counties have no Medicare Advantage plan in 2027?', a: `${none.join(' and ')} counties have no plan open to the general public for 2027 in the CMS file. Residents keep Original Medicare and can add one of the ${s.pdp} stand-alone Part D plans sold in Utah, plus a Medigap policy for the 20% that Part B leaves without a yearly cap.` },
    { q: 'Do Utah Medicare Advantage plans cover both Intermountain and University of Utah hospitals?', a: 'Not all of them. Each plan has its own network for 2027, and some are built around one hospital system. Look up your hospital and specialists in the plan’s provider directory before you enroll, and again when the plan sends its Annual Notice of Change in the fall.' },
  ],
  related: ['state:idaho', 'state:nevada', 'state:colorado', 'state:arizona', 'compare-plans', 'zero-premium-plans'],
});
