'use client';

import { useEffect, useState } from 'react';

export default function TableOfContents() {
  const [headings, setHeadings] = useState([]);

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

  return (
    <nav className="table-of-contents" aria-label="Table of contents">
      <h3 className="table-of-contents-title">Table of Contents</h3>
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
              }}
              className="table-of-contents-link"
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
