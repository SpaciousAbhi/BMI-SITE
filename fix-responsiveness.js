const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, 'frontend/src/components');
const files = fs.readdirSync(componentsDir).filter(f => f.endsWith('.jsx'));

// It's much safer to replace very specific boundaries of classes.
const replaceMap = [
  // Huge Typography
  { regex: /(?<!\w)text-\[12rem\](?![\w-])/g, replacement: "text-7xl sm:text-9xl md:text-[10rem] lg:text-[12rem]" },
  { regex: /(?<!\w)text-\[10rem\](?![\w-])/g, replacement: "text-6xl sm:text-8xl md:text-9xl lg:text-[10rem]" },
  { regex: /(?<!\w)text-\[8rem\](?![\w-])/g, replacement: "text-5xl sm:text-7xl lg:text-[8rem]" },
  { regex: /(?<!\w)text-\[6rem\](?![\w-])/g, replacement: "text-5xl md:text-[6rem]" },
  { regex: /(?<!\w)text-7xl(?![\w-])/g, replacement: "text-5xl sm:text-6xl lg:text-7xl" },
  { regex: /(?<!\w)text-8xl(?![\w-])/g, replacement: "text-5xl sm:text-7xl lg:text-8xl" },
  { regex: /(?<!\w)text-9xl(?![\w-])/g, replacement: "text-6xl sm:text-8xl lg:text-9xl" },
  { regex: /(?<!\w)text-6xl(?![\w-])/g, replacement: "text-4xl sm:text-5xl lg:text-6xl" },
  { regex: /(?<!\w)text-5xl(?![\w-])/g, replacement: "text-3xl sm:text-4xl md:text-5xl" }, // Less aggressive on 5xl to ensure no squashing.

  // Premium Result Card internal massive paddings
  // This matches EXACTLY the premium-result-card padding to ensure we don't break smaller components
  { regex: /(?<!\w)p-12 sm:p-20(?![\w-])/g, replacement: "p-6 sm:p-12 md:p-16 lg:p-20" },
  { regex: /(?<!\w)p-8 sm:p-12(?![\w-])/g, replacement: "p-6 sm:p-10 lg:p-12" },

  // General massive paddings
  // Make sure we only touch standalone paddings to avoid destroying nested or specific paddings
  // p-12 -> p-6 sm:p-8 md:p-12
  { regex: /(?<!(?:sm|md|lg|xl|2xl):)p-12(?![\w-])/g, replacement: "p-6 sm:p-8 md:p-12" },
  { regex: /(?<!(?:sm|md|lg|xl|2xl):)p-14(?![\w-])/g, replacement: "p-6 sm:p-10 md:p-14" },
  { regex: /(?<!(?:sm|md|lg|xl|2xl):)p-16(?![\w-])/g, replacement: "p-8 sm:p-12 md:p-16" },
  { regex: /(?<!(?:sm|md|lg|xl|2xl):)p-10(?![\w-])/g, replacement: "p-6 sm:p-8 lg:p-10" },
  { regex: /(?<!(?:sm|md|lg|xl|2xl):)p-8(?![\w-])/g, replacement: "p-5 sm:p-6 lg:p-8" },

  // Border Radius Downscaling (Very large border radius on mobile looks bad)
  { regex: /(?<!(?:sm|md|lg|xl|2xl):)rounded-\[5rem\](?![\w-])/g, replacement: "rounded-3xl sm:rounded-[4rem] lg:rounded-[5rem]" },
  { regex: /(?<!(?:sm|md|lg|xl|2xl):)rounded-\[4rem\](?![\w-])/g, replacement: "rounded-3xl sm:rounded-[3rem] lg:rounded-[4rem]" },
  { regex: /(?<!(?:sm|md|lg|xl|2xl):)rounded-\[3rem\](?![\w-])/g, replacement: "rounded-2xl sm:rounded-3xl lg:rounded-[3rem]" },

  // Button massive paddings
  { regex: /(?<!\w)px-12 py-8(?![\w-])/g, replacement: "px-6 py-4 md:px-10 md:py-6 lg:px-12 lg:py-8" },
  { regex: /(?<!\w)px-16 py-5(?![\w-])/g, replacement: "px-6 py-3 sm:px-10 sm:py-4 md:px-16 md:py-5" }, // specific lock badge
  
  // Grid tweaks (prevent gap blows on mobile)
  { regex: /(?<!(?:sm|md|lg|xl|2xl):)gap-10(?![\w-])/g, replacement: "gap-6 sm:gap-8 lg:gap-10" },
];

let modifiedCount = 0;

files.forEach(file => {
  const filePath = path.join(componentsDir, file);
  let originalContent = fs.readFileSync(filePath, 'utf8');
  let content = originalContent;

  replaceMap.forEach(rule => {
    // Only execute replacement if there's a match to avoid redundant parsing issues
    if (content.match(rule.regex)) {
        content = content.replace(rule.regex, rule.replacement);
    }
  });

  // Specifically for inputs/Select triggers that were text-xl py-7
  // On mobile py-7 makes the input 56px+ which is okay, but generally maybe too tall
  // Actually py-7 is fine, but text-xl input on mobile zooms in iOS, but it's okay (16px+ is needed).
  content = content.replace(/py-7/g, "py-5 sm:py-7");
  content = content.replace(/py-8/g, "py-5 sm:py-8"); 

  if (originalContent !== content) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated $\\{file}`);
    modifiedCount++;
  }
});

console.log(`Fixes applied. Total files modified: $\\{modifiedCount}`);
