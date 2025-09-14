// Macronutrient Calculator
// Calculates protein, carbohydrate, and fat breakdown based on goals and diet types

export const getDietTypes = () => {
  return [
    {
      type: 'balanced',
      title: 'Balanced',
      description: 'Well-rounded macronutrient distribution',
      protein: 25, // percentage
      carbs: 45,
      fat: 30,
      emoji: '⚖️'
    },
    {
      type: 'high_protein',
      title: 'High Protein',
      description: 'Higher protein for muscle building/maintenance',
      protein: 35,
      carbs: 35,
      fat: 30,
      emoji: '💪'
    },
    {
      type: 'low_carb',
      title: 'Low Carb',
      description: 'Reduced carbohydrates for fat loss',
      protein: 30,
      carbs: 25,
      fat: 45,
      emoji: '🥑'
    },
    {
      type: 'keto',
      title: 'Ketogenic',
      description: 'Very low carb, high fat for ketosis',
      protein: 20,
      carbs: 5,
      fat: 75,
      emoji: '🧈'
    },
    {
      type: 'moderate_carb',
      title: 'Moderate Carb',
      description: 'Moderate carbs for active individuals',
      protein: 25,
      carbs: 40,
      fat: 35,
      emoji: '🍠'
    },
    {
      type: 'endurance',
      title: 'Endurance Athlete',
      description: 'Higher carbs for endurance performance',
      protein: 20,
      carbs: 55,
      fat: 25,
      emoji: '🏃'
    },
    {
      type: 'cutting',
      title: 'Cutting/Fat Loss',
      description: 'Optimized for fat loss while preserving muscle',
      protein: 40,
      carbs: 30,
      fat: 30,
      emoji: '🔥'
    },
    {
      type: 'bulking',
      title: 'Bulking/Muscle Gain',
      description: 'Optimized for muscle growth',
      protein: 25,
      carbs: 50,
      fat: 25,
      emoji: '🏋️'
    }
  ];
};

export const calculateMacros = (totalCalories, dietType, weight = null, units = 'metric') => {
  const diets = getDietTypes();
  const diet = diets.find(d => d.type === dietType);
  
  if (!diet) {
    throw new Error('Invalid diet type');
  }
  
  // Calculate calories from each macro
  const proteinCalories = Math.round(totalCalories * (diet.protein / 100));
  const carbCalories = Math.round(totalCalories * (diet.carbs / 100));
  const fatCalories = Math.round(totalCalories * (diet.fat / 100));
  
  // Convert calories to grams (protein: 4 cal/g, carbs: 4 cal/g, fat: 9 cal/g)
  const proteinGrams = Math.round(proteinCalories / 4);
  const carbGrams = Math.round(carbCalories / 4);
  const fatGrams = Math.round(fatCalories / 9);
  
  // Calculate per body weight ratios if weight is provided
  let proteinPerKg = null;
  let proteinPerLb = null;
  
  if (weight) {
    const weightKg = units === 'imperial' ? weight * 0.453592 : weight;
    const weightLb = units === 'metric' ? weight * 2.20462 : weight;
    
    proteinPerKg = Math.round((proteinGrams / weightKg) * 10) / 10;
    proteinPerLb = Math.round((proteinGrams / weightLb) * 10) / 10;
  }
  
  return {
    totalCalories,
    dietType: diet,
    macros: {
      protein: {
        grams: proteinGrams,
        calories: proteinCalories,
        percentage: diet.protein,
        perKg: proteinPerKg,
        perLb: proteinPerLb
      },
      carbs: {
        grams: carbGrams,
        calories: carbCalories,
        percentage: diet.carbs
      },
      fat: {
        grams: fatGrams,
        calories: fatCalories,
        percentage: diet.fat
      }
    }
  };
};

