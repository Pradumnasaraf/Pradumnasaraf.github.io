'use client';

import { useEffect, useRef } from 'react';
import createGlobe from 'cobe';
import travelData from './travel.json';

const DEG = Math.PI / 180;

// Frame-rate-independent exponential smoothing: nudges `current` toward `target`
// by an amount set by the elapsed time `dt` and a time constant `tau` (seconds),
// so animations settle at the same real-world rate regardless of refresh rate.
const approach = (current, target, tau, dt) =>
  current + (target - current) * (1 - Math.exp(-dt / tau));

// How long a tapped marker's callout stays latched on touch devices (no hover).
const STICKY_CALLOUT_MS = 3000;

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
  const highlightRef = useRef(null);
  const pointerInteracting = useRef(null);
  const pointerInteractionMovement = useRef(0);
  const hoveredId = useRef(null);
  const globeHovered = useRef(false);
  const stickyTimer = useRef(null);

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

    // Auto-rotate speed in radians/second. Applied via delta-time below so the
    // globe spins at the same real-world rate on every device, regardless of
    // refresh rate or dropped frames. (~0.24 ≈ the old 0.004/frame at 60fps.)
    const ROTATION_PER_SEC = 0.24;

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
    // Don't run the auto-spotlight for reduced-motion users — the globe is
    // static for them, so popping callouts would be unwanted motion. They can
    // still hover a marker to see its callout.
    if (!reduceMotion) {
      reselect();
      scheduleReselect();
    }

    let raf;
    let lastTime = performance.now();
    // Once the user touches/hovers the globe, keep auto-rotate AND the
    // auto-spotlight paused until this long after they let go. The grace period
    // makes a tap or swipe visibly stop the globe (instead of it spinning
    // straight through the gesture) and stops a random callout from popping the
    // instant a finger lifts. We push it forward every frame while interacting.
    const RESUME_DELAY_MS = 1500;
    let resumeAt = 0;
    // Eased auto-rotate speed (rad/s). We ease this toward the target each frame
    // so the globe glides to a stop when touched and gently spins back up after
    // the grace period, instead of snapping between full speed and zero.
    let spinSpeed = 0;
    const SPIN_TAU = 0.25; // ease time constant (seconds)

    // Callout/highlight crossfade state. `displayedId` is what's currently on
    // screen; when the desired marker changes we fade the old one out, swap, and
    // fade the new one in — a smooth hand-off instead of a hard jump between dots.
    let displayedId = null;
    let calloutOpacity = 0;
    const FADE_TAU = 0.16; // ease time constant (seconds)
    const render = (now) => {
      // Time-based step: seconds since the last frame, clamped so a backgrounded
      // tab (or a long stall) can't jump the globe forward on return.
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      // Engaging the globe = mouse over it, or an active touch/drag.
      const interacting =
        globeHovered.current || pointerInteracting.current !== null;
      if (interacting) resumeAt = now + RESUME_DELAY_MS;
      const settled = now >= resumeAt; // true once the grace period has elapsed

      // Ease the spin speed toward its target (full when settled, 0 otherwise).
      const targetSpeed = !reduceMotion && settled ? ROTATION_PER_SEC : 0;
      spinSpeed = approach(spinSpeed, targetSpeed, SPIN_TAU, dt);
      phi += spinSpeed * dt;
      // movement is stored in pixels; convert to radians here (drag damping).
      currentPhi = phi + pointerInteractionMovement.current / 200;
      const f = currentPhi % doublePi;
      // width/height are fixed at build time (resize rebuilds), so only phi changes.
      globe.update({ phi: f });

      // A deliberate marker hover always wins; the ambient spotlight only shows
      // once settled, so it never fires mid-interaction or right after release.
      const activeId = hoveredId.current || (settled ? spotlightId : null);

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

      // What we'd like on screen this frame: the active marker, but only while
      // it's front-facing and has a live anchor.
      const desiredMarker = activeId ? markerById[activeId] : null;
      const desiredId =
        desiredMarker && getAnchor(activeId) && depthOf(desiredMarker, f) >= 0
          ? activeId
          : null;

      // Crossfade: ease toward the current target's opacity; when the target
      // changes, fade out first, then swap `displayedId` at the bottom of the
      // fade so the new dot/card fades in cleanly rather than teleporting.
      if (desiredId === displayedId) {
        calloutOpacity = approach(
          calloutOpacity,
          displayedId ? 1 : 0,
          FADE_TAU,
          dt
        );
      } else {
        calloutOpacity = approach(calloutOpacity, 0, FADE_TAU, dt);
        if (calloutOpacity < 0.05) {
          displayedId = desiredId;
          calloutOpacity = 0;
        }
      }

      const card = cardRef.current;
      const dot = highlightRef.current;
      card.style.opacity = `${calloutOpacity}`;
      dot.style.opacity = `${calloutOpacity}`;

      const anchor = displayedId ? getAnchor(displayedId) : null;
      if (displayedId && anchor) {
        if (cardLabelRef.current.textContent !== nameOf[displayedId]) {
          cardLabelRef.current.textContent = nameOf[displayedId];
          cardFlagRef.current.textContent = flagOf[displayedId];
        }
        // Position above the pin, but clamp inside the globe box so the card
        // never runs off the screen (and flip below if there's no room above).
        const wrapW = wrap.clientWidth;
        const wrapH = wrap.clientHeight;
        const pinX = (parseFloat(anchor.style.left) / 100) * wrapW;
        const pinY = (parseFloat(anchor.style.top) / 100) * wrapH;
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
        // Highlight dot sits right on the pin to mark the active place.
        dot.style.left = `${pinX}px`;
        dot.style.top = `${pinY}px`;
      }

      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    requestAnimationFrame(() => {
      canvas.style.opacity = '1';
    });

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(reselectTimer);
      clearTimeout(stickyTimer.current);
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
            onPointerEnter={(e) => {
              // Mouse hover shows the callout while the cursor is over the pin.
              if (e.pointerType === 'mouse') hoveredId.current = p.id;
            }}
            onPointerLeave={(e) => {
              if (e.pointerType === 'mouse') hoveredId.current = null;
            }}
            onPointerDown={(e) => {
              // Touch/pen have no hover, so a tap latches the callout for a few
              // seconds (then it fades), instead of vanishing on finger release.
              if (e.pointerType === 'mouse') return;
              hoveredId.current = p.id;
              clearTimeout(stickyTimer.current);
              stickyTimer.current = setTimeout(() => {
                if (hoveredId.current === p.id) hoveredId.current = null;
              }, STICKY_CALLOUT_MS);
            }}
            aria-label={nameOf[p.id]}
          />
        ))}
      </div>

      <div
        className="travel-marker-highlight"
        ref={highlightRef}
        aria-hidden="true"
      />

      <div className="travel-callout" ref={cardRef} aria-hidden="true">
        <span ref={cardFlagRef} className="travel-callout-flag" />
        <span ref={cardLabelRef} className="travel-callout-label" />
      </div>
    </div>
  );
};

export default Globe;
