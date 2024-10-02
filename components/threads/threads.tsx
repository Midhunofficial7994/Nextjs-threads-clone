import React, { ReactNode } from 'react';

interface ThreadsProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Threads: React.FC<ThreadsProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    // <div className="fixed inset-0 w-screen h-screen bg-black bg-opacity-60 flex justify-center items-center z-[1000]">
      <div className="bg-[#181818] p-8 w-[90%] max-w-[500px] rounded-lg shadow-lg relative animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-2xl text-gray-500 hover:text-red-500 transition-colors"
        >
          &times;
        </button>
        <div className="mt-4 text-gray-200">{children}</div>
      </div>
    // </div>
  );
};

export default Threads;
