// TDEE/BMR and Calorie Needs Calculator
// Uses Mifflin-St Jeor Equation for BMR and Harris-Benedict for activity levels

export const calculateBMR = (weight, height, age, gender, units = 'metric') => {
  let weightKg = weight;
  let heightCm = height;
  
  if (units === 'imperial') {
    weightKg = weight * 0.453592; // lbs to kg
    heightCm = height * 2.54; // inches to cm
  }
  
  let bmr;
  
  // Mifflin-St Jeor Equation (more accurate than Harris-Benedict)
  if (gender === 'male') {
    bmr = 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
  } else {
    bmr = 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
  }
  
  return Math.round(bmr);
};

export const getActivityLevels = () => {
  return [
    {
      level: 'sedentary',
      multiplier: 1.2,
      title: 'Sedentary',
      description: 'Little or no exercise, desk job'
    },
    {
      level: 'lightly_active',
      multiplier: 1.375,
      title: 'Lightly Active',
      description: 'Light exercise 1-3 days per week'
    },
    {
      level: 'moderately_active',
      multiplier: 1.55,
      title: 'Moderately Active',
      description: 'Moderate exercise 3-5 days per week'
    },
    {
      level: 'very_active',
      multiplier: 1.725,
      title: 'Very Active',
      description: 'Hard exercise 6-7 days per week'
    },
    {
      level: 'super_active',
      multiplier: 1.9,
      title: 'Super Active',
      description: 'Very hard exercise, physical job, or training twice a day'
    }
  ];
};

export const calculateTDEE = (bmr, activityLevel) => {
  const levels = getActivityLevels();
  const activity = levels.find(level => level.level === activityLevel);
  
  if (!activity) {
    throw new Error('Invalid activity level');
  }
  
  return Math.round(bmr * activity.multiplier);
};

export const calculateCalorieGoals = (tdee, goal = 'maintain') => {
  const goals = {
    lose_aggressive: { multiplier: 0.75, deficit: Math.round(tdee * 0.25), description: 'Aggressive weight loss (1-2 lbs/week)' },
    lose_moderate: { multiplier: 0.85, deficit: Math.round(tdee * 0.15), description: 'Moderate weight loss (0.5-1 lb/week)' },
    lose_slow: { multiplier: 0.92, deficit: Math.round(tdee * 0.08), description: 'Slow weight loss (0.25-0.5 lb/week)' },
    maintain: { multiplier: 1.0, deficit: 0, description: 'Maintain current weight' },
    gain_slow: { multiplier: 1.08, surplus: Math.round(tdee * 0.08), description: 'Slow weight gain (0.25-0.5 lb/week)' },
    gain_moderate: { multiplier: 1.15, surplus: Math.round(tdee * 0.15), description: 'Moderate weight gain (0.5-1 lb/week)' },
    gain_muscle: { multiplier: 1.2, surplus: Math.round(tdee * 0.2), description: 'Muscle building (lean bulk)' }
  };
  
  const goalData = goals[goal];
  if (!goalData) {
    throw new Error('Invalid goal');
  }
  
  return {
    calories: Math.round(tdee * goalData.multiplier),
    deficit: goalData.deficit || 0,
    surplus: goalData.surplus || 0,
    description: goalData.description
  };
};

export const getCalorieGoalOptions = () => {
  return [
    { value: 'lose_aggressive', label: 'Aggressive Weight Loss', emoji: '🔥', description: '1-2 lbs/week' },
    { value: 'lose_moderate', label: 'Moderate Weight Loss', emoji: '⚖️', description: '0.5-1 lb/week' },
    { value: 'lose_slow', label: 'Slow Weight Loss', emoji: '📉', description: '0.25-0.5 lb/week' },
    { value: 'maintain', label: 'Maintain Weight', emoji: '🎯', description: 'Current weight' },
    { value: 'gain_slow', label: 'Slow Weight Gain', emoji: '📈', description: '0.25-0.5 lb/week' },
    { value: 'gain_moderate', label: 'Moderate Weight Gain', emoji: '💪', description: '0.5-1 lb/week' },
    { value: 'gain_muscle', label: 'Muscle Building', emoji: '🏋️', description: 'Lean bulk' }
  ];
};

export const getCalorieRecommendations = (bmr, tdee, goal, age, gender) => {
  const recommendations = [];
  const goalData = calculateCalorieGoals(tdee, goal);
  
  // Goal-specific recommendations
  if (goal.includes('lose')) {
    recommendations.push({
      type: 'nutrition',
      title: 'Prioritize Protein',
      description: 'Aim for 0.8-1g protein per lb body weight to preserve muscle during weight loss.',
      priority: 'high'
    });
    recommendations.push({
      type: 'exercise',
      title: 'Combine Cardio and Strength',
      description: 'Mix cardiovascular exercise with resistance training for optimal fat loss.',
      priority: 'high'
    });
  } else if (goal.includes('gain')) {
    recommendations.push({
      type: 'nutrition',
      title: 'Eat in Surplus',
      description: 'Consume nutrient-dense foods to support healthy weight gain.',
      priority: 'high'
    });
    recommendations.push({
      type: 'exercise',
      title: 'Focus on Strength Training',
      description: 'Prioritize resistance training to maximize muscle growth.',
      priority: 'high'
    });
  }
  
  // General recommendations
  recommendations.push({
    type: 'nutrition',
    title: 'Stay Hydrated',
    description: 'Drink half your body weight in ounces of water daily.',
    priority: 'medium'
  });
  
  recommendations.push({
    type: 'lifestyle',
    title: 'Track Your Progress',
    description: 'Monitor your weight weekly and adjust calories as needed.',
    priority: 'medium'
  });
  
  // Age-specific recommendations
  if (age > 40) {
    recommendations.push({
      type: 'health',
      title: 'Consider Metabolism Changes',
      description: 'Metabolism may slow with age. Adjust expectations and calories accordingly.',
      priority: 'medium'
    });
  }
  
  if (age < 25) {
    recommendations.push({
      type: 'health',
      title: 'Support Growth',
      description: 'Ensure adequate nutrition to support continued physical development.',
      priority: 'medium'
    });
  }
  
  return recommendations;
};

export const formatCalorieData = (bmr, tdee, goalCalories, goal) => {
  const difference = goalCalories - tdee;
  const weeklyChange = Math.abs(difference * 7);
  const poundsPerWeek = Math.round((weeklyChange / 3500) * 10) / 10; // 3500 calories = 1 pound
  
  return {
    bmr,
    tdee,
    goalCalories,
    difference,
    weeklyChange,
    poundsPerWeek,
    isDeficit: difference < 0,
    isSurplus: difference > 0
  };
};