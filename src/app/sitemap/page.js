'use client';
import Link from 'next/link';
import {
  FaHome,
  FaHistory,
  FaFileAlt,
  FaMicrophone,
  FaFolderOpen,
  FaTools,
  FaCamera,
  FaEnvelope,
  FaCalendarAlt,
  FaSitemap,
  FaExternalLinkAlt,
  FaBlog,
} from 'react-icons/fa';
import { sitemapPages, externalLinks } from './data.js';
import './style.css';

const SitemapPage = () => {
  // Icon mapping for pages
  const iconMap = {
    Home: FaHome,
    Timeline: FaHistory,
    CV: FaFileAlt,
    Speaking: FaMicrophone,
    Projects: FaFolderOpen,
    Toolkit: FaTools,
    Photography: FaCamera,
    Contact: FaEnvelope,
    'Schedule Meeting': FaCalendarAlt,
    Blog: FaBlog,
    Links: FaExternalLinkAlt,
    Sitemap: FaSitemap,
  };

  // Add icons to pages
  const pagesWithIcons = sitemapPages.map((page) => ({
    ...page,
    icon: iconMap[page.title],
  }));

  const categories = [...new Set(pagesWithIcons.map((page) => page.category))];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Link href="/" className="back-button mb-4">
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

          <div className="flex items-center gap-3 mb-2">
            <FaSitemap className="text-2xl text-gray-700" />
            <h1 className="text-3xl font-bold text-gray-900">Site Map</h1>
          </div>
          <p className="text-gray-600">
            Navigate through all pages and resources on pradumnasaraf.dev
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Internal Pages */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Website Pages
          </h2>

          {categories.map((category) => (
            <div key={category} className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">
                {category}
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                {pagesWithIcons
                  .filter((page) => page.category === category)
                  .map((page) => {
                    const IconComponent = page.icon || FaSitemap; // Fallback icon
                    return (
                      <Link
                        key={page.href}
                        href={page.href}
                        className="group bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md hover:border-gray-300 transition-all duration-200"
                      >
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0">
                            <IconComponent className="text-2xl text-gray-600 group-hover:text-blue-600 transition-colors" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                                {page.title}
                              </h4>
                              <span
                                className={`text-xs px-2 py-1 rounded-full ${
                                  page.priorityLabel === 'High'
                                    ? 'bg-green-100 text-green-700'
                                    : page.priorityLabel === 'Medium'
                                      ? 'bg-yellow-100 text-yellow-700'
                                      : 'bg-gray-100 text-gray-700'
                                }`}
                              >
                                {page.priorityLabel}
                              </span>
                            </div>
                            <p className="text-gray-600 text-sm leading-relaxed">
                              {page.description}
                            </p>
                            <div className="mt-2 text-xs text-gray-500">
                              {page.href === '/'
                                ? 'pradumnasaraf.dev'
                                : `pradumnasaraf.dev${page.href}`}
                            </div>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
              </div>
            </div>
          ))}
        </div>

        {/* External Links */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            External Resources
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            {externalLinks.map((link) => {
              return (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md hover:border-gray-300 transition-all duration-200"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <FaExternalLinkAlt className="text-2xl text-gray-600 group-hover:text-blue-600 transition-colors" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                        {link.title}
                      </h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {link.description}
                      </p>
                      <div className="mt-2 text-xs text-gray-500">
                        External link
                      </div>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        {/* Technical Information */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Technical Information
          </h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 text-sm">
            <div>
              <h4 className="font-medium text-gray-800 mb-2">Main Sitemap</h4>
              <p className="text-gray-600 mb-2">
                XML sitemap for search engines:
              </p>
              <a
                href="/sitemap.xml"
                className="text-blue-600 hover:underline font-mono block"
                target="_blank"
                rel="noopener noreferrer"
              >
                /sitemap.xml
              </a>
            </div>
            <div>
              <h4 className="font-medium text-gray-800 mb-2">Sitemap Index</h4>
              <p className="text-gray-600 mb-2">Comprehensive sitemap index:</p>
              <a
                href="/sitemap-index.xml"
                className="text-blue-600 hover:underline font-mono block"
                target="_blank"
                rel="noopener noreferrer"
              >
                /sitemap-index.xml
              </a>
            </div>
            <div>
              <h4 className="font-medium text-gray-800 mb-2">Image Sitemap</h4>
              <p className="text-gray-600 mb-2">Photography and images:</p>
              <a
                href="/sitemap-images.xml"
                className="text-blue-600 hover:underline font-mono block"
                target="_blank"
                rel="noopener noreferrer"
              >
                /sitemap-images.xml
              </a>
            </div>
            <div>
              <h4 className="font-medium text-gray-800 mb-2">Video Sitemap</h4>
              <p className="text-gray-600 mb-2">Speaking recordings:</p>
              <a
                href="/sitemap-videos.xml"
                className="text-blue-600 hover:underline font-mono block"
                target="_blank"
                rel="noopener noreferrer"
              >
                /sitemap-videos.xml
              </a>
            </div>
            <div>
              <h4 className="font-medium text-gray-800 mb-2">RSS Feed</h4>
              <p className="text-gray-600 mb-2">Blog posts and content:</p>
              <a
                href="/rss.xml"
                className="text-blue-600 hover:underline font-mono block"
                target="_blank"
                rel="noopener noreferrer"
              >
                /rss.xml
              </a>
            </div>
            <div>
              <h4 className="font-medium text-gray-800 mb-2">Robots.txt</h4>
              <p className="text-gray-600 mb-2">Search engine directives:</p>
              <a
                href="/robots.txt"
                className="text-blue-600 hover:underline font-mono block"
                target="_blank"
                rel="noopener noreferrer"
              >
                /robots.txt
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>
            Last updated:{' '}
            {new Date().toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SitemapPage;
