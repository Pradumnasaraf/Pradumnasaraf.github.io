import Link from 'next/link';

export default function PageTopbar({ href = '/', ariaLabel, children }) {
  return (
    <div className="page-topbar" role="banner">
      <div className="page-topbar-inner">
        <Link href={href} className="back-button" aria-label={ariaLabel}>
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
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </Link>
        {children}
      </div>
    </div>
  );
}
