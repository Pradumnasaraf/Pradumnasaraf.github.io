import { OG_SIZE, renderOg } from '@/lib/og';
import places from './travel.json';

export const alt = 'Pradumna Saraf: Travel';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default async function Image() {
  const countries = new Set(places.map((p) => p.flag || p.country)).size;
  return renderOg({
    title: 'Travel',
    subtitle: `${places.length} places across ${countries} countries`,
    items: places.slice(0, 3).map((p) => ({
      label: p.place,
      meta: p.country || undefined,
    })),
  });
}
