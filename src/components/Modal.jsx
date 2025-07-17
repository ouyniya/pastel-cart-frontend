import React from "react";

export default function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    // Overlay background
    <div
      className="fixed top-0 left-0 right-0 bottom-0 inset-0 bg-base-300/80 bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose}
    >
      {/* Modal container */}
      <div
        className="bg-base-100/50 backdrop-blur-md rounded-box shadow-lg max-w-lg w-full p-6 relative"
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside modal
      >
        {/* Modal header */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-serif">{title}</h2>
          <button
            className="hover:cursor-pointer hover:text-secondary"
            onClick={onClose}
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {/* Modal content */}
        <div>{children}</div>
      </div>
    </div>
  );
}
