const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.join(__dirname, 'rented_cars_dump.html'), 'utf8');
const lines = html.split('\n');

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('dxgvDataRow')) {
    console.log(lines.slice(Math.max(0, i), Math.min(lines.length, i + 10)).join('\n'));
    break;
  }
}
