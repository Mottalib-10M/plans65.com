# Écrire ou étoffer une page de Plans65 (us-medicare-plans)

Notice pour les agents qui écrivent ou prolongent le site. À lire en entier avant d'écrire, avec
`~/Documents/GitHub/RECETTE-SITE.md` (§0, §5, §6, §6.5, §7, §9.3, §11, §17.4, §21, §26).

**Le site** : chaque plan Medicare Advantage 2027 de chaque comté (prime, franchise médicaments, plafond MOOP,
étoiles 2027), les plans Part D autonomes par État, et des calculateurs (Part B 2026, IRMAA, Part D 2027,
Part A, Medigap G, pénalités de retard, dates d'inscription, coût de l'année, comparateur de deux plans).
**Anglais américain seul**, sous `/en/`. Dollars, `$` devant, virgule des milliers.
Éditeur : la société **Radif Partners** (jamais un nom de personne, ni photo, ni diplôme).

**L'angle** : la liste complète des plans s'affiche tout de suite, sans code postal, sans téléphone, sans agent.
Les concurrents commerciaux (medicareadvantage.com, medicare.org, medicarefaq.com) n'affichent aucun plan et
renvoient vers « a licensed insurance agent ». Rapport SERP : `~/Documents/GitHub/reports/us-medicare-plans-serp-2026-10-12.md`.

## Contraintes légales (non négociables)

- Le mot « Medicare » est **interdit dans le nom du site, le domaine et le logo** (42 U.S.C. §1320b-10). Dans
  le texte, il désigne le programme public : c'est permis.
- Le site dit partout qu'il est **indépendant, non affilié au gouvernement ni à un assureur**. Jamais de
  renvoi vers un agent, un courtier, une « TPMO », jamais de formulaire de contact, jamais de numéro de vente.
  On peut citer le SHIP (conseil public gratuit) et 1-800-MEDICARE.
- Aucun conseil personnalisé : on décrit, on calcule, on ne recommande pas « le meilleur plan » pour quelqu'un.

## D'où viennent les chiffres

| Donnée | Source | Fichier |
|---|---|---|
| Plans 2027 par comté (prime C + D, franchise D, MOOP, type, SNP) | CMS CY2027 Landscape 202609.1 (données du 22/09/2026, read-me du 30/09/2026) | `src/data/plans/<st>.json` |
| Plans 2026 (comparaison, plans non reconduits) | CMS CY2026 Landscape 202609 | idem (`m26`, `moop26`, `x`) |
| Étoiles 2027 (par contrat) | CMS 2027 Star Ratings Data Tables, 8 oct. 2026 | idem (`star`) |
| Agrégats État, comté, national | calculés par le script | `src/data/summary.json` |
| Part A, Part B, IRMAA 2026 ; projections 2027 ; Part D 2026-2027 ; Medigap HD ; périodes | fiche CMS du 14/11/2025, SSA POMS HI 01101.020, Trustees 2026, Rate Announcement 2027, mémo CMS du 28/07/2026, CMS Medigap HD 2027, eCFR | `src/data/params-2027.json` (avec `sources`) |

Reconstruire : télécharger dans `.cache-raw/` (hors dépôt) `https://www.cms.gov/files/zip/cy2027-landscape-202609-1.zip`
(→ `cy2027.csv`), `https://www.cms.gov/files/zip/cy2026-landscape-202609.zip` (→ `cy2026.csv`) et
`https://www.cms.gov/files/zip/2027-star-ratings-data-tables-oct-8-2026.zip` (→ `stars27/`), puis
`python3 scripts/build-data.py && python3 scripts/dump-facts.py`. Données du gouvernement fédéral : domaine public
(17 U.S.C. §105), réutilisation libre ; on cite CMS et la date.

**Fiches de faits pour rédiger** : `research/facts/<state-slug>.json` (un par État) et
`research/facts/counties/<state>--<county>.json` (grands comtés : la liste des plans ouverts un par un et les
plans 2026 non reconduits). Elles servent à **lire**. Dans une page, chaque nombre s'écrit avec le kit, jamais
recopié de la fiche.

## Les fichiers d'une page

| Page | Fichier | Route |
|---|---|---|
| Sujet + calculateur | `src/content/guides/<id>.ts` (`defineGuide`) | `/en/<slug>/` |
| État | `src/content/states/<state-slug>.ts` (`defineState`) | `/en/<state-slug>/` |
| Grand comté | `src/content/counties/<state-slug>--<county-slug>.ts` (`defineCounty`) | `/en/<state-slug>/<county-slug>/` |
| Accueil | `src/content/home.ts` | `/en/` |

