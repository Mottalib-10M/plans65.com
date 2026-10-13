import { defineState } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const s = K.state('vermont');
const list = K.counties('vermont', 'std');
const ben = K.county('vermont', 'bennington');

export default defineState({
  slug: 'vermont',
  title: `Medicare Advantage Plans Vermont 2027: ${s.std} Plans, One Insurer`,
  description: `Medicare Advantage in Vermont for 2027: only ${s.std} open plans, all PPOs from one insurer, in ${s.counties} counties. Most Vermonters use Original Medicare, Part D and Medigap.`,
  intro: `Vermont has the shortest Advantage list in the continental United States: ${s.std} plans, one insurer, and most of the state with no plan at all.`,
  resume: `For 2027, the CMS landscape file lists just ${s.std} Medicare Advantage plans open to the public in Vermont, up from ${s.std26} in 2026, all of them PPOs filed by ${s.orgList[0][0]}. They are sold in only ${s.counties} counties: ${list.map((c) => `${c.name} (${c.std})`).join(', ')}. Burlington's Chittenden County and the rest of the north and west have no open Advantage plan at all. ${s.zero} of the plans with drug coverage charge a $0 premium; caps run from ${K.usd(s.moopMin!)} to ${K.usd(s.moopMax!)}, with no special needs plan in the state. Several of the plans are "giveback" plans that return part of the Part B premium. For nearly every Vermonter, the real choice is therefore Original Medicare, a stand-alone drug plan (${s.pdp} are sold, from ${K.prem(s.pdpMin)} a month, median ${K.prem(s.pdpMed)}) and, for the 20% that Part B leaves without a cap, a Medigap policy.`,
  body: (h) => `
<h2>A state where Advantage barely exists</h2>
<p>Vermont's care is concentrated around a few hospitals, the largest in Burlington and, just across the Connecticut River, Lebanon, New Hampshire. Whatever the reasons insurers weigh, the result in the CMS file is plain: no open plan north of Caledonia and Essex counties, and none in the state's largest county. The ${s.std} plans of 2027 all come from ${s.orgList[0][0]}, and all are PPOs, which at least pay out of network at a higher share.</p>
<h2>The usual Vermont setup</h2>
<p>Most residents combine three pieces. Original Medicare, which every hospital and nearly every doctor in the state accepts. A stand-alone Part D plan, chosen for its drug list: the gap between the cheapest (${K.prem(s.pdpMin)}) and the median (${K.prem(s.pdpMed)}) premium is wide. And a Medigap policy, best bought in the six months after Part B starts at 65, when insurers cannot refuse you or price you by health status.</p>
${h.mini('hdg')}
<h3>Southern Vermont and the giveback plans</h3>
<p>In Bennington County, the best-served, ${ben.std} plans are filed, ${ben.zero} of them free with drug coverage; the lowest cap is ${K.usd(ben.moopMin!)}. Several are giveback plans, such as ${s.lowMoop!.n}, which reduce the Part B premium but may have no drug coverage. Check whether you would then need a separate Part D plan, and whether your Dartmouth, Albany or Berkshire specialists are in network. </p>
<h3>Moving into or within Vermont</h3>
<p>A retiree who moves from a state with many plans to Burlington loses any Advantage plan at the move, since none serves Chittenden County. The move opens a special enrollment period, but outside the first six months of Part B, a Medigap insurer may ask health questions. Leaving an Advantage plan because you moved out of its area gives guaranteed Medigap rights in some cases: ask Vermont's State Health Insurance Assistance Program before you move. Neighbors with more choice: ${h.a('state:new-hampshire', 'New Hampshire')}, ${h.a('state:massachusetts', 'Massachusetts')}, ${h.a('state:new-york', 'New York')}.</p>
`,
  faqs: [
    { q: 'Are there Medicare Advantage plans in Chittenden County, Vermont, for 2027?', a: `No open plan is filed for Chittenden County in the CMS 2027 landscape file. Advantage plans exist in only ${s.counties} Vermont counties, all in the south and east, such as Bennington and Windham. Burlington-area residents use Original Medicare with a Part D plan and often a Medigap policy.` },
    { q: 'How many Medicare Advantage plans are there in Vermont for 2027?', a: `${s.std} plans open to the public, all PPOs from one insurer, ${s.orgList[0][0]}, against ${s.std26} in 2026, according to CMS. There are no special needs plans in the state. Each plan is sold only in some of the ${s.counties} counties listed on this page.` },
    { q: 'What do most Vermonters on Medicare choose?', a: `Original Medicare with a stand-alone Part D plan and a Medigap policy, since Advantage plans cover only part of the state. Vermont residents can choose among ${s.pdp} stand-alone drug plans in 2027. The Medigap open enrollment period, six months from the start of Part B at 65, is the best time to buy.` },
  ],
  related: ['state:new-hampshire', 'state:massachusetts', 'state:new-york', 'medigap', 'part-d-plans'],
});
