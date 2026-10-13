import { defineCounty } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const c = K.county('pennsylvania', 'allegheny');
const wm = K.county('pennsylvania', 'westmoreland');
const bt = K.county('pennsylvania', 'butler');

export default defineCounty({
  state: 'pennsylvania',
  county: 'allegheny',
  title: `Medicare Advantage Plans Allegheny 2027: Pittsburgh's ${c.std}`,
  description: `Allegheny County, Pennsylvania: ${c.std} Medicare Advantage plans for 2027 around Pittsburgh, ${c.zero} at $0 with drugs, ${c.star4} rated four stars or more, caps from ${K.usd(c.moopMin!)}.`,
  intro: `Pittsburgh's market is a duel between Highmark and UPMC, both insurer and hospital system, with the national carriers around them.`,
  resume: `Allegheny County, which includes Pittsburgh, has ${c.std} Medicare Advantage plans open to anyone with Parts A and B for 2027, against ${c.std26} in 2026, one of the steadiest lists among large counties: only ${c.gone} plan IDs are not filed again and ${c.new} are new. ${c.zero} drug-covering plans charge a $0 premium, as many as last year. The lowest in-network cap is ${K.usd(c.moopMin!)}, for ${c.lowMoop!.n}, and the median ${K.usd(c.moopMed!)}. Quality is high: ${c.star4} of the ${c.std} open plans carry four stars or more, led by ${c.best!.n} at ${c.starMax} stars. PPOs edge out HMOs, ${c.ppo} to ${c.hmo}. ${c.orgList.slice(0, 4).map(([o, n]) => `${o} (${n})`).join(', ')} file the most plans. The county lists ${c.snp} special needs plans, ${c.dsnp} of them for people with Medicaid.`,
  body: (h) => `
<h2>Highmark or UPMC</h2>
<p>Highmark Health and UPMC each run hospitals and sell health plans in western Pennsylvania, and the two have long contracted with each other only in limited ways. For a Medicare beneficiary, the practical rule is simple: a plan from one of them, or a plan whose network leans on one of them, may restrict access to the other's hospitals and doctors. The national carriers on the list contract with both systems to varying degrees. Look up your specialists and your preferred hospital in each plan's 2027 directory before choosing.</p>
${h.mini('capVsOriginal', { moop: c.moopMed })}
<h3>The few plans that left</h3>
<p>Among the ${c.gone} missing IDs are two Wellcare HMO-POS plans, an Aetna Enhanced PPO, a UPMC for Life PPO and a Humana private fee-for-service plan. Members were notified by September 30 and choose by December 7. With so few departures, most Pittsburgh members simply stay in their plan; the review that matters is the new premium, cap and network of that same plan.</p>
<h2>Westmoreland and Butler</h2>
<p>Westmoreland County lists ${wm.std} open plans and Butler County ${bt.std}, with mostly the same insurers, and the Highmark and UPMC question applies there as well. The ${h.a('state:pennsylvania', 'Pennsylvania page')} lists every county, and ${h.a('county:pennsylvania/philadelphia', 'Philadelphia County')} has the other large list in the state.</p>
`,
  faqs: [
    { q: 'Do Allegheny County Medicare Advantage plans cover both UPMC and Highmark hospitals?', a: 'Not all of them. Highmark and UPMC each sell their own plans, and networks are built plan by plan, so some 2027 plans restrict access to one system’s hospitals or doctors. Check the provider directory of each plan for your specialists and hospital before enrolling, and again each fall.' },
    { q: 'How many Medicare Advantage plans are there in Pittsburgh for 2027?', a: `Allegheny County has ${c.std} plans open to anyone with Parts A and B for 2027, against ${c.std26} in 2026, plus ${c.snp} special needs plans, according to the CMS landscape file of September 2026. ${c.zero} open plans include drug coverage for a $0 premium.` },
    { q: 'What is the best-rated Medicare Advantage plan in Allegheny County for 2027?', a: `${c.best!.n}, from ${c.best!.o}, is among the plans rated ${c.starMax} stars in the CMS 2027 Star Ratings, with a ${K.prem(c.best!.m)} premium and an in-network cap of ${K.usd(c.best!.moop)}. ${c.star4} of the county's ${c.std} open plans carry four stars or more.` },
  ],
  related: ['state:pennsylvania', 'county:pennsylvania/philadelphia', 'compare-plans', 'star-ratings'],
});
