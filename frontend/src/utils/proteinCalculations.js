// Protein Intake Calculator
// Calculates optimal protein intake based on activity level, goals, and body composition

export const getActivityLevels = () => {
  return [
    {
      value: 'sedentary',
      label: 'Sedentary',
      description: 'Little to no exercise, desk job',
      multiplier: 0.8
    },
    {
      value: 'lightly_active',
      label: 'Lightly Active',
      description: 'Light exercise 1-3 days/week',
      multiplier: 1.0
    },
    {
      value: 'moderately_active',
      label: 'Moderately Active', 
      description: 'Moderate exercise 3-5 days/week',
      multiplier: 1.2
    },
    {
      value: 'very_active',
      label: 'Very Active',
      description: 'Hard exercise 6-7 days/week',
      multiplier: 1.4
    },
    {
      value: 'extremely_active',
      label: 'Extremely Active',
      description: 'Very hard exercise, training 2x/day',
      multiplier: 1.6
    }
  ];
};

export const getGoalTypes = () => {
  return [
    {
      value: 'maintenance',
      label: 'Maintenance',
      description: 'Maintain current weight and muscle',
      multiplier: 1.0
    },
    {
      value: 'fat_loss',
      label: 'Fat Loss',
      description: 'Lose fat while preserving muscle',
      multiplier: 1.2
    },
    {
      value: 'muscle_gain',
      label: 'Muscle Gain',
      description: 'Build muscle mass',
      multiplier: 1.3
    },
    {
      value: 'athletic_performance',
      label: 'Athletic Performance',
      description: 'Optimize for sports performance',
      multiplier: 1.4
    }
  ];
};

export const calculateProteinIntake = (weight, weightUnit, activityLevel, goal, age, gender) => {
  // Convert weight to kg if necessary
  let weightInKg = weight;
  if (weightUnit === 'lbs') {
    weightInKg = weight / 2.20462;
  }

  // Base protein requirement (g/kg)
  let baseProtein = 0.8; // RDA minimum

  // Get multipliers
  const activityMultiplier = getActivityLevels().find(level => level.value === activityLevel)?.multiplier || 1.0;
  const goalMultiplier = getGoalTypes().find(g => g.value === goal)?.multiplier || 1.0;

  // Age adjustment (older adults need more protein)
  let ageMultiplier = 1.0;
  if (age >= 65) {
    ageMultiplier = 1.2;
  } else if (age >= 50) {
    ageMultiplier = 1.1;
  }

  // Calculate protein per kg
  const proteinPerKg = baseProtein * activityMultiplier * goalMultiplier * ageMultiplier;

  // Total daily protein in grams
  const totalProteinGrams = weightInKg * proteinPerKg;

  // Convert back to lbs if needed for per-pound calculation
  const proteinPerPound = weightUnit === 'lbs' ? totalProteinGrams / weight : totalProteinGrams / (weightInKg * 2.20462);

  return {
    totalGrams: Math.round(totalProteinGrams),
    perKg: Math.round(proteinPerKg * 10) / 10,
    perPound: Math.round(proteinPerPound * 10) / 10,
    calories: Math.round(totalProteinGrams * 4), // 4 calories per gram
    percentOfCalories: 0, // Will be calculated if TDEE is provided
    meals: distributeMealsProtein(totalProteinGrams),
    sources: getProteinSources(totalProteinGrams),
    timing: getProteinTiming(totalProteinGrams, activityLevel, goal)
  };
};

const distributeMealsProtein = (totalProtein) => {
  // Distribute protein across meals for optimal synthesis
  const optimalPerMeal = 25; // grams for muscle protein synthesis
  const numMeals = Math.max(3, Math.ceil(totalProtein / optimalPerMeal));
  const proteinPerMeal = Math.round(totalProtein / numMeals);

  return {
    meals: numMeals,
    perMeal: proteinPerMeal,
    distribution: {
      breakfast: Math.round(proteinPerMeal * 0.9),
      lunch: proteinPerMeal,
      dinner: proteinPerMeal,
      snacks: totalProtein - (proteinPerMeal * 3)
    }
  };
};

