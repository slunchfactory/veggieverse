import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Heart, Share2, Bookmark, Clock, ChefHat, Users, Sparkles, Lightbulb, ChevronRight, MessageCircle } from 'lucide-react';
import { getIngredientIcon } from '../utils/ingredientIcon';
import { getRecipeHeroImage, getRecipeThumbnailImage, getFallbackRecipeImage } from '../utils/recipeImages';

// 샘플 레시피 상세 데이터
const sampleRecipe = {
  id: 1,
  title: '크리미 버섯 리조또',
  subtitle: '트러플 오일과 파마산 치즈를 곁들인',
  heroImage: '/vege_flot_img/mushroom.png',
  author: {
    name: '비건셰프',
    avatar: '/vege_flot_img/avocado.png',
    date: '2025년 12월 8일',
  },
  description: '부드럽고 크리미한 이 버섯 리조또는 당신의 저녁 식탁을 풍요롭게 만들어줄 거예요. 다양한 버섯의 깊은 풍미와 아르보리오 쌀의 쫀득한 식감이 어우러져 한 입 먹으면 멈출 수 없는 맛을 선사합니다. 트러플 오일 한 방울이 고급스러운 향을 더해줍니다.',
  tags: ['고단백', '지중해식', '식이섬유', '간편조리', '원팟요리'],
  allergens: ['유제품'],
  totalTime: '35분',
  prepTime: '10분',
  cookTime: '25분',
  difficulty: '보통',
  servings: 2,
  likes: 1847,
  saves: 523,
  ingredients: [
    { name: '아르보리오 쌀', amount: '200g' },
    { name: '양송이버섯', amount: '150g' },
    { name: '표고버섯', amount: '100g' },
    { name: '양파', amount: '1개' },
    { name: '마늘', amount: '3쪽' },
    { name: '채소 육수', amount: '800ml' },
    { name: '드라이 화이트 와인', amount: '100ml' },
    { name: '파마산 치즈', amount: '50g', note: '비건 대체 가능' },
    { name: '버터', amount: '30g', note: '비건 버터 대체 가능' },
    { name: '트러플 오일', amount: '1큰술' },
    { name: '소금, 후추', amount: '적당량' },
    { name: '파슬리', amount: '약간', note: '장식용' },
  ],
  nutrition: {
    calories: 485,
    fat: 18,
    saturatedFat: 6.5,
    carbs: 62,
    sugar: 4,
    fiber: 5,
    protein: 14,
  },
  steps: [
    {
      step: 1,
      title: '재료 준비',
      instructions: [
        '버섯은 깨끗이 닦아 먹기 좋은 크기로 슬라이스합니다.',
        '양파와 마늘은 곱게 다집니다.',
        '채소 육수는 따뜻하게 데워둡니다.',
      ],
    },
    {
      step: 2,
      title: '버섯 볶기',
      instructions: [
        '큰 팬에 버터 절반을 녹이고 버섯을 넣어 중강불에서 5-7분간 노릇하게 볶습니다.',
        '소금, 후추로 간을 하고 따로 덜어둡니다.',
      ],
    },
    {
      step: 3,
      title: '리조또 베이스 만들기',
      instructions: [
        '같은 팬에 남은 버터를 녹이고 양파를 넣어 투명해질 때까지 볶습니다.',
        '마늘을 넣고 30초간 더 볶아 향을 냅니다.',
        '아르보리오 쌀을 넣고 2분간 볶아 쌀이 반투명해지도록 합니다.',
      ],
    },
    {
      step: 4,
      title: '육수 추가하며 익히기',
      instructions: [
        '화이트 와인을 넣고 알코올이 날아갈 때까지 저어줍니다.',
        '따뜻한 육수를 한 국자씩 넣으며, 쌀이 육수를 흡수할 때마다 추가합니다.',
        '약 18-20분간 계속 저어가며 쌀이 알덴테가 될 때까지 익힙니다.',
      ],
      tip: '육수는 반드시 따뜻하게 유지해야 리조또가 균일하게 익습니다.',
    },
    {
      step: 5,
      title: '마무리',
      instructions: [
        '불을 끄고 볶아둔 버섯, 파마산 치즈, 트러플 오일을 넣어 섞습니다.',
        '소금, 후추로 간을 맞추고 그릇에 담습니다.',
        '파슬리를 뿌려 장식하고 바로 서빙합니다.',
      ],
    },
  ],
  aiRecommendations: {
    title: '🤖 AI 셰프의 추천',
    tips: [
      {
        type: 'upgrade',
        icon: '✨',
        title: '더 깊은 풍미를 원한다면',
        content: '말린 포르치니 버섯을 따뜻한 물에 30분 불려 함께 사용하면 더욱 깊고 진한 버섯 향을 즐길 수 있어요. 불린 물도 육수 대신 활용하면 풍미가 배가됩니다.',
      },
      {
        type: 'substitute',
        icon: '🔄',
        title: '비건 버전으로 만들기',
        content: '파마산 치즈 대신 뉴트리셔널 이스트 3큰술을 사용하고, 버터는 코코넛 오일이나 비건 버터로 대체하세요. 크리미한 식감을 위해 캐슈넛 크림을 2큰술 추가해도 좋아요.',
      },
      {
        type: 'pairing',
        icon: '🍷',
        title: '페어링 추천',
        content: '가벼운 화이트 와인이나 스파클링 워터와 잘 어울려요. 사이드로 루꼴라 샐러드를 곁들이면 리조또의 풍부한 맛과 상큼함이 균형을 이룹니다.',
      },
      {
        type: 'storage',
        icon: '📦',
        title: '보관 및 재가열 팁',
        content: '리조또는 바로 먹는 것이 가장 맛있지만, 남은 리조또는 냉장 보관 후 팬에 육수를 조금 넣고 재가열하면 촉촉하게 즐길 수 있어요. 아란치니(리조또 볼)로 만들어도 맛있어요!',
      },
    ],
  },
  relatedRecipes: [
    { id: 2, title: '아스파라거스 리조또', description: '봄의 향기를 담은', image: '/vege_flot_img/asparagus.png' },
    { id: 3, title: '레몬 허브 리조또', description: '상큼한 지중해 스타일', image: '/vege_flot_img/lemon.png' },
    { id: 4, title: '토마토 바질 리조또', description: '이탈리안 클래식', image: '/vege_flot_img/tomato.png' },
    { id: 5, title: '호박 리조또', description: '달콤하고 고소한', image: '/vege_flot_img/sweet potato.png' },
  ],
};

