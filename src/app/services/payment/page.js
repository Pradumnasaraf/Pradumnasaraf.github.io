'use client';
import React, { useEffect } from 'react';

const Page = () => {
  useEffect(() => {
    // Load Docsify script
    const scriptDocsify = document.createElement('script');
    scriptDocsify.src = '//cdn.jsdelivr.net/npm/docsify@4';
    scriptDocsify.async = true;
    document.body.appendChild(scriptDocsify);

    const scriptGTM = document.createElement('script');
    scriptGTM.innerHTML = `
      (function(w, d, s, l, i) {
        w[l] = w[l] || []; 
        w[l].push({
          'gtm.start': new Date().getTime(),
          event: 'gtm.js'
        });
        var f = d.getElementsByTagName(s)[0],
          j = d.createElement(s), 
          dl = l != 'dataLayer' ? '&l=' + l : ''; 
        j.async = true; 
        j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl; 
        f.parentNode.insertBefore(j, f);
      })(window, document, 'script', 'dataLayer', 'GTM-WRGLMZCX');
    `;
    document.head.appendChild(scriptGTM);
  }, []);

  return (
    <>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Pradumna Saraf Payments Process" />
        <link
          rel="icon"
          href="https://user-images.githubusercontent.com/51878265/194138074-7a341083-e80e-49d9-8e58-02882b26d3d9.png"
        />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta charSet="UTF-8" />
        <link
          rel="stylesheet"
          href="//cdn.jsdelivr.net/npm/docsify@4/themes/vue.css"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.$docsify = {
              hideSidebar: true,
              relativePath: true
            };
          `,
          }}
        />
      </head>
      <body style={{ margin: 0, height: '100vh', overflow: 'auto' }}>
        {/* Google Tag Manager noscript */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WRGLMZCX"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>

        <div id="app" style={{ height: '100%', overflowY: 'auto' }}></div>
      </body>
    </>
  );
};

export default Page;