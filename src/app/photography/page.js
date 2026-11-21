'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Masonry from 'react-masonry-css';
import { createPortal } from 'react-dom';
import './style.css';
import PageTopbar from '@/components/PageTopbar';
import images from './images.json';

// Fixed names so server and client render the same text (Intl.DisplayNames
// output can differ between Node and the browser and break hydration).
const COUNTRY_NAMES = {
  AE: 'United Arab Emirates',
  CZ: 'Czech Republic',
  DE: 'Germany',
  FR: 'France',
  GLOBE: 'Somewhere',
  HK: 'Hong Kong',
  IN: 'India',
  MO: 'Macau',
  MX: 'Mexico',
  PL: 'Poland',
  TR: 'Türkiye',
};

// `country` in images.json is an ISO 3166 code taken from the photo's own GPS
// data (matched to the nearest place in travel/travel.json).
function flagEmoji(code) {
  if (code === 'GLOBE') return '🌐';
  return String.fromCodePoint(
    ...code
      .toUpperCase()
      .split('')
      .map((c) => 0x1f1e6 + c.charCodeAt(0) - 65)
  );
}

function countryName(code) {
  return COUNTRY_NAMES[code] || code;
}

const MAX_IMAGE_RETRIES = 3;

// The grid only needs a small copy; images.json keeps the full-size Drive
// URL (sz=w2500) for the full-screen viewer.
const GRID_WIDTH = 800;
function gridSrc(src) {
  return src.replace(/([?&]sz=)w\d+/, `$1w${GRID_WIDTH}`);
}

const ImageItem = ({ src, alt, country, eager = false, onClick }) => {
  const [hasError, setHasError] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(eager);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.01,
        // Start fetching ~1.5 screens ahead so images are ready by the time
        // they scroll into view (paces requests with scroll, not all at once).
        rootMargin: '1200px 0px',
      }
    );

    const currentElement = document.getElementById(`image-${src}`);
    if (currentElement) {
      observer.observe(currentElement);
      return () => observer.unobserve(currentElement);
    }
  }, [src]);

  return (
    <div className="relative group w-full" style={{ marginBottom: '0.75rem' }}>
      <div
        id={`image-${src}`}
        className={`w-full overflow-hidden rounded-lg transition-all duration-300 image-container ${
          isLoading ? 'animate-pulse bg-gray-200' : ''
        }`}
        // Reserve space before the image loads so lazy-loading doesn't shift
        // the page and jank the scroll on mobile.
        style={isLoading || hasError ? { aspectRatio: '2 / 3' } : undefined}
      >
        {isVisible && !hasError && (
          <Image
            src={attempt ? `${gridSrc(src)}&retry=${attempt}` : gridSrc(src)}
            alt={alt}
            width={800}
            height={1200}
            loading={eager ? 'eager' : 'lazy'}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className={`w-full h-auto grayscale-image rounded-lg ${
              isLoading ? 'opacity-0' : 'opacity-100'
            }`}
            onError={() => {
              // Drive can rate-limit bursts of requests; retry a few times
              // with a growing delay, then offer a manual retry. The tile
              // always keeps its place so the grid never collapses.
              if (attempt < MAX_IMAGE_RETRIES) {
                setTimeout(
                  () => setAttempt((n) => n + 1),
                  1500 * (attempt + 1)
                );
              } else {
                setHasError(true);
              }
            }}
            onLoad={() => setIsLoading(false)}
          />
        )}
      </div>
      {hasError && (
        <button
          type="button"
          className="photo-retry"
          onClick={() => {
            setHasError(false);
            setAttempt((n) => n + 1);
          }}
        >
          Couldn&apos;t load. Tap to retry
        </button>
      )}
      <button
        type="button"
        className="photo-open"
        onClick={onClick}
        aria-label={`View photo: ${alt}${country ? `, ${countryName(country)}` : ''}`}
      />
      {country && (
        <span
          className={`photo-flag${country === 'GLOBE' ? ' photo-flag-globe' : ''}`}
          aria-hidden="true"
        >
          <span className="photo-flag-emoji">{flagEmoji(country)}</span>
          {countryName(country)}
        </span>
      )}
    </div>
  );
};

// The tap hint shows on the first photo opened after each page load.
let hintShownThisVisit = false;
const SWIPE_THRESHOLD = 50;

