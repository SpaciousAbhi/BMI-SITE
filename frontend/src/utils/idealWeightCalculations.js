// Ideal Weight Calculator Utilities
// Uses multiple formulas for comprehensive ideal weight assessment

// Hamwi Formula (1964) - Most commonly used
export const calculateHamwiIdealWeight = (height, gender, units = 'metric') => {
  let heightInches;
  
  if (units === 'metric') {
    heightInches = height / 2.54; // Convert cm to inches
  } else {
    heightInches = height; // Already in inches
  }
  
  let baseWeight, perInch;
  
  if (gender === 'male') {
    baseWeight = 106; // lbs for 5 feet
    perInch = 6; // lbs per inch over 5 feet
  } else {
    baseWeight = 100; // lbs for 5 feet
    perInch = 5; // lbs per inch over 5 feet
  }
  
  const idealWeightLbs = baseWeight + (heightInches - 60) * perInch;
  
  if (units === 'metric') {
    return Math.round(idealWeightLbs * 0.453592 * 10) / 10; // Convert to kg with 1 decimal
  }
  
  return Math.round(idealWeightLbs);
};

// Robinson Formula (1983) - Updated version of Hamwi
export const calculateRobinsonIdealWeight = (height, gender, units = 'metric') => {
  let heightInches;
  
  if (units === 'metric') {
    heightInches = height / 2.54;
  } else {
    heightInches = height;
  }
  
  let baseWeight, perInch;
  
  if (gender === 'male') {
    baseWeight = 52; // kg for 5 feet
    perInch = 1.9; // kg per inch over 5 feet
  } else {
    baseWeight = 49; // kg for 5 feet
    perInch = 1.7; // kg per inch over 5 feet
  }
  
  const idealWeightKg = baseWeight + (heightInches - 60) * perInch;
  
  if (units === 'metric') {
    return Math.round(idealWeightKg * 10) / 10;
  }
  
  return Math.round(idealWeightKg * 2.20462); // Convert to lbs
};

// Miller Formula (1983)
export const calculateMillerIdealWeight = (height, gender, units = 'metric') => {
  let heightInches;
  
  if (units === 'metric') {
    heightInches = height / 2.54;
  } else {
    heightInches = height;
  }
  
  let baseWeight, perInch;
  
  if (gender === 'male') {
    baseWeight = 56.2; // kg for 5 feet
    perInch = 1.41; // kg per inch over 5 feet
  } else {
    baseWeight = 53.1; // kg for 5 feet
    perInch = 1.36; // kg per inch over 5 feet
  }
  
  const idealWeightKg = baseWeight + (heightInches - 60) * perInch;
  
  if (units === 'metric') {
    return Math.round(idealWeightKg * 10) / 10;
  }
  
  return Math.round(idealWeightKg * 2.20462);
};

// Devine Formula (1974) - Used in medical settings
export const calculateDevineIdealWeight = (height, gender, units = 'metric') => {
  let heightInches;
  
  if (units === 'metric') {
    heightInches = height / 2.54;
  } else {
    heightInches = height;
  }
  
  let baseWeight, perInch;
  
  if (gender === 'male') {
    baseWeight = 50; // kg for 5 feet
    perInch = 2.3; // kg per inch over 5 feet
  } else {
    baseWeight = 45.5; // kg for 5 feet
    perInch = 2.3; // kg per inch over 5 feet
  }
  
  const idealWeightKg = baseWeight + (heightInches - 60) * perInch;
  
  if (units === 'metric') {
    return Math.round(idealWeightKg * 10) / 10;
  }
  
  return Math.round(idealWeightKg * 2.20462);
};

// BMI-based healthy weight range (18.5-24.9 BMI)
export const calculateHealthyWeightRange = (height, units = 'metric') => {
  let heightM;
  
  if (units === 'metric') {
    heightM = height / 100; // Convert cm to meters
  } else {
    heightM = (height * 12) * 0.0254; // Convert feet to meters (height in feet)
  }
  
  const minHealthyWeight = 18.5 * heightM * heightM;
  const maxHealthyWeight = 24.9 * heightM * heightM;
  
  if (units === 'metric') {
    return {
      min: Math.round(minHealthyWeight * 10) / 10,
      max: Math.round(maxHealthyWeight * 10) / 10
    };
  }
  
  return {
    min: Math.round(minHealthyWeight * 2.20462),
    max: Math.round(maxHealthyWeight * 2.20462)
  };
};

