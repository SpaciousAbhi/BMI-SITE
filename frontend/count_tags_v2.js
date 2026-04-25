const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  try {
    const list = fs.readdirSync(dir);
    list.forEach(file => {
      file = path.join(dir, file);
      const stat = fs.statSync(file);
      if (stat && stat.isDirectory()) {
        results = results.concat(walk(file));
      } else if (file.endsWith('.jsx')) {
        results.push(file);
      }
    });
  } catch (e) {}
  return results;
}

const files = walk('./src');
files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const lines = content.split('\n');
  let stack = [];
  
  // Very crude JSX/HTML parser for motion.div
  const tokens = content.match(/<motion\.div|<\/motion\.div>|\/>/g) || [];
  
  let balance = 0;
  tokens.forEach(token => {
    if (token === '<motion.div') balance++;
    else if (token === '</motion.div>') balance--;
    else if (token === '/>') {
        // This is tricky because /> can close any tag.
        // We only care if the LAST opened tag was <motion.div.
        // But in reality, we can just look for the error message's specific mismatch.
    }
  });

  // Let's use a better approach: search for the string "Expected </motion.div>" 
  // Oh wait, I can just use the build output if I can get it.
});

// Let's do a simple manual check of the files I edited recently.
console.log("Checking recently edited files...");
const targetFiles = [
    'src/components/PaceCalculator.jsx',
    'src/components/TargetHeartRateCalculator.jsx',
    'src/components/OneRepMaxCalculator.jsx',
    'src/components/CaloriesBurnedCalculator.jsx',
    'src/pages/Home.jsx'
];

targetFiles.forEach(f => {
    const p = path.resolve(f);
    if (!fs.existsSync(p)) return;
    const content = fs.readFileSync(p, 'utf8');
    const openCount = (content.match(/<motion\.div/g) || []).length;
    const closeCount = (content.match(/<\/motion\.div>/g) || []).length;
    const selfCloseCount = (content.match(/<motion\.div[^>]*\/>/g) || []).length;
    
    const diff = openCount - (closeCount + selfCloseCount);
    if (diff !== 0) {
        console.log(`${f}: Open=${openCount}, Close=${closeCount}, SelfClose=${selfCloseCount}, Diff=${diff}`);
    } else {
        console.log(`${f}: Balanced`);
    }
});
