// src/app/layout.js
import './globals.css'; // Tailwind and global styles
import Script from 'next/script';
import { Suspense } from 'react';
import { League_Spartan } from 'next/font/google';
import { metadata } from './metadata'; // Import metadata from metadata.js
import GTMPageView from '@/components/GTMPageView';
import BodyRouteClass from '@/components/BodyRouteClass';
import { GTM_ID, SITE_URL } from '@/lib/constants';

const leagueSpartan = League_Spartan({
  weight: ['300', '400', '500'],
  subsets: ['latin'],
  display: 'swap',
});

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

// Export the metadata to ensure Next.js uses it
export { metadata };

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={leagueSpartan.className}
      suppressHydrationWarning
    >
      <head>
        {/* Google Tag Manager initialization */}
        <Script id="gtm-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || []; window.dataLayer.push({'gtm.start': new Date().getTime(), event: 'gtm.js'});`}
        </Script>
        {/*
          Blog dark-mode pre-paint: applies the user's stored blog theme to
          <html> before first paint to avoid a flash. The attribute is harmless
          on non-blog routes - dark CSS is scoped under .blog-theme-root, which
          only exists inside /blog.
        */}
        <Script id="blog-theme-init" strategy="beforeInteractive">
          {`(function(){try{var s=localStorage.getItem('blog-theme');var t=(s==='dark'||s==='light')?s:(window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.setAttribute('data-blog-theme',t);}catch(e){}})();`}
        </Script>
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`}
        />
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />

        {/* RSS Feed */}
        <link
          rel="alternate"
          type="application/rss+xml"
          href={`${SITE_URL}/rss.xml`}
          title="Pradumna Saraf - Blog RSS Feed"
        />

        {/* Note: OG and Twitter tags are handled by Next.js metadata API per page */}

        {/* Enhanced Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Pradumna Saraf',
              url: SITE_URL,
              sameAs: [
                'https://github.com/Pradumnasaraf',
                'https://twitter.com/pradumna_saraf',
                'https://linkedin.com/in/pradumnasaraf',
                `${SITE_URL}/blog`,
                'https://mvp.microsoft.com/en-US/MVP/profile/504ebf09-e92f-4620-82d7-67590711df58',
              ],
              jobTitle: 'Developer Advocate, Docker Captain & Microsoft MVP',
              worksFor: {
                '@type': 'Organization',
                name: 'Kestra',
                url: 'https://kestra.io',
              },
              knowsAbout: [
                'Docker',
                'Kubernetes',
                'DevOps',
                'Open Source',
                'Developer Relations',
                'Go',
                'JavaScript',
                'Cloud Native',
                'Container Technology',
                'CI/CD',
                'Microservices',
              ],
              alumniOf: {
                '@type': 'EducationalOrganization',
                name: 'Bachelor of Computer Applications',
              },
              award: [
                'Docker Captain',
                'Microsoft MVP',
                'Top Author on dev.to',
                'Winner of daily.dev RSS Feed Hackathon',
                'Winner of Postman API Fest Hackathon',
              ],
              memberOf: [
                {
                  '@type': 'Organization',
                  name: 'Docker Community',
                },
                {
                  '@type': 'Organization',
                  name: 'CNCF Community',
                },
                {
                  '@type': 'Organization',
                  name: 'Microsoft MVP Award Program',
                },
              ],
            }),
          }}
        />
      </head>
      <body suppressHydrationWarning>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            title="Google Tag Manager"
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <Suspense fallback={null}>
          <GTMPageView />
        </Suspense>
        <BodyRouteClass />
        <main>{children}</main>
      </body>
    </html>
  );
}
