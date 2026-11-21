import { OG_SIZE, renderOg } from '@/lib/og';
import { getAllPosts } from '@/lib/blog';
import projects from './projects/projects.json';
import speaking from './speaking/speaking.json';

export const alt =
  'Pradumna Saraf: Open Source Developer, Docker Captain and Microsoft MVP';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default async function Image() {
  const posts = getAllPosts();
  return renderOg({
    title: 'Pradumna Saraf',
    subtitle: 'Open Source Developer, Docker Captain and Microsoft MVP',
    items: [
      {
        label: `${posts.length} articles`,
        meta: 'Docker, Kubernetes and AI tooling',
      },
      {
        label: `${speaking.length} talks`,
        meta: 'KubeCon, Docker Captains Summit and more',
      },
      {
        label: `${projects.length} open source projects`,
        meta: 'MCP servers, GitHub Actions, apps',
      },
    ],
  });
}
