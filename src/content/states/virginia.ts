import { defineState } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const s = K.state('virginia');
const top = K.counties('virginia', 'std');
const thin = K.counties('virginia', 'std', true);
const rich = K.county('virginia', 'richmond-city');
const fx = K.county('virginia', 'fairfax');

export default defineState({
  slug: 'virginia',
  title: `Medicare Advantage Plans Virginia 2027: ${s.std} Plans by County`,
  description: `Medicare Advantage plans in Virginia for 2027: ${s.std} open to all, ${s.zero} at $0 with drugs, caps from ${K.usd(s.moopMin!)}, across ${s.counties} counties and independent cities. No agent.`,
  intro: `Virginia lists its independent cities apart from the counties, and the plan count changes at those lines: Richmond city has ${rich.std} open plans, Fairfax County ${fx.std}.`,
  resume: `Virginia has ${s.std} Medicare Advantage plans open to anyone with Parts A and B for 2027, a few more than the ${s.std26} of 2026, spread over ${s.counties} counties and independent cities, which CMS treats as separate areas. ${s.zero} of the ${s.mapd} drug-covering plans charge a $0 premium. The lowest cap is ${K.usd(s.moopMin!)}, for ${s.lowMoop!.n} at ${K.prem(s.lowMoop!.m)} a month, and the median ${K.usd(s.moopMed!)}, above the national ${K.usd(K.nat.moopMed)}. Central Virginia and Hampton Roads have the longest lists: ${top.slice(0, 3).map((c) => c.name).join(', ')} with ${top[2].std} or more. Northern Virginia has fewer than you might expect, ${fx.std} in Fairfax County, and the Shenandoah Valley and the Eastern Shore close the list, with ${thin[0].std} in ${thin[0].name}. ${s.orgList.slice(0, 3).map(([o]) => o).join(', ')} file the most plans. ${s.star4} are rated four stars or more. ${s.pdp} stand-alone drug plans are sold, from ${K.prem(s.pdpMin)} a month.`,
  body: (h) => `
<h2>Counties and independent cities</h2>
<p>Virginia is one of the few states where cities are not part of a county, and each one is a separate area for Medicare plans. Richmond city lists ${rich.std} open plans, ${rich.zero} at $0 with drugs; the surrounding Henrico County has a similar list, but some smaller cities differ from the county around them. When you search, pick the city if you live within its limits: a plan filed only for the county does not cover you there. Your mailing address can name a city you do not live in, so check the locality that collects your property tax or appears on your voter card.</p>
${h.mini('capVsOriginal', { moop: s.moopMed })}
<h2>Northern Virginia and the military</h2>
<p>Fairfax County lists ${fx.std} open plans, only ${fx.zero} of them free with drugs, with a lowest cap of ${K.usd(fx.moopMin!)}. Many retirees there have federal or military coverage: TRICARE For Life works with Original Medicare, and federal retirees can keep FEHB or PSHB coverage, which changes the math of an Advantage plan. Several plans on the list are giveback PPOs aimed at veterans, such as the state's best-rated, ${s.best!.n}, at ${K.prem(s.best!.m)} with a ${K.usd(s.best!.moop)} cap.</p>
<h3>Hampton Roads and Southwest Virginia</h3>
<p>${top.slice(0, 4).map((c) => `${c.name} (${c.std})`).join(', ')} lead the state. ${thin.slice(0, 3).map((c) => `${c.name} (${c.std})`).join(', ')} have the shortest lists. Virginia counts ${s.snp} special needs plans, ${s.dsnp} for people with Medicaid, and ${s.pffs} private fee-for-service plans. In the southwest, where Bristol and Norton sit on state lines, check that a plan's network reaches the Tennessee or Kentucky hospital you use. Neighbors: ${h.a('state:maryland', 'Maryland')}, ${h.a('state:district-of-columbia', 'DC')}, ${h.a('state:north-carolina', 'North Carolina')}, ${h.a('state:west-virginia', 'West Virginia')}.</p>
`,
  faqs: [
    { q: 'Do Virginia independent cities have their own Medicare Advantage plans?', a: `Yes. CMS lists each independent city as its own area, apart from the surrounding county, and plans are filed for each one. Richmond city has ${rich.std} plans open to everyone for 2027. Choose the city in the finder if you live within its limits, since a plan filed only for the county does not cover you.` },
    { q: 'How many Medicare Advantage plans are there in Fairfax County, Virginia for 2027?', a: `${fx.std} plans open to everyone, ${fx.zero} of them at $0 with drug coverage, with a lowest in-network cap of ${K.usd(fx.moopMin!)}, according to the CMS landscape file of September 2026. That is fewer than in Richmond or Hampton Roads, which have the longest lists in Virginia.` },
    { q: 'Should a Virginia military retiree with TRICARE For Life join a Medicare Advantage plan?', a: 'Often not needed: TRICARE For Life pays most of what Original Medicare leaves, so many retirees keep Original Medicare and Part B. Some still choose a giveback plan to lower the Part B premium. Compare the plan’s network and rules with TRICARE’s before switching, since the two coordinate differently.' },
  ],
  related: ['state:maryland', 'state:district-of-columbia', 'state:north-carolina', 'state:west-virginia', 'compare-plans', 'hmo-vs-ppo'],
});
