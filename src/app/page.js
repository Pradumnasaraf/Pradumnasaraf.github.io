/* eslint-disable @next/next/no-css-tags, @next/next/no-page-custom-font, @next/next/no-img-element */
'use client';
import Link from "next/link";
import { useEffect, useState } from 'react';  
import './globals.css';  
import Head from 'next/head';
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa'; 
import KonamiGame from '@/components/KonamiGame';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showGame, setShowGame] = useState(false);
  const [keySequence, setKeySequence] = useState([]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Define the handleClick function
  const handleClickGitHub = () => {
    // Here you can define what happens when the button is clicked
    window.location.href = 'https://github.com/Pradumnasaraf';  // Example: redirect to GitHub
  };  
  const handleClickService = () => {
    // Here you can define what happens when the button is clicked
    window.location.href = 'https://rebasemedia.com';  // Redirect to rebasemedia.com
  };

  useEffect(() => {
    const konamiCode = [
      'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
      'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'
    ];
    const handleKeyDown = (e) => {
      // Only add to sequence if it's one of the Konami code keys
      if (konamiCode.includes(e.key)) {
        setKeySequence(prev => {
          const newSequence = [...prev, e.key].slice(-10);
          // Check if the sequence matches exactly
          if (newSequence.length === konamiCode.length && 
              newSequence.every((key, index) => key === konamiCode[index])) {
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
      <Head>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="description" content="Pradumna Saraf Portfolio" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="style.css" />
        <link
          rel="icon"
          href="https://user-images.githubusercontent.com/51878265/194138074-7a341083-e80e-49d9-8e58-02882b26d3d9.png"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          crossorigin="anonymous"
          referrerpolicy="no-referrer"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=League+Spartan:wght@300;400;500&display=swap" rel="stylesheet" />
      </Head>

      <div className="nav">
        <div className="hamburger" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className={`pages ${isMenuOpen ? 'active' : ''}`}>
          <span className="page-item">
            <Link href="https://rebasemedia.com">Services</Link>
          </span>          
          <span className="page-item">
            <Link href="https://pradumnasaraf.substack.com">Newsletter</Link>
          </span>
          <span className="page-item">
            <Link href="https://blog.pradumnasaraf.dev">Blog</Link>
          </span>
          <span className="page-item">
            <Link href="/timeline">Timeline</Link>
          </span>
          <span className="page-item">
            <Link href="/toolkit">Toolkit</Link>
          </span>          
          <span className="page-item">
            <Link href="/camera">Camera</Link>
          </span>
          <span className="page-item">
            <Link href="/cv">CV</Link>
          </span>
          <span className="page-item">
            <Link href="mailto:pradumnasaraf@gmail.com">Contact</Link>
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
          <h2>{`Hello, I'm`} <span className="pradumna">Pradumna Saraf</span></h2>
          <p>Open Source Developer/DevRel. Docker Captain. Owner <Link href="https://github.com/rebasemedia">@ rebase media</Link></p>
          <div className="ibutton">
            <button className="connect" onClick={handleClickGitHub}>{`Let's Collaborate`}</button>            
            <button className="connect" onClick={handleClickService}>Services</button>

          </div>
        </div>
        <div className="right">
          <img src="/media/pradumna-saraf.png" alt="Pradumna Saraf - DevOps and Go Developer" />
        </div>
      </div>

      <main>
        {showGame && <KonamiGame onClose={() => setShowGame(false)} />}
      </main>
    </>
  );
}
