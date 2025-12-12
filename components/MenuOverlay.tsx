import React from 'react';
import { Menu, SlidersHorizontal, Plus, Minus, Move } from 'lucide-react';

interface MenuOverlayProps {
  scale: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
}

export const MenuOverlay: React.FC<MenuOverlayProps> = ({ scale, onZoomIn, onZoomOut }) => {
  return (
    <>
      {/* Top Left Logo */}
      <div className="fixed top-8 left-8 z-40 pointer-events-none">
        <h1 className="text-3xl font-bold tracking-tighter text-stone-900 pointer-events-auto cursor-default">
          veggieverse
        </h1>
      </div>

      {/* Bottom Controls */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 flex items-center gap-4 pointer-events-none">
        <div className="flex bg-stone-900 text-white rounded-none shadow-xl pointer-events-auto">
          <button className="flex items-center gap-2 px-6 py-3 hover:bg-stone-800 transition-colors rounded-l-md border-r border-stone-700">
            <Menu className="w-4 h-4" />
            <span className="text-sm font-medium">Menu</span>
          </button>
          <button className="flex items-center gap-2 px-6 py-3 hover:bg-stone-800 transition-colors rounded-r-md">
            <SlidersHorizontal className="w-4 h-4" />
            <span className="text-sm font-medium">Filter</span>
          </button>
        </div>
      </div>

      {/* Bottom Right Zoom/Nav Controls */}
      <div className="fixed bottom-8 right-8 z-40 flex items-center gap-3 pointer-events-none">
        <div className="bg-stone-900/10 backdrop-blur-sm text-stone-800 p-3 rounded-none pointer-events-auto cursor-help" title="Drag to explore">
           <Move className="w-5 h-5 animate-pulse" />
        </div>
        
        <div className="flex gap-2 pointer-events-auto">
          <button 
            onClick={onZoomOut}
            className="w-12 h-12 flex items-center justify-center bg-white border border-stone-200 rounded-none shadow-lg hover:scale-105 transition-transform text-stone-800"
          >
            <Minus className="w-5 h-5" />
          </button>
          <button 
            onClick={onZoomIn}
            className="w-12 h-12 flex items-center justify-center bg-white border border-stone-200 rounded-none shadow-lg hover:scale-105 transition-transform text-stone-800"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>
    </>
  );
};