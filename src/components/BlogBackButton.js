import Link from 'next/link';
import BackArrowIcon from './BackArrowIcon';

export default function BlogBackButton() {
  return (
    <Link
      href="/blog"
      className="blog-post-back-button"
      aria-label="Back to Blog"
    >
      <BackArrowIcon />
    </Link>
  );
}
