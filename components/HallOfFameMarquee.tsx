import React from 'react';
import { Link } from 'react-router-dom';
import './HallOfFameMarquee.css';

// 명예의 전당 레시피 데이터 (상위 20개)
const hallOfFameRecipes = [
  { id: 1, title: '콩나물 비빔밥', likes: 1234 },
  { id: 2, title: '두부 스테이크', likes: 987 },
  { id: 3, title: '비건 파스타', likes: 876 },
  { id: 4, title: '야채 볶음밥', likes: 765 },
  { id: 5, title: '버섯 리조또', likes: 654 },
  { id: 6, title: '채식 카레', likes: 543 },
  { id: 7, title: '두부 샐러드', likes: 432 },
  { id: 8, title: '비건 버거', likes: 321 },
  { id: 9, title: '채소 스프', likes: 298 },
  { id: 10, title: '과일 스무디', likes: 276 },
  { id: 11, title: '퀴노아 볼', likes: 254 },
  { id: 12, title: '아보카도 토스트', likes: 243 },
  { id: 13, title: '템페 스테이크', likes: 232 },
  { id: 14, title: '비건 김밥', likes: 221 },
  { id: 15, title: '채식 떡볶이', likes: 210 },
  { id: 16, title: '두부 김치찌개', likes: 198 },
  { id: 17, title: '버섯 볶음', likes: 187 },
  { id: 18, title: '채소 볶음면', likes: 176 },
  { id: 19, title: '비건 팬케이크', likes: 165 },
  { id: 20, title: '과일 샐러드', likes: 154 },
];

// 플레이스홀더 이미지
const getRecipeImage = (id: number) => {
  const images = [
    'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400',
    'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400',
    'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400',
    'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400',
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400',
    'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400',
    'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=400',
    'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?w=400',
    'https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?w=400',
    'https://images.unsplash.com/photo-1547592180-85f173990554?w=400',
  ];
  return images[(id - 1) % images.length];
};

const HallOfFameMarquee: React.FC = () => {
  // 마키용 레시피 배열 (2번 반복)
  const marqueeRecipes = [...hallOfFameRecipes, ...hallOfFameRecipes];

  return (
    <section style={{ background: '#F5F5F0', padding: '48px 0 40px 0', width: '100%' }}>
      {/* 헤더 */}
      <div 
        style={{
          textAlign: 'center' as const,
          padding: '0 24px 32px 24px',
        }}
      >
        <span 
          style={{
            display: 'inline-block',
            background: '#000',
            color: '#fff',
            padding: '8px 16px',
            fontSize: '12px',
            fontWeight: 700,
            letterSpacing: '0.05em',
            marginBottom: '16px',
          }}
        >
          🏆 HALL OF FAME
        </span>
        <h2 
          style={{
            fontSize: '32px',
            fontWeight: 800,
            margin: '0 0 8px 0',
            color: '#000',
            lineHeight: 1.2,
          }}
        >
          명예의 전당
        </h2>
        <p 
          style={{
            fontSize: '14px',
            color: '#6B6B6B',
            margin: 0,
          }}
        >
          가장 많은 사랑을 받은 레시피
        </p>
      </div>
      
      {/* 마키 */}
      <div className="hof-marquee">
        <div className="hof-track">
          {marqueeRecipes.map((recipe, i) => (
            <Link 
              to={`/recipe/${recipe.id}`} 
              className="hof-card" 
              key={`${recipe.id}-${i}`}
              draggable={false}
            >
              <div className="hof-card-img">
                <img 
                  src={getRecipeImage(recipe.id)} 
                  alt={recipe.title}
                  loading="lazy"
                  draggable={false}
                />
                <span className="hof-rank">#{(i % hallOfFameRecipes.length) + 1}</span>
              </div>
              <div className="hof-card-content">
                <h3 className="hof-card-title">{recipe.title}</h3>
                <span className="hof-card-likes">❤️ {recipe.likes.toLocaleString()}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
      
      {/* 전체보기 링크 */}
      <div 
        className="hof-footer"
        style={{
          textAlign: 'center',
          paddingTop: '32px',
          paddingBottom: '16px',
        }}
      >
        <Link 
          to="/recipe/hall-of-fame" 
          className="hof-link"
          style={{
            display: 'inline-block',
            fontSize: '14px',
            fontWeight: 600,
            color: '#000',
            textDecoration: 'none',
            padding: '12px 24px',
            border: '1px solid #000',
          }}
        >
          전체보기 →
        </Link>
      </div>
    </div>
  );
};

export default HallOfFameMarquee;
