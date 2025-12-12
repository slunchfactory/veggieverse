import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 폴더명 매핑
const folderMap = {
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

function renameFile(oldPath, newPath) {
  try {
    if (fs.existsSync(oldPath) && !fs.existsSync(newPath)) {
      fs.renameSync(oldPath, newPath);
      console.log(`✓ ${path.basename(oldPath)} -> ${path.basename(newPath)}`);
      return true;
    }
    return false;
  } catch (error) {
    console.error(`✗ ${oldPath}: ${error.message}`);
    return false;
  }
}

function renameFileName(fileName) {
  let newName = fileName;
  
  // 파일명 패턴 매칭 (정확한 순서로 처리)
  const replacements = [
    [/김치\)볶음김치캔(\d+)/g, 'kimchi-can-$1'],
    [/김치\)밀키트(\d+)/g, 'kimchi-mealkit-$1'],
    [/김치\)밀키트_(\d+)/g, 'kimchi-mealkit-$1'],
    [/김치\)볶음김치캔_(\d+)/g, 'kimchi-can-$1'],
    [/김치\)전_(\d+)/g, 'kimchi-jeon-$1'],
    [/시금치뇨끼(\d+)/g, 'spinach-gnocchi-$1'],
    [/블루베리타르트\)조각(\d+)/g, 'blueberry-tart-piece-$1'],
    [/블루베리타르트\)홀(\d+)/g, 'blueberry-tart-whole-$1'],
    [/자두타르트\)조각(\d+)/g, 'plum-tart-piece-$1'],
    [/자두타르트\)홀(\d+)/g, 'plum-tart-whole-$1'],
    [/복숭아타르트\)조각(\d+)/g, 'peach-tart-piece-$1'],
    [/복숭아타르트\)홀(\d+)/g, 'peach-tart-whole-$1'],
    [/타르트3종\)조각 공통썸네일(\d+)/g, 'tart-3-piece-common-$1'],
    [/타르트3종\)홀 공통썸네일(\d+)/g, 'tart-3-whole-common-$1'],
    [/잠봉뵈르(\d+)/g, 'jambon-beurre-$1'],
    [/피넛버터초코바(\d+)/g, 'peanut-butter-choco-bar-$1'],
  ];

  replacements.forEach(([pattern, replacement]) => {
    newName = newName.replace(pattern, replacement);
  });

  return newName;
}

function processDirectory(dirPath) {
  if (!fs.existsSync(dirPath)) {
    return;
  }

  // 먼저 폴더명 변경
  const items = fs.readdirSync(dirPath, { withFileTypes: true });
  
  items.forEach(item => {
    if (item.isDirectory()) {
      const oldFolderPath = path.join(dirPath, item.name);
      const newFolderName = folderMap[item.name];
      
      if (newFolderName) {
        const newFolderPath = path.join(dirPath, newFolderName);
        if (fs.existsSync(oldFolderPath) && !fs.existsSync(newFolderPath)) {
          renameFile(oldFolderPath, newFolderPath);
          processDirectory(newFolderPath);
        } else if (fs.existsSync(newFolderPath)) {
          processDirectory(newFolderPath);
        }
      } else {
        processDirectory(oldFolderPath);
      }
    }
  });

  // 파일명 변경
  if (fs.existsSync(dirPath)) {
    const files = fs.readdirSync(dirPath);
    files.forEach(fileName => {
      const filePath = path.join(dirPath, fileName);
      if (fs.statSync(filePath).isFile() && /\.(jpg|jpeg|png|webp)$/i.test(fileName)) {
        const newFileName = renameFileName(fileName);
        if (newFileName !== fileName) {
          const newFilePath = path.join(dirPath, newFileName);
          renameFile(filePath, newFilePath);
        }
      }
    });
  }
}

// 실행
console.log('=== 한글 파일명을 영문으로 변경 시작 ===\n');

console.log('1. Store thumbnails 폴더 처리...');
const storePath = path.join(__dirname, 'public', 'store', 'thumbnails');
processDirectory(storePath);

console.log('\n2. Main products 폴더 처리...');
const mainPath = path.join(__dirname, 'public', 'main', 'products');
processDirectory(mainPath);

console.log('\n=== 완료 ===');
