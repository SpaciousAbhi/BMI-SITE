// Heart Rate Zone Calculator
// Calculates optimal heart rate zones for different training goals

export const getAgeMaxFormulas = () => {
  return [
    {
      name: 'Traditional (220 - Age)',
      formula: (age) => 220 - age,
      description: 'Most common formula, good general estimate',
      accuracy: 'Standard deviation ±10-12 bpm'
    },
    {
      name: 'Tanaka (208 - 0.7 × Age)',
      formula: (age) => Math.round(208 - (0.7 * age)),
      description: 'More accurate for older adults and athletes',
      accuracy: 'Standard deviation ±7-10 bpm'
    },
    {
      name: 'Gulati (206 - 0.88 × Age) - Women',
      formula: (age) => Math.round(206 - (0.88 * age)),
      description: 'Specifically developed for women',
      accuracy: 'More accurate for females'
    },
    {
      name: 'Nes (211 - 0.64 × Age)',
      formula: (age) => Math.round(211 - (0.64 * age)),
      description: 'Based on large Norwegian study',
      accuracy: 'Good for active populations'
    }
  ];
};

export const getHeartRateZones = (maxHR, restingHR) => {
  const hrReserve = maxHR - restingHR;
  
  return [
    {
      zone: 1,
      name: 'Active Recovery',
      percentage: '50-60%',
      targetHR: {
        lower: Math.round(restingHR + (hrReserve * 0.50)),
        upper: Math.round(restingHR + (hrReserve * 0.60))
      },
      maxHRMethod: {
        lower: Math.round(maxHR * 0.50),
        upper: Math.round(maxHR * 0.60)
      },
      description: 'Very light activity, recovery sessions',
      benefits: [
        'Promotes recovery and blood flow',
        'Builds aerobic base safely',
        'Enhances fat oxidation',
        'Reduces stress and improves well-being'
      ],
      activities: ['Easy walking', 'Gentle yoga', 'Light stretching', 'Easy cycling'],
      duration: '20-90 minutes',
      feeling: 'Very comfortable, can sing',
      color: '#3B82F6' // Blue
    },
    {
      zone: 2,
      name: 'Aerobic Base',
      percentage: '60-70%',
      targetHR: {
        lower: Math.round(restingHR + (hrReserve * 0.60)),
        upper: Math.round(restingHR + (hrReserve * 0.70))
      },
      maxHRMethod: {
        lower: Math.round(maxHR * 0.60),
        upper: Math.round(maxHR * 0.70)
      },
      description: 'Comfortable aerobic effort, base building',
      benefits: [
        'Builds aerobic capacity and endurance',
        'Improves fat burning efficiency',
        'Strengthens heart and cardiovascular system',
        'Foundation for higher intensity training'
      ],
      activities: ['Brisk walking', 'Easy jogging', 'Recreational cycling', 'Swimming'],
      duration: '30-120 minutes',
      feeling: 'Comfortable, can hold conversation',
      color: '#10B981' // Green
    },
    {
      zone: 3,
      name: 'Aerobic Threshold',
      percentage: '70-80%',
      targetHR: {
        lower: Math.round(restingHR + (hrReserve * 0.70)),
        upper: Math.round(restingHR + (hrReserve * 0.80))
      },
      maxHRMethod: {
        lower: Math.round(maxHR * 0.70),
        upper: Math.round(maxHR * 0.80)
      },
      description: 'Moderate to moderately hard effort',
      benefits: [
        'Improves aerobic power and efficiency',
        'Enhances lactate clearance ability',
        'Builds sustainable pace for longer events',
        'Improves cardiovascular fitness'
      ],
      activities: ['Steady running', 'Tempo cycling', 'Aerobic classes', 'Rowing'],
      duration: '20-60 minutes',
      feeling: 'Moderately hard, short phrases only',
      color: '#F59E0B' // Yellow
    },
    {
      zone: 4,
      name: 'Lactate Threshold',
      percentage: '80-90%',
      targetHR: {
        lower: Math.round(restingHR + (hrReserve * 0.80)),
        upper: Math.round(restingHR + (hrReserve * 0.90))
      },
      maxHRMethod: {
        lower: Math.round(maxHR * 0.80),
        upper: Math.round(maxHR * 0.90)
      },
      description: 'Hard effort, lactate threshold training',
      benefits: [
        'Increases lactate threshold',
        'Improves race pace sustainability',
        'Enhances anaerobic capacity',
        'Builds mental toughness'
      ],
      activities: ['Threshold running', 'Time trials', 'Hill repeats', 'Hard cycling'],
      duration: '8-40 minutes (intervals)',
      feeling: 'Hard, difficult to speak',
      color: '#EF4444' // Red
    },
    {
      zone: 5,
      name: 'VO2 Max',
      percentage: '90-100%',
      targetHR: {
        lower: Math.round(restingHR + (hrReserve * 0.90)),
        upper: Math.round(restingHR + (hrReserve * 1.00))
      },
      maxHRMethod: {
        lower: Math.round(maxHR * 0.90),
        upper: Math.round(maxHR * 1.00)
      },
      description: 'Very hard to maximal effort',
      benefits: [
        'Maximizes VO2 max and aerobic power',
        'Improves oxygen uptake and delivery',
        'Enhances neuromuscular power',
        'Increases anaerobic capacity'
      ],
      activities: ['Track intervals', 'Sprint training', 'Hill sprints', 'High-intensity intervals'],
      duration: '30 seconds - 8 minutes (intervals)',
      feeling: 'Very hard to maximal, cannot speak',
      color: '#8B5CF6' // Purple
    }
  ];
};

