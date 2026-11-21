import { FaGithub, FaStar } from 'react-icons/fa';
import { FiArrowUpRight } from 'react-icons/fi';
import projects from './projects.json';
import PageTopbar from '@/components/PageTopbar';
import './style.css';

const GROUPS = [
  {
    id: 'ai',
    title: 'AI and developer tools',
    intro: 'CLIs, GitHub Actions and MCP servers for day-to-day dev work.',
  },
  {
    id: 'learning',
    title: 'Guides and learning',
    intro: 'Open notes, guides and examples for DevOps and open source.',
  },
  {
    id: 'backend',
    title: 'Docker, Go and APIs',
    intro: 'Backend services and public APIs built with Go, Node and Docker.',
  },
  {
    id: 'apps',
    title: 'Apps and bots',
    intro: 'Small apps, bots and side projects.',
  },
];

// Names where a project lives besides its repo, so the card links there
// first. Anything unrecognised is treated as a live site.
function destinationLabel(project) {
  const { url, repoUrl } = project;
  if (!url || url === repoUrl) return null;
  let host = '';
  try {
    host = new URL(url).hostname;
  } catch {
    return null;
  }
  if (url.includes('github.com/marketplace')) return 'Marketplace';
  if (host.endsWith('pypi.org')) return 'PyPI';
  if (host.endsWith('npmjs.com')) return 'npm';
  if (host === 'pkg.go.dev') return 'Go package';
  if (host === 't.me') return 'Telegram';
  if (host.endsWith('discord.com')) return 'Discord';
  if (host === 'docs.docker.com') return 'Docker docs';
  return 'Live site';
}

function formatStars(count) {
  const n = Number(count) || 0;
  return n >= 1000 ? `${(n / 1000).toFixed(1).replace(/\.0$/, '')}k` : `${n}`;
}

function ProjectCard({ project, featured = false }) {
  const destination = destinationLabel(project);

  return (
    <article
      className={`project-card${featured ? ' project-card-featured' : ''}`}
    >
      <div className="project-card-top">
        <h3>{project.name}</h3>
        {project.stars > 0 && (
          <span
            className="project-stars"
            aria-label={`${project.stars} GitHub stars`}
          >
            <FaStar aria-hidden="true" />
            {formatStars(project.stars)}
          </span>
        )}
      </div>

      <p className="project-problem">{project.problem}</p>

      {project.technologies?.length > 0 && (
        <p className="project-tech">{project.technologies.join(' · ')}</p>
      )}

      <div className="project-actions">
        {destination && (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="project-link project-link-primary"
          >
            {destination}
            <FiArrowUpRight aria-hidden="true" />
          </a>
        )}
        <a
          href={project.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="project-link"
          aria-label={`${project.name} source code on GitHub`}
        >
          <FaGithub aria-hidden="true" />
          Source
        </a>
      </div>
    </article>
  );
}

export default function ProjectsPage() {
  const projectList = Array.isArray(projects) ? projects : [];
  const featured = projectList
    .filter((p) => p.featured)
    .sort((a, b) => (b.stars || 0) - (a.stars || 0));
  const rest = projectList.filter((p) => !p.featured);

  return (
    <>
      <PageTopbar ariaLabel="Back to home page" />

      <section className="projects-page">
        <header className="page-header">
          <h1 className="page-title">Projects</h1>
          <p className="page-subtitle">
            {projectList.length} things I&apos;ve built in the open: tools,
            guides, APIs and apps.
          </p>
        </header>

        {featured.length > 0 && (
          <section
            className="projects-group"
            aria-labelledby="projects-featured"
          >
            <div className="projects-group-head">
              <h2 id="projects-featured">Featured</h2>
            </div>
            <div className="projects-grid projects-grid-featured">
              {featured.map((project) => (
                <ProjectCard key={project.id} project={project} featured />
              ))}
            </div>
          </section>
        )}

        {GROUPS.map((group) => {
          const items = rest.filter((p) => p.category === group.id);
          if (items.length === 0) return null;
          return (
            <section
              key={group.id}
              className="projects-group"
              aria-labelledby={`projects-${group.id}`}
            >
              <div className="projects-group-head">
                <h2 id={`projects-${group.id}`}>{group.title}</h2>
                <p>{group.intro}</p>
              </div>
              <div className="projects-grid">
                {items.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </section>
          );
        })}
      </section>
    </>
  );
}