const RecipeDetailPage: React.FC = () => {
  const { id } = useParams();
  const [servings, setServings] = useState(sampleRecipe.servings);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  
  const multiplier = servings / sampleRecipe.servings;

  const parseAmount = (amount: string) => {
    const match = amount.match(/^([\d.]+)/);
    if (match) {
      const num = parseFloat(match[1]);
      const unit = amount.replace(match[1], '');
      return `${Math.round(num * multiplier * 10) / 10}${unit}`;
    }
    return amount;
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#ffffff' }}>
      {/* 히어로 이미지 */}
      <div className="relative h-[50vh] min-h-[400px] bg-gradient-to-br from-amber-100 to-orange-100">
        <img
          src={getRecipeHeroImage(Number(id) || 1)}
          alt={sampleRecipe.title}
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = getFallbackRecipeImage(Number(id) || 1);
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        
        {/* 상단 네비게이션 */}
        <div className="absolute top-0 left-0 right-0 p-4 sm:p-6 flex items-center justify-between">
          <Link 
            to="/recipe" 
            className="flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-none text-stone-700 hover:bg-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="hidden sm:inline">레시피</span>
          </Link>
          
          <div className="flex items-center gap-2">
            <button className="p-2 bg-white/90 backdrop-blur-sm rounded-none text-stone-700 hover:bg-white transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="page-container">
        {/* 메인 콘텐츠 */}
        <div className="relative -mt-20 bg-white rounded-t-3xl pt-8 pb-12">
          <div className="max-w-4xl mx-auto">
            {/* 타이틀 섹션 */}
            <div className="mb-8">
              <h1 className="text-3xl sm:text-4xl font-bold text-stone-900 mb-2">
                {sampleRecipe.title}
              </h1>
              <p className="text-lg text-stone-600 mb-4">
                {sampleRecipe.subtitle}
              </p>
              
              {/* 작성자 정보 */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-none bg-green-100 overflow-hidden">
                  <img src={sampleRecipe.author.avatar} alt="" className="w-full h-full object-contain p-1" />
                </div>
                <div>
                  <p className="font-medium text-stone-900">{sampleRecipe.author.name}</p>
                  <p className="text-sm text-stone-500">{sampleRecipe.author.date} 업데이트</p>
                </div>
              </div>

              {/* 설명 */}
              <p className="text-stone-600 leading-relaxed mb-6">
                {sampleRecipe.description}
              </p>

              {/* 태그 */}
              <div className="flex flex-wrap gap-2 mb-4">
                {sampleRecipe.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-stone-100 text-stone-600 text-sm rounded-none">
                    {tag}
                  </span>
                ))}
              </div>

              {/* 알레르기 정보 */}
              <p className="text-sm text-stone-500">
                <span className="font-medium">알레르기 유발 성분:</span> {sampleRecipe.allergens.join(', ')}
              </p>
            </div>

            {/* 시간/난이도 정보 */}
            <div className="grid grid-cols-3 gap-4 p-6 bg-stone-50 rounded-none mb-10">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 text-stone-500 mb-1">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">총 시간</span>
                </div>
                <p className="font-bold text-stone-900">{sampleRecipe.totalTime}</p>
              </div>
              <div className="text-center border-x border-stone-200">
                <div className="flex items-center justify-center gap-2 text-stone-500 mb-1">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">준비 시간</span>
                </div>
                <p className="font-bold text-stone-900">{sampleRecipe.prepTime}</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 text-stone-500 mb-1">
                  <ChefHat className="w-4 h-4" />
                  <span className="text-sm">난이도</span>
                </div>
                <p className="font-bold text-stone-900">{sampleRecipe.difficulty}</p>
              </div>
            </div>

            {/* 좋아요/저장 버튼 */}
            <div className="flex items-center gap-4 mb-10">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-none font-medium transition-all ${
                  isLiked 
                    ? 'bg-red-50 text-red-600 border-2 border-red-200' 
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-red-500' : ''}`} />
                <span>{(sampleRecipe.likes + (isLiked ? 1 : 0)).toLocaleString()}</span>
              </button>
              <button
                onClick={() => setIsSaved(!isSaved)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-none font-medium transition-all ${
                  isSaved 
                    ? 'bg-amber-50 text-amber-600 border-2 border-amber-200' 
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-amber-500' : ''}`} />
                <span>저장</span>
              </button>
            </div>

            <div className="grid lg:grid-cols-3 gap-10">
              {/* 왼쪽: 재료 */}
              <div className="lg:col-span-2">
                {/* 재료 섹션 */}
                <section className="mb-12">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-stone-900">재료</h2>
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-stone-500" />
                      <div className="flex border border-stone-200 rounded-none overflow-hidden">
                        {[2, 3, 4].map((num) => (
                          <button
                            key={num}
                            onClick={() => setServings(num)}
                            className={`px-4 py-2 text-sm font-medium transition-colors ${
                              servings === num 
                                ? 'bg-stone-900 text-white' 
                                : 'bg-white text-stone-600 hover:bg-stone-50'
                            }`}
                          >
                            {num}
                          </button>
                        ))}
                      </div>
                      <span className="text-stone-500 text-sm">인분</span>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    {sampleRecipe.ingredients.map((ingredient, idx) => (
                      <div key={idx} className="flex items-center gap-4 p-3 bg-stone-50 rounded-none">
                        <div className="w-14 h-14 rounded-none bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center overflow-hidden shadow-sm">
                          <img 
                            src={getIngredientIcon(ingredient.name)} 
                            alt={ingredient.name}
                            className="w-10 h-10 object-contain" 
                          />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-stone-900">{parseAmount(ingredient.amount)}</p>
                          <p className="text-sm text-stone-600">{ingredient.name}</p>
                          {ingredient.note && (
                            <p className="text-xs text-green-600">({ingredient.note})</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* 조리 순서 */}
                <section className="mb-12">
                  <h2 className="text-2xl font-bold text-stone-900 mb-6">조리 순서</h2>
                  
                  <div className="space-y-8">
                    {sampleRecipe.steps.map((step) => (
                      <div key={step.step} className="flex gap-4">
                        <div className="flex-shrink-0 w-10 h-10 text-white rounded-none flex items-center justify-center font-bold" style={{ backgroundColor: '#3D9E3D' }}>
                          {step.step}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-stone-900 mb-3">{step.title}</h3>
                          <ul className="space-y-2">
                            {step.instructions.map((instruction, idx) => (
                              <li key={idx} className="flex gap-2 text-stone-600">
                                <span className="text-stone-400">•</span>
                                <span>{instruction}</span>
                              </li>
                            ))}
                          </ul>
                          {step.tip && (
                            <div className="mt-3 p-3 bg-amber-50 border-l-4 border-amber-400 rounded-r-lg">
                              <p className="text-sm text-amber-800">
                                <span className="font-medium">💡 TIP:</span> {step.tip}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              {/* 오른쪽: 영양 정보 */}
              <div className="lg:col-span-1">
                <div className="sticky top-24">
                  <section className="p-6 bg-stone-50 rounded-none">
                    <h2 className="text-lg font-bold text-stone-900 mb-4">영양 정보</h2>
                    <p className="text-sm text-stone-500 mb-4">/ 1인분 기준</p>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between py-2 border-b border-stone-200">
                        <span className="text-stone-600">칼로리</span>
                        <span className="font-bold text-stone-900">{sampleRecipe.nutrition.calories} kcal</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-stone-200">
                        <span className="text-stone-600">지방</span>
                        <span className="font-medium text-stone-900">{sampleRecipe.nutrition.fat}g</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-stone-200 pl-4">
                        <span className="text-stone-500 text-sm">포화지방</span>
                        <span className="text-stone-700">{sampleRecipe.nutrition.saturatedFat}g</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-stone-200">
                        <span className="text-stone-600">탄수화물</span>
                        <span className="font-medium text-stone-900">{sampleRecipe.nutrition.carbs}g</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-stone-200 pl-4">
                        <span className="text-stone-500 text-sm">당류</span>
                        <span className="text-stone-700">{sampleRecipe.nutrition.sugar}g</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-stone-200 pl-4">
                        <span className="text-stone-500 text-sm">식이섬유</span>
                        <span className="text-stone-700">{sampleRecipe.nutrition.fiber}g</span>
                      </div>
                      <div className="flex justify-between py-2">
                        <span className="text-stone-600">단백질</span>
                        <span className="font-medium text-stone-900">{sampleRecipe.nutrition.protein}g</span>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>

            {/* AI 추천 섹션 */}
            <section className="mt-16 p-8 bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 rounded-none border border-violet-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-none flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-stone-900">{sampleRecipe.aiRecommendations.title}</h2>
                  <p className="text-sm text-stone-500">이 레시피를 더 맛있게 즐기는 방법</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {sampleRecipe.aiRecommendations.tips.map((tip, idx) => (
                  <div 
                    key={idx} 
                    className="p-5 bg-white/70 backdrop-blur-sm rounded-none border border-white hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{tip.icon}</span>
                      <div>
                        <h3 className="font-bold text-stone-900 mb-2">{tip.title}</h3>
                        <p className="text-sm text-stone-600 leading-relaxed">{tip.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 댓글 섹션 (간략) */}
            <section className="mt-12 pt-8 border-t border-stone-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-stone-900 flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  댓글 <span className="text-green-600">24</span>
                </h2>
                <button className="text-green-600 hover:text-green-700 font-medium text-sm">
                  모두 보기
                </button>
              </div>
              <div className="p-4 bg-stone-50 rounded-none text-center text-stone-500">
                댓글 기능은 준비 중입니다...
              </div>
            </section>

            {/* 관련 레시피 */}
            <section className="mt-12 pt-8 border-t border-stone-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-stone-900">비슷한 재료로 만드는 레시피</h2>
                <button className="flex items-center gap-1 text-stone-600 hover:text-stone-900">
                  <span className="text-sm">더보기</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {sampleRecipe.relatedRecipes.map((recipe) => (
                  <Link 
                    key={recipe.id} 
                    to={`/recipe/${recipe.id}`}
                    className="group cursor-pointer"
                  >
                    <div className="aspect-square rounded-none overflow-hidden mb-3 bg-gradient-to-br from-amber-50 to-orange-100">
                      <img
                        src={getRecipeThumbnailImage(recipe.id)}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = getFallbackRecipeImage(recipe.id);
                        }}
                        alt={recipe.title}
                        className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <h3 className="font-medium text-stone-900 text-sm group-hover:text-green-600 transition-colors">
                      {recipe.title}
                    </h3>
                    <p className="text-xs text-stone-500">{recipe.description}</p>
                  </Link>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailPage;

