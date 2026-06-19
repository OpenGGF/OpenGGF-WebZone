# OpenGGF WebZone

The marketing + documentation website for **[OpenGGF](https://github.com/OpenGGF/OpenGGF)** — an
open-source, OpenGL-accelerated, accurate Sonic engine written in Java. Live at
**[openggf.com](https://openggf.com)**.

It's a static site: an animated, Sonic-title-card-themed homepage, a docs section synced from the
engine repo, download/release data pulled from GitHub Releases, and full-text search.

## Tech stack

- **[Astro 6](https://astro.build)** — static site generator (zero JS shipped by default)
- **[GSAP](https://gsap.com)** + CSS keyframes — title-card animations
- **[Pagefind](https://pagefind.app)** — static, build-time full-text search
- **[Vitest 4](https://vitest.dev)** — component/unit tests (Astro Container API + `playwright-core` for screenshots)
- Self-hosted fonts, FontAwesome (free), YAML-driven data
- Hosted on **Cloudflare Pages**

## Quick start

Requires **Node 24** and npm.

```bash
npm install
npm run dev        # local dev server (http://localhost:4321)
```

| Script | Description |
|--------|-------------|
| `npm run dev` | Astro dev server with HMR. *(Search is inert here — Pagefind only indexes a real build.)* |
| `npm run build` | Production build to `dist/`, then runs Pagefind to generate the search index. |
| `npm run build:astro` | Astro build only (skips Pagefind). |
| `npm run preview` | Serve the built `dist/` locally — use this to test search. |
| `npm test` | Run the Vitest suite. |
| `npm run sync-docs` | Regenerate `src/content/docs/` from the engine repo (see below). |
| `npm run refresh-cache` | Refresh the cached GitHub Releases data. |

## Project structure

```
src/
  components/      UI components — title cards (S1/S2/S3&K), nav, sections, etc.
  layouts/         BaseLayout (random title-card selection, global head)
  pages/           index.astro, docs/, news/, rss.xml.ts
  content/         docs/ (synced from the engine — see below) and news/
  data/            YAML data + releases.cache.json (release fallback)
  lib/             releases.ts (GitHub Releases), platforms.ts, media.ts, motion.ts
  scripts/         client-side TS (animations, search)
  styles/          tokens.css (design tokens, @font-face)
scripts/           build-time Node scripts (sync-docs, refresh-cache)
test/              Vitest suite
public/            static assets — fonts, /media (promo videos), favicon
docs/DEPLOYMENT.md deployment + release-refresh wiring
```

## Title cards

The homepage shows **one of three Sonic title cards (Sonic 1, Sonic 2, Sonic 3&K) at random**
per page load, each faithfully recreating its game's title screen. After the card animates in,
the background reveals a looping, muted **promo video** of the engine (dimmed by a scrim for
legibility). The clips are encoded at the game's native pixel-art resolution and upscaled
nearest-neighbour (`image-rendering: pixelated`) so they stay crisp and small.

Per-card video sources live in [`src/lib/media.ts`](src/lib/media.ts) — drop a clip in
`public/media/` and point the relevant constant at it.

## Content pipelines

**Docs** under `src/content/docs/` are **generated**, not hand-edited. `npm run sync-docs` reads
the engine repo's `docs/guide/` and selected root markdown files, rewrites cross-links, and writes
them here (the directory is wiped and regenerated each run). It expects an engine checkout at
`../sonic-engine` (override with `--engine-path` or `OPENGGF_ENGINE_PATH`). To change doc *prose*
links, edit them in the engine repo, not here.

**Releases** (download buttons, releases list) come from the GitHub Releases API for
`OpenGGF/OpenGGF` ([`src/lib/releases.ts`](src/lib/releases.ts)), with
[`src/data/releases.cache.json`](src/data/releases.cache.json) as a build-time fallback.
`npm run refresh-cache` updates that cache; a published engine release can trigger it automatically
(see [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md)).

## Deployment

Auto-deploys via **Cloudflare Pages** on push to the default branch.
Build command `npm run build`, output `dist`, `NODE_VERSION=24`. Full setup — including the
release-triggered cache refresh — is in [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md).

## License

See the [engine repository](https://github.com/OpenGGF/OpenGGF/blob/develop/LICENSE).
