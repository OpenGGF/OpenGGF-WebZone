import { describe, it, expect } from 'vitest';
import { matchAssets, type Platform } from '../../src/lib/platforms';
import type { Release } from '../../src/lib/releases';

const platforms: Platform[] = [
  { id: 'win', label: 'Windows', icon: '🪟', match: 'windows|win|\\.exe' },
  { id: 'mac', label: 'macOS', icon: '🍎', match: 'mac|darwin|\\.dmg' },
];
const release: Release = {
  tag: 'v0.5', name: 'v0.5', url: 'u', prerelease: false, publishedAt: '', body: '',
  assets: [{ name: 'OpenGGF-windows.exe', url: 'win-url' }],
};

describe('matchAssets', () => {
  it('matches an asset to its platform by regex', () => {
    const r = matchAssets(release, platforms);
    expect(r.find((x) => x.platform.id === 'win')?.assetUrl).toBe('win-url');
  });
  it('returns null assetUrl for platforms with no match', () => {
    const r = matchAssets(release, platforms);
    expect(r.find((x) => x.platform.id === 'mac')?.assetUrl).toBeNull();
  });
  it('returns all-null when release is undefined', () => {
    const r = matchAssets(undefined, platforms);
    expect(r.every((x) => x.assetUrl === null)).toBe(true);
  });
});
