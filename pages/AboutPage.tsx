import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Clock, ExternalLink, Mail, Award } from 'lucide-react';
import { TopControlBar, TabItem } from '../components/TopControlBar';

const aboutTabs: TabItem[] = [
  { id: 'story', label: 'Story' },
  { id: 'branch', label: 'Branch' },
  { id: 'b2b', label: 'B2B' },
];

const AboutPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState('story');

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      {/* TopControlBar - KBP Style */}
      <TopControlBar
        tabs={aboutTabs}
        activeTab={activeSection}
        onTabChange={setActiveSection}
      />

      {/* 콘텐츠 영역 - Full Width (Fixed TopControlBar 높이만큼 여백) */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', paddingTop: '48px' }}>
        {activeSection === 'story' && <StorySection />}
        {activeSection === 'branch' && <BranchSection />}
        {activeSection === 'b2b' && <B2BSection />}
      </div>
    </div>
  );
};

// STORY 섹션 - 매거진 스타일 그리드
const StorySection: React.FC = () => (
  <div>
    {/* 히어로 그리드 */}
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      borderBottom: '1px solid #000',
    }}>
      {/* 이미지 */}
      <div style={{
        aspectRatio: '4/3',
        background: '#E8E4DF',
        borderRight: '1px solid #000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--muted)',
        fontSize: '14px',
      }}>
        [브랜드 이미지]
      </div>

      {/* 텍스트 */}
      <div style={{ padding: '64px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <p style={{
          fontSize: '11px',
          color: 'var(--warm-gray)',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          marginBottom: '16px',
        }}>
          Since 2019
        </p>
        <h1 style={{
          fontSize: '32px',
          fontWeight: 400,
          lineHeight: 1.3,
          marginBottom: '24px',
        }}>
          Slow and Lunch
        </h1>
        <p style={{
          fontSize: '15px',
          fontWeight: 400,
          lineHeight: 1.8,
          color: 'var(--charcoal)',
        }}>
          슬런치팩토리는 2019년 부천에서 시작했어요.
          '천천히, 제대로 만든 점심 한 끼'라는 생각으로
          Slow와 Lunch를 합쳐 슬런치라는 이름을 지었어요.
        </p>
      </div>
    </div>

    {/* 3단 그리드 */}
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      borderBottom: '1px solid #000',
    }}>
      <div style={{
        padding: '48px 32px',
        borderRight: '1px solid #000',
      }}>
        <p style={{
          fontSize: '11px',
          color: 'var(--warm-gray)',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          marginBottom: '16px',
        }}>
          Philosophy
        </p>
        <p style={{
          fontSize: '15px',
          fontWeight: 400,
          lineHeight: 1.8,
          color: 'var(--charcoal)',
        }}>
          고기 없이도 맛있을 수 있다는 걸 보여주고 싶었어요.
          "비건이라서 맛있는 게 아니라, 맛있는데 비건인 거"
          그게 저희가 생각하는 방향이에요.
        </p>
      </div>

      <div style={{
        padding: '48px 32px',
        borderRight: '1px solid #000',
      }}>
        <p style={{
          fontSize: '11px',
          color: 'var(--warm-gray)',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          marginBottom: '16px',
        }}>
          Production
        </p>
        <p style={{
          fontSize: '15px',
          fontWeight: 400,
          lineHeight: 1.8,
          color: 'var(--charcoal)',
        }}>
          홍대와 더현대에서 직접 만든 음식을 팔고 있어요.
          공장도 여전히 직접 운영하고요.
          재료 고르는 것부터 포장까지, 다 저희 손을 거쳐요.
        </p>
      </div>

      <div style={{ padding: '48px 32px' }}>
        <p style={{
          fontSize: '11px',
          color: 'var(--warm-gray)',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          marginBottom: '16px',
        }}>
          Vision
        </p>
        <p style={{
          fontSize: '15px',
          fontWeight: 400,
          lineHeight: 1.8,
          color: 'var(--charcoal)',
        }}>
          식물성이라고 해서 특별하거나 불편하지 않았으면 해요.
          그냥 맛있는 음식. 속 편한 한 끼.
          그게 슬런치가 만들고 싶은 거예요.
        </p>
      </div>
    </div>

    {/* 풀와이드 이미지 */}
    <div style={{
      height: '400px',
      background: '#D4CFC7',
      borderBottom: '1px solid #000',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--muted)',
      fontSize: '14px',
    }}>
      [공장/매장 전경 이미지]
    </div>

    {/* 태그 섹션 */}
    <div style={{
      padding: '32px 64px',
      display: 'flex',
      gap: '16px',
      borderBottom: '1px solid #000',
    }}>
      {['#속편한', '#재료가솔직한', '#식물성', '#천천히제대로'].map((tag) => (
        <span key={tag} style={{
          padding: '8px 16px',
          border: '1px solid #000',
          fontSize: '13px',
          fontWeight: 400,
        }}>
          {tag}
        </span>
      ))}
    </div>
  </div>
);

