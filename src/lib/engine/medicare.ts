/**
 * Pure calculation engine (RECETTE §4): every rule reads its figures from params-2027.json.
 * Tested in tests/engine.test.ts against the official tables (CMS fact sheet, SSA POMS, Rate Announcement).
 */
import P from '../../data/params-2027.json';

export type Year = 2026 | 2027;
export type Filing = 'single' | 'joint' | 'separate';

const round2 = (x: number) => Math.round(x * 100) / 100;

/* ── Part B and IRMAA ──────────────────────────────────────────────────────── */

export const partB = (y: Year) => P.partB[String(y) as '2026' | '2027'];
export const partA = (y: Year) => P.partA[String(y) as '2026' | '2027'];
export const partD = (y: Year) => P.partD[String(y) as '2026' | '2027'];

/**
 * IRMAA tier (0 = no adjustment, 1..5) for a MAGI and a filing status, with the 2026 thresholds.
 * Brackets: "more than X and less than or equal to Y" up to tier 4, then "more than X and less than Z",
 * tier 5 at "greater than or equal to Z" (SSA POMS HI 01101.020 B). Married filing separately and
 * having lived with the spouse: tier 4 above 109,000, tier 5 at 391,000 or more.
 */
export function irmaaTier(magi: number, filing: Filing): number {
  const t = P.irmaa['2026'];
  if (filing === 'separate') {
    if (magi <= t.separate[0]) return 0;
    return magi >= t.separate[1] ? 5 : 4;
  }
  const b = filing === 'joint' ? t.joint : t.single;
  if (magi <= b[0]) return 0;
  if (magi <= b[1]) return 1;
  if (magi <= b[2]) return 2;
  if (magi <= b[3]) return 3;
  if (magi < b[4]) return 4;
  return 5;
}

export interface IrmaaResult {
  tier: number; year: Year; final: boolean;
  partBStandard: number; partBAdj: number; partBTotal: number; partDAdj: number;
  /** Extra paid per year over the standard premium, per person (B + D). */
  extraYear: number;
  /** Distance to the next lower threshold (how much MAGI would have to fall to drop a tier), or null at tier 0. */
  overBy: number | null;
  /** Room left before the next tier, or null at the top tier. */
  room: number | null;
  magiYear: number;
}

/** Monthly Part B and Part D income-related amounts. 2027 uses the 2026 thresholds and the Trustees'
 *  projected Part B amounts (not final); the Part D amount for 2027 is not projected: the 2026 one is kept. */
export function irmaa(magi: number, filing: Filing, year: Year = 2026): IrmaaResult {
  const tier = irmaaTier(magi, filing);
  const t26 = P.irmaa['2026'];
  const std = partB(year).premium;
  const bAdj = year === 2026 ? t26.partB[tier] : P.irmaa['2027'].partB[tier];
  const dAdj = t26.partD[tier];
  const th = filing === 'separate' ? [t26.separate[0], t26.separate[0], t26.separate[0], t26.separate[0], t26.separate[1]] : filing === 'joint' ? t26.joint : t26.single;
  let overBy: number | null = null, room: number | null = null;
  if (filing === 'separate') {
    overBy = tier === 0 ? null : magi - (tier === 5 ? th[4] : th[0]);
    room = tier === 0 ? th[0] - magi : tier === 4 ? th[4] - magi : null;
  } else {
    overBy = tier === 0 ? null : magi - th[tier - 1];
    room = tier === 5 ? null : th[tier] - magi;
  }
  return {
    tier, year, final: year === 2026, partBStandard: std, partBAdj: bAdj, partBTotal: round2(std + bAdj), partDAdj: dAdj,
    extraYear: round2((bAdj + dAdj) * 12), overBy, room, magiYear: year === 2026 ? 2024 : 2025,
  };
}

/* ── Part D standard benefit ───────────────────────────────────────────────── */

