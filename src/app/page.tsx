'use client';

import Link from 'next/link';
import { useApp } from '@/lib/context';
import { translations } from '@/lib/i18n';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import {
  Map,
  Compass,
  Eye,
  Utensils,
  ArrowRight,
  MapPin,
  Cloud,
  Users,
  Star,
  Coffee,
  Clock,
  Briefcase,
} from 'lucide-react';

export default function LandingPage() {
  const { getNestedTranslation } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-mario-sky">
      <Header />

      <main className="flex-1">
        {/* Hero Section - Mario brick style */}
        <section className="relative mario-brick text-white overflow-hidden">
          {/* Floating coins */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="mario-coin absolute opacity-50"
                style={{
                  left: `${10 + i * 12}%`,
                  top: `${20 + (i % 3) * 15}%`,
                  animationDelay: `${i * 0.15}s`,
                }}
              />
            ))}
          </div>

          {/* Clouds */}
          <div className="absolute top-10 left-10 w-20 h-10 mario-cloud opacity-30" />
          <div className="absolute top-20 right-20 w-16 h-8 mario-cloud opacity-20" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-6">
                <Star className="text-mario-yellow" size={32} />
                <Star className="text-mario-yellow" size={24} />
                <Star className="text-mario-yellow" size={32} />
              </div>

              <h1 className="font-pixel text-2xl md:text-4xl mb-6 leading-relaxed">
                {getNestedTranslation(translations.appName)}
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-4">
                {getNestedTranslation(translations.subtitle)}
              </p>
              <p className="text-lg text-white/70 mb-8">
                {getNestedTranslation(translations.tagline)}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/map"
                  className="mario-btn-yellow inline-flex items-center justify-center gap-3 px-6 py-4 mario-btn"
                >
                  <Map size={24} />
                  <span className="font-pixel text-xs">
                    {getNestedTranslation(translations.landing.cta)}
                  </span>
                </Link>
                <Link
                  href="/how-it-works"
                  className="mario-panel inline-flex items-center justify-center gap-2 px-6 py-4 hover:bg-mario-yellow/10 transition-colors"
                >
                  <span className="font-pixel text-[10px] text-mario-brown">
                    {getNestedTranslation(translations.nav.howItWorks)}
                  </span>
                  <ArrowRight size={18} className="text-mario-brown" />
                </Link>
              </div>
            </div>
          </div>

          {/* Ground pattern */}
          <div className="mario-ground h-8" />
        </section>

        {/* Problem Section */}
        <section className="py-16 md:py-24 bg-[#e8e8e8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-mario-red text-white font-pixel text-[10px] border-4 border-mario-black mb-4">
                  <Eye size={16} />
                  ПРОБЛЕМА
                </div>
                <h2 className="font-pixel text-lg md:text-xl mb-4 text-mario-brown">
                  {getNestedTranslation(translations.landing.problem.title)}
                </h2>
                <p className="text-mario-brown/80">
                  {getNestedTranslation(translations.landing.problem.text)}
                </p>
              </div>

              <div className="relative">
                <div className="mario-panel p-8 relative overflow-hidden">
                  <div className="grid grid-cols-3 gap-4">
                    {[...Array(9)].map((_, i) => (
                      <div
                        key={i}
                        className={`h-16 border-4 border-mario-black ${
                          i < 3 ? 'bg-mario-red' : 'bg-mario-black/20'
                        }`}
                      />
                    ))}
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="font-pixel text-[10px] text-mario-brown bg-mario-yellow px-4 py-2 border-4 border-mario-black">
                      90% ГОРОДА НЕВИДИМО
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Idea Section */}
        <section className="py-16 md:py-24 bg-mario-green/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <div className="mario-panel p-8 relative overflow-hidden">
                  <div className="mario-pipe w-full h-2 mb-6" />
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-white border-4 border-mario-black">
                      <div className="w-10 h-10 mario-question flex items-center justify-center">
                        <MapPin size={20} className="text-mario-brown" />
                      </div>
                      <span className="font-pixel text-[10px] text-mario-brown">БЕЗ НАЗВАНИЙ</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-white border-4 border-mario-black">
                      <div className="w-10 h-10 mario-question flex items-center justify-center">
                        <Cloud size={20} className="text-mario-brown" />
                      </div>
                      <span className="font-pixel text-[10px] text-mario-brown">ТУМАН РАСКРЫВАЕТСЯ</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-white border-4 border-mario-black">
                      <div className="w-10 h-10 mario-question flex items-center justify-center">
                        <Users size={20} className="text-mario-brown" />
                      </div>
                      <span className="font-pixel text-[10px] text-mario-brown">КОЛЛЕКТИВНО</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="order-1 md:order-2">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-mario-green text-white font-pixel text-[10px] border-4 border-mario-black mb-4">
                  <Compass size={16} />
                  ИДЕЯ
                </div>
                <h2 className="font-pixel text-lg md:text-xl mb-4 text-mario-brown">
                  {getNestedTranslation(translations.landing.idea.title)}
                </h2>
                <p className="text-mario-brown/80">
                  {getNestedTranslation(translations.landing.idea.text)}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Where Eats Section */}
        <section className="py-16 md:py-24 bg-[#e8e8e8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-mario-red text-white font-pixel text-[10px] border-4 border-mario-black mb-4">
                <Utensils size={16} />
                ЕДА
              </div>
              <h2 className="font-pixel text-lg md:text-xl mb-4 text-mario-brown">
                {getNestedTranslation(translations.landing.whereEats.title)}
              </h2>
              <p className="text-mario-brown/80 max-w-2xl mx-auto">
                {getNestedTranslation(translations.landing.whereEats.text)}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Utensils, label: 'СТОЛОВЫЕ', color: 'mario-red' },
                { icon: Coffee, label: 'ЧАЙХАНЫ', color: 'mario-brown' },
                { icon: Clock, label: 'ИЗ ДРУГОГО ВРЕМЕНИ', color: 'mario-blue' },
                { icon: Briefcase, label: 'ПОСЛЕ СМЕНЫ', color: 'mario-green' },
              ].map((item, i) => (
                <div
                  key={i}
                  className="mario-panel p-6 hover:animate-block-hit"
                >
                  <div className="mario-question w-12 h-12 flex items-center justify-center mb-4">
                    <item.icon size={24} className="text-mario-brown" />
                  </div>
                  <h3 className="font-pixel text-[10px] text-mario-brown">{item.label}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section - Brick style */}
        <section className="py-16 md:py-24 mario-brick text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex justify-center gap-2 mb-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="mario-coin" />
              ))}
            </div>
            <h2 className="font-pixel text-xl md:text-2xl mb-6">
              НАЧАТЬ ИГРУ
            </h2>
            <p className="text-white/80 mb-8">
              {getNestedTranslation(translations.tagline)}
            </p>
            <Link
              href="/map"
              className="mario-btn-yellow inline-flex items-center justify-center gap-3 px-8 py-4 mario-btn"
            >
              <Map size={24} />
              <span className="font-pixel text-sm">START!</span>
              <Star className="text-mario-yellow animate-pulse" size={20} />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
