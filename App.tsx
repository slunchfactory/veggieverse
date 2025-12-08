import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X, ChevronDown, Search, ShoppingCart, User } from 'lucide-react';
import { VegetableItem } from './types';
import { PRODUCE_ITEMS } from './constants';
import { SurveyPage } from './components/SurveyPage';

// 밝은 색상인지 판단하는 헬퍼 함수
const isLightColor = (hexColor: string): boolean => {
  const hex = hexColor.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.6;
};

interface FloatingItem extends VegetableItem {
  size: number;
  labelColor: string;
  labelOffsetX: number;
  labelOffsetY: number;
  labelRotation: number;
  // CSS 애니메이션용
  animationDuration: number;
  animationDelay: number;
  floatAmplitude: number;
  rotationDuration: number;
  driftX: number;
  driftY: number;
  rotateDirection: number;
}

const App: React.FC = () => {
  const [items, setItems] = useState<FloatingItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<FloatingItem[]>([]);
  const [showSelectionBar, setShowSelectionBar] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  // 초기 아이템 생성
  useEffect(() => {
    const initialItems: FloatingItem[] = PRODUCE_ITEMS.map((produce, index) => ({
      id: `produce-${index}`,
      name: produce.name,
      x: Math.random() * (window.innerWidth - 100) + 50,
      y: Math.random() * (window.innerHeight - 400) + 100,
      scale: 1.3 + Math.random() * 1.2,
      rotation: Math.random() * 360,
      imageUrl: produce.image,
      color: '',
      size: 80 + Math.random() * 70,
      labelColor: produce.color,
      labelOffsetX: (Math.random() - 0.5) * 40,
      labelOffsetY: (Math.random() - 0.5) * 40,
      labelRotation: -15 + Math.random() * 30,
      animationDuration: 8 + Math.random() * 8,
      animationDelay: Math.random() * -16,
      floatAmplitude: 20 + Math.random() * 30,
      rotationDuration: 20 + Math.random() * 40,
      driftX: (Math.random() - 0.5) * 100,
      driftY: (Math.random() - 0.5) * 60,
      rotateDirection: Math.random() > 0.5 ? 1 : -1,
    }));
    setItems(initialItems);
  }, []);

  // 아이템 선택/해제
  const handleItemClick = useCallback((item: FloatingItem, e: React.MouseEvent) => {
    e.stopPropagation();
    
    setSelectedItems(prev => {
      const isSelected = prev.some(i => i.id === item.id);
      
      if (isSelected) {
        return prev.filter(i => i.id !== item.id);
      } else if (prev.length < 3) {
        return [...prev, item];
      }
      return prev;
    });
  }, []);

  // 선택 해제
  const removeSelection = useCallback((itemId: string) => {
    setSelectedItems(prev => prev.filter(i => i.id !== itemId));
  }, []);

  // 다음 단계로 스크롤
  const goToSurvey = useCallback(() => {
    setShowSelectionBar(false);
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth'
      });
    }
  }, []);

  // 스크롤 위치에 따라 선택바 표시/숨김
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const threshold = window.innerHeight * 0.3;
      
      if (scrollTop < threshold) {
        setShowSelectionBar(true);
      } else {
        setShowSelectionBar(false);
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="w-screen h-screen overflow-y-auto overflow-x-hidden snap-y snap-mandatory"
      style={{ scrollBehavior: 'smooth' }}
    >
      {/* 첫 번째 페이지 - 야채 선택 */}
      <div 
        className="relative w-screen h-screen overflow-hidden select-none snap-start"
        style={{
          backgroundImage: `url(/background.png?v=new)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* 상단 헤더 */}
        <header className="fixed top-0 left-0 right-0 z-50" style={{ backgroundColor: '#f9ff35' }}>
          {/* 네비게이션 바 */}
          <nav className="h-16 flex items-center justify-between px-8">
            {/* 왼쪽 로고 */}
            <div className="flex items-center gap-3">
              <img 
                src="/logo.png" 
                alt="SLUNCH FACTORY" 
                className="h-8 w-auto"
              />
            </div>
            
            {/* 가운데 메뉴 */}
            <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-10">
              <a href="#" className="text-stone-700 text-sm font-semibold hover:text-black transition-colors">SLUNCH FACTORY</a>
              <a href="#" className="text-stone-700 text-sm font-semibold hover:text-black transition-colors">STORE</a>
              <a href="#" className="text-stone-700 text-sm font-semibold hover:text-black transition-colors">EVENT</a>
              <a href="#" className="text-stone-700 text-sm font-semibold hover:text-black transition-colors">COMMUNITY</a>
              <a href="#" className="text-stone-700 text-sm font-semibold hover:text-black transition-colors">REVIEW</a>
              <a href="#" className="text-stone-700 text-sm font-semibold hover:text-black transition-colors">CONTACT</a>
            </div>
            
            {/* 오른쪽 아이콘 */}
            <div className="flex items-center gap-6">
              <span className="text-stone-500 text-sm">KR</span>
              <button className="text-stone-600 hover:text-black transition-colors">
                <User className="w-5 h-5" />
              </button>
              <button className="text-stone-600 hover:text-black transition-colors relative">
                <ShoppingCart className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-black text-white text-[10px] rounded-full flex items-center justify-center">0</span>
              </button>
              <button className="text-stone-600 hover:text-black transition-colors">
                <Search className="w-5 h-5" />
              </button>
            </div>
          </nav>
        </header>

        {/* 떠다니는 야채/과일들 - CSS 애니메이션 사용 */}
        {items.map((item) => {
          const isSelected = selectedItems.some(i => i.id === item.id);
          
          return (
            <div
              key={item.id}
              className={`floating-item absolute cursor-pointer hover:z-50 group
                ${isSelected ? 'z-40' : ''}`}
              style={{
                left: item.x,
                top: item.y,
                width: item.size,
                height: item.size,
                transform: `translate(-50%, -50%) scale(${item.scale})`,
                animation: `float-${item.id.replace(/[^a-zA-Z0-9]/g, '')} ${item.animationDuration}s ease-in-out infinite`,
                animationDelay: `${item.animationDelay}s`,
              }}
              onClick={(e) => handleItemClick(item, e)}
            >
              {/* 각 아이템별 고유 keyframe 인라인 스타일 */}
              <style>{`
                @keyframes float-${item.id.replace(/[^a-zA-Z0-9]/g, '')} {
                  0%, 100% { 
                    transform: translate(-50%, -50%) scale(${item.scale}) translate(0, 0) rotate(0deg);
                  }
                  25% { 
                    transform: translate(-50%, -50%) scale(${item.scale}) translate(${item.driftX * 0.5}px, ${-item.floatAmplitude}px) rotate(${item.rotateDirection * 3}deg);
                  }
                  50% { 
                    transform: translate(-50%, -50%) scale(${item.scale}) translate(${item.driftX}px, 0) rotate(0deg);
                  }
                  75% { 
                    transform: translate(-50%, -50%) scale(${item.scale}) translate(${item.driftX * 0.5}px, ${item.floatAmplitude}px) rotate(${item.rotateDirection * -3}deg);
                  }
                }
              `}</style>
              
              <div className="relative w-full h-full">
                {/* 원본 이미지 */}
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className={`w-full h-full object-contain transition-opacity duration-300 group-hover:scale-105
                    ${isSelected ? 'opacity-0' : 'opacity-100'}`}
                  loading="lazy"
                  draggable={false}
                />
                
                {/* 선택 시 컬러 실루엣 */}
                <div 
                  className={`absolute inset-0 transition-opacity duration-300
                    ${isSelected ? 'opacity-100' : 'opacity-0'}`}
                  style={{
                    backgroundColor: item.labelColor,
                    maskImage: `url(${item.imageUrl})`,
                    WebkitMaskImage: `url(${item.imageUrl})`,
                    maskSize: 'contain',
                    WebkitMaskSize: 'contain',
                    maskRepeat: 'no-repeat',
                    WebkitMaskRepeat: 'no-repeat',
                    maskPosition: 'center',
                    WebkitMaskPosition: 'center',
                  }}
                />
              </div>

              <div
                className="absolute 
                  opacity-0 group-hover:opacity-100 transition-all duration-300
                  whitespace-nowrap z-20
                  flex items-center justify-center"
                style={{ 
                  backgroundColor: item.labelColor,
                  borderRadius: '50%',
                  paddingLeft: '18px',
                  paddingRight: '18px',
                  paddingTop: '6px',
                  paddingBottom: '6px',
                  top: '50%',
                  left: '50%',
                  transform: `translate(calc(-50% + ${item.labelOffsetX}px), calc(-50% + ${item.labelOffsetY}px)) rotate(${item.labelRotation}deg) scale(${1 / item.scale})`,
                }}
              >
                <span 
                  className="font-futura font-medium"
                  style={{ 
                    fontSize: '15px',
                    color: isLightColor(item.labelColor) ? '#000000' : '#FFFFFF',
                    letterSpacing: '0.3px',
                  }}
                >
                  {item.name}
                </span>
              </div>
            </div>
          );
        })}

        {/* 하단 선택 바 */}
        {showSelectionBar && (
        <div className="selection-bar fixed bottom-0 left-0 right-0 z-50 transition-all duration-500">
          {/* 선택 영역 */}
          <div className="p-4">
            <div className="max-w-2xl mx-auto">
              {/* 선택된 아이템들 */}
              <div className="flex items-center justify-center gap-4 mb-4">
                {[0, 1, 2].map((index) => {
                  const item = selectedItems[index];
                  return (
                    <div
                      key={index}
                      className={`w-20 h-20 rounded-2xl border-2 border-dashed transition-all duration-300 flex items-center justify-center
                        ${item ? 'border-black bg-white shadow-lg' : 'border-stone-300 bg-white/50'}`}
                    >
                      {item ? (
                        <div className="relative w-full h-full p-1">
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="w-full h-full object-contain"
                          />
                          <button
                            onClick={() => removeSelection(item.id)}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-black rounded-full flex items-center justify-center text-white hover:bg-stone-800 transition-colors shadow-md"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ) : (
                        <span className="text-stone-400 text-2xl">+</span>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* 믹스하기 버튼 */}
              <div className="flex justify-center">
                <button
                  onClick={goToSurvey}
                  disabled={selectedItems.length === 0}
                  className={`px-12 py-3 text-white text-sm tracking-wider transition-all duration-300
                    ${selectedItems.length > 0 
                      ? 'hover:bg-stone-900' 
                      : 'cursor-not-allowed'}`}
                  style={{ 
                    backgroundColor: selectedItems.length > 0 ? '#000000' : 'rgba(0,0,0,0.4)',
                  }}
                >
                  믹스하기
                </button>
              </div>
            </div>
          </div>

          {/* 쉐브론 아이콘 */}
          <div className="w-full flex justify-center py-3">
            <ChevronDown className="w-6 h-6 text-black" strokeWidth={1} />
          </div>

          {/* 하단 블랙 바 */}
          <div className="w-full h-10 bg-black"></div>
        </div>
        )}
      </div>

      {/* 두 번째 페이지 - 설문조사 */}
      <div className="survey-page snap-start min-h-screen">
        <SurveyPage selectedItems={selectedItems} />
      </div>
    </div>
  );
};

export default App;
