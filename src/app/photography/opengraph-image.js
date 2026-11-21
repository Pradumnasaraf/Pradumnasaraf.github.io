import { OG_SIZE, renderOg } from '@/lib/og';
import images from './images.json';

export const alt = 'Pradumna Saraf: Photography';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default async function Image() {
  return renderOg({
    title: 'Photography',
    subtitle: `${images.length} photos from my travels and everyday life`,
  });
}
