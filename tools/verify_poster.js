const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const htmlPath = path.join(root, 'poster.html');
const cssPath = path.join(root, 'styles', 'poster.css');
const pngPath = path.join(root, 'poster_course_showcase.png');

function assert(condition, message) {
  if (!condition) {
    console.error(message);
    process.exit(1);
  }
}

function pngSize(filePath) {
  const buffer = fs.readFileSync(filePath);
  assert(buffer.slice(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])), 'poster is not a PNG file');
  return {
    width: buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20),
  };
}

assert(fs.existsSync(htmlPath), 'poster.html is missing');
assert(fs.existsSync(cssPath), 'styles/poster.css is missing');
assert(fs.existsSync(pngPath), 'poster_course_showcase.png is missing');

const html = fs.readFileSync(htmlPath, 'utf8');
const css = fs.readFileSync(cssPath, 'utf8');

[
  '纸上生花',
  '中国剪纸非遗多维信息可视化设计',
  '54 个剪纸类项目',
  '22 个省级地区',
  '40% 模块 A 权重',
  '模块 A',
  '模块 B',
  '模块 C',
  'module_a_data_analysis.png',
  'module_b_papercut_art_focus.png',
  'module_c_story_focus.png',
].forEach((text) => {
  assert(html.includes(text), `poster.html is missing required content: ${text}`);
});

assert(css.includes('1080px'), 'poster.css should define the 1080px poster width');
assert(css.includes('1920px'), 'poster.css should define the 1920px poster height');
assert(css.includes('#b21f2d'), 'poster.css should use the project cinnabar red');

const size = pngSize(pngPath);
assert(size.width === 1080 && size.height === 1920, `poster PNG should be 1080x1920, got ${size.width}x${size.height}`);

console.log('Poster passed validation.');
