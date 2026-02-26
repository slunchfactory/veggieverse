import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, Search } from 'lucide-react';
import { getRecipeThumbnailImage, getFallbackRecipeImage } from '../../../utils/recipeImages';
import { recipes as slunchListData } from '../../../data/slunchList';

// 레시피 인터페이스
interface Recipe {
  id: number;
  title: string;
  description?: string;
  image: string;
  author: string;
  likes?: number;
  category?: string;
  isNew?: boolean;
}

// 슬런치 데이터를 Recipe로 변환
const validRecipes = slunchListData.filter(r => r.code !== 'No.');
const toRecipe = (r: typeof slunchListData[0], isNew?: boolean): Recipe => ({
  id: r.id,
  title: r.name,
  description: r.ingredients.split(',').slice(0, 3).join(', ').replace(/\s*\d+[gml개쪽장]+/g, ''),
  image: getRecipeThumbnailImage(r.id),
  author: r.author.replace('@', ''),
  likes: r.likes,
  isNew,
});

// 카테고리 데이터 (슬런치 실제 데이터)
const categoryData: Record<string, { subtitle: string; title: string; description: string; recipes: Recipe[] }> = {
  popular: {
    subtitle: '인기',
    title: '가장 사랑받는 레시피',
    description: '슬런치 회원들이 가장 많이 찾는 인기 레시피를 모았어요.',
    recipes: validRecipes.filter(r => r.category === '인기').map(r => toRecipe(r)),
  },
  new: {
    subtitle: '신규',
    title: '이번 주 새로 올라온 레시피',
    description: '따끈따끈한 신규 레시피를 만나보세요.',
    recipes: validRecipes.filter(r => r.category === '신규').map(r => toRecipe(r, true)),
  },
  lunch: {
    subtitle: '점심',
    title: '맛있는 점심으로 하루 채우기',
    description: '든든하고 건강한 점심 메뉴를 추천해요.',
    recipes: validRecipes.filter(r => r.category === '점심').map(r => toRecipe(r)),
  },
  dessert: {
    subtitle: '디저트',
    title: '디저트는 내 삶의 낙이야',
    description: '달콤한 비건 디저트로 기분 전환하세요.',
    recipes: validRecipes.filter(r => r.category === '디저트').map(r => toRecipe(r)),
  },
};

const ITEMS_PER_LOAD = 8; // 무한스크롤 시 한 번에 로드할 개수

