import { defineCounty } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const c = K.county('california', 'san-diego');
const rv = K.county('california', 'riverside');
const im = K.county('california', 'imperial');
const ca = K.state('california');

export default defineCounty({
  state: 'california',
  county: 'san-diego',
  title: `Medicare Advantage Plans San Diego 2027: ${c.gone} Plans Gone`,
  description: `San Diego County lost ${c.gone} Medicare Advantage plan IDs for 2027 and keeps ${c.std} open to all, ${c.zero} at $0 with drugs, caps from ${K.usd(c.moopMin!)}. Full list, no call.`,
  intro: `More plans left San Diego for 2027 than any other large California county, including the whole Sharp Direct Advantage line.`,
  resume: `San Diego County shrank more than its neighbors for 2027: the open-to-all menu went from ${c.std26} Medicare Advantage plans in 2026 to ${c.std}, and ${c.gone} plan IDs from last year were not filed again, against ${c.new} new ones. The plans that remain still look strong on price. ${c.zero} of the drug-covering plans charge no premium (there were ${c.zero26} a year ago), the lowest in-network out-of-pocket cap is ${K.usd(c.moopMin!)} with ${c.lowMoop!.n}, and the median cap is ${K.usd(c.moopMed!)}, well under the national median of ${K.usd(K.nat.moopMed)}. ${c.star4} plans carry a 2027 rating of four stars or more; ${c.best!.n} reaches ${c.starMax}. Almost everything is an HMO (${c.hmo} plans, against ${c.ppo} PPOs), and ${c.snp} special needs plans sit alongside. If your 2026 plan is in the exit list at the bottom of this page, you have until December 7 to pick its replacement.`,
  body: (h) => `
<h2>The Sharp plans and the PPOs that did not come back</h2>
<p>The four Sharp Direct Advantage plans (Gold, Platinum, VIP and VIP Plus) are absent from the 2027 file, and Sharp no longer appears among the county's open-plan insurers. Several Aetna Medicare PPOs, two Alignment Health PPOs, Molina Medicare Choice Care and three Central Health plans are gone as well. When a plan closes, members who do nothing are not left uninsured: they fall back to Original Medicare on January 1, usually without drug coverage, and get a special enrollment period to join another plan. Choosing during the annual window is the cleaner route, because the new card works on day one.</p>
${h.mini('starsSep')}
<h3>Who is still filing</h3>
<p>${c.orgList.map(([o, n]) => `${o}: ${n}`).join('; ')}. Kaiser Permanente keeps its San Diego Value plan, the top-rated choice here, and Blue Shield, SCAN and Clever Care keep caps at the low end. Sorting the list by cap and then checking that your medical group is in the plan's 2027 directory is quicker than reading benefit summaries one by one.</p>
<h2>Crossing county lines</h2>
<p>Riverside County, inland, lists ${rv.std} open plans with a median cap of ${K.usd(rv.moopMed!)}. Imperial County, to the east, has ${im.std}. Plans are sold by county of residence, so a move from Oceanside to Temecula changes your options and opens a special enrollment period. Statewide, California has ${ca.std} open plans for 2027.</p>
`,
  faqs: [
    { q: 'What happens to Sharp Direct Advantage members in San Diego for 2027?', a: `The four Sharp Direct Advantage plans are not in the CMS 2027 landscape file for San Diego County. Members should have received a notice in the fall of 2026. They can pick one of the ${c.std} open plans by December 7; if they do nothing, they return to Original Medicare on January 1 and get a special enrollment period to choose a plan.` },
    { q: 'How many $0 premium Medicare Advantage plans with drug coverage are there in San Diego County for 2027?', a: `${c.zero}, down from ${c.zero26} in 2026, according to CMS landscape data of September 2026. A $0 plan still leaves you paying the Part B premium, and copays up to the plan's cap, which starts at ${K.usd(c.moopMin!)} in the county. Sort the list above by premium to see them together.` },
    { q: 'Is there a five-star Medicare Advantage plan in San Diego County for 2027?', a: `The highest 2027 rating among the county's open plans is ${c.starMax} stars, held by ${c.best!.n}, based on the Star Ratings that CMS published on October 8, 2026. ${c.star4} plans reach four stars or more. Ratings are set per contract, so several plans from one insurer share the same score.` },
  ],
  related: ['state:california', 'county:california/riverside', 'county:california/orange', 'plans-leaving', 'enrollment-periods'],
});
