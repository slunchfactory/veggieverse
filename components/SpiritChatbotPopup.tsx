import React, { useState, useEffect } from 'react';
import { X, Camera, Sparkles, Gift } from 'lucide-react';
import { useUser } from '../contexts/UserContext';
import { PhotoReviewModal } from './PhotoReviewModal';
import { BadgeAcquisitionModal } from './BadgeAcquisitionModal';
import { ALL_BADGES, spiritNameToBadgeId } from '../contexts/UserContext';
import { PhotoReview } from './CommentSection';

const AVATAR_IMG = '/veggieverse/characters/slunch-character.png';
const AVATAR_VIDEO = '/veggieverse/characters/slunch-character-move.mp4';

interface SpiritChatbotPopupProps {
  recipeId: number | string;
  recipeTitle: string;
  onReviewSubmitted?: (review: PhotoReview) => void;
  onToast?: (toast: any) => void;
}

export const SpiritChatbotPopup: React.FC<SpiritChatbotPopupProps> = ({
  recipeId,
  recipeTitle,
  onReviewSubmitted,
  onToast,
}) => {
  const { user, addBadge, updateUserStats } = useUser();
  const [isVisible, setIsVisible] = useState(false);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [showBadgeModal, setShowBadgeModal] = useState(false);
  const [earnedBadgeData, setEarnedBadgeData] = useState<{
    spiritName?: string;
    badgeEmoji?: string;
    couponCode?: string;
    couponName?: string;
  } | null>(null);
  const [isMinimized, setIsMinimized] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [avatarError, setAvatarError] = useState(false);

  // 팝업 표시 조건 체크
  useEffect(() => {
    if (!user || hasInteracted) return;

    // 스크롤 위치 체크 (페이지 하단 80% 도달 시)
    const handleScroll = () => {
      const scrollPercentage = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight;
      if (scrollPercentage > 0.8 && !isVisible && !hasInteracted) {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // 초기 체크

    return () => window.removeEventListener('scroll', handleScroll);
  }, [user, isVisible, hasInteracted]);

  // 리뷰 작성 완료 시 팝업 표시
  const handleReviewSubmitted = (review: PhotoReview) => {
    if (onReviewSubmitted) {
      onReviewSubmitted(review);
    }
    
    // 리뷰 작성 완료 후 챗봇 팝업 표시
    if (!hasInteracted) {
      setIsVisible(true);
    }
  };

  // 사진 올리기 버튼 클릭
  const handleUploadPhoto = () => {
    setShowPhotoModal(true);
    setIsMinimized(true);
    setHasInteracted(true);
  };

  // 나중에 하기 버튼 클릭
  const handleLater = () => {
    setIsVisible(false);
    setHasInteracted(true);
  };

  // 팝업 닫기
  const handleClose = () => {
    setIsVisible(false);
    setHasInteracted(true);
  };

  // 포토 리뷰 제출 완료 처리
  const handlePhotoReviewSubmitted = (review: PhotoReview) => {
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
    if (user) {
      updateUserStats({ comments: (user.comments || 0) + 1 });

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
        setShowPhotoModal(false);
      }
    }

    // 리뷰 제출 콜백
    if (onReviewSubmitted) {
      onReviewSubmitted(review);
    }

    // 챗봇 팝업 닫기
    setIsVisible(false);
    setHasInteracted(true);
  };

  // 배지 모달 닫기
  const handleBadgeModalClose = () => {
    setShowBadgeModal(false);
    setEarnedBadgeData(null);
  };

  if (!isVisible || !user) return null;

  return (
    <>
      {/* 챗봇 팝업 - 기존 챗봇 스타일 */}
      <div
        className={`fixed bottom-24 right-4 sm:bottom-28 sm:right-6 z-[2500] transition-all duration-500 ease-out ${
          isVisible && !isMinimized
            ? 'opacity-100 translate-y-0 scale-100'
            : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
        }`}
      >
        <div className="flex items-end gap-3 max-w-sm">
          {/* 캐릭터 아바타 - 기존 챗봇과 동일 */}
          <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14">
            {avatarError ? (
              <div className="w-full h-full rounded-none bg-gradient-to-br from-lime-200 via-emerald-200 to-amber-200 flex items-center justify-center text-xl">
                🍉
              </div>
            ) : (
              <img
                src={AVATAR_IMG}
                alt="챗봇"
                className="w-full h-full rounded-none object-cover"
                onError={() => setAvatarError(true)}
                draggable={false}
              />
            )}
          </div>

          {/* 말풍선 - 기존 챗봇 스타일 */}
          <div className="bg-white rounded-none shadow-xl border border-stone-200 p-4 relative flex-1">
            {/* 닫기 버튼 */}
            <button
              onClick={handleClose}
              className="absolute top-2 right-2 w-5 h-5 flex items-center justify-center text-stone-400 hover:text-stone-600 transition-colors"
              aria-label="닫기"
            >
              <X className="w-4 h-4" strokeWidth={1.5} />
            </button>

            {/* 메시지 */}
            <div className="pr-6">
              <p className="text-sm text-stone-900 mb-4 leading-relaxed" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>
                벌써 다 만드셨나요? 요리 사진을 공유해주시면 제가 특별한 선물을 드릴게요! 🎁
              </p>

              {/* 버튼들 */}
              <div className="flex flex-col gap-2">
                <button
                  onClick={handleUploadPhoto}
                  className="w-full py-2.5 px-4 bg-black hover:opacity-90 text-white rounded-none font-normal text-sm transition-colors duration-200 flex items-center justify-center gap-2"
                  style={{ fontFamily: 'Noto Sans KR, sans-serif' }}
                >
                  <Camera className="w-4 h-4" />
                  사진 올리기
                </button>
                <button
                  onClick={handleLater}
                  className="w-full py-2 px-4 text-stone-500 hover:text-stone-700 text-sm transition-colors text-center"
                  style={{ fontFamily: 'Noto Sans KR, sans-serif' }}
                >
                  나중에 하기
                </button>
              </div>
            </div>

            {/* 말풍선 꼬리 (왼쪽) */}
            <div className="absolute bottom-4 left-0 w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-r-[8px] border-r-white transform -translate-x-full" />
            <div className="absolute bottom-4 left-0 w-0 h-0 border-t-[9px] border-t-transparent border-b-[9px] border-b-transparent border-r-[9px] border-r-stone-200 transform -translate-x-full -z-10" />
          </div>
        </div>
      </div>

      {/* 포토 리뷰 모달 */}
      <PhotoReviewModal
        isOpen={showPhotoModal}
        onClose={() => {
          setShowPhotoModal(false);
          setIsMinimized(false);
        }}
        recipeId={recipeId}
        recipeTitle={recipeTitle}
        onReviewSubmitted={handlePhotoReviewSubmitted}
        onToast={onToast || (() => {})}
      />

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
    </>
  );
};

