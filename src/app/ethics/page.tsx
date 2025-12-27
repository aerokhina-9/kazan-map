'use client';

import Link from 'next/link';
import { useApp } from '@/lib/context';
import { translations } from '@/lib/i18n';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import {
  Shield,
  EyeOff,
  Users,
  Map,
  Star,
} from 'lucide-react';

export default function EthicsPage() {
  const { getNestedTranslation } = useApp();

  const principles = [
    {
      icon: Shield,
      title: translations.ethics.antiOvertourism.title,
      text: translations.ethics.antiOvertourism.text,
    },
    {
      icon: EyeOff,
      title: translations.ethics.noSpoilers.title,
      text: translations.ethics.noSpoilers.text,
    },
    {
      icon: Users,
      title: translations.ethics.collectiveExploration.title,
      text: translations.ethics.collectiveExploration.text,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-mario-sky">
      <Header />

      <main className="flex-1">
        {/* Hero - Green pipe style */}
        <section className="mario-pipe py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 border-4 border-white/30 font-pixel text-[10px] text-white mb-6">
              <Shield size={18} />
              RULES
            </div>
            <h1 className="font-pixel text-xl md:text-2xl mb-6 text-white">
              {getNestedTranslation(translations.ethics.title)}
            </h1>
            <p className="text-white/80 max-w-2xl mx-auto">
              {getNestedTranslation(translations.tagline)}
            </p>
          </div>
        </section>

        {/* Principles */}
        <section className="py-16 md:py-24 bg-[#e8e8e8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8">
              {principles.map((principle, i) => (
                <div
                  key={i}
                  className="mario-panel p-8 hover:animate-block-hit"
                >
                  <div className="w-14 h-14 mario-question flex items-center justify-center mb-6">
                    <principle.icon size={28} className="text-mario-brown" />
                  </div>
                  <h3 className="font-pixel text-[11px] mb-3 text-mario-brown">
                    {getNestedTranslation(principle.title)}
                  </h3>
                  <p className="text-mario-brown/80 text-sm">
                    {getNestedTranslation(principle.text)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why it matters */}
        <section className="py-16 md:py-24 bg-mario-ground">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mario-panel p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="mario-question w-10 h-10 flex items-center justify-center">
                  <span className="font-pixel text-mario-brown">?</span>
                </div>
                <h2 className="font-pixel text-sm text-mario-brown">
                  ПОЧЕМУ ЭТО ВАЖНО
                </h2>
              </div>

              <div className="space-y-6 text-mario-brown/80">
                <p>
                  Традиционные туристические путеводители создают «эффект пузыря» —
                  одни и те же места показываются снова и снова, привлекая всё больше
                  посетителей. Это приводит к овертуризму: локальные бизнесы вытесняются,
                  цены растут, атмосфера района меняется.
                </p>

                <p>
                  Наш подход другой. Мы не создаём новые точки притяжения — мы помогаем
                  видеть город как местные жители. Без адресов, без названий, без меню —
                  только категория и ощущение.
                </p>

                <p>
                  Коллективное исследование без спойлеров позволяет открывать город
                  постепенно, сохраняя баланс между любопытством и уважением к
                  повседневной жизни горожан.
                </p>
              </div>
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
