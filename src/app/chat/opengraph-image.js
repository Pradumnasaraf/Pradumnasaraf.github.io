import { OG_SIZE, renderOg } from '@/lib/og';

export const alt = 'Pradumna Saraf: Schedule a meeting';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default async function Image() {
  return renderOg({
    title: "Let's chat",
    subtitle: 'Pick a time that works for you and book a call with me',
  });
}
