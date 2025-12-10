import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Plus, Upload, Trophy } from 'lucide-react';
import { COLORS } from '../constants/colors';

// 카테고리별 레시피 데이터
interface Recipe {
  id: number;
  title: string;
  description: string;
  image: string;
  author?: string;
  likes?: number;
}

interface RecipeCategory {
  id: string;
  title: string;
  subtitle: string;
  recipes: Recipe[];
}

// 인기 레시피 데이터
const popularRecipes: Recipe[] = [
  {
    id: 1,
    title: '두부 스테이크',
    description: '크리미한 버섯 소스와 구운 채소를 곁들인',
    image: '/vege_flot_img/mushroom.png',
  },
  {
    id: 2,
    title: '비건 파스타',
    description: '발사믹 토마토 소스와 신선한 바질을 곁들인',
    image: '/vege_flot_img/tomato.png',
  },
  {
    id: 3,
    title: '아보카도 샐러드 볼',
    description: '구운 감자 웨지와 신선한 채소를 곁들인',
    image: '/vege_flot_img/avocado.png',
  },
  {
    id: 4,
    title: '버섯 리조또',
    description: '치즈 풍미 가득한 크리미 주키니와 토마토를 곁들인',
    image: '/vege_flot_img/mushroom.png',
  },
  {
    id: 5,
    title: '채소 볶음밥',
    description: '브로콜리와 당근을 곁들인 건강한 한 끼',
    image: '/vege_flot_img/broccoli.png',
  },
  {
    id: 6,
    title: '레몬 허브 샐러드',
    description: '상큼한 레몬 드레싱과 신선한 허브를 곁들인',
    image: '/vege_flot_img/lemon.png',
  },
  {
    id: 7,
    title: '고구마 수프',
    description: '부드럽고 달콤한 비건 수프',
    image: '/vege_flot_img/sweet potato.png',
  },
  {
    id: 8,
    title: '망고 스무디 볼',
    description: '열대 과일과 그래놀라를 곁들인',
    image: '/vege_flot_img/mango.png',
  },
];

// 카테고리별 색상 매핑
const categoryColors: Record<string, { text: string; bg: string }> = {
  new: COLORS.lightLime,
  lunch: COLORS.lincolnGreen,
  dessert: COLORS.babyPink,
  korean: COLORS.bloodRed,
  drink: COLORS.darkCerulean,
  date: COLORS.grape,
};

