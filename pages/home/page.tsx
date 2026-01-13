import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, ArrowRight, Heart } from 'lucide-react';
import { getHomeProductImage } from '../../utils/productImages';
import { getRecipeThumbnailImage, getFallbackRecipeImage } from '../../utils/recipeImages';
import { VegetableItem } from '../../types';
import { PRODUCE_ITEMS } from '../../constants';
import { SurveyPage } from '../../components/SurveyPage';
import { Footer } from '../../components/Footer';

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

// 무드 슬라이더 이미지 데이터
const MOOD_SLIDES = [
  {
    id: 1,
    leftImage: 'https://images.unsplash.com/photo-1490818387583-1baba5e638af?auto=format&fit=crop&q=80&w=800',
    rightImage: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 2,
    leftImage: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&q=80&w=800',
    rightImage: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 3,
    leftImage: 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&q=80&w=800',
    rightImage: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 4,
    leftImage: 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?auto=format&fit=crop&q=80&w=800',
    rightImage: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 5,
    leftImage: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=800',
    rightImage: 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?auto=format&fit=crop&q=80&w=800',
  },
];

// 무드 슬라이더 컴포넌트
const MoodSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const slidesWithClone = [...MOOD_SLIDES, MOOD_SLIDES[0]]; // 첫 번째 슬라이드 복제

  const startAutoSlide = useCallback(() => {
    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => prev + 1);
    }, 4000); // 4초마다 슬라이드 변경
  }, []);

  const stopAutoSlide = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }, []);

  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, [startAutoSlide, stopAutoSlide]);

  // 마지막 복제 슬라이드에서 실제 첫 번째로 점프
  useEffect(() => {
    if (currentSlide === MOOD_SLIDES.length) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentSlide(0);
      }, 1200); // 전환 애니메이션 완료 후
      
      setTimeout(() => {
        setIsTransitioning(true);
      }, 1250); // 약간의 딜레이 후 트랜지션 다시 활성화
    }
  }, [currentSlide]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    stopAutoSlide();
    startAutoSlide();
  };

  return (
    <section 
      className="relative w-full overflow-hidden"
      style={{ height: 'calc(100vh - 96px)' }}
    >
      {/* 슬라이드 컨테이너 */}
      <div 
        className="flex h-full"
        style={{ 
          width: `${slidesWithClone.length * 100}%`,
          transform: `translateX(-${currentSlide * (100 / slidesWithClone.length)}%)`,
          transition: isTransitioning ? 'transform 1.2s ease-in-out' : 'none'
        }}
      >
        {slidesWithClone.map((slide, index) => (
          <div 
            key={`${slide.id}-${index}`}
            className="flex h-full"
            style={{ width: `${100 / slidesWithClone.length}%` }}
          >
            {/* 좌측 이미지 */}
            <div className="w-1/2 h-full overflow-hidden">
              <img 
                src={slide.leftImage}
                alt={`슬라이드 ${index + 1} 좌측 이미지`}
                className="w-full h-full object-cover"
                loading={index === 0 ? 'eager' : 'lazy'}
              />
            </div>
            {/* 우측 이미지 */}
            <div className="w-1/2 h-full overflow-hidden">
              <img 
                src={slide.rightImage}
                alt={`슬라이드 ${index + 1} 우측 이미지`}
                className="w-full h-full object-cover"
                loading={index === 0 ? 'eager' : 'lazy'}
              />
            </div>
          </div>
        ))}
      </div>

      {/* 인디케이터 */}
      <div 
        className="absolute bottom-8 left-8 flex gap-2"
        style={{ zIndex: 10 }}
      >
        {MOOD_SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className="w-2 h-2 rounded-full transition-all duration-300"
            style={{
              backgroundColor: (currentSlide === index || (currentSlide === MOOD_SLIDES.length && index === 0)) ? '#FFFFFF' : 'rgba(255,255,255,0.4)',
              transform: (currentSlide === index || (currentSlide === MOOD_SLIDES.length && index === 0)) ? 'scale(1.2)' : 'scale(1)',
            }}
            aria-label={`슬라이드 ${index + 1}로 이동`}
          />
        ))}
      </div>
    </section>
  );
};

// 레시피 비디오 Hero 섹션 (Store에서 이동)
const RECIPE_VIDEO_ITEMS = [
  { id: 1, name: '볶음김치', description: '비건 식단에 어울리는 메뉴', likes: 1100, videoId: 'x7pnY0U5yYY' },
  { id: 2, name: '김치볶음밥', description: '비건 식단에 어울리는 메뉴', likes: 626, videoId: 'LeZQWQ_cXqU' },
  { id: 3, name: '시금치 뇨끼', description: '비건 식단에 어울리는 메뉴', likes: 850, videoId: '8cVFJrY89SA' },
  { id: 4, name: '구운 야채 빈앤넛', description: '비건 식단에 어울리는 메뉴', likes: 720, videoId: 'IzNnBZMjbXU' },
];

