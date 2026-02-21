'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import './globals.css';
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';
import KonamiGame from '@/components/KonamiGame';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showGame, setShowGame] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [keySequence, setKeySequence] = useState([]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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

  return (
    <>
      <div className="nav">
        <div className="hamburger" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className={`pages ${isMenuOpen ? 'active' : ''}`}>
          <span className="page-item">
            <Link href="/blog">Blog</Link>
          </span>
          <span className="page-item">
            <Link href="/timeline">Timeline</Link>
          </span>
          <span className="page-item">
            <Link href="https://rebasemedia.com">Services</Link>
          </span>
          <span className="page-item">
            <Link href="https://pradumnasaraf.substack.com">Newsletter</Link>
          </span>
          <span className="page-item">
            <Link href="/toolkit">Toolkit</Link>
          </span>
          <span className="page-item">
            <Link href="/photography">Photography</Link>
          </span>
          <span className="page-item">
            <Link href="/contact">Contact</Link>
          </span>
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
