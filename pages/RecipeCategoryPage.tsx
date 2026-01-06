import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, Search } from 'lucide-react';
import { getRecipeThumbnailImage, getFallbackRecipeImage } from '../utils/recipeImages';

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

// 카테고리 데이터
const categoryData: Record<string, { subtitle: string; title: string; description: string; recipes: Recipe[] }> = {
  popular: {
    subtitle: '인기',
    title: '가장 사랑받는 레시피',
    description: '슬런치 회원들이 가장 많이 찾는 인기 레시피를 모았어요.',
    recipes: [
      { id: 1, title: '두부 스테이크', description: '고소한 단백질의 정석', image: '/vege_flot_img/mushroom.png', author: '비건셰프', likes: 2847, category: '메인요리' },
      { id: 2, title: '아보카도 포케', description: '하와이안 스타일 건강식', image: '/vege_flot_img/avocado.png', author: '하와이안', likes: 2634, category: '샐러드' },
      { id: 3, title: '레몬 파스타', description: '상큼한 지중해 풍미', image: '/vege_flot_img/lemon.png', author: '이탈리안', likes: 2512, category: '파스타' },
      { id: 4, title: '배추 된장국', description: '구수한 된장의 깊은 맛', image: '/vege_flot_img/napa cabbage.png', author: '한식셰프', likes: 2398, category: '한식' },
      { id: 5, title: '망고 푸딩', description: '열대의 달콤함을 담아', image: '/vege_flot_img/coconut.png', author: '디저트왕', likes: 2287, category: '디저트' },
      { id: 6, title: '블루베리 오트밀', description: '건강한 아침 한 그릇', image: '/vege_flot_img/blueberry.png', author: '아침요리사', likes: 2156, category: '아침' },
      { id: 7, title: '토마토 브루스게타', description: '바삭한 빵과 토마토의 조화', image: '/vege_flot_img/tomato.png', author: '이탈리안', likes: 2089, category: '애피타이저' },
      { id: 8, title: '바나나 스무디', description: '달콤 부드러운 아침 음료', image: '/vege_flot_img/banana.png', author: '스무디장인', likes: 1987, category: '음료' },
      { id: 9, title: '당근 케이크', description: '촉촉하고 달콤한 비건 케이크', image: '/vege_flot_img/carrot.png', author: '베이커리', likes: 1876, category: '디저트' },
      { id: 10, title: '시금치 샐러드', description: '철분 가득 건강 샐러드', image: '/vege_flot_img/spinach.png', author: '샐러드마스터', likes: 1765, category: '샐러드' },
      { id: 11, title: '호박 수프', description: '달콤 부드러운 가을 수프', image: '/vege_flot_img/pumpkin.png', author: '수프전문', likes: 1654, category: '수프' },
      { id: 12, title: '브로콜리 볶음', description: '아삭한 식감의 반찬', image: '/vege_flot_img/broccoli.png', author: '채소요리사', likes: 1543, category: '반찬' },
    ],
  },
  new: {
    subtitle: '신규',
    title: '이번 주 새로 올라온 레시피',
    description: '따끈따끈한 신규 레시피를 만나보세요.',
    recipes: [
      { id: 101, title: '콩나물 비빔밥', description: '고소한 참기름 향 가득', image: '/vege_flot_img/edamame.png', author: '비건셰프', likes: 234, category: '한식', isNew: true },
      { id: 102, title: '당근 라페 샌드위치', description: '아삭한 식감이 일품', image: '/vege_flot_img/carrot.png', author: '채식러버', likes: 189, category: '샌드위치', isNew: true },
      { id: 103, title: '올리브 파스타', description: '지중해 풍미 가득', image: '/vege_flot_img/olive.png', author: '이탈리안', likes: 156, category: '파스타', isNew: true },
      { id: 104, title: '피스타치오 페스토', description: '고급스러운 녹색 소스', image: '/vege_flot_img/pistachio.png', author: '홈쿡러', likes: 312, category: '소스', isNew: true },
      { id: 105, title: '무화과 샐러드', description: '달콤한 제철 과일과 함께', image: '/vege_flot_img/fig.png', author: '계절요리', likes: 278, category: '샐러드', isNew: true },
      { id: 106, title: '아몬드 밀크 라떼', description: '고소한 식물성 라떼', image: '/vege_flot_img/almond.png', author: '바리스타', likes: 198, category: '음료', isNew: true },
      { id: 107, title: '파프리카 샐러드', description: '색감 예쁜 건강식', image: '/vege_flot_img/bell pepper.png', author: '샐러드전문', likes: 223, category: '샐러드', isNew: true },
      { id: 108, title: '사과 시나몬 오트밀', description: '따뜻한 아침 한 그릇', image: '/vege_flot_img/apple.png', author: '아침요리사', likes: 267, category: '아침', isNew: true },
    ],
  },
  lunch: {
    subtitle: '점심',
    title: '맛있는 점심으로 하루 채우기',
    description: '든든하고 건강한 점심 메뉴를 추천해요.',
    recipes: [
      { id: 201, title: '두부 덮밥', description: '든든한 단백질 한 그릇', image: '/vege_flot_img/lettuce.png', author: '점심왕', likes: 445, category: '덮밥' },
      { id: 202, title: '야채 카레', description: '향신료 가득한 건강식', image: '/vege_flot_img/potato.png', author: '카레매니아', likes: 389, category: '카레' },
      { id: 203, title: '비빔국수', description: '새콤달콤 입맛 돋우는', image: '/vege_flot_img/chili pepper.png', author: '면요리사', likes: 521, category: '면요리' },
      { id: 204, title: '샐러드 랩', description: '간편하고 건강한 한 끼', image: '/vege_flot_img/green bean.png', author: '다이어터', likes: 298, category: '랩' },
      { id: 205, title: '버섯 덮밥', description: '쫄깃한 식감의 영양밥', image: '/vege_flot_img/mushroom.png', author: '버섯사랑', likes: 367, category: '덮밥' },
      { id: 206, title: '아보카도 토스트', description: '영양 가득 브런치 메뉴', image: '/vege_flot_img/avocado.png', author: '브런치러버', likes: 412, category: '토스트' },
      { id: 207, title: '토마토 리조또', description: '이탈리안 정통 레시피', image: '/vege_flot_img/tomato.png', author: '리조또장인', likes: 356, category: '리조또' },
      { id: 208, title: '호박 크림 수프', description: '부드럽고 든든한 한 그릇', image: '/vege_flot_img/pumpkin.png', author: '수프마스터', likes: 423, category: '수프' },
      { id: 209, title: '퀴노아 볼', description: '슈퍼푸드 가득 건강식', image: '/vege_flot_img/quinoa.png', author: '건강식전문', likes: 334, category: '볼' },
      { id: 210, title: '렌틸콩 수프', description: '단백질 풍부한 한 그릇', image: '/vege_flot_img/lentil.png', author: '수프마스터', likes: 289, category: '수프' },
    ],
  },
  dessert: {
    subtitle: '디저트',
    title: '디저트는 내 삶의 낙이야',
    description: '달콤한 비건 디저트로 기분 전환하세요.',
    recipes: [
      { id: 301, title: '코코넛 푸딩', description: '열대의 달콤함을 담아', image: '/vege_flot_img/coconut.png', author: '디저트왕', likes: 623, category: '푸딩' },
      { id: 302, title: '블루베리 타르트', description: '상큼한 보라빛 유혹', image: '/vege_flot_img/blueberry.png', author: '베이커리', likes: 578, category: '타르트' },
      { id: 303, title: '망고스틴 아이스크림', description: '이국적인 과일의 향연', image: '/vege_flot_img/mangosteen.png', author: '아이스크림', likes: 445, category: '아이스크림' },
      { id: 304, title: '포도 젤리', description: '탱글탱글 보석같은', image: '/vege_flot_img/grape.png', author: '젤리장인', likes: 389, category: '젤리' },
      { id: 305, title: '라즈베리 무스', description: '부드럽고 새콤한', image: '/vege_flot_img/raspberry.png', author: '무스마스터', likes: 512, category: '무스' },
      { id: 306, title: '딸기 케이크', description: '달콤 상큼 비건 케이크', image: '/vege_flot_img/strawberry.png', author: '케이크장인', likes: 534, category: '케이크' },
      { id: 307, title: '초콜릿 트러플', description: '진한 카카오의 유혹', image: '/vege_flot_img/cacao.png', author: '쇼콜라티에', likes: 467, category: '초콜릿' },
      { id: 308, title: '바나나 아이스크림', description: '건강한 원재료 그대로', image: '/vege_flot_img/banana.png', author: '아이스크림', likes: 398, category: '아이스크림' },
    ],
  },
  korean: {
    subtitle: '한식',
    title: '할머니 손맛이 그리울 때',
    description: '정성 가득 비건 한식 레시피를 만나보세요.',
    recipes: [
      { id: 401, title: '배추된장국', description: '구수한 된장의 깊은 맛', image: '/vege_flot_img/napa cabbage.png', author: '한식셰프', likes: 734, category: '국' },
      { id: 402, title: '마늘종 볶음', description: '밥도둑 반찬의 정석', image: '/vege_flot_img/garlic.png', author: '반찬왕', likes: 623, category: '반찬' },
      { id: 403, title: '생강차', description: '몸을 따뜻하게 해주는', image: '/vege_flot_img/ginger.png', author: '차전문가', likes: 456, category: '차' },
      { id: 404, title: '파전', description: '비 오는 날의 필수템', image: '/vege_flot_img/leek.png', author: '전요리사', likes: 589, category: '전' },
      { id: 405, title: '고추장 비빔밥', description: '매콤 달콤 환상 조합', image: '/vege_flot_img/pepper.png', author: '비빔밥러버', likes: 678, category: '밥' },
      { id: 406, title: '김치찌개', description: '비건 김치로 만든 정통맛', image: '/vege_flot_img/chili pepper.png', author: '찌개장인', likes: 712, category: '찌개' },
      { id: 407, title: '잡채', description: '명절의 추억 그대로', image: '/vege_flot_img/spinach.png', author: '명절요리', likes: 567, category: '면' },
      { id: 408, title: '호박죽', description: '달콤 부드러운 영양식', image: '/vege_flot_img/pumpkin.png', author: '죽전문가', likes: 489, category: '죽' },
    ],
  },
  drink: {
    subtitle: '술안주',
    title: '오늘 한 잔, 안주는 내가 만들게',
    description: '슬런치가 엄선한 술안주 레시피를 만나보세요.',
    recipes: [
      { id: 501, title: '땅콩 조림', description: '짭짤하고 고소한', image: '/vege_flot_img/peanut.png', author: '술꾼', likes: 445, category: '조림' },
      { id: 502, title: '옥수수 치즈구이', description: '달콤 짭짤 중독성', image: '/vege_flot_img/corn.png', author: '안주왕', likes: 534, category: '구이' },
      { id: 503, title: '아스파라거스 구이', description: '고급스러운 바 스타일', image: '/vege_flot_img/asparagus.png', author: '바텐더', likes: 367, category: '구이' },
      { id: 504, title: '브로콜리 튀김', description: '바삭한 식감의 매력', image: '/vege_flot_img/broccoli.png', author: '튀김장인', likes: 423, category: '튀김' },
      { id: 505, title: '딜 감자튀김', description: '허브 향 가득한', image: '/vege_flot_img/dill.png', author: '감자사랑', likes: 489, category: '튀김' },
      { id: 506, title: '오이 피클', description: '아삭한 곁들임', image: '/vege_flot_img/cucumber.png', author: '피클장인', likes: 378, category: '피클' },
      { id: 507, title: '버섯 꼬치', description: '담백한 구이 안주', image: '/vege_flot_img/mushroom.png', author: '꼬치전문', likes: 412, category: '꼬치' },
      { id: 508, title: '감자전', description: '바삭 쫄깃 전통 안주', image: '/vege_flot_img/potato.png', author: '전요리사', likes: 456, category: '전' },
    ],
  },
  date: {
    subtitle: '데이트',
    title: '오늘 저녁, 특별한 사람과 함께',
    description: '로맨틱한 저녁을 위한 특별 레시피를 준비했어요.',
    recipes: [
      { id: 601, title: '트러플 리조또', description: '로맨틱한 저녁을 위해', image: '/vege_flot_img/mushroom.png', author: '로맨티스트', likes: 789, category: '리조또' },
      { id: 602, title: '레몬 파스타', description: '상큼한 지중해 풍미', image: '/vege_flot_img/lemon.png', author: '파스타장인', likes: 656, category: '파스타' },
      { id: 603, title: '복숭아 카프레제', description: '여름밤의 상큼함', image: '/vege_flot_img/peach.png', author: '샐러드마스터', likes: 534, category: '샐러드' },
      { id: 604, title: '키위 모히또', description: '청량한 칵테일 한 잔', image: '/vege_flot_img/kiwi.png', author: '믹솔로지스트', likes: 612, category: '음료' },
      { id: 605, title: '리치 샴페인', description: '달콤한 축배를 위해', image: '/vege_flot_img/lychee.png', author: '소믈리에', likes: 567, category: '음료' },
      { id: 606, title: '와인 페어링 치즈', description: '비건 치즈의 매력', image: '/vege_flot_img/cashew.png', author: '치즈장인', likes: 489, category: '치즈' },
      { id: 607, title: '장미꽃 샐러드', description: '아름다운 플레이팅', image: '/vege_flot_img/radish.png', author: '플레이팅전문', likes: 445, category: '샐러드' },
      { id: 608, title: '캔들라이트 수프', description: '따뜻한 분위기 연출', image: '/vege_flot_img/celery.png', author: '수프마스터', likes: 398, category: '수프' },
    ],
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
              minWidth: '42px',
              height: '20px',
              padding: '0 10px',
              borderRadius: '10px',
              fontSize: '11px',
              fontWeight: 500,
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
          {/* 페이지 헤더 */}
          <div style={{ padding: '32px 0 24px' }}>
            <h1 style={{
              fontSize: '28px',
              fontWeight: 400,
              color: '#000',
              marginBottom: '8px',
            }}>
              {category.title}
            </h1>
            <p style={{
              fontSize: '14px',
              color: '#666',
            }}>
              {category.description}
            </p>
          </div>

          {/* 탭 필터 */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
            paddingBottom: '16px',
            borderBottom: '1px solid #eee',
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

          {/* 검색 + 결과 수 */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '20px 0',
          }}>
            <span style={{ fontSize: '14px', color: '#666' }}>
              {filteredRecipes.length}개의 레시피
            </span>
            <div style={{ position: 'relative', width: '200px' }}>
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

          {/* 썸네일 그리드 - 4열 */}
          <div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            style={{ paddingTop: '8px' }}
          >
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

          {/* 더 이상 없을 때 */}
          {!hasMore && displayedRecipes.length > 0 && (
            <div style={{
              textAlign: 'center',
              padding: '40px 0',
              color: '#999',
              fontSize: '14px',
            }}>
              모든 레시피를 불러왔습니다
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
