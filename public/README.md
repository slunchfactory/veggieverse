# 이미지 폴더 구조 가이드

## 📁 폴더 구조

```
public/
├── common/              # 공통 이미지
│   ├── logo.png        # 메인 로고
│   ├── logo_footer.png # 푸터 로고
│   └── background.png  # 배경 이미지
│
├── main/               # 메인 페이지 (홈)
│   ├── banner/         # 메인 배너 (슬라이더)
│   │   └── main-banner-1.png ~ main-banner-4.png
│   └── products/       # 홈페이지 상품 썸네일
│       └── product-1.jpg ~ product-6.jpg
│
├── store/              # 스토어 페이지
│   ├── thumbnails/     # 상품 썸네일 (그리드용)
│   │   └── product-1.jpg ~ product-10.jpg
│   └── details/        # 상품 상세 이미지
│       ├── product-1/
│       │   ├── detail-1.jpg
│       │   ├── detail-2.jpg
│       │   └── ...
│       └── product-2/
│           └── ...
│
├── newsletter/         # 뉴스레터 페이지
│   └── articles/       # 아티클 썸네일
│       ├── article-1.jpg
│       ├── article-2.jpg
│       ├── article-3.jpg
│       ├── article-4.jpg
│       └── article-5.jpg
│
├── recipe/             # 레시피 페이지
│   ├── thumbnails/     # 레시피 썸네일
│   │   └── recipe-{id}.jpg
│   └── details/        # 레시피 상세 이미지
│       └── recipe-{id}.jpg
│
├── brand/              # 브랜드 페이지
│   ├── hero.jpg        # 브랜드 히어로 이미지
│   └── store.jpg       # 매장 이미지
│
├── vege_flot_img/      # 재료 아이콘 (기존 유지)
│   └── ...
│
└── characters/         # 챗봇 캐릭터
    ├── slunch-character.png
    └── slunch-character-move.mp4
```

## 📝 사용 가이드

### 1. 메인 페이지
- 배너: `main/banner/main-banner-{번호}.png`
- 상품: `main/products/product-{id}.jpg`

### 2. 스토어 페이지
- 썸네일: `store/thumbnails/product-{id}.jpg`
- 상세: `store/details/product-{id}/detail-{번호}.jpg`

### 3. 뉴스레터
- 아티클: `newsletter/articles/article-{id}.jpg`

### 4. 레시피
- 썸네일: `recipe/thumbnails/recipe-{id}.jpg`
- 상세: `recipe/details/recipe-{id}.jpg`

## 🎯 파일 네이밍 규칙
- 소문자 사용
- 하이픈(-)으로 단어 구분
- 숫자는 01, 02 형식으로 앞에 0 붙이기 (정렬 편의)
- 예: `product-01.jpg`, `detail-01.jpg`







