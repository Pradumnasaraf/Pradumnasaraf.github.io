'use client';

import Link from 'next/link';

export default function BlogBackButton() {
  return (
    <Link
      href="/blog"
      className="blog-post-back-button"
      aria-label="Back to Blog"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M19 12H5M12 19l-7-7 7-7" />
      </svg>
    </Link>
  );
}
