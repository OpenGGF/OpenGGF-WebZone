import { describe, it, expect } from 'vitest';
import { spawnSync } from 'node:child_process';
import { readFileSync, existsSync } from 'node:fs';

describe('homepage build', () => {
  it('renders hero + all four sections in order', () => {
    const result = spawnSync('npm run build:astro', { shell: true, encoding: 'utf8' });
    expect(result.status).toBe(0);
    const html = readFileSync('dist/index.html', 'utf8');
    expect(html).toContain('OpenGGF');
    const order = ['id="download"', 'id="releases"', 'id="news"', 'id="faq"'];
    let last = -1;
    for (const id of order) { const i = html.indexOf(id); expect(i).toBeGreaterThan(last); last = i; }
    expect(existsSync('dist/rss.xml')).toBe(true);
  });
});
