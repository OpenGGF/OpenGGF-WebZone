// YAML date-only values are midnight UTC. Include the exact publication instant.
export function publishedNews<T extends { data: { date: Date } }>(posts: T[], now: Date): T[] {
  return posts.filter((post) => post.data.date.getTime() <= now.getTime())
    .sort((a, b) => +b.data.date - +a.data.date);
}
