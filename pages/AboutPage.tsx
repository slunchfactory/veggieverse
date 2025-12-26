import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const SECTIONS = [
  { id: 'slow-and-lunch', label: 'Slow and Lunch' },
  { id: 'branch', label: 'Branch' },
  { id: 'b2b-vtech', label: 'B2B & V-tech' },
];

const AboutPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const sectionParam = searchParams.get('section');
  const [activeSection, setActiveSection] = useState('slow-and-lunch');
  
  // URL 파라미터로 섹션 변경
  useEffect(() => {
    if (sectionParam && SECTIONS.some(s => s.id === sectionParam)) {
      setActiveSection(sectionParam);
    }
  }, [sectionParam]);

  return (
    <div className="about-page">
      {/* 좌측 네비 */}
      <nav className="about-nav">
        {SECTIONS.map((section) => (
          <button
            key={section.id}
            className={`about-nav-item ${activeSection === section.id ? 'active' : ''}`}
            onClick={() => setActiveSection(section.id)}
          >
            {section.label}
          </button>
        ))}
      </nav>

      {/* 우측 콘텐츠 */}
      <div className="about-content">
        {activeSection === 'slow-and-lunch' && <SlowAndLunchSection />}
        {activeSection === 'branch' && <BranchSection />}
        {activeSection === 'b2b-vtech' && <B2BVTechSection />}
      </div>
    </div>
  );
};

