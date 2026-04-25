const fs = require('fs');
const path = require('path');

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
console.log(`Checking ${files.length} files...`);

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  
  // Tag Balance Check
  const openCount = (content.match(/<motion\.div/g) || []).length;
  const closeCount = (content.match(/<\/motion\.div>/g) || []).length;
  const selfCloseCount = (content.match(/<motion\.div[^>]*\/>/g) || []).length;
  
  const diff = openCount - (closeCount + selfCloseCount);
  if (diff !== 0) {
    console.log(`MISMATCH: ${f} | Open=${openCount}, Close=${closeCount}, SelfClose=${selfCloseCount}, Diff=${diff}`);
  }

  // Common Import Issues in Vite
  const imports = content.match(/import .* from ["'](.*)["']/g) || [];
  imports.forEach(imp => {
      const match = imp.match(/from ["'](.*)["']/);
      if (match) {
          const target = match[1];
          // Check for relative imports
          if (target.startsWith('.')) {
              const targetPath = path.resolve(path.dirname(f), target);
              // Basic check (Vite expects .jsx or specific resolution)
              if (!fs.existsSync(targetPath) && 
                  !fs.existsSync(targetPath + '.jsx') && 
                  !fs.existsSync(targetPath + '.js') && 
                  !fs.existsSync(path.join(targetPath, 'index.jsx')) &&
                  !fs.existsSync(path.join(targetPath, 'index.js'))) {
                  console.log(`MISSING IMPORT: ${f} -> ${target}`);
              }
          }
      }
  });
});
