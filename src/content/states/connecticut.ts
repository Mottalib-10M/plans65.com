import { defineState } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const s = K.state('connecticut');
const fair = K.county('connecticut', 'fairfield');
const hart = K.county('connecticut', 'hartford');
const nh = K.county('connecticut', 'new-haven');
const wind = K.county('connecticut', 'windham');

export default defineState({
  slug: 'connecticut',
  title: `Medicare Advantage Plans Connecticut 2027: ${s.std} Open Plans`,
  description: `Connecticut Medicare Advantage 2027: ${s.std} open plans, only ${s.zero} at $0 with drugs, caps from ${K.usd(s.moopMin!)}, and Fairfield County with the shortest list. Each plan shown.`,
  intro: `Connecticut's richest county has its thinnest Medicare Advantage menu for 2027, and a large share of last year's plan IDs were not filed again.`,
  resume: `Connecticut residents with Parts A and B have ${s.std} Medicare Advantage plans open to the public for 2027, spread over the state's ${s.counties} counties, and just ${s.zero} of the drug-covering ones charge no monthly premium. The lowest in-network cap is ${K.usd(s.moopMin!)}, for ${s.lowMoop!.n}, and the median is ${K.usd(s.moopMed!)}, above the national ${K.usd(K.nat.moopMed)}. Hartford, Middlesex and New Haven counties each list ${hart.std} open plans, but Fairfield County, the most affluent, lists only ${fair.std} and Windham ${wind.std}. PPOs lead, ${s.ppo} to ${s.hmo} HMOs. Turnover is the other story: Hartford County lost ${hart.gone} plan IDs from 2026 and gained ${hart.new}. ${s.star4} plans earn four stars or more. For Original Medicare, ${s.pdp} stand-alone drug plans start at ${K.prem(s.pdpMin!)} a month, a higher floor than in most states, and ${s.pdpZeroDed} has no deductible.`,
  body: (h) => `
<h2>Fairfield County: high incomes, short list</h2>
<p>Fairfield County lists ${fair.std} open plans for 2027, ${fair.zero} of them at $0 with drugs, and its lowest cap is ${K.usd(fair.moopMin!)}, compared with ${K.usd(hart.moopMin!)} in Hartford County. Insurers file fewer plans there. Households with higher incomes, wherever they live in the state, should also check the income-related surcharge on Part B and Part D, called IRMAA: Medicare premiums are based on income reported two years earlier. The check below shows where a given income lands in 2026.</p>
${h.mini('irmaaQuick')}
<p>A joint return above ${K.usd(K.P.irmaa['2026'].joint[0])} or a single one above ${K.usd(K.P.irmaa['2026'].single[0])} triggers the first tier. The surcharge applies whatever plan you choose, including Medicare Advantage, because it rides on the Part B premium. See ${h.a('irmaa-brackets', 'the IRMAA brackets')}.</p>
<h2>A year of reshuffled plan numbers</h2>
<p>The open list went from ${s.std26} plans in 2026 to ${s.std}, ${K.change(s.std, s.std26)}, but that net figure hides much larger movement. In Hartford County ${hart.gone} plan IDs from 2026 are not filed for 2027 and ${hart.new} new ones appear; in New Haven County the figures are ${nh.gone} and ${nh.new}. Some of those changes are mergers, where members are moved into another plan by the same company, and some are true exits. Your insurer's Annual Notice of Change says which applies to you. See ${h.a('plans-leaving', 'plans leaving for 2027')}.</p>
<h3>Insurers and ratings</h3>
<p>${s.orgList.map(([o, n]) => `${o} (${n})`).join(', ')} file the most open segments. The top 2027 score is ${s.starMax} stars, for ${s.best!.n}, a $0 plan with a ${K.usd(s.best!.moop)} cap that returns part of the Part B premium. Connecticut also counts ${s.dsnp} D-SNPs for people with Medicare and HUSKY Health, the state Medicaid program, and ${s.csnp} C-SNPs.</p>
<h2>Drug plans priced above the national floor</h2>
<p>The cheapest stand-alone Part D plan in Connecticut costs ${K.prem(s.pdpMin!)} a month (${s.pdpMinName}), and the median is ${K.prem(s.pdpMed!)}. ${s.pdpBench} plans are free for people with full Extra Help.</p>
`,
  faqs: [
    { q: 'Why does Fairfield County have fewer Medicare Advantage plans than the rest of Connecticut?', a: `For 2027 Fairfield County has ${fair.std} open plans against ${hart.std} in Hartford County, according to the CMS landscape file of September 2026. Insurers decide county by county where to file, based on their networks and costs. The plans available are listed on the Fairfield line of the county table above.` },
    { q: 'How many Connecticut Medicare Advantage plans were not renewed for 2027?', a: `It depends on the county. Hartford County lost ${hart.gone} plan IDs offered in 2026 and gained ${hart.new}; New Haven lost ${nh.gone}. Statewide the open list went from ${s.std26} to ${s.std}. Members of a closed plan can choose a new one until ${K.day(K.P.periods.aep.end)}.` },
    { q: 'Are there $0 premium Medicare Advantage plans in Connecticut for 2027?', a: `Yes, ${s.zero} drug-covering plans open to everyone charge no monthly premium, but they are scarcer than in most states. Fairfield and Windham counties have ${fair.zero} and ${wind.zero}. You still pay the Part B premium, ${K.cents(K.P.partB['2026'].premium)} a month in 2026, plus copays up to the plan's cap.` },
  ],
  related: ['state:new-york', 'state:massachusetts', 'state:rhode-island', 'irmaa-brackets', 'plans-leaving'],
});
