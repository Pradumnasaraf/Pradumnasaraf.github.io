import { OG_SIZE, renderOg } from '@/lib/og';
import projects from './projects.json';

export const alt = 'Pradumna Saraf: Projects';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default async function Image() {
  const top = [...projects].sort((a, b) => (b.stars || 0) - (a.stars || 0));
  return renderOg({
    title: 'Projects',
    subtitle: `${projects.length} open source projects I've built and maintain`,
    items: top.slice(0, 3).map((project) => ({
      label: project.name,
      meta: `${Number(project.stars || 0).toLocaleString('en-US')} stars · ${(project.technologies || []).slice(0, 2).join(', ')}`,
    })),
  });
}
