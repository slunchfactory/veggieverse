import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { TopControlBar, TabItem } from '../components/TopControlBar';

const newsletterTabs: TabItem[] = [
  { id: 'all', label: 'All' },
  { id: 'health', label: 'Health' },
  { id: 'culture', label: 'Culture' },
  { id: 'food', label: 'Food' },
  { id: 'life', label: 'Life' },
  { id: 'slunch', label: "Slunch's Pick" },
];

interface Article {
  id: number;
  category: string;
  title: string;
  subtitle: string;
  author: string;
  date: string;
  thumbnail: string;
  authorBio?: string;
  quote?: string;
  contentBeforeImages?: React.ReactNode;
  images?: {
    large?: string | { url: string; caption?: string };
    small?: Array<string | { url: string; caption?: string }>;
  };
  contentAfterImages?: React.ReactNode;
  contentAfterSmallImages?: React.ReactNode;
  content?: React.ReactNode;
}

// 작성자 정보 매핑
const AUTHOR_BIO: Record<string, string> = {
  'Huna': '슬런치팩토리의 대표. 맛있는 것 앞에서는 누구보다 솔직해진다.\n먹는 것에 진심인 사람들과 함께 이 공간을 만들어가고 있다.',
  'Josin': '12년 차가 넘어가는 슬런치팩토리의 기둥. 오래 머물고 싶은 맛을 고민한다.\n묵묵히 주방을 지키며 팀의 중심을 잡아주는 사람.',
  'ChaCha': '작고 동그랗고 귀여운 것을 좋아하는 디자이너. 사소한 것에서 영감을 얻는 편이다.',
  'Jin': '뭐든지 다 잘하는 듬직한 막내 직원. 없으면 안 되는 존재가 되어가는 중.',
};

// 작성자 프로필 이미지 매핑
const AUTHOR_AVATAR: Record<string, string> = {
  'Huna': 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=faces',
  'Josin': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=faces',
  'ChaCha': 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=faces',
  'Jin': 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=faces',
};

