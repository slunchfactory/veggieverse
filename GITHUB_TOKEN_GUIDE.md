# GitHub Personal Access Token 생성 가이드

## 올바른 경로 (단계별)

### 1단계: GitHub 설정 페이지로 이동
1. GitHub에 로그인
2. 오른쪽 상단 프로필 아이콘 클릭
3. **Settings** 클릭

### 2단계: Developer settings로 이동
1. 왼쪽 사이드바 맨 아래로 스크롤
2. **Developer settings** 클릭

### 3단계: Personal access tokens로 이동
1. 왼쪽 메뉴에서 **Personal access tokens** 클릭
2. **Tokens (classic)** 클릭 (⚠️ Fine-grained tokens가 아님!)

### 4단계: 토큰 생성
1. **Generate new token** 버튼 클릭
2. **Generate new token (classic)** 선택

### 5단계: 토큰 설정
1. **Note**: 토큰 설명 입력 (예: "veggieverse 이미지 업로드")
2. **Expiration**: 만료 기간 선택 (90 days 또는 원하는 기간)
3. **Select scopes**: 아래 권한 체크
   - ✅ **repo** (전체 체크박스 선택 - 모든 저장소 접근 권한)

### 6단계: 토큰 생성 및 복사
1. 맨 아래 **Generate token** 버튼 클릭
2. **⚠️ 중요**: 생성된 토큰을 즉시 복사하세요! (한 번만 보여집니다)
3. 안전한 곳에 저장해두세요

## 토큰 사용 방법

터미널에서 git push 할 때:
```bash
git push origin main
Username: slunchfactory
Password: [여기에 생성한 토큰 붙여넣기]
```

## 주의사항

- ❌ **GitHub App 등록 페이지가 아님** - 그 페이지는 닫으세요
- ✅ **Personal access tokens (classic)** 사용
- 토큰은 비밀번호처럼 안전하게 보관하세요
- 토큰이 유출되면 즉시 GitHub에서 삭제하세요

## 빠른 링크

직접 링크: https://github.com/settings/tokens

