import React from "react";
import { FaTimes } from "react-icons/fa";

export const DeletePopupModel = ({ isOpen, onClose, onConfirm }) => {
  // If the modal is not open, it should not render anything
  if (!isOpen) {
    return null;
  }

  return (
    // This wrapper creates the full-screen, blurred background
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-white/30 backdrop-blur-lg p-4"
      onClick={onClose} // Clicks on the blurred background will close the modal
    >
      {/* This is the content box, centered within the overlay */}
      <div
        className="flex flex-col items-center bg-white shadow-md rounded-xl py-6 px-5 w-full max-w-sm md:w-[460px] border border-gray-200 relative"
        onClick={(e) => e.stopPropagation()} // Prevents the modal from closing when you click inside the box
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
        >
          <FaTimes className="text-xl" />
        </button>

        <div className="flex items-center justify-center p-4 bg-red-100 rounded-full">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.875 5.75h1.917m0 0h15.333m-15.333 0v13.417a1.917 1.917 0 0 0 1.916 1.916h9.584a1.917 1.917 0 0 0 1.916-1.916V5.75m-10.541 0V3.833a1.917 1.917 0 0 1 1.916-1.916h3.834a1.917 1.917 0 0 1 1.916 1.916V5.75m-5.75 4.792v5.75m3.834-5.75v5.75"
              stroke="#DC2626"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h2 className="text-gray-900 font-semibold mt-4 text-xl">Are you sure?</h2>
        <p className="text-sm text-gray-600 mt-2 text-center">
          Do you really want to continue? This action<br />cannot be undone.
        </p>
        <div className="flex items-center justify-center gap-4 mt-5 w-full">
          <button
            onClick={onClose}
            type="button"
            className="w-full md:w-36 h-10 rounded-md border border-gray-300 bg-white text-gray-600 font-medium text-sm hover:bg-gray-100 active:scale-95 transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            type="button"
            className="w-full md:w-36 h-10 rounded-md text-white bg-red-600 font-medium text-sm hover:bg-red-700 active:scale-95 transition"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};