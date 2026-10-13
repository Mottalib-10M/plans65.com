import { defineGuide } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';
import { STATE_LIST } from '../../lib/data';

const n = K.nat;
const st = STATE_LIST.map((s) => ({ ...K.state(s.slug) })).filter((s) => s.std26 > 0);
const losers = [...st].sort((a, b) => (b.std26 - b.std) - (a.std26 - a.std)).slice(0, 12);
const gainers = st.filter((s) => s.std > s.std26).length;
const fewer = st.filter((s) => s.std < s.std26).length;
const la = K.county('california', 'los-angeles');

export default defineGuide({
  id: 'plans-leaving',
  group: 'plans',
  order: 70,
  slug: 'plans-leaving',
  nav: 'Plans leaving in 2027',
  card: '2026 plans not filed again for 2027, and what to do by when',
  title: 'Medicare Advantage Plans Leaving 2027: Exits, Your Options',
  description: `Medicare Advantage plans leaving in 2027: open plans fell from ${K.num(n.std26)} to ${K.num(n.std)} in the CMS files. Check your county, your special period and your Medigap rights.`,
  h1: 'Medicare Advantage plans that are not back in 2027',
  intro: 'Choose your county: the summary counts the 2026 plan IDs not filed again there, and each large county page lists them by name.',
  resume: `Between the CMS landscape file for 2026 and the one for 2027, the number of Medicare Advantage plans open to everyone went from ${K.num(n.std26)} to ${K.num(n.std)}, and the number of stand-alone drug plans from ${K.num(n.pdp26)} to ${K.num(n.pdp)}. ${fewer} states and territories have fewer open plans than a year earlier, ${gainers} have more. A plan ID missing from a county in 2027 does not always mean a closure: insurers also merge plans and move their members to another ID, or shrink a service area to some counties. Your insurer had to tell you what happens to your plan in the Annual Notice of Change mailed by September 30, 2026. If your plan is really ending in your area, federal rules give you a special election period and a guaranteed right to buy certain Medigap policies, on top of the usual annual change period from October 15 to December 7.`,
  body: (h) => `
<h2>Where the drop is largest</h2>
${h.table(['State', 'Open plans 2026', 'Open plans 2027', 'Change'], losers.map((s) => [h.a(`state:${s.slug}`, s.name), s.std26, s.std, s.std - s.std26]), 'Plans open to everyone (special needs plans excluded), CMS CY2026 (202609) and CY2027 (202609.1) landscape files.', ['l', 'r', 'r', 'r'])}
<p>State totals hide the county view. In Los Angeles County, ${la.gone} plan IDs of 2026 are not filed again for 2027 while ${la.new} new ones appear, so the county ends with ${la.std} open plans against ${la.std26} a year earlier. The finder's summary line gives that count for every county; the large county pages list the plans by name.</p>
<h2>Closure, merger or new ID: how to tell</h2>
<p>CMS identifies a plan by its contract and plan number (H1234-005-0). When an insurer combines two plans for the next year, members of the plan that disappears are usually moved ("crosswalked") into the remaining one, keep their coverage without doing anything, and get the new plan's premium and cap. When an insurer drops a county or ends a plan without a successor, the coverage simply stops on December 31. The Annual Notice of Change, or a separate non-renewal letter, says which case applies to you. If you have neither, call the number on your member card before December 7.</p>
<h3>The trap of doing nothing</h3>
<p>Members of a plan that is ending and who choose nothing return to Original Medicare on January 1. They keep Parts A and B, but they lose the drug coverage that came with the Advantage plan, and without a stand-alone drug plan they start counting months toward the Part D late penalty after a 63-day gap. They also lose the out-of-pocket cap: Original Medicare alone has none.</p>
<h2>Plans that stay but change</h2>
<p>A plan that keeps its ID can still change a great deal: premium, cap, drug deductible, network, extra benefits. The finder shows the 2026 premium next to the 2027 one when they differ ("was $12 in 2026"), using the same plan ID in both CMS files. A rise in the cap is not displayed line by line, but the Annual Notice of Change lists it, and it is often the larger change in money: a cap that moves up by $2,000 matters more than a premium that moves up by $5 a month.</p>
<h3>Drug plans too</h3>
<p>Stand-alone drug plans shrank as well, from ${K.num(n.pdp26)} plan versions to ${K.num(n.pdp)}. A drug plan that stops is replaced by nothing unless you choose: members get a notice and can pick another plan during the annual period. People with Extra Help whose plan leaves are in many cases reassigned by CMS to another plan priced at or below the regional subsidy, and receive a letter saying which one; they can still pick a different plan, and with Extra Help they can change drug plans once a month.</p>
<h2>Your extra rights when a plan leaves</h2>
<p>When the insurer discontinues your plan in the area where you live, or tells you it will, you can change to Original Medicare or to another Advantage plan outside the annual calendar (${h.src('cfr_422_62', '42 CFR 422.62(b)(1)')}). Federal law also gives people whose Advantage coverage ends this way a guaranteed right to buy certain Medigap policies, without health questions or higher pricing, if they apply within 63 days after the coverage ends (${h.src('usc_1395ss', 'Social Security Act §1882(s)(3)')}). Outside such situations, Medigap insurers in most states can review your health before selling a policy, which is why this window matters to anyone thinking of going back to Original Medicare.</p>
${h.mini('capVsOriginal')}
<h2>A checklist before December 7</h2>
<ul>
<li>Write down the date on your non-renewal letter: the guaranteed Medigap window and the special election period are counted from it or from the end of coverage.</li>
<li>Find your plan ID on your member card and look for it in your county's list: if it is not there, read your notice.</li>
<li>Note your doctors, your hospital and your drugs, and check them against the two or three replacement plans you consider.</li>
<li>Compare the replacement plans' out-of-pocket caps as well as their premiums with the ${h.a('compare-plans', 'two-plan comparator')}.</li>
<li>If you are leaving Advantage for Original Medicare, apply for Medigap within the guaranteed-issue window and add a drug plan from the ${h.a('part-d-plans', 'Part D list')} so that coverage starts January 1.</li>
</ul>
`,
  faqs: [
    { q: 'How many Medicare Advantage plans are leaving for 2027?', a: `Comparing the CMS landscape files, plans open to everyone fell from ${K.num(n.std26)} in 2026 to ${K.num(n.std)} in 2027, and stand-alone drug plans from ${K.num(n.pdp26)} to ${K.num(n.pdp)}. These are net counts: some plans close, others merge, and new plans appear. Your county's line shows the 2026 IDs that are not filed again there.` },
    { q: 'My Medicare Advantage plan is ending. What happens if I do nothing?', a: 'If no successor plan takes you, your coverage switches to Original Medicare on January 1. You keep Parts A and B, but you lose the plan’s drug coverage and its out-of-pocket cap. Without a stand-alone drug plan or other creditable coverage, Part D late penalty months start counting after a 63-day gap.' },
    { q: 'Can I buy a Medigap policy without health questions if my Advantage plan leaves?', a: 'Yes, for certain standardized policies, if your Advantage plan ends in your area. Under Social Security Act §1882(s)(3), insurers cannot refuse you, price you by health status or exclude pre-existing conditions if you apply within 63 days after the coverage ends. Keep the termination notice: it is your proof of eligibility.' },
    { q: 'Is a plan ID missing from my county always a closed plan?', a: 'No. Insurers merge plans and move members to another ID, or keep a plan in some counties and drop it in others. The CMS file only shows which IDs are filed where. Your Annual Notice of Change, mailed by September 30, 2026, says which 2027 plan you are moved to, if any.' },
  ],
  tool: 'finder',
  related: ['compare-plans', 'medigap', 'enrollment-periods', 'part-d-plans', 'county:california/los-angeles'],
  sources: ['cms_landscape', 'cfr_422_62', 'usc_1395ss'],
});
