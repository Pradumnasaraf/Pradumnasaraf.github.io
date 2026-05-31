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

const TimelinePage = () => {
  return (
    <>
      <PageTopbar />

      <div className="min-h-screen">
        <h1 className="timeline-title">Timeline</h1>
        <div className="timeline">
          {entries.map((entry, index) => {
            const side = index % 2 === 0 ? 'right' : 'left';
            return (
              <div key={index} className={`container ${side}-container`}>
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
            );
          })}
        </div>
      </div>
    </>
  );
};

export default TimelinePage;
