import { defineCounty } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const c = K.county('california', 'santa-clara');
const sm = K.county('california', 'san-mateo');
const al = K.county('california', 'alameda');
const scz = K.county('california', 'santa-cruz');
const la = K.county('california', 'los-angeles');
const b26 = K.P.partB['2026'];

export default defineCounty({
  state: 'california',
  county: 'santa-clara',
  title: `Medicare Advantage Plans Santa Clara 2027: Only ${c.zero} at $0`,
  description: `Santa Clara County has ${c.std} open Medicare Advantage plans for 2027 and just ${c.zero} with drugs at a $0 premium, down from ${c.zero26}. Caps from ${K.usd(c.moopMin!)}. Every plan listed.`,
  intro: `Silicon Valley has a short Medicare Advantage menu: ${c.std} open plans, a single PPO, and no plan from the two largest national insurers.`,
  resume: `Santa Clara County is one of the thinnest large-county markets in California for 2027: ${c.std} Medicare Advantage plans are open to anyone with Parts A and B, against ${c.std26} in 2026, and only ${c.zero} of the drug-covering plans charge no premium, down from ${c.zero26}. ${c.gone} plan IDs from 2026 were not filed again, among them the Anthem Medicare Advantage and Anthem Prime plans, an AARP plan from UnitedHealthcare and two Aetna PPOs; ${c.new} are new. Neither UnitedHealthcare nor Humana offers an open plan in the county this year. What remains is mostly HMOs (${c.hmo}) from ${c.orgs} insurers, with a single PPO. The lowest in-network cap is ${K.usd(c.moopMin!)}, through ${c.lowMoop!.n}, while the median is ${K.usd(c.moopMed!)} and the most expensive plan costs ${K.usd(c.premMax!)} a month. ${c.star4} plans hold four stars or more; ${c.best!.n} reaches ${c.starMax}.`,
  body: (h) => `
<h2>A market without the national giants</h2>
<p>Most large counties have a long list of UnitedHealthcare and Humana plans. Santa Clara has none for 2027. ${c.orgList.map(([o, n]) => `${o} files ${n}`).join(', ')}. Kaiser Permanente's Basic Santa Clara plan carries the top rating, with a cap of ${K.usd(c.best!.moop!)}. Astiva Health sells two NorCal plans, and Imperial Health Plan has the cheapest cap. For a retiree whose doctors belong to Stanford, Sutter or the county's own hospitals, the question is not which plan is cheapest but which one contracts with that group in 2027.</p>
<h3>Neighbors on the Peninsula and across the Bay</h3>
<p>San Mateo County lists ${sm.std} open plans, Alameda ${al.std} and Santa Cruz ${scz.std}. Los Angeles, by comparison, has ${la.std}. None of the three neighbors offers a longer menu than Santa Clara's, so crossing a county line in the Bay Area rarely adds options.</p>
<h2>Original Medicare as the other route</h2>
<p>With so few $0 plans and a single PPO, many Santa Clara residents compare Advantage with Original Medicare plus a Medigap policy and a drug plan. Under Original Medicare, Part B costs ${K.cents(b26.premium)} a month in 2026, then the ${K.usd(b26.deductible)} deductible and ${K.pct(b26.coinsurance, 0)} of approved care with no yearly limit, which is what a Medigap policy is bought to cover.</p>
${h.mini('partBYear')}
<p>The exits at the bottom of this page show where 2026 members came from. Anyone in a closed plan has until December 7 to choose, and a special enrollment period afterward if they miss it.</p>
`,
  faqs: [
    { q: 'Why are there so few Medicare Advantage plans in Santa Clara County for 2027?', a: `The CMS landscape file of September 2026 lists ${c.std} open plans, down from ${c.std26}, because ${c.gone} plan IDs were not renewed, including Anthem and some Aetna and UnitedHealthcare plans. Insurers decide county by county where to file. ${c.orgs} insurers remain, led by ${c.topOrg}, and Kaiser Permanente holds the best rating.` },
    { q: 'Does UnitedHealthcare offer a Medicare Advantage plan in Santa Clara County in 2027?', a: `Not among plans open to all: the 2027 CMS landscape file has no UnitedHealthcare or Humana plan for open enrollment in Santa Clara County, after the AARP plan CA-10 was not renewed. Special needs plans are counted separately (${c.snp} in the county). Members of the closed AARP plan can pick another plan until December 7, 2026.` },
    { q: 'How many PPO Medicare Advantage plans are in Santa Clara County for 2027?', a: `One. ${c.hmo} of the ${c.std} open plans are HMOs, which cover non-emergency care only in their network. Aetna's Eagle and Enhanced PPOs from 2026 are among the plans not filed for 2027. A resident who wants freedom to see any doctor who accepts Medicare can also look at Original Medicare with a Medigap policy.` },
  ],
  related: ['state:california', 'county:california/los-angeles', 'medigap', 'plans-leaving'],
});
