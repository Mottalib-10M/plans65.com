import { defineState } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const s = K.state('oklahoma');
const top = K.counties('oklahoma', 'std');
const none = top.filter((c) => c.std === 0);
const noneNames = none.map((c) => c.name);
const okc = K.county('oklahoma', 'oklahoma');
const tul = K.county('oklahoma', 'tulsa');
const tx = K.county('oklahoma', 'texas');

export default defineState({
  slug: 'oklahoma',
  title: `Medicare Advantage Plans Oklahoma 2027: ${s.std} Plans, Gaps`,
  description: `Oklahoma Medicare Advantage 2027: ${s.std} open plans, ${s.zero} at $0 with drugs, and ${none.length} western counties with no open plan. Tulsa, Oklahoma City and every county listed.`,
  intro: `Oklahoma City and Tulsa have ${okc.std} and ${tul.std} plans; the Panhandle and the far west have none open to everyone.`,
  resume: `Oklahoma has ${s.std} Medicare Advantage plans open to anyone with Parts A and B for 2027, but ${none.length} counties have none at all: ${noneNames.join(', ')}. Residents there, in the Panhandle and along the western border, rely on Original Medicare unless they qualify for one of the special needs plans still filed. In the metro areas the picture flips. Oklahoma County has ${okc.std} open plans and Tulsa County ${tul.std}, with ${okc.zero} and ${tul.zero} at a $0 premium. Statewide, ${s.zero} drug-covering plans are $0, the median in-network cap is ${K.usd(s.moopMed!)}, a little under the national ${K.usd(K.nat.moopMed)}, and the lowest is ${K.usd(s.moopMin!)}. ${s.star4} plans hold four stars or more. ${s.orgList[0][0]} files the most plans, ${s.orgList[0][1]}. The ${s.snp} special needs plans and ${s.pdp} stand-alone drug plans are listed below.`,
  body: (h) => `
<h2>Seven counties outside the Medicare Advantage map</h2>
<p>Texas County, Oklahoma, sits in the Panhandle and is one of the places with no open plan for 2027. It has ${tx.all} special needs plans filed, the same as its neighbors, and each is open only to people who meet its special needs criteria. In ${noneNames.join(', ')}, a new Medicare enrollee without Medicaid has two routes: Original Medicare alone, or Original Medicare with a Medigap policy and one of the ${s.pdp} stand-alone drug plans sold statewide. The second adds monthly premiums but covers most of the 20% share Medicare leaves to you.</p>
${h.mini('partBYear')}
<p>The calculator shows what Part B alone costs over a year without any supplement. A Medigap policy bought within ${K.P.periods.medigapOpenMonths} months of starting Part B cannot be refused for health reasons under federal rules, which is why that first window matters most in counties without Advantage plans.</p>
<h2>The metro menus</h2>
<p>${top.slice(0, 4).map((c) => `${c.name} (${c.std})`).join(', ')} lead the state, with Tulsa close behind at ${tul.std}. A local health system, St. Francis, files plans alongside ${s.orgList.slice(0, 4).filter(([o]) => !o.startsWith('St Francis')).map(([o]) => o).join(', ')}. The state's lowest cap, ${K.usd(s.lowMoop!.moop!)}, is on ${s.lowMoop!.n} at a $0 premium; ${s.best!.n} combines the state's top rating, ${s.best!.star} stars, with a $0 premium.</p>
<h3>A smaller field than 2026</h3>
<p>Oklahoma had ${s.std26} open plans in 2026 and has ${s.std} now, ${K.change(s.std, s.std26)}. ${s.pffs} private fee-for-service plans remain, a type that lets you use any provider who accepts the plan's payment terms.</p>
`,
  faqs: [
    { q: 'Why are there no Medicare Advantage plans in the Oklahoma Panhandle for 2027?', a: `Insurers choose county by county where to sell, and none filed an open-to-all plan for 2027 in ${noneNames.join(', ')}, per the CMS file of September 2026. People there keep Original Medicare and can add a Medigap policy and a stand-alone drug plan. A few special needs plans remain for people with Medicaid.` },
    { q: 'How many Medicare Advantage plans can I choose from in Tulsa for 2027?', a: `Tulsa County has ${tul.std} open plans for 2027, ${tul.zero} of them at $0 with drug coverage, and a lowest cap of ${K.usd(tul.moopMin!)}. It had ${tul.std26} in 2026. Oklahoma County, around Oklahoma City, has ${okc.std}. The county page lists each plan with its premium, cap and 2027 star rating.` },
    { q: 'Is a Medigap policy a better fit than Medicare Advantage in western Oklahoma?', a: `In ${none.length} western Oklahoma counties it is the main option, since no open Advantage plan is filed there for 2027. Elsewhere it is a trade-off: Medigap costs a monthly premium but follows you to any provider taking Medicare, while an Advantage plan relies on a network. Only you can weigh that against your care needs.` },
  ],
  related: ['state:texas', 'state:kansas', 'state:arkansas', 'state:new-mexico', 'medigap', 'part-b'],
});
