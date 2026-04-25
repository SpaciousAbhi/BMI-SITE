const fs = require('fs');
const path = require('path');
const acorn = require('acorn');
const jsx = require('acorn-jsx');

const parser = acorn.Parser.extend(jsx());

function walk(dir) {
  let results = [];
  try {
    const list = fs.readdirSync(dir);
    list.forEach(file => {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      if (stat && stat.isDirectory()) {
        results = results.concat(walk(fullPath));
      } else if (file.endsWith('.jsx')) {
        results.push(fullPath);
      }
    });
  } catch (e) {}
  return results;
}

const files = walk('./src');
let output = [];
output.push(`Validating ${files.length} JSX files...`);

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  try {
    parser.parse(content, { sourceType: 'module', ecmaVersion: 2020 });
  } catch (err) {
    output.push(`SYNTAX ERROR in ${f}:`);
    output.push(`${err.message} at line ${err.loc?.line}, column ${err.loc?.column}`);
  }
});
fs.writeFileSync('syntax_results.txt', output.join('\n'));
console.log('Done reporting to syntax_results.txt');
