import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Plus, Upload, Trophy, X, Bookmark, Heart } from 'lucide-react';
import { COLORS } from '../../constants/colors';
import { getRecipeThumbnailImage, getFallbackRecipeImage } from '../../utils/recipeImages';
import HallOfFameMarquee from '../../components/HallOfFameMarquee';
import { PopularRecipes } from '../../components/PopularRecipes';
import { TopControlBar, TabItem } from '../../components/TopControlBar';
import { recipes as slunchRecipes } from '../../data/slunchList';

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

// 슬런치 데이터에서 인기 레시피 생성 (placeholder 제외)
const validSlunchRecipes = slunchRecipes.filter(r => r.code !== 'No.');

const popularRecipes: Recipe[] = validSlunchRecipes
  .filter(r => r.category === '인기')
  .map(r => ({
    id: r.id,
    title: r.name,
    description: r.ingredients.split(',').slice(0, 3).join(', ').replace(/\s*\d+[gml개쪽장]+/g, ''),
    image: getRecipeThumbnailImage(r.id),
    author: r.author.replace('@', ''),
    likes: r.likes,
  }));

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

// 슬런치 데이터를 Recipe 형태로 변환하는 헬퍼
const toRecipe = (r: typeof slunchRecipes[0]): Recipe => ({
  id: r.id,
  title: r.name,
  description: r.ingredients.split(',').slice(0, 3).join(', ').replace(/\s*\d+[gml개쪽장]+/g, ''),
  image: getRecipeThumbnailImage(r.id),
  author: r.author.replace('@', ''),
  likes: r.likes,
});

// 카테고리별 레시피 데이터 (슬런치 실제 데이터)
const categoryConfig: { id: string; title: string; subtitle: string; slunchCategory: string; tags: string[] }[] = [
  { id: 'new', title: '이번 주 새로 올라온 레시피', subtitle: '신규레시피', slunchCategory: '신규', tags: ['효율적', '자연주의', '간편조리'] },
  { id: 'lunch', title: '맛있는 점심으로 하루 채우기', subtitle: '점심', slunchCategory: '점심', tags: ['효율적', '간편조리', '고단백'] },
  { id: 'popular', title: '가장 사랑받는 인기 레시피', subtitle: '인기', slunchCategory: '인기', tags: ['인기', '고단백', '간편조리'] },
  { id: 'dessert', title: '디저트는 내 삶의 낙이야', subtitle: '디저트', slunchCategory: '디저트', tags: ['감성적', '예술적', '즐거움'] },
];

const recipeCategories: RecipeCategory[] = categoryConfig.map(config => ({
  id: config.id,
  title: config.title,
  subtitle: config.subtitle,
  recipes: addTagsToRecipes(
    validSlunchRecipes
      .filter(r => r.category === config.slunchCategory)
      .map(toRecipe),
    config.tags
  ),
}));

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

// 레시피 카드 컴포넌트 - 여백 기반 깔끔한 스타일
const RecipeCard: React.FC<{ recipe: Recipe; index?: number }> = ({ recipe, index }) => {
  return (
    <Link
      to={`/recipe/${recipe.id}`}
      style={{
        display: 'block',
        background: 'var(--cream)',
        cursor: 'pointer',
      }}
    >
      {/* 이미지 영역 - 1:1 비율, 둥근 모서리 */}
      <div style={{
        width: '100%',
        aspectRatio: '1 / 1',
        background: 'var(--palette-bg-2)',
        overflow: 'hidden',
        position: 'relative',
        borderRadius: '4px',
      }}>
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
        {/* 순위 뱃지 (옵션) */}
        {index !== undefined && (
          <span style={{
            position: 'absolute',
            top: '8px',
            left: '8px',
            background: 'var(--palette-text)',
            color: '#fff',
            padding: '4px 8px',
            fontSize: '11px',
            fontWeight: 400,
            borderRadius: '2px',
          }}>
            #{index + 1}
          </span>
        )}
      </div>

      {/* 텍스트 영역 - 테두리 없음, 여백으로 구분 */}
      <div style={{ paddingTop: '12px' }}>
        {/* 제목 + 좋아요 */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: '8px',
          marginBottom: '4px',
        }}>
          <h3 style={{
            fontSize: '15px',
            fontWeight: 400,
            margin: 0,
            color: 'var(--palette-text)',
            lineHeight: 1.3,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            flex: 1,
          }}>
            {recipe.title}
          </h3>
          <span style={{
            display: 'flex',
            alignItems: 'center',
            gap: '3px',
            fontSize: '11px',
            color: 'var(--warm-gray)',
            flexShrink: 0,
          }}>
            <Heart className="w-3 h-3" style={{ color: '#E53935', fill: '#E53935' }} />
            {recipe.likes?.toLocaleString() || 0}
          </span>
        </div>

        {/* 설명 - 2줄 */}
        <p style={{
          fontSize: '13px',
          color: 'var(--warm-gray)',
          margin: '0 0 8px 0',
          lineHeight: 1.4,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
        }}>
          {recipe.description}
        </p>

        {/* 저자 */}
        <div style={{
          fontSize: '12px',
          color: 'var(--warm-gray)',
        }}>
          <span>@{recipe.author || '슬런치'}</span>
        </div>
      </div>
    </Link>
  );
};

