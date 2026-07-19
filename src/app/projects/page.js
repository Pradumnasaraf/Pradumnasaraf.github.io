import { FaCss3Alt, FaGithub, FaJava, FaStar } from 'react-icons/fa';
import {
  SiDocker,
  SiGithubactions,
  SiGo,
  SiGrafana,
  SiJavascript,
  SiKubernetes,
  SiKotlin,
  SiMarkdown,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPrometheus,
  SiPython,
  SiReact,
  SiRedis,
  SiSwift,
  SiTypescript,
} from 'react-icons/si';
import projects from './projects.json';
import PageTopbar from '@/components/PageTopbar';
import './style.css';

const techIconMap = {
  docker: SiDocker,
  'github actions': SiGithubactions,
  go: SiGo,
  grafana: SiGrafana,
  javascript: SiJavascript,
  java: FaJava,
  kubernetes: SiKubernetes,
  kotlin: SiKotlin,
  markdown: SiMarkdown,
  mongodb: SiMongodb,
  'next.js': SiNextdotjs,
  node: SiNodedotjs,
  postgresql: SiPostgresql,
  prometheus: SiPrometheus,
  python: SiPython,
  react: SiReact,
  redis: SiRedis,
  swift: SiSwift,
  typescript: SiTypescript,
  css: FaCss3Alt,
};

export default function ProjectsPage() {
  const projectList = Array.isArray(projects) ? projects : [];

  return (
    <>
      <PageTopbar ariaLabel="Back to home page" />

      <section className="projects-page">
        <div className="projects-header">
          <h1>Projects</h1>
        </div>

        <div className="projects-timeline">
          {projectList.map((project) => {
            const launchUrl = project.url || project.repoUrl;

            return (
              <article
                key={project.id || project.name}
                className="project-timeline-item"
              >
                <div className="project-card">
                  <div className="project-card-top">
                    <h2>{project.name}</h2>
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-stars"
                      aria-label={`Open ${project.name} on GitHub`}
                    >
                      <FaStar />
                      <span>{project.stars}</span>
                    </a>
                  </div>

                  <p className="project-problem">
                    <span>Problem it solves:</span>{' '}
                    {project.problem ||
                      'Provides an open source implementation to solve a focused developer workflow problem.'}
                  </p>

                  <div
                    className="project-tech-list"
                    aria-label="Technologies used"
                  >
                    {(project.technologies || []).map((tech) => {
                      const Icon =
                        techIconMap[String(tech).trim().toLowerCase()] || null;
                      return (
                        <span
                          key={`${project.id || project.name}-${tech}`}
                          className="project-tech-icon"
                          data-tech={tech}
                          title={tech}
                          aria-label={tech}
                        >
                          {Icon ? (
                            <Icon />
                          ) : (
                            <span className="project-tech-fallback">
                              {String(tech).slice(0, 2).toUpperCase()}
                            </span>
                          )}
                        </span>
                      );
                    })}
                  </div>

                  <div className="project-actions">
                    <a
                      href={launchUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="open-project-button"
                    >
                      <FaGithub />
                      Open Project
                    </a>
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="star-project-button"
                    >
                      <FaStar />
                      Star
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}
