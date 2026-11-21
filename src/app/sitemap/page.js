import Link from 'next/link';
import { FiArrowUpRight } from 'react-icons/fi';
import { sitemapPages, externalLinks } from './data.js';
import PageTopbar from '@/components/PageTopbar';
import './style.css';

const FEEDS = [
  { href: '/sitemap.xml', label: 'Sitemap' },
  { href: '/sitemap-index.xml', label: 'Sitemap index' },
  { href: '/sitemap-images.xml', label: 'Image sitemap' },
  { href: '/sitemap-videos.xml', label: 'Video sitemap' },
  { href: '/rss.xml', label: 'RSS feed' },
  { href: '/robots.txt', label: 'robots.txt' },
];

const SitemapPage = () => {
  const categories = [...new Set(sitemapPages.map((page) => page.category))];

  return (
    <>
      <PageTopbar />

      <div className="sitemap-page">
        <header className="page-header">
          <h1 className="page-title">Sitemap</h1>
          <p className="page-subtitle">
            Every page on pradumnasaraf.dev in one place.
          </p>
        </header>

        <div className="sitemap-body">
          {categories.map((category) => (
            <section key={category} className="sitemap-group">
              <h2>{category}</h2>
              <div className="sitemap-grid">
                {sitemapPages
                  .filter((page) => page.category === category)
                  .map((page) => (
                    <Link
                      key={page.href}
                      href={page.href}
                      className="sitemap-card"
                    >
                      <span className="sitemap-card-title">{page.title}</span>
                      <span className="sitemap-card-desc">
                        {page.description}
                      </span>
                      <span className="sitemap-card-url">
                        {page.href === '/' ? '/' : page.href}
                      </span>
                    </Link>
                  ))}
              </div>
            </section>
          ))}

          <section className="sitemap-group">
            <h2>Elsewhere</h2>
            <div className="sitemap-grid">
              {externalLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sitemap-card"
                >
                  <span className="sitemap-card-title">
                    {link.title}
                    <FiArrowUpRight aria-hidden="true" />
                  </span>
                  <span className="sitemap-card-desc">{link.description}</span>
                  <span className="sitemap-card-url">
                    {new URL(link.href).hostname}
                  </span>
                </a>
              ))}
            </div>
          </section>

          <section className="sitemap-group">
            <h2>Feeds and files</h2>
            <ul className="sitemap-feeds">
              {FEEDS.map((feed) => (
                <li key={feed.href}>
                  <a href={feed.href} target="_blank" rel="noopener noreferrer">
                    <span>{feed.label}</span>
                    <code>{feed.href}</code>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </>
  );
};

export default SitemapPage;
