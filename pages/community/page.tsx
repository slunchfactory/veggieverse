import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Search, Plus, Minus } from 'lucide-react';

// 서브메뉴 항목
const SUB_MENUS = [
  { id: 'notice', name: '공지사항' },
  { id: 'faq', name: '자주하는 질문' },
  { id: 'inquiry', name: '문의하기' },
  { id: 'review', name: '제품 후기' },
];

// 샘플 공지사항 데이터
const NOTICES = [
  { id: 1, title: '2024년 연말 배송 안내', date: '2024.12.20', views: 234, isNew: true },
  { id: 2, title: '개인정보처리방침 변경 안내', date: '2024.12.15', views: 156, isNew: true },
  { id: 3, title: '12월 신규 입점 브랜드 소개', date: '2024.12.10', views: 892, isNew: false },
  { id: 4, title: '겨울철 배송 지연 안내', date: '2024.12.05', views: 445, isNew: false },
  { id: 5, title: '슬런치 앱 업데이트 안내 (v2.3.0)', date: '2024.11.28', views: 321, isNew: false },
];

// 샘플 FAQ 데이터
const FAQS = [
  {
    id: 1,
    category: '배송',
    question: '배송은 얼마나 걸리나요?',
    answer: '주문 후 영업일 기준 2-3일 내 배송됩니다. 도서산간 지역은 추가 1-2일이 소요될 수 있습니다.',
  },
  {
    id: 2,
    category: '배송',
    question: '배송비는 얼마인가요?',
    answer: '3만원 이상 구매 시 무료 배송입니다. 3만원 미만 구매 시 배송비 3,000원이 부과됩니다.',
  },
  {
    id: 3,
    category: '교환/반품',
    question: '교환/반품 신청은 어떻게 하나요?',
    answer: '마이페이지 > 주문내역에서 교환/반품 신청이 가능합니다. 상품 수령 후 7일 이내 신청해주세요.',
  },
  {
    id: 4,
    category: '교환/반품',
    question: '반품 시 배송비는 누가 부담하나요?',
    answer: '단순 변심의 경우 왕복 배송비 6,000원이 고객 부담입니다. 상품 하자의 경우 무료로 교환/반품 처리됩니다.',
  },
  {
    id: 5,
    category: '결제',
    question: '어떤 결제 수단을 이용할 수 있나요?',
    answer: '신용카드, 실시간 계좌이체, 무통장입금, 카카오페이, 네이버페이 등을 이용하실 수 있습니다.',
  },
  {
    id: 6,
    category: '회원',
    question: '비회원도 구매할 수 있나요?',
    answer: '네, 비회원 구매가 가능합니다. 다만 회원 가입 시 적립금 및 할인 혜택을 받으실 수 있습니다.',
  },
];

// 샘플 리뷰 데이터
const REVIEWS = [
  {
    id: 1,
    productName: '유기농 두부 샐러드',
    rating: 5,
    content: '신선하고 맛있어요! 매일 먹고 싶은 맛입니다.',
    author: '채*영',
    date: '2024.12.18',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=400&fit=crop',
  },
  {
    id: 2,
    productName: '비건 단백질 바',
    rating: 4,
    content: '운동 후 간식으로 딱이에요. 단맛이 적당해서 좋습니다.',
    author: '김*수',
    date: '2024.12.15',
    image: 'https://images.unsplash.com/photo-1622484211148-4b2c6e7c0f0e?w=400&h=400&fit=crop',
  },
  {
    id: 3,
    productName: '콩고기 불고기',
    rating: 5,
    content: '진짜 고기 같아요! 가족들도 비건인 줄 몰랐습니다.',
    author: '이*나',
    date: '2024.12.12',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=400&fit=crop',
  },
  {
    id: 4,
    productName: '오트밀 쿠키',
    rating: 5,
    content: '바삭하고 고소해요. 건강한 간식으로 추천합니다.',
    author: '박*희',
    date: '2024.12.10',
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400&h=400&fit=crop',
  },
];

// FAQ 카테고리
const FAQ_CATEGORIES = ['전체', '배송', '교환/반품', '결제', '회원'];

