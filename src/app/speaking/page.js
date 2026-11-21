import { FaMapMarkerAlt, FaSlideshare, FaYoutube } from 'react-icons/fa';
import { RiOpenSourceFill } from 'react-icons/ri';
import {
  SiGithubactions,
  SiGo,
  SiGooglegemini,
  SiGrafana,
  SiJavascript,
  SiKubernetes,
  SiModelcontextprotocol,
  SiMongodb,
  SiNodedotjs,
  SiPostman,
  SiPostgresql,
  SiPrometheus,
  SiPython,
  SiRedis,
  SiTypescript,
  SiWebassembly,
} from 'react-icons/si';
import { TbBrandOpenai, TbRobot, TbSparkles } from 'react-icons/tb';
import speakingData from './speaking.json';
import DockerIcon from '@/components/DockerIcon';
import PageTopbar from '@/components/PageTopbar';
import './style.css';

const techIconMap = {
  docker: DockerIcon,
  'github actions': SiGithubactions,
  go: SiGo,
  'google gemini': SiGooglegemini,
  gemini: SiGooglegemini,
  grafana: SiGrafana,
  javascript: SiJavascript,
  kubernetes: SiKubernetes,
  mcp: SiModelcontextprotocol,
  mongodb: SiMongodb,
  node: SiNodedotjs,
  'open source': RiOpenSourceFill,
  openai: TbBrandOpenai,
  postman: SiPostman,
  postgresql: SiPostgresql,
  prometheus: SiPrometheus,
  python: SiPython,
  redis: SiRedis,
  typescript: SiTypescript,
  webassembly: SiWebassembly,
  wasm: SiWebassembly,
  chatgpt: TbBrandOpenai,
  ai: TbSparkles,
  'ai agents': TbRobot,
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
    ['WebAssembly', ['wasm', 'webassembly']],
  ];

  const detected = pairs
    .filter(([, keys]) => keys.some((key) => text.includes(key)))
    .map(([label]) => label);

  return detected.slice(0, 6);
}

const upcomingTalks = speakingData.filter((item) => item.upcoming);

function talkYear(item) {
  const match = String(item.date || '').match(/\b(\d{4})\b/);
  return match ? match[1] : 'Other';
}

const talksByYear = speakingData.reduce((groups, item) => {
  const year = talkYear(item);
  const group = groups.find((g) => g.year === year);
  if (group) group.talks.push(item);
  else groups.push({ year, talks: [item] });
  return groups;
}, []);

const SpeakingPage = () => {
  return (
    <>
      <PageTopbar ariaLabel="Back to home page" />

      <div className="speaking-container">
        <header className="page-header">
          <h1 className="page-title">Speaking</h1>
          {upcomingTalks.map((item) => (
            <p key={item.id} className="speaking-upcoming">
              <span className="speaking-upcoming-label">Upcoming</span>
              <a href={item.eventUrl} target="_blank" rel="noopener noreferrer">
                {item.title}, {item.location} · {item.date}
              </a>
            </p>
          ))}
        </header>

        <div className="speaking-years">
          {talksByYear.map(({ year, talks }) => (
            <section
              key={year}
              className="speaking-year"
              aria-labelledby={`talks-${year}`}
            >
              <h2 id={`talks-${year}`} className="speaking-year-title">
                {year}
                <span>
                  {talks.length} {talks.length === 1 ? 'talk' : 'talks'}
                </span>
              </h2>
              <div className="speaking-year-grid">
                {talks.map((item) => (
                  <article
                    key={item.id}
                    className={`speaking-card${item.upcoming ? ' speaking-card-upcoming' : ''}`}
                  >
                    <h3 className="speaking-card-title">
                      {item.topic || item.title}
                    </h3>
                    <p className="speaking-event-name">{item.event}</p>

                    <div className="speaking-meta-row">
                      {item.upcoming && (
                        <span className="speaking-upcoming-chip">Upcoming</span>
                      )}
                      <span className="speaking-date-chip">{item.date}</span>
                      <span className="speaking-location-chip">
                        <FaMapMarkerAlt />
                        {item.location}
                      </span>
                    </div>

                    <div className="speaking-card-footer">
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
                      <div
                        className="speaking-tech-list"
                        aria-label="Talk technologies"
                      >
                        {inferTechnologies(item).map((tech) => {
                          const Icon =
                            techIconMap[String(tech).toLowerCase()] || null;
                          return (
                            <span
                              key={`${item.id}-${tech}`}
                              className="speaking-tech-icon"
                              data-tech={tech}
                              title={tech}
                              aria-label={tech}
                            >
                              {Icon ? (
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
                  </article>
                ))}
              </div>
            </section>
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
