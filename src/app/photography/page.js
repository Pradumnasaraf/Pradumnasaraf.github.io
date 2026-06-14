'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Masonry from 'react-masonry-css';
import { createPortal } from 'react-dom';
import './style.css';
import PageTopbar from '@/components/PageTopbar';
import images from './images.json';

// ImageItem Component with enhanced features
const ImageItem = ({ src, alt, onClick }) => {
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
        threshold: 0.01, // Lower threshold for earlier loading
        rootMargin: '50px', // Start loading images before they're visible
      }
    );

    const currentElement = document.getElementById(`image-${src}`);
    if (currentElement) {
      // Safari-specific: Use requestAnimationFrame to prevent blocking scroll
      // This ensures the observer setup doesn't interfere with Safari's scroll handling
      let timeoutId;
      const rafId = requestAnimationFrame(() => {
        timeoutId = setTimeout(() => {
          const element = document.getElementById(`image-${src}`);
          if (element) {
            observer.observe(element);
          }
        }, 0);
      });

      return () => {
        cancelAnimationFrame(rafId);
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
        if (currentElement) {
          observer.unobserve(currentElement);
        }
      };
    }
  }, [src]);

  return !hasError ? (
    <div className="relative group w-full" style={{ marginBottom: '0.75rem' }}>
      <div
        id={`image-${src}`}
        className={`w-full overflow-hidden rounded-lg transition-all duration-300 image-container ${
          isLoading ? 'animate-pulse bg-gray-200' : ''
        }`}
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
            className={`w-full h-auto cursor-pointer grayscale-image rounded-lg ${
              isLoading ? 'opacity-0' : 'opacity-100'
            }`}
            onClick={onClick}
            onError={() => setHasError(true)}
            onLoad={() => {
              setIsLoading(false);
              // Safari-specific: Force layout recalculation after image loads
              requestAnimationFrame(() => {
                const container = document.querySelector(
                  '.photography-page-container'
                );
                if (container) {
                  // Trigger a reflow to ensure scroll works
                  void container.offsetHeight;
                }
              });
            }}
          />
        )}
      </div>
      <div className="photo-hover-overlay">
        <button onClick={onClick} className="photo-view-button">
          View Photo
        </button>
      </div>
    </div>
  ) : null;
};

// Enhanced FullScreenModal Component
const FullScreenModal = ({ isOpen, imageSrc, onClose, onPrev, onNext }) => {
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
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
      {/* Close Button */}
      <div
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
        alt="Full Screen"
        width={1920}
        height={1080}
        unoptimized
        className="max-w-[90vw] max-h-[90vh] object-contain"
        style={{ objectFit: 'contain' }}
      />
      {/* Next Button */}
      <div
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
          <h2 className="popup-title">Welcome to Photography page!</h2>
          <p className="popup-message">
            Hover over any image to see it in full color! The images start in
            grayscale and reveal their vibrant colors when you interact with
            them.
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
  const [isLoading, setIsLoading] = useState(true);
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
    // Show welcome popup when page loads
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setShowWelcomePopup(true);

    // Set a reasonable timeout to automatically clear loading state
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, 8000); // 8 seconds maximum loading time

    // Preload just a few images first for faster initial display
    const preloadInitialImages = () => {
      // Only preload first 8 images for quick display
      const initialImagePromises = images.slice(0, 8).map((img) => {
        return new Promise((resolve) => {
          const image = new Image();
          image.src = img.src;
          image.onload = resolve;
          image.onerror = resolve;
        });
      });

      Promise.all(initialImagePromises)
        .then(() => {
          // Set loading to false after initial images load
          setIsLoading(false);

          // Continue loading the rest in background
          images.slice(8).forEach((img) => {
            const image = new Image();
            image.src = img.src;
          });
        })
        .catch(() => {
          setIsLoading(false);
        });
    };

    preloadInitialImages();
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <>
      <PageTopbar />

      <div className="min-h-screen p-4 md:p-8 photography-page-container">
        <h1 className="photography-title">Photography</h1>

        <div className="container mx-auto">
          {isLoading && (
            <div className="flex justify-center my-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            </div>
          )}
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
                onClick={() => openModal(image.src)}
              />
            ))}
          </Masonry>
        </div>

        <FullScreenModal
          isOpen={isModalOpen}
          imageSrc={modalImageSrc}
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
