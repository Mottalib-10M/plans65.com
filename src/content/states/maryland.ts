import { defineState } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const s = K.state('maryland');
const top = K.counties('maryland', 'std');
const thin = K.counties('maryland', 'std', true);
const mont = K.county('maryland', 'montgomery');
const balt = K.county('maryland', 'baltimore');

export default defineState({
  slug: 'maryland',
  title: `Medicare Advantage Plans Maryland 2027: ${s.std} Plans, Fewer`,
  description: `Medicare Advantage plans in Maryland for 2027: ${s.std} open to all after ${s.std26} in 2026, ${s.zero} at $0 with drugs, caps from ${K.usd(s.moopMin!)}. Every county listed, no ZIP or agent.`,
  intro: `Maryland lost ${s.std26 - s.std} open plans between 2026 and 2027, and Kaiser Permanente, Johns Hopkins and CareFirst file as many as the national insurers.`,
  resume: `Maryland has ${s.std} Medicare Advantage plans open to anyone with Parts A and B for 2027, after ${s.std26} in 2026, one of the sharper drops in the country in proportion. Only ${s.zero} of the ${s.mapd} drug-covering plans have a $0 premium, and caps are high: no open plan goes below ${K.usd(s.moopMin!)}, and the median is ${K.usd(s.moopMed!)}. Montgomery County leads with ${mont.std} open plans, while ${thin[0].name}, ${thin[1].name} and ${thin[2].name} on the Eastern Shore list ${thin[0].std} each. The insurers are partly local: ${s.orgList.slice(0, 4).map(([o]) => o).join(', ')}. Quality is solid, with ${s.star4} plans at four stars or more and a best rating of ${s.starMax}. Maryland's hospitals work under a statewide all-payer rate system, which shapes how plans contract. For people on Original Medicare, ${s.pdp} stand-alone drug plans are sold, the cheapest at ${K.prem(s.pdpMin)} a month.`,
  body: (h) => `
<h2>Health systems that sell their own plans</h2>
<p>${s.orgList.map(([o, n]) => `${o} (${n})`).join(', ')} file the most open plans in Maryland. Kaiser Permanente runs its own clinics around Washington and Baltimore, and its HMOs only work inside that system: the best-rated Maryland plan, ${s.best!.n}, is one of them, at ${K.prem(s.best!.m)} with a ${K.usd(s.best!.moop)} cap. Johns Hopkins files plans built around its hospitals. Before choosing one of these, ask a simple question: is your current doctor part of the system?</p>
<h3>The price of a lower cap</h3>
<p>The lowest cap in the state, ${K.usd(s.lowMoop!.moop)}, belongs to ${s.lowMoop!.n}, which charges ${K.prem(s.lowMoop!.m)} a month. In Maryland, a lower worst case usually comes with a premium, which makes the whole-year view more useful than the monthly line.</p>
${h.mini('zeroTrue')}
<h2>Suburbs and the Eastern Shore</h2>
<p>${top.slice(0, 4).map((c) => `${c.name} (${c.std} open plans, ${c.zero} at $0)`).join(', ')} have the widest choice. Baltimore County lists ${balt.std}, but only ${balt.zero} with drugs at $0. Across the Bay Bridge, ${thin.slice(0, 3).map((c) => c.name).join(', ')} counties have about half as many. Residents near Delaware or Virginia can only join plans filed for their own county, even if their doctors are across the line: compare with ${h.a('state:delaware', 'Delaware')}, ${h.a('state:virginia', 'Virginia')} and ${h.a('state:district-of-columbia', 'DC')}.</p>
<p>Maryland also lists ${s.snp} special needs plans, ${s.dsnp} of them for people who have Medicaid as well. Stand-alone drug plans went from ${s.pdp26} to ${s.pdp}.</p>
`,
  faqs: [
    { q: 'Why are there fewer Medicare Advantage plans in Maryland for 2027?', a: `Insurers filed ${s.std} open plans for 2027 against ${s.std26} for 2026 in the CMS landscape files: some plans closed, others were merged or dropped counties. If your plan is among them, your Annual Notice of Change says whether you are moved to another plan, and a plan leaving your area gives you a special enrollment period.` },
    { q: 'Are there $0 premium Medicare Advantage plans in Montgomery County, Maryland?', a: `Yes, ${mont.zero} of the county's ${mont.std} open plans include drug coverage for a $0 premium in 2027, according to CMS. Their caps differ, from ${K.usd(mont.moopMin!)} upward, so sort the county list by maximum out of pocket to see which $0 plan limits a bad year most.` },
    { q: 'Can I keep my Johns Hopkins or Kaiser doctor with a Maryland Medicare Advantage plan?', a: 'Only in a plan that has that doctor in its network. Kaiser Permanente HMOs cover care in Kaiser facilities, and plans built around a hospital system favor its doctors. Check the provider directory of each plan for 2027 before enrolling, since networks can change from one year to the next.' },
  ],
  related: ['state:virginia', 'state:delaware', 'state:district-of-columbia', 'state:pennsylvania', 'compare-plans', 'plans-leaving'],
});
