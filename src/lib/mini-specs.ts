/** Mini-simulators of the pages (RECETTE §9.3): one subject, one calculation, the site engine only. */
import type { MiniSpec } from './mini-types';
import * as E from './engine/medicare';
import P from '../data/params-2027.json';

const usd = (x: number) => `$${Math.round(x).toLocaleString('en-US')}`;
const money = (x: number) => (Number.isInteger(x) ? `$${x.toLocaleString('en-US')}` : `$${x.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`);
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
type Arg = Record<string, number | string> | undefined;

const SPECS: Record<string, (arg: Arg) => MiniSpec> = {
  irmaaQuick: () => ({ title: 'Does your income trigger IRMAA in 2026?', cta: 'Full IRMAA calculator', inputs: [
    { id: 'magi', label: 'Modified AGI on your 2024 return', def: 150000, unit: '$', max: 50000000 },
    { id: 'f', label: 'Filing status', def: 0, options: [{ value: '0', label: 'Single' }, { value: '1', label: 'Married filing jointly' }] }],
    run: (v) => { const r = E.irmaa(v.magi, v.f ? 'joint' : 'single'); return { head: ['Part B premium per person', `${money(r.partBTotal)}/mo`], rows: [['IRMAA tier', r.tier ? `${r.tier} of 5` : 'none'], ['Part D surcharge', money(r.partDAdj)], ['Extra per year', usd(r.extraYear)]] }; } }),
  irmaaCouple: () => ({ title: 'A couple filing jointly: what both of you pay', cta: 'Full IRMAA calculator', inputs: [
    { id: 'magi', label: 'Joint modified AGI (2024 return)', def: 260000, unit: '$', max: 50000000 }],
    run: (v) => { const r = E.irmaa(v.magi, 'joint'); return { head: ['Both Part B premiums, per year', usd(r.partBTotal * 24)], rows: [['Each, per month', money(r.partBTotal)], ['IRMAA for the two, per year', usd(r.extraYear * 2)], [r.room === null ? 'Top bracket' : 'Room before the next bracket', r.room === null ? '' : usd(r.room)]] }; } }),
  irmaaDrop: () => ({ title: 'After retirement: new income, new bracket', cta: 'Full IRMAA calculator', inputs: [
    { id: 'old', label: 'Income on the 2024 return', def: 180000, unit: '$', max: 50000000 },
    { id: 'now', label: 'Expected income this year', def: 95000, unit: '$', max: 50000000 }],
    run: (v) => { const a = E.irmaa(v.old, 'single'), b = E.irmaa(v.now, 'single'); return { head: ['Saved per year if SSA uses the new income', usd(Math.max(0, a.extraYear - b.extraYear))], rows: [['Part B now', money(a.partBTotal)], ['Part B with the new income', money(b.partBTotal)]], note: 'Single filer, 2026 tables. Form SSA-44 asks for this after a life-changing event.' }; } }),
  drugQuick: (arg) => ({ title: 'Your 2027 pharmacy bill under the standard benefit', cta: 'Full Part D calculator', inputs: [
    { id: 'c', label: 'Full price of your drugs per month', def: Number(arg?.c ?? 400), unit: '$', max: 1000000 }],
    run: (v) => { const r = E.drugCost(v.c * 12); return { head: ['You pay in 2027', usd(r.oop)], rows: [['Deductible', usd(r.deductiblePaid)], ['Coinsurance', usd(r.coinsurancePaid)], ['Cap reached', r.capMonth ? MONTHS[r.capMonth - 1] : 'no']] }; } }),
  drugSmooth: () => ({ title: 'Spread the bill: the payment plan', cta: 'Full Part D calculator', inputs: [
    { id: 'c', label: 'Drug price in January (one fill a month)', def: 2500, unit: '$', max: 1000000 }],
    run: (v) => { const r = E.drugCost(v.c * 12); return { head: ['Per month with the payment plan', usd(r.smoothed)], rows: [['January without it', usd(r.months[0])], ['Year total, the same either way', usd(r.oop)]] }; } }),
  drug2026: () => ({ title: 'Same drugs, 2026 rules against 2027 rules', cta: 'Full Part D calculator', inputs: [
    { id: 'c', label: 'Full price of your drugs per month', def: 650, unit: '$', max: 1000000 }],
    run: (v) => { const a = E.drugCost(v.c * 12, 2026), b = E.drugCost(v.c * 12, 2027); return { head: ['Change for 2027', `${b.oop >= a.oop ? '+' : '-'}${usd(Math.abs(b.oop - a.oop))}`], rows: [['2026 ($615 / $2,100)', usd(a.oop)], ['2027 ($700 / $2,400)', usd(b.oop)]] }; } }),
  partBYear: () => ({ title: 'Part B over a year, without a supplement', cta: 'Part B cost calculator', inputs: [
    { id: 's', label: 'Medicare-approved care in the year', def: 2500, unit: '$', max: 5000000 }],
    run: (v) => { const o = E.originalMedicalOop({ partBServices: v.s, admissions: 0 }, 2026); const p = P.partB['2026'].premium * 12; return { head: ['2026 total', usd(o.partB + p)], rows: [['Premiums', usd(p)], ['Deductible and 20%', usd(o.partB)]] }; } }),
  partB2027: () => ({ title: '2027 Part B: projected, not final', cta: 'Part B cost calculator', inputs: [
    { id: 'n', label: 'People on Part B in the household', def: 2, max: 10 }],
    run: (v) => { const a = P.partB['2026'].premium * 12 * v.n, b = P.partB['2027'].premium * 12 * v.n; return { head: ['Extra in 2027 if the projection holds', usd(b - a)], rows: [['2026 premiums', usd(a)], ['2027 at the Trustees’ figure', usd(b)]] }; } }),
  penaltyB: () => ({ title: 'Part B late penalty', cta: 'Penalty calculator', inputs: [
    { id: 'm', label: 'Months without Part B when you could have had it', def: 30, unit: 'mo', max: 600 }],
    run: (v) => { const r = E.partBPenalty(v.m); return { head: ['Added to your premium for life', `+${Math.round(r.pct * 100)}%`], rows: [['Per month in 2026', money(r.monthly)], ['Per year', usd(r.monthly * 12)]] }; } }),
  penaltyD: () => ({ title: 'Part D late penalty in 2027', cta: 'Penalty calculator', inputs: [
    { id: 'm', label: 'Months without creditable drug coverage', def: 20, unit: 'mo', max: 600 }],
    run: (v) => { const r = E.partDPenalty(v.m); return { head: ['Added to any drug plan, per month', money(r.monthly)], rows: [['Per year', usd(r.monthly * 12)], ['Base premium used', money(r.nbbp)]] }; } }),
  hdg: () => ({ title: 'Plan G or high-deductible G?', cta: 'Medigap calculator', inputs: [
    { id: 'g', label: 'Plan G premium per month', def: 170, unit: '$', max: 5000 },
    { id: 'h', label: 'High-deductible G premium per month', def: 50, unit: '$', max: 5000 }],
    run: (v) => { const save = (v.g - v.h) * 12; const ded = P.medigap.hdDeductible['2027'] - P.partB['2027'].deductible; return { head: ['Premium saved per year with HD-G', usd(save)], rows: [['Extra deductible to cover in a bad year', usd(ded)], ['Bad year verdict', save >= ded ? 'HD-G still cheaper' : 'Plan G cheaper']], note: '2027 deductibles; Part B deductible taken at the Trustees’ projection.' }; } }),
  stay: () => ({ title: 'A hospital stay under Part A in 2026', cta: 'Part A calculator', inputs: [
    { id: 'd', label: 'Days in hospital', def: 6, unit: 'days', max: 365 }],
    run: (v) => { const r = E.hospitalStay(v.d, 0, 2026); return { head: ['Your share', usd(r.hospital)], rows: [['Deductible', money(P.partA['2026'].deductible)], ['Daily from day 61', money(P.partA['2026'].coin61)]] }; } }),
  iep: () => ({ title: 'When your sign-up window opens', cta: 'Enrollment date calculator', inputs: [
    { id: 'm', label: 'Birth month', def: 6, options: MONTHS.map((l, i) => ({ value: String(i + 1), label: l })) },
    { id: 'y', label: 'Birth year', def: 1962, options: Array.from({ length: 8 }, (_, i) => ({ value: String(1959 + i), label: String(1959 + i) })) }],
    run: (v) => { const r = E.initialPeriod(`${v.y}-${String(v.m).padStart(2, '0')}-15`); const f = (iso: string) => `${MONTHS[Number(iso.slice(5, 7)) - 1]} ${iso.slice(0, 4)}`; return { head: ['Initial enrollment period', `${f(r.start)} to ${f(r.end)}`], rows: [['Coverage can start', f(r.eligible)], ['Medigap open enrollment ends', f(r.medigapEnd)]], note: 'Born on the 1st: everything moves one month earlier.' }; } }),
  capVsOriginal: (arg) => ({ title: 'What an out-of-pocket cap is worth in a bad year', cta: 'Whole-year cost calculator', inputs: [
    { id: 's', label: 'Medicare-approved care in the year', def: 60000, unit: '$', max: 5000000 },
    { id: 'c', label: 'Plan’s maximum out of pocket', def: Number(arg?.moop ?? 6000), unit: '$', max: 20000 }],
    run: (v) => { const o = E.originalMedicalOop({ partBServices: v.s, admissions: 1 }, 2027).total; const m = Math.min(o, v.c); return { head: ['The cap saves', usd(o - m)], rows: [['Original Medicare alone (20%, 1 admission)', usd(o)], ['With the plan’s cap', usd(m)]] }; } }),
  zeroTrue: () => ({ title: 'A “$0 plan” over a year', cta: 'Whole-year cost calculator', inputs: [
    { id: 's', label: 'Medicare-approved care in the year', def: 4000, unit: '$', max: 5000000 },
    { id: 'c', label: 'Plan’s maximum out of pocket', def: 6750, unit: '$', max: 20000 }],
    run: (v) => { const pb = P.partB['2027'].premium * 12; const m = E.planMedicalOop({ partBServices: v.s, admissions: 0 }, 2027, v.c).total; return { head: ['Still paid in 2027', usd(pb + m)], rows: [['Part B premium (projected)', usd(pb)], ['Cost sharing, up to the cap', usd(m)], ['Worst case', usd(pb + v.c)]] }; } }),
  starsSep: () => ({ title: 'Days left in the annual change period', cta: 'Enrollment periods', inputs: [
    { id: 'd', label: 'Day of October or later (2026)', def: 15, options: Array.from({ length: 54 }, (_, i) => ({ value: String(i), label: new Date(Date.UTC(2026, 9, 15 + i)).toLocaleDateString('en-US', { month: 'long', day: 'numeric', timeZone: 'UTC' }) })) }],
    run: (v) => { const iso = new Date(Date.UTC(2026, 9, 15 + v.d)).toISOString().slice(0, 10); const left = E.daysBetween(iso, P.periods.aep.end); return { head: ['Days left to change for 2027', String(left)], rows: [['Last day', 'December 7, 2026'], ['New plan starts', 'January 1, 2027']] }; } }),
  snpDual: () => ({ title: 'Extra Help: your 2027 drug copays', cta: 'Part D calculator', inputs: [
    { id: 'g', label: 'Generic fills per month', def: 3, max: 50 },
    { id: 'b', label: 'Brand fills per month', def: 1, max: 50 }],
    run: (v) => { const pd = P.partD['2027']; const y = 12 * (v.g * pd.lisCopayGeneric + v.b * pd.lisCopayOther); return { head: ['Most you pay a year (income 100-150% of poverty)', usd(Math.min(y, pd.oopCap))], rows: [['Generic copay', money(pd.lisCopayGeneric)], ['Brand copay', money(pd.lisCopayOther)], ['At or below 100% (full duals)', usd(Math.min(12 * (v.g * pd.lisCopayGenericLow + v.b * pd.lisCopayOtherLow), pd.oopCap))]] }; } }),
};
export function getSpec(kind: string, _lang = 'en', arg?: string): MiniSpec {
  const f = SPECS[kind];
  if (!f) throw new Error(`Unknown mini ${kind}`);
  return f(arg ? JSON.parse(arg) : undefined);
}
export const MINI_KINDS = Object.keys(SPECS);
