import { OG_SIZE, renderOg, truncate } from '@/lib/og';
import talks from './speaking.json';

export const alt = 'Pradumna Saraf: Speaking';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default async function Image() {
  return renderOg({
    title: 'Speaking',
    subtitle: `${talks.length} talks at conferences, meetups and community events`,
    items: talks.slice(0, 3).map((talk) => ({
      label: truncate(talk.topic || talk.title, 52),
      meta: `${talk.upcoming ? 'Upcoming · ' : ''}${truncate(talk.event, 40)}`,
    })),
  });
}