const ARTICLES: Article[] = [
  {
    id: 1,
    category: 'Health',
    title: '멈춰야 보이는 것들',
    subtitle: '번아웃을 겪고 나서야 깨달은 것들',
    author: 'Josin',
    date: '2024.12.10',
    thumbnail: '/article-1.jpg',
    quote: '요즘 나는 알람을 30분 늦춰놨다. 그 30분 동안 천장을 보며 멍하니 있는다.\n아무것도 안 하는 시간. 그게 하루 중 제일 좋다.',
    contentBeforeImages: (
      <>
        <p className="mb-6 leading-relaxed" style={{ fontSize: '14px', color: '#3D3D3D', lineHeight: '1.8' }}>
          작년 여름, 나는 침대에서 일어날 수가 없었다. 몸이 아픈 게 아니었다. 알람을 끄고 천장을 한 시간 동안 바라봤다. 출근해야 한다는 걸 알면서도, 그냥 아무것도 하고 싶지 않았다. 번아웃이라는 단어를 머리로는 알고 있었지만, 그게 내 이야기가 될 줄은 몰랐다.
        </p>
        <p className="mb-6 leading-relaxed" style={{ fontSize: '14px', color: '#3D3D3D', lineHeight: '1.8' }}>
          돌이켜보면 신호는 있었다. 좋아하던 일이 싫어지기 시작했고, 주말에도 월요일 걱정을 했다. 친구들 만나는 게 귀찮아졌고, 취미생활은 언제 했는지 기억도 안 났다. 그런데도 나는 계속 달렸다. 멈추면 뒤처질 것 같았고, 뒤처지면 다시는 따라잡을 수 없을 것 같았다.
        </p>
      </>
    ),
    images: {
      large: '/newsletter/articles/image1.jpg',
      small: ['/newsletter/articles/image2.jpg', '/newsletter/articles/image3.jpg'],
    },
    contentAfterImages: (
      <>
        <h3 style={{ fontSize: '16px', fontWeight: 400, color: '#000', marginTop: '40px', marginBottom: '16px' }}>열심히의 함정</h3>
        <p className="mb-6 leading-relaxed" style={{ fontSize: '14px', color: '#3D3D3D', lineHeight: '1.8' }}>
          우리는 '열심히'를 미덕으로 배웠다. 새벽까지 일하면 성실한 사람이고, 주말에도 노트북을 켜면 책임감 있는 사람이다. 쉬는 건 게으른 것이고, 여유를 부리면 도태되는 것이다. 그렇게 믿으며 살았다. 그 믿음이 나를 침대에 눕혀놓기 전까지는.
        </p>
        <p className="mb-6 leading-relaxed" style={{ fontSize: '14px', color: '#3D3D3D', lineHeight: '1.8' }}>
          번아웃이 오고 나서야 깨달았다. 나는 왜 이렇게까지 달렸을까. 정말 이 일이 좋아서였을까, 아니면 멈추는 게 두려워서였을까.
        </p>

        <h3 style={{ fontSize: '16px', fontWeight: 400, color: '#000', marginTop: '40px', marginBottom: '16px' }}>노 빡빡</h3>
        <p className="mb-6 leading-relaxed" style={{ fontSize: '14px', color: '#3D3D3D', lineHeight: '1.8' }}>
          회복하는 데 결정적이었던 건 태국 치앙마이 여행이었다. 거기서 만난 현지인이 내가 뭘 하든 이렇게 말했다. "노 빡빡. 천천히 해도 돼. 내일 해도 돼." 처음엔 답답했다. 나는 돈 주고 온 관광객인데, 왜 이렇게 느긋한 거지. 근데 며칠이 지나자 그 말이 위로가 되기 시작했다.
        </p>
      </>
    ),
    contentAfterSmallImages: (
      <>
        <h3 style={{ fontSize: '16px', fontWeight: 400, color: '#000', marginTop: '40px', marginBottom: '16px' }}>쉬는 것도 일의 일부</h3>
        <p className="mb-6 leading-relaxed" style={{ fontSize: '14px', color: '#3D3D3D', lineHeight: '1.8' }}>
          지금은 일주일에 하루, 무조건 쉬는 날을 정해두고 있다. 처음엔 불안했다. 이 시간에 다른 사람들은 일하고 있을 텐데. 근데 신기하게도 쉬고 나면 오히려 작업 효율이 올라갔다.
        </p>
        <p className="mb-6 leading-relaxed" style={{ fontSize: '14px', color: '#3D3D3D', lineHeight: '1.8' }}>
          번아웃은 실패가 아니다. 몸이 보내는 신호다. 쓰러지기 전에 멈춰도 된다. 쉬는 것도 일의 일부다.
        </p>
      </>
    ),
  },
  {
    id: 2,
    category: 'Culture',
    title: '2060년, 나는 마흔이 된다',
    subtitle: '초고령 사회를 앞둔 Z세대의 고민',
    author: 'Huna',
    date: '2024.12.05',
    thumbnail: '/article-2.jpg',
    quote: '2060년의 나에게 편지를 쓴다면 이렇게 쓸 것 같다.\n그때도 계속 배우고 있길. 그리고 아직도 할머니한테 전화하고 있길.',
    contentBeforeImages: (
      <>
        <p className="mb-6 leading-relaxed" style={{ fontSize: '14px', color: '#3D3D3D', lineHeight: '1.8' }}>
          고등학교 사회 시간에 인구 피라미드 그래프를 봤다. 2025년 한국의 65세 이상 인구 비율은 약 20%. 2050년이 되면 40%를 넘는다고 했다.
        </p>
        <p className="mb-6 leading-relaxed" style={{ fontSize: '14px', color: '#3D3D3D', lineHeight: '1.8' }}>
          막연하게 알고 있던 '고령화'가 갑자기 내 문제로 다가왔다. 뉴스에서 듣던 이야기가 아니라, 내 미래 이야기였다.
        </p>
      </>
    ),
    images: {
      large: '/newsletter/articles/image1.jpg',
      small: ['/newsletter/articles/image2.jpg', '/newsletter/articles/image3.jpg'],
    },
    contentAfterImages: (
      <>
        <h3 style={{ fontSize: '16px', fontWeight: 400, color: '#000', marginTop: '40px', marginBottom: '16px' }}>정답이 없는 시대</h3>
        <p className="mb-6 leading-relaxed" style={{ fontSize: '14px', color: '#3D3D3D', lineHeight: '1.8' }}>
          부모님 세대에는 정답이 있었다. 좋은 대학 가고, 좋은 회사 들어가고, 정년까지 버티면 됐다. 근데 우리 세대는 다르다.
        </p>
      </>
    ),
    contentAfterSmallImages: (
      <>
        <h3 style={{ fontSize: '16px', fontWeight: 400, color: '#000', marginTop: '40px', marginBottom: '16px' }}>관계라는 자원</h3>
        <p className="mb-6 leading-relaxed" style={{ fontSize: '14px', color: '#3D3D3D', lineHeight: '1.8' }}>
          어떤 책에서 읽었다. 초고령 사회에서 가장 중요한 자원은 돈도 기술도 아니라 '관계'라고.
        </p>
      </>
    ),
  },
  {
    id: 3,
    category: 'Food',
    title: '냉장고를 열면 한 끼가 보인다',
    subtitle: '배달 앱 골드 등급이 집밥을 시작한 이유',
    author: 'ChaCha',
    date: '2024.11.28',
    thumbnail: '/article-3.jpg',
    quote: '냉장고를 열면 한 끼가 보인다는 말이 이제 조금 이해가 된다.\n거창한 요리를 할 필요 없다. 있는 재료로, 먹을 만큼만, 내 입맛대로. 그게 집밥이다.',
    contentBeforeImages: (
      <>
        <p className="mb-6 leading-relaxed" style={{ fontSize: '14px', color: '#3D3D3D', lineHeight: '1.8' }}>
          나는 배달 앱 골드 등급이다. 자랑이 아니라 반성이다. 집밥을 해먹고 싶은 마음은 있다. 근데 퇴근하면 장 볼 힘이 없고, 주말에 장을 봐도 재료가 냉장고에서 시든다.
        </p>
      </>
    ),
    images: {
      large: '/newsletter/articles/image1.jpg',
      small: ['/newsletter/articles/image2.jpg', '/newsletter/articles/image3.jpg'],
    },
    contentAfterImages: (
      <>
        <h3 style={{ fontSize: '16px', fontWeight: 400, color: '#000', marginTop: '40px', marginBottom: '16px' }}>완벽주의라는 적</h3>
        <p className="mb-6 leading-relaxed" style={{ fontSize: '14px', color: '#3D3D3D', lineHeight: '1.8' }}>
          집밥의 가장 큰 적은 완벽주의다. 이걸 깨닫는 데 오래 걸렸다.
        </p>
      </>
    ),
    contentAfterSmallImages: (
      <>
        <h3 style={{ fontSize: '16px', fontWeight: 400, color: '#000', marginTop: '40px', marginBottom: '16px' }}>라면도 집에서 끓이면 다르다</h3>
        <p className="mb-6 leading-relaxed" style={{ fontSize: '14px', color: '#3D3D3D', lineHeight: '1.8' }}>
          솔직히 집밥이 제일 맛있다. 내 입맛에 맞게 간을 할 수 있으니까.
        </p>
      </>
    ),
  },
  {
    id: 4,
    category: 'Life',
    title: '"그 영화 재밌어" 다음에 할 말',
    subtitle: '소개팅에서 영화 이야기 잘하는 법',
    author: 'Jin',
    date: '2024.11.20',
    thumbnail: '/article-4.jpg',
    quote: '다음 소개팅에서는 이렇게 물어봐야겠다.\n\'최근 본 영화 중에 제일 웃겼던 장면이 뭐예요?\'',
    contentBeforeImages: (
      <>
        <p className="mb-6 leading-relaxed" style={{ fontSize: '14px', color: '#3D3D3D', lineHeight: '1.8' }}>
          소개팅에서 영화 이야기를 잘 못한다. "최근에 뭐 봤어요?"라고 물으면 "음... 넷플릭스에서 뭐 봤는데..." 하다가 제목이 생각 안 나서 멈칫한다.
        </p>
      </>
    ),
    images: {
      large: '/newsletter/articles/image1.jpg',
      small: ['/newsletter/articles/image2.jpg', '/newsletter/articles/image3.jpg'],
    },
    contentAfterImages: (
      <>
        <h3 style={{ fontSize: '16px', fontWeight: 400, color: '#000', marginTop: '40px', marginBottom: '16px' }}>피해야 할 것들</h3>
        <p className="mb-6 leading-relaxed" style={{ fontSize: '14px', color: '#3D3D3D', lineHeight: '1.8' }}>
          먼저 피해야 할 것부터 정리했다. 스포일러는 당연히 안 된다.
        </p>
      </>
    ),
    contentAfterSmallImages: (
      <>
        <h3 style={{ fontSize: '16px', fontWeight: 400, color: '#000', marginTop: '40px', marginBottom: '16px' }}>취향이 달라도 괜찮다</h3>
        <p className="mb-6 leading-relaxed" style={{ fontSize: '14px', color: '#3D3D3D', lineHeight: '1.8' }}>
          취향이 다를 때도 기회다. 다름을 인정하고 호기심을 보이는 거다.
        </p>
      </>
    ),
  },
  {
    id: 5,
    category: "Slunch's Pick",
    title: '마음을 전하는 데 10만원은 필요 없다',
    subtitle: '3만원으로 완성하는 크리스마스 선물',
    author: 'Josin',
    date: '2024.11.15',
    thumbnail: '/article-5.jpg',
    quote: '어제 편의점에 들렀다. 핫초코 스틱 3개, 마시멜로 한 봉지, 그리고 엽서 한 장.\n합계 7천원.',
    contentBeforeImages: (
      <>
        <p className="mb-6 leading-relaxed" style={{ fontSize: '14px', color: '#3D3D3D', lineHeight: '1.8' }}>
          크리스마스가 다가오면 스트레스를 받는다. 뭘 선물해야 할지 모르겠고, 좋은 거 사주자니 통장이 걱정되고, 저렴한 거 사자니 성의 없어 보일까 봐 걱정된다.
        </p>
      </>
    ),
    images: {
      large: '/newsletter/articles/image1.jpg',
      small: ['/newsletter/articles/image2.jpg', '/newsletter/articles/image3.jpg'],
    },
    contentAfterImages: (
      <>
        <h3 style={{ fontSize: '16px', fontWeight: 400, color: '#000', marginTop: '40px', marginBottom: '16px' }}>비싼 선물이 좋은 선물일까</h3>
        <p className="mb-6 leading-relaxed" style={{ fontSize: '14px', color: '#3D3D3D', lineHeight: '1.8' }}>
          곰곰이 생각해봤다. 내가 받아서 기뻤던 선물이 뭐였지?
        </p>
      </>
    ),
    contentAfterSmallImages: (
      <>
        <h3 style={{ fontSize: '16px', fontWeight: 400, color: '#000', marginTop: '40px', marginBottom: '16px' }}>손편지의 힘</h3>
        <p className="mb-6 leading-relaxed" style={{ fontSize: '14px', color: '#3D3D3D', lineHeight: '1.8' }}>
          손편지가 부담스러운 사람도 있을 거다. 뭐라고 써야 할지 모르겠으니까.
        </p>
      </>
    ),
  },
];

