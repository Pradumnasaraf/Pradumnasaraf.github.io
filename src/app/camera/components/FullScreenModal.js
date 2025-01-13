import React from 'react';
import { createPortal } from 'react-dom';
import '../style.css';

const FullScreenModal = ({ isOpen, imageSrc, onClose }) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-5">
      {/* The close button positioned at the top-right corner of the viewport */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 flex items-center justify-center w-12 h-12 bg-white text-black text-2xl font-bold rounded-full shadow-lg border-2 border-black hover:bg-gray-100 transition-transform transform hover:scale-110"
        aria-label="Close"
      >
        &times;
      </button>
      <img
        src={imageSrc}
        alt="Full Screen"
        className="max-w-[90vw] max-h-[90vh] object-contain"
      />
    </div>,
    document.body
  );
};

export default FullScreenModal;