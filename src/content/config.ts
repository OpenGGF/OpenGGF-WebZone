import { defineCollection, z } from 'astro:content';
const news = defineCollection({
  type: 'content',
  schema: z.object({ title: z.string(), date: z.date(), summary: z.string(), image: z.string().optional() }),
});
const docs = defineCollection({
  type: 'content',
  schema: z.object({ title: z.string(), group: z.string(), order: z.number().default(99) }),
});
export const collections = { news, docs };
