import { defineState } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const s = K.state('california');
const top = K.counties('california', 'std');
const low = K.counties('california', 'std', true);
const la = K.county('california', 'los-angeles');
const sd = K.county('california', 'san-diego');
const sc = K.county('california', 'santa-clara');
const twoOrLess = low.filter((c) => c.std <= low[0].std).length;

export default defineState({
  slug: 'california',
  title: `Medicare Advantage Plans California 2027: ${s.std} HMO-Led Plans`,
  description: `California Medicare Advantage 2027: ${s.std} open plans, ${s.hmo} of them HMOs, in-network caps as low as ${K.usd(s.moopMin!)} and ${s.zero} $0 plans with drugs. Every county, every plan.`,
  intro: `California runs on HMOs and medical groups, which is why a cap in the low hundreds of dollars exists here and almost nowhere else.`,
  resume: `California has ${s.std} Medicare Advantage plans open to anyone with Parts A and B for 2027, one of the longest lists in the country, and ${s.hmo} of them are HMOs against only ${s.ppo} PPOs. The in-network cap goes as low as ${K.usd(s.moopMin!)}, filed by ${s.lowMoop!.o} for ${s.lowMoop!.n} at ${K.prem(s.lowMoop!.m)} a month, and the state median is ${K.usd(s.moopMed!)}, under half the national median of ${K.usd(K.nat.moopMed)}. ${s.zero} drug-covering plans have no premium. Coverage is lopsided: Los Angeles County has ${la.std} open plans, while ${twoOrLess} counties in the north and the Sierra have ${low[0].std} each. ${s.star4} plans earn four stars or more for 2027. California also lists ${s.snp} special needs plans, ${s.dsnp} of them for people with Medi-Cal, and ${s.pdp} stand-alone drug plans whose median premium, ${K.prem(s.pdpMed!)}, is among the highest in the country.`,
  body: (h) => `
<h2>Medical groups, delegated networks and three-digit caps</h2>
<p>Many California HMOs do not contract with doctors one by one. They delegate care to medical groups and independent practice associations, which receive a set amount per member and manage referrals. When you join, you usually pick a medical group as well as a plan, and your specialists come from that group. This model lets plans file ceilings such as ${K.usd(s.moopMin!)}, but changing doctors can mean changing groups. Ask the plan which group your doctor belongs to for 2027 before you enroll.</p>
${h.mini('capVsOriginal', { moop: s.moopMin })}
<h3>SCAN, Alignment, Kaiser and the national carriers</h3>
<p>${s.orgList.map(([o, n]) => `${o} (${n})`).join(', ')} file the most open plan segments. SCAN and Alignment are California-based Medicare specialists, and Kaiser Permanente operates its own hospitals and physicians, so its plans work only inside its facilities except for emergencies and urgent care. The highest 2027 score is ${s.starMax} stars, held among others by ${s.best!.n}.</p>
<h2>Southern California against the far north</h2>
<p>Los Angeles leads with ${la.std} open plans, then ${top[1].name} with ${top[1].std}; San Diego lists ${sd.std} and Santa Clara ${sc.std}. Each has its own page: ${h.a('county:california/los-angeles', 'Los Angeles')}, ${h.a('county:california/orange', 'Orange')}, ${h.a('county:california/san-diego', 'San Diego')}, ${h.a('county:california/riverside', 'Riverside')}, ${h.a('county:california/san-bernardino', 'San Bernardino')} and ${h.a('county:california/santa-clara', 'Santa Clara')}. In the Sierra and the far north, ${low[0].name}, ${low[1].name} and ${low[2].name} counties list ${low[0].std} open plans each, so many residents there rely on Original Medicare with a Medigap policy and a drug plan.</p>
<h3>Drug plans for those who stay in Original Medicare</h3>
<p>Stand-alone Part D is expensive in California: the median premium is ${K.prem(s.pdpMed!)} against a cheapest plan at ${K.prem(s.pdpMin!)} (${s.pdpMinName}), and only ${s.pdpBench} plan is free for people with full Extra Help. The ${s.pdp} plans are listed below. The open Advantage list went from ${s.std26} plans in 2026 to ${s.std}, ${K.change(s.std, s.std26)}, so check your insurer's Annual Notice of Change. Neighbors: ${h.a('state:oregon', 'Oregon')}, ${h.a('state:nevada', 'Nevada')}, ${h.a('state:arizona', 'Arizona')}.</p>
`,
  faqs: [
    { q: 'Why are Medicare Advantage out-of-pocket caps so low in California for 2027?', a: `Most California plans are HMOs that pay medical groups a fixed amount per member, which lets them file very low ceilings. The lowest is ${K.usd(s.moopMin!)} and the state median ${K.usd(s.moopMed!)}, per the CMS landscape file of September 2026. The trade-off is a closed network: outside emergencies, care must come from your group.` },
    { q: 'Do I choose a medical group when I join a California Medicare Advantage HMO?', a: `Usually yes. Many California HMOs ask you to name a primary care doctor, which places you in that doctor's medical group, and specialists and hospitals then follow the group's contracts. Switching groups may also mean switching specialists, so confirm your doctor's group for 2027 with the plan.` },
    { q: 'How few Medicare Advantage plans do northern California counties have in 2027?', a: `${twoOrLess} California counties have ${low[0].std} open plans each for 2027, among them ${low[0].name}, ${low[1].name} and ${low[2].name}, according to CMS. Residents there often compare those plans with Original Medicare plus Medigap and a Part D plan, because local networks can be small.` },
  ],
  related: ['county:california/los-angeles', 'county:california/san-diego', 'county:california/orange', 'county:california/riverside', 'county:california/san-bernardino', 'county:california/santa-clara'],
});
