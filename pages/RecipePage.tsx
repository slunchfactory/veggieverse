import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Plus, Upload, Trophy, X, ChefHat, Heart } from 'lucide-react';
import { COLORS } from '../constants/colors';
import { getRecipeThumbnailImage, getFallbackRecipeImage } from '../utils/recipeImages';
import { RecipeUploadForm } from '../components/RecipeUploadForm';
import { HallOfFame } from '../components/HallOfFame';
import { BadgeNotification } from '../components/BadgeNotification';
import { useUser } from '../contexts/UserContext';

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
  dietCategory?: string; // 식습관 카테고리 (예: 완전비건)
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

// 카테고리별 색상 매핑 (Grunge Punch - no longer used, kept for compatibility)
const categoryColors: Record<string, { text: string; bg: string }> = {
  new: { text: '#0D0D0D', bg: '#FAF9F6' },
  lunch: { text: '#0D0D0D', bg: '#FFFFFF' },
  dessert: { text: '#0D0D0D', bg: '#FAF9F6' },
  korean: { text: '#0D0D0D', bg: '#FFFFFF' },
  drink: { text: '#0D0D0D', bg: '#FAF9F6' },
  date: { text: '#0D0D0D', bg: '#FAF9F6' },
};

// 스피릿 타입별 태그 매핑
const spiritTagMapping: Record<string, string[]> = {
  'ENFP': ['효율적', '자연주의', '새로운시도', '퓨전'],
  'INFP': ['감성적', '자연주의', '미니멀', '건강'],
  'INFJ': ['효율적', '자연주의', '전통', '건강'],
  'ENFJ': ['효율적', '자연주의', '함께', '건강'],
  'ENTJ': ['효율적', '논리적', '고단백', '간편조리'],
  'ESTJ': ['효율적', '논리적', '간편조리', '원팟요리'],
  'ISTJ': ['효율적', '논리적', '전통', '계획형'],
  'INTJ': ['효율적', '논리적', '고단백', '지속가능'],
  'ISFP': ['감성적', '자연주의', '미니멀', '예술적'],
  'ESFP': ['효율적', '자연주의', '즉흥형', '즐거움'],
  'ESFJ': ['효율적', '자연주의', '함께', '배려'],
  'ISFJ': ['효율적', '자연주의', '전통', '배려'],
  'INTP': ['효율적', '논리적', '새로운시도', '탐구'],
  'ENTP': ['효율적', '자연주의', '새로운시도', '퓨전'],
  'ISTP': ['효율적', '논리적', '간편조리', '직접만들기'],
  'ESTP': ['효율적', '자연주의', '즉흥형', '모험'],
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
      { id: 101, title: '콩나물 비빔밥', description: '고소한 참기름 향 가득', image: '/vege_flot_img/edamame.png', author: '비건셰프', likes: 234, dietCategory: '완전비건' },
      { id: 102, title: '당근 라페 샌드위치', description: '아삭한 식감이 일품', image: '/vege_flot_img/carrot.png', author: '채식러버', likes: 189, dietCategory: '완전비건' },
      { id: 103, title: '올리브 파스타', description: '지중해 풍미 가득', image: '/vege_flot_img/olive.png', author: '이탈리안', likes: 156, dietCategory: '완전비건' },
      { id: 104, title: '피스타치오 페스토', description: '고급스러운 녹색 소스', image: '/vege_flot_img/pistachio.png', author: '홈쿡러', likes: 312, dietCategory: '완전비건' },
      { id: 105, title: '무화과 샐러드', description: '달콤한 제철 과일과 함께', image: '/vege_flot_img/fig.png', author: '계절요리', likes: 278, dietCategory: '완전비건' },
    ], ['효율적', '자연주의', '간편조리']),
  },
  {
    id: 'lunch',
    title: '맛있는 점심으로 하루 채우기',
    subtitle: '점심',
    recipes: addTagsToRecipes([
      { id: 201, title: '두부 덮밥', description: '든든한 단백질 한 그릇', image: '/vege_flot_img/lettuce.png', author: '점심왕', likes: 445, dietCategory: '완전비건' },
      { id: 202, title: '야채 카레', description: '향신료 가득한 건강식', image: '/vege_flot_img/potato.png', author: '카레매니아', likes: 389, dietCategory: '완전비건' },
      { id: 203, title: '비빔국수', description: '새콤달콤 입맛 돋우는', image: '/vege_flot_img/chili pepper.png', author: '면요리사', likes: 521, dietCategory: '완전비건' },
      { id: 204, title: '샐러드 랩', description: '간편하고 건강한 한 끼', image: '/vege_flot_img/green bean.png', author: '다이어터', likes: 298, dietCategory: '완전비건' },
      { id: 205, title: '버섯 덮밥', description: '쫄깃한 식감의 영양밥', image: '/vege_flot_img/mushroom.png', author: '버섯사랑', likes: 367, dietCategory: '완전비건' },
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
      { id: 401, title: '배추된장국', description: '구수한 된장의 깊은 맛', image: '/vege_flot_img/napa cabbage.png', author: '한식셰프', likes: 734, dietCategory: '완전비건' },
      { id: 402, title: '마늘종 볶음', description: '밥도둑 반찬의 정석', image: '/vege_flot_img/garlic.png', author: '반찬왕', likes: 623, dietCategory: '완전비건' },
      { id: 403, title: '생강차', description: '몸을 따뜻하게 해주는', image: '/vege_flot_img/ginger.png', author: '차전문가', likes: 456, dietCategory: '완전비건' },
      { id: 404, title: '파전', description: '비 오는 날의 필수템', image: '/vege_flot_img/leek.png', author: '전요리사', likes: 589, dietCategory: '완전비건' },
      { id: 405, title: '고추장 비빔밥', description: '매콤 달콤 환상 조합', image: '/vege_flot_img/pepper.png', author: '비빔밥러버', likes: 678, dietCategory: '완전비건' },
    ], ['전통', '건강', '효율적']),
  },
  {
    id: 'drink',
    title: '오늘 한 잔, 안주는 내가 만들게',
    subtitle: '술안주',
    recipes: addTagsToRecipes([
      { id: 501, title: '땅콩 조림', description: '짭짤하고 고소한', image: '/vege_flot_img/peanut.png', author: '술꾼', likes: 445, dietCategory: '완전비건' },
      { id: 502, title: '옥수수 치즈구이', description: '달콤 짭짤 중독성', image: '/vege_flot_img/corn.png', author: '안주왕', likes: 534, dietCategory: '유연비건' },
      { id: 503, title: '아스파라거스 구이', description: '고급스러운 바 스타일', image: '/vege_flot_img/asparagus.png', author: '바텐더', likes: 367, dietCategory: '완전비건' },
      { id: 504, title: '브로콜리 튀김', description: '바삭한 식감의 매력', image: '/vege_flot_img/broccoli.png', author: '튀김장인', likes: 423, dietCategory: '완전비건' },
      { id: 505, title: '딜 감자튀김', description: '허브 향 가득한', image: '/vege_flot_img/dill.png', author: '감자사랑', likes: 489, dietCategory: '완전비건' },
    ], ['즐거움', '함께', '간편조리']),
  },
  {
    id: 'date',
    title: '오늘 저녁, 특별한 사람과 함께',
    subtitle: '데이트',
    recipes: addTagsToRecipes([
      { id: 601, title: '트러플 리조또', description: '로맨틱한 저녁을 위해', image: '/vege_flot_img/mushroom.png', author: '로맨티스트', likes: 789, dietCategory: '유연비건' },
      { id: 602, title: '레몬 파스타', description: '상큼한 지중해 풍미', image: '/vege_flot_img/lemon.png', author: '파스타장인', likes: 656, dietCategory: '완전비건' },
      { id: 603, title: '복숭아 카프레제', description: '여름밤의 상큼함', image: '/vege_flot_img/peach.png', author: '샐러드마스터', likes: 534, dietCategory: '완전비건' },
      { id: 604, title: '키위 모히또', description: '청량한 칵테일 한 잔', image: '/vege_flot_img/kiwi.png', author: '믹솔로지스트', likes: 612, dietCategory: '완전비건' },
      { id: 605, title: '리치 샴페인', description: '달콤한 축배를 위해', image: '/vege_flot_img/lychee.png', author: '소믈리에', likes: 567, dietCategory: '완전비건' },
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

// 원형 캐러셀 데이터 (20개) - 모노톤
const circularRecipes = [
  { id: 1, image: '/vege_flot_img/fig.png', color: { text: '#FFFFFF', bg: '#333333' } },
  { id: 2, image: '/vege_flot_img/mango.png', color: { text: '#FFFFFF', bg: '#666666' } },
  { id: 3, image: '/vege_flot_img/lettuce.png', color: { text: '#FFFFFF', bg: '#333333' } },
  { id: 4, image: '/vege_flot_img/avocado.png', color: { text: '#FFFFFF', bg: '#000000' } },
  { id: 5, image: '/vege_flot_img/tomato.png', color: { text: '#FFFFFF', bg: '#666666' } },
  { id: 6, image: '/vege_flot_img/blueberry.png', color: { text: '#FFFFFF', bg: '#333333' } },
  { id: 7, image: '/vege_flot_img/carrot.png', color: { text: '#FFFFFF', bg: '#666666' } },
  { id: 8, image: '/vege_flot_img/lemon.png', color: { text: '#FFFFFF', bg: '#333333' } },
  { id: 9, image: '/vege_flot_img/grape.png', color: { text: '#FFFFFF', bg: '#333333' } },
  { id: 10, image: '/vege_flot_img/mushroom.png', color: { text: '#FFFFFF', bg: '#333333' } },
  { id: 11, image: '/vege_flot_img/broccoli.png', color: { text: '#FFFFFF', bg: '#333333' } },
  { id: 12, image: '/vege_flot_img/corn.png', color: { text: '#FFFFFF', bg: '#666666' } },
  { id: 13, image: '/vege_flot_img/eggplant.png', color: { text: '#FFFFFF', bg: '#333333' } },
  { id: 14, image: '/vege_flot_img/cucumber.png', color: { text: '#FFFFFF', bg: '#333333' } },
  { id: 15, image: '/vege_flot_img/pepper.png', color: { text: '#FFFFFF', bg: '#666666' } },
  { id: 16, image: '/vege_flot_img/spinach.png', color: { text: '#FFFFFF', bg: '#333333' } },
  { id: 17, image: '/vege_flot_img/onion.png', color: { text: '#FFFFFF', bg: '#666666' } },
  { id: 18, image: '/vege_flot_img/garlic.png', color: { text: '#FFFFFF', bg: '#333333' } },
  { id: 19, image: '/vege_flot_img/ginger.png', color: { text: '#FFFFFF', bg: '#666666' } },
  { id: 20, image: '/vege_flot_img/potato.png', color: { text: '#FFFFFF', bg: '#333333' } },
];

// Hall of Fame - Dark Infinite Marquee 컴포넌트
const HallOfFameMarquee: React.FC = () => {
  // 레시피 제목 매핑 (20개 항목)
  const hallOfFameTitles = [
    '두부 스테이크', '비건 파스타', '아보카도 샐러드 볼', '버섯 리조또', '채소 볶음밥',
    '레몬 허브 샐러드', '고구마 수프', '망고 스무디 볼', '콩나물 비빔밥', '당근 라페 샌드위치',
    '올리브 파스타', '피스타치오 페스토', '무화과 샐러드', '두부 덮밥', '야채 카레',
    '비빔국수', '샐러드 랩', '버섯 덮밥', '비건 치즈케이크', '초콜릿 머핀'
  ];

  // 20개 Hall of Fame 레시피 데이터 준비
  const hallOfFameRecipes = circularRecipes.map((recipe, idx) => ({
    id: recipe.id,
    title: hallOfFameTitles[idx] || `레시피 ${idx + 1}`,
    image: recipe.image
  }));

  // 무한 루프를 위해 2세트로 복제
  const duplicatedRecipes = [...hallOfFameRecipes, ...hallOfFameRecipes];

  return (
    <section className="relative w-full" style={{ backgroundColor: '#0D0D0D' }}>
      {/* Layer 1: Top Static Title */}
      <div className="relative z-20 w-full text-center py-12">
        <div className="container mx-auto px-4 md:px-8 max-w-screen-xl">
          <h2 className="font-mono font-bold text-5xl" style={{ color: '#FFFFFF' }}>
            Most Popular Meals and Recipes
          </h2>
        </div>
      </div>

      {/* Layer 2: Infinite Marquee (Scrolling) */}
      <div className="relative w-full overflow-hidden" style={{ zIndex: 1 }}>
        <div 
          className="flex"
          style={{
            animation: 'marquee-slide 40s linear infinite',
            width: 'fit-content'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.animationPlayState = 'paused';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.animationPlayState = 'running';
          }}
        >
          {duplicatedRecipes.map((recipe, idx) => (
            <Link
              key={`${recipe.id}-${idx}`}
              to={`/recipe/${recipe.id}`}
              className="flex-shrink-0 cursor-pointer group/card"
              style={{ 
                width: '200px',
                marginRight: '16px'
              }}
            >
              <div 
                className="relative w-full overflow-hidden"
                style={{ 
                  aspectRatio: '2/3',
                  borderRadius: '12px'
                }}
              >
                <img
                  src={getRecipeThumbnailImage(recipe.id)}
                  alt={recipe.title}
                  className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-300"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = getFallbackRecipeImage(recipe.id);
                  }}
                />
                {/* Dark gradient overlay for text readability */}
                <div 
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0) 100%)'
                  }}
                />
                {/* Recipe Name - Center */}
                <div className="absolute inset-0 flex items-center justify-center p-4">
                  <h3 className="font-sans font-bold text-center text-sm" style={{ color: '#FFFFFF' }}>
                    {recipe.title}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Layer 3: Bottom Static Buttons */}
      <div className="relative z-20 w-full text-center py-12">
        <div className="container mx-auto px-4 md:px-8 max-w-screen-xl flex justify-center gap-4">
          <Link 
            to="/recipe/hall-of-fame" 
            className="inline-flex items-center gap-2 px-6 py-3 font-sans font-bold transition-all hover-lift border-2"
            style={{ 
              color: '#FFFFFF', 
              borderColor: '#FFFFFF',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#FFFFFF';
              e.currentTarget.style.color = '#0D0D0D';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#FFFFFF';
            }}
          >
            <Trophy className="w-4 h-4" />
            <span>명예의 전당</span>
          </Link>
          <button 
            className="inline-flex items-center gap-2 px-6 py-3 border-2 font-sans font-bold transition-all hover-lift"
            style={{ 
              color: '#FFFFFF', 
              borderColor: '#FFFFFF',
              backgroundColor: 'transparent',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#FFFFFF';
              e.currentTarget.style.color = '#0D0D0D';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#FFFFFF';
            }}
          >
            <Upload className="w-4 h-4" />
            <span>레시피 작성</span>
          </button>
        </div>
      </div>

      {/* CSS Animation */}
      <style>{`
        @keyframes marquee-slide {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }
      `}</style>
    </section>
  );
};

