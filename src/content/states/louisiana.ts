import { defineState } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const s = K.state('louisiana');
const top = K.counties('louisiana', 'std');
const low = K.counties('louisiana', 'std', true);
const orl = K.county('louisiana', 'orleans');
const ebr = K.county('louisiana', 'east-baton-rouge');
const dsnpTop = K.counties('louisiana', 'dsnp')[0];

export default defineState({
  slug: 'louisiana',
  title: `Medicare Advantage Plans Louisiana 2027: ${s.std} Plans by Parish`,
  description: `Louisiana Medicare Advantage 2027: ${s.std} open plans across ${s.counties} parishes, ${s.zero} at $0 with drugs, ${s.dsnp} plans for Medicaid members, caps from ${K.usd(s.moopMin!)}. Parish list.`,
  intro: `Louisiana counts parishes, not counties, and for 2027 its Medicare Advantage market leans heavily toward people who also qualify for Medicaid.`,
  resume: `Louisiana has ${s.std} Medicare Advantage plans open to anyone with Parts A and B for 2027, spread over ${s.counties} parishes, and ${s.zero} of the ${s.mapd} drug-covering ones charge no monthly premium. Next to that open list sit ${s.snp} special needs plans, ${s.dsnp} of them D-SNPs for people with both Medicare and Medicaid, a large share for a state of this size. The lowest in-network cap is ${K.usd(s.moopMin!)}, for ${s.lowMoop!.n}, a plan co-branded with a New Orleans hospital system, at ${K.prem(s.lowMoop!.m)}; the median is ${K.usd(s.moopMed!)}. Orleans Parish lists the most open plans, ${orl.std}, with East Baton Rouge at ${ebr.std}, while ${low[0].name} Parish has ${low[0].std}. ${s.star4} plans earn four or more stars for 2027. Louisiana's stand-alone drug plans are cheap by national standards: the median of the ${s.pdp} plans is ${K.prem(s.pdpMed!)} a month.`,
  body: (h) => `
<h2>Plans built for dual eligibility</h2>
<p>About one Louisiana plan in ${Math.round(s.all / s.dsnp)} on the full list is a D-SNP, a special needs plan for people who receive both Medicare and Louisiana Medicaid. ${dsnpTop.name} Parish alone has ${dsnpTop.dsnp}. These plans coordinate the two programs, and for people whose Medicaid pays Medicare cost sharing they can bring copays close to zero; some also add transportation or an allowance for over-the-counter items. If you have Medicaid, you have more chances to change plans during the year than other beneficiaries. Low-income members also get Extra Help with drugs; the tool shows what that leaves at the pharmacy in 2027.</p>
${h.mini('snpDual')}
<h3>Chronic-condition and nursing-home plans</h3>
<p>The other special needs plans are ${s.csnp} C-SNPs, for conditions such as diabetes, heart failure or COPD, and ${s.isnp} I-SNPs for nursing-home residents. See ${h.a('special-needs-plans', 'how special needs plans work')}.</p>
<h2>New Orleans, Baton Rouge and rural parishes</h2>
<p>${top.slice(0, 5).map((c) => `${c.name} (${c.std})`).join(', ')} lead the parish table. North and central Louisiana have shorter lists: ${low[0].name} has ${low[0].std}, ${low[1].name} ${low[1].std} and ${low[2].name} ${low[2].std}. Plans tied to a hospital system, such as the LCMC-branded Humana plans in the New Orleans area, are only as good as your access to that system, so look at the hospital list before the premium.</p>
<h3>The insurers</h3>
<p>${s.orgList.map(([o, n]) => `${o} (${n})`).join(', ')} file the most open segments. Louisiana Health Service &amp; Indemnity Company is Blue Cross and Blue Shield of Louisiana. ${s.best!.n} reaches ${s.best!.star} stars with a ${K.prem(s.best!.m)} premium and a ${K.usd(s.best!.moop)} cap. HMOs number ${s.hmo} and PPOs ${s.ppo}. The open list went from ${s.std26} plans to ${s.std}, and premiums reach ${K.prem(s.premMax!)} at the top.</p>
<p>For people who keep Original Medicare, the cheapest drug plan is ${s.pdpMinName} at ${K.prem(s.pdpMin!)}, and ${s.pdpBench} plans are free with full Extra Help. Compare ${h.a('state:mississippi', 'Mississippi')}, ${h.a('state:texas', 'Texas')} and ${h.a('state:arkansas', 'Arkansas')}.</p>
`,
  faqs: [
    { q: 'How many Louisiana Medicare Advantage plans are for people with Medicaid in 2027?', a: `${s.dsnp} D-SNPs, special needs plans for people with both Medicare and Louisiana Medicaid, according to the CMS landscape file of September 2026. They sit alongside ${s.std} plans open to everyone. ${dsnpTop.name} Parish has the most, ${dsnpTop.dsnp}. Eligibility depends on your Medicaid category, which the plan checks before enrollment.` },
    { q: 'Which Louisiana parish has the most Medicare Advantage plans for 2027?', a: `${top[0].name} Parish, with ${top[0].std} plans open to everyone, followed by ${top[1].name} with ${top[1].std}, per the CMS landscape file of September 2026. The thinnest is ${low[0].name} Parish, with ${low[0].std}. Every parish's plans, premiums and caps are listed in the table on this page.` },
    { q: 'What is the cheapest Part D plan for Louisiana residents in 2027?', a: `${s.pdpMinName}, at ${K.prem(s.pdpMin!)} a month, among ${s.pdp} stand-alone drug plans sold in Louisiana. The median premium is ${K.prem(s.pdpMed!)}. The cheapest premium can come with a full ${K.usd(K.P.partD['2027'].deductible)} deductible, so compare the yearly cost of your own drugs.` },
  ],
  related: ['state:mississippi', 'state:texas', 'state:arkansas', 'special-needs-plans', 'part-d-plans'],
});
