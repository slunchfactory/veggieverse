import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { getRecipeThumbnailImage, getFallbackRecipeImage } from '../utils/recipeImages';

// 레시피 인터페이스
interface Recipe {
  id: number;
  title: string;
  description?: string;
  image: string;
  author: string;
  likes?: number;
}

// 카테고리 데이터
const categoryData: Record<string, { subtitle: string; title: string; description: string; recipes: Recipe[] }> = {
  popular: {
    subtitle: '인기',
    title: '가장 사랑받는 레시피',
    description: '슬런치 회원들이 가장 많이 찾는 인기 레시피를 모았어요.',
    recipes: [
      { id: 1, title: '두부 스테이크', image: '/vege_flot_img/mushroom.png', author: '비건셰프', likes: 2847 },
      { id: 2, title: '아보카도 포케', image: '/vege_flot_img/avocado.png', author: '하와이안', likes: 2634 },
      { id: 3, title: '레몬 파스타', image: '/vege_flot_img/lemon.png', author: '이탈리안', likes: 2512 },
      { id: 4, title: '배추 된장국', image: '/vege_flot_img/napa cabbage.png', author: '한식셰프', likes: 2398 },
      { id: 5, title: '망고 푸딩', image: '/vege_flot_img/coconut.png', author: '디저트왕', likes: 2287 },
      { id: 6, title: '블루베리 오트밀', image: '/vege_flot_img/blueberry.png', author: '아침요리사', likes: 2156 },
      { id: 7, title: '토마토 브루스게타', image: '/vege_flot_img/tomato.png', author: '이탈리안', likes: 2089 },
      { id: 8, title: '바나나 스무디', image: '/vege_flot_img/banana.png', author: '스무디장인', likes: 1987 },
      { id: 9, title: '당근 케이크', image: '/vege_flot_img/carrot.png', author: '베이커리', likes: 1876 },
      { id: 10, title: '시금치 샐러드', image: '/vege_flot_img/spinach.png', author: '샐러드마스터', likes: 1765 },
      { id: 11, title: '호박 수프', image: '/vege_flot_img/pumpkin.png', author: '수프전문', likes: 1654 },
      { id: 12, title: '브로콜리 볶음', image: '/vege_flot_img/broccoli.png', author: '채소요리사', likes: 1543 },
    ],
  },
  new: {
    subtitle: '신규',
    title: '이번 주 새로 올라온 레시피',
    description: '따끈따끈한 신규 레시피를 만나보세요.',
    recipes: [
      { id: 101, title: '콩나물 비빔밥', description: '고소한 참기름 향 가득', image: '/vege_flot_img/edamame.png', author: '비건셰프', likes: 234 },
      { id: 102, title: '당근 라페 샌드위치', description: '아삭한 식감이 일품', image: '/vege_flot_img/carrot.png', author: '채식러버', likes: 189 },
      { id: 103, title: '올리브 파스타', description: '지중해 풍미 가득', image: '/vege_flot_img/olive.png', author: '이탈리안', likes: 156 },
      { id: 104, title: '피스타치오 페스토', description: '고급스러운 녹색 소스', image: '/vege_flot_img/pistachio.png', author: '홈쿡러', likes: 312 },
      { id: 105, title: '무화과 샐러드', description: '달콤한 제철 과일과 함께', image: '/vege_flot_img/fig.png', author: '계절요리', likes: 278 },
      { id: 106, title: '아몬드 밀크 라떼', description: '고소한 식물성 라떼', image: '/vege_flot_img/almond.png', author: '바리스타', likes: 198 },
      { id: 107, title: '파프리카 샐러드', description: '색감 예쁜 건강식', image: '/vege_flot_img/bell pepper.png', author: '샐러드전문', likes: 223 },
      { id: 108, title: '사과 시나몬 오트밀', description: '따뜻한 아침 한 그릇', image: '/vege_flot_img/apple.png', author: '아침요리사', likes: 267 },
    ],
  },
  lunch: {
    subtitle: '점심',
    title: '맛있는 점심으로 하루 채우기',
    description: '든든하고 건강한 점심 메뉴를 추천해요.',
    recipes: [
      { id: 201, title: '두부 덮밥', description: '든든한 단백질 한 그릇', image: '/vege_flot_img/lettuce.png', author: '점심왕', likes: 445 },
      { id: 202, title: '야채 카레', description: '향신료 가득한 건강식', image: '/vege_flot_img/potato.png', author: '카레매니아', likes: 389 },
      { id: 203, title: '비빔국수', description: '새콤달콤 입맛 돋우는', image: '/vege_flot_img/chili pepper.png', author: '면요리사', likes: 521 },
      { id: 204, title: '샐러드 랩', description: '간편하고 건강한 한 끼', image: '/vege_flot_img/green bean.png', author: '다이어터', likes: 298 },
      { id: 205, title: '버섯 덮밥', description: '쫄깃한 식감의 영양밥', image: '/vege_flot_img/mushroom.png', author: '버섯사랑', likes: 367 },
      { id: 206, title: '아보카도 토스트', description: '영양 가득 브런치 메뉴', image: '/vege_flot_img/avocado.png', author: '브런치러버', likes: 412 },
      { id: 207, title: '토마토 리조또', description: '이탈리안 정통 레시피', image: '/vege_flot_img/tomato.png', author: '리조또장인', likes: 356 },
      { id: 208, title: '호박 크림 수프', description: '부드럽고 든든한 한 그릇', image: '/vege_flot_img/pumpkin.png', author: '수프마스터', likes: 423 },
      { id: 209, title: '퀴노아 볼', description: '슈퍼푸드 가득 건강식', image: '/vege_flot_img/quinoa.png', author: '건강식전문', likes: 334 },
      { id: 210, title: '렌틸콩 수프', description: '단백질 풍부한 한 그릇', image: '/vege_flot_img/lentil.png', author: '수프마스터', likes: 289 },
    ],
  },
  dessert: {
    subtitle: '디저트',
    title: '디저트는 내 삶의 낙이야',
    description: '달콤한 비건 디저트로 기분 전환하세요.',
    recipes: [
      { id: 301, title: '코코넛 푸딩', description: '열대의 달콤함을 담아', image: '/vege_flot_img/coconut.png', author: '디저트왕', likes: 623 },
      { id: 302, title: '블루베리 타르트', description: '상큼한 보라빛 유혹', image: '/vege_flot_img/blueberry.png', author: '베이커리', likes: 578 },
      { id: 303, title: '망고스틴 아이스크림', description: '이국적인 과일의 향연', image: '/vege_flot_img/mangosteen.png', author: '아이스크림', likes: 445 },
      { id: 304, title: '포도 젤리', description: '탱글탱글 보석같은', image: '/vege_flot_img/grape.png', author: '젤리장인', likes: 389 },
      { id: 305, title: '라즈베리 무스', description: '부드럽고 새콤한', image: '/vege_flot_img/raspberry.png', author: '무스마스터', likes: 512 },
      { id: 306, title: '딸기 케이크', description: '달콤 상큼 비건 케이크', image: '/vege_flot_img/strawberry.png', author: '케이크장인', likes: 534 },
      { id: 307, title: '초콜릿 트러플', description: '진한 카카오의 유혹', image: '/vege_flot_img/cacao.png', author: '쇼콜라티에', likes: 467 },
      { id: 308, title: '바나나 아이스크림', description: '건강한 원재료 그대로', image: '/vege_flot_img/banana.png', author: '아이스크림', likes: 398 },
    ],
  },
  korean: {
    subtitle: '한식',
    title: '할머니 손맛이 그리울 때',
    description: '정성 가득 비건 한식 레시피를 만나보세요.',
    recipes: [
      { id: 401, title: '배추된장국', description: '구수한 된장의 깊은 맛', image: '/vege_flot_img/napa cabbage.png', author: '한식셰프', likes: 734 },
      { id: 402, title: '마늘종 볶음', description: '밥도둑 반찬의 정석', image: '/vege_flot_img/garlic.png', author: '반찬왕', likes: 623 },
      { id: 403, title: '생강차', description: '몸을 따뜻하게 해주는', image: '/vege_flot_img/ginger.png', author: '차전문가', likes: 456 },
      { id: 404, title: '파전', description: '비 오는 날의 필수템', image: '/vege_flot_img/leek.png', author: '전요리사', likes: 589 },
      { id: 405, title: '고추장 비빔밥', description: '매콤 달콤 환상 조합', image: '/vege_flot_img/pepper.png', author: '비빔밥러버', likes: 678 },
      { id: 406, title: '김치찌개', description: '비건 김치로 만든 정통맛', image: '/vege_flot_img/chili pepper.png', author: '찌개장인', likes: 712 },
      { id: 407, title: '잡채', description: '명절의 추억 그대로', image: '/vege_flot_img/spinach.png', author: '명절요리', likes: 567 },
      { id: 408, title: '호박죽', description: '달콤 부드러운 영양식', image: '/vege_flot_img/pumpkin.png', author: '죽전문가', likes: 489 },
    ],
  },
  drink: {
    subtitle: '술안주',
    title: '오늘 한 잔, 안주는 내가 만들게',
    description: '슬런치가 엄선한 오늘 한 잔, 안주는 내가 만들게 레시피를 만나보세요.',
    recipes: [
      { id: 501, title: '땅콩 조림', description: '짭짤하고 고소한', image: '/vege_flot_img/peanut.png', author: '술꾼', likes: 445 },
      { id: 502, title: '옥수수 치즈구이', description: '달콤 짭짤 중독성', image: '/vege_flot_img/corn.png', author: '안주왕', likes: 534 },
      { id: 503, title: '아스파라거스 구이', description: '고급스러운 바 스타일', image: '/vege_flot_img/asparagus.png', author: '바텐더', likes: 367 },
      { id: 504, title: '브로콜리 튀김', description: '바삭한 식감의 매력', image: '/vege_flot_img/broccoli.png', author: '튀김장인', likes: 423 },
      { id: 505, title: '딜 감자튀김', description: '허브 향 가득한', image: '/vege_flot_img/dill.png', author: '감자사랑', likes: 489 },
      { id: 506, title: '오이 피클', description: '아삭한 곁들임', image: '/vege_flot_img/cucumber.png', author: '피클장인', likes: 378 },
      { id: 507, title: '버섯 꼬치', description: '담백한 구이 안주', image: '/vege_flot_img/mushroom.png', author: '꼬치전문', likes: 412 },
      { id: 508, title: '감자전', description: '바삭 쫄깃 전통 안주', image: '/vege_flot_img/potato.png', author: '전요리사', likes: 456 },
    ],
  },
  date: {
    subtitle: '데이트',
    title: '오늘 저녁, 특별한 사람과 함께',
    description: '로맨틱한 저녁을 위한 특별 레시피를 준비했어요.',
    recipes: [
      { id: 601, title: '트러플 리조또', description: '로맨틱한 저녁을 위해', image: '/vege_flot_img/mushroom.png', author: '로맨티스트', likes: 789 },
      { id: 602, title: '레몬 파스타', description: '상큼한 지중해 풍미', image: '/vege_flot_img/lemon.png', author: '파스타장인', likes: 656 },
      { id: 603, title: '복숭아 카프레제', description: '여름밤의 상큼함', image: '/vege_flot_img/peach.png', author: '샐러드마스터', likes: 534 },
      { id: 604, title: '키위 모히또', description: '청량한 칵테일 한 잔', image: '/vege_flot_img/kiwi.png', author: '믹솔로지스트', likes: 612 },
      { id: 605, title: '리치 샴페인', description: '달콤한 축배를 위해', image: '/vege_flot_img/lychee.png', author: '소믈리에', likes: 567 },
      { id: 606, title: '와인 페어링 치즈', description: '비건 치즈의 매력', image: '/vege_flot_img/cashew.png', author: '치즈장인', likes: 489 },
      { id: 607, title: '장미꽃 샐러드', description: '아름다운 플레이팅', image: '/vege_flot_img/radish.png', author: '플레이팅전문', likes: 445 },
      { id: 608, title: '캔들라이트 수프', description: '따뜻한 분위기 연출', image: '/vege_flot_img/celery.png', author: '수프마스터', likes: 398 },
    ],
  },
};

const RecipeCategoryPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const category = categoryId ? categoryData[categoryId] : null;

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
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      {/* 상단 네비게이션 */}
      <div
        style={{
          position: 'fixed',
          top: 'var(--header-area-h, 72px)',
          left: 0,
          right: 0,
          zIndex: 45,
          background: '#FFFFFF',
          borderBottom: '1px solid #000',
        }}
      >
        <div
          className="px-5 md:px-8 lg:px-14"
          style={{
            display: 'flex',
            alignItems: 'center',
            height: '48px',
            maxWidth: '1400px',
            margin: '0 auto',
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
        {/* 히어로 섹션 */}
        <div
          style={{
            padding: '60px 20px',
            maxWidth: '1400px',
            margin: '0 auto',
          }}
        >
          <p
            style={{
              fontSize: '12px',
              color: '#E53935',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: '12px',
            }}
          >
            {category.subtitle}
          </p>
          <h1
            style={{
              fontSize: '28px',
              fontWeight: 400,
              color: '#000',
              marginBottom: '16px',
              lineHeight: 1.3,
            }}
          >
            {category.title}
          </h1>
          <p style={{ fontSize: '14px', color: '#666', maxWidth: '500px' }}>
            {category.description}
          </p>
        </div>

        {/* 레시피 그리드 */}
        <div
          className="px-5 md:px-8 lg:px-14"
          style={{
            maxWidth: '1400px',
            margin: '0 auto',
            paddingBottom: '80px',
          }}
        >
          <div
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6"
          >
            {category.recipes.map((recipe) => (
              <Link
                key={recipe.id}
                to={`/recipe/${recipe.id}`}
                style={{ textDecoration: 'none' }}
              >
                <div>
                  {/* 이미지 */}
                  <div
                    style={{
                      aspectRatio: '1/1',
                      overflow: 'hidden',
                      marginBottom: '12px',
                      background: '#f5f5f5',
                    }}
                  >
                    <img
                      src={getRecipeThumbnailImage(recipe.id)}
                      alt={recipe.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = getFallbackRecipeImage();
                      }}
                    />
                  </div>
                  {/* 정보 */}
                  <h3
                    style={{
                      fontSize: '14px',
                      fontWeight: 400,
                      color: '#000',
                      marginBottom: '4px',
                    }}
                  >
                    {recipe.title}
                  </h3>
                  <p style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>
                    @{recipe.author}
                  </p>
                  {recipe.likes && (
                    <span
                      style={{
                        display: 'inline-block',
                        padding: '4px 12px',
                        border: '1px solid #000',
                        borderRadius: '20px',
                        fontSize: '12px',
                        color: '#000',
                      }}
                    >
                      {recipe.likes.toLocaleString()}
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default RecipeCategoryPage;
