const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.resolve(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.jsx')) {
      results.push(file);
    }
  });
  return results;
}

const files = walk('./src');
files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const open = (content.match(/<motion\.div/g) || []).length;
  const close = (content.match(/<\/motion\.div>/g) || []).length;
  if (open !== close) {
    console.log(`${path.basename(f)}: Open=${open}, Close=${close}`);
  }
});
