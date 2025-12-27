'use client';

import { useEffect } from 'react';
import { Star, X } from 'lucide-react';

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

export default function Toast({ message, isVisible, onClose, duration = 3000 }: ToastProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[2000] animate-pop-in">
      <div className="mario-question px-6 py-4 flex items-center gap-3">
        <div className="mario-coin" />
        <span className="font-pixel text-[10px] text-mario-brown">{message}</span>
        <button
          onClick={onClose}
          className="ml-2 p-1 hover:bg-mario-brown/10 rounded transition-colors"
        >
          <X size={16} className="text-mario-brown" />
        </button>
      </div>
    </div>
  );
}
