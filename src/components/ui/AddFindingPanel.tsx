'use client';

import { useState, useEffect } from 'react';
import { useApp } from '@/lib/context';
import { translations } from '@/lib/i18n';
import { getCategoriesForType, FindingType, TimeActivity } from '@/lib/categories';
import * as LucideIcons from 'lucide-react';
import {
  X,
  MapPin,
  Utensils,
  Coffee,
  Sun,
  Sunset,
  Moon,
  AlertCircle,
  Check,
  Star,
} from 'lucide-react';

export default function AddFindingPanel() {
  const {
    isAddingFinding,
    pendingLocation,
    cancelAddingFinding,
    addFinding,
    mode,
    getNestedTranslation,
  } = useApp();

  const [step, setStep] = useState<'location' | 'type' | 'category' | 'time' | 'note'>('location');
  const [selectedType, setSelectedType] = useState<FindingType | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<TimeActivity | null>(null);
  const [note, setNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (isAddingFinding) {
      setStep('location');
      setSelectedType(null);
      setSelectedCategory(null);
      setSelectedTime(null);
      setNote('');
      setShowSuccess(false);
    }
  }, [isAddingFinding]);

  useEffect(() => {
    if (pendingLocation && step === 'location') {
      setStep('type');
    }
  }, [pendingLocation, step]);

  const handleSubmit = async () => {
    if (!selectedType || !selectedCategory || !selectedTime || !pendingLocation) return;

    setIsSubmitting(true);

    const result = addFinding({
      type: selectedType,
      category: selectedCategory,
      timeActivity: selectedTime,
      note: note.trim() || undefined,
    });

    if (result) {
      setShowSuccess(true);
      setTimeout(() => {
        cancelAddingFinding();
      }, 1500);
    }

    setIsSubmitting(false);
  };

  if (mode !== 'explorer' || !isAddingFinding) return null;

  const categories = selectedType ? getCategoriesForType(selectedType) : [];

  return (
    <>
      {/* Overlay */}
      {step !== 'location' && (
        <div
          className="fixed inset-0 bg-mario-black/60 z-[1001] transition-opacity"
          onClick={cancelAddingFinding}
        />
      )}

      {/* Panel */}
      <div className={`fixed bottom-0 left-0 right-0 z-[1002] mario-panel overflow-hidden animate-slide-up ${step === 'location' ? 'max-h-[180px] md:max-h-[200px]' : 'max-h-[85vh] md:max-h-[80vh]'}`}>
        {showSuccess ? (
          <div className="p-8 flex flex-col items-center justify-center bg-mario-green/20">
            <div className="w-16 h-16 mario-question flex items-center justify-center mb-4 animate-scale-in">
              <Star size={32} className="text-mario-brown" />
            </div>
            <p className="font-pixel text-sm text-mario-green">
              +1 COIN!
            </p>
          </div>
        ) : step === 'location' ? (
          /* Location selection step */
          <div className="p-3 md:p-4 flex items-center justify-between bg-mario-ground">
            <div className="flex items-center gap-2 md:gap-3">
              <div className="w-8 h-8 md:w-10 md:h-10 mario-question flex items-center justify-center flex-shrink-0">
                <MapPin size={18} className="md:w-5 md:h-5 text-mario-brown" />
              </div>
              <div className="min-w-0">
                <p className="font-pixel text-[9px] md:text-[10px] text-mario-brown">ВЫБЕРИ МЕСТО</p>
                <p className="text-mario-brown/70 text-[10px] md:text-xs mt-1 hidden sm:block">Наведи прицел и нажми кнопку</p>
              </div>
            </div>
            <button
              onClick={cancelAddingFinding}
              className="p-2 hover:bg-mario-red/20 rounded transition-colors flex-shrink-0"
              aria-label="Отмена"
            >
              <X size={18} className="md:w-5 md:h-5 text-mario-brown" />
            </button>
          </div>
        ) : (
          <>
            {/* Header - Brick style */}
            <div className="mario-brick flex items-center justify-between p-3 md:p-4">
              <h3 className="font-pixel text-xs md:text-sm text-white">
                NEW FINDING
              </h3>
              <button
                onClick={cancelAddingFinding}
                className="p-2 hover:bg-white/20 rounded transition-colors"
                aria-label="Закрыть"
              >
                <X size={18} className="md:w-5 md:h-5 text-white" />
              </button>
            </div>

            {/* Steps indicator - Pipe style */}
            <div className="flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-2 md:py-3 bg-mario-ground overflow-x-auto">
              {['type', 'category', 'time', 'note'].map((s, i) => (
                <div key={s} className="flex items-center gap-1.5 md:gap-2 flex-shrink-0">
                  <div
                    className={`w-5 h-5 md:w-6 md:h-6 flex items-center justify-center text-[10px] md:text-xs font-pixel border-2 border-mario-black ${
                      step === s
                        ? 'bg-mario-green text-white'
                        : i < ['type', 'category', 'time', 'note'].indexOf(step)
                        ? 'bg-mario-yellow text-mario-brown'
                        : 'bg-white text-mario-brown'
                    }`}
                  >
                    {i + 1}
                  </div>
                  {i < 3 && <div className="w-3 md:w-4 h-1 bg-mario-black" />}
                </div>
              ))}
            </div>

            {/* Content */}
            <div className="p-3 md:p-4 overflow-y-auto max-h-[50vh] md:max-h-[50vh] bg-[#e8e8e8]">

              {/* Step 2: Type */}
              {step === 'type' && (
                <div className="space-y-2 md:space-y-3">
                  <p className="font-pixel text-[9px] md:text-[10px] text-mario-brown/70 mb-3 md:mb-4">
                    SELECT TYPE
                  </p>

                  {[
                    { type: 'Place' as FindingType, icon: MapPin, color: 'mario-blue' },
                    { type: 'Food' as FindingType, icon: Utensils, color: 'mario-red' },
                    { type: 'Drink' as FindingType, icon: Coffee, color: 'mario-brown' },
                  ].map(({ type, icon: Icon, color }) => (
                    <button
                      key={type}
                      onClick={() => {
                        setSelectedType(type);
                        setSelectedCategory(null);
                        setStep('category');
                      }}
                      className={`w-full p-3 md:p-4 border-4 flex items-center gap-3 md:gap-4 transition-all hover:scale-[1.02] ${
                        selectedType === type
                          ? `border-${color} bg-${color}/20`
                          : 'border-mario-black bg-white hover:bg-mario-yellow/10'
                      }`}
                    >
                      <div className={`w-10 h-10 md:w-12 md:h-12 mario-question flex items-center justify-center flex-shrink-0`}>
                        <Icon size={20} className="md:w-6 md:h-6 text-mario-brown" />
                      </div>
                      <span className="font-pixel text-[9px] md:text-[10px] text-mario-brown">
                        {getNestedTranslation(translations.findingTypes[type])}
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {/* Step 3: Category */}
              {step === 'category' && selectedType && (
                <div className="space-y-2 md:space-y-3">
                  <p className="font-pixel text-[9px] md:text-[10px] text-mario-brown/70 mb-3 md:mb-4">
                    SELECT CATEGORY
                  </p>

                  {categories.map((cat) => {
                    const IconComponent = (LucideIcons as unknown as Record<string, React.ComponentType<{ size?: number; className?: string }>>)[cat.icon];
                    return (
                      <button
                        key={cat.id}
                        onClick={() => {
                          setSelectedCategory(cat.id);
                          setStep('time');
                        }}
                        className={`w-full p-2.5 md:p-3 border-4 flex items-center gap-2 md:gap-3 transition-all hover:scale-[1.02] ${
                          selectedCategory === cat.id
                            ? 'border-mario-green bg-mario-green/20'
                            : 'border-mario-black bg-white hover:bg-mario-yellow/10'
                        }`}
                      >
                        <div
                          className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center border-2 border-mario-black flex-shrink-0"
                          style={{ backgroundColor: `${cat.color}40` }}
                        >
                          {IconComponent && <IconComponent size={18} className="md:w-5 md:h-5" />}
                        </div>
                        <div className="text-left min-w-0">
                          <div className="font-pixel text-[9px] md:text-[10px] text-mario-brown">
                            {getNestedTranslation(cat.label)}
                          </div>
                          <div className="text-[8px] md:text-[9px] text-mario-brown/60 mt-0.5 md:mt-1 hidden sm:block">
                            {getNestedTranslation(cat.description)}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Step 4: Time */}
              {step === 'time' && (
                <div className="space-y-2 md:space-y-3">
                  <p className="font-pixel text-[9px] md:text-[10px] text-mario-brown/70 mb-3 md:mb-4">
                    SELECT TIME
                  </p>

                  {[
                    { time: 'day' as TimeActivity, icon: Sun, color: 'mario-yellow' },
                    { time: 'evening' as TimeActivity, icon: Sunset, color: 'mario-red' },
                    { time: 'night' as TimeActivity, icon: Moon, color: 'mario-blue' },
                  ].map(({ time, icon: Icon, color }) => (
                    <button
                      key={time}
                      onClick={() => {
                        setSelectedTime(time);
                        setStep('note');
                      }}
                      className={`w-full p-3 md:p-4 border-4 flex items-center gap-3 md:gap-4 transition-all hover:scale-[1.02] ${
                        selectedTime === time
                          ? `border-mario-green bg-mario-green/20`
                          : 'border-mario-black bg-white hover:bg-mario-yellow/10'
                      }`}
                    >
                      <div className={`w-10 h-10 md:w-12 md:h-12 mario-question flex items-center justify-center flex-shrink-0`}>
                        <Icon size={20} className="md:w-6 md:h-6 text-mario-brown" />
                      </div>
                      <span className="font-pixel text-[9px] md:text-[10px] text-mario-brown">
                        {getNestedTranslation(translations.timeActivity[time])}
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {/* Step 5: Note */}
              {step === 'note' && (
                <div className="space-y-3 md:space-y-4">
                  <div>
                    <label className="block font-pixel text-[9px] md:text-[10px] text-mario-brown/70 mb-2">
                      ADD NOTE (OPTIONAL)
                    </label>
                    <textarea
                      value={note}
                      onChange={(e) => setNote(e.target.value.slice(0, 140))}
                      placeholder={getNestedTranslation(translations.addForm.notePlaceholder)}
                      className="w-full p-2.5 md:p-3 border-4 border-mario-black resize-none h-20 md:h-24 focus:border-mario-green focus:outline-none bg-white text-sm"
                    />
                    <div className="text-[7px] md:text-[8px] font-pixel text-mario-brown/50 text-right mt-1">
                      {note.length}/140
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-mario-red text-[9px] md:text-[10px] bg-mario-red/10 p-2.5 md:p-3 border-4 border-mario-red">
                    <AlertCircle size={14} className="md:w-4 md:h-4 flex-shrink-0" />
                    <span className="font-pixel">NO SPOILERS!</span>
                  </div>

                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="w-full mario-btn py-2.5 md:py-3 px-3 md:px-4 flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <Star size={18} className="md:w-5 md:h-5" />
                        <span className="font-pixel text-[10px] md:text-xs">SAVE!</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>

            {/* Back button */}
            <div className="p-3 md:p-4 border-t-4 border-mario-black bg-[#e8e8e8]">
              <button
                onClick={() => {
                  const steps = ['type', 'category', 'time', 'note'] as const;
                  const currentIndex = steps.indexOf(step as typeof steps[number]);
                  if (currentIndex > 0) {
                    setStep(steps[currentIndex - 1]);
                  } else {
                    setStep('location');
                  }
                }}
                className="font-pixel text-[9px] md:text-[10px] text-mario-brown/60 hover:text-mario-brown"
              >
                ← BACK
              </button>
            </div>
          </>
        )}
      </div>

      <style jsx global>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }

        @keyframes scale-in {
          from {
            transform: scale(0);
          }
          to {
            transform: scale(1);
          }
        }

        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }

        .animate-scale-in {
          animation: scale-in 0.4s ease-out;
        }
      `}</style>
    </>
  );
}