export interface DrugResult {
  /** What you pay at the pharmacy over the year (premiums not included). */
  oop: number; deductiblePaid: number; coinsurancePaid: number; capReached: boolean;
  /** Month (1-12) in which the cap is reached, with spending spread evenly over the year; null if never. */
  capMonth: number | null;
  /** Monthly amounts at the pharmacy, January to December, without the payment plan. */
  months: number[];
  /** Monthly amount under the Medicare Prescription Payment Plan, if joined in January (spread evenly). */
  smoothed: number;
  cap: number; deductible: number;
}

/**
 * Out-of-pocket cost under the defined standard Part D benefit (Rate Announcement, Attachment V):
 * 100% up to the deductible, then 25% coinsurance until the out-of-pocket threshold, then $0.
 * `annualDrugCost` is the full negotiated price of the drugs over the year. `deductible` defaults to the
 * standard one; a plan's own deductible can be passed (from the landscape file). Insulin is handled apart:
 * covered insulin costs at most $35 a month and is not subject to the deductible.
 */
export function drugCost(annualDrugCost: number, year: Year = 2027, deductible?: number, insulinMonths = 0): DrugResult {
  const D = partD(year);
  const ded = deductible ?? D.deductible;
  const cap = D.oopCap;
  const coin = (D as { coinsurance?: number }).coinsurance ?? 0.25;
  const monthly = Math.max(0, annualDrugCost) / 12;
  const insulinM = Math.min(12, Math.max(0, insulinMonths));
  const months: number[] = [];
  const insulin = P.partD['2027'].insulinMonthly;
  let spent = 0, dedLeft = ded, capMonth: number | null = null, insulinPaid = 0;
  for (let m = 1; m <= 12; m++) {
    const fromDed = Math.min(monthly, dedLeft); dedLeft -= fromDed;
    let pay = fromDed + (monthly - fromDed) * coin + (m <= insulinM ? insulin : 0);
    if (spent + pay >= cap) { pay = Math.max(0, cap - spent); if (capMonth === null) capMonth = m; }
    if (m <= insulinM) insulinPaid += Math.min(insulin, pay);
    spent += pay; months.push(round2(pay));
  }
  const oop = round2(Math.min(cap, spent));
  const dedPaid = Math.min(ded, Math.max(0, annualDrugCost), oop);
  const coinPaid = Math.max(0, oop - dedPaid - insulinPaid);
  return { oop, deductiblePaid: round2(dedPaid), coinsurancePaid: round2(coinPaid), capReached: oop >= cap - 0.005, capMonth, months, smoothed: round2(oop / 12), cap, deductible: ded };
}

/* ── Medical costs: Original Medicare vs a plan's cap ─────────────────────── */

export interface MedicalInput {
  /** Medicare-approved Part B services over the year (doctor visits, tests, outpatient, therapy). */
  partBServices: number;
  /** Hospital admissions over the year (each counted as a new benefit period of 60 days or less). */
  admissions: number;
}

/** Original Medicare without supplement: Part B deductible + 20% of the rest (no yearly cap), plus the
 *  Part A deductible for each admission (stays of 60 days or less). */
export function originalMedicalOop(i: MedicalInput, year: Year): { partB: number; partA: number; total: number } {
  const B = partB(year), A = partA(year);
  const b = Math.min(i.partBServices, B.deductible) + Math.max(0, i.partBServices - B.deductible) * B.coinsurance;
  const a = Math.max(0, Math.round(i.admissions)) * A.deductible;
  return { partB: round2(b), partA: round2(a), total: round2(a + b) };
}

/** A Medicare Advantage plan: the landscape file gives the in-network cap (MOOP), not each copay. We assume
 *  cost sharing equal to Original Medicare until the cap, then $0 in network. Stated on every result. */
export function planMedicalOop(i: MedicalInput, year: Year, moop: number | null): { total: number; capped: boolean } {
  const o = originalMedicalOop(i, year).total;
  if (moop === null) return { total: o, capped: false };
  return { total: round2(Math.min(o, moop)), capped: o > moop };
}

/** Medigap: Plan G pays everything Original Medicare leaves except the Part B deductible; high-deductible G
 *  pays nothing until the year's deductible is met by Medicare cost sharing. */
