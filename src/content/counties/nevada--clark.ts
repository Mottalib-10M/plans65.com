import { defineCounty } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const c = K.county('nevada', 'clark');
const ny = K.county('nevada', 'nye');
const wa = K.county('nevada', 'washoe');
const nv = K.state('nevada');
const d27 = K.P.partD['2027'];

export default defineCounty({
  state: 'nevada',
  county: 'clark',
  title: `Medicare Advantage Plans Clark County 2027: Caps From ${K.usd(c.moopMin!)}`,
  description: `Clark County (Las Vegas) 2027: ${c.std} open Medicare Advantage plans, a median cap of ${K.usd(c.moopMed!)}, none over ${K.usd(c.premMax!)} a month, ${c.zero} at $0 with drugs. The full list, no phone.`,
  intro: `Las Vegas pairs premiums that never pass ${K.usd(c.premMax!)} a month with yearly caps that start at ${K.usd(c.moopMin!)}: cheap to hold and cheap in a bad year.`,
  resume: `Clark County's Medicare Advantage plans are inexpensive for 2027 on both sides of the bill, the monthly premium and the yearly cap. None of its ${c.std} plans open to anyone with Parts A and B charges more than ${K.usd(c.premMax!)} a month, ${c.zero} drug-covering plans charge nothing, and in-network caps start at ${K.usd(c.moopMin!)} with ${c.lowMoop!.n}. The median cap, ${K.usd(c.moopMed!)}, is a fraction of the national median of ${K.usd(K.nat.moopMed)}, and even the highest, ${K.usd(c.moopMax!)}, stays below the top caps filed elsewhere. ${c.star4} plans hold four stars or more in the 2027 ratings, with ${c.best!.n} at ${c.starMax}. The market barely changed: ${c.std26} open plans in 2026, ${c.std} now, ${c.gone} IDs gone and ${c.new} added. Humana, UnitedHealthcare and Aetna lead, and Select Health from Utah files ${c.orgList.find(([o]) => o.startsWith('Intermountain'))?.[1] ?? 0}. There are ${c.snp} special needs plans as well.`,
  body: (h) => `
<h2>When the plan costs little, drugs set the bill</h2>
<p>With caps this low and premiums this small, the part of the year that can still hurt in Las Vegas is the pharmacy counter. Drug costs are not counted in the medical cap. For 2027 the Part D rules let a plan charge a deductible of up to ${K.usd(d27.deductible)}, then ${K.pct(d27.coinsurance, 0)} of the drug price, until your yearly drug spending reaches ${K.usd(d27.oopCap)}. A member on an expensive brand drug can reach that limit in January. The Medicare Prescription Payment Plan lets you spread those costs over the remaining months instead (${h.src('cfr_423_137', '42 CFR 423.137')}).</p>
${h.mini('drugSmooth')}
<h3>Who sells plans in Clark County</h3>
<p>${c.orgList.map(([o, n]) => `${o}: ${n}`).join('; ')}. SCAN and Champion Health Plan come with low caps; Alignment Health's Smart 008 plan carries the best rating. Senior Care Plus Complete, Wellcare Simple, SCAN MyChoice, an AARP plan and Aetna Medicare Signature are the IDs that did not return.</p>
<h2>Henderson, North Las Vegas, Mesquite: one list</h2>
<p>All of Clark County shares the same menu, from Boulder City to Mesquite. Nye County, which includes Pahrump, lists ${ny.std} open plans; Washoe County, around Reno, has ${wa.std}, with a median cap of ${K.usd(wa.moopMed!)}. Statewide, Nevada counts ${nv.std} open plans. A move from Las Vegas to Reno therefore means a shorter list and higher caps, and it opens a special enrollment period to choose again.</p>
`,
  faqs: [
    { q: 'What is the highest premium for a Clark County Medicare Advantage plan in 2027?', a: `${K.usd(c.premMax!)} a month, the highest premium among the ${c.std} plans open to all in Clark County according to the CMS landscape file of September 2026; ${c.zero} drug-covering plans charge $0. You keep paying the Part B premium of ${K.cents(K.P.partB['2026'].premium)} in 2026 on top, unless a giveback plan reduces it.` },
    { q: 'Which Las Vegas Medicare Advantage plan has the lowest out-of-pocket maximum for 2027?', a: `${c.lowMoop!.n}, from ${c.lowMoop!.o}, with an in-network cap of ${K.usd(c.moopMin!)}. Half of the ${c.std} open plans in Clark County cap costs at ${K.usd(c.moopMed!)} or less. Out-of-network care, premiums and prescription drugs are outside that cap; drugs have their own 2027 limit of ${K.usd(d27.oopCap)}.` },
    { q: 'If I move from Las Vegas to Reno, does my Medicare Advantage plan follow me?', a: `Only if the same plan is filed for Washoe County. Clark County has ${c.std} open plans and Washoe ${wa.std}, so many do not exist in both. A permanent move to an area your plan does not serve ends that coverage and gives you a special enrollment period to pick a plan in the new county.` },
  ],
  related: ['state:nevada', 'part-d-plans', 'zero-premium-plans', 'compare-plans'],
});
