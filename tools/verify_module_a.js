const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const requiredFiles = [
  'index.html',
  'styles/main.css',
  'scripts/app.js',
  'data/papercutData.js',
  'libs/echarts.min.js'
];

let failed = false;
for (const rel of requiredFiles) {
  const file = path.join(root, rel);
  if (!fs.existsSync(file)) {
    console.error('missing file:', rel);
    failed = true;
  }
}

const indexPath = path.join(root, 'index.html');
if (fs.existsSync(indexPath)) {
  const html = fs.readFileSync(indexPath, 'utf8');
  for (const id of ['provinceChart', 'batchChart', 'regionChart']) {
    if (!html.includes(`id="${id}"`)) {
      console.error('missing chart container:', id);
      failed = true;
    }
  }
  if (!html.includes('模块A') || !html.includes('数据分析')) {
    console.error('index should describe Module A data analysis');
    failed = true;
  }
}

const appPath = path.join(root, 'scripts', 'app.js');
if (fs.existsSync(appPath)) {
  const app = fs.readFileSync(appPath, 'utf8');
  for (const marker of ['echarts.init', 'renderProvinceChart', 'renderBatchChart', 'renderRegionChart', 'renderInsights']) {
    if (!app.includes(marker)) {
      console.error('missing app marker:', marker);
      failed = true;
    }
  }
}

const dataPath = path.join(root, 'data', 'papercutData.js');
if (fs.existsSync(dataPath)) {
  const data = fs.readFileSync(dataPath, 'utf8');
  const rows = (data.match(/项目名称/g) || []).length;
  if (!data.includes('window.PAPERCUT_PROJECTS') || rows < 50) {
    console.error('papercutData.js should expose at least 50 rows');
    failed = true;
  }
}

if (failed) process.exit(1);
console.log('Module A structure passed validation.');
