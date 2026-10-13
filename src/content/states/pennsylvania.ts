import { defineState } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const s = K.state('pennsylvania');
const top = K.counties('pennsylvania', 'std');
const low = K.counties('pennsylvania', 'std', true);
const phl = K.county('pennsylvania', 'philadelphia');
const alg = K.county('pennsylvania', 'allegheny');
const n = (name: string) => (s.orgList.find(([o]) => o.startsWith(name)) ?? ['', 0])[1];

export default defineState({
  slug: 'pennsylvania',
  title: `Medicare Advantage Plans Pennsylvania 2027: ${s.std} Open Plans`,
  description: `Pennsylvania Medicare Advantage 2027: ${s.std} open plans, ${s.star4} rated four stars or more, ${s.zero} at $0 with drugs, Blue plans and health-system insurers by county.`,
  intro: `The largest plan count in this part of the country, shaped by Blue Cross companies and by hospital systems that run their own insurance.`,
  resume: `Pennsylvania has ${s.std} Medicare Advantage plans open to anyone with Parts A and B for 2027, one of the biggest menus in the United States, and every one of its ${s.counties} counties has at least ${low[0].std}. The deepest choice is not in Philadelphia or Pittsburgh but in the south-central counties: ${top.slice(0, 3).map((c) => `${c.name} (${c.std})`).join(', ')}. Philadelphia has ${phl.std}, Allegheny ${alg.std}. ${s.zero} drug-covering plans have a $0 premium, and ${s.star4} of the open plans rate four stars or more, the top at ${s.starMax}. The median in-network cap is ${K.usd(s.moopMed!)}, the lowest ${K.usd(s.moopMin!)}. Highmark files ${n('Highmark')} plans, Capital Blue Cross ${n('CAPITAL')}, and UPMC ${n('UPMC')}. Stand-alone drug plans fell from ${s.pdp26} to ${s.pdp}, and they are listed below with the ${s.snp} special needs plans.`,
  body: (h) => `
<h2>When the hospital system is also the insurer</h2>
<p>Pennsylvania is the clearest example of provider-owned Medicare Advantage. UPMC sells plans built around its own hospitals in the west, and Geisinger, now part of ${s.orgList.find(([o]) => o.startsWith('Risant')) ? 'Risant Health' : 'a larger group'}, sells Geisinger Gold in the center and northeast. ${s.lowMoop!.n} has the state's lowest cap, ${K.usd(s.lowMoop!.moop!)}, at ${K.usd(s.lowMoop!.m!)} a month. The appeal of these plans is coordination inside one system. The limit is the same: outside that system's network, an HMO pays only for emergencies and urgent care, so the doctors you see matter more than the brand.</p>
<h3>A Blue map cut into regions</h3>
<p>Blue Cross coverage in Pennsylvania is split by region: Highmark in the west and parts of the center, Capital Blue Cross around Harrisburg and the Lehigh Valley, Independence Blue Cross in the Philadelphia area. In Philadelphia County the leading filer is ${phl.topOrg}; in Allegheny it is ${alg.topOrg}. A Blue card from one region does not mean the same plan is sold a county away.</p>
<h2>Central Pennsylvania's crowded field</h2>
<p>${top.slice(0, 6).map((c) => `${c.name} ${c.std}`).join(', ')}: these counties sit where Highmark, Capital Blue Cross, UPMC, Geisinger and the national carriers all overlap. At the other end, ${low.slice(0, 3).map((c) => `${c.name} (${c.std})`).join(', ')} still offer a broad choice, with caps from ${K.usd(low[0].moopMin!)} in ${low[0].name} County. The state went from ${s.std26} open plans in 2026 to ${s.std}.</p>
<h2>Fewer stand-alone drug plans</h2>
<p>For people who keep Original Medicare, the 2027 drug plan list shrank to ${s.pdp} from ${s.pdp26}. The cheapest premium is ${K.cents(s.pdpMin!)} a month and the median ${K.cents(s.pdpMed!)}. Whatever the plan, the 2027 standard benefit caps what you pay for covered drugs at ${K.usd(K.P.partD['2027'].oopCap)}.</p>
${h.mini('drugQuick', { c: 500 })}
`,
  faqs: [
    { q: 'Which Pennsylvania county has the most Medicare Advantage plans for 2027?', a: `${top[0].name} County, with ${top[0].std} open plans, followed by ${top[1].name} and ${top[2].name}, according to the CMS landscape file of September 2026. Philadelphia has ${phl.std} and Allegheny ${alg.std}. The smallest menu, in ${low[0].name} County, still has ${low[0].std}, so no Pennsylvanian lacks choice; the question is which network fits.` },
    { q: 'Are UPMC and Geisinger Medicare Advantage plans limited to their own hospitals in Pennsylvania?', a: `Their HMO plans are built around each system's network, and outside it only emergency and urgent care are covered. Their PPO plans also pay for covered care outside the network, under the plan's out-of-network terms. UPMC files ${n('UPMC')} open plans in Pennsylvania for 2027. Check each plan's provider directory before enrolling.` },
    { q: 'How many Pennsylvania Medicare Advantage plans have four or more stars for 2027?', a: `${s.star4} of the ${s.std} open plans hold a 2027 rating of four stars or more, and the highest is ${s.starMax} stars, per the CMS Star Ratings of October 2026. ${s.best!.n} reaches ${s.best!.star} stars with a $0 premium, though its cap is ${K.usd(s.best!.moop!)}. Ratings are shown next to each plan in the county table.` },
  ],
  related: ['county:pennsylvania/philadelphia', 'county:pennsylvania/allegheny', 'state:new-jersey', 'state:ohio', 'state:new-york', 'part-d-plans'],
});
