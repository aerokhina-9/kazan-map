'use client';

import { useState, useEffect } from 'react';
import { useApp } from '@/lib/context';
import {
  Map,
  Compass,
  Cloud,
  Utensils,
  Target,
  X,
  ChevronRight,
  Star,
} from 'lucide-react';

const WELCOME_SHOWN_KEY = 'kazan-map-welcome-shown';

export default function WelcomeOverlay() {
  const { setMode } = useApp();
  const [isVisible, setIsVisible] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem(WELCOME_SHOWN_KEY);
    if (!hasSeenWelcome) {
      setIsVisible(true);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem(WELCOME_SHOWN_KEY, 'true');
    setIsVisible(false);
  };

  const handleStartExploring = () => {
    setMode('explorer');
    handleClose();
  };

  if (!isVisible) return null;

  const steps = [
    {
      icon: Map,
      title: 'LEVEL 1',
      subtitle: 'АНТИ-ТУРИСТИЧЕСКАЯ КАРТА',
      description: 'Исследуй Казань за пределами туристических маршрутов',
      color: 'mario-blue',
    },
    {
      icon: Cloud,
      title: 'LEVEL 2',
      subtitle: 'СНИМИ ТУМАН',
      description: 'Каждая твоя находка открывает новую зону',
      color: 'mario-green',
    },
    {
      icon: Utensils,
      title: 'LEVEL 3',
      subtitle: 'ГДЕ ЕСТ ГОРОД',
      description: 'Отмечай места локальной кухни',
      color: 'mario-red',
    },
    {
      icon: Target,
      title: 'BOSS LEVEL',
      subtitle: 'ВЫПОЛНЯЙ МИССИИ',
      description: 'Открывай новые зоны и собирай награды',
      color: 'mario-yellow',
    },
  ];

  const currentStep = steps[step];
  const isLastStep = step === steps.length - 1;

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-mario-black/80 animate-fade-in">
      {/* Floating coins decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="mario-coin absolute"
            style={{
              left: `${20 + i * 15}%`,
              top: `${10 + (i % 3) * 20}%`,
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>

      <div className="mario-panel max-w-md w-full mx-4 overflow-hidden animate-scale-in">
        {/* Header - Brick style */}
        <div className="mario-brick p-4 md:p-6 text-white relative">
          <button
            onClick={handleClose}
            className="absolute top-3 right-3 p-2 hover:bg-white/20 rounded transition-colors"
          >
            <X size={20} />
          </button>

          <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
            <Star className="text-mario-yellow" size={20} className="md:w-6 md:h-6" />
            <span className="font-pixel text-[10px] md:text-xs">{currentStep.title}</span>
          </div>

          <div className="w-12 h-12 md:w-14 md:h-14 mario-question flex items-center justify-center mb-3 md:mb-4">
            <currentStep.icon size={24} className="md:w-7 md:h-7 text-mario-brown" />
          </div>

          <h2 className="font-pixel text-xs md:text-sm mb-2">{currentStep.subtitle}</h2>
          <p className="text-white/90 text-xs md:text-sm">{currentStep.description}</p>
        </div>

        {/* Progress - Pipe style dots */}
        <div className="flex justify-center gap-3 py-4 bg-mario-ground">
          {steps.map((_, i) => (
            <button
              key={i}
              onClick={() => setStep(i)}
              className={`w-4 h-4 border-2 border-mario-black transition-all ${
                i === step
                  ? 'bg-mario-green scale-125'
                  : i < step
                  ? 'bg-mario-yellow'
                  : 'bg-white'
              }`}
            />
          ))}
        </div>

        {/* Actions */}
        <div className="p-4 md:p-6 pt-3 md:pt-4 space-y-2 md:space-y-3 bg-[#e8e8e8]">
          {isLastStep ? (
            <button
              onClick={handleStartExploring}
              className="w-full mario-btn py-3 px-4 md:py-4 md:px-6 flex items-center justify-center gap-2 md:gap-3"
            >
              <Compass size={20} className="md:w-6 md:h-6" />
              <span className="font-pixel text-[10px] md:text-xs">START GAME!</span>
              <Star size={18} className="md:w-5 md:h-5 text-mario-yellow animate-pulse" />
            </button>
          ) : (
            <button
              onClick={() => setStep(step + 1)}
              className="w-full mario-btn py-3 px-4 md:py-4 md:px-6 flex items-center justify-center gap-2"
            >
              <span className="font-pixel text-[10px] md:text-xs">NEXT</span>
              <ChevronRight size={18} className="md:w-5 md:h-5" />
            </button>
          )}

          <button
            onClick={handleClose}
            className="w-full py-3 font-pixel text-[10px] text-mario-black/60 hover:text-mario-black transition-colors"
          >
            SKIP
          </button>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.8) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }

        .animate-scale-in {
          animation: scale-in 0.4s ease-out;
        }
      `}</style>
    </div>
  );
}
