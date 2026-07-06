// Canonical sidebar order for the vendored docs. The engine repo does not carry
// per-page order, and sync-docs regenerates frontmatter on every run — so the
// website owns its own navigation order here. `sync-docs.mjs` reads this to stamp
// each page's `order`, and the same map is applied to the committed docs so the
// order is correct without a re-sync. Keyed by slug (the file path under
// src/content/docs without the .md extension). Unlisted slugs fall back to 99,
// which sorts them alphabetically after the curated pages.

export const DOCS_ORDER = {
  // ─ Players ─ getting-started leads; the rest follow the natural first-run flow
  'guide/playing/getting-started': 1,
  'guide/playing/controls': 2,
  'guide/playing/configuration': 3,
  'guide/playing/game-status': 4,
  'guide/playing/troubleshooting': 5,

  // ─ Contributors ─ onboarding first, then subsystem guides, tutorial last
  'guide/contributing/dev-setup': 1,
  'guide/contributing/architecture': 2,
  'guide/contributing/documentation-policy': 3,
  'guide/contributing/adding-zones': 4,
  'guide/contributing/adding-bosses': 5,
  'guide/contributing/audio-system': 6,
  'guide/contributing/rewind-system': 7,
  'guide/contributing/testing': 8,
  'guide/contributing/trace-framework-reference': 9,
  'guide/contributing/trace-replay': 10,
  'guide/contributing/tutorial-implement-object': 11,

  // ─ Cross-referencing ─ big picture first, then primer and specifics
  'guide/cross-referencing/architecture-overview': 1,
  'guide/cross-referencing/68000-primer': 2,
  'guide/cross-referencing/how-the-engine-reads-roms': 3,
  'guide/cross-referencing/mapping-exercises': 4,
  'guide/cross-referencing/per-game-notes': 5,
  'guide/cross-referencing/tooling': 6,

  // ─ Reference ─ overview guide first, then the standalone reference docs
  'guide/index': 1,
  'reference/configuration': 2,
  'reference/contributing': 3,
  'reference/roadmap': 4,
  'reference/credits': 5,
};

export const orderFor = (slug) => DOCS_ORDER[slug] ?? 99;
