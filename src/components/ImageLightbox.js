'use client';

import { useEffect, useState } from 'react';

export default function ImageLightbox() {
  const [isOpen, setIsOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState('');
  const [imageAlt, setImageAlt] = useState('');

  const closeLightbox = () => {
    setIsOpen(false);
    document.body.style.overflow = '';
  };

  useEffect(() => {
    const handleImageClick = (e) => {
      const target = e.target;

      // Check if clicked element is an image
      if (target.tagName === 'IMG' && !target.closest('.blog-post-thumbnail')) {
        e.preventDefault();
        e.stopPropagation();

        let src = target.src || target.getAttribute('src');
        const alt = target.alt || '';

        // Get the full-size image URL
        // If it's a Next.js optimized image, try to get the original
        if (src && src.includes('_next/image')) {
          // Extract the original URL from Next.js optimized image
          const urlMatch = src.match(/url=(.+?)(?:&|$)/);
          if (urlMatch) {
            src = decodeURIComponent(urlMatch[1]);
          } else {
            // Try to get from parent's data attributes or srcset
            const parent = target.parentElement;
            if (parent) {
              const dataSrc =
                parent.getAttribute('data-src') ||
                target.getAttribute('data-src') ||
                target.getAttribute('data-original');
              if (dataSrc) {
                src = dataSrc;
              }
            }
          }
        }

        // For Next.js Image component, try to get original src from parent
        const nextImageParent = target.closest('span[style*="position"]');
        if (nextImageParent) {
          const imgElement = nextImageParent.querySelector('img');
          if (imgElement && imgElement.src) {
            src = imgElement.src;
          }
        }

        if (src) {
          setImageSrc(src);
          setImageAlt(alt);
          setIsOpen(true);
          document.body.style.overflow = 'hidden';
        }
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        closeLightbox();
      }
    };

    // Add click listeners to all images in blog content
    const blogContent = document.querySelector('.blog-post-content');
    const featuredImageContainer = document.querySelector(
      '.blog-post-featured-image'
    );

    if (blogContent) {
      blogContent.addEventListener('click', handleImageClick);
    }

    if (featuredImageContainer) {
      const featuredImg = featuredImageContainer.querySelector('img');
      if (featuredImg) {
        featuredImg.style.cursor = 'pointer';
        featuredImageContainer.style.cursor = 'pointer';
        featuredImageContainer.addEventListener('click', handleImageClick);
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      if (blogContent) {
        blogContent.removeEventListener('click', handleImageClick);
      }
      if (featuredImageContainer) {
        featuredImageContainer.removeEventListener('click', handleImageClick);
      }
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="image-lightbox-overlay"
      onClick={closeLightbox}
      onKeyDown={(e) => {
        if (e.key === 'Escape') closeLightbox();
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Image lightbox"
      tabIndex={-1}
    >
      <button
        className="image-lightbox-close"
        onClick={closeLightbox}
        aria-label="Close lightbox"
        type="button"
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
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
      <div
        className="image-lightbox-content"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={imageSrc}
          alt={imageAlt}
          className="image-lightbox-image"
          loading="eager"
        />
      </div>
    </div>
  );
}
