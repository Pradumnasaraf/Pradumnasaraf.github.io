/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useState, useEffect } from 'react';
import Masonry from 'react-masonry-css';
import { createPortal } from 'react-dom';
import './style.css';
import Link from 'next/link';
import imagesLoaded from 'imagesloaded';

const images = [
  { src: 'https://drive.google.com/thumbnail?id=16PpTEy-h9WHxZtOLYx_bVrp4KbP-SWUU&sz=w2000', alt: 'photo' },
  { src: 'https://drive.google.com/thumbnail?id=1ZQJGrQZ9YbHP5P80xk3nju_oRyJO9Bab&sz=w2000', alt: 'photo' },
  { src: 'https://drive.google.com/thumbnail?id=1b4muPn7Ca_WFX3cgvZVpi1qLe6H39KoW&sz=w2000', alt: 'photo' },
  { src: 'https://drive.google.com/thumbnail?id=1uu0wWGmbHC0VY7BT-n5DUpWz86_ozANg&sz=w2000', alt: 'photo' },
  { src: 'https://drive.google.com/thumbnail?id=1G8IYlbeJUKvghC8FIlEmtyVo6fg_YxqZ&sz=w2000', alt: 'photo' },
  { src: 'https://drive.google.com/thumbnail?id=16L3ofu41chPDGxq_RW731LJivhIeVxUq&sz=w2000', alt: 'photo' },
  { src: 'https://drive.google.com/thumbnail?id=1Ei5tA5Yyr_a3MowFocGEjI18MXW9HNB9&sz=w2000', alt: 'photo' },
  { src: 'https://drive.google.com/thumbnail?id=1oJ7Mwt8_3l4x0lHlGjhBBzGIJGtMw-mb&sz=w2000', alt: 'photo' },
  { src: 'https://drive.google.com/thumbnail?id=1MHCmoSxTZzn12CF0049i6aGCGHBymgNi&sz=w2000', alt: 'photo' },
  { src: 'https://drive.google.com/thumbnail?id=1TkFT7Ltq-2WBiad2rSWf6HCzR4TlJHct&sz=w2000', alt: 'photo' },
  { src: 'https://drive.google.com/thumbnail?id=1ZANWi4xPKnBl33ZzKNQ33Wut3Q_PvhzZ&sz=w2000', alt: 'photo' },
  { src: 'https://drive.google.com/thumbnail?id=1_MfsKjvfoXEfnHShs9xfGCZBblqx6-Ys&sz=w2000', alt: 'photo' },
  { src: 'https://drive.google.com/thumbnail?id=1W3O99xQPuWHqsoXgJIEhqlezGM9fKBS7&sz=w2000', alt: 'photo' },
  { src: 'https://drive.google.com/thumbnail?id=1uDQWBVkYMfIM1zkqLEgfVp0LybMHbrON&sz=w2000', alt: 'photo' },
  { src: 'https://drive.google.com/thumbnail?id=10y1eKKToLn6r5YoTuAmygY2trfGSpnCG&sz=w2000', alt: 'photo' },
  { src: 'https://drive.google.com/thumbnail?id=1Je8FZim_4Yv4HpbHXo4QfeVJwAdXtRCT&sz=w2000', alt: 'photo' },
  { src: 'https://drive.google.com/thumbnail?id=1aSjqoUAatD6z2Y2aqDjGzIY-cgw0M4yS&sz=w2000', alt: 'photo' },
  { src: 'https://drive.google.com/thumbnail?id=1PpJmIfi7jOYkS3c1zIFcH4PhoGM3byY0&sz=w2000', alt: 'photo' },
  { src: 'https://drive.google.com/thumbnail?id=1FvJkbkKc9pGBQUsbL6xVe2zNpvhW17wP&sz=w2000', alt: 'photo' },
  { src: 'https://drive.google.com/thumbnail?id=13eCs2HwT_tE6OeEpyQIWejqj33DTiJji&sz=w2000', alt: 'photo' },
  { src: 'https://drive.google.com/thumbnail?id=1BkYTYmkOloOoRVSb-bJ_8QhpVLjXmoFC&sz=w2000', alt: 'photo' },
  { src: 'https://drive.google.com/thumbnail?id=1JWOvh9KtvBnHAw82hyRZo6Phf9ea1FQP&sz=w2000', alt: 'photo' },
  { src: 'https://drive.google.com/thumbnail?id=1MeFiCdT438uGjRJuApQ-jXhcuXUY9OM9&sz=w2000', alt: 'photo' },
  { src: 'https://drive.google.com/thumbnail?id=1m03fXOLcWTsFrWzKoXqB9vV2fl0ByijA&sz=w2000', alt: 'photo' },
  { src: 'https://drive.google.com/thumbnail?id=1UzdC2ZNdDrkUo3aOG5tYW7j-28uHpZNV&sz=w2000', alt: 'photo' },
  { src: 'https://drive.google.com/thumbnail?id=1nZOT0l-clGWfkdThQtJW3A_cz18pSNpB&sz=w2000', alt: 'photo' },
  { src: 'https://drive.google.com/thumbnail?id=18Koqchl7s-weaiq5LYN5B9J48Tcva47d&sz=w2000', alt: 'photo' },
  { src: 'https://drive.google.com/thumbnail?id=1kqL8Ns3FQAHwb2YOz_iYtUS6N__T6smr&sz=w2000', alt: 'photo' },
  { src: 'https://drive.google.com/thumbnail?id=1G_wdf3-Qon9B-aAQfzu2rTYBylLhl6AL&sz=w2000', alt: 'photo' },
  { src: 'https://drive.google.com/thumbnail?id=15FLX2bCpBOL13gdoVvId7m0fCi83qcrE&sz=w2000', alt: 'photo' },
  { src: 'https://drive.google.com/thumbnail?id=1wG3VNkz8Skx_pNULWeCHllpLujLaSnd5&sz=w2000', alt: 'photo' },
  { src: 'https://drive.google.com/thumbnail?id=1S77toNTIBy9pkJnHq9rgdxP2_a119MHk&sz=w2000', alt: 'photo' },
  { src: 'https://drive.google.com/thumbnail?id=1XVTlPdldc5eN7e40qCh4PbaapLZ6mfk3&sz=w2000', alt: 'photo' },
  { src: 'https://drive.google.com/thumbnail?id=1-5Zv3b-9yZkq9lU5E4Ls3eZqJqO7bPAv&sz=w2000', alt: 'photo' },
  { src: 'https://drive.google.com/thumbnail?id=1-_sVLUuvlL6omwexd1yBpwUKHe32RwI-&sz=w2000', alt: 'photo' },
  { src: 'https://drive.google.com/thumbnail?id=1ZypyRj1j-GjwddXWAaAKt5oCM4zSU9Pc&sz=w2000', alt: 'photo' },
  { src: 'https://drive.google.com/thumbnail?id=1ISysXMTEBkqwt3-wCN0jFRNATZTWKi26&sz=w2000', alt: 'photo' },
  { src: 'https://drive.google.com/thumbnail?id=1bifEZJm_rIx_Xs4pORmfXCCIVFuMH_DY&sz=w2000', alt: 'photo' },
  { src: 'https://drive.google.com/thumbnail?id=11VG8uzX2vUMSRtEnHsDxDMT3fcletqsY&sz=w2000', alt: 'photo' },
  { src: 'https://drive.google.com/thumbnail?id=1YbOEXGJfIOXvRW6akB1HVmaIOOF2Jk1h&sz=w2000', alt: 'photo' },
  { src: 'https://drive.google.com/thumbnail?id=1JANNc-kNawn7jUGRs4MUZc9ib0wQ8JBP&sz=w2000', alt: 'photo' },
  { src: 'https://drive.google.com/thumbnail?id=1ko_WLnJ2SNNEO13WkKmRhpvobDQ6Q_Ko&sz=w2000', alt: 'photo' },
  { src: 'https://drive.google.com/thumbnail?id=1b3CqP5Hn0xI2m6d2jH9_uWrfn3z8rkI0&sz=w2000', alt: 'photo' },
  { src: 'https://drive.google.com/thumbnail?id=1ruE0RqOwTPK0AR17ap4hwfGDgWboP52p&sz=w2000', alt: 'photo' },
  { src: 'https://drive.google.com/thumbnail?id=1O83nNCKCUZ4McHO1nlZXvo1OKqzLldyw&sz=w2000', alt: 'photo' },
  { src: 'https://drive.google.com/thumbnail?id=1MxtU3yWE8BkSi-1gessGGaTKGKzO8SO6&sz=w2000', alt: 'photo' },
  { src: 'https://drive.google.com/thumbnail?id=1nTQlYnaHPsy-kCrlV1bJocKgwlvqmyQc&sz=w2000', alt: 'photo' },
  { src: 'https://drive.google.com/thumbnail?id=1K_Iteo-Rqrxi0ayMMAjOgsBSocg81Wmx&sz=w2000', alt: 'photo' },
  { src: 'https://drive.google.com/thumbnail?id=1FEQMnHybHi1TDvCHweOsB7ODeC06VjIs&sz=w2000', alt: 'photo' },
  { src: 'https://drive.google.com/thumbnail?id=1P60hz5FIkEhoyxEJOtHCVprzm8sP4tt-&sz=w2000', alt: 'photo' },
  { src: 'https://drive.google.com/thumbnail?id=1dD4-Qrc2Hk4dCFQKcBB4GRbsvrcJOt0Q&sz=w2000', alt: 'photo' },
  { src: 'https://drive.google.com/thumbnail?id=1sVamXny-K2Tfb_m_PGxQEdTiV99_r8q8&sz=w2000', alt: 'photo' },
  { src: 'https://drive.google.com/thumbnail?id=16ujZfroa5zjL09-UJWPyeRK0NUu1VkBi&sz=w2000', alt: 'photo' },
  { src: 'https://drive.google.com/thumbnail?id=1-umcEA-0sefXkCVXtpEFxvVAWqtnw2y1&sz=w2000', alt: 'photo' },
]

