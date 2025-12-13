'use client';
import './style.css';
import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';

// Remove export metadata since this is a client component and won't work
// Metadata is already defined in src/app/timeline/metadata.js

const TimelinePage = () => {
  useEffect(() => {
    document.title = 'Pradumna Saraf | Timeline'; // Set the document title

    // Add League Spartan font
    const linkElement = document.createElement('link');
    linkElement.rel = 'stylesheet';
    linkElement.href =
      'https://fonts.googleapis.com/css2?family=League+Spartan:wght@300;400;500&display=swap';
    document.head.appendChild(linkElement);

    return () => {
      document.head.removeChild(linkElement);
    };
  }, []);

  return (
    <div className="min-h-screen">
      <Link href="/" className="back-button">
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
      <h1 className="timeline-title">Timeline</h1>
      <div className="timeline">
        {/* Left Container - Microsoft MVP */}
        <div className="container left-container">
          <Image
            src="/timeline-logo/microsoft.png"
            alt="Microsoft MVP"
            width={40}
            height={40}
          />
          <div className="text-box">
            <Link
              href="https://mvp.microsoft.com/en-US/MVP/profile/504ebf09-e92f-4620-82d7-67590711df58"
              className="source-button"
              aria-label="Microsoft MVP"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 17l10-10M17 17V7h-7"></path>
              </svg>
            </Link>
            <h2>Microsoft MVP</h2>
            <small>November, 2025</small>
            <p>
              {' '}
              I was recognized as a Microsoft Most Valuable Professional (MVP)
              in the Developer Technologies category (Technology Area: DevOps)
              for my contributions to the developer community from writing
              blogs, videos, and speaking at events.
            </p>
            <span className="left-container-arrow"></span>
          </div>
        </div>

        {/* Right Container - Docker Captain of the Year */}
        <div className="container right-container">
          <Image
            src="/timeline-logo/docker.png"
            alt="Docker"
            width={40}
            height={40}
          />
          <div className="text-box">
            <Link
              href="https://www.docker.com/captains/pradumna-saraf"
              className="source-button"
              aria-label="Docker Captain of the Year"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 17l10-10M17 17V7h-7"></path>
              </svg>
            </Link>
            <h2>Docker Captain of the Year</h2>
            <small>October, 2025</small>
            <p>
              {' '}
              I was honored with the Docker Captain of the Year award,
              recognizing my contributions to the Docker community. This award
              was presented during Docker Captains Summit 2025 in Istanbul,
              Turkey.
            </p>
            <span className="right-container-arrow"></span>
          </div>
        </div>

        {/* Left Container */}
        <div className="container left-container">
          <Image
            src="/timeline-logo/docker.png"
            alt="Docker"
            width={40}
            height={40}
          />
          <div className="text-box">
            <Link
              href="https://www.docker.com/blog/from-the-captains-chair-pradumna-saraf/"
              className="source-button"
              aria-label="Docker Captain Interview"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 17l10-10M17 17V7h-7"></path>
              </svg>
            </Link>
            <h2>Featured in Docker Captain Interview</h2>
            <small>October, 2025</small>
            <p>
              {' '}
              {
                "Featured in Docker's official blog as part of their \"From the Captain's Chair\" series. Shared my journey from learning about databases to becoming a Docker Captain, my contributions to the community, and insights on Docker's latest features."
              }
            </p>
            <span className="left-container-arrow"></span>
          </div>
        </div>

        {/* Right Container */}
        <div className="container right-container">
          <Image
            src="/timeline-logo/kestra.png"
            alt="Kestra"
            width={40}
            height={40}
          />
          <div className="text-box">
            <Link
              href="https://kestra.io"
              className="source-button"
              aria-label="Kestra"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 17l10-10M17 17V7h-7"></path>
              </svg>
            </Link>
            <h2>Joined Kestra as a QAE</h2>
            <small>September, 2025</small>
            <p>
              {' '}
              I joined Kestra as a Quality Assurance Engineer. I test new
              features, run automated checks, and identify bugs to ensure
              software quality across both open source and enterprise editions.
            </p>
            <span className="right-container-arrow"></span>
          </div>
        </div>

        {/* Left Container */}
        <div className="container left-container">
          <Image
            src="/timeline-logo/cncf.png"
            alt="CNCF"
            width={40}
            height={40}
          />
          <div className="text-box">
            <Link
              href="https://youtu.be/J8situjchtg?si=eZved6DcEPDZg273"
              className="source-button"
              aria-label="KubeCon India"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 17l10-10M17 17V7h-7"></path>
              </svg>
            </Link>
            <h2>Delivered a talk at KubeCon India</h2>
            <small>August, 2025</small>
            <p>
              {' '}
              I delivered a talk at KubeCon India, a premier conference focusing
              on Kubernetes and Cloud Native technologies. I spoke about
              WebAssembly and Docker adoption and development process.
            </p>
            <span className="left-container-arrow"></span>
          </div>
        </div>

        {/* Right Container */}
        <div
          className="container right-container"
          role="listitem"
          aria-label="Featured on maintaine.rs Book - July 2025"
        >
          <img
            src="/timeline-logo/maintainer-book.png"
            alt="Maintainers Book logo"
          />
          <div className="text-box">
            <Link
              href="https://maintaine.rs"
              className="source-button"
              aria-label="Visit maintaine.rs website"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 17l10-10M17 17V7h-7"></path>
              </svg>
            </Link>
            <h2>Featured on maintaine.rs Book</h2>
            <small>July, 2025</small>
            <p>
              {' '}
              I was featured on maintaine.rs book, a collection of stories from
              maintainers in open source world. I was featured for my work as a
              maintainer and contributor to the open source community.
            </p>
            <span className="right-container-arrow"></span>
          </div>
        </div>

        {/* Right Container */}
        <div
          className="container left-container"
          role="listitem"
          aria-label="First talk at International Conference - June 2025"
        >
          <img
            src="/timeline-logo/cncf.png"
            alt="CNCF Cloud Native Computing Foundation logo"
          />
          <div className="text-box">
            <Link
              href="https://youtu.be/DHaVho5cf4U?si=n-8DcHRBEVYaTQkI"
              className="source-button"
              aria-label="Watch KubeCon China talk video"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 17l10-10M17 17V7h-7"></path>
              </svg>
            </Link>
            <h2>Delivered my first talk at International Conference</h2>
            <small>June, 2025</small>
            <p>
              {' '}
              It was my first time attending and delivering a talk at an
              international conference, KubeCon China in Hong Kong. I spoke
              about WebAssembly and Docker development.
            </p>
            <span className="left-container-arrow"></span>
          </div>
        </div>

        {/* Right Container */}
        <div
          className="container right-container"
          role="listitem"
          aria-label="Featured on Official Open Source Org Website - May 2025"
        >
          <img
            src="/timeline-logo/opensource.png"
            alt="Open Source Initiative logo"
          />
          <div className="text-box">
            <Link
              href="https://www.opensource.org/maintainers/pradumnasaraf"
              className="source-button"
              aria-label="Visit Open Source Org website"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 17l10-10M17 17V7h-7"></path>
              </svg>
            </Link>
            <h2>Featured on Official Open Source Org Website</h2>
            <small>May, 2025</small>
            <p>
              As a maintainer, I was highlighted during Maintainer Month, a
              campaign to honor the individuals who steward and sustain Open
              Source projects. I was featured on the official Open Source Org
              website sharing my journey, contributions I made and how I got
              started with open source.
            </p>
            <span className="right-container-arrow"></span>
          </div>
        </div>

        {/* Right Container */}
        <div
          className="container left-container"
          role="listitem"
          aria-label="Delivered talk at Linux Foundation event - December 2024"
        >
          <img
            src="/timeline-logo/cncf.png"
            alt="CNCF Cloud Native Computing Foundation logo"
          />
          <div className="text-box">
            <Link
              href="https://youtu.be/hRp4PaZ6FS4?si=nCPeRiYQ2-69hUE9"
              className="source-button"
              aria-label="Watch SOSS Community Day talk video"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 17l10-10M17 17V7h-7"></path>
              </svg>
            </Link>
            <h2>Delivered a talk at Linux Foundation event</h2>
            <small>Dec, 2024</small>
            <p>
              {' '}
              I delivered a talk at the SOSS Community Day, India (KubeCon
              India), hosted by the Linux Foundation/CNCF. This was the first
              event of its kind in India. I delivered a talk on Software Supply
              Chain Security and how to improve it by using Docker Scout in the
              CI/CD pipeline. Withough any doubt, this was the best talk I have
              ever delivered.
            </p>
            <span className="left-container-arrow"></span>
          </div>
        </div>

        <div
          className="container right-container"
          role="listitem"
          aria-label="Published first blog on FreeCodeCamp - November 2024"
        >
          <Image
            src="/timeline-logo/freecodecamp.jpg"
            alt="FreeCodeCamp logo"
            width={40}
            height={40}
          />
          <div className="text-box">
            <Link
              href="https://www.freecodecamp.org/news/author/Pradumnasaraf"
              className="source-button"
              aria-label="Visit FreeCodeCamp author page"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 17l10-10M17 17V7h-7"></path>
              </svg>
            </Link>
            <h2>Published first blog on FreeCodeCamp</h2>
            <small>November, 2024</small>
            <p>
              {' '}
              Last year I get approved as a writer at FreeCodeCamp. Finally get
              some time to write a detailed blog apart from my regular writing
              on Dev.to. The blog was how Feature Flags can in be helpful in
              backend development like building APIs. This is longest blog I
              have ever written with 4k words and a whopping ~ 18 min read time.
            </p>
            <span className="right-container-arrow"></span>
          </div>
        </div>

        <div
          className="container left-container"
          role="listitem"
          aria-label="Part of Docker Official Docs team - August 2024"
        >
          <Image
            src="/timeline-logo/docker.png"
            alt="Docker logo"
            width={40}
            height={40}
          />
          <div className="text-box">
            <Link
              href="https://www.docker.com/captains/pradumna-v-saraf/"
              className="source-button"
              aria-label="Visit Docker Captain profile"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 17l10-10M17 17V7h-7"></path>
              </svg>
            </Link>
            <h2>Part of Docker Official Docs team</h2>
            <small>August, 2024</small>
            <p>
              {' '}
              I was invited to official Docker docs team as a Docker Captain. I
              am one of few people who are working on the official Docker docs.
              I am helping the team to improve the docs, adding
              language-specific guides, how-to guides and more.
            </p>
            <span className="left-container-arrow"></span>
          </div>
        </div>

        <div
          className="container right-container"
          role="listitem"
          aria-label="Docker Captain - July 2024"
        >
          <Image
            src="/timeline-logo/docker.png"
            alt="Docker logo"
            width={40}
            height={40}
          />
          <div className="text-box">
            <Link
              href="https://www.docker.com/captains/pradumna-v-saraf/"
              className="source-button"
              aria-label="Visit Docker Captain profile"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 17l10-10M17 17V7h-7"></path>
              </svg>
            </Link>
            <h2>Docker Captain</h2>
            <small>July, 2024</small>
            <p>
              It was a long time coming. I was recognized as a Docker Captain
              for my contributions to the Docker community. This is a huge
              achievement as a Docker finatic. I work closely with different
              teams at Docker to improve the product and help the community.
            </p>
            <span className="right-container-arrow"></span>
          </div>
        </div>

        <div className="container left-container">
          <Image
            src="/timeline-logo/pradumnasaraf.jpg"
            alt="Pradumna Saraf"
            width={40}
            height={40}
          />
          <div className="text-box">
            <Link
              href="https://x.com/pradumna_saraf/status/1777279785594741098"
              className="source-button"
              aria-label="Twitter"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 17l10-10M17 17V7h-7"></path>
              </svg>
            </Link>
            <h2>Invited as a Guest Speaker at NIT Patna</h2>
            <small>April, 2024</small>
            <p>
              {' '}
              I was invited as a guest speaker at NIT Patna to deliver a talk on
              open source and how to effectively maintain a open source project.
              This was the place where I delivered my first in-person talk last
              year.
            </p>
            <span className="left-container-arrow"></span>
          </div>
        </div>

        <div className="container right-container">
          <Image
            src="/timeline-logo/devto.png"
            alt="Dev.to"
            width={40}
            height={40}
          />
          <div className="text-box">
            <Link
              href="https://dev.to/pradumnasaraf"
              className="source-button"
              aria-label="Dev.to"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 17l10-10M17 17V7h-7"></path>
              </svg>
            </Link>
            <h2>10K Followers on Dev.to</h2>
            <small>March, 2024</small>
            <p>
              {' '}
              I reached 10K followers on Dev.to. I was actively writing articles
              and helping others to get started with open source and devops. At
              this time my total views were around 150K.
            </p>
            <span className="left-container-arrow"></span>
          </div>
        </div>

        <div className="container left-container">
          <Image
            src="/timeline-logo/devops.png"
            alt="DevOps"
            width={40}
            height={40}
          />
          <div className="text-box">
            <Link
              href="https:/github.com/Pradumnasaraf/DevOps"
              className="source-button"
              aria-label="DevOps"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 17l10-10M17 17V7h-7"></path>
              </svg>
            </Link>
            <h2>DevOps repo crossed 2.5K Stars</h2>
            <small>Feb, 2024</small>
            <p>
              {' '}
              DevOps repository crossed 2.5K stars on GitHub. Every week
              thousands of devs are visiting site and GitHub repo to learn about
              DevOps and how to get started with it. The repo is used by people
              from companies like Google, Microsoft, Amazon and more. Even some
              are using it as a reference in their interviews.
            </p>
            <span className="right-container-arrow"></span>
          </div>
        </div>

        <div className="container right-container">
          <Image
            src="/timeline-logo/devto.png"
            alt="Dev.to"
            width={40}
            height={40}
          />
          <div className="text-box">
            <Link
              href="https://dev.to/pradumnasaraf"
              className="source-button"
              aria-label="Dev.to"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 17l10-10M17 17V7h-7"></path>
              </svg>
            </Link>
            <h2>100K Views on dev.to My Articles</h2>
            <small>Jan, 2024</small>
            <p>
              {' '}
              I never though people would be interested in reading my articles.
              I reached 100K views on my articles on Dev.to. Total views
              including other platforms are 135K. I mostly write about open
              source devops and everything in between. And got this many views
              just after writing 10-12 articles.{' '}
            </p>
            <span className="right-container-arrow"></span>
          </div>
        </div>

        <div className="container left-container">
          <Image
            src="/timeline-logo/devto.png"
            alt="Dev.to"
            width={40}
            height={40}
          />
          <div className="text-box">
            <Link
              href="https://dev.to/pradumnasaraf"
              className="source-button"
              aria-label="Dev.to"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 17l10-10M17 17V7h-7"></path>
              </svg>
            </Link>
            <h2>Top Author and Mod 2023 at Dev.to</h2>
            <small>Dec, 2023</small>
            <p>
              {' '}
              I was recognized as the top author and moderator at Dev.to for the
              year 2023. I was actively writing articles and helping platform to
              moderate the content.
            </p>
            <span className="left-container-arrow"></span>
          </div>
        </div>

        <div className="container right-container">
          <Image
            src="/timeline-logo/github.png"
            alt="GitHub"
            width={40}
            height={40}
          />
          <div className="text-box">
            <Link
              href="https://github.com/Pradumnasaraf"
              className="source-button"
              aria-label="GitHub Profile"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 17l10-10M17 17V7h-7"></path>
              </svg>
            </Link>
            <h2>1000 GitHub Followers</h2>
            <small>Sep, 2023</small>
            <p>
              {' '}
              I reached 1000 followers on GitHub. I was actively contributing to
              open source and helping others to get started with open source.
            </p>
            <span className="right-container-arrow"></span>
          </div>
        </div>

        <div className="container left-container">
          <Image
            src="/timeline-logo/web3conf.png"
            alt="Web3Conf"
            width={40}
            height={40}
          />
          <div className="text-box">
            <Link
              href="https://youtu.be/VKPV12TpTtI?si=B2fb43rpXumPo4ZL6J9J8w"
              className="source-button"
              aria-label="Web3Conf"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 17l10-10M17 17V7h-7"></path>
              </svg>
            </Link>
            <h2>Delivered my first conference talk</h2>
            <small>Aug, 2023</small>
            <p>
              {' '}
              I delivered my first conference talk at Web3Conf. I talked about
              how how to get started with open source and how to maintain a open
              source software being a maintainer. Room was almost houseful and
              it was a unforgettable experience.
            </p>
            <span className="left-container-arrow"></span>
          </div>
        </div>

        <div className="container right-container">
          <Image
            src="/timeline-logo/livecycle.png"
            alt="Livecycle"
            width={40}
            height={40}
          />
          <div className="text-box">
            <Link
              href="https://livecycle.io/"
              className="source-button"
              aria-label="Livecycle"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 17l10-10M17 17V7h-7"></path>
              </svg>
            </Link>
            <h2>Dev Advocate at Livecycle</h2>
            <small>Aug, 2023</small>
            <p>
              {' '}
              {`I joined Livecycle as a Dev Advocate. I was deeply involved in our open source offering "Preevy" and helped developers to get started with it by creating content and delivering talks.`}
            </p>
            <span className="right-container-arrow"></span>
          </div>
        </div>

        <div className="container left-container">
          <Image
            src="/timeline-logo/linkedin.png"
            alt="LinkedIn"
            width={40}
            height={40}
          />
          <div className="text-box">
            <Link
              href="https://x.com/pradumna_saraf/status/1688376664445612032"
              className="source-button"
              aria-label="LinkedIn"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 17l10-10M17 17V7h-7"></path>
              </svg>
            </Link>
            <h2>10K Followers on LinkedIn</h2>
            <small>Aug, 2023</small>
            <p>
              {' '}
              I reached 10K followers on LinkedIn. Started as diversifying my
              social media presence and people supported here as well. The
              quality of engagement was much better than Twitter.
            </p>
            <span className="left-container-arrow"></span>
          </div>
        </div>

        <div className="container right-container">
          <Image
            src="/timeline-logo/github.png"
            alt="GitHub"
            width={40}
            height={40}
          />
          <div className="text-box">
            <Link
              href="https://opensource.guide/maintaining-balance-for-open-source-maintainers/"
              className="source-button"
              aria-label="LinkedIn"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 17l10-10M17 17V7h-7"></path>
              </svg>
            </Link>
            <h2>Contributed to Official GitHub Open Source Guide</h2>
            <small>July, 2024</small>
            <p>
              {' '}
              I and other maintainers came together and worked with GitHub to
              write a guide on how to maintain balance for open source
              maintainers and avoid burnout.
            </p>
            <span className="right-container-arrow"></span>
          </div>
        </div>

        <div className="container left-container">
          <Image
            src="/timeline-logo/pradumnasaraf.jpg"
            alt="Pradumna Saraf"
            width={40}
            height={40}
          />
          <div className="text-box">
            <Link
              href="https://github.com/Pradumnasaraf"
              className="source-button"
              aria-label="Kubernetes"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 17l10-10M17 17V7h-7"></path>
              </svg>
            </Link>
            <h2>Delivered my first in-person talk</h2>
            <small>April, 2023</small>
            <p>
              {' '}
              I delivered my first in-person talk at API Days Patna at NIT
              Patna. It was a meet-up. I talk about how using Docker and Docker
              Compose we can develop and test our APIs locally. Also, this was
              my first time hosting an event. I co-hosted the event with another
              Postman Student Leader.
            </p>
            <span className="left-container-arrow"></span>
          </div>
        </div>

        <div className="container right-container">
          <Image
            src="/timeline-logo/kubernetes.png"
            alt="Kubernetes"
            width={40}
            height={40}
          />
          <div className="text-box">
            <Link
              href="https://github.com/Pradumnasaraf"
              className="source-button"
              aria-label="Twitter"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 17l10-10M17 17V7h-7"></path>
              </svg>
            </Link>
            <h2>Kubernetes and SIGs Org Member</h2>
            <small>Dec, 2022</small>
            <p>
              {' '}
              I became a member of Kubernetes and Kubernetes SIGs GitHub Org. I
              was contributing to the Kubernetes Website project and helping in
              the area of documentation, triaging issues and PRs.
            </p>
            <span className="right-container-arrow"></span>
          </div>
        </div>

        <div className="container left-container">
          <Image
            src="/timeline-logo/twitter.png"
            alt="Twitter"
            width={40}
            height={40}
          />
          <div className="text-box">
            <Link
              href="https://twitter.com/pradumna_saraf"
              className="source-button"
              aria-label="Twitter"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 17l10-10M17 17V7h-7"></path>
              </svg>
            </Link>
            <h2>10K Followers on Twitter</h2>
            <small>Oct, 2022</small>
            <p>
              {' '}
              I reached 10K followers on Twitter. I was regularly posting about
              open source and learning I was doing. It was a great milestone for
              me.
            </p>
            <span className="left-container-arrow"></span>
          </div>
        </div>

        <div className="container right-container">
          <Image
            src="/timeline-logo/dollar.png"
            alt="Illacloud"
            width={40}
            height={40}
          />
          <div className="text-box">
            <h2>First Freelancing Gig</h2>
            <small>Oct, 2022</small>
            <p>
              {' '}
              I got my first freelancing gig from a open source cloud company.
              It was a Sponsored post on my Twitter account. The gig was about
              sharing about their open source project. This is time I realized
              that I can make money from my social media presence.
            </p>
            <span className="right-container-arrow"></span>
          </div>
        </div>

        <div className="container left-container">
          <Image
            src="/timeline-logo/github.png"
            alt="GitHub"
            width={40}
            height={40}
          />
          <div className="text-box">
            <Link
              href="https://github.com/sponsors/Pradumnasaraf"
              className="source-button"
              aria-label="GitHub Sponsors"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 17l10-10M17 17V7h-7"></path>
              </svg>
            </Link>
            <h2>First GitHub Sponsor</h2>
            <small>July, 2022</small>
            <p>
              {' '}
              I got my first GitHub sponsor. This feeling was bit overwhelming
              because I never expected that someone would sponsor me for my
              work. They were super generous and sponsored me.
            </p>
            <span className="left-container-arrow"></span>
          </div>
        </div>

        <div className="container right-container">
          <Image
            src="/timeline-logo/postman.png"
            alt="Postman"
            width={40}
            height={40}
          />
          <div className="text-box">
            <Link
              href="https://badgr.com/public/assertions/pwl4EICMTQm-YJwDCpKAGQ"
              className="source-button"
              aria-label="Postman Student Leader"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 17l10-10M17 17V7h-7"></path>
              </svg>
            </Link>
            <h2>Postman Student Leader</h2>
            <small>May, 2022</small>
            <p>
              {' '}
              For spreading the voice and educating students about APIs and
              Postman, I was recognized as a Postman Student Leader.
            </p>
            <span className="right-container-arrow"></span>
          </div>
        </div>

        <div className="container left-container">
          <Image
            src="/timeline-logo/github.png"
            alt="GitHub"
            width={40}
            height={40}
          />
          <div className="text-box">
            <Link
              href="https://github.com/Pradumnasaraf/open-source-with-pradumna"
              className="source-button"
              aria-label="open-source-with-pradumna"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 17l10-10M17 17V7h-7"></path>
              </svg>
            </Link>
            <h2>100 GitHub Stars</h2>
            <small>May, 2022</small>
            <p>
              open-source-with-pradumna repository reached 100 stars on GitHub.
              This was huge because I never expected that my repository would
              help people get started with open source and hit 100 stars.
            </p>
            <span className="left-container-arrow"></span>
          </div>
        </div>

        <div className="container right-container">
          <Image
            src="/timeline-logo/eddiehub.png"
            alt="EddieHub"
            width={40}
            height={40}
          />
          <div className="text-box">
            <Link
              href="https://x.com/eddiejaoude/status/1515295717811957761"
              className="source-button"
              aria-label="EddieHub"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 17l10-10M17 17V7h-7"></path>
              </svg>
            </Link>
            <h2>EddieHub Ambassador</h2>
            <small>April, 2022</small>
            <p>
              {' '}
              As I was contributing to the EddieHub community for a while and
              passionate about open source, I was selected as an EddieHub
              Ambassador. There were only 7 ambassadors at that time. I retained
              my position as an ambassador for next batch as well.
            </p>
            <span className="right-container-arrow"></span>
          </div>
        </div>

        <div className="container left-container">
          <Image
            src="/timeline-logo/twitter.png"
            alt="Twitter"
            width={40}
            height={40}
          />
          <div className="text-box">
            <Link
              href="https://x.com/pradumna_saraf/status/1520025075139121152"
              className="source-button"
              aria-label="Twitter"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 17l10-10M17 17V7h-7"></path>
              </svg>
            </Link>
            <h2>Crossed 1K Followers on Twitter (X)</h2>
            <small>April, 2022</small>
            <p>
              {' '}
              I crossed 1k followers on Twitter. I never imagined in million
              years that people would be interested in listening to my thoughts
              and journey. Crazy! because I never like social media in general.
            </p>
            <span className="left-container-arrow"></span>
          </div>
        </div>

        <div className="container right-container">
          <Image
            src="/timeline-logo/twitter.png"
            alt="Twitter"
            width={40}
            height={40}
          />
          <div className="text-box">
            <Link
              href="https://x.com/pradumna_saraf/status/1508363401214717953"
              className="source-button"
              aria-label="Twitter"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 17l10-10M17 17V7h-7"></path>
              </svg>
            </Link>
            <h2>{'"Open Source with Pradumna"'}</h2>
            <small>April, 2022</small>
            <p>
              Open Source With Pradumna started as a 15-day bootcamp of Twitter
              post (Threads) where I was sharing my journey of open source and
              how to get started with it. This was a turning point for me. Fun
              fact: It all started from no where. I was in the bed rest as I
              screwed my food with a bike accident and have nothing to do. After
              this my social media presence grow and a lot of people started
              knowing me.
            </p>
            <span className="right-container-arrow"></span>
          </div>
        </div>

        <div className="container left-container">
          <Image
            src="/timeline-logo/dailydev.png"
            alt="Daily.dev"
            width={40}
            height={40}
          />
          <div className="text-box">
            <Link
              href="https://github.com/dailydotdev/hackathon-participants-March-2022"
              className="source-button"
              aria-label="dailydev"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 17l10-10M17 17V7h-7"></path>
              </svg>
            </Link>
            <h2>Won my first Hackathon (Solo)</h2>
            <small>March, 2022</small>
            <p>
              {' '}
              I won my first hackathon with daily.dev, which was global. I build
              a Discord bot that uses RSS feeds to get the bookmarked articles
              from daily.dev and post them to the Discord server. Also I got
              mentioned in the Newsletter.
            </p>
            <span className="left-container-arrow"></span>
          </div>
        </div>

        <div className="container right-container">
          <Image
            src="/timeline-logo/postman.png"
            alt="Postman"
            width={40}
            height={40}
          />
          <div className="text-box">
            <Link
              href="https://blog.postman.com/highlights-of-api-fest-2022/"
              className="source-button"
              aria-label="Postman"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 17l10-10M17 17V7h-7"></path>
              </svg>
            </Link>
            <h2>Won Postman Hackathon</h2>
            <small>Jan, 2022</small>
            <p>
              {' '}
              Postman Hosted a hackathon called API Fest 2022. I with a team of
              two, we build a fully functional API from scratch using Node.js
              and MongoDB. We won the hackathon and got a chance to present our
              project to the Postman team.
            </p>
            <span className="right-container-arrow"></span>
          </div>
        </div>

        <div className="container left-container">
          <Image
            src="/timeline-logo/opensource.png"
            alt="Postman"
            width={40}
            height={40}
          />
          <div className="text-box">
            <Link
              href="https://x.com/pradumna_saraf/status/1483392694361952259"
              className="source-button"
              aria-label="open-source"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 17l10-10M17 17V7h-7"></path>
              </svg>
            </Link>
            <h2>Delivered my first talk</h2>
            <small>Jan, 2022</small>
            <p>
              {' '}
              {`First time I got invite to deliver a talk. It was on open source and how to get started with it. It was virtually and the fact that I delivered the talk via my $100 phone because laptop mic and camera was broken and battery don't work. Check the link for the phone screenshot I posted on Twitter.`}
            </p>
            <span className="left-container-arrow"></span>
          </div>
        </div>

        <div className="container right-container">
          <Image
            src="/timeline-logo/eddiehub.png"
            alt="EddieHub"
            width={40}
            height={40}
          />
          <div className="text-box">
            <Link
              href="https://x.com/pradumna_saraf/status/1469933850566422531"
              className="source-button"
              aria-label="EddieHub"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 17l10-10M17 17V7h-7"></path>
              </svg>
            </Link>
            <h2>Got mentioned in a Newsletter</h2>
            <small>Dec, 2021</small>
            <p>
              First time I got a mention in a Newsletter. It was from EddieHub.
              I was mentioned for congratulating me becoming a Postman Student
              Expert.
            </p>
            <span className="right-container-arrow"></span>
          </div>
        </div>

        <div className="container left-container">
          <Image
            src="/timeline-logo/eddiehub.png"
            alt="EddieHub"
            width={40}
            height={40}
          />
          <div className="text-box">
            <Link
              href="https://github.com/EddieHubCommunity"
              className="source-button"
              aria-label="EddieHub"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 17l10-10M17 17V7h-7"></path>
              </svg>
            </Link>
            <h2>Open Source Maintainer</h2>
            <small>Aug, 2021</small>
            <p>
              {' '}
              This was my first experience as a maintainer. I became a
              maintainer at EddieHub because I was contributing to the community
              projects and helping others on the GitHub Org as well as Discord.
            </p>
            <span className="left-container-arrow"></span>
          </div>
        </div>

        <div className="container right-container">
          <Image
            src="/timeline-logo/github.png"
            alt="GitHub"
            width={40}
            height={40}
          />
          <div className="text-box">
            <Link
              href="https://github.com/Pradumnasaraf"
              className="source-button"
              aria-label="open-source-contribution"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 17l10-10M17 17V7h-7"></path>
              </svg>
            </Link>
            <h2>Started Open Source</h2>
            <small>July, 2021</small>
            <p>{`It all started with a website asking for a GitHub profile and I didn't know what it's all about. Then I did into it and started contributing to open source. I started with fixing typos, broken links and documentation.`}</p>
            <span className="right-container-arrow"></span>
          </div>
        </div>

        <div className="container left-container">
          <Image
            src="/timeline-logo/shareit.png"
            alt="ShareIt"
            width={40}
            height={40}
          />
          <div className="text-box">
            <Link
              href="https://drive.google.com/file/d/1zc31p85KIFo39Yr-ILD3KnBA95ITAL0Y/view?usp=drive_link"
              className="source-button"
              aria-label="ShareIt"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 17l10-10M17 17V7h-7"></path>
              </svg>
            </Link>
            <h2>Featured on an Article with ShareIT COO</h2>
            <small>Sep, 2018</small>
            <p>
              {`
                    One of China's leading publishers of tech news, Tiger sniffing group wrote an article on ShareIT and I was featured in that with the COO (Json Wang) of ShareIt. The article was about how ShareIT is helping people to share files without internet. The main article was published in China in Mandarin language.`}
            </p>
            <span className="left-container-arrow"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelinePage;
