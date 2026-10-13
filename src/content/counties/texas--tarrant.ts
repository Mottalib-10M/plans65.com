import { defineCounty } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const c = K.county('texas', 'tarrant');
const da = K.county('texas', 'dallas');
const jo = K.county('texas', 'johnson');
const pa = K.county('texas', 'parker');
const de = K.county('texas', 'denton');
const tx = K.state('texas');

export default defineCounty({
  state: 'texas',
  county: 'tarrant',
  title: `Medicare Advantage Plans Tarrant County 2027: ${c.zero} at $0`,
  description: `Tarrant County (Fort Worth) 2027: ${c.std} open Medicare Advantage plans, a median cap of ${K.usd(c.moopMed!)} and ${c.zero} plans at $0 with drugs, fewer than in 2026. Full list.`,
  intro: `Fort Worth's plans cost little each month but cap yearly spending higher than most big Texas counties, so the $0 label hides more here than elsewhere.`,
  resume: `In Tarrant County a $0 premium and a low yearly cap rarely come together in 2027. Of the ${c.std} Medicare Advantage plans open to anyone with Parts A and B, ${c.zero} include drug coverage with no monthly premium (${c.zero26} did in 2026), but the median in-network cap is ${K.usd(c.moopMed!)}, above the Texas median of ${K.usd(tx.moopMed!)} and the national median of ${K.usd(K.nat.moopMed)}. The lowest cap is ${K.usd(c.moopMin!)}, from ${c.lowMoop!.n}; the highest is ${K.usd(c.moopMax!)}. ${c.star4} plans hold four stars or more in the 2027 ratings, and ${c.best!.n} tops the county at ${c.starMax} stars. The menu shrank from ${c.std26} open plans to ${c.std}: ${c.gone} IDs were not renewed and ${c.new} are new. Fort Worth residents with Medicaid have ${c.dsnp} dual-eligible plans among ${c.snp} special needs plans in all.`,
  body: (h) => `
<h2>What a $0 plan costs in a heavy year</h2>
<p>The premium is the cost you see every month; the cap is the cost you meet in the year of a heart procedure or a hip replacement. With half of Tarrant's open plans capped at ${K.usd(c.moopMed!)} or more, two $0 plans can be thousands of dollars apart in a bad year. The calculator below adds the projected 2027 Part B premium, which every member keeps paying, to what you would spend up to a plan's cap.</p>
${h.mini('zeroTrue')}
<h3>Low caps worth a closer look</h3>
<p>${c.lowMoop!.n} has the smallest cap. ${c.cheapHigh!.n}, rated ${c.cheapHigh!.star} stars, charges ${K.usd(c.cheapHigh!.m)} a month with a ${K.usd(c.cheapHigh!.moop!)} cap, and ${c.best!.n} combines the county's top rating with a ${K.usd(c.best!.moop!)} cap. Sort the list above by cap, then check the network, since not every hospital system contracts with every HMO.</p>
<h2>Insurers and the 2026 exits</h2>
<p>${c.orgList.map(([o, n]) => `${o} (${n})`).join(', ')} lead the count. The Aetna Medicare Signature and Enhanced PPOs, several HumanaChoice and Humana Value Choice PPOs, HealthSpring True Choice Savings and a group of Blue Cross plans are among the IDs that did not return, which is why the PPO count fell to ${c.ppo}. PPO members who travel or see doctors in several counties should compare the remaining PPOs before December 7.</p>
<h3>West and east of Fort Worth</h3>
<p>Dallas County lists ${da.std} open plans, Denton ${de.std}, Johnson ${jo.std} and Parker ${pa.std}. Arlington and Keller sit inside Tarrant, so their residents see the list on this page.</p>
`,
  faqs: [
    { q: 'How many $0 premium Medicare Advantage plans are available in Tarrant County for 2027?', a: `${c.zero} plans with drug coverage and no monthly premium, down from ${c.zero26} in 2026, according to the CMS landscape file of September 2026. A $0 plan still leaves the Part B premium and copays up to the plan's in-network cap, which runs from ${K.usd(c.moopMin!)} to ${K.usd(c.moopMax!)} in the county.` },
    { q: 'Which Tarrant County Medicare Advantage plan has the best star rating for 2027?', a: `${c.best!.n}, at ${c.starMax} stars, based on the 2027 Star Ratings published by CMS on October 8, 2026; ${c.star4} of the ${c.std} open plans reach four stars or more. Ratings measure the insurer's contract, so other plans under the same contract share the score.` },
    { q: 'Are PPO Medicare Advantage plans still offered in Tarrant County in 2027?', a: `Yes, ${c.ppo} of the ${c.std} open plans are PPOs, along with ${c.hmo} HMOs and ${c.pffs} private fee-for-service plan. Several 2026 PPOs from Aetna, Humana, HealthSpring and Blue Cross were not renewed. A PPO pays part of the cost of out-of-network care; an HMO does not, except in emergencies.` },
  ],
  related: ['state:texas', 'county:texas/dallas', 'county:texas/harris', 'zero-premium-plans', 'hmo-vs-ppo'],
});
