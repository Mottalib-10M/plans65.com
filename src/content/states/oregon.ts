import { defineState } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const s = K.state('oregon');
const mult = K.county('oregon', 'multnomah');
const jack = K.county('oregon', 'jackson');
const jose = K.county('oregon', 'josephine');
const desc = K.county('oregon', 'deschutes');
const lane = K.county('oregon', 'lane');
const none = K.counties('oregon', 'std').filter((c) => c.std === 0).map((c) => c.name);

export default defineState({
  slug: 'oregon',
  title: `Medicare Advantage Plans Oregon 2027: Medford, Bend Cutbacks`,
  description: `Oregon Medicare Advantage 2027: ${s.std} open plans, Portland with ${mult.std}, Medford down to ${jack.std}, Bend to ${desc.std}; ${s.zero} at $0 with drugs. Every county and plan, no agent call.`,
  intro: `Portland keeps a full menu; southern and central Oregon, where many people retire, lost most of theirs between 2026 and 2027.`,
  resume: `Oregon's ${s.std} open Medicare Advantage plans for 2027 are spread very unevenly, and the places that lost the most are the retirement destinations. Jackson County, around Medford, lists ${jack.std} open plans after ${jack.gone} plan IDs from 2026 were not filed again; Josephine County, around Grants Pass, has ${jose.std} after losing ${jose.gone}. Deschutes County, with Bend, has ${desc.std}. The Portland tri-county area keeps ${mult.std} plans in each county. Statewide the count fell from ${s.std26} to ${s.std}. ${s.zero} drug-covering plans charge no premium, and caps run from ${K.usd(s.moopMin!)} to ${K.usd(s.moopMax!)}, median ${K.usd(s.moopMed!)}. Only ${s.star4} open plans rate four stars or more, a small share by national standards. ${none.join(', ')} County has no open plan. ${s.snp} special needs plans and ${s.pdp} stand-alone drug plans, with a median premium of ${K.cents(s.pdpMed!)}, are listed below.`,
  body: (h) => `
<h2>Rogue Valley and the High Desert after the cuts</h2>
<p>For a retiree in Medford or Grants Pass, the 2027 file reads like a closing-down notice. Jackson and Josephine counties had ${jack.std26} and ${jose.std26} open plans in 2026 and now have ${jack.std} and ${jose.std}, none of them rated four stars or more. Bend's Deschutes County has ${desc.std}. People whose plan ended get a special window to choose again, and returning to Original Medicare is one of the options (${h.src('cfr_422_62', '42 CFR 422.62')}). Further south on the coast, Coos County has a single open plan and ${none.join(', ')} has none.</p>
<h2>Few high ratings</h2>
<p>Of the ${s.std} open plans, ${s.star4} reach four stars or more for 2027, and the highest is ${s.starMax}. Ratings belong to the contract, not the plan, so a newer contract may show no score at all. ${s.best!.n}, from ${s.best!.o}, combines ${s.best!.star} stars with a $0 premium; check that it is sold in your county, because the higher-rated plans cluster around Portland.</p>
${h.mini('starsSep')}
<p>Ratings were published on October 8 and apply to 2027 enrollment, so the countdown above is the time left to compare them before the fall window closes.</p>
<h3>Oregon carriers in the list</h3>
<p>${s.orgList.map(([o, n]) => `${o} (${n})`).join(', ')} file the most plans. ATRIO is an Oregon insurer, and Cambia is the parent of the state's Regence Blue Cross plan. Around Eugene, Lane County has ${lane.std} plans. ${s.hmo} HMOs and ${s.ppo} PPOs make up the open list.</p>
`,
  faqs: [
    { q: 'Why did Medford lose so many Medicare Advantage plans for 2027?', a: `Insurers withdrew ${jack.gone} plan IDs from Jackson County between the 2026 and 2027 CMS files, leaving ${jack.std} open plans. Each company decides by county where to keep selling. If your Medford plan ended, the insurer must send a notice, and you have a special enrollment period to pick another plan or Original Medicare with a Medigap policy.` },
    { q: 'How many Medicare Advantage plans are there in Bend, Oregon for 2027?', a: `Deschutes County, which includes Bend and Redmond, has ${desc.std} open plans for 2027, per the CMS landscape file of September 2026, down from ${desc.std26} in 2026. None carries a rating of four stars or more. Original Medicare with a supplement and one of ${s.pdp} stand-alone drug plans is the other route.` },
    { q: 'Do Oregon Medicare Advantage plans have good star ratings in 2027?', a: `Fewer than in most states. Only ${s.star4} of Oregon's ${s.std} open plans hold four stars or more for 2027, and none reaches five; the best is ${s.starMax}. Most four-star plans are sold in the Portland area. Star ratings measure quality and member experience and are listed for each plan in the county table.` },
  ],
  related: ['state:washington', 'state:california', 'state:idaho', 'state:nevada', 'star-ratings', 'plans-leaving'],
});
