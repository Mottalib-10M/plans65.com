import { defineCounty } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const c = K.county('texas', 'dallas');
const ta = K.county('texas', 'tarrant');
const co = K.county('texas', 'collin');
const de = K.county('texas', 'denton');
const d26 = K.P.partD['2026'], d27 = K.P.partD['2027'];

export default defineCounty({
  state: 'texas',
  county: 'dallas',
  title: `Medicare Advantage Plans Dallas County 2027: Humana Has ${c.topOrgN}`,
  description: `Dallas County has ${c.std} open Medicare Advantage plans for 2027 and Humana files ${c.topOrgN} of them; no Blue Cross plan is left open to all. ${c.zero} at $0 with drugs, all listed.`,
  intro: `One insurer files ${c.topOrgN} of the ${c.std} open plans in Dallas County for 2027, and the Blue Cross Medicare Advantage line is gone from the open list.`,
  resume: `Dallas County's Medicare Advantage market for 2027 leans on one name: ${c.topOrg} files ${c.topOrgN} of the ${c.std} plans open to anyone with Parts A and B, more than the next three insurers together. UnitedHealthcare, Aetna, HealthSpring and Baylor Scott & White Health Plan follow, and no Blue Cross Medicare Advantage plan is open to all residents any more: eleven Blue Cross HMOs and PPOs from 2026 are among the ${c.gone} IDs not filed again. The open-plan count fell from ${c.std26} to ${c.std}, and plans with drugs at a $0 premium from ${c.zero26} to ${c.zero}. In-network caps start at ${K.usd(c.moopMin!)} with ${c.lowMoop!.n} and reach ${K.usd(c.moopMax!)}; the median, ${K.usd(c.moopMed!)}, is above the national median of ${K.usd(K.nat.moopMed)}. ${c.star4} plans have four stars or more for 2027, ${c.best!.n} among them at ${c.starMax}. The county also lists ${c.snp} special needs plans, ${c.dsnp} for people with Medicaid.`,
  body: (h) => `
<h2>One insurer, many versions</h2>
<p>Humana's ${c.topOrgN} Dallas plans are not ${c.topOrgN} different networks. They are variants of a few products, Gold Plus HMOs, HumanaChoice PPOs, USAA Honor plans aimed at veterans and Part B giveback plans, each with its own premium, cap and extra benefits. When you compare, pair a Humana plan with its closest rival from another insurer rather than reading all of Humana's in a row. ${c.best!.n}, rated ${c.best!.star} stars, has a ${K.usd(c.best!.moop!)} cap; ${c.cheapHigh!.n} pairs a $0 premium with a ${c.cheapHigh!.star}-star rating.</p>
<h3>The Baylor Scott & White option</h3>
<p>Baylor Scott & White Health Plan sells ${c.orgList.find(([o]) => o.startsWith('Baylor'))?.[1] ?? 0} open plans here, built around its own hospitals and clinics. BSW SeniorCare Advantage Essentials is not renewed for 2027. For patients already treated in that system, a health-system plan keeps records and referrals in one place; for others, its network may be narrower than a national HMO's.</p>
<h2>Drug costs move in 2027 too</h2>
<p>Whatever plan you pick, the Part D rules change on January 1: the maximum drug deductible goes from ${K.usd(d26.deductible)} to ${K.usd(d27.deductible)}, and the yearly cap on what you pay for covered drugs from ${K.usd(d26.oopCap)} to ${K.usd(d27.oopCap)}.</p>
${h.mini('drug2026')}
<h3>Across the Metroplex</h3>
<p>Tarrant County lists ${ta.std} open plans, Collin ${co.std} and Denton ${de.std}. The insurers are nearly the same; premiums and caps can differ by county even for plans with identical names.</p>
`,
  faqs: [
    { q: 'Is Blue Cross Blue Shield of Texas offering Medicare Advantage in Dallas County for 2027?', a: `Not among plans open to all residents. The CMS 2027 landscape file drops the Blue Cross Medicare Advantage HMOs and PPOs that Dallas County had in 2026, including Choice Premier, Optimum, Classic and Value. Health Care Service Corporation, the parent company, still files plans in the county under the HealthSpring name. Former members can switch until December 7, 2026.` },
    { q: 'How many Humana Medicare Advantage plans are there in Dallas County in 2027?', a: `${c.topOrgN} of the ${c.std} plans open to anyone with Parts A and B, according to the CMS landscape file of September 2026. They include HMOs, PPOs, veteran-oriented USAA Honor plans and Part B giveback plans. Ratings and caps differ between them, so the Humana name alone tells you little about a given plan.` },
    { q: 'What is the median out-of-pocket maximum for Dallas County Medicare Advantage plans in 2027?', a: `${K.usd(c.moopMed!)} in network across the county's open plans, higher than the national median of ${K.usd(K.nat.moopMed)}. The range runs from ${K.usd(c.moopMin!)} to ${K.usd(c.moopMax!)}. A lower cap protects you in a year with a hospital stay or cancer treatment; it does not include drug costs or the premium.` },
  ],
  related: ['state:texas', 'county:texas/tarrant', 'county:texas/harris', 'part-d-deductible', 'compare-plans'],
});