// 카테고리별 레시피 데이터
const recipeCategories: RecipeCategory[] = [
  {
    id: 'new',
    title: '이번 주 새로 올라온 레시피',
    subtitle: '신규레시피',
    recipes: [
      { id: 101, title: '콩나물 비빔밥', description: '고소한 참기름 향 가득', image: '/vege_flot_img/edamame.png', author: '비건셰프', likes: 234 },
      { id: 102, title: '당근 라페 샌드위치', description: '아삭한 식감이 일품', image: '/vege_flot_img/carrot.png', author: '채식러버', likes: 189 },
      { id: 103, title: '올리브 파스타', description: '지중해 풍미 가득', image: '/vege_flot_img/olive.png', author: '이탈리안', likes: 156 },
      { id: 104, title: '피스타치오 페스토', description: '고급스러운 녹색 소스', image: '/vege_flot_img/pistachio.png', author: '홈쿡러', likes: 312 },
      { id: 105, title: '무화과 샐러드', description: '달콤한 제철 과일과 함께', image: '/vege_flot_img/fig.png', author: '계절요리', likes: 278 },
    ],
  },
  {
    id: 'lunch',
    title: '맛있는 점심으로 하루 채우기',
    subtitle: '점심',
    recipes: [
      { id: 201, title: '두부 덮밥', description: '든든한 단백질 한 그릇', image: '/vege_flot_img/lettuce.png', author: '점심왕', likes: 445 },
      { id: 202, title: '야채 카레', description: '향신료 가득한 건강식', image: '/vege_flot_img/potato.png', author: '카레매니아', likes: 389 },
      { id: 203, title: '비빔국수', description: '새콤달콤 입맛 돋우는', image: '/vege_flot_img/chili pepper.png', author: '면요리사', likes: 521 },
      { id: 204, title: '샐러드 랩', description: '간편하고 건강한 한 끼', image: '/vege_flot_img/green bean.png', author: '다이어터', likes: 298 },
      { id: 205, title: '버섯 덮밥', description: '쫄깃한 식감의 영양밥', image: '/vege_flot_img/mushroom.png', author: '버섯사랑', likes: 367 },
    ],
  },
  {
    id: 'dessert',
    title: '디저트는 내 삶의 낙이야',
    subtitle: '디저트',
    recipes: [
      { id: 301, title: '코코넛 푸딩', description: '열대의 달콤함을 담아', image: '/vege_flot_img/coconut.png', author: '디저트왕', likes: 623 },
      { id: 302, title: '블루베리 타르트', description: '상큼한 보라빛 유혹', image: '/vege_flot_img/blueberry.png', author: '베이커리', likes: 578 },
      { id: 303, title: '망고스틴 아이스크림', description: '이국적인 과일의 향연', image: '/vege_flot_img/mangosteen.png', author: '아이스크림', likes: 445 },
      { id: 304, title: '포도 젤리', description: '탱글탱글 보석같은', image: '/vege_flot_img/grape.png', author: '젤리장인', likes: 389 },
      { id: 305, title: '라즈베리 무스', description: '부드럽고 새콤한', image: '/vege_flot_img/raspberry.png', author: '무스마스터', likes: 512 },
    ],
  },
  {
    id: 'korean',
    title: '할머니 손맛이 그리울 때',
    subtitle: '한식',
    recipes: [
      { id: 401, title: '배추된장국', description: '구수한 된장의 깊은 맛', image: '/vege_flot_img/napa cabbage.png', author: '한식셰프', likes: 734 },
      { id: 402, title: '마늘종 볶음', description: '밥도둑 반찬의 정석', image: '/vege_flot_img/garlic.png', author: '반찬왕', likes: 623 },
      { id: 403, title: '생강차', description: '몸을 따뜻하게 해주는', image: '/vege_flot_img/ginger.png', author: '차전문가', likes: 456 },
      { id: 404, title: '파전', description: '비 오는 날의 필수템', image: '/vege_flot_img/leek.png', author: '전요리사', likes: 589 },
      { id: 405, title: '고추장 비빔밥', description: '매콤 달콤 환상 조합', image: '/vege_flot_img/pepper.png', author: '비빔밥러버', likes: 678 },
    ],
  },
  {
    id: 'drink',
    title: '오늘 한 잔, 안주는 내가 만들게',
    subtitle: '술안주',
    recipes: [
      { id: 501, title: '땅콩 조림', description: '짭짤하고 고소한', image: '/vege_flot_img/peanut.png', author: '술꾼', likes: 445 },
      { id: 502, title: '옥수수 치즈구이', description: '달콤 짭짤 중독성', image: '/vege_flot_img/corn.png', author: '안주왕', likes: 534 },
      { id: 503, title: '아스파라거스 구이', description: '고급스러운 바 스타일', image: '/vege_flot_img/asparagus.png', author: '바텐더', likes: 367 },
      { id: 504, title: '브로콜리 튀김', description: '바삭한 식감의 매력', image: '/vege_flot_img/broccoli.png', author: '튀김장인', likes: 423 },
      { id: 505, title: '딜 감자튀김', description: '허브 향 가득한', image: '/vege_flot_img/dill.png', author: '감자사랑', likes: 489 },
    ],
  },
  {
    id: 'date',
    title: '오늘 저녁, 특별한 사람과 함께',
    subtitle: '데이트',
    recipes: [
      { id: 601, title: '트러플 리조또', description: '로맨틱한 저녁을 위해', image: '/vege_flot_img/mushroom.png', author: '로맨티스트', likes: 789 },
      { id: 602, title: '레몬 파스타', description: '상큼한 지중해 풍미', image: '/vege_flot_img/lemon.png', author: '파스타장인', likes: 656 },
      { id: 603, title: '복숭아 카프레제', description: '여름밤의 상큼함', image: '/vege_flot_img/peach.png', author: '샐러드마스터', likes: 534 },
      { id: 604, title: '키위 모히또', description: '청량한 칵테일 한 잔', image: '/vege_flot_img/kiwi.png', author: '믹솔로지스트', likes: 612 },
      { id: 605, title: '리치 샴페인', description: '달콤한 축배를 위해', image: '/vege_flot_img/lychee.png', author: '소믈리에', likes: 567 },
    ],
  },
];