// SLOW AND LUNCH 섹션
const SlowAndLunchSection: React.FC = () => (
  <section>
    <h1 className="about-section-title">SLOW AND LUNCH</h1>
    <p className="about-paragraph">
      슬런치팩토리는 2019년 부천에서 시작했어요.
    </p>
    <p className="about-paragraph">
      '천천히, 제대로 만든 점심 한 끼'라는 생각으로<br />
      Slow와 Lunch를 합쳐 슬런치라는 이름을 지었어요.
    </p>
    <p className="about-paragraph">
      처음엔 작은 공장에서 비건 델리를 만들었어요.<br />
      고기 없이도 맛있을 수 있다는 걸 보여주고 싶었거든요.<br />
      "비건이라서 맛있는 게 아니라, 맛있는데 비건인 거"<br />
      그게 저희가 생각하는 방향이에요.
    </p>
    <p className="about-paragraph">
      지금은 홍대와 더현대에서 직접 만든 음식을 팔고 있어요.<br />
      공장도 여전히 직접 운영하고요.<br />
      재료 고르는 것부터 포장까지, 다 저희 손을 거쳐요.
    </p>
    <p className="about-paragraph">
      식물성이라고 해서 특별하거나 불편하지 않았으면 해요.<br />
      그냥 맛있는 음식. 속 편한 한 끼.<br />
      그게 슬런치가 만들고 싶은 거예요.
    </p>
    
    {/* 이미지 플레이스홀더 */}
    <div className="about-image" style={{ 
      width: '100%', 
      height: '400px', 
      backgroundColor: '#EEF2EB', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      color: '#6B6B6B',
      fontSize: '14px',
      margin: '40px 0'
    }}>
      [공장/매장 이미지]
    </div>

    {/* 브랜드 철학 키워드 */}
    <div style={{ marginTop: '32px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <span style={{ fontSize: '12px', color: '#6B6B6B' }}>#속편한</span>
      <span style={{ fontSize: '12px', color: '#6B6B6B' }}>#재료가솔직한</span>
      <span style={{ fontSize: '12px', color: '#6B6B6B' }}>#식물성</span>
    </div>
  </section>
);

// BRANCH 섹션
const BranchSection: React.FC = () => (
  <section>
    <h1 className="about-section-title">BRANCH</h1>
    <p className="about-paragraph">
      직접 만든 음식을 직접 파는 공간이에요.
    </p>

    {/* 홍대점 */}
    <div className="branch-card">
      <h3 className="branch-name">홍대점</h3>
      <div className="branch-info">
        <p><strong>주소</strong> 서울 마포구 와우산로 29길 6, 1층</p>
        <p><strong>영업시간</strong> 11:00 - 21:00 (월요일 휴무)</p>
        <p><strong>전화</strong> 02-332-6525</p>
        <p style={{ marginTop: '12px' }}>
          홍대입구역 3번 출구에서 도보 7분.<br />
          작은 골목 안에 있어요.<br />
          테이크아웃도 되고, 안에서 먹어도 돼요.
        </p>
      </div>
      
      {/* 이미지 플레이스홀더 */}
      <div style={{ 
        width: '100%', 
        height: '300px', 
        backgroundColor: '#EEF2EB', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        color: '#6B6B6B',
        fontSize: '14px',
        marginTop: '24px'
      }}>
        [홍대점 이미지]
      </div>

      <a 
        href="https://naver.me/Fx3M8pKJ" 
        target="_blank" 
        rel="noopener noreferrer"
        className="about-link-btn"
      >
        네이버 지도로 보기 →
      </a>
    </div>

    {/* 더현대 서울 무역센터점 */}
    <div className="branch-card">
      <h3 className="branch-name">더현대 서울 무역센터점</h3>
      <div className="branch-info">
        <p><strong>주소</strong> 서울 강남구 테헤란로 517, 더현대 서울 B1</p>
        <p><strong>영업시간</strong> 10:30 - 20:00 (더현대 영업시간 따름)</p>
        <p style={{ marginTop: '12px' }}>
          지하 1층 푸드마켓 안에 있어요.<br />
          바로 먹을 수 있는 델리 위주로 준비해뒀어요.
        </p>
      </div>
      
      {/* 이미지 플레이스홀더 */}
      <div style={{ 
        width: '100%', 
        height: '300px', 
        backgroundColor: '#EEF2EB', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        color: '#6B6B6B',
        fontSize: '14px',
        marginTop: '24px'
      }}>
        [더현대점 이미지]
      </div>

      <a 
        href="https://naver.me/..." 
        target="_blank" 
        rel="noopener noreferrer"
        className="about-link-btn"
      >
        네이버 지도로 보기 →
      </a>
    </div>

    {/* 온라인 스토어 */}
    <div className="branch-card">
      <h3 className="branch-name">온라인 스토어</h3>
      <div className="branch-info">
        <p>
          매장에 오기 어려우면 온라인으로도 주문할 수 있어요.<br />
          냉동 배송으로 전국 어디든 보내드려요.
        </p>
      </div>
      <a 
        href="https://smartstore.naver.com/slunch" 
        target="_blank" 
        rel="noopener noreferrer"
        className="about-link-btn"
      >
        네이버 스마트스토어 바로가기 →
      </a>
    </div>
  </section>
);

// B2B & V-TECH 섹션
const B2BVTechSection: React.FC = () => (
  <section>
    <h1 className="about-section-title">B2B & V-TECH</h1>
    <p className="about-paragraph">
      저희가 직접 만들어요.
    </p>

    {/* 자체 생산 시설 */}
    <div className="highlight-box">
      <h4 className="highlight-box-title">자체 생산 시설</h4>
      <p className="highlight-box-text">
        부천에 저희 공장이 있어요.<br />
        델리, 소스, 빵, 디저트까지 전부 여기서 만들어요.
      </p>
      <p className="highlight-box-text" style={{ marginTop: '16px' }}>
        외주 없이 직접 만드는 이유는 간단해요.<br />
        맛과 품질을 저희가 컨트롤하고 싶어서.<br />
        재료 수급부터 생산, 포장까지 한 곳에서 해요.
      </p>
    </div>

    {/* 이미지 플레이스홀더 */}
    <div style={{ 
      width: '100%', 
      height: '400px', 
      backgroundColor: '#EEF2EB', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      color: '#6B6B6B',
      fontSize: '14px',
      margin: '32px 0'
    }}>
      [공장 이미지]
    </div>

    {/* 비건 레시피 아카이브 */}
    <div style={{ marginTop: '48px' }}>
      <h3 style={{ 
        fontSize: '18px', 
        fontWeight: 700, 
        marginBottom: '16px' 
      }}>
        비건 레시피 아카이브
      </h3>
      <p className="about-paragraph">
        5년간 개발한 비건 레시피 500개 이상 보유하고 있어요.<br />
        한식, 양식, 아시안, 디저트까지.
      </p>
      <p className="about-paragraph">
        맛없으면 안 만들어요.<br />
        "이게 비건이야?" 소리 들을 때까지 테스트해요.
      </p>
      
      {/* 특허 뱃지 */}
      <div style={{ marginTop: '24px' }}>
        <span className="tech-badge">[특허] 식물성 햄 제조 특허</span>
        <span className="tech-badge">[특허] 식물성 단백질 텍스처링 기술</span>
      </div>
    </div>

    {/* B2B 파트너십 */}
    <div style={{ marginTop: '48px' }}>
      <h3 style={{ 
        fontSize: '18px', 
        fontWeight: 700, 
        marginBottom: '16px' 
      }}>
        B2B 파트너십
      </h3>
      <p className="about-paragraph">
        호텔, 레스토랑, 카페, 급식 등<br />
        비건 메뉴가 필요한 곳에 공급하고 있어요.
      </p>
      <p className="about-paragraph">
        OEM/ODM 문의도 받아요.<br />
        레시피 개발부터 생산까지 같이 할 수 있어요.
      </p>
      <p className="about-paragraph">
        <strong>문의:</strong> export@slunch.co.kr
      </p>
      <a 
        href="mailto:export@slunch.co.kr"
        className="about-link-btn"
      >
        B2B 문의하기 →
      </a>
    </div>

    {/* 주요 파트너 */}
    <div style={{ marginTop: '48px' }}>
      <h3 style={{ 
        fontSize: '18px', 
        fontWeight: 700, 
        marginBottom: '16px' 
      }}>
        주요 파트너
      </h3>
      <div style={{ 
        fontSize: '14px', 
        lineHeight: '2',
        color: '#6B6B6B'
      }}>
        <p>• 더현대 서울</p>
        <p>• 신세계푸드</p>
        <p>• CJ프레시웨이</p>
        <p>• 풀무원</p>
        <p style={{ fontSize: '12px', color: '#9A9A9A', marginTop: '8px' }}>
          (실제 파트너사로 수정 필요)
        </p>
      </div>
    </div>
  </section>
);

export default AboutPage;

