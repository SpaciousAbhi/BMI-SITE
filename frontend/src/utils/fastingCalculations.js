// Intermittent Fasting Planner
// Calculates optimal fasting schedules and provides guidance

export const getFastingMethods = () => {
  return [
    {
      id: '16_8',
      name: '16:8 Method',
      description: 'Fast for 16 hours, eat in 8-hour window',
      fastingHours: 16,
      eatingHours: 8,
      difficulty: 'Beginner',
      frequency: 'Daily',
      benefits: [
        'Easy to maintain long-term',
        'Fits most lifestyles',
        'Proven weight loss results',
        'Improved insulin sensitivity'
      ],
      schedule: {
        fast: '8:00 PM - 12:00 PM next day',
        eat: '12:00 PM - 8:00 PM'
      },
      tips: [
        'Start eating window later if you prefer dinner',
        'Black coffee, tea, and water are allowed during fast',
        'Begin with 12:12 and gradually extend to 16:8'
      ]
    },
    {
      id: '18_6',
      name: '18:6 Method',
      description: 'Fast for 18 hours, eat in 6-hour window',
      fastingHours: 18,
      eatingHours: 6,
      difficulty: 'Intermediate',
      frequency: 'Daily',
      benefits: [
        'Enhanced autophagy',
        'Greater fat burning',
        'Improved mental clarity',
        'Better metabolic flexibility'
      ],
      schedule: {
        fast: '7:00 PM - 1:00 PM next day',
        eat: '1:00 PM - 7:00 PM'
      },
      tips: [
        'Ensure adequate nutrition in shorter eating window',
        'Stay hydrated during extended fast',
        'Consider electrolyte supplementation'
      ]
    },
    {
      id: '20_4',
      name: '20:4 (Warrior Diet)',
      description: 'Fast for 20 hours, eat in 4-hour window',
      fastingHours: 20,
      eatingHours: 4,
      difficulty: 'Advanced',
      frequency: 'Daily',
      benefits: [
        'Maximum autophagy benefits',
        'Significant calorie restriction',
        'Enhanced growth hormone',
        'Deep ketosis state'
      ],
      schedule: {
        fast: '6:00 PM - 2:00 PM next day',
        eat: '2:00 PM - 6:00 PM'
      },
      tips: [
        'Requires careful meal planning',
        'Focus on nutrient-dense foods',
        'May need vitamin/mineral supplements'
      ]
    },
    {
      id: '5_2',
      name: '5:2 Method',
      description: 'Eat normally 5 days, restrict calories 2 days',
      fastingHours: 'Variable',
      eatingHours: 'Variable',
      difficulty: 'Intermediate',
      frequency: '2 days per week',
      benefits: [
        'Flexible scheduling',
        'Sustainable long-term',
        'Social eating friendly',
        'Metabolic improvements'
      ],
      schedule: {
        fast: 'Monday & Thursday: 500-600 calories',
        eat: 'Other days: Normal eating'
      },
      tips: [
        'Choose non-consecutive fasting days',
        'Focus on protein and vegetables on fasting days',
        'Plan fasting days around social events'
      ]
    },
    {
      id: 'eat_stop_eat',
      name: 'Eat-Stop-Eat',
      description: '24-hour fasts once or twice per week',
      fastingHours: 24,
      eatingHours: 'Normal',
      difficulty: 'Advanced',
      frequency: '1-2 times per week',
      benefits: [
        'Flexibility in timing',
        'Significant calorie reduction',
        'Enhanced fat oxidation',
        'Mental discipline building'
      ],
      schedule: {
        fast: 'Dinner to dinner (24 hours)',
        eat: 'Normal on non-fasting days'
      },
      tips: [
        'Start with shorter fasts and build up',
        'Stay busy during fasting periods',
        'Break fast with moderate-sized meal'
      ]
    },
    {
      id: 'alternate_day',
      name: 'Alternate Day Fasting',
      description: 'Alternate between fasting and eating days',
      fastingHours: 'Variable',
      eatingHours: 'Variable',
      difficulty: 'Advanced',
      frequency: 'Every other day',
      benefits: [
        'Rapid weight loss',
        'Significant metabolic changes',
        'Enhanced longevity markers',
        'Improved insulin sensitivity'
      ],
      schedule: {
        fast: 'Every other day: 0-500 calories',
        eat: 'Alternating days: Normal eating'
      },
      tips: [
        'Not recommended for beginners',
        'Requires medical supervision',
        'Monitor for side effects closely'
      ]
    }
  ];
};

