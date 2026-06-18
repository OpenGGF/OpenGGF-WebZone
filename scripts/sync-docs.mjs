import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync, statSync, rmSync } from 'node:fs';
import { join, dirname, resolve, posix } from 'node:path';

function arg(name) { const i = process.argv.indexOf(name); return i > -1 ? process.argv[i + 1] : undefined; }
const enginePath = resolve(arg('--engine-path') || process.env.OPENGGF_ENGINE_PATH || '../sonic-engine');
const OUT = resolve(arg('--out-dir') || 'src/content/docs');   // overridable so tests never touch the tracked dir

// Validation: directory must exist and look like the engine (has docs/guide/).
if (!existsSync(enginePath) || !existsSync(join(enginePath, 'docs/guide'))) {
  console.error(`sync-docs: engine repo not found at "${enginePath}". ` +
    `Pass --engine-path or set OPENGGF_ENGINE_PATH.`);
  process.exit(1);
}

// Soft branch check (spec: log + warn, never fail). Skips silently when not a git
// checkout (e.g. test fixtures) or when a release tag is checked out deliberately.
try {
  const { execFileSync } = await import('node:child_process');
  const branch = execFileSync('git', ['-C', enginePath, 'rev-parse', '--abbrev-ref', 'HEAD'],
    { encoding: 'utf8' }).trim();
  console.log(`sync-docs: engine branch "${branch}"`);
  if (branch && branch !== 'develop' && branch !== 'HEAD') {
    console.warn(`sync-docs: expected branch "develop" but found "${branch}" — syncing anyway.`);
  }
} catch { /* not a git repo / git unavailable — skip the check */ }

// Allowlist: globs of public dirs/files (paths relative to engine root).
const ALLOW_DIRS = ['docs/guide'];
const ALLOW_FILES = ['CONFIGURATION.md', 'ROADMAP.md', 'CREDITS.md', 'CONTRIBUTING.md'];

const groupFor = (rel) => {
  if (rel.includes('/playing/')) return 'Players';
  if (rel.includes('/contributing/')) return 'Contributors';
  if (rel.includes('/cross-referencing/')) return 'Cross-referencing';
  return 'Reference';
};
const titleFor = (txt, rel) => {
  const h1 = txt.match(/^#\s+(.+)$/m);
  return h1 ? h1[1].trim() : rel.split('/').pop().replace(/\.md$/, '');
};
// Rewrite ./foo.md and ../bar/baz.md links to /docs/... slugs. Use POSIX path semantics:
// node:path.resolve() is OS-specific and would emit a drive-qualified "C:/docs/..." on
// Windows. relDir is always POSIX (slugs use forward slashes), so posix.join + normalize
// collapses ./ and ../ correctly and yields a clean site URL on every platform.
const rewriteLinks = (txt, relDir) => txt.replace(/\]\((\.[^)]+?)\.md(#[^)]*)?\)/g, (_, p, hash) => {
  const target = posix.normalize(posix.join('/docs', relDir, p));
  return `](${target}${hash || ''})`;
});

function copyMd(absSrc, relFromEngine) {
  // Map engine path to docs slug: strip leading "docs/" for guide files.
  const slug = relFromEngine.replace(/^docs\//, '');
  const dest = join(OUT, slug);
  const raw = readFileSync(absSrc, 'utf8');
  const title = titleFor(raw, slug);
  const group = groupFor('/' + slug);
  const body = rewriteLinks(raw, posix.dirname(slug));   // slug is POSIX; keep URL math POSIX
  const fm = `---\ntitle: ${JSON.stringify(title)}\ngroup: ${JSON.stringify(group)}\norder: 99\n---\n\n`;
  mkdirSync(dirname(dest), { recursive: true });
  writeFileSync(dest, fm + body);
}

function walk(absDir, relDir) {
  for (const name of readdirSync(absDir)) {
    const abs = join(absDir, name);
    const rel = join(relDir, name).replace(/\\/g, '/');
    if (statSync(abs).isDirectory()) walk(abs, rel);
    else if (name.endsWith('.md')) copyMd(abs, rel);
  }
}

// Prune stale output: regenerate the vendored docs from scratch each run so deleted,
// renamed, or newly-excluded files never linger in the published site.
rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });

for (const d of ALLOW_DIRS) { const abs = join(enginePath, d); if (existsSync(abs)) { walk(abs, d); } }
for (const f of ALLOW_FILES) {
  const abs = join(enginePath, f);
  if (existsSync(abs)) copyMd(abs, 'docs/reference/' + f.toLowerCase().replace(/\.md$/, '') + '.md');
}
console.log(`sync-docs: synced from ${enginePath}`);
