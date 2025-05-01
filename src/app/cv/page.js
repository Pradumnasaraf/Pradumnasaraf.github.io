'use client';
import './style.css';
import React, { useEffect } from 'react';
import Link from "next/link";
import { FaGithub, FaTwitter, FaLinkedin, FaEnvelope, FaGlobe, FaRss } from 'react-icons/fa';

const CVPage = () => {
  useEffect(() => {
    document.title = 'Pradumna Saraf | CV';
    
    const linkElement = document.createElement('link');
    linkElement.rel = 'stylesheet';
    linkElement.href = 'https://fonts.googleapis.com/css2?family=League+Spartan:wght@300;400;500&display=swap';
    document.head.appendChild(linkElement);

    return () => {
      document.head.removeChild(linkElement);
    };
  }, []);

  return (
    <div className="cv-container">
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
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
      </Link>

      <div className="cv-content">
        <header>
          <h1>Pradumna Saraf</h1>
          <p className="bio">
            {`A dedicated open source developer and contributor with over 3 years of experience in coding, crafting technical content, community building, and delivering talks. I'm also an enthusiastic team player, skilled at effective collaboration, and capable of working independently to achieve goals.`}
          </p>
          <div className="contact-info">
            <p>
              <FaEnvelope /> <a href="mailto:pradumnasaraf@gmail.com">pradumnasaraf@gmail.com</a>
            </p>
            <p>
              <FaGlobe /> <a href="https://pradumnasaraf.dev" target="_blank" rel="noopener noreferrer">pradumnasaraf.dev</a>
            </p>
            <p>
              <FaRss /> <a href="https://blog.pradumnasaraf.dev" target="_blank" rel="noopener noreferrer">blog.pradumnasaraf.dev</a>
            </p>
            <p>
              <FaLinkedin /> <a href="https://linkedin.com/in/pradumnasaraf" target="_blank" rel="noopener noreferrer">linkedin.com/in/pradumnasaraf</a>
            </p>
            <p>
              <FaTwitter /> <a href="https://twitter.com/pradumna_saraf" target="_blank" rel="noopener noreferrer">@pradumna_saraf</a>
            </p>
            <p>
              <FaGithub /> <a href="https://github.com/Pradumnasaraf" target="_blank" rel="noopener noreferrer">github.com/Pradumnasaraf</a>
            </p>
          </div>
        </header>

        <section className="section">
          <h2>Professional Experience</h2>
          
          <div className="job">
            <div className="job-header">
              <h3>DevRel as a Service, Freelance</h3>
              <span className="date">Feb 2024 - Present</span>
            </div>
            <ul>
              <li>Curated results-driven DevRel strategies to increase the adoption of client products, boost their GitHub repositories, docs, and drive growth in their developer communities.</li>
              <li>Created engaging technical content tailored to client needs, including blogs, videos, and social media posts, to educate audiences about products. My content collectively reached over 500K impressions.</li>
              <li>Covered technical topics, including Kubernetes, CI/CD pipelines, Prometheus, Docker, Feature Flags, AI, and CNCF tools.</li>
              <li>Collaborated with top clients in the open source space, including Flagsmith, daily.dev, Dytona, Pieces.app and Hashnode.</li>
            </ul>
          </div>

          <div className="job">
            <div className="job-header">
              <h3>Developer Advocate, Livecycle</h3>
              <span className="date">Aug 2023 - April 2024</span>
            </div>
            <ul>
              <li>{`Launched a content/community-led developer advocacy effort as part of the company's go-to-market strategy.`}</li>
              <li>Created various strategies and initiatives to promote and increase adoption and contribution for our open-source offerings—Prevy and Docker extension. This helped to cross 1500 GitHub stars and gain over 100 active weekly users.</li>
              <li>Delivered various in-person talks, written technical blogs, social content, talk sessions, and video guides on the Livecycle YouTube channel to educate people about the product and underlying technologies like Docker, Cloud, GitHub Actions, etc.</li>
              <li>Actively nurtured the Livecycle Slack community, resulting in a membership growth from 0 to over 300 individuals, promoting collaboration and gathering product feedback and user needs.</li>
              <li>Planned, launched, and led the flagship Interview series—Navigating Docker With Captains, interviewing the exclusive group of people and Docker experts known as Docker Captains.</li>
            </ul>
          </div>

          <div className="job">
            <div className="job-header">
              <h3>Open Source DevRel, Vruksh Ecosystem Foundation</h3>
              <span className="date">Dec 2021 - Jul 2022</span>
            </div>
            <ul>
              <li>Built a roadmap and executed it to simplify the offering and make the entire product open source, while improving messaging around it and increasing adoption.</li>
              <li>Planned and hosted an online global hackathon—<a href="https://hackatra.com">Hackatra</a>, with over 300 participants, and partnered with companies like OpenAI, AI Future Labs, etc.</li>
              <li>Hosted online talk sessions on Twitter and LinkedIn, bringing industry experts to speak and leading discussions on various topics and technologies.</li>
            </ul>
          </div>

          <div className="job">
            <div className="job-header">
              <h3>Docker Captain</h3>
              <span className="date">July 2024 - Present</span>
            </div>
            <ul>
              <li>Active contributors and advocates for Docker and help shape the Docker ecosystem.</li>
              <li>Contributing to Docker documentation and creating educational content.</li>
              <li>Leading community initiatives and mentoring developers in container technologies.</li>
            </ul>
          </div>
        </section>

        <section className="section">
          <h2>Projects</h2>
          
          <div className="project">
            <h3>Contributors</h3>
            <p>A GraphQL API built with Golang to capture and manage open source contributions data. It uses MongoDB for data storage and Redis for caching and rate limiting. For monitoring, it utilizes Prometheus and Grafana.</p>
            <p><strong>Tech Stack:</strong> Golang, GraphQL, MongoDB, Redis, Prometheus, Grafana, Kubernetes</p>
            <a href="https://github.com/pradumnasaraf/Contributors" target="_blank" rel="noopener noreferrer">View Project →</a>
          </div>

          <div className="project">
            <h3>PullPrompt</h3>
            <p>{`A GitHub Action that comments on a Pull Request with a message generated from a user-given prompt. Under the hood, it uses Google's Gemini API to generate the text.`}</p>
            <p><strong>Tech Stack:</strong> Node.js, GitHub Actions, Google Gemini</p>
            <a href="https://github.com/pradumnasaraf/pullprompt" target="_blank" rel="noopener noreferrer">View Project →</a>
          </div>

          <div className="project">
            <h3>DevOps</h3>
            <p>Learning hub to explore various tools and technologies in DevOps. Assisting thousands of learners, practitioners, and professionals every day in their DevOps journey. Over 2800+ GitHub stars with 1000 active visitors per week.</p>
            <a href="https://github.com/Pradumnasaraf/DevOps" target="_blank" rel="noopener noreferrer">View Project →</a>
          </div>
        </section>

        <section className="section">
          <h2>Skills</h2>
          <div className="skills">
            <p><strong>Languages:</strong> Golang, JavaScript, Node.js, Python, HTML, CSS</p>
            <p><strong>Technologies:</strong> Docker, Kubernetes, Cloud, Linux, GitHub Actions, Jenkins, Terraform, CI/CD, GraphQL, Grafana, Prometheus, GitOps, PostgreSQL, MongoDB, Redis, WebAssembly</p>
          </div>
        </section>

        <section className="section">
          <h2>Recognition & Achievements</h2>
          <div className="achievements">
            <ul>
              <li><strong>Docker Captain:</strong> Active contributor and advocate for Docker ecosystem</li>
              <li><strong>Winner:</strong> daily.dev RSS Feed Hackathon</li>
              <li><strong>Winner:</strong> Postman API Fest Hackathon</li>
            </ul>
          </div>
        </section>

        <section className="section">
          <h2>Leadership Experience</h2>
          <div className="leadership">
            <ul>
              <li><strong>Founder and Organiser</strong> - Cloud Native Patna</li>
              <li><strong>Mentor</strong> - Major League Hacking</li>
              <li><strong>Maintainer</strong> - BioDrops (5800+ GitHub stars) - open source link aggregator</li>
            </ul>
          </div>
        </section>

        <section className="section">
          <h2>Conference Talks</h2>
          <div className="talks">
            <ul>
              <li>Speaker at <strong>SOSS Community Day (KubeCon)</strong>, India to share how to improve software supply chain security.</li>
              <li>Speaker at <strong>Docker Bangalore Meet-up</strong>, to share about Docker Compose and the importance of preview environments.</li>
              <li>Speaker at <strong>Web3Conf</strong>, India to share the importance of Open Source and how to maintain a project effectively.</li>
            </ul>
          </div>
        </section>

        <section className="section">
          <h2>Education</h2>
          <div className="education">
            <h3>Bachelor of Computer Applications</h3>
            <span className="date">May 2020 - June 2023</span>
          </div>
        </section>

        <div className="download-cv">
          <a href="https://www.canva.com/design/DAF_kKnj9WI/IT8NdwVQlzRK3DaMmXm18A/edit?utm_content=DAF_kKnj9WI&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton" target="_blank" rel="noopener noreferrer" className="download-button">
            View & Download CV (PDF)
          </a>
        </div>
      </div>
    </div>
  );
};

export default CVPage; 