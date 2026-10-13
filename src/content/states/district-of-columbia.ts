import { defineState } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const s = K.state('district-of-columbia');
const dc = K.county('district-of-columbia', 'district-of-columbia');

export default defineState({
  slug: 'district-of-columbia',
  title: `Medicare Advantage Plans DC 2027: ${s.std} Plans in Washington`,
  description: `Washington, DC Medicare Advantage for 2027: ${s.std} open plans, down from ${s.std26}, only ${s.zero} at a $0 premium with drugs, caps from ${K.usd(s.moopMin!)}. Each plan, no sales call.`,
  intro: `The District is a single county for Medicare purposes, and its open list for 2027 is short: ${s.std} plans, after ${dc.gone} plan IDs from 2026 were not filed again.`,
  resume: `Residents of the District of Columbia who have Parts A and B can choose among ${s.std} Medicare Advantage plans open to the public for 2027, against ${s.std26} in 2026. Only ${s.zero} of the ${s.mapd} plans that include drug coverage charge no monthly premium, a much smaller share than in the surrounding suburbs. In-network out-of-pocket caps run from ${K.usd(s.moopMin!)} to ${K.usd(s.moopMax!)}, with a median of ${K.usd(s.moopMed!)}, above the national ${K.usd(K.nat.moopMed)}. Quality scores are high: ${s.star4} of the ${s.std} plans hold four stars or more for 2027. ${s.orgList[0][0]} files the most open plans, followed by ${s.orgList[1][0]} and ${s.orgList[2][0]}. ${dc.gone} plan IDs offered in 2026 were not renewed and ${dc.new} are new. The District also has ${s.snp} special needs plans and ${s.pdp} stand-alone Part D plans, the cheapest at ${K.prem(s.pdpMin!)} a month, listed below.`,
  body: (h) => `
<h2>A city-sized market with few $0 plans</h2>
<p>Because DC counts as one county, every resident sees the same ${s.std} open plans, whether they live in Anacostia or Chevy Chase. ${s.orgList.map(([o, n]) => `${o} (${n})`).join(', ')} file them. Only ${s.zero} carry no monthly premium with drug coverage, so many DC members pay a plan premium on top of Part B. The lowest cap, ${K.usd(s.lowMoop!.moop)}, comes with ${s.lowMoop!.n} at ${K.prem(s.lowMoop!.m)} a month; the top premium among open plans is ${K.prem(s.premMax!)}.</p>
<h3>Kaiser's position in the District</h3>
<p>Kaiser Permanente runs its own medical centers in the region and files ${s.orgList[0][1]} of the open plans. Its HMO-POS plans let members use some care outside Kaiser for a higher share of the bill. ${s.best!.n}, rated ${s.best!.star} stars, costs ${K.prem(s.best!.m)} with a ${K.usd(s.best!.moop)} cap. Members who rely on a university hospital or a specific downtown practice should check each directory, because DC networks differ more from plan to plan than the short list suggests.</p>
<h2>Turning 65 in Washington</h2>
<p>Your first chance to join comes in your initial enrollment period, seven months centered on the month you turn 65. If you keep working past 65 with group coverage from a current employer, you can delay Part B without penalty and sign up later in a special enrollment period (${h.src('cfr_407_20', '42 CFR 407.20')}). Find your own window here.</p>
${h.mini('iep')}
<p>If you choose Original Medicare instead, your ${K.P.periods.medigapOpenMonths}-month Medigap open enrollment starts with Part B, and a stand-alone drug plan from the ${s.pdp} on offer covers prescriptions; ${s.pdpBench} of them are free with full Extra Help. See ${h.a('enrollment-periods', 'every enrollment period')} for the rules.</p>
<h3>Plans for residents with DC Medicaid</h3>
<p>The ${s.snp} special needs plans include ${s.dsnp} D-SNPs for people with both Medicare and DC Medicaid and ${s.isnp} plan for nursing-home residents. Neighboring ${h.a('state:maryland', 'Maryland')} and ${h.a('state:virginia', 'Virginia')} have their own lists; you can join only plans filed for your place of residence.</p>
`,
  faqs: [
    { q: 'Why are there so few $0 premium Medicare Advantage plans in Washington, DC for 2027?', a: `Only ${s.zero} of the ${s.mapd} DC plans with drug coverage have no premium, according to the CMS landscape file of September 2026. Insurers set premiums from their costs and bids in each county, and the District's single county has a short list overall: ${s.std} open plans, against ${s.std26} in 2026.` },
    { q: 'Can a DC resident join a Medicare Advantage plan sold in Maryland or Virginia?', a: `No. You can join only plans filed for the county where you live, and the District counts as one county. Some plans serve both DC and nearby counties, and their networks may include suburban hospitals. Check the provider directory of each of the ${s.std} DC plans for your doctors.` },
    { q: 'How many DC Medicare Advantage plans have four stars or more for 2027?', a: `${s.star4} of the District's ${s.std} open plans hold a 2027 rating of four stars or more, published by CMS on October 8, 2026, and the best reaches ${s.starMax} stars. Ratings belong to the insurer's contract, so several plans from one company share the same score.` },
  ],
  related: ['state:maryland', 'state:virginia', 'enrollment-periods', 'star-ratings', 'plans-leaving'],
});
