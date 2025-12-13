'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import {
  FaYoutube,
  FaSlideshare,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaExternalLinkAlt,
  FaGithub,
} from 'react-icons/fa';
import './style.css';

const SpeakingPage = () => {
  useEffect(() => {
    document.title = 'Pradumna Saraf | Speaking & Events';
  }, []);

  // Speaking data based on your repository
  const speakingData = [
    {
      id: 1,
      title: 'KubeCon China 2025',
      event: 'KubeCon China',
      date: '2025',
      location: 'China',
      category: 'conference',
      description: 'Topic: WASM vs Docker: Partners, Not Rivals',
      slides:
        'https://github.com/Pradumnasaraf/Speaking/tree/main/KubeCon%20China%20-%202025',
      recording: 'https://youtu.be/DHaVho5cf4U?si=zkqc0KT4eGHf85vI',
      external: null,
      tags: ['WASM', 'Docker', 'Container Technology', 'Cloud Native'],
    },
    {
      id: 2,
      title: 'KubeCon India 2025',
      event: 'KubeCon India',
      date: '2025',
      location: 'India',
      category: 'conference',
      description: 'Topic: WASM vs Docker: Partners, Not Rivals',
      slides:
        'https://github.com/Pradumnasaraf/Speaking/tree/main/KubeCon%20India%20-%202025',
      recording: 'https://youtu.be/J8situjchtg?si=BiW9ecyKx2PU8sUq',
      external: null,
      tags: ['WASM', 'Docker', 'Container Technology', 'Cloud Native'],
    },
    {
      id: 3,
      title: 'KubeCon India - SOSS Days 2024',
      event: 'KubeCon India - SOSS Days',
      date: '2024',
      location: 'India',
      category: 'conference',
      description:
        'Topic: Automating Container Security: Docker Scout in CI/CD for Safer Software Supply Chains',
      slides:
        'https://github.com/Pradumnasaraf/Speaking/tree/main/SOSS%20Days%20%28KubeCon%29%20India%20-%202024',
      recording: 'https://www.youtube.com/watch?v=hRp4PaZ6FS4',
      external: null,
      tags: ['Docker Scout', 'Container Security', 'CI/CD', 'DevSecOps'],
    },
    {
      id: 4,
      title: 'ByteVerse NIT Patna 2024',
      event: 'ByteVerse',
      date: '2024',
      location: 'NIT Patna, India',
      category: 'conference',
      description: 'Topic: Empowering Devs Via Open Source',
      slides:
        'https://github.com/Pradumnasaraf/Speaking/tree/main/ByteVerse%20NIT%20Patna%20-%202024',
      recording: null,
      external: null,
      tags: ['Open Source', 'Developer Empowerment', 'Community', 'Education'],
    },
    {
      id: 5,
      title: 'API Days NIT Patna 2023',
      event: 'API Days',
      date: '2023',
      location: 'NIT Patna, India',
      category: 'conference',
      description:
        'Topic: Securely Package and Deploy your APIs with Docker and Docker Compose',
      slides:
        'https://github.com/Pradumnasaraf/Speaking/tree/main/API%20Days%20NIT%20Patna%20-%202023',
      recording: null,
      external: null,
      tags: ['APIs', 'Docker', 'Docker Compose', 'DevOps'],
    },
    {
      id: 6,
      title: 'API Week Postman 2023',
      event: 'Postman API Week',
      date: '2023',
      location: 'Virtual',
      category: 'webinar',
      description:
        'Topic: Getting started with Postman Flows and visualising the response better',
      slides:
        'https://github.com/Pradumnasaraf/Speaking/tree/main/API%20Week%20Postman%20-%202023',
      recording: 'https://www.youtube.com/live/GadKONBY3l8?si=O4j3I3ut2nfMgG6K',
      external: null,
      tags: [
        'Postman Flows',
        'API Testing',
        'Visualization',
        'Developer Tools',
      ],
    },
    {
      id: 7,
      title: 'Docker Meetup Bangalore 2023',
      event: 'Docker Community Meetup',
      date: '2023',
      location: 'Bangalore, India',
      category: 'meetup',
      description: "Topic: Review Cycles Are Broken. Here's How To Fix Them",
      slides:
        'https://github.com/Pradumnasaraf/Speaking/tree/main/Docker%20Meetup%20Bangalore%20-2023',
      recording: null,
      external: null,
      tags: [
        'Code Review',
        'Development Process',
        'Team Collaboration',
        'Best Practices',
      ],
    },
    {
      id: 8,
      title: 'EddieCon 0.2 2023',
      event: 'EddieCon',
      date: '2023',
      location: 'Virtual',
      category: 'conference',
      description:
        'Topic: Building an Inclusive Open Source Community: The Role of GitHub Community Standards',
      slides:
        'https://github.com/Pradumnasaraf/Speaking/tree/main/EddieCon%200.2%20-%202023%20',
      recording:
        'https://www.youtube.com/live/7oeW7UPR5aw?si=X5G6LnTvdZxwvsAV&t=2637',
      external: null,
      tags: ['Open Source', 'Community Standards', 'GitHub', 'Inclusivity'],
    },
    {
      id: 9,
      title: 'Global Open Source Cohort',
      event: 'Global Open Source Cohort',
      date: '2023',
      location: 'Virtual',
      category: 'webinar',
      description:
        'Topic: Maintainer perspective: How to better maintain projects and encourage more contributors to participate',
      slides:
        'https://github.com/Pradumnasaraf/Speaking/tree/main/Global%20Open%20Source%20Cohort',
      recording: null,
      external: null,
      tags: [
        'Open Source',
        'Maintainership',
        'Community Building',
        'Contributor Engagement',
      ],
    },
    {
      id: 10,
      title: '90 Days of DevOps 2023',
      event: '90 Days of DevOps',
      date: '2023',
      location: 'Virtual',
      category: 'webinar',
      description:
        'Topic: Building Efficient and Secure Docker Images with Multi-Stage Builds',
      slides:
        'https://github.com/Pradumnasaraf/Speaking/tree/main/90%20Days%20of%20DevOps%20-2023',
      recording: 'https://youtu.be/fjWh3BH4LbU?si=GrI7123kcrJUG2Bq',
      external: null,
      tags: ['Docker', 'Multi-Stage Builds', 'Security', 'DevOps'],
    },
    {
      id: 11,
      title: 'Web3Conf India 2023',
      event: 'Web3Conf India',
      date: '2023',
      location: 'India',
      category: 'conference',
      description:
        'Topic: Open Up to Open Source: Empowering Sustainable Communities Through Collaboration',
      slides:
        'https://github.com/Pradumnasaraf/Speaking/tree/main/Web3Conf%20India%20-%202023',
      recording: 'https://www.youtube.com/watch?v=VKPV12TpTtI',
      external: null,
      tags: [
        'Open Source',
        'Community Building',
        'Sustainability',
        'Collaboration',
      ],
    },
    {
      id: 12,
      title: 'Postman Stream',
      event: 'Postman Stream',
      date: '2023',
      location: 'Virtual',
      category: 'webinar',
      description: 'Topic: Developer Workflows and Trends Students Can Use!',
      slides:
        'https://github.com/Pradumnasaraf/Speaking/tree/main/Postman%20Stream',
      recording:
        'https://www.youtube.com/live/6-I--55YMTM?si=mcxUujvq-iJj-ARm&t=2593',
      external: null,
      tags: [
        'Developer Workflows',
        'Student Resources',
        'Trends',
        'Best Practices',
      ],
    },
  ];

  return (
    <div className="speaking-container">
      {/* Header */}
      <div className="speaking-header">
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

        <div className="header-content">
          <h1>Speaking & Events</h1>
        </div>
      </div>

      {/* Speaking Grid */}
      <div className="speaking-grid">
        {speakingData.map((item) => (
          <div key={item.id} className="speaking-card">
            <div className="card-header">
              <span className="category-badge">{item.category}</span>
            </div>

            <div className="card-content">
              <h3 className="talk-title">{item.title}</h3>
              <p className="event-name">{item.event}</p>
              <p className="talk-description">{item.description}</p>

              <div className="event-meta">
                <div className="meta-item">
                  <FaCalendarAlt />
                  <span>{item.date}</span>
                </div>
                <div className="meta-item">
                  <FaMapMarkerAlt />
                  <span>{item.location}</span>
                </div>
              </div>

              <div className="tags">
                {item.tags.map((tag, index) => (
                  <span key={index} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="card-actions">
              {item.slides && (
                <a
                  href={item.slides}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="action-button slides"
                >
                  <FaSlideshare />
                  <span>Slides</span>
                </a>
              )}

              {item.recording && (
                <a
                  href={item.recording}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="action-button recording"
                >
                  <FaYoutube />
                  <span>Recording</span>
                </a>
              )}

              {item.external && (
                <a
                  href={item.external}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="action-button external"
                >
                  <FaExternalLinkAlt />
                  <span>Event</span>
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="cta-section">
        <h2>Interested in having me speak at your event?</h2>
        <p>
          I&apos;m always excited to share knowledge and learn from the
          community. Check out my speaking rider for details.
        </p>
        <div className="cta-buttons">
          <a
            href="https://github.com/Pradumnasaraf/Speaking/blob/main/RIDER.md"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-button primary"
          >
            <FaGithub />
            View Speaking Rider
          </a>
          <Link href="/contact" className="cta-button secondary">
            Get in Touch
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SpeakingPage;
