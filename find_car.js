const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.join(__dirname, 'cars_dump.html'), 'utf8');
const lines = html.split('\n');

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('35EP210')) {
    // Print 10 lines before and after
    console.log(lines.slice(Math.max(0, i - 15), Math.min(lines.length, i + 15)).join('\n'));
    break;
  }
}
