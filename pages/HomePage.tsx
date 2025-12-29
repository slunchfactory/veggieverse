import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { X, ArrowRight } from 'lucide-react';
import { getHomeProductImage } from '../utils/productImages';

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
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            {/* 우측 이미지 */}
            <div className="w-1/2 h-full overflow-hidden">
              <img 
                src={slide.rightImage}
                alt=""
                className="w-full h-full object-cover"
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
                      <div className="w-8 h-8 bg-[#BFFF00] flex items-center justify-center">
                        <span className="text-black text-xs">✦</span>
                      </div>
                    </div>
                  </div>
                  <div className="pt-3 bg-black px-3 pb-3">
                    <h4 className="font-bold text-white leading-tight group-hover:underline text-base">
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
                      <div className="w-8 h-8 bg-[#BFFF00] flex items-center justify-center">
                        <span className="text-black text-xs">✦</span>
                      </div>
                    </div>
                  </div>
                  <div className="pt-3 bg-black px-3 pb-3">
                    <h4 className="font-bold text-white leading-tight group-hover:underline text-base">
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
                    <div className="w-6 h-6 bg-[#BFFF00] flex items-center justify-center">
                      <span className="text-black text-[10px]">✦</span>
                    </div>
                  </div>
                </div>
                {/* 카드 정보 (오른쪽) */}
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <h4 className="font-bold text-black leading-tight line-clamp-2 group-hover:underline text-xs">
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
  const [showToast, setShowToast] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const conceptRef = useRef<HTMLDivElement>(null);

  // 스크롤 위치 추적 (Parallax 효과용)
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const dismissToast = () => {
    setShowToast(false);
  };

  const openToast = () => {
    setShowToast(true);
  };

  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: '#ffffff', width: '100%' }}>
      {/* 비건 테스트 모달 팝업 */}
      {showToast && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
            onClick={dismissToast}
          />
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
            role="dialog"
            aria-modal="true"
            aria-labelledby="test-modal-title"
          >
            <div 
              className="relative bg-black pointer-events-auto animate-fadeIn overflow-hidden rounded-2xl"
              style={{ 
                width: '90%',
                maxWidth: '380px',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)'
              }}
            >
              <button 
                onClick={dismissToast}
                className="absolute top-4 right-4 z-10 p-1 transition-opacity hover:opacity-80"
                aria-label="모달 닫기"
              >
                <X className="w-5 h-5 text-white" aria-hidden="true" />
              </button>
              
              <div className="flex flex-col">
                <div 
                  className="relative w-full overflow-hidden bg-black rounded-t-2xl"
                  style={{ 
                    aspectRatio: '1/1',
                    isolation: 'isolate'
                  }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=800"
                    alt="비건 음식"
                    className="w-full h-full object-cover"
                    style={{ 
                      transform: 'translateZ(0) scale(1.05)',
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      width: '100%',
                      height: '100%'
                    }}
                  />
                </div>
                
                <div className="w-full bg-black p-8 flex flex-col justify-center rounded-b-2xl">
                  <div className="flex flex-col items-center text-center gap-3">
                    <h2 id="test-modal-title" className="text-[18px] font-semibold text-white flex items-center gap-2">
                      <span aria-hidden="true">🥗</span> 나의 스피릿 찾기
                    </h2>
                    <span className="text-[14px] text-white/70 leading-relaxed">
                      좋아하는 채소 3개를 선택하고 나만의 비건 페르소나를 발견해보세요!
                    </span>
                    <Link 
                      to="/"
                      onClick={dismissToast}
                      className="mt-2 px-6 py-3 text-[15px] font-semibold transition-colors hover:opacity-90"
                      style={{ 
                        backgroundColor: '#000000', 
                        color: '#FFFFFF',
                        minHeight: '44px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      테스트 시작
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      
      {/* 최소화된 플로팅 버튼 */}
      <button
        onClick={openToast}
        className={`fixed right-6 z-30 px-3 py-2 rounded-none shadow-lg transition-all duration-300 flex items-center gap-2 ${
          showToast ? 'opacity-0 pointer-events-none translate-x-4' : 'opacity-100 translate-x-0'
        }`}
        style={{ backgroundColor: '#000000', top: `${headerOffset + 16}px` }}
      >
        <span className="text-lg">🥗</span>
        <span className="text-[11px] font-medium text-white">비건 테스트</span>
      </button>

      {/* ============================================
          HERO SECTION - 1:1 Split Mood Image Slider
          ============================================ */}
      <MoodSlider />

      {/* ============================================
          SECTION 1: We are Slunch Factory (Concept)
          ============================================ */}
      <section 
        ref={conceptRef}
        className="scroll-snap-section-flex bg-[#faf9f7] section-spacing relative overflow-hidden"
      >
        {/* 배경 캐릭터 (Absolute Position) */}
        <div 
          className="absolute -right-20 top-1/2 -translate-y-1/2 w-64 h-64 opacity-20 pointer-events-none"
          style={{
            transform: `translateY(${scrollY * 0.2}px)`,
            transition: 'transform 0.1s ease-out'
          }}
        >
          <img 
            src={`${import.meta.env.BASE_URL}characters/slunch-character.png`}
            alt="슬런치 캐릭터"
            className="w-full h-full object-contain"
          />
        </div>

        <div className="page-container relative z-10">
          <div className="max-w-3xl mx-auto">
            <h2 
              className="text-stone-900 mb-6 text-center"
              style={{ 
                fontSize: 'var(--font-size-h1)',
                fontWeight: 700,
                letterSpacing: 'var(--letter-spacing-tight)',
                lineHeight: 'var(--line-height-h1)'
              }}
            >
              We are Slunch Factory
            </h2>
            <p 
              className="text-stone-700 mb-8 text-left"
              style={{ 
                fontSize: 'var(--font-size-body)',
                fontWeight: 400,
                lineHeight: 'var(--line-height-body)',
                letterSpacing: 'var(--letter-spacing-tight)'
              }}
            >
              슬런치 팩토리는 건강한 비건 식단을 통해 일상에 새로운 맛과 경험을 전달합니다.
              <br />
              채소들의 이야기로 만든 특별한 요리와 함께, 당신만의 비건 우주를 만들어가세요.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {['Potato', 'Tomato', 'Carrot', 'Broccoli'].map((veggie, idx) => (
                <div 
                  key={idx}
                  className="w-16 h-16 relative"
                  style={{
                    transform: `translateY(${Math.sin(scrollY * 0.01 + idx) * 5}px)`,
                    transition: 'transform 0.1s ease-out'
                  }}
                >
                  <img 
                    src={`${import.meta.env.BASE_URL}vege_flot_img/${veggie.toLowerCase()}.png`}
                    alt={veggie}
                    className="w-full h-full object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          SLUNCH WEEKLY - Dedicated Feature Section (Lofa Style)
          ============================================ */}
      <section 
        className="scroll-snap-section-flex section-spacing relative overflow-visible bg-white"
        style={{ 
          borderTop: '1px solid #000000',
          borderBottom: '1px solid #000000'
        }}
      >
        <div className="page-container">
          <div className="flex flex-col lg:flex-row border border-[#000000]">
            {/* 왼쪽 영역 (60%) - 이미지 */}
            <div 
              className="w-full lg:w-[60%] relative border-r-0 lg:border-r border-[#000000]"
              style={{ borderRight: '1px solid #000000' }}
            >
              <div 
                className="w-full overflow-hidden relative"
                style={{ 
                  aspectRatio: '3/4', 
                  backgroundColor: '#f5f5f5'
                }}
              >
                {/* 도시락/패키지 이미지 자리 */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[#000000] text-sm font-medium">슬런치 위클리 패키지 이미지</span>
                </div>
                
                {/* 배달 모자 캐릭터 (Absolute Position - 모서리에 걸치도록) */}
                <div 
                  className="absolute -bottom-6 -right-6 w-20 h-20 lg:w-28 lg:h-28 z-10"
                  style={{
                    transform: `translateY(${scrollY * 0.15}px)`,
                    transition: 'transform 0.1s ease-out'
                  }}
                >
                  <img 
                    src={`${import.meta.env.BASE_URL}characters/slunch-character.png`}
                    alt="슬런치 캐릭터"
                    className="w-full h-full object-contain"
                    style={{ filter: 'none' }}
                  />
                </div>
              </div>
            </div>
            
            {/* 오른쪽 영역 (40%) - 텍스트 & CTA */}
            <div className="w-full lg:w-[40%] flex flex-col justify-center p-6 lg:p-12">
              <h2 
                className="text-[#000000] mb-6"
                style={{ 
                  fontSize: 'var(--font-size-h1)',
                  fontWeight: 700,
                  letterSpacing: 'var(--letter-spacing-tight)',
                  lineHeight: 'var(--line-height-h1)'
                }}
              >
                고민 없는 건강한 일주일,<br />
                Slunch Weekly
              </h2>
              
              <p 
                className="text-[#000000] mb-10 text-left"
                style={{ 
                  fontSize: 'var(--font-size-body)',
                  fontWeight: 400,
                  lineHeight: 'var(--line-height-body)',
                  letterSpacing: 'var(--letter-spacing-tight)'
                }}
              >
                하루 2끼, 균형 잡힌 비건 식단을 문 앞까지.<br />
                내 몸을 위한 가장 쉬운 선택.
              </p>
              
              {/* Key Points */}
              <div className="space-y-5 mb-10">
                <div className="flex items-start gap-4 border-b border-[#000000] pb-4">
                  <span className="text-2xl leading-none">🥗</span>
                  <div>
                    <p 
                      className="text-[#000000] mb-1" 
                      style={{ 
                        fontSize: 'var(--font-size-body)',
                        fontWeight: 600,
                        letterSpacing: 'var(--letter-spacing-tight)'
                      }}
                    >
                      주 14끼 식단
                    </p>
                    <p 
                      className="text-[#000000]"
                      style={{ 
                        fontSize: 'var(--font-size-ui)',
                        fontWeight: 400,
                        letterSpacing: 'var(--letter-spacing-tight)'
                      }}
                    >
                      하루 2끼, 일주일치 완벽한 식단
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 border-b border-[#000000] pb-4">
                  <span className="text-2xl leading-none">🚚</span>
                  <div>
                    <p 
                      className="text-[#000000] mb-1" 
                      style={{ 
                        fontSize: 'var(--font-size-body)',
                        fontWeight: 600,
                        letterSpacing: 'var(--letter-spacing-tight)'
                      }}
                    >
                      신선 새벽 배송
                    </p>
                    <p 
                      className="text-[#000000]"
                      style={{ 
                        fontSize: 'var(--font-size-ui)',
                        fontWeight: 400,
                        letterSpacing: 'var(--letter-spacing-tight)'
                      }}
                    >
                      매주 아침, 문 앞까지 신선하게
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <span className="text-2xl leading-none">🌱</span>
                  <div>
                    <p 
                      className="text-[#000000] mb-1" 
                      style={{ 
                        fontSize: 'var(--font-size-body)',
                        fontWeight: 600,
                        letterSpacing: 'var(--letter-spacing-tight)'
                      }}
                    >
                      영양 밸런스 완벽 설계
                    </p>
                    <p 
                      className="text-[#000000]"
                      style={{ 
                        fontSize: 'var(--font-size-ui)',
                        fontWeight: 400,
                        letterSpacing: 'var(--letter-spacing-tight)'
                      }}
                    >
                      전문가가 설계한 균형 잡힌 식단
                    </p>
                  </div>
                </div>
              </div>
              
              {/* CTA Button - Outline Style */}
              <Link
                to="/store"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 font-bold text-[#000000] transition-all w-full lg:w-auto border border-[#000000] hover:bg-[#000000] hover:text-white"
                style={{ 
                  borderRadius: '0',
                  fontSize: 'var(--font-size-ui)',
                  fontWeight: 600,
                  letterSpacing: '-0.01em',
                  minHeight: '44px' /* Touch target minimum */
                }}
              >
                이번 주 식단 보러가기
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          Recipe Video Split Section (from Store)
          ============================================ */}
      <RecipeVideoHero />

      {/* ============================================
          SECTION 2: Best Menu/Goods (4:5 Grid)
          ============================================ */}
      <section className="scroll-snap-section-flex bg-white section-spacing">
        <div className="page-container">
          <div className="mb-12">
            <h2 
              className="text-stone-900 mb-4 text-center"
              style={{ 
                fontSize: 'var(--font-size-h1)',
                fontWeight: 700,
                letterSpacing: 'var(--letter-spacing-tight)',
                lineHeight: 'var(--line-height-h1)'
              }}
            >
              오늘의 기분엔 이 메뉴!
            </h2>
            <p 
              className="text-stone-600 text-center"
              style={{ 
                fontSize: 'var(--font-size-body)',
                fontWeight: 400,
                lineHeight: 'var(--line-height-body)',
                letterSpacing: 'var(--letter-spacing-tight)'
              }}
            >
              슬런치 팩토리의 인기 메뉴와 굿즈를 만나보세요
            </p>
          </div>
          
          {/* 4:5 비율 그리드 - 모바일 2열, 데스크톱 4열 */}
          <div className="grid grid-cols-2 lg:grid-cols-4" style={{ gap: '13px' }}>
            {FEATURED_ITEMS.map((item, idx) => {
              const imageUrl = getHomeProductImage(idx);
              // 할인 정보 (예시 데이터)
              const originalPrice = Math.round(item.price * 1.25);
              const discountRate = Math.round(((originalPrice - item.price) / originalPrice) * 100);
              return (
                <Link 
                  key={item.id} 
                  to="/store" 
                  className="group cursor-pointer"
                >
                  <div 
                    className="w-full overflow-hidden relative"
                    style={{ 
                      aspectRatio: '4/5', 
                      backgroundColor: '#F5F5F5',
                      borderRadius: '0'
                    }}
                  >
                    {imageUrl ? (
                      <img 
                        src={imageUrl}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                        decoding="async"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-stone-400 text-xs">IMG</span>
                      </div>
                    )}
                  </div>
                  {/* 상품명 */}
                  <h3 
                    className="group-hover:underline line-clamp-1"
                    style={{ 
                      fontSize: '16px',
                      fontWeight: 700,
                      color: '#000000',
                      marginTop: '16px',
                      marginBottom: '6px'
                    }}
                  >
                    {item.name.replace('슬런치 ', '')}
                  </h3>
                  {/* 설명 */}
                  <p 
                    style={{ 
                      fontSize: '14px',
                      fontWeight: 400,
                      color: '#6B6B6B',
                      marginBottom: '10px'
                    }}
                  >
                    {item.microCopy}
                  </p>
                  {/* 원래 가격 */}
                  <p 
                    style={{ 
                      fontSize: '13px',
                      fontWeight: 400,
                      color: '#999999',
                      textDecoration: 'line-through',
                      marginBottom: '4px'
                    }}
                  >
                    {originalPrice.toLocaleString()}원
                  </p>
                  {/* 할인율 + 할인가 */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span 
                      style={{ 
                        display: 'inline-block',
                        padding: '2px 8px',
                        fontSize: '11px',
                        fontWeight: 600,
                        backgroundColor: '#BFFF00',
                        color: '#000000'
                      }}
                    >
                      {discountRate}%
                    </span>
                    <span 
                      style={{ 
                        fontSize: '16px',
                        fontWeight: 600,
                        color: '#000000'
                      }}
                    >
                      {item.price.toLocaleString()}원
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* View all 버튼 */}
          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <Link 
              to="/store"
              style={{
                display: 'inline-block',
                padding: '12px 24px',
                border: '1px solid #000000',
                color: '#000000',
                fontSize: '15px',
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'all 0.15s ease',
                minHeight: '44px',
                minWidth: '120px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#000000';
                e.currentTarget.style.color = '#FFFFFF';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#000000';
              }}
            >
              View all
            </Link>
          </div>
        </div>
      </section>


      {/* ============================================
          SECTION 4: Newsletter Preview
          ============================================ */}
      <section 
        className="scroll-snap-section-flex"
        style={{ backgroundColor: '#000000', padding: '80px 0' }}
      >
        <div className="page-container">
          {/* 섹션 제목 */}
          <h2 
            style={{ 
              fontSize: '24px',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
              color: '#FFFFFF',
              marginBottom: '32px'
            }}
          >
            뉴스레터
          </h2>

          {/* 4열 그리드 */}
          <div className="grid grid-cols-2 lg:grid-cols-4" style={{ gap: '13px' }}>
            {[
              { id: 1, category: 'HEALTH', title: '멈춰야 보이는 것들', subtitle: '번아웃을 겪고 나서야 깨달은 것들', isNew: false },
              { id: 2, category: 'CULTURE', title: '2060년, 나는 마흔이 된다', subtitle: '초고령 사회를 앞둔 Z세대의 고민', isNew: false },
              { id: 3, category: 'FOOD', title: '냉장고를 열면 한 끼가 보인다', subtitle: '배달 앱 골드 등급이 집밥을 시작한 이유', isNew: false },
              { id: 4, category: 'LIFE', title: '"그 영화 재밌어" 다음에 할 말', subtitle: '소개팅에서 영화 이야기 잘하는 법', isNew: false },
            ].map((article) => (
              <Link key={article.id} to="/newsletter" className="cursor-pointer group">
                {/* 이미지 */}
                <div 
                  className="relative w-full overflow-hidden"
                  style={{ aspectRatio: '1/1', backgroundColor: '#333333', borderRadius: '0', marginBottom: '16px' }}
                >
                  {/* 플레이스홀더 */}
                </div>
                {/* 카테고리 */}
                <p 
                  style={{ 
                    fontSize: '11px',
                    fontWeight: 600,
                    letterSpacing: '0.05em',
                    color: '#6B6B6B',
                    marginBottom: '8px'
                  }}
                >
                  {article.category}
                </p>
                {/* 제목 - 흰색 */}
                <h3 
                  className="group-hover:underline line-clamp-2"
                  style={{ 
                    fontSize: '16px',
                    fontWeight: 700,
                    lineHeight: 1.4,
                    color: '#FFFFFF',
                    marginBottom: '8px'
                  }}
                >
                  {article.title}
                </h3>
                {/* 설명 */}
                <p 
                  className="line-clamp-2"
                  style={{ 
                    fontSize: '13px',
                    lineHeight: 1.5,
                    color: '#999999'
                  }}
                >
                  {article.subtitle}
                </p>
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
                border: '1px solid #FFFFFF',
                color: '#FFFFFF',
                fontSize: '15px',
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'all 0.15s ease',
                minHeight: '44px',
                minWidth: '120px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#BFFF00';
                e.currentTarget.style.borderColor = '#BFFF00';
                e.currentTarget.style.color = '#000000';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.borderColor = '#FFFFFF';
                e.currentTarget.style.color = '#FFFFFF';
              }}
            >
              View all
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
