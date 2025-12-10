import React from 'react';
import { X, ChefHat, Info, Calendar, Sparkles } from 'lucide-react';
import { VegetableDetail, VegetableItem } from '../types';

interface DetailPanelProps {
  isOpen: boolean;
  onClose: () => void;
  loading: boolean;
  data: VegetableDetail | null;
  item: VegetableItem | null;
}

export const DetailPanel: React.FC<DetailPanelProps> = ({ isOpen, onClose, loading, data, item }) => {
  return (
    <div 
      className={`fixed inset-y-0 right-0 w-full md:w-[480px] bg-[#fefefe] shadow-2xl transform transition-transform duration-500 ease-in-out z-50 overflow-y-auto border-l border-stone-100 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      {/* Close Button */}
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 p-2 rounded-none hover:bg-stone-100 transition-colors z-10"
      >
        <X className="w-6 h-6 text-stone-400" />
      </button>

      {/* Content */}
      <div className="p-8 md:p-12 min-h-full flex flex-col">
        {loading ? (
          <div className="flex-1 flex flex-col items-center justify-center space-y-4">
            <div className="w-40 h-40 bg-stone-50 rounded-none animate-pulse"></div>
            <div className="h-8 w-48 bg-stone-50 rounded-none animate-pulse"></div>
            <div className="h-4 w-64 bg-stone-50 rounded-none animate-pulse"></div>
            <div className="h-4 w-56 bg-stone-50 rounded-none animate-pulse"></div>
            <p className="text-stone-400 font-medium mt-4">Consulting the Chef AI...</p>
          </div>
        ) : data && item ? (
          <div className="animate-fadeIn">
             {/* Header Image - 누끼 스타일 */}
            <div className="flex justify-center mb-8">
              <div className="relative w-56 h-56 flex items-center justify-center"
                style={{ filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.1))' }}
              >
                 <img 
                   src={item.imageUrl} 
                   alt={data.name} 
                   className="max-w-full max-h-full object-contain"
                 />
              </div>
            </div>

            <div className="text-center mb-10">
              <h2 className="text-4xl font-serif text-stone-800 mb-2">{data.name}</h2>
              <p className="text-stone-400 italic font-serif">{data.scientificName}</p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4 p-5 bg-stone-50/80 rounded-none">
                <Info className="w-5 h-5 text-stone-400 shrink-0 mt-1" />
                <p className="text-stone-600 leading-relaxed">{data.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div className="p-5 bg-gradient-to-br from-orange-50 to-amber-50/50 rounded-none">
                    <div className="flex items-center gap-2 mb-2 text-orange-600">
                        <Sparkles className="w-4 h-4" />
                        <span className="font-semibold text-sm uppercase tracking-wide">Fun Fact</span>
                    </div>
                    <p className="text-sm text-stone-600 leading-relaxed">{data.funFact}</p>
                 </div>
                 <div className="p-5 bg-gradient-to-br from-green-50 to-emerald-50/50 rounded-none">
                    <div className="flex items-center gap-2 mb-2 text-green-600">
                        <Calendar className="w-4 h-4" />
                        <span className="font-semibold text-sm uppercase tracking-wide">Season</span>
                    </div>
                    <p className="text-sm text-stone-600 leading-relaxed">{data.bestSeason}</p>
                 </div>
              </div>

              <div className="border-t border-stone-100 pt-8">
                <div className="flex items-center gap-2 mb-6">
                  <ChefHat className="w-6 h-6 text-stone-600" />
                  <h3 className="text-xl font-serif font-medium text-stone-800">{data.simpleRecipe.title}</h3>
                </div>
                
                <div className="mb-6">
                  <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-3">Ingredients</h4>
                  <ul className="grid grid-cols-2 gap-2">
                    {data.simpleRecipe.ingredients.map((ing, i) => (
                      <li key={i} className="text-sm text-stone-600 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-none bg-green-400"></span>
                        {ing}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-3">Preparation</h4>
                  <ol className="space-y-4">
                    {data.simpleRecipe.steps.map((step, i) => (
                      <li key={i} className="flex gap-4 text-stone-600">
                        <span className="flex-shrink-0 w-6 h-6 rounded-none bg-gradient-to-br from-orange-400 to-amber-400 text-white text-xs font-bold flex items-center justify-center shadow-sm">
                          {i + 1}
                        </span>
                        <p className="text-sm leading-relaxed pt-0.5">{step}</p>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
