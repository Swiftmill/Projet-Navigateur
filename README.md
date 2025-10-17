# HyperGX Browser

Navigateur desktop cross-platform inspiré d'Opera GX. HyperGX est construit avec Electron 30, Vite, React 18, TailwindCSS et TypeScript. Le dépôt contient un squelette complet prêt pour l'intégration des fonctionnalités avancées : GX Control, personnalisation de thème, new tab animée, extensions, blocage des publicités et marketplace minimale.

## Sommaire

- [Stack](#stack)
- [Structure du projet](#structure-du-projet)
- [Prérequis](#prérequis)
- [Installation](#installation)
- [Commandes de développement](#commandes-de-développement)
- [Configuration](#configuration)
- [Fonctionnalités principales](#fonctionnalités-principales)
- [Tests](#tests)
- [Packaging & distribution](#packaging--distribution)
- [Extensions Web](#extensions-web)
- [Synchronisation & profils](#synchronisation--profils)
- [Roadmap recommandée](#roadmap-recommandée)
- [Crédits vidéos & thèmes](#crédits-vidéos--thèmes)

## Stack

- **Electron 30+** pour l'enveloppe desktop (main process + preload sécurisé).
- **Vite + React 18 + TypeScript** pour le renderer.
- **TailwindCSS + Framer Motion** pour le design néon/CRT et les animations.
- **Zustand** pour l'état global (onglets, thèmes, GX Control).
- **React Router** pour la navigation multi-vues.
- **ffmpeg-static** prévu pour gérer les fonds vidéo (transcodage éventuel).
- **electron-builder** pour les bundles Win/Mac/Linux et auto-update.
- **WebAudio API** prévue pour les widgets audio-réactifs.
- **Vitest** (unitaires) & **Playwright** (smoke UI).
- **ESLint + Prettier** pour lint/format.

## Structure du projet

```
app/
  main/                 # Processus principal Electron
    modules/            # GX Control, ad-blocker, extensions, monitoring
    rules/              # Listes EasyList/EasyPrivacy de démonstration
  preload/              # Bridges IPC sécurisés
  renderer/
    components/         # UI React (controls, widgets, thème, etc.)
    pages/              # Vues : Browser, NewTab, Settings, GXCorner
    stores/             # Zustand stores (onglets, thèmes, GX Control)
    themes/             # Providers + presets
    assets/videos/      # Fonds vidéo courts (placer vos fichiers mp4/webm)
shared/                 # Types partagés main/renderer
ext/                    # Mini-moteur WebExtensions + démo Color Shifter
scripts/                # Scripts Node (proxy RSS, assets, packaging)
tests/                  # Vitest & Playwright
```

## Prérequis

- Node.js 20+
- npm 9+
- VS Code avec extensions recommandées (ESLint, Tailwind).

## Installation

```bash
npm install
```

La post-install installe automatiquement Playwright (Chromium).

## Commandes de développement

| Commande | Description |
| --- | --- |
| `npm run dev` | Lance Vite (renderer) + processus main Electron en mode watch. |
| `npm run build` | Build complet (renderer, main, preload). |
| `npm run pack` | Génère les artefacts via electron-builder (`release/`). |
| `npm run test` | Suite Vitest (unit). |
| `npm run test:e2e` | Tests Playwright (assurez-vous que `npm run dev` tourne). |
| `npm run lint` | ESLint strict. |
| `npm run format` | Prettier. |

### Proxy RSS optionnel

Certaines fonctionnalités (GX Corner, widget Deals & Gaming) nécessitent un proxy RSS pour contourner le CORS. Lancer :

```bash
npx ts-node scripts/rss-proxy.ts
```

Cela expose `http://localhost:3030/api/rss` que le renderer consomme.

## Configuration

Dupliquez `.env.example` en `.env` puis renseignez :

```env
VITE_WEATHER_API_KEY=change-me
AUTOUPDATE_URL=https://updates.example.com/hypergx
```

- `VITE_WEATHER_API_KEY` : clé OpenWeatherMap pour le widget météo (chargée côté renderer via Vite).
- `AUTOUPDATE_URL` : endpoint utilisé par electron-updater.

## Fonctionnalités principales

- **GX Control** : panneau latéral avec indicateurs CPU/RAM/Réseau, gestion soft du throttling (IPC). Limites ajustables dans Réglages > GX Control.
- **Nouvel onglet** : vidéo de fond, overlay particules, favoris drag-drop (structure prête), widgets (horloge, météo, to-do, RSS). Les vidéos démos doivent être placées dans `app/renderer/assets/videos/`.
- **Thèmes & personnalisation** : éditeur HSL avec export/import JSON, presets Neon/Midnight/Sunset, store persisté.
- **UI & UX** : barre d’adresse enrichie (`/` commands), TabBar avec previews animées, sidebar dockable, lecteur flottant (PIP stub).
- **GX Corner** : grille RSS configurable.
- **Extensions** : protocole `hypergx-extension://` sécurisé + exemple `Color Shifter`.
- **Confidentialité** : blocage basique via listes dans `app/main/rules` et sandbox strict.
- **Performances** : paramètres pour sleeping/discard tabs, monitoring système (CPU/memoire/reseau).
- **Sync local** : profils JSON (structure prête dans stores, à compléter pour sync cloud futur).
- **Sécurité** : `contextIsolation`, `sandbox`, CSP stricte, pas de `eval`.

## Tests

- **Unitaires** : `vitest` (`tests/unit/`). Exemple : `theme-store.test.ts`.
- **E2E** : `playwright` (`tests/e2e/`). Exemple : vérifie la page New Tab.

Configurer VS Code pour mapper `vitest` en Test Explorer si désiré.

## Packaging & distribution

```bash
npm run build
npm run pack
```

- Mac : `.dmg`
- Windows : `NSIS`
- Linux : `AppImage`

Publier via electron-updater en définissant `AUTOUPDATE_URL`.

## Extensions Web

1. Déposez vos extensions dans `ext/<nom>` avec `manifest.json` (Manifest v2 subset).
2. Zippez le dossier et chargez-le via le marketplace (à implémenter côté UI).
3. Le module `extensions.ts` expose un protocole sécurisé `hypergx-extension://`.

## Synchronisation & profils

- Les stores (thème, onglets, réglages) peuvent être sérialisés en JSON.
- Préparez un connecteur cloud en implémentant un service dans `app/renderer/stores/sync-store.ts` (placeholder à créer lors du développement futur).

## Roadmap recommandée

1. Intégrer le moteur de rendu web (`BrowserView`) et la gestion avancée des onglets.
2. Implémenter réellement le throttling CPU/RAM/Réseau (worker natif, cgroups). Ajuster `GXControlManager`.
3. Connecter WebAudio API pour le widget audio-réactif (bars/rings).
4. Compléter le marketplace d’extensions (listing zip, installation, toggles persistants).
5. Ajouter la synchronisation multi-profil avec un backend (adapter la couche JSON existante).
6. Optimiser le pipeline vidéo (ffmpeg-static pour transcodage, GPU accel options).

## Crédits vidéos & thèmes

Placez des vidéos libres de droit (ex. [Coverr](https://coverr.co/), [Pexels](https://www.pexels.com/)) dans `app/renderer/assets/videos/` :

- `aurora.mp4`
- `cyber-city.mp4`
- `sunset-drive.mp4`

Un script `scripts/download-videos.sh` (à compléter) peut automatiser le téléchargement.

Thèmes disponibles :

- **Neon Pulse** (violets saturés)
- **Midnight Drift** (bleu nuit)
- **Sunset Bloom** (orangés chauds)

> ⚠️ Les vidéos fournies ici sont des placeholders. Remplacez-les par vos propres fonds courts (≤10s, 1080p) pour la démo finale.
