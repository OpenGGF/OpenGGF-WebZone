import { getCollection } from 'astro:content';
import { publishedNews } from './published-news';

// Capture one cutoff for all consumers in this build, including static routes.
const buildTime = new Date();

export async function getPublishedNews() {
  return publishedNews(await getCollection('news'), buildTime);
}
