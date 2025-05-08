// src/app/layout.js
import './globals.css'; // Tailwind and global styles
import Script from 'next/script';
import { League_Spartan } from 'next/font/google';
import { metadata } from './metadata'; // Import metadata from metadata.js

const leagueSpartan = League_Spartan({
  weight: ['300','400','500'],
  subsets: ['latin'],
  display: 'swap',
});

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

// Export the metadata to ensure Next.js uses it
export { metadata };

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={leagueSpartan.className}>
      <head>
        {/* Google Tag Manager initialization */}
        <Script id="gtm-init" strategy="beforeInteractive">
          {`window.dataLayer = window.dataLayer || []; window.dataLayer.push({'gtm.start': new Date().getTime(), event: 'gtm.js'});`}
        </Script>
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtm.js?id=GTM-WRGLMZCX"
        />
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />

        {/* Explicit OG tags */}
        <meta property="og:title" content="Pradumna Saraf" />
        <meta property="og:description" content="Developer Advocate, Docker Captain, and Open Source evangelist. Sharing knowledge about cloud-native technologies, DevOps, and software development." />
        <meta property="og:url" content="https://pradumnasaraf.dev" />
        <meta property="og:site_name" content="Pradumna Saraf" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://pradumnasaraf.dev/media/pradumna-saraf-og.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Pradumna Saraf - Developer Advocate & Docker Captain" />
        
        {/* Twitter tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@pradumna_saraf" />
        <meta name="twitter:title" content="Pradumna Saraf" />
        <meta name="twitter:description" content="Developer Advocate, Docker Captain, and Open Source evangelist. Sharing knowledge about cloud-native technologies, DevOps, and software development." />
        <meta name="twitter:image" content="https://pradumnasaraf.dev/media/pradumna-saraf-og.png" />
      </head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WRGLMZCX"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <main>{children}</main>
      </body>
    </html>
  );
}