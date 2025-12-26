import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Plus, Upload, Trophy, X, Bookmark, Heart } from 'lucide-react';
import { COLORS } from '../constants/colors';
import { getRecipeThumbnailImage, getFallbackRecipeImage } from '../utils/recipeImages';
import HallOfFameMarquee from '../components/HallOfFameMarquee';

// 카테고리별 레시피 데이터
interface Recipe {
  id: number;
  title: string;
  description: string;
  image: string;
  author?: string;
  likes?: number;
  tags?: string[];
  spiritLikes?: Record<string, number>; // 스피릿 타입별 좋아요 수
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
  new: COLORS.green,
  lunch: COLORS.orange,
  dessert: COLORS.pink,
  korean: COLORS.maroon,
  drink: COLORS.purple,
  date: COLORS.pink,
};

// 섹션 배경색
const sectionBackgrounds: Record<string, string> = {
  new: '#F5F5F0',      // 연한 베이지
  lunch: '#FFFFF0',    // 연한 레몬
  dessert: '#FFF8F0',  // 연한 피치
  korean: '#F0FFF4',   // 연한 민트
  drink: '#F8F0FF',    // 연한 라벤더
  date: '#FFF0F5',     // 연한 핑크
};

// 16가지 비건 유형 (스피릿 정보)
const VEGAN_TYPES = [
  { mbti: 'ENFP', name: 'Bloomist', emoji: '🌻', description: '새로운 거 시도하고 나누는 거 좋아해요', color: '#F3B562' },
  { mbti: 'INFP', name: 'Mindgrower', emoji: '🌿', description: '내 기준이 확실해요. 조용히 생각 많은 편', color: '#A3C585' },
  { mbti: 'INFJ', name: 'Quiet Root', emoji: '🌱', description: '말보다 행동으로 보여주는 타입이에요', color: '#6A8A6B' },
  { mbti: 'ENFJ', name: 'Lightgiver', emoji: '🌼', description: '주변 사람들 챙기는 거 좋아해요. 리더 기질', color: '#F4C97E' },
  { mbti: 'ENTJ', name: 'Forger', emoji: '🔥', description: '효율 중시. 뭐든 체계적으로 해요', color: '#8B7055' },
  { mbti: 'ESTJ', name: 'Groundtype', emoji: '🥦', description: '원칙대로 하는 게 편해요. 현실적인 편', color: '#BCA97E' },
  { mbti: 'ISTJ', name: 'Planter', emoji: '🌰', description: '계획 세워두는 거 좋아해요. 루틴형', color: '#9E8961' },
  { mbti: 'INTJ', name: 'Strategreen', emoji: '🌲', description: '분석하고 설계하는 게 재밌어요', color: '#5D7264' },
  { mbti: 'ISFP', name: 'Floret', emoji: '🌸', description: '예쁜 거, 감각적인 거 좋아해요', color: '#E6B7C1' },
  { mbti: 'ESFP', name: 'Joybean', emoji: '🍑', description: '재밌는 게 최고예요. 분위기 메이커', color: '#F6A880' },
  { mbti: 'ESFJ', name: 'Careleaf', emoji: '🌺', description: '다 같이 잘 먹어야 해요. 배려형', color: '#F2D68A' },
  { mbti: 'ISFJ', name: 'Nurturer', emoji: '🌾', description: '티 안 내고 챙기는 타입이에요', color: '#D6C6A5' },
  { mbti: 'INTP', name: 'Thinkroot', emoji: '🌴', description: '왜 그런지 알아야 해요. 탐구형', color: '#7F9B8A' },
  { mbti: 'ENTP', name: 'Sparknut', emoji: '🍋', description: '다르게 생각하는 거 좋아해요. 아이디어형', color: '#E8D26E' },
  { mbti: 'ISTP', name: 'Craftbean', emoji: '🫘', description: '직접 만들어봐야 알아요. 실험형', color: '#8D8570' },
  { mbti: 'ESTP', name: 'Wildgrain', emoji: '🌶️', description: '일단 해보는 타입. 현장에서 즐겨요', color: '#C19F7B' },
];

