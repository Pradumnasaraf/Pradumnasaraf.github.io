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
  CZ: 'Czechia',
  DE: 'Germany',
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

// ImageItem Component with enhanced features
const ImageItem = ({ src, alt, country, onClick }) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Use a more lenient IntersectionObserver to prevent scroll blocking
    // Safari-specific: Delay observer setup to prevent blocking initial render
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

  return !hasError ? (
    <div className="relative group w-full" style={{ marginBottom: '0.75rem' }}>
      <div
        id={`image-${src}`}
        className={`w-full overflow-hidden rounded-lg transition-all duration-300 image-container ${
          isLoading ? 'animate-pulse bg-gray-200' : ''
        }`}
        // Reserve space before the image loads so lazy-loading doesn't shift
        // the page and jank the scroll on mobile.
        style={isLoading ? { aspectRatio: '2 / 3' } : undefined}
      >
        {isVisible && (
          <Image
            src={src}
            alt={alt}
            width={800}
            height={1200}
            unoptimized
            loading="lazy"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className={`w-full h-auto grayscale-image rounded-lg ${
              isLoading ? 'opacity-0' : 'opacity-100'
            }`}
            onError={() => setHasError(true)}
            onLoad={() => setIsLoading(false)}
          />
        )}
      </div>
      <button
        type="button"
        className="photo-open"
        onClick={onClick}
        aria-label={`View photo: ${alt}${country ? `, ${countryName(country)}` : ''}`}
      />
      {country && (
        <span
          className="photo-flag"
          title={countryName(country)}
          aria-hidden="true"
        >
          {flagEmoji(country)}
        </span>
      )}
    </div>
  ) : null;
};

// Enhanced FullScreenModal Component
const HINT_STORAGE_KEY = 'photo-viewer-hint-seen';
const SWIPE_THRESHOLD = 50;

const FullScreenModal = ({
  isOpen,
  imageSrc,
  imageAlt,
  index,
  total,
  country,
  onClose,
  onPrev,
  onNext,
}) => {
  const [showHint, setShowHint] = useState(false);
  const touchStartX = useRef(null);

  useEffect(() => {
    if (!isOpen) return undefined;
    let seen = true;
    try {
      seen = window.localStorage.getItem(HINT_STORAGE_KEY) === '1';
    } catch {
      seen = true;
    }
    if (seen || !window.matchMedia('(max-width: 768px)').matches) {
      return undefined;
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setShowHint(true);
    try {
      window.localStorage.setItem(HINT_STORAGE_KEY, '1');
    } catch {
      // Storage can be blocked; the hint then shows once per visit.
    }
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
        onClick={tapPrev}
        aria-label="Previous image"
      />
      <button
        type="button"
        className="modal-tap-zone modal-tap-zone-next"
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
            Tap left to go back
          </span>
          <span className="modal-tap-hint-side">
            Tap right for next
            <span className="modal-tap-hint-arrow">›</span>
          </span>
        </div>
      )}
      {/* Close Button */}
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
      {/* Previous Button */}
      <div
        className="modal-nav-wrap"
        style={{
          position: 'fixed',
          left: 20,
          top: '50%',
          transform: 'translateY(-50%)',
          display: 'inline-block',
        }}
      >
        <button
          onClick={onPrev}
          className="modal-circle-button modal-nav-button prev-modal-button"
          aria-label="Previous image"
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
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <span className="modal-label modal-label-right">Previous</span>
      </div>
      <Image
        src={imageSrc}
        alt={imageAlt || 'Full screen photograph'}
        width={1920}
        height={1080}
        unoptimized
        className="modal-image max-w-[90vw] max-h-[90vh] object-contain"
        style={{ objectFit: 'contain' }}
      />
      {/* Next Button */}
      <div
        className="modal-nav-wrap"
        style={{
          position: 'fixed',
          right: 20,
          top: '50%',
          transform: 'translateY(-50%)',
          display: 'inline-block',
        }}
      >
        <button
          onClick={onNext}
          className="modal-circle-button modal-nav-button next-modal-button"
          aria-label="Next image"
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
            <path d="M9 6l6 6-6 6" />
          </svg>
        </button>
        <span className="modal-label modal-label-left">Next</span>
      </div>
    </div>,
    document.body
  );
};

// Welcome Pop-up Component
const WelcomePopup = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (isOpen && e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 popup-backdrop"
      style={{ paddingLeft: '16px', paddingRight: '16px' }}
    >
      <div className="welcome-popup">
        <button
          onClick={onClose}
          className="popup-close-button"
          aria-label="Close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
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
        <div className="popup-content">
          <h2 className="popup-title">Welcome to my photography</h2>
          <p className="popup-message">
            Tap any image to view it full screen, then tap the right or left
            side (or swipe) to move between photos. Images start in grayscale
            and, on desktop, reveal their full color on hover.
          </p>
          <button onClick={onClose} className="popup-ok-button">
            Got it!
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

// Main Home Component
export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageSrc, setModalImageSrc] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showWelcomePopup, setShowWelcomePopup] = useState(false);

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

  useEffect(() => {
    // Client-only so it doesn't cause an SSR/hydration mismatch. Images load
    // lazily per-item via IntersectionObserver, so there's no global preload
    // (mass-preloading every Drive image at once triggered rate-limit 403s).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setShowWelcomePopup(true);
  }, []);

  return (
    <>
      <PageTopbar />

      <div className="min-h-screen p-4 md:p-8 photography-page-container">
        <h1 className="photography-title">Photography</h1>

        <div className="container mx-auto">
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {images.map((image, index) => (
              <ImageItem
                key={index}
                src={image.src}
                alt={image.alt}
                country={image.country}
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
          onClose={closeModal}
          onPrev={showPrevImage}
          onNext={showNextImage}
        />

        <WelcomePopup
          isOpen={showWelcomePopup}
          onClose={() => setShowWelcomePopup(false)}
        />
      </div>
    </>
  );
}