// 재사용 가능한 캐러셀 컴포넌트
const RecipeCarousel: React.FC<{ 
  recipes: Recipe[]; 
  showAuthor?: boolean;
  categoryColor?: { text: string; bg: string };
}> = ({ recipes, showAuthor = false, categoryColor }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (dir: 'left' | 'right') => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir === 'left' ? -320 : 320, behavior: 'smooth' });
      setTimeout(checkScroll, 300);
    }
  };

  return (
    <div className="relative group">
      {canScrollLeft && (
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 bg-white rounded-none shadow-lg flex items-center justify-center hover:bg-stone-50 transition-all opacity-0 group-hover:opacity-100"
        >
          <ChevronLeft className="w-6 h-6 text-stone-700" />
        </button>
      )}
      {canScrollRight && (
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 bg-white rounded-none shadow-lg flex items-center justify-center hover:bg-stone-50 transition-all opacity-0 group-hover:opacity-100"
        >
          <ChevronRight className="w-6 h-6 text-stone-700" />
        </button>
      )}
      <div
        ref={scrollRef}
        onScroll={checkScroll}
        className="flex gap-5 overflow-x-auto no-scrollbar pb-4"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {recipes.map((recipe, idx) => (
          <Link
            key={recipe.id}
            to={`/recipe/${recipe.id}`}
            className="flex-shrink-0 w-[260px] cursor-pointer group/card"
            style={{ scrollSnapAlign: 'start' }}
          >
            <div 
              className="relative w-full aspect-square rounded-none overflow-hidden mb-3"
              style={{ 
                backgroundColor: categoryColor ? categoryColor.bg : 
                  idx % 4 === 0 ? COLORS.lightLime.bg :
                  idx % 4 === 1 ? COLORS.grape.bg :
                  idx % 4 === 2 ? COLORS.babyPink.bg :
                  COLORS.darkCerulean.bg
              }}
            >
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-full object-contain p-6 group-hover/card:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/0 group-hover/card:bg-black/10 transition-colors duration-300 rounded-none" />
            </div>
            <h3 className="font-bold text-stone-900 text-base mb-1 group-hover/card:text-green-700 transition-colors">
              {recipe.title}
            </h3>
            <p className="text-stone-500 text-sm leading-relaxed line-clamp-1">
              {recipe.description}
            </p>
            {showAuthor && recipe.author && (
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-stone-400">by {recipe.author}</span>
                <span className="text-xs text-stone-400">❤️ {recipe.likes?.toLocaleString()}</span>
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

// 중앙 정렬 스와이프 캐러셀 컴포넌트
const PopularRecipesCarousel: React.FC<{ recipes: Recipe[] }> = ({ recipes }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const cardColors = [
    COLORS.lightLime,
    COLORS.grape,
    COLORS.babyPink,
    COLORS.darkCerulean,
    COLORS.pastelMagenta,
    COLORS.lincolnGreen,
    COLORS.bloodRed,
    COLORS.brilliantRose,
  ];

  const goToSlide = (index: number) => {
    if (index < 0) index = recipes.length - 1;
    if (index >= recipes.length) index = 0;
    setCurrentIndex(index);
    setTranslateX(0);
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const diff = e.clientX - startX;
    setTranslateX(diff);
  };

  const handlePointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    if (translateX > 80) {
      goToSlide(currentIndex - 1);
    } else if (translateX < -80) {
      goToSlide(currentIndex + 1);
    } else {
      setTranslateX(0);
    }
  };

  // 자동 슬라이드
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isDragging) {
        goToSlide(currentIndex + 1);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex, isDragging]);

  return (
    <section 
      className="mb-20 -mx-4 sm:-mx-6 lg:-mx-8 xl:-mx-12 2xl:-mx-20 py-16 overflow-hidden"
      style={{ backgroundColor: COLORS.sinopia.bg }}
    >
      {/* 헤더 */}
      <div className="page-container mb-10">
        <div className="flex items-end justify-between">
          <div>
            <span 
              className="inline-block px-3 py-1 text-sm font-semibold tracking-wide uppercase mb-3"
              style={{ backgroundColor: COLORS.goldenBrown.bg, color: COLORS.goldenBrown.text }}
            >
              ⭐ Featured
            </span>
            <h2 
              className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight"
              style={{ color: COLORS.sinopia.text }}
            >
              Most Popular<br />Meals and Recipes
            </h2>
          </div>
          <Link 
            to="/recipe/hall-of-fame" 
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all shadow-lg flex-shrink-0 ml-4 mb-2 hover:scale-105"
            style={{ backgroundColor: COLORS.goldenBrown.bg, color: COLORS.goldenBrown.text }}
          >
            <Trophy className="w-4 h-4" />
            <span>명예의 전당</span>
          </Link>
        </div>
        <p className="text-lg mt-3" style={{ color: `${COLORS.sinopia.text}99` }}>
          Check out our most favorited recipes!
        </p>
      </div>

      {/* 캐러셀 */}
      <div 
        ref={containerRef}
        className="relative select-none"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      >
        <div className="flex items-center justify-center gap-4 sm:gap-8 px-4">
          {recipes.map((recipe, idx) => {
            const cardColor = cardColors[idx % cardColors.length];
            const distance = idx - currentIndex;
            const isActive = idx === currentIndex;
            
            // 순환 처리
            let adjustedDistance = distance;
            if (distance > recipes.length / 2) adjustedDistance = distance - recipes.length;
            if (distance < -recipes.length / 2) adjustedDistance = distance + recipes.length;
            
            const scale = isActive ? 1 : 0.75;
            const opacity = Math.abs(adjustedDistance) > 2 ? 0 : isActive ? 1 : 0.6;
            const zIndex = isActive ? 10 : 10 - Math.abs(adjustedDistance);
            const xOffset = adjustedDistance * 280 + (isDragging ? translateX : 0);
            
            return (
              <Link
                key={recipe.id}
                to={isActive ? `/recipe/${recipe.id}` : '#'}
                onClick={(e) => {
                  if (!isActive) {
                    e.preventDefault();
                    goToSlide(idx);
                  }
                }}
                className="absolute transition-all duration-500 ease-out"
                style={{
                  transform: `translateX(${xOffset}px) scale(${scale})`,
                  opacity,
                  zIndex,
                  pointerEvents: Math.abs(adjustedDistance) > 2 ? 'none' : 'auto',
                }}
              >
                {/* 카드 */}
                <div 
                  className="w-[280px] sm:w-[320px] overflow-hidden shadow-2xl"
                  style={{ backgroundColor: cardColor.bg }}
                >
                  {/* 이미지 */}
                  <div className="relative aspect-[4/5]">
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      className="w-full h-full object-contain p-8"
                      draggable={false}
                    />
                    {/* 순위 뱃지 (원형) */}
                    {idx < 3 && (
                      <div 
                        className="absolute top-4 left-4 w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold shadow-lg"
                        style={{ backgroundColor: cardColor.text, color: cardColor.bg }}
                      >
                        {idx + 1}
                      </div>
                    )}
                  </div>
                  {/* 텍스트 */}
                  <div className="p-5" style={{ backgroundColor: cardColor.bg }}>
                    <h3 
                      className="font-bold text-xl mb-2"
                      style={{ color: cardColor.text }}
                    >
                      {recipe.title}
                    </h3>
                    <p 
                      className="text-sm opacity-80"
                      style={{ color: cardColor.text }}
                    >
                      {recipe.description}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* 네비게이션 버튼 */}
        <button
          onClick={() => goToSlide(currentIndex - 1)}
          className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white flex items-center justify-center shadow-lg transition-all z-20"
        >
          <ChevronLeft className="w-6 h-6 text-stone-700" />
        </button>
        <button
          onClick={() => goToSlide(currentIndex + 1)}
          className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white flex items-center justify-center shadow-lg transition-all z-20"
        >
          <ChevronRight className="w-6 h-6 text-stone-700" />
        </button>
      </div>

      {/* 인디케이터 */}
      <div className="flex justify-center gap-2 mt-10">
        {recipes.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToSlide(idx)}
            className="w-2 h-2 rounded-full transition-all"
            style={{
              backgroundColor: idx === currentIndex ? COLORS.sinopia.text : `${COLORS.sinopia.text}40`,
              width: idx === currentIndex ? '24px' : '8px',
            }}
          />
        ))}
      </div>
    </section>
  );
};

const RecipePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="page-container py-10">
        
        {/* 상단 헤더 + 레시피 작성 버튼 */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-stone-900">Recipe</h1>
            <p className="text-stone-500 mt-1">다양한 비건 레시피를 만나보세요</p>
          </div>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-none font-medium text-sm transition-colors shadow-lg shadow-green-600/25">
            <Upload className="w-4 h-4" />
            <span>레시피 작성</span>
          </button>
        </div>

        {/* 인기 레시피 섹션 - 풀와이드 중앙 캐러셀 */}
        <PopularRecipesCarousel recipes={popularRecipes} />

        {/* 카테고리별 섹션들 */}
        {recipeCategories.map((category) => {
          const colors = categoryColors[category.id] || COLORS.lincolnGreen;
          return (
            <section key={category.id} className="mb-14">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <span 
                    className="inline-block px-3 py-1 text-xs font-semibold tracking-wide uppercase mb-2 rounded-none"
                    style={{ backgroundColor: colors.bg, color: colors.text }}
                  >
                    {category.subtitle}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-stone-900">
                    {category.title}
                  </h2>
                </div>
                <button className="text-stone-600 hover:text-stone-900 underline underline-offset-4 text-sm font-medium flex-shrink-0 ml-4">
                  See all
                </button>
              </div>
              <div className="mt-6">
                <RecipeCarousel recipes={category.recipes} showAuthor categoryColor={colors} />
              </div>
            </section>
          );
        })}

        {/* 레시피 작성 CTA */}
        <section className="py-16 border-t border-stone-200">
          <div className="text-center max-w-xl mx-auto">
            <div className="w-16 h-16 bg-green-100 rounded-none flex items-center justify-center mx-auto mb-6">
              <Plus className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-stone-900 mb-3">
              나만의 레시피를 공유해보세요
            </h3>
            <p className="text-stone-500 mb-6">
              당신의 특별한 비건 레시피를 슬런치 커뮤니티와 함께 나눠보세요.
              <br />다른 유저들에게 영감을 줄 수 있어요!
            </p>
            <button className="inline-flex items-center gap-2 px-8 py-3 bg-stone-900 hover:bg-stone-800 text-white rounded-none font-medium transition-colors">
              <Upload className="w-5 h-5" />
              <span>레시피 작성하기</span>
            </button>
          </div>
        </section>

      </div>
    </div>
  );
};

export default RecipePage;

