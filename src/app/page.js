import Image from 'next/image';
import Link from 'next/link';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { SiX } from 'react-icons/si';
import BackToTopButton from '@/components/BackToTopButton';
import HomeNav from '@/components/HomeNav';
import { SOCIAL } from '@/lib/constants';

export default function Home() {
  return (
    <>
      <HomeNav />

      <div className="heading">
        <div className="left">
          <div className="socialmedia">
            <Link
              href={SOCIAL.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Pradumna Saraf on GitHub"
            >
              <FaGithub aria-hidden="true" focusable="false" />
            </Link>
            <Link
              href={SOCIAL.x}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Pradumna Saraf on X"
            >
              <SiX aria-hidden="true" focusable="false" />
            </Link>
            <Link
              href={SOCIAL.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Pradumna Saraf on LinkedIn"
            >
              <FaLinkedin aria-hidden="true" focusable="false" />
            </Link>
          </div>
          <h1>
            {`Hello, I'm`} <span className="pradumna">Pradumna Saraf</span>
          </h1>
          <p>
            Open Source Developer. Docker Captain. Microsoft MVP.
            <br className="desktop-break" /> Owner @ rebase media
          </p>
          <div className="ibutton">
            <a
              className="connect connect-primary"
              href={SOCIAL.github}
              target="_blank"
              rel="noopener noreferrer"
            >{`Let's Collaborate`}</a>
            <a
              className="connect"
              href="https://rebasemedia.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Services
            </a>
          </div>
        </div>
        <div className="right">
          <Image
            src="/media/pradumna-saraf.png"
            alt="Pradumna Saraf - DevOps and Go Developer"
            width={640}
            height={640}
            sizes="(max-width: 800px) 65vw, 320px"
            priority
          />
        </div>
      </div>

      <BackToTopButton />
    </>
  );
}
