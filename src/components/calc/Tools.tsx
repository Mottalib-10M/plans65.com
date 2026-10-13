/**
 * The calculators of the topic pages. Every figure comes from the engine (lib/engine/medicare.ts), which
 * reads params-2027.json. First render = build defaults; shared links are read after mount (RECETTE §17.5).
 */
import { useEffect, useMemo, useState } from 'react';
import NumberField from '../ui/NumberField';
import SelectField from '../ui/SelectField';
import { Choice, ResultCard, Rows, ShareRow } from './parts';
import { readParams, num, str, updateURL } from '../../lib/url-state';
import * as E from '../../lib/engine/medicare';
import P from '../../data/params-2027.json';
import type { Plan, StateFile } from '../../lib/data';

const usd = (x: number) => `${x < 0 ? '-' : ''}$${Math.round(Math.abs(x)).toLocaleString('en-US')}`;
const money = (x: number) => (Number.isInteger(x) ? `$${x.toLocaleString('en-US')}` : `$${x.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`);
const FIL = [{ value: 'single', label: 'Single' }, { value: 'joint', label: 'Joint' }, { value: 'separate', label: 'Separate' }] as const;
const yearOpts = [{ value: '2026', label: '2026' }, { value: '2027', label: '2027' }] as const;
const projected = (y: E.Year) => (y === 2027 ? ' (2027 Part B and IRMAA: Trustees projection, not final)' : '');
const longDate = (iso: string) => new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
declare const __BUILD_DAY__: string;

function useShared(apply: (u: URLSearchParams) => void) { useEffect(() => { const u = readParams(window.location.search); if ([...u.keys()].length) apply(u); }, []); }
const Form = ({ children }: { children: React.ReactNode }) => <form className="grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>{children}</form>;
const Frame = ({ children }: { children: React.ReactNode }) => <div className="rounded-xl border border-navy-200 bg-white p-4 sm:p-5"><div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)]">{children}</div></div>;

/* ── IRMAA ─────────────────────────────────────────────────────────────────── */
export function IrmaaTool({ methodHref }: { methodHref?: string }) {
  const [magi, setMagi] = useState(125000);
  const [fil, setFil] = useState<E.Filing>('single');
  const [year, setYear] = useState<'2026' | '2027'>('2026');
  useShared((u) => { setMagi(num(u, 'magi', 125000)); setFil(str(u, 'f', 'single') as E.Filing); setYear(str(u, 'y', '2026') === '2027' ? '2027' : '2026'); });
  useEffect(() => updateURL({ magi, f: fil, y: year }), [magi, fil, year]);
  const y = Number(year) as E.Year;
  const r = E.irmaa(magi, fil, y);
  return (
    <Frame>
      <Form>
        <NumberField id="ir-magi" label={`Modified AGI on your ${r.magiYear} tax return`} value={magi} onChange={setMagi} unit="$" max={50000000} help="Form 1040 line 11 + tax-free interest" className="sm:col-span-2" />
        <Choice id="ir-f" label="Filing status" value={fil} onChange={setFil} options={FIL as unknown as Array<{ value: E.Filing; label: string }>} />
        <Choice id="ir-y" label="Premium year" value={year} onChange={setYear} options={yearOpts as unknown as Array<{ value: '2026' | '2027'; label: string }>} />
      </Form>
      <ResultCard label={`Your Part B premium in ${year}, per person`} value={`${money(r.partBTotal)}/mo`} sub={r.tier === 0 ? 'No income-related adjustment at this income.' : `IRMAA tier ${r.tier} of 5 · ${usd(r.extraYear)} a year above the standard premium`}>
        <Rows rows={[
          ['Standard Part B premium', money(r.partBStandard)],
          ['Part B adjustment (IRMAA)', money(r.partBAdj)],
          ['Part D adjustment, added to any drug plan premium', money(r.partDAdj)],
          [r.room === null ? 'Top bracket reached' : 'Room before the next bracket', r.room === null ? '' : usd(r.room)],
          ...(r.overBy !== null ? [['Income above this bracket’s floor', usd(r.overBy)] as [string, string]] : []),
        ]} />
        <ShareRow methodHref={methodHref} note={y === 2027 ? 'Uses 2026 income limits and the Trustees’ projected amounts.' : 'CMS and SSA tables of 2026.'} />
      </ResultCard>
    </Frame>
  );
}

