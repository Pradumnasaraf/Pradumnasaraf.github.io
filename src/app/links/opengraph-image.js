import { OG_SIZE, renderOg } from '@/lib/og';

export const alt = 'Pradumna Saraf: Links';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default async function Image() {
  return renderOg({
    title: 'Links',
    subtitle: 'Everywhere you can find me online',
    items: [
      { label: 'GitHub', meta: 'github.com/Pradumnasaraf' },
      { label: 'X', meta: 'x.com/pradumna_saraf' },
      { label: 'LinkedIn', meta: 'linkedin.com/in/pradumnasaraf' },
    ],
  });
}
