import { OG_SIZE, renderOg } from '@/lib/og';

export const alt = 'Pradumna Saraf: Toolkit';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default async function Image() {
  return renderOg({
    title: 'Toolkit',
    subtitle: 'The hardware, software and tools I use every day',
    items: [
      { label: 'MacBook Pro 14 M4 Pro', meta: 'Computer' },
      { label: 'LG UltraWide 34 inch', meta: 'Monitor' },
      { label: 'Cursor and Warp', meta: 'Editor and terminal' },
    ],
  });
}
