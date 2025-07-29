'use client';
import './not-found.css';
import Link from 'next/link';
import { useEffect } from 'react';

export default function NotFound() {
  useEffect(() => {
    document.title = '404 - Page Not Found | Pradumna Saraf';
  }, []);

  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <div className="not-found-illustration">
          <div className="error-code">404</div>
        </div>

        <h1 className="not-found-title">Oops! Page Not Found</h1>

        <p className="not-found-description">
          The page you&apos;re looking for seems to have drifted off into space.
          Don&apos;t worry, let&apos;s get you back on track!
        </p>

        <div className="not-found-actions">
          <Link href="/" className="primary-button">
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
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>

          <Link href="/contact" className="secondary-button">
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
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            Contact Me
          </Link>
        </div>

        <div className="not-found-suggestions">
          <p>You might want to check out:</p>
          <div className="suggestion-links">
            <Link href="/timeline">Timeline</Link>
            <Link href="/toolkit">Toolkit</Link>
            <Link href="/photography">Photography</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
