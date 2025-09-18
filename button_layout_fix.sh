#!/bin/bash

# Fix button layout for all calculator components to prevent reset button overflow
calculators=(
  "ArmyBodyFatCalculator.jsx"
  "BodySurfaceAreaCalculator.jsx"  
  "BodyTypeCalculator.jsx"
  "HealthyWeightCalculator.jsx"
  "IdealWeightCalculator.jsx"
  "LeanBodyMassCalculator.jsx"
)

for calc in "${calculators[@]}"; do
  file="/app/frontend/src/components/$calc"
  if [ -f "$file" ]; then
    echo "Updating button layout in $calc..."
    
    # Fix button container - make it stack on mobile and row on desktop
    sed -i 's/className="flex gap-4 pt-6"/className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-6"/g' "$file"
    
    # Fix calculate button padding to be responsive
    sed -i 's/py-3 px-6 rounded-lg/py-3 px-4 sm:px-6 rounded-lg/g' "$file"
    
    # Fix reset button padding and add responsive class
    sed -i 's/px-6"/px-4 sm:px-6 sm:flex-none"/g' "$file"
    
    echo "Updated button layout in $calc successfully"
  else
    echo "File $file not found"
  fi
done

echo "All calculator button layouts updated for mobile responsiveness!"