La liste des pages prévues est dans `src/lib/planned.ts` (`PLANNED_GUIDES`, `PLANNED_COUNTIES`, tous les États).
Modèles (copier la **structure**, jamais les phrases) : `guides/irmaa-brackets.ts`, `states/florida.ts`,
`counties/florida--miami-dade.ts`.

Le gabarit affiche seul : H1 (État et comté : fixé par le gabarit), le calculateur en tête, le chapeau replié
(`resume`, la première phrase visible), le corps (`body`), la FAQ, les pages liées, les sources. Sur un État, il
ajoute deux tableaux générés (tous les comtés ; tous les plans Part D) ; sur un comté, la liste des plans 2026
non reconduits. **La prose ne répète pas ces tableaux.**

### Champs

| Champ | Règle |
|---|---|
| `title` | 50 à 60 caractères, contient 2026 ou 2027, **terme-clé en tête** : « Medicare Advantage Plans Texas 2027: … », « Part D Deductible 2027: … ». Jamais How/What/Is ni « US »/« United States » en tête, pas de tiret cadratin, unique |
| `description` | 150 à 160 caractères, l'année et un chiffre du kit, unique |
| `intro` | une phrase propre à la page (sous le H1) |
| `resume` | **UN** paragraphe de 120 mots ou plus (viser 130 à 170) : la réponse à la requête avec les chiffres ; la première phrase porte le message |
| `body(h)` | HTML (`h2`, `h3`, `p`, `ul`, `h.table`). Guides : ≥ 650 mots de prose hors tableaux (viser 800 à 1 100). États : ≥ 260 (viser 300 à 450). Comtés : ≥ 200 (viser 250 à 380) |
| `faqs` | 3 à 6 vraies questions (guides : 4 à 7), réponses **40 à 90 mots**, chiffre + condition + source ; une question n'existe qu'une fois sur tout le site (État et comté : le nom dans la question) |
| `related` | 3 à 6 ids (`irmaa-brackets`, `state:texas`, `county:texas/harris`…) |
| `sources` (guides) | ≥ 2 clés de `params-2027.json > sources` |
| `tool` (guides) | `finder`, `zero`, `snp`, `pdp`, `compare`, `year-cost`, `irmaa`, `part-d`, `part-b`, `part-a`, `medigap`, `penalty`, `periods`, `eligibility` |

## Le kit (règle des chiffres)

```ts
import { KIT as K } from '../../lib/kit';
const s = K.state('texas');            // std, zero, mapd, snp, dsnp, csnp, isnp, moopMin/Med/Max, starMax, star4, premMax,
                                       // orgs, topOrg, orgList [[parent, n]…], lowMoop {n,o,moop,m}, cheapHigh, best,
                                       // hmo, ppo, pffs, std26, counties, pdp, pdp26, pdpMin, pdpMax, pdpMinName, pdpMed, pdpBench
const c = K.county('texas', 'harris'); // mêmes champs + zero26, gone (IDs 2026 non reconduits), new
K.counties('texas', 'std')             // comtés triés (desc) ; K.counties('texas', 'std', true) pour l'ordre croissant
K.nat                                  // national : segments, std, snp, zeroMapd, mapd, moopMax, moopMed, std26, pdp…
K.P                                    // params-2027.json : K.P.partB['2026'].premium, K.P.irmaa['2026'].single[0], K.P.partD['2027'].oopCap…
K.irmaa(magi, 'single'|'joint'|'separate', 2026|2027), K.drug(annualCost), K.penaltyB(months), K.penaltyD(months), K.iep('1962-06-15'), K.stay(days, snfDays, 2026)
K.usd(x) → "$1,234" ; K.cents(x) → "$202.90" ; K.num(x) ; K.pct(0.25) ; K.day('2026-10-15') ; K.change(now, before)
```

Dans `body(h)` : tout le kit, plus `h.a(id, texte)` (lien interne ; id inconnu = test en échec, sauf id prévu dans
`planned.ts`), `h.table(entêtes, lignes, légende, alignements)`, `h.src(clé, texte)` (source officielle),
`h.ext(url, texte)` (autre source officielle **lue**), `h.box(titre, html)`, `h.mini(kind, arg)`.

Mini-simulateurs (`src/lib/mini-specs.ts`) : `irmaaQuick`, `irmaaCouple`, `irmaaDrop`, `drugQuick` (arg `{c}`),
`drugSmooth`, `drug2026`, `partBYear`, `partB2027`, `penaltyB`, `penaltyD`, `hdg`, `stay`, `iep`, `capVsOriginal`
(arg `{moop}`), `zeroTrue`, `starsSep`, `snpDual`. Un par page d'État ou de comté, un à trois par guide ; chacun
sur le sujet du paragraphe qui le précède. Ne pas mettre deux fois le même mini dans des États voisins si on peut
varier.

