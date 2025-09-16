// Water Intake Calculator
// Calculates optimal daily water intake based on multiple factors

export const getActivityLevels = () => {
  return [
    {
      value: 'sedentary',
      label: 'Sedentary',
      description: 'Little to no exercise',
      multiplier: 1.0
    },
    {
      value: 'light',
      label: 'Light Activity',
      description: 'Light exercise 1-3 days/week',
      multiplier: 1.1
    },
    {
      value: 'moderate',
      label: 'Moderate Activity',
      description: 'Moderate exercise 3-5 days/week',
      multiplier: 1.2
    },
    {
      value: 'high',
      label: 'High Activity',
      description: 'Heavy exercise 6-7 days/week',
      multiplier: 1.4
    },
    {
      value: 'extreme',
      label: 'Extreme Activity',
      description: 'Very heavy exercise, training 2x/day',
      multiplier: 1.6
    }
  ];
};

export const getClimateTypes = () => {
  return [
    {
      value: 'temperate',
      label: 'Temperate',
      description: 'Moderate climate (60-75°F)',
      multiplier: 1.0
    },
    {
      value: 'hot_humid',
      label: 'Hot & Humid',
      description: 'Hot, humid conditions (80°F+)',
      multiplier: 1.3
    },
    {
      value: 'hot_dry',
      label: 'Hot & Dry',
      description: 'Hot, dry conditions (80°F+)',
      multiplier: 1.2
    },
    {
      value: 'cold',
      label: 'Cold',
      description: 'Cold conditions (below 50°F)',
      multiplier: 1.1
    },
    {
      value: 'high_altitude',
      label: 'High Altitude',
      description: 'Above 8,000 feet elevation',
      multiplier: 1.2
    }
  ];
};

export const calculateWaterIntake = (weight, weightUnit, activityLevel, climate, age, gender, pregnancyStatus = false, breastfeedingStatus = false) => {
  // Convert weight to kg if necessary
  let weightInKg = weight;
  if (weightUnit === 'lbs') {
    weightInKg = weight / 2.20462;
  }

  // Base water requirement (ml/kg)
  let baseWaterPerKg = 35; // ml per kg for adults

  // Age adjustments
  if (age < 19) {
    baseWaterPerKg = 40; // Young adults need more per kg
  } else if (age >= 65) {
    baseWaterPerKg = 30; // Older adults have reduced kidney function
  }

  // Gender adjustment (men typically need slightly more)
  const genderMultiplier = gender === 'male' ? 1.0 : 0.95;

  // Get multipliers
  const activityMultiplier = getActivityLevels().find(level => level.value === activityLevel)?.multiplier || 1.0;
  const climateMultiplier = getClimateTypes().find(type => type.value === climate)?.multiplier || 1.0;

  // Calculate base water needs
  let dailyWaterMl = weightInKg * baseWaterPerKg * genderMultiplier * activityMultiplier * climateMultiplier;

  // Special conditions
  if (pregnancyStatus) {
    dailyWaterMl += 300; // Additional 300ml during pregnancy
  }
  if (breastfeedingStatus) {
    dailyWaterMl += 700; // Additional 700ml during breastfeeding
  }

  // Convert to different units
  const waterIntakeOz = dailyWaterMl * 0.033814;
  const waterIntakeCups = dailyWaterMl / 240; // 8 oz cups
  const waterIntakeLiters = dailyWaterMl / 1000;

  return {
    milliliters: Math.round(dailyWaterMl),
    ounces: Math.round(waterIntakeOz),
    cups: Math.round(waterIntakeCups * 10) / 10,
    liters: Math.round(waterIntakeLiters * 10) / 10,
    hourlyIntake: Math.round(dailyWaterMl / 16), // Assuming 16 waking hours
    breakdown: getWaterBreakdown(dailyWaterMl),
    timing: getOptimalTiming(),
    sources: getWaterSources(),
    benefits: getHydrationBenefits()
  };
};

const getWaterBreakdown = (totalMl) => {
  return {
    uponWaking: Math.round(totalMl * 0.15), // 15% upon waking
    beforeMeals: Math.round(totalMl * 0.25), // 25% before meals
    duringExercise: Math.round(totalMl * 0.30), // 30% during/around exercise
    throughoutDay: Math.round(totalMl * 0.25), // 25% throughout day
    beforeBed: Math.round(totalMl * 0.05) // 5% before bed (minimal)
  };
};

const getOptimalTiming = () => {
  return [
    {
      time: 'Upon Waking',
      amount: '16-20 oz (500-600ml)',
      reason: 'Rehydrate after 6-8 hours without water',
      tip: 'Add lemon for enhanced absorption'
    },
    {
      time: '30 min Before Meals',
      amount: '8-12 oz (250-350ml)',
      reason: 'Aids digestion and prevents overeating',
      tip: 'Stop 30 minutes before eating to avoid diluting digestive enzymes'
    },
    {
      time: 'Pre-Workout',
      amount: '8 oz (250ml)',
      reason: 'Prepare body for fluid loss during exercise',
      tip: 'Consume 2-3 hours before intense exercise'
    },
    {
      time: 'During Exercise',
      amount: '6-8 oz every 15-20 min',
      reason: 'Replace fluid lost through sweat',
      tip: 'Add electrolytes for sessions over 60 minutes'
    },
    {
      time: 'Post-Workout',
      amount: '150% of fluid lost',
      reason: 'Replace sweat losses and aid recovery',
      tip: 'Weigh yourself before/after exercise to calculate losses'
    },
    {
      time: 'Throughout Day',
      amount: '6-8 oz every hour',
      reason: 'Maintain consistent hydration',
      tip: 'Set hourly reminders or use a marked water bottle'
    },
    {
      time: '2 Hours Before Bed',
      amount: '4-6 oz (125-175ml)',
      reason: 'Prevent dehydration overnight',
      tip: 'Avoid large amounts to prevent sleep disruption'
    }
  ];
};

