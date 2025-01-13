'use client';
import React, { useState } from 'react';
import FullScreenModal from './FullScreenModal';
import Masonry from 'react-masonry-css';
import '../style.css';

const MasonryGrid = ({ images }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageSrc, setModalImageSrc] = useState('');

  const openModal = (src) => {
    setModalImageSrc(src);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalImageSrc('');
  };

  const breakpointColumnsObj = {
    default: 3,
    1100: 3,
    700: 2,
    500: 1
  };

  return (
    <>
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

      <FullScreenModal
        isOpen={isModalOpen}
        imageSrc={modalImageSrc}
        onClose={closeModal}
      />
    </>
  );
};

// Component to handle individual image rendering with error handling
const ImageItem = ({ src, alt, onClick }) => {
  const [hasError, setHasError] = useState(false);

  return !hasError ? (
    <img
      src={src}
      alt={alt}
      className="w-full h-auto object-cover cursor-pointer transition-transform transform hover:scale-105 grayscale-image"
      onClick={onClick}
      onError={() => setHasError(true)}
      loading="lazy"
    />
  ) : null;
};

export default MasonryGrid;