export const createFastingSchedule = (method, startTime = '20:00', customWindow = null) => {
  const fastingMethod = getFastingMethods().find(m => m.id === method);
  if (!fastingMethod) return null;

  // Convert start time to minutes
  const [startHour, startMinute] = startTime.split(':').map(Number);
  const startMinutes = startHour * 60 + startMinute;

  let schedule = {};

  if (method === '16_8' || method === '18_6' || method === '20_4') {
    const fastingMinutes = fastingMethod.fastingHours * 60;
    const eatingMinutes = fastingMethod.eatingHours * 60;
    
    // Fasting period
    const fastStart = startMinutes;
    const fastEnd = (startMinutes + fastingMinutes) % (24 * 60);
    
    // Eating period
    const eatStart = fastEnd;
    const eatEnd = (fastEnd + eatingMinutes) % (24 * 60);

    schedule = {
      fastingWindow: {
        start: formatTime(fastStart),
        end: formatTime(fastEnd),
        duration: `${fastingMethod.fastingHours} hours`
      },
      eatingWindow: {
        start: formatTime(eatStart),
        end: formatTime(eatEnd),
        duration: `${fastingMethod.eatingHours} hours`
      },
      dailySchedule: generateDailySchedule(fastStart, fastEnd, eatStart, eatEnd)
    };
  } else if (method === '5_2') {
    schedule = {
      weeklyPattern: {
        monday: { type: 'fasting', calories: '500-600' },
        tuesday: { type: 'normal', calories: 'Normal intake' },
        wednesday: { type: 'normal', calories: 'Normal intake' },
        thursday: { type: 'fasting', calories: '500-600' },
        friday: { type: 'normal', calories: 'Normal intake' },
        saturday: { type: 'normal', calories: 'Normal intake' },
        sunday: { type: 'normal', calories: 'Normal intake' }
      }
    };
  }

  return {
    method: fastingMethod,
    schedule: schedule,
    recommendations: getFastingRecommendations(method),
    safetyGuidelines: getSafetyGuidelines()
  };
};

const formatTime = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
};

const generateDailySchedule = (fastStart, fastEnd, eatStart, eatEnd) => {
  const schedule = [];
  
  // If fasting crosses midnight
  if (fastEnd < fastStart) {
    schedule.push({
      time: '00:00',
      activity: 'Continue fasting',
      description: 'Fasting period continues from previous day'
    });
    schedule.push({
      time: formatTime(fastEnd),
      activity: 'Break fast',
      description: 'First meal of eating window'
    });
    schedule.push({
      time: formatTime(eatEnd),
      activity: 'Begin fasting',
      description: 'Last meal before fasting period'
    });
  } else {
    schedule.push({
      time: formatTime(fastStart),
      activity: 'Begin fasting',
      description: 'Last meal before fasting period'
    });
    schedule.push({
      time: formatTime(fastEnd),
      activity: 'Break fast',
      description: 'First meal of eating window'
    });
    schedule.push({
      time: formatTime(eatEnd),
      activity: 'Complete eating',
      description: 'Prepare for next fasting period'
    });
  }
  
  return schedule.sort((a, b) => a.time.localeCompare(b.time));
};