Un nombre absent du kit ne s'écrit pas, sauf lu soi-même sur une source officielle (CMS, SSA, eCFR, un
département d'assurance d'État, une loi d'État) : alors `h.ext(url, …)` et le signaler dans le compte rendu.
**Un point incertain ne se publie pas.**

## Ton et unicité

- Anglais américain, voix humaine, phrases de longueur variable, **le chiffre d'abord**. Pour un lecteur de 64 ans
  ou son enfant, qui veut comprendre sans jargon (expliquer MOOP, SNP, D-SNP, IRMAA à leur première apparition).
- Interdits (le test les refuse) : tirets cadratin et demi-cadratin, « it's important to note », « dive into »,
  « delve », « whether you're », « navigate the », « Moreover », « Additionally », « Furthermore »,
  « game changer », « unlock ». Pas de triplets en série, pas de conclusion qui résume, pas d'émoji.
- **Unicité** (§6) : `check-unique` compare toutes les pages (texte hors tableaux et hors calculateur, chiffres
  neutralisés, seuil 30 %). Les pages d'État et de comté sont le risque principal : **ouvrir le corps sur ce que
  l'État a de plus rare** (pas de plan du tout en Alaska, plans « cost » du Minnesota et du Dakota, Porto Rico et
  le poids des D-SNP, plafonds très hauts de New York, PPO régionaux, comtés ruraux sans HMO, giveback de la
  Part B dans les noms de plans, grands réseaux universitaires, retraités saisonniers, règles Medigap propres à
  l'État quand elles sont sourcées…), des titres `h2`/`h3` **propres à la page**, un vocabulaire différent d'une
  page à l'autre. Ne jamais reprendre une phrase d'une autre page, même chiffres changés.
- **Pas de copie entre sites** : aucun paragraphe repris d'un autre site du portefeuille (`check-portefeuille`).

## Contrôles

```bash
cd ~/Documents/GitHub/a-publier/Mottalib-10M/us-medicare-plans
PAGE_FILES=state:texas,county:texas/harris,part-d-plans npx vitest run tests/pages.test.ts   # vos pages
python3 scripts/sim-pages.py --only state:texas,county:texas/harris                          # similarité (difflib, comme check-unique)
npx vitest run                                                                               # tout (moteur + pages)
export NODE_PATH=$(npm root -g):$PWD/node_modules
npm run build && S=~/Documents/GitHub/_trame/_template/scripts
python3 $S/check-seo.py . ; python3 $S/check-trame.py . ; python3 $S/check-unique.py .
python3 $S/check-simulateurs.py . ; python3 $S/check-regles.py . ; python3 $S/check-portefeuille.py .
node $S/check-sources.mjs . ; node scripts/check-legal.mjs ; node $S/check-contraste.mjs dist
node $S/check-saisie.mjs dist --max=60 ; node $S/check-nombres.mjs dist ; node scripts/typo-nbsp.mjs dist --check
node scripts/check-premier-ecran.mjs . ; node scripts/check-url-propre.mjs . ; python3 scripts/check-cookies.py .
node $S/check-layout.mjs dist > /tmp/layout-medicare.log 2>&1   # long
```

Serveur local : port **4446** (`npm run preview`), arrêter par le port (`lsof -ti tcp:4446 | xargs kill`),
jamais `pkill -f`.

## Mise à jour annuelle

1. Fin septembre : nouveau landscape CMS → `cy2028.csv`, l'ancien devient la base de comparaison ; adapter les
   chemins de `scripts/build-data.py`.
2. Octobre : nouvelles étoiles (Star Ratings Data Tables) → `stars28/`.
3. Novembre : fiche CMS des primes Part A/B et IRMAA de l'année → `params-2028.json` (`final: true`).
4. Avril : Rate Announcement (franchise et plafond Part D), juillet : mémo NAMBA (prime de base, pénalité Part D).
5. `npx vitest run`, puis tous les contrôles.

## Ce qu'on ne fait pas

- Pas de dépôt GitHub, pas de push, pas de DNS sans validation de l'éditeur.
- Ne pas toucher à `_trame` ni à la RECETTE ; suggestions dans le compte rendu.
- `CLARITY_ID` vide, aucune publicité tant que l'éditeur n'a pas décidé ; jamais de publicité d'assureur.
