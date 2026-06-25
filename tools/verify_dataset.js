const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const csvPath = path.join(root, 'data', 'heritage_papercut_projects.csv');

if (!fs.existsSync(csvPath)) {
  console.error('missing CSV:', csvPath);
  process.exit(1);
}

const text = fs.readFileSync(csvPath, 'utf8').trim();
const lines = text.split(/\r?\n/);
const header = lines[0].split(',');
const required = ['项目名称','省级地区','地级/县级地区','批次','类别','经度','纬度','视觉关键词'];
for (const col of required) {
  if (!header.includes(col)) {
    console.error('missing column:', col);
    process.exit(1);
  }
}
if (lines.length - 1 < 50) {
  console.error('expected at least 50 project rows, got', lines.length - 1);
  process.exit(1);
}
const body = lines.slice(1).join('\n');
for (const key of ['蔚县剪纸','安塞剪纸','傣族剪纸','苗族剪纸','回族剪纸','太原剪纸']) {
  if (!body.includes(key)) {
    console.error('missing representative item:', key);
    process.exit(1);
  }
}
console.log('paper-cut dataset passed validation:', lines.length - 1, 'rows');
