// Calories Burned by Activity Calculator
// Calculates calories burned for various physical activities

export const getActivityCategories = () => {
  return [
    {
      id: 'cardio',
      name: 'Cardio & Aerobic',
      icon: '🏃',
      description: 'Running, cycling, swimming, and aerobic exercises'
    },
    {
      id: 'strength',
      name: 'Strength Training',
      icon: '💪',
      description: 'Weight lifting, resistance training, bodyweight exercises'
    },
    {
      id: 'sports',
      name: 'Sports & Recreation',
      icon: '⚽',
      description: 'Team sports, racquet sports, and recreational activities'
    },
    {
      id: 'daily',
      name: 'Daily Activities',
      icon: '🏠',
      description: 'Household chores, work activities, and daily tasks'
    },
    {
      id: 'outdoor',
      name: 'Outdoor Activities',
      icon: '🌲',
      description: 'Hiking, gardening, outdoor recreation'
    },
    {
      id: 'water',
      name: 'Water Activities',
      icon: '🏊',
      description: 'Swimming, water sports, and aquatic exercises'
    }
  ];
};

export const getActivitiesByCategory = () => {
  return {
    cardio: [
      { name: 'Running (6 mph)', met: 9.8, intensity: 'High' },
      { name: 'Running (8 mph)', met: 11.8, intensity: 'High' },
      { name: 'Running (10 mph)', met: 14.5, intensity: 'Very High' },
      { name: 'Jogging (5 mph)', met: 8.3, intensity: 'Moderate' },
      { name: 'Walking (3.5 mph)', met: 4.3, intensity: 'Light' },
      { name: 'Walking (4.5 mph)', met: 5.3, intensity: 'Moderate' },
      { name: 'Cycling (12-14 mph)', met: 8.0, intensity: 'Moderate' },
      { name: 'Cycling (16-19 mph)', met: 12.0, intensity: 'High' },
      { name: 'Stationary Bike (moderate)', met: 6.8, intensity: 'Moderate' },
      { name: 'Stationary Bike (vigorous)', met: 10.5, intensity: 'High' },
      { name: 'Elliptical Machine', met: 7.0, intensity: 'Moderate' },
      { name: 'Rowing Machine (moderate)', met: 7.0, intensity: 'Moderate' },
      { name: 'Rowing Machine (vigorous)', met: 12.0, intensity: 'High' },
      { name: 'Jumping Rope', met: 12.3, intensity: 'High' },
      { name: 'Stair Climbing Machine', met: 9.0, intensity: 'High' },
      { name: 'Aerobics (high impact)', met: 7.3, intensity: 'Moderate' },
      { name: 'Aerobics (low impact)', met: 5.0, intensity: 'Light' },
      { name: 'Step Aerobics', met: 8.5, intensity: 'Moderate' },
      { name: 'Zumba', met: 8.8, intensity: 'Moderate' },
      { name: 'Dancing (ballroom)', met: 3.0, intensity: 'Light' },
      { name: 'Dancing (fast/disco)', met: 5.5, intensity: 'Moderate' }
    ],
    strength: [
      { name: 'Weight Lifting (general)', met: 3.0, intensity: 'Light' },
      { name: 'Weight Lifting (vigorous)', met: 6.0, intensity: 'Moderate' },
      { name: 'Bodyweight Exercises', met: 3.8, intensity: 'Light' },
      { name: 'Push-ups/Sit-ups', met: 3.8, intensity: 'Light' },
      { name: 'Pull-ups/Chin-ups', met: 8.0, intensity: 'Moderate' },
      { name: 'Circuit Training', met: 8.0, intensity: 'Moderate' },
      { name: 'CrossFit', met: 12.0, intensity: 'High' },
      { name: 'Kettlebell Training', met: 6.0, intensity: 'Moderate' },
      { name: 'Resistance Band Training', met: 3.5, intensity: 'Light' },
      { name: 'Pilates', met: 3.0, intensity: 'Light' },
      { name: 'Yoga (Hatha)', met: 2.5, intensity: 'Light' },
      { name: 'Yoga (Power)', met: 4.0, intensity: 'Light' },
      { name: 'Stretching', met: 2.3, intensity: 'Light' }
    ],
    sports: [
      { name: 'Basketball (game)', met: 8.0, intensity: 'Moderate' },
      { name: 'Basketball (shooting)', met: 4.5, intensity: 'Light' },
      { name: 'Soccer', met: 7.0, intensity: 'Moderate' },
      { name: 'Tennis (singles)', met: 8.0, intensity: 'Moderate' },
      { name: 'Tennis (doubles)', met: 6.0, intensity: 'Moderate' },
      { name: 'Baseball', met: 5.0, intensity: 'Light' },
      { name: 'Softball', met: 5.0, intensity: 'Light' },
      { name: 'Volleyball', met: 4.0, intensity: 'Light' },
      { name: 'Badminton', met: 5.5, intensity: 'Moderate' },
      { name: 'Squash', met: 12.0, intensity: 'High' },
      { name: 'Racquetball', met: 7.0, intensity: 'Moderate' },
      { name: 'Golf (walking)', met: 4.8, intensity: 'Light' },
      { name: 'Golf (cart)', met: 3.5, intensity: 'Light' },
      { name: 'Bowling', met: 3.0, intensity: 'Light' },
      { name: 'Table Tennis', met: 4.0, intensity: 'Light' },
      { name: 'Boxing (sparring)', met: 12.8, intensity: 'High' },
      { name: 'Boxing (punching bag)', met: 5.5, intensity: 'Moderate' },
      { name: 'Martial Arts', met: 10.3, intensity: 'High' },
      { name: 'Fencing', met: 6.0, intensity: 'Moderate' },
      { name: 'Ice Hockey', met: 8.0, intensity: 'Moderate' },
      { name: 'Ice Skating', met: 7.0, intensity: 'Moderate' },
      { name: 'Roller Skating', met: 7.0, intensity: 'Moderate' }
    ],
    daily: [
      { name: 'Household Cleaning', met: 3.3, intensity: 'Light' },
      { name: 'Vacuuming', met: 3.8, intensity: 'Light' },
      { name: 'Mopping', met: 3.5, intensity: 'Light' },
      { name: 'Cooking', met: 2.5, intensity: 'Light' },
      { name: 'Dishwashing', met: 2.3, intensity: 'Light' },
      { name: 'Laundry', met: 2.3, intensity: 'Light' },
      { name: 'Ironing', met: 2.3, intensity: 'Light' },
      { name: 'Car Washing', met: 3.0, intensity: 'Light' },
      { name: 'Shopping', met: 2.3, intensity: 'Light' },
      { name: 'Office Work (sitting)', met: 1.5, intensity: 'Sedentary' },
      { name: 'Office Work (standing)', met: 1.8, intensity: 'Light' },
      { name: 'Computer Work', met: 1.5, intensity: 'Sedentary' },
      { name: 'Reading', met: 1.3, intensity: 'Sedentary' },
      { name: 'Watching TV', met: 1.0, intensity: 'Sedentary' },
      { name: 'Playing with Children', met: 4.0, intensity: 'Light' },
      { name: 'Carrying Child', met: 3.3, intensity: 'Light' },
      { name: 'Painting House', met: 4.5, intensity: 'Light' },
      { name: 'Home Repair', met: 4.5, intensity: 'Light' }
    ],
    outdoor: [
      { name: 'Hiking (general)', met: 6.0, intensity: 'Moderate' },
      { name: 'Hiking (uphill)', met: 7.5, intensity: 'Moderate' },
      { name: 'Backpacking', met: 7.0, intensity: 'Moderate' },
      { name: 'Rock Climbing', met: 11.0, intensity: 'High' },
      { name: 'Mountain Climbing', met: 8.0, intensity: 'Moderate' },
      { name: 'Gardening (general)', met: 4.0, intensity: 'Light' },
      { name: 'Gardening (digging)', met: 5.0, intensity: 'Moderate' },
      { name: 'Lawn Mowing (push)', met: 5.5, intensity: 'Moderate' },
      { name: 'Lawn Mowing (riding)', met: 2.5, intensity: 'Light' },
      { name: 'Raking Leaves', met: 4.3, intensity: 'Light' },
      { name: 'Shoveling Snow', met: 6.0, intensity: 'Moderate' },
      { name: 'Chopping Wood', met: 6.0, intensity: 'Moderate' },
      { name: 'Fishing', met: 2.5, intensity: 'Light' },
      { name: 'Hunting', met: 5.0, intensity: 'Moderate' },
      { name: 'Horseback Riding', met: 5.5, intensity: 'Moderate' },
      { name: 'Skateboarding', met: 5.0, intensity: 'Moderate' },
      { name: 'Skiing (downhill)', met: 6.0, intensity: 'Moderate' },
      { name: 'Skiing (cross country)', met: 9.0, intensity: 'High' },
      { name: 'Snowshoeing', met: 8.0, intensity: 'Moderate' }
    ],
    water: [
      { name: 'Swimming (freestyle, moderate)', met: 8.0, intensity: 'Moderate' },
      { name: 'Swimming (freestyle, fast)', met: 10.0, intensity: 'High' },
      { name: 'Swimming (backstroke)', met: 7.0, intensity: 'Moderate' },
      { name: 'Swimming (breaststroke)', met: 10.0, intensity: 'High' },
      { name: 'Swimming (butterfly)', met: 13.8, intensity: 'Very High' },
      { name: 'Swimming (treading water)', met: 3.5, intensity: 'Light' },
      { name: 'Water Aerobics', met: 4.0, intensity: 'Light' },
      { name: 'Water Jogging', met: 8.0, intensity: 'Moderate' },
      { name: 'Diving', met: 3.0, intensity: 'Light' },
      { name: 'Surfing', met: 3.0, intensity: 'Light' },
      { name: 'Water Skiing', met: 6.0, intensity: 'Moderate' },
      { name: 'Jet Skiing', met: 4.0, intensity: 'Light' },
      { name: 'Kayaking', met: 5.0, intensity: 'Moderate' },
      { name: 'Canoeing', met: 5.8, intensity: 'Moderate' },
      { name: 'Sailing', met: 3.0, intensity: 'Light' },
      { name: 'Windsurfing', met: 4.2, intensity: 'Light' },
      { name: 'Stand-up Paddleboarding', met: 6.0, intensity: 'Moderate' }
    ]
  };
};

