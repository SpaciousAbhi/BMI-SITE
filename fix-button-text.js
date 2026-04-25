const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, 'frontend', 'src', 'components');

const fixResponsiveButtonText = (filePath) => {
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // Replace text-xl with text-base sm:text-xl inside btn-category- classes
  // specifically targeting the button font size scaling
  const submitButtonRegex = /(className=\{`.*?btn-category-[^\s]+\s+.*?)text-xl(\s+font-black.*?`\})/g;
  if (submitButtonRegex.test(content)) {
    content = content.replace(submitButtonRegex, '$1text-base sm:text-lg md:text-xl$2');
    changed = true;
  }

  // Also replace text-lg for the Reset button
  const resetButtonRegex = /(className=".*?)\btext-lg\b(\s+uppercase.*?")/g;
  if (resetButtonRegex.test(content)) {
    content = content.replace(resetButtonRegex, '$1text-sm sm:text-base md:text-lg$2');
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated button text sizes in: ${path.basename(filePath)}`);
  }
};

fs.readdirSync(componentsDir).forEach(file => {
  if (file.endsWith('Calculator.jsx')) {
    fixResponsiveButtonText(path.join(componentsDir, file));
  }
});

console.log('Button text responsiveness update complete.');