/* ── Part D ─────────────────────────────────────────────────────────────────── */
export function PartDTool({ methodHref }: { methodHref?: string }) {
  const [cost, setCost] = useState(450);
  const [ded, setDed] = useState(P.partD['2027'].deductible);
  const [ins, setIns] = useState<'no' | 'yes'>('no');
  useShared((u) => { setCost(num(u, 'c', 450)); setDed(num(u, 'd', P.partD['2027'].deductible)); setIns(str(u, 'i', 'no') === 'yes' ? 'yes' : 'no'); });
  useEffect(() => updateURL({ c: cost, d: ded, i: ins }), [cost, ded, ins]);
  const r = E.drugCost(cost * 12, 2027, ded, ins === 'yes' ? 12 : 0);
  const r26 = E.drugCost(cost * 12, 2026, Math.min(ded, P.partD['2026'].deductible), ins === 'yes' ? 12 : 0);
  const month = r.capMonth ? new Date(Date.UTC(2027, r.capMonth - 1, 1)).toLocaleDateString('en-US', { month: 'long', timeZone: 'UTC' }) : null;
  return (
    <Frame>
      <Form>
        <NumberField id="pd-c" label="Full price of your drugs per month" value={cost} onChange={setCost} unit="$" max={1000000} help="The plan’s negotiated price, before what you pay (insulin apart)" />
        <NumberField id="pd-d" label="Plan’s drug deductible for 2027" value={ded} onChange={setDed} unit="$" max={P.partD['2027'].deductible} help={`Standard: $${P.partD['2027'].deductible}; many plans set less, some $0`} />
        <Choice id="pd-i" label="Covered insulin" value={ins} onChange={setIns} options={[{ value: 'no', label: 'No' }, { value: 'yes', label: 'Yes, $35/mo' }]} />
      </Form>
      <ResultCard label="Your pharmacy costs in 2027 (premiums apart)" value={usd(r.oop)} sub={r.capReached ? `Cap of ${usd(r.cap)} reached in ${month}: $0 after that` : `Under the ${usd(r.cap)} yearly cap`}>
        <Rows rows={[
          ['Deductible paid', usd(r.deductiblePaid), r.deductiblePaid],
          ['25% coinsurance after the deductible', usd(r.coinsurancePaid), r.coinsurancePaid],
          ['With the payment plan, per month', usd(r.smoothed)],
          ['Same drugs under 2026 rules', usd(r26.oop)],
        ]} />
        <ShareRow methodHref={methodHref} note="Standard benefit; a plan’s copays can differ tier by tier." />
      </ResultCard>
    </Frame>
  );
}

/* ── Part B ─────────────────────────────────────────────────────────────────── */
export function PartBTool({ methodHref }: { methodHref?: string }) {
  const [year, setYear] = useState<'2026' | '2027'>('2026');
  const [svc, setSvc] = useState(3000);
  const [magi, setMagi] = useState(70000);
  const [fil, setFil] = useState<E.Filing>('single');
  useShared((u) => { setYear(str(u, 'y', '2026') === '2027' ? '2027' : '2026'); setSvc(num(u, 's', 3000)); setMagi(num(u, 'magi', 70000)); setFil(str(u, 'f', 'single') as E.Filing); });
  useEffect(() => updateURL({ y: year, s: svc, magi, f: fil }), [year, svc, magi, fil]);
  const y = Number(year) as E.Year;
  const ir = E.irmaa(magi, fil, y);
  const B = E.partB(y);
  const med = E.originalMedicalOop({ partBServices: svc, admissions: 0 }, y).partB;
  const prem = ir.partBTotal * 12;
  return (
    <Frame>
      <Form>
        <Choice id="pb-y" label="Year" value={year} onChange={setYear} options={yearOpts as unknown as Array<{ value: '2026' | '2027'; label: string }>} />
        <NumberField id="pb-s" label="Medicare-approved Part B services in the year" value={svc} onChange={setSvc} unit="$" max={5000000} help="Doctor visits, tests, outpatient care, therapy" />
        <NumberField id="pb-m" label={`Modified AGI on your ${ir.magiYear} return`} value={magi} onChange={setMagi} unit="$" max={50000000} />
        <Choice id="pb-f" label="Filing status" value={fil} onChange={setFil} options={FIL as unknown as Array<{ value: E.Filing; label: string }>} />
      </Form>
      <ResultCard label={`Part B over ${year}, without a supplement`} value={usd(prem + med)} sub={`${money(ir.partBTotal)} a month in premium${projected(y)}`}>
        <Rows rows={[
          ['Premiums (12 months)', usd(prem), prem],
          [`Deductible (${money(B.deductible)})`, usd(Math.min(svc, B.deductible)), Math.min(svc, B.deductible)],
          ['20% of approved amounts above it', usd(med - Math.min(svc, B.deductible)), med - Math.min(svc, B.deductible)],
        ]} total={['Total', usd(prem + med)]} />
        <ShareRow methodHref={methodHref} note="Original Medicare has no yearly cap on the 20%." />
      </ResultCard>
    </Frame>
  );
}