// 카테고리 목록 - TopControlBar tabs로 대체됨

// Bento Card Component
const BentoCard: React.FC<{
  article: Article;
  size: 'large' | 'medium' | 'small';
  onClick: () => void;
}> = ({ article, size, onClick }) => {
  const isLarge = size === 'large';
  const isMedium = size === 'medium';

  return (
    <div
      onClick={onClick}
      style={{
        background: 'var(--cream)',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: isLarge ? 'row' : 'column',
        height: '100%',
        overflow: 'hidden',
      }}
    >
      {/* 이미지 영역 */}
      <div
        style={{
          width: isLarge ? '60%' : '100%',
          aspectRatio: isLarge ? 'auto' : isMedium ? '4/3' : '1/1',
          height: isLarge ? '100%' : 'auto',
          background: '#E5E5E0',
          flexShrink: 0,
          overflow: 'hidden',
        }}
      >
        <img
          src={`${import.meta.env.BASE_URL}${article.thumbnail.replace('/', '')}`}
          alt={article.title}
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

      {/* 텍스트 영역 */}
      <div
        style={{
          flex: 1,
          padding: isLarge ? '32px' : isMedium ? '24px' : '20px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          borderLeft: isLarge ? '1px solid #000000' : 'none',
          borderTop: !isLarge ? '1px solid #000000' : 'none',
        }}
      >
        <div>
          {/* 카테고리 */}
          <p
            style={{
              fontSize: '11px',
              fontWeight: 400,
              letterSpacing: '0.05em',
              color: '#6B6B6B',
              marginBottom: isLarge ? '16px' : '12px',
            }}
          >
            {article.category}
          </p>

          {/* 제목 */}
          <h3
            style={{
              fontSize: isLarge ? '24px' : isMedium ? '18px' : '15px',
              fontWeight: 400,
              lineHeight: 1.3,
              color: '#000000',
              marginBottom: isLarge ? '12px' : '8px',
            }}
          >
            {article.title}
          </h3>

          {/* 부제목 - Large/Medium만 */}
          {(isLarge || isMedium) && (
            <p
              style={{
                fontSize: '14px',
                fontWeight: 400,
                color: '#6B6B6B',
                lineHeight: 1.5,
                marginBottom: '16px',
              }}
            >
              {article.subtitle}
            </p>
          )}
        </div>

        {/* 메타 정보 */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '12px',
            color: '#9A9A9A',
            marginTop: 'auto',
          }}
        >
          <span>{article.author}</span>
          <span>·</span>
          <span>{article.date}</span>
        </div>
      </div>
    </div>
  );
};

