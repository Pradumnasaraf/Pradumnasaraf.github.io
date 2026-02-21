'use client';

import { useEffect } from 'react';

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
const mailtoUrl = `mailto:pradumnasaraf@gmail.com?subject=${subject}&body=${body}`;

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

  return null;
}
