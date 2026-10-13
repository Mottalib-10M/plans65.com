import { defineCounty } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const c = K.county('new-york', 'suffolk');
const na = K.county('new-york', 'nassau');
const qn = K.county('new-york', 'queens');
const ny = K.state('new-york');
const b26 = K.P.partB['2026'], b27 = K.P.partB['2027'];

export default defineCounty({
  state: 'new-york',
  county: 'suffolk',
  title: `Medicare Advantage Plans Suffolk County 2027: Just ${c.zero} at $0`,
  description: `Suffolk County, Long Island, 2027: ${c.std} open Medicare Advantage plans, down from ${c.std26}, only ${c.zero} at $0 with drugs and caps from ${K.usd(c.moopMin!)}. Every plan listed and sorted.`,
  intro: `Eastern Long Island has ${K.change(c.std, c.std26)} open to everyone for 2027, and only a handful of those left cost nothing per month.`,
  resume: `Suffolk County's Medicare Advantage choice narrowed sharply for 2027: ${c.std} plans are open to anyone with Parts A and B, against ${c.std26} in 2026, after ${c.gone} plan IDs were not filed again and ${c.new} were added. Only ${c.zero} of the drug-covering plans charge no premium, against ${c.zero26} last year. Caps follow the New York pattern: the lowest in-network cap is ${K.usd(c.moopMin!)}, with ${c.lowMoop!.n}, and the median ${K.usd(c.moopMed!)}, the highest filed anywhere. Quality is a relative strength: ${c.star4} of the ${c.std} open plans hold four stars or more, and ${c.best!.n} reaches ${c.starMax}. HMOs dominate (${c.hmo}, against ${c.ppo} PPOs), after Wellcare's Simple, Giveback and Assist Open PPOs left the county. Special needs plans number ${c.snp}, ${c.dsnp} of them for people with Medicaid. EmblemHealth, Aetna, Anthem and Wellcare file most of the open plans.`,
  body: (h) => `
<h2>A premium is now the norm</h2>
<p>With so few $0 plans, most Suffolk residents choosing Advantage for 2027 will pay a monthly premium on top of Part B. Part B itself is ${K.cents(b26.premium)} a month in 2026, and the Medicare Trustees project ${K.cents(b27.premium)} for 2027, before any IRMAA surcharge. A two-person household pays both.</p>
${h.mini('partB2027')}
<h3>The $0 plans that remain</h3>
<p>Anthem Veteran 2 combines a $0 premium with the lowest cap in the county. Other plans with no premium, with or without drug coverage, include EmblemHealth VIP Value, Aetna Medicare Elite, Aetna Medicare Eagle Giveback and the Wellcare Fidelis HMO-POS plans; check the drug column before counting on any of them for prescriptions. Aetna's Eagle Giveback reduces the Part B premium you pay, a benefit worth comparing with its cap. ${c.cheapHigh!.n} carries ${c.cheapHigh!.star} stars.</p>
<h2>Fewer PPOs for a county of commuters and second homes</h2>
<p>Suffolk residents often use doctors in Nassau or Manhattan and spend part of the year elsewhere. With ${c.ppo} PPOs left, someone who needs out-of-network coverage has few options in Advantage, and Original Medicare with a Medigap policy becomes the main alternative. Humana's USAA Honor Giveback and HumanaChoice PPOs and HealthSpring True Choice are also among the 2026 exits.</p>
<h3>Nassau and the city</h3>
<p>Nassau County lists ${na.std} open plans with a lowest cap of ${K.usd(na.moopMin!)}; Queens ${qn.std}. Across New York State there are ${ny.std} open plans in 2027.</p>
`,
  faqs: [
    { q: 'How many $0 Medicare Advantage plans are in Suffolk County, New York for 2027?', a: `${c.zero} plans with drug coverage and no monthly premium, down from ${c.zero26} in 2026, out of ${c.std} open plans, according to the CMS landscape file of September 2026. They include Anthem Veteran 2 and EmblemHealth VIP Value. You still pay the Part B premium, and copays up to the plan's cap.` },
    { q: 'Why did Suffolk County lose Medicare Advantage plans for 2027?', a: `Insurers decide each year which counties to serve. For Suffolk, ${c.gone} IDs from 2026 were not filed for 2027, among them Wellcare's Open PPOs, several Humana PPOs and HealthSpring True Choice, while ${c.new} new IDs arrived. Members of a closed plan can choose another by December 7, 2026, or use a special enrollment period afterward.` },
    { q: 'Are there Medicare Advantage PPOs on Long Island in Suffolk County for 2027?', a: `${c.ppo} of the ${c.std} open plans in Suffolk County are PPOs; the other ${c.hmo} are HMOs or HMO-POS plans, per CMS 2027 data. Nassau County, next door, has its own list of ${na.std} open plans. A PPO pays part of out-of-network care, useful if your specialists practice outside the plan's network.` },
  ],
  related: ['state:new-york', 'county:new-york/queens', 'county:new-york/kings', 'part-b-premium', 'plans-leaving'],
});