export const calculateCaloriesBurned = (weight, weightUnit, activity, duration, durationUnit = 'minutes') => {
  // Convert weight to kg if necessary
  let weightInKg = weight;
  if (weightUnit === 'lbs') {
    weightInKg = weight / 2.20462;
  }

  // Convert duration to hours if necessary
  let durationInHours = duration;
  if (durationUnit === 'minutes') {
    durationInHours = duration / 60;
  }

  // Calculate calories using MET formula: Calories = MET × Weight (kg) × Time (hours)
  const caloriesBurned = activity.met * weightInKg * durationInHours;

  return {
    calories: Math.round(caloriesBurned),
    caloriesPerMinute: Math.round(caloriesBurned / (durationInHours * 60)),
    met: activity.met,
    intensity: activity.intensity,
    activity: activity.name,
    duration: {
      value: duration,
      unit: durationUnit
    },
    weight: {
      value: weight,
      unit: weightUnit
    },
    breakdown: getCalorieBreakdown(caloriesBurned, durationInHours),
    recommendations: getActivityRecommendations(activity, caloriesBurned)
  };
};

const getCalorieBreakdown = (totalCalories, hours) => {
  return {
    per15min: Math.round(totalCalories / (hours * 4)),
    per30min: Math.round(totalCalories / (hours * 2)),
    perHour: Math.round(totalCalories / hours),
    equivalents: getCalorieEquivalents(totalCalories)
  };
};

