'use client';

import { useEffect } from 'react';
import PageTopbar from '@/components/PageTopbar';

const EMAIL = 'pradumnasaraf@gmail.com';
const subject = encodeURIComponent('Collaboration Inquiry');
const body = encodeURIComponent(
  `Hi Pradumna,

I found you via pradumnasaraf.dev and would love to discuss:

[Add your message here]

Name:
Company:
Website:

Thanks,`
);
const mailtoUrl = `mailto:${EMAIL}?subject=${subject}&body=${body}`;

export default function ContactPage() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('opened') === '1') {
      return;
    }

    params.set('opened', '1');
    const query = params.toString();
    const nextUrl = `${window.location.pathname}${query ? `?${query}` : ''}`;
    window.history.replaceState(null, '', nextUrl);
    window.location.href = mailtoUrl;
  }, []);

  return (
    <main className="relative flex min-h-dvh items-center justify-center px-6 py-16">
      <div className="absolute inset-x-0 top-0">
        <PageTopbar />
      </div>

      <div className="w-full max-w-md text-center">
        <p className="mb-6 leading-relaxed text-fg-secondary">
          Your email app should have opened with a message ready to send. If it
          did not, you can reach me directly at:
        </p>
        <a
          href={mailtoUrl}
          className="text-lg text-fg underline underline-offset-4 transition-colors hover:text-fg-muted"
        >
          {EMAIL}
        </a>
      </div>
    </main>
  );
}
