import { defineGuide } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const S = K.P.stars;
const n = K.nat;
const dist = Object.fromEntries(n.starDist) as Record<string, number>;
const rated = ['5.0', '4.5', '4.0', '3.5', '3.0', '2.5', '2.0'].reduce((a, k) => a + (dist[k] ?? 0), 0);
const four = (dist['5.0'] ?? 0) + (dist['4.5'] ?? 0) + (dist['4.0'] ?? 0);

export default defineGuide({
  id: 'star-ratings',
  group: 'plans',
  order: 60,
  slug: 'star-ratings',
  nav: 'Star ratings 2027',
  card: 'What the October 2026 ratings mean, and the five-star window',
  title: 'Medicare Star Ratings 2027: Plans by Stars, What They Mean',
  description: `Medicare star ratings 2027, released October 8, 2026: average ${S.avgMapd} stars for drug-covering contracts, ${S.fiveStarContracts} contracts at five stars. Sort your county by rating.`,
  h1: 'Medicare Advantage and Part D star ratings for 2027',
  intro: 'Sort the plans of any county by their 2027 rating, then read what the stars measure and what they leave out.',
  resume: `CMS published the 2027 Star Ratings on October 8, 2026, in time for the open enrollment that runs from October 15 to December 7. Each Medicare Advantage contract with drug coverage is rated from 1 to 5 stars on up to ${S.measuresMapd} measures, Advantage contracts without drugs on up to ${S.measuresMaOnly}, and stand-alone drug plans on up to ${S.measuresPdp}. Weighted by enrollment, drug-covering Advantage contracts average ${S.avgMapd} stars for 2027 against ${S.avgMapd26} for 2026; ${S.fiveStarContracts} of the ${S.contractsRated} rated contracts reach five stars. Stand-alone drug plans average ${S.avgPdp}, up from ${S.avgPdp26}. Among the ${K.num(n.std)} plans open to everyone in the 2027 landscape file, ${K.num(four)} carry a rating of four stars or more. A rating belongs to the insurer's contract, so all plans of that contract in all counties share it, and a five-star plan opens a special enrollment window from December 8 to November 30.`,
  body: (h) => `
<h2>What a star rating measures</h2>
<p>The rating combines very different things into one number: how often members get screenings and vaccines, how well diabetes and blood pressure are controlled, how members rate their care and the plan, how many complaints and appeals the plan generates and how it handles them, how well members take their drugs, and how the customer service line answers. For 2027 CMS added two drug-safety measures, the concurrent use of opioids and benzodiazepines and the use of several anticholinergic drugs in older adults, and increased the weight of the measures on improving or maintaining physical and mental health (${h.src('cms_stars_fs_2027', 'CMS fact sheet of October 8, 2026')}).</p>
<p>Because the measures come from earlier years of data, the 2027 rating mostly describes how a contract performed in 2025 and early 2026. That is why a plan that is new, or a contract too small to measure, shows "new plan" or "too few data" in the lists of this site: these are CMS's own labels, not a bad grade.</p>
<h2>Ratings across the 2027 plans</h2>
${h.table(['Rating', 'Plans open to all, 2027'], ['5.0', '4.5', '4.0', '3.5', '3.0', '2.5', '2.0'].map((k) => [`${k} stars`, dist[k] ?? 0]).concat([['New plan', dist['new'] ?? 0], ['Too few data', dist['nd'] ?? 0]]), 'Plans that are not special needs plans, CMS CY2027 landscape file joined with the 2027 Star Ratings data tables (October 8, 2026).', ['l', 'r'])}
<p>Of the ${K.num(rated)} rated plans open to everyone, ${K.num(four)} have four stars or more. Counting plans is not the same as counting contracts: a large insurer can file dozens of plans under one contract, all with the same rating. CMS also notes in its fact sheet that nonprofit organizations earn higher ratings more often: about ${K.pct(S.nonprofit4plus, 0)} of nonprofit drug-covering contracts have four stars or more, against ${K.pct(S.forprofit4plus, 0)} of for-profit ones.</p>
<h2>The five-star special enrollment period</h2>
<p>If a plan with an overall rating of five stars is offered where you live, you can switch into it once during the year, from December 8 before the plan year through November 30 of that year (${h.src('cfr_422_62', '42 CFR 422.62(b)(15)')}). The switch usually takes effect the first day of the following month. It works in one direction only: into the five-star plan. ${S.fiveStarContracts} drug-covering contracts earned five stars for 2027, ${S.fiveStarAlso2026} of them for the second year in a row. Sort your county by stars in the finder: if the first line shows 5.0, the window is open to you.</p>
${h.mini('starsSep')}
<h2>Low ratings and the warning icon</h2>
<p>CMS flags on Medicare.gov the contracts with consistently low ratings: ${S.lowPerformingIcon} drug-covering contracts carry that icon for 2027. A low rating does not stop you from joining, but it is a reason to read the plan's complaint and appeal record and its network carefully.</p>
<h2>Why the same insurer can rate differently by state</h2>
<p>An insurer usually holds several contracts with CMS, often one per region or per company it acquired, and each contract gets its own rating. A national brand can therefore carry 4.5 stars in one state and 3 stars in the next, for plans that look alike on paper. The lists of this site show the rating of the exact contract behind each plan ID (the letter and four digits at the start, such as H1234), so two plans with the same marketing name but different contracts can show different stars in neighboring counties.</p>
<p>Ratings also move from one year to the next. Thresholds, called cut points, are recalculated each year from the performance of all contracts, and a contract can lose half a star without getting worse if the others improved. Look at the trend over two or three years on Medicare.gov rather than a single figure.</p>
<h2>How much weight to give the stars</h2>
<p>A rating is a summary of averages, and your own needs may weigh on a few measures only. For someone with a chronic illness, the measures on care coordination, appeals and drug adherence matter more than the general score; for someone in good health, the customer service and member satisfaction parts may be enough. Stars never tell you whether your doctors are in the network or whether your drugs are covered. Use them after cost and network have narrowed the choice to two or three plans, with the ${h.a('compare-plans', 'two-plan comparator')}.</p>
<p>Stand-alone drug plans have their own Part D rating: about ${K.pct(S.pdp4plusShare, 0)} of them (${S.pdp4plusContracts} contracts) earned four stars or more for 2027. The ${h.a('part-d-plans', 'Part D plans page')} shows the rating of each one by state.</p>
`,
  faqs: [
    { q: 'When were the 2027 Medicare star ratings released?', a: `CMS published the 2027 Star Ratings on October 8, 2026, and Medicare.gov shows them for the open enrollment that runs from October 15 to December 7, 2026. The ratings on this site come from the CMS data tables of the same date and are joined to each plan through its contract.` },
    { q: 'What is the average Medicare Advantage star rating for 2027?', a: `Weighted by enrollment, drug-covering Medicare Advantage contracts average ${S.avgMapd} stars for 2027, slightly below ${S.avgMapd26} for 2026, according to the CMS fact sheet of October 8, 2026. ${S.fiveStarContracts} of the ${S.contractsRated} rated contracts have five stars, and the plans of those contracts share that rating in every county they serve.` },
    { q: 'Can I switch to a five-star plan at any time of year?', a: 'Once per year, if a plan with a five-star overall rating is offered where you live. The special enrollment period runs from December 8 before the plan year to November 30 of that year, under 42 CFR 422.62(b)(15). It only allows a move into the five-star plan, not between other plans.' },
    { q: 'Why does my plan show “new plan” instead of a star rating?', a: 'CMS rates contracts on several years of data. A contract that is too new, or too small to produce reliable results, receives the label “Plan too new to be measured” or “Not enough data available” instead of stars. It is not a low score, only the absence of a measured one.' },
  ],
  tool: 'finder',
  related: ['compare-plans', 'enrollment-periods', 'part-d-plans', 'hmo-vs-ppo'],
  sources: ['cms_stars_fs_2027', 'cms_stars_data', 'cfr_422_62', 'cms_landscape'],
});
