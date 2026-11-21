'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

const MAIN_LINKS = [
  { href: '/blog', label: 'Blog' },
  { href: '/projects', label: 'Projects' },
  { href: '/speaking', label: 'Speaking' },
  { href: 'https://rebasemedia.com', label: 'Services', external: true },
  { href: '/timeline', label: 'Timeline' },
  {
    href: 'https://pradumnasaraf.substack.com',
    label: 'Newsletter',
    external: true,
  },
  { href: '/contact', label: 'Contact' },
];

// Shown inline in the mobile menu and in the "more" dropdown on desktop.
const EXTRA_LINKS = [
  { href: '/toolkit', label: 'Toolkit' },
  { href: '/photography', label: 'Photography' },
  { href: '/travel', label: 'Travel' },
];

function NavLink({ link, onClick }) {
  return (
    <Link
      href={link.href}
      onClick={onClick}
      {...(link.external
        ? { target: '_blank', rel: 'noopener noreferrer' }
        : {})}
    >
      {link.label}
    </Link>
  );
}

function ChevronDown() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export default function HomeNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isExtraMenuOpen, setIsExtraMenuOpen] = useState(false);
  const [isMobileMoreOpen, setIsMobileMoreOpen] = useState(false);
  const extraMenuRef = useRef(null);

  const toggleMenu = () => {
    const next = !isMenuOpen;
    setIsMenuOpen(next);
    if (!next) setIsMobileMoreOpen(false);
    setIsExtraMenuOpen(false);
  };

  const closeAllMenus = () => {
    setIsMenuOpen(false);
    setIsExtraMenuOpen(false);
    setIsMobileMoreOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        extraMenuRef.current &&
        !extraMenuRef.current.contains(event.target)
      ) {
        setIsExtraMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="nav">
      <button
        type="button"
        className="hamburger"
        onClick={toggleMenu}
        aria-label="Toggle navigation menu"
        aria-expanded={isMenuOpen}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      <div className="nav-links-group">
        <div className={`pages ${isMenuOpen ? 'active' : ''}`}>
          {MAIN_LINKS.map((link) => (
            <span key={link.href} className="page-item">
              <NavLink link={link} onClick={closeAllMenus} />
            </span>
          ))}
          <span className="page-item page-item-more">
            <button
              type="button"
              className="more-pages-toggle arrow-only-toggle"
              onClick={() => setIsMobileMoreOpen(!isMobileMoreOpen)}
              aria-expanded={isMobileMoreOpen}
              aria-label="Toggle extra pages"
            >
              <ChevronDown />
            </button>
          </span>
          {EXTRA_LINKS.map((link) => (
            <span
              key={link.href}
              className={`page-item extra-page-item ${isMobileMoreOpen ? 'active' : ''}`}
            >
              <NavLink link={link} onClick={closeAllMenus} />
            </span>
          ))}
        </div>

        <div className="extra-menu" ref={extraMenuRef}>
          <button
            type="button"
            className="extra-menu-toggle"
            onClick={() => setIsExtraMenuOpen(!isExtraMenuOpen)}
            aria-label="Open more pages menu"
            aria-expanded={isExtraMenuOpen}
          >
            <ChevronDown />
          </button>
          <div
            className={`extra-menu-dropdown ${isExtraMenuOpen ? 'active' : ''}`}
          >
            {EXTRA_LINKS.map((link) => (
              <NavLink key={link.href} link={link} onClick={closeAllMenus} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
