import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Astro 6 Content Layer: collections load via a glob() loader. Entry `id` is the
// file path under `base` without extension (e.g. news/2026-06-18-hello.md -> id
// "2026-06-18-hello"; docs/guide/playing/controls.md -> id "guide/playing/controls").
const news = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/news' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    date: z.date(),
    summary: z.string(),
    // Public/remote URLs stay URLs; relative files go through Astro's asset pipeline.
    image: z.union([z.string().regex(/^(\/(?!\/)|https:\/\/)/), image()]).optional(),
  }),
});

const docs = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/docs' }),
  schema: z.object({
    title: z.string(),
    group: z.string(),
    order: z.number().default(99),
  }),
});

export const collections = { news, docs };
