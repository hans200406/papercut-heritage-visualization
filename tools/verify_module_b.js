const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
const files = ['libs/p5.min.js', 'scripts/papercut-art.js', 'index.html', 'DESIGN.md'];
let failed = false;
for (const rel of files) {
  if (!fs.existsSync(path.join(root, rel))) {
    console.error('missing file:', rel);
    failed = true;
  }
}
const htmlPath = path.join(root, 'index.html');
if (fs.existsSync(htmlPath)) {
  const html = fs.readFileSync(htmlPath, 'utf8');
  for (const marker of ['模块B', 'artCanvas', 'motifButtons', 'complexitySlider', 'scripts/papercut-art.js']) {
    if (!html.includes(marker)) {
      console.error('missing html marker:', marker);
      failed = true;
    }
  }
}
const artPath = path.join(root, 'scripts', 'papercut-art.js');
if (fs.existsSync(artPath)) {
  const art = fs.readFileSync(artPath, 'utf8');
  for (const marker of ['function setup', 'function drawMotif', 'radialSymmetry', 'drawPetalMotif', 'drawBirdMotif', 'drawAuspiciousMotif']) {
    if (!art.includes(marker)) {
      console.error('missing art marker:', marker);
      failed = true;
    }
  }
}
if (failed) process.exit(1);
console.log('Module B structure passed validation.');
