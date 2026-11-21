'use client';

import { useEffect, useSyncExternalStore } from 'react';
import { flushSync } from 'react-dom';

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

const REVEAL_MS = 650;

// Reveals the new theme as a circle growing out of the toggle button, using
// the View Transitions API. Falls back to an instant switch when the API is
// missing or the visitor prefers reduced motion.
function switchThemeFrom(button, next) {
  const reduceMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;
  if (!document.startViewTransition || reduceMotion || !button) {
    setTheme(next);
    return;
  }

  const rect = button.getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;
  const radius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y)
  );

  const transition = document.startViewTransition(() => {
    flushSync(() => setTheme(next));
  });

  transition.ready
    .then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${radius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: REVEAL_MS,
          easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
          pseudoElement: '::view-transition-new(root)',
        }
      );
    })
    .catch(() => {});
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
        onClick={(event) =>
          switchThemeFrom(
            event.currentTarget,
            theme === 'dark' ? 'light' : 'dark'
          )
        }
        aria-label={label}
        title={label}
      >
        <span key={theme} className="blog-theme-toggle-icon">
          {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
        </span>
      </button>
    </div>
  );
}
