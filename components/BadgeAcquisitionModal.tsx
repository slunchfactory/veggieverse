import React, { useEffect, useState } from 'react';
import { X, Sparkles, Gift } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BadgeAcquisitionModalProps {
  isOpen: boolean;
  onClose: () => void;
  spiritName?: string;
  badgeEmoji?: string;
  couponCode?: string;
  couponName?: string;
}

export const BadgeAcquisitionModal: React.FC<BadgeAcquisitionModalProps> = ({
  isOpen,
  onClose,
  spiritName,
  badgeEmoji = '🏆',
  couponCode,
  couponName = '슬런치 팩토리 10% 할인 쿠폰',
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [showParticles, setShowParticles] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      setShowParticles(true);
      // 3초 후 파티클 애니메이션 종료
      const timer = setTimeout(() => {
        setShowParticles(false);
      }, 3000);
      return () => clearTimeout(timer);
    } else {
      setIsAnimating(false);
      setShowParticles(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* 배경 오버레이 */}
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[3000] transition-opacity duration-300"
        onClick={onClose}
        style={{
          animation: isOpen ? 'fadeIn 0.3s ease-out' : 'none',
        }}
      />

      {/* 모달 컨테이너 */}
      <div
        className="fixed inset-0 z-[3001] flex items-center justify-center p-4 pointer-events-none"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={`bg-white rounded-3xl shadow-2xl w-full max-w-md pointer-events-auto transform transition-all duration-500 ease-out ${
            isAnimating
              ? 'translate-y-0 opacity-100 scale-100'
              : 'translate-y-8 opacity-0 scale-95'
          }`}
          style={{
            padding: '4.5rem 3.75rem',
          }}
        >
          {/* 닫기 버튼 */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center text-stone-400 hover:text-stone-600 transition-colors"
            aria-label="닫기"
          >
            <X className="w-5 h-5" strokeWidth={1.5} />
          </button>

          {/* 파티클 애니메이션 영역 */}
          {showParticles && (
            <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-amber-300 rounded-full opacity-60"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animation: `floatUp ${2 + Math.random() * 2}s ease-out forwards`,
                    animationDelay: `${Math.random() * 0.5}s`,
                  }}
                />
              ))}
            </div>
          )}

          {/* 콘텐츠 */}
          <div className="relative">
            {/* 상단: 축하 영역 */}
            <div className="text-center mb-8">
              {/* 배지 아이콘 애니메이션 */}
              <div
                className="mb-6 flex justify-center"
                style={{
                  animation: isAnimating ? 'bounceIn 0.8s ease-out' : 'none',
                }}
              >
                <div className="relative">
                  <div className="w-24 h-24 bg-gradient-to-br from-amber-50 to-orange-50 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-5xl">{badgeEmoji}</span>
                  </div>
                  {/* 반짝이는 효과 */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                </div>
              </div>

              {/* 축하 메시지 */}
              <h2 className="text-2xl font-bold text-stone-900 mb-3" style={{ fontFamily: 'Noto Sans KR, sans-serif', fontSize: '24px' }}>
                미션 완료!
              </h2>
              {spiritName && (
                <p className="text-lg text-stone-700 mb-6" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>
                  <span className="font-bold">{spiritName}</span> 배지를 획득했습니다
                </p>
              )}
            </div>

            {/* 중앙: 보상 영역 */}
            {couponCode && (
              <div className="mb-10">
                <div className="bg-gradient-to-br from-stone-50 to-stone-100 rounded-2xl p-8 shadow-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                      <Gift className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-sm text-stone-600 mb-1" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>
                        {couponName} 발급 완료
                      </p>
                      <p className="text-xs text-stone-500" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>
                        쿠폰 코드
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-stone-200">
                    <p
                      className="text-2xl font-medium text-stone-900 text-center tracking-wider font-accent"
                      style={{ fontFamily: 'Montserrat, sans-serif', letterSpacing: '0.1em' }}
                    >
                      {couponCode}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* 하단: 액션 버튼 */}
            <div className="space-y-5 mt-8">
              {/* 메인 버튼 */}
              <Link
                to="/profile"
                onClick={onClose}
                className="block w-full py-4 bg-stone-900 hover:bg-stone-800 text-white rounded-2xl font-medium text-center transition-colors duration-200 shadow-lg"
                style={{ fontFamily: 'Noto Sans KR, sans-serif' }}
              >
                내 프로필에서 배지 확인하기
              </Link>

              {/* 보조 링크 */}
              <button
                onClick={onClose}
                className="block w-full text-center text-sm text-stone-500 hover:text-stone-700 transition-colors py-3"
                style={{ fontFamily: 'Noto Sans KR, sans-serif' }}
              >
                계속 레시피 보기
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes bounceIn {
          0% {
            transform: scale(0.3) translateY(20px);
            opacity: 0;
          }
          50% {
            transform: scale(1.1) translateY(-5px);
          }
          70% {
            transform: scale(0.95) translateY(0);
          }
          100% {
            transform: scale(1) translateY(0);
            opacity: 1;
          }
        }

        @keyframes floatUp {
          0% {
            transform: translateY(0) scale(1);
            opacity: 0.6;
          }
          100% {
            transform: translateY(-100px) scale(0);
            opacity: 0;
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%) rotate(45deg);
          }
          100% {
            transform: translateX(200%) rotate(45deg);
          }
        }

        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </>
  );
};

