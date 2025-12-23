import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { getHomeProductImage } from '../utils/productImages';

// 히어로 슬라이드 데이터
const HERO_SLIDES = [
  {
    id: 1,
    title: '비건 채식주의자들을 위한',
    subtitle: '레스토랑, 슬런치 팩토리',
    image: 'main/banner/main-banner-1.png',
  },
  {
    id: 2,
    title: 'From Nature with Slow',
    subtitle: '자연에서 온 건강한 비건 푸드',
    image: 'main/main-banner-2.png',
  },
  {
    id: 3,
    title: '비건 밀키트 출시',
    subtitle: '집에서도 슬런치의 맛을 즐기세요',
    image: 'main/main-banner-3.png',
  },
  {
    id: 4,
    title: 'Slow Lunch',
    subtitle: 'Full of Abundance',
    image: 'main/main-banner-4.png',
  },
];

// 추천 상품 데이터
const FEATURED_PRODUCTS = [
  {
    id: 1,
    name: '슬런치 김치볶음밥 밀키트(2인분)',
    description: '젓갈이 들어가지 않은 비건 캔김치로 구성한 김치볶음밥 밀키트',
    price: 12000,
    originalPrice: 15000,
  },
  {
    id: 2,
    name: '슬런치 시금치 뇨끼',
    description: '계란, 우유, 버터를 넣지 않은 비건 뇨끼',
    price: 18000,
    originalPrice: 24000,
  },
  {
    id: 3,
    name: '슬런치 블루베리 타르트',
    description: '슬런치 팩토리 프리미엄 블루베리 타르트',
    price: 39000,
    originalPrice: 44000,
  },
];

// 메인 섹션 썸네일용 6개 리스트
const MAIN_THUMB_ITEMS = [
  { id: 'm1', name: '슬런치 김치볶음밥 밀키트(2인분)', price: 12000 },
  { id: 'm2', name: '슬런치 시금치 뇨끼', price: 18000 },
  { id: 'm3', name: '슬런치 블루베리 타르트', price: 39000 },
  { id: 'm4', name: '슬런치 잠봉뵈르', price: 8000 },
  { id: 'm5', name: '슬런치 오리엔탈 셀러드(2인분)', price: 24000 },
  { id: 'm6', name: '슬런치 김치전', price: 13000 },
];

interface HomePageProps {
  headerOffset?: number;
}

