export interface Release {
  tag: string; name: string; url: string; prerelease: boolean;
  publishedAt: string; body: string; assets: { name: string; url: string }[];
}
const API = 'https://api.github.com/repos/jamesj999/OpenGGF/releases?per_page=20';

function normalize(raw: any): Release {
  return {
    tag: raw.tag_name, name: raw.name || raw.tag_name, url: raw.html_url,
    prerelease: !!raw.prerelease, publishedAt: raw.published_at, body: raw.body || '',
    assets: (raw.assets || []).map((a: any) => ({ name: a.name, url: a.browser_download_url })),
  };
}

export async function getReleaseData(
  opts: { token?: string; cache?: Release[] } = {},
): Promise<{ releases: Release[]; source: 'live' | 'cache' | 'none' }> {
  try {
    const headers: Record<string, string> = { Accept: 'application/vnd.github+json' };
    if (opts.token) headers.Authorization = `Bearer ${opts.token}`;
    const res = await fetch(API, { headers });
    if (!res.ok) throw new Error(`GitHub API ${res.status}`);
    const data = await res.json();
    if (Array.isArray(data) && data.length) return { releases: data.map(normalize), source: 'live' };
    throw new Error('empty');
  } catch {
    if (opts.cache && opts.cache.length) return { releases: opts.cache, source: 'cache' };
    return { releases: [], source: 'none' };
  }
}

export function selectHeroVersion(
  releases: Release[], fallback?: string,
): { label: string; isPre: boolean } | null {
  const stable = releases.find((r) => !r.prerelease);
  if (stable) return { label: stable.tag, isPre: false };
  const pre = releases.find((r) => r.prerelease);
  if (pre) return { label: `${pre.tag} (pre)`, isPre: true };
  if (fallback) return { label: fallback, isPre: false };
  return null;
}
