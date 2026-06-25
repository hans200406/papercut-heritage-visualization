const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const css = fs.readFileSync(path.join(root, 'styles', 'main.css'), 'utf8');
let failed = false;
for (const marker of ['site-nav', 'href="#module-a"', 'href="#module-b"', 'href="#story"', '叙事逻辑', '数字技术让剪纸被看见']) {
  if (!html.includes(marker)) {
    console.error('missing module C html marker:', marker);
    failed = true;
  }
}
for (const marker of ['.site-nav', '.story-bridge', '.closing-section', '.scroll-cue']) {
  if (!css.includes(marker)) {
    console.error('missing module C css marker:', marker);
    failed = true;
  }
}
if (failed) process.exit(1);
console.log('Module C structure passed validation.');
