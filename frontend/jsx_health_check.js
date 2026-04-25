
const fs = require('fs');
const path = require('path');

const directoryPath = 'd:/antigtavityyy/BMI-SITE/frontend/src/components';

function checkTags(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const tagsToCheck = ['Card', 'CardHeader', 'CardTitle', 'CardContent', 'Alert', 'AlertTitle', 'AlertDescription', 'AnimatePresence', 'motion.div'];
    
    const issues = [];
    
    tagsToCheck.forEach(tag => {
        const openingTagRegex = new RegExp(`<${tag}(\\s|>)`, 'g');
        const closingTagRegex = new RegExp(`</${tag}>`, 'g');
        
        const openingMatches = [...content.matchAll(openingTagRegex)].length;
        const closingMatches = [...content.matchAll(closingTagRegex)].length;
        
        if (openingMatches !== closingMatches) {
            issues.push(`${tag}: ${openingMatches} opened, ${closingMatches} closed`);
        }
    });

    // Check for specific Alert component usage without import
    if (content.includes('<Alert') && !content.includes('import { Alert')) {
        issues.push('Alert component used but not imported');
    }

    return issues;
}

const files = fs.readdirSync(directoryPath).filter(file => file.endsWith('.jsx'));

files.forEach(file => {
    const filePath = path.join(directoryPath, file);
    const issues = checkTags(filePath);
    if (issues.length > 0) {
        console.log(`Issues in ${file}:`);
        issues.forEach(issue => console.log(`  - ${issue}`));
    }
});
