'use client';

import { useEffect, useRef } from 'react';
import createGlobe from 'cobe';
import travelData from './travel.json';

const DEG = Math.PI / 180;

const places = travelData.filter(
  (p) => typeof p.lat === 'number' && typeof p.lng === 'number'
);

const flagOf = {};
const nameOf = {};
places.forEach((p) => {
  flagOf[p.id] = p.flag || '';
  nameOf[p.id] = p.country ? `${p.place}, ${p.country}` : p.place;
});

// Pre-compute each marker's unit-sphere vector (matches cobe's own mapping) so
// we can tell every frame whether it faces the camera (front of the globe).
const markers = places.map((p) => {
  const latR = p.lat * DEG;
  const lngR = p.lng * DEG - Math.PI;
  const o = Math.cos(latR);
  return {
    id: p.id,
    location: [p.lat, p.lng],
    size: 0.025, // small blue dot: visible but won't blob clustered cities together
    vec: [-o * Math.cos(lngR), Math.sin(latR), o * Math.sin(lngR)],
  };
});

// What cobe needs (no `vec`), and an id->marker lookup for the render loop.
const cobeMarkers = markers.map(({ id, location, size }) => ({
  id,
  location,
  size,
}));
const markerById = Object.fromEntries(markers.map((m) => [m.id, m]));

