// ConfirmationModal.jsx
import React from 'react';

const ConfirmationModal = ({ isOpen, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 shadow-lg max-w-sm w-full">
        <h2 className="text-lg font-semibold mb-4">Confirmation</h2>
        <p className="mb-4">{message}</p>
        <div className="flex justify-between">
          <button
            onClick={onConfirm}
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600"
          >
            Evet
          </button>
          <button
            onClick={onCancel}
            className="bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded hover:bg-gray-400"
          >
            Hayır
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
