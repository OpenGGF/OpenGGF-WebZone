import { describe, it, expect } from 'vitest';
import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';

describe('pagefind', () => {
  it('full build produces a pagefind index in dist', () => {
    const result = spawnSync('npm run build', { shell: true, encoding: 'utf8' });
    expect(result.status).toBe(0);
    expect(existsSync('dist/pagefind/pagefind.js')).toBe(true);
  });
});