const getCalorieEquivalents = (calories) => {
  return [
    {
      food: 'Apple (medium)',
      calories_per_unit: 95,
      quantity: Math.round((calories / 95) * 10) / 10
    },
    {
      food: 'Banana (medium)',
      calories_per_unit: 105,
      quantity: Math.round((calories / 105) * 10) / 10
    },
    {
      food: 'Slice of bread',
      calories_per_unit: 80,
      quantity: Math.round((calories / 80) * 10) / 10
    },
    {
      food: 'Cup of rice',
      calories_per_unit: 200,
      quantity: Math.round((calories / 200) * 10) / 10
    },
    {
      food: 'Can of soda',
      calories_per_unit: 150,
      quantity: Math.round((calories / 150) * 10) / 10
    },
    {
      food: 'Chocolate chip cookie',
      calories_per_unit: 50,
      quantity: Math.round((calories / 50) * 10) / 10
    }
  ];
};

const getActivityRecommendations = (activity, caloriesBurned) => {
  const recommendations = [];

  // Intensity-based recommendations
  if (activity.intensity === 'High' || activity.intensity === 'Very High') {
    recommendations.push('Stay well hydrated during and after this high-intensity activity');
    recommendations.push('Allow adequate recovery time between sessions');
    recommendations.push('Consider a proper warm-up and cool-down routine');
  } else if (activity.intensity === 'Moderate') {
    recommendations.push('This is a great activity for regular cardiovascular health');
    recommendations.push('Can be done most days of the week');
    recommendations.push('Consider increasing duration or intensity for greater benefits');
  } else if (activity.intensity === 'Light') {
    recommendations.push('Perfect for active recovery or daily movement');
    recommendations.push('Can be done daily without concern');
    recommendations.push('Great for beginners or those returning to exercise');
  }

  // Calorie-based recommendations
  if (caloriesBurned >= 500) {
    recommendations.push('Excellent calorie burn! This supports significant weight management goals');
    recommendations.push('Consider post-exercise nutrition to support recovery');
  } else if (caloriesBurned >= 300) {
    recommendations.push('Good calorie burn for health and fitness maintenance');
    recommendations.push('Combine with other activities for comprehensive fitness');
  } else if (caloriesBurned >= 100) {
    recommendations.push('Every bit of movement counts toward your daily activity goals');
    recommendations.push('Consider increasing duration or adding more activities throughout the day');
  }

  return recommendations;
};

