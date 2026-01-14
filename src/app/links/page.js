'use client';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import {
  FiGithub,
  FiTwitter,
  FiLinkedin,
  FiMail,
  FiYoutube,
  FiInstagram,
  FiShare2,
  FiCopy,
  FiX,
  FiGrid,
} from 'react-icons/fi';
import { SiBluesky, SiThreads } from 'react-icons/si';
import './style.css';

export default function LinksPage() {
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);
  const [copied, setCopied] = useState(false);
  const shareMenuRef = useRef(null);
  const shareButtonRef = useRef(null);

  const profileData = {
    name: 'Pradumna Saraf',
    bio: 'Open Source Developer | Docker Captain | Microsoft MVP | Owner @rebasemedia',
    avatar: '/media/pradumnasaraf.png',
  };

  const qrCodeUrl = 'https://pradumnasaraf.dev/links';

  // Close share menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showShareMenu &&
        shareMenuRef.current &&
        !shareMenuRef.current.contains(event.target) &&
        shareButtonRef.current &&
        !shareButtonRef.current.contains(event.target)
      ) {
        setShowShareMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showShareMenu]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(qrCodeUrl);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        setShowShareMenu(false);
      }, 1500);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleShowQRCode = () => {
    setShowQRCode(true);
    setShowShareMenu(false);
  };

  const handleCloseQRCode = () => {
    setShowQRCode(false);
  };

  // Social media icons - displayed below name (all black/monochrome)
  const socialLinks = [
    {
      id: 'twitter',
      url: 'https://twitter.com/pradumna_saraf',
      icon: FiTwitter,
    },
    {
      id: 'linkedin',
      url: 'https://linkedin.com/in/pradumnasaraf',
      icon: FiLinkedin,
    },
    {
      id: 'github',
      url: 'https://github.com/Pradumnasaraf',
      icon: FiGithub,
    },
    {
      id: 'bluesky',
      url: 'https://bsky.app/profile/pradumnasaraf.bsky.social',
      icon: SiBluesky,
    },
    {
      id: 'threads',
      url: 'https://threads.net/@pradumnasaraf',
      icon: SiThreads,
    },
    {
      id: 'instagram',
      url: 'https://instagram.com/pradumnasaraf',
      icon: FiInstagram,
    },
    {
      id: 'youtube',
      url: 'https://youtube.com/@pradumnasaraf',
      icon: FiYoutube,
    },
    {
      id: 'email',
      url: 'mailto:pradumnasaraf@gmail.com',
      icon: FiMail,
    },
  ];

  // Main links - displayed as buttons below social icons (exact from bio.link)
  const links = [
    {
      id: 1,
      title: 'Personal Website',
      url: 'https://pradumnasaraf.dev',
    },
    {
      id: 2,
      title: 'My Services - Freelance and content creation',
      url: 'https://rebasemedia.com',
    },
    {
      id: 3,
      title: 'Newsletter',
      url: 'https://pradumnasaraf.substack.com',
    },
    {
      id: 4,
      title: 'Blog',
      url: 'https://pradumnasaraf.dev/blog',
    },
    {
      id: 5,
      title: 'Twitter (X)',
      url: 'https://twitter.com/pradumna_saraf',
    },
  ];

  return (
    <div className="links-container">
      {/* Share Button */}
      <button
        ref={shareButtonRef}
        className="share-button"
        onClick={() => setShowShareMenu(!showShareMenu)}
        aria-label="Share"
      >
        <FiShare2 />
      </button>

      {/* Share Menu */}
      {showShareMenu && (
        <div ref={shareMenuRef} className="share-menu">
          <button
            className="share-menu-item"
            onClick={handleCopyLink}
            aria-label="Copy link"
          >
            <FiCopy />
            <span>{copied ? 'Copied!' : 'Copy Link'}</span>
          </button>
          <button
            className="share-menu-item"
            onClick={handleShowQRCode}
            aria-label="Show QR code"
          >
            <FiGrid />
            <span>QR Code</span>
          </button>
        </div>
      )}

      {/* QR Code Modal */}
      {showQRCode && (
        <div className="qr-modal" onClick={handleCloseQRCode}>
          <div
            className="qr-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="qr-close-button"
              onClick={handleCloseQRCode}
              aria-label="Close"
            >
              <FiX />
            </button>
            <h3>Scan QR Code</h3>
            <Image
              src="/media/qr-code.png"
              alt="QR Code"
              width={200}
              height={200}
              className="qr-code-image"
            />
            <p className="qr-code-url">{qrCodeUrl}</p>
          </div>
        </div>
      )}

      <div className="links-content">
        {/* Profile Section */}
        <div className="profile-section">
          {profileData.avatar && (
            <div className="avatar-wrapper">
              <Image
                src={profileData.avatar}
                alt={profileData.name}
                width={120}
                height={120}
                className="avatar"
                priority
              />
            </div>
          )}
          <h1 className="profile-name">{profileData.name}</h1>
          {profileData.bio && <p className="profile-bio">{profileData.bio}</p>}

          {/* Social Icons - displayed below name/bio */}
          {socialLinks.length > 0 && (
            <div className="social-icons">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon-link"
                    aria-label={social.id}
                  >
                    <IconComponent className="social-icon" />
                  </a>
                );
              })}
            </div>
          )}
        </div>

        {/* Links Section */}
        <div className="links-section">
          {links.map((link) => {
            return (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="link-button"
              >
                <span className="link-title">{link.title}</span>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
