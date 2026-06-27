'use client';

import dynamic from 'next/dynamic';

// cobe renders to a canvas and touches `window`, so the globe is client-only.
const Globe = dynamic(() => import('./Globe'), {
  ssr: false,
  loading: () => (
    <div className="travel-globe-wrap travel-globe-loading">Loading globe…</div>
  ),
});

export default function TravelGlobe() {
  return <Globe />;
}
