import { defineState } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const s = K.state('washington');
const top = K.counties('washington', 'std');
const thin = K.counties('washington', 'std', true);
const king = K.county('washington', 'king');
const spk = K.county('washington', 'spokane');

export default defineState({
  slug: 'washington',
  title: `Medicare Advantage Plans Washington 2027: ${s.std} Plans, Fewer`,
  description: `Washington State Medicare Advantage 2027: ${s.std} open plans after ${s.std26} in 2026, ${s.zero} at $0 with drugs, caps from ${K.usd(s.moopMin!)}. Puget Sound to Spokane, every county.`,
  intro: `Washington lost ${s.std26 - s.std} open plans between 2026 and 2027, and Kaiser Permanente files more plans in the state than any national insurer.`,
  resume: `Washington State has ${s.std} Medicare Advantage plans open to anyone with Parts A and B for 2027, against ${s.std26} in 2026, one of the larger drops in the West. ${s.zero} of the ${s.mapd} drug-covering plans charge a $0 premium. Kaiser Permanente leads with ${s.orgList[0][1]} plans, ahead of ${s.orgList[1][0]} (${s.orgList[1][1]}) and ${s.orgList[2][0]} (${s.orgList[2][1]}). The lowest cap in the state, ${K.usd(s.moopMin!)}, belongs to a Kaiser HMO with a ${K.prem(s.lowMoop!.m)} premium; the median cap is ${K.usd(s.moopMed!)}. The longest lists are south of Seattle, in ${top.slice(0, 2).map((c) => c.name).join(' and ')} counties (${top[0].std} and ${top[1].std}); King County lists ${king.std}. On the coast and in the northeast, ${thin.slice(0, 3).map((c) => c.name).join(', ')} counties list only ${thin[0].std}. ${s.star4} open plans are rated four stars or more. For Original Medicare, ${s.pdp} stand-alone drug plans are sold, with a median premium of ${K.prem(s.pdpMed)}.`,
  body: (h) => `
<h2>Kaiser's HMO model in the Northwest</h2>
<p>Kaiser Permanente runs its own clinics and contracts with selected hospitals around Puget Sound and in Spokane, and its plans cover care almost only inside that system. Its 2027 list ranges from $0 plans to ${s.lowMoop!.n}, which charges ${K.prem(s.lowMoop!.m)} a month for the state's lowest cap. For a Kaiser patient, staying in a Kaiser plan avoids changing doctors; for someone whose doctors are at UW Medicine, Providence or MultiCare, a broader HMO or a PPO may fit better. Ask each plan which hospital it uses in your county for surgery and cancer treatment, since contracts with hospital systems change from year to year.</p>
${h.mini('zeroTrue')}
<h2>Puget Sound, the coast and the east side</h2>
<p>${top.slice(0, 4).map((c) => `${c.name} (${c.std})`).join(', ')} have the most open plans. Spokane County lists ${spk.std}, ${spk.zero} at $0 with drugs, and residents near Idaho can only join plans filed for their Washington county. ${thin.slice(0, 3).map((c) => `${c.name} (${c.std})`).join(', ')} close the list; San Juan Islands residents should check how a plan covers ferry-dependent care on the mainland.</p>
<h3>Plans that left</h3>
<p>With ${s.std26 - s.std} fewer open plans than in 2026, many Washington residents received non-renewal letters this fall. A plan ending in your area opens a special enrollment period and guaranteed rights to some Medigap policies: see ${h.a('plans-leaving', 'plans leaving in 2027')}. Washington lists ${s.snp} special needs plans, ${s.dsnp} of them for people with Apple Health, the state Medicaid program. Many members were moved by their insurer into a successor plan; check its cap and network rather than assuming nothing changed. Neighbors: ${h.a('state:oregon', 'Oregon')}, ${h.a('state:idaho', 'Idaho')}.</p>
`,
  faqs: [
    { q: 'How many Medicare Advantage plans are there in Washington State for 2027?', a: `${s.std} plans open to anyone with Parts A and B, down from ${s.std26} in 2026, plus ${s.snp} special needs plans, according to the CMS landscape file of September 2026. Counties range from ${thin[0].std} open plans in ${thin[0].name} to ${top[0].std} in ${top[0].name}.` },
    { q: 'Which Washington Medicare Advantage plan has the lowest out-of-pocket maximum for 2027?', a: `${s.lowMoop!.n}, offered by ${s.lowMoop!.o}, with an in-network cap of ${K.usd(s.lowMoop!.moop)} and a premium of ${K.prem(s.lowMoop!.m)} a month where it is sold. The median cap among Washington's open plans is ${K.usd(s.moopMed!)}. Kaiser plans cover care mostly inside the Kaiser system.` },
    { q: 'How many Medicare Advantage plans are there in Spokane County for 2027?', a: `${spk.std} plans open to everyone, ${spk.zero} of them at $0 with drug coverage, with a lowest in-network cap of ${K.usd(spk.moopMin!)}, according to CMS. Spokane residents who use hospitals in Idaho should check that each plan's network includes them before enrolling.` },
  ],
  related: ['county:washington/king', 'state:oregon', 'state:idaho', 'plans-leaving', 'zero-premium-plans'],
});
