#!/bin/bash

# Update responsive classes for all calculator components
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
    echo "Updating $calc..."
    
    # Update main container padding
    sed -i 's/className="w-full max-w-4xl mx-auto p-6"/className="w-full max-w-4xl mx-auto p-4 sm:p-6"/g' "$file"
    
    # Update main grid layout
    sed -i 's/grid grid-cols-1 md:grid-cols-2 gap-6/grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6/g' "$file"
    
    # Update select trigger widths
    sed -i 's/bg-gray-800\/50 border-gray-700 text-white w-20/bg-gray-800\/50 border-gray-700 text-white w-16 sm:w-20/g' "$file"
    
    # Update results grid layout
    sed -i 's/grid grid-cols-1 md:grid-cols-2 gap-6 mb-6/grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6/g' "$file"
    
    # Update special case for body type calculator (3 columns)
    sed -i 's/grid grid-cols-1 md:grid-cols-3 gap-6 mb-6/grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6/g' "$file"
    
    echo "Updated $calc successfully"
  else
    echo "File $file not found"
  fi
done

echo "All calculator components updated for better responsive design!"