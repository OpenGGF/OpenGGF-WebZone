import type { Release } from './releases';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import yaml from 'js-yaml';

export interface Platform { id: string; label: string; icon: string; match: string; }

export function loadPlatforms(): Platform[] {
  // Use process.cwd() (project root) so this works both in source and in Astro's
  // SSG build output (where import.meta.url resolves to dist/, not src/).
  const p = join(process.cwd(), 'src', 'data', 'download-platforms.yaml');
  return yaml.load(readFileSync(p, 'utf8')) as Platform[];
}

export function matchAssets(
  release: Release | undefined, platforms: Platform[],
): { platform: Platform; assetUrl: string | null }[] {
  return platforms.map((platform) => {
    if (!release) return { platform, assetUrl: null };
    const re = new RegExp(platform.match, 'i');
    const hit = release.assets.find((a) => re.test(a.name));
    return { platform, assetUrl: hit ? hit.url : null };
  });
}
