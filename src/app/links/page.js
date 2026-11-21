'use client';
import Image from 'next/image';
import { useState } from 'react';
import { EMAIL, SITE_URL, SOCIAL } from '@/lib/constants';
import {
  FiMail,
  FiYoutube,
  FiInstagram,
  FiShare2,
  FiCopy,
  FiX,
} from 'react-icons/fi';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { SiBluesky, SiSessionize, SiThreads, SiX } from 'react-icons/si';
import './style.css';
import { copyText } from '@/lib/clipboard';

export default function LinksPage() {
  const [showQRCode, setShowQRCode] = useState(false);
  const [copied, setCopied] = useState(false);

  const profileData = {
    name: 'Pradumna Saraf',
    bio: 'Open Source Developer | Docker Captain | Microsoft MVP | Owner @rebasemedia',
    avatar: '/media/pradumna-saraf.png',
  };

  const qrCodeUrl = `${SITE_URL}/links`;

  const handleCopyLink = async () => {
    if (await copyText(qrCodeUrl)) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  const handleCloseQRCode = () => {
    setShowQRCode(false);
  };

  const handleShareClick = () => {
    setShowQRCode(true);
  };

  const socialLinks = [
    {
      id: 'twitter',
      label: 'X',
      url: SOCIAL.x,
      icon: SiX,
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      url: SOCIAL.linkedin,
      icon: FaLinkedin,
    },
    {
      id: 'github',
      label: 'GitHub',
      url: SOCIAL.github,
      icon: FaGithub,
    },
    {
      id: 'bluesky',
      label: 'Bluesky',
      url: 'https://bsky.app/profile/pradumnasaraf.dev',
      icon: SiBluesky,
    },
    {
      id: 'threads',
      label: 'Threads',
      url: 'https://threads.net/@pradumnasaraf',
      icon: SiThreads,
    },
    {
      id: 'instagram',
      label: 'Instagram',
      url: 'https://instagram.com/pradumnasaraf',
      icon: FiInstagram,
    },
    {
      id: 'youtube',
      label: 'YouTube',
      url: 'https://youtube.com/@pradumnasaraf',
      icon: FiYoutube,
    },
    {
      id: 'sessionize',
      label: 'Sessionize',
      url: 'https://sessionize.com/pradumnasaraf/',
      icon: SiSessionize,
    },
    {
      id: 'email',
      label: 'Email',
      url: `mailto:${EMAIL}`,
      icon: FiMail,
    },
  ];

  const links = [
    {
      id: 1,
      title: 'Personal Website',
      url: SITE_URL,
    },
    {
      id: 2,
      title: 'My Services - Freelance and content creation',
      url: 'https://rebasemedia.com',
    },
    {
      id: 3,
      title: 'Newsletter',
      url: 'https://newsletter.pradumnasaraf.dev',
    },
    {
      id: 4,
      title: 'Blog',
      url: `/blog`,
    },
    {
      id: 5,
      title: 'X',
      url: SOCIAL.x,
    },
  ];

  return (
    <div className="links-container">
      {showQRCode && (
        <div
          className="qr-modal"
          onClick={handleCloseQRCode}
          ref={(el) => el?.focus()}
          onKeyDown={(e) => {
            if (e.key === 'Escape') handleCloseQRCode();
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Share this page"
          tabIndex={-1}
        >
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
            <h3>Share</h3>
            <Image
              src="/media/qr-code.png"
              alt="QR code linking to this links page"
              width={200}
              height={200}
              className="qr-code-image"
            />
            <p className="qr-code-url">{qrCodeUrl}</p>
            <button
              className="qr-copy-button"
              onClick={(e) => {
                e.stopPropagation();
                handleCopyLink();
              }}
              aria-label="Copy link"
            >
              <FiCopy />
              <span>{copied ? 'Copied!' : 'Copy Link'}</span>
            </button>
          </div>
        </div>
      )}

      <div className="links-content">
        <div className="profile-section">
          <button
            className="share-button"
            onClick={handleShareClick}
            aria-label="Share"
            title="Share"
          >
            <FiShare2 />
          </button>

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
                    className={`social-icon-link ${social.id === 'bluesky' || social.id === 'threads' || social.id === 'twitter' || social.id === 'linkedin' || social.id === 'sessionize' || social.id === 'github' ? 'social-icon-filled' : 'social-icon-stroke'}`}
                    aria-label={
                      social.id === 'email'
                        ? 'Email Pradumna Saraf'
                        : `Visit Pradumna Saraf on ${social.label}`
                    }
                  >
                    <IconComponent className="social-icon" />
                  </a>
                );
              })}
            </div>
          )}
        </div>

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
