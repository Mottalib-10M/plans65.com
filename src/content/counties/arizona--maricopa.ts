import { defineCounty } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const c = K.county('arizona', 'maricopa');
const pn = K.county('arizona', 'pinal');
const yv = K.county('arizona', 'yavapai');
const az = K.state('arizona');

export default defineCounty({
  state: 'arizona',
  county: 'maricopa',
  title: `Medicare Advantage Plans Maricopa County 2027: ${c.std} Plans`,
  description: `Maricopa County (Phoenix) keeps ${c.std} open Medicare Advantage plans for 2027, as many as in 2026: ${c.zero} at $0 with drugs, caps from ${K.usd(c.moopMin!)}, Devoted second. Listed.`,
  intro: `While most large counties lost plans for 2027, the Phoenix area kept exactly as many, with a turnover of a few IDs in each direction.`,
  resume: `Maricopa County is one of the steadiest large Medicare Advantage markets for 2027: the CMS landscape file lists ${c.std} plans open to anyone with Parts A and B, the same number as in 2026 (${c.std26}), with ${c.gone} IDs leaving and ${c.new} new ones taking their place. ${c.zero} of the drug-covering plans charge no premium, against ${c.zero26} last year. In-network caps start at ${K.usd(c.moopMin!)} with ${c.lowMoop!.n} and stop at ${K.usd(c.moopMax!)}, below the ${K.usd(K.nat.moopMax)} top found in many other counties; the median is ${K.usd(c.moopMed!)}. ${c.star4} plans have four stars or more in the 2027 ratings, with ${c.best!.n} at ${c.starMax}. Humana files the most plans (${c.topOrgN}), and Devoted Health, a younger insurer, comes second with ${c.orgList[1][1]}. The county has ${c.hmo} HMOs and ${c.ppo} PPOs open to all, plus ${c.snp} special needs plans, ${c.csnp} of them for chronic conditions.`,
  body: (h) => `
<h2>Why the Valley's menu barely moved</h2>
<p>Insurers cut plans in many counties for 2027, but Maricopa's list was reshuffled rather than trimmed. The exits are a short list: Wellcare Giveback and Simple Value, HealthSpring Preferred, eternalHealth Grand Give Back, three Aetna Medicare plans. If yours is one of them, the notice from the insurer says whether you were moved to another plan automatically; if you were, compare that plan's cap and drug list with the rest before December 7.</p>
<h3>Local systems and newer insurers</h3>
<p>${c.orgList.map(([o, n]) => `${o} ${n}`).join(', ')}. Banner Medicare Advantage is tied to the Banner Health hospitals, SCAN and Alignment Health come from California, and Verda Noble Care is a first-year plan with no rating yet. ${c.cheapHigh!.n} combines a $0 premium with a ${c.cheapHigh!.star}-star rating and a ${K.usd(c.cheapHigh!.moop!)} cap.</p>
<h2>Winter residents and PPOs</h2>
<p>Part-year residents should look at where they spend the rest of the year. An HMO in Maricopa covers routine care only in its Arizona network; the ${c.ppo} PPOs pay at least part of the bill for doctors elsewhere. Your plan must be filed for the county of your permanent address, the one Social Security has on file.</p>
<h3>Turning 65 in Phoenix</h3>
<p>People who reach 65 here get a seven-month initial enrollment window around their birthday month, and the first Advantage plan can be chosen in it.</p>
${h.mini('iep')}
<p>Pinal County lists ${pn.std} open plans and Yavapai ${yv.std}; Arizona as a whole has ${az.std}.</p>
`,
  faqs: [
    { q: 'Did Maricopa County lose Medicare Advantage plans for 2027?', a: `Not in total: the CMS landscape file of September 2026 lists ${c.std} open plans for 2027 and ${c.std26} for 2026. ${c.gone} plan IDs were not renewed, including Wellcare Giveback, HealthSpring Preferred and some Aetna plans, and ${c.new} new ones were filed. Members of a closed plan can choose another until December 7, 2026.` },
    { q: 'What is the lowest out-of-pocket maximum for a Maricopa County Medicare Advantage plan in 2027?', a: `${K.usd(c.moopMin!)} in network, with ${c.lowMoop!.n} from ${c.lowMoop!.o}. Half of the ${c.std} open plans cap costs at ${K.usd(c.moopMed!)} or less, and no plan goes above ${K.usd(c.moopMax!)}. The cap covers copays and coinsurance for Part A and B services, not premiums or drugs.` },
    { q: 'Is Devoted Health available in Maricopa County for 2027?', a: `Yes. Devoted Health files ${c.orgList.find(([o]) => o.startsWith('Devoted'))?.[1] ?? 0} of the ${c.std} open plans in Maricopa County, second only to ${c.topOrg}, according to CMS landscape data. Its plans include HMOs and PPOs with different caps and ratings; ${c.cheapHigh!.n} is one of them.` },
  ],
  related: ['state:arizona', 'hmo-vs-ppo', 'enrollment-periods', 'compare-plans'],
});
