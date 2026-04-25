#!/usr/bin/env node

/**
 * ToxicTools CLI - Premium Health Calculators
 * This CLI provides the same calculation logic as https://toxictools.in
 * 
 * Usage: node toxic-cli.js
 */

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  cyan: "\x1b[36m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  red: "\x1b[31m",
  magenta: "\x1b[35m",
  blue: "\x1b[34m",
  white: "\x1b[37m",
  dim: "\x1b[2m",
};

function header() {
  console.clear();
  console.log(`\n${colors.cyan}${colors.bright}========================================`);
  console.log(`    TOXIC TOOLS - HEALTH CALCULATOR    `);
  console.log(`      Premium Diagnostic Terminal      `);
  console.log(`========================================${colors.reset}\n`);
}

async function ask(question) {
  return new Promise((resolve) => {
    rl.question(`${colors.bright}${question}${colors.reset}`, (answer) => {
      resolve(answer.trim());
    });
  });
}

function calculateBMI(weight, height, weightUnit, heightUnit, feet = 0, inches = 0) {
  let weightKg = parseFloat(weight);
  if (weightUnit === 'lbs') weightKg = weightKg * 0.453592;

  let heightM = 0;
  if (heightUnit === 'cm') {
    heightM = parseFloat(height) / 100;
  } else if (heightUnit === 'ft') {
    heightM = (parseFloat(feet) * 30.48 + parseFloat(inches) * 2.54) / 100;
  }

  const bmi = weightKg / (heightM * heightM);
  let category = '';
  let color = colors.green;

  if (bmi < 18.5) {
    category = 'Underweight';
    color = colors.yellow;
  } else if (bmi < 25) {
    category = 'Normal weight';
    color = colors.green;
  } else if (bmi < 30) {
    category = 'Overweight';
    color = colors.yellow;
  } else {
    category = 'Obese';
    color = colors.red;
  }

  return { bmi: bmi.toFixed(1), category, color };
}

function calculateBMR(weight, height, age, gender, weightUnit, heightUnit, feet = 0, inches = 0) {
  let weightKg = parseFloat(weight);
  if (weightUnit === 'lbs') weightKg = weightKg * 0.453592;

  let heightCm = 0;
  if (heightUnit === 'cm') {
    heightCm = parseFloat(height);
  } else if (heightUnit === 'ft') {
    heightCm = (parseFloat(feet) * 30.48 + parseFloat(inches) * 2.54);
  }

  // Mifflin-St Jeor Equation
  let bmr = (10 * weightKg) + (6.25 * heightCm) - (5 * parseInt(age));
  bmr = gender.toLowerCase() === 'male' ? bmr + 5 : bmr - 161;

  return Math.round(bmr);
}

async function runBMICalculator() {
  console.log(`${colors.magenta}--- BMI Protocol ---${colors.reset}\n`);
  
  const unitSystem = await ask("Choose units: (1) Metric [kg/cm] (2) Imperial [lbs/ft-in]: ");
  const isMetric = unitSystem === '1' || unitSystem.toLowerCase() === 'metric';

  let weight, height, feet = 0, inches = 0;
  const weightUnit = isMetric ? 'kg' : 'lbs';
  const heightUnit = isMetric ? 'cm' : 'ft';

  if (isMetric) {
    weight = await ask("Enter weight (kg): ");
    height = await ask("Enter height (cm): ");
  } else {
    weight = await ask("Enter weight (lbs): ");
    feet = await ask("Enter height (feet): ");
    inches = await ask("Enter height (inches): ");
  }

  const age = await ask("Enter age: ");
  const gender = await ask("Enter gender (male/female): ");

  if (!weight || (isMetric ? !height : (!feet && inches === "")) || !age || !gender) {
    console.log(`\n${colors.red}Error: Incomplete data.${colors.reset}`);
    return;
  }

  const result = calculateBMI(weight, height, weightUnit, heightUnit, feet, inches);

  console.log(`\n${colors.bright}Result Analytics:${colors.reset}`);
  console.log(`- Your BMI: ${colors.cyan}${result.bmi}${colors.reset}`);
  console.log(`- Category: ${result.color}${result.category}${colors.reset}\n`);
  
  const bmr = calculateBMR(weight, height, age, gender, weightUnit, heightUnit, feet, inches);
  console.log(`- Est. BMR: ${colors.magenta}${bmr} kcal/day${colors.reset}`);
  console.log(`- Sedentary TDEE: ${colors.yellow}${Math.round(bmr * 1.2)} kcal/day${colors.reset}\n`);
}

async function runBMRCalculator() {
  console.log(`${colors.magenta}--- BMR Prophet Protocol ---${colors.reset}\n`);
  
  const gender = await ask("Gender (male/female): ");
  const age = await ask("Age: ");
  const weight = await ask("Weight (kg): ");
  const height = await ask("Height (cm): ");

  if (!weight || !height || !age || !gender) {
    console.log(`\n${colors.red}Error: Incomplete data.${colors.reset}`);
    return;
  }

  const bmr = calculateBMR(weight, height, age, gender, 'kg', 'cm');
  
  console.log(`\n${colors.bright}Metabolic Breakdown:${colors.reset}`);
  console.log(`- Basal Metabolic Rate: ${colors.magenta}${bmr} calories/day${colors.reset}`);
  console.log(`${colors.dim}This is the energy your body burns at rest.${colors.reset}\n`);
  
  console.log(`${colors.bright}Daily Maintenance Estimates (TDEE):${colors.reset}`);
  console.log(`- Sedentary:    ${colors.yellow}${Math.round(bmr * 1.2)}${colors.reset} kcal`);
  console.log(`- Light Active: ${colors.green}${Math.round(bmr * 1.375)}${colors.reset} kcal`);
  console.log(`- Moderate:     ${colors.cyan}${Math.round(bmr * 1.55)}${colors.reset} kcal`);
  console.log(`- Very Active:  ${colors.blue}${Math.round(bmr * 1.725)}${colors.reset} kcal\n`);
}

async function main() {
  while (true) {
    header();
    console.log(`${colors.white}Choose a Diagnostic Protocol:${colors.reset}`);
    console.log(`1. BMI Analysis (Body Mass Index)`);
    console.log(`2. BMR Prophet (Metabolic Rate)`);
    console.log(`3. Exit\n`);

    const choice = await ask("Select (1-3): ");

    if (choice === '1') {
      header();
      await runBMICalculator();
      await ask("\nPress Enter to return to menu...");
    } else if (choice === '2') {
      header();
      await runBMRCalculator();
      await ask("\nPress Enter to return to menu...");
    } else if (choice === '3') {
      console.log(`\n${colors.cyan}Thank you for using ToxicTools. Stay healthy!${colors.reset}\n`);
      rl.close();
      break;
    }
  }
}

main();
