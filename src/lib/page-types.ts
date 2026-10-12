/**
 * One page = ONE content file (CONTRIBUTING-PAGES.md):
 *  - a topic page with its calculator: `src/content/guides/<id>.ts` (GuideDef);
 *  - a state page: `src/content/states/<state-slug>.ts` (StateDef);
 *  - a county page: `src/content/counties/<state-slug>--<county-slug>.ts` (CountyDef).
 * Routes, menus, footer, sitemap, schemas and internal links read these files alone.
 */
import type { Kit } from './kit';

export interface FAQ { q: string; a: string }

export interface Helpers extends Kit {
  /** Internal link by page id ("irmaa-brackets", "state:florida", "county:florida/miami-dade", "method"). Unknown id = failed test. */
  a: (id: string, text: string) => string;
  /** Ledger table; numbers are formatted, strings are inserted as HTML. */
  table: (headers: string[], rows: Array<Array<string | number>>, caption?: string, align?: Array<'l' | 'r'>) => string;
  /** Link to a source of params-2027.json (key), with optional text. */
  src: (key: string, text?: string) => string;
  /** Link to any official URL. */
  ext: (url: string, text: string) => string;
  /** Ruled note. */
  box: (title: string, html: string) => string;
  /** Inline mini-simulator, rendered as an island: `${h.mini('kind', arg)}`. */
  mini: (kind: string, arg?: unknown) => string;
}

export type Group = 'plans' | 'costs' | 'enroll';
export type ToolKind = 'pdp' | 'finder' | 'year-cost' | 'compare' | 'irmaa' | 'part-d' | 'part-b' | 'part-a' | 'medigap' | 'penalty' | 'periods' | 'eligibility' | 'snp' | 'zero';

export interface GuideDef {
  id: string; group: Group; order: number;
  /** URL segment, lowercase and dashes, no year, no three-digit number. */
  slug: string;
  nav: string; card: string;
  /** 50 to 60 characters, key term first, year included (RECETTE §11). */
  title: string;
  /** 150 to 160 characters, year included. */
  description: string;
  h1: string; intro: string;
  /** ONE paragraph of 120 words or more: the direct answer with the figures (RECETTE §21). */
  resume: string;
  faqs: FAQ[];
  body: (h: Helpers) => string;
  tool: ToolKind;
  related: string[];
  /** Keys of params-2027.json > sources. */
  sources: string[];
}
export const defineGuide = (p: GuideDef): GuideDef => p;

export interface StateDef {
  /** = file name = state slug ("new-york"). */
  slug: string;
  title: string; description: string; intro: string; resume: string;
  body: (h: Helpers) => string;
  faqs: FAQ[];
  related: string[];
  extraSources?: Array<{ name: string; url: string }>;
}
export const defineState = (s: StateDef): StateDef => s;

export interface CountyDef {
  /** "florida". */ state: string;
  /** County slug as in the data ("miami-dade"). */ county: string;
  title: string; description: string; intro: string; resume: string;
  body: (h: Helpers) => string;
  faqs: FAQ[];
  related: string[];
}
export const defineCounty = (c: CountyDef): CountyDef => c;
