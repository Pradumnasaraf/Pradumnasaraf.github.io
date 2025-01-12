"use client";
import React, { useEffect } from 'react';

const ScheduleMeetingPage = () => {
  useEffect(() => {
    // Google Tag Manager Script
    const script = document.createElement('script');
    script.innerHTML = `
      (function (w, d, s, l, i) {
        w[l] = w[l] || []; w[l].push({
          'gtm.start': new Date().getTime(), event: 'gtm.js'
        });
        var f = d.getElementsByTagName(s)[0],
            j = d.createElement(s), dl = l !== 'dataLayer' ? '&l=' + l : '';
        j.async = true;
        j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
        f.parentNode.insertBefore(j, f);
      })(window, document, 'script', 'dataLayer', 'GTM-WRGLMZCX');
    `;
    document.head.appendChild(script);

    // Cal inline embed code
    const calScript = document.createElement('script');
    calScript.type = 'text/javascript';
    calScript.innerHTML = `
      (function (C, A, L) {
        let p = function (a, ar) { a.q.push(ar); };
        let d = C.document;
        C.Cal = C.Cal || function () {
          let cal = C.Cal;
          let ar = arguments;
          if (!cal.loaded) {
            cal.ns = {};
            cal.q = cal.q || [];
            d.head.appendChild(d.createElement("script")).src = A;
            cal.loaded = true;
          }
          if (ar[0] === L) {
            const api = function () { p(api, arguments); };
            const namespace = ar[1];
            api.q = api.q || [];
            if (typeof namespace === "string") {
              cal.ns[namespace] = cal.ns[namespace] || api;
              p(cal.ns[namespace], ar);
              p(cal, ["initNamespace", namespace]);
            } else p(cal, ar);
            return;
          }
          p(cal, ar);
        };
      })(window, "https://app.cal.com/embed/embed.js", "init");

      Cal("init", { origin: "https://cal.com" });

      Cal("inline", {
        elementOrSelector: "#my-cal-inline",
        calLink: "pradumnasaraf/30min",
        layout: "month_view"
      });

      Cal("ui", { "styles": { "branding": { "brandColor": "#000000" } }, "hideEventTypeDetails": false, "layout": "month_view" });
    `;
    document.head.appendChild(calScript);

    return () => {
      // Clean up the scripts when the component unmounts
      document.head.removeChild(script);
      document.head.removeChild(calScript);
    };
  }, []);

  return (
    <div>
      <head>
        <link
          rel="icon"
          href="https://user-images.githubusercontent.com/51878265/194138074-7a341083-e80e-49d9-8e58-02882b26d3d9.png"
        />
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Schedule a Meeting</title>
      </head>

      <div style={{ width: '100vw', height: '100vh', overflow: 'scroll', backgroundColor: 'white', padding: '30px' }} id="my-cal-inline"></div>
    </div>
  );
};

export default ScheduleMeetingPage;