// 스피릿별 맞춤 큐레이션 메시지
const getSpiritCurationMessage = (spiritName: string): string => {
  const messages: Record<string, string> = {
    'Bloomist': '새로운 조합 좋아할 것 같아요',
    'Mindgrower': '깔끔하고 건강한 거 모았어요',
    'Quiet Root': '정성 들어간 레시피예요',
    'Lightgiver': '같이 먹으면 더 좋은 거예요',
    'Forger': '빠르고 효율적인 거 모았어요',
    'Groundtype': '영양 밸런스 좋은 거예요',
    'Planter': '검증된 레시피만 모았어요',
    'Strategreen': '효율 좋은 레시피예요',
    'Floret': '예쁘고 감각적인 거예요',
    'Joybean': '만들면서 재밌는 거예요',
    'Careleaf': '푸짐하게 나눠 먹기 좋아요',
    'Nurturer': '속 편하고 건강한 거예요',
    'Thinkroot': '원리 이해하면 쉬운 거예요',
    'Sparknut': '독특한 조합이에요',
    'Craftbean': '직접 만들기 좋은 거예요',
    'Wildgrain': '일단 해보기 좋은 거예요',
  };
  
  return messages[spiritName] || `${spiritName}에게 어울리는 레시피 모아봤어요.`;
};

// 스피릿 타입별 태그 매핑
const spiritTagMapping: Record<string, string[]> = {
  'ENFP': ['새로운시도', '퓨전', '나눔'],
  'INFP': ['건강', '미니멀', '감성'],
  'INFJ': ['건강', '깊은맛', '전통'],
  'ENFJ': ['함께', '푸짐한', '파티'],
  'ENTJ': ['고단백', '효율', '간편'],
  'ESTJ': ['영양균형', '간편', '원팟'],
  'ISTJ': ['전통', '검증된', '루틴'],
  'INTJ': ['고단백', '지속가능', '분석'],
  'ISFP': ['예쁜플레이팅', '감각', '미니멀'],
  'ESFP': ['재밌는', '즉흥', '파티'],
  'ESFJ': ['함께', '푸짐한', '배려'],
  'ISFJ': ['건강', '전통', '배려'],
  'INTP': ['새로운시도', '탐구', '분석'],
  'ENTP': ['퓨전', '독특한', '창의'],
  'ISTP': ['직접만들기', '간편', '실험'],
  'ESTP': ['즉흥', '모험', '현장'],
};

// 레시피에 태그 추가 헬퍼 함수
const addTagsToRecipes = (recipes: Recipe[], tags: string[]): Recipe[] => {
  return recipes.map(recipe => ({
    ...recipe,
    tags: tags,
    spiritLikes: recipe.spiritLikes || {},
  }));
};

