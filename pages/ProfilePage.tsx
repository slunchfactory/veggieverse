import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Trophy, Gift, User, ChefHat, MessageCircle, Heart } from 'lucide-react';
import { useUser } from '../contexts/UserContext';
import { ALL_BADGES } from '../contexts/UserContext';

const ProfilePage: React.FC = () => {
  const { user, coupons } = useUser();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#ffffff' }}>
        <div className="text-center">
          <p className="text-stone-500 mb-4">로그인이 필요합니다.</p>
          <Link
            to="/"
            className="inline-block px-6 py-3 bg-black text-white rounded-none font-medium hover:bg-[#333333] transition-colors"
          >
            테스트 시작하기
          </Link>
        </div>
      </div>
    );
  }

  const spiritBadges = user.badges.filter(b => b.category === 'spirit');
  const activityBadges = user.badges.filter(b => b.category === 'activity');
  const unusedCoupons = coupons.filter(c => !c.used);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#ffffff' }}>
      <div className="page-container py-10">
        {/* 헤더 */}
        <div className="mb-8">
          <Link
            to="/recipe"
            className="inline-flex items-center gap-2 text-stone-600 hover:text-stone-900 transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>레시피로 돌아가기</span>
          </Link>
          <h1 className="text-3xl font-bold text-stone-900">프로필</h1>
        </div>

        {/* 프로필 정보 카드 */}
        <div className="bg-white border-2 border-stone-200 rounded-none p-8 mb-8">
          <div className="flex items-center gap-6 mb-6">
            <div className="w-20 h-20 bg-[#E0E0E0] rounded-none flex items-center justify-center">
              <User className="w-10 h-10 text-black" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-stone-900 mb-1">{user.username}</h2>
              {user.spiritName && (
                <div className="flex items-center gap-2">
                  <span className="text-lg">{user.spiritName}</span>
                  <span className="text-sm text-stone-500">({user.spiritType})</span>
                </div>
              )}
              <p className="text-sm text-stone-500 mt-1">
                가입일: {new Date(user.joinedAt).toLocaleDateString('ko-KR')}
              </p>
            </div>
          </div>

          {/* 통계 */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-stone-200">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-stone-500 mb-1">
                <ChefHat className="w-4 h-4" />
                <span className="text-sm">레시피</span>
              </div>
              <p className="text-2xl font-bold text-stone-900">{user.recipes}</p>
            </div>
            <div className="text-center border-x border-stone-200">
              <div className="flex items-center justify-center gap-2 text-stone-500 mb-1">
                <MessageCircle className="w-4 h-4" />
                <span className="text-sm">댓글</span>
              </div>
              <p className="text-2xl font-bold text-stone-900">{user.comments}</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-stone-500 mb-1">
                <Heart className="w-4 h-4" />
                <span className="text-sm">좋아요</span>
              </div>
              <p className="text-2xl font-bold text-stone-900">{user.likes}</p>
            </div>
          </div>
        </div>

        {/* 배지 진열대 */}
        <div className="bg-white border-2 border-stone-200 rounded-none p-8 mb-8">
          <div className="flex items-center gap-2 mb-6">
            <Trophy className="w-6 h-6 text-black" />
            <h2 className="text-2xl font-bold text-stone-900">배지 진열대</h2>
            <span className="text-stone-500">({user.badges.length}개)</span>
          </div>

          {/* 스피릿 배지 */}
          {spiritBadges.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-stone-700 mb-4">스피릿 배지</h3>
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4">
                {spiritBadges.map((badge) => (
                  <div
                    key={badge.id}
                    className="flex flex-col items-center gap-2 p-4 bg-[#F5F5F5] rounded-none border-2 border-[#E0E0E0]"
                  >
                    <span className="text-4xl">{badge.icon}</span>
                    <p className="text-xs font-medium text-stone-700 text-center">{badge.name}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 활동 배지 */}
          {activityBadges.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-stone-700 mb-4">활동 배지</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {activityBadges.map((badge) => (
                  <div
                    key={badge.id}
                    className="flex flex-col items-center gap-2 p-4 bg-[#F5F5F5] rounded-none border-2 border-[#E0E0E0]"
                  >
                    <span className="text-4xl">{badge.icon}</span>
                    <p className="text-xs font-medium text-stone-700 text-center">{badge.name}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 미획득 배지 (회색으로 표시) */}
          {user.badges.length < Object.keys(ALL_BADGES).length && (
            <div className="mt-8 pt-8 border-t border-stone-200">
              <h3 className="text-lg font-semibold text-stone-500 mb-4">미획득 배지</h3>
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4">
                {Object.values(ALL_BADGES)
                  .filter(badge => !user.badges.some(b => b.id === badge.id))
                  .map((badge) => (
                    <div
                      key={badge.id}
                      className="flex flex-col items-center gap-2 p-4 bg-stone-100 rounded-none border-2 border-stone-200 opacity-50"
                    >
                      <span className="text-4xl grayscale">{badge.icon}</span>
                      <p className="text-xs font-medium text-stone-500 text-center">{badge.name}</p>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>

        {/* 쿠폰 */}
        {unusedCoupons.length > 0 && (
          <div className="bg-white border-2 border-stone-200 rounded-none p-8">
            <div className="flex items-center gap-2 mb-6">
              <Gift className="w-6 h-6 text-black" />
              <h2 className="text-2xl font-bold text-stone-900">보유 쿠폰</h2>
              <span className="text-stone-500">({unusedCoupons.length}개)</span>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {unusedCoupons.map((coupon) => (
                <div
                  key={coupon.id}
                  className="p-4 bg-[#F5F5F5] border-2 border-[#E0E0E0] rounded-none"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-stone-900">
                      {coupon.discount}{coupon.type === 'percentage' ? '%' : '원'} 할인
                    </span>
                    <span className="text-xs text-stone-500">
                      {new Date(coupon.earnedAt).toLocaleDateString('ko-KR')}
                    </span>
                  </div>
                  <div className="px-3 py-2 bg-white rounded-none mb-2">
                    <p className="font-mono font-bold text-stone-900">{coupon.code}</p>
                  </div>
                  <p className="text-xs text-stone-600">슬런치 팩토리 스토어에서 사용 가능</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;

