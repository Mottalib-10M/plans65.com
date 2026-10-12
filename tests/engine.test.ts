/** Engine tests: one case per official table row (CMS fact sheet of Nov. 14, 2025; SSA POMS HI 01101.020;
 *  CY 2027 Rate Announcement, Attachment V; 42 CFR 408.22 and 423.286). */
import { describe, expect, it } from 'vitest';
import { irmaa, irmaaTier, drugCost, originalMedicalOop, planMedicalOop, medigapOop, yearCost, partBPenalty, partDPenalty, initialPeriod, windowsOn, hospitalStay, daysBetween } from '../src/lib/engine/medicare';

describe('IRMAA 2026 (CMS fact sheet, SSA POMS)', () => {
  it('single filer: every bracket edge', () => {
    expect(irmaa(109000, 'single').partBTotal).toBe(202.9);
    expect(irmaa(109001, 'single').partBTotal).toBe(284.1);
    expect(irmaa(137000, 'single').partBTotal).toBe(284.1);
    expect(irmaa(137001, 'single').partBTotal).toBe(405.8);
    expect(irmaa(171001, 'single').partBTotal).toBe(527.5);
    expect(irmaa(205001, 'single').partBTotal).toBe(649.2);
    expect(irmaa(499999, 'single').partBTotal).toBe(649.2);
    expect(irmaa(500000, 'single').partBTotal).toBe(689.9);
  });
  it('joint filers', () => {
    expect(irmaa(218000, 'joint').tier).toBe(0);
    expect(irmaa(218001, 'joint').partBTotal).toBe(284.1);
    expect(irmaa(342001, 'joint').partBTotal).toBe(527.5);
    expect(irmaa(749999, 'joint').partBTotal).toBe(649.2);
    expect(irmaa(750000, 'joint').partBTotal).toBe(689.9);
  });
  it('married filing separately', () => {
    expect(irmaa(109000, 'separate').tier).toBe(0);
    expect(irmaa(109001, 'separate').partBTotal).toBe(649.2);
    expect(irmaa(391000, 'separate').partBTotal).toBe(689.9);
  });
  it('Part D adjustments', () => {
    expect([0, 120000, 150000, 190000, 300000, 600000].map((m) => irmaa(m, 'single').partDAdj)).toEqual([0, 14.5, 37.5, 60.4, 83.3, 91]);
  });
  it('yearly extra and room to the next tier', () => {
    const r = irmaa(120000, 'single');
    expect(r.extraYear).toBeCloseTo((81.2 + 14.5) * 12, 2);
    expect(r.room).toBe(17000);
    expect(r.overBy).toBe(11000);
    expect(irmaaTier(250000, 'joint')).toBe(1);
  });
  it('2027 uses the Trustees projection, flagged as not final', () => {
    const r = irmaa(120000, 'single', 2027);
    expect(r.final).toBe(false);
    expect(r.partBTotal).toBeCloseTo(209.5 + 83.7, 2);
  });
});

describe('Part D 2027 standard benefit ($700 deductible, 25%, $2,400 cap)', () => {
  it('below the deductible you pay everything', () => {
    expect(drugCost(600).oop).toBe(600);
  });
  it('deductible then 25%', () => {
    const r = drugCost(4000);
    expect(r.oop).toBeCloseTo(700 + 0.25 * 3300, 2);
    expect(r.capReached).toBe(false);
  });
  it('the cap stops everything at $2,400', () => {
    const r = drugCost(20000);
    expect(r.oop).toBe(2400);
    expect(r.capReached).toBe(true);
    expect(r.months.reduce((a, b) => a + b, 0)).toBeCloseTo(2400, 1);
    expect(r.smoothed).toBe(200);
  });
  it('exactly at the point where the cap is reached: 700 + 0.25 x 6,800 = 2,400', () => {
    expect(drugCost(7500).oop).toBeCloseTo(2400, 2);
  });
  it('a plan with a $0 deductible', () => {
    expect(drugCost(4000, 2027, 0).oop).toBe(1000);
  });
  it('2026 rules ($615, $2,100)', () => {
    expect(drugCost(30000, 2026).oop).toBe(2100);
    expect(drugCost(1000, 2026).oop).toBeCloseTo(615 + 0.25 * 385, 2);
  });
  it('insulin at $35 a month counts toward the cap', () => {
    expect(drugCost(0, 2027, undefined, 12).oop).toBe(420);
  });
});

