'use client';

import Link from 'next/link';
import { useApp } from '@/lib/context';
import { translations } from '@/lib/i18n';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import {
  Map,
  Globe,
  BookOpen,
  Star,
} from 'lucide-react';

export default function AboutPage() {
  const { getNestedTranslation } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-mario-sky">
      <Header />

      <main className="flex-1">
        {/* Hero - Brick style */}
        <section className="mario-brick py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex justify-center gap-2 mb-6">
              <Star className="text-mario-yellow" size={24} />
              <Star className="text-mario-yellow" size={32} />
              <Star className="text-mario-yellow" size={24} />
            </div>
            <h1 className="font-pixel text-xl md:text-2xl mb-6 text-white">
              {getNestedTranslation(translations.about.title)}
            </h1>
            <p className="text-white/80 max-w-2xl mx-auto">
              {getNestedTranslation(translations.about.description)}
            </p>
          </div>
        </section>

        {/* About content */}
        <section className="py-16 md:py-24 bg-[#e8e8e8]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mario-panel p-8 mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="mario-question w-10 h-10 flex items-center justify-center">
                  <span className="font-pixel text-mario-brown">!</span>
                </div>
                <h2 className="font-pixel text-sm text-mario-brown">О ПРОЕКТЕ</h2>
              </div>

              <p className="text-mario-brown/80 mb-6">
                «Анти-туристическая карта Казани» — это проект цифровой урбанистики,
                созданный для исследования города за пределами туристических зон.
                Мы не создаём новые точки притяжения — мы помогаем видеть город
                как местные жители.
              </p>

              <h3 className="font-pixel text-[11px] text-mario-brown mb-4">ЧТО ДЕЛАЕТ ПРОЕКТ</h3>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-4 p-4 bg-white border-4 border-mario-black">
                  <div className="mario-question w-10 h-10 flex-shrink-0 flex items-center justify-center">
                    <Map size={20} className="text-mario-brown" />
                  </div>
                  <span className="text-mario-brown/80">
                    Автоматически вычисляет туристическое ядро города по плотности
                    достопримечательностей
                  </span>
                </div>
                <div className="flex items-start gap-4 p-4 bg-white border-4 border-mario-black">
                  <div className="mario-question w-10 h-10 flex-shrink-0 flex items-center justify-center">
                    <Globe size={20} className="text-mario-brown" />
                  </div>
                  <span className="text-mario-brown/80">
                    Позволяет коллективно исследовать город, добавляя находки без
                    спойлеров
                  </span>
                </div>
                <div className="flex items-start gap-4 p-4 bg-white border-4 border-mario-black">
                  <div className="mario-question w-10 h-10 flex-shrink-0 flex items-center justify-center">
                    <BookOpen size={20} className="text-mario-brown" />
                  </div>
                  <span className="text-mario-brown/80">
                    Включает слой «Где ест город» для локальной кухни — столовых,
                    чайхан, мест после смены
                  </span>
                </div>
              </div>
            </div>

            <div className="mario-panel p-8 mb-8">
              <h3 className="font-pixel text-[11px] text-mario-brown mb-4">POWER-UPS (ТЕХНОЛОГИИ)</h3>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 bg-white border-4 border-mario-black">
                  <div className="w-10 h-10 bg-mario-black flex items-center justify-center">
                    <span className="font-pixel text-[10px] text-white">N</span>
                  </div>
                  <span className="font-pixel text-[9px] text-mario-brown">Next.js 16</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white border-4 border-mario-black">
                  <div className="w-10 h-10 bg-mario-blue flex items-center justify-center">
                    <span className="font-pixel text-[10px] text-white">TS</span>
                  </div>
                  <span className="font-pixel text-[9px] text-mario-brown">TypeScript</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white border-4 border-mario-black">
                  <div className="w-10 h-10 bg-mario-sky flex items-center justify-center">
                    <span className="font-pixel text-[10px] text-white">TW</span>
                  </div>
                  <span className="font-pixel text-[9px] text-mario-brown">TailwindCSS</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white border-4 border-mario-black">
                  <div className="w-10 h-10 bg-mario-green flex items-center justify-center">
                    <span className="font-pixel text-[10px] text-white">L</span>
                  </div>
                  <span className="font-pixel text-[9px] text-mario-brown">Leaflet + OSM</span>
                </div>
              </div>
            </div>

            <div className="mario-panel p-8 mb-8">
              <h3 className="font-pixel text-[11px] text-mario-brown mb-4">ЯЗЫКИ РЕГИОНА</h3>

              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 bg-mario-red text-white font-pixel text-[10px] border-4 border-mario-black">
                  РУССКИЙ
                </span>
                <span className="px-4 py-2 bg-mario-green text-white font-pixel text-[10px] border-4 border-mario-black">
                  ТАТАРЧА
                </span>
                <span className="px-4 py-2 bg-mario-yellow text-mario-brown font-pixel text-[10px] border-4 border-mario-black">
                  ЧĂВАШЛА
                </span>
              </div>
            </div>

            <div className="mario-panel p-8">
              <h3 className="font-pixel text-[11px] text-mario-brown mb-4">OPEN SOURCE</h3>

              <p className="text-mario-brown/80">
                Проект с открытым исходным кодом. Все данные хранятся локально
                в браузере (LocalStorage). Без регистрации, без рекламы, без
                сбора данных.
              </p>
            </div>
          </div>
        </section>

        {/* CTA - Brick style */}
        <section className="py-16 md:py-24 mario-brick text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex justify-center gap-2 mb-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="mario-coin" />
              ))}
            </div>
            <h2 className="font-pixel text-lg mb-6">
              {getNestedTranslation(translations.landing.cta)}
            </h2>
            <Link
              href="/map"
              className="mario-btn-yellow inline-flex items-center justify-center gap-3 px-8 py-4 mario-btn"
            >
              <Map size={24} />
              <span className="font-pixel text-xs">START!</span>
              <Star className="text-mario-yellow animate-pulse" size={20} />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
