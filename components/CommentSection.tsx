import React, { useState, useEffect } from 'react';
import { Star, ChevronRight, Camera, Upload } from 'lucide-react';
import { useUser } from '../contexts/UserContext';
import { PhotoReview } from './PhotoReviewModal';

interface CommentSectionProps {
  recipeId: string | number;
  photoReviews?: PhotoReview[];
  onReviewSubmitted?: (review: PhotoReview) => void;
}

type SortOption = 'recommended' | 'latest';

export const CommentSection: React.FC<CommentSectionProps> = ({ 
  recipeId, 
  photoReviews = [],
  onReviewSubmitted 
}) => {
  const { user } = useUser();
  const [reviews, setReviews] = useState<PhotoReview[]>(photoReviews);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState<SortOption>('recommended');
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [expandedReviews, setExpandedReviews] = useState<Set<string>>(new Set());

  // 외부에서 전달된 리뷰가 업데이트되면 반영
  useEffect(() => {
    if (photoReviews && photoReviews.length > 0) {
      setReviews(photoReviews);
    }
  }, [photoReviews]);

  // onReviewSubmitted가 호출되면 리뷰 목록에 추가
  useEffect(() => {
    if (onReviewSubmitted) {
      // 이 효과는 부모 컴포넌트에서 handleReviewSubmitted를 통해 처리됩니다
    }
  }, [onReviewSubmitted]);

  const reviewsPerPage = 5;
  const photoGridLimit = 6;

  // 포토 리뷰 로드
  useEffect(() => {
    const storageKey = `veggieverse-recipe-${recipeId}-reviews`;
    const savedReviews = localStorage.getItem(storageKey);
    
    if (savedReviews) {
      try {
        const parsed = JSON.parse(savedReviews);
        setReviews(parsed);
      } catch (e) {
        console.error('Failed to load reviews:', e);
      }
    } else {
      // 더미 리뷰 데이터 생성 (테스트용)
      const dummyReviews: PhotoReview[] = [
        {
          id: `review-dummy-1-${recipeId}`,
          authorId: 'wjd123456',
          authorName: 'wjd*******',
          authorSpirit: 'Bloomist',
          authorBadges: [{ id: 'spirit-bloomist', emoji: '🌻' }],
          content: '정말 맛있게 만들었어요! 레시피대로 따라했는데 완벽했어요. 가족들이 모두 좋아하시네요. 특히 양념이 정말 맛있었어요. 다음에도 또 만들어볼게요! ❤️',
          rating: 5,
          image: '/vege_flot_img/tomato.png', // 임시 이미지
          createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2일 전
        },
        {
          id: `review-dummy-2-${recipeId}`,
          authorId: 'jin789012',
          authorName: 'jin*******',
          authorSpirit: 'Groundtype',
          authorBadges: [{ id: 'spirit-groundtype', emoji: '🥦' }],
          content: '레시피가 정말 자세해서 초보자인 저도 쉽게 만들 수 있었어요. 재료도 간단하고 만들기도 편해서 자주 만들어 먹고 있어요. 강력 추천합니다! ✨',
          rating: 5,
          image: '/vege_flot_img/carrot.png', // 임시 이미지
          createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5일 전
        },
        {
          id: `review-dummy-3-${recipeId}`,
          authorId: 'kim345678',
          authorName: 'kim*******',
          authorSpirit: 'Mindgrower',
          authorBadges: [{ id: 'spirit-mindgrower', emoji: '🌿' }],
          content: '처음 만들어봤는데 생각보다 어렵지 않았어요. 다만 조금 더 간을 맞춰서 만들면 좋을 것 같아요. 전체적으로는 만족스러워요! 🐰',
          rating: 4,
          image: '/vege_flot_img/pepper.png', // 임시 이미지
          createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7일 전
        },
      ];
      
      // localStorage에 저장
      localStorage.setItem(storageKey, JSON.stringify(dummyReviews));
      setReviews(dummyReviews);
    }
  }, [recipeId]);

  // photoReviews prop이 변경되면 업데이트
  useEffect(() => {
    if (photoReviews.length > 0) {
      setReviews(prev => {
        const newReviews = [...photoReviews];
        const existingIds = new Set(prev.map(r => r.id));
        prev.forEach(r => {
          if (!existingIds.has(r.id)) {
            newReviews.push(r);
          }
        });
        return newReviews;
      });
    }
  }, [photoReviews]);

  // 리뷰 정렬
  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortOption === 'latest') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else {
      // 추천순: 별점 높은 순, 같은 별점이면 최신순
      if (b.rating !== a.rating) {
        return b.rating - a.rating;
      }
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });

  // 페이지네이션 계산
  const totalPages = Math.ceil(sortedReviews.length / reviewsPerPage);
  const startIndex = (currentPage - 1) * reviewsPerPage;
  const paginatedReviews = sortedReviews.slice(startIndex, startIndex + reviewsPerPage);

  // 포토 그리드용 리뷰 (이미지가 있는 리뷰만)
  const photoReviewsOnly = reviews.filter(r => r.image && r.image.trim() !== '');
  const photoGridItems = photoReviewsOnly.slice(0, photoGridLimit);
  const remainingPhotos = Math.max(0, photoReviewsOnly.length - photoGridLimit);

  // 평균 별점 계산
  const averageRating = reviews.length > 0
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0;

  // 사용자 ID 마스킹
  const maskUserId = (userId: string): string => {
    if (userId.length <= 3) return userId;
    return userId.substring(0, 3) + '*'.repeat(userId.length - 3);
  };

  // 날짜 포맷팅
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).replace(/\./g, '.').replace(/\s/g, '');
  };

  // 텍스트 더보기 토글
  const toggleExpand = (reviewId: string) => {
    setExpandedReviews(prev => {
      const newSet = new Set(prev);
      if (newSet.has(reviewId)) {
        newSet.delete(reviewId);
      } else {
        newSet.add(reviewId);
      }
      return newSet;
    });
  };

  // 텍스트 길이 제한 (100자)
  const shouldTruncate = (text: string): boolean => text.length > 100;

  return (
    <section>
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <h2 className="text-stone-900 font-normal" style={{ fontSize: '22px', fontWeight: 600 }}>리뷰</h2>
          <span className="text-sm text-stone-500">({reviews.length})</span>
          {reviews.length > 0 && (
            <div className="flex items-center gap-1 ml-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-4 h-4 ${
                    star <= Math.round(averageRating)
                      ? 'fill-amber-400 text-amber-400'
                      : 'text-stone-300'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
        {reviews.length > 0 && (
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSortOption('recommended')}
              className={`text-xs text-stone-500 hover:text-stone-900 transition-colors ${
                sortOption === 'recommended' ? 'text-stone-900 font-medium' : ''
              }`}
            >
              추천순
            </button>
            <span className="text-stone-300">|</span>
            <button
              onClick={() => setSortOption('latest')}
              className={`text-xs text-stone-500 hover:text-stone-900 transition-colors ${
                sortOption === 'latest' ? 'text-stone-900 font-medium' : ''
              }`}
            >
              최신순
            </button>
          </div>
        )}
      </div>

      {/* 포토 리뷰 하이라이트 그리드 */}
      {photoGridItems.length > 0 && (
        <div className="mb-8">
          <div className="grid grid-cols-6 gap-2">
            {photoGridItems.map((review, idx) => {
              const isLast = idx === photoGridLimit - 1;
              const showMoreOverlay = isLast && remainingPhotos > 0;
              
              return (
                <div
                  key={review.id}
                  className="relative aspect-square rounded-none overflow-hidden bg-stone-100 cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => {
                    if (showMoreOverlay) {
                      // 전체 포토 리뷰 모달 열기 (추후 구현)
                      setShowPhotoModal(true);
                    }
                  }}
                >
                  {review.image && (
                    <img
                      src={review.image}
                      alt={`리뷰 사진 ${idx + 1}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  )}
                  {showMoreOverlay && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <span className="text-white text-sm font-medium">
                        더보기 +{remainingPhotos}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
            {/* 빈 슬롯 채우기 (6개 미만일 때) */}
            {photoGridItems.length < photoGridLimit && 
              Array.from({ length: photoGridLimit - photoGridItems.length }).map((_, idx) => (
                <div
                  key={`empty-${idx}`}
                  className="aspect-square rounded-none bg-stone-50"
                />
              ))
            }
          </div>
        </div>
      )}


      {/* 리뷰 리스트 */}
      {paginatedReviews.length === 0 ? (
        <div className="py-12 text-center text-stone-500 text-sm">
          아직 리뷰가 없습니다. 첫 리뷰를 작성해보세요!
        </div>
      ) : (
        <div className="space-y-0">
          {paginatedReviews.map((review, idx) => {
            const isExpanded = expandedReviews.has(review.id);
            const shouldShowMore = shouldTruncate(review.content);
            const displayContent = isExpanded || !shouldShowMore
              ? review.content
              : review.content.substring(0, 100) + '...';

            return (
              <div
                key={review.id}
                className={`py-4 ${idx < paginatedReviews.length - 1 ? 'border-b border-black' : ''}`}
              >
                <div className="flex items-start gap-4">
                  {/* 메인 콘텐츠 */}
                  <div className="flex-1 min-w-0">
                    {/* 상단: 별점, 작성자, 날짜 */}
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center gap-0.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-3.5 h-3.5 ${
                              star <= review.rating
                                ? 'fill-amber-400 text-amber-400'
                                : 'text-stone-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-stone-500">
                        {maskUserId(review.authorId)}
                      </span>
                      <span className="text-xs text-stone-400">
                        {formatDate(review.createdAt)}
                      </span>
                    </div>

                    {/* 본문 텍스트 */}
                    <p className="text-sm text-stone-700 leading-relaxed mb-2">
                      {displayContent}
                    </p>

                    {/* 더보기 버튼 */}
                    {shouldShowMore && (
                      <button
                        onClick={() => toggleExpand(review.id)}
                        className="text-xs text-stone-500 hover:text-stone-700 transition-colors"
                      >
                        {isExpanded ? '접기' : '더보기'}
                      </button>
                    )}
                  </div>

                  {/* 우측 썸네일 */}
                  {review.image && (
                    <div className="flex-shrink-0 w-20 h-20 rounded-none overflow-hidden bg-stone-100">
                      <img
                        src={review.image}
                        alt={`${review.authorName}의 리뷰 사진`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-8">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-8 h-8 flex items-center justify-center text-sm transition-colors ${
                currentPage === page
                  ? 'font-normal text-stone-900'
                  : 'text-stone-400 hover:text-stone-700'
              }`}
            >
              {page}
            </button>
          ))}
          {currentPage < totalPages && (
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              className="w-8 h-8 flex items-center justify-center text-stone-400 hover:text-stone-700 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      )}
    </section>
  );
};