describe('Medical cost sharing', () => {
  it('Original Medicare 2026: $283 then 20%, $1,736 per admission', () => {
    const r = originalMedicalOop({ partBServices: 5283, admissions: 1 }, 2026);
    expect(r.partB).toBeCloseTo(283 + 1000, 2);
    expect(r.partA).toBe(1736);
  });
  it('a plan cap stops the medical cost', () => {
    expect(planMedicalOop({ partBServices: 100000, admissions: 2 }, 2027, 5900).total).toBe(5900);
    expect(planMedicalOop({ partBServices: 1000, admissions: 0 }, 2027, 5900).capped).toBe(false);
  });
  it('Medigap G leaves the Part B deductible; high-deductible G its own deductible', () => {
    expect(medigapOop({ partBServices: 50000, admissions: 1 }, 2026, 'G')).toBe(283);
    expect(medigapOop({ partBServices: 50000, admissions: 1 }, 2027, 'HDG')).toBe(3050);
    expect(medigapOop({ partBServices: 50000, admissions: 1 }, 2026, 'HDG')).toBe(2950);
  });
});

describe('Whole year', () => {
  it('adds premiums, IRMAA, medical and drugs', () => {
    const r = yearCost({ year: 2026, magi: 80000, filing: 'single', planPremium: 0, medigapPremium: 0, moop: 5000, annualDrugCost: 0, partBServices: 0, admissions: 0, path: 'ma' });
    expect(r.total).toBeCloseTo(202.9 * 12, 2);
    const g = yearCost({ year: 2026, magi: 120000, filing: 'single', planPremium: 40, medigapPremium: 150, moop: null, annualDrugCost: 4000, partBServices: 2000, admissions: 0, path: 'medigapG' });
    expect(g.total).toBeCloseTo(202.9 * 12 + (81.2 + 14.5) * 12 + 40 * 12 + 150 * 12 + 283 + (700 + 0.25 * 3300), 1);
  });
});

describe('Late enrollment penalties', () => {
  it('Part B: 10% per full 12 months (42 CFR 408.22)', () => {
    expect(partBPenalty(11).periods).toBe(0);
    expect(partBPenalty(24).monthly).toBeCloseTo(202.9 * 0.2, 2);
    expect(partBPenalty(35).periods).toBe(2);
  });
  it('Part D: 1% of $41.33 per month, rounded to $0.10 (42 CFR 423.286)', () => {
    expect(partDPenalty(14).monthly).toBe(5.8);
    expect(partDPenalty(0).monthly).toBe(0);
    expect(partDPenalty(29, 2026).monthly).toBe(11.3);
  });
});

describe('Enrollment windows', () => {
  it('initial period: seven months around the 65th birthday', () => {
    expect(initialPeriod('1962-06-15')).toEqual({ start: '2027-03-01', end: '2027-09-30', eligible: '2027-06-01', medigapEnd: '2027-11-30' });
  });
  it('born on the 1st: eligible the month before', () => {
    expect(initialPeriod('1962-06-01').eligible).toBe('2027-05-01');
    expect(initialPeriod('1962-01-01').eligible).toBe('2026-12-01');
  });
  it('annual period Oct 15 - Dec 7, Advantage open period Jan 1 - Mar 31', () => {
    const w = (d: string) => Object.fromEntries(windowsOn(d).map((x) => [x.id, x.open]));
    expect(w('2026-10-14').aep).toBe(false);
    expect(w('2026-10-15').aep).toBe(true);
    expect(w('2026-12-07').aep).toBe(true);
    expect(w('2026-12-08').aep).toBe(false);
    expect(w('2027-02-10').maOep).toBe(true);
    expect(w('2026-12-03').fiveStar).toBe(false);
    expect(daysBetween('2026-10-12', '2026-10-15')).toBe(3);
  });
});

describe('Part A stay (2026)', () => {
  it('deductible, then $434 a day from day 61, $868 on reserve days', () => {
    expect(hospitalStay(10, 0, 2026).hospital).toBe(1736);
    expect(hospitalStay(70, 0, 2026).hospital).toBe(1736 + 10 * 434);
    expect(hospitalStay(95, 0, 2026).hospital).toBe(1736 + 30 * 434 + 5 * 868);
    expect(hospitalStay(0, 30, 2026).snf).toBe(10 * 217);
  });
});
