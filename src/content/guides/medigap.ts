import { defineGuide } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const M = K.P.medigap;
const C = M.chart as unknown as Record<string, string[]> & { _rows: string[] };
const letters = ['A', 'B', 'C', 'D', 'F', 'G', 'K', 'L', 'M', 'N'];
const B = K.P.partB['2026'];

export default defineGuide({
  id: 'medigap',
  group: 'costs',
  order: 70,
  slug: 'medigap',
  nav: 'Medigap plans compared',
  card: 'Plans A to N side by side, open enrollment, Medigap or Advantage',
  title: 'Medigap Plans 2026 Compared: A to N, Costs, Open Enrollment',
  description: `Medigap plans compared for 2026: what Plans A to N pay, K and L limits of ${K.usd(M.kOop2026)} and ${K.usd(M.lOop2026)}, the 6-month open enrollment, and Medigap against an Advantage plan.`,
  h1: 'Medigap plans A to N: what each one pays',
  intro: 'Enter the quotes you received: the calculator compares Plan G and high-deductible G over a year of care, premiums included.',
  resume: `Medigap, or Medicare Supplement insurance, is a private policy that pays some or all of what Original Medicare leaves you: the Part A deductible of ${K.usd(K.P.partA['2026'].deductible)} per benefit period, hospital and nursing coinsurance, the Part B deductible of ${K.usd(B.deductible)} and the 20% of Part B, which has no yearly limit. Policies are standardized by federal law into lettered plans, so a Plan G from one insurer pays the same benefits as a Plan G from another; only the premium and the service differ. Ten plans are sold today in most states, A, B, C, D, F, G, K, L, M and N, with C and F reserved to people eligible for Medicare before 2020. Plans K and L cap your yearly spending at ${K.usd(M.kOop2026)} and ${K.usd(M.lOop2026)} in 2026. Medigap works only with Original Medicare, not with an Advantage plan, and covers no drugs: you add a Part D plan. The best time to buy is the six months that start when you are 65 and enrolled in Part B.`,
  body: (h) => `
<h2>What each plan pays</h2>
${h.table(['Benefit', ...letters], C._rows.map((r, i) => [r, ...letters.map((l) => C[l][i])]), `Standardized benefits, ${h.src('medigap_compare', 'Medicare.gov chart of Medigap plan benefits')}. Plans C and F: only for people first eligible for Medicare before January 1, 2020. Plan N: copays of up to $${M.nOfficeCopay} for some office visits and $${M.nErCopay} for emergency room visits without admission. Plans K and L: yearly limits of ${K.usd(M.kOop2026)} and ${K.usd(M.lOop2026)} in 2026. Massachusetts, Minnesota and Wisconsin standardize their policies differently.`, ['l', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r'])}
<p>The chart reads in one direction: the further right, the more the plan leaves to you, except that Plans F and G cover the most. Plan F pays everything Original Medicare does not, Part B deductible included; since 2020 it can no longer be sold to people newly eligible for Medicare, which made Plan G, identical except for the Part B deductible, the most complete plan available to new enrollees. Plan N trades small copays and the Part B excess charge for a lower premium. Plans K and L pay only half or three quarters of most cost sharing, but stop your spending at a yearly limit.</p>
<h3>Plan N in practice</h3>
<p>Plan N pays the Part A deductible, the hospital and nursing coinsurance and the 20% of Part B, but you pay the Part B deductible, a copay of up to $${M.nOfficeCopay} for some office visits, up to $${M.nErCopay} for an emergency room visit that does not end in an admission, and any excess charge from a doctor who does not accept Medicare's approved amount. For someone who sees a doctor a few times a year and uses doctors who accept assignment, those costs stay small, and the premium is usually well below Plan G's.</p>
<h3>Plans K and L: a ceiling instead of full coverage</h3>
<p>K and L suit people who want protection against a catastrophic year at a lower premium. In 2026, once your out-of-pocket spending on covered services reaches ${K.usd(M.kOop2026)} with K or ${K.usd(M.lOop2026)} with L, plus the Part B deductible, the plan pays 100% for the rest of the calendar year. Until then you pay half (K) or a quarter (L) of the cost sharing, which makes the first visits of the year noticeably more expensive than with G or N.</p>
<h2>The six-month window that decides everything</h2>
<p>For six months starting with the first month you are both 65 or older and enrolled in Part B, any insurer selling Medigap in your state must sell you any of its policies at its standard price, whatever your health (${h.src('usc_1395ss', 'Social Security Act §1882(s)(2)')}). After that window, outside a few protected situations such as an Advantage plan leaving your area, most states let insurers ask health questions, charge more or refuse you. That is the main reason the first choice at 65 between Medigap and an Advantage plan matters: switching from Advantage to Medigap later is not guaranteed, while the reverse is always possible during the annual period.</p>
<p>Delaying Part B because you still have coverage from a current job also delays the window: it opens when Part B starts. Signing up for Part B too early, while you still have a job plan you intend to keep, starts the clock for nothing.</p>
${h.mini('hdg')}
<h2>How prices are set</h2>
<p>Federal law fixes the benefits, not the prices. Insurers price their policies in one of three ways: by your age when you buy, rising as you age ("attained age"), or the same for everyone whatever their age ("community rated"), and each state decides which methods it allows. Premiums also vary by ZIP code, sex and tobacco use, and two insurers can charge very different amounts for the same letter. No national price file exists, which is why the calculator above asks for the quotes you receive; your state's insurance department often publishes a comparison guide of Medigap premiums.</p>
<h2>Medigap or a Medicare Advantage plan</h2>
<p>With Medigap you keep Original Medicare: any doctor or hospital in the country that accepts Medicare, no referrals, no prior authorization from a plan, predictable bills. You pay for that with a monthly premium on top of Part B and a separate drug plan. An Advantage plan usually costs less each month and adds extras such as dental or vision, but works within a network and charges copays up to its cap. The ${h.a('annual-cost-calculator', 'whole-year calculator')} puts both routes on the same footing for your own level of care.</p>
`,
  faqs: [
    { q: 'What is the difference between Medigap Plan F and Plan G?', a: `Only the Part B deductible, ${K.usd(B.deductible)} in 2026: Plan F pays it, Plan G does not. Everything else is identical. Plan F cannot be sold to people who became eligible for Medicare on or after January 1, 2020, so for most new enrollees Plan G is the most complete plan they can buy.` },
    { q: 'When is the best time to buy a Medigap policy?', a: 'During your Medigap open enrollment period: the six months that begin with the first month you are 65 or older and enrolled in Part B. Insurers must then sell you any policy they offer, at their standard price, whatever your health. Afterwards, in most states, they can review your health and refuse you or charge more.' },
    { q: 'Can I have Medigap and a Medicare Advantage plan at the same time?', a: 'No. A Medigap policy only pays with Original Medicare, and it is illegal for an insurer to sell you one while you are in an Advantage plan unless you are switching back to Original Medicare. If you join an Advantage plan for the first time, you have a 12-month trial right to return to Original Medicare and Medigap.' },
    { q: 'Do Medigap policies cover prescription drugs?', a: 'Not policies sold today. Medigap plans sold since 2006 do not include drug coverage, so you need a stand-alone Part D plan to cover prescriptions and avoid the Part D late enrollment penalty. The Part D page lists every stand-alone plan of your state for 2027 with its premium and deductible.' },
    { q: 'What do Medigap Plans K and L cap in 2026?', a: `Plan K pays 50% and Plan L 75% of most Medicare cost sharing, until your own yearly spending reaches ${K.usd(M.kOop2026)} for K or ${K.usd(M.lOop2026)} for L in 2026, plus the Part B deductible. After that, the plan pays 100% of covered services for the rest of the calendar year.` },
  ],
  tool: 'medigap',
  related: ['medigap-plan-g', 'annual-cost-calculator', 'part-d-plans', 'plans-leaving', 'part-a'],
  sources: ['medigap_compare', 'usc_1395ss', 'cms_medigap_hd_2027', 'cms_fs_2026'],
});
