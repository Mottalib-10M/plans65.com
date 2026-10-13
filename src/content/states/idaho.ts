import { defineState } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const s = K.state('idaho');
const top = K.counties('idaho', 'std');
const asc = K.counties('idaho', 'std', true);
const none = asc.filter((c) => c.std === 0).map((c) => c.name);
const ada = K.county('idaho', 'ada');
const blaine = K.county('idaho', 'blaine');
const midC = asc[Math.floor(asc.length / 2)].std;

export default defineState({
  slug: 'idaho',
  title: `Medicare Advantage Plans Idaho 2027: ${s.std} Plans, Few at $0`,
  description: `Idaho Medicare Advantage 2027: ${s.std} open plans, only ${s.zero} with drugs at a $0 premium, ${none.length} counties with no open plan, caps from ${K.usd(s.moopMin!)}. Shown county by county.`,
  intro: `Idaho is one of the few states where a $0 Medicare Advantage plan is the exception: for 2027 most plans with drug coverage charge a premium.`,
  resume: `Idaho has ${s.std} Medicare Advantage plans open to everyone with Parts A and B for 2027, and only ${s.zero} of the ${s.mapd} plans that include Part D charge no monthly premium, a small share by national standards. Premiums climb to ${K.prem(s.premMax!)} a month. The lowest in-network cap is ${K.usd(s.moopMin!)}, for ${s.lowMoop!.n} from ${s.lowMoop!.o}, at ${K.prem(s.lowMoop!.m)}; the median is ${K.usd(s.moopMed!)}. Choice follows the Snake River Plain: Ada County, around Boise, and Canyon County each list ${ada.std} open plans, while ${none.length} counties, ${none.slice(0, -1).join(', ')} and ${none[none.length - 1]}, have none, and Blaine County, around Sun Valley, has ${blaine.std}. ${s.star4} plans earn four or more stars for 2027. The open list moved from ${s.std26} plans in 2026 to ${s.std}. Idaho residents who keep Original Medicare can choose among ${s.pdp} stand-alone drug plans.`,
  body: (h) => `
<h2>Paying a premium is the norm</h2>
<p>Only ${s.zero} drug-covering plans in Idaho are free each month for 2027. The rest add a plan premium to Part B, which itself costs ${K.cents(K.P.partB['2026'].premium)} a month in 2026 and is projected at ${K.cents(K.P.partB['2027'].premium)} for 2027 by the Medicare Trustees, a figure CMS confirms in the fall. A couple both on Part B feels that change twice; work it out below.</p>
${h.mini('partB2027')}
<p>${s.orgList.map(([o, n]) => `${o} (${n})`).join(', ')} file the most open segments. In the CMS file, Gemstone Holdings is the parent listed for Blue Cross of Idaho, and St. Luke's Health System, a hospital group, sponsors plans of its own. A plan run by a hospital system usually builds its network around that system's facilities, so check the directory if you use another hospital.</p>
<h2>Central Idaho and the panhandle edge</h2>
<p>The ${none.length} counties with no open plan lie in the central mountains and the north: ${none.join(', ')}. In Blaine County, the single open plan leaves little to compare. Residents there usually choose Original Medicare, a Medigap policy and a Part D plan. Your Medigap open enrollment lasts ${K.P.periods.medigapOpenMonths} months after Part B starts at 65; after that, an insurer may review your health.</p>
<h3>Where the menu is longest</h3>
<p>${top.slice(0, 4).map((c) => `${c.name} (${c.std})`).join(', ')} have the most plans, all in the southwest of the state. People in eastern Idaho near Idaho Falls or Pocatello see shorter lists and should check whether their usual hospital, which may sit across the line in Utah, is in network.</p>
<h3>Special needs and ratings</h3>
<p>Idaho counts ${s.snp} special needs plans: ${s.dsnp} for people who also have Idaho Medicaid, ${s.csnp} for chronic conditions and ${s.isnp} for nursing-home residents. The highest 2027 rating is ${s.starMax} stars, for ${s.best!.n}. See ${h.a('zero-premium-plans', 'what a $0 plan really costs')} and the neighboring lists for ${h.a('state:washington', 'Washington')} and ${h.a('state:oregon', 'Oregon')}.</p>
`,
  faqs: [
    { q: 'Why are there so few $0 premium Medicare Advantage plans in Idaho?', a: `For 2027 only ${s.zero} of Idaho's ${s.mapd} open plans with drug coverage have no premium, according to the CMS landscape file of September 2026. Insurers set premiums county by county, and most Idaho plans that bundle drugs charge one. The highest premium is ${K.prem(s.premMax!)} a month.` },
    { q: 'Which Idaho counties have no Medicare Advantage plan in 2027?', a: `${none.join(', ')}: ${none.length} counties with no plan open to the general public in the CMS 2027 landscape file. Blaine County has ${blaine.std}. Residents of these counties can buy any of the ${s.pdp} stand-alone Part D plans and a Medigap policy to fill the gaps in Original Medicare.` },
    { q: 'How many Medicare Advantage plans can residents of Boise, Idaho choose for 2027?', a: `Ada County, which includes Boise, lists ${ada.std} open plans for 2027, ${ada.zero} of them at $0 with drugs, and its lowest in-network cap is ${K.usd(ada.moopMin!)}, per CMS. That is the longest list in Idaho, shared with neighboring Canyon County, while the middle Idaho county has ${midC}.` },
  ],
  related: ['state:washington', 'state:oregon', 'state:utah', 'state:montana', 'zero-premium-plans', 'part-b-premium'],
});
