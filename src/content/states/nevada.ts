import { defineState } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const s = K.state('nevada');
const clark = K.county('nevada', 'clark');
const washoe = K.county('nevada', 'washoe');
const nye = K.county('nevada', 'nye');
const none = K.counties('nevada', 'std').filter((c) => c.std === 0).map((c) => c.name);

export default defineState({
  slug: 'nevada',
  title: `Medicare Advantage Plans Nevada 2027: Caps From ${K.usd(s.moopMin!)}`,
  description: `Nevada Medicare Advantage plans for 2027: ${s.std} open plans, a median cap of ${K.usd(s.moopMed!)}, ${s.zero} at $0 with drugs. Las Vegas, Reno and all ${s.counties} counties, no agent call.`,
  intro: `Las Vegas has some of the lowest out-of-pocket caps in the country, Reno has about half the choice, and five rural counties have no open plan.`,
  resume: `Nevada's 2027 Medicare Advantage market is really a Las Vegas market: Clark County alone lists ${clark.std} of the state's ${s.std} open-to-all plans, and ${clark.zero} of them charge $0 a month. What sets the state apart is the cap on in-network spending. The median among Nevada plans is ${K.usd(s.moopMed!)}, against ${K.usd(K.nat.moopMed)} for the country, and the lowest cap filed is ${K.usd(s.moopMin!)}. Washoe County around Reno has ${washoe.std} plans. Five counties, ${none.join(', ')}, have none. ${s.star4} plans earn four stars or more, the top one ${s.starMax} stars. ${s.snp} special needs plans include ${s.csnp} for chronic conditions such as diabetes or heart failure. Every plan sits in the county table below, and ${s.pdp} stand-alone drug plans follow for people on Original Medicare.`,
  body: (h) => `
<h2>Why southern Nevada caps sit so low</h2>
<p>The ${K.usd(s.moopMin!)} ceiling belongs to ${s.lowMoop!.n}, from ${s.lowMoop!.o}, and it is not a lonely outlier: Clark County's median cap is ${K.usd(clark.moopMed!)}. Las Vegas is a market of HMOs built around large medical groups paid a set amount per member, and ${s.hmo} of Nevada's open plans are HMOs against ${s.ppo} PPOs. When the group carries the cost risk, insurers can afford to promise a low ceiling. The trade is a closed network: outside emergencies, the plan pays only for its own doctors and hospitals.</p>
<h3>A five-star plan in the mix</h3>
<p>${s.best!.n} from ${s.best!.o} rates ${s.best!.star} stars for 2027 with a $0 premium and a ${K.usd(s.best!.moop!)} cap. Five stars also opens a special enrollment window: you can switch into a plan whose contract holds five stars once in the contract year, from the December 8 before it through November 30 (${h.src('cfr_422_62', '42 CFR 422.62')}).</p>
${h.mini('zeroTrue')}
<p>Even a $0 plan with a low cap leaves the Part B premium, projected at ${K.cents(K.P.partB['2027'].premium)} a month for 2027, plus copays until the cap is reached. The figure above is what a light year and a worst year really cost.</p>
<h2>Reno, Pahrump and the empty middle</h2>
<p>Nye County, home to Pahrump, borrows much of the Las Vegas menu and reaches ${nye.std} plans. Washoe, Carson City and the counties around Lake Tahoe have fewer, with caps nearer ${K.usd(washoe.moopMed!)}. Across the northeast and the central basins the map empties. In ${none.join(', ')}, no insurer filed an open plan for 2027, and Original Medicare with a Medigap policy is the main route, with drug coverage from one of the stand-alone plans. ${s.orgList.slice(0, 4).map(([o, n]) => `${o} (${n})`).join(', ')} file the most plans statewide; Nevada had ${s.std26} in 2026, ${K.change(s.std, s.std26)} than now.</p>
`,
  faqs: [
    { q: 'What is the lowest out-of-pocket maximum for a Medicare Advantage plan in Las Vegas in 2027?', a: `The lowest in-network cap filed in Nevada for 2027 is ${K.usd(s.moopMin!)}, and Clark County's lowest is ${K.usd(clark.moopMin!)}, according to the CMS landscape file of September 2026. Half of Clark County's open plans sit at or below ${K.usd(clark.moopMed!)}. The cap covers medical care in the network; drug costs have their own ${K.usd(K.P.partD['2027'].oopCap)} limit.` },
    { q: 'Are there Medicare Advantage plans in Elko County, Nevada?', a: `No open-to-all Medicare Advantage plan is filed for Elko County for 2027, and the same is true for ${none.filter((n) => n !== 'Elko').join(', ')}. People there keep Original Medicare, can buy a Medigap policy, and pick one of ${s.pdp} stand-alone Part D plans sold statewide. Moving to Washoe or Clark County would open plan choices.` },
    { q: 'How do Reno Medicare Advantage plans compare with Las Vegas plans for 2027?', a: `Washoe County has ${washoe.std} open plans against ${clark.std} in Clark County, with ${washoe.zero} at a $0 premium compared with ${clark.zero}. The median cap is ${K.usd(washoe.moopMed!)} in Washoe and ${K.usd(clark.moopMed!)} in Clark. A plan sold in both counties may use different hospital networks in each.` },
  ],
  related: ['county:nevada/clark', 'state:arizona', 'state:utah', 'state:california', 'star-ratings', 'hmo-vs-ppo'],
});
