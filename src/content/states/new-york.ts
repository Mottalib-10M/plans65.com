import { defineState } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const s = K.state('new-york');
const top = K.counties('new-york', 'std');
const low = K.counties('new-york', 'std', true);
const kings = K.county('new-york', 'kings');
const erie = K.county('new-york', 'erie');
const monroe = K.county('new-york', 'monroe');
const DFS = 'https://www.dfs.ny.gov/consumers/health_insurance/information_for_medicare_beneficiaries';

export default defineState({
  slug: 'new-york',
  title: `Medicare Advantage Plans New York 2027: Caps, Medigap Rights`,
  description: `New York Medicare Advantage 2027: ${s.std} open plans, median cap ${K.usd(s.moopMed!)}, premiums up to ${K.usd(s.premMax!)}, and Medigap open all year under state law. Every county listed.`,
  intro: `High out-of-pocket ceilings, a crowded field in Brooklyn and Buffalo, and a state rule that lets you buy a Medigap policy in any month.`,
  resume: `New York's ${s.std} open Medicare Advantage plans for 2027 carry some of the highest out-of-pocket caps in the country: the median in-network maximum is ${K.usd(s.moopMed!)}, against ${K.usd(K.nat.moopMed)} nationally, and the top reaches ${K.usd(s.moopMax!)}. Premiums climb as high as ${K.usd(s.premMax!)} a month, while ${s.zero} drug-covering plans cost $0. Kings County (Brooklyn) has the most open plans, ${kings.std}, and the western counties around Buffalo follow closely; ${low[0].name} County has ${low[0].std}. ${s.snp} special needs plans, ${s.dsnp} of them for people who also have Medicaid, sit beside the open plans. What changes the calculation in New York is Medigap: state law requires insurers to accept a Medicare enrollee's application at any time of year, without pricing by health. Leaving Medicare Advantage for Original Medicare plus a supplement stays possible later. ${s.pdp} stand-alone drug plans are listed below.`,
  body: (h) => `
<h2>Caps near the federal ceiling</h2>
<p>Half of New York's open plans set their in-network maximum at ${K.usd(s.moopMed!)} or more, and the federal limit for 2027 is ${K.usd(K.nat.moopMax)}. The state's floor is ${K.usd(s.moopMin!)}, held by ${s.lowMoop!.n}. A high cap does not mean a bad plan; it means the insurer keeps copays and premiums down and leaves the member exposed in a year of serious illness.</p>
<h2>The Medigap rule that sets New York apart</h2>
<p>In most states, a Medigap policy bought after the first ${K.P.periods.medigapOpenMonths} months of Part B can be refused or priced up because of health. New York is different. The Department of Financial Services states that any insurer writing Medigap insurance must accept a Medicare enrollee's application at any time throughout the year, and may not deny a policy or set a different premium because of health status, claims experience or medical condition (${h.ext(DFS, 'NY DFS, Protections for Medicare Beneficiaries')}). A policy may impose a waiting period of up to six months for pre-existing conditions, reduced by earlier creditable coverage if no break exceeded 63 days. The protection applies to people on Medicare by age, by disability, and with end-stage renal disease.</p>
<p>Put together with the high caps, this shifts the trade-off. A New Yorker can try an Advantage plan and still move to Original Medicare with a supplement later, during a valid enrollment period for leaving the plan, without medical underwriting. The calculator below compares the two versions of Plan G.</p>
${h.mini('hdg')}
<h3>Brooklyn and Buffalo lead, Rochester trails</h3>
<p>The busiest menus: ${top.slice(0, 4).map((c) => `${c.name} ${c.std}`).join(', ')}. Erie County has ${erie.std} open plans, Monroe only ${monroe.std}, one of the smallest counts in the state despite Rochester's size. ${s.orgList.slice(0, 4).map(([o, n]) => `${o} (${n})`).join(', ')} file the most plans, with regional Blue Cross plans strong upstate. Stand-alone drug plans start at ${K.cents(s.pdpMin!)} a month here, well above the cheapest premium in most states.</p>
`,
  faqs: [
    { q: 'Can I switch from Medicare Advantage to Medigap in New York without health questions?', a: `Yes. New York law requires Medigap insurers to accept a Medicare enrollee's application at any time of year and bars them from denying coverage or charging more because of health, according to the Department of Financial Services. A waiting period of up to six months for pre-existing conditions can apply, shortened by prior coverage. You still need a valid period to leave your Advantage plan.` },
    { q: 'Why are Medicare Advantage out-of-pocket maximums so high in New York for 2027?', a: `Insurers choose their cap up to the federal limit of ${K.usd(K.nat.moopMax)}, and in New York half chose ${K.usd(s.moopMed!)} or more, per the CMS landscape file of September 2026. Higher caps usually pair with lower premiums or copays. The lowest New York cap is ${K.usd(s.moopMin!)}; the county table shows each plan's figure.` },
    { q: 'How many Medicare Advantage plans are offered in Brooklyn for 2027?', a: `Kings County has ${kings.std} plans open to anyone with Parts A and B for 2027, the most of any New York county, with ${kings.zero} at a $0 premium. It also has ${kings.snp} special needs plans, many of them for people who qualify for both Medicare and Medicaid. The Brooklyn county page lists them one by one.` },
  ],
  related: ['county:new-york/kings', 'county:new-york/queens', 'county:new-york/new-york', 'county:new-york/suffolk', 'state:new-jersey', 'medigap'],
  extraSources: [{ name: 'New York State Department of Financial Services, Protections for Medicare Beneficiaries Residing in New York State', url: 'https://www.dfs.ny.gov/consumers/health_insurance/information_for_medicare_beneficiaries' }],
});
