import { Fragment } from 'react';
import './style.css';
import Link from 'next/link';
import Image from 'next/image';
import PageTopbar from '@/components/PageTopbar';
import entries from './timeline.json';

const ArrowIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M7 17l10-10M17 17V7h-7"></path>
  </svg>
);

function entryYear(entry) {
  return String(entry.date || '').match(/\d{4}/)?.[0] || '';
}

const TimelinePage = () => {
  // Must match the moveline animation duration in style.css so the last card
  // fades in as the line finishes drawing.
  const LINE_DURATION = 39.5;
  const step = entries.length > 1 ? LINE_DURATION / (entries.length - 1) : 0;

  return (
    <>
      <PageTopbar />

      <div className="min-h-screen">
        <header className="page-header page-header-tight">
          <h1 className="page-title">Timeline</h1>
        </header>
        <div className="timeline">
          {entries.map((entry, index) => {
            const side = index % 2 === 0 ? 'right' : 'left';
            const year = entryYear(entry);
            const newYear =
              year && (index === 0 || entryYear(entries[index - 1]) !== year);
            const delay = `${(index * step).toFixed(2)}s`;
            return (
              <Fragment key={index}>
                {newYear && (
                  <div
                    className="timeline-year"
                    style={{ animationDelay: delay }}
                  >
                    <span>{year}</span>
                  </div>
                )}
                <div
                  className={`container ${side}-container`}
                  style={{ animationDelay: delay }}
                >
                  <Image
                    src={entry.image.src}
                    alt={entry.image.alt}
                    width={40}
                    height={40}
                  />
                  <div className="text-box">
                    {entry.link && (
                      <Link
                        href={entry.link.href}
                        className="source-button"
                        aria-label={entry.link.ariaLabel}
                      >
                        <ArrowIcon />
                      </Link>
                    )}
                    <h2>{entry.title}</h2>
                    <small>{entry.date}</small>
                    <p>{entry.description}</p>
                    <span className={`${side}-container-arrow`}></span>
                  </div>
                </div>
              </Fragment>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default TimelinePage;