// 카테고리별 레시피 데이터
const recipeCategories: RecipeCategory[] = [
  {
    id: 'new',
    title: '이번 주 새로 올라온 레시피',
    subtitle: '신규레시피',
    recipes: addTagsToRecipes([
      { id: 101, title: '콩나물 비빔밥', description: '고소한 참기름 향 가득', image: '/vege_flot_img/edamame.png', author: '비건셰프', likes: 234 },
      { id: 102, title: '당근 라페 샌드위치', description: '아삭한 식감이 일품', image: '/vege_flot_img/carrot.png', author: '채식러버', likes: 189 },
      { id: 103, title: '올리브 파스타', description: '지중해 풍미 가득', image: '/vege_flot_img/olive.png', author: '이탈리안', likes: 156 },
      { id: 104, title: '피스타치오 페스토', description: '고급스러운 녹색 소스', image: '/vege_flot_img/pistachio.png', author: '홈쿡러', likes: 312 },
      { id: 105, title: '무화과 샐러드', description: '달콤한 제철 과일과 함께', image: '/vege_flot_img/fig.png', author: '계절요리', likes: 278 },
    ], ['효율적', '자연주의', '간편조리']),
  },
  {
    id: 'lunch',
    title: '맛있는 점심으로 하루 채우기',
    subtitle: '점심',
    recipes: addTagsToRecipes([
      { id: 201, title: '두부 덮밥', description: '든든한 단백질 한 그릇', image: '/vege_flot_img/lettuce.png', author: '점심왕', likes: 445 },
      { id: 202, title: '야채 카레', description: '향신료 가득한 건강식', image: '/vege_flot_img/potato.png', author: '카레매니아', likes: 389 },
      { id: 203, title: '비빔국수', description: '새콤달콤 입맛 돋우는', image: '/vege_flot_img/chili pepper.png', author: '면요리사', likes: 521 },
      { id: 204, title: '샐러드 랩', description: '간편하고 건강한 한 끼', image: '/vege_flot_img/green bean.png', author: '다이어터', likes: 298 },
      { id: 205, title: '버섯 덮밥', description: '쫄깃한 식감의 영양밥', image: '/vege_flot_img/mushroom.png', author: '버섯사랑', likes: 367 },
    ], ['효율적', '간편조리', '고단백']),
  },
  {
    id: 'dessert',
    title: '디저트는 내 삶의 낙이야',
    subtitle: '디저트',
    recipes: addTagsToRecipes([
      { id: 301, title: '코코넛 푸딩', description: '열대의 달콤함을 담아', image: '/vege_flot_img/coconut.png', author: '디저트왕', likes: 623 },
      { id: 302, title: '블루베리 타르트', description: '상큼한 보라빛 유혹', image: '/vege_flot_img/blueberry.png', author: '베이커리', likes: 578 },
      { id: 303, title: '망고스틴 아이스크림', description: '이국적인 과일의 향연', image: '/vege_flot_img/mangosteen.png', author: '아이스크림', likes: 445 },
      { id: 304, title: '포도 젤리', description: '탱글탱글 보석같은', image: '/vege_flot_img/grape.png', author: '젤리장인', likes: 389 },
      { id: 305, title: '라즈베리 무스', description: '부드럽고 새콤한', image: '/vege_flot_img/raspberry.png', author: '무스마스터', likes: 512 },
    ], ['감성적', '예술적', '즐거움']),
  },
  {
    id: 'korean',
    title: '할머니 손맛이 그리울 때',
    subtitle: '한식',
    recipes: addTagsToRecipes([
      { id: 401, title: '배추된장국', description: '구수한 된장의 깊은 맛', image: '/vege_flot_img/napa cabbage.png', author: '한식셰프', likes: 734 },
      { id: 402, title: '마늘종 볶음', description: '밥도둑 반찬의 정석', image: '/vege_flot_img/garlic.png', author: '반찬왕', likes: 623 },
      { id: 403, title: '생강차', description: '몸을 따뜻하게 해주는', image: '/vege_flot_img/ginger.png', author: '차전문가', likes: 456 },
      { id: 404, title: '파전', description: '비 오는 날의 필수템', image: '/vege_flot_img/leek.png', author: '전요리사', likes: 589 },
      { id: 405, title: '고추장 비빔밥', description: '매콤 달콤 환상 조합', image: '/vege_flot_img/pepper.png', author: '비빔밥러버', likes: 678 },
    ], ['전통', '건강', '효율적']),
  },
  {
    id: 'drink',
    title: '오늘 한 잔, 안주는 내가 만들게',
    subtitle: '술안주',
    recipes: addTagsToRecipes([
      { id: 501, title: '땅콩 조림', description: '짭짤하고 고소한', image: '/vege_flot_img/peanut.png', author: '술꾼', likes: 445 },
      { id: 502, title: '옥수수 치즈구이', description: '달콤 짭짤 중독성', image: '/vege_flot_img/corn.png', author: '안주왕', likes: 534 },
      { id: 503, title: '아스파라거스 구이', description: '고급스러운 바 스타일', image: '/vege_flot_img/asparagus.png', author: '바텐더', likes: 367 },
      { id: 504, title: '브로콜리 튀김', description: '바삭한 식감의 매력', image: '/vege_flot_img/broccoli.png', author: '튀김장인', likes: 423 },
      { id: 505, title: '딜 감자튀김', description: '허브 향 가득한', image: '/vege_flot_img/dill.png', author: '감자사랑', likes: 489 },
    ], ['즐거움', '함께', '간편조리']),
  },
  {
    id: 'date',
    title: '오늘 저녁, 특별한 사람과 함께',
    subtitle: '데이트',
    recipes: addTagsToRecipes([
      { id: 601, title: '트러플 리조또', description: '로맨틱한 저녁을 위해', image: '/vege_flot_img/mushroom.png', author: '로맨티스트', likes: 789 },
      { id: 602, title: '레몬 파스타', description: '상큼한 지중해 풍미', image: '/vege_flot_img/lemon.png', author: '파스타장인', likes: 656 },
      { id: 603, title: '복숭아 카프레제', description: '여름밤의 상큼함', image: '/vege_flot_img/peach.png', author: '샐러드마스터', likes: 534 },
      { id: 604, title: '키위 모히또', description: '청량한 칵테일 한 잔', image: '/vege_flot_img/kiwi.png', author: '믹솔로지스트', likes: 612 },
      { id: 605, title: '리치 샴페인', description: '달콤한 축배를 위해', image: '/vege_flot_img/lychee.png', author: '소믈리에', likes: 567 },
    ], ['함께', '예술적', '로맨틱']),
  },
];

