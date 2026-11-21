import { it, expect } from 'vitest';
import { spawnSync } from 'node:child_process';
import { copyFileSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { gunzipSync } from 'node:zlib';

it('publishes eligible news and public images, excludes future news everywhere, and emits previews and a 404', () => {
  const past = 'advent-publishing-past-probe';
  const future = 'advent-publishing-future-probe';
  const read = (path: string) => readFileSync(`dist/${path}`, 'utf8');
  const meta = (html: string, key: string) => html.match(new RegExp(`(?:property|name)="${key}" content="([^"]*)"`))?.[1];
  try {
    mkdirSync(`public/news-assets/${past}`, { recursive: true });
    copyFileSync('src/content/news/images/2026-11-05-openggf-0-7/doomsday-super-sonic.png', `public/news-assets/${past}/hero.png`);
    for (const [slug, date] of [[past, '2000-01-01'], [future, '2999-12-01']]) {
      writeFileSync(`src/content/news/${slug}.md`, `---\ntitle: ${slug}\ndate: ${date}\nsummary: ${slug} summary\nimage: "/news-assets/${past}/hero.png"\n---\n\n${slug}\n\n![Public hero](/news-assets/${past}/hero.png)\n`);
    }
    const build = spawnSync('npm', ['run', 'build'], { encoding: 'utf8' });
    expect(build.status, build.stdout + build.stderr).toBe(0);
    expect(existsSync('dist/404.html')).toBe(true);
    expect(read('404.html')).toContain('Page not found');
    expect(existsSync(`dist/news/${future}/index.html`)).toBe(false);
    for (const file of ['index.html', 'news/index.html', 'rss.xml']) {
      expect(read(file)).toContain(past);
    }
    // Includes pagers on every article, not just the news/home lists and RSS.
    for (const file of readdirSync('dist', { recursive: true }).map(String).filter(p => /\.(html|xml)$/.test(p))) {
      expect(read(file), file).not.toContain(future);
    }
    const fragments = readdirSync('dist/pagefind/fragment').map(file =>
      gunzipSync(readFileSync(`dist/pagefind/fragment/${file}`)).toString()).join('\n');
    expect(fragments).toContain(past);
    expect(fragments).not.toContain(future);
    const article = read(`news/${past}/index.html`);
    expect(article).toContain(`src="/news-assets/${past}/hero.png"`);
    expect(existsSync(`dist/news-assets/${past}/hero.png`)).toBe(true);
    expect(meta(article, 'og:title')).toBe(`${past} — OpenGGF`);
    expect(meta(article, 'og:description')).toBe(`${past} summary`);
    expect(meta(article, 'og:image')).toBe(`https://openggf.com/news-assets/${past}/hero.png`);
    expect(meta(article, 'og:url')).toBe(`https://openggf.com/news/${past}/`);
    expect(meta(article, 'og:type')).toBe('article');
    expect(meta(article, 'twitter:card')).toBe('summary_large_image');
    const release = read('news/2026-11-05-openggf-0-7/index.html');
    const releaseImage = meta(release, 'og:image')!;
    expect(releaseImage).toMatch(/^https:\/\/openggf.com\/_astro\/doomsday-super-sonic\..+\.png$/);
    expect(existsSync(`dist${new URL(releaseImage).pathname}`)).toBe(true);
    const hello = read('news/2026-06-18-hello/index.html');
    expect(meta(hello, 'og:image')).toBe('https://openggf.com/media/promo-s3k-poster.webp');
    expect(meta(read('index.html'), 'og:type')).toBe('website');
    expect(meta(read('index.html'), 'og:url')).toBe('https://openggf.com/');
  } finally {
    for (const slug of [past, future]) rmSync(`src/content/news/${slug}.md`, { force: true });
    rmSync(`public/news-assets/${past}`, { recursive: true, force: true });
  }
});
