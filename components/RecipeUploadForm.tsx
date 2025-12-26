import React, { useState, useEffect } from 'react';
import { X, Upload, Image as ImageIcon } from 'lucide-react';
import { useUser, ALL_BADGES } from '../contexts/UserContext';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getDetailedRecipe } from '../data/recipes';

interface RecipeUploadFormProps {
  isOpen: boolean;
  onClose: () => void;
  baseRecipeId?: number | string;
}

export const RecipeUploadForm: React.FC<RecipeUploadFormProps> = ({ isOpen, onClose, baseRecipeId }) => {
  const { user, updateUserStats, addBadge, spiritNameToBadgeId } = useUser();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const [formData, setFormData] = useState({
    title: '',
    ingredients: '',
    description: '',
    image: null as File | null,
    imagePreview: null as string | null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // base 쿼리 파라미터 또는 baseRecipeId prop에서 기본 레시피 로드
  useEffect(() => {
    if (isOpen) {
      const baseId = baseRecipeId || searchParams.get('base');
      if (baseId) {
        const baseRecipe = getDetailedRecipe(baseId);
        if (baseRecipe) {
          setFormData(prev => ({
            ...prev,
            title: `${baseRecipe.title} 변형`,
            ingredients: baseRecipe.ingredients?.map(ing => `${ing.amount} ${ing.name}`).join('\n') || '',
            description: `원본 레시피 "${baseRecipe.title}"을 기반으로 한 나만의 변형 레시피입니다.`,
            imagePreview: baseRecipe.image || baseRecipe.heroImage || null,
          }));
        }
      } else {
        // 기본값으로 초기화
        setFormData({
          title: '',
          ingredients: '',
          description: '',
          image: null,
          imagePreview: null,
        });
      }
    }
  }, [isOpen, baseRecipeId, searchParams]);
  
  // 폼 닫힐 때 초기화
  useEffect(() => {
    if (!isOpen) {
      setFormData({
        title: '',
        ingredients: '',
        description: '',
        image: null,
        imagePreview: null,
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({
        ...formData,
        image: file,
        imagePreview: URL.createObjectURL(file),
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      alert('로그인이 필요합니다.');
      return;
    }

    if (!formData.title || !formData.ingredients || !formData.description) {
      alert('모든 필드를 입력해주세요.');
      return;
    }

    setIsSubmitting(true);

    try {
      // 실제로는 서버에 업로드하지만, 여기서는 localStorage에 저장
      const newRecipe = {
        id: `recipe-${Date.now()}`,
        title: formData.title,
        ingredients: formData.ingredients.split('\n').filter(Boolean),
        description: formData.description,
        image: formData.imagePreview || '/vege_flot_img/mushroom.png',
        author: user.username,
        authorId: user.id,
        authorSpirit: user.spiritName,
        authorBadges: user.badges,
        likes: 0,
        comments: 0,
        createdAt: new Date().toISOString(),
        tags: user.spiritName ? [user.spiritName] : [],
      };

      // localStorage에 저장 (실제로는 서버 API 호출)
      const existingRecipes = JSON.parse(localStorage.getItem('veggieverse-user-recipes') || '[]');
      existingRecipes.push(newRecipe);
      localStorage.setItem('veggieverse-user-recipes', JSON.stringify(existingRecipes));

      // 유저 통계 업데이트
      updateUserStats({ recipes: user.recipes + 1 });

      // 첫 레시피 배지 체크 (이미 updateUserStats에서 처리됨)
      
      // 스피릿 배지 체크
      let earnedBadge = null;
      let earnedCoupon = null;
      if (user.spiritName) {
        const badgeId = spiritNameToBadgeId(user.spiritName);
        if (badgeId) {
          earnedCoupon = addBadge(badgeId);
          if (earnedCoupon) {
            earnedBadge = { ...ALL_BADGES[badgeId], earnedAt: new Date().toISOString() };
          }
        }
      }
      
      // 성공 메시지 및 리다이렉트
      alert('레시피가 성공적으로 업로드되었습니다!');
      onClose();
      navigate(`/recipe/${newRecipe.id}`);
    } catch (error) {
      console.error('Recipe upload error:', error);
      alert('레시피 업로드에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setFormData({
      title: '',
      ingredients: '',
      description: '',
      image: null,
      imagePreview: null,
    });
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
    >
      <div 
        className="bg-white rounded-none shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 헤더 */}
        <div className="sticky top-0 bg-white border-b border-stone-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-stone-900">레시피 투고하기</h2>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-stone-100 transition-colors"
            aria-label="닫기"
          >
            <X className="w-5 h-5 text-stone-600" />
          </button>
        </div>

        {/* 폼 */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* 이미지 업로드 */}
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">
              레시피 사진
            </label>
            <div className="border-2 border-dashed border-stone-300 rounded-none p-8 text-center hover:border-emerald-400 transition-colors">
              {formData.imagePreview ? (
                <div className="relative">
                  <img
                    src={formData.imagePreview}
                    alt="미리보기"
                    className="max-h-64 mx-auto rounded-none"
                  />
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, image: null, imagePreview: null })}
                    className="absolute top-2 right-2 p-2 bg-black/50 text-white hover:bg-black/70 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <label className="cursor-pointer">
                  <ImageIcon className="w-12 h-12 text-stone-400 mx-auto mb-2" />
                  <p className="text-stone-600">클릭하여 이미지 업로드</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>

          {/* 제목 */}
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">
              레시피 제목 *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-3 border-2 border-stone-200 rounded-none focus:outline-none focus:border-emerald-500 transition-colors"
              placeholder="예: 크리미 버섯 리조또"
              required
            />
          </div>

          {/* 재료 */}
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">
              재료 * (줄바꿈으로 구분)
            </label>
            <textarea
              value={formData.ingredients}
              onChange={(e) => setFormData({ ...formData, ingredients: e.target.value })}
              className="w-full px-4 py-3 border-2 border-stone-200 rounded-none focus:outline-none focus:border-emerald-500 transition-colors resize-none"
              rows={6}
              placeholder="예:&#10;아르보리오 쌀 200g&#10;양송이버섯 150g&#10;양파 1개"
              required
            />
          </div>

          {/* 설명 */}
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">
              간단한 설명 *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-3 border-2 border-stone-200 rounded-none focus:outline-none focus:border-emerald-500 transition-colors resize-none"
              rows={4}
              placeholder="레시피에 대한 간단한 설명을 작성해주세요"
              required
            />
          </div>

          {/* 제출 버튼 */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 py-3 px-6 border-2 border-stone-300 text-stone-700 rounded-none font-medium hover:bg-stone-50 transition-colors"
            >
              취소
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-3 px-6 bg-emerald-600 text-white rounded-none font-medium hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  업로드 중...
                </>
              ) : (
                <>
                  <Upload className="w-5 h-5" />
                  레시피 업로드
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