// 반응형 그리드 컴포넌트 - 여백 기반
const RecipeGrid: React.FC<{
  recipes: Recipe[];
  showRank?: boolean;
}> = ({ recipes, showRank = false }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {recipes.map((recipe, idx) => (
        <div key={recipe.id}>
          <RecipeCard recipe={recipe} index={showRank ? idx : undefined} />
        </div>
      ))}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// Editorial Magazine Cover 스타일 레시피 카드
// 상단: 이미지 (1:1, edge-to-edge) / 하단: 제목 + @작성자 + 북마크(완전한 타원)
// 비율: 2:3 (200px x 300px)
// ═══════════════════════════════════════════════════════════════
const EditorialRecipeCard: React.FC<{ recipe: Recipe; index?: number; isBookmarked?: boolean }> = ({ recipe, index, isBookmarked = false }) => {
  const [isCardHovered, setIsCardHovered] = useState(false);
  const [isBookmarkHovered, setIsBookmarkHovered] = useState(false);

  return (
    <div
      style={{
        padding: '4px',
        margin: '-4px',
      }}
    >
      <Link
        to={`/recipe/${recipe.id}`}
        style={{
          display: 'flex',
          flexDirection: 'column',
          minWidth: '200px',
          maxWidth: '200px',
          height: '330px',
          background: '#FFFFFF',
          borderRadius: '16px',
          overflow: 'hidden',
          cursor: 'pointer',
          textDecoration: 'none',
          transition: 'transform 0.2s ease',
          transform: isCardHovered ? 'scale(1.03)' : 'scale(1)',
          transformOrigin: 'center center',
        }}
        onMouseEnter={() => setIsCardHovered(true)}
        onMouseLeave={() => setIsCardHovered(false)}
      >
        {/* 상단: 이미지 영역 - edge-to-edge, 1:1 비율, 상단 모서리만 둥글게 */}
        <div style={{
          width: '200px',
          height: '200px',
          overflow: 'hidden',
          background: 'var(--border-hairline)',
          flexShrink: 0,
          borderTopLeftRadius: '16px',
          borderTopRightRadius: '16px',
        }}>
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
        </div>

        {/* 하단: Typography */}
        <div style={{
          padding: '12px 16px 16px',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          minHeight: 0,
        }}>
          {/* 제목 */}
          <h3 style={{
            fontSize: '18px',
            fontWeight: 700,
            margin: 0,
            color: 'var(--palette-text)',
            lineHeight: 1.3,
            marginBottom: '4px',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textDecoration: isCardHovered ? 'underline' : 'none',
            textUnderlineOffset: '2px',
          }}>
            {recipe.title}
          </h3>

          {/* @작성자 */}
          <span style={{
            fontSize: '12px',
            fontWeight: 400,
            color: 'var(--gray-light)',
          }}>
            @{recipe.author || 'slunch'}
          </span>

          {/* 북마크 수 (완전한 타원) - 우측 하단 정렬 */}
          <div style={{
            marginTop: 'auto',
            display: 'flex',
            justifyContent: 'flex-end',
          }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '42px',
                height: '20px',
                borderRadius: '50%',
                fontSize: '11px',
                fontWeight: 500,
                border: (isBookmarked || isBookmarkHovered) ? 'none' : '1px solid var(--palette-text)',
                background: (isBookmarked || isBookmarkHovered) ? 'var(--palette-text)' : 'transparent',
                color: (isBookmarked || isBookmarkHovered) ? '#fff' : 'var(--palette-text)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={() => setIsBookmarkHovered(true)}
              onMouseLeave={() => setIsBookmarkHovered(false)}
            >
              {recipe.likes?.toLocaleString() || 0}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

// 기존 Portrait 카드 (호환성 유지)
const PortraitRecipeCard = EditorialRecipeCard;

// ═══════════════════════════════════════════════════════════════
// "전체보기" 카드 컴포넌트 (Editorial 스타일과 동일한 크기)
// ═══════════════════════════════════════════════════════════════
const ViewAllCard: React.FC<{ categoryId: string; categoryTitle: string }> = ({ categoryId, categoryTitle }) => {
  return (
    <Link
      to={`/recipe/category/${categoryId}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: '200px',
        maxWidth: '200px',
        height: '330px',
        background: 'var(--palette-bg-2)',
        borderRadius: '16px',
        textDecoration: 'none',
        transition: 'background 0.2s ease',
      }}
      className="hover:bg-[rgba(26,10,5,0.04)]"
    >
      <span style={{
        fontSize: '12px',
        fontWeight: 400,
        color: 'var(--warm-gray)',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
      }}>
        View More
      </span>
    </Link>
  );
};

// ═══════════════════════════════════════════════════════════════
// 2-Column 섹션 컴포넌트 (좌측 고정 텍스트 + 우측 가로 스크롤)
// ═══════════════════════════════════════════════════════════════
const RecipeSection: React.FC<{
  category: RecipeCategory;
  index: number;
}> = ({ category, index }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  // 스크롤 상태 체크
  const checkScrollState = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScrollState();
    const container = scrollRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollState);
      window.addEventListener('resize', checkScrollState);
      return () => {
        container.removeEventListener('scroll', checkScrollState);
        window.removeEventListener('resize', checkScrollState);
      };
    }
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  // 배경색 번갈아가며 적용
  const bgColor = index % 2 === 0 ? '#FAFAF8' : '#fdfbf7';

  // 최대 10개 레시피
  const displayRecipes = category.recipes.slice(0, 10);

  return (
    <section
      id={`recipe-section-${category.id}`}
      className="recipe-section"
      style={{
        display: 'block',
        width: '100%',
        background: bgColor,
        position: 'relative',
        padding: '48px 0 56px',
      }}
    >
      {/* 2-Column 레이아웃 - 좌측 1440px 정렬, 우측 오버플로우 */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '32px',
          alignItems: 'flex-start',
          paddingLeft: 'max(16px, calc((100vw - 1440px) / 2 + 40px))',
          paddingRight: 0,
        }}
      >
        {/* 왼쪽 영역 - 고정 텍스트 (데스크톱만) */}
        <div
          style={{
            flex: '0 0 200px',
            position: 'sticky',
            top: 'calc(var(--header-area-h, 100px) + 24px)',
          }}
          className="hidden lg:block"
        >
          <span style={{
            fontSize: '11px',
            fontWeight: 400,
            color: 'var(--muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            display: 'block',
            marginBottom: '8px',
          }}>
            {category.subtitle}
          </span>
          <Link
            to={`/recipe/category/${category.id}`}
            style={{
              textDecoration: 'none',
              marginBottom: '12px',
              display: 'block',
            }}
          >
            <h2 style={{
              fontSize: '24px',
              fontWeight: 400,
              color: 'var(--palette-text)',
              lineHeight: 1.3,
              display: 'inline',
              borderBottom: '1px solid transparent',
              transition: 'border-color 0.2s',
            }}
            className="hover:!border-black"
            >
              {category.title}
            </h2>
          </Link>
          <p style={{
            fontSize: '13px',
            fontWeight: 400,
            color: 'var(--warm-gray)',
            lineHeight: 1.6,
            marginBottom: '56px',
          }}>
            슬런치가 엄선한 {category.title.toLowerCase()} 레시피를 만나보세요.
          </p>
        </div>

        {/* 오른쪽 영역 - 가로 스크롤 슬라이더 */}
        <div style={{ flex: 1, position: 'relative', minWidth: 0, marginRight: '-64px' }}
          className="lg:mr-[-64px] md:mr-[-32px] mr-[-16px]"
        >
          {/* 모바일/태블릿 헤더 */}
          <div className="lg:hidden mb-4">
            <span style={{
              fontSize: '11px',
              fontWeight: 400,
              color: 'var(--muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
            }}>
              {category.subtitle}
            </span>
            <Link
              to={`/recipe/category/${category.id}`}
              style={{
                display: 'block',
                textDecoration: 'none',
                marginTop: '4px',
              }}
            >
              <h2
                style={{
                  fontSize: '20px',
                  fontWeight: 400,
                  color: 'var(--palette-text)',
                  display: 'inline',
                  borderBottom: '1px solid transparent',
                  transition: 'border-color 0.2s',
                }}
                className="hover:!border-black"
              >
                {category.title}
              </h2>
            </Link>
          </div>

          {/* 슬라이더 래퍼 (버튼 오버레이용) */}
          <div
            style={{ position: 'relative' }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* 좌측 스크롤 버튼 */}
            {isHovered && canScrollLeft && (
              <button
                onClick={() => scroll('left')}
                className="hidden md:flex"
                style={{
                  position: 'absolute',
                  left: '-20px',
                  top: '50%',
                  transform: 'translateY(-70%)',
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  border: '1px solid var(--border-divider)',
                  background: 'rgba(255,255,255,0.95)',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  zIndex: 10,
                  boxShadow: '0 2px 8px rgba(26, 10, 5, 0.1)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--palette-text)';
                  e.currentTarget.style.borderColor = 'var(--palette-text)';
                  e.currentTarget.style.color = '#fff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.95)';
                  e.currentTarget.style.borderColor = 'var(--border-divider)';
                  e.currentTarget.style.color = 'var(--palette-text)';
                }}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}

            {/* 우측 스크롤 버튼 */}
            {isHovered && canScrollRight && (
              <button
                onClick={() => scroll('right')}
                className="hidden md:flex lg:right-[52px] md:right-[20px] right-[4px]"
                style={{
                  position: 'absolute',
                  top: '50%',
                  transform: 'translateY(-70%)',
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  border: '1px solid var(--border-divider)',
                  background: 'rgba(255,255,255,0.95)',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  zIndex: 10,
                  boxShadow: '0 2px 8px rgba(26, 10, 5, 0.1)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--palette-text)';
                  e.currentTarget.style.borderColor = 'var(--palette-text)';
                  e.currentTarget.style.color = '#fff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.95)';
                  e.currentTarget.style.borderColor = 'var(--border-divider)';
                  e.currentTarget.style.color = 'var(--palette-text)';
                }}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            )}

            {/* 슬라이더 컨테이너 */}
            <div
              ref={scrollRef}
              className="no-scrollbar lg:pr-16 md:pr-8 pr-4"
              style={{
                display: 'flex',
                gap: '16px',
                overflowX: 'auto',
                scrollSnapType: 'x mandatory',
                paddingBottom: '4px',
                scrollBehavior: 'smooth',
                WebkitOverflowScrolling: 'touch',
              }}
            >
              {/* 레시피 카드들 (최대 10개) */}
              {displayRecipes.map((recipe) => (
                <div key={recipe.id} style={{ scrollSnapAlign: 'start', flexShrink: 0 }}>
                  <PortraitRecipeCard recipe={recipe} />
                </div>
              ))}

              {/* 마지막: 전체보기 카드 */}
              <div style={{ scrollSnapAlign: 'start', flexShrink: 0 }}>
                <ViewAllCard categoryId={category.id} categoryTitle={category.title} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// 스피릿 페이지용 캐러셀 (버튼 오버레이)
const SpiritRecipeCarousel: React.FC<{
  recipes: Recipe[];
  showRank?: boolean;
}> = ({ recipes, showRank = false }) => {
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

  useEffect(() => {
    checkScroll();
  }, []);

  const scroll = (dir: 'left' | 'right') => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir === 'left' ? -300 : 300, behavior: 'smooth' });
      setTimeout(checkScroll, 300);
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      {/* 좌측 버튼 */}
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
            border: '1px solid var(--palette-text)',
            background: '#fff',
            color: 'var(--palette-text)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 10,
            transition: 'all 0.15s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--palette-text)';
            e.currentTarget.style.color = '#fff';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#fff';
            e.currentTarget.style.color = 'var(--palette-text)';
          }}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      )}

      {/* 우측 버튼 */}
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
            border: '1px solid var(--palette-text)',
            background: 'var(--palette-text)',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 10,
            transition: 'all 0.15s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--charcoal)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'var(--palette-text)';
          }}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      )}

      {/* 캐러셀 */}
      <div
        ref={scrollRef}
        onScroll={checkScroll}
        className="flex overflow-x-auto no-scrollbar"
        style={{
          gap: '20px',
          scrollBehavior: 'smooth',
          WebkitOverflowScrolling: 'touch',
          padding: '4px 0',
        }}
      >
        {recipes.map((recipe, idx) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            index={showRank ? idx : undefined}
          />
        ))}
      </div>
    </div>
  );
};

// 원형 캐러셀 데이터 (20개)
const circularRecipes = [
  { id: 1, image: '/veggieverse/vege_flot_img/fig.png', color: COLORS.maroon },
  { id: 2, image: '/veggieverse/vege_flot_img/mango.png', color: COLORS.orange },
  { id: 3, image: '/veggieverse/vege_flot_img/lettuce.png', color: COLORS.green },
  { id: 4, image: '/veggieverse/vege_flot_img/avocado.png', color: COLORS.black },
  { id: 5, image: '/veggieverse/vege_flot_img/tomato.png', color: COLORS.pink },
  { id: 6, image: '/veggieverse/vege_flot_img/blueberry.png', color: COLORS.purple },
  { id: 7, image: '/veggieverse/vege_flot_img/carrot.png', color: COLORS.orange },
  { id: 8, image: '/veggieverse/vege_flot_img/lemon.png', color: COLORS.green },
  { id: 9, image: '/veggieverse/vege_flot_img/grape.png', color: COLORS.purple },
  { id: 10, image: '/veggieverse/vege_flot_img/mushroom.png', color: COLORS.maroon },
  { id: 11, image: '/veggieverse/vege_flot_img/broccoli.png', color: COLORS.green },
  { id: 12, image: '/veggieverse/vege_flot_img/corn.png', color: COLORS.orange },
  { id: 13, image: '/veggieverse/vege_flot_img/eggplant.png', color: COLORS.purple },
  { id: 14, image: '/veggieverse/vege_flot_img/cucumber.png', color: COLORS.green },
  { id: 15, image: '/veggieverse/vege_flot_img/pepper.png', color: COLORS.orange },
  { id: 16, image: '/veggieverse/vege_flot_img/spinach.png', color: COLORS.green },
  { id: 17, image: '/veggieverse/vege_flot_img/onion.png', color: COLORS.pink },
  { id: 18, image: '/veggieverse/vege_flot_img/garlic.png', color: COLORS.maroon },
  { id: 19, image: '/veggieverse/vege_flot_img/ginger.png', color: COLORS.orange },
  { id: 20, image: '/veggieverse/vege_flot_img/potato.png', color: COLORS.purple },
];

// 인기 레시피 섹션 - 여백 기반
const RecipeHeroSection: React.FC<{ recipes: Recipe[] }> = ({ recipes }) => {
  return (
    <section style={{ background: 'var(--cream)', paddingTop: '32px' }}>
      {/* 섹션 헤더 - 여백으로 구분 */}
      <div className="px-4 md:px-8 lg:px-16 mb-6">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ fontSize: '12px', fontWeight: 400, color: 'var(--warm-gray)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Popular
            </span>
            <h2 style={{ fontSize: '20px', fontWeight: 400, color: 'var(--palette-text)', marginTop: '4px' }}>
              인기 레시피
            </h2>
          </div>
          <Link
            to="/recipe/hall-of-fame"
            style={{
              fontSize: '13px',
              fontWeight: 400,
              color: 'var(--warm-gray)',
              textDecoration: 'none',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.textDecoration = 'underline'; e.currentTarget.style.color = 'var(--palette-text)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.textDecoration = 'none'; e.currentTarget.style.color = 'var(--warm-gray)'; }}
          >
            전체보기 →
          </Link>
        </div>
      </div>

      {/* 반응형 그리드 - 상위 8개 */}
      <div className="px-4 md:px-8 lg:px-16 pb-12">
        <RecipeGrid recipes={recipes.slice(0, 8)} showRank />
      </div>
    </section>
  );
};

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

  // 스피릿 진입 시 맨 위로 스크롤
  useEffect(() => {
    if (fromSpirit) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [fromSpirit]);

  // 스피릿 진입 시 레이아웃 (표준 vertical stacking 구조)
  if (fromSpirit && spiritInfo) {
    return (
      <div className="w-full min-h-screen bg-[#FAF9F6] overflow-x-hidden">
        <main className="w-full flex flex-col items-center">
          {/* Section 1: 스피릿 Hero / Title */}
          <section className="w-full max-w-[1440px] px-10 py-20 text-center" style={{ background: '#EEF2EB' }}>
              <div className="text-5xl mb-4">{spiritInfo.emoji}</div>
            <h1 className="text-black mb-2 font-normal" style={{ fontSize: 'var(--font-size-h2)', fontWeight: 400 }}>
                {spiritName} 추천 레시피
              </h1>
            <p className="text-warm-gray text-center max-w-2xl mx-auto" style={{ fontSize: '16px', fontWeight: 400, color: 'var(--warm-gray)' }}>
                "{spiritInfo.description}"
              </p>
            </section>

          {/* Section 2: 스피릿 PICK 섹션 - 좌측 1440px 정렬, 우측 오버플로우 */}
            {spiritPickRecipes.length > 0 ? (
              <section
                id="spirit-pick"
                className="w-full py-20"
                style={{
                  background: '#EEF2EB',
                  paddingLeft: 'max(40px, calc((100vw - 1440px) / 2 + 40px))',
                  paddingRight: 0,
                }}
              >
                {/* 텍스트 콘텐츠 - 1360px 제한 (1440 - 40*2) */}
                <div style={{ maxWidth: '1360px', paddingRight: '40px' }}>
                  <span
                    className="inline-block px-4 py-1.5 text-xs font-normal tracking-wide uppercase mb-3 rounded-none"
                    style={{ backgroundColor: '#3D4A3A', color: '#FFFFFF' }}
                  >
                    스피릿 PICK
                  </span>
                  <h2 className="text-black mb-2 font-normal" style={{ fontSize: 'var(--font-size-h2)', fontWeight: 400 }}>
                    {spiritName} 스피릿이 좋아하는 레시피
                  </h2>
                  <p className="text-warm-gray mb-8 text-left" style={{ fontSize: '16px', fontWeight: 400 }}>
                    {spiritName}과 같은 스피릿들이 가장 많이 좋아한 레시피예요
                  </p>
                </div>
                {/* 캐러셀 - 우측 오버플로우 허용 */}
                <div className="mt-6">
                  <SpiritRecipeCarousel recipes={spiritPickRecipes} showRank />
                </div>
              </section>
            ) : (
              <section
                className="w-full py-20"
                style={{
                  background: '#EEF2EB',
                  paddingLeft: 'max(40px, calc((100vw - 1440px) / 2 + 40px))',
                  paddingRight: 'max(40px, calc((100vw - 1440px) / 2 + 40px))',
                }}
              >
                <div style={{ maxWidth: '1360px', textAlign: 'center', padding: '40px 0' }}>
                  <p style={{ fontSize: '16px', fontWeight: 400, color: 'var(--warm-gray)', marginBottom: '8px' }}>
                    {spiritName} 스피릿에 맞는 추천 레시피를 준비 중이에요
                  </p>
                  <p style={{ fontSize: '14px', fontWeight: 400, color: 'var(--muted)' }}>
                    곧 새로운 레시피가 추가될 예정입니다
                  </p>
                </div>
              </section>
            )}

          {/* Section 3: 큐레이션 섹션 - 좌측 1440px 정렬, 우측 오버플로우 */}
          <section
            className="w-full py-20"
            style={{
              paddingLeft: 'max(40px, calc((100vw - 1440px) / 2 + 40px))',
              paddingRight: 0,
            }}
          >
            {/* 큐레이션 섹션 */}
            {displayCategories.length > 0 ? (
              <div style={{ padding: '40px 0' }}>
                {/* 텍스트 콘텐츠 - 1360px 제한 */}
                <div style={{ maxWidth: '1360px', paddingRight: '40px' }}>
                  <h2 className="text-black mb-2 font-normal" style={{ fontSize: 'var(--font-size-h2)', fontWeight: 400 }}>
                    {spiritName}에게 어울리는 레시피
                  </h2>
                  <p className="text-warm-gray mb-8 text-left" style={{ fontSize: '16px', fontWeight: 400 }}>
                    {getSpiritCurationMessage(spiritName)}
                  </p>
                </div>
                <div className="space-y-12">
                  {displayCategories.map((category) => {
                    const colors = categoryColors[category.id] || COLORS.green;
                    return (
                      <div key={category.id}>
                        {/* 카테고리 헤더 - 1360px 제한 */}
                        <div style={{ maxWidth: '1360px', paddingRight: '40px' }}>
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <span
                                className="inline-block px-3 py-1 text-xs font-semibold tracking-wide uppercase mb-2 rounded-none"
                                style={{ backgroundColor: colors.bg, color: colors.text }}
                              >
                                {category.subtitle}
                              </span>
                              <h3 className="text-black font-normal" style={{ fontSize: 'var(--font-size-h2)', fontWeight: 400 }}>
                                {category.title}
                              </h3>
                            </div>
                            <button className="text-warm-gray hover:text-black underline underline-offset-4 text-sm font-medium flex-shrink-0 ml-4">
                              See all
                            </button>
                          </div>
                        </div>
                        {/* 캐러셀 - 우측 오버플로우 허용 */}
                        <div className="mt-6">
                          <SpiritRecipeCarousel recipes={category.recipes} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div style={{ padding: '80px 40px', textAlign: 'center' }}>
                <p style={{ fontSize: '16px', fontWeight: 400, color: 'var(--warm-gray)', marginBottom: '8px' }}>
                  조건에 맞는 레시피가 없습니다
                </p>
                <p style={{ fontSize: '14px', fontWeight: 400, color: 'var(--muted)' }}>
                  다른 스피릿 유형으로 다시 시도해보세요
                </p>
              </div>
            )}

            {/* 스피릿 미션 섹션 - 중앙 정렬 콘텐츠 */}
            <div
              style={{
                padding: '40px 0',
                paddingRight: '40px',
                borderTop: '1px solid rgba(26, 10, 5, 0.06)',
                maxWidth: '1360px',
              }}
            >
              <div className="text-center max-w-2xl mx-auto">
                <div className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-emerald-100 rounded-none mb-6">
                  <Trophy className="w-5 h-5 text-emerald-700" />
                  <span className="text-emerald-700 font-semibold">스피릿 미션</span>
                </div>
                <h3 className="text-black mb-3 font-normal" style={{ fontSize: 'var(--font-size-h2)', fontWeight: 400 }}>
                  이 레시피를 만들어보고 후기를 남겨주시면
                </h3>
                <div className="flex items-center justify-center gap-3 mb-6">
                  <span className="text-4xl">{spiritInfo.emoji}</span>
                  <span className="text-emerald-700 font-normal" style={{ fontSize: 'var(--font-size-h2)', fontWeight: 400 }}>{spiritName}</span>
                  <span className="text-4xl">배지를 드려요!</span>
                </div>
                <p className="text-warm-gray mb-8 text-center" style={{ fontSize: '16px', fontWeight: 400 }}>
                  레시피를 따라 만들어보고 사진과 후기를 공유해주세요.
                  <br />같은 스피릿 유저들과 함께 나누는 즐거움을 경험해보세요!
                </p>
              </div>
            </div>
          </section>

          {/* Section 4: 일반 카테고리 섹션들 - 좌측 1440px 정렬, 우측 오버플로우 */}
          <section
            className="w-full py-20"
            style={{
              paddingLeft: 'max(40px, calc((100vw - 1440px) / 2 + 40px))',
              paddingRight: 0,
            }}
          >
            <div className="w-full flex flex-col">
              {recipeCategories.map((category, index) => (
                <RecipeSection key={category.id} category={category} index={index} />
              ))}
            </div>
          </section>
        </main>
      </div>
    );
  }

  // 인기 레시피 Top 20 (좋아요 순)
  const top20Recipes = useMemo(() => {
    return [...allRecipes]
      .sort((a, b) => (b.likes || 0) - (a.likes || 0))
      .slice(0, 20);
  }, []);

  // TopControlBar용 탭 데이터
  const recipeTabs: TabItem[] = [
    { id: 'popular', label: '인기' },
    { id: 'new', label: '신규' },
    { id: 'lunch', label: '점심' },
    { id: 'dessert', label: '디저트' },
    { id: 'korean', label: '한식' },
    { id: 'drink', label: '술안주' },
    { id: 'date', label: '데이트' },
  ];

  const [activeRecipeTab, setActiveRecipeTab] = useState('popular');

  // 탭 변경시 해당 섹션으로 스크롤
  const handleRecipeTabChange = (tabId: string) => {
    setActiveRecipeTab(tabId);
    if (tabId === 'popular') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const section = document.getElementById(`recipe-section-${tabId}`);
      if (section) {
        const headerHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-area-h') || '100');
        const offset = section.offsetTop - headerHeight - 60;
        window.scrollTo({ top: offset, behavior: 'smooth' });
      }
    }
  };


  // 일반 진입 시 - 깔끔한 여백 기반 디자인
  return (
    <div className="w-full min-h-screen" style={{ background: 'var(--cream)' }}>
      {/* 상단 컨트롤 바 - KBP Style (Fixed) */}
      <TopControlBar
        tabs={recipeTabs}
        activeTab={activeRecipeTab}
        onTabChange={handleRecipeTabChange}
      />

      {/* Fixed TopControlBar 높이만큼 여백 */}
      <main className="w-full flex flex-col" style={{ paddingTop: '48px' }}>
        {/* 인기 레시피 섹션 - Retro Desktop OS 스타일 */}
        <PopularRecipes />

        {/* 카테고리별 섹션들 */}
        <div className="w-full flex flex-col">
          {displayCategories.map((category, index) => (
            <RecipeSection key={category.id} category={category} index={index} />
          ))}
        </div>

        {/* 레시피 작성 CTA - 여백 기반 */}
        <div className="px-4 md:px-8 lg:px-16 py-16" style={{ background: 'var(--cream)' }}>
          <div className="text-center max-w-xl mx-auto">
            <div style={{
              width: '48px',
              height: '48px',
              background: 'var(--palette-bg-2)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px',
            }}>
              <Plus className="w-6 h-6" style={{ color: 'var(--warm-gray)' }} />
            </div>
            <h3 style={{
              fontSize: '18px',
              fontWeight: 400,
              color: 'var(--palette-text)',
              marginBottom: '8px',
            }}>
              나만의 레시피를 공유해보세요
            </h3>
            <p style={{
              fontSize: '14px',
              fontWeight: 400,
              color: 'var(--warm-gray)',
              marginBottom: '20px',
              lineHeight: 1.6,
            }}>
              당신의 특별한 비건 레시피를 슬런치 커뮤니티와 함께 나눠보세요.
            </p>
            <button
              onClick={() => {
                navigate('/recipe?upload=true');
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                fontSize: '14px',
                fontWeight: 400,
                background: 'var(--palette-text)',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                transition: 'opacity 0.15s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.8'; }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
            >
              <Upload className="w-4 h-4" />
              <span>레시피 작성하기</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RecipePage;

