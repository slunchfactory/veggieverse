# 테스트 페이지 이미지 크기 권장사항

## 현재 사용 중인 크기

### 시작 화면 메인 아이콘
- **현재**: 이모지 `text-6xl` (약 60px)
- **권장 이미지 크기**: 
  - **PNG/SVG**: 256px × 256px (2x 해상도 대비)
  - **실제 표시**: 128px × 128px (`w-32 h-32`)

### 상세 패널 이미지
- **현재**: `w-56 h-56` (224px × 224px)
- **권장 이미지 크기**: 
  - **PNG**: 448px × 448px (2x 해상도)
  - **실제 표시**: 224px × 224px

## 권장 이미지 크기 가이드

### 1. 메인 아이콘 (시작 화면)
```
원본 크기: 512px × 512px (고해상도 대비)
표시 크기: 128px × 128px (w-32 h-32)
최적화 크기: 256px × 256px (일반 사용)
```

**이유:**
- Retina 디스플레이(2x) 대비
- 모바일/태블릿/데스크톱 모두 지원
- 파일 크기와 품질의 균형

### 2. 배경 패턴/데코레이션
```
원본 크기: 1024px × 1024px (반복 패턴)
또는: 1920px × 1080px (전체 배경)
표시 크기: 반응형 (전체 화면)
```

### 3. 장식 요소 (작은 아이콘)
```
원본 크기: 128px × 128px
표시 크기: 32px × 32px ~ 64px × 64px
```

### 4. 결과 화면 스피릿 이미지
```
원본 크기: 800px × 800px
표시 크기: 400px × 400px (반응형)
```

## 파일 형식별 권장사항

### PNG
- **용도**: 투명 배경이 필요한 아이콘, 복잡한 그래픽
- **최적 크기**: 
  - 작은 아이콘: 256px × 256px
  - 큰 이미지: 512px × 512px
- **파일 크기 목표**: 50KB 이하 (작은 아이콘), 200KB 이하 (큰 이미지)

### SVG
- **용도**: 벡터 그래픽, 로고, 단순한 아이콘
- **장점**: 
  - 무한 확대 가능
  - 파일 크기 작음
  - CSS로 색상 변경 가능
- **권장**: 단순한 그래픽에 사용

### WebP
- **용도**: 사진, 복잡한 그래픽
- **최적 크기**: PNG와 동일
- **장점**: PNG 대비 25-35% 작은 파일 크기
- **단점**: 구형 브라우저 미지원 (fallback 필요)

## 반응형 디자인 고려사항

### 모바일 (320px ~ 768px)
```
메인 아이콘: 96px × 96px (w-24 h-24)
배경 패턴: 768px 너비
```

### 태블릿 (768px ~ 1024px)
```
메인 아이콘: 128px × 128px (w-32 h-32)
배경 패턴: 1024px 너비
```

### 데스크톱 (1024px+)
```
메인 아이콘: 160px × 160px (w-40 h-40)
배경 패턴: 1920px 너비
```

## 실제 적용 예시

### 예시 1: 메인 아이콘
```tsx
{/* 모바일: 96px, 데스크톱: 128px */}
<div className="w-24 h-24 md:w-32 md:h-32 mx-auto mb-6">
  <img 
    src={`${import.meta.env.BASE_URL}graphics/test-page/spirit-icon.png`}
    alt="테이스트 스피릿"
    className="w-full h-full object-contain"
    srcSet={`
      ${import.meta.env.BASE_URL}graphics/test-page/spirit-icon.png 1x,
      ${import.meta.env.BASE_URL}graphics/test-page/spirit-icon@2x.png 2x
    `}
  />
</div>
```

### 예시 2: 배경 이미지
```tsx
<div 
  className="absolute inset-0 opacity-10"
  style={{
    backgroundImage: `url(${import.meta.env.BASE_URL}graphics/test-page/background-pattern.svg)`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  }}
/>
```

## 최적화 체크리스트

- [ ] **이미지 압축**: TinyPNG, ImageOptim 등으로 최적화
- [ ] **적절한 형식 선택**: 
  - 단순 그래픽 → SVG
  - 복잡한 그래픽 → PNG/WebP
- [ ] **2x 해상도 제공**: Retina 디스플레이 대비
- [ ] **Lazy Loading**: 필요 시에만 로드
- [ ] **파일 크기**: 각 이미지 200KB 이하 목표

## 권장 폴더 구조 및 파일명

```
public/
  graphics/
    test-page/
      spirit-icon.png          (256×256px, ~30KB)
      spirit-icon@2x.png       (512×512px, ~80KB)
      background-pattern.svg   (벡터, ~5KB)
      decorative-elements/
        leaf-1.svg            (128×128px, ~2KB)
        leaf-2.svg            (128×128px, ~2KB)
        sparkle.svg            (64×64px, ~1KB)
```

## 성능 최적화 팁

1. **이미지 프리로드** (중요한 이미지)
```tsx
useEffect(() => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = `${import.meta.env.BASE_URL}graphics/test-page/spirit-icon.png`;
  document.head.appendChild(link);
}, []);
```

2. **srcset 사용** (반응형 이미지)
```tsx
<img 
  src={`${import.meta.env.BASE_URL}graphics/test-page/spirit-icon.png`}
  srcSet={`
    ${import.meta.env.BASE_URL}graphics/test-page/spirit-icon.png 1x,
    ${import.meta.env.BASE_URL}graphics/test-page/spirit-icon@2x.png 2x
  `}
  alt="테이스트 스피릿"
/>
```

3. **WebP with Fallback**
```tsx
<picture>
  <source 
    srcSet={`${import.meta.env.BASE_URL}graphics/test-page/spirit-icon.webp`} 
    type="image/webp" 
  />
  <img 
    src={`${import.meta.env.BASE_URL}graphics/test-page/spirit-icon.png`}
    alt="테이스트 스피릿"
  />
</picture>
```

## 요약: 핵심 권장사항

| 용도 | 원본 크기 | 표시 크기 | 파일 형식 | 목표 크기 |
|------|----------|----------|----------|----------|
| 메인 아이콘 | 512×512px | 128×128px | PNG/SVG | <50KB |
| 배경 패턴 | 1920×1080px | 반응형 | SVG/PNG | <100KB |
| 장식 요소 | 128×128px | 32-64px | SVG | <5KB |
| 결과 이미지 | 800×800px | 400×400px | PNG/WebP | <200KB |

**가장 중요한 것:**
- **메인 아이콘**: 256px × 256px PNG (또는 SVG)
- **파일 크기**: 50KB 이하
- **2x 해상도**: 선택적으로 제공 (512px × 512px)

