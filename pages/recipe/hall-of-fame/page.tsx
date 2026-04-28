import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Crown, Medal, Trophy, Heart, Eye } from 'lucide-react';
import { COLORS } from '../../../constants/colors';
import { getRecipeThumbnailImage, getFallbackRecipeImage } from '../../../utils/recipeImages';
import { recipes as slunchListData } from '../../../data/slunchList';

// 슬런치 데이터에서 좋아요 순 Top 20 명예의 전당 생성
const hallOfFameRecipes = slunchListData
  .filter(r => r.code !== 'No.')
  .sort((a, b) => b.likes - a.likes)
  .slice(0, 20)
  .map((r, idx) => ({
    id: r.id,
    rank: idx + 1,
    title: r.name,
    description: r.ingredients.split(',').slice(0, 3).join(', ').replace(/\s*\d+[gml개쪽장]+/g, ''),
    image: getRecipeThumbnailImage(r.id),
    author: r.author.replace('@', ''),
    likes: r.likes,
    views: Math.floor(r.likes * 5.2 + Math.random() * 1000),
  }));

// 카드별 색상 배열
const cardColors = [
  { bg: 'var(--palette-text)', text: '#FFFFFF' },  // 1등
  { bg: 'var(--charcoal)', text: '#FFFFFF' },   // 2등
  { bg: 'var(--warm-gray)', text: '#FFFFFF' },  // 3등
  { bg: 'var(--border-divider)', text: 'var(--palette-text)' },
  { bg: 'var(--charcoal)', text: '#FFFFFF' },
  { bg: 'var(--palette-text)', text: '#FFFFFF' },
  { bg: 'var(--charcoal)', text: '#FFFFFF' },
  { bg: 'var(--warm-gray)', text: '#FFFFFF' },
  { bg: 'var(--palette-text)', text: '#FFFFFF' },
  { bg: 'var(--border-divider)', text: 'var(--palette-text)' },
];

const RecipeHallOfFamePage: React.FC = () => {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#ffffff' }}>
      {/* 히어로 헤더 */}
      <div 
        className="relative overflow-hidden py-16 sm:py-20"
        style={{ backgroundColor: 'var(--palette-text)' }}
      >
        {/* 배경 장식 */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-32 h-32 rounded-none blur-3xl bg-white" />
          <div className="absolute bottom-10 right-10 w-40 h-40 rounded-none blur-3xl bg-white" />
        </div>
        
        <div className="page-container relative">
          
          {/* 타이틀 */}
          <div className="text-center">
            <div 
              className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 shadow-lg bg-white"
              style={{ color: 'var(--palette-text)' }}
            >
              <Trophy className="w-10 h-10" />
            </div>
            <h1 className="mb-4 text-white font-normal" style={{ fontSize: 'var(--font-size-h2)', fontWeight: 400 }}>
              명예의 전당
            </h1>
            <p className="text-lg sm:text-xl max-w-2xl mx-auto text-white/80">
              슬런치 유저들이 가장 사랑한 Top 20 레시피를 만나보세요
            </p>
          </div>
        </div>
      </div>

      {/* 레시피 그리드 */}
      <div className="page-container py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" style={{ gap: '13px' }}>
          {hallOfFameRecipes.map((recipe) => (
            <div
              key={recipe.id}
              className={`relative cursor-pointer group ${
                recipe.rank <= 3 ? 'sm:col-span-2 lg:col-span-2' : ''
              }`}
            >
              {/* 카드 */}
              <div
                className="bg-white rounded-none overflow-hidden transition-transform duration-200 hover:scale-[1.02]"
                style={recipe.rank <= 3 ? {
                  border: `1px solid ${cardColors[(recipe.rank - 1) % cardColors.length].bg}`
                } : { border: '1px solid var(--palette-text)' }}
              >
                {/* 이미지 영역 */}
                <div className={`relative ${recipe.rank <= 3 ? 'aspect-[16/10]' : 'aspect-square'}`}>
                  <div 
                    className="absolute inset-0"
                    style={{ backgroundColor: cardColors[(recipe.rank - 1) % cardColors.length].bg }}
                  />
                  <img
                    src={getRecipeThumbnailImage(recipe.id)}
                    alt={recipe.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-200"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = getFallbackRecipeImage(recipe.id);
                    }}
                  />
                  
                  {/* 랭킹 뱃지 (원형) */}
                  <div
                    className="absolute top-4 left-4 w-10 h-10 rounded-full flex items-center justify-center"
                    style={{
                      backgroundColor: cardColors[(recipe.rank - 1) % cardColors.length].text,
                      color: cardColors[(recipe.rank - 1) % cardColors.length].bg,
                      border: `1px solid ${cardColors[(recipe.rank - 1) % cardColors.length].bg}`
                    }}
                  >
                    {recipe.rank <= 3 ? (
                      recipe.rank === 1 ? <Crown className="w-5 h-5" /> : <Medal className="w-5 h-5" />
                    ) : (
                      <span className="font-normal text-sm">{recipe.rank}</span>
                    )}
                  </div>
                </div>
                
                {/* 텍스트 영역 */}
                <div className="p-4">
                  <h3 className={`font-normal text-black mb-1 group-hover:text-black transition-colors ${
                    recipe.rank <= 3 ? 'text-xl' : 'text-base'
                  }`}>
                    {recipe.title}
                  </h3>
                  <p className="text-warm-gray text-sm mb-3 line-clamp-1">
                    {recipe.description}
                  </p>
                  
                  {/* 메타 정보 */}
                  <div className="flex items-center justify-between text-xs text-muted">
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

