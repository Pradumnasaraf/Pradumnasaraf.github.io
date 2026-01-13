'use client';

import { useState } from 'react';
import { FaTwitter, FaLinkedin, FaLink } from 'react-icons/fa';

export default function BlogShareButtons({ url, title }) {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
  };

  const copyToClipboard = async () => {
    if (typeof window !== 'undefined' && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        const textArea = document.createElement('textarea');
        textArea.value = url;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.select();
        try {
          document.execCommand('copy');
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch {
          // Clipboard not supported
        }
        document.body.removeChild(textArea);
      }
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
          aria-label="Share on Twitter"
        >
          <FaTwitter />
        </a>
        <a
          href={shareLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="blog-share-button linkedin"
          aria-label="Share on LinkedIn"
        >
          <FaLinkedin />
        </a>
        <button
          onClick={copyToClipboard}
          className="blog-share-button copy"
          aria-label={copied ? 'Link copied!' : 'Copy link'}
          type="button"
        >
          {copied ? '✓' : <FaLink />}
        </button>
      </div>
    </div>
  );
}
