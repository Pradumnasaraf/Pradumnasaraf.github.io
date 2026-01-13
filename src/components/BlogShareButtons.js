'use client';

import { useRef, useState } from 'react';
import { FaTwitter, FaLinkedin, FaFacebook, FaLink } from 'react-icons/fa';

export default function BlogShareButtons({ url, title }) {
  const copyButtonRef = useRef(null);
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
  };

  const copyToClipboard = async () => {
    if (typeof window !== 'undefined' && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 2000);
      } catch {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = url;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.select();
        try {
          document.execCommand('copy');
          setCopied(true);
          setTimeout(() => {
            setCopied(false);
          }, 2000);
        } catch (fallbackErr) {
          console.error('Failed to copy:', fallbackErr);
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
        <a
          href={shareLinks.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="blog-share-button facebook"
          aria-label="Share on Facebook"
        >
          <FaFacebook />
        </a>
        <button
          ref={copyButtonRef}
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
