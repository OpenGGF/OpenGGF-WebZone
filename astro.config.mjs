import { defineConfig } from 'astro/config';
import yaml from '@rollup/plugin-yaml';
export default defineConfig({
  site: 'https://openggf.com',
  build: { format: 'directory' },
  vite: { plugins: [yaml()] },
});
