import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Crown, Medal, Trophy, Heart, Eye } from 'lucide-react';
import { COLORS } from '../constants/colors';

// Top 20 인기 레시피 데이터
const hallOfFameRecipes = [
  { id: 1, rank: 1, title: '트러플 버섯 리조또', description: '고급스러운 향과 크리미한 식감', image: '/vege_flot_img/mushroom.png', author: '로맨티스트', likes: 2847, views: 15420 },
  { id: 2, rank: 2, title: '아보카도 포케 볼', description: '신선한 재료로 만든 하와이안 스타일', image: '/vege_flot_img/avocado.png', author: '헬시쿡', likes: 2634, views: 14230 },
  { id: 3, rank: 3, title: '레몬 허브 파스타', description: '상큼하고 가벼운 지중해 풍미', image: '/vege_flot_img/lemon.png', author: '파스타장인', likes: 2512, views: 13890 },
  { id: 4, rank: 4, title: '배추 된장국', description: '구수하고 깊은 한식의 맛', image: '/vege_flot_img/napa cabbage.png', author: '한식셰프', likes: 2398, views: 12750 },
  { id: 5, rank: 5, title: '코코넛 망고 푸딩', description: '열대 과일의 달콤한 조화', image: '/vege_flot_img/coconut.png', author: '디저트왕', likes: 2287, views: 11980 },
  { id: 6, rank: 6, title: '블루베리 오트밀', description: '건강한 아침을 여는 한 그릇', image: '/vege_flot_img/blueberry.png', author: '모닝러버', likes: 2156, views: 11540 },
  { id: 7, rank: 7, title: '고구마 수프', description: '달콤하고 부드러운 겨울 수프', image: '/vege_flot_img/sweet potato.png', author: '수프마스터', likes: 2034, views: 10890 },
  { id: 8, rank: 8, title: '브로콜리 퀴노아 볼', description: '슈퍼푸드 가득한 건강식', image: '/vege_flot_img/broccoli.png', author: '헬시쿡', likes: 1987, views: 10450 },
  { id: 9, rank: 9, title: '토마토 브루스케타', description: '바삭한 빵 위의 신선함', image: '/vege_flot_img/tomato.png', author: '이탈리안', likes: 1876, views: 9870 },
  { id: 10, rank: 10, title: '망고 스무디 볼', description: '열대 과일과 그래놀라의 만남', image: '/vege_flot_img/mango.png', author: '스무디러버', likes: 1765, views: 9340 },
  { id: 11, rank: 11, title: '당근 생강 수프', description: '향긋하고 따뜻한 한 그릇', image: '/vege_flot_img/carrot.png', author: '수프마스터', likes: 1654, views: 8920 },
  { id: 12, rank: 12, title: '올리브 타프나드', description: '지중해의 맛을 담은 스프레드', image: '/vege_flot_img/olive.png', author: '지중해요리', likes: 1543, views: 8450 },
  { id: 13, rank: 13, title: '포도 치아씨드 푸딩', description: '상큼하고 건강한 디저트', image: '/vege_flot_img/grape.png', author: '푸딩장인', likes: 1432, views: 7980 },
  { id: 14, rank: 14, title: '피스타치오 페스토', description: '고급스러운 녹색 소스', image: '/vege_flot_img/pistachio.png', author: '소스마스터', likes: 1321, views: 7540 },
  { id: 15, rank: 15, title: '복숭아 샐러드', description: '달콤한 여름의 맛', image: '/vege_flot_img/peach.png', author: '샐러드퀸', likes: 1234, views: 7120 },
  { id: 16, rank: 16, title: '오렌지 비네그렛', description: '상큼한 시트러스 드레싱', image: '/vege_flot_img/orange.png', author: '드레싱장인', likes: 1156, views: 6780 },
  { id: 17, rank: 17, title: '키위 민트 스무디', description: '청량한 초록빛 음료', image: '/vege_flot_img/kiwi.png', author: '스무디러버', likes: 1087, views: 6340 },
  { id: 18, rank: 18, title: '라즈베리 타르트', description: '새콤달콤 베리의 유혹', image: '/vege_flot_img/raspberry.png', author: '베이커리', likes: 1023, views: 5980 },
  { id: 19, rank: 19, title: '파인애플 볶음밥', description: '이국적인 열대 한 그릇', image: '/vege_flot_img/pineapple.png', author: '아시안쿡', likes: 967, views: 5540 },
  { id: 20, rank: 20, title: '수박 가스파초', description: '시원한 여름 냉수프', image: '/vege_flot_img/watermelon.png', author: '여름요리사', likes: 912, views: 5120 },
];

