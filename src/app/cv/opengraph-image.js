import { OG_SIZE, renderOg } from '@/lib/og';

export const alt = 'Pradumna Saraf: CV';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default async function Image() {
  return renderOg({
    title: 'CV',
    subtitle: 'Experience, recognitions and community work',
    items: [
      { label: 'Quality Assurance Engineer', meta: 'Kestra · 2025 to present' },
      { label: 'DevRel as a Service', meta: 'Freelance · 2024 to present' },
      { label: 'Developer Advocate', meta: 'Livecycle · 2023 to 2024' },
    ],
  });
}