// BRANCH 섹션
const BranchSection: React.FC = () => (
  <div>
    {/* 홍대점 */}
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      borderBottom: '1px solid #000',
    }}>
      <div style={{
        aspectRatio: '4/3',
        background: '#E8E4DF',
        borderRight: '1px solid #000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--muted)',
        fontSize: '14px',
      }}>
        [홍대점 이미지]
      </div>

      <div style={{ padding: '48px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <p style={{
          fontSize: '11px',
          color: 'var(--warm-gray)',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          marginBottom: '12px',
        }}>
          Flagship Store
        </p>
        <h2 style={{
          fontSize: '24px',
          fontWeight: 400,
          marginBottom: '24px',
        }}>
          홍대점
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <MapPin className="w-4 h-4" style={{ color: 'var(--warm-gray)', marginTop: '2px', flexShrink: 0 }} />
            <span style={{ fontSize: '14px', color: 'var(--charcoal)', lineHeight: 1.6 }}>
              서울 마포구 와우산로 29길 6, 1층
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Clock className="w-4 h-4" style={{ color: 'var(--warm-gray)', flexShrink: 0 }} />
            <span style={{ fontSize: '14px', color: 'var(--charcoal)' }}>
              11:00 - 21:00 (월요일 휴무)
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Phone className="w-4 h-4" style={{ color: 'var(--warm-gray)', flexShrink: 0 }} />
            <span style={{ fontSize: '14px', color: 'var(--charcoal)' }}>
              02-332-6525
            </span>
          </div>
        </div>

        <p style={{
          fontSize: '14px',
          color: 'var(--warm-gray)',
          lineHeight: 1.7,
          marginBottom: '24px',
        }}>
          홍대입구역 3번 출구에서 도보 7분.
          작은 골목 안에 있어요.
          테이크아웃도 되고, 안에서 먹어도 돼요.
        </p>

        <a
          href="https://naver.me/Fx3M8pKJ"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 24px',
            border: '1px solid #000',
            background: 'transparent',
            color: '#000',
            fontSize: '14px',
            fontWeight: 400,
            textDecoration: 'none',
            width: 'fit-content',
          }}
        >
          네이버 지도로 보기
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>

    {/* 더현대점 */}
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      borderBottom: '1px solid #000',
    }}>
      <div style={{ padding: '48px', display: 'flex', flexDirection: 'column', justifyContent: 'center', borderRight: '1px solid #000' }}>
        <p style={{
          fontSize: '11px',
          color: 'var(--warm-gray)',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          marginBottom: '12px',
        }}>
          Department Store
        </p>
        <h2 style={{
          fontSize: '24px',
          fontWeight: 400,
          marginBottom: '24px',
        }}>
          더현대 서울
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <MapPin className="w-4 h-4" style={{ color: 'var(--warm-gray)', marginTop: '2px', flexShrink: 0 }} />
            <span style={{ fontSize: '14px', color: 'var(--charcoal)', lineHeight: 1.6 }}>
              서울 강남구 테헤란로 517, 더현대 서울 B1
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Clock className="w-4 h-4" style={{ color: 'var(--warm-gray)', flexShrink: 0 }} />
            <span style={{ fontSize: '14px', color: 'var(--charcoal)' }}>
              10:30 - 20:00 (더현대 영업시간 따름)
            </span>
          </div>
        </div>

        <p style={{
          fontSize: '14px',
          color: 'var(--warm-gray)',
          lineHeight: 1.7,
        }}>
          지하 1층 푸드마켓 안에 있어요.
          바로 먹을 수 있는 델리 위주로 준비해뒀어요.
        </p>
      </div>

      <div style={{
        aspectRatio: '4/3',
        background: '#E8E4DF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--muted)',
        fontSize: '14px',
      }}>
        [더현대점 이미지]
      </div>
    </div>

    {/* 온라인 스토어 */}
    <div style={{
      padding: '64px',
      textAlign: 'center',
      borderBottom: '1px solid #000',
    }}>
      <p style={{
        fontSize: '11px',
        color: 'var(--warm-gray)',
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        marginBottom: '12px',
      }}>
        Online
      </p>
      <h2 style={{
        fontSize: '24px',
        fontWeight: 400,
        marginBottom: '16px',
      }}>
        온라인 스토어
      </h2>
      <p style={{
        fontSize: '14px',
        color: 'var(--warm-gray)',
        lineHeight: 1.7,
        marginBottom: '24px',
      }}>
        매장에 오기 어려우면 온라인으로도 주문할 수 있어요.
        냉동 배송으로 전국 어디든 보내드려요.
      </p>
      <a
        href="https://smartstore.naver.com/slunch"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '14px 28px',
          background: '#000',
          color: '#fff',
          fontSize: '14px',
          fontWeight: 400,
          textDecoration: 'none',
        }}
      >
        네이버 스마트스토어
        <ExternalLink className="w-4 h-4" />
      </a>
    </div>
  </div>
);

