import { defineCounty } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const c = K.county('florida', 'orange');
const se = K.county('florida', 'seminole');
const os = K.county('florida', 'osceola');
const lk = K.county('florida', 'lake');
const hb = K.county('florida', 'hillsborough');
const d27 = K.P.partD['2027'];

export default defineCounty({
  state: 'florida',
  county: 'orange',
  title: `Medicare Advantage Plans Orange County FL 2027: ${c.gone} Ended`,
  description: `Orange County, Florida (Orlando): ${c.std} open Medicare Advantage plans for 2027 after ${c.gone} IDs ended, ${c.zero} at $0 with drugs, caps from ${K.usd(c.moopMin!)}. Every plan listed.`,
  intro: `Orlando's county shows the biggest net drop in open Medicare Advantage plans of any Florida county for 2027, Health First's plans among the losses.`,
  resume: `Orange County, Florida, had the largest net cut of any Florida county for 2027: ${c.std} Medicare Advantage plans remain open to anyone with Parts A and B, down from ${c.std26}, after ${c.gone} plan IDs were not filed again and ${c.new} new ones were added. Plans with drug coverage at a $0 premium fell from ${c.zero26} to ${c.zero}. Health First's Complete Care, Emerald Plus and Premier Access plans are gone from the county, along with Aetna PPOs, several Humana giveback PPOs and the Simply plans. What remains is still broad: the lowest in-network cap is ${K.usd(c.moopMin!)}, with ${c.lowMoop!.n}, the median is ${K.usd(c.moopMed!)}, and ${c.star4} plans carry four stars or more for 2027, with ${c.best!.n} at ${c.starMax}. Humana files ${c.topOrgN} of the open plans. Orange County also lists ${c.snp} special needs plans, ${c.dsnp} for people with Medicaid.`,
  body: (h) => `
<h2>Health First members: what changes</h2>
<p>Health First Health Plans, the Brevard County system, is not filing its 2026 plans for Orange County residents in 2027. Members living in Orange County received a notice and can pick any of the ${c.std} open plans until December 7; a plan chosen in that window starts January 1. Those who miss the date get a special enrollment period, but drug coverage can lapse in between, and a gap of more than ${K.P.periods.partDGapDays} days without creditable drug coverage can add a lifelong Part D penalty.</p>
<h3>Same name, new ID</h3>
<p>DrSelect-CFL appears both in the exit list and among the 2027 plans: the 2026 plan ID ended and a plan with the same name was filed under a new one, now rated ${c.best!.star} stars with a ${K.usd(c.best!.moop!)} cap. Plan names alone can mislead; the ID on your card is what counts.</p>
<h2>Spreading a large drug bill</h2>
<p>Central Florida plans differ more on drug costs than on premiums. Under the 2027 rules a plan may charge up to ${K.usd(d27.deductible)} in drug deductible, and your yearly cost for covered drugs stops at ${K.usd(d27.oopCap)}. If you reach that limit early in the year, the payment plan built into every Part D plan can spread it month by month.</p>
${h.mini('drugSmooth')}
<h3>Seminole, Osceola, Lake</h3>
<p>Seminole County lists ${se.std} open plans, Osceola ${os.std} and Lake ${lk.std}; Hillsborough, toward Tampa, ${hb.std}. ${c.orgList.map(([o, n]) => `${o} ${n}`).join(', ')} lead in Orange County.</p>
`,
  faqs: [
    { q: 'Is Health First Medicare Advantage still available in Orange County, Florida for 2027?', a: `No. Health First Complete Care, Health First Emerald Plus and Health First Premier Access, offered to Orange County residents in 2026, are not in the CMS 2027 landscape file for the county. Members can choose among ${c.std} open plans until December 7, 2026, or use the special enrollment period that follows a non-renewal.` },
    { q: 'How many Medicare Advantage plans ended in Orange County, Florida for 2027?', a: `${c.gone} plan IDs offered in 2026 are not filed for 2027, and ${c.new} new IDs appeared, according to CMS landscape data of September 2026. The open-to-all count went from ${c.std26} to ${c.std}. Some exits are refilings under a new ID with the same plan name, so read the notice from your insurer.` },
    { q: 'What is the cheapest out-of-pocket cap for an Orlando-area Medicare Advantage plan in 2027?', a: `In Orange County, ${c.lowMoop!.n} from ${c.lowMoop!.o} has the lowest in-network cap, ${K.usd(c.moopMin!)}, with a ${K.usd(c.lowMoop!.m)} premium. The median cap of the county's ${c.std} open plans is ${K.usd(c.moopMed!)}. Seminole and Osceola counties have their own lists, with a lowest cap of ${K.usd(se.moopMin!)}.` },
  ],
  related: ['state:florida', 'county:florida/hillsborough', 'plans-leaving', 'late-enrollment-penalty'],
});
