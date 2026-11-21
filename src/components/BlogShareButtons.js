'use client';

import { useState } from 'react';
import { FaLinkedin, FaLink } from 'react-icons/fa';
import { SiX } from 'react-icons/si';
import { copyText } from '@/lib/clipboard';

export default function BlogShareButtons({ url, title }) {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
  };

  const copyToClipboard = async () => {
    if (await copyText(url)) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="blog-post-share">
      <span className="blog-post-share-label">Share this post:</span>
      <div className="blog-post-share-buttons">
        <a
          href={shareLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="blog-share-button twitter"
          aria-label="Share on X"
          title="Share on X"
        >
          <SiX />
        </a>
        <a
          href={shareLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="blog-share-button linkedin"
          aria-label="Share on LinkedIn"
          title="Share on LinkedIn"
        >
          <FaLinkedin />
        </a>
        <button
          onClick={copyToClipboard}
          className="blog-share-button copy"
          aria-label={copied ? 'Link copied!' : 'Copy link'}
          title={copied ? 'Link copied!' : 'Copy link'}
          type="button"
        >
          {copied ? '✓' : <FaLink />}
        </button>
      </div>
    </div>
  );
}
