import Link from 'next/link';
import { FaMapMarkerAlt, FaSlideshare, FaYoutube } from 'react-icons/fa';
import { RiOpenSourceFill } from 'react-icons/ri';
import {
  SiDocker,
  SiGithubactions,
  SiGo,
  SiGooglegemini,
  SiGrafana,
  SiJavascript,
  SiKubernetes,
  SiMongodb,
  SiNodedotjs,
  SiOpenai,
  SiPostman,
  SiPostgresql,
  SiPrometheus,
  SiPython,
  SiRedis,
  SiTypescript,
} from 'react-icons/si';
import speakingData from './speaking.json';
import './style.css';

const techIconMap = {
  docker: SiDocker,
  'github actions': SiGithubactions,
  go: SiGo,
  'google gemini': SiGooglegemini,
  gemini: SiGooglegemini,
  grafana: SiGrafana,
  javascript: SiJavascript,
  kubernetes: SiKubernetes,
  mongodb: SiMongodb,
  node: SiNodedotjs,
  'open source': RiOpenSourceFill,
  openai: SiOpenai,
  postman: SiPostman,
  postgresql: SiPostgresql,
  prometheus: SiPrometheus,
  python: SiPython,
  redis: SiRedis,
  typescript: SiTypescript,
  chatgpt: SiOpenai,
};

function inferTechnologies(item) {
  if (Array.isArray(item.technologies) && item.technologies.length > 0) {
    return item.technologies;
  }

  const text =
    `${item.topic || ''} ${item.event || ''} ${item.title || ''}`.toLowerCase();
  const pairs = [
    ['Docker', ['docker', 'container']],
    ['Kubernetes', ['kubernetes', 'kubecon']],
    ['Prometheus', ['prometheus']],
    ['Grafana', ['grafana']],
    ['PostgreSQL', ['postgres', 'postgresql']],
    ['Redis', ['redis']],
    ['GitHub Actions', ['github action', 'ci/cd', 'workflow']],
    ['Go', [' golang', ' go ']],
    ['Python', ['python']],
    ['TypeScript', ['typescript']],
    ['JavaScript', ['javascript']],
    ['Node', ['node']],
    ['MongoDB', ['mongodb']],
    ['WASM', ['wasm', 'webassembly']],
  ];

  const detected = pairs
    .filter(([, keys]) => keys.some((key) => text.includes(key)))
    .map(([label]) => label);

  return detected.slice(0, 6);
}

const SpeakingPage = () => {
  return (
    <>
      <div className="page-topbar" role="banner">
        <div className="page-topbar-inner">
          <Link href="/" className="back-button" aria-label="Back to home page">
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
        </div>
      </div>

      <div className="speaking-container">
        <div className="speaking-header">
          <h1>Speaking</h1>
        </div>

        <div className="speaking-timeline">
          {speakingData.map((item) => (
            <article key={item.id} className="speaking-timeline-item">
              <div className="speaking-card">
                <div className="speaking-card-top">
                  <h2>{item.topic || item.title}</h2>
                </div>

                <div className="speaking-meta-row">
                  <span className="speaking-date-chip">{item.date}</span>
                  <span className="speaking-location-chip">
                    <FaMapMarkerAlt />
                    {item.location}
                  </span>
                  <div
                    className="speaking-tech-list"
                    aria-label="Talk technologies"
                  >
                    {inferTechnologies(item).map((tech) => {
                      const normalizedTech = String(tech).toLowerCase();
                      const Icon = techIconMap[normalizedTech] || null;
                      return (
                        <span
                          key={`${item.id}-${tech}`}
                          className="speaking-tech-icon"
                          data-tech={tech}
                          title={tech}
                          aria-label={tech}
                        >
                          {normalizedTech === 'mcp' ? (
                            <span className="speaking-tech-mark">MCP</span>
                          ) : Icon ? (
                            <Icon />
                          ) : (
                            <span className="speaking-tech-fallback">
                              {String(tech).slice(0, 2).toUpperCase()}
                            </span>
                          )}
                        </span>
                      );
                    })}
                  </div>
                </div>

                <p className="speaking-event-name">
                  <span>Event:</span> {item.event}
                </p>
                <p className="speaking-topic">
                  <span>Topic:</span> {item.topic}
                </p>

                <div className="speaking-actions">
                  {item.slides && (
                    <a
                      href={item.slides}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="speaking-action-button"
                    >
                      <FaSlideshare />
                      Slides
                    </a>
                  )}

                  {item.recording && (
                    <a
                      href={item.recording}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="speaking-action-button"
                    >
                      <FaYoutube />
                      Recording
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="speaking-cta">
          <a
            href="https://github.com/Pradumnasaraf/Speaking/blob/main/RIDER.md"
            target="_blank"
            rel="noopener noreferrer"
            className="speaking-action-button"
          >
            Want me to speak at your event?
          </a>
        </div>
      </div>
    </>
  );
};

export default SpeakingPage;