export const calculateHeartRateZones = (age, gender, restingHR, fitnessLevel, formula = 'tanaka') => {
  // Calculate max HR using selected formula
  let maxHR;
  const formulas = getAgeMaxFormulas();
  
  switch (formula) {
    case 'traditional':
      maxHR = formulas[0].formula(age);
      break;
    case 'tanaka':
      maxHR = formulas[1].formula(age);
      break;
    case 'gulati':
      maxHR = gender === 'female' ? formulas[2].formula(age) : formulas[1].formula(age);
      break;
    case 'nes':
      maxHR = formulas[3].formula(age);
      break;
    default:
      maxHR = formulas[1].formula(age); // Default to Tanaka
  }

  // Adjust for fitness level
  const fitnessAdjustment = getFitnessAdjustment(fitnessLevel);
  const adjustedMaxHR = Math.round(maxHR * fitnessAdjustment);

  // Calculate zones
  const zones = getHeartRateZones(adjustedMaxHR, restingHR);

  return {
    maxHR: adjustedMaxHR,
    restingHR: restingHR,
    hrReserve: adjustedMaxHR - restingHR,
    zones: zones,
    formula: formula,
    fitnessLevel: fitnessLevel
  };
};

const getFitnessAdjustment = (fitnessLevel) => {
  const adjustments = {
    'beginner': 0.95,      // Slightly lower max HR
    'intermediate': 1.00,   // Standard calculation
    'advanced': 1.02,      // Slightly higher max HR
    'elite': 1.05          // Higher max HR for elite athletes
  };
  return adjustments[fitnessLevel] || 1.00;
};

export const getFitnessLevels = () => {
  return [
    {
      value: 'beginner',
      label: 'Beginner',
      description: 'New to exercise or returning after long break',
      characteristics: ['Less than 6 months regular exercise', 'Low cardiovascular fitness', 'High resting heart rate (>80 bpm)']
    },
    {
      value: 'intermediate',
      label: 'Intermediate',
      description: 'Regular exercise for 6+ months',
      characteristics: ['6+ months regular exercise', 'Moderate cardiovascular fitness', 'Normal resting heart rate (60-80 bpm)']
    },
    {
      value: 'advanced',
      label: 'Advanced',
      description: 'Consistent training for 2+ years',
      characteristics: ['2+ years consistent training', 'High cardiovascular fitness', 'Low resting heart rate (50-65 bpm)']
    },
    {
      value: 'elite',
      label: 'Elite',
      description: 'Competitive athlete or very high fitness',
      characteristics: ['Competitive athlete', 'Exceptional cardiovascular fitness', 'Very low resting heart rate (<50 bpm)']
    }
  ];
};

export const getTrainingGuidelines = (zones) => {
  return {
    weekly_distribution: {
      zone1: '20-30%',
      zone2: '50-60%',
      zone3: '10-20%',
      zone4: '5-10%',
      zone5: '2-5%'
    },
    beginner_focus: [
      'Spend 80-90% of time in Zones 1-2',
      'Build aerobic base for 12-16 weeks',
      'Add Zone 3 after 4-6 weeks',
      'Introduce Zone 4-5 only after solid base'
    ],
    advanced_periodization: [
      'Base phase: 80% Zone 1-2, 15% Zone 3, 5% Zone 4-5',
      'Build phase: 70% Zone 1-2, 20% Zone 3, 10% Zone 4-5',
      'Peak phase: 60% Zone 1-2, 20% Zone 3, 20% Zone 4-5',
      'Recovery phase: 90% Zone 1-2, 10% Zone 3'
    ]
  };
};

export const getRestingHRGuidelines = () => {
  return {
    measurement: {
      when: 'First thing in the morning, before getting out of bed',
      duration: 'Measure for 60 seconds or 15 seconds × 4',
      frequency: 'Take measurements for 3-5 consecutive days and average',
      position: 'Lying down, relaxed'
    },
    normal_ranges: {
      'Elite athletes': '40-50 bpm',
      'Very fit': '50-60 bpm',
      'Average fitness': '60-80 bpm',
      'Below average': '80-100 bpm',
      'Poor fitness': '100+ bpm'
    },
    factors_affecting: [
      'Fitness level (lower with better fitness)',
      'Age (tends to decrease slightly with age)',
      'Gender (women typically 5-10 bpm higher)',
      'Body size (larger people tend to have lower RHR)',
      'Medications (beta-blockers lower RHR)',
      'Caffeine, stress, illness (increase RHR)',
      'Temperature (heat increases RHR)'
    ]
  };
};