// B2B 섹션
const B2BSection: React.FC = () => (
  <div>
    {/* 자체 생산 시설 */}
    <div style={{
      display: 'grid',
      gridTemplateColumns: '2fr 1fr',
      borderBottom: '1px solid #000',
    }}>
      <div style={{
        padding: '64px',
        borderRight: '1px solid #000',
      }}>
        <p style={{
          fontSize: '11px',
          color: 'var(--warm-gray)',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          marginBottom: '12px',
        }}>
          Factory
        </p>
        <h2 style={{
          fontSize: '24px',
          fontWeight: 400,
          marginBottom: '24px',
        }}>
          자체 생산 시설
        </h2>
        <p style={{
          fontSize: '15px',
          color: 'var(--charcoal)',
          lineHeight: 1.8,
          marginBottom: '16px',
        }}>
          부천에 저희 공장이 있어요.
          델리, 소스, 빵, 디저트까지 전부 여기서 만들어요.
        </p>
        <p style={{
          fontSize: '15px',
          color: 'var(--charcoal)',
          lineHeight: 1.8,
        }}>
          외주 없이 직접 만드는 이유는 간단해요.
          맛과 품질을 저희가 컨트롤하고 싶어서.
          재료 수급부터 생산, 포장까지 한 곳에서 해요.
        </p>
      </div>

      <div style={{
        background: '#E8E4DF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--muted)',
        fontSize: '14px',
      }}>
        [공장 이미지]
      </div>
    </div>

    {/* 레시피 아카이브 + 특허 */}
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      borderBottom: '1px solid #000',
    }}>
      <div style={{
        padding: '48px',
        borderRight: '1px solid #000',
      }}>
        <p style={{
          fontSize: '11px',
          color: 'var(--warm-gray)',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          marginBottom: '12px',
        }}>
          Archive
        </p>
        <h3 style={{
          fontSize: '20px',
          fontWeight: 400,
          marginBottom: '16px',
        }}>
          비건 레시피 500+
        </h3>
        <p style={{
          fontSize: '14px',
          color: 'var(--charcoal)',
          lineHeight: 1.8,
        }}>
          5년간 개발한 비건 레시피 500개 이상 보유.
          한식, 양식, 아시안, 디저트까지.
          맛없으면 안 만들어요.
        </p>
      </div>

      <div style={{ padding: '48px' }}>
        <p style={{
          fontSize: '11px',
          color: 'var(--warm-gray)',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          marginBottom: '12px',
        }}>
          Technology
        </p>
        <h3 style={{
          fontSize: '20px',
          fontWeight: 400,
          marginBottom: '16px',
        }}>
          특허 기술
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Award className="w-4 h-4" style={{ color: 'var(--primary)' }} />
            <span style={{ fontSize: '14px', color: 'var(--charcoal)' }}>식물성 햄 제조 특허</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Award className="w-4 h-4" style={{ color: 'var(--primary)' }} />
            <span style={{ fontSize: '14px', color: 'var(--charcoal)' }}>식물성 단백질 텍스처링</span>
          </div>
        </div>
      </div>
    </div>

    {/* B2B 파트너십 */}
    <div style={{
      padding: '64px',
      borderBottom: '1px solid #000',
    }}>
      <div style={{ maxWidth: '600px' }}>
        <p style={{
          fontSize: '11px',
          color: 'var(--warm-gray)',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          marginBottom: '12px',
        }}>
          Partnership
        </p>
        <h2 style={{
          fontSize: '24px',
          fontWeight: 400,
          marginBottom: '24px',
        }}>
          B2B 파트너십
        </h2>
        <p style={{
          fontSize: '15px',
          color: 'var(--charcoal)',
          lineHeight: 1.8,
          marginBottom: '16px',
        }}>
          호텔, 레스토랑, 카페, 급식 등 비건 메뉴가 필요한 곳에 공급하고 있어요.
          OEM/ODM 문의도 받아요. 레시피 개발부터 생산까지 같이 할 수 있어요.
        </p>

        <a
          href="mailto:export@slunch.co.kr"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '14px 28px',
            background: '#000',
            color: '#fff',
            fontSize: '14px',
            fontWeight: 400,
            textDecoration: 'none',
            marginTop: '8px',
          }}
        >
          <Mail className="w-4 h-4" />
          B2B 문의하기
        </a>
      </div>
    </div>

    {/* 주요 파트너 */}
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
    }}>
      {['더현대 서울', '신세계푸드', 'CJ프레시웨이', '풀무원'].map((partner, idx) => (
        <div
          key={partner}
          style={{
            padding: '48px 32px',
            textAlign: 'center',
            borderRight: idx < 3 ? '1px solid #000' : 'none',
            borderBottom: '1px solid #000',
          }}
        >
          <div style={{
            width: '80px',
            height: '80px',
            background: '#E8E4DF',
            margin: '0 auto 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '12px',
            color: 'var(--muted)',
          }}>
            Logo
          </div>
          <span style={{ fontSize: '14px', color: 'var(--charcoal)' }}>{partner}</span>
        </div>
      ))}
    </div>
  </div>
);

export default AboutPage;
