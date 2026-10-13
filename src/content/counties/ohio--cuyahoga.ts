import { defineCounty } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const c = K.county('ohio', 'cuyahoga');
const sum = K.county('ohio', 'summit');
const lor = K.county('ohio', 'lorain');

export default defineCounty({
  state: 'ohio',
  county: 'cuyahoga',
  title: `Medicare Advantage Plans Cuyahoga County 2027: ${c.std} Plans`,
  description: `Cuyahoga County, Ohio: ${c.std} Medicare Advantage plans for 2027 around Cleveland, ${c.zero} at $0 with drugs (${c.zero26} in 2026), caps from ${K.usd(c.moopMin!)}. Full list, no agent call.`,
  intro: `Cleveland's list is long but shrinking: ${c.std26 - c.std} fewer open plans than in 2026 and ${c.zero26 - c.zero} fewer $0 plans with drug coverage.`,
  resume: `Cuyahoga County, which includes Cleveland, has ${c.std} Medicare Advantage plans open to anyone with Parts A and B for 2027, against ${c.std26} in 2026, filed by ${c.orgs} insurers, one of the widest fields in Ohio. The number of $0 plans with drug coverage fell from ${c.zero26} to ${c.zero}. Caps are moderate: the lowest is ${K.usd(c.moopMin!)}, for ${c.lowMoop!.n} at ${K.prem(c.lowMoop!.m)} a month, and the median ${K.usd(c.moopMed!)}, near the national level. ${c.star4} open plans hold four stars or more, and the best-rated include ${c.best!.n}. HMOs (${c.hmo}) and PPOs (${c.ppo}) are almost even. ${c.orgList.slice(0, 4).map(([o, n]) => `${o} (${n})`).join(', ')} file the most plans. ${c.gone} plan IDs of 2026 are not filed again, among them plans from Wellcare, SummaCare, Aetna and Medical Mutual, and ${c.new} new ones appear. The county lists ${c.snp} special needs plans as well.`,
  body: (h) => `
<h2>Fewer free plans for 2027</h2>
<p>The drop from ${c.zero26} to ${c.zero} $0 plans with drugs is the change most Cleveland members will feel. Some of the departed plans were $0 HMO-POS plans; their members were either moved to another plan of the same insurer, often with a premium, or must choose a new one. Do not rely on the plan name in your notice: compare its 2027 premium and cap with the county list. A plan that kept its name can still have moved its cap up by a thousand dollars or more.</p>
${h.mini('zeroTrue')}
<h3>Local plans next to national ones</h3>
<p>SummaCare, based in Akron, files the plan with the county's lowest cap, ${c.lowMoop!.n}, and Medical Mutual of Ohio, based in Cleveland, competes with Humana, UnitedHealthcare, Devoted and Anthem. Cleveland's large hospital systems contract differently with each insurer, so the network column of your search is the provider directory, not this list.</p>
<h2>Summit and Lorain</h2>
<p>Summit County, around Akron, lists ${sum.std} open plans, and Lorain County to the west ${lor.std}. Residents who live in one county and see doctors in another join plans filed for their home county; most of the insurers above file all three. See the ${h.a('state:ohio', 'Ohio page')} for every county and ${h.a('county:ohio/franklin', 'Franklin County')} for Columbus.</p>
`,
  faqs: [
    { q: 'How many Medicare Advantage plans are there in Cuyahoga County for 2027?', a: `${c.std} plans open to anyone with Parts A and B, down from ${c.std26} in 2026, plus ${c.snp} special needs plans, according to the CMS landscape file of September 2026. ${c.zero} of the open plans include drug coverage for a $0 premium, against ${c.zero26} a year earlier.` },
    { q: 'Which Cleveland-area Medicare Advantage plan has the lowest out-of-pocket maximum in 2027?', a: `${c.lowMoop!.n}, from ${c.lowMoop!.o}, with an in-network cap of ${K.usd(c.lowMoop!.moop)} and a premium of ${K.prem(c.lowMoop!.m)} a month in Cuyahoga County. The median cap among the county's ${c.std} open plans is ${K.usd(c.moopMed!)}. Drugs and premiums are not counted in that cap.` },
    { q: 'My Cuyahoga County plan is not on the 2027 list. What should I do?', a: `Read the notice your insurer sent by September 30, 2026: it says whether you are moved to a successor plan. ${c.gone} 2026 plan IDs are not filed again in the county. If your plan simply ends, choose another before December 7 or use the special enrollment period a plan ending gives you.` },
  ],
  related: ['state:ohio', 'county:ohio/franklin', 'plans-leaving', 'zero-premium-plans'],
});
