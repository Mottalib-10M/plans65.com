import { defineCounty } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const c = K.county('pennsylvania', 'philadelphia');
const mont = K.county('pennsylvania', 'montgomery');
const del = K.county('pennsylvania', 'delaware');

export default defineCounty({
  state: 'pennsylvania',
  county: 'philadelphia',
  title: `Medicare Advantage Plans Philadelphia 2027: ${c.std} Plans Listed`,
  description: `Philadelphia County: ${c.std} Medicare Advantage plans for 2027, ${c.zero} at $0 with drugs, caps from ${K.usd(c.moopMin!)}, a five-star PPO and ${c.orgs} insurers. The full list, no agent.`,
  intro: `Philadelphia has ${c.orgs} insurers on its list, a five-star plan, and Independence Blue Cross filing more plans than any national carrier.`,
  resume: `Philadelphia County has ${c.std} Medicare Advantage plans open to anyone with Parts A and B for 2027, against ${c.std26} in 2026, filed by ${c.orgs} insurers, one of the most crowded fields in the Northeast. ${c.zero} drug-covering plans charge a $0 premium. The lowest in-network cap is ${K.usd(c.moopMin!)}, for ${c.lowMoop!.n} at ${K.prem(c.lowMoop!.m)}, and the median ${K.usd(c.moopMed!)}. The county has a five-star plan for 2027, ${c.best!.n}, at ${K.prem(c.best!.m)}, although its cap is ${K.usd(c.best!.moop)}. HMOs and PPOs are evenly split, ${c.hmo} and ${c.ppo}. ${c.orgList.slice(0, 4).map(([o, n]) => `${o} (${n})`).join(', ')} file the most plans. ${c.gone} 2026 plan IDs are not filed again, among them two Jefferson Health Plans PPOs and an Independence Personal Choice plan, and ${c.new} new ones appear. The county lists ${c.snp} special needs plans too.`,
  body: (h) => `
<h2>A five-star plan with a high cap</h2>
<p>A five-star rating opens a special enrollment period: anyone in Philadelphia can switch into ${c.best!.n} once between December 8 and November 30 of the plan year. Its cap of ${K.usd(c.best!.moop)}, though, is at the top of the scale. The rating measures quality of care and service, not cost; for someone expecting a costly year, a plan with a lower cap and four stars may cost less in the end.</p>
${h.mini('starsSep')}
<h3>Independence and the health systems</h3>
<p>Independence Health Group, the parent of Independence Blue Cross, files ${c.orgList[0][1]} open plans. Jefferson Health's own plans are among the 2026 IDs missing for 2027 in the county, which matters to patients of Jefferson hospitals: check which remaining plans include them. Penn Medicine, Temple and the other systems contract plan by plan, so two plans of the same insurer can differ on whether your hospital is in network. The provider directory of each plan settles it.</p>
<h2>Across the city line</h2>
<p>Montgomery County lists ${mont.std} open plans and Delaware County ${del.std}. A move across City Avenue or Cobbs Creek changes the county, and with it the plan list, even when your doctors stay the same. The ${h.a('state:pennsylvania', 'Pennsylvania page')} lists every county; ${h.a('county:pennsylvania/allegheny', 'Allegheny County')} covers Pittsburgh.</p>
`,
  faqs: [
    { q: 'Is there a five-star Medicare Advantage plan in Philadelphia for 2027?', a: `Yes: ${c.best!.n}, from ${c.best!.o}, carries a ${c.starMax}-star rating in the CMS 2027 Star Ratings of October 8, 2026, with a ${K.prem(c.best!.m)} premium and an in-network cap of ${K.usd(c.best!.moop)}. Its rating lets you switch into it once from December 8 to November 30.` },
    { q: 'How many Medicare Advantage plans are there in Philadelphia for 2027?', a: `${c.std} plans open to anyone with Parts A and B, against ${c.std26} in 2026, plus ${c.snp} special needs plans, according to the CMS landscape file of September 2026. ${c.zero} of the open plans include drug coverage for a $0 premium.` },
    { q: 'Are Jefferson Health Plans still available in Philadelphia for 2027?', a: 'The Jefferson Health Plans Flex Plus and Flex Pro PPOs offered in Philadelphia County in 2026 are not filed for the county in the 2027 CMS landscape file. Members should read the notice from their plan and choose a 2027 plan that includes their doctors before December 7, 2026.' },
  ],
  related: ['state:pennsylvania', 'county:pennsylvania/allegheny', 'star-ratings', 'plans-leaving'],
});
