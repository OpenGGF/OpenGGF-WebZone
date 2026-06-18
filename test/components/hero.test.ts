import { describe, it, expect } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import Hero from '../../src/components/TitleCardHero.astro';

describe('TitleCardHero', () => {
  it('renders wordmark, subtitle, two bands and the version plate', async () => {
    const c = await AstroContainer.create();
    const html = await c.renderToString(Hero, { props: { version: { label: 'v0.5', isPre: false } } });
    expect(html).toContain('OpenGGF');
    expect(html).toContain('Open-Source Sonic Engine');
    expect((html.match(/clip-path/g) || []).length).toBeGreaterThanOrEqual(2);
    expect(html).toContain('v0.5');
  });
  it('hides the version plate when version is null', async () => {
    const c = await AstroContainer.create();
    const html = await c.renderToString(Hero, { props: { version: null } });
    expect(html).not.toContain('class="plate"');
  });
  it('renders the video WITHOUT autoplay (poster shows until JS opts in)', async () => {
    const c = await AstroContainer.create();
    const html = await c.renderToString(Hero, { props: { version: null, videoSrc: '/media/hero.mp4' } });
    expect(html).toContain('hero-video');
    expect(html).toContain('poster=');
    expect(html).not.toContain('autoplay');   // reduced-motion users get the poster
  });
});