/* ── Part A stay ────────────────────────────────────────────────────────────── */
export function PartATool({ methodHref }: { methodHref?: string }) {
  const [year, setYear] = useState<'2026' | '2027'>('2026');
  const [days, setDays] = useState(5);
  const [snf, setSnf] = useState(0);
  useShared((u) => { setYear(str(u, 'y', '2026') === '2027' ? '2027' : '2026'); setDays(num(u, 'h', 5)); setSnf(num(u, 'n', 0)); });
  useEffect(() => updateURL({ y: year, h: days, n: snf }), [year, days, snf]);
  const y = Number(year) as E.Year;
  const r = E.hospitalStay(days, snf, y);
  const A = E.partA(y);
  return (
    <Frame>
      <Form>
        <Choice id="pa-y" label="Year" value={year} onChange={setYear} options={yearOpts as unknown as Array<{ value: '2026' | '2027'; label: string }>} />
        <NumberField id="pa-h" label="Days in hospital (one benefit period)" value={days} onChange={setDays} unit="days" max={365} />
        <NumberField id="pa-n" label="Days in a skilled nursing facility after it" value={snf} onChange={setSnf} unit="days" max={365} help="Needs a qualifying inpatient stay of 3 days or more" />
      </Form>
      <ResultCard label="Your share under Part A, Original Medicare alone" value={usd(r.total)} sub={`Deductible ${money(A.deductible)} per benefit period${y === 2027 ? ', 2027 projected' : ''}`}>
        <Rows rows={[
          ['Hospital', usd(r.hospital), r.hospital],
          ['Skilled nursing facility', usd(r.snf), r.snf],
          ...(r.uncoveredDays ? [['Hospital days not covered at all', String(r.uncoveredDays)] as [string, string]] : []),
          ...(r.snfUncovered ? [['Nursing days past day 100, not covered', String(r.snfUncovered)] as [string, string]] : []),
        ]} />
        <ShareRow methodHref={methodHref} />
      </ResultCard>
    </Frame>
  );
}

/* ── Medigap G vs high-deductible G vs an Advantage cap ────────────────────── */
export function MedigapTool({ methodHref }: { methodHref?: string }) {
  const [g, setG] = useState(165);
  const [hd, setHd] = useState(55);
  const [svc, setSvc] = useState(6000);
  const [adm, setAdm] = useState(0);
  const [year, setYear] = useState<'2026' | '2027'>('2027');
  useShared((u) => { setG(num(u, 'g', 165)); setHd(num(u, 'hd', 55)); setSvc(num(u, 's', 6000)); setAdm(num(u, 'a', 0)); setYear(str(u, 'y', '2027') === '2026' ? '2026' : '2027'); });
  useEffect(() => updateURL({ g, hd, s: svc, a: adm, y: year }), [g, hd, svc, adm, year]);
  const y = Number(year) as E.Year;
  const use = { partBServices: svc, admissions: adm };
  const gTot = g * 12 + E.medigapOop(use, y, 'G');
  const hTot = hd * 12 + E.medigapOop(use, y, 'HDG');
  const ded = (P.medigap.hdDeductible as Record<string, number>)[year];
  const worstG = g * 12 + E.partB(y).deductible, worstH = hd * 12 + ded;
  return (
    <Frame>
      <Form>
        <NumberField id="mg-g" label="Plan G quote, per month" value={g} onChange={setG} unit="$" max={5000} help="Quote from an insurer in your state" className="sm:col-span-2" />
        <NumberField id="mg-h" label="High-deductible G quote, per month" value={hd} onChange={setHd} unit="$" max={5000} />
        <NumberField id="mg-s" label="Medicare-approved Part B services a year" value={svc} onChange={setSvc} unit="$" max={5000000} />
        <NumberField id="mg-a" label="Hospital admissions a year" value={adm} onChange={setAdm} max={20} />
        <Choice id="mg-y" label="Year" value={year} onChange={setYear} options={yearOpts as unknown as Array<{ value: '2026' | '2027'; label: string }>} />
      </Form>
      <ResultCard label={`Cheaper over ${year} at this level of care`} value={gTot <= hTot ? 'Plan G' : 'High-deductible G'} sub={`by ${usd(Math.abs(gTot - hTot))} a year, premiums and cost sharing included`}>
        <Rows rows={[
          ['Plan G: premiums + Part B deductible', usd(gTot), gTot],
          [`High-deductible G (${usd(ded)} deductible)`, usd(hTot), hTot],
          ['Worst case, Plan G', usd(worstG)],
          ['Worst case, high-deductible G', usd(worstH)],
        ]} />
        <ShareRow methodHref={methodHref} note="Part B premium and drug plan not included: they are the same on both." />
      </ResultCard>
    </Frame>
  );
}

