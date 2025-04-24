import React from "react";

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

export default function WebModal({ children, onClose }: ModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="relative bg-white p-6 rounded-3xl shadow-lg max-w-md w-full">
        {children}
        <button
          onClick={onClose}
          className="absolute top-4 right-6 text-gray-600 hover:text-gray-900"
        >
          ✖
        </button>
      </div>
    </div>
  );
}
