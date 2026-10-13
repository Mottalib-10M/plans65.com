import { defineState } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const s = K.state('indiana');
const top = K.counties('indiana', 'std');
const low = K.counties('indiana', 'std', true);
const mar = K.county('indiana', 'marion');
const vigo = K.county('indiana', 'vigo');

export default defineState({
  slug: 'indiana',
  title: `Medicare Advantage Plans Indiana 2027: ${s.std} Plans, Even Reach`,
  description: `Indiana Medicare Advantage 2027: ${s.std} open plans, ${s.zero} at $0 with drugs, at least ${low[0].std} in every one of the ${s.counties} counties, caps from ${K.usd(s.moopMin!)}. Full list per county.`,
  intro: `Few states spread Medicare Advantage as evenly as Indiana: for 2027 even the thinnest county has close to twenty open plans.`,
  resume: `Indiana has ${s.std} Medicare Advantage plans open to anyone with Parts A and B for 2027, ${K.change(s.std, s.std26)} than in 2026, and ${s.zero} of the ${s.mapd} drug-covering plans charge no monthly premium. What sets the state apart is reach: every county lists at least ${low[0].std} open plans, from ${low[0].name} County, around Terre Haute, up to ${top[0].name} County, Indianapolis, with ${top[0].std}. PPOs dominate, ${s.ppo} against ${s.hmo} HMOs, a useful trait for anyone whose doctors are across the line in Illinois, Kentucky, Ohio or Michigan. The lowest in-network cap is ${K.usd(s.moopMin!)}, for ${s.lowMoop!.n} at ${K.prem(s.lowMoop!.m)}, and the median is ${K.usd(s.moopMed!)}. ${s.star4} plans hold four stars or more for 2027. Indiana also lists ${s.snp} special needs plans, ${s.isnp} of them for nursing-home residents, and ${s.pdp} stand-alone Part D plans.`,
  body: (h) => `
<h2>No county left with a short list</h2>
<p>In many Midwestern states, rural counties keep a handful of plans. Indiana's floor is ${low[0].std} in ${low[0].name} County and ${low[1].std} in ${low[1].name}, and most counties sit in the thirties. Much of that rural choice comes from PPOs, which pay part of out-of-network care. For a resident of a small town, that means a real choice of premium, cap and drug list. ${mar.name} County has ${mar.std} open plans and ${mar.zero} at $0 with drugs; ${vigo.name} has ${vigo.zero} of those.</p>
<h3>Indiana's insurers</h3>
<p>${s.orgList.map(([o, n]) => `${o} (${n})`).join(', ')} file the most open segments. Elevance Health is the parent of Anthem, and SIHO is a southern Indiana carrier. The lowest cap comes from ${s.lowMoop!.o}, a regional HMO. The highest-rated plan is ${s.best!.n}, at ${s.best!.star} stars with a ${K.usd(s.best!.moop)} cap.</p>
<h2>Drug costs inside a $0 plan</h2>
<p>A $0 premium does not mean $0 drugs. Every plan with Part D in 2027 follows the yearly cap of ${K.usd(K.P.partD['2027'].oopCap)} on what you pay at the pharmacy, and you can ask the plan to spread that cost in monthly installments instead of paying it in January. The tool shows the difference for an expensive brand drug.</p>
${h.mini('drugSmooth')}
<p>Members who keep Original Medicare choose among ${s.pdp} stand-alone plans, from ${K.prem(s.pdpMin!)} (${s.pdpMinName}) to a median of ${K.prem(s.pdpMed!)}. See ${h.a('part-d-plans', 'Part D plans for 2027')}.</p>
<h3>Plans for nursing homes and Medicaid</h3>
<p>Indiana counts ${s.isnp} I-SNPs, plans for people who live in or need the level of care of a nursing home, a high number for a state of its size, plus ${s.dsnp} D-SNPs for people with both Medicare and Indiana Medicaid and ${s.csnp} C-SNPs for chronic conditions. Neighbors: ${h.a('state:illinois', 'Illinois')}, ${h.a('state:ohio', 'Ohio')}, ${h.a('state:kentucky', 'Kentucky')}, ${h.a('state:michigan', 'Michigan')}.</p>
`,
  faqs: [
    { q: 'Do rural Indiana counties have as many Medicare Advantage plans as Indianapolis?', a: `Not as many, but more than rural counties in most states. For 2027, ${top[0].name} County lists ${top[0].std} open plans and the thinnest county, ${low[0].name}, lists ${low[0].std}, per the CMS landscape file of September 2026. Most of the rural choice comes from PPOs with out-of-network coverage.` },
    { q: 'What is the lowest out-of-pocket cap on an Indiana Medicare Advantage plan for 2027?', a: `${K.usd(s.lowMoop!.moop)} in network, for ${s.lowMoop!.n} from ${s.lowMoop!.o}, with a ${K.prem(s.lowMoop!.m)} premium. It is an HMO, so the cap protects you only for care from its own doctors and hospitals. The median cap among Indiana's ${s.std} open plans is ${K.usd(s.moopMed!)}, according to CMS.` },
    { q: 'How many Indiana Medicare Advantage plans serve people in nursing homes?', a: `${s.isnp} institutional special needs plans for 2027, out of ${s.snp} special needs plans statewide, according to CMS. An I-SNP is open to people who live in a contracted nursing home or need that level of care at home, and it coordinates care with the facility staff.` },
  ],
  related: ['state:illinois', 'state:ohio', 'state:kentucky', 'state:michigan', 'hmo-vs-ppo', 'part-d-plans'],
});
