/** Registry: every file of src/content/{guides,states,counties} is loaded here. */
import type { GuideDef, StateDef, CountyDef } from './page-types';
import { STATE_LIST } from './data';

const base = (file: string) => file.split('/').pop()!.replace(/\.ts$/, '');
const g = import.meta.glob<{ default: GuideDef }>(['../content/guides/*.ts', '!../content/guides/_*.ts'], { eager: true });
export const GUIDES: GuideDef[] = Object.entries(g).map(([f, m]) => {
  if (m.default.id !== base(f)) throw new Error(`${f}: id "${m.default.id}" differs from the file name`);
  return m.default;
}).sort((a, b) => a.order - b.order || a.id.localeCompare(b.id));
export const guideById = (id: string) => GUIDES.find((p) => p.id === id);

const s = import.meta.glob<{ default: StateDef }>(['../content/states/*.ts', '!../content/states/_*.ts'], { eager: true });
export const STATE_PAGES: StateDef[] = Object.entries(s).map(([f, m]) => {
  if (m.default.slug !== base(f)) throw new Error(`${f}: slug "${m.default.slug}" differs from the file name`);
  if (!STATE_LIST.some((x) => x.slug === m.default.slug)) throw new Error(`${f}: unknown state`);
  return m.default;
}).sort((a, b) => a.slug.localeCompare(b.slug));
export const stateId = (slug: string) => `state:${slug}`;
export const statePageById = (id: string) => STATE_PAGES.find((p) => stateId(p.slug) === id);

const c = import.meta.glob<{ default: CountyDef }>(['../content/counties/*.ts', '!../content/counties/_*.ts'], { eager: true });
export const COUNTY_PAGES: CountyDef[] = Object.entries(c).map(([f, m]) => {
  if (`${m.default.state}--${m.default.county}` !== base(f)) throw new Error(`${f}: state--county differs from the file name`);
  return m.default;
}).sort((a, b) => a.state.localeCompare(b.state) || a.county.localeCompare(b.county));
export const countyId = (state: string, county: string) => `county:${state}/${county}`;
export const countyPageById = (id: string) => COUNTY_PAGES.find((p) => countyId(p.state, p.county) === id);
export const countiesOf = (state: string) => COUNTY_PAGES.filter((p) => p.state === state);
