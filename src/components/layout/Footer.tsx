'use client';

import Link from 'next/link';
import { useApp } from '@/lib/context';
import { translations } from '@/lib/i18n';
import { Star } from 'lucide-react';

export default function Footer() {
  const { getNestedTranslation, isEmbedMode } = useApp();

  if (isEmbedMode) return null;

  return (
    <footer className="mario-brick text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="mario-question w-8 h-8 flex items-center justify-center">
                <Star size={16} className="text-mario-brown" />
              </div>
              <span className="font-pixel text-sm">
                KAZAN MAP
              </span>
            </div>
            <p className="text-sm text-white/70">
              {getNestedTranslation(translations.tagline)}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-pixel text-[10px] mb-4">
              МЕНЮ
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/map" className="text-white/70 hover:text-white transition-colors font-pixel text-[9px]">
                  {getNestedTranslation(translations.nav.map)}
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="text-white/70 hover:text-white transition-colors font-pixel text-[9px]">
                  {getNestedTranslation(translations.nav.howItWorks)}
                </Link>
              </li>
              <li>
                <Link href="/ethics" className="text-white/70 hover:text-white transition-colors font-pixel text-[9px]">
                  {getNestedTranslation(translations.nav.ethics)}
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-white/70 hover:text-white transition-colors font-pixel text-[9px]">
                  {getNestedTranslation(translations.nav.about)}
                </Link>
              </li>
            </ul>
          </div>

        </div>

        <div className="mario-ground mt-8 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="mario-coin w-4 h-4" />
            ))}
          </div>
          <p className="font-pixel text-[8px] text-mario-brown">
            &copy; {new Date().getFullYear()} KAZAN MAP
          </p>
        </div>
      </div>
    </footer>
  );
}