// Editorial 스타일 레시피 카드 (RecipePage와 동일)
const RecipeCard: React.FC<{ recipe: Recipe }> = ({ recipe }) => {
  const [isCardHovered, setIsCardHovered] = useState(false);
  const [isBookmarkHovered, setIsBookmarkHovered] = useState(false);

  return (
    <Link
      to={`/recipe/${recipe.id}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
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
      {/* 이미지 영역 - 1:1 비율 */}
      <div style={{
        width: '100%',
        aspectRatio: '1 / 1',
        overflow: 'hidden',
        background: '#f0f0f0',
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
        minHeight: '100px',
      }}>
        {/* 제목 */}
        <h3 style={{
          fontSize: '18px',
          fontWeight: 700,
          margin: 0,
          color: '#000',
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
          color: '#888',
        }}>
          @{recipe.author || 'slunch'}
        </span>

        {/* 북마크 수 (타원형) - 우측 하단 정렬 */}
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
              width: '52px',
              height: '24px',
              borderRadius: '50%',
              fontSize: '12px',
              fontWeight: 400,
              border: isBookmarkHovered ? 'none' : '1px solid #000',
              background: isBookmarkHovered ? '#000' : 'transparent',
              color: isBookmarkHovered ? '#fff' : '#000',
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
  );
};

const RecipeCategoryPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const category = categoryId ? categoryData[categoryId] : null;

  // 상태 관리
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [displayCount, setDisplayCount] = useState(ITEMS_PER_LOAD);
  const [isLoading, setIsLoading] = useState(false);

  // 무한스크롤 감지용 ref
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // 카테고리별 탭 생성
  const tabs = useMemo(() => {
    if (!category) return [];
    const categories = [...new Set(category.recipes.map(r => r.category).filter(Boolean))];
    return [
      { id: 'all', label: '전체' },
      ...categories.map(c => ({ id: c!, label: `#${c}` }))
    ];
  }, [category]);

  // 필터링된 레시피
  const filteredRecipes = useMemo(() => {
    if (!category) return [];
    let recipes = category.recipes;

    // 탭 필터
    if (activeTab !== 'all') {
      recipes = recipes.filter(r => r.category === activeTab);
    }

    // 검색 필터
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      recipes = recipes.filter(r =>
        r.title.toLowerCase().includes(query) ||
        r.description?.toLowerCase().includes(query) ||
        r.author.toLowerCase().includes(query)
      );
    }

    return recipes;
  }, [category, activeTab, searchQuery]);

  // 현재 표시할 레시피
  const displayedRecipes = filteredRecipes.slice(0, displayCount);
  const hasMore = displayCount < filteredRecipes.length;

  // 탭/검색 변경 시 displayCount 리셋
  useEffect(() => {
    setDisplayCount(ITEMS_PER_LOAD);
  }, [activeTab, searchQuery]);

  // 무한스크롤 - IntersectionObserver
  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    // 실제로는 API 호출, 여기서는 시뮬레이션
    setTimeout(() => {
      setDisplayCount(prev => prev + ITEMS_PER_LOAD);
      setIsLoading(false);
    }, 300);
  }, [isLoading, hasMore]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          loadMore();
        }
      },
      { threshold: 0.1, rootMargin: '100px' }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [hasMore, isLoading, loadMore]);

  if (!category) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--cream)' }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '14px', color: '#666', marginBottom: '16px' }}>카테고리를 찾을 수 없습니다.</p>
          <Link to="/recipe" style={{ fontSize: '14px', color: '#000', textDecoration: 'underline' }}>
            레시피 목록으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: '#FAF9F6', minHeight: '100vh' }}>
      {/* 상단 네비게이션 */}
      <div
        style={{
          position: 'fixed',
          top: 'var(--header-area-h, 72px)',
          left: 0,
          right: 0,
          zIndex: 45,
          background: '#FFFFFF',
          borderBottom: '1px solid #E0E0E0',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            height: '48px',
            maxWidth: '1440px',
            margin: '0 auto',
            paddingLeft: 'max(20px, calc((100vw - 1440px) / 2 + 40px))',
            paddingRight: '20px',
          }}
        >
          <Link
            to="/recipe"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '14px',
              color: '#000',
              textDecoration: 'none',
            }}
          >
            <ChevronLeft size={20} strokeWidth={1} />
            <span>레시피</span>
          </Link>
          <span style={{ margin: '0 12px', color: '#ccc' }}>/</span>
          <span style={{ fontSize: '14px', color: '#000', fontWeight: 400 }}>{category.subtitle}</span>
        </div>
      </div>

      {/* 콘텐츠 영역 */}
      <main style={{ paddingTop: '48px' }}>
        <div
          style={{
            maxWidth: '1440px',
            margin: '0 auto',
            paddingLeft: 'max(20px, calc((100vw - 1440px) / 2 + 40px))',
            paddingRight: 'max(20px, calc((100vw - 1440px) / 2 + 40px))',
            paddingBottom: '80px',
          }}
        >
          {/* 상단 헤더: 제목 + 검색 + 갯수 */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            padding: '32px 0 20px',
            gap: '24px',
          }}>
            <div style={{ flex: 1 }}>
              <h1 style={{
                fontSize: '28px',
                fontWeight: 400,
                color: '#000',
                marginBottom: '4px',
              }}>
                {category.title}
              </h1>
              <span style={{ fontSize: '14px', color: '#666' }}>
                {filteredRecipes.length}개의 레시피
              </span>
            </div>
            <div style={{ position: 'relative', width: '200px', flexShrink: 0 }}>
              <input
                type="text"
                placeholder="검색"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 36px 10px 14px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '14px',
                  outline: 'none',
                  background: '#fff',
                }}
              />
              <Search
                size={16}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#999',
                }}
              />
            </div>
          </div>

          {/* 탭 필터 */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
            paddingBottom: '20px',
          }}>
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '8px 16px',
                  border: '1px solid #000',
                  background: activeTab === tab.id ? '#000' : '#fff',
                  color: activeTab === tab.id ? '#fff' : '#000',
                  fontSize: '13px',
                  fontWeight: 400,
                  cursor: 'pointer',
                  borderRadius: '20px',
                  transition: 'all 0.15s ease',
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* 썸네일 그리드 - 4열 */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {displayedRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>

          {/* 무한스크롤 로딩 트리거 */}
          {hasMore && (
            <div
              ref={loadMoreRef}
              style={{
                display: 'flex',
                justifyContent: 'center',
                padding: '40px 0',
              }}
            >
              {isLoading ? (
                <div style={{
                  width: '24px',
                  height: '24px',
                  border: '2px solid #ddd',
                  borderTopColor: '#000',
                  borderRadius: '50%',
                  animation: 'spin 0.8s linear infinite',
                }} />
              ) : (
                <span style={{ fontSize: '14px', color: '#999' }}>
                  스크롤하여 더 보기
                </span>
              )}
            </div>
          )}


          {/* 검색 결과 없음 */}
          {displayedRecipes.length === 0 && (
            <div style={{
              textAlign: 'center',
              padding: '80px 0',
              color: '#666',
            }}>
              <p style={{ fontSize: '16px', marginBottom: '8px' }}>검색 결과가 없습니다</p>
              <p style={{ fontSize: '14px', color: '#999' }}>다른 키워드로 검색해보세요</p>
            </div>
          )}
        </div>
      </main>

      {/* 스피너 애니메이션 */}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default RecipeCategoryPage;