// Recipe Card Component (Grid) - Grunge Punch Style
const RecipeCard: React.FC<{ recipe: Recipe }> = ({ recipe }) => {
  return (
    <Link
      to={`/recipe/${recipe.id}`}
      className="block border-2 hover-shadow"
      style={{ 
        backgroundColor: '#FFFFFF',
        borderColor: '#0D0D0D'
      }}
    >
      {/* Thumbnail - 4:3 Aspect Ratio */}
      <div 
        className="relative w-full overflow-hidden"
        style={{ 
          aspectRatio: '4/3',
          backgroundColor: '#FAF9F6'
        }}
      >
        <img
          src={getRecipeThumbnailImage(recipe.id)}
          alt={recipe.title}
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = getFallbackRecipeImage(recipe.id);
          }}
        />
      </div>
      
      {/* Card Content */}
      <div className="p-4">
        <h3 className="font-mono font-bold mb-2 text-lg" style={{ color: '#0D0D0D' }}>
          {recipe.title}
        </h3>
        {recipe.description && (
          <p className="font-sans text-sm mb-2" style={{ color: '#6B6B6B' }}>
            {recipe.description}
          </p>
        )}
        {recipe.likes !== undefined && (
          <div className="flex items-center gap-1 font-sans text-sm" style={{ color: '#6B6B6B' }}>
            <Heart className="w-3.5 h-3.5" style={{ fill: '#0D0D0D', color: '#0D0D0D' }} />
            <span>{recipe.likes.toLocaleString()}</span>
          </div>
        )}
      </div>
    </Link>
  );
};