// 모든 레시피를 하나의 배열로 합치기
const allRecipes: Recipe[] = recipeCategories.flatMap(category => category.recipes);

// 스피릿별 좋아요 데이터 시뮬레이션 (실제로는 서버에서 가져와야 함)
const addSpiritLikes = (recipes: Recipe[]): Recipe[] => {
  const spiritTypes = Object.keys(spiritTagMapping);
  return recipes.map(recipe => {
    const spiritLikes: Record<string, number> = {};
    spiritTypes.forEach(spiritType => {
      // 해당 스피릿의 태그와 레시피 태그가 겹치면 좋아요 수 증가
      const spiritTags = spiritTagMapping[spiritType];
      const matchingTags = recipe.tags?.filter(tag => spiritTags.includes(tag)) || [];
      if (matchingTags.length > 0) {
        // 매칭되는 태그 수에 비례하여 좋아요 수 생성
        spiritLikes[spiritType] = Math.floor((recipe.likes || 0) * (0.3 + matchingTags.length * 0.2));
      }
    });
    return { ...recipe, spiritLikes };
  });
};

const recipesWithSpiritLikes = addSpiritLikes(allRecipes);

// 재사용 가능한 캐러셀 컴포넌트 (버튼 외부 노출)
const RecipeCarousel: React.FC<{ 
  recipes: Recipe[]; 
  showAuthor?: boolean;
  categoryColor?: { text: string; bg: string };
  onScrollLeft?: () => void;
  onScrollRight?: () => void;
  scrollRef?: React.RefObject<HTMLDivElement>;
}> = ({ recipes, showAuthor = false, categoryColor, onScrollLeft, onScrollRight, scrollRef: externalRef }) => {
  const internalRef = useRef<HTMLDivElement>(null);
  const scrollRef = externalRef || internalRef;

  return (
    <div 
      ref={scrollRef}
      className="flex overflow-x-auto no-scrollbar pb-4"
      style={{ gap: '16px', scrollBehavior: 'smooth', WebkitOverflowScrolling: 'touch' }}
    >
      {recipes.map((recipe) => (
        <div
          key={recipe.id}
          className="recipe-card flex-shrink-0"
          style={{ 
            width: '260px',
            background: '#F0EDE8',
            borderRadius: '16px',
            padding: '20px 16px',
            cursor: 'pointer',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            transition: 'background 0.15s ease',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = '#E5E0D8'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = '#F0EDE8'; }}
        >
          {/* 상단: 제목 */}
          <Link to={`/recipe/${recipe.id}`}>
            <h3 style={{
              fontSize: '16px',
              fontWeight: 700,
              textAlign: 'center',
              margin: 0,
              marginBottom: '12px',
              color: '#000',
              lineHeight: 1.4,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}>
              {recipe.title}
            </h3>
          </Link>

          {/* 구분선 + 작성자 */}
          <div style={{ borderTop: '2px solid #000', padding: '8px 0', textAlign: 'center' }}>
            <span style={{ fontSize: '12px', color: '#666' }}>@{recipe.author || '슬런치'}</span>
          </div>

          {/* 구분선 + 해시태그 */}
          <div style={{ borderTop: '2px solid #000', padding: '8px 0', textAlign: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '12px', color: '#666' }}>
              {recipe.tags?.slice(0, 3).map(tag => `#${tag}`).join(' ') || '#비건 #건강'}
            </span>
          </div>

          {/* 이미지 (1:1 정사각형) */}
          <Link to={`/recipe/${recipe.id}`}>
            <div style={{
              width: '100%',
              aspectRatio: '1 / 1',
              background: '#000',
              borderRadius: '4px',
              overflow: 'hidden',
            }}>
              <img
                src={getRecipeThumbnailImage(recipe.id)}
                alt={recipe.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                loading="lazy"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = getFallbackRecipeImage(recipe.id);
                }}
              />
            </div>
          </Link>

          {/* 하단: 북마크 왼쪽, 좋아요 오른쪽 */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            padding: '12px 0 0 0',
            marginTop: '12px',
          }}>
            <button 
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
              style={{ 
                background: 'none', 
                border: 'none', 
                cursor: 'pointer', 
                padding: 0,
                fontSize: '18px',
                opacity: 0.6,
                transition: 'opacity 0.15s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.6'; }}
            >
              <Bookmark className="w-5 h-5" style={{ color: '#666' }} />
            </button>
            <span style={{ fontSize: '13px', color: '#6B6B6B', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Heart className="w-4 h-4" style={{ color: '#E53935', fill: '#E53935' }} />
              {recipe.likes?.toLocaleString() || 0}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

// 섹션 컴포넌트 (캐러셀 + 헤더 통합)
const RecipeSection: React.FC<{
  category: RecipeCategory;
  index: number;
}> = ({ category, index }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const colors = categoryColors[category.id] || COLORS.lincolnGreen;
  const isOdd = index % 2 === 0;

  const scroll = (dir: 'left' | 'right') => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir === 'left' ? -280 : 280, behavior: 'smooth' });
    }
  };

  const ArrowButton: React.FC<{ direction: 'left' | 'right' }> = ({ direction }) => (
    <button
      onClick={() => scroll(direction)}
      style={{
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        background: '#000',
        border: 'none',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: 'all 0.15s ease',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.background = '#333'; }}
      onMouseLeave={(e) => { e.currentTarget.style.background = '#000'; }}
    >
      {direction === 'left' ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
    </button>
  );

  return (
    <section 
      className="recipe-section"
      style={{ 
        width: '100%',
        background: isOdd ? '#F5F5F0' : '#FFFFFF',
        padding: '48px 0',
      }}
    >
      {/* 내부 콘텐츠 - 중앙 정렬 */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 64px' }}>
        {/* 헤더 */}
        <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '24px' }}>
          <div>
            <span 
              style={{
                display: 'inline-block',
                padding: '4px 12px',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                marginBottom: '8px',
                backgroundColor: colors.bg,
                color: colors.text,
              }}
            >
              {category.subtitle}
            </span>
            <Link 
              to={`/recipe?category=${category.id}`}
              style={{
                display: 'block',
                fontSize: '22px',
                fontWeight: 700,
                color: '#000',
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.textDecoration = 'underline'; }}
              onMouseLeave={(e) => { e.currentTarget.style.textDecoration = 'none'; }}
            >
              {category.title} →
            </Link>
          </div>
          {/* 캐러셀 컨트롤 */}
          <div className="carousel-controls" style={{ display: 'flex', gap: '8px' }}>
            <ArrowButton direction="left" />
            <ArrowButton direction="right" />
          </div>
        </div>

        {/* 캐러셀 */}
        <RecipeCarousel 
          recipes={category.recipes} 
          showAuthor 
          categoryColor={colors}
          scrollRef={scrollRef as React.RefObject<HTMLDivElement>}
        />
      </div>
    </section>
  );
};

// 기존 RecipeCarousel 호환용 (스피릿 페이지 등에서 사용)
const LegacyRecipeCarousel: React.FC<{ 
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
    <div className="relative group" style={{ padding: '0 24px' }}>
      {canScrollLeft && (
        <button
          onClick={() => scroll('left')}
          style={{
            position: 'absolute',
            left: '-20px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: '#fff',
            border: '1px solid #000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 10,
            transition: 'all 0.15s ease',
          }}
          onMouseEnter={(e) => { 
            e.currentTarget.style.background = '#000'; 
            e.currentTarget.style.color = '#fff'; 
          }}
          onMouseLeave={(e) => { 
            e.currentTarget.style.background = '#fff'; 
            e.currentTarget.style.color = '#000'; 
          }}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      )}
      {canScrollRight && (
        <button
          onClick={() => scroll('right')}
          style={{
            position: 'absolute',
            right: '-20px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: '#fff',
            border: '1px solid #E5E5E5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 10,
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            transition: 'all 0.15s ease',
          }}
          onMouseEnter={(e) => { 
            e.currentTarget.style.borderColor = '#000'; 
            e.currentTarget.style.background = '#000'; 
            e.currentTarget.style.color = '#fff'; 
          }}
          onMouseLeave={(e) => { 
            e.currentTarget.style.borderColor = '#E5E5E5'; 
            e.currentTarget.style.background = '#fff'; 
            e.currentTarget.style.color = '#000'; 
          }}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      )}
      <div
        ref={scrollRef}
        onScroll={checkScroll}
        className="flex overflow-x-auto no-scrollbar pb-4 w-full"
        style={{ gap: '13px', scrollSnapType: 'x mandatory' }}
      >
        {recipes.map((recipe, idx) => (
          <div
            key={recipe.id}
            className="recipe-card flex-shrink-0"
            style={{ 
              scrollSnapAlign: 'start',
              background: '#F0EDE8',
              borderRadius: '16px',
              padding: '20px 12px',
              cursor: 'pointer',
              overflow: 'hidden',
              width: '280px',
              display: 'flex',
              flexDirection: 'column',
              transition: 'background 0.15s ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#E5E0D8'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = '#F0EDE8'; }}
          >
            {/* 상단: 제목 (중앙 정렬, 2줄) */}
            <Link to={`/recipe/${recipe.id}`}>
              <h3 
                style={{
                  fontSize: '18px',
                  fontWeight: 700,
                  textAlign: 'center',
                  margin: 0,
                  marginBottom: '12px',
                  color: 'var(--black)',
                  lineHeight: 1.4,
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
              >
                {recipe.title}
              </h3>
            </Link>

            {/* 구분선 + 작성자 */}
            <div style={{ borderTop: '2px solid #000000', padding: '8px 0', textAlign: 'center' }}>
              <span style={{ fontSize: '12px', color: '#666' }}>@{recipe.author || '슬런치'}</span>
            </div>

            {/* 구분선 + 해시태그 */}
            <div style={{ borderTop: '2px solid #000000', padding: '8px 0', textAlign: 'center', marginBottom: '12px' }}>
              <span style={{ fontSize: '12px', color: '#666' }}>
                {recipe.tags?.slice(0, 3).map(tag => `#${tag}`).join(' ') || '#비건 #건강'}
              </span>
            </div>

            {/* 이미지 (1:1 정사각형) */}
            <Link to={`/recipe/${recipe.id}`}>
              <div 
                style={{
                  width: '100%',
                  aspectRatio: '1 / 1',
                  background: '#000',
                  borderRadius: '4px',
                  overflow: 'hidden',
                }}
              >
                <img
                  src={getRecipeThumbnailImage(recipe.id)}
                  alt={recipe.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = getFallbackRecipeImage(recipe.id);
                  }}
                />
              </div>
            </Link>

            {/* 하단: 북마크 왼쪽, 좋아요 오른쪽 */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              marginTop: '12px',
              padding: '12px 0 0 0',
            }}>
              <button 
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  cursor: 'pointer', 
                  padding: 0,
                  opacity: 0.6,
                  transition: 'opacity 0.15s ease',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.6'; }}
              >
                <Bookmark className="w-5 h-5" style={{ color: '#666' }} />
              </button>
              <span style={{ fontSize: '13px', color: '#6B6B6B', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Heart className="w-4 h-4" style={{ color: '#E53935', fill: '#E53935' }} />
                {recipe.likes?.toLocaleString() || 0}
              </span>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

// 원형 캐러셀 데이터 (20개)
const circularRecipes = [
  { id: 1, image: '/vege_flot_img/fig.png', color: COLORS.maroon },
  { id: 2, image: '/vege_flot_img/mango.png', color: COLORS.orange },
  { id: 3, image: '/vege_flot_img/lettuce.png', color: COLORS.green },
  { id: 4, image: '/vege_flot_img/avocado.png', color: COLORS.black },
  { id: 5, image: '/vege_flot_img/tomato.png', color: COLORS.pink },
  { id: 6, image: '/vege_flot_img/blueberry.png', color: COLORS.purple },
  { id: 7, image: '/vege_flot_img/carrot.png', color: COLORS.orange },
  { id: 8, image: '/vege_flot_img/lemon.png', color: COLORS.green },
  { id: 9, image: '/vege_flot_img/grape.png', color: COLORS.purple },
  { id: 10, image: '/vege_flot_img/mushroom.png', color: COLORS.maroon },
  { id: 11, image: '/vege_flot_img/broccoli.png', color: COLORS.green },
  { id: 12, image: '/vege_flot_img/corn.png', color: COLORS.orange },
  { id: 13, image: '/vege_flot_img/eggplant.png', color: COLORS.purple },
  { id: 14, image: '/vege_flot_img/cucumber.png', color: COLORS.green },
  { id: 15, image: '/vege_flot_img/pepper.png', color: COLORS.orange },
  { id: 16, image: '/vege_flot_img/spinach.png', color: COLORS.green },
  { id: 17, image: '/vege_flot_img/onion.png', color: COLORS.pink },
  { id: 18, image: '/vege_flot_img/garlic.png', color: COLORS.maroon },
  { id: 19, image: '/vege_flot_img/ginger.png', color: COLORS.orange },
  { id: 20, image: '/vege_flot_img/potato.png', color: COLORS.purple },
];

// 원형 캐러셀 히어로 컴포넌트
// RecipeHeroSection 삭제됨 - HallOfFameMarquee가 히어로 역할

const RecipePage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const spiritName = searchParams.get('spirit');
  const spiritType = searchParams.get('spiritType');

  // 스피릿 타입에 맞는 태그 가져오기
  const spiritTags = useMemo(() => {
    if (!spiritType) return [];
    return spiritTagMapping[spiritType] || [];
  }, [spiritType]);

  // 필터링된 레시피
  const filteredRecipes = useMemo(() => {
    if (!spiritType || spiritTags.length === 0) {
      return recipeCategories;
    }
    
    return recipeCategories.map(category => ({
      ...category,
      recipes: category.recipes.filter(recipe => {
        // 레시피의 태그 중 하나라도 스피릿 태그와 일치하면 포함
        return recipe.tags?.some(tag => spiritTags.includes(tag));
      }),
    })).filter(category => category.recipes.length > 0);
  }, [spiritType, spiritTags]);

  // 스피릿 Pick 레시피 (해당 스피릿 유저들이 가장 많이 좋아요한 레시피)
  const spiritPickRecipes = useMemo(() => {
    if (!spiritType) return [];
    
    return recipesWithSpiritLikes
      .filter(recipe => recipe.spiritLikes?.[spiritType] > 0)
      .sort((a, b) => (b.spiritLikes?.[spiritType] || 0) - (a.spiritLikes?.[spiritType] || 0))
      .slice(0, 6);
  }, [spiritType]);

  const displayCategories = spiritType ? filteredRecipes : recipeCategories;

  // 스피릿에서 진입했는지 확인
  const fromSpirit = spiritName && spiritType;
  
  // 스피릿 타입 정보 가져오기
  const spiritInfo = fromSpirit ? VEGAN_TYPES.find(type => type.mbti === spiritType) : null;

  // 스피릿 진입 시 스크롤 애니메이션
  useEffect(() => {
    if (fromSpirit) {
      setTimeout(() => {
        document.getElementById('spirit-pick')?.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }, 300);
    }
  }, [fromSpirit]);

  // 스피릿 진입 시 레이아웃
  if (fromSpirit && spiritInfo) {
    return (
      <div className="recipe-page min-h-screen overflow-x-hidden w-full" style={{ backgroundColor: '#ffffff' }}>
        {/* 스피릿 전체 섹션 래퍼 (하나의 큰 섹션) */}
        <div 
          className="mb-16"
          style={{
            background: '#EEF2EB',
            padding: '60px 0 80px 0',
          }}
        >
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            {/* 히어로 섹션 */}
            <section className="text-center" style={{ paddingBottom: '48px' }}>
              <div className="text-5xl mb-4">{spiritInfo.emoji}</div>
              <h1 className="text-3xl sm:text-4xl font-bold text-stone-900 mb-2" style={{ fontSize: '32px', fontWeight: 800 }}>
                {spiritName} 추천 레시피
              </h1>
              <p className="text-stone-600" style={{ fontSize: '15px', color: '#6B6B6B' }}>
                "{spiritInfo.description}"
              </p>
            </section>

            {/* 스피릿 PICK 섹션 */}
            {spiritPickRecipes.length > 0 && (
              <section 
                id="spirit-pick"
                style={{
                  padding: '40px 0',
                  borderTop: '1px solid rgba(0, 0, 0, 0.06)',
                }}
              >
                <div className="max-w-7xl mx-auto">
                  <span 
                    className="inline-block px-4 py-1.5 text-xs font-bold tracking-wide uppercase mb-3 rounded-none"
                    style={{ backgroundColor: '#3D4A3A', color: '#FFFFFF' }}
                  >
                    스피릿 PICK
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-2" style={{ fontSize: '24px', fontWeight: 800 }}>
                    {spiritName} 스피릿이 좋아하는 레시피
                  </h2>
                  <p className="text-stone-600 mb-8" style={{ fontSize: '14px', color: '#6B6B6B' }}>
                    {spiritName}과 같은 스피릿들이 가장 많이 좋아한 레시피예요
                  </p>
                  <div className="mt-6">
                    <RecipeCarousel recipes={spiritPickRecipes} showAuthor categoryColor={COLORS.green} />
                  </div>
                </div>
              </section>
            )}

            {/* 큐레이션 섹션 */}
            {displayCategories.length > 0 && (
              <section 
                style={{
                  padding: '40px 0',
                  borderTop: '1px solid rgba(0, 0, 0, 0.06)',
                }}
              >
                <div className="max-w-7xl mx-auto">
                  <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-2">
                    {spiritName}에게 어울리는 레시피
                  </h2>
                  <p className="text-stone-600 mb-8">
                    {getSpiritCurationMessage(spiritName)}
                  </p>
                  <div className="space-y-12">
                    {displayCategories.map((category) => {
                      const colors = categoryColors[category.id] || COLORS.lincolnGreen;
                      return (
                        <div key={category.id}>
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <span 
                                className="inline-block px-3 py-1 text-xs font-semibold tracking-wide uppercase mb-2 rounded-none"
                                style={{ backgroundColor: colors.bg, color: colors.text }}
                              >
                                {category.subtitle}
                              </span>
                              <h3 className="text-xl sm:text-2xl font-bold text-stone-900">
                                {category.title}
                              </h3>
                            </div>
                            <button className="text-stone-600 hover:text-stone-900 underline underline-offset-4 text-sm font-medium flex-shrink-0 ml-4">
                              See all
                            </button>
                          </div>
                          <div className="mt-6">
                            <RecipeCarousel recipes={category.recipes} showAuthor categoryColor={colors} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </section>
            )}

            {/* 스피릿 미션 섹션 */}
            <section 
              style={{
                padding: '40px 0',
                borderTop: '1px solid rgba(0, 0, 0, 0.06)',
              }}
            >
              <div className="text-center max-w-2xl mx-auto">
                <div className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-emerald-100 rounded-none mb-6">
                  <Trophy className="w-5 h-5 text-emerald-700" />
                  <span className="text-emerald-700 font-semibold">스피릿 미션</span>
                </div>
                <h3 className="text-2xl font-bold text-stone-900 mb-3">
                  이 레시피를 만들어보고 후기를 남겨주시면
                </h3>
                <div className="flex items-center justify-center gap-3 mb-6">
                  <span className="text-4xl">{spiritInfo.emoji}</span>
                  <span className="text-2xl font-bold text-emerald-700">{spiritName}</span>
                  <span className="text-4xl">배지를 드려요!</span>
                </div>
                <p className="text-stone-600 mb-8">
                  레시피를 따라 만들어보고 사진과 후기를 공유해주세요.
                  <br />같은 스피릿 유저들과 함께 나누는 즐거움을 경험해보세요!
                </p>
              </div>
            </section>
          </div>
        </div>

        {/* 일반 레시피 섹션들 (흰 배경) */}
        <>
          {/* 명예의 전당 히어로 */}
          <HallOfFameMarquee />

          <div>
            {/* 일반 카테고리 섹션들 */}
            {recipeCategories.map((category, index) => (
              <RecipeSection key={category.id} category={category} index={index} />
            ))}
          </div>
        </>
      </div>
    );
  }

  // 일반 진입 시 (기존 구조 유지)
  return (
    <div className="recipe-page min-h-screen overflow-x-hidden w-full" style={{ backgroundColor: '#ffffff' }}>
      {/* 명예의 전당 히어로 */}
      <HallOfFameMarquee />

      {/* 카테고리별 섹션들 - 각각 별도 영역 (page-container 밖) */}
      {displayCategories.map((category, index) => (
        <RecipeSection key={category.id} category={category} index={index} />
      ))}

      {/* 레시피 작성 CTA */}
      <div className="page-container py-16">
        <section className="border-t border-stone-200 pt-16">
          <div className="text-center max-w-xl mx-auto">
            <div className="w-16 h-16 bg-green-100 rounded-none flex items-center justify-center mx-auto mb-6">
              <Plus className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-stone-900 mb-3">
              {spiritName ? `내 스피릿에 맞는 나만의 레시피 투고하기` : '나만의 레시피를 공유해보세요'}
            </h3>
            <p className="text-stone-500 mb-6">
              {spiritName 
                ? `${spiritName}님의 특성에 맞는 레시피를 자유롭게 올려주세요. 같은 스피릿 유저들에게 영감을 줄 수 있어요!`
                : '당신의 특별한 비건 레시피를 슬런치 커뮤니티와 함께 나눠보세요.\n다른 유저들에게 영감을 줄 수 있어요!'
              }
            </p>
            <button 
              onClick={() => {
                navigate('/recipe?upload=true');
              }}
              className={`inline-flex items-center gap-2 px-8 py-3 rounded-none font-medium transition-colors ${
                spiritName 
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white' 
                  : 'bg-stone-900 hover:bg-stone-800 text-white'
              }`}
            >
              <Upload className="w-5 h-5" />
              <span>{spiritName ? '레시피 투고하기' : '레시피 작성하기'}</span>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default RecipePage;

