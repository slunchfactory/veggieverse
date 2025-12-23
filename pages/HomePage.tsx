import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { X, ArrowRight } from 'lucide-react';
import { getHomeProductImage } from '../utils/productImages';

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
              className="relative bg-[#292624] pointer-events-auto animate-fadeIn overflow-hidden rounded-2xl"
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
                  className="relative w-full overflow-hidden bg-[#292624] rounded-t-2xl"
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
                
                <div className="w-full bg-[#292624] p-8 flex flex-col justify-center rounded-b-2xl">
                  <div className="flex flex-col items-center text-center gap-3">
                    <h2 id="test-modal-title" className="text-[18px] font-semibold text-white flex items-center gap-2">
                      <span aria-hidden="true">🥗</span> 나의 스피릿 찾기
                    </h2>
                    <span className="text-[14px] text-stone-400 leading-relaxed">
                      좋아하는 채소 3개를 선택하고 나만의 비건 페르소나를 발견해보세요!
                    </span>
                    <Link 
                      to="/"
                      onClick={dismissToast}
                      className="mt-2 px-6 py-2.5 text-[13px] font-medium transition-colors hover:opacity-90"
                      style={{ backgroundColor: '#E54B1A', color: '#292624' }}
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
        style={{ backgroundColor: '#292624', top: `${headerOffset + 16}px` }}
      >
        <span className="text-lg">🥗</span>
        <span className="text-[11px] font-medium text-stone-300">비건 테스트</span>
      </button>

      {/* ============================================
          HERO SECTION - Full-width Impact Banner
          ============================================ */}
      <section 
        ref={heroRef}
        className="scroll-snap-section relative w-full h-screen overflow-hidden"
        style={{ 
          background: 'linear-gradient(135deg, #54271d 0%, #3d1c12 100%)'
        }}
      >
        {/* 배경 이미지 */}
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`,
            transition: 'transform 0.1s ease-out'
          }}
        >
          <img 
            src={`${import.meta.env.BASE_URL}main/banner/main-banner-1.png`}
            alt="비건 음식"
            className="w-full h-full object-cover"
          />
        </div>

        {/* 플로팅 캐릭터들 (Parallax 효과) */}
        <div 
          className="absolute top-20 right-10 w-32 h-32 opacity-60"
          style={{
            transform: `translateY(${scrollY * 0.3}px) translateX(${Math.sin(scrollY * 0.01) * 10}px)`,
            transition: 'transform 0.1s ease-out'
          }}
        >
          <img 
            src={`${import.meta.env.BASE_URL}characters/slunch-character.png`}
            alt="슬런치 캐릭터"
            className="w-full h-full object-contain"
          />
        </div>

        {/* 메인 카피 & CTA */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <h1 
            className="text-white font-bold mb-6 leading-tight"
            style={{ 
              fontSize: 'clamp(2rem, 8vw, 5rem)',
              textShadow: '0 4px 20px rgba(0,0,0,0.3)',
              wordBreak: 'keep-all',
              overflowWrap: 'break-word'
            }}
          >
            채소들이 만드는<br />
            맛있는 우주,<br />
            <span style={{ color: '#E54B1A' }}>Veggieverse</span>
          </h1>
          <p 
            className="text-white/90 mb-8 max-w-2xl"
            style={{ 
              fontSize: 'clamp(1rem, 2vw, 1.5rem)',
              textShadow: '0 2px 10px rgba(0,0,0,0.2)'
            }}
          >
            건강한 비건 식단으로 시작하는 새로운 하루
          </p>
          <Link
            to="/store"
            className="inline-flex items-center gap-2 px-8 py-4 text-lg font-bold text-stone-900 transition-all hover:scale-105 hover:shadow-xl"
            style={{ 
              backgroundColor: '#E54B1A',
              borderRadius: '0'
            }}
          >
            지금 구경하기
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

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
          <div className="max-w-3xl mx-auto text-center">
            <h2 
              className="text-stone-900 font-bold mb-6"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
            >
              We are Slunch Factory
            </h2>
            <p 
              className="text-stone-700 leading-relaxed mb-8"
              style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)' }}
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
          SLUNCH WEEKLY - Dedicated Feature Section
          ============================================ */}
      <section className="scroll-snap-section-flex section-spacing relative overflow-hidden" style={{ backgroundColor: '#fef9e7' }}>
        <div className="page-container">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
            {/* 왼쪽 영역 (60%) - 이미지 */}
            <div className="w-full lg:w-[60%] relative">
              <div 
                className="w-full overflow-hidden relative"
                style={{ 
                  aspectRatio: '3/4', 
                  backgroundColor: '#e5ded8',
                  borderRadius: '4px'
                }}
              >
                {/* 도시락/패키지 이미지 자리 */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-stone-400 text-sm">슬런치 위클리 패키지 이미지</span>
                </div>
                
                {/* 배달 모자 캐릭터 (Absolute Position) */}
                <div 
                  className="absolute -bottom-4 -right-4 w-24 h-24 lg:w-32 lg:h-32 z-10"
                  style={{
                    transform: `translateY(${scrollY * 0.15}px)`,
                    transition: 'transform 0.1s ease-out'
                  }}
                >
                  <img 
                    src={`${import.meta.env.BASE_URL}characters/slunch-character.png`}
                    alt="슬런치 캐릭터"
                    className="w-full h-full object-contain drop-shadow-lg"
                  />
                </div>
              </div>
            </div>
            
            {/* 오른쪽 영역 (40%) - 텍스트 & CTA */}
            <div className="w-full lg:w-[40%] flex flex-col justify-center">
              <h2 
                className="text-stone-900 font-bold mb-4 leading-tight"
                style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)' }}
              >
                고민 없는 건강한 일주일,<br />
                <span style={{ color: '#E54B1A' }}>Slunch Weekly</span>
              </h2>
              
              <p 
                className="text-stone-700 mb-8 leading-relaxed"
                style={{ fontSize: 'clamp(1rem, 1.5vw, 1.125rem)' }}
              >
                하루 2끼, 균형 잡힌 비건 식단을 문 앞까지.<br />
                내 몸을 위한 가장 쉬운 선택.
              </p>
              
              {/* Key Points */}
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🥗</span>
                  <div>
                    <p className="text-stone-900 font-semibold mb-1" style={{ fontSize: 'clamp(0.875rem, 1.5vw, 1rem)' }}>
                      주 14끼 식단
                    </p>
                    <p className="text-stone-600 text-sm">하루 2끼, 일주일치 완벽한 식단</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🚚</span>
                  <div>
                    <p className="text-stone-900 font-semibold mb-1" style={{ fontSize: 'clamp(0.875rem, 1.5vw, 1rem)' }}>
                      신선 새벽 배송
                    </p>
                    <p className="text-stone-600 text-sm">매주 아침, 문 앞까지 신선하게</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🌱</span>
                  <div>
                    <p className="text-stone-900 font-semibold mb-1" style={{ fontSize: 'clamp(0.875rem, 1.5vw, 1rem)' }}>
                      영양 밸런스 완벽 설계
                    </p>
                    <p className="text-stone-600 text-sm">전문가가 설계한 균형 잡힌 식단</p>
                  </div>
                </div>
              </div>
              
              {/* CTA Button */}
              <Link
                to="/store"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold text-white transition-all hover:scale-105 hover:shadow-xl w-full lg:w-auto"
                style={{ 
                  backgroundColor: '#E54B1A',
                  borderRadius: '0'
                }}
              >
                이번 주 식단 보러가기
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 2: Best Menu/Goods (3:4 Grid)
          ============================================ */}
      <section className="scroll-snap-section-flex bg-white section-spacing">
        <div className="page-container">
          <div className="text-center mb-12">
            <h2 
              className="text-stone-900 font-bold mb-4"
              style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)' }}
            >
              오늘의 기분엔 이 메뉴!
            </h2>
            <p className="text-stone-600" style={{ fontSize: 'clamp(0.875rem, 1.5vw, 1.125rem)' }}>
              슬런치 팩토리의 인기 메뉴와 굿즈를 만나보세요
            </p>
          </div>
          
          {/* 3:4 비율 그리드 - 모바일 2열, 데스크톱 4열 */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {FEATURED_ITEMS.map((item, idx) => {
              const imageUrl = getHomeProductImage(idx);
              return (
                <Link 
                  key={item.id} 
                  to="/store" 
                  className="group cursor-pointer"
                >
                  <div 
                    className="w-full mb-3 overflow-hidden relative"
                    style={{ 
                      aspectRatio: '3/4', 
                      backgroundColor: idx % 2 === 0 ? '#54271d' : '#6e3d2a',
                      borderRadius: '4px'
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
                        <span className="text-white/30 text-xs">IMG</span>
                      </div>
                    )}
                  </div>
                  <p className="text-[10px] text-stone-500 mb-1 font-medium">{item.microCopy}</p>
                  <p className="text-[13px] text-stone-800 group-hover:text-stone-900 font-semibold mb-1 line-clamp-2">
                    {item.name}
                  </p>
                  <p className="text-[12px] text-stone-600 font-bold">KRW {item.price.toLocaleString()}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 3: Magazine/Content (Image Left + Text Right)
          ============================================ */}
      <section className="scroll-snap-section-flex bg-[#faf9f7] section-spacing">
        <div className="page-container">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
            {/* 이미지 영역 (좌측) */}
            <div className="w-full lg:w-1/2">
              <div 
                className="w-full overflow-hidden relative"
                style={{ 
                  aspectRatio: '4/3', 
                  backgroundColor: '#e5ded8',
                  borderRadius: '4px'
                }}
              >
                {/* 레시피 또는 스토리 이미지 자리 */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-stone-400 text-sm">레시피 이미지</span>
                </div>
              </div>
            </div>
            
            {/* 텍스트 영역 (우측) */}
            <div className="w-full lg:w-1/2">
              <p className="text-[12px] text-stone-500 uppercase tracking-wider mb-3">RECIPE</p>
              <h2 
                className="text-stone-900 font-bold mb-4 leading-tight"
                style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)' }}
              >
                비건 레시피로 시작하는<br />
                건강한 하루
              </h2>
              <p 
                className="text-stone-700 leading-relaxed mb-6"
                style={{ fontSize: 'clamp(0.875rem, 1.5vw, 1.125rem)' }}
              >
                집에서도 쉽게 만들 수 있는 비건 레시피를 공유합니다.
                <br />
                맛있고 건강한 식단으로 일상에 새로운 변화를 가져보세요.
              </p>
              <Link
                to="/recipe"
                className="inline-flex items-center gap-2 text-stone-900 font-semibold hover:underline"
                style={{ fontSize: 'clamp(0.875rem, 1.5vw, 1rem)' }}
              >
                레시피 보기
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 4: Newsletter Preview
          ============================================ */}
      <section className="scroll-snap-section-flex bg-white section-spacing">
        <div className="page-container">
          <div className="flex items-center justify-between mb-8">
            <h2 
              className="text-stone-900 font-bold"
              style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)' }}
            >
              NEWSLETTER
            </h2>
            <Link to="/newsletter" className="text-stone-600 hover:text-stone-900 font-medium">
              VIEW ALL →
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { id: 1, category: 'HEALTH', title: '멈춰야 보이는 것들', subtitle: '번아웃을 겪고 나서야 깨달은 것들', isNew: true },
              { id: 2, category: 'CULTURE', title: '2060년, 나는 마흔이 된다', subtitle: '초고령 사회를 앞둔 Z세대의 고민', isNew: true },
              { id: 3, category: 'FOOD', title: '냉장고를 열면 한 끼가 보인다', subtitle: '배달 앱 골드 등급이 집밥을 시작한 이유', isNew: false },
              { id: 4, category: 'CULTURE', title: '"그 영화 재밌어" 다음에 할 말', subtitle: '소개팅에서 영화 이야기 잘하는 법', isNew: false },
            ].map((article) => (
              <Link key={article.id} to="/newsletter" className="cursor-pointer group">
                <div 
                  className="relative w-full overflow-hidden mb-3"
                  style={{ aspectRatio: '3/4', backgroundColor: '#e5ded8', borderRadius: '4px' }}
                >
                  {article.isNew && (
                    <div 
                      className="absolute top-0 left-0 px-2 py-1 text-[10px] font-bold text-stone-800 z-10"
                      style={{ backgroundColor: '#E54B1A' }}
                    >
                      NEW
                    </div>
                  )}
                </div>
                <p className="text-[10px] text-stone-500 tracking-wider mb-1">{article.category}</p>
                <p className="text-sm font-semibold text-stone-800 group-hover:underline line-clamp-2">
                  {article.title}
                </p>
                <p className="text-xs text-stone-500 mt-1 line-clamp-1">
                  {article.subtitle}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