const FullScreenModal = ({
  isOpen,
  imageSrc,
  imageAlt,
  index,
  total,
  country,
  neighbours = [],
  onClose,
  onPrev,
  onNext,
}) => {
  const [loadedSrc, setLoadedSrc] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [hintVerb, setHintVerb] = useState('Tap');
  const touchStartX = useRef(null);

  useEffect(() => {
    if (!isOpen || hintShownThisVisit) return undefined;
    hintShownThisVisit = true;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHintVerb(window.matchMedia('(hover: hover)').matches ? 'Click' : 'Tap');
    setShowHint(true);
    const timer = setTimeout(() => setShowHint(false), 3200);
    return () => clearTimeout(timer);
  }, [isOpen]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(dx) < SWIPE_THRESHOLD) return;
    setShowHint(false);
    if (dx < 0) onNext();
    else onPrev();
  };

  const tapPrev = () => {
    setShowHint(false);
    onPrev();
  };

  const tapNext = () => {
    setShowHint(false);
    onNext();
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [isOpen, onClose, onPrev, onNext]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
      role="dialog"
      aria-modal="true"
      aria-label="Full screen image viewer"
      tabIndex={-1}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <button
        type="button"
        className="modal-tap-zone modal-tap-zone-prev"
        tabIndex={-1}
        onClick={tapPrev}
        aria-label="Previous image"
      />
      <button
        type="button"
        className="modal-tap-zone modal-tap-zone-next"
        tabIndex={-1}
        onClick={tapNext}
        aria-label="Next image"
      />
      {total > 0 && (
        <span className="modal-counter" aria-live="polite">
          {index + 1} / {total}
          {country && (
            <span className="modal-country">
              {flagEmoji(country)} {countryName(country)}
            </span>
          )}
        </span>
      )}
      {showHint && (
        <div className="modal-tap-hint" aria-hidden="true">
          <span className="modal-tap-hint-side">
            <span className="modal-tap-hint-arrow">‹</span>
            {hintVerb} left to go back
          </span>
          <span className="modal-tap-hint-side">
            {hintVerb} right for next
            <span className="modal-tap-hint-arrow">›</span>
          </span>
        </div>
      )}
      <div
        className="modal-close-wrap"
        style={{
          position: 'fixed',
          right: 20,
          top: 20,
          display: 'inline-block',
        }}
      >
        <button
          onClick={onClose}
          className="modal-circle-button close-modal-button"
          aria-label="Close"
        >
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
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <span className="modal-label modal-label-left">Close</span>
      </div>
      {loadedSrc !== imageSrc && (
        <span className="modal-loading" role="status">
          Loading photo…
        </span>
      )}
      {/* Keyed by src so the previous photo is removed at once instead of
          lingering under the new counter while the next one loads. */}
      <Image
        key={imageSrc}
        src={imageSrc}
        alt={imageAlt || 'Full screen photograph'}
        width={1920}
        height={1080}
        sizes="(max-width: 768px) 100vw, 90vw"
        className={`modal-image${loadedSrc === imageSrc ? '' : ' modal-image-loading'}`}
        style={{ objectFit: 'contain' }}
        onLoad={() => setLoadedSrc(imageSrc)}
      />
      {neighbours.map((src) => (
        <Image
          key={`preload-${src}`}
          src={src}
          alt=""
          aria-hidden="true"
          width={1920}
          height={1080}
          sizes="(max-width: 768px) 100vw, 90vw"
          loading="eager"
          className="modal-preload"
        />
      ))}
    </div>,
    document.body
  );
};

const RELOAD_GUARD_KEY = 'photography-layout-reload';

// True when tiles are much narrower than their columns, the "squeezed"
// layout seen a few times and fixed by a refresh.
function isGridSqueezed() {
  const column = document.querySelector('.my-masonry-grid_column');
  const tile = column?.firstElementChild;
  if (!column || !tile) return false;
  const columnWidth = column.getBoundingClientRect().width;
  return (
    columnWidth > 0 && tile.getBoundingClientRect().width < columnWidth * 0.6
  );
}

export default function PhotographyPage() {
  const [gridKey, setGridKey] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageSrc, setModalImageSrc] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Define breakpoint columns (react-masonry-css uses max-width semantics:
  // smaller keys override larger ones).
  const breakpointColumnsObj = {
    default: 4,
    1280: 3,
    768: 2,
    480: 1,
  };

  const openModal = (src) => {
    const index = images.findIndex((img) => img.src === src);
    setCurrentImageIndex(index);
    setModalImageSrc(src);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalImageSrc('');
  };

  const showPrevImage = () => {
    const newIndex = (currentImageIndex - 1 + images.length) % images.length;
    setCurrentImageIndex(newIndex);
    setModalImageSrc(images[newIndex].src);
  };

  const showNextImage = () => {
    const newIndex = (currentImageIndex + 1) % images.length;
    setCurrentImageIndex(newIndex);
    setModalImageSrc(images[newIndex].src);
  };

  // Safety net for the squeezed layout: rebuild the grid once, and if it is
  // still squeezed, reload the page once per session.
  useEffect(() => {
    const timers = [];
    timers.push(
      setTimeout(() => {
        if (!isGridSqueezed()) return;
        setGridKey((k) => k + 1);
        timers.push(
          setTimeout(() => {
            if (!isGridSqueezed()) return;
            try {
              if (sessionStorage.getItem(RELOAD_GUARD_KEY)) return;
              sessionStorage.setItem(RELOAD_GUARD_KEY, '1');
            } catch {
              return;
            }
            window.location.reload();
          }, 1500)
        );
      }, 1500)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <>
      <PageTopbar />

      <div className="min-h-screen p-4 md:p-8 photography-page-container">
        <header className="page-header page-header-tight">
          <h1 className="page-title">Photography</h1>
          <p className="page-subtitle">
            Open any photo to see it full screen in colour.
          </p>
        </header>

        <div className="container mx-auto">
          <Masonry
            key={gridKey}
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {images.map((image, index) => (
              <ImageItem
                key={image.src}
                src={image.src}
                alt={image.alt}
                country={image.country}
                eager={index < 4}
                onClick={() => openModal(image.src)}
              />
            ))}
          </Masonry>
        </div>

        <FullScreenModal
          isOpen={isModalOpen}
          imageSrc={modalImageSrc}
          imageAlt={images[currentImageIndex]?.alt}
          index={currentImageIndex}
          total={images.length}
          country={images[currentImageIndex]?.country}
          neighbours={[
            images[(currentImageIndex + 1) % images.length]?.src,
            images[(currentImageIndex - 1 + images.length) % images.length]
              ?.src,
          ].filter(Boolean)}
          onClose={closeModal}
          onPrev={showPrevImage}
          onNext={showNextImage}
        />
      </div>
    </>
  );
}
