'use client';

import './not-found.css';
import Link from 'next/link';

export default function Error({ reset }) {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1 className="not-found-title">Something went wrong</h1>

        <p className="not-found-description">
          An unexpected error occurred. You can try again, or head back home.
        </p>

        <div className="not-found-actions">
          <button type="button" onClick={reset} className="primary-button">
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
              <path d="M23 4v6h-6" />
              <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
            </svg>
            Try again
          </button>

          <Link href="/" className="secondary-button">
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
        </div>
      </div>
    </div>
  );
}
