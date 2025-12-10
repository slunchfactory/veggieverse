import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { VegetableItem } from '../types';
import { PRODUCE_ITEMS } from '../constants';
import { SurveyPage } from '../components/SurveyPage';

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
  animationDuration: number;
  animationDelay: number;
  floatAmplitude: number;
  rotationDuration: number;
  driftX: number;
  driftY: number;
  rotateDirection: number;
  zIndex: number;
  vx: number;
  vy: number;
}

interface VeganTestPageProps {
  onSaveProfile: (profileImage: string, veganType: string) => void;
  headerOffset?: number;
}

export const VeganTestPage: React.FC<VeganTestPageProps> = ({ onSaveProfile, headerOffset = 96 }) => {
  const [items, setItems] = useState<FloatingItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<FloatingItem[]>([]);
  const [showSelectionBar, setShowSelectionBar] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const dragOffsetRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const dragMovedRef = useRef(false);
  const zCounterRef = useRef(1000);
  const animationFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);

  // body 스크롤 비활성화 (이 페이지에서만)
  useEffect(() => {
    document.body.classList.add('no-scroll');
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, []);

  // 초기 아이템 생성 - 150%~250% 랜덤 크기, 오른쪽 회전
  useEffect(() => {
    const isMobile = window.innerWidth < 640;
    const sizeMultiplier = isMobile ? 0.78 : 1;
    const initialItems: FloatingItem[] = PRODUCE_ITEMS.map((produce, index) => {
      // 랜덤 위치 (약간의 오프스크린 포함, 배너+헤더 높이 제외)
      const adjustedHeight = window.innerHeight - headerOffset;
      const x = Math.random() * (window.innerWidth + 160) - 80;
      const y = Math.random() * (adjustedHeight + 120) - 60;
      
      // 180%~300% 크기 (기본 90px 기준) + 모바일 축소 보정
      const baseSize = 90;
      const scale = (1.8 + Math.random() * 1.2) * sizeMultiplier; // 1.8 ~ 3.0
      const baseSpeed = 12 + Math.random() * 18; // px/s
      const angle = Math.random() * Math.PI * 2;
      
      return {
        id: `produce-${index}`,
        name: produce.name,
        x,
        y,
        scale,
        rotation: Math.random() * 360,
        imageUrl: produce.image,
        color: '',
        size: baseSize,
        labelColor: produce.color,
        labelOffsetX: (Math.random() - 0.5) * 30,
        labelOffsetY: -20,
        labelRotation: (Math.random() - 0.5) * 20,
        animationDuration: 6 + Math.random() * 4, // 6~10초 플로팅
        animationDelay: Math.random() * -8,
        floatAmplitude: 20 + Math.random() * 15,
        rotationDuration: 22 + Math.random() * 12, // 22~34초에 한 바퀴 회전 (느리게)
        driftX: (Math.random() - 0.5) * 70,
        driftY: (Math.random() - 0.5) * 50,
        rotateDirection: 1, // 오른쪽(시계방향) 회전
        zIndex: 10 + index,
        vx: Math.cos(angle) * baseSpeed,
        vy: Math.sin(angle) * baseSpeed,
      };
    });
    setItems(initialItems);
  }, [headerOffset]);

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

  const removeSelection = useCallback((itemId: string) => {
    setSelectedItems(prev => prev.filter(i => i.id !== itemId));
  }, []);

  const goToSurvey = useCallback(() => {
    setShowSelectionBar(false);
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: window.innerHeight - headerOffset,
        behavior: 'smooth'
      });
    }
  }, [headerOffset]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const pageHeight = window.innerHeight - headerOffset;
      const threshold = pageHeight * 0.3;
      
      if (scrollTop < threshold) {
        setShowSelectionBar(true);
      } else {
        setShowSelectionBar(false);
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [headerOffset]);

  // 자유 부유 모션 (포인터 드래그 중인 아이템 제외)
  useEffect(() => {
    lastTimeRef.current = performance.now();
    const animate = (time: number) => {
      const dt = Math.min((time - lastTimeRef.current) / 1000, 0.05); // clamp delta
      lastTimeRef.current = time;
      const width = window.innerWidth;
      const height = window.innerHeight - headerOffset; // 배너 + 헤더 높이 제외
      const wrapMargin = 220; // 오프스크린 이동 허용 범위
      const minSpeed = 10;
      const maxSpeed = 35;
      const wanderStrength = 18;

      setItems(prev =>
        prev.map(item => {
          if (draggingId === item.id) return item;

          // wander velocity
          let vx = item.vx + (Math.random() - 0.5) * wanderStrength * dt;
          let vy = item.vy + (Math.random() - 0.5) * wanderStrength * dt;
          const speed = Math.hypot(vx, vy);
          if (speed < minSpeed) {
            const scale = minSpeed / (speed || 1);
            vx *= scale;
            vy *= scale;
          } else if (speed > maxSpeed) {
            const scale = maxSpeed / speed;
            vx *= scale;
            vy *= scale;
          }

          let x = item.x + vx * dt;
          let y = item.y + vy * dt;

          // 화면 밖으로 부드럽게 이동 허용 후 래핑
          if (x < -wrapMargin) {
            x = width + wrapMargin;
          } else if (x > width + wrapMargin) {
            x = -wrapMargin;
          }

          if (y < -wrapMargin) {
            y = height + wrapMargin;
          } else if (y > height + wrapMargin) {
            y = -wrapMargin;
          }

          return {
            ...item,
            x,
            y,
            vx,
            vy,
          };
        })
      );

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [draggingId, headerOffset]);

  const startDrag = useCallback((item: FloatingItem, e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    dragMovedRef.current = false;
    setDraggingId(item.id);
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    dragOffsetRef.current = {
      x: e.clientX - item.x,
      y: e.clientY - item.y,
    };
    zCounterRef.current += 1;
    setItems(prev =>
      prev.map(i =>
        i.id === item.id ? { ...i, zIndex: zCounterRef.current } : i
      )
    );
  }, []);

  const handleDragMove = useCallback((clientX: number, clientY: number) => {
    if (!draggingId) return;
    const offset = dragOffsetRef.current;
    const newX = clientX - offset.x;
    const newY = clientY - offset.y;

    setItems(prev =>
      prev.map(item =>
        item.id === draggingId
          ? {
              ...item,
              x: newX,
              y: newY,
            }
          : item
      )
    );

    const dx = clientX - dragStartRef.current.x;
    const dy = clientY - dragStartRef.current.y;
    if (!dragMovedRef.current && Math.sqrt(dx * dx + dy * dy) > 4) {
      dragMovedRef.current = true;
    }
  }, [draggingId]);

  const handleDragEnd = useCallback(
    (item: FloatingItem) => {
      if (!draggingId) return;
      if (!dragMovedRef.current) {
        // 드래그로 움직이지 않은 경우는 선택 토글로 처리
        handleItemClick(item, new MouseEvent('click') as unknown as React.MouseEvent);
      }
      setDraggingId(null);
    },
    [draggingId, handleItemClick]
  );

  useEffect(() => {
    const onPointerMove = (e: PointerEvent) => {
      handleDragMove(e.clientX, e.clientY);
    };
    const onPointerUp = () => {
      if (!draggingId) return;
      const item = items.find(i => i.id === draggingId);
      if (item) {
        handleDragEnd(item);
      } else {
        setDraggingId(null);
      }
    };

    if (draggingId) {
      window.addEventListener('pointermove', onPointerMove);
      window.addEventListener('pointerup', onPointerUp);
    }
    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };
  }, [draggingId, handleDragEnd, handleDragMove, items]);

  return (
    <div 
      ref={containerRef}
      className="w-screen overflow-y-auto overflow-x-hidden snap-y snap-mandatory relative no-scrollbar"
      style={{ 
        scrollBehavior: 'smooth',
        backgroundColor: '#5C4033',
        width: '100dvw',
        height: `calc(100dvh - ${headerOffset}px)`,
        maxWidth: '100dvw',
        overflowX: 'hidden',
      }}
    >
      {/* 그레인 텍스처 - 피그마 설정: #744b2f, 모노, 사이즈1, 덴시티100, 컬러#54341f */}
      <div 
        className="fixed left-0 right-0 bottom-0 pointer-events-none z-0"
        style={{
          backgroundColor: '#744b2f',
          top: `${headerOffset}px`,
        }}
      />
      {/* 노이즈 오버레이 - 모노, 사이즈1, 덴시티100% */}
      <div 
        className="fixed left-0 right-0 bottom-0 pointer-events-none z-[1]"
        style={{
          top: `${headerOffset}px`,
          opacity: 1,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='50' height='50'%3E%3Cfilter id='grain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1' numOctaves='1' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 20 -10'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3CfeComponentTransfer%3E%3CfeFuncA type='discrete' tableValues='0 1'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23grain)' fill='%2354341f'/%3E%3C/svg%3E")`,
          backgroundSize: '50px 50px',
          mixBlendMode: 'multiply',
        }}
      />
      {/* 첫 번째 페이지 - 야채 선택 */}
      <div 
        className="relative w-screen overflow-hidden select-none snap-start z-[2]"
        style={{ height: `calc(100dvh - ${headerOffset}px)` }}
      >
        {/* 떠다니는 야채/과일들 - 150%~250% 크기, 오른쪽 회전 */}
        {items.map((item) => {
          const isSelected = selectedItems.some(i => i.id === item.id);
          const itemId = item.id.replace(/[^a-zA-Z0-9]/g, '');
          
          return (
            <div
              key={item.id}
              className="absolute cursor-pointer group touch-none"
              style={{
                left: item.x,
                top: item.y,
                width: item.size * item.scale,
                height: item.size * item.scale,
                transform: 'translate(-50%, -50%)',
                zIndex: item.zIndex,
              }}
              onPointerDown={(e) => startDrag(item, e)}
            >
              {/* 개별 애니메이션 스타일 */}
              <style>{`
                @keyframes float-${itemId} {
                  0% { 
                    transform: translate(0px, 0px) rotate(0deg);
                  }
                  20% { 
                    transform: translate(${item.driftX * 0.25}px, ${-item.floatAmplitude * 0.6}px) rotate(${90 * item.rotateDirection}deg);
                  }
                  50% { 
                    transform: translate(${item.driftX}px, ${item.driftY}px) rotate(${180 * item.rotateDirection}deg);
                  }
                  80% { 
                    transform: translate(${item.driftX * 0.25}px, ${item.floatAmplitude * 0.6}px) rotate(${270 * item.rotateDirection}deg);
                  }
                  100% { 
                    transform: translate(0px, 0px) rotate(${360 * item.rotateDirection}deg);
                  }
                }
              `}</style>
              
              {/* 플로팅 + 회전 애니메이션 */}
              <div
                className="w-full h-full"
                style={{
                  animation: `float-${itemId} ${item.rotationDuration}s ease-in-out infinite`,
                  animationDelay: `${item.animationDelay}s`,
                }}
              >
                {/* 중앙 라벨 - 호버 시 노출 (최상단 z-index) */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ zIndex: 30 }}>
                  <span
                    className="px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm"
                    style={{
                      fontFamily: 'Jost, sans-serif',
                      fontSize: '13px',
                      backgroundColor: `${item.labelColor}dd`,
                      color: isLightColor(item.labelColor) ? '#1a1a1a' : '#ffffff',
                      transform: 'scale(1)',
                      backdropFilter: 'blur(4px)',
                      border: '1px solid rgba(255,255,255,0.35)',
                    }}
                  >
                    {item.name}
                  </span>
                </div>

                {/* 선택 시: 솔리드 컬러 실루엣 (투명도 0%) */}
                {isSelected && (
                  <div 
                    className="absolute inset-0"
                    style={{
                      backgroundColor: item.labelColor,
                      WebkitMaskImage: `url(${item.imageUrl})`,
                      WebkitMaskSize: 'contain',
                      WebkitMaskRepeat: 'no-repeat',
                      WebkitMaskPosition: 'center',
                      maskImage: `url(${item.imageUrl})`,
                      maskSize: 'contain',
                      maskRepeat: 'no-repeat',
                      maskPosition: 'center',
                      zIndex: 10,
                    }}
                  />
                )}

                {/* 실제 이미지 - 선택 시 완전히 숨김 */}
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className={`w-full h-full object-contain transition-all duration-300 ${
                    isSelected ? 'opacity-0' : 'group-hover:scale-105'
                  }`}
                  style={{
                    filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.15))',
                    position: 'relative',
                    zIndex: 20,
                  }}
                  draggable={false}
                />
              </div>
            </div>
          );
        })}

        {/* 하단 선택 바 - 원본 이미지 표시 */}
        {showSelectionBar && (
          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[80]">
            <div className="bg-white/95 backdrop-blur-sm rounded-full shadow-lg px-6 py-3 flex items-center gap-4">
              {/* 선택된 아이템들 - 원본 이미지 */}
              <div className="flex items-center gap-3">
                {[0, 1, 2].map((index) => {
                  const item = selectedItems[index];
                  return (
                    <div
                      key={index}
                      className="relative"
                    >
                      <div
                        className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${
                          item 
                            ? 'bg-stone-50' 
                            : 'border-2 border-dashed border-stone-300'
                        }`}
                      >
                        {item ? (
                          <img 
                            src={item.imageUrl}
                            alt={item.name}
                            className="w-10 h-10 object-contain"
                          />
                        ) : (
                          <span className="text-stone-300 text-xs font-medium">{index + 1}</span>
                        )}
                      </div>
                      {/* 취소 버튼 - Rustic Noir */}
                      {item && (
                        <button
                          onClick={() => removeSelection(item.id)}
                          className="absolute -top-1 -right-1 w-5 h-5 text-white rounded-full flex items-center justify-center transition-colors z-10 shadow-sm"
                          style={{ backgroundColor: '#292624' }}
                        >
                          <X className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* 구분선 */}
              <div className="w-px h-8 bg-stone-200"></div>

              {/* 믹스하기 버튼 - Rustic Noir */}
              <button
                onClick={goToSurvey}
                disabled={selectedItems.length < 3}
                className="px-5 py-2 rounded-full font-semibold text-sm flex items-center gap-1.5 transition-all"
                style={{
                  backgroundColor: selectedItems.length === 3 ? '#292624' : '#e5e5e5',
                  color: selectedItems.length === 3 ? '#fff' : '#a3a3a3',
                  cursor: selectedItems.length === 3 ? 'pointer' : 'not-allowed',
                }}
              >
                믹스하기
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

      </div>

      {/* 두 번째 페이지 - 설문조사 */}
      <div className="survey-page snap-start min-h-screen relative z-[2]">
        <SurveyPage selectedItems={selectedItems} onSaveProfile={onSaveProfile} />
      </div>
    </div>
  );
};

