'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { SiX } from 'react-icons/si';
import { FiCalendar, FiCopy, FiCheck, FiMail } from 'react-icons/fi';
import PageTopbar from '@/components/PageTopbar';
import './style.css';
import { copyText } from '@/lib/clipboard';
import { EMAIL, SOCIAL } from '@/lib/constants';

const subject = encodeURIComponent('Collaboration Inquiry');
const body = encodeURIComponent(
  `Hi Pradumna,

I found you via pradumnasaraf.dev and would love to discuss:

[Add your message here]

Name:
Company:
Website:

Thanks,`
);
const mailtoUrl = `mailto:${EMAIL}?subject=${subject}&body=${body}`;

const SOCIALS = [
  { href: SOCIAL.github, label: 'GitHub', icon: FaGithub },
  { href: SOCIAL.x, label: 'X', icon: SiX },
  {
    href: SOCIAL.linkedin,
    label: 'LinkedIn',
    icon: FaLinkedin,
  },
];

export default function ContactPage() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('opened') === '1') {
      return;
    }

    params.set('opened', '1');
    const query = params.toString();
    const nextUrl = `${window.location.pathname}${query ? `?${query}` : ''}`;
    window.history.replaceState(null, '', nextUrl);
    window.location.href = mailtoUrl;
  }, []);

  const copyEmail = async () => {
    if (await copyText(EMAIL)) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <>
      <PageTopbar />

      <div className="contact-page">
        <div className="contact-card">
          <h1>Contact</h1>
          <p className="contact-intro">
            For talks, collaborations, content work or just to say hi, email is
            the best way to reach me.
          </p>

          <p className="contact-email">{EMAIL}</p>

          <div className="contact-actions">
            <a
              href={mailtoUrl}
              className="contact-button contact-button-primary"
            >
              <FiMail aria-hidden="true" />
              Email me
            </a>
            <button
              type="button"
              className="contact-button"
              onClick={copyEmail}
              aria-live="polite"
            >
              {copied ? (
                <FiCheck aria-hidden="true" />
              ) : (
                <FiCopy aria-hidden="true" />
              )}
              {copied ? 'Copied' : 'Copy email'}
            </button>
            <Link href="/chat" className="contact-button">
              <FiCalendar aria-hidden="true" />
              Book a call
            </Link>
          </div>

          <p className="contact-note">
            If your email app opened, a message is already drafted for you.
          </p>

          <div className="contact-socials">
            {SOCIALS.map(({ href, label, icon: Icon }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                title={label}
              >
                <Icon aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
