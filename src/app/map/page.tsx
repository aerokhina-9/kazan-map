'use client';

import dynamic from 'next/dynamic';
import Sidebar from '@/components/ui/Sidebar';
import MapControls from '@/components/ui/MapControls';
import AddFindingPanel from '@/components/ui/AddFindingPanel';
import WelcomeOverlay from '@/components/ui/WelcomeOverlay';
import Header from '@/components/layout/Header';
import { useApp } from '@/lib/context';

// Динамический импорт карты (без SSR из-за Leaflet)
const KazanMap = dynamic(() => import('@/components/map/MapContainer'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
      <div className="text-gray-500 animate-pulse">Загрузка карты...</div>
    </div>
  ),
});

export default function MapPage() {
  const { isEmbedMode } = useApp();

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {!isEmbedMode && <Header />}

      <div className="flex-1 relative overflow-hidden">
        {/* Map */}
        <KazanMap />

        {/* Sidebar */}
        <Sidebar />

        {/* Controls */}
        <MapControls />

        {/* Add Finding Panel */}
        <AddFindingPanel />

        {/* Welcome Overlay */}
        <WelcomeOverlay />
      </div>
    </div>
  );
}
