# Git 환경 설정 가이드

GitHub에 이미지를 올리기 위한 환경 설정 방법입니다.

## 1. Xcode Command Line Tools 설치

터미널에서 다음 명령어를 실행하세요:

```bash
xcode-select --install
```

설치 대화상자가 나타나면 "설치"를 클릭하고 완료될 때까지 기다리세요.

## 2. Git 사용자 정보 설정

GitHub에 커밋할 때 사용할 이름과 이메일을 설정하세요:

```bash
cd /Users/kimjihyeon/veggieverse

# 사용자 이름 설정 (GitHub 사용자명 또는 원하는 이름)
git config --global user.name "Your Name"

# 이메일 설정 (GitHub 계정 이메일)
git config --global user.email "your.email@example.com"
```

## 3. Git 저장소 초기화 및 원격 저장소 연결

```bash
cd /Users/kimjihyeon/veggieverse

# Git 저장소 초기화
git init

# 원격 저장소 연결
git remote add origin https://github.com/slunchfactory/veggieverse.git

# 현재 브랜치를 main으로 설정
git branch -M main

# 원격 저장소 정보 확인
git remote -v
```

## 4. GitHub 인증 설정

### 방법 1: Personal Access Token 사용 (권장)

1. GitHub에 로그인
2. Settings → Developer settings → Personal access tokens → Tokens (classic)
3. "Generate new token" 클릭
4. 권한 선택: `repo` (전체 저장소 접근)
5. 토큰 생성 후 복사 (한 번만 보여짐!)

```bash
# 토큰을 사용하여 푸시 (토큰을 비밀번호로 사용)
git push -u origin main
# Username: slunchfactory
# Password: [생성한 토큰 붙여넣기]
```

### 방법 2: SSH 키 사용

```bash
# SSH 키 생성 (이미 있다면 생략)
ssh-keygen -t ed25519 -C "your.email@example.com"

# 공개키 복사
cat ~/.ssh/id_ed25519.pub

# GitHub → Settings → SSH and GPG keys → New SSH key
# 위에서 복사한 공개키를 붙여넣기

# 원격 저장소를 SSH로 변경
git remote set-url origin git@github.com:slunchfactory/veggieverse.git
```

## 5. 이미지 수정 후 업로드하는 방법

```bash
cd /Users/kimjihyeon/veggieverse

# 변경사항 확인
git status

# 변경된 파일 추가 (public 폴더의 이미지들)
git add public/

# 또는 특정 파일만 추가
git add public/main/products/your-image.jpg

# 커밋
git commit -m "이미지 업데이트"

# GitHub에 푸시
git push origin main
```

## 6. 주의사항

- `public/` 폴더의 이미지 파일들은 Git에 포함됩니다
- 큰 이미지 파일은 GitHub의 파일 크기 제한(100MB)을 확인하세요
- 한글 파일명이 있는 경우 Git에서 문제가 될 수 있으니, 영어 파일명 사용을 권장합니다

## 문제 해결

### Git이 작동하지 않는 경우
- Xcode Command Line Tools가 설치되었는지 확인: `xcode-select -p`
- 설치되지 않았다면: `xcode-select --install`

### 인증 오류가 발생하는 경우
- Personal Access Token을 사용하는 경우, 비밀번호 대신 토큰을 입력하세요
- SSH를 사용하는 경우, `ssh -T git@github.com`으로 연결을 테스트하세요

