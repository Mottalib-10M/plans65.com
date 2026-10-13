import { defineCounty } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const c = K.county('texas', 'bexar');
const cm = K.county('texas', 'comal');
const gd = K.county('texas', 'guadalupe');
const hr = K.county('texas', 'harris');
const da = K.county('texas', 'dallas');
const ta = K.county('texas', 'tarrant');

export default defineCounty({
  state: 'texas',
  county: 'bexar',
  title: `Medicare Advantage Plans Bexar County 2027: A ${c.starMax}-Star PPO`,
  description: `Bexar County (San Antonio) 2027: ${c.std} open Medicare Advantage plans, one rated ${c.starMax} stars, ${c.zero} at $0 with drugs, caps from ${K.usd(c.moopMin!)}. Every plan, no sales call.`,
  intro: `San Antonio's county has a ${c.starMax}-star plan open to everyone in 2027, a rating Houston, Dallas and Fort Worth do not reach, and that plan is a PPO.`,
  resume: `Bexar County has what Harris, Dallas and Tarrant lack for 2027, a plan open to everyone with the maximum ${c.starMax} stars (their best is ${Math.max(hr.starMax!, da.starMax!, ta.starMax!)}): ${c.best!.n}, from ${c.best!.o}, which charges ${K.usd(c.best!.m)} a month and caps in-network costs at ${K.usd(c.best!.moop!)}. Around it, the county lists ${c.std} Medicare Advantage plans open to anyone with Parts A and B, ${c.zero} of them with drugs at no premium. The lowest cap, ${K.usd(c.moopMin!)}, comes from ${c.lowMoop!.n}, a plan of ${c.lowMoop!.o}, which is new to the San Antonio market; the median cap is ${K.usd(c.moopMed!)}. ${c.star4} plans reach four stars or more. Humana files ${c.topOrgN} of the open plans. Compared with 2026, the open list fell from ${c.std26} to ${c.std}: ${c.gone} IDs left and ${c.new} arrived. The county also has ${c.snp} special needs plans, and ${c.dsnp} of them are for people who have Medicaid as well, more than in Harris (${hr.dsnp}) or Dallas (${da.dsnp}).`,
  body: (h) => `
<h2>A five-star rating with a high cap</h2>
<p>Stars and costs measure different things. ${c.best!.n} earns its rating from CMS measures of quality, member experience and service, yet its in-network cap of ${K.usd(c.best!.moop!)} sits near the county median. A highly rated plan is not automatically the cheapest one in a hard year. Five-star plans do have one practical advantage: Medicare lets you move into a five-star plan once during the year, outside the usual windows, through a special enrollment period (${h.src('cfr_422_62', '42 CFR 422.62')}).</p>
${h.mini('capVsOriginal', { moop: c.best!.moop })}
<h3>New names, familiar ones</h3>
<p>Alignment Health, a California insurer, files ${c.orgList.find(([o]) => o.startsWith('Alignment'))?.[1] ?? 0} open plans in Bexar for 2027, including the two HMO-POS plans with the lowest caps. SCAN, also from California, sells its Classic Texas and Walmart plans. Community First, a local plan, and Devoted Health round out the field next to ${c.orgList.slice(0, 2).map(([o]) => o).join(' and ')}.</p>
<h2>Veterans, TRICARE and USAA Honor plans</h2>
<p>Humana's USAA Honor plans, some with a Part B giveback, are aimed at veterans who also use VA care. Military retirees with TRICARE For Life generally pair it with Original Medicare, so an Advantage plan is a choice to weigh carefully; the free SHIP counselors in Texas can walk through both.</p>
<h3>Comal and Guadalupe</h3>
<p>Comal County lists ${cm.std} open plans with caps from ${K.usd(cm.moopMin!)}, and Guadalupe ${gd.std} with caps from ${K.usd(gd.moopMin!)}; both also have a ${cm.starMax}-star plan. Harris County, for comparison, has ${hr.std}. Among the Bexar exits: Wellcare Assist and Giveback, several AARP and Blue Cross PPOs, SCAN MyChoice Texas and the Humana Gold Choice PFFS plan.</p>
`,
  faqs: [
    { q: 'Is there a 5-star Medicare Advantage plan in Bexar County for 2027?', a: `Yes. ${c.best!.n}, from ${c.best!.o}, holds a ${c.starMax}-star rating in the 2027 Star Ratings released by CMS on October 8, 2026. It has a ${K.usd(c.best!.m)} premium and a ${K.usd(c.best!.moop!)} in-network cap. A five-star plan can be joined once during the year through a special enrollment period, not only in the fall.` },
    { q: 'How many dual-eligible special needs plans are in Bexar County in 2027?', a: `${c.dsnp} plans for people with both Medicare and Medicaid, out of ${c.snp} special needs plans in the county, based on CMS landscape data of September 2026. They coordinate both programs and often reduce copays to little or nothing. Texas Medicaid status must be confirmed, and enrollment rules for dual eligibles differ from the annual calendar.` },
    { q: 'Can a military retiree in San Antonio join a Bexar County Medicare Advantage plan?', a: `Yes, anyone with Parts A and B who lives in Bexar County can join one of its ${c.std} open plans. Retirees with TRICARE For Life should know that TRICARE pays after Medicare, which works smoothly with Original Medicare; with an Advantage plan, network rules apply. The Texas SHIP and TRICARE can explain how the two interact.` },
  ],
  related: ['state:texas', 'county:texas/harris', 'star-ratings', 'special-needs-plans'],
});
