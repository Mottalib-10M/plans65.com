import { defineState } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const s = K.state('kentucky');
const top = K.counties('kentucky', 'std');
const low = K.counties('kentucky', 'std', true);
const jef = K.county('kentucky', 'jefferson');
const fay = K.county('kentucky', 'fayette');
const boone = K.county('kentucky', 'boone');
const hardin = K.county('kentucky', 'hardin');
const hum = s.orgList.find(([o]) => o.startsWith('Humana'));

export default defineState({
  slug: 'kentucky',
  title: `Medicare Advantage Plans Kentucky 2027: ${s.std} Plans Listed`,
  description: `Kentucky Medicare Advantage 2027: ${s.std} open plans, ${s.zero} at $0 with drugs, ${s.star4} rated four stars or more, caps from ${K.usd(s.moopMin!)}. Every county, Northern Kentucky first.`,
  intro: `Kentucky's longest Medicare Advantage lists for 2027 are not in Louisville or Lexington but in the counties across the river from Cincinnati.`,
  resume: `Kentucky has ${s.std} Medicare Advantage plans open to anyone with Parts A and B for 2027, and ${s.zero} of the ${s.mapd} plans with drug coverage charge no monthly premium. Northern Kentucky leads: Boone, Campbell and Kenton counties each list ${boone.std} open plans, ahead of Jefferson County, Louisville, with ${jef.std} and Fayette, Lexington, with ${fay.std}. The thinnest county is ${low[0].name}, around Elizabethtown and Fort Knox, with ${low[0].std}. The lowest in-network cap, ${K.usd(s.moopMin!)}, belongs to ${s.lowMoop!.n}, a plan numbered for Ohio that also serves Kentucky, at ${K.prem(s.lowMoop!.m)} a month; the median cap is ${K.usd(s.moopMed!)}. Quality is a strong point: ${s.star4} of the ${s.std} plans hold four stars or more for 2027. Humana, based in Louisville, files ${hum ? hum[1] : s.topOrgN} of them. Kentucky also has ${s.snp} special needs plans and ${s.pdp} stand-alone drug plans.`,
  body: (h) => `
<h2>Cincinnati's suburbs set the pace</h2>
<p>Boone, Campbell and Kenton counties share the Cincinnati market, so insurers that build networks around Ohio hospitals extend them south of the river. Residents there get ${boone.std} open plans and a lowest cap of ${K.usd(boone.moopMin!)}. A plan whose name carries an Ohio code can be filed for Kentucky counties too; what matters is whether your county appears in its service area and whether your hospital, on either side of the river, is in its network.</p>
<h3>Louisville, Lexington and the rest</h3>
<p>Jefferson County lists ${jef.std} plans with ${jef.zero} at $0, Fayette ${fay.std} with ${fay.zero}. Pike County, deep in the eastern coalfields, still has ${K.county('kentucky', 'pike').std}; the shortest lists are scattered across the state rather than grouped in one region. ${hardin.name} County, with Fort Knox, has ${hardin.std}, and ${low[1].name} ${low[1].std}. Every Kentucky county keeps several $0 plans with drug coverage.</p>
<h2>A home-state insurer and high ratings</h2>
<p>${s.orgList.map(([o, n]) => `${o} (${n})`).join(', ')} file the most open segments; Elevance Health is the parent of Anthem. ${s.best!.n} carries ${s.best!.star} stars at ${K.prem(s.best!.m)} with a ${K.usd(s.best!.moop)} cap. With ${s.star4} plans at four stars or more, a Kentucky shopper can usually narrow the list by rating first and then compare caps and drug lists. HMOs and PPOs split almost evenly, ${s.hmo} and ${s.ppo}, plus ${s.pffs} private fee-for-service plan.</p>
<h3>Joining Part D late</h3>
<p>People who keep Original Medicare choose among ${s.pdp} stand-alone drug plans, from ${K.prem(s.pdpMin!)} a month (${s.pdpMinName}), with a median of ${K.prem(s.pdpMed!)}. If you go ${K.P.periods.partDGapDays} days or more without creditable drug coverage after your first enrollment window, a penalty is added to every future Part D premium. The tool below estimates it for 2027.</p>
${h.mini('penaltyD')}
<p>Kentucky also lists ${s.dsnp} D-SNPs for people with both Medicare and Kentucky Medicaid, ${s.csnp} C-SNPs and ${s.isnp} plans for nursing-home residents. The open list went from ${s.std26} plans in 2026 to ${s.std}. See ${h.a('late-enrollment-penalty', 'late enrollment penalties')} and ${h.a('state:ohio', 'Ohio')}.</p>
`,
  faqs: [
    { q: 'Why does Northern Kentucky have more Medicare Advantage plans than Louisville in 2027?', a: `Boone, Campbell and Kenton counties belong to the Cincinnati market, where insurers file many plans on both sides of the river. Each lists ${boone.std} open plans for 2027 against ${jef.std} in Jefferson County, per the CMS landscape file of September 2026. Check that your hospital is in the network.` },
    { q: 'How many four-star Medicare Advantage plans are there in Kentucky for 2027?', a: `${s.star4} of Kentucky's ${s.std} open plans hold a 2027 rating of four stars or more, published by CMS on October 8, 2026; the highest is ${s.starMax} stars. Ratings are given per contract, so plans from one company in Kentucky usually share the same score.` },
    { q: 'Can a Kentucky resident join a Medicare Advantage plan with an Ohio name?', a: `Yes, if the plan is filed for your Kentucky county. ${s.lowMoop!.n} carries an Ohio code but serves Kentucky counties for 2027, with the state's lowest cap, ${K.usd(s.lowMoop!.moop)}. Your county of residence decides which plans you can join, not the name on the plan.` },
  ],
  related: ['state:ohio', 'state:indiana', 'state:tennessee', 'state:west-virginia', 'late-enrollment-penalty', 'star-ratings'],
});
