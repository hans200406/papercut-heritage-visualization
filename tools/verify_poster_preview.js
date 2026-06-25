const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const htmlPath = path.join(root, 'poster.html');
const cssPath = path.join(root, 'styles', 'poster.css');

function assert(condition, message) {
  if (!condition) {
    console.error(message);
    process.exit(1);
  }
}

const html = fs.readFileSync(htmlPath, 'utf8');
const css = fs.readFileSync(cssPath, 'utf8');

assert(html.includes('class="poster-preview"'), 'poster.html should wrap the poster in a preview viewport');
assert(html.includes('<main class="poster"'), 'poster.html should keep the poster element as the export canvas');
assert(!html.includes('content="width=1080'), 'poster.html should use a normal responsive viewport for preview');

assert(css.includes('.poster-preview'), 'poster.css should style the preview viewport');
assert(css.includes('transform: scale(var(--poster-scale))'), 'poster.css should scale the 1080x1920 poster for browser preview');
assert(css.includes('--poster-scale: 1'), 'poster.css should provide a safe default scale');
assert(html.includes('function fitPosterPreview()'), 'poster.html should compute the preview scale in browser JavaScript');
assert(html.includes('resize'), 'poster.html should update the preview scale when the window changes');
assert(css.includes('width: 1080px;'), 'poster.css should preserve the poster width');
assert(css.includes('height: 1920px;'), 'poster.css should preserve the poster height');
assert(!/html,\s*body\s*{[^}]*width:\s*1080px/s.test(css), 'html/body should not force the browser viewport to poster width');

console.log('Poster preview scaling passed validation.');
