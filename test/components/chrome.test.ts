import { describe, it, expect } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import NavBar from '../../src/components/NavBar.astro';
import Footer from '../../src/components/Footer.astro';

describe('chrome', () => {
  it('NavBar has all primary links and a search trigger', async () => {
    const c = await AstroContainer.create();
    const html = await c.renderToString(NavBar);
    for (const t of ['Docs', 'Download', 'Releases', 'News', 'FAQ', 'GitHub']) expect(html).toContain(t);
    expect(html).toContain('id="nav-search"');
    expect(html).toContain('github.com/jamesj999/OpenGGF');
  });
  it('Footer carries the Sega disclaimer', async () => {
    const c = await AstroContainer.create();
    const html = await c.renderToString(Footer);
    expect(html).toContain('not affiliated with or endorsed by Sega');
  });
});
