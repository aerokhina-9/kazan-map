'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useApp } from '@/lib/context';
import { translations, LANGUAGES } from '@/lib/i18n';
import { Map, Menu, X, Globe, ChevronDown, Star } from 'lucide-react';

export default function Header() {
  const pathname = usePathname();
  const { lang, setLang, getNestedTranslation, isEmbedMode } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  if (isEmbedMode) return null;

  const navItems = [
    { href: '/', label: translations.nav.home },
    { href: '/map', label: translations.nav.map },
    { href: '/how-it-works', label: translations.nav.howItWorks },
    { href: '/ethics', label: translations.nav.ethics },
    { href: '/about', label: translations.nav.about },
  ];

  return (
    <header className="mario-panel border-b-4 border-mario-black sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="mario-question w-8 h-8 flex items-center justify-center">
              <Star size={16} className="text-mario-brown" />
            </div>
            <span className="font-pixel text-[10px] text-mario-brown hidden sm:block">
              KAZAN MAP
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2 font-pixel text-[9px] transition-colors ${
                  pathname === item.href
                    ? 'bg-mario-green text-white border-2 border-mario-black'
                    : 'text-mario-brown hover:bg-mario-yellow/20'
                }`}
              >
                {getNestedTranslation(item.label)}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* Language switcher */}
            <div className="relative">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-1 px-2 py-1.5 font-pixel text-[10px] text-mario-brown hover:bg-mario-yellow/20 transition-colors"
              >
                <Globe size={16} />
                <span className="uppercase">{lang}</span>
                <ChevronDown size={14} />
              </button>

              {langMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setLangMenuOpen(false)}
                  />
                  <div className="absolute right-0 mt-1 mario-panel overflow-hidden z-50">
                    {LANGUAGES.map((l) => (
                      <button
                        key={l.id}
                        onClick={() => {
                          setLang(l.id);
                          setLangMenuOpen(false);
                        }}
                        className={`w-full px-4 py-2 text-left font-pixel text-[9px] hover:bg-mario-yellow/20 ${
                          lang === l.id ? 'bg-mario-green/20 text-mario-green' : 'text-mario-brown'
                        }`}
                      >
                        {l.nativeName}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* CTA button */}
            <Link
              href="/map"
              className="hidden sm:flex items-center gap-2 mario-btn px-4 py-2"
            >
              <Map size={16} />
              <span className="font-pixel text-[9px]">PLAY</span>
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-mario-brown hover:bg-mario-yellow/20 transition-colors"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t-4 border-mario-black bg-mario-ground">
          <nav className="px-4 py-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 font-pixel text-[10px] transition-colors ${
                  pathname === item.href
                    ? 'bg-mario-green text-white'
                    : 'text-mario-brown hover:bg-mario-yellow/20'
                }`}
              >
                {getNestedTranslation(item.label)}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