// Article Detail Modal - Split Layout (Magazine Style)
const ArticleDetail: React.FC<{
  article: Article;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}> = ({ article, onClose, onPrev, onNext, hasPrev, hasNext }) => {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        overflowY: 'auto',
        background: 'var(--cream)',
      }}
    >
      {/* 닫기 버튼 - Fixed */}
      <button
        onClick={onClose}
        style={{
          position: 'fixed',
          top: '24px',
          right: '24px',
          width: '40px',
          height: '40px',
          background: 'var(--cream)',
          border: '1px solid #000',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 110,
        }}
      >
        <X size={20} color="#000" />
      </button>

      {/* 1280px Container with Split Layout */}
      <div className="max-w-[1280px] mx-auto px-5 py-[60px]">
        <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-[60px]">

          {/* LEFT: Sticky Cover */}
          <aside className="lg:sticky lg:top-[100px] h-fit">
            {/* 커버 이미지 */}
            <div
              style={{
                width: '100%',
                aspectRatio: '3/4',
                background: '#E5E5E0',
                overflow: 'hidden',
                marginBottom: '20px',
              }}
            >
              <img
                src={`${import.meta.env.BASE_URL}${article.thumbnail.replace('/', '')}`}
                alt={`${article.title} - 커버 이미지`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
                loading="eager"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.backgroundColor = '#e5ded8';
                }}
              />
            </div>

            {/* 카테고리 */}
            <p
              style={{
                fontSize: '11px',
                color: '#6B6B6B',
                letterSpacing: '0.1em',
                fontWeight: 400,
                marginBottom: '13px',
                textTransform: 'uppercase',
              }}
            >
              {article.category}
            </p>

            {/* 제목 */}
            <h1
              style={{
                fontSize: '28px',
                fontWeight: 400,
                color: '#000',
                lineHeight: 1.3,
                marginBottom: '13px',
              }}
            >
              {article.title}
            </h1>

            {/* 부제목 */}
            <p
              style={{
                fontSize: '15px',
                fontWeight: 400,
                color: '#6B6B6B',
                marginBottom: '20px',
                lineHeight: 1.5,
              }}
            >
              {article.subtitle}
            </p>

            {/* 날짜 & 작성자 */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '13px',
                color: '#9A9A9A',
              }}
            >
              <span>{article.author}</span>
              <span>·</span>
              <span>{article.date}</span>
            </div>
          </aside>

          {/* RIGHT: Scrollable Body */}
          <main style={{ fontSize: '15px', lineHeight: 1.7, color: '#1a1a1a' }}>
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
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </div>
                )}
                <div>
                  <p
                    style={{
                      fontSize: '14px',
                      fontWeight: 400,
                      color: '#000000',
                      marginBottom: '4px',
                    }}
                  >
                    {article.author}
                  </p>
                  {AUTHOR_BIO[article.author] && (
                    <p
                      style={{
                        fontSize: '13px',
                        fontWeight: 400,
                        color: '#6B6B6B',
                        lineHeight: 1.5,
                      }}
                    >
                      {AUTHOR_BIO[article.author].split('\n')[0]}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* 네비게이션 */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '60px',
                paddingTop: '20px',
                borderTop: '1px solid #000000',
              }}
            >
              {hasPrev ? (
                <button
                  onClick={onPrev}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '12px 0',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '14px',
                    color: '#000000',
                  }}
                >
                  <ChevronLeft size={16} />
                  <span>이전글</span>
                </button>
              ) : (
                <div />
              )}

              <button
                onClick={onClose}
                style={{
                  padding: '12px 24px',
                  background: 'transparent',
                  border: '1px solid #000000',
                  cursor: 'pointer',
                  fontSize: '14px',
                  color: '#000000',
                }}
              >
                목록
              </button>

              {hasNext ? (
                <button
                  onClick={onNext}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '12px 0',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '14px',
                    color: '#000000',
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

export const NewsletterPage: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // 카테고리 필터링
  const filteredArticles = selectedCategory === 'all'
    ? ARTICLES
    : ARTICLES.filter((article) => {
        if (selectedCategory === 'slunch') {
          return article.category === "Slunch's Pick";
        }
        return article.category.toLowerCase() === selectedCategory;
      });

  // 이전/다음 아티클 찾기
  const currentIndex = selectedArticle
    ? ARTICLES.findIndex((a) => a.id === selectedArticle.id)
    : -1;
  const prevArticle = currentIndex > 0 ? ARTICLES[currentIndex - 1] : null;
  const nextArticle =
    currentIndex >= 0 && currentIndex < ARTICLES.length - 1
      ? ARTICLES[currentIndex + 1]
      : null;

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      {/* Article Detail Modal */}
      {selectedArticle && (
        <ArticleDetail
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
          onPrev={() => prevArticle && setSelectedArticle(prevArticle)}
          onNext={() => nextArticle && setSelectedArticle(nextArticle)}
          hasPrev={!!prevArticle}
          hasNext={!!nextArticle}
        />
      )}

      {/* TopControlBar - KBP Style */}
      <TopControlBar
        tabs={newsletterTabs}
        activeTab={selectedCategory}
        onTabChange={setSelectedCategory}
      />

      {/* 아티클 그리드 - 여백 기반, 반응형 (Fixed TopControlBar 높이만큼 여백) */}
      <div className="px-4 md:px-8 lg:px-16 py-8 max-w-[1400px] mx-auto" style={{ paddingTop: '64px' }}>
        {filteredArticles.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '120px 0',
              color: '#6B6B6B',
              fontSize: '14px',
            }}
          >
            해당 카테고리에 아티클이 없습니다.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                onClick={() => setSelectedArticle(article)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// 심플한 아티클 카드 컴포넌트
const ArticleCard: React.FC<{
  article: Article;
  onClick: () => void;
}> = ({ article, onClick }) => {
  return (
    <div
      onClick={onClick}
      style={{
        background: 'var(--cream)',
        cursor: 'pointer',
      }}
    >
      {/* 이미지 영역 */}
      <div
        style={{
          width: '100%',
          aspectRatio: '4/3',
          background: '#E5E5E0',
          overflow: 'hidden',
          borderRadius: '4px',
        }}
      >
        <img
          src={`${import.meta.env.BASE_URL}${article.thumbnail.replace('/', '')}`}
          alt={article.title}
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

      {/* 텍스트 영역 - 테두리 없음 */}
      <div style={{ paddingTop: '16px' }}>
        {/* 카테고리 */}
        <p
          style={{
            fontSize: '11px',
            fontWeight: 400,
            letterSpacing: '0.05em',
            color: '#6B6B6B',
            marginBottom: '8px',
            textTransform: 'uppercase',
          }}
        >
          {article.category}
        </p>

        {/* 제목 */}
        <h3
          style={{
            fontSize: '16px',
            fontWeight: 400,
            lineHeight: 1.3,
            color: '#000000',
            marginBottom: '6px',
          }}
        >
          {article.title}
        </h3>

        {/* 부제목 */}
        <p
          style={{
            fontSize: '13px',
            fontWeight: 400,
            color: '#6B6B6B',
            lineHeight: 1.5,
            marginBottom: '12px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {article.subtitle}
        </p>

        {/* 메타 정보 */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '12px',
            color: '#9A9A9A',
          }}
        >
          <span>{article.author}</span>
          <span>·</span>
          <span>{article.date}</span>
        </div>
      </div>
    </div>
  );
};
