// src/app/layout.js
import './globals.css'; // Tailwind and global styles
import Script from 'next/script';
import { League_Spartan } from 'next/font/google';

const leagueSpartan = League_Spartan({
  weight: ['300','400','500'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: 'Pradumna Saraf',
  description: "Developer Advocate. Docker Captain. Open Source evangelism.",
}

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