const getProteinSources = (totalProtein) => {
  return [
    {
      category: 'Animal Proteins',
      sources: [
        { name: 'Chicken Breast', protein: 31, serving: '100g', calories: 165 },
        { name: 'Lean Beef', protein: 26, serving: '100g', calories: 250 },
        { name: 'Salmon', protein: 25, serving: '100g', calories: 208 },
        { name: 'Eggs', protein: 13, serving: '2 large', calories: 155 },
        { name: 'Greek Yogurt', protein: 20, serving: '1 cup', calories: 130 },
        { name: 'Cottage Cheese', protein: 28, serving: '1 cup', calories: 220 }
      ]
    },
    {
      category: 'Plant Proteins',
      sources: [
        { name: 'Lentils', protein: 18, serving: '1 cup cooked', calories: 230 },
        { name: 'Quinoa', protein: 8, serving: '1 cup cooked', calories: 222 },
        { name: 'Tofu', protein: 20, serving: '100g', calories: 144 },
        { name: 'Almonds', protein: 6, serving: '1 oz', calories: 164 },
        { name: 'Chickpeas', protein: 15, serving: '1 cup cooked', calories: 269 },
        { name: 'Hemp Seeds', protein: 10, serving: '3 tbsp', calories: 170 }
      ]
    },
    {
      category: 'Supplements',
      sources: [
        { name: 'Whey Protein', protein: 25, serving: '1 scoop', calories: 120 },
        { name: 'Casein Protein', protein: 24, serving: '1 scoop', calories: 110 },
        { name: 'Plant Protein Blend', protein: 22, serving: '1 scoop', calories: 130 },
        { name: 'Collagen Peptides', protein: 20, serving: '1 scoop', calories: 80 }
      ]
    }
  ];
};

const getProteinTiming = (totalProtein, activityLevel, goal) => {
  const isActive = ['very_active', 'extremely_active'].includes(activityLevel);
  const isMuscleBuilding = ['muscle_gain', 'athletic_performance'].includes(goal);

  return {
    preWorkout: isActive ? '10-15g (30-60 min before)' : 'Not critical',
    postWorkout: isActive ? '20-30g (within 2 hours)' : 'Standard meal timing',
    beforeBed: isMuscleBuilding ? '20-25g casein protein' : 'Optional',
    distribution: 'Spread evenly throughout the day',
    maxPerMeal: '25-35g for optimal synthesis',
    timing: 'Every 3-4 hours for consistent amino acid levels'
  };
};

export const getProteinRecommendations = (result, activityLevel, goal, age, gender) => {
  const recommendations = [];

  // Basic recommendations
  recommendations.push('Spread protein intake throughout the day for optimal muscle protein synthesis');
  recommendations.push('Include complete proteins (containing all essential amino acids) in most meals');

  // Activity-based recommendations
  if (['very_active', 'extremely_active'].includes(activityLevel)) {
    recommendations.push('Consume 20-30g protein within 2 hours post-workout for recovery');
    recommendations.push('Consider protein supplementation to meet high requirements conveniently');
  }

  // Goal-based recommendations
  if (goal === 'fat_loss') {
    recommendations.push('Higher protein helps preserve muscle during caloric deficit');
    recommendations.push('Protein increases satiety and thermic effect of food');
  } else if (goal === 'muscle_gain') {
    recommendations.push('Ensure adequate calories alongside protein for muscle building');
    recommendations.push('Consider casein protein before bed for overnight muscle protein synthesis');
  }

  // Age-based recommendations
  if (age >= 65) {
    recommendations.push('Older adults need more protein to combat age-related muscle loss (sarcopenia)');
    recommendations.push('Focus on high-quality, easily digestible protein sources');
  }

  // Hydration
  recommendations.push('Increase water intake when consuming high protein diets');

  return recommendations;
};

export const getProteinHealthBenefits = () => {
  return [
    {
      title: 'Muscle Building & Maintenance',
      description: 'Provides essential amino acids for muscle protein synthesis and prevents age-related muscle loss',
      icon: '💪'
    },
    {
      title: 'Weight Management',
      description: 'Increases satiety, boosts metabolism through thermic effect, and helps preserve muscle during weight loss',
      icon: '⚖️'
    },
    {
      title: 'Recovery & Repair',
      description: 'Essential for tissue repair, wound healing, and recovery from exercise and injury',
      icon: '🔄'
    },
    {
      title: 'Immune Function',
      description: 'Supports antibody production and immune system function',
      icon: '🛡️'
    },
    {
      title: 'Hormone Production',
      description: 'Required for synthesis of enzymes, hormones, and neurotransmitters',
      icon: '🧬'
    },
    {
      title: 'Bone Health',
      description: 'Works with calcium and other nutrients to maintain bone density and strength',
      icon: '🦴'
    }
  ];
};