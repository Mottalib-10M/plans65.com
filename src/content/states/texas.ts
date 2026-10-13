import { defineState } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const s = K.state('texas');
const top = K.counties('texas', 'std');
const low = K.counties('texas', 'std', true);
const har = K.county('texas', 'harris');
const dal = K.county('texas', 'dallas');
const bex = K.county('texas', 'bexar');
const elp = K.county('texas', 'el-paso');
const hid = K.county('texas', 'hidalgo');
const col = K.county('texas', 'collin');
const lowCount = low.filter((c) => c.std === low[0].std).length;

export default defineState({
  slug: 'texas',
  title: `Medicare Advantage Plans Texas 2027: ${s.std} Plans, ${s.dsnp} D-SNPs`,
  description: `Texas Medicare Advantage 2027: ${s.std} open plans after ${s.std26 - s.std} exits, ${s.snp} special needs plans, caps from ${K.usd(s.moopMin!)}. Houston, Dallas, San Antonio and all ${s.counties} counties.`,
  intro: `The largest county map in the country, a deep cut in plan numbers for 2027, and almost as many special needs plans as open ones.`,
  resume: `Texas has ${s.std} Medicare Advantage plans open to anyone with Parts A and B for 2027, ${s.std26 - s.std} fewer than in 2026, and ${s.snp} special needs plans next to them, ${s.dsnp} of those for people who also have Medicaid. In Harris County, the special needs plans (${har.snp}) now outnumber the open ones (${har.std}). The big metros still lead on choice: ${top.slice(0, 3).map((c) => `${c.name} (${c.std})`).join(', ')}, with Dallas at ${dal.std}. ${lowCount} rural counties have only ${low[0].std}. ${s.zero} drug-covering plans charge no premium, and the cap on in-network costs reaches as low as ${K.usd(s.moopMin!)}, on ${s.lowMoop!.n} in the Houston area; the median is ${K.usd(s.moopMed!)}. ${s.star4} plans rate four stars or more, the top at ${s.starMax}. ${s.orgList[0][0]} and ${s.orgList[1][0]} file ${s.orgList[0][1]} and ${s.orgList[1][1]} plans. ${s.pdp} stand-alone drug plans follow the county table.`,
  body: (h) => `
<h2>Special needs plans, the other half of the Texas market</h2>
<p>A D-SNP, or dual-eligible special needs plan, is a Medicare Advantage plan limited to people who have both Medicare and Medicaid. Texas has ${s.dsnp} of them, more than many states have plans of any kind, plus ${s.csnp} chronic-condition plans. Along the border they matter most: El Paso has ${elp.dsnp} D-SNPs against ${elp.std} open plans, Hidalgo ${hid.dsnp} against ${hid.std}. People in these plans usually qualify for Extra Help with drug costs too, which turns Part D copays into small fixed amounts.</p>
${h.mini('snpDual')}
<h2>Where the ${s.std26 - s.std} exits landed</h2>
<p>The loss was concentrated in the metros. Harris County saw ${har.gone} plan IDs from 2026 not filed again, Collin ${col.gone}, Dallas ${dal.gone}, Bexar ${bex.gone}. Most people in those counties still have dozens of choices, but a member of an ended plan has to act: the insurer's notice opens a special enrollment period (${h.src('cfr_422_62', '42 CFR 422.62')}), and the county pages list every ID that ended.</p>
<h3>Low caps around Houston and Dallas-Fort Worth</h3>
<p>${s.lowMoop!.n}, from ${s.lowMoop!.o}, caps in-network costs at ${K.usd(s.lowMoop!.moop!)} with a $0 premium. ${s.cheapHigh!.n} offers ${K.usd(s.cheapHigh!.moop!)} with ${s.cheapHigh!.star} stars. In Dallas, Tarrant and Collin, the lowest cap is ${K.usd(dal.moopMin!)}. Physician-group HMOs drive these numbers, so the network is narrow.</p>
<h3>West Texas and the Panhandle</h3>
<p>${low.slice(0, 6).map((c) => c.name).join(', ')} have ${low[0].std} open plans each, mostly PPOs from national carriers. ${s.orgList.slice(0, 6).map(([o, n]) => `${o} (${n})`).join(', ')} file the most plans statewide; Baylor Scott & White is a Texas health system with its own plans.</p>
`,
  faqs: [
    { q: 'How many Medicare Advantage plans did Texas lose for 2027?', a: `Texas went from ${s.std26} open plans in 2026 to ${s.std} in 2027, ${K.change(s.std, s.std26)}, according to the CMS landscape files. Harris County alone lost ${har.gone} plan IDs and Collin ${col.gone}. If your plan ended, you get a special enrollment period, and the fall window runs until ${K.day(K.P.periods.aep.end)}.` },
    { q: 'What is a D-SNP and how many are there in Texas for 2027?', a: `A D-SNP is a Medicare Advantage plan only for people enrolled in both Medicare and Medicaid; it coordinates the two programs. Texas has ${s.dsnp} D-SNPs for 2027, per the CMS file of September 2026, more than in any other county list we publish except the largest states. Harris County alone has ${har.dsnp}.` },
    { q: 'Which Texas county has the most Medicare Advantage plans for 2027?', a: `Harris County, around Houston, with ${har.std} open plans, followed by ${top[1].name} with ${top[1].std} and ${top[2].name} with ${top[2].std}. Dallas has ${dal.std} and El Paso ${elp.std}. At the other end, ${lowCount} counties in West Texas and the Panhandle have ${low[0].std} each, and every Texas county has at least one.` },
  ],
  related: ['county:texas/harris', 'county:texas/dallas', 'county:texas/tarrant', 'county:texas/bexar', 'state:oklahoma', 'special-needs-plans'],
});
