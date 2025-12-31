import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Minus } from 'lucide-react';
import { useUser } from '../../contexts/UserContext';
import { TopControlBar, TabItem } from '../../components/TopControlBar';

// 탭 메뉴
const membershipTabs: TabItem[] = [
  { id: 'orders', label: '주문내역' },
  { id: 'level', label: '등급혜택' },
  { id: 'coupons', label: '쿠폰' },
  { id: 'edit', label: '정보수정' },
];

// 등급 데이터
interface LevelData {
  id: string;
  name: string;
  nameKr: string;
  criteria: string;
  reward: string;
  coupon: string;
  minAmount: number;
}

const LEVELS: LevelData[] = [
  {
    id: 'seed',
    name: 'Seed',
    nameKr: '신규',
    criteria: '가입 즉시',
    reward: '구매 금액의 1% 적립',
    coupon: '웰컴 쿠폰팩 지급',
    minAmount: 0,
  },
  {
    id: 'sprout',
    name: 'Sprout',
    nameKr: '새싹',
    criteria: '누적 구매액 30만원 미만',
    reward: '구매 금액의 2% 적립',
    coupon: '1,000원 할인 쿠폰 매월 지급',
    minAmount: 100000,
  },
  {
    id: 'stem',
    name: 'Stem',
    nameKr: '줄기',
    criteria: '누적 구매액 50만원 미만',
    reward: '구매 금액의 3% 적립',
    coupon: '무료배송 쿠폰 1회 매월 지급',
    minAmount: 300000,
  },
  {
    id: 'leaf',
    name: 'Leaf',
    nameKr: '잎새',
    criteria: '누적 구매액 100만원 미만',
    reward: '구매 금액의 5% 적립',
    coupon: '무료배송 2회 + 5% 할인 쿠폰 매월 지급',
    minAmount: 500000,
  },
  {
    id: 'fruit',
    name: 'Fruit',
    nameKr: '열매',
    criteria: '누적 구매액 100만원 이상',
    reward: '구매 금액의 7% 적립',
    coupon: '무료배송 무제한 + 10% 할인 쿠폰 매월 지급',
    minAmount: 1000000,
  },
];