const RecipePage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [searchParams, setSearchParams] = useSearchParams();
  const spiritName = searchParams.get('spirit');
  const spiritType = searchParams.get('spiritType');
  const showUploadForm = searchParams.get('upload') === 'true';
  const baseRecipeId = searchParams.get('base');
  const [earnedBadge, setEarnedBadge] = useState<any>(null);
  const [earnedCoupon, setEarnedCoupon] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // 스피릿 타입에 맞는 태그 가져오기
  const spiritTags = useMemo(() => {
    if (!spiritType) return [];
    return spiritTagMapping[spiritType] || [];
  }, [spiritType]);

  // 필터링된 레시피
  const filteredRecipes = useMemo(() => {
    let recipes = allRecipes;
    
    // 스피릿 필터 적용
    if (spiritType && spiritTags.length > 0) {
      recipes = recipes.filter(recipe => {
        return recipe.tags?.some(tag => spiritTags.includes(tag));
      });
    }
    
    // 카테고리 필터 적용
    if (selectedCategory !== 'all') {
      const category = recipeCategories.find(cat => cat.id === selectedCategory);
      if (category) {
        recipes = category.recipes;
      }
    }
    
    return recipes;
  }, [spiritType, spiritTags, selectedCategory]);

  // 스피릿 Pick 레시피
  const spiritPickRecipes = useMemo(() => {
    if (!spiritType) return [];
    
    return recipesWithSpiritLikes
      .filter(recipe => recipe.spiritLikes?.[spiritType] > 0)
      .sort((a, b) => (b.spiritLikes?.[spiritType] || 0) - (a.spiritLikes?.[spiritType] || 0))
      .slice(0, 6);
  }, [spiritType]);

  return (
    <main className="w-full min-h-screen" style={{ backgroundColor: '#FAF9F6' }}>
      {/* Hero Section */}
      <section className="w-full py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-8 max-w-screen-xl text-center">
          <h1 className="font-mono font-bold text-5xl md:text-6xl" style={{ color: '#0D0D0D' }}>
            슬런치가 추천하는 겨울 비건 레시피
          </h1>
        </div>
      </section>

      {/* Hall of Fame Infinite Marquee */}
      <HallOfFameMarquee />

      {/* Category Filter */}
      <section className="w-full py-8 border-b-2" style={{ borderColor: '#0D0D0D' }}>
        <div className="container mx-auto px-4 md:px-8 max-w-screen-xl">
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 font-sans font-medium transition-colors ${
                selectedCategory === 'all' 
                  ? 'font-bold underline underline-offset-4' 
                  : ''
              }`}
              style={{ 
                color: selectedCategory === 'all' ? '#0D0D0D' : '#6B6B6B' 
              }}
              onMouseEnter={(e) => {
                if (selectedCategory !== 'all') {
                  e.currentTarget.style.color = '#0D0D0D';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedCategory !== 'all') {
                  e.currentTarget.style.color = '#6B6B6B';
                }
              }}
            >
              전체
            </button>
            {recipeCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 font-sans font-medium transition-colors ${
                  selectedCategory === category.id 
                    ? 'font-bold underline underline-offset-4' 
                    : ''
                }`}
                style={{ 
                  color: selectedCategory === category.id ? '#0D0D0D' : '#6B6B6B' 
                }}
                onMouseEnter={(e) => {
                  if (selectedCategory !== category.id) {
                    e.currentTarget.style.color = '#0D0D0D';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedCategory !== category.id) {
                    e.currentTarget.style.color = '#6B6B6B';
                  }
                }}
              >
                {category.title}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Recipe Grid */}
      <section className="w-full py-12">
        <div className="container mx-auto px-4 md:px-8 max-w-screen-xl">
          {/* 스피릿 Pick 섹션 */}
          {spiritType && spiritPickRecipes.length > 0 && (
            <div className="mb-16">
              <h2 className="font-mono font-bold mb-8 text-5xl" style={{ color: '#0D0D0D' }}>
                {spiritName}님과 같은 스피릿들이 가장 많이 좋아한 레시피
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {spiritPickRecipes.map((recipe) => (
                  <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
              </div>
            </div>
          )}

          {/* Filtered Recipes Grid */}
          {filteredRecipes.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="font-sans text-base" style={{ color: '#6B6B6B' }}>
                선택한 카테고리에 해당하는 레시피가 없습니다.
              </p>
            </div>
          )}
        </div>
      </section>
      
      {/* 레시피 투고 폼 */}
      <RecipeUploadForm 
        isOpen={showUploadForm} 
        baseRecipeId={baseRecipeId ? Number(baseRecipeId) : undefined}
        onClose={() => {
          const newParams = new URLSearchParams(searchParams);
          newParams.delete('upload');
          newParams.delete('base');
          setSearchParams(newParams);
        }}
        onBadgeEarned={(badge, coupon) => {
          setEarnedBadge(badge);
          setEarnedCoupon(coupon);
        }}
      />
      
      {/* 배지 획득 알림 */}
      <BadgeNotification
        badge={earnedBadge}
        coupon={earnedCoupon}
        onClose={() => {
          setEarnedBadge(null);
          setEarnedCoupon(null);
        }}
      />
    </main>
  );
};

export default RecipePage;
