import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Trophy, ChefHat, Heart, MessageCircle } from 'lucide-react';

interface UserStats {
  id: string;
  username: string;
  spiritName: string | null;
  recipes: number;
  likes: number;
  comments: number;
  score: number; // 게시물 수 + 좋아요 수
}

export const HallOfFame: React.FC = () => {
  // localStorage에서 모든 유저 데이터 수집 (실제로는 서버 API 호출)
  const topUsers = useMemo(() => {
    try {
      const allRecipes = JSON.parse(localStorage.getItem('veggieverse-user-recipes') || '[]');
      const userStatsMap = new Map<string, UserStats>();

      // 레시피에서 유저 통계 수집
      allRecipes.forEach((recipe: any) => {
        if (!recipe.authorId) return;
        
        const existing = userStatsMap.get(recipe.authorId);
        if (existing) {
          existing.recipes += 1;
          existing.likes += recipe.likes || 0;
        } else {
          userStatsMap.set(recipe.authorId, {
            id: recipe.authorId,
            username: recipe.author,
            spiritName: recipe.authorSpirit,
            recipes: 1,
            likes: recipe.likes || 0,
            comments: 0,
            score: (recipe.likes || 0) + 1,
          });
        }
      });

      // 댓글에서 통계 수집
      const recipeIds = allRecipes.map((r: any) => r.id);
      recipeIds.forEach((recipeId: string) => {
        const comments = JSON.parse(localStorage.getItem(`veggieverse-recipe-${recipeId}-comments`) || '[]');
        comments.forEach((comment: any) => {
          const existing = userStatsMap.get(comment.authorId);
          if (existing) {
            existing.comments += 1;
          }
        });
      });

      // 점수 계산 및 정렬
      const users = Array.from(userStatsMap.values()).map(user => ({
        ...user,
        score: user.recipes + user.likes,
      }));

      return users
        .sort((a, b) => b.score - a.score)
        .slice(0, 10); // 상위 10명
    } catch (error) {
      console.error('Failed to calculate hall of fame:', error);
      return [];
    }
  }, []);

  if (topUsers.length === 0) {
    return (
      <section className="py-16 border-t border-stone-200">
        <div className="text-center">
          <Trophy className="w-16 h-16 text-amber-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-stone-900 mb-2">명예의 전당</h2>
          <p className="text-stone-500">아직 데이터가 없습니다. 첫 레시피를 올려보세요!</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 border-t border-stone-200 bg-gradient-to-br from-amber-50/30 to-orange-50/30">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-amber-100 rounded-none mb-4">
            <Trophy className="w-6 h-6 text-amber-700" />
            <span className="text-amber-700 font-semibold">이번 달 베스트 인플루언서</span>
          </div>
          <h2 className="text-3xl font-bold text-stone-900 mb-2">명예의 전당</h2>
          <p className="text-stone-600">가장 활발한 커뮤니티 멤버들을 소개합니다</p>
        </div>

        <div className="space-y-4">
          {topUsers.map((user, index) => (
            <Link
              key={user.id}
              to={`/profile?user=${user.id}`}
              className="block p-6 bg-white border-2 border-stone-200 rounded-none hover:border-amber-300 hover:shadow-lg transition-all"
            >
              <div className="flex items-center gap-4">
                {/* 순위 */}
                <div className={`w-12 h-12 rounded-none flex items-center justify-center font-bold text-lg ${
                  index === 0 ? 'bg-amber-500 text-white' :
                  index === 1 ? 'bg-stone-400 text-white' :
                  index === 2 ? 'bg-amber-600 text-white' :
                  'bg-stone-200 text-stone-700'
                }`}>
                  {index + 1}
                </div>

                {/* 유저 정보 */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-bold text-stone-900">{user.username}</h3>
                    {user.spiritName && (
                      <span className="text-xs px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-none">
                        {user.spiritName}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-stone-600">
                    <div className="flex items-center gap-1">
                      <ChefHat className="w-4 h-4" />
                      <span>{user.recipes}개 레시피</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      <span>{user.likes}개 좋아요</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="w-4 h-4" />
                      <span>{user.comments}개 댓글</span>
                    </div>
                  </div>
                </div>

                {/* 점수 */}
                <div className="text-right">
                  <div className="text-2xl font-bold text-amber-600">{user.score}</div>
                  <div className="text-xs text-stone-500">점수</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

