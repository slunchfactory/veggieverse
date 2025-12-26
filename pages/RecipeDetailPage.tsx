import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Heart, Share2, Bookmark, Clock, ChefHat, Users, Sparkles, Lightbulb, ChevronRight, ChevronLeft, ChevronUp, ChevronDown, MessageCircle, CheckCircle2, Camera } from 'lucide-react';
import { getIngredientIcon } from '../utils/ingredientIcon';
import { getRecipeHeroImage, getRecipeThumbnailImage, getFallbackRecipeImage } from '../utils/recipeImages';
import { CommentSection } from '../components/CommentSection';
import { SpiritMissionCard } from '../components/SpiritMissionCard';
import { getDetailedRecipe, Recipe, allRecipes } from '../data/recipes';
import { useUser } from '../contexts/UserContext';
import { ToastContainer, ToastProps } from '../components/Toast';
import { DEFAULT_RECIPE_IMAGE } from '../data/recipeDetails';
import { PhotoReviewModal, PhotoReview } from '../components/PhotoReviewModal';

const RecipeDetailPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, addBadge, updateUserStats } = useUser();
  const commentSectionRef = useRef<HTMLDivElement>(null);
  const [currentStep, setCurrentStep] = useState<number | null>(null);
  const [toasts, setToasts] = useState<ToastProps[]>([]);
  const [imageError, setImageError] = useState(false);
  const [showPhotoReviewModal, setShowPhotoReviewModal] = useState(false);
  const [photoReviews, setPhotoReviews] = useState<PhotoReview[]>([]);

  // 포토 리뷰 로드
  useEffect(() => {
    const savedReviews = localStorage.getItem(`veggieverse-recipe-${id}-reviews`);
    if (savedReviews) {
      try {
        setPhotoReviews(JSON.parse(savedReviews));
      } catch (e) {
        console.error('Failed to load photo reviews:', e);
      }
    }
  }, [id]);
  
  // 동적 레시피 데이터 로딩
  const recipe = getDetailedRecipe(id || '1');
  
  // 이전/다음 레시피 찾기
  const currentRecipeId = Number(id) || 1;
  const sortedRecipes = [...allRecipes].sort((a, b) => a.id - b.id);
  const currentIndex = sortedRecipes.findIndex(r => r.id === currentRecipeId);
  const prevRecipe = currentIndex > 0 ? sortedRecipes[currentIndex - 1] : null;
  const nextRecipe = currentIndex < sortedRecipes.length - 1 ? sortedRecipes[currentIndex + 1] : null;
  
  // 레시피가 없을 때 Fallback UI
  if (!recipe) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50 px-4">
        <div className="max-w-md w-full bg-white rounded-none shadow-lg p-8 text-center">
          <div className="w-20 h-20 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ChefHat className="w-10 h-10 text-stone-400" />
          </div>
          <h1 className="text-2xl font-bold text-stone-900 mb-2">준비 중인 레시피입니다</h1>
          <p className="text-stone-600 mb-6">
            아직 이 레시피의 상세 정보가 준비되지 않았습니다.
            <br />
            곧 만나볼 수 있을 거예요!
          </p>
          <Link
            to="/recipe"
            className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-none font-medium hover:bg-[#333333] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            레시피 목록으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }
  
  const [servings, setServings] = useState(recipe.servings || 2);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  
  const multiplier = servings / (recipe.servings || 2);
  
  // 이미지 URL 결정 (에러 발생 시 기본 이미지 사용)
  const getImageUrl = (imagePath?: string | null) => {
    if (imageError || !imagePath) {
      return DEFAULT_RECIPE_IMAGE;
    }
    return imagePath;
  };
  
  // 기본 작성자 정보 (실제로는 레시피 데이터에서 가져와야 함)
  const author = {
    name: recipe.author || '비건셰프',
    avatar: '/vege_flot_img/avocado.png',
    date: '2025년 12월 8일',
  };
  
  // 기본 AI 추천 (실제로는 레시피 데이터에서 가져와야 함)
  const aiRecommendations = {
    title: '🤖 AI 셰프의 추천',
    tips: [
      {
        type: 'upgrade',
        icon: '✨',
        title: '더 깊은 풍미를 원한다면',
        content: '말린 포르치니 버섯을 따뜻한 물에 30분 불려 함께 사용하면 더욱 깊고 진한 버섯 향을 즐길 수 있어요.',
      },
      {
        type: 'substitute',
        icon: '🔄',
        title: '비건 버전으로 만들기',
        content: '파마산 치즈 대신 뉴트리셔널 이스트 3큰술을 사용하고, 버터는 코코넛 오일이나 비건 버터로 대체하세요.',
      },
    ],
  };
  
  // 토스트 추가
  const addToast = (toast: Omit<ToastProps, 'id'>) => {
    const newToast: ToastProps = {
      ...toast,
      id: `toast-${Date.now()}-${Math.random()}`,
    };
    setToasts(prev => [...prev, newToast]);
  };
  
  // 토스트 제거
  const removeToast = (toastId: string) => {
    setToasts(prev => prev.filter(t => t.id !== toastId));
  };
  
  // 포토 리뷰 제출 핸들러
  const handleReviewSubmitted = useCallback((newReview: PhotoReview) => {
    setPhotoReviews((prev) => {
      const updatedReviews = [newReview, ...prev];
      localStorage.setItem(`veggieverse-recipe-${id}-reviews`, JSON.stringify(updatedReviews));
      return updatedReviews;
    });

    if (user) {
      const coupon = addBadge('photoReview');
      if (coupon) {
        addToast({
          type: 'success',
          title: '축하합니다!',
          message: `포토 리뷰 작성 완료! '${coupon.name}' 쿠폰이 발급되었습니다.`,
        });
      } else {
        addToast({
          type: 'info',
          title: '리뷰 완료',
          message: '포토 리뷰가 성공적으로 등록되었습니다.',
        });
      }
      updateUserStats({ comments: (user.comments || 0) + 1 });
    } else {
      addToast({
        type: 'info',
        title: '리뷰 완료',
        message: '포토 리뷰가 성공적으로 등록되었습니다.',
      });
    }

    // 댓글 섹션으로 스크롤
    setTimeout(() => {
      commentSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 300);
  }, [addBadge, addToast, id, user, updateUserStats]);

  // review=true 쿼리 파라미터가 있으면 댓글 섹션으로 스크롤
  useEffect(() => {
    if (searchParams.get('review') === 'true' && commentSectionRef.current) {
      setTimeout(() => {
        commentSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
    }
  }, [searchParams]);
  
  // 스크롤 시 현재 단계 하이라이트
  useEffect(() => {
    const handleScroll = () => {
      const stepElements = document.querySelectorAll('[data-step]');
      const scrollPosition = window.scrollY + 200; // 헤더 높이 고려
      
      stepElements.forEach((el, index) => {
        const rect = el.getBoundingClientRect();
        const elementTop = rect.top + window.scrollY;
        
        if (scrollPosition >= elementTop - 100 && scrollPosition < elementTop + rect.height) {
          setCurrentStep(index + 1);
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const parseAmount = (amount: string) => {
    if (!amount) return amount;
    const match = amount.match(/^([\d.]+)/);
    if (match) {
      const num = parseFloat(match[1]);
      const unit = amount.replace(match[1], '');
      return `${Math.round(num * multiplier * 10) / 10}${unit}`;
    }
    return amount;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* 커버 이미지 영역 (표지 페이지) */}
      <div className="relative h-[70vh] min-h-[600px] bg-[#F5F5F5]">
        <img
          src={getImageUrl(recipe.heroImage || recipe.image || getRecipeHeroImage(Number(id) || 1))}
          alt={`${recipe.title} - 레시피 커버 이미지`}
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
          decoding="async"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            if (!imageError) {
              setImageError(true);
              target.src = DEFAULT_RECIPE_IMAGE;
            }
          }}
        />
        {/* 커버 이미지 설명 (있는 경우) */}
        {(recipe as any).heroImageCaption && (
          <div className="absolute bottom-4 left-4 right-4 z-20">
            <p className="text-xs text-white/80 text-center" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>
              {(recipe as any).heroImageCaption}
            </p>
          </div>
        )}
        {/* 가독성을 위한 그라데이션 오버레이 */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
        
        {/* 텍스트 오버레이 (커버 이미지 위) */}
        <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-12 pb-16 z-10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="flex items-start justify-between gap-6">
              <div className="flex-1">
                {/* 카테고리 */}
                <p className="text-white/90 text-sm sm:text-base mb-2 font-medium">
                  {recipe.dietCategory && recipe.recipeCategory 
                    ? `${recipe.dietCategory} / ${recipe.recipeCategory}`
                    : recipe.dietCategory || recipe.recipeCategory || '완전비건 / 점심'}
                </p>
                
                {/* 제목 */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 leading-tight drop-shadow-lg">
                  {recipe.title}
                </h1>
                
                {/* 작성자 정보 & 날짜 */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="font-semibold text-white text-sm">{author.name}</span>
                  <span className="text-base" role="img" aria-label="작성자 배지">🌻</span>
                  <span className="text-xs text-white/70">{author.date}</span>
                </div>
                
                {/* 해시태그 */}
                {recipe.tags && recipe.tags.length > 0 && (
                  <div className="flex items-center gap-2 flex-wrap">
                    {recipe.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-sm rounded-full border border-white/30">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* 액션 버튼들 (타이틀 섹션 우측 상단) */}
              <div className="flex items-center gap-3 flex-shrink-0">
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className="flex items-center gap-1.5 text-white hover:text-white/70 transition-colors"
                  title="좋아요"
                >
                  <Heart className={`w-5 h-5 ${isLiked ? 'fill-white text-white' : ''}`} />
                  <span className="text-sm font-medium">
                    {((recipe.likes || 0) + (isLiked ? 1 : 0)).toLocaleString()}
                  </span>
                </button>
                <button
                  onClick={() => setIsSaved(!isSaved)}
                  className={`text-white hover:text-white/70 transition-colors ${
                    isSaved ? 'text-white' : ''
                  }`}
                  title="저장"
                >
                  <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-amber-300' : ''}`} />
                </button>
                <button
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: recipe.title,
                        text: recipe.description,
                        url: window.location.href,
                      });
                    } else {
                      navigator.clipboard.writeText(window.location.href);
                      addToast({
                        type: 'success',
                        title: '링크 복사됨',
                        message: '레시피 링크가 클립보드에 복사되었습니다.',
                      });
                    }
                  }}
                  className="text-white hover:text-stone-200 transition-colors"
                  title="공유하기"
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 총 시간 / 난이도 / 인원 띠지 (좌우 여백 없이 꽉 채움) */}
      <div className="w-full bg-stone-50 border-y border-stone-200">
        <div className="flex items-center justify-center gap-6 py-4">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-stone-500" />
            <div>
              <p className="text-xs text-stone-500">총 시간</p>
              <p className="text-sm font-bold text-stone-900">{recipe.totalTime || '30분'}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ChefHat className="w-4 h-4 text-stone-500" />
            <div>
              <p className="text-xs text-stone-500">난이도</p>
              <p className="text-sm font-bold text-stone-900">{recipe.difficulty || '보통'}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-stone-500" />
            <div className="flex items-center gap-2">
              <div>
                <p className="text-xs text-stone-500">인원</p>
                <p className="text-sm font-bold text-stone-900">{servings}인분</p>
              </div>
              <div className="flex flex-col gap-1 ml-1">
                <button
                  onClick={() => setServings(Math.min(10, servings + 1))}
                  className="flex items-center justify-center hover:opacity-70 transition-opacity"
                  aria-label="인분 증가"
                >
                  <ChevronUp className="w-4 h-4 text-stone-700" />
                </button>
                <button
                  onClick={() => setServings(Math.max(1, servings - 1))}
                  className="flex items-center justify-center hover:opacity-70 transition-opacity"
                  aria-label="인분 감소"
                >
                  <ChevronDown className="w-4 h-4 text-stone-700" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 lg:py-12">

        {/* 알레르기 정보 */}
        {recipe.allergens && recipe.allergens.length > 0 && (
          <div className="pb-4 border-b border-stone-200 mb-8">
            <p className="text-xs text-stone-500 text-center">
              <span className="font-medium">알레르기 유발 성분:</span> {recipe.allergens.join(', ')}
            </p>
          </div>
        )}

        {/* 재료 및 영양 정보 (나란히 배치) */}
        <section className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 재료 섹션 - 띠지 스타일 */}
            <div className="bg-stone-50 border border-stone-200 rounded-none p-6">
              <div className="mb-4">
                <h2 className="text-xl font-bold text-stone-900">재료</h2>
              </div>
              <div className="space-y-2">
                {recipe.ingredients && recipe.ingredients.map((ingredient, idx) => (
                  <div key={idx} className="flex items-center gap-2 py-1.5 border-b border-stone-200">
                    <div className="w-8 h-8 rounded-md bg-white flex items-center justify-center overflow-hidden flex-shrink-0 border border-stone-200">
                      <img 
                        src={getIngredientIcon(ingredient.name)} 
                        alt={ingredient.name}
                        className="w-6 h-6 object-contain" 
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="flex-1 min-w-0 flex items-baseline gap-2">
                      <span className="text-sm font-bold text-stone-900 truncate leading-tight">{ingredient.name}</span>
                      <span className="text-sm font-medium text-stone-900 font-accent whitespace-nowrap leading-tight">{parseAmount(ingredient.amount)}</span>
                      {ingredient.note && (
                        <span className="text-xs text-stone-500 whitespace-nowrap leading-tight">({ingredient.note})</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 영양 정보 - 띠지 스타일 */}
            <div className="bg-stone-50 border border-stone-200 rounded-none p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-stone-900">영양 정보</h2>
                <span className="text-xs text-stone-500">1인분 기준</span>
              </div>
              {recipe.nutrition ? (
                <div className="space-y-0">
                  <div className="flex justify-between py-2 border-b border-stone-200">
                    <span className="text-sm font-bold text-stone-900">칼로리</span>
                    <span className="text-sm font-medium text-stone-900 font-accent">{recipe.nutrition.calories} kcal</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-stone-200">
                    <span className="text-sm font-bold text-stone-900">지방</span>
                    <span className="text-sm font-medium text-stone-900 font-accent">{recipe.nutrition.fat}g</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-stone-200 pl-4">
                    <span className="text-xs text-stone-500">포화지방</span>
                    <span className="text-xs text-stone-700 font-accent">{recipe.nutrition.saturatedFat}g</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-stone-200">
                    <span className="text-sm font-bold text-stone-900">탄수화물</span>
                    <span className="text-sm font-medium text-stone-900 font-accent">{recipe.nutrition.carbs}g</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-stone-200 pl-4">
                    <span className="text-xs text-stone-500">당류</span>
                    <span className="text-xs text-stone-700 font-accent">{recipe.nutrition.sugar}g</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-stone-200 pl-4">
                    <span className="text-xs text-stone-500">식이섬유</span>
                    <span className="text-xs text-stone-700 font-accent">{recipe.nutrition.fiber}g</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-sm font-bold text-stone-900">단백질</span>
                    <span className="text-sm font-medium text-stone-900 font-accent">{recipe.nutrition.protein}g</span>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-stone-500">영양 정보 준비 중입니다.</p>
              )}
            </div>
          </div>
        </section>

        {/* 조리 순서 */}
        <section className="mb-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-stone-900">조리 순서</h2>
          </div>
          
          <div className="space-y-0">
                {recipe.steps && recipe.steps.map((step, idx) => {
                  // step에 image 속성이 있는지 확인 (조건부 렌더링)
                  const stepImage = (step as any).image;
                  
                  return (
                    <div key={step.step} data-step={step.step}>
                      {/* 콘텐츠 영역 */}
                      <div>
                        <h3 className="font-bold text-stone-900 mb-3 text-lg">
                          {String(step.step).padStart(2, '0')}. {step.title}
                        </h3>
                        {/* 대제목 밑 실선 */}
                        <hr className="mb-4 border-t border-stone-300 -mx-4 sm:-mx-6 md:-mx-0" />
                        
                          {/* 단계 이미지 (조건부 렌더링) */}
                          {stepImage && (
                            <div className="mb-4">
                              <div className="rounded-none overflow-hidden bg-stone-100">
                                <img
                                  src={typeof stepImage === 'string' ? stepImage : stepImage.url || stepImage.src}
                                  alt={`${step.title} 단계 이미지`}
                                  className="w-full h-auto object-cover"
                                  loading="lazy"
                                  decoding="async"
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.style.display = 'none';
                                  }}
                                />
                              </div>
                              {/* 이미지 설명 (있는 경우) */}
                              {(typeof stepImage === 'object' && stepImage.caption) && (
                                <p className="text-xs text-stone-500 mt-2 text-center" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>
                                  {stepImage.caption}
                                </p>
                              )}
                            </div>
                          )}
                        
                        {/* 조리 설명 */}
                        <div className="mb-4">
                          {step.instructions.map((instruction, instIdx) => (
                            <div key={instIdx}>
                              <p className="text-base text-stone-700 leading-relaxed">
                                {instruction}
                              </p>
                              {instIdx < step.instructions.length - 1 && (
                                <hr className="my-3 border-t border-stone-300 -mx-4 sm:-mx-6 md:-mx-0" />
                              )}
                            </div>
                          ))}
                        </div>
                        
                        {/* TIP */}
                        {step.tip && (
                          <div className="mt-4 pt-4 border-t border-stone-100">
                            <p className="text-sm text-stone-600">
                              <span className="font-medium text-stone-900">TIP:</span> {step.tip}
                            </p>
                          </div>
                        )}
                      </div>
                      {/* 큰 단계 구분선 (3px 검은색) */}
                      {idx < (recipe.steps?.length || 0) - 1 && (
                        <div className="mt-8 mb-8 border-t-[3px] border-black -mx-4 sm:-mx-6 md:-mx-0" />
                      )}
                    </div>
                  );
                })}
          </div>
        </section>

        {/* 댓글 섹션 */}
        <div ref={commentSectionRef} className="mt-16 pt-8 border-t border-stone-200">
          <CommentSection 
            recipeId={id || '1'} 
            photoReviews={photoReviews}
            onReviewSubmitted={handleReviewSubmitted}
          />
        </div>

        {/* 요리 리뷰 남기기 버튼 (리뷰 섹션 아래) */}
        <div className="mt-8 pt-8 border-t border-stone-200">
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-stone-900 mb-2">요리 리뷰 남기기</h2>
            <p className="text-sm text-stone-500 mb-6">이 레시피를 만들어보셨나요? 사진과 함께 후기를 남겨주세요!</p>
            <button
              onClick={() => setShowPhotoReviewModal(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-stone-900 hover:bg-stone-800 text-white rounded-2xl font-medium transition-colors duration-200 shadow-lg"
              style={{ fontFamily: 'Noto Sans KR, sans-serif' }}
            >
              <Camera className="w-5 h-5" />
              요리 리뷰 남기기
            </button>
          </div>
        </div>

        {/* 관련 레시피 */}
        {recipe.relatedRecipes && recipe.relatedRecipes.length > 0 && (
          <section className="mt-12 pt-8 border-t border-stone-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-stone-900">비슷한 재료로 만드는 레시피</h2>
              <Link to="/recipe" className="flex items-center gap-1 text-sm text-stone-500 hover:text-stone-900 transition-colors">
                <span>더보기</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4" style={{ gap: '13px' }}>
              {recipe.relatedRecipes.map((relatedRecipe) => (
                <Link 
                  key={relatedRecipe.id} 
                  to={`/recipe/${relatedRecipe.id}`}
                  className="group cursor-pointer"
                >
                  <div className="aspect-square rounded-none overflow-hidden mb-3 bg-stone-100">
                    <img
                      src={getRecipeThumbnailImage(relatedRecipe.id)}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = getFallbackRecipeImage(relatedRecipe.id);
                      }}
                      alt={relatedRecipe.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <h3 className="font-medium text-stone-900 text-sm mb-1">
                    {relatedRecipe.title}
                  </h3>
                  <p className="text-xs text-stone-500">{relatedRecipe.description}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

      </div>
      
      {/* 포토 리뷰 모달 */}
      <PhotoReviewModal
        isOpen={showPhotoReviewModal}
        onClose={() => setShowPhotoReviewModal(false)}
        recipeId={id || '1'}
        recipeTitle={recipe.title}
        onReviewSubmitted={handleReviewSubmitted}
        onToast={addToast}
      />

      {/* 토스트 컨테이너 */}
      <ToastContainer toasts={toasts} onClose={removeToast} />
    </div>
  );
};

export default RecipeDetailPage;

