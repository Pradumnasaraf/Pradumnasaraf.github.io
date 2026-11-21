import { OG_SIZE, monthYear, renderOg, truncate } from '@/lib/og';
import { getAllPosts } from '@/lib/blog';

export const alt = 'Pradumna Saraf: Blog';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default async function Image() {
  const posts = getAllPosts();
  return renderOg({
    title: 'Blog',
    subtitle: `${posts.length} articles on Docker, Kubernetes, DevOps and AI tooling`,
    items: posts.slice(0, 3).map((post) => ({
      label: truncate(post.title, 52),
      meta: monthYear(post.date),
    })),
  });
}