export const getFastingRecommendations = (method) => {
  const baseRecommendations = [
    'Stay hydrated with water, herbal tea, and black coffee',
    'Break fasts gently with easily digestible foods',
    'Focus on nutrient-dense foods during eating windows',
    'Listen to your body and adjust as needed'
  ];

  const methodSpecific = {
    '16_8': [
      'Perfect for beginners - easiest to maintain',
      'Try to include protein with your first meal',
      'Can be done daily once adapted'
    ],
    '18_6': [
      'Ensure adequate nutrition in shorter eating window',
      'Consider vitamin supplementation',
      'Monitor energy levels during adaptation'
    ],
    '20_4': [
      'Requires experienced faster',
      'Focus heavily on nutrient density',
      'May need electrolyte supplementation'
    ],
    '5_2': [
      'Choose fasting days that fit your schedule',
      'Eat normally on non-fasting days',
      'Focus on protein and vegetables on fasting days'
    ]
  };

  return [...baseRecommendations, ...(methodSpecific[method] || [])];
};

export const getSafetyGuidelines = () => {
  return {
    whoShouldAvoid: [
      'Pregnant or breastfeeding women',
      'Children and teenagers',
      'People with eating disorders',
      'Individuals with diabetes (without medical supervision)',
      'People taking certain medications',
      'Those with a history of gallbladder disease'
    ],
    warningSigns: [
      'Excessive fatigue or weakness',
      'Dizziness or fainting',
      'Severe headaches',
      'Nausea or vomiting',
      'Difficulty concentrating',
      'Irregular menstrual cycles',
      'Hair loss',
      'Sleep disturbances'
    ],
    whenToStopOrAdjust: [
      'If you experience any warning signs',
      'If it negatively impacts your daily life',
      'If you develop obsessive behaviors around food',
      'If you have underlying health conditions'
    ],
    medicalConsultation: [
      'Before starting if you have any health conditions',
      'If taking medications',
      'If planning extended fasts (>24 hours)',
      'If experiencing persistent side effects'
    ]
  };
};

export const getFastingBenefits = () => {
  return [
    {
      category: 'Weight Management',
      benefits: [
        'Caloric restriction and weight loss',
        'Reduced belly fat and visceral fat',
        'Preserved muscle mass during weight loss',
        'Improved body composition'
      ],
      evidence: 'Multiple studies show 3-8% weight loss over 3-24 weeks'
    },
    {
      category: 'Metabolic Health',
      benefits: [
        'Improved insulin sensitivity',
        'Lower blood sugar levels',
        'Reduced inflammation markers',
        'Better cholesterol profiles'
      ],
      evidence: 'Significant improvements in metabolic markers within 8-12 weeks'
    },
    {
      category: 'Cellular Health',
      benefits: [
        'Enhanced autophagy (cellular cleanup)',
        'Increased growth hormone production',
        'Improved cellular stress resistance',
        'Potential longevity benefits'
      ],
      evidence: 'Animal studies and limited human research show promising results'
    },
    {
      category: 'Brain Function',
      benefits: [
        'Enhanced mental clarity and focus',
        'Increased BDNF (brain-derived neurotrophic factor)',
        'Potential neuroprotective effects',
        'Improved cognitive function'
      ],
      evidence: 'Emerging research shows cognitive benefits in various populations'
    }
  ];
};

export const getFastingTips = (method, experience = 'beginner') => {
  const beginnerTips = [
    'Start gradually - begin with 12:12 and work up to your target',
    'Stay busy during fasting hours to avoid thinking about food',
    'Drink plenty of water and allow black coffee/tea',
    'Break fasts with gentle, easily digestible foods',
    'Don\'t overeat during eating windows'
  ];

  const intermediateTips = [
    'Experiment with different eating window timings',
    'Consider light exercise during fasting periods',
    'Monitor your energy levels and adjust as needed',
    'Track your progress and how you feel',
    'Plan nutrient-dense meals for eating windows'
  ];

  const advancedTips = [
    'Combine with other health strategies (exercise, sleep)',
    'Consider cycling different fasting methods',
    'Monitor biomarkers with healthcare provider',
    'Adjust fasting based on stress, sleep, and life events',
    'Consider extended fasts with proper supervision'
  ];

  switch (experience) {
    case 'beginner':
      return beginnerTips;
    case 'intermediate':
      return [...beginnerTips.slice(0, 3), ...intermediateTips];
    case 'advanced':
      return [...intermediateTips, ...advancedTips];
    default:
      return beginnerTips;
  }
};