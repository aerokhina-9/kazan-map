'use client';

import { useState, useCallback } from 'react';
import { useApp } from '@/lib/context';
import { translations, LANGUAGES } from '@/lib/i18n';
import Toast from './Toast';
import {
  Plus,
  Share2,
  Code,
  Globe,
  ChevronDown,
  Navigation,
  Check,
  Star,
} from 'lucide-react';

export default function MapControls() {
  const {
    mode,
    lang,
    setLang,
    startAddingFinding,
    isEmbedMode,
    getNestedTranslation,
  } = useApp();

  const [showShare, setShowShare] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  const showToastMessage = useCallback((message: string) => {
    setToastMessage(message);
    setShowToast(true);
  }, []);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      showToastMessage(getNestedTranslation(translations.hints.linkCopied));
      setShowShare(false);
    } catch (e) {
      console.error('Failed to copy:', e);
    }
  };

  const getEmbedCode = () => {
    const url = new URL(window.location.href);
    url.searchParams.set('embed', '1');
    return `<iframe src="${url.toString()}" width="100%" height="500" frameborder="0" style="border-radius: 12px;"></iframe>`;
  };

  const handleCopyEmbed = async () => {
    try {
      await navigator.clipboard.writeText(getEmbedCode());
      showToastMessage('Код для вставки скопирован!');
      setShowShare(false);
    } catch (e) {
      console.error('Failed to copy:', e);
    }
  };

  return (
    <>
      {/* Right side controls */}
      <div className="absolute top-2 right-2 md:top-4 md:right-4 z-[1000] flex flex-col gap-2">
        {/* Language switcher */}
        <div className="relative">
          <button
            onClick={() => setShowLangMenu(!showLangMenu)}
            className="p-2 mario-panel hover:bg-mario-yellow/20 flex items-center gap-1 transition-colors"
            aria-label="Выбрать язык"
          >
            <Globe size={18} className="md:w-5 md:h-5 text-mario-brown" />
            <span className="text-xs md:text-sm font-pixel uppercase text-mario-brown hidden sm:inline">{lang}</span>
            <ChevronDown size={12} className="md:w-3.5 md:h-3.5 text-mario-brown hidden sm:block" />
          </button>

          {showLangMenu && (
            <>
              <div
                className="fixed inset-0 z-[999]"
                onClick={() => setShowLangMenu(false)}
              />
              <div className="absolute right-0 mt-1 mario-panel overflow-hidden z-[1000]">
                {LANGUAGES.map((l) => (
                  <button
                    key={l.id}
                    onClick={() => {
                      setLang(l.id);
                      setShowLangMenu(false);
                    }}
                    className={`w-full px-4 py-2 text-left text-sm hover:bg-mario-yellow/20 flex items-center gap-2 ${
                      lang === l.id ? 'bg-mario-green/20 text-mario-green' : 'text-mario-brown'
                    }`}
                  >
                    <span className="font-pixel text-[10px]">{l.nativeName}</span>
                    {lang === l.id && <Star size={14} className="text-mario-yellow" />}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Share button */}
        <div className="relative">
          <button
            onClick={() => setShowShare(!showShare)}
            className="p-2 mario-panel hover:bg-mario-yellow/20 transition-colors"
            aria-label="Поделиться"
          >
            <Share2 size={18} className="md:w-5 md:h-5 text-mario-brown" />
          </button>

          {showShare && (
            <>
              <div
                className="fixed inset-0 z-[999]"
                onClick={() => setShowShare(false)}
              />
              <div className="absolute right-0 mt-1 mario-panel p-3 z-[1000] w-64">
                <button
                  onClick={handleShare}
                  className="w-full mario-btn py-2 px-3 text-sm flex items-center justify-center gap-2"
                >
                  <Share2 size={16} />
                  <span className="font-pixel text-[9px]">
                    {getNestedTranslation(translations.actions.copyLink)}
                  </span>
                </button>

                {!isEmbedMode && (
                  <button
                    onClick={handleCopyEmbed}
                    className="w-full mt-2 py-2 px-3 border-4 border-mario-black bg-white hover:bg-mario-yellow/10 text-sm flex items-center justify-center gap-2 transition-colors"
                  >
                    <Code size={16} className="text-mario-brown" />
                    <span className="font-pixel text-[9px] text-mario-brown">
                      {getNestedTranslation(translations.actions.embedCode)}
                    </span>
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Bottom buttons (explorer mode only) */}
      {mode === 'explorer' && !isEmbedMode && (
        <div className="absolute bottom-3 right-3 md:bottom-6 md:right-6 z-[1000] flex flex-col gap-2 md:gap-3">
          {/* Find me button */}
          <button
            onClick={() => {
              window.dispatchEvent(new CustomEvent('flyToMario'));
            }}
            className="mario-panel py-2 px-3 md:py-3 md:px-4 hover:bg-mario-yellow/20 transition-all hover:scale-105 flex items-center gap-2"
            aria-label="Найти Марио"
          >
            <Navigation size={18} className="md:w-5 md:h-5 text-mario-red" />
            <span className="font-pixel text-[9px] md:text-[10px] text-mario-brown hidden sm:inline">FIND MARIO</span>
          </button>

          {/* Add finding button */}
          <button
            onClick={startAddingFinding}
            className="mario-btn py-3 px-4 md:py-4 md:px-6 transition-all hover:scale-105 flex items-center gap-2 md:gap-3"
            aria-label="Добавить находку"
          >
            <div className="w-7 h-7 md:w-8 md:h-8 bg-white/20 rounded flex items-center justify-center border-2 border-white/30">
              <Plus size={18} className="md:w-5 md:h-5" />
            </div>
            <span className="font-pixel text-[10px] md:text-xs">+ НАХОДКА</span>
          </button>
        </div>
      )}

      {/* Embed watermark */}
      {isEmbedMode && (
        <a
          href={window.location.origin}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-2 right-2 z-[1000] text-[7px] md:text-[8px] font-pixel text-mario-brown mario-panel px-1.5 py-0.5 md:px-2 md:py-1"
        >
          {getNestedTranslation(translations.appName)}
        </a>
      )}

      {/* Toast notification */}
      <Toast
        message={toastMessage}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </>
  );
}
