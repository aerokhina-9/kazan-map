// Скрипт для копирования .nojekyll в out/ после сборки
const fs = require('fs');
const path = require('path');

const source = path.join(__dirname, '../public/.nojekyll');
const dest = path.join(__dirname, '../out/.nojekyll');

try {
  if (fs.existsSync(source)) {
    fs.copyFileSync(source, dest);
    console.log('✓ .nojekyll copied to out/');
  } else {
    console.log('⚠ .nojekyll not found in public/, creating empty file');
    fs.writeFileSync(dest, '');
  }
} catch (error) {
  console.error('Error copying .nojekyll:', error);
  process.exit(1);
}

