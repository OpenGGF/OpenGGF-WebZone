import { describe, it, expect } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import News from '../../src/components/SectionNews.astro';
import Faq from '../../src/components/SectionFaq.astro';

describe('SectionNews', () => {
  it('renders a card per post with a permalink', async () => {
    const c = await AstroContainer.create();
    const html = await c.renderToString(News, { props: { posts: [
      { slug: 'hello', data: { title: 'Hello', date: new Date('2026-06-18'), summary: 'First post' } }] } });
    expect(html).toContain('Hello');
    expect(html).toContain('/news/hello');
  });
});
describe('SectionFaq', () => {
  it('renders each Q as a details/summary accordion', async () => {
    const c = await AstroContainer.create();
    const html = await c.renderToString(Faq, { props: { items: [{ q: 'Do I need a ROM?', a: 'Yes.' }] } });
    expect(html).toContain('<details');
    expect(html).toContain('Do I need a ROM?');
    expect(html).toContain('Yes.');
  });
});
