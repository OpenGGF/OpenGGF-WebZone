import { describe, it, expect, vi, afterEach } from 'vitest';
import { selectHeroVersion, getReleaseData, type Release } from '../../src/lib/releases';

const mk = (tag: string, pre = false): Release => ({
  tag, name: tag, url: `https://github.com/OpenGGF/OpenGGF/releases/tag/${tag}`,
  prerelease: pre, publishedAt: '2026-06-01T00:00:00Z', body: '', assets: [],
});

afterEach(() => vi.unstubAllGlobals());

describe('selectHeroVersion', () => {
  it('prefers the latest non-prerelease', () => {
    expect(selectHeroVersion([mk('v0.6', true), mk('v0.5')])).toEqual({ label: 'v0.5', isPre: false });
  });
  it('falls back to prerelease marked (pre) when no stable exists', () => {
    expect(selectHeroVersion([mk('v0.6', true)])).toEqual({ label: 'v0.6 (pre)', isPre: true });
  });
  it('uses SITE_FALLBACK_VERSION string when no releases', () => {
    expect(selectHeroVersion([], 'v0.0')).toEqual({ label: 'v0.0', isPre: false });
  });
  it('returns null (hide plate) when nothing at all', () => {
    expect(selectHeroVersion([])).toBeNull();
  });
});

describe('getReleaseData', () => {
  it('uses live data on success', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => ({ ok: true, json: async () => ([{
      tag_name: 'v0.5', name: 'v0.5', html_url: 'u', prerelease: false,
      published_at: '2026-04-11T00:00:00Z', body: 'notes', assets: [{ name: 'a.jar', browser_download_url: 'd' }],
    }]) })));
    const r = await getReleaseData();
    expect(r.source).toBe('live');
    expect(r.releases[0].tag).toBe('v0.5');
    expect(r.releases[0].assets[0].url).toBe('d');
  });
  it('falls back to committed cache when fetch fails', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => ({ ok: false, status: 503 })));
    const cache = [mk('v0.5')];
    const r = await getReleaseData({ cache });
    expect(r.source).toBe('cache');
    expect(r.releases[0].tag).toBe('v0.5');
  });
  it('reports none when fetch fails and no cache', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => { throw new Error('network'); }));
    const r = await getReleaseData({ cache: [] });
    expect(r.source).toBe('none');
    expect(r.releases).toEqual([]);
  });
});