// Calculate comprehensive ideal weight analysis
export const calculateIdealWeightAnalysis = (height, gender, currentWeight, age, units = 'metric') => {
  const hamwi = calculateHamwiIdealWeight(height, gender, units);
  const robinson = calculateRobinsonIdealWeight(height, gender, units);
  const miller = calculateMillerIdealWeight(height, gender, units);
  const devine = calculateDevineIdealWeight(height, gender, units);
  const healthyRange = calculateHealthyWeightRange(height, units);
  
  // Calculate average of all formulas
  const average = Math.round(((hamwi + robinson + miller + devine) / 4) * 10) / 10;
  
  // Determine weight status relative to ideal
  const weightDifference = currentWeight - average;
  const percentageDifference = Math.round((weightDifference / average) * 100);
  
  let status, recommendation, color;
  
  if (currentWeight < healthyRange.min) {
    status = 'Underweight';
    color = 'blue';
    recommendation = `Consider gaining ${Math.round((healthyRange.min - currentWeight) * 10) / 10} ${units === 'metric' ? 'kg' : 'lbs'} to reach a healthy weight range.`;
  } else if (currentWeight > healthyRange.max) {
    status = 'Above Healthy Range';
    color = 'orange';
    recommendation = `Consider losing ${Math.round((currentWeight - healthyRange.max) * 10) / 10} ${units === 'metric' ? 'kg' : 'lbs'} to reach a healthy weight range.`;
  } else {
    status = 'Within Healthy Range';
    color = 'green';
    recommendation = 'Your weight is within the healthy range. Maintain your current lifestyle for optimal health.';
  }
  
  return {
    formulas: {
      hamwi,
      robinson,
      miller,
      devine,
      average
    },
    healthyRange,
    analysis: {
      currentWeight,
      idealWeight: average,
      difference: weightDifference,
      percentageDifference,
      status,
      color,
      recommendation
    },
    units
  };
};

// Get age-adjusted recommendations
export const getAgeAdjustedRecommendations = (age, gender, idealWeight, currentWeight, units) => {
  let ageGroup, adjustments, considerations;
  
  if (age < 25) {
    ageGroup = 'Young Adult (18-24)';
    adjustments = 'Metabolism is typically high. Focus on building healthy habits.';
    considerations = [
      'Higher caloric needs due to active metabolism',
      'Excellent time to establish exercise routines',
      'Body composition still developing'
    ];
  } else if (age < 35) {
    ageGroup = 'Adult (25-34)';
    adjustments = 'Prime metabolic years. Maintain consistent lifestyle.';
    considerations = [
      'Metabolism begins to slow slightly',
      'Career stress may affect eating patterns',
      'Ideal time for strength training'
    ];
  } else if (age < 50) {
    ageGroup = 'Middle Adult (35-49)';
    adjustments = 'Metabolism slowing. May need slight calorie reduction.';
    considerations = [
      'Hormonal changes may affect weight distribution',
      'Muscle mass naturally decreases without exercise',
      'Stress and time constraints may impact health habits'
    ];
  } else if (age < 65) {
    ageGroup = 'Mature Adult (50-64)';
    adjustments = 'Focus on maintaining muscle mass. Weight stability important.';
    considerations = [
      'Hormonal changes (menopause/andropause) affect metabolism',
      'Bone health becomes increasingly important',
      'Risk of chronic diseases increases'
    ];
  } else {
    ageGroup = 'Senior Adult (65+)';
    adjustments = 'Slightly higher BMI may be protective. Focus on nutrition quality.';
    considerations = [
      'Muscle mass preservation is critical',
      'Adequate protein intake essential',
      'Weight loss should be gradual and supervised'
    ];
  }
  
  return {
    ageGroup,
    adjustments,
    considerations
  };
};

// Format ideal weight results for display
export const formatIdealWeightResults = (analysis, age, gender) => {
  const ageRecommendations = getAgeAdjustedRecommendations(age, gender, analysis.formulas.average, analysis.analysis.currentWeight, analysis.units);
  
  return {
    ...analysis,
    ageRecommendations,
    summary: {
      primaryRecommendation: analysis.analysis.recommendation,
      idealWeightRange: `${analysis.healthyRange.min} - ${analysis.healthyRange.max} ${analysis.units === 'metric' ? 'kg' : 'lbs'}`,
      bestEstimate: analysis.formulas.average,
      weightStatus: analysis.analysis.status
    }
  };
};