import { describe, it, expect } from 'vitest';
import { publishedNews } from '../../src/lib/published-news';

describe('publishedNews', () => {
  it('excludes future instants, includes the cutoff, and sorts without mutating the collection', () => {
    const now = new Date('2026-12-01T16:00:00Z');
    const posts = ['2026-06-18', '2026-12-01T16:00:00.001Z', '2026-11-05',
      '2026-12-01T16:00:00Z', '2026-12-01'].map(date => ({ data: { date: new Date(date) } }));
    expect(publishedNews(posts, now)).toEqual([posts[3], posts[4], posts[2], posts[0]]);
    expect(posts[0].data.date.toISOString()).toBe('2026-06-18T00:00:00.000Z');
  });

  it('holds a date-only post until midnight UTC', () => {
    const posts = [{ data: { date: new Date('2026-12-01') } }];
    expect(publishedNews(posts, new Date('2026-11-30T23:59:59.999Z'))).toEqual([]);
    expect(publishedNews(posts, new Date('2026-12-01T00:00:00Z'))).toEqual(posts);
  });
});
