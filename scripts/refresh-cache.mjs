// Writes src/data/releases.cache.json from the live API. Run by the webzone
// refresh workflow or locally via `npm run refresh-cache`. Never run in the Pages build.
import { writeFileSync } from 'node:fs';
const API = 'https://api.github.com/repos/jamesj999/OpenGGF/releases?per_page=20';
const headers = { Accept: 'application/vnd.github+json' };
if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
const res = await fetch(API, { headers });
if (!res.ok) { console.error(`refresh-cache: GitHub API ${res.status}`); process.exit(1); }
const data = await res.json();
const norm = data.map((r) => ({
  tag: r.tag_name, name: r.name || r.tag_name, url: r.html_url, prerelease: !!r.prerelease,
  publishedAt: r.published_at, body: r.body || '',
  assets: (r.assets || []).map((a) => ({ name: a.name, url: a.browser_download_url })),
}));
writeFileSync(new URL('../src/data/releases.cache.json', import.meta.url), JSON.stringify(norm, null, 2) + '\n');
console.log(`refresh-cache: wrote ${norm.length} releases`);
