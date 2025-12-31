import React, { useState, ChangeEvent, FormEvent } from 'react';
import { X } from 'lucide-react';
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

      const existingReviews = JSON.parse(
        localStorage.getItem(`veggieverse-recipe-${recipeId}-reviews`) || '[]'
      );
      existingReviews.push(review);
      localStorage.setItem(
        `veggieverse-recipe-${recipeId}-reviews`,
        JSON.stringify(existingReviews)
      );

      updateUserStats({ comments: user.comments + 1 });

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

      if (earnedBadge && earnedCoupon) {
        setEarnedBadgeData({
          spiritName: user.spiritName,
          badgeEmoji: earnedBadge.icon,
          couponCode: earnedCoupon.code,
          couponName: `슬런치 팩토리 ${earnedCoupon.discount}${earnedCoupon.type === 'percentage' ? '%' : '원'} 할인 쿠폰`,
        });
        setShowBadgeModal(true);
      } else {
        onToast({
          type: 'success',
          title: '리뷰 완료',
          message: '포토 리뷰가 성공적으로 등록되었습니다.',
        });
      }

      onReviewSubmitted(review);

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

  const handleBadgeModalClose = () => {
    setShowBadgeModal(false);
    setEarnedBadgeData(null);
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
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.4)' }}
      onClick={handleClose}
    >
      <div
        style={{
          background: '#FFFFFF',
          border: '1px solid #000',
          borderRadius: '16px',
          maxWidth: '480px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          padding: '24px 24px 0',
        }}>
          <div>
            <h2 style={{
              fontSize: '18px',
              fontWeight: 400,
              color: '#000',
              marginBottom: '4px',
            }}>
              요리 인증
            </h2>
            <p style={{
              fontSize: '13px',
              fontWeight: 400,
              color: '#888',
            }}>
              {recipeTitle}
            </p>
          </div>
          <button
            onClick={handleClose}
            style={{
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
            }}
            aria-label="닫기"
          >
            <X size={20} strokeWidth={1} color="#000" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ padding: '24px' }}>
          {/* 사진 업로드 */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block',
              fontSize: '13px',
              fontWeight: 400,
              color: '#000',
              marginBottom: '8px',
            }}>
              사진 첨부
            </label>
            <div
              style={{
                border: '1px solid #000',
                borderRadius: '8px',
                padding: '24px',
                textAlign: 'center',
                cursor: 'pointer',
                position: 'relative',
                minHeight: '120px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onClick={() => document.getElementById('photo-input')?.click()}
            >
              {formData.imagePreview ? (
                <img
                  src={formData.imagePreview}
                  alt="Preview"
                  style={{
                    maxWidth: '100%',
                    maxHeight: '200px',
                    objectFit: 'contain',
                    borderRadius: '4px',
                  }}
                />
              ) : (
                <span style={{
                  fontSize: '14px',
                  fontWeight: 400,
                  color: '#888',
                }}>
                  사진 첨부
                </span>
              )}
              <input
                id="photo-input"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: 'none' }}
              />
            </div>
          </div>

          {/* 별점 */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block',
              fontSize: '13px',
              fontWeight: 400,
              color: '#000',
              marginBottom: '8px',
            }}>
              별점
            </label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setFormData({ ...formData, rating: star })}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '2px',
                  }}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill={star <= formData.rating ? '#000' : 'none'}
                    stroke="#000"
                    strokeWidth="1"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                </button>
              ))}
              <span style={{
                marginLeft: '8px',
                fontSize: '13px',
                fontWeight: 400,
                color: '#666',
              }}>
                {formData.rating} / 5
              </span>
            </div>
          </div>

          {/* 한 줄 평 */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block',
              fontSize: '13px',
              fontWeight: 400,
              color: '#000',
              marginBottom: '8px',
            }}>
              한 줄 평
            </label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              rows={3}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #000',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 400,
                resize: 'none',
                outline: 'none',
                boxSizing: 'border-box',
              }}
              placeholder="요리에 대한 간단한 후기를 남겨주세요"
            />
          </div>

          {/* 버튼 영역 */}
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              type="button"
              onClick={handleClose}
              style={{
                flex: 1,
                padding: '14px',
                background: 'transparent',
                border: '1px solid #000',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 400,
                color: '#000',
                cursor: 'pointer',
              }}
            >
              취소
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                flex: 1,
                padding: '14px',
                background: '#000',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 400,
                color: '#fff',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                opacity: isSubmitting ? 0.6 : 1,
              }}
            >
              {isSubmitting ? '인증 중...' : '인증하기'}
            </button>
          </div>
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
