'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export default function GTMPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Track page views for client-side navigation in Next.js App Router
    if (typeof window !== 'undefined' && window.dataLayer) {
      const pagePath = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
      
      window.dataLayer.push({
        event: 'page_view',
        page_path: pagePath,
        page_title: document.title,
        page_location: window.location.origin + pagePath,
      });
    }
  }, [pathname, searchParams]);

  return null;
}