/* ── Late enrollment penalties ──────────────────────────────────────────────── */
export function PenaltyTool({ methodHref }: { methodHref?: string }) {
  const [mb, setMb] = useState(26);
  const [md, setMd] = useState(14);
  useShared((u) => { setMb(num(u, 'b', 26)); setMd(num(u, 'd', 14)); });
  useEffect(() => updateURL({ b: mb, d: md }), [mb, md]);
  const b = E.partBPenalty(mb, 2026), d = E.partDPenalty(md, 2027);
  return (
    <Frame>
      <Form>
        <NumberField id="lp-b" label="Months you could have had Part B but did not" value={mb} onChange={setMb} unit="mo" max={600} help="Months covered by a job’s group plan do not count" />
        <NumberField id="lp-d" label="Months without drug coverage as good as Part D" value={md} onChange={setMd} unit="mo" max={600} help="Only gaps of 63 days or more count" />
      </Form>
      <ResultCard label="Penalties added to your premiums, per month" value={money(Math.round((b.monthly + d.monthly) * 100) / 100)} sub={`${usd((b.monthly + d.monthly) * 12)} a year, for as long as you have the coverage`}>
        <Rows rows={[
          [`Part B: ${b.periods} full year${b.periods === 1 ? '' : 's'} × 10% of ${money(P.partB['2026'].premium)}`, money(b.monthly), b.monthly],
          [`Part D: ${d.months} month${d.months === 1 ? '' : 's'} × 1% of ${money(d.nbbp)} (2027)`, money(d.monthly), d.monthly],
        ]} />
        <ShareRow methodHref={methodHref} />
      </ResultCard>
    </Frame>
  );
}

