import React, { useState, ChangeEvent, FormEvent } from 'react';
import { X, Upload, Image as ImageIcon, Star, Camera } from 'lucide-react';
import { useUser } from '../contexts/UserContext';
import { ALL_BADGES, spiritNameToBadgeId } from '../contexts/UserContext';
import { ToastProps } from './Toast';
import { BadgeAcquisitionModal } from './BadgeAcquisitionModal';

interface PhotoReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipeId: number | string;
  recipeTitle: string;
  onReviewSubmitted: (review: PhotoReview) => void;
  onToast: (toast: Omit<ToastProps, 'id'>) => void;
}

export interface PhotoReview {
  id: string;
  authorId: string;
  authorName: string;
  authorSpirit: string | null;
  authorBadges: Array<{ id: string; emoji?: string; icon?: string }>;
  content: string;
  rating: number;
  image: string;
  createdAt: string;
}

export const PhotoReviewModal: React.FC<PhotoReviewModalProps> = ({
  isOpen,
  onClose,
  recipeId,
  recipeTitle,
  onReviewSubmitted,
  onToast,
}) => {
  const { user, updateUserStats, addBadge } = useUser();
  const [formData, setFormData] = useState({
    content: '',
    rating: 5,
    image: null as File | null,
    imagePreview: null as string | null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showBadgeModal, setShowBadgeModal] = useState(false);
  const [earnedBadgeData, setEarnedBadgeData] = useState<{
    spiritName?: string;
    badgeEmoji?: string;
    couponCode?: string;
    couponName?: string;
  } | null>(null);

  if (!isOpen) return null;

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({
        ...formData,
        image: file,
        imagePreview: URL.createObjectURL(file),
      });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      onToast({
        type: 'info',
        title: '로그인이 필요합니다',
        message: '로그인 후 리뷰를 작성할 수 있습니다.',
      });
      return;
    }

    if (!formData.image) {
      onToast({
        type: 'info',
        title: '사진이 필요합니다',
        message: '요리 완료 사진을 업로드해야 인증이 완료됩니다.',
      });
      return;
    }

    if (!formData.content.trim()) {
      onToast({
        type: 'info',
        title: '한 줄 평을 작성해주세요',
        message: '요리에 대한 간단한 후기를 남겨주세요.',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // 실제로는 서버에 업로드하지만, 여기서는 localStorage에 저장
      const review: PhotoReview = {
        id: `review-${Date.now()}`,
        authorId: user.id,
        authorName: user.username,
        authorSpirit: user.spiritName,
        authorBadges: user.badges.map(b => ({ id: b.id, emoji: b.emoji || b.icon || '🏆' })),
        content: formData.content.trim(),
        rating: formData.rating,
        image: formData.imagePreview || '',
        createdAt: new Date().toISOString(),
      };

      // 리뷰 저장
      const existingReviews = JSON.parse(
        localStorage.getItem(`veggieverse-recipe-${recipeId}-reviews`) || '[]'
      );
      existingReviews.push(review);
      localStorage.setItem(
        `veggieverse-recipe-${recipeId}-reviews`,
        JSON.stringify(existingReviews)
      );

      // 유저 통계 업데이트
      updateUserStats({ comments: user.comments + 1 });

      // 스피릿 배지 체크
      let earnedBadge = null;
      let earnedCoupon = null;
      if (user.spiritName) {
        const badgeId = spiritNameToBadgeId(user.spiritName);
        if (badgeId) {
          earnedCoupon = addBadge(badgeId);
          if (earnedCoupon) {
            earnedBadge = ALL_BADGES[badgeId];
          }
        }
      }

      // 배지 획득 모달 표시
      if (earnedBadge && earnedCoupon) {
        setEarnedBadgeData({
          spiritName: user.spiritName,
          badgeEmoji: earnedBadge.icon,
          couponCode: earnedCoupon.code,
          couponName: `슬런치 팩토리 ${earnedCoupon.discount}${earnedCoupon.type === 'percentage' ? '%' : '원'} 할인 쿠폰`,
        });
        setShowBadgeModal(true);
      } else {
        // 배지가 없으면 일반 토스트만 표시
        onToast({
          type: 'success',
          title: '리뷰 완료',
          message: '포토 리뷰가 성공적으로 등록되었습니다.',
        });
      }

      // 리뷰 제출 콜백
      onReviewSubmitted(review);

      // 폼 초기화 및 닫기 (배지 모달이 없을 때만)
      if (!earnedBadge || !earnedCoupon) {
        setFormData({
          content: '',
          rating: 5,
          image: null,
          imagePreview: null,
        });
        onClose();
      }
    } catch (error) {
      console.error('Review submission error:', error);
      onToast({
        type: 'info',
        title: '리뷰 작성 실패',
        message: '다시 시도해주세요.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setFormData({
      content: '',
      rating: 5,
      image: null,
      imagePreview: null,
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={handleClose}
    >
      <div
        className="bg-white rounded-none shadow-2xl max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-stone-900">I Made It! 요리 완료 인증하기</h2>
            <p className="text-sm text-stone-500 mt-1">{recipeTitle}</p>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-stone-100 transition-colors rounded-none"
          >
            <X className="w-5 h-5 text-stone-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 사진 업로드 */}
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">
              요리 완료 사진 <span className="text-red-500">*</span>
              <span className="text-xs text-stone-500 ml-2 font-normal">(필수: 직접 만든 요리 사진을 업로드해야 인증이 완료됩니다)</span>
            </label>
            <div className="flex items-center space-x-4">
              <div className="w-32 h-32 border-2 border-stone-200 rounded-none flex items-center justify-center overflow-hidden bg-stone-50">
                {formData.imagePreview ? (
                  <img
                    src={formData.imagePreview}
                    alt="Review Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Camera className="w-8 h-8 text-stone-400" />
                )}
              </div>
              <div className="flex-1">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="block w-full text-sm text-stone-500 file:mr-4 file:py-2 file:px-4 file:rounded-none file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
                  required
                />
                <p className="text-xs text-stone-500 mt-2 font-medium">
                  ⚠️ 사진 없이는 인증이 완료되지 않습니다. 직접 만든 요리 사진을 업로드해주세요.
                </p>
              </div>
            </div>
          </div>

          {/* 별점 */}
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">
              별점 <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setFormData({ ...formData, rating: star })}
                  className="focus:outline-none"
                >
                  <Star
                    className={`w-8 h-8 transition-colors ${
                      star <= formData.rating
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-stone-300'
                    }`}
                  />
                </button>
              ))}
              <span className="ml-2 text-stone-600 font-medium">
                {formData.rating} / 5
              </span>
            </div>
          </div>

          {/* 한 줄 평 */}
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-stone-700 mb-2">
              한 줄 평 <span className="text-red-500">*</span>
            </label>
            <textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              rows={3}
              className="w-full p-3 border-2 border-stone-200 rounded-none focus:outline-none focus:border-emerald-400 resize-y"
              placeholder="이 레시피에 대한 간단한 후기를 작성해주세요..."
              required
            />
          </div>

          {/* 제출 버튼 */}
          <button
            type="submit"
            className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-none font-semibold transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="animate-spin inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                인증 중...
              </>
            ) : (
              <>
                <Upload className="w-5 h-5" />
                포토 리뷰 인증하고 배지 받기
              </>
            )}
          </button>
        </form>
      </div>

      {/* 배지 획득 모달 */}
      {earnedBadgeData && (
        <BadgeAcquisitionModal
          isOpen={showBadgeModal}
          onClose={handleBadgeModalClose}
          spiritName={earnedBadgeData.spiritName}
          badgeEmoji={earnedBadgeData.badgeEmoji}
          couponCode={earnedBadgeData.couponCode}
          couponName={earnedBadgeData.couponName}
        />
      )}
    </div>
  );
};

