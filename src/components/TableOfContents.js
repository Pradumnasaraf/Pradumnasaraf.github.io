'use client';

import { useEffect, useRef, useState } from 'react';

export default function TableOfContents() {
  const [headings, setHeadings] = useState([]);
  const tocRef = useRef(null);

  useEffect(() => {
    const blogContent = document.querySelector('.blog-post-content');
    if (!blogContent) return;

    const headingElements = blogContent.querySelectorAll('h2, h3');
    const headingData = Array.from(headingElements).map((heading) => {
      const id =
        heading.id ||
        heading.textContent
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^a-z0-9-]/g, '');
      if (!heading.id) {
        heading.id = id;
      }
      return {
        id,
        text: heading.textContent,
        level: heading.tagName.toLowerCase(),
      };
    });

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHeadings(headingData);
  }, []);

  if (headings.length === 0) return null;

  const scrollToHeading = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const isMobile = () =>
    window.matchMedia && window.matchMedia('(max-width: 768px)').matches;

  return (
    <details
      className="table-of-contents"
      open
      ref={tocRef}
      aria-label="Table of contents"
    >
      <summary
        className="table-of-contents-summary"
        onClick={(event) => {
          // Keep desktop TOC always open; collapse/expand only on mobile.
          if (!isMobile()) {
            event.preventDefault();
          }
        }}
      >
        <span className="table-of-contents-title">On this page</span>
        <span className="table-of-contents-chevron" aria-hidden="true">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </span>
      </summary>
      <ul className="table-of-contents-list">
        {headings.map((heading) => (
          <li
            key={heading.id}
            className={`table-of-contents-item ${heading.level === 'h3' ? 'table-of-contents-item-nested' : ''}`}
          >
            <a
              href={`#${heading.id}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToHeading(heading.id);
                if (isMobile() && tocRef.current) {
                  tocRef.current.open = false;
                }
              }}
              className="table-of-contents-link"
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </details>
  );
}
