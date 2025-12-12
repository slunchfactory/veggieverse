#!/bin/bash

# Store thumbnails 폴더명 및 파일명 변경
cd public/store/thumbnails

# 폴더명 변경
[ -d "볶음김치" ] && mv "볶음김치" "kimchi"
[ -d "김치볶음밥 밀키트" ] && mv "김치볶음밥 밀키트" "kimchi-fried-rice-mealkit"
[ -d "김치제품 썸네일" ] && mv "김치제품 썸네일" "kimchi-products-thumbnail"
[ -d "시금치뇨끼 밀키트" ] && mv "시금치뇨끼 밀키트" "spinach-gnocchi-mealkit"
[ -d "블루베리 타르트_조각" ] && mv "블루베리 타르트_조각" "blueberry-tart-piece"
[ -d "블루베리 타르트_홀" ] && mv "블루베리 타르트_홀" "blueberry-tart-whole"
[ -d "자두 타르트_조각" ] && mv "자두 타르트_조각" "plum-tart-piece"
[ -d "자두 타르트_홀" ] && mv "자두 타르트_홀" "plum-tart-whole"
[ -d "복숭아 타르트_조각" ] && mv "복숭아 타르트_조각" "peach-tart-piece"
[ -d "복숭아 타르트_홀" ] && mv "복숭아 타르트_홀" "peach-tart-whole"
[ -d "잠봉뵈르 밀키트" ] && mv "잠봉뵈르 밀키트" "jambon-beurre-mealkit"
[ -d "피넛버터초코바" ] && mv "피넛버터초코바" "peanut-butter-choco-bar"

# 파일명 변경 - 볶음김치
cd kimchi 2>/dev/null
for file in *.jpg *.png 2>/dev/null; do
  [ -f "$file" ] && {
    newname=$(echo "$file" | sed 's/김치)볶음김치캔/kimchi-can/')
    [ "$file" != "$newname" ] && mv "$file" "$newname" 2>/dev/null
  }
done
cd ..

# 파일명 변경 - 김치볶음밥 밀키트
cd kimchi-fried-rice-mealkit 2>/dev/null
for file in *.jpg *.png 2>/dev/null; do
  [ -f "$file" ] && {
    newname=$(echo "$file" | sed 's/김치)밀키트/kimchi-mealkit/')
    [ "$file" != "$newname" ] && mv "$file" "$newname" 2>/dev/null
  }
done
cd ..

# 파일명 변경 - 시금치뇨끼
cd spinach-gnocchi-mealkit 2>/dev/null
for file in *.jpg *.png 2>/dev/null; do
  [ -f "$file" ] && {
    newname=$(echo "$file" | sed 's/시금치뇨끼/spinach-gnocchi/')
    [ "$file" != "$newname" ] && mv "$file" "$newname" 2>/dev/null
  }
done
cd ..

# 파일명 변경 - 블루베리 타르트
cd blueberry-tart-piece 2>/dev/null
for file in *.jpg *.png 2>/dev/null; do
  [ -f "$file" ] && {
    newname=$(echo "$file" | sed -e 's/블루베리타르트)조각/blueberry-tart-piece/' -e 's/타르트3종)조각 공통썸네일/tart-3-piece-common/')
    [ "$file" != "$newname" ] && mv "$file" "$newname" 2>/dev/null
  }
done
cd ..

# 파일명 변경 - 자두 타르트
cd plum-tart-piece 2>/dev/null
for file in *.jpg *.png 2>/dev/null; do
  [ -f "$file" ] && {
    newname=$(echo "$file" | sed -e 's/자두타르트)조각/plum-tart-piece/' -e 's/타르트3종)조각 공통썸네일/tart-3-piece-common/')
    [ "$file" != "$newname" ] && mv "$file" "$newname" 2>/dev/null
  }
done
cd ..

# 파일명 변경 - 복숭아 타르트
cd peach-tart-piece 2>/dev/null
for file in *.jpg *.png 2>/dev/null; do
  [ -f "$file" ] && {
    newname=$(echo "$file" | sed -e 's/복숭아타르트)조각/peach-tart-piece/' -e 's/타르트3종)조각 공통썸네일/tart-3-piece-common/')
    [ "$file" != "$newname" ] && mv "$file" "$newname" 2>/dev/null
  }
done
cd ..

# 파일명 변경 - 잠봉뵈르
cd jambon-beurre-mealkit 2>/dev/null
for file in *.jpg *.png 2>/dev/null; do
  [ -f "$file" ] && {
    newname=$(echo "$file" | sed 's/잠봉뵈르/jambon-beurre/')
    [ "$file" != "$newname" ] && mv "$file" "$newname" 2>/dev/null
  }
done
cd ..

# 파일명 변경 - 피넛버터초코바
cd peanut-butter-choco-bar 2>/dev/null
for file in *.jpg *.png 2>/dev/null; do
  [ -f "$file" ] && {
    newname=$(echo "$file" | sed 's/피넛버터초코바/peanut-butter-choco-bar/')
    [ "$file" != "$newname" ] && mv "$file" "$newname" 2>/dev/null
  }
done
cd ..

# Main products 파일명 변경
cd ../../main/products
for file in *.jpg *.png 2>/dev/null; do
  [ -f "$file" ] && {
    newname=$(echo "$file" | sed -e 's/김치)볶음김치캔/kimchi-can/' -e 's/시금치뇨끼/spinach-gnocchi/' -e 's/자두타르트)홀/plum-tart-whole/' -e 's/피넛버터초코바/peanut-butter-choco-bar/')
    [ "$file" != "$newname" ] && mv "$file" "$newname" 2>/dev/null
  }
done

echo "파일명 변경 완료!"




