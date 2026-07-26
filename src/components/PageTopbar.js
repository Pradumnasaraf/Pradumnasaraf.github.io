import Link from 'next/link';
import BackArrowIcon from './BackArrowIcon';

export default function PageTopbar({
  href = '/',
  ariaLabel = 'Back to home page',
  children,
}) {
  return (
    <div className="page-topbar" role="banner">
      <div className="page-topbar-inner">
        <Link href={href} className="back-button" aria-label={ariaLabel}>
          <BackArrowIcon />
        </Link>
        {children}
      </div>
    </div>
  );
}
