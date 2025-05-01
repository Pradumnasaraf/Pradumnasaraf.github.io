'use client';
import React, { useState, useEffect } from 'react';
import Masonry from 'react-masonry-css';
import { createPortal } from 'react-dom';
import './style.css';

const images = [
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
      <div className="absolute top-4 right-4 flex gap-4">
        <button
          onClick={onClose}
          className="flex items-center justify-center w-10 h-10 bg-white text-black rounded-full shadow-lg hover:bg-gray-100 transition-transform transform hover:scale-110"
          aria-label="Close"
        >
          &times;
        </button>
      </div>
      <button
        onClick={onPrev}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white text-black w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition-transform hover:scale-110"
        aria-label="Previous image"
      >
        ←
      </button>
      <img
        src={imageSrc}
        alt="Full Screen"
        className="max-w-[90vw] max-h-[90vh] object-contain"
      />
      <button
        onClick={onNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white text-black w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition-transform hover:scale-110"
        aria-label="Next image"
      >
        →
      </button>
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

  const breakpointColumnsObj = {
    default: 4,
    1536: 4,
    1280: 3,
    1024: 3,
    768: 2,
    640: 1
  };

  useEffect(() => {
    document.title = 'Pradumna Saraf | Photography'; // Set the document title
    // Preload images
    const preloadImages = () => {
      const imagePromises = images.map(img => {
        return new Promise((resolve, reject) => {
          const image = new Image();
          image.src = img.src;
          image.onload = resolve;
          image.onerror = reject;
        });
      });

      Promise.all(imagePromises)
        .then(() => setIsLoading(false))
        .catch(console.error);
    };

    preloadImages();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">{"Pradumna's Photography"}</h1>
        <div className="relative">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
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
    </div>
  );
}