'use client';

import { useEffect, useState } from 'react';

const RADIUS = 20;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY;
      const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const nextProgress =
        scrollableHeight > 0 ? Math.min(scrollTop / scrollableHeight, 1) : 0;

      setProgress(nextProgress);

      const nextVisible = nextProgress >= 0.3;
      setIsVisible((previous) =>
        previous === nextVisible ? previous : nextVisible
      );
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });

    // Recompute when the page grows/shrinks without a scroll (e.g. "Load more
    // posts" appending cards, filter changes, lazy images), so the ring
    // reflects the new document height immediately instead of only on next scroll.
    const resizeObserver = new ResizeObserver(update);
    resizeObserver.observe(document.body);

    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
      resizeObserver.disconnect();
    };
  }, []);

  if (!isVisible) return null;

  return (
    <button
      type="button"
      className="back-to-top-button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      title="Back to top"
    >
      <svg
        className="back-to-top-progress"
        viewBox="0 0 44 44"
        aria-hidden="true"
      >
        <circle
          className="back-to-top-progress-track"
          cx="22"
          cy="22"
          r={RADIUS}
        />
        <circle
          className="back-to-top-progress-bar"
          cx="22"
          cy="22"
          r={RADIUS}
          style={{
            strokeDasharray: CIRCUMFERENCE,
            strokeDashoffset: CIRCUMFERENCE * (1 - progress),
          }}
        />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 19V5" />
        <path d="m5 12 7-7 7 7" />
      </svg>
    </button>
  );
}
