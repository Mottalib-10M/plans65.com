import { defineCounty } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const c = K.county('florida', 'broward');
const md = K.county('florida', 'miami-dade');
const pb = K.county('florida', 'palm-beach');
const d27 = K.P.partD['2027'];

export default defineCounty({
  state: 'florida',
  county: 'broward',
  title: `Medicare Advantage Plans Broward County 2027: Humana Files ${c.topOrgN}`,
  description: `Broward County 2027: ${c.std} open Medicare Advantage plans, ${c.topOrgN} of them from Humana and CarePlus, caps from ${K.usd(c.moopMin!)}, and ${c.dsnp} plans for people with Medicaid. All listed.`,
  intro: `Fort Lauderdale's market is shaped by one parent company, Humana, which files ${c.topOrgN} of the ${c.std} open plans under its own name and its CarePlus brand.`,
  resume: `In Broward County, Humana Inc. files ${c.topOrgN} of the ${c.std} Medicare Advantage plans open to anyone with Parts A and B for 2027, counting the plans sold under its CarePlus brand. That share shapes the whole menu: Humana Gold Plus HMOs, CarePlus plans and a long series of Part B giveback plans sit next to smaller lines from Devoted Health, Florida Blue, UnitedHealthcare, HealthSun and Optimum. ${c.zero} drug-covering plans charge no premium, and the lowest in-network cap is ${K.usd(c.moopMin!)}, with ${c.lowMoop!.n}; the median is ${K.usd(c.moopMed!)}. ${c.star4} plans hold four stars or more for 2027, with ${c.best!.n} at ${c.starMax}. Special needs plans outnumber the open ones, ${c.snp} against ${c.std}, and ${c.dsnp} of them serve people who have Medicare and Medicaid together. The open list went from ${c.std26} plans in 2026 to ${c.std}, with ${c.gone} IDs ending and ${c.new} starting.`,
  body: (h) => `
<h2>Humana and CarePlus: same parent, different networks</h2>
<p>CarePlus Health Plans belongs to Humana, but its plans are filed under their own contracts and use their own clinic networks. Two plans from the same parent can therefore have different caps, star ratings and doctors. ${c.lowMoop!.n}, a CarePlus plan, has the county's lowest cap; ${c.best!.n}, from HealthSun, has the best rating with a cap of ${K.usd(c.best!.moop!)}. Compare plans on their own terms, not on the logo.</p>
<h3>Giveback plans in Broward</h3>
<p>A giveback plan pays part of your Part B premium, and Social Security lowers the amount it deducts from your check. Broward has many of them, from Humana, CarePlus and others. The reduction is real money, but these plans often have higher caps or narrower extras; weigh the yearly saving against the cap.</p>
<h2>Extra Help for dual-eligible members</h2>
<p>With ${c.dsnp} plans for people who also have Medicaid, Broward residents with low income should first check whether they qualify for Extra Help, the federal subsidy for drug costs. In 2027 it limits copays to ${K.cents(d27.lisCopayGeneric)} for a generic and ${K.cents(d27.lisCopayOther)} for a brand drug, or less for full Medicaid members.</p>
${h.mini('snpDual')}
<h3>Between Miami-Dade and Palm Beach</h3>
<p>Miami-Dade, to the south, lists ${md.std} open plans and the lowest cap in the region, ${K.usd(md.moopMin!)}. Palm Beach, to the north, has ${pb.std} plans and the same ${K.usd(pb.moopMin!)} floor as Broward. DrSelect, DrElite-SFL, Simply More and the Simply Platinum plans are among the Broward IDs not filed again.</p>
`,
  faqs: [
    { q: 'Is CarePlus part of Humana in Broward County?', a: `Yes. CarePlus Health Plans is owned by Humana Inc., and together they file ${c.topOrgN} of the ${c.std} open Medicare Advantage plans in Broward County for 2027, according to CMS landscape data. CarePlus plans have their own contracts, networks and star ratings, so a CarePlus and a Humana plan can differ a lot in cost and doctors.` },
    { q: 'What is the lowest out-of-pocket cap for a Broward County Medicare Advantage plan in 2027?', a: `${K.usd(c.moopMin!)} in network, with ${c.lowMoop!.n} from ${c.lowMoop!.o}, which charges ${K.usd(c.lowMoop!.m)} a month, according to the CMS landscape file of September 2026. The median cap among Broward's ${c.std} open plans is ${K.usd(c.moopMed!)}. Premiums and prescription drugs are outside that limit.` },
    { q: 'How many Broward County Medicare Advantage plans are for people with Medicaid in 2027?', a: `${c.dsnp} dual-eligible special needs plans, out of ${c.snp} special needs plans in the county, based on CMS data of September 2026. They are open only to people with both Medicare and Florida Medicaid. Many charge no premium and little or no cost sharing, and they coordinate benefits from both programs in one plan.` },
  ],
  related: ['state:florida', 'county:florida/miami-dade', 'county:florida/palm-beach', 'special-needs-plans', 'zero-premium-plans'],
});
