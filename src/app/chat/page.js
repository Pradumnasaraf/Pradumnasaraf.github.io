"use client";
import './style.css';
import React, { useEffect } from 'react';
import { FaTwitter, FaGithub, FaLinkedin } from 'react-icons/fa';
import Head from 'next/head';
import Link from "next/link";

const ChatPage = () => {
  useEffect(() => {
    document.title = 'Pradumna Saraf | Schedule a Meeting';
    // Note: Google Tag Manager is loaded globally in layout.js, so we no longer inject it here.

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
      document.head.removeChild(calScript);
    };
  }, []);

  return (
    <>
      <Head>
        <link rel="icon" href="https://user-images.githubusercontent.com/51878265/194138074-7a341083-e80e-49d9-8e58-02882b26d3d9.png" />
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Schedule a Meeting</title>
      </Head>

      <Link href="/" className="back-button">
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
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
      </Link>

      {/* NAVIGATION */}
      <div className="nav">
        <div className="pages">
          <span className="page-item">
            <Link href="/">Home</Link>
          </span>
          <span className="page-item">
            <Link href="https://rebasemedia.com">Services</Link>
          </span>
        </div>
      </div>
      
      {/* Calendar Section */}
      <div id="my-cal-inline" className="calendar-container"></div>

    </>
  );
};

export default ChatPage;