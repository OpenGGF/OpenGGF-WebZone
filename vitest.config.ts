import { getViteConfig } from 'astro/config';

export default getViteConfig({
  test: {
    environment: 'node',
    include: ['test/**/*.test.ts'],
    // Several tests shell out to a full `astro build` (+ pagefind) which all write
    // to the same dist/ directory. Run test files serially so those builds never
    // race each other (parallel builds collide on dist/.prerender), and give them
    // a generous timeout — a cold full build comfortably exceeds vitest's 5s default.
    fileParallelism: false,
    testTimeout: 120_000,
  },
});