/* ── Enrollment windows ─────────────────────────────────────────────────────── */
export function PeriodsTool({ methodHref }: { methodHref?: string }) {
  const [birth, setBirth] = useState('1961-11-20');
  const [today, setToday] = useState(__BUILD_DAY__);
  useEffect(() => { const u = readParams(window.location.search); setBirth(str(u, 'b', '1961-11-20')); setToday(new Date().toISOString().slice(0, 10)); }, []);
  useEffect(() => updateURL({ b: birth }), [birth]);
  const ok = /^\d{4}-\d{2}-\d{2}$/.test(birth);
  const r = ok ? E.initialPeriod(birth) : null;
  const w = Object.fromEntries(E.windowsOn(today).map((x) => [x.id, x]));
  const inIep = r && today >= r.start && today <= r.end;
  const aep = P.periods.aep;
  const left = E.daysBetween(today, aep.end);
  return (
    <Frame>
      <form className="grid grid-cols-1 gap-x-4 gap-y-3" onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-rows-subgrid row-span-3 content-start gap-y-0">
          <label htmlFor="pe-b" className="mb-1 block text-sm font-medium text-navy-700">Your date of birth</label>
          <input id="pe-b" type="date" value={birth} min="1920-01-01" max="2010-12-31" onChange={(e) => setBirth(e.target.value)} className="h-12 w-full rounded-lg border border-navy-300 bg-white px-3 text-navy-900" />
          <p className="mt-1 text-xs text-navy-500">Born on the 1st of a month? Medicare counts you 65 from the month before.</p>
        </div>
        <ul className="space-y-1.5 text-sm text-navy-800">
          <li><strong>{w.aep.open ? 'Open now' : 'Closed now'}</strong>: annual change period, {longDate(aep.start)} to {longDate(aep.end)}{w.aep.open && left >= 0 ? `, ${left} day${left === 1 ? '' : 's'} left` : ''}.</li>
          <li><strong>{w.maOep.open ? 'Open now' : 'Closed now'}</strong>: Advantage open period, January 1 to March 31 (one switch).</li>
          <li><strong>{w.gep.open ? 'Open now' : 'Closed now'}</strong>: general enrollment for Part A and B, January 1 to March 31.</li>
        </ul>
      </form>
      <ResultCard label="Your initial enrollment period" value={r ? `${longDate(r.start).replace(/ \d+,/, '')} to ${longDate(r.end).replace(/ \d+,/, '')}` : 'Enter a date'} sub={r ? (inIep ? 'You are inside it today.' : today > r.end ? 'It has ended: the general period or a special period applies now.' : `It opens in ${E.daysBetween(today, r.start)} days.`) : ''}>
        {r && <Rows rows={[
          ['Medicare can start', longDate(r.eligible)],
          ['Sign up by, so coverage starts that day', longDate(new Date(Date.parse(`${r.eligible}T00:00:00Z`) - 86400000).toISOString().slice(0, 10))],
          ['Medigap open enrollment (if Part B starts then)', `to ${longDate(r.medigapEnd)}`],
        ]} />}
        <ShareRow methodHref={methodHref} />
      </ResultCard>
    </Frame>
  );
}

/* ── Whole-year cost ────────────────────────────────────────────────────────── */
export function YearCostTool({ methodHref }: { methodHref?: string }) {
  const [path, setPath] = useState<E.Path>('ma');
  const [year, setYear] = useState<'2026' | '2027'>('2027');
  const [magi, setMagi] = useState(90000);
  const [fil, setFil] = useState<E.Filing>('single');
  const [prem, setPrem] = useState(0);
  const [moop, setMoop] = useState(6000);
  const [gap, setGap] = useState(165);
  const [drug, setDrug] = useState(300);
  const [svc, setSvc] = useState(4000);
  const [adm, setAdm] = useState(0);
  useShared((u) => { setPath(str(u, 'p', 'ma') as E.Path); setYear(str(u, 'y', '2027') === '2026' ? '2026' : '2027'); setMagi(num(u, 'magi', 90000)); setFil(str(u, 'f', 'single') as E.Filing); setPrem(num(u, 'pr', 0)); setMoop(num(u, 'mo', 6000)); setGap(num(u, 'g', 165)); setDrug(num(u, 'dr', 300)); setSvc(num(u, 's', 4000)); setAdm(num(u, 'a', 0)); });
  useEffect(() => updateURL({ p: path, y: year, magi, f: fil, pr: prem, mo: moop, g: gap, dr: drug, s: svc, a: adm }), [path, year, magi, fil, prem, moop, gap, drug, svc, adm]);
  const y = Number(year) as E.Year;
  const r = E.yearCost({ year: y, magi, filing: fil, planPremium: prem, medigapPremium: gap, moop: path === 'ma' ? moop : null, annualDrugCost: drug * 12, partBServices: svc, admissions: adm, path });
  const label = { ma: 'Advantage plan', original: 'Original + drug plan', medigapG: 'Medigap G + drug plan', medigapHDG: 'High-ded. G + drug plan' }[path];
  return (
    <Frame>
      <Form>
        <SelectField id="yc-p" label="Coverage" value={path} onChange={(v) => setPath(v as E.Path)} options={[{ value: 'ma', label: 'Medicare Advantage plan' }, { value: 'original', label: 'Original Medicare + Part D' }, { value: 'medigapG', label: 'Medigap Plan G + Part D' }, { value: 'medigapHDG', label: 'High-deductible G + Part D' }]} />
        <Choice id="yc-y" label="Year" value={year} onChange={setYear} options={yearOpts as unknown as Array<{ value: '2026' | '2027'; label: string }>} />
        <NumberField id="yc-m" label={`Modified AGI on your ${y - 2} return`} value={magi} onChange={setMagi} unit="$" max={50000000} />
        <Choice id="yc-f" label="Filing status" value={fil} onChange={setFil} options={FIL as unknown as Array<{ value: E.Filing; label: string }>} />
        <NumberField id="yc-pr" label={path === 'ma' ? 'Plan premium per month' : 'Drug plan premium per month'} value={prem} onChange={setPrem} unit="$" max={5000} help="From the county plan list" />
        {path === 'ma' ? <NumberField id="yc-mo" label="Plan’s maximum out of pocket" value={moop} onChange={setMoop} unit="$" max={20000} /> : path !== 'original' ? <NumberField id="yc-g" label="Medigap premium per month" value={gap} onChange={setGap} unit="$" max={5000} /> : null}
        <NumberField id="yc-d" label="Full price of your drugs per month" value={drug} onChange={setDrug} unit="$" max={1000000} />
        <NumberField id="yc-s" label="Medicare-approved care a year (doctors, tests)" value={svc} onChange={setSvc} unit="$" max={5000000} />
        <NumberField id="yc-a" label="Hospital admissions a year" value={adm} onChange={setAdm} max={20} />
      </Form>
      <ResultCard label={`What you would pay in ${year}: ${label}`} value={usd(r.total)} sub={`${usd(r.monthly)} a month on average${projected(y)}`}>
        <Rows rows={[
          ['Part B premiums', usd(r.partBPremiums), r.partBPremiums],
          ...(r.irmaaB + r.irmaaD > 0 ? [['IRMAA (Part B + Part D)', usd(r.irmaaB + r.irmaaD), r.irmaaB + r.irmaaD] as [string, string, number]] : []),
          ['Plan premiums', usd(r.planPremiums), r.planPremiums],
          ...(r.medigapPremiums ? [['Medigap premiums', usd(r.medigapPremiums), r.medigapPremiums] as [string, string, number]] : []),
          ['Medical cost sharing', usd(r.medical), r.medical],
          ['Drugs at the pharmacy', usd(r.drugs), r.drugs],
        ]} total={['Worst case for medical care', r.medicalCap === null ? 'no cap' : usd(r.medicalCap)]} />
        <ShareRow methodHref={methodHref} note="Advantage copays are taken equal to Original Medicare up to the plan’s cap." />
      </ResultCard>
    </Frame>
  );
}