export const HomePage: React.FC<HomePageProps> = ({ headerOffset = 96 }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showToast, setShowToast] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [currentStoreIndex, setCurrentStoreIndex] = useState(0);

  // 드래그 중이 아닐 때만 자동 슬라이드
  useEffect(() => {
    if (isDragging) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isDragging]);

  const dismissToast = () => {
    setShowToast(false);
  };

  const openToast = () => {
    setShowToast(true);
  };

  // 드래그 핸들러
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    setIsDragging(true);
    setStartX(clientX);
    setCurrentX(clientX);
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    setCurrentX(clientX);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    
    const diff = currentX - startX;
    
    // 80px 이상 드래그하면 슬라이드 변경
    if (diff > 80) {
      setCurrentSlide((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1));
    } else if (diff < -80) {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }
    
    setIsDragging(false);
    setStartX(0);
    setCurrentX(0);
  };

  const dragOffset = isDragging ? currentX - startX : 0;

  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: '#ffffff', width: '100%' }}>
      {/* 비건 테스트 모달 팝업 */}
      {showToast && (
        <>
          {/* 배경 오버레이 */}
          <div 
            className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
            onClick={dismissToast}
          />
          {/* 모달 팝업 */}
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
              {/* 닫기 버튼 */}
              <button 
                onClick={dismissToast}
                className="absolute top-4 right-4 z-10 p-1 transition-opacity hover:opacity-80"
                aria-label="모달 닫기"
              >
                <X className="w-5 h-5 text-white" aria-hidden="true" />
              </button>
              
              <div className="flex flex-col">
                {/* 이미지 섹션 (1:1 비율) - 위쪽 */}
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
                
                {/* 텍스트 섹션 - 아래쪽 */}
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
      
      {/* 최소화된 플로팅 버튼 - 토스트가 닫혔을 때 표시 */}
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

      {/* 히어로 배너 슬라이더 */}
      <div 
        className="scroll-snap-section relative h-[500px] overflow-hidden cursor-grab active:cursor-grabbing select-none"
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
      >
        {/* 슬라이드 컨테이너 */}
        <div 
          className={`flex h-full ${isDragging ? '' : 'transition-transform duration-700 ease-in-out'}`}
          style={{ transform: `translateX(calc(-${currentSlide * 100}% + ${dragOffset}px))` }}
        >
          {HERO_SLIDES.map((slide, index) => (
            <div 
              key={index}
              className="min-w-full h-full relative flex-shrink-0"
              style={{ backgroundColor: '#54271d' }}
            >
              {/* 배경 이미지 */}
              <img 
                src={`${import.meta.env.BASE_URL}${slide.image}`}
                alt={slide.title}
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                draggable={false}
              />
              {/* 텍스트 오버레이 - 하단 섹션과 동일한 여백 */}
              <div className="absolute bottom-20 left-0 w-full">
                <div className="page-container px-6 sm:px-8 text-left">
                  <p 
                    className="font-medium text-[#E54B1A] leading-relaxed drop-shadow-lg"
                    style={{ 
                      fontSize: 'clamp(1.25rem, 3vw, 2rem)',
                      wordBreak: 'keep-all',
                      overflowWrap: 'break-word'
                    }}
                  >
                    {slide.title}
                  </p>
                  <p 
                    className="font-medium text-[#E54B1A] drop-shadow-lg mt-2"
                    style={{ 
                      fontSize: 'clamp(1.25rem, 3vw, 2rem)',
                      wordBreak: 'keep-all',
                      overflowWrap: 'break-word'
                    }}
                  >
                    {slide.subtitle}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* 슬라이드 인디케이터 - 분리됨, 중앙 배치 */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {HERO_SLIDES.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-none transition-colors ${
                index === currentSlide ? 'bg-white' : 'bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>
      
      {/* 매거진 스타일 레이아웃 - Full-width Split Screen */}
      <div 
        className="scroll-snap-section relative w-full lg:h-[calc(100vh-500px)] lg:min-h-[600px] overflow-hidden"
      >
        <div className="h-full flex flex-col lg:flex-row relative items-stretch">
          {/* 왼쪽 컬럼 - 텍스트 + 상품 그리드 (Black 배경) */}
          <div 
            className="w-full lg:w-[50%] relative z-10 bg-black flex flex-col"
            style={{ minHeight: '100%' }}
          >
            {/* 내부 콘텐츠 패딩 */}
            <div className="w-full h-full p-6 sm:p-8 lg:p-12">
              {/* 텍스트 헤더 */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {/* 타이틀 - 첫번째 이미지 위치 */}
                <h2 
                  className="font-bold text-white leading-snug"
                  style={{ 
                    fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                    wordBreak: 'keep-all',
                    overflowWrap: 'break-word'
                  }}
                >
                  건강한 비건식으로 삶의 균형 맞추기
                </h2>
                
                {/* 설명 - 두번째 이미지 위치 */}
                <div>
                  <p 
                    className="text-stone-300 leading-relaxed"
                    style={{ 
                      fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)',
                      wordBreak: 'keep-all',
                      overflowWrap: 'break-word'
                    }}
                  >
                    매장에서만 즐겼던 맛있고 건강한 비건요리를
                  </p>
                  <p 
                    className="text-stone-300 mb-3"
                    style={{ 
                      fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)',
                      wordBreak: 'keep-all',
                      overflowWrap: 'break-word'
                    }}
                  >
                    이제 집에서도 간편하게 즐겨보세요.
                  </p>
                  <p 
                    className="text-stone-400 leading-relaxed"
                    style={{ 
                      fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)',
                      wordBreak: 'keep-all',
                      overflowWrap: 'break-word'
                    }}
                  >
                    비건 채식주의자들과 일반인들 모두 맛있게 즐길 수 있는
                  </p>
                  <p 
                    className="text-stone-400"
                    style={{ 
                      fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)',
                      wordBreak: 'keep-all',
                      overflowWrap: 'break-word'
                    }}
                  >
                    다채로운 비건 요리를 매장에서도 즐겨보세요
                  </p>
                </div>
              </div>
              
              {/* 상품 그리드 2열 x 3행 (총 6개) */}
              <div className="grid grid-cols-2 gap-4 pb-8">
                {MAIN_THUMB_ITEMS.slice(0, 6).map((product, idx) => {
                  const imageUrl = getHomeProductImage(idx);
                  return (
                    <div key={product.id} className="cursor-pointer group">
                      <div 
                        className="w-full mb-2 overflow-hidden rounded-none relative"
                        style={{ aspectRatio: '4/5', backgroundColor: idx % 2 === 0 ? '#54271d' : '#6e3d2a' }}
                      >
                        {imageUrl ? (
                          <img 
                            src={imageUrl}
                            alt={product.name}
                            className="w-full h-full object-cover"
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
                      <p className="text-[12px] text-stone-200 group-hover:text-white">{product.name}</p>
                      <p className="text-[11px] text-stone-400">KRW {product.price.toLocaleString()}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          
          {/* 오른쪽 컬럼 - 대형 이미지/비디오 영역 (Orange 배경) */}
          <div 
            className="w-full lg:w-[50%] flex justify-center items-center lg:sticky lg:top-0 relative z-0 bg-[#E54B1A]"
            style={{ minHeight: '100%' }}
          >
            <div 
              className="w-full h-full flex items-center justify-center p-6 sm:p-8 lg:p-12"
            >
              {/* 이미지/비디오 자리 */}
            </div>
          </div>
        </div>
      </div>

      {/* 뉴스레터 섹션 */}
      <div className="scroll-snap-section-flex bg-white min-h-screen">
        <div className="page-container p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-bold tracking-wide text-stone-900">NEWSLETTER</h3>
            <Link to="/newsletter" className="text-sm text-stone-600 hover:text-black">VIEW ALL</Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { id: 1, category: 'HEALTH', title: '멈춰야 보이는 것들', subtitle: '번아웃을 겪고 나서야 깨달은 것들', isNew: true },
              { id: 2, category: 'CULTURE', title: '2060년, 나는 마흔이 된다', subtitle: '초고령 사회를 앞둔 Z세대의 고민', isNew: true },
              { id: 3, category: 'FOOD', title: '냉장고를 열면 한 끼가 보인다', subtitle: '배달 앱 골드 등급이 집밥을 시작한 이유', isNew: false },
              { id: 4, category: 'CULTURE', title: '"그 영화 재밌어" 다음에 할 말', subtitle: '소개팅에서 영화 이야기 잘하는 법', isNew: false },
            ].map((article) => (
              <Link key={article.id} to="/newsletter" className="cursor-pointer group">
                <div 
                  className="relative w-full overflow-hidden"
                  style={{ aspectRatio: '4/3', backgroundColor: '#e5ded8' }}
                >
                  {/* 썸네일 자리 */}
                  {article.isNew && (
                    <div 
                      className="absolute top-0 left-0 px-2 py-1 text-[10px] font-bold text-stone-800 z-10"
                      style={{ backgroundColor: '#E54B1A' }}
                    >
                      NEW
                    </div>
                  )}
                </div>
                <p className="mt-2 text-[10px] text-stone-500 tracking-wider">{article.category}</p>
                <p className="text-sm font-semibold text-stone-800 group-hover:underline">
                  {article.title}
                </p>
                <p className="text-xs text-stone-500 mt-1 line-clamp-1">
                  {article.subtitle}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* 지점 정보 섹션 */}
      <div className="scroll-snap-section-flex bg-white min-h-screen">
        <div className="relative">
          <div className="relative overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentStoreIndex * 100}%)` }}
            >
              {/* 홍대점 */}
              <div className="flex-shrink-0 w-full">
                <div className="page-container">
                  <div className="flex flex-col lg:flex-row">
                    {/* 왼쪽 컬럼 - 텍스트 헤더만 (상품 그리드 없음) */}
                    <div className="lg:w-[55%] p-8">
                      {/* 텍스트 헤더 */}
                      <div className="grid grid-cols-2 gap-4 mb-8">
                        {/* 타이틀 */}
                        <h2 className="text-[20px] font-bold text-stone-800 leading-snug">
                          SLUNCH FACTORY<br />HONGDAE STORE
                        </h2>
                        
                        {/* 설명 */}
                        <div>
                          <p className="text-[12px] text-stone-600 leading-relaxed">
                            홍대의 활기찬 거리에서 만나볼 수 있는 슬런치 팩토리.
                          </p>
                          <p className="text-[12px] text-stone-600 mb-3">
                            다양한 비건 메뉴와 함께 일상 속에서 발견하는 새로운 맛의 경험을 제공합니다.
                          </p>
                          <p className="text-[12px] text-stone-500 leading-relaxed">
                            이곳을 방문하는 모든 분들이 세상에 존재하는 수많은 맛의 관점을 발견하고,
                          </p>
                          <p className="text-[12px] text-stone-500">
                            자신만의 이야기를 만들어가길 바랍니다.
                          </p>
                        </div>
                      </div>
                      
                      {/* 지점 상세 정보 */}
                      <div className="space-y-2">
                        <p className="text-[12px] font-medium text-stone-800">주소</p>
                        <p className="text-[11px] text-stone-600">서울특별시 마포구 홍대로</p>
                        <p className="text-[12px] font-medium text-stone-800 mt-4">운영시간</p>
                        <p className="text-[11px] text-stone-600">월-일 11:00 - 22:00</p>
                      </div>
                    </div>
                    
                    {/* 오른쪽 컬럼 - 단색 배경 */}
                    <div className="lg:w-[45%] flex justify-center items-start">
                      <div 
                        className="w-full"
                        style={{ 
                          aspectRatio: '4/5', 
                          backgroundColor: '#54271d',
                          maxWidth: '960px',
                          maxHeight: '1200px'
                        }}
                      >
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 더현대 삼성무역센터점 */}
              <div className="flex-shrink-0 w-full">
                <div className="page-container">
                  <div className="flex flex-col lg:flex-row">
                    {/* 왼쪽 컬럼 - 텍스트 헤더만 (상품 그리드 없음) */}
                    <div className="lg:w-[55%] p-8">
                      {/* 텍스트 헤더 */}
                      <div className="grid grid-cols-2 gap-4 mb-8">
                        {/* 타이틀 */}
                        <h2 className="text-[20px] font-bold text-stone-800 leading-snug">
                          SLUNCH FACTORY<br />THE HYUNDAI<br />SAMSUNG TRADE CENTER STORE
                        </h2>
                        
                        {/* 설명 */}
                        <div>
                          <p className="text-[12px] text-stone-600 leading-relaxed">
                            삼성무역센터 더현대에 위치한 슬런치 팩토리.
                          </p>
                          <p className="text-[12px] text-stone-600 mb-3">
                            오고 가는 사람들의 다양한 관점을 만날 수 있는 공간입니다.
                          </p>
                          <p className="text-[12px] text-stone-500 leading-relaxed">
                            이곳을 방문하는 모든 분들이 세상에 존재하는 수많은 관점을 발견하고,
                          </p>
                          <p className="text-[12px] text-stone-500">
                            자신만의 이야기를 만들어가길 바랍니다.
                          </p>
                        </div>
                      </div>
                      
                      {/* 지점 상세 정보 */}
                      <div className="space-y-2">
                        <p className="text-[12px] font-medium text-stone-800">주소</p>
                        <p className="text-[11px] text-stone-600">서울특별시 강남구 테헤란로</p>
                        <p className="text-[12px] font-medium text-stone-800 mt-4">운영시간</p>
                        <p className="text-[11px] text-stone-600">월-일 10:00 - 21:00</p>
                      </div>
                    </div>
                    
                    {/* 오른쪽 컬럼 - 단색 배경 */}
                    <div className="lg:w-[45%] flex justify-center items-start">
                      <div 
                        className="w-full"
                        style={{ 
                          aspectRatio: '4/5', 
                          backgroundColor: '#54271d',
                          maxWidth: '960px',
                          maxHeight: '1200px'
                        }}
                      >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 좌우 화살표 버튼 */}
            {currentStoreIndex > 0 && (
              <button
                onClick={() => setCurrentStoreIndex(currentStoreIndex - 1)}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white border border-stone-300 rounded-full flex items-center justify-center transition-colors shadow-lg z-10"
                aria-label="이전 지점"
              >
                <ChevronLeft className="w-5 h-5 text-stone-700" />
              </button>
            )}
            {currentStoreIndex < 1 && (
              <button
                onClick={() => setCurrentStoreIndex(currentStoreIndex + 1)}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white border border-stone-300 rounded-full flex items-center justify-center transition-colors shadow-lg z-10"
                aria-label="다음 지점"
              >
                <ChevronRight className="w-5 h-5 text-stone-700" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