const Globe = () => {
  const canvasRef = useRef(null);
  const wrapRef = useRef(null);
  const markerRefs = useRef({});
  const cardRef = useRef(null);
  const cardFlagRef = useRef(null);
  const cardLabelRef = useRef(null);
  const pointerInteracting = useRef(null);
  const pointerInteractionMovement = useRef(0);
  const hoveredId = useRef(null);
  const globeHovered = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const theta = 0.2;
    let phi = 0;
    let width = 0;
    let currentPhi = 0;
    const doublePi = Math.PI * 2;

    const measureWidth = () =>
      wrap.clientWidth || canvas.offsetWidth || canvas.clientWidth || 0;
    width = measureWidth();

    // cobe writes a live-positioned <div> per marker (id-keyed). Cache those so
    // we can mirror their position onto our own hit areas.
    let cobeAnchors = {};
    const getAnchor = (id) => {
      if (!cobeAnchors[id]) {
        cobeAnchors[id] = wrap.querySelector(`[style*="--cobe-${id};"]`);
      }
      return cobeAnchors[id];
    };

    let globe;
    const buildGlobe = () => {
      if (globe) globe.destroy();
      cobeAnchors = {}; // anchors are recreated by cobe; drop stale refs
      globe = createGlobe(canvas, {
        devicePixelRatio: 2,
        width: width * 2,
        height: width * 2,
        phi: currentPhi,
        theta,
        dark: 1,
        diffuse: 1.1,
        mapSamples: 16000,
        mapBrightness: 7,
        baseColor: [0.34, 0.4, 0.58], // soft slate-blue sphere (not near-black)
        markerColor: [0, 0.659, 1], // neon blue pins (#00a8ff)
        glowColor: [0.85, 0.85, 0.87], // soft neutral glow (mono, matches site)
        markerElevation: 0, // keep markers flat on the surface, not raised
        markers: cobeMarkers,
      });
    };
    buildGlobe();

    // cobe's update() doesn't resize the canvas buffer, so on a real width
    // change we rebuild the globe (otherwise it renders shifted/clipped).
    const onResize = () => {
      const next = measureWidth();
      if (next && Math.abs(next - width) > 1) {
        width = next;
        buildGlobe();
      }
    };
    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(wrap);
    window.addEventListener('resize', onResize);

    const cosT = Math.cos(theta);
    const sinT = Math.sin(theta);
    const LABEL_THRESHOLD = 0.15;
    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const depthOf = (m, f) =>
      -Math.sin(f) * cosT * m.vec[0] +
      sinT * m.vec[1] +
      Math.cos(f) * cosT * m.vec[2];

    // Spotlight: highlight one random marker from those currently facing the
    // viewer, switching the selection every few seconds.
    let spotlightId = null;
    const reselect = () => {
      const visible = markers.filter(
        (m) => depthOf(m, currentPhi % doublePi) >= LABEL_THRESHOLD
      );
      spotlightId = visible.length
        ? visible[Math.floor(Math.random() * visible.length)].id
        : null;
    };

    let reselectTimer;
    const scheduleReselect = () => {
      reselectTimer = setTimeout(
        () => {
          reselect();
          scheduleReselect();
        },
        3000 + Math.random() * 1500 // switch every ~3–4.5s
      );
    };
    reselect();
    scheduleReselect();

    let raf;
    const render = () => {
      if (
        !reduceMotion &&
        pointerInteracting.current === null &&
        !globeHovered.current
      ) {
        phi += 0.004; // auto-rotate unless hovering the globe, dragging, or reduced motion
      }
      // movement is stored in pixels; convert to radians here (drag damping).
      currentPhi = phi + pointerInteractionMovement.current / 200;
      const f = currentPhi % doublePi;
      // width/height are fixed at build time (resize rebuilds), so only phi changes.
      globe.update({ phi: f });

      // Hover wins over the spotlight; otherwise show the spotlight pick.
      const activeId = hoveredId.current || spotlightId;

      // Keep our (transparent) hit areas over each front-facing surface marker.
      for (const m of markers) {
        const el = markerRefs.current[m.id];
        const anchor = getAnchor(m.id);
        if (!el || !anchor) continue;
        if (depthOf(m, f) >= 0) {
          el.style.left = anchor.style.left;
          el.style.top = anchor.style.top;
          el.style.pointerEvents = 'auto';
        } else {
          el.style.pointerEvents = 'none';
        }
      }

      // Card floats just above the active pin and follows it; it shows only
      // while that pin is front-facing.
      const card = cardRef.current;
      const activeMarker = activeId ? markerById[activeId] : null;
      const activeAnchor = activeId ? getAnchor(activeId) : null;
      const showCallout =
        activeMarker && activeAnchor && depthOf(activeMarker, f) >= 0;

      if (showCallout) {
        if (cardLabelRef.current.textContent !== nameOf[activeId]) {
          cardLabelRef.current.textContent = nameOf[activeId];
          cardFlagRef.current.textContent = flagOf[activeId];
        }
        // Position above the pin, but clamp inside the globe box so the card
        // never runs off the screen (and flip below if there's no room above).
        const wrapW = wrap.clientWidth;
        const wrapH = wrap.clientHeight;
        const pinX = (parseFloat(activeAnchor.style.left) / 100) * wrapW;
        const pinY = (parseFloat(activeAnchor.style.top) / 100) * wrapH;
        const cw = card.offsetWidth;
        const ch = card.offsetHeight;
        const pad = 8;
        const gap = 12;
        const cx = Math.min(Math.max(pinX, cw / 2 + pad), wrapW - cw / 2 - pad);
        let top = pinY - gap - ch >= pad ? pinY - gap - ch : pinY + gap;
        top = Math.min(Math.max(top, pad), wrapH - ch - pad);
        card.style.left = `${cx}px`;
        card.style.top = `${top}px`;
        card.style.transform = 'translateX(-50%)';
        card.style.opacity = '1';
      } else {
        card.style.opacity = '0';
      }

      raf = requestAnimationFrame(render);
    };
    render();

    requestAnimationFrame(() => {
      canvas.style.opacity = '1';
    });

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(reselectTimer);
      resizeObserver.disconnect();
      window.removeEventListener('resize', onResize);
      if (globe) globe.destroy();
    };
  }, []);

  const onPointerDown = (e) => {
    pointerInteracting.current = e.clientX - pointerInteractionMovement.current;
    wrapRef.current?.setPointerCapture?.(e.pointerId);
    if (wrapRef.current) wrapRef.current.style.cursor = 'grabbing';
  };

  const endInteraction = (e) => {
    pointerInteracting.current = null;
    wrapRef.current?.releasePointerCapture?.(e.pointerId);
    if (wrapRef.current) wrapRef.current.style.cursor = 'grab';
  };

  const onPointerMove = (e) => {
    if (pointerInteracting.current === null) return;
    pointerInteractionMovement.current = e.clientX - pointerInteracting.current;
  };

  return (
    <div
      className="travel-globe-wrap"
      ref={wrapRef}
      onPointerEnter={() => {
        globeHovered.current = true;
      }}
      onPointerLeave={() => {
        globeHovered.current = false;
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endInteraction}
      onPointerCancel={endInteraction}
    >
      <canvas ref={canvasRef} className="travel-globe" />

      <div className="travel-globe-markers">
        {places.map((p) => (
          <button
            key={p.id}
            type="button"
            className="travel-marker"
            ref={(el) => {
              markerRefs.current[p.id] = el;
            }}
            onPointerEnter={() => {
              hoveredId.current = p.id;
            }}
            onPointerLeave={() => {
              hoveredId.current = null;
            }}
            aria-label={nameOf[p.id]}
          />
        ))}
      </div>

      <div className="travel-callout" ref={cardRef} aria-hidden="true">
        <span ref={cardFlagRef} className="travel-callout-flag" />
        <span ref={cardLabelRef} className="travel-callout-label" />
      </div>
    </div>
  );
};

export default Globe;
