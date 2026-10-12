import { defineState } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const s = K.state('florida');
const md = K.county('florida', 'miami-dade');
const big = K.counties('florida', 'std');
const thin = K.counties('florida', 'std', true)[0];

export default defineState({
  slug: 'florida',
  title: `Medicare Advantage Plans Florida 2027: ${s.std} Plans, Costs`,
  description: `Medicare Advantage plans in Florida for 2027: ${s.std} plans open to all, ${s.zero} at $0 with drugs, caps from ${K.usd(s.moopMin!)}. Every county and every plan listed, no agent call.`,
  intro: `${s.std} open-to-all plans across ${s.counties} counties, ${s.snp} special needs plans, and the deepest field of $0 plans with low caps in the country, concentrated in the southeast.`,
  resume: `Florida is the state where Medicare Advantage is most crowded at the bottom of the price scale: for 2027, insurers filed ${s.std} plans open to anyone with Parts A and B, and ${s.zero} of the drug-covering ones charge no premium at all. The median in-network out-of-pocket cap is ${K.usd(s.moopMed!)}, well under the national median of ${K.usd(K.nat.moopMed)}, and the lowest cap filed is ${K.usd(s.moopMin!)}. ${s.star4} plans carry a 2027 rating of four stars or more, and the best reaches ${s.starMax} stars. Choice is uneven, though: ${big[0].name} County has ${big[0].std} open plans while ${thin.name} has ${thin.std}. Special needs plans are unusually numerous (${s.snp}, of which ${s.dsnp} for people with Medicaid). Pick a county above to see every plan; ${s.pdp} stand-alone drug plans are listed below for people who keep Original Medicare.`,
  body: (h) => `
<h2>South Florida's price war, north Florida's thinner menu</h2>
<p>Miami-Dade alone lists ${md.std} open plans and ${md.snp} special needs plans for 2027, with caps starting at ${K.usd(md.moopMin!)}. Insurers compete there with physician groups that take a fixed monthly payment per member, which is why plans with a $0 premium and a cap of a few hundred dollars exist at all. Drive north and the menu changes: rural Panhandle and Big Bend counties keep mostly national PPOs and fewer HMOs, with caps closer to the national level. The county table at the bottom of this page shows the gap county by county.</p>
<h3>Who files the most plans</h3>
<p>${s.orgList.map(([o, n]) => `${o} (${n})`).join(', ')} file the largest numbers of open-to-all plan segments in the state. Plan counts are not market shares: one company can split a county into several segments with different premiums, and a single local HMO can cover a large share of members with only two or three plans.</p>
${h.mini('capVsOriginal', { moop: s.moopMed })}
<h3>Changes from 2026</h3>
<p>The 2026 file held ${s.std26} open plans for Florida; the 2027 file has ${s.std}, ${K.change(s.std, s.std26)}. Each county page lists the plan IDs not filed again, and the insurer's Annual Notice of Change, mailed by September 30, says where its members go. Stand-alone drug plans went from ${s.pdp26} to ${s.pdp}.</p>
<h2>Hurricanes, snowbirds and network rules</h2>
<p>Two Florida situations deserve a check before choosing an HMO. Part-year residents who spend the summer up north are covered by an HMO only for emergencies and urgent care outside its area; a PPO or Original Medicare with Medigap follows them better. And when a federal or state emergency is declared, as after a hurricane, Advantage plans must cover Part A and B services at non-contracted facilities, waive referral requirements and charge in-network cost sharing for that care while the declaration lasts (${h.ext('https://www.ecfr.gov/current/title-42/chapter-IV/subchapter-B/part-422/subpart-C/section-422.100', '42 CFR 422.100(m)')}), which matters when the usual clinic is closed.</p>
`,
  faqs: [
    { q: 'How many Medicare Advantage plans are available in Florida for 2027?', a: `${s.std} plans open to anyone with Parts A and B, plus ${s.snp} special needs plans for people with Medicaid, chronic conditions or nursing-home care, according to the CMS landscape file of September 2026. The number in your county is what counts: from ${thin.std} to ${big[0].std}.` },
    { q: 'Are there $0 premium Medicare Advantage plans in every Florida county?', a: `Most counties have at least one, and ${s.zero} drug-covering plans across the state have a $0 premium in 2027. You still pay the Part B premium of ${K.cents(K.P.partB['2026'].premium)} a month in 2026, and copays up to the plan's cap; the county finder shows which $0 plans have the lowest cap.` },
    { q: 'I live in Florida only in winter. Is a Medicare Advantage HMO a good fit?', a: 'An HMO covers routine care only inside its service area, with emergencies and urgent care covered anywhere in the country. If you spend several months a year in another state, a PPO with out-of-network coverage, or Original Medicare with a Medigap policy, avoids paying full price for routine visits away from Florida.' },
  ],
  related: ['county:florida/miami-dade', 'zero-premium-plans', 'special-needs-plans', 'state:georgia', 'state:alabama'],
});
