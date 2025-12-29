'use client';

import { useState } from 'react';
import { useApp } from '@/lib/context';
import { translations } from '@/lib/i18n';
import { GENERAL_CATEGORIES, FOOD_CATEGORIES } from '@/lib/categories';
import { getMissionText } from '@/lib/missions';
import * as LucideIcons from 'lucide-react';
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Compass,
  Target,
  Utensils,
  MapPin,
  Sparkles,
  Award,
  Star,
} from 'lucide-react';

export default function Sidebar() {
  const {
    mode,
    setMode,
    lang,
    selectedCategories,
    toggleCategory,
    showFood,
    setShowFood,
    missions,
    isEmbedMode,
    getNestedTranslation,
    startAddingFinding,
  } = useApp();

  const [isOpen, setIsOpen] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [showMissions, setShowMissions] = useState(false);

  const completedMissions = missions.filter((m) => m.completed).length;

  if (isEmbedMode) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="absolute top-4 left-4 z-[1000] mario-btn p-3"
      >
        <ChevronRight size={20} />
      </button>
    );
  }

  return (
    <>
      {/* Toggle button when closed - Mario pipe style */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="absolute top-4 left-4 z-[1000] mario-pipe p-3 hover:scale-105 transition-transform"
          aria-label="Открыть меню"
        >
          <ChevronRight size={20} className="text-white" />
        </button>
      )}

      {/* Sidebar - Mario panel style */}
      <div
        className={`
          fixed top-0 left-0 h-full z-[1000]
          w-80
          transform transition-transform duration-300
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0
        `}
      >
        <div className="w-full h-full flex flex-col mario-panel">
          {/* Header - Mario brick style */}
          <div className="mario-brick p-4 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Star size={24} className="text-mario-yellow animate-pulse" />
                <span className="font-pixel text-sm">КАЗАНЬ</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/20 rounded transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
            </div>
            <p className="text-xs text-white/80 mt-2 font-pixel">ЗОНА ИССЛЕДОВАНИЯ</p>
          </div>

          {/* Main action - Mode switcher */}
          <div className="p-4 border-b-4 border-mario-black bg-mario-ground">
            {mode === 'visitor' ? (
              <button
                onClick={() => setMode('explorer')}
                className="w-full mario-btn py-4 px-6 flex items-center justify-center gap-3"
              >
                <Compass size={24} />
                <span className="font-bold">Начать исследование</span>
                <Sparkles size={20} />
              </button>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-mario-green/20 border-4 border-mario-green rounded">
                  <div className="flex items-center gap-2 text-mario-green">
                    <Compass size={20} />
                    <span className="font-medium text-sm">Режим исследователя</span>
                  </div>
                  <button
                    onClick={() => setMode('visitor')}
                    className="text-sm text-mario-green hover:text-mario-red font-medium"
                  >
                    Выйти
                  </button>
                </div>

                <button
                  onClick={startAddingFinding}
                  className="w-full mario-btn-red py-3 px-4 mario-btn flex items-center justify-center gap-2"
                >
                  <LucideIcons.Plus size={20} />
                  <span className="font-bold">Добавить находку</span>
                </button>
              </div>
            )}
          </div>

          {/* Content - scrollable */}
          <div className="flex-1 overflow-y-auto bg-[#e8e8e8]">
            {/* Quick stats - Coin blocks */}
            <div className="p-3 md:p-4 border-b-4 border-mario-black">
              <div className="grid grid-cols-2 gap-2 md:gap-3">
                <div className="mario-question p-3 text-center flex flex-col items-center justify-center">
                  <div className="text-2xl font-bold text-mario-brown">
                    {missions.reduce((acc, m) => acc + m.progress, 0)}
                  </div>
                  <div className="text-xs text-mario-brown/70 mt-1">находок</div>
                </div>
                <div className="mario-question p-3 text-center flex flex-col items-center justify-center">
                  <div className="text-2xl font-bold text-mario-brown">
                    {completedMissions}/{missions.length}
                  </div>
                  <div className="text-xs text-mario-brown/70 mt-1">миссий</div>
                </div>
              </div>
            </div>

            {/* Missions - collapsible */}
            <div className="border-b-4 border-mario-black">
              <button
                onClick={() => setShowMissions(!showMissions)}
                className="w-full p-3 md:p-4 flex items-center justify-between hover:bg-mario-yellow/10 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Target size={18} className="text-mario-red" />
                  <span className="font-bold text-sm text-mario-brown">Миссии</span>
                  {completedMissions > 0 && (
                    <span className="px-2 py-0.5 bg-mario-green text-white text-xs font-bold rounded">
                      {completedMissions}
                    </span>
                  )}
                </div>
                {showMissions ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>

              {showMissions && (
                <div className="px-3 md:px-4 pb-3 md:pb-4 space-y-2">
                  {missions.map((mission) => {
                    const IconComponent = (LucideIcons as unknown as Record<string, React.ComponentType<{ size?: number; className?: string }>>)[mission.icon];
                    return (
                      <div
                        key={mission.id}
                        className={`p-3 border-4 transition-colors ${
                          mission.completed
                            ? 'bg-mario-green/20 border-mario-green'
                            : 'bg-white border-mario-black'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-8 h-8 flex items-center justify-center border-2 ${
                              mission.completed
                                ? 'bg-mario-green border-mario-green'
                                : 'bg-mario-yellow border-mario-brown'
                            }`}
                          >
                            {IconComponent && (
                              <IconComponent
                                size={16}
                                className={mission.completed ? 'text-white' : 'text-mario-brown'}
                              />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-mario-brown truncate">
                              {getMissionText(mission, 'title', lang)}
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              <div className="flex-1 h-2 bg-mario-black/20 overflow-hidden">
                                <div
                                  className={`h-full transition-all ${
                                    mission.completed ? 'bg-mario-green' : 'bg-mario-red'
                                  }`}
                                  style={{ width: `${(mission.progress / mission.target) * 100}%` }}
                                />
                              </div>
                              <span className="text-xs font-medium text-mario-black/70">
                                {mission.progress}/{mission.target}
                              </span>
                            </div>
                          </div>
                          {mission.completed && (
                            <Award size={16} className="text-mario-yellow" />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Filters - collapsible */}
            <div className="border-b-4 border-mario-black">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="w-full p-3 md:p-4 flex items-center justify-between hover:bg-mario-yellow/10 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <LucideIcons.Filter size={18} className="text-mario-blue" />
                  <span className="font-bold text-sm text-mario-brown">Фильтры</span>
                  {selectedCategories.length > 0 && (
                    <span className="px-2 py-0.5 bg-mario-blue text-white text-xs font-bold rounded">
                      {selectedCategories.length}
                    </span>
                  )}
                </div>
                {showFilters ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>

              {showFilters && (
                <div className="px-3 md:px-4 pb-3 md:pb-4 space-y-3 md:space-y-4">
                  {/* Food toggle */}
                  <div className="flex items-center justify-between p-3 bg-mario-red/10 border-4 border-mario-red">
                    <div className="flex items-center gap-2">
                      <Utensils size={18} className="text-mario-red" />
                      <span className="text-sm font-medium text-mario-red">
                        Где ест город
                      </span>
                    </div>
                    <button
                      onClick={() => setShowFood(!showFood)}
                      className={`w-12 h-6 border-2 border-mario-black transition-colors ${
                        showFood ? 'bg-mario-green' : 'bg-mario-black/30'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 bg-white border border-mario-black transition-transform ${
                          showFood ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Categories */}
                  <div className="space-y-2">
                    <div className="text-xs font-medium text-mario-black/60 uppercase">
                      Места
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {GENERAL_CATEGORIES.map((cat) => {
                        const isSelected = selectedCategories.includes(cat.id);
                        return (
                          <button
                            key={cat.id}
                            onClick={() => toggleCategory(cat.id)}
                            className={`px-3 py-1.5 text-sm font-medium transition-all border-2 ${
                              isSelected
                                ? 'text-white border-mario-black shadow-md'
                                : 'bg-white border-mario-black/30 text-mario-black hover:border-mario-black'
                            }`}
                            style={isSelected ? { backgroundColor: cat.color } : {}}
                          >
                            {getNestedTranslation(cat.label)}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {showFood && (
                    <div className="space-y-2">
                      <div className="text-xs font-medium text-mario-black/60 uppercase">
                        Еда и напитки
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {FOOD_CATEGORIES.map((cat) => {
                          const isSelected = selectedCategories.includes(cat.id);
                          return (
                            <button
                              key={cat.id}
                              onClick={() => toggleCategory(cat.id)}
                              className={`px-3 py-1.5 text-sm font-medium transition-all border-2 ${
                                isSelected
                                  ? 'text-white border-mario-black shadow-md'
                                  : 'bg-white border-mario-black/30 text-mario-black hover:border-mario-black'
                              }`}
                              style={isSelected ? { backgroundColor: cat.color } : {}}
                            >
                              {getNestedTranslation(cat.label)}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {selectedCategories.length > 0 && (
                    <button
                      onClick={() => selectedCategories.forEach(toggleCategory)}
                      className="text-sm text-mario-red hover:text-mario-brick font-medium"
                    >
                      Сбросить
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Help - Question block */}
            <div className="p-3 md:p-4">
              <div className="mario-question p-3 md:p-4">
                <div className="flex items-start gap-3">
                  <div className="text-2xl font-bold text-mario-brown">?</div>
                  <div>
                    <div className="font-bold text-sm text-mario-brown">Как играть?</div>
                    <div className="text-sm text-mario-brown/80 mt-2 space-y-1">
                      <p>1. Включи режим исследователя</p>
                      <p>2. Нажми «+ Находка»</p>
                      <p>3. Отметь место на карте</p>
                      <p>4. Туман рассеется!</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
