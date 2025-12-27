// Скрипт для копирования .nojekyll в out/ после сборки
const fs = require('fs');
const path = require('path');

const source = path.join(__dirname, '../public/.nojekyll');
const dest = path.join(__dirname, '../out/.nojekyll');
const outDir = path.join(__dirname, '../out');

try {
  // Проверяем, что папка out/ существует
  if (!fs.existsSync(outDir)) {
    console.log('⚠ out/ directory does not exist, skipping .nojekyll copy');
    process.exit(0);
  }

  // Создаем директорию, если её нет (на всякий случай)
  const destDir = path.dirname(dest);
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  if (fs.existsSync(source)) {
    fs.copyFileSync(source, dest);
    console.log('✓ .nojekyll copied to out/');
  } else {
    // Создаем пустой файл .nojekyll
    fs.writeFileSync(dest, '');
    console.log('✓ .nojekyll created in out/');
  }
} catch (error) {
  console.error('Error copying .nojekyll:', error);
  // Не падаем с ошибкой, просто логируем
  console.log('⚠ Continuing build despite .nojekyll copy error');
  process.exit(0);
}