export function medigapOop(i: MedicalInput, year: Year, plan: 'G' | 'HDG'): number {
  const o = originalMedicalOop(i, year);
  const B = partB(year);
  if (plan === 'G') return round2(Math.min(o.partB, B.deductible));
  const hd = P.medigap.hdDeductible[String(year) as '2026' | '2027'];
  return round2(Math.min(o.total, hd));
}

/* ── Whole-year cost ───────────────────────────────────────────────────────── */

export type Path = 'ma' | 'original' | 'medigapG' | 'medigapHDG';
export interface YearInput extends MedicalInput {
  year: Year; magi: number; filing: Filing;
  /** Monthly premium of the MA plan (Part C + D) or of the stand-alone drug plan. */
  planPremium: number;
  /** Monthly Medigap premium (paths medigapG / medigapHDG). */
  medigapPremium: number;
  /** In-network MOOP of the MA plan (path ma). */
  moop: number | null;
  /** Part D deductible of the plan; standard if undefined. */
  drugDeductible?: number;
  annualDrugCost: number;
  insulinMonths?: number;
  path: Path;
  /** Late penalties already set (monthly amounts). */
  partBPenalty?: number; partDPenalty?: number;
}
export interface YearResult {
  partBPremiums: number; irmaaB: number; irmaaD: number; planPremiums: number; medigapPremiums: number;
  medical: number; drugs: number; penalties: number; total: number; monthly: number;
  /** Worst case of medical cost sharing on this path (null = no cap: Original Medicare alone). */
  medicalCap: number | null; tier: number;
}
export function yearCost(i: YearInput): YearResult {
  const ir = irmaa(i.magi, i.filing, i.year);
  const B = partB(i.year);
  const partBPremiums = round2(B.premium * 12);
  const irmaaB = round2(ir.partBAdj * 12), irmaaD = round2(ir.partDAdj * 12);
  const planPremiums = round2(Math.max(0, i.planPremium) * 12);
  const medigapPremiums = i.path === 'medigapG' || i.path === 'medigapHDG' ? round2(Math.max(0, i.medigapPremium) * 12) : 0;
  let medical: number; let medicalCap: number | null;
  if (i.path === 'ma') { medical = planMedicalOop(i, i.year, i.moop).total; medicalCap = i.moop; }
  else if (i.path === 'original') { medical = originalMedicalOop(i, i.year).total; medicalCap = null; }
  else if (i.path === 'medigapG') { medical = medigapOop(i, i.year, 'G'); medicalCap = B.deductible; }
  else { medical = medigapOop(i, i.year, 'HDG'); medicalCap = P.medigap.hdDeductible[String(i.year) as '2026' | '2027']; }
  const drugs = drugCost(i.annualDrugCost, 2027, i.drugDeductible, i.insulinMonths ?? 0).oop;
  const penalties = round2(((i.partBPenalty ?? 0) + (i.partDPenalty ?? 0)) * 12);
  const total = round2(partBPremiums + irmaaB + irmaaD + planPremiums + medigapPremiums + medical + drugs + penalties);
  return { partBPremiums, irmaaB, irmaaD, planPremiums, medigapPremiums, medical, drugs, penalties, total, monthly: round2(total / 12), medicalCap, tier: ir.tier };
}

/* ── Late enrollment penalties ─────────────────────────────────────────────── */

/** Part B: 10% of the standard premium for each FULL 12-month period without Part B when you could have had
 *  it (42 CFR 408.22). Returns the monthly surcharge for `year`. */
export function partBPenalty(monthsLate: number, year: Year = 2026) {
  const periods = Math.floor(Math.max(0, monthsLate) / 12);
  const pct = periods * P.periods.partBPenaltyPerYear;
  return { periods, pct, monthly: round2(partB(year).premium * pct) };
}

/** Part D: 1% of the national base beneficiary premium for each full month without creditable coverage
 *  (gaps of 63 days or more), rounded to the nearest $0.10 (42 CFR 423.286(d)(3)). */
export function partDPenalty(months: number, year: Year = 2027) {
  const m = Math.max(0, Math.floor(months));
  const raw = m * P.periods.partDPenaltyPerMonth * partD(year).nbbp;
  return { months: m, monthly: Math.round(raw * 10) / 10, nbbp: partD(year).nbbp };
}