const RecipeVideoHero: React.FC = () => {
  const formatLikeCount = (count: number): string => {
    if (count >= 1000) {
      return (count / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    }
    return count.toString();
  };

  return (
    <div className="w-full border-b border-black">
      {/* Desktop: Flex Row Layout */}
      <div className="hidden lg:flex lg:flex-row">
        {/* Left Column - Main Video (50%) */}
        <div className="w-1/2 relative overflow-hidden border-r border-black">
          <div className="relative w-full" style={{ aspectRatio: '9/16' }}>
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/qN-UMZZ1U9Y?autoplay=1&mute=1&loop=1&playlist=qN-UMZZ1U9Y&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1"
              title="슬런치 비건 레시피"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ 
                pointerEvents: 'none',
                objectFit: 'cover',
                width: '100%',
                height: '100%'
              }}
            />
          </div>
        </div>
        
        {/* Right Column - 추천 콘텐츠 영역 (50%) */}
        <div className="w-1/2 bg-white flex-shrink-0">
          {/* 데스크톱: 세로형 카드 2열 엇갈린 높이 */}
          <div className="hidden lg:flex p-5 pb-8 gap-4 h-full overflow-y-auto">
            {/* 왼쪽 열 */}
            <div className="flex-1 flex flex-col gap-4">
              {RECIPE_VIDEO_ITEMS.slice(0, 2).map((item) => (
                <Link key={item.id} to="/recipe" className="cursor-pointer group flex flex-col">
                  <div 
                    className="relative w-full overflow-hidden bg-black"
                    style={{ aspectRatio: '3/4' }}
                  >
                    <iframe
                      className="absolute w-full h-full"
                      src={`https://www.youtube.com/embed/${item.videoId}?autoplay=1&mute=1&loop=1&playlist=${item.videoId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1`}
                      title={item.name}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      style={{ pointerEvents: 'none', transform: 'scale(2.5)', transformOrigin: 'center center' }}
                    />
                    {/* 추천 아이콘 (좌측 상단) */}
                    <div className="absolute top-3 left-3 z-10">
                      <div className="w-8 h-8 bg-[#3fa945] flex items-center justify-center">
                        <span className="text-black text-xs">✦</span>
                      </div>
                    </div>
                  </div>
                  <div className="pt-3 bg-black px-3 pb-3">
                    <h4 className="font-normal text-white leading-tight group-hover:underline text-base">
                      {item.name}
                    </h4>
                    <p className="text-gray-400 mt-2 line-clamp-2 text-xs">
                      {item.description}
                    </p>
                    <div className="flex items-center mt-3 gap-1.5">
                      <span className="text-gray-400">♡</span>
                      <span className="text-gray-400 text-xs">
                        {formatLikeCount(item.likes)}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            
            {/* 오른쪽 열 (아래로 오프셋) */}
            <div className="flex-1 flex flex-col gap-4 pt-24">
              {RECIPE_VIDEO_ITEMS.slice(2, 4).map((item) => (
                <Link key={item.id} to="/recipe" className="cursor-pointer group flex flex-col">
                  <div 
                    className="relative w-full overflow-hidden bg-black"
                    style={{ aspectRatio: '3/4' }}
                  >
                    <iframe
                      className="absolute w-full h-full"
                      src={`https://www.youtube.com/embed/${item.videoId}?autoplay=1&mute=1&loop=1&playlist=${item.videoId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1`}
                      title={item.name}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      style={{ pointerEvents: 'none', transform: 'scale(2.5)', transformOrigin: 'center center' }}
                    />
                    {/* 추천 아이콘 (좌측 상단) */}
                    <div className="absolute top-3 left-3 z-10">
                      <div className="w-8 h-8 bg-[#3fa945] flex items-center justify-center">
                        <span className="text-black text-xs">✦</span>
                      </div>
                    </div>
                  </div>
                  <div className="pt-3 bg-black px-3 pb-3">
                    <h4 className="font-normal text-white leading-tight group-hover:underline text-base">
                      {item.name}
                    </h4>
                    <p className="text-gray-400 mt-2 line-clamp-2 text-xs">
                      {item.description}
                    </p>
                    <div className="flex items-center mt-3 gap-1.5">
                      <span className="text-gray-400">♡</span>
                      <span className="text-gray-400 text-xs">
                        {formatLikeCount(item.likes)}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile: Stack Vertically */}
      <div className="flex flex-col lg:hidden">
        {/* Main Video on Top */}
        <div className="relative w-full overflow-hidden border-b border-black">
          <div className="relative w-full" style={{ aspectRatio: '9/16' }}>
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/qN-UMZZ1U9Y?autoplay=1&mute=1&loop=1&playlist=qN-UMZZ1U9Y&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1"
              title="슬런치 비건 레시피"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ 
                pointerEvents: 'none',
                objectFit: 'cover',
                width: '100%',
                height: '100%'
              }}
            />
          </div>
        </div>
        
        {/* 추천 콘텐츠 영역 Below (Mobile) */}
        <div className="lg:hidden p-4 sm:p-5 bg-white">
          <div className="grid grid-cols-2" style={{ gap: '13px' }}>
            {RECIPE_VIDEO_ITEMS.map((item) => (
              <Link key={item.id} to="/recipe" className="cursor-pointer group flex flex-row gap-3">
                {/* 카드 영상 (왼쪽) */}
                <div 
                  className="relative w-[45%] flex-shrink-0 overflow-hidden bg-black"
                  style={{ aspectRatio: '3/4' }}
                >
                  <iframe
                    className="absolute w-full h-full"
                    src={`https://www.youtube.com/embed/${item.videoId}?autoplay=1&mute=1&loop=1&playlist=${item.videoId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1`}
                    title={item.name}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    style={{ pointerEvents: 'none', transform: 'scale(2.5)', transformOrigin: 'center center' }}
                  />
                  {/* 추천 아이콘 (좌측 상단) */}
                  <div className="absolute top-2 left-2 z-10">
                    <div className="w-6 h-6 bg-[#3fa945] flex items-center justify-center">
                      <span className="text-black text-[10px]">✦</span>
                    </div>
                  </div>
                </div>
                {/* 카드 정보 (오른쪽) */}
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <h4 className="font-normal text-black leading-tight line-clamp-2 group-hover:underline text-xs">
                      {item.name}
                    </h4>
                    <p className="text-gray-500 mt-1 line-clamp-2 text-[10px]">
                      {item.description}
                    </p>
                  </div>
                  <div className="flex items-center mt-2 gap-1">
                    <span className="text-gray-400 text-xs">♡</span>
                    <span className="text-gray-400 text-[10px]">
                      {formatLikeCount(item.likes)}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// 인기 메뉴/굿즈 데이터
const FEATURED_ITEMS = [
  { id: 'm1', name: '슬런치 김치볶음밥 밀키트(2인분)', price: 12000, microCopy: '오늘의 기분엔 이 메뉴!' },
  { id: 'm2', name: '슬런치 시금치 뇨끼', price: 18000, microCopy: '부드러운 한 끼' },
  { id: 'm3', name: '슬런치 블루베리 타르트', price: 39000, microCopy: '달콤한 순간' },
  { id: 'm4', name: '슬런치 잠봉뵈르', price: 8000, microCopy: '내 책상 위 귀여운 친구' },
  { id: 'm5', name: '슬런치 오리엔탈 셀러드(2인분)', price: 24000, microCopy: '상쾌한 하루' },
  { id: 'm6', name: '슬런치 김치전', price: 13000, microCopy: '바삭한 기분' },
  { id: 'm7', name: '슬런치 비건 쿠키 세트', price: 15000, microCopy: '달콤한 선물' },
  { id: 'm8', name: '슬런치 그린 샐러드', price: 18000, microCopy: '건강한 선택' },
];

interface HomePageProps {
  headerOffset?: number;
}

export const HomePage: React.FC<HomePageProps> = ({ headerOffset = 96 }) => {
  const navigate = useNavigate();
  const [items, setItems] = useState<FloatingItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<FloatingItem[]>([]);
  const [step, setStep] = useState<1 | 2 | 3>(2); // Step 2: 재료 선택, Step 3: 설문 (Step 1 제거)
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  const [hoveredItemId, setHoveredItemId] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // 초기 아이템 생성 - 랜덤 위치 배치 (퍼센트 기반)
  useEffect(() => {
    const isMobile = window.innerWidth < 640;
    const sizeMultiplier = isMobile ? 0.78 : 1;
    const baseSize = 90;
    
    const initialItems: FloatingItem[] = PRODUCE_ITEMS.map((produce, index) => {
      // 랜덤 위치 배치 (퍼센트 기반, 10% ~ 90% 범위)
      const xPercent = 10 + Math.random() * 80; // 10% ~ 90%
      const yPercent = 10 + Math.random() * 80; // 10% ~ 90%
      // 더 다양한 크기 (0.6 ~ 2.5 배)
      const scale = (0.6 + Math.random() * 1.9) * sizeMultiplier;
      
      return {
        id: `produce-${index}`,
        name: produce.name,
        x: xPercent, // 퍼센트 값으로 저장
        y: yPercent, // 퍼센트 값으로 저장
        scale,
        rotation: Math.random() * 360,
        imageUrl: produce.image,
        color: '',
        size: baseSize,
        labelColor: produce.color,
        labelOffsetX: (Math.random() - 0.5) * 30,
        labelOffsetY: -20,
        labelRotation: (Math.random() - 0.5) * 20,
        animationDuration: 4 + Math.random() * 2, // 4~6초
        animationDelay: Math.random() * 2, // 0~2초 딜레이
        floatAmplitude: 20 + Math.random() * 15,
        rotationDuration: 22 + Math.random() * 12,
        driftX: (Math.random() - 0.5) * 70,
        driftY: (Math.random() - 0.5) * 50,
        rotateDirection: Math.random() > 0.5 ? 1 : -1,
        zIndex: 1 + index, // 텍스트 뒤에 배치
        vx: 0,
        vy: 0,
      };
    });
    setItems(initialItems);
  }, [headerOffset]);

  const handleItemClick = useCallback((item: FloatingItem, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSelectedItems(prev => {
      const isSelected = prev.some(i => i.id === item.id);
      if (isSelected) {
        // 선택 해제 - 애니메이션 재개
        return prev.filter(i => i.id !== item.id);
      } else if (prev.length < 3) {
        // 선택 - 해당 위치에서 멈춤
        return [...prev, item];
      }
      return prev;
    });
  }, []);

  const removeSelection = useCallback((itemId: string) => {
    setSelectedItems(prev => prev.filter(i => i.id !== itemId));
  }, []);


  const goToNextStep = useCallback(() => {
    if (selectedItems.length === 3) {
      localStorage.setItem('spirit-finder-selected-items', JSON.stringify(selectedItems));
      // 0.5초 딜레이 후 자동 전환
      setTimeout(() => {
        setStep(3);
      }, 500);
    }
  }, [selectedItems]);

  // 3칸 완성 시 자동 전환 제거 (버튼 클릭으로 전환)

  // 자유 부유 모션은 CSS 애니메이션으로만 처리 (원래 방식)


  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: '#ffffff', width: '100%' }}>
      {/* ============================================
          HERO SECTION - 나의 슬로우 스피릿 찾기
          ============================================ */}
      <section 
        ref={containerRef}
        className="relative w-full"
        style={{ 
          minHeight: 'calc(100vh - 96px)',
          height: step === 3 ? 'auto' : 'calc(100vh - 96px)',
          backgroundColor: step === 3 ? '#ffffff' : 'transparent',
          backgroundImage: step === 3 ? 'none' : 'url(/veggieverse/images/bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          position: 'relative',
          overflow: 'hidden',
          paddingTop: 'clamp(40px, 8vw, 80px)',
          paddingLeft: 'clamp(20px, 5vw, 60px)',
          paddingRight: 'clamp(20px, 5vw, 60px)',
          paddingBottom: '0',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* 둥실둥실 애니메이션 keyframes - 더 넓은 범위, 프레임 밖으로도 */}
        <style>
          {items.map((item, index) => {
            const itemId = item.id.replace(/[^a-zA-Z0-9]/g, '');
            // 각 야채마다 다른 이동 경로 생성 (매우 넓은 범위, 프레임 밖으로도)
            const moveX1 = (Math.random() - 0.5) * 120;
            const moveY1 = (Math.random() - 0.5) * 120;
            const moveX2 = (Math.random() - 0.5) * 150;
            const moveY2 = (Math.random() - 0.5) * 150;
            const moveX3 = (Math.random() - 0.5) * 130;
            const moveY3 = (Math.random() - 0.5) * 130;
            const moveX4 = (Math.random() - 0.5) * 100;
            const moveY4 = (Math.random() - 0.5) * 100;
            
            // 더 느린 애니메이션 (10~18초)
            const duration = 10 + Math.random() * 8;
            const delay = Math.random() * 4; // 0~4초 딜레이
            
            return `
              @keyframes float-${itemId} {
                0% { 
                  transform: translate(0, 0); 
                }
                20% { 
                  transform: translate(${moveX1}px, ${moveY1}px); 
                }
                40% { 
                  transform: translate(${moveX2}px, ${moveY2}px); 
                }
                60% { 
                  transform: translate(${moveX3}px, ${moveY3}px); 
                }
                80% { 
                  transform: translate(${moveX4}px, ${moveY4}px); 
                }
                100% { 
                  transform: translate(0, 0); 
                }
              }
              .vegetable-${itemId} {
                animation: float-${itemId} ${duration}s ease-in-out infinite;
                animation-delay: ${delay}s;
                will-change: transform;
              }
            `;
          }).join('')}
        </style>


        {/* 야채 플로팅 영역 */}
        <div className="flex-1 relative" style={{ minHeight: '300px' }}>
          {step !== 3 && items.map((item) => {
            const isSelected = selectedItems.some(i => i.id === item.id);
            const itemId = item.id.replace(/[^a-zA-Z0-9]/g, '');
            return (
              <div
                key={item.id}
                onClick={() => handleItemClick(item)}
                onMouseEnter={() => setHoveredItemId(item.id)}
                onMouseLeave={() => setHoveredItemId(null)}
                className="absolute group cursor-pointer"
                style={{
                  left: `${item.x}%`, // 퍼센트 값 사용
                  top: `${item.y}%`, // 퍼센트 값 사용
                  width: `${item.size * item.scale}px`,
                  height: `${item.size * item.scale}px`,
                  transform: 'translate(-50%, -50%)',
                  zIndex: isSelected ? 20 : item.zIndex || 1, // 호버 시 z-index 변경 제거
                  pointerEvents: 'auto',
                  willChange: isSelected ? 'auto' : 'transform',
                  isolation: 'isolate', // stacking context 분리
                }}
              >
                <div
                  className={`w-full h-full ${!isSelected ? `vegetable-${itemId}` : ''}`}
                  style={{
                    animation: isSelected ? 'none' : undefined,
                    position: 'relative',
                    willChange: isSelected ? 'auto' : 'transform',
                  }}
                >
                  {/* 원본 이미지 (항상 렌더링) */}
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-contain absolute inset-0"
                    style={{
                      opacity: (isSelected || hoveredItemId === item.id) ? 0 : 1,
                      zIndex: 1,
                    }}
                    draggable={false}
                  />
                  
                  {/* 컬러 실루엣 (호버 또는 선택 시 표시) */}
                  <div 
                    className="w-full h-full absolute inset-0"
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
                      filter: isSelected ? 'drop-shadow(0 0 0 3px #000000)' : 'none',
                      opacity: (isSelected || hoveredItemId === item.id) ? 1 : 0,
                      zIndex: 2,
                      pointerEvents: 'none',
                    }}
                  />
                  
                  {/* 호버 시 야채 이름 표시 (이미지 안에) */}
                  <div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{
                      zIndex: 30,
                      pointerEvents: 'none',
                      opacity: (hoveredItemId === item.id && !isSelected) ? 1 : 0,
                    }}
                  >
                    <span
                      className="text-white text-sm font-medium px-3 py-1.5 rounded"
                      style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        backdropFilter: 'blur(4px)',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                      }}
                    >
                      {item.name}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 서브헤드라인 (본문 위로 이동) */}
        <p 
          className="mb-4 md:mb-6 z-30 relative text-center mx-auto"
          style={{ 
            fontSize: 'clamp(16px, 2vw, 20px)',
            fontWeight: 700,
            lineHeight: '1.6',
            letterSpacing: '-0.01em',
            maxWidth: '700px',
            paddingLeft: '40px',
            paddingRight: '40px',
            color: '#DCFD4A',
          }}
        >
          "뭐 먹지?" 고민은 내려놓고, 나에게 맞는 한 끼를 발견하세요.<br />끌리는 재료 3 가지만 고르면, 당신의 취향에 꼭 맞는 테이블이 완성됩니다.
        </p>

        {/* 본문 (중앙 정렬) */}
        <p 
          className="text-stone-600 mb-8 md:mb-12 z-30 relative text-center mx-auto"
          style={{ 
            fontSize: '16px',
            fontWeight: 400,
            lineHeight: '1.8',
            letterSpacing: '-0.01em',
            maxWidth: '800px',
            paddingLeft: '40px',
            paddingRight: '40px',
          }}
        >
          슬런치는 맛있는 한 끼가 거창할 필요 없다고 믿습니다. 바쁜 하루 속에서도 나를 위한 시간, 천천히 음미하는 식사. 우리는 당신의 취향과 라이프스타일에 맞춰 매일의 식탁을 설계합니다. 건강을 위해 맛을 포기하거나, 맛을 위해 건강을 타협하지 않아도 됩니다. 그냥 맛있게 먹었을 뿐인데, 몸도 마음도 가벼워지는 경험. 슬런치가 그 테이블을 열어드릴게요.
        </p>

        {/* 테이블 열기 영역 - 항상 표시 (야채 선택 전 20px 노출) */}
        {step === 2 && (
          <>
            <style>
              {`
                @keyframes slideUpPush {
                  from {
                    transform: translate(-50%, calc(100% + 20px));
                  }
                  to {
                    transform: translate(-50%, 0);
                  }
                }
                @keyframes pullUpPage {
                  from {
                    transform: translateY(0);
                  }
                  to {
                    transform: translateY(-100%);
                  }
                }
              `}
            </style>
            
            {/* 마름모 형태 박스 - 야채 선택 시에만 표시 */}
            {selectedItems.length >= 1 && (
              <div 
                className="absolute z-40"
                style={{
                  width: '860px',
                  maxWidth: '100%',
                  left: '50%',
                  bottom: '0',
                  transform: 'translate(-50%, 0)',
                  animation: 'slideUpPush 0.5s ease-out',
                  overflow: 'hidden',
                }}
              >
                {/* 마름모 형태 배경 - 상단 라운딩 포함 */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 1,
                    backgroundColor: '#DCFD4A',
                    borderTopLeftRadius: '16px',
                    borderTopRightRadius: '16px',
                    clipPath: 'polygon(3.49% 0, 96.51% 0, 100% 100%, 0 100%)',
                  }}
                />
                {/* 상단 라운딩 오버레이 - clipPath 위에 표시 */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: '3.49%',
                    right: '3.51%',
                    height: '16px',
                    backgroundColor: '#DCFD4A',
                    borderTopLeftRadius: '16px',
                    borderTopRightRadius: '16px',
                    zIndex: 3,
                    pointerEvents: 'none',
                  }}
                />
                
                {/* 내용 영역 */}
                <div 
                  className="mx-auto"
                  style={{
                    width: '100%',
                    padding: '0',
                    position: 'relative',
                    zIndex: 2,
                  }}
                >
                <div 
                  className="flex flex-col md:flex-row items-center justify-center gap-3"
                  style={{
                    padding: '20px',
                  }}
                >
                  {/* 선택된 야채 실루엣 3개 */}
                  <div className="flex items-center gap-2">
                    {selectedItems.map((item, index) => (
                      <div
                        key={item.id}
                        className="relative"
                        style={{
                          width: '60px',
                          height: '60px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        <div
                          className="w-full h-full"
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
                          }}
                        />
                        {/* X 버튼 - 삭제 가능 (갈색) */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeSelection(item.id);
                          }}
                          className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center rounded-full z-10"
                          style={{
                            cursor: 'pointer',
                            backgroundColor: '#8C451D',
                          }}
                          aria-label="선택 해제"
                        >
                          <X className="w-3 h-3 text-white" />
                        </button>
                      </div>
                    ))}
                  </div>
                  
                  {/* 나의 슬로우 스피릿 찾기 버튼 */}
                  <button
                    onClick={() => {
                      if (selectedItems.length >= 1) {
                        localStorage.setItem('spirit-finder-selected-items', JSON.stringify(selectedItems));
                        navigate('/spirit/step');
                      }
                    }}
                    disabled={selectedItems.length < 1}
                    style={{
                      display: 'inline-block',
                      padding: '12px 24px',
                      border: 'none',
                      backgroundColor: selectedItems.length >= 1 ? '#8C451D' : '#ccc',
                      color: '#FFFFFF',
                      fontSize: '15px',
                      fontWeight: 400,
                      textDecoration: 'none',
                      transition: 'all 0.15s ease',
                      minHeight: '44px',
                      minWidth: '120px',
                      cursor: selectedItems.length >= 1 ? 'pointer' : 'not-allowed',
                    }}
                    onMouseEnter={(e) => {
                      if (selectedItems.length >= 1) {
                        e.currentTarget.style.backgroundColor = '#8C451D';
                        e.currentTarget.style.color = '#FFFFFF';
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = selectedItems.length >= 1 ? '#8C451D' : '#ccc';
                      e.currentTarget.style.color = '#FFFFFF';
                    }}
                  >
                    나의 슬로우 스피릿 찾기
                  </button>
                </div>
              </div>
            </div>
            )}
          </>
        )}

        {/* Step 3: 설문 페이지 (12px 바가 끌어올림) */}
        {step === 3 && (
          <div
            className="fixed inset-0 z-50"
            style={{
              transform: 'translateY(100%)',
              animation: 'pullUpPage 0.6s ease-out forwards',
              backgroundColor: '#DCFD4A',
            }}
          >
            <div style={{ paddingTop: '20px', paddingBottom: '40px', minHeight: '100vh' }}>
              <SurveyPage 
                selectedItems={selectedItems} 
              />
            </div>
          </div>
        )}
      </section>

      {/* ============================================
          SLUNCH WEEKLY - 2x2 그리드
          ============================================ */}
      <section 
        className="bg-white w-full px-5 md:px-20" 
        style={{ 
          paddingTop: '120px', 
          paddingBottom: '120px'
        }}
      >
        <div className="page-container">
          {/* 섹션 헤더 */}
          <div className="mb-12 max-w-3xl">
            <h2 
              className="text-stone-900 mb-4 text-left font-normal"
              style={{ 
                fontSize: 'var(--font-size-h2)',
                fontWeight: 400,
                letterSpacing: 'var(--letter-spacing-tight)',
                lineHeight: 'var(--line-height-h2)'
              }}
            >
              Slunch Weekly
            </h2>
            <p 
              className="text-stone-600 text-left"
              style={{ 
                fontSize: 'var(--font-size-body)',
                fontWeight: 400,
                lineHeight: 'var(--line-height-body)',
                letterSpacing: 'var(--letter-spacing-tight)'
              }}
            >
              하루 2끼, 균형 잡힌 식단을 문 앞까지. 내 몸을 위한 가장 쉬운 선택
            </p>
          </div>
          
          {/* 좌우 2열 레이아웃 */}
          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '24px',
            }}
            className="grid-cols-1 md:grid-cols-2"
          >
            {/* 좌측: 14끼 식단 + 신선 새벽배송 스택 */}
            <div 
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
                height: '100%',
              }}
            >
              {/* 영역 1: 주 14끼 식단 */}
              <div 
                className="bg-white flex flex-col"
                style={{
                  border: '1px solid #eee',
                  borderRadius: '12px',
                  padding: '24px',
                  flex: '1 1 0',
                }}
              >
                <h3 
                  className="text-stone-900 mb-2"
                  style={{ 
                    fontSize: '20px',
                    fontWeight: 500,
                    letterSpacing: '-0.01em'
                  }}
                >
                  주 14끼 식단
                </h3>
                <p 
                  className="text-stone-600 mb-4"
                  style={{ 
                    fontSize: '14px',
                    fontWeight: 400,
                    lineHeight: '1.6'
                  }}
                >
                  하루 2끼, 일주일치 완벽한 식단
                </p>
                <div 
                  className="mx-auto"
                  style={{ 
                    width: '60%',
                    aspectRatio: '1 / 1',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #FFE5E5 0%, #FFB3D9 100%)',
                    marginTop: 'auto'
                  }}
                />
              </div>
              
              {/* 영역 2: 신선 새벽 배송 */}
              <div 
                className="bg-white flex flex-col"
                style={{
                  border: '1px solid #eee',
                  borderRadius: '12px',
                  padding: '24px',
                  flex: '1 1 0',
                }}
              >
                <h3 
                  className="text-stone-900 mb-2"
                  style={{ 
                    fontSize: '20px',
                    fontWeight: 500,
                    letterSpacing: '-0.01em'
                  }}
                >
                  신선 새벽 배송
                </h3>
                <p 
                  className="text-stone-600 mb-4"
                  style={{ 
                    fontSize: '14px',
                    fontWeight: 400,
                    lineHeight: '1.6'
                  }}
                >
                  매주 월요일 아침, 문 앞까지 신선하게
                </p>
                <div 
                  className="mx-auto"
                  style={{ 
                    width: '60%',
                    aspectRatio: '1 / 1',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #C8E6C9 0%, #1B5E20 100%)',
                    marginTop: 'auto'
                  }}
                />
              </div>
            </div>
            
            {/* 영역 3: 영양 밸런스 완벽 설계 */}
            <div 
              className="bg-white flex flex-col"
              style={{
                border: '1px solid #eee',
                borderRadius: '12px',
                padding: '24px',
                height: '100%',
              }}
            >
              <h3 
                className="text-stone-900 mb-2"
                style={{ 
                  fontSize: '20px',
                  fontWeight: 500,
                  letterSpacing: '-0.01em'
                }}
              >
                영양 밸런스 완벽 설계
              </h3>
              <p 
                className="text-stone-600 mb-4"
                style={{ 
                  fontSize: '14px',
                  fontWeight: 400,
                  lineHeight: '1.6'
                }}
              >
                전문가와 AI가 설계한 균형 잡힌 식단
              </p>
              <div 
                className="mx-auto"
                style={{ 
                  width: '60%',
                  aspectRatio: '1 / 1',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #E1BEE7 0%, #9C27B0 50%, #4CAF50 100%)',
                  marginTop: 'auto'
                }}
              />
            </div>
          </div>
          
          {/* 하단 CTA 버튼 */}
          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <Link 
              to="/subscribe"
              style={{
                display: 'inline-block',
                padding: '12px 24px',
                border: 'none',
                backgroundColor: '#B2B2B2',
                color: '#FFFFFF',
                fontSize: '15px',
                fontWeight: 400,
                textDecoration: 'none',
                transition: 'all 0.15s ease',
                minHeight: '44px',
                minWidth: '120px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#8C451D';
                e.currentTarget.style.color = '#FFFFFF';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#B2B2B2';
                e.currentTarget.style.color = '#FFFFFF';
              }}
            >
              슬런치 위클리 보러가기
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 2: Featured Recipes - Infinite Rolling Mosaic
          ============================================ */}
      <section
        className="scroll-snap-section-flex"
        style={{
          paddingTop: '80px',
          paddingBottom: '80px',
          backgroundColor: '#FDFBF7',
          overflow: 'hidden',
        }}
      >
        {/* 섹션 헤더 */}
        <div className="page-container mb-12">
          <div className="max-w-3xl">
            <h2
              className="text-stone-900 mb-4 text-left font-normal"
              style={{
                fontSize: 'var(--font-size-h2)',
                fontWeight: 400,
                letterSpacing: 'var(--letter-spacing-tight)',
                lineHeight: 'var(--line-height-h2)',
              }}
            >
              누군가의 테이블에서 영감을
            </h2>
            <p
              className="text-stone-600 text-left"
              style={{
                fontSize: 'var(--font-size-body)',
                fontWeight: 400,
                lineHeight: 'var(--line-height-body)',
                letterSpacing: 'var(--letter-spacing-tight)',
              }}
            >
              슬런치 멤버들이 직접 만들고 공유하는 레시피.
            </p>
          </div>
        </div>

        {/* 무한 롤링 컨테이너 */}
        <div style={{ position: 'relative', width: '100%' }}>
          <style>
            {`
              @keyframes scrollLeft {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
              }
              .infinite-scroll-track {
                display: flex;
                gap: 12px;
                animation: scrollLeft 60s linear infinite;
                width: fit-content;
              }
              .infinite-scroll-track:hover {
                animation-play-state: paused;
              }
            `}
          </style>

          <div className="infinite-scroll-track">
            {/* 20개 원본 + 20개 복제 = 40개 아이템 */}
            {[...Array(2)].map((_, setIndex) => (
              <React.Fragment key={setIndex}>
                {[
                  // 신규 레시피 (5개)
                  { id: 101, title: '콩나물 비빔밥', description: '고소한 참기름 향 가득', author: '비건셰프', type: 'tall' },
                  { id: 102, title: '당근 라페 샌드위치', description: '아삭한 식감이 일품', author: '채식러버', type: 'wide' },
                  { id: 103, title: '올리브 파스타', description: '지중해 풍미 가득', author: '이탈리안', type: 'standard' },
                  { id: 104, title: '피스타치오 페스토', description: '고급스러운 녹색 소스', author: '홈쿡러', type: 'tall' },
                  { id: 105, title: '무화과 샐러드', description: '달콤한 제철 과일과 함께', author: '계절요리', type: 'wide' },
                  // 점심 레시피 (5개)
                  { id: 201, title: '두부 덮밥', description: '든든한 단백질 한 그릇', author: '점심왕', type: 'standard' },
                  { id: 202, title: '야채 카레', description: '향신료 가득한 건강식', author: '카레매니아', type: 'tall' },
                  { id: 203, title: '비빔국수', description: '새콤달콤 입맛 돋우는', author: '면요리사', type: 'wide' },
                  { id: 204, title: '샐러드 랩', description: '간편하고 건강한 한 끼', author: '다이어터', type: 'standard' },
                  { id: 205, title: '버섯 덮밥', description: '쫄깃한 식감의 영양밥', author: '버섯사랑', type: 'tall' },
                  // 디저트 레시피 (5개)
                  { id: 301, title: '코코넛 푸딩', description: '열대의 달콤함을 담아', author: '디저트왕', type: 'wide' },
                  { id: 302, title: '블루베리 타르트', description: '상큼한 보라빛 유혹', author: '베이커리', type: 'standard' },
                  { id: 303, title: '망고스틴 아이스크림', description: '이국적인 과일의 향연', author: '아이스크림', type: 'tall' },
                  { id: 304, title: '포도 젤리', description: '탱글탱글 보석같은', author: '젤리장인', type: 'wide' },
                  { id: 305, title: '라즈베리 무스', description: '부드럽고 새콤한', author: '무스마스터', type: 'standard' },
                  // 한식 레시피 (5개)
                  { id: 401, title: '배추된장국', description: '구수한 된장의 깊은 맛', author: '한식셰프', type: 'tall' },
                  { id: 402, title: '마늘종 볶음', description: '밥도둑 반찬의 정석', author: '반찬왕', type: 'wide' },
                  { id: 403, title: '생강차', description: '몸을 따뜻하게 해주는', author: '차전문가', type: 'standard' },
                  { id: 404, title: '파전', description: '비 오는 날의 필수템', author: '전요리사', type: 'tall' },
                  { id: 405, title: '고추장 비빔밥', description: '매콤 달콤 환상 조합', author: '비빔밥러버', type: 'wide' },
                ].map((recipe, index) => {
                  // 카드 사이즈 결정
                  const getCardStyle = () => {
                    switch (recipe.type) {
                      case 'tall':
                        return { width: '220px', height: '320px' };
                      case 'wide':
                        return { width: '320px', height: '220px' };
                      default:
                        return { width: '240px', height: '240px' };
                    }
                  };
                  const cardStyle = getCardStyle();

                  return (
                    <Link
                      key={`${setIndex}-${recipe.id}`}
                      to={`/recipe/${recipe.id}`}
                      style={{
                        display: 'block',
                        flexShrink: 0,
                        ...cardStyle,
                        position: 'relative',
                        overflow: 'hidden',
                        borderRadius: '8px',
                      }}
                    >
                      {/* 이미지 */}
                      <img
                        src={getRecipeThumbnailImage(recipe.id)}
                        alt={recipe.title}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                        loading="lazy"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = getFallbackRecipeImage(recipe.id);
                        }}
                      />

                      {/* 그라데이션 오버레이 */}
                      <div
                        style={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          right: 0,
                          height: '60%',
                          background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)',
                        }}
                      />

                      {/* 텍스트 오버레이 */}
                      <div
                        style={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          right: 0,
                          padding: '16px',
                          color: '#fff',
                        }}
                      >
                        <p
                          style={{
                            fontSize: '10px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                            marginBottom: '6px',
                            opacity: 0.8,
                          }}
                        >
                          @{recipe.author}
                        </p>
                        <h3
                          style={{
                            fontSize: recipe.type === 'wide' ? '14px' : '13px',
                            fontWeight: 400,
                            lineHeight: 1.3,
                            margin: 0,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                          }}
                        >
                          {recipe.title}
                        </h3>
                      </div>
                    </Link>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* View all 버튼 */}
        <div style={{ textAlign: 'center', marginTop: '48px' }}>
          <Link
            to="/recipe"
            style={{
              display: 'inline-block',
              padding: '12px 24px',
              border: 'none',
              backgroundColor: '#B2B2B2',
              color: '#FFFFFF',
              fontSize: '15px',
              fontWeight: 400,
              textDecoration: 'none',
              transition: 'all 0.15s ease',
              minHeight: '44px',
              minWidth: '120px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#8C451D';
              e.currentTarget.style.color = '#FFFFFF';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#B2B2B2';
              e.currentTarget.style.color = '#FFFFFF';
            }}
          >
            View all
          </Link>
        </div>
      </section>


      {/* ============================================
          SECTION 4: Newsletter Preview
          ============================================ */}
      <section 
        className="scroll-snap-section-flex"
        style={{ backgroundColor: '#D7D7D7', padding: '80px 0' }}
      >
        <div className="page-container">
          {/* 섹션 제목 */}
            <h2 
              style={{ 
                fontSize: '24px',
                fontWeight: 400,
                letterSpacing: '-0.02em',
                lineHeight: 1.2,
                color: '#000000',
                marginBottom: '32px'
              }}
            >
              뉴스레터
            </h2>

          {/* 4열 그리드 */}
          <div className="grid grid-cols-2 lg:grid-cols-4" style={{ gap: '24px' }}>
            {[
              { id: 1, category: 'Health', title: '멈춰야 보이는 것들', subtitle: '번아웃을 겪고 나서야 깨달은 것들', author: 'Josin', date: '2024.12.10' },
              { id: 2, category: 'Culture', title: '2060년, 나는 마흔이 된다', subtitle: '초고령 사회를 앞둔 Z세대의 고민', author: 'Huna', date: '2024.12.05' },
              { id: 3, category: 'Food', title: '냉장고를 열면 한 끼가 보인다', subtitle: '배달 앱 골드 등급이 집밥을 시작한 이유', author: 'ChaCha', date: '2024.11.28' },
              { id: 4, category: 'Life', title: '"그 영화 재밌어" 다음에 할 말', subtitle: '소개팅에서 영화 이야기 잘하는 법', author: 'Jin', date: '2024.11.20' },
            ].map((article) => (
              <Link key={article.id} to="/newsletter" className="cursor-pointer group">
                {/* 이미지 - 4:3 비율 */}
                <div
                  className="relative w-full overflow-hidden"
                  style={{ aspectRatio: '4/3', backgroundColor: '#E5E5E0', borderRadius: '4px', marginBottom: '16px' }}
                >
                  {/* 플레이스홀더 */}
                </div>
                {/* 카테고리 - 대문자 */}
                <p
                  style={{
                    fontSize: '11px',
                    fontWeight: 400,
                    letterSpacing: '0.05em',
                    color: '#6B6B6B',
                    marginBottom: '8px',
                    textTransform: 'uppercase'
                  }}
                >
                  {article.category}
                </p>
                {/* 제목 */}
                <h3
                  className="group-hover:underline line-clamp-2"
                  style={{
                    fontSize: '16px',
                    fontWeight: 400,
                    lineHeight: 1.3,
                    color: '#000000',
                    marginBottom: '6px'
                  }}
                >
                  {article.title}
                </h3>
                {/* 설명 */}
                <p
                  className="line-clamp-1"
                  style={{
                    fontSize: '13px',
                    fontWeight: 400,
                    lineHeight: 1.5,
                    color: '#6B6B6B',
                    marginBottom: '12px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {article.subtitle}
                </p>
                {/* 메타 정보 - 작성자 · 날짜 */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '12px',
                    color: '#9A9A9A'
                  }}
                >
                  <span>{article.author}</span>
                  <span>·</span>
                  <span>{article.date}</span>
                </div>
              </Link>
            ))}
          </div>

          {/* View all 버튼 */}
          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <Link 
              to="/newsletter"
              style={{
                display: 'inline-block',
                padding: '12px 24px',
                border: 'none',
                backgroundColor: '#B2B2B2',
                color: '#FFFFFF',
                fontSize: '15px',
                fontWeight: 400,
                textDecoration: 'none',
                transition: 'all 0.15s ease',
                minHeight: '44px',
                minWidth: '120px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#8C451D';
                e.currentTarget.style.color = '#FFFFFF';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#B2B2B2';
                e.currentTarget.style.color = '#FFFFFF';
              }}
            >
              View all
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================
          이미지 영역
          ============================================ */}
      <section className="w-full" style={{ backgroundColor: '#000000', paddingTop: '0', paddingBottom: '0' }}>
        <div 
          style={{ 
            width: '100%',
            height: '980px',
            backgroundColor: '#D7D7D7',
            borderRadius: '0'
          }}
        />
      </section>

      {/* ============================================
          하단 CTA 섹션 - 지금 시작해보세요
          ============================================ */}
      <section className="w-full" style={{ backgroundColor: '#000000', paddingTop: '80px', paddingBottom: '80px' }}>
        <div className="page-container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 
              className="mb-6 font-normal"
              style={{ 
                fontSize: 'var(--font-size-h2)',
                fontWeight: 400,
                letterSpacing: 'var(--letter-spacing-tight)',
                lineHeight: 'var(--line-height-h2)',
                color: '#FFFFFF'
              }}
            >
              지금 시작해보세요
            </h2>
            <p 
              className="mb-10 max-w-2xl mx-auto"
              style={{ 
                fontSize: 'var(--font-size-body)',
                fontWeight: 400,
                lineHeight: 'var(--line-height-body)',
                letterSpacing: 'var(--letter-spacing-tight)',
                color: '#FFFFFF'
              }}
            >
              슬런치와 함께 느긋한 식탁 문화를 경험하고, AI가 제안하는 개인화된 건강 관리를 시작해보세요.
              <br />
              첫 방문 고객을 위한 특별 할인 혜택도 준비되어 있습니다.
            </p>
            <button
              onClick={() => {
                containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              style={{
                display: 'inline-block',
                padding: '12px 24px',
                border: 'none',
                backgroundColor: '#B2B2B2',
                color: '#FFFFFF',
                fontSize: '15px',
                fontWeight: 400,
                textDecoration: 'none',
                transition: 'all 0.15s ease',
                minHeight: '44px',
                minWidth: '120px',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#8C451D';
                e.currentTarget.style.color = '#FFFFFF';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#B2B2B2';
                e.currentTarget.style.color = '#FFFFFF';
              }}
            >
              지금 테스트하고 식단 추천받기
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};
