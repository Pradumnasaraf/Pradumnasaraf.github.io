'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const HOME_CLASS = 'route-home';

export default function BodyRouteClass() {
  const pathname = usePathname();

  useEffect(() => {
    const { body } = document;
    if (!body) return;

    if (pathname === '/') {
      body.classList.add(HOME_CLASS);
    } else {
      body.classList.remove(HOME_CLASS);
    }

    return () => {
      body.classList.remove(HOME_CLASS);
    };
  }, [pathname]);

  return null;
}