const MembershipLevelPage: React.FC = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('level');
  const [openAccordion, setOpenAccordion] = useState<string | null>('stem');

  // 탭 변경
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    if (tabId === 'orders') navigate('/mypage/orders');
    else if (tabId === 'level') navigate('/mypage/level');
    else if (tabId === 'coupons') navigate('/mypage/coupons');
    else if (tabId === 'edit') navigate('/mypage/edit');
  };

  // 로그인 체크
  if (!user) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--cream)' }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '14px', color: '#6B6B6B', marginBottom: '16px' }}>로그인이 필요합니다.</p>
          <Link to="/" style={{ fontSize: '14px', color: '#000', textDecoration: 'underline' }}>테스트 시작하기</Link>
        </div>
      </div>
    );
  }

  // Mock 데이터
  const currentLevelIndex = 2; // Stem
  const currentPoints = 12500;
  const nextLevelPoints = 15000;
  const pointsToNext = nextLevelPoints - currentPoints;
  const currentLevel = LEVELS[currentLevelIndex];

  // 아코디언 토글
  const toggleAccordion = (id: string) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      {/* 상단 탭 */}
      <TopControlBar
        tabs={membershipTabs}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />

      <main className="w-full max-w-[900px] mx-auto p-4 md:p-6 lg:p-8" style={{ paddingTop: '80px' }}>

        {/* Section 1: 나의 등급 현황 */}
        <section style={{ marginBottom: '48px' }}>
          {/* 타이틀 & 점수 */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px' }}>
            <div>
              <p style={{ fontSize: '13px', color: '#6B6B6B', marginBottom: '8px' }}>
                HELLO, {user.spiritName || user.username}.
              </p>
              <h1 style={{ fontSize: '24px', fontWeight: 400, color: '#000' }}>
                당신의 등급은 <span style={{ fontWeight: 500 }}>{currentLevel.name}</span> 입니다.
              </h1>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: '12px', color: '#6B6B6B' }}>
                현재 점수 <span style={{ color: '#000', fontWeight: 500 }}>{currentPoints.toLocaleString()} P</span>
              </p>
              <p style={{ fontSize: '12px', color: '#6B6B6B' }}>
                다음 등급까지 <span style={{ color: '#000', fontWeight: 500 }}>{pointsToNext.toLocaleString()} P</span> 남음
              </p>
            </div>
          </div>

          {/* Progress Bar - Ruler Style */}
          <div style={{ position: 'relative', padding: '20px 0 40px' }}>
            {/* 실선 */}
            <div
              style={{
                position: 'absolute',
                top: '28px',
                left: '0',
                right: '0',
                height: '1px',
                background: '#000',
              }}
            />

            {/* 등급 점들 */}
            <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative' }}>
              {LEVELS.map((level, idx) => {
                const isCompleted = idx <= currentLevelIndex;
                const isCurrent = idx === currentLevelIndex;

                return (
                  <div
                    key={level.id}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      width: '60px',
                    }}
                  >
                    {/* 점 */}
                    <div
                      style={{
                        width: isCurrent ? '16px' : '12px',
                        height: isCurrent ? '16px' : '12px',
                        borderRadius: '50%',
                        background: isCompleted ? '#000' : '#fff',
                        border: '1px solid #000',
                        marginBottom: '12px',
                        transition: 'all 0.2s ease',
                      }}
                    />
                    {/* 등급 이름 */}
                    <span
                      style={{
                        fontSize: isCurrent ? '13px' : '12px',
                        fontWeight: isCurrent ? 500 : 400,
                        color: isCompleted ? '#000' : '#9A9A9A',
                        textAlign: 'center',
                      }}
                    >
                      {level.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Section 2: 등급별 혜택 안내 - Accordion */}
        <section>
          <h2 style={{ fontSize: '15px', fontWeight: 400, color: '#000', marginBottom: '16px' }}>
            등급별 혜택 안내
          </h2>

          <div style={{ borderTop: '1px solid #000' }}>
            {LEVELS.map((level, idx) => {
              const isOpen = openAccordion === level.id;
              const isCurrentLevel = idx === currentLevelIndex;

              return (
                <div key={level.id}>
                  {/* Accordion Header */}
                  <button
                    onClick={() => toggleAccordion(level.id)}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '20px 0',
                      background: 'transparent',
                      border: 'none',
                      borderBottom: '1px solid #000',
                      cursor: 'pointer',
                      textAlign: 'left',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ fontSize: '16px', fontWeight: 400, color: '#000' }}>
                        {level.name}
                      </span>
                      <span style={{ fontSize: '12px', color: '#6B6B6B' }}>
                        {level.nameKr}
                      </span>
                      {isCurrentLevel && (
                        <span
                          style={{
                            fontSize: '10px',
                            color: '#fff',
                            background: '#000',
                            padding: '2px 8px',
                            marginLeft: '4px',
                          }}
                        >
                          MY
                        </span>
                      )}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      {isOpen ? (
                        <Minus size={16} strokeWidth={1} color="#000" />
                      ) : (
                        <Plus size={16} strokeWidth={1} color="#000" />
                      )}
                    </div>
                  </button>

                  {/* Accordion Body */}
                  <div
                    style={{
                      maxHeight: isOpen ? '300px' : '0',
                      overflow: 'hidden',
                      transition: 'max-height 0.3s ease',
                    }}
                  >
                    <div style={{ padding: '24px 0', borderBottom: '1px solid #E5E5E5' }}>
                      <div style={{ display: 'grid', gap: '16px' }}>
                        {/* 기준 */}
                        <div style={{ display: 'flex' }}>
                          <span style={{ width: '60px', fontSize: '13px', color: '#6B6B6B', flexShrink: 0 }}>
                            기준
                          </span>
                          <span style={{ fontSize: '14px', color: '#000' }}>
                            {level.criteria}
                          </span>
                        </div>
                        {/* 적립 */}
                        <div style={{ display: 'flex' }}>
                          <span style={{ width: '60px', fontSize: '13px', color: '#6B6B6B', flexShrink: 0 }}>
                            적립
                          </span>
                          <span style={{ fontSize: '14px', color: '#000' }}>
                            {level.reward}
                          </span>
                        </div>
                        {/* 쿠폰 */}
                        <div style={{ display: 'flex' }}>
                          <span style={{ width: '60px', fontSize: '13px', color: '#6B6B6B', flexShrink: 0 }}>
                            쿠폰
                          </span>
                          <span style={{ fontSize: '14px', color: '#000' }}>
                            {level.coupon}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

      </main>
    </div>
  );
};

export default MembershipLevelPage;
