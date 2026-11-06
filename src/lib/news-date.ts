// News dates are calendar days (frontmatter `date: 2026-11-05` parses as UTC midnight),
// so format in UTC or readers west of Greenwich see the day before.
export function formatNewsDate(date: Date): string {
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
}