// 카드별 색상 배열
const cardColors = [
  COLORS.goldenBrown,  // 1등
  COLORS.lightLime,    // 2등
  COLORS.brilliantRose, // 3등
  COLORS.grape,
  COLORS.babyPink,
  COLORS.darkCerulean,
  COLORS.lincolnGreen,
  COLORS.pastelMagenta,
  COLORS.sinopia,
  COLORS.bloodRed,
];

const RecipeHallOfFamePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* 히어로 헤더 */}
      <div 
        className="relative overflow-hidden py-16 sm:py-20"
        style={{ backgroundColor: COLORS.goldenBrown.bg }}
      >
        {/* 배경 장식 */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-32 h-32 rounded-none blur-3xl" style={{ backgroundColor: COLORS.goldenBrown.text }} />
          <div className="absolute bottom-10 right-10 w-40 h-40 rounded-none blur-3xl" style={{ backgroundColor: COLORS.sinopia.text }} />
        </div>
        
        <div className="page-container relative">
          {/* 뒤로가기 */}
          <Link 
            to="/recipe" 
            className="inline-flex items-center gap-2 mb-8 transition-colors hover:opacity-80"
            style={{ color: COLORS.goldenBrown.text }}
          >
            <ArrowLeft className="w-5 h-5" />
            <span>레시피로 돌아가기</span>
          </Link>
          
          {/* 타이틀 */}
          <div className="text-center">
            <div 
              className="inline-flex items-center justify-center w-20 h-20 rounded-none mb-6 shadow-lg"
              style={{ backgroundColor: COLORS.goldenBrown.text, color: COLORS.goldenBrown.bg }}
            >
              <Trophy className="w-10 h-10" />
            </div>
            <h1 
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4"
              style={{ color: COLORS.goldenBrown.text }}
            >
              명예의 전당
            </h1>
            <p 
              className="text-lg sm:text-xl max-w-2xl mx-auto"
              style={{ color: `${COLORS.goldenBrown.text}cc` }}
            >
              슬런치 유저들이 가장 사랑한 Top 20 레시피를 만나보세요
            </p>
          </div>
        </div>
      </div>

      {/* 레시피 그리드 */}
      <div className="page-container py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {hallOfFameRecipes.map((recipe) => (
            <div
              key={recipe.id}
              className={`relative cursor-pointer group ${
                recipe.rank <= 3 ? 'sm:col-span-2 lg:col-span-2' : ''
              }`}
            >
              {/* 카드 */}
              <div 
                className="bg-white rounded-none overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                style={recipe.rank <= 3 ? { 
                  boxShadow: `0 0 0 3px ${cardColors[(recipe.rank - 1) % cardColors.length].bg}` 
                } : {}}
              >
                {/* 이미지 영역 */}
                <div className={`relative ${recipe.rank <= 3 ? 'aspect-[16/10]' : 'aspect-square'}`}>
                  <div 
                    className="absolute inset-0"
                    style={{ backgroundColor: cardColors[(recipe.rank - 1) % cardColors.length].bg }}
                  />
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className={`absolute inset-0 w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 ${
                      recipe.rank <= 3 ? 'p-12' : 'p-8'
                    }`}
                  />
                  
                  {/* 랭킹 뱃지 */}
                  <div 
                    className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-none"
                    style={{ 
                      backgroundColor: cardColors[(recipe.rank - 1) % cardColors.length].text,
                      color: cardColors[(recipe.rank - 1) % cardColors.length].bg
                    }}
                  >
                    {recipe.rank === 1 && <Crown className="w-4 h-4" />}
                    {recipe.rank === 2 && <Medal className="w-4 h-4" />}
                    {recipe.rank === 3 && <Medal className="w-4 h-4" />}
                    <span className="font-bold text-sm">#{recipe.rank}</span>
                  </div>
                </div>
                
                {/* 텍스트 영역 */}
                <div className="p-4">
                  <h3 className={`font-bold text-stone-900 mb-1 group-hover:text-orange-600 transition-colors ${
                    recipe.rank <= 3 ? 'text-xl' : 'text-base'
                  }`}>
                    {recipe.title}
                  </h3>
                  <p className="text-stone-500 text-sm mb-3 line-clamp-1">
                    {recipe.description}
                  </p>
                  
                  {/* 메타 정보 */}
                  <div className="flex items-center justify-between text-xs text-stone-400">
                    <span>by {recipe.author}</span>
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Heart className="w-3.5 h-3.5" />
                        {recipe.likes.toLocaleString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5" />
                        {recipe.views.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecipeHallOfFamePage;

