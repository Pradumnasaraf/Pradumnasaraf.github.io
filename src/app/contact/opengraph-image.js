import { OG_SIZE, renderOg } from '@/lib/og';

export const alt = 'Pradumna Saraf: Contact';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default async function Image() {
  return renderOg({
    title: 'Contact',
    subtitle: 'Collaborations, talks, or just to say hi',
  });
}
