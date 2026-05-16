'use client';

import { useEffect, useSyncExternalStore } from 'react';

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

function SunIcon() {
  return (
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
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
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
      aria-hidden="true"
      focusable="false"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

export default function BlogThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  // The pre-paint Script in the root layout only runs on the first page load.
  // On client-side navigations (e.g. /home → /blog via <Link>) it doesn't fire,
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
        {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
      </button>
    </div>
  );
}
