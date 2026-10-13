import { defineState } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const s = K.state('arizona');
const top = K.counties('arizona', 'std');
const low = K.counties('arizona', 'std', true);
const mar = K.county('arizona', 'maricopa');
const pima = K.county('arizona', 'pima');
const pinal = K.county('arizona', 'pinal');
const yav = K.county('arizona', 'yavapai');

export default defineState({
  slug: 'arizona',
  title: `Medicare Advantage Plans Arizona 2027: ${s.std} Plans Compared`,
  description: `Arizona Medicare Advantage in 2027: ${s.std} open plans, ${s.zero} $0 plans with drugs, a cap as low as ${K.usd(s.moopMin!)}, and a sharp drop outside Phoenix and Tucson. All counties.`,
  intro: `Three counties around Phoenix and Tucson carry Arizona's Medicare Advantage market; past them, the plan count falls by more than half.`,
  resume: `Arizona has ${s.std} Medicare Advantage plans open to anyone with Parts A and B for 2027, and ${s.zero} of the ${s.mapd} that bundle drug coverage have no monthly premium. Caps on in-network spending start at ${K.usd(s.moopMin!)}, with ${s.lowMoop!.n} from ${s.lowMoop!.o} at ${K.prem(s.lowMoop!.m)} a month, and the state median is ${K.usd(s.moopMed!)}, below the national ${K.usd(K.nat.moopMed)}. Choice is concentrated: Maricopa lists ${mar.std} open plans, Pima ${pima.std} and Pinal ${pinal.std}, while Yavapai, fourth, has ${yav.std} and ${low[0].name} only ${low[0].std}. ${s.star4} plans score four stars or more for 2027. Arizona also stands out for chronic-condition plans: ${s.csnp} of its ${s.snp} special needs plans are C-SNPs. Stand-alone Part D plans number ${s.pdp}, with a median premium of ${K.prem(s.pdpMed!)}, well under most states.`,
  body: (h) => `
<h2>The Sun Corridor and everywhere else</h2>
<p>Maricopa County, with Phoenix, lists ${mar.std} open plans and ${mar.zero} at $0 with drugs. Pima, around Tucson, has ${pima.std}, and Pinal, between the two, ${pinal.std}. Yavapai, the next county down, falls to ${yav.std}. In the northeast and along the eastern border, ${low[0].name} has ${low[0].std} and ${low[1].name} ${low[1].std}. Rural Arizona is not empty, but the HMOs that make the metro menu long seldom extend their networks there, and residents choose mostly among a few national PPOs.</p>
<h3>Caps under two thousand dollars</h3>
<p>The statewide floor is ${K.usd(s.moopMin!)}, and both Maricopa (${K.usd(mar.moopMin!)}) and Pima (${K.usd(pima.moopMin!)}) have caps near that level. A cap, or MOOP, is the most you pay in a year for in-network covered medical care; drug costs follow their own ${K.usd(K.P.partD['2027'].oopCap)} ceiling. Low caps come almost only from HMOs, which make up ${s.hmo} of the ${s.std} open plans, and they require you to use the plan's doctors.</p>
<h2>Who sells the plans</h2>
<p>${s.orgList.map(([o, n]) => `${o} (${n})`).join(', ')} file the most open plan segments. Blue Cross Blue Shield of Arizona is the in-state name on that list. The highest 2027 rating in Arizona is ${s.starMax} stars, held among others by ${s.best!.n}.</p>
<h3>Many plans for chronic conditions, few for Medicaid</h3>
<p>Arizona has ${s.csnp} C-SNPs, special needs plans for people with diabetes, heart disease or lung disease, against only ${s.dsnp} D-SNPs for people with both Medicare and Medicaid. A C-SNP requires a diagnosis that the plan verifies with your doctor before enrollment is confirmed. Details are in ${h.a('special-needs-plans', 'special needs plans')}.</p>
<h2>Retiring to Arizona with a high last paycheck</h2>
<p>Many people arrive in Arizona around retirement, and their Part B premium is set from the tax return of two years earlier. A final working year with a large salary or bonus can push you into IRMAA, the income-related surcharge, even though your income has since dropped. Stopping work is one of the life-changing events that let you ask Social Security to use the new figure (${h.src('ssa_poms_lce', 'SSA POMS on life-changing events')}).</p>
${h.mini('irmaaDrop')}
<p>The plan count went from ${s.std26} in 2026 to ${s.std} for 2027, ${K.change(s.std, s.std26)}.</p>
`,
  faqs: [
    { q: 'Why do Phoenix and Tucson have so many more Medicare Advantage plans than rural Arizona?', a: `Insurers build HMO networks where doctors and members are concentrated. For 2027, Maricopa lists ${mar.std} open plans and Pima ${pima.std}, while ${low[0].name} County lists ${low[0].std}, according to the CMS landscape file. Outside the metro counties most choices are PPOs that let you see any doctor who accepts the plan.` },
    { q: 'What is the lowest Medicare Advantage out-of-pocket maximum in Arizona for 2027?', a: `${K.usd(s.lowMoop!.moop)} in network, for ${s.lowMoop!.n} sold by ${s.lowMoop!.o}, with a ${K.prem(s.lowMoop!.m)} premium. It is an HMO, so the cap applies to care from its own network. The state median among ${s.std} open plans is ${K.usd(s.moopMed!)}, per CMS data of September 2026.` },
    { q: 'How many chronic condition special needs plans does Arizona have in 2027?', a: `${s.csnp} C-SNPs, out of ${s.snp} special needs plans in total; the rest are ${s.dsnp} plans for people with Medicaid and ${s.isnp} for nursing-home residents. You must have one of the conditions the plan targets, confirmed by your doctor, to enroll in a C-SNP.` },
  ],
  related: ['county:arizona/maricopa', 'state:california', 'state:nevada', 'state:new-mexico', 'special-needs-plans', 'irmaa-appeal'],
});
