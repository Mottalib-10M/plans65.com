import { defineCounty } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const c = K.county('new-york', 'queens');
const bk = K.county('new-york', 'kings');
const na = K.county('new-york', 'nassau');
const bx = K.county('new-york', 'bronx');
const hd = K.P.medigap.hdDeductible['2027'];
const si = K.county('new-york', 'richmond');

export default defineCounty({
  state: 'new-york',
  county: 'queens',
  title: `Medicare Advantage Plans Queens 2027: No Cap Under ${K.usd(c.moopMin!)}`,
  description: `Queens County 2027: ${c.std} open Medicare Advantage plans, none with an in-network cap below ${K.usd(c.moopMin!)}, ${c.zero} at $0 with drugs, ${c.gone} plan IDs gone. The full list, no call.`,
  intro: `In Queens the cheapest out-of-pocket cap for 2027 is ${K.usd(c.moopMin!)}, above the national median cap of ${K.usd(K.nat.moopMed)}.`,
  resume: `Queens shares with Staten Island (lowest cap ${K.usd(si.moopMin!)}) the highest floor on out-of-pocket caps among New York City's boroughs for 2027: none of its ${c.std} Medicare Advantage plans open to anyone with Parts A and B limits in-network costs below ${K.usd(c.moopMin!)}, the cap of ${c.lowMoop!.n}. Brooklyn's lowest is ${K.usd(bk.moopMin!)}, and the national median is ${K.usd(K.nat.moopMed)}. The median cap in Queens is ${K.usd(c.moopMed!)}. Premiums stay low, with ${c.zero} drug-covering plans at $0, and quality is mixed: ${c.star4} plans hold four stars or more for 2027, while ${c.best!.n} reaches ${c.starMax}. The menu got shorter, from ${c.std26} open plans in 2026 to ${c.std}, as ${c.gone} IDs were not filed again: Elderplan Extra Help and Flex, Wellcare Fidelis Patriot Simple, Humana's USAA Honor Giveback PPO and HumanaChoice among them. ${c.new} plans are new. The county also has ${c.snp} special needs plans, ${c.dsnp} for people with Medicaid.`,
  body: (h) => `
<h2>The plan that left Queens but stayed in Brooklyn</h2>
<p>The Humana USAA Honor Giveback PPO, which holds the lowest cap in Brooklyn, is not filed for Queens in 2027. Without it, the Queens floor stands at ${K.usd(c.moopMin!)}. It is a reminder that boroughs are separate counties for Medicare: a plan sold on one side of Newtown Creek may not exist on the other, and moving between boroughs can change your options and open a special enrollment period.</p>
<h3>Healthfirst, Emblem and the national insurers</h3>
<p>${c.orgList.map(([o, n]) => `${o} (${n})`).join(', ')} lead the count. Healthfirst and EmblemHealth sell several HMOs built around city hospitals and medical groups; Devoted Health arrives with new PPOs that have no rating yet; Anthem's Veteran 2 plan has the lowest cap and ${c.best!.n} the top rating.</p>
<h2>Original Medicare plus Medigap, the other comparison</h2>
<p>With every Advantage cap at ${K.usd(c.moopMin!)} or more, a Queens resident who expects heavy care may price Original Medicare with a Medigap policy. Plan G leaves only the Part B deductible; high-deductible Plan G charges less each month but makes you pay up to ${K.usd(hd)} in 2027 before it starts. Medigap premiums are set by each insurer, so ask more than one for a quote.</p>
${h.mini('hdg')}
<h3>Nassau, Brooklyn, the Bronx</h3>
<p>Nassau County, across the city line, lists ${na.std} open plans; Brooklyn ${bk.std}; the Bronx ${bx.std}. All share the high-cap pattern of the New York market.</p>
`,
  faqs: [
    { q: 'What is the lowest out-of-pocket maximum for a Queens Medicare Advantage plan in 2027?', a: `${K.usd(c.moopMin!)} in network, with ${c.lowMoop!.n} from ${c.lowMoop!.o}, according to the CMS landscape file of September 2026. No open plan in Queens has a lower cap, and the median is ${K.usd(c.moopMed!)}. The cap covers copays and coinsurance for Medicare-covered medical care; drugs have a separate limit.` },
    { q: 'Which Medicare Advantage plans are leaving Queens for 2027?', a: `${c.gone} plan IDs offered in Queens in 2026 are not in the 2027 file, including Elderplan Extra Help, Elderplan Flex, Wellcare Fidelis Patriot Simple and Humana USAA Honor Giveback. Their members can pick one of ${c.std} open plans until December 7, 2026. The full list of exits is at the bottom of this page.` },
    { q: 'Can I keep my Brooklyn Medicare Advantage plan if I move to Queens?', a: `Only if the plan is also filed for Queens County. Kings and Queens are separate service areas: Brooklyn has ${bk.std} open plans and Queens ${c.std} for 2027, and some exist in only one. A permanent move gives you a special enrollment period to choose a plan offered at your new address.` },
  ],
  related: ['state:new-york', 'county:new-york/kings', 'county:new-york/new-york', 'county:new-york/suffolk', 'medigap-plan-g'],
});
