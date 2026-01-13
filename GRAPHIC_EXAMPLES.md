# 테스트 페이지 그래픽 적용 예시

## 방법 1: 로컬 이미지 사용 (권장)

### 예시 1: 단순 이미지 교체
```tsx
// 현재 코드 (이모지 사용)
<div className="text-6xl mb-6">🥗</div>

// 이미지로 교체
<div className="w-32 h-32 mx-auto mb-6">
  <img 
    src={`${import.meta.env.BASE_URL}graphics/spirit-icon.png`}
    alt="테이스트 스피릿"
    className="w-full h-full object-contain"
    onError={(e) => {
      // 이미지 로드 실패 시 대체
      (e.target as HTMLImageElement).style.display = 'none';
    }}
  />
</div>
```

### 예시 2: 애니메이션과 함께
```tsx
<div className="w-32 h-32 mx-auto mb-6 relative">
  {/* 배경 원형 그라데이션 */}
  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-green-200 via-emerald-300 to-teal-400 animate-pulse"></div>
  
  {/* 이미지 */}
  <img 
    src={`${import.meta.env.BASE_URL}graphics/spirit-icon.png`}
    alt="테이스트 스피릿"
    className="relative w-full h-full object-contain animate-bounce"
    style={{ animationDuration: '2s' }}
  />
</div>
```

### 예시 3: 여러 이미지 슬라이드/변화
```tsx
const [currentGraphic, setCurrentGraphic] = useState(0);
const graphics = [
  '/graphics/spirit-1.png',
  '/graphics/spirit-2.png',
  '/graphics/spirit-3.png',
];

useEffect(() => {
  const interval = setInterval(() => {
    setCurrentGraphic((prev) => (prev + 1) % graphics.length);
  }, 2000);
  return () => clearInterval(interval);
}, []);

<div className="w-32 h-32 mx-auto mb-6 transition-opacity duration-500">
  <img 
    src={`${import.meta.env.BASE_URL}${graphics[currentGraphic]}`}
    alt="테이스트 스피릿"
    className="w-full h-full object-contain"
  />
</div>
```

## 방법 2: CSS/SVG로 디자인

### 예시 1: CSS로 만든 그래픽
```tsx
<div className="w-32 h-32 mx-auto mb-6 relative">
  {/* 외부 원 */}
  <div className="absolute inset-0 rounded-full border-4 border-green-300 animate-spin" 
       style={{ animationDuration: '3s' }}></div>
  
  {/* 내부 원 */}
  <div className="absolute inset-4 rounded-full bg-gradient-to-br from-green-400 to-emerald-600"></div>
  
  {/* 중앙 아이콘 (이모지 또는 SVG) */}
  <div className="absolute inset-0 flex items-center justify-center text-4xl">
    🥗
  </div>
</div>
```

### 예시 2: SVG 그래픽
```tsx
<div className="w-32 h-32 mx-auto mb-6">
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {/* 배경 원 */}
    <circle cx="50" cy="50" r="45" fill="url(#gradient)" />
    
    {/* 그라데이션 정의 */}
    <defs>
      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#86efac" />
        <stop offset="100%" stopColor="#10b981" />
      </linearGradient>
    </defs>
    
    {/* 중앙 심볼 */}
    <path d="M50 30 L60 50 L50 70 L40 50 Z" fill="white" />
  </svg>
</div>
```

### 예시 3: 복잡한 애니메이션 그래픽
```tsx
<div className="w-32 h-32 mx-auto mb-6 relative">
  {/* 파티클 효과 */}
  {[...Array(6)].map((_, i) => (
    <div
      key={i}
      className="absolute w-2 h-2 bg-green-400 rounded-full"
      style={{
        left: '50%',
        top: '50%',
        transform: `rotate(${i * 60}deg) translateY(-40px)`,
        animation: `float ${2 + i * 0.2}s ease-in-out infinite`,
        animationDelay: `${i * 0.1}s`,
      }}
    />
  ))}
  
  {/* 중앙 아이콘 */}
  <div className="absolute inset-0 flex items-center justify-center text-5xl">
    🥗
  </div>
</div>

<style>{`
  @keyframes float {
    0%, 100% { transform: rotate(var(--rotation)) translateY(-40px) scale(1); opacity: 1; }
    50% { transform: rotate(var(--rotation)) translateY(-50px) scale(1.2); opacity: 0.7; }
  }
`}</style>
```

## 추천 구조

### public/graphics/ 폴더 구조
```
public/
  graphics/
    test-page/
      spirit-icon.png          # 메인 아이콘
      spirit-icon-animated.gif # 애니메이션 버전
      background-pattern.svg    # 배경 패턴
      decorative-elements/
        leaf-1.svg
        leaf-2.svg
        sparkle.svg
```

### 사용 예시
```tsx
// SurveyPage.tsx에서
const GRAPHICS = {
  mainIcon: '/graphics/test-page/spirit-icon.png',
  background: '/graphics/test-page/background-pattern.svg',
  decorative: {
    leaf1: '/graphics/test-page/decorative-elements/leaf-1.svg',
    leaf2: '/graphics/test-page/decorative-elements/leaf-2.svg',
    sparkle: '/graphics/test-page/decorative-elements/sparkle.svg',
  }
};

// 사용
<div className="relative">
  {/* 배경 */}
  <img src={GRAPHICS.background} className="absolute inset-0 opacity-10" />
  
  {/* 메인 아이콘 */}
  <img src={GRAPHICS.mainIcon} className="relative w-32 h-32 mx-auto" />
  
  {/* 장식 요소 */}
  <img src={GRAPHICS.decorative.leaf1} className="absolute top-0 left-0 w-16 h-16" />
</div>
```

## 성능 최적화 팁

1. **이미지 최적화**
   - PNG: 투명 배경 필요 시
   - WebP: 최신 브라우저용 (더 작은 용량)
   - SVG: 벡터 그래픽 (확대 시 깨짐 없음)

2. **Lazy Loading**
```tsx
<img 
  src={imageUrl}
  loading="lazy"
  decoding="async"
/>
```

3. **이미지 프리로드**
```tsx
useEffect(() => {
  const images = [
    '/graphics/test-page/spirit-icon.png',
    '/graphics/test-page/background-pattern.svg',
  ];
  
  images.forEach(src => {
    const img = new Image();
    img.src = `${import.meta.env.BASE_URL}${src}`;
  });
}, []);
```

## 결론

**로컬 이미지 사용을 권장합니다:**
- 디자인 자유도가 높음
- 캐시 활용으로 빠른 로딩
- 유지보수가 쉬움
- 이미지 최적화로 성능 개선 가능

**CSS/SVG는 다음 경우에 사용:**
- 매우 간단한 그래픽
- 동적 애니메이션이 중요한 경우
- 파일 관리가 어려운 경우

















