import { defineCounty } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const c = K.county('california', 'riverside');
const sb = K.county('california', 'san-bernardino');
const sd = K.county('california', 'san-diego');
const pd = K.P.partD['2027'];

export default defineCounty({
  state: 'california',
  county: 'riverside',
  title: `Medicare Advantage Plans Riverside 2027: None Over ${K.usd(c.premMax!)}/mo`,
  description: `Riverside County's ${c.std} open-to-all Medicare Advantage plans for 2027 cost ${K.usd(c.premMax!)} a month at most; ${c.zero} with drugs charge $0 and caps start at ${K.usd(c.moopMin!)}. All listed here.`,
  intro: `In Riverside County no plan open to everyone costs more than ${K.usd(c.premMax!)} a month, so the real comparison happens on caps, drug deductibles and networks.`,
  resume: `Riverside County's Medicare Advantage menu for 2027 is cheap from top to bottom: the highest monthly premium among its ${c.std} open plans is ${K.usd(c.premMax!)}, and ${c.zero} of the plans that cover drugs charge nothing at all. The lowest in-network out-of-pocket cap is ${K.usd(c.moopMin!)}, filed by ${c.lowMoop!.n}, and the median cap is ${K.usd(c.moopMed!)}, far below the national median of ${K.usd(K.nat.moopMed)}. Humana files the most plans here (${c.topOrgN}), ahead of Alignment Health, Aetna, SCAN and UnitedHealthcare. ${c.star4} plans hold four stars or more for 2027, and ${c.best!.n}, which Kaiser Permanente also sells in San Bernardino County, reaches ${c.starMax} stars. The county had ${c.std26} open plans in 2026 and has ${c.std} now: ${c.gone} IDs were not renewed and ${c.new} are new. Add ${c.snp} special needs plans, ${c.csnp} of them for chronic conditions, and the list above is complete.`,
  body: (h) => `
<h2>When the premium is $0, compare the drug deductible</h2>
<p>With premiums this low, the line that moves your bill most is often the Part D deductible inside the plan. For 2027 the standard drug benefit allows a deductible up to ${K.usd(pd.deductible)}, and $0 plans in Riverside do not all use the same figure: some waive it, others charge part of it or all of it before covering brand drugs. Every plan, though, stops your yearly drug spending at ${K.usd(pd.oopCap)}. The deductible column in the list above shows each plan's choice, and the calculator below shows what a typical monthly drug bill becomes under the standard rules.</p>
${h.mini('drugQuick', { c: 300 })}
<h3>Desert cities and the network question</h3>
<p>The county runs from Corona and Riverside city to the Coachella Valley. An HMO built around a medical group in the western county may have few contracted doctors near Palm Springs or Indio, so residents of the desert cities should search the 2027 provider directory by their own ZIP code before switching. ${c.hmo} of the open plans are HMOs and ${c.ppo} are PPOs.</p>
<h2>Riverside next to San Bernardino</h2>
<p>The two Inland Empire counties share most insurers and many plan names. San Bernardino lists ${sb.std} open plans and ${sb.snp} special needs plans, with a median cap of ${K.usd(sb.moopMed!)}; Riverside has ${c.std} and ${c.snp}. San Diego, to the south, has ${sd.std}. Several Central Health plans, Molina Medicare Choice Care and Humana Gold Plus H5619-148 are among the Riverside IDs not filed for 2027; the full exit list is at the bottom of this page.</p>
`,
  faqs: [
    { q: 'What is the most expensive Medicare Advantage plan in Riverside County for 2027?', a: `No plan open to all residents charges more than ${K.usd(c.premMax!)} a month in 2027, according to the CMS landscape file of September 2026, and ${c.zero} drug-covering plans charge $0. Premium is only one part of the cost: copays, the drug deductible and the in-network cap, which ranges from ${K.usd(c.moopMin!)} to ${K.usd(c.moopMax!)}, weigh more in a year with heavy care.` },
    { q: 'Which insurer offers the most Medicare Advantage plans in Riverside County in 2027?', a: `${c.topOrg}, with ${c.topOrgN} open plan segments, followed by Alignment Health, Aetna (CVS Health), SCAN and UnitedHealthcare, based on the 2027 CMS landscape data. A high number of plans is not a market share: one insurer may offer several versions of a plan with different premiums, caps or extra benefits.` },
    { q: 'Can I keep a Riverside County Medicare Advantage HMO if I move to Palm Springs?', a: `Palm Springs is inside Riverside County, so the plan stays available, but the network may not follow you. HMOs contract with medical groups in specific areas, and your new doctor must be in the plan's directory. If the plan cannot assign you a nearby group, ask the insurer; a permanent move out of the service area opens a special enrollment period.` },
  ],
  related: ['state:california', 'county:california/san-bernardino', 'county:california/san-diego', 'county:california/orange', 'part-d-deductible'],
});
