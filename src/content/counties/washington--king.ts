import { defineCounty } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const c = K.county('washington', 'king');
const sn = K.county('washington', 'snohomish');
const pc = K.county('washington', 'pierce');
const kt = K.county('washington', 'kitsap');
const b26 = K.P.partB['2026'], b27 = K.P.partB['2027'];

export default defineCounty({
  state: 'washington',
  county: 'king',
  title: `Medicare Advantage Plans King County 2027: Premium vs Cap`,
  description: `King County (Seattle) 2027: ${c.std} open Medicare Advantage plans, premiums up to ${K.usd(c.premMax!)} a month, the lowest cap ${K.usd(c.moopMin!)}, only ${c.zero} at $0 with drugs. All plans.`,
  intro: `In Seattle's county the plan with the lowest out-of-pocket cap is also the one with the highest premium, which makes the trade-off unusually plain.`,
  resume: `King County puts the premium-for-protection trade in plain view for 2027. Its lowest in-network out-of-pocket cap, ${K.usd(c.moopMin!)}, belongs to ${c.lowMoop!.n}, which charges ${K.usd(c.lowMoop!.m)} a month, the highest premium among the county's ${c.std} Medicare Advantage plans open to anyone with Parts A and B. At the other end, ${c.zero} drug-covering plans have no premium, but none of them pairs that with a low cap: the median cap is ${K.usd(c.moopMed!)}, above the national median of ${K.usd(K.nat.moopMed)}. ${c.star4} open plans hold four stars or more for 2027, and the best rating is ${c.starMax}. The menu shrank from ${c.std26} plans to ${c.std}, with ${c.gone} IDs gone, many of them AARP plans from UnitedHealthcare, and ${c.new} new, several from Devoted Health. Special needs plans number ${c.snp}, mostly for people who also have Apple Health (Medicaid): ${c.dsnp}.`,
  body: (h) => `
<h2>Paying up front or paying when sick</h2>
<p>Over a year, a plan's real price is its premium times twelve plus whatever you spend until the cap. A healthy member pays mostly premiums, so a $0 plan wins. A member who is hospitalized, or treated for cancer, pays up to the cap, and a plan with a premium of ${K.usd(c.premMax!)} and a cap of ${K.usd(c.moopMin!)} can come out ahead. Nobody knows in advance which year they will have; the decision depends on how much risk you can carry. Remember that the Part B premium is paid on top of any plan premium.</p>
${h.mini('partB2027')}
<h3>Kaiser, Regence and the national insurers</h3>
<p>${c.orgList.map(([o, n]) => `${o} (${n})`).join(', ')}. Kaiser Permanente's Washington plans run from the $0 Key King plan to Optimal; Regence BlueAdvantage and MedAdvantage sit near the top of the county's premium range. Humana leads the count and sells its USAA Honor giveback PPOs here too.</p>
<h2>Plans that ended for 2026 members</h2>
<p>A string of AARP Medicare Advantage plans from UnitedHealthcare, Wellcare Giveback and Simple, Regence MedAdvantage + Rx Primary and several Humana plans are not in the 2027 file for King County. Former members who do not choose by December 7 fall back to Original Medicare.</p>
<h3>Snohomish, Pierce, Kitsap</h3>
<p>Snohomish County lists ${sn.std} open plans, Pierce ${pc.std} and Kitsap ${kt.std}. In 2026 Part B cost ${K.cents(b26.premium)} a month; the Trustees project ${K.cents(b27.premium)} for 2027, a figure CMS confirms each fall.</p>
`,
  faqs: [
    { q: 'Which King County Medicare Advantage plan has the lowest out-of-pocket cap in 2027?', a: `${c.lowMoop!.n}, with an in-network cap of ${K.usd(c.moopMin!)} and a premium of ${K.usd(c.lowMoop!.m)} a month, according to the CMS landscape file of September 2026. It is a Kaiser Permanente HMO, so care is given in Kaiser's network. The median cap among King County's ${c.std} open plans is ${K.usd(c.moopMed!)}.` },
    { q: 'How many $0 premium Medicare Advantage plans are there in King County, Washington for 2027?', a: `${c.zero} plans with drug coverage and no monthly premium, out of ${c.std} open plans, down from ${c.zero26} in 2026. Their in-network caps are mid-range or high, so a $0 plan can cost several thousand dollars in a year with heavy care. You still pay the Part B premium to Social Security.` },
    { q: 'Are AARP UnitedHealthcare Medicare Advantage plans leaving King County for 2027?', a: `Several are: the CMS 2027 landscape file drops a group of AARP Medicare Advantage plans offered in King County in 2026. UnitedHealthcare still files ${c.orgList.find(([o]) => o.startsWith('UnitedHealth'))?.[1] ?? 0} open plans in the county. Your notice says whether you were moved to one of them; you can choose any other plan until December 7, 2026.` },
  ],
  related: ['state:washington', 'annual-cost-calculator', 'plans-leaving', 'part-b-premium'],
});
