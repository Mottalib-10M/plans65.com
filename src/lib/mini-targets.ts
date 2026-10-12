/** Where the button of each mini-simulator leads: the page with the full calculator of the subject. */
import { ROUTES, route } from '../i18n/routes';
const T: Record<string, string> = {
  irmaaQuick: 'irmaa-brackets', irmaaCouple: 'irmaa-brackets', irmaaDrop: 'irmaa-brackets',
  drugQuick: 'part-d-deductible', drugSmooth: 'part-d-deductible', drug2026: 'part-d-deductible', snpDual: 'part-d-deductible',
  partBYear: 'part-b', partB2027: 'part-b-premium', penaltyB: 'late-enrollment-penalty', penaltyD: 'late-enrollment-penalty',
  hdg: 'medigap-plan-g', stay: 'part-a', iep: 'enrollment-periods', starsSep: 'enrollment-periods',
  capVsOriginal: 'annual-cost-calculator', zeroTrue: 'annual-cost-calculator',
};
export const miniHref = (kind: string, fallback: string) => { const id = T[kind]; return id && ROUTES.some((r) => r.id === id) ? route(id, 'en') : fallback; };
