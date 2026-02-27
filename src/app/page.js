'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import './globals.css';
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';
import KonamiGame from '@/components/KonamiGame';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isExtraMenuOpen, setIsExtraMenuOpen] = useState(false);
  const [isMobileMoreOpen, setIsMobileMoreOpen] = useState(false);
  const [showGame, setShowGame] = useState(false);
  const extraMenuRef = useRef(null);
  // eslint-disable-next-line no-unused-vars
  const [keySequence, setKeySequence] = useState([]);

  const toggleMenu = () => {
    const nextState = !isMenuOpen;
    setIsMenuOpen(nextState);
    if (!nextState) {
      setIsMobileMoreOpen(false);
    }
    setIsExtraMenuOpen(false);
  };

  const toggleExtraMenu = () => {
    setIsExtraMenuOpen(!isExtraMenuOpen);
  };

  const closeAllMenus = () => {
    setIsMenuOpen(false);
    setIsExtraMenuOpen(false);
    setIsMobileMoreOpen(false);
  };

  useEffect(() => {
    const konamiCode = [
      'ArrowUp',
      'ArrowUp',
      'ArrowDown',
      'ArrowDown',
      'ArrowLeft',
      'ArrowRight',
      'ArrowLeft',
      'ArrowRight',
      'b',
      'a',
    ];
    const handleKeyDown = (e) => {
      // Only add to sequence if it's one of the Konami code keys
      if (konamiCode.includes(e.key)) {
        setKeySequence((prev) => {
          const newSequence = [...prev, e.key].slice(-10);
          // Check if the sequence matches exactly
          if (
            newSequence.length === konamiCode.length &&
            newSequence.every((key, index) => key === konamiCode[index])
          ) {
            setShowGame(true);
            return [];
          }
          return newSequence;
        });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

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
    <>
      <div className="nav">
        <div className="hamburger" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className="nav-links-group">
          <div className={`pages ${isMenuOpen ? 'active' : ''}`}>
            <span className="page-item">
              <Link href="/blog" onClick={closeAllMenus}>
                Blog
              </Link>
            </span>
            <span className="page-item">
              <Link href="/timeline" onClick={closeAllMenus}>
                Timeline
              </Link>
            </span>
            <span className="page-item">
              <Link href="https://rebasemedia.com" onClick={closeAllMenus}>
                Services
              </Link>
            </span>
            <span className="page-item">
              <Link
                href="https://pradumnasaraf.substack.com"
                onClick={closeAllMenus}
              >
                Newsletter
              </Link>
            </span>
            <span className="page-item">
              <Link href="/toolkit" onClick={closeAllMenus}>
                Toolkit
              </Link>
            </span>
            <span className="page-item">
              <Link href="/photography" onClick={closeAllMenus}>
                Photography
              </Link>
            </span>
            <span className="page-item">
              <Link href="/contact" onClick={closeAllMenus}>
                Contact
              </Link>
            </span>
            <span className="page-item page-item-more">
              <button
                type="button"
                className="more-pages-toggle arrow-only-toggle"
                onClick={() => setIsMobileMoreOpen(!isMobileMoreOpen)}
                aria-expanded={isMobileMoreOpen}
                aria-label="Toggle extra pages"
              >
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
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
            </span>
            <span
              className={`page-item extra-page-item ${isMobileMoreOpen ? 'active' : ''}`}
            >
              <Link href="/projects" onClick={closeAllMenus}>
                Projects
              </Link>
            </span>
            <span
              className={`page-item extra-page-item ${isMobileMoreOpen ? 'active' : ''}`}
            >
              <Link href="/speaking" onClick={closeAllMenus}>
                Speaking
              </Link>
            </span>
          </div>

          <div className="extra-menu" ref={extraMenuRef}>
            <button
              type="button"
              className="extra-menu-toggle"
              onClick={toggleExtraMenu}
              aria-label="Open more pages menu"
              aria-expanded={isExtraMenuOpen}
            >
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
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
            <div
              className={`extra-menu-dropdown ${isExtraMenuOpen ? 'active' : ''}`}
            >
              <Link href="/projects" onClick={closeAllMenus}>
                Projects
              </Link>
              <Link href="/speaking" onClick={closeAllMenus}>
                Speaking
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="heading">
        <div className="left">
          <div className="socialmedia">
            {/* Using React Icons */}
            <Link href="https://github.com/Pradumnasaraf">
              <FaGithub />
            </Link>
            <Link href="https://twitter.com/pradumna_saraf">
              <FaTwitter />
            </Link>
            <Link href="https://www.linkedin.com/in/pradumnasaraf/">
              <FaLinkedin />
            </Link>
          </div>
          <h2>
            {`Hello, I'm`} <span className="pradumna">Pradumna Saraf</span>
          </h2>
          <p>
            Open Source Developer. Docker Captain. Microsoft MVP.
            <br className="desktop-break" />
            Owner @ rebase media
          </p>
          <div className="ibutton">
            <a
              className="connect"
              href="https://github.com/Pradumnasaraf"
            >{`Let's Collaborate`}</a>
            <a className="connect" href="https://rebasemedia.com">
              Services
            </a>
          </div>
        </div>
        <div className="right">
          <Image
            src="/media/pradumna-saraf.png"
            alt="Pradumna Saraf - DevOps and Go Developer"
            width={250}
            height={250}
            priority
          />
        </div>
      </div>

      <main>
        {showGame && <KonamiGame onClose={() => setShowGame(false)} />}
      </main>
    </>
  );
}
