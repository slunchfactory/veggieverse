# 빠른 시작 가이드 - 이미지 업로드 준비

## ✅ 완료된 것
- GitHub Personal Access Token 생성 완료

## 🔧 다음 단계

### 1. Xcode Command Line Tools 설치

터미널에서 다음 명령어를 실행하세요:

```bash
xcode-select --install
```

설치 대화상자가 나타나면:
1. **설치** 버튼 클릭
2. 약관 동의
3. 설치 완료까지 대기 (5-10분 소요)

### 2. Git 설정 (설치 완료 후)

터미널에서 다음 명령어들을 순서대로 실행하세요:

```bash
# 프로젝트 폴더로 이동
cd /Users/kimjihyeon/veggieverse

# Git 사용자 정보 설정 (처음 한 번만)
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Git 저장소 초기화
git init

# 원격 저장소 연결
git remote add origin https://github.com/slunchfactory/veggieverse.git

# 브랜치 설정
git branch -M main
```

### 3. 이미지 업로드 방법

이미지를 수정한 후:

```bash
cd /Users/kimjihyeon/veggieverse

# 변경사항 확인
git status

# 이미지 파일 추가 (public 폴더의 모든 변경사항)
git add public/

# 또는 특정 파일만 추가
git add public/main/products/your-image.jpg

# 커밋
git commit -m "이미지 업데이트: 설명"

# GitHub에 푸시
git push origin main
```

**푸시할 때:**
- Username: `slunchfactory`
- Password: `[생성한 토큰 붙여넣기]`

### 4. 현재 상태 확인

```bash
# Git 저장소 상태 확인
git status

# 원격 저장소 확인
git remote -v
```

## 💡 팁

- 토큰은 안전하게 보관하세요
- 큰 이미지 파일은 GitHub 제한(100MB)을 확인하세요
- 한글 파일명은 문제가 될 수 있으니 영어 파일명 사용 권장

