#!/bin/bash

# Git 환경 설정 스크립트
# 사용법: bash setup-git.sh

echo "=== Veggieverse Git 환경 설정 ==="
echo ""

# Xcode Command Line Tools 확인
if ! xcode-select -p &>/dev/null; then
    echo "❌ Xcode Command Line Tools가 설치되어 있지 않습니다."
    echo "다음 명령어를 실행하세요: xcode-select --install"
    exit 1
fi

echo "✅ Xcode Command Line Tools 확인 완료"
echo ""

# Git 사용자 정보 확인
if [ -z "$(git config --global user.name)" ]; then
    echo "Git 사용자 이름을 입력하세요:"
    read -r git_name
    git config --global user.name "$git_name"
fi

if [ -z "$(git config --global user.email)" ]; then
    echo "Git 이메일을 입력하세요:"
    read -r git_email
    git config --global user.email "$git_email"
fi

echo "✅ Git 사용자 정보:"
echo "   이름: $(git config --global user.name)"
echo "   이메일: $(git config --global user.email)"
echo ""

# 현재 디렉터리 확인
if [ ! -f "package.json" ]; then
    echo "❌ veggieverse 프로젝트 디렉터리가 아닙니다."
    exit 1
fi

# Git 저장소 초기화
if [ ! -d ".git" ]; then
    echo "Git 저장소 초기화 중..."
    git init
    echo "✅ Git 저장소 초기화 완료"
else
    echo "✅ Git 저장소 이미 존재합니다"
fi

# 원격 저장소 확인 및 추가
if ! git remote | grep -q "origin"; then
    echo "원격 저장소 연결 중..."
    git remote add origin https://github.com/slunchfactory/veggieverse.git
    echo "✅ 원격 저장소 연결 완료"
else
    echo "✅ 원격 저장소 이미 연결되어 있습니다"
    git remote -v
fi

# 브랜치 설정
git branch -M main 2>/dev/null || true

echo ""
echo "=== 설정 완료 ==="
echo ""
echo "다음 단계:"
echo "1. 이미지를 public/ 폴더에 추가/수정"
echo "2. git add public/"
echo "3. git commit -m '이미지 업데이트'"
echo "4. git push origin main"
echo ""
echo "⚠️  GitHub에 푸시하려면 Personal Access Token이 필요합니다."
echo "   GitHub → Settings → Developer settings → Personal access tokens"
echo "   에서 토큰을 생성하고, 푸시 시 비밀번호 대신 토큰을 사용하세요."

