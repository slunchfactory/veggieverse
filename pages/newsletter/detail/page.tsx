import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ARTICLES, AUTHOR_BIO, AUTHOR_AVATAR } from '../page';

const NewsletterDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const articleIndex = ARTICLES.findIndex((a) => a.id === Number(id));
  const article = articleIndex >= 0 ? ARTICLES[articleIndex] : null;

  const prevArticle = articleIndex > 0 ? ARTICLES[articleIndex - 1] : null;
  const nextArticle = articleIndex >= 0 && articleIndex < ARTICLES.length - 1 ? ARTICLES[articleIndex + 1] : null;

  if (!article) {
    return (
      <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
        <div
          style={{
            textAlign: 'center',
            padding: '120px 20px',
          }}
        >
          <p style={{ fontSize: '14px', color: '#6B6B6B', marginBottom: '16px' }}>
            존재하지 않는 아티클입니다.
          </p>
          <Link
            to="/newsletter"
            style={{
              fontSize: '14px',
              fontWeight: 400,
              color: '#000',
              textDecoration: 'underline',
              textUnderlineOffset: '3px',
            }}
          >
            뉴스레터 목록으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      {/* 상단 네비게이션 */}
      <div
        style={{
          position: 'fixed',
          top: 'var(--header-area-h, 72px)',
          left: 0,
          right: 0,
          zIndex: 45,
          background: '#FFFFFF',
          borderBottom: '1px solid #000',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            height: '48px',
            maxWidth: '1440px',
            margin: '0 auto',
            padding: '0 20px',
          }}
        >
          <button
            onClick={() => navigate('/newsletter')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 400,
              color: '#000',
              padding: 0,
            }}
          >
            <ChevronLeft size={18} />
            뉴스레터 목록
          </button>
        </div>
      </div>

      {/* 1440px Container with 1:1 Split Layout */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 py-[60px]" style={{ paddingTop: '80px' }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[60px]">

          {/* LEFT: Sticky Image with Title Overlay */}
          <aside className="lg:sticky lg:top-[140px] h-[400px] lg:h-[calc(100vh-180px)] w-full relative">
            <img
              src={`${import.meta.env.BASE_URL}${article.thumbnail.replace('/', '')}`}
              alt={`${article.title} - 커버 이미지`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                border: '1px solid #000',
              }}
              onError={(e) => {
                (e.target as HTMLImageElement).style.backgroundColor = '#e5ded8';
              }}
            />
            {/* 하단 그라데이션 */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '50%',
                background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)',
                pointerEvents: 'none',
              }}
            />
            {/* 타이틀 오버레이 */}
            <div
              style={{
                position: 'absolute',
                bottom: '32px',
                left: '24px',
                right: '24px',
                zIndex: 10,
              }}
            >
              <p
                style={{
                  fontSize: '11px',
                  color: 'rgba(255,255,255,0.8)',
                  letterSpacing: '0.1em',
                  fontWeight: 400,
                  marginBottom: '8px',
                  textTransform: 'uppercase',
                }}
              >
                {article.category}
              </p>
              <h1
                style={{
                  fontSize: '28px',
                  fontWeight: 400,
                  color: '#fff',
                  lineHeight: 1.3,
                  marginBottom: '8px',
                }}
              >
                {article.title}
              </h1>
              <p
                style={{
                  fontSize: '14px',
                  fontWeight: 400,
                  color: 'rgba(255,255,255,0.8)',
                  lineHeight: 1.5,
                  marginBottom: '12px',
                }}
              >
                {article.subtitle}
              </p>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '12px',
                  color: 'rgba(255,255,255,0.6)',
                }}
              >
                <span>{article.author}</span>
                <span>·</span>
                <span>{article.date}</span>
              </div>
            </div>
          </aside>

          {/* RIGHT: Scrollable Content */}
          <main className="flex flex-col lg:pt-[10px]">
            {/* 인용구 */}
            {article.quote && (
              <div
                style={{
                  borderTop: '1px solid #000000',
                  borderBottom: '1px solid #000000',
                  padding: '32px 0',
                  marginBottom: '60px',
                }}
              >
                <p
                  style={{
                    textAlign: 'center',
                    fontSize: '14px',
                    fontWeight: 400,
                    color: '#6B6B6B',
                    lineHeight: 1.8,
                    whiteSpace: 'pre-line',
                  }}
                >
                  {article.quote}
                </p>
              </div>
            )}

            {/* 본문 */}
            <article>
              {article.contentBeforeImages}

              {/* 큰 이미지 */}
              {article.images?.large && (
                <div style={{ margin: '60px 0' }}>
                  <div
                    style={{
                      width: '100%',
                      aspectRatio: '4/3',
                      background: '#E0E0E0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <span style={{ color: '#6B6B6B', fontSize: '14px' }}>이미지 1</span>
                  </div>
                </div>
              )}

              {article.contentAfterImages}

              {/* 작은 이미지 2개 */}
              {article.images?.small && article.images.small.length > 0 && (
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '13px',
                    margin: '60px 0',
                  }}
                >
                  {article.images.small.slice(0, 2).map((_, idx) => (
                    <div
                      key={idx}
                      style={{
                        aspectRatio: '1/1',
                        background: '#E0E0E0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <span style={{ color: '#6B6B6B', fontSize: '14px' }}>이미지 {idx + 2}</span>
                    </div>
                  ))}
                </div>
              )}

              {article.contentAfterSmallImages}
            </article>

            {/* 작성자 정보 */}
            <div
              style={{
                borderTop: '1px solid #000000',
                marginTop: '60px',
                paddingTop: '20px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '13px' }}>
                {AUTHOR_AVATAR[article.author] && (
                  <div
                    style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: '50%',
                      overflow: 'hidden',
                      background: '#E5E5E0',
                      flexShrink: 0,
                    }}
                  >
                    <img
                      src={AUTHOR_AVATAR[article.author]}
                      alt={article.author}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                )}
                <div>
                  <p style={{ fontSize: '14px', fontWeight: 400, color: '#000', marginBottom: '4px' }}>
                    {article.author}
                  </p>
                  {AUTHOR_BIO[article.author] && (
                    <p style={{ fontSize: '13px', fontWeight: 400, color: '#6B6B6B', lineHeight: 1.5 }}>
                      {AUTHOR_BIO[article.author].split('\n')[0]}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* 이전/다음 네비게이션 */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '60px',
                paddingTop: '20px',
                borderTop: '1px solid #000000',
              }}
            >
              {prevArticle ? (
                <button
                  onClick={() => navigate(`/newsletter/${prevArticle.id}`)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '12px 0',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '14px',
                    color: '#000',
                  }}
                >
                  <ChevronLeft size={16} />
                  <span>이전글</span>
                </button>
              ) : (
                <div />
              )}

              <button
                onClick={() => navigate('/newsletter')}
                style={{
                  padding: '12px 24px',
                  background: 'transparent',
                  border: '1px solid #000',
                  cursor: 'pointer',
                  fontSize: '14px',
                  color: '#000',
                }}
              >
                목록
              </button>

              {nextArticle ? (
                <button
                  onClick={() => navigate(`/newsletter/${nextArticle.id}`)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '12px 0',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '14px',
                    color: '#000',
                  }}
                >
                  <span>다음글</span>
                  <ChevronRight size={16} />
                </button>
              ) : (
                <div />
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default NewsletterDetail;
