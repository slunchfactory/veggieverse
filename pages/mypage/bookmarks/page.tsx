import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bookmark, X } from 'lucide-react';
import MyPageLayout from '../../../components/MyPageLayout';
import { getRecipeThumbnailImage, getFallbackRecipeImage } from '../../../utils/recipeImages';

// 북마크 레시피 타입
interface BookmarkedRecipe {
  id: number;
  title: string;
  description: string;
  category: string;
  author: string;
  likes: number;
  addedAt: string;
}

// 샘플 북마크 데이터
const SAMPLE_BOOKMARKS: BookmarkedRecipe[] = [
  {
    id: 1,
    title: '두부 스테이크',
    description: '크리미한 버섯 소스와 구운 채소를 곁들인',
    category: '점심',
    author: '비건셰프',
    likes: 2847,
    addedAt: '2024.12.18',
  },
  {
    id: 2,
    title: '아보카도 포케',
    description: '신선한 아보카도와 퀴노아로 만든 건강한 한 끼',
    category: '점심',
    author: '헬시푸드',
    likes: 2634,
    addedAt: '2024.12.15',
  },
  {
    id: 3,
    title: '레몬 파스타',
    description: '상큼한 지중해 풍미',
    category: '데이트',
    author: '파스타장인',
    likes: 2512,
    addedAt: '2024.12.12',
  },
  {
    id: 4,
    title: '배추 된장국',
    description: '구수한 된장의 깊은 맛',
    category: '한식',
    author: '한식셰프',
    likes: 2398,
    addedAt: '2024.12.10',
  },
  {
    id: 5,
    title: '망고 푸딩',
    description: '열대의 달콤함을 담아',
    category: '디저트',
    author: '디저트왕',
    likes: 2287,
    addedAt: '2024.12.08',
  },
  {
    id: 6,
    title: '블루베리 오트밀',
    description: '건강한 아침 식사',
    category: '신규',
    author: '브런치러버',
    likes: 2156,
    addedAt: '2024.12.05',
  },
];

// 카테고리 필터
const CATEGORIES = ['전체', '점심', '디저트', '한식', '데이트', '신규'];

const BookmarksPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [bookmarks, setBookmarks] = useState<BookmarkedRecipe[]>(SAMPLE_BOOKMARKS);

  const filteredBookmarks = selectedCategory === '전체'
    ? bookmarks
    : bookmarks.filter(b => b.category === selectedCategory);

  const removeBookmark = (recipeId: number) => {
    setBookmarks(prev => prev.filter(b => b.id !== recipeId));
  };

  return (
    <MyPageLayout>
      <div style={{ maxWidth: '900px' }}>

          {/* 카테고리 필터 */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '0',
                  fontSize: '13px',
                  fontWeight: 400,
                  color: selectedCategory === cat ? 'var(--palette-text)' : 'var(--warm-gray)',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  textDecoration: selectedCategory === cat ? 'underline' : 'none',
                  textUnderlineOffset: '4px',
                  transition: 'color 0.15s ease',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--palette-text)'; }}
                onMouseLeave={(e) => { if (selectedCategory !== cat) e.currentTarget.style.color = 'var(--warm-gray)'; }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* 북마크 그리드 */}
          {filteredBookmarks.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {filteredBookmarks.map((recipe) => {
                return (
                  <div key={recipe.id} style={{ position: 'relative' }}>
                    {/* 삭제 버튼 */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeBookmark(recipe.id);
                      }}
                      aria-label={`${recipe.title} 북마크 삭제`}
                      style={{
                        position: 'absolute',
                        top: '8px',
                        right: '8px',
                        width: '28px',
                        height: '28px',
                        background: 'rgba(255,255,255,0.9)',
                        border: 'none',
                        borderRadius: '50%',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 10,
                      }}
                    >
                      <X size={14} color="var(--warm-gray)" />
                    </button>

                    {/* 카드 */}
                    <div
                      onClick={() => navigate(`/recipe/${recipe.id}`)}
                      style={{ cursor: 'pointer', background: 'var(--cream)' }}
                    >
                      <div
                        style={{
                          aspectRatio: '1/1',
                          overflow: 'hidden',
                          background: 'var(--palette-bg-2)',
                          borderRadius: '4px',
                        }}
                      >
                        <img
                          src={getRecipeThumbnailImage(recipe.id)}
                          alt={recipe.title}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = getFallbackRecipeImage(recipe.id);
                          }}
                        />
                      </div>
                      <div style={{ paddingTop: '12px' }}>
                        <p style={{ fontSize: '12px', fontWeight: 400, color: 'var(--warm-gray)', marginBottom: '4px' }}>
                          {recipe.category}
                        </p>
                        <h4 style={{ fontSize: '14px', fontWeight: 400, color: 'var(--palette-text)', marginBottom: '6px', lineHeight: 1.3 }}>
                          {recipe.title}
                        </h4>
                        <p style={{
                          fontSize: '12px',
                          fontWeight: 400,
                          color: 'var(--warm-gray)',
                          marginBottom: '6px',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}>
                          {recipe.description}
                        </p>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <span style={{ fontSize: '12px', fontWeight: 400, color: 'var(--muted)' }}>
                            @{recipe.author}
                          </span>
                          <span style={{ fontSize: '11px', fontWeight: 400, color: 'var(--muted)' }}>
                            {recipe.likes.toLocaleString()} likes
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div style={{ padding: '80px 0', textAlign: 'center' }}>
              <Bookmark size={40} color="var(--gray-lighter)" style={{ marginBottom: '16px' }} />
              <p style={{ fontSize: '14px', fontWeight: 400, color: 'var(--warm-gray)', marginBottom: '16px' }}>
                북마크한 레시피가 없습니다.
              </p>
              <Link
                to="/recipe"
                style={{
                  fontSize: '14px',
                  fontWeight: 400,
                  color: 'var(--palette-text)',
                  textDecoration: 'underline',
                  textUnderlineOffset: '3px',
                }}
              >
                레시피 둘러보기
              </Link>
            </div>
          )}
        </div>
      </MyPageLayout>
  );
};

export default BookmarksPage;
