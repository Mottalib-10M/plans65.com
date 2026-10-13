import { defineState } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const s = K.state('montana');
const top = K.counties('montana', 'std');
const low = K.counties('montana', 'std', true);
const thinN = low[0].std;
const thinList = low.filter((c) => c.std === thinN).map((c) => c.name);
const yel = K.county('montana', 'yellowstone');
const pffsNat = (K.nat.types.find(([t]) => t === 'PFFS') ?? ['PFFS', 0])[1];
const [lead, leadN] = s.orgList[0];

export default defineState({
  slug: 'montana',
  title: `Medicare Advantage Plans Montana 2027: ${s.std} Plans by County`,
  description: `Montana Medicare Advantage for 2027: ${s.std} open plans in ${s.counties} counties, ${s.pffs} private fee-for-service, ${s.zero} at $0 with drugs. Each plan and cap listed, no agent call.`,
  intro: `A short menu spread over a very large map: ${s.std} open-to-all plans for ${s.counties} counties, most of them PPOs, and a plan type that has almost vanished elsewhere.`,
  resume: `Montana residents choosing a Medicare Advantage plan for 2027 pick from ${s.std} plans open to anyone with Parts A and B, down from ${s.std26} in 2026, and the county decides most of the answer. ${top[0].name} County lists ${top[0].std} of them, while ${thinList.length} eastern and northern counties, including ${thinList.slice(0, 3).join(', ')}, have only ${thinN}. Only ${s.zero} drug-covering plans charge a $0 premium, and the in-network cap on what you pay for medical care runs from ${K.usd(s.moopMin!)} to ${K.usd(s.moopMax!)}, with a median of ${K.usd(s.moopMed!)} against ${K.usd(K.nat.moopMed)} nationally. ${s.ppo} of the open plans are PPOs and ${s.hmo} are HMOs. ${s.star4} plans rate four stars or more for 2027. ${s.snp} special needs plans serve people who also have Medicaid. For anyone staying on Original Medicare, ${s.pdp} stand-alone drug plans are listed further down, starting at ${K.cents(s.pdpMin!)} a month.`,
  body: (h) => `
<h2>One of the last places selling private fee-for-service</h2>
<p>Montana's 2027 file still carries ${s.pffs} private fee-for-service plans, out of ${pffsNat} left in the whole national landscape. The design is old and unusual. Federal rules describe it as a plan that pays providers at a rate the plan sets and that does not restrict your choice among providers who agree to accept its terms of payment (${h.ext('https://www.ecfr.gov/current/title-42/chapter-IV/subchapter-B/part-422/subpart-A/section-422.4', '42 CFR 422.4(a)(3)')}). In practice that means no fixed network map: the question before each appointment is whether that clinic accepts the plan. In a state where the nearest specialist may sit two hours away, that flexibility is the reason the type survives here.</p>
<h2>From the Flathead Valley to the Hi-Line</h2>
<p>The fuller menus sit along the western valleys and the I-15 corridor: ${top.slice(0, 3).map((c) => `${c.name} (${c.std})`).join(', ')}. Move toward the North Dakota line and the count collapses to ${thinN} plans per county, with no $0 option and a lowest cap of ${K.usd(low[0].moopMin!)}. Two plans is still a real choice, but it is a choice between two national PPOs, and the county table on this page shows exactly which ones.</p>
<h3>A market led by one insurer</h3>
<p>${lead} files ${leadN} of the ${s.std} open plans. ${s.orgList.slice(1).map(([o, n]) => `${o} has ${n}`).join(', ')}. With ${s.orgs} parent companies in the state, a single carrier's network contract with a hospital system can decide whether a plan works for an entire town.</p>
<h3>Fewer plans than last year</h3>
<p>The state lost ${s.std26 - s.std} open plans between the 2026 and 2027 files. Billings felt it most: ${yel.gone} plan IDs offered in Yellowstone County in 2026 were not filed again. Members of a plan that ends receive a notice from the insurer and a special window to choose again (${h.src('cfr_422_62', '42 CFR 422.62')}).</p>
${h.mini('capVsOriginal', { moop: s.moopMax })}
<p>The calculator above uses the highest cap filed in Montana. With Original Medicare alone there is no yearly ceiling on the 20% coinsurance, which is why the cap matters more than the premium in a year with a hospital stay.</p>
`,
  faqs: [
    { q: 'Which Montana counties have the most Medicare Advantage plans for 2027?', a: `${top.slice(0, 3).map((c) => `${c.name} (${c.std} plans)`).join(', ')} lead the state in the CMS landscape file of September 2026. The eastern plains counties such as ${thinList[0]} and ${thinList[1]} have ${thinN} each. Plans are approved county by county, so a plan sold in Great Falls may not be available two counties away.` },
    { q: 'What is a private fee-for-service plan in Montana, and can a doctor refuse it?', a: `Montana has ${s.pffs} of these plans for 2027. The plan pays providers at its own rates and does not limit you to a network, but each provider decides whether to accept the plan's payment terms. Call the office before each visit and ask whether it accepts the plan's terms, since that answer can differ from one clinic to the next.` },
    { q: 'Why did my Montana Medicare Advantage plan disappear for 2027?', a: `Insurers withdrew ${s.std26 - s.std} open plans statewide between 2026 and 2027. If yours is one of them, the insurer must notify you, and you get a special enrollment period to pick another plan or return to Original Medicare. The yearly window from ${K.day(K.P.periods.aep.start)} to ${K.day(K.P.periods.aep.end)} also applies.` },
  ],
  related: ['state:wyoming', 'state:north-dakota', 'state:idaho', 'hmo-vs-ppo', 'plans-leaving'],
  extraSources: [{ name: '42 CFR 422.4, Types of MA plans', url: 'https://www.ecfr.gov/current/title-42/chapter-IV/subchapter-B/part-422/subpart-A/section-422.4' }],
});
