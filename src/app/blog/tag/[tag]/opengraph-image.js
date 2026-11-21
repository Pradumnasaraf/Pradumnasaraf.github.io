import { OG_SIZE, monthYear, renderOg, truncate } from '@/lib/og';
import { getPostsByTag } from '@/lib/blog';

export const alt = 'Pradumna Saraf: articles by topic';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default async function Image({ params }) {
  const { tag } = await params;
  const posts = getPostsByTag(tag);
  return renderOg({
    title: `#${tag}`,
    subtitle: `${posts.length} ${posts.length === 1 ? 'article' : 'articles'} on ${tag}`,
    items: posts.slice(0, 3).map((post) => ({
      label: truncate(post.title, 52),
      meta: monthYear(post.date),
    })),
  });
}
