import { defineState } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const s = K.state('georgia');
const top = K.counties('georgia', 'std');
const low = K.counties('georgia', 'std', true);
const ful = K.county('georgia', 'fulton');
const dough = K.county('georgia', 'dougherty');
const atMax = s.moopMed === K.nat.moopMax;

export default defineState({
  slug: 'georgia',
  title: `Medicare Advantage Plans Georgia 2027: ${s.std} Plans by County`,
  description: `Georgia Medicare Advantage for 2027: ${s.std} open plans, ${s.zero} at $0 with drugs, a median cap of ${K.usd(s.moopMed!)} and a ${s.starMax}-star plan. All ${s.counties} counties listed, no phone call.`,
  intro: `Half of Georgia's open Medicare Advantage plans for 2027 set their out-of-pocket cap at the federal maximum, which makes the ceiling the first number to check here.`,
  resume: `Georgia has ${s.std} Medicare Advantage plans open to anyone with Parts A and B for 2027, filed across ${s.counties} counties, more counties than any state but Texas, and ${s.zero} of the drug-covering plans have a $0 premium. The striking figure is the median in-network cap: ${K.usd(s.moopMed!)}${atMax ? ', the highest amount CMS allows for 2027' : ''}, against a national median of ${K.usd(K.nat.moopMed)}. The lowest cap is ${K.usd(s.moopMin!)}, for ${s.lowMoop!.n}. Ratings run to the top of the scale: ${s.best!.n} earns ${s.best!.star} stars, and ${s.star4} plans hold four or more. Metro Atlanta has the longest lists, with ${top[0].name} County at ${top[0].std} open plans and Fulton at ${ful.std}, while ${low[0].name} County, around Albany, has ${low[0].std}. PPOs outnumber HMOs ${s.ppo} to ${s.hmo}. Georgia also lists ${s.snp} special needs plans and ${s.pdp} stand-alone drug plans.`,
  body: (h) => `
<h2>Caps at the federal ceiling</h2>
<p>CMS lets a plan set its in-network maximum out of pocket as high as ${K.usd(K.nat.moopMax)} for 2027. In Georgia, the middle of the distribution sits at ${K.usd(s.moopMed!)}, so at least half the open plans could charge that much in copays and coinsurance before coverage reaches 100%. For a year with a hospital stay or cancer treatment, the gap between a ${K.usd(s.moopMin!)} cap and a ${K.usd(s.moopMax!)} cap is larger than several years of premiums. Test both with your own figures.</p>
${h.mini('capVsOriginal', { moop: s.moopMed })}
<h3>The five-star plan and its fine print</h3>
<p>${s.best!.n}, from ${s.best!.o}, carries ${s.best!.star} stars for 2027, a ${K.prem(s.best!.m)} premium and a ${K.usd(s.best!.moop)} cap. A five-star rating also opens a special enrollment period: you can join a plan rated five stars for 2027 once between December 8, 2026 and November 30, 2027, if it serves your county (${h.src('cfr_422_62', '42 CFR 422.62')}).</p>
<h2>Atlanta suburbs and southwest Georgia</h2>
<p>${top.slice(0, 4).map((c) => `${c.name} (${c.std})`).join(', ')} lead the state. In southwest Georgia, ${dough.name} County has ${dough.std} open plans and ${dough.snp} special needs plans, and its lowest cap is ${K.usd(dough.moopMin!)}, far above the metro floor. Kaiser Permanente serves the Atlanta area with its own offices and appears among the main filers: ${s.orgList.map(([o, n]) => `${o} (${n})`).join(', ')}.</p>
<h3>Drug plans cost more in Georgia</h3>
<p>The median stand-alone Part D premium is ${K.prem(s.pdpMed!)}, one of the highest in the country, though ${s.pdpMinName} costs ${K.prem(s.pdpMin!)}. Only ${s.pdpBench} plan is premium-free with full Extra Help. The open Advantage list went from ${s.std26} to ${s.std}, ${K.change(s.std, s.std26)}. Georgia's ${s.dsnp} D-SNPs serve people with both Medicare and Medicaid.</p>
`,
  faqs: [
    { q: 'Why do so many Georgia Medicare Advantage plans have a high out-of-pocket maximum in 2027?', a: `The median cap among Georgia's ${s.std} open plans is ${K.usd(s.moopMed!)}, per the CMS landscape file of September 2026, and a high ceiling lets an insurer keep the premium down by shifting more of a bad year onto members. Lower caps exist, from ${K.usd(s.moopMin!)}, usually with a premium or a narrower HMO network.` },
    { q: 'Is there a five-star Medicare Advantage plan in Georgia for 2027?', a: `Yes. ${s.best!.n}, offered by ${s.best!.o}, holds ${s.best!.star} stars in the ratings CMS published on October 8, 2026. It charges ${K.prem(s.best!.m)} a month with a ${K.usd(s.best!.moop)} cap. Check that it serves your county before relying on the five-star switch rule.` },
    { q: 'Which Georgia county has the fewest Medicare Advantage plans in 2027?', a: `${low[0].name} County, with ${low[0].std} plans open to everyone, followed by ${low[1].name} with ${low[1].std}, according to CMS. ${top[0].name} County, in metro Atlanta, has the most, ${top[0].std}. Even the thinnest Georgia counties keep several PPOs and at least one $0 plan, all listed in the county table.` },
  ],
  related: ['state:florida', 'state:alabama', 'state:south-carolina', 'state:tennessee', 'star-ratings', 'compare-plans'],
});
