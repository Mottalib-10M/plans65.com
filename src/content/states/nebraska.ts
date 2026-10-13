import { defineState } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const s = K.state('nebraska');
const top = K.counties('nebraska', 'std');
const none = top.filter((c) => c.std === 0).map((c) => c.name);
const sparse = K.counties('nebraska', 'std', true).filter((c) => c.std > 0);
const cost = s.std - s.hmo - s.ppo - s.pffs;
const doug = K.county('nebraska', 'douglas');
const CFR417 = 'https://www.ecfr.gov/current/title-42/chapter-IV/subchapter-B/part-417/subpart-K';

export default defineState({
  slug: 'nebraska',
  title: `Medicare Advantage Plans Nebraska 2027: Costs, Cost Plans`,
  description: `Nebraska Medicare Advantage 2027: ${s.std} open plans, ${cost} Medicare cost plans, ${s.zero} at $0 with drugs and caps from ${K.usd(s.moopMin!)}. All ${s.counties} counties listed, no agent call.`,
  intro: `Omaha and Lincoln get two dozen plans each, the Sandhills get a handful, and a small set of Medicare cost plans sits beside the usual HMOs and PPOs.`,
  resume: `For 2027, Nebraska has ${s.std} Medicare Advantage plans open to anyone with Parts A and B, and how many you can actually pick from depends on whether you live near the Missouri River or out west. ${top[0].name}, ${top[1].name}, ${top[2].name} and ${top[3].name} counties carry between ${top[3].std} and ${top[0].std} plans each; ${none.join(' and ')} County has no open plan at all, and several Panhandle and Sandhills counties have ${sparse[0].std} to ${sparse[4].std}. ${s.zero} drug-covering plans charge no premium. The lowest in-network out-of-pocket cap filed is ${K.usd(s.moopMin!)}, the median ${K.usd(s.moopMed!)}. Nebraska is also one of the few states where Medicare cost plans are still sold: ${cost} of the ${s.std} open plans are of that type. ${s.snp} special needs plans and ${s.pdp} stand-alone drug plans complete the list below.`,
  body: (h) => `
<h2>Cost plans: the option most Nebraskans have never heard of</h2>
<p>A Medicare cost plan is not a Medicare Advantage plan in the usual sense, and the difference is the network. Federal rules require a cost plan to tell members that they may receive services through any Medicare provider and supplier (${h.ext(CFR417, '42 CFR 417.436')}), so going outside the plan's own doctors does not leave you without coverage. Cost plans must also hold an open enrollment of at least 30 consecutive days each year (42 CFR 417.426), and they accept people who have Part B only (42 CFR 417.422). In Nebraska the ${cost} cost plans in the 2027 file are Medica's Prime Solution line. Some come without drug coverage, which means pairing them with a stand-alone Part D plan or other creditable coverage.</p>
${h.mini('penaltyD')}
<p>That pairing matters because going without drug coverage for ${K.P.periods.partDGapDays} days or more after your first chance to enroll adds a permanent penalty to any later Part D premium, as the calculator shows.</p>
<h2>Douglas County to Cherry County</h2>
<p>Douglas County, which holds Omaha, lists ${doug.std} open plans with ${doug.zero} at $0 and caps starting at ${K.usd(doug.moopMin!)}. The plan count falls steadily as you cross the state. ${none.join(', ')} has no open-to-all plan for 2027, so most residents there rely on Original Medicare, adding a Medigap policy and a drug plan if they want them. No cost plan is filed there either, and the few special needs plans take only people who also have Medicaid. Check the county table before assuming a plan you saw advertised in Omaha is sold in Valentine.</p>
<h3>Who writes the plans</h3>
<p>${s.orgList.map(([o, n]) => `${o} (${n})`).join(', ')} file the open plans counted here. The state's own Blue Cross plan sits alongside the national carriers, and ${s.hmo} of the plans are HMOs against ${s.ppo} PPOs. The total moved from ${s.std26} in 2026 to ${s.std}, ${K.change(s.std, s.std26)}.</p>
`,
  faqs: [
    { q: 'Can I keep my own doctors with a Medicare cost plan in Nebraska?', a: `A cost plan must tell members they may use any provider that takes Medicare, and Nebraska has ${cost} such plans for 2027, all from Medica. What you owe outside the plan's own list is set out in its Evidence of Coverage, so read that section before relying on a provider the plan does not contract with.` },
    { q: 'Why is there no Medicare Advantage plan in Cherry County, Nebraska?', a: `Insurers decide county by county where to file, and none filed an open-to-all plan for ${none.join(' and ')} County in the CMS file for 2027. Residents keep Original Medicare and can add a Medigap policy and a stand-alone drug plan; ${s.pdp} drug plans are sold statewide. The only plans filed there are ${K.county('nebraska', 'cherry').dsnp} special needs plans for people who also have Medicaid.` },
    { q: 'How many $0 premium Medicare Advantage plans are there in Nebraska for 2027?', a: `${s.zero} plans that include Part D drug coverage charge no monthly premium in Nebraska for 2027, mostly in the Omaha and Lincoln areas. A $0 premium does not remove the Part B premium of ${K.cents(K.P.partB['2026'].premium)} a month in 2026, nor copays up to the plan's cap, which starts at ${K.usd(s.moopMin!)} in the state.` },
  ],
  related: ['state:iowa', 'state:kansas', 'state:south-dakota', 'part-d-plans', 'late-enrollment-penalty'],
  extraSources: [{ name: '42 CFR Part 417, Subpart K, Enrollment, entitlement and disenrollment (cost plans)', url: 'https://www.ecfr.gov/current/title-42/chapter-IV/subchapter-B/part-417/subpart-K' }],
});