// ImageItem Component with enhanced features
const ImageItem = ({ src, alt, onClick }) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const grid = document.querySelector('.my-masonry-grid');
    imagesLoaded(grid, () => {
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    const currentElement = document.getElementById(`image-${src}`);
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [src]);

  // Ensure images are loaded before setting loading to false
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, 8000); // 8 seconds maximum loading time

    return () => clearTimeout(timeoutId);
  }, []);

  return !hasError ? (
    <div className="relative group">
      <div 
        id={`image-${src}`}
        className={`w-full aspect-auto overflow-hidden rounded-lg shadow-md transition-all duration-300 ${
          isLoading ? 'animate-pulse bg-gray-200' : ''
        }`}
      >
        {isVisible && (
          <img
            src={src}
            alt={alt}
            className={`w-full h-auto object-cover cursor-pointer transition-all duration-500 transform group-hover:scale-105 grayscale-image ${
              isLoading ? 'opacity-0' : 'opacity-100'
            }`}
            onClick={onClick}
            onError={() => setHasError(true)}
            onLoad={() => setIsLoading(false)}
            loading="lazy"
          />
        )}
      </div>
      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
        <button
          onClick={onClick}
          className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 bg-white text-black px-4 py-2 rounded-full font-medium shadow-lg hover:bg-gray-100"
        >
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
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
      {/* Close Button */}
      <div style={{position: 'fixed', right: 20, top: 20, display: 'inline-block'}}>
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
      <div style={{position: 'fixed', left: 20, top: '50%', transform: 'translateY(-50%)', display: 'inline-block'}}>
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
      <img
        src={imageSrc}
        alt="Full Screen"
        className="max-w-[90vw] max-h-[90vh] object-contain"
      />
      {/* Next Button */}
      <div style={{position: 'fixed', right: 20, top: '50%', transform: 'translateY(-50%)', display: 'inline-block'}}>
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

// Main Home Component
export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageSrc, setModalImageSrc] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Define breakpoint columns
  const breakpointColumnsObj = {
    default: 4,
    1280: 3,
    1024: 3,
    768: 2,
    640: 1
  };

  const openModal = (src) => {
    const index = images.findIndex(img => img.src === src);
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
    document.title = 'Pradumna Saraf | Photography'; // Set the document title
    
    // Set a reasonable timeout to automatically clear loading state
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, 8000); // 8 seconds maximum loading time
    
    // Preload just a few images first for faster initial display
    const preloadInitialImages = () => {
      // Only preload first 8 images for quick display
      const initialImagePromises = images.slice(0, 8).map(img => {
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
          images.slice(8).forEach(img => {
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
    <div className="min-h-screen p-4 md:p-8 mx-4 md:mx-16">
      <Link href="/" className="back-button">
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
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
      </Link>

      <h1 className="camera-title">Pradumna{"'"}s Photography</h1>

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
    </div>
  );
}