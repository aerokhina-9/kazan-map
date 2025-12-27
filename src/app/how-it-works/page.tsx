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
  Cloud,
  ArrowRight,
  Star,
} from 'lucide-react';

export default function HowItWorksPage() {
  const { getNestedTranslation } = useApp();

  const steps = [
    {
      icon: Compass,
      title: translations.howItWorks.step1.title,
      text: translations.howItWorks.step1.text,
    },
    {
      icon: Eye,
      title: translations.howItWorks.step2.title,
      text: translations.howItWorks.step2.text,
    },
    {
      icon: Map,
      title: translations.howItWorks.step3.title,
      text: translations.howItWorks.step3.text,
    },
    {
      icon: Cloud,
      title: translations.howItWorks.step4.title,
      text: translations.howItWorks.step4.text,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-mario-sky">
      <Header />

      <main className="flex-1">
        {/* Hero - Pipe style */}
        <section className="mario-pipe py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex justify-center gap-2 mb-6">
              <Star className="text-mario-yellow" size={24} />
              <Star className="text-mario-yellow" size={32} />
              <Star className="text-mario-yellow" size={24} />
            </div>
            <h1 className="font-pixel text-xl md:text-2xl mb-6 text-white">
              {getNestedTranslation(translations.howItWorks.title)}
            </h1>
            <p className="text-white/80 max-w-2xl mx-auto">
              {getNestedTranslation(translations.tagline)}
            </p>
          </div>
        </section>

        {/* Steps */}
        <section className="py-16 md:py-24 bg-[#e8e8e8]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-8">
              {steps.map((step, i) => (
                <div
                  key={i}
                  className="mario-panel p-6 flex gap-6 items-start"
                >
                  <div className="flex-shrink-0 w-16 h-16 mario-question flex items-center justify-center">
                    <step.icon size={32} className="text-mario-brown" />
                  </div>
                  <div className="flex-1">
                    <div className="font-pixel text-[10px] text-mario-red mb-2">
                      LEVEL {i + 1}
                    </div>
                    <h3 className="font-pixel text-sm mb-3 text-mario-brown">
                      {getNestedTranslation(step.title)}
                    </h3>
                    <p className="text-mario-brown/80">
                      {getNestedTranslation(step.text)}
                    </p>
                  </div>
                </div>
              ))}
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
              <span className="font-pixel text-xs">PLAY NOW!</span>
              <ArrowRight size={20} />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
