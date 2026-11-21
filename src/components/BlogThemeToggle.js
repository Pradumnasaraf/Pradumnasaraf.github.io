'use client';

import { useEffect, useId, useSyncExternalStore } from 'react';

const STORAGE_KEY = 'blog-theme';
const ATTR = 'data-blog-theme';

const listeners = new Set();

function getHtmlEl() {
  return typeof document === 'undefined' ? null : document.documentElement;
}

function getSnapshot() {
  return getHtmlEl()?.getAttribute(ATTR) === 'dark' ? 'dark' : 'light';
}

function getServerSnapshot() {
  return 'light';
}

function subscribe(callback) {
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
}

function setTheme(next) {
  const el = getHtmlEl();
  if (el) el.setAttribute(ATTR, next);
  try {
    localStorage.setItem(STORAGE_KEY, next);
  } catch {
    // localStorage may be unavailable (private mode, disabled storage); ignore.
  }
  listeners.forEach((cb) => cb());
}

// One icon that morphs between a crescent moon (light theme) and a sun (dark
// theme): a mask circle slides off the disc while the rays rotate in. The
// motion lives in .theme-icon rules in blog/style.css.
function ThemeIcon({ theme }) {
  const maskId = `theme-icon-mask-${useId().replace(/:/g, '')}`;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      className="theme-icon"
      data-theme={theme}
      aria-hidden="true"
      focusable="false"
    >
      <mask id={maskId}>
        <rect width="24" height="24" fill="white" />
        <circle
          className="theme-icon-shadow"
          cx="17"
          cy="7"
          r="7"
          fill="black"
        />
      </mask>
      <circle
        className="theme-icon-disc"
        cx="12"
        cy="12"
        r="8.5"
        fill="currentColor"
        mask={`url(#${maskId})`}
      />
      <g
        className="theme-icon-rays"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <path d="M12 1.5v2M12 20.5v2M1.5 12h2M20.5 12h2M4.6 4.6l1.4 1.4M18 18l1.4 1.4M4.6 19.4L6 18M18 6l1.4-1.4" />
      </g>
    </svg>
  );
}

export default function BlogThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  // The pre-paint Script in the root layout only runs on the first page load.
  // On client-side navigations (for example / to /blog) it doesn't fire,
  // so we reapply the stored preference here.
  useEffect(() => {
    let desired = null;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'dark' || stored === 'light') {
        desired = stored;
      } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        desired = 'dark';
      }
    } catch {
      // localStorage / matchMedia may be unavailable; ignore.
    }
    if (desired && getSnapshot() !== desired) {
      setTheme(desired);
    }
  }, []);

  const label =
    theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';

  return (
    <div className="blog-theme-toggle-wrap">
      <button
        type="button"
        className="blog-theme-toggle-button"
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        aria-label={label}
        title={label}
      >
        <ThemeIcon theme={theme} />
      </button>
    </div>
  );
}