/* ── Enrollment windows ────────────────────────────────────────────────────── */

const ymd = (d: Date) => d.toISOString().slice(0, 10);
const utc = (y: number, m: number, d = 1) => new Date(Date.UTC(y, m, d));
const lastDay = (y: number, m: number) => utc(y, m + 1, 0);

/**
 * Initial enrollment period around the 65th birthday (42 CFR 407.14): seven months, starting three months
 * before the month you turn 65. You "attain" 65 the day before your birthday, so someone born on the 1st of a
 * month is eligible from the previous month (SSA rule). Coverage start (42 CFR 407.25, since 2023): sign up
 * in the three months before → the first day of the eligibility month; in the eligibility month or later →
 * the first day of the month after you sign up.
 */
export function initialPeriod(birthIso: string) {
  const [by, bm, bd] = birthIso.split('-').map(Number);
  let ey = by + 65, em = bm - 1; // month of eligibility (0-based)
  if (bd === 1) { em -= 1; if (em < 0) { em = 11; ey -= 1; } }
  const start = utc(ey, em - 3, 1);
  const end = lastDay(ey, em + 3);
  const eligible = utc(ey, em, 1);
  const medigapEnd = lastDay(ey, em + P.periods.medigapOpenMonths - 1);
  return { start: ymd(start), end: ymd(end), eligible: ymd(eligible), medigapEnd: ymd(medigapEnd) };
}

export type Window = { id: string; open: boolean; start: string; end: string };
/** Windows open on a given date for someone already on Medicare (42 CFR 422.62, 423.38). */
export function windowsOn(iso: string): Window[] {
  const [y, m] = iso.split('-').map(Number);
  // Annual election period: October 15 to December 7 of each year, for coverage on January 1.
  const aepStart = `${y}-10-15`, aepEnd = `${y}-12-07`;
  const oepStart = `${y}-01-01`, oepEnd = `${y}-03-31`;
  return [
    { id: 'aep', open: iso >= aepStart && iso <= aepEnd, start: aepStart, end: aepEnd },
    { id: 'maOep', open: iso >= oepStart && iso <= oepEnd, start: oepStart, end: oepEnd },
    { id: 'gep', open: m >= P.periods.gep.startMonth && m <= P.periods.gep.endMonth, start: oepStart, end: oepEnd },
    // Five-star special election period: December 8 to November 30 (42 CFR 422.62(b)(15)).
    { id: 'fiveStar', open: !(iso >= `${y}-12-01` && iso <= `${y}-12-07`), start: m === 12 ? `${y}-12-08` : `${y - 1}-12-08`, end: m === 12 ? `${y + 1}-11-30` : `${y}-11-30` },
  ];
}

/** Days left until a date, both in UTC (for the countdown of the annual period). */
export function daysBetween(fromIso: string, toIso: string): number {
  return Math.round((Date.parse(`${toIso}T00:00:00Z`) - Date.parse(`${fromIso}T00:00:00Z`)) / 86400000);
}

/* ── Part A hospital stay ──────────────────────────────────────────────────── */

/** What one benefit period costs under Part A without supplement: deductible for days 1-60, daily coinsurance
 *  for days 61-90, lifetime reserve days 91-150 (up to `reserveLeft`). Skilled nursing: $0 for days 1-20,
 *  daily coinsurance for days 21-100. */
export function hospitalStay(days: number, snfDays: number, year: Year, reserveLeft = 60) {
  const A = partA(year);
  const d = Math.max(0, Math.round(days));
  const hosp = d === 0 ? 0 : A.deductible + Math.max(0, Math.min(d, 90) - 60) * A.coin61 + Math.max(0, Math.min(d - 90, reserveLeft)) * A.coinLR;
  const uncovered = Math.max(0, d - 90 - reserveLeft);
  const s = Math.max(0, Math.round(snfDays));
  const snf = Math.max(0, Math.min(s, 100) - 20) * A.snf;
  return { hospital: round2(hosp), snf: round2(snf), total: round2(hosp + snf), uncoveredDays: uncovered, snfUncovered: Math.max(0, s - 100) };
}
