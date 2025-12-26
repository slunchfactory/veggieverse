import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trophy, ChefHat, Upload, Sparkles } from 'lucide-react';
import { useUser } from '../contexts/UserContext';
import { getDetailedRecipe, allRecipes } from '../data/recipes';

interface SpiritMissionCardProps {
  recipeId?: number;
  onPhotoReviewClick?: () => void;
}

export const SpiritMissionCard: React.FC<SpiritMissionCardProps> = ({ recipeId, onPhotoReviewClick }) => {
  const { user } = useUser();
  const navigate = useNavigate();

  if (!user || !user.spiritName) {
    return null;
  }

  // 현재 레시피의 태그와 유저 스피릿 태그가 일치하는 랜덤 레시피 찾기
  const getRandomSpiritRecipe = () => {
    if (!recipeId) {
      // 레시피 ID가 없으면 스피릿 태그와 일치하는 레시피 중 랜덤 선택
      const spiritTaggedRecipes = allRecipes.filter(recipe => 
        recipe.tags?.some(tag => 
          ['고단백', '효율적', '자연주의', '간편조리', '원팟요리', '식단계획표'].includes(tag)
        )
      );
      if (spiritTaggedRecipes.length > 0) {
        return spiritTaggedRecipes[Math.floor(Math.random() * spiritTaggedRecipes.length)];
      }
    } else {
      // 현재 레시피를 기반으로 유사한 레시피 찾기
      const currentRecipe = getDetailedRecipe(recipeId);
      const similarRecipes = allRecipes.filter(
        r => r.id !== recipeId && 
        r.tags?.some(tag => currentRecipe.tags?.includes(tag))
      );
      if (similarRecipes.length > 0) {
        return similarRecipes[Math.floor(Math.random() * similarRecipes.length)];
      }
    }
    // 기본값: 첫 번째 레시피
    return allRecipes[0] || null;
  };

  const randomRecipe = getRandomSpiritRecipe();

  const handleFollowRecipe = () => {
    if (randomRecipe) {
      navigate(`/recipe/${randomRecipe.id}?review=true`);
    }
  };

  const handleUploadRecipe = () => {
    if (recipeId) {
      navigate(`/recipe?upload=true&base=${recipeId}`);
    } else {
      navigate('/recipe?upload=true');
    }
  };

  return (
    <section>
      <div>
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-stone-900">
            ✦ {user.spiritName}만을 위한 오늘의 스피릿 미션
          </h2>
        </div>

        {/* 미션 설명 */}
        <div className="mb-6">
          <p className="text-sm text-stone-600 leading-relaxed mb-4">
            {user.spiritName} 스피릿의 특성에 맞는 레시피를 따라해보고, 나만의 변형 레시피를 공유해보세요.
          </p>
          <p className="text-xs text-stone-500">
            미션 완료 시 스피릿 배지와 스토어 혜택이 지급됩니다
          </p>
        </div>

        {/* 메인 액션 버튼 - 포토 리뷰 인증 (중앙에 크게) */}
        <div className="mb-4">
          <button
            onClick={onPhotoReviewClick || (() => {})}
            className="w-full py-4 bg-stone-900 hover:bg-stone-800 text-white rounded-md font-bold text-base transition-colors flex items-center justify-center gap-2"
          >
            <ChefHat className="w-5 h-5" />
            <span>I Made It! 요리 완료 인증하고 배지 받기</span>
          </button>
        </div>

        {/* 보조 액션 버튼 */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleFollowRecipe}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-white border border-stone-300 text-stone-700 rounded-md text-sm font-medium hover:bg-stone-50 transition-colors"
          >
            <ChefHat className="w-4 h-4" />
            <span>다른 레시피 보기</span>
          </button>
          <button
            onClick={handleUploadRecipe}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-white border border-stone-300 text-stone-700 rounded-md text-sm font-medium hover:bg-stone-50 transition-colors"
          >
            <Upload className="w-4 h-4" />
            <span>레시피 투고하기</span>
          </button>
        </div>

        {/* 보상 안내 */}
        <div className="mt-4 pt-4 border-t border-stone-100">
          <p className="text-xs text-stone-500 text-center">
            미션 완료 시 <span className="font-medium text-stone-900">{user.spiritName} 배지</span>와{' '}
            <span className="font-medium text-stone-900">스토어 10% 할인 쿠폰</span>이 자동으로 지급됩니다
          </p>
        </div>
      </div>
    </section>
  );
};

