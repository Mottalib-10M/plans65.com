import { defineState } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const s = K.state('delaware');
const nc = K.county('delaware', 'new-castle');
const kent = K.county('delaware', 'kent');
const sus = K.county('delaware', 'sussex');

export default defineState({
  slug: 'delaware',
  title: `Medicare Advantage Plans Delaware 2027: ${s.std} Plans, ${s.counties} Counties`,
  description: `Delaware Medicare Advantage 2027: ${s.std} open plans in New Castle, Kent and Sussex, ${s.zero} at $0 with drugs, no in-network cap below ${K.usd(s.moopMin!)}. Every plan listed.`,
  intro: `With three counties and a uniform ${K.usd(s.moopMin!)} floor on out-of-pocket caps, Delaware's choice for 2027 comes down to network, premium and stars.`,
  resume: `Delaware offers ${s.std} Medicare Advantage plans open to anyone with Parts A and B for 2027, ${s.std === s.std26 ? 'the same count as in 2026' : `${K.change(s.std, s.std26)} than in 2026`}, and ${s.zero} of the plans with drug coverage carry no monthly premium. New Castle County, around Wilmington, has ${nc.std} of them; Sussex, on the coast, ${sus.std}; and Kent, around Dover, ${kent.std}. No plan in the state sets its in-network out-of-pocket maximum below ${K.usd(s.moopMin!)}, and the median is ${K.usd(s.moopMed!)}, well above the national ${K.usd(K.nat.moopMed)}. PPOs make up ${s.ppo} of the list and HMOs ${s.hmo}. ${s.star4} plans hold four stars or more for 2027, topping out at ${s.starMax}. Delaware also lists ${s.snp} special needs plans. Beneficiaries who keep Original Medicare can choose among ${s.pdp} stand-alone drug plans, from ${K.prem(s.pdpMin!)} a month, with a median of ${K.prem(s.pdpMed!)}.`,
  body: (h) => `
<h2>One floor for the whole state</h2>
<p>Every Delaware county shows the same lowest cap: ${K.usd(nc.moopMin!)} in New Castle, ${K.usd(kent.moopMin!)} in Kent and ${K.usd(sus.moopMin!)} in Sussex. That floor belongs to ${s.lowMoop!.n}, at ${K.prem(s.lowMoop!.m)} a month. In practice it means the worst year under any Delaware plan costs several thousand dollars, so the cap matters less for choosing than in states where it ranges from a few hundred dollars upward. What differs is premium, network and rating. The tool below shows what a cap of that size is still worth against Original Medicare without a supplement.</p>
${h.mini('capVsOriginal', { moop: s.moopMin })}
<h3>A top-rated plan with the highest cap</h3>
<p>${s.best!.n} reaches ${s.best!.star} stars for 2027 with a ${K.prem(s.best!.m)} premium, yet its cap is ${K.usd(s.best!.moop)}. Star ratings measure quality of care and service, not what you pay, so a high score and a high ceiling can coexist. If your health is uncertain, compare the cap first and the stars second.</p>
<h2>Wilmington, Dover and the beaches</h2>
<p>New Castle has ${nc.zero} $0 plans with drugs, Sussex ${sus.zero} and Kent ${kent.zero}. For people who retire to the Sussex coast from another state, a plan bought in the old state ends when you move, and the move opens a special enrollment period to choose a Delaware plan. Doctors across the state line in Salisbury or Philadelphia may be in network for some PPOs, which is worth checking in each directory.</p>
<h3>Companies on the list</h3>
<p>${s.orgList.map(([o, n]) => `${o} (${n})`).join(', ')} file the most open segments. Highmark Health is the parent of the state's Blue Cross Blue Shield plan. Special needs plans number ${s.snp}: ${s.dsnp} for people with Delaware Medicaid, ${s.csnp} for chronic conditions and ${s.isnp} for nursing-home residents. Compare ${h.a('state:maryland', 'Maryland')}, ${h.a('state:pennsylvania', 'Pennsylvania')} and ${h.a('state:new-jersey', 'New Jersey')}.</p>
`,
  faqs: [
    { q: 'What is the lowest out-of-pocket maximum on a Delaware Medicare Advantage plan in 2027?', a: `${K.usd(s.moopMin!)} in network, and every county has that same floor, per the CMS landscape file of September 2026. The plan setting it is ${s.lowMoop!.n}, with a ${K.prem(s.lowMoop!.m)} monthly premium. Half the open plans in Delaware cap costs at ${K.usd(s.moopMed!)} or more.` },
    { q: 'I am retiring to Sussex County, Delaware. Can I keep my old Medicare Advantage plan?', a: `Only if the plan also serves Sussex County, which is rare for plans from another state. A permanent move outside the service area gives you a special enrollment period to join one of the ${sus.std} open plans filed for Sussex for 2027, or to return to Original Medicare with a Part D plan.` },
    { q: 'How many Delaware Medicare Advantage plans cost $0 a month in 2027?', a: `${s.zero} plans with drug coverage have no premium statewide: ${nc.zero} in New Castle, ${sus.zero} in Sussex and ${kent.zero} in Kent. Members still pay the Part B premium, ${K.cents(K.P.partB['2026'].premium)} a month in 2026, and copays until they reach the plan's cap.` },
  ],
  related: ['state:maryland', 'state:pennsylvania', 'state:new-jersey', 'star-ratings', 'compare-plans'],
});
