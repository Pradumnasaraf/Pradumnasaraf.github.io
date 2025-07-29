'use client';

import { useEffect } from 'react';

export default function ContactPage() {
  useEffect(() => {
    // Immediately redirect to email client
    window.location.href = 'mailto:pradumnasaraf@gmail.com';
  }, []);

  return null; // Return null to show nothing while redirecting
} 