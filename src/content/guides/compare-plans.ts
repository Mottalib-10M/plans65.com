import { defineGuide } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const D = K.P.partD['2027'];
const mc = K.county('arizona', 'maricopa');
const low = mc.lowMoop!;
const care = { partBServices: 12000, admissions: 1 };
const capA = 3500, capB = 7500;
const medA = Math.min(K.original(care, 2027).total, capA);
const medB = Math.min(K.original(care, 2027).total, capB);

export default defineGuide({
  id: 'compare-plans',
  group: 'plans',
  order: 30,
  slug: 'compare-plans',
  nav: 'Compare two plans',
  card: 'Two plans of your county side by side: expected year and worst case',
  title: 'Compare Medicare Advantage Plans 2027: Two Plans, One Year',
  description: `Compare two Medicare Advantage plans of your county for 2027: premium, drug deductible, out-of-pocket cap and stars from CMS, and the year’s cost for your care.`,
  h1: 'Compare two Medicare Advantage plans of the same county',
  intro: 'Pick a state, a county and two plans: the comparison adds premiums, medical cost sharing and drugs for the year, then shows the worst case of each.',
  resume: `Comparing two Advantage plans on premium alone hides most of the cost. Three other numbers from the CMS file decide what a year really costs: the in-network out-of-pocket maximum, which limits copays and coinsurance for hospital and doctor care; the drug deductible, which you pay before the plan shares drug costs; and the star rating, which measures how the insurer's contract performed. The comparator above takes both plans from the same county list and applies your own use of care: approved medical services, hospital admissions and the full price of your drugs. It assumes cost sharing equal to Original Medicare until each plan's cap, and the 2027 standard drug benefit with each plan's own deductible. The worst case adds twelve months of premium, the plan's cap and the ${K.usd(D.oopCap)} drug cap: the most a bad year could cost on that plan, before the Part B premium you pay in any case.`,
  body: (h) => `
<h2>Four columns that decide a year</h2>
<p><strong>Premium.</strong> The monthly amount of the plan itself, Part C and Part D together, paid whether or not you see a doctor. A $0 premium is common: in Maricopa County, Arizona, ${mc.zero} of the ${mc.std} plans open to everyone include drug coverage for no premium in 2027.</p>
<p><strong>Maximum out of pocket.</strong> The ceiling on what you pay in copays and coinsurance for covered in-network Part A and Part B services in a calendar year. In the same county, caps run from ${K.usd(mc.moopMin!)} (${low.n}) to ${K.usd(mc.moopMax!)}. Two $0 plans can therefore differ by several thousand dollars in a year with a surgery or a long hospital stay.</p>
<p><strong>Drug deductible.</strong> What you pay in full for drugs before the plan's share starts, ${K.usd(D.deductible)} at most in 2027 and often less. It matters most to someone with several brand-name drugs and little to someone with one cheap generic.</p>
<p><strong>Stars.</strong> The 2027 rating of the insurer's contract, from the CMS release of October 8, 2026. It is a quality signal, not a price: it does not lower your bill, but plans rated five stars open a special enrollment window (see ${h.a('star-ratings', 'star ratings 2027')}).</p>
<h2>A worked comparison</h2>
<p>Take two plans with the same $0 premium, one capped at ${K.usd(capA)} and one at ${K.usd(capB)}, and a year with ${K.usd(care.partBServices)} of approved care and one hospital admission. Under the comparator's assumption, Original Medicare would leave ${K.usd(K.original(care, 2027).total)} to pay; the first plan stops at ${K.usd(medA)} and the second at ${K.usd(medB)}. The difference, ${K.usd(medB - medA)}, is larger than most premium gaps between plans. In a quiet year with a few visits, the two plans cost about the same, which is why the comparator shows both the expected year and the worst case.</p>
${h.mini('capVsOriginal', { moop: capB })}
<h2>What the comparison cannot see</h2>
<p>The landscape file does not include networks, formularies or the copay of each service, and those can reverse a ranking. A plan that does not have your cardiologist in network costs you the full price of each visit in an HMO, or a higher out-of-network share in a PPO. A drug missing from the formulary is not covered at all unless the plan grants an exception. Before choosing between the two plans that come out best, check three documents for each one: the provider directory, the formulary, and the Summary of Benefits, which lists the copay for a primary care visit, a specialist, a hospital day, imaging and outpatient surgery.</p>
<h3>Copays versus coinsurance</h3>
<p>Two plans with the same cap can spread the cost differently. One may charge a flat $300 per hospital day for the first five days, another 20% of the bill. For a short stay the flat copay is often cheaper; for an expensive procedure, the percentage reaches the cap faster. The comparator does not distinguish them, because the CMS file does not; the Summary of Benefits does.</p>
<h3>Same insurer, different plans</h3>
<p>Insurers often file several plans in one county under the same contract: a $0 HMO, an HMO with a premium and a lower cap, a PPO, sometimes a plan that pays back part of the Part B premium (its name usually says "giveback"). They share a star rating because ratings belong to the contract, and often share a network, but their premiums, caps and drug deductibles differ. When the comparator puts two plans of the same insurer side by side, the network question mostly disappears and the money question remains: how much premium you are willing to pay to lower your worst case.</p>
<h2>Comparing with a stand-alone setup</h2>
<p>The comparator works inside one county's Advantage plans. To compare an Advantage plan with Original Medicare, a Medigap policy and a stand-alone drug plan, use the ${h.a('annual-cost-calculator', 'whole-year calculator')}, which models the four routes with the same inputs. And when your two favorite plans are close, remember timing: the choice made between October 15 and December 7, 2026 sets your coverage for 2027, and the ${h.a('enrollment-periods', 'Advantage open enrollment period')} from January 1 to March 31 allows one more change if the first choice turns out wrong.</p>
`,
  faqs: [
    { q: 'What matters more when comparing Advantage plans, the premium or the out-of-pocket maximum?', a: 'For a healthy year, the premium; for a year with a hospital stay or surgery, the out-of-pocket maximum, which can differ by several thousand dollars between plans of the same county in 2027. The comparator shows both the expected cost for the care you enter and the worst case, so you can judge the risk you accept.' },
    { q: 'Can I compare plans from two different counties?', a: 'You can only join a plan filed for the county where you live, so the comparator pairs plans of the same county. If you are moving, compare the plans of your new county: a permanent move that brings new plan options gives you a special election period to choose one there (42 CFR 422.62(b)(2)).' },
    { q: 'Why does the comparator assume copays equal to Original Medicare?', a: 'Because the CMS landscape file publishes each plan’s cap but not its copay for each service. Taking Original Medicare’s cost sharing up to the cap is a neutral middle: many plans charge less for doctor visits and more for hospital days. The Summary of Benefits of each plan gives the exact copays.' },
    { q: 'Should I pick the plan with the most stars?', a: 'Stars measure the quality of the insurer’s contract on up to 43 measures, from preventive care to complaints, and they are worth weighing. They do not tell you whether your doctors are in network or your drugs on the formulary, and two plans of the same contract share one rating. Use them to break a tie between plans that fit your care.' },
  ],
  tool: 'compare',
  related: ['annual-cost-calculator', 'star-ratings', 'hmo-vs-ppo', 'zero-premium-plans', 'county:arizona/maricopa'],
  sources: ['cms_landscape', 'cms_stars_data', 'ann_2027'],
});
