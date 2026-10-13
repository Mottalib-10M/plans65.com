import { defineState } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const s = K.state('massachusetts');
const top = K.counties('massachusetts', 'std');
const thin = K.counties('massachusetts', 'std', true);
const mid = K.county('massachusetts', 'middlesex');
const cape = K.county('massachusetts', 'barnstable');

export default defineState({
  slug: 'massachusetts',
  title: `Medicare Advantage Plans Massachusetts 2027: ${s.std} Plans`,
  description: `Massachusetts Medicare Advantage 2027: ${s.std} plans open to all, ${s.star4} rated four stars or more, ${s.zero} at $0 with drugs, caps from ${K.usd(s.moopMin!)}. Every county is listed.`,
  intro: `Regional nonprofits dominate: Point32Health alone files ${s.orgList[0][1]} of the ${s.std} open plans, and most Massachusetts plans are rated four stars or better.`,
  resume: `Massachusetts has ${s.std} Medicare Advantage plans open to anyone with Parts A and B for 2027, against ${s.std26} in 2026, and ${s.star4} of them carry a 2027 rating of four stars or more, one of the highest shares in the country. The market belongs to regional health plans rather than national brands: ${s.orgList.slice(0, 4).map(([o, n]) => `${o} (${n})`).join(', ')}. Free plans are the exception, with ${s.zero} of the ${s.mapd} drug-covering plans at a $0 premium, but caps are lower than in most of the Northeast: from ${K.usd(s.moopMin!)}, with a median of ${K.usd(s.moopMed!)}. HMOs account for ${s.hmo} of the open plans. ${top[0].name} County has the longest list (${top[0].std}), Barnstable, on Cape Cod, the shortest (${cape.std}). For people on Original Medicare, ${s.pdp} stand-alone drug plans are sold, with a median premium of ${K.prem(s.pdpMed)}, among the highest medians in the country.`,
  body: (h) => `
<h2>A market of regional nonprofits</h2>
<p>Point32Health, the parent of Tufts Health Plan and Harvard Pilgrim, files ${s.orgList[0][1]} open plan segments, Fallon Health ${s.orgList[1][1]}, and Baystate Health, through its Health New England plans, focuses on the western counties. These organizations contract closely with local hospital systems, which explains both the high ratings and the narrow networks of some HMOs: a plan built around the Worcester or Springfield hospitals may not include Boston's teaching hospitals, and the reverse.</p>
<h3>Lower caps, but at a price</h3>
<p>The lowest in-network cap, ${K.usd(s.lowMoop!.moop)}, belongs to ${s.lowMoop!.n}, at ${K.prem(s.lowMoop!.m)} a month. The best-rated widely available plan, ${s.best!.n}, costs ${K.prem(s.best!.m)} but caps spending at ${K.usd(s.best!.moop)}. The two ends of the trade are both on the list; the whole-year calculator says which one suits your expected care.</p>
${h.mini('capVsOriginal', { moop: s.moopMed })}
<h2>From Hampden to Cape Cod</h2>
<p>${top.slice(0, 4).map((c) => `${c.name} (${c.std})`).join(', ')} have the most open plans; Middlesex County lists ${mid.std}, ${mid.zero} of them free with drugs. ${thin.slice(0, 3).map((c) => `${c.name} (${c.std})`).join(', ')} have the fewest. On Cape Cod, where many retirees spend part of the year elsewhere, the shorter list and the HMO networks make a PPO or Original Medicare with a supplement worth comparing.</p>
<p>Drug coverage is expensive here if you buy it alone: the median stand-alone plan costs ${K.prem(s.pdpMed)} a month, against ${K.prem(s.pdpMin)} for the cheapest. Massachusetts also lists ${s.dsnp} plans for people with MassHealth as well as Medicare. People who split the year with Florida or another state should weigh how far each network reaches. Neighbors: ${h.a('state:new-hampshire', 'New Hampshire')}, ${h.a('state:rhode-island', 'Rhode Island')}, ${h.a('state:connecticut', 'Connecticut')}.</p>
`,
  faqs: [
    { q: 'Which insurer offers the most Medicare Advantage plans in Massachusetts for 2027?', a: `Point32Health, the parent of Tufts Health Plan and Harvard Pilgrim, files ${s.orgList[0][1]} of the state's ${s.std} open plan segments, ahead of ${s.orgList[1][0]} and ${s.orgList[2][0]}, according to the CMS landscape file of September 2026. Plan counts differ from enrollment: check the plans and networks of your own county.` },
    { q: 'Are Massachusetts Medicare Advantage plans highly rated in 2027?', a: `Yes, by national standards: ${s.star4} of the ${s.std} open plans carry a 2027 overall rating of four stars or more, and the best reach ${s.starMax}, according to the CMS star ratings of October 8, 2026. A rating belongs to the insurer's contract, so plans of the same contract share it.` },
    { q: 'How many Medicare Advantage plans are available on Cape Cod for 2027?', a: `Barnstable County has ${cape.std} plans open to everyone for 2027, the shortest list in Massachusetts, with ${cape.zero} at $0 with drug coverage and caps from ${K.usd(cape.moopMin!)}. Islands and seasonal residents should check that the plan covers care where they spend the rest of the year.` },
  ],
  related: ['county:massachusetts/middlesex', 'state:rhode-island', 'state:connecticut', 'state:new-hampshire', 'star-ratings', 'medigap'],
});
