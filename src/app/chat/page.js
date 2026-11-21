'use client';
import './style.css';
import { useEffect, useState } from 'react';
import PageTopbar from '@/components/PageTopbar';

const ChatPage = () => {
  const [calendarReady, setCalendarReady] = useState(false);

  // Cal.com injects an iframe into the container; hide the placeholder once
  // it shows up.
  useEffect(() => {
    const el = document.getElementById('my-cal-inline');
    if (!el) return undefined;
    const observer = new MutationObserver(() => {
      if (el.querySelector('iframe')) {
        setCalendarReady(true);
        observer.disconnect();
      }
    });
    observer.observe(el, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
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
      <div className="chat-page">
        <PageTopbar />

        <header className="page-header page-header-tight">
          <h1 className="page-title">Let&apos;s chat</h1>
          <p className="page-subtitle">
            Book a 30-minute call about talks, collaborations or content.
          </p>
        </header>

        <div className="calendar-wrap">
          {!calendarReady && (
            <p className="calendar-loading" role="status">
              Loading calendar…
            </p>
          )}
          <div id="my-cal-inline" className="calendar-container"></div>
        </div>
      </div>
    </>
  );
};

export default ChatPage;