/* ── Compare two plans of a county ──────────────────────────────────────────── */
export interface CompareInit { st: string; county: string; counties: Array<{ n: string; s: string }>; plans: Plan[]; a: string; b: string }
export function CompareTool({ init, states, methodHref }: { init: CompareInit; states: Array<{ st: string; name: string }>; methodHref?: string }) {
  const [d, setD] = useState(init);
  const [a, setA] = useState(init.a), [b, setB] = useState(init.b);
  const [svc, setSvc] = useState(5000), [adm, setAdm] = useState(0), [drug, setDrug] = useState(250);
  const cache = useMemo(() => new Map<string, StateFile>(), []);
  async function load(st: string, county?: string) {
    let f = cache.get(st);
    if (!f) { f = (await (await fetch(`/data/plans/${st.toLowerCase()}.json`)).json()) as StateFile; cache.set(st, f); }
    const c = f.counties.find((x) => x.s === county) ?? f.counties[0];
    const plans = c ? c.p.map((i) => f!.plans[i]).filter((p) => !p.snp && !p.sanc).sort((x, y) => (x.m ?? 9e9) - (y.m ?? 9e9)) : [];
    setD({ st: f.st, county: c?.s ?? '', counties: f.counties.map((x) => ({ n: x.n, s: x.s })), plans, a: plans[0]?.k ?? '', b: plans[1]?.k ?? '' });
    setA(plans[0]?.k ?? ''); setB(plans[1]?.k ?? '');
  }
  useEffect(() => { const u = readParams(window.location.search); const st = str(u, 'st', ''); if (st && st !== init.st) void load(st, str(u, 'c', '')); setSvc(num(u, 's', 5000)); setAdm(num(u, 'ad', 0)); setDrug(num(u, 'dr', 250)); }, []);
  useEffect(() => updateURL({ st: d.st, c: d.county, s: svc, ad: adm, dr: drug }), [d.st, d.county, svc, adm, drug]);
  const use = { partBServices: svc, admissions: adm };
  const calc = (k: string) => {
    const p = d.plans.find((x) => x.k === k); if (!p) return null;
    const premium = (p.m ?? 0) * 12;
    const med = E.planMedicalOop(use, 2027, p.moop).total;
    const drugs = p.hd ? E.drugCost(drug * 12, 2027, p.dd ?? undefined).oop : drug * 12;
    return { p, premium, med, drugs, total: premium + med + drugs, worst: premium + (p.moop ?? 0) + (p.hd ? P.partD['2027'].oopCap : 0) };
  };
  const A = calc(a), B = calc(b);
  const opts = d.plans.map((p) => ({ value: p.k, label: `${p.n} · ${p.m === 0 ? '$0' : money(p.m ?? 0)}` }));
  const win = A && B ? (A.total <= B.total ? A : B) : null;
  return (
    <div className="rounded-xl border border-navy-200 bg-white p-4 sm:p-5">
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)]">
        <form className="grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
          <SelectField id="cp-st" label="State" value={d.st} onChange={(v) => void load(v)} options={states.map((s) => ({ value: s.st, label: s.name }))} />
          <SelectField id="cp-c" label="County" value={d.county} onChange={(v) => void load(d.st, v)} options={d.counties.map((c) => ({ value: c.s, label: c.n }))} />
          <SelectField id="cp-a" label="Plan A" value={a} onChange={setA} options={opts} />
          <SelectField id="cp-b" label="Plan B" value={b} onChange={setB} options={opts} />
          <NumberField id="cp-s" label="Medicare-approved care a year" value={svc} onChange={setSvc} unit="$" max={5000000} />
          <NumberField id="cp-d" label="Full price of drugs per month" value={drug} onChange={setDrug} unit="$" max={1000000} />
          <NumberField id="cp-a2" label="Hospital admissions a year" value={adm} onChange={setAdm} max={20} />
        </form>
        <ResultCard label="Cheaper over 2027 for this use of care" value={win ? (win === A ? 'Plan A' : 'Plan B') : 'Pick two plans'} sub={A && B ? `by ${usd(Math.abs(A.total - B.total))}, premiums, care and drugs counted` : ''}>
          {A && B && <Rows rows={[
            ['Plan A, expected year', usd(A.total), A.total], ['Plan B, expected year', usd(B.total), B.total],
            ['Plan A, worst case', usd(A.worst)], ['Plan B, worst case', usd(B.worst)],
          ]} />}
          <ShareRow methodHref={methodHref} />
        </ResultCard>
      </div>
      {A && B && <div className="mt-4 overflow-x-auto"><table className="journal w-full text-sm"><caption className="mb-2 text-left text-sm text-navy-700">2027 figures from the CMS landscape file; care cost sharing assumed equal to Original Medicare up to each plan’s cap; drugs under each plan’s deductible and the standard 25%.</caption>
        <thead><tr><th scope="col" className="px-2 py-2 text-left">2027</th><th scope="col" className="px-2 py-2 text-right">Plan A</th><th scope="col" className="px-2 py-2 text-right">Plan B</th></tr></thead>
        <tbody>
          {([['Plan', A.p.n, B.p.n], ['Insurer', A.p.o, B.p.o], ['Type', A.p.t, B.p.t], ['Monthly premium', money(A.p.m ?? 0), money(B.p.m ?? 0)], ['Drug deductible', A.p.hd ? money(A.p.dd ?? 0) : 'no drugs', B.p.hd ? money(B.p.dd ?? 0) : 'no drugs'], ['Max out of pocket', A.p.moop === null ? 'none' : usd(A.p.moop), B.p.moop === null ? 'none' : usd(B.p.moop)], ['2027 stars', typeof A.p.star === 'number' ? A.p.star.toFixed(1) : 'n/a', typeof B.p.star === 'number' ? B.p.star.toFixed(1) : 'n/a'], ['Premiums over the year', usd(A.premium), usd(B.premium)], ['Care cost sharing', usd(A.med), usd(B.med)], ['Drugs at the pharmacy', usd(A.drugs), usd(B.drugs)]] as Array<[string, string, string]>).map(([l, x, z]) => <tr key={l} className="border-b border-navy-100"><th scope="row" className="px-2 py-2 text-left font-normal text-navy-700">{l}</th><td className="px-2 py-2 text-right">{x}</td><td className="px-2 py-2 text-right">{z}</td></tr>)}
        </tbody></table></div>}
    </div>
  );
}