export const getMacroRecommendations = (macroData, goal, activityLevel, age, gender) => {
  const recommendations = [];
  const { dietType, macros } = macroData;
  
  // Diet-specific recommendations
  if (dietType.type === 'keto') {
    recommendations.push({
      type: 'nutrition',
      title: 'Achieve Ketosis',
      description: 'Keep carbs under 20-25g daily and increase healthy fats like avocados, nuts, and olive oil.',
      priority: 'high'
    });
    recommendations.push({
      type: 'lifestyle',
      title: 'Monitor Ketones',
      description: 'Use ketone strips or a blood meter to confirm you\'re in ketosis.',
      priority: 'medium'
    });
  } else if (dietType.type === 'high_protein') {
    recommendations.push({
      type: 'nutrition',
      title: 'Distribute Protein',
      description: 'Spread protein intake across 4-6 meals for optimal muscle protein synthesis.',
      priority: 'high'
    });
    recommendations.push({
      type: 'hydration',
      title: 'Increase Water Intake',
      description: 'Higher protein intake requires more water for proper kidney function.',
      priority: 'medium'
    });
  } else if (dietType.type === 'endurance') {
    recommendations.push({
      type: 'timing',
      title: 'Time Carbohydrates',
      description: 'Consume most carbs around workout times for optimal performance and recovery.',
      priority: 'high'
    });
  }
  
  // Protein recommendations based on goals
  if (goal && goal.includes('gain')) {
    recommendations.push({
      type: 'nutrition',
      title: 'Prioritize Complete Proteins',
      description: 'Focus on complete protein sources like eggs, meat, fish, and dairy for muscle building.',
      priority: 'high'
    });
  }
  
  // Activity-based recommendations
  if (activityLevel === 'very_active' || activityLevel === 'super_active') {
    recommendations.push({
      type: 'timing',
      title: 'Post-Workout Nutrition',
      description: 'Consume protein and carbs within 30-60 minutes after training.',
      priority: 'high'
    });
  }
  
  // Age-specific recommendations
  if (age > 40) {
    recommendations.push({
      type: 'nutrition',
      title: 'Consider Higher Protein',
      description: 'Adults over 40 may benefit from higher protein intake to prevent muscle loss.',
      priority: 'medium'
    });
  }
  
  // General recommendations
  recommendations.push({
    type: 'nutrition',
    title: 'Choose Quality Sources',
    description: 'Focus on whole, minimally processed foods for each macronutrient.',
    priority: 'medium'
  });
  
  recommendations.push({
    type: 'tracking',
    title: 'Track Your Intake',
    description: 'Use a food diary or app to monitor your macro intake for the first few weeks.',
    priority: 'low'
  });
  
  return recommendations;
};

export const getFoodSuggestions = (macroType) => {
  const suggestions = {
    protein: [
      'Chicken breast (lean)',
      'Fish (salmon, cod, tuna)',
      'Eggs and egg whites',
      'Greek yogurt',
      'Lean beef',
      'Protein powder',
      'Tofu and tempeh',
      'Legumes and beans'
    ],
    carbs: [
      'Oats and quinoa',
      'Brown rice',
      'Sweet potatoes',
      'Fruits (bananas, berries)',
      'Vegetables',
      'Whole grain bread',
      'Pasta (whole wheat)',
      'Legumes'
    ],
    fat: [
      'Avocados',
      'Nuts and seeds',
      'Olive oil',
      'Fatty fish (salmon)',
      'Coconut oil',
      'Nut butters',
      'Dark chocolate',
      'Egg yolks'
    ]
  };
  
  return suggestions[macroType] || [];
};

export const calculateMealPlan = (macroData, meals = 3) => {
  const { macros } = macroData;
  
  const proteinPerMeal = Math.round(macros.protein.grams / meals);
  const carbsPerMeal = Math.round(macros.carbs.grams / meals);
  const fatPerMeal = Math.round(macros.fat.grams / meals);
  const caloriesPerMeal = Math.round(macroData.totalCalories / meals);
  
  return {
    mealsPerDay: meals,
    perMeal: {
      calories: caloriesPerMeal,
      protein: proteinPerMeal,
      carbs: carbsPerMeal,
      fat: fatPerMeal
    }
  };
};

export const validateMacroInputs = (calories, weight, dietType) => {
  const errors = [];
  
  if (!calories || calories < 800 || calories > 5000) {
    errors.push('Calories must be between 800 and 5000');
  }
  
  if (weight && (weight < 50 || weight > 500)) {
    errors.push('Weight must be between 50 and 500 lbs/kg');
  }
  
  const validDietTypes = getDietTypes().map(d => d.type);
  if (!validDietTypes.includes(dietType)) {
    errors.push('Invalid diet type selected');
  }
  
  return errors;
};