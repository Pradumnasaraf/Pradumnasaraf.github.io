// src/app/layout.js
import './globals.css'; // Tailwind and global styles
import Script from 'next/script';
import { League_Spartan } from 'next/font/google';

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

export const metadata = {
  title: 'Pradumna Saraf | Developer Advocate & Docker Captain',
  description: "Developer Advocate, Docker Captain, and Open Source evangelist. Sharing knowledge about cloud-native technologies, DevOps, and software development.",
  keywords: "Pradumna Saraf, Developer Advocate, Docker Captain, Open Source, Cloud Native, DevOps, Software Development",
  authors: [{ name: 'Pradumna Saraf' }],
  creator: 'Pradumna Saraf',
  publisher: 'Pradumna Saraf',
  robots: 'index, follow',
  openGraph: {
    title: 'Pradumna Saraf | Developer Advocate & Docker Captain',
    description: "Developer Advocate, Docker Captain, and Open Source evangelist. Sharing knowledge about cloud-native technologies, DevOps, and software development.",
    url: 'https://pradumnasaraf.dev',
    siteName: 'Pradumna Saraf',
    images: [
      {
        url: 'https://pradumnasaraf.dev/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Pradumna Saraf - Developer Advocate & Docker Captain',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pradumna Saraf | Developer Advocate & Docker Captain',
    description: "Developer Advocate, Docker Captain, and Open Source evangelist. Sharing knowledge about cloud-native technologies, DevOps, and software development.",
    creator: '@pradumna_saraf',
    images: ['https://pradumnasaraf.dev/og-image.jpg'],
  },
  verification: {
    google: 'your-google-site-verification',
  },
};

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