export const CommunityPage: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState('notice');
  const [openFaqId, setOpenFaqId] = useState<number | null>(null);
  const [faqCategory, setFaqCategory] = useState('전체');
  const [searchQuery, setSearchQuery] = useState('');

  // FAQ 필터링
  const filteredFaqs = faqCategory === '전체'
    ? FAQS
    : FAQS.filter(faq => faq.category === faqCategory);

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      {/* Tab Navigation - 텍스트 기반, 테두리 없음 */}
      <div className="px-4 md:px-8 lg:px-16 py-6">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px' }}>
          {SUB_MENUS.map((menu) => (
            <button
              key={menu.id}
              onClick={() => setActiveMenu(menu.id)}
              style={{
                padding: '0',
                fontSize: '14px',
                fontWeight: 400,
                color: activeMenu === menu.id ? 'var(--palette-text)' : 'var(--warm-gray)',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                textDecoration: activeMenu === menu.id ? 'underline' : 'none',
                textUnderlineOffset: '4px',
                transition: 'color 0.15s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--palette-text)'; }}
              onMouseLeave={(e) => { if (activeMenu !== menu.id) e.currentTarget.style.color = 'var(--warm-gray)'; }}
            >
              {menu.name}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="px-4 md:px-8 lg:px-16">
        {/* 공지사항 */}
        {activeMenu === 'notice' && (
          <div>
            {/* Table Header - 모바일에서는 숨김 */}
            <div
              className="hidden md:grid"
              style={{
                gridTemplateColumns: '60px 1fr 100px 60px',
                padding: '12px 0',
                borderBottom: '1px solid rgba(26, 10, 5, 0.1)',
                fontSize: '12px',
                fontWeight: 400,
                color: 'var(--warm-gray)',
              }}
            >
              <div style={{ textAlign: 'center' }}>번호</div>
              <div>제목</div>
              <div style={{ textAlign: 'center' }}>작성일</div>
              <div style={{ textAlign: 'center' }}>조회</div>
            </div>

            {/* Table Body */}
            {NOTICES.length > 0 ? (
              NOTICES.map((notice) => (
                <div
                  key={notice.id}
                  className="grid grid-cols-1 md:grid-cols-[60px_1fr_100px_60px]"
                  style={{
                    padding: '16px 0',
                    borderBottom: '1px solid rgba(26, 10, 5, 0.1)',
                    fontSize: '14px',
                    fontWeight: 400,
                    cursor: 'pointer',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <div className="hidden md:block" style={{ textAlign: 'center', color: 'var(--warm-gray)' }}>{notice.id}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    <span style={{ color: 'var(--palette-text)' }}>{notice.title}</span>
                    {notice.isNew && (
                      <span
                        style={{
                          fontSize: '10px',
                          fontWeight: 400,
                          color: 'var(--palette-orange)',
                        }}
                      >
                        NEW
                      </span>
                    )}
                  </div>
                  <div className="hidden md:block" style={{ textAlign: 'center', color: 'var(--warm-gray)', fontSize: '13px' }}>{notice.date}</div>
                  <div className="hidden md:block" style={{ textAlign: 'center', color: 'var(--warm-gray)', fontSize: '13px' }}>{notice.views}</div>
                  {/* 모바일용 메타 정보 */}
                  <div className="md:hidden" style={{ fontSize: '12px', color: 'var(--warm-gray)' }}>
                    {notice.date} · 조회 {notice.views}
                  </div>
                </div>
              ))
            ) : (
              <div
                style={{
                  padding: '80px 0',
                  textAlign: 'center',
                  color: 'var(--warm-gray)',
                  fontSize: '14px',
                }}
              >
                등록된 공지사항이 없습니다.
              </div>
            )}

            {/* Search Bar */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '0',
                marginTop: '48px',
                marginBottom: '80px',
              }}
            >
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="검색어를 입력하세요"
                style={{
                  width: '280px',
                  maxWidth: '100%',
                  padding: '12px 16px',
                  fontSize: '14px',
                  fontWeight: 400,
                  border: '1px solid rgba(26, 10, 5, 0.2)',
                  borderRight: 'none',
                  borderRadius: '4px 0 0 4px',
                  background: 'transparent',
                  outline: 'none',
                }}
              />
              <button
                style={{
                  padding: '12px 16px',
                  background: 'var(--palette-text)',
                  border: '1px solid var(--palette-text)',
                  borderRadius: '0 4px 4px 0',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Search size={16} color="#fff" />
              </button>
            </div>
          </div>
        )}

        {/* 자주하는 질문 */}
        {activeMenu === 'faq' && (
          <div>
            {/* Category Filter - 텍스트 기반 */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginBottom: '24px' }}>
              {FAQ_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFaqCategory(cat)}
                  style={{
                    padding: '0',
                    fontSize: '13px',
                    fontWeight: 400,
                    color: faqCategory === cat ? 'var(--palette-text)' : 'var(--warm-gray)',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    textDecoration: faqCategory === cat ? 'underline' : 'none',
                    textUnderlineOffset: '4px',
                    transition: 'color 0.15s ease',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--palette-text)'; }}
                  onMouseLeave={(e) => { if (faqCategory !== cat) e.currentTarget.style.color = 'var(--warm-gray)'; }}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* FAQ List */}
            {filteredFaqs.map((faq) => (
              <div key={faq.id} style={{ borderBottom: '1px solid rgba(26, 10, 5, 0.1)' }}>
                {/* Question */}
                <button
                  onClick={() => setOpenFaqId(openFaqId === faq.id ? null : faq.id)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '20px 0',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                    gap: '16px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: 0 }}>
                    <span
                      style={{
                        fontSize: '12px',
                        fontWeight: 400,
                        color: 'var(--warm-gray)',
                        flexShrink: 0,
                      }}
                    >
                      [{faq.category}]
                    </span>
                    <span style={{ fontSize: '14px', fontWeight: 400, color: 'var(--palette-text)' }}>
                      {faq.question}
                    </span>
                  </div>
                  {openFaqId === faq.id ? (
                    <Minus size={16} color="var(--warm-gray)" style={{ flexShrink: 0 }} />
                  ) : (
                    <Plus size={16} color="var(--warm-gray)" style={{ flexShrink: 0 }} />
                  )}
                </button>

                {/* Answer */}
                {openFaqId === faq.id && (
                  <div
                    className="pl-0 md:pl-16"
                    style={{ paddingBottom: '20px' }}
                  >
                    <p
                      style={{
                        fontSize: '14px',
                        fontWeight: 400,
                        color: 'var(--warm-gray)',
                        lineHeight: 1.7,
                      }}
                    >
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}

            {/* Bottom Spacing */}
            <div style={{ height: '80px' }} />
          </div>
        )}

        {/* 문의하기 */}
        {activeMenu === 'inquiry' && (
          <div style={{ maxWidth: '560px', margin: '0 auto', padding: '32px 0 80px' }}>
            {/* Form */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* 문의 유형 */}
              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: '13px',
                    fontWeight: 400,
                    color: 'var(--warm-gray)',
                    marginBottom: '8px',
                  }}
                >
                  문의 유형
                </label>
                <div style={{ position: 'relative' }}>
                  <select
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      fontSize: '14px',
                      fontWeight: 400,
                      border: '1px solid rgba(26, 10, 5, 0.2)',
                      borderRadius: '4px',
                      background: 'transparent',
                      appearance: 'none',
                      cursor: 'pointer',
                      outline: 'none',
                    }}
                  >
                    <option>배송 문의</option>
                    <option>상품 문의</option>
                    <option>교환/반품 문의</option>
                    <option>기타 문의</option>
                  </select>
                  <ChevronDown
                    size={16}
                    color="var(--warm-gray)"
                    style={{
                      position: 'absolute',
                      right: '16px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      pointerEvents: 'none',
                    }}
                  />
                </div>
              </div>

              {/* 제목 */}
              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: '13px',
                    fontWeight: 400,
                    color: 'var(--warm-gray)',
                    marginBottom: '8px',
                  }}
                >
                  제목
                </label>
                <input
                  type="text"
                  placeholder="제목을 입력해주세요"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    fontSize: '14px',
                    fontWeight: 400,
                    border: '1px solid rgba(26, 10, 5, 0.2)',
                    borderRadius: '4px',
                    background: 'transparent',
                    outline: 'none',
                  }}
                />
              </div>

              {/* 내용 */}
              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: '13px',
                    fontWeight: 400,
                    color: 'var(--warm-gray)',
                    marginBottom: '8px',
                  }}
                >
                  내용
                </label>
                <textarea
                  placeholder="문의 내용을 입력해주세요"
                  rows={6}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    fontSize: '14px',
                    fontWeight: 400,
                    border: '1px solid rgba(26, 10, 5, 0.2)',
                    borderRadius: '4px',
                    background: 'transparent',
                    resize: 'none',
                    outline: 'none',
                    lineHeight: 1.7,
                  }}
                />
              </div>

              {/* 연락처 & 이메일 - 2열 그리드 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '13px',
                      fontWeight: 400,
                      color: 'var(--warm-gray)',
                      marginBottom: '8px',
                    }}
                  >
                    연락처
                  </label>
                  <input
                    type="tel"
                    placeholder="010-0000-0000"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      fontSize: '14px',
                      fontWeight: 400,
                      border: '1px solid rgba(26, 10, 5, 0.2)',
                      borderRadius: '4px',
                      background: 'transparent',
                      outline: 'none',
                    }}
                  />
                </div>
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '13px',
                      fontWeight: 400,
                      color: 'var(--warm-gray)',
                      marginBottom: '8px',
                    }}
                  >
                    이메일
                  </label>
                  <input
                    type="email"
                    placeholder="email@example.com"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      fontSize: '14px',
                      fontWeight: 400,
                      border: '1px solid rgba(26, 10, 5, 0.2)',
                      borderRadius: '4px',
                      background: 'transparent',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>

              {/* 개인정보 동의 */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginTop: '8px' }}>
                <input
                  type="checkbox"
                  id="privacy"
                  style={{
                    width: '16px',
                    height: '16px',
                    accentColor: 'var(--palette-text)',
                    cursor: 'pointer',
                    marginTop: '2px',
                  }}
                />
                <label
                  htmlFor="privacy"
                  style={{
                    fontSize: '13px',
                    fontWeight: 400,
                    color: 'var(--warm-gray)',
                    lineHeight: 1.5,
                    cursor: 'pointer',
                  }}
                >
                  개인정보 수집 및 이용에 동의합니다. (필수)
                </label>
              </div>

              {/* Submit Button */}
              <button
                style={{
                  width: '100%',
                  padding: '14px',
                  fontSize: '14px',
                  fontWeight: 400,
                  color: '#fff',
                  background: 'var(--palette-text)',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  marginTop: '8px',
                }}
              >
                문의하기
              </button>
            </div>
          </div>
        )}

        {/* 제품 후기 */}
        {activeMenu === 'review' && (
          <div style={{ paddingTop: '8px' }}>
            {/* Review Grid - 심플 카드 그리드 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {REVIEWS.map((review) => (
                <div
                  key={review.id}
                  style={{ background: 'var(--cream)', cursor: 'pointer' }}
                >
                  {/* Image */}
                  <div
                    style={{
                      width: '100%',
                      aspectRatio: '1/1',
                      background: 'var(--palette-bg-2)',
                      overflow: 'hidden',
                      borderRadius: '4px',
                    }}
                  >
                    <img
                      src={review.image}
                      alt={review.productName}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                      loading="lazy"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  </div>

                  {/* Content */}
                  <div style={{ paddingTop: '12px' }}>
                    {/* Product Name & Rating */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <p
                        style={{
                          fontSize: '12px',
                          fontWeight: 400,
                          color: 'var(--warm-gray)',
                        }}
                      >
                        {review.productName}
                      </p>
                      <div>
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span
                            key={i}
                            style={{
                              color: i < review.rating ? 'var(--palette-text)' : 'var(--gray-lighter)',
                              fontSize: '12px',
                            }}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Content */}
                    <p
                      style={{
                        fontSize: '14px',
                        fontWeight: 400,
                        color: 'var(--palette-text)',
                        lineHeight: 1.6,
                        marginBottom: '8px',
                      }}
                    >
                      {review.content}
                    </p>

                    {/* Meta */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '12px',
                        color: 'var(--muted)',
                      }}
                    >
                      <span>{review.author}</span>
                      <span>·</span>
                      <span>{review.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More Button */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                padding: '48px 0 80px',
              }}
            >
              <button
                style={{
                  padding: '12px 32px',
                  fontSize: '14px',
                  fontWeight: 400,
                  color: 'var(--warm-gray)',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  textDecoration: 'underline',
                  textUnderlineOffset: '4px',
                }}
              >
                더보기
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
