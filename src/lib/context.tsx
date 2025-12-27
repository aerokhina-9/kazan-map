'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useRef, ReactNode } from 'react';
import { Lang, useI18n } from './i18n';
import { Finding, loadFindings, saveFindings, addFinding as addFindingToStorage } from './findings';
import { Mission, loadMissions, updateMissions } from './missions';
import { DensityGrid, createDensityGrid, isInTouristCore } from './density';
import { FindingType, TimeActivity } from './categories';

export type AppMode = 'visitor' | 'explorer';

interface AppState {
  lang: Lang;
  mode: AppMode;
  findings: Finding[];
  missions: Mission[];
  densityGrid: DensityGrid | null;
  selectedCategories: string[];
  showFood: boolean;
  isEmbedMode: boolean;
  isAddingFinding: boolean;
  pendingLocation: { lat: number; lng: number } | null;
  lastAddedFinding: Finding | null;
  isInitialized: boolean;
}

interface AppContextType extends AppState {
  setLang: (lang: Lang) => void;
  setMode: (mode: AppMode) => void;
  toggleCategory: (categoryId: string) => void;
  setShowFood: (show: boolean) => void;
  startAddingFinding: () => void;
  cancelAddingFinding: () => void;
  setPendingLocation: (location: { lat: number; lng: number } | null) => void;
  addFinding: (finding: {
    type: FindingType;
    category: string;
    timeActivity: TimeActivity;
    note?: string;
  }) => Finding | null;
  confirmFinding: (findingId: string) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getNestedTranslation: (obj: any) => any;
  lang: Lang;
}

const AppContext = createContext<AppContextType | null>(null);

// Обновление URL параметров без перезагрузки страницы
function updateURLParams(params: Record<string, string | undefined>) {
  if (typeof window === 'undefined') return;

  // Use setTimeout to defer the update
  setTimeout(() => {
    const url = new URL(window.location.href);

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== '') {
        url.searchParams.set(key, value);
      } else {
        url.searchParams.delete(key);
      }
    });

    window.history.replaceState({}, '', url.toString());
  }, 0);
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>({
    lang: 'ru',
    mode: 'visitor',
    findings: [],
    missions: [],
    densityGrid: null,
    selectedCategories: [],
    showFood: true,
    isEmbedMode: false,
    isAddingFinding: false,
    pendingLocation: null,
    lastAddedFinding: null,
    isInitialized: false,
  });

  const { getNestedTranslation } = useI18n(state.lang);

  // Инициализация при загрузке
  useEffect(() => {
    // Загрузка данных из LocalStorage
    const findings = loadFindings();
    const missions = loadMissions();
    const densityGrid = createDensityGrid();

    // Проверяем URL параметры
    const params = new URLSearchParams(window.location.search);
    const langParam = params.get('lang') as Lang | null;
    const modeParam = params.get('mode') as AppMode | null;
    const embedParam = params.get('embed') === '1';
    const showFoodParam = params.get('showFood');
    const categoriesParam = params.get('categories');

    setState((prev) => ({
      ...prev,
      findings,
      missions: updateMissions(findings, missions),
      densityGrid,
      lang: langParam && ['ru', 'chv', 'tt'].includes(langParam) ? langParam : prev.lang,
      mode: modeParam && ['visitor', 'explorer'].includes(modeParam) ? modeParam : prev.mode,
      isEmbedMode: embedParam,
      showFood: showFoodParam !== null ? showFoodParam === '1' : prev.showFood,
      selectedCategories: categoriesParam ? categoriesParam.split(',') : prev.selectedCategories,
      isInitialized: true,
    }));
  }, []);

  const setLang = useCallback((lang: Lang) => {
    setState((prev) => ({ ...prev, lang }));
    updateURLParams({ lang });
  }, []);

  const setMode = useCallback((mode: AppMode) => {
    setState((prev) => ({ ...prev, mode }));
    updateURLParams({ mode });
  }, []);

  const toggleCategory = useCallback((categoryId: string) => {
    setState((prev) => {
      const newCategories = prev.selectedCategories.includes(categoryId)
        ? prev.selectedCategories.filter((c) => c !== categoryId)
        : [...prev.selectedCategories, categoryId];

      // Defer URL update to avoid setState during render
      updateURLParams({ categories: newCategories.join(',') || undefined });

      return { ...prev, selectedCategories: newCategories };
    });
  }, []);

  const setShowFood = useCallback((show: boolean) => {
    setState((prev) => ({ ...prev, showFood: show }));
    updateURLParams({ showFood: show ? '1' : '0' });
  }, []);

  const startAddingFinding = useCallback(() => {
    setState((prev) => ({ ...prev, isAddingFinding: true, pendingLocation: null }));
  }, []);

  const cancelAddingFinding = useCallback(() => {
    setState((prev) => ({ ...prev, isAddingFinding: false, pendingLocation: null }));
  }, []);

  const setPendingLocation = useCallback((location: { lat: number; lng: number } | null) => {
    setState((prev) => ({ ...prev, pendingLocation: location }));
  }, []);

  const addFinding = useCallback(
    (finding: {
      type: FindingType;
      category: string;
      timeActivity: TimeActivity;
      note?: string;
    }): Finding | null => {
      if (!state.pendingLocation || !state.densityGrid) return null;

      const isInCore = isInTouristCore(
        state.pendingLocation.lat,
        state.pendingLocation.lng,
        state.densityGrid
      );

      const newFinding = addFindingToStorage({
        lat: state.pendingLocation.lat,
        lng: state.pendingLocation.lng,
        type: finding.type,
        category: finding.category,
        timeActivity: finding.timeActivity,
        note: finding.note,
        isInTouristCore: isInCore,
      });

      const updatedFindings = [...state.findings, newFinding];
      const updatedMissions = updateMissions(updatedFindings, state.missions);

      // Сбрасываем фильтры чтобы новая находка была видна
      const isFood = finding.type === 'Food' || finding.type === 'Drink';

      setState((prev) => ({
        ...prev,
        findings: updatedFindings,
        missions: updatedMissions,
        isAddingFinding: false,
        pendingLocation: null,
        lastAddedFinding: newFinding,
        // Сбрасываем категории и включаем еду если нужно
        selectedCategories: [],
        showFood: isFood ? true : prev.showFood,
      }));

      // Обновляем URL
      updateURLParams({ categories: undefined });

      saveFindings(updatedFindings);

      return newFinding;
    },
    [state.pendingLocation, state.densityGrid, state.findings, state.missions]
  );

  const confirmFindingHandler = useCallback((findingId: string) => {
    setState((prev) => {
      const updatedFindings = prev.findings.map((f) =>
        f.id === findingId ? { ...f, trust: f.trust + 1 } : f
      );
      saveFindings(updatedFindings);
      return { ...prev, findings: updatedFindings };
    });
  }, []);

  return (
    <AppContext.Provider
      value={{
        ...state,
        setLang,
        setMode,
        toggleCategory,
        setShowFood,
        startAddingFinding,
        cancelAddingFinding,
        setPendingLocation,
        addFinding,
        confirmFinding: confirmFindingHandler,
        getNestedTranslation,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
