import { OG_SIZE, renderOg, truncate } from '@/lib/og';
import timeline from './timeline.json';

export const alt = 'Pradumna Saraf: Timeline';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default async function Image() {
  const list = Array.isArray(timeline) ? timeline : [];
  const first = list[list.length - 1];
  const since = String(first?.date || '').match(/\d{4}/)?.[0];
  return renderOg({
    title: 'Timeline',
    subtitle: `${list.length} milestones${since ? ` since ${since}` : ''}`,
    items: list.slice(0, 3).map((entry) => ({
      label: truncate(entry.title, 52),
      meta: entry.date,
    })),
  });
}