const getWaterSources = () => {
  return [
    {
      category: 'Pure Water Sources',
      sources: [
        { name: 'Filtered Water', hydration: 100, notes: 'Optimal hydration, no additives' },
        { name: 'Spring Water', hydration: 100, notes: 'Natural minerals, excellent absorption' },
        { name: 'Coconut Water', hydration: 95, notes: 'Natural electrolytes, post-workout ideal' },
        { name: 'Mineral Water', hydration: 100, notes: 'Added minerals aid absorption' }
      ]
    },
    {
      category: 'Hydrating Foods (20-25% of intake)',
      sources: [
        { name: 'Watermelon', hydration: 92, notes: '92% water content plus vitamins' },
        { name: 'Cucumber', hydration: 96, notes: '96% water, lowest calorie option' },
        { name: 'Lettuce', hydration: 95, notes: 'High water, adds fiber' },
        { name: 'Tomatoes', hydration: 94, notes: 'Lycopene + hydration benefits' },
        { name: 'Bell Peppers', hydration: 92, notes: 'Vitamin C + hydration' },
        { name: 'Broth-based Soups', hydration: 85, notes: 'Warm hydration + electrolytes' }
      ]
    },
    {
      category: 'Enhanced Water Options',
      sources: [
        { name: 'Electrolyte Water', hydration: 105, notes: 'Better absorption, post-exercise' },
        { name: 'Herbal Teas', hydration: 100, notes: 'Caffeine-free, counts as water intake' },
        { name: 'Infused Water', hydration: 100, notes: 'Natural flavoring, no calories' },
        { name: 'Sparkling Water', hydration: 100, notes: 'Same hydration as still water' }
      ]
    },
    {
      category: 'Avoid or Limit',
      sources: [
        { name: 'Sugary Drinks', hydration: 70, notes: 'High calories, promotes dehydration' },
        { name: 'Alcohol', hydration: -20, notes: 'Diuretic effect, causes dehydration' },
        { name: 'High-Caffeine Drinks', hydration: 85, notes: 'Mild diuretic effect' },
        { name: 'Energy Drinks', hydration: 75, notes: 'High sodium, sugar, and caffeine' }
      ]
    }
  ];
};

const getHydrationBenefits = () => {
  return [
    {
      system: 'Physical Performance',
      benefits: [
        'Maintains blood volume and circulation',
        'Regulates body temperature through sweating',
        'Prevents fatigue and maintains energy levels',
        'Supports muscle function and prevents cramps'
      ],
      impact: 'Even 2% dehydration can reduce physical performance by 10%'
    },
    {
      system: 'Cognitive Function',
      benefits: [
        'Maintains focus and concentration',
        'Prevents headaches and mental fatigue',
        'Supports memory and learning',
        'Improves mood and reduces anxiety'
      ],
      impact: '1% dehydration can impair cognitive performance and mood'
    },
    {
      system: 'Metabolic Health',
      benefits: [
        'Supports kidney function and toxin elimination',
        'Aids digestion and nutrient absorption',
        'Helps maintain healthy blood pressure',
        'Supports cellular metabolism'
      ],
      impact: 'Proper hydration optimizes metabolic rate by 3-5%'
    },
    {
      system: 'Skin and Beauty',
      benefits: [
        'Maintains skin elasticity and hydration',
        'Prevents premature aging and wrinkles',
        'Supports collagen production',
        'Gives skin a healthy, glowing appearance'
      ],
      impact: 'Adequate hydration is the foundation of healthy, youthful skin'
    }
  ];
};

export const getDehydrationSigns = () => {
  return {
    mild: [
      'Increased thirst',
      'Dry mouth and lips',
      'Slightly yellow urine',
      'Mild headache',
      'Slight fatigue'
    ],
    moderate: [
      'Strong thirst',
      'Very dry mouth',
      'Dark yellow urine',
      'Headache',
      'Dizziness',
      'Fatigue',
      'Reduced urination'
    ],
    severe: [
      'Extreme thirst',
      'Very dry mouth and skin',
      'Little to no urination',
      'Dark-colored urine',
      'Rapid heartbeat',
      'Rapid breathing',
      'Sunken eyes',
      'Fever',
      'Delirium'
    ]
  };
};

export const getHydrationTips = (activityLevel, climate, age) => {
  const tips = [];

  // Base tips
  tips.push('Monitor urine color - pale yellow indicates good hydration');
  tips.push('Start each day with 16-20 oz of water upon waking');
  tips.push('Keep a water bottle visible as a reminder to drink regularly');

  // Activity-based tips
  if (['high', 'extreme'].includes(activityLevel)) {
    tips.push('Weigh yourself before and after exercise - drink 150% of weight lost');
    tips.push('Add electrolytes during exercise sessions over 60 minutes');
    tips.push('Pre-hydrate 2-3 hours before intense exercise');
  }

  // Climate-based tips
  if (['hot_humid', 'hot_dry'].includes(climate)) {
    tips.push('Increase water intake by 20-30% in hot weather');
    tips.push('Seek shade and air conditioning when possible');
    tips.push('Avoid alcohol and caffeine in extreme heat');
  } else if (climate === 'high_altitude') {
    tips.push('Increase water intake at altitude - humidity is lower');
    tips.push('Allow 1-3 days for acclimatization to altitude');
  }

  // Age-based tips
  if (age >= 65) {
    tips.push('Set regular reminders - thirst sensation decreases with age');
    tips.push('Monitor medications that may affect hydration needs');
    tips.push('Keep water easily accessible throughout the day');
  }

  return tips;
};