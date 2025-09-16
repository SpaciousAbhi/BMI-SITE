// Body Surface Area (BSA) Calculator Utilities
// Used in medical settings for dosing calculations and research

// DuBois Formula (1916) - Most commonly used
export const calculateDuBoisBSA = (weight, height, units = 'metric') => {
  let weightKg, heightCm;
  
  if (units === 'metric') {
    weightKg = weight;
    heightCm = height;
  } else {
    weightKg = weight * 0.453592; // Convert lbs to kg
    heightCm = height * 2.54; // Convert inches to cm
  }
  
  const bsa = 0.007184 * Math.pow(weightKg, 0.425) * Math.pow(heightCm, 0.725);
  return Math.round(bsa * 1000) / 1000; // Round to 3 decimal places
};

// Mosteller Formula (1987) - Simpler and widely used
export const calculateMostellerBSA = (weight, height, units = 'metric') => {
  let weightKg, heightCm;
  
  if (units === 'metric') {
    weightKg = weight;
    heightCm = height;
  } else {
    weightKg = weight * 0.453592;
    heightCm = height * 2.54;
  }
  
  const bsa = Math.sqrt((weightKg * heightCm) / 3600);
  return Math.round(bsa * 1000) / 1000;
};

// Haycock Formula (1978) - Good for children and adults
export const calculateHaycockBSA = (weight, height, units = 'metric') => {
  let weightKg, heightCm;
  
  if (units === 'metric') {
    weightKg = weight;
    heightCm = height;
  } else {
    weightKg = weight * 0.453592;
    heightCm = height * 2.54;
  }
  
  const bsa = 0.024265 * Math.pow(weightKg, 0.5378) * Math.pow(heightCm, 0.3964);
  return Math.round(bsa * 1000) / 1000;
};

// Gehan and George Formula (1970) - Good for children
export const calculateGehanGeorgeBSA = (weight, height, units = 'metric') => {
  let weightKg, heightCm;
  
  if (units === 'metric') {
    weightKg = weight;
    heightCm = height;
  } else {
    weightKg = weight * 0.453592;
    heightCm = height * 2.54;
  }
  
  const bsa = 0.0235 * Math.pow(weightKg, 0.51456) * Math.pow(heightCm, 0.42246);
  return Math.round(bsa * 1000) / 1000;
};

// Boyd Formula (1935) - Historical formula
export const calculateBoydBSA = (weight, height, units = 'metric') => {
  let weightKg, heightCm;
  
  if (units === 'metric') {
    weightKg = weight;
    heightCm = height;
  } else {
    weightKg = weight * 0.453592;
    heightCm = height * 2.54;
  }
  
  const bsa = 0.0003207 * Math.pow(weightKg * 1000, 0.7285 - 0.0188 * Math.log10(weightKg * 1000)) * Math.pow(heightCm, 0.3);
  return Math.round(bsa * 1000) / 1000;
};

// Get BSA category and normal ranges
export const getBSACategory = (bsa, age, gender) => {
  let category, description, normalRange;
  
  // Normal BSA ranges by age and gender
  if (age < 18) {
    normalRange = '0.5 - 1.8 m²';
    if (bsa < 0.5) {
      category = 'Very Small';
      description = 'Below normal range for age. May indicate growth or developmental concerns.';
    } else if (bsa <= 1.8) {
      category = 'Normal for Age';
      description = 'Body surface area is within normal range for children/adolescents.';
    } else {
      category = 'Large for Age';
      description = 'Above normal range for age. May indicate rapid growth or obesity.';
    }
  } else {
    // Adult ranges
    if (gender === 'male') {
      normalRange = '1.6 - 2.2 m²';
      if (bsa < 1.6) {
        category = 'Small';
        description = 'Below average BSA for adult males. May be due to smaller stature or low body weight.';
      } else if (bsa <= 2.2) {
        category = 'Normal';
        description = 'Body surface area is within normal range for adult males.';
      } else {
        category = 'Large';
        description = 'Above average BSA for adult males. May be due to larger stature or higher body weight.';
      }
    } else {
      normalRange = '1.4 - 2.0 m²';
      if (bsa < 1.4) {
        category = 'Small';
        description = 'Below average BSA for adult females. May be due to smaller stature or low body weight.';
      } else if (bsa <= 2.0) {
        category = 'Normal';
        description = 'Body surface area is within normal range for adult females.';
      } else {
        category = 'Large';
        description = 'Above average BSA for adult females. May be due to larger stature or higher body weight.';
      }
    }
  }
  
  return {
    category,
    description,
    normalRange
  };
};

// Medical applications and dosing information
export const getMedicalApplications = (bsa) => {
  return {
    drugDosing: {
      title: 'Medication Dosing',
      description: 'Many medications, especially chemotherapy drugs, are dosed based on BSA to ensure appropriate therapeutic levels while minimizing toxicity.',
      examples: [
        'Chemotherapy protocols',
        'Some antibiotics',
        'Cardiac medications',
        'Pediatric dosing'
      ]
    },
    burnAssessment: {
      title: 'Burn Assessment',
      description: 'BSA is crucial for calculating the percentage of body surface area affected by burns using the Rule of Nines.',
      applications: [
        'Fluid resuscitation calculations',
        'Burn severity assessment',
        'Treatment planning',
        'Prognosis determination'
      ]
    },
    kidneyFunction: {
      title: 'Kidney Function',
      description: 'Creatinine clearance and glomerular filtration rate are often normalized to BSA for accurate kidney function assessment.',
      uses: [
        'GFR normalization',
        'Kidney disease staging',
        'Dialysis planning',
        'Transplant evaluation'
      ]
    },
    cardiacIndex: {
      title: 'Cardiac Index',
      description: 'Cardiac output is normalized to BSA to calculate cardiac index, providing a better comparison across different body sizes.',
      calculation: `Cardiac Index = Cardiac Output (L/min) ÷ BSA (${bsa} m²)`,
      normalRange: '2.5 - 4.0 L/min/m²'
    }
  };
};

// BSA in different medical specialties
export const getSpecialtyApplications = () => {
  return {
    oncology: {
      title: 'Oncology (Cancer Treatment)',
      description: 'BSA is the gold standard for chemotherapy dosing to balance efficacy and toxicity.',
      considerations: [
        'Most chemotherapy protocols use BSA-based dosing',
        'Helps standardize doses across different body sizes',
        'Reduces under-dosing in larger patients',
        'Prevents over-dosing in smaller patients'
      ]
    },
    pediatrics: {
      title: 'Pediatrics (Children\'s Medicine)',
      description: 'BSA provides more accurate dosing than weight alone for many pediatric medications.',
      advantages: [
        'Better correlation with organ function than weight',
        'More accurate for children of different ages',
        'Reduces dosing errors',
        'Standardizes pediatric protocols'
      ]
    },
    cardiology: {
      title: 'Cardiology (Heart Medicine)',
      description: 'BSA is used to normalize heart function measurements and calculate indices.',
      applications: [
        'Cardiac index calculation',
        'Valve area assessment',
        'Ejection fraction normalization',
        'Cardiac catheterization measurements'
      ]
    },
    nephrology: {
      title: 'Nephrology (Kidney Medicine)',
      description: 'Kidney function tests are normalized to BSA for accurate assessment.',
      uses: [
        'Glomerular filtration rate (GFR)',
        'Creatinine clearance',
        'Dialysis adequacy',
        'Kidney transplant evaluation'
      ]
    }
  };
};

// Formula comparison and accuracy
export const getFormulaComparison = () => {
  return {
    dubois: {
      name: 'DuBois (1916)',
      accuracy: '95%',
      bestFor: 'General adult population',
      advantages: ['Most widely used', 'Well validated', 'Historical standard'],
      limitations: ['Less accurate for extreme body sizes', 'Based on older population data']
    },
    mosteller: {
      name: 'Mosteller (1987)',
      accuracy: '96%',
      bestFor: 'All ages, simplest calculation',
      advantages: ['Simple formula', 'Good accuracy', 'Easy to calculate'],
      limitations: ['May overestimate in obese patients']
    },
    haycock: {
      name: 'Haycock (1978)',
      accuracy: '97%',
      bestFor: 'Children and adults',
      advantages: ['High accuracy', 'Good for wide age range', 'Well validated'],
      limitations: ['More complex calculation']
    },
    gehanGeorge: {
      name: 'Gehan & George (1970)',
      accuracy: '94%',
      bestFor: 'Children and small adults',
      advantages: ['Excellent for pediatrics', 'Good for smaller body sizes'],
      limitations: ['Less accurate for large adults']
    },
    boyd: {
      name: 'Boyd (1935)',
      accuracy: '90%',
      bestFor: 'Historical reference',
      advantages: ['Historical significance', 'Complex modeling'],
      limitations: ['Most complex', 'Lower accuracy', 'Rarely used clinically']
    }
  };
};

// Calculate comprehensive BSA analysis
export const calculateBSAAnalysis = (weight, height, age, gender, units = 'metric') => {
  const formulas = {
    dubois: calculateDuBoisBSA(weight, height, units),
    mosteller: calculateMostellerBSA(weight, height, units),
    haycock: calculateHaycockBSA(weight, height, units),
    gehanGeorge: calculateGehanGeorgeBSA(weight, height, units),
    boyd: calculateBoydBSA(weight, height, units)
  };
  
  // Calculate average (excluding Boyd due to lower accuracy)
  const average = Math.round(((formulas.dubois + formulas.mosteller + formulas.haycock + formulas.gehanGeorge) / 4) * 1000) / 1000;
  
  const category = getBSACategory(average, age, gender);
  const medicalApplications = getMedicalApplications(average);
  const specialtyApplications = getSpecialtyApplications();
  const formulaComparison = getFormulaComparison();
  
  return {
    formulas: {
      ...formulas,
      average
    },
    category,
    medicalApplications,
    specialtyApplications,
    formulaComparison,
    units
  };
};

// Format BSA results for display
export const formatBSAResults = (weight, height, age, gender, units) => {
  const analysis = calculateBSAAnalysis(weight, height, age, gender, units);
  
  return {
    ...analysis,
    summary: {
      primaryBSA: analysis.formulas.average,
      category: analysis.category.category,
      description: analysis.category.description,
      normalRange: analysis.category.normalRange,
      recommendedFormula: age < 18 ? 'Haycock (best for children)' : 'Mosteller (most practical)'
    }
  };
};