import os
import re

directories = ["frontend/src/pages", "frontend/src/components"]

replacements = [
    # Card backgrounds
    (r'bg-gray-900/50 border-gray-800', r'glass-panel glow-border'),
    (r'bg-gray-[89]00/50', r'glass-panel glow-border'),
    
    # Inputs and Selects
    (r'bg-gray-800 border-gray-700 text-white flex-1', r'glass-input flex-1'),
    (r'bg-gray-800 border-gray-700 text-white w-([a-z0-9-]+)', r'glass-input w-\1'),
    (r'bg-gray-800 border-gray-700 text-white', r'glass-input'),
    (r'bg-gray-800 border-gray-700', r'glass-panel border-white/10 scale-in'),
    
    # Text
    (r'text-gray-200', r'glass-text'),
    (r'text-gray-300', r'glass-text opacity-90'),
    
    # Buttons
    (r'bg-gradient-to-r from-[a-z]+-\d+ to-[a-z]+-\d+ hover:from-[a-z]+-\d+ hover:to-[a-z]+-\d+ text-white (.*?) transition-all duration-300 transform hover:scale-\d+', r'premium-btn \1'),
    (r'className="border-gray-[0-9]+ text-gray-[0-9]+ hover:bg-gray-[0-9]+"', r'className="premium-btn opacity-80"'),
    
    # Layout Adjustments (mobile squeezed inner calculators)
    # Often contained in <div className="grid grid-cols-1 md:grid-cols-2...">, we want better spacing if any
]

for d in directories:
    if not os.path.exists(d):
        continue
    for filename in os.listdir(d):
        if filename.endswith(".jsx"):
            filepath = os.path.join(d, filename)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            original_content = content
            for pattern, repl in replacements:
                content = re.sub(pattern, repl, content)
            
            # Additional targeted specific replaces
            content = content.replace('bg-gray-800/30', 'bg-white/5')
            content = content.replace('border-gray-600/30', 'border-white/10')
            content = content.replace('bg-gray-700/30', 'bg-white/5')
            
            # Make sure we don't break App.jsx or main structural files with aggressive replaces
            if filename not in ["App.jsx", "Navbar.jsx", "Header.jsx"]:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(content)
                  
print("Glassmorphism migration completed.")