export const getWeightLossProjections = (caloriesBurned, frequency = 'daily') => {
  let weeklyCalories = caloriesBurned;
  
  switch (frequency) {
    case 'daily':
      weeklyCalories = caloriesBurned * 7;
      break;
    case '5_times_week':
      weeklyCalories = caloriesBurned * 5;
      break;
    case '3_times_week':
      weeklyCalories = caloriesBurned * 3;
      break;
    case 'weekly':
      weeklyCalories = caloriesBurned;
      break;
  }

  // 1 pound of fat = approximately 3,500 calories
  const caloriesPerPound = 3500;
  const weeklyWeightLoss = weeklyCalories / caloriesPerPound;
  const monthlyWeightLoss = weeklyWeightLoss * 4.33;
  const yearlyWeightLoss = weeklyWeightLoss * 52;

  return {
    weekly: Math.round(weeklyWeightLoss * 100) / 100,
    monthly: Math.round(monthlyWeightLoss * 100) / 100,
    yearly: Math.round(yearlyWeightLoss * 100) / 100,
    weeklyCalories: Math.round(weeklyCalories),
    assumptions: [
      'Based on exercise alone without dietary changes',
      'Actual results may vary based on individual factors',
      'Combines with healthy diet for best results',
      'Weight loss may plateau as body adapts'
    ]
  };
};

export const getHealthBenefits = (intensity, duration) => {
  const benefits = {
    cardiovascular: [],
    mental: [],
    metabolic: [],
    musculoskeletal: []
  };

  // Duration-based benefits
  if (duration >= 30) {
    benefits.cardiovascular.push('Meets daily moderate exercise recommendations');
    benefits.mental.push('Significant mood improvement and stress reduction');
    benefits.metabolic.push('Enhanced insulin sensitivity for hours after exercise');
  } else if (duration >= 15) {
    benefits.cardiovascular.push('Contributes to weekly exercise goals');
    benefits.mental.push('Mood boost and mental clarity');
    benefits.metabolic.push('Modest metabolic enhancement');
  }

  // Intensity-based benefits
  if (intensity === 'High' || intensity === 'Very High') {
    benefits.cardiovascular.push('Improves VO2 max and cardiac efficiency');
    benefits.metabolic.push('Increases EPOC (afterburn effect)');
    benefits.musculoskeletal.push('Builds power and anaerobic capacity');
  } else if (intensity === 'Moderate') {
    benefits.cardiovascular.push('Strengthens heart and improves circulation');
    benefits.metabolic.push('Enhances fat oxidation');
    benefits.musculoskeletal.push('Builds endurance and functional strength');
  } else if (intensity === 'Light') {
    benefits.cardiovascular.push('Promotes blood flow and heart health');
    benefits.metabolic.push('Supports healthy metabolism');
    benefits.musculoskeletal.push('Maintains joint mobility and flexibility');
  }

  // Universal benefits
  benefits.mental.push('Releases endorphins for improved mood');
  benefits.metabolic.push('Burns calories and supports weight management');
  benefits.musculoskeletal.push('Maintains bone density and muscle mass');

  return benefits;
};