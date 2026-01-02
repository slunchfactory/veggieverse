import React, { useState } from 'react';
import { X, ChevronRight } from 'lucide-react';

type ModalType = 'GRADE' | 'COUPON' | 'POINT' | null;

interface ProfileStatsProps {
  grade?: string;
  couponCount?: number;
  points?: number;
}

const ProfileStats: React.FC<ProfileStatsProps> = ({
  grade = 'FRESH',
  couponCount = 2,
  points = 1500,
}) => {
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  const closeModal = () => setActiveModal(null);

  return (
    <>
      {/* Top Info Bar (Clickable) */}
      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          borderTop: '1px solid #000',
          borderBottom: '1px solid #000',
          marginBottom: '32px',
        }}
      >
        <button
          onClick={() => setActiveModal('GRADE')}
          style={{
            padding: '16px 20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '4px',
            background: 'transparent',
            border: 'none',
            borderRight: '1px solid #E5E5E5',
            cursor: 'pointer',
          }}
        >
          <span style={{ fontSize: '12px', fontWeight: 400, color: '#6B6B6B' }}>회원등급</span>
          <span style={{ fontSize: '16px', fontWeight: 400, color: '#000' }}>{grade}</span>
        </button>

        <button
          onClick={() => setActiveModal('COUPON')}
          style={{
            padding: '16px 20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '4px',
            background: 'transparent',
            border: 'none',
            borderRight: '1px solid #E5E5E5',
            cursor: 'pointer',
          }}
        >
          <span style={{ fontSize: '12px', fontWeight: 400, color: '#6B6B6B' }}>보유쿠폰</span>
          <span style={{ fontSize: '16px', fontWeight: 400, color: '#000' }}>{couponCount}장</span>
        </button>

        <button
          onClick={() => setActiveModal('POINT')}
          style={{
            padding: '16px 20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '4px',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          <span style={{ fontSize: '12px', fontWeight: 400, color: '#6B6B6B' }}>포인트</span>
          <span style={{ fontSize: '16px', fontWeight: 400, color: '#000' }}>{points.toLocaleString()}P</span>
        </button>
      </section>

      {/* Modals */}
      {activeModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0, 0, 0, 0.3)',
            padding: '16px',
          }}
          onClick={closeModal}
        >
          <div
            style={{
              background: '#fff',
              width: '100%',
              maxWidth: '400px',
              border: '1px solid #000',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 20px',
                borderBottom: '1px solid #000',
              }}
            >
              <h3 style={{ fontSize: '15px', fontWeight: 400, color: '#000' }}>
                {activeModal === 'GRADE' && '멤버십 등급'}
                {activeModal === 'COUPON' && '나의 쿠폰함'}
                {activeModal === 'POINT' && '포인트 내역'}
              </h3>
              <button
                onClick={closeModal}
                style={{
                  padding: '4px',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                <X size={18} strokeWidth={1} />
              </button>
            </div>

            {/* Modal Content */}
            <div style={{ padding: '20px', maxHeight: '60vh', overflowY: 'auto' }}>

              {/* 1. Grade Content */}
              {activeModal === 'GRADE' && (
                <div>
                  <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                    <p style={{ fontSize: '12px', fontWeight: 400, color: '#6B6B6B', marginBottom: '4px' }}>현재 등급</p>
                    <h2 style={{ fontSize: '24px', fontWeight: 400, color: '#000' }}>{grade}</h2>
                  </div>

                  {/* Progress Bar */}
                  <div style={{ background: '#E5E5E5', height: '4px', marginBottom: '8px' }}>
                    <div style={{ background: '#000', height: '4px', width: '30%' }}></div>
                  </div>
                  <p style={{ fontSize: '11px', fontWeight: 400, color: '#6B6B6B', textAlign: 'center', marginBottom: '24px' }}>
                    다음 <span style={{ color: '#000' }}>GREEN</span> 등급까지 70,000원 남았어요!
                  </p>

                  {/* Benefits */}
                  <div style={{ background: '#F9F9F9', padding: '16px' }}>
                    <h4 style={{ fontSize: '13px', fontWeight: 400, color: '#000', marginBottom: '12px' }}>{grade} 등급 혜택</h4>
                    <ul style={{ fontSize: '12px', fontWeight: 400, color: '#6B6B6B', paddingLeft: '16px', margin: 0 }}>
                      <li style={{ marginBottom: '6px' }}>구매 금액의 1% 포인트 적립</li>
                      <li style={{ marginBottom: '6px' }}>생일 축하 5,000원 쿠폰 지급</li>
                      <li>신규 레시피 등록 시 추가 포인트</li>
                    </ul>
                  </div>
                </div>
              )}

              {/* 2. Coupon Content */}
              {activeModal === 'COUPON' && (
                <div>
                  {/* Registration Input */}
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
                    <input
                      type="text"
                      placeholder="쿠폰 번호를 입력하세요"
                      style={{
                        flex: 1,
                        padding: '10px 12px',
                        fontSize: '13px',
                        fontWeight: 400,
                        border: '1px solid #E5E5E5',
                        borderBottom: '1px solid #000',
                        outline: 'none',
                      }}
                    />
                    <button
                      style={{
                        padding: '10px 16px',
                        fontSize: '13px',
                        fontWeight: 400,
                        background: '#000',
                        color: '#fff',
                        border: '1px solid #000',
                        cursor: 'pointer',
                      }}
                    >
                      등록
                    </button>
                  </div>

                  {/* Coupon List */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {[
                      { name: '신규 회원 환영 쿠폰', discount: '10%', date: '2026.02.01 까지' },
                      { name: '배송비 무료 쿠폰', discount: 'Free', date: '2026.01.15 까지' },
                    ].map((coupon, idx) => (
                      <div
                        key={idx}
                        style={{
                          border: '1px solid #E5E5E5',
                          padding: '16px',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <div>
                          <h4 style={{ fontSize: '13px', fontWeight: 400, color: '#000', marginBottom: '4px' }}>{coupon.name}</h4>
                          <p style={{ fontSize: '11px', fontWeight: 400, color: '#6B6B6B' }}>{coupon.date}</p>
                        </div>
                        <span style={{ fontSize: '18px', fontWeight: 400, color: '#000' }}>{coupon.discount}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 3. Point Content */}
              {activeModal === 'POINT' && (
                <div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-end',
                      borderBottom: '1px solid #000',
                      paddingBottom: '16px',
                      marginBottom: '16px',
                    }}
                  >
                    <span style={{ fontSize: '12px', fontWeight: 400, color: '#6B6B6B' }}>사용 가능 포인트</span>
                    <span style={{ fontSize: '20px', fontWeight: 400, color: '#000' }}>{points.toLocaleString()}P</span>
                  </div>

                  {/* History List */}
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {[
                      { title: '첫 레시피 등록', date: '2026.01.02', amount: '+500', type: 'earn' },
                      { title: '상품 구매 (김치볶음밥)', date: '2024.12.10', amount: '+1,000', type: 'earn' },
                      { title: '포인트 사용', date: '2024.11.20', amount: '-2,000', type: 'use' },
                    ].map((item, idx) => (
                      <li
                        key={idx}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '12px 0',
                          borderBottom: '1px solid #E5E5E5',
                        }}
                      >
                        <div>
                          <p style={{ fontSize: '13px', fontWeight: 400, color: '#000', marginBottom: '2px' }}>{item.title}</p>
                          <p style={{ fontSize: '11px', fontWeight: 400, color: '#6B6B6B' }}>{item.date}</p>
                        </div>
                        <span
                          style={{
                            fontSize: '14px',
                            fontWeight: 400,
                            color: item.type === 'use' ? '#E53935' : '#1565C0',
                          }}
                        >
                          {item.amount}P
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div
              style={{
                background: '#F9F9F9',
                padding: '12px 20px',
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <button
                style={{
                  fontSize: '11px',
                  fontWeight: 400,
                  color: '#6B6B6B',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '2px',
                }}
              >
                자세히 보기 <ChevronRight size={12} strokeWidth={1} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileStats;
