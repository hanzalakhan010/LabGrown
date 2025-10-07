import { type ReactNode } from 'react';

interface ModalProps {
  onClose: () => void;
  children: ReactNode;
}

export function Modal({ onClose, children }: ModalProps) {
  return (
    <div className='fixed inset-0 bg-opacity-40 border-2 flex justify-center items-center z-50'>
      <div className='bg-white rounded-lg shadow-lg p-6 max-w-md w-full relative'>
        <button
          onClick={onClose}
          className='absolute top-2 right-2 text-gray-500 hover:text-gray-800'
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}
