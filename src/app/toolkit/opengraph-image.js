import { OG_SIZE, renderOg } from '@/lib/og';
import sections from './toolkit.json';

export const alt = 'Pradumna Saraf: Toolkit';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default async function Image() {
  const hardware = sections.find((s) => s.id === 'hardware')?.groups || [];
  const pick = (name) => hardware.find((g) => g.name === name)?.items || [];
  return renderOg({
    title: 'Toolkit',
    subtitle: 'The hardware, software and tools I use every day',
    items: [
      { label: pick('Computer').at(-2) || '', meta: 'Computer' },
      { label: pick('Monitor').at(-1) || '', meta: 'Monitor' },
      { label: pick('Camera')[0] || '', meta: 'Camera' },
    ].filter((item) => item.label),
  });
}
