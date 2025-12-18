const fs = require('fs');
const path = require('path');

// 파일명 매핑 (한글 -> 영문)
const folderMapping = {
  '볶음김치': 'kimchi',
  '김치볶음밥 밀키트': 'kimchi-fried-rice-mealkit',
  '김치제품 썸네일': 'kimchi-products-thumbnail',
  '시금치뇨끼 밀키트': 'spinach-gnocchi-mealkit',
  '블루베리 타르트_조각': 'blueberry-tart-piece',
  '블루베리 타르트_홀': 'blueberry-tart-whole',
  '자두 타르트_조각': 'plum-tart-piece',
  '자두 타르트_홀': 'plum-tart-whole',
  '복숭아 타르트_조각': 'peach-tart-piece',
  '복숭아 타르트_홀': 'peach-tart-whole',
  '잠봉뵈르 밀키트': 'jambon-beurre-mealkit',
  '피넛버터초코바': 'peanut-butter-choco-bar',
};

const fileMapping = {
  '김치)볶음김치캔': 'kimchi-can',
  '김치)밀키트': 'kimchi-mealkit',
  '김치)볶음김치캔_': 'kimchi-can-',
  '김치)밀키트_': 'kimchi-mealkit-',
  '김치)전_': 'kimchi-jeon-',
  '시금치뇨끼': 'spinach-gnocchi',
  '블루베리타르트)조각': 'blueberry-tart-piece',
  '블루베리타르트)홀': 'blueberry-tart-whole',
  '자두타르트)조각': 'plum-tart-piece',
  '자두타르트)홀': 'plum-tart-whole',
  '복숭아타르트)조각': 'peach-tart-piece',
  '복숭아타르트)홀': 'peach-tart-whole',
  '타르트3종)조각 공통썸네일': 'tart-3-piece-common',
  '타르트3종)홀 공통썸네일': 'tart-3-whole-common',
  '잠봉뵈르': 'jambon-beurre',
  '피넛버터초코바': 'peanut-butter-choco-bar',
};

const mainProductsMapping = {
  '김치)볶음김치캔': 'kimchi-can',
  '시금치뇨끼': 'spinach-gnocchi',
  '자두타르트)홀': 'plum-tart-whole',
  '피넛버터초코바': 'peanut-butter-choco-bar',
};

function renameFilesInDirectory(dirPath, isMainProducts = false) {
  const items = fs.readdirSync(dirPath, { withFileTypes: true });
  
  items.forEach(item => {
    const fullPath = path.join(dirPath, item.name);
    
    if (item.isDirectory()) {
      // 폴더명 변경
      if (folderMapping[item.name]) {
        const newFolderName = folderMapping[item.name];
        const newFolderPath = path.join(dirPath, newFolderName);
        
        if (newFolderPath !== fullPath && !fs.existsSync(newFolderPath)) {
          fs.renameSync(fullPath, newFolderPath);
          console.log(`폴더명 변경: ${item.name} -> ${newFolderName}`);
          renameFilesInDirectory(newFolderPath);
        } else {
          renameFilesInDirectory(fullPath);
        }
      } else {
        renameFilesInDirectory(fullPath);
      }
    } else if (item.isFile() && /\.(jpg|jpeg|png|webp)$/i.test(item.name)) {
      // 파일명 변경
      let newFileName = item.name;
      
      if (isMainProducts) {
        // main/products 폴더
        Object.keys(mainProductsMapping).forEach(key => {
          if (newFileName.includes(key)) {
            newFileName = newFileName.replace(key, mainProductsMapping[key]);
          }
        });
      } else {
        // store/thumbnails 폴더
        Object.keys(fileMapping).forEach(key => {
          if (newFileName.includes(key)) {
            newFileName = newFileName.replace(key, fileMapping[key]);
          }
        });
      }
      
      // 숫자 유지하면서 정리
      newFileName = newFileName.replace(/(\d+)(\.(jpg|jpeg|png|webp))$/i, '-$1$2');
      
      if (newFileName !== item.name) {
        const newFilePath = path.join(dirPath, newFileName);
        if (!fs.existsSync(newFilePath)) {
          fs.renameSync(fullPath, newFilePath);
          console.log(`파일명 변경: ${item.name} -> ${newFileName}`);
        }
      }
    }
  });
}

// 실행
const storeThumbnailsPath = path.join(__dirname, 'public', 'store', 'thumbnails');
const mainProductsPath = path.join(__dirname, 'public', 'main', 'products');

console.log('=== Store thumbnails 파일명 변경 시작 ===');
if (fs.existsSync(storeThumbnailsPath)) {
  renameFilesInDirectory(storeThumbnailsPath);
}

console.log('\n=== Main products 파일명 변경 시작 ===');
if (fs.existsSync(mainProductsPath)) {
  renameFilesInDirectory(mainProductsPath, true);
}

console.log('\n=== 완료 ===');








