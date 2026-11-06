import { describe, it, expect } from 'vitest';
import { formatNewsDate } from '../../src/lib/news-date';

describe('formatNewsDate', () => {
  it('formats the UTC calendar day, whatever the local time zone', () => {
    expect(formatNewsDate(new Date('2026-11-05'))).toBe('5 November 2026');
  });
});
