// Workout recommendations based on BMI categories

export const getWorkoutRecommendations = (bmi, age, gender) => {
  const category = getBMICategory(bmi);
  let workouts = [];

  // Base recommendations by BMI category
  if (bmi < 18.5) {
    // Underweight - Focus on muscle building
    workouts = [
      {
        category: 'Strength Training',
        frequency: '4-5 times per week',
        duration: '45-60 minutes',
        intensity: 'Moderate to High',
        exercises: [
          { name: 'Push-ups', sets: '3-4', reps: '8-12', description: 'Build upper body strength' },
          { name: 'Squats', sets: '3-4', reps: '10-15', description: 'Strengthen lower body and core' },
          { name: 'Pull-ups/Assisted Pull-ups', sets: '3', reps: '5-10', description: 'Build back and arm muscles' },
          { name: 'Planks', sets: '3', reps: '30-60 seconds', description: 'Core strengthening' },
          { name: 'Deadlifts (bodyweight/light weights)', sets: '3', reps: '8-12', description: 'Full body strength' }
        ],
        tips: [
          'Focus on progressive overload - gradually increase difficulty',
          'Eat protein-rich meals before and after workouts',
          'Allow adequate rest between sessions for muscle recovery',
          'Consider compound movements that work multiple muscle groups'
        ]
      },
      {
        category: 'Resistance Training',
        frequency: '3-4 times per week',
        duration: '30-45 minutes',
        intensity: 'Moderate',
        exercises: [
          { name: 'Resistance Band Exercises', sets: '3', reps: '12-15', description: 'Low-impact muscle building' },
          { name: 'Dumbbell Curls', sets: '3', reps: '10-12', description: 'Arm muscle development' },
          { name: 'Lunges', sets: '3', reps: '10 each leg', description: 'Leg and glute strengthening' },
          { name: 'Shoulder Press', sets: '3', reps: '8-12', description: 'Upper body strength' }
        ],
        tips: [
          'Start with lighter weights and focus on proper form',
          'Increase weight gradually as you get stronger',
          'Track your progress to stay motivated'
        ]
      }
    ];
  } else if (bmi >= 18.5 && bmi < 25) {
    // Normal weight - Maintenance and general fitness
    workouts = [
      {
        category: 'Balanced Fitness',
        frequency: '4-5 times per week',
        duration: '45-60 minutes',
        intensity: 'Moderate',
        exercises: [
          { name: 'Running/Jogging', sets: '1', reps: '20-30 minutes', description: 'Cardiovascular health' },
          { name: 'Strength Training', sets: '3', reps: '8-12', description: 'Maintain muscle mass' },
          { name: 'Yoga/Stretching', sets: '1', reps: '15-20 minutes', description: 'Flexibility and recovery' },
          { name: 'Swimming', sets: '1', reps: '30-45 minutes', description: 'Full body low-impact exercise' },
          { name: 'Cycling', sets: '1', reps: '30-60 minutes', description: 'Leg strength and cardio' }
        ],
        tips: [
          'Mix cardio and strength training for balanced fitness',
          'Try different activities to stay engaged',
          'Listen to your body and adjust intensity as needed',
          'Maintain consistency rather than intensity'
        ]
      },
      {
        category: 'Functional Training',
        frequency: '3-4 times per week',
        duration: '30-45 minutes',
        intensity: 'Moderate',
        exercises: [
          { name: 'Burpees', sets: '3', reps: '8-12', description: 'Full body conditioning' },
          { name: 'Mountain Climbers', sets: '3', reps: '20-30', description: 'Core and cardio' },
          { name: 'Kettlebell Swings', sets: '3', reps: '15-20', description: 'Power development' },
          { name: 'Box Jumps', sets: '3', reps: '8-12', description: 'Explosive leg power' }
        ],
        tips: [
          'Focus on movement quality over quantity',
          'Incorporate variety to prevent boredom',
          'Challenge yourself progressively'
        ]
      }
    ];
  } else if (bmi >= 25 && bmi < 30) {
    // Overweight - Focus on cardio and weight loss
    workouts = [
      {
        category: 'Cardio Focus',
        frequency: '5-6 times per week',
        duration: '45-60 minutes',
        intensity: 'Moderate to High',
        exercises: [
          { name: 'Brisk Walking', sets: '1', reps: '45-60 minutes', description: 'Low-impact fat burning' },
          { name: 'Cycling', sets: '1', reps: '30-45 minutes', description: 'Joint-friendly cardio' },
          { name: 'Swimming', sets: '1', reps: '30-45 minutes', description: 'Full body low-impact workout' },
          { name: 'Elliptical Training', sets: '1', reps: '30-40 minutes', description: 'Low-impact high-intensity cardio' },
          { name: 'Dancing/Zumba', sets: '1', reps: '45-60 minutes', description: 'Fun cardio workout' }
        ],
        tips: [
          'Start slowly and gradually increase intensity',
          'Stay hydrated throughout workouts',
          'Choose activities you enjoy for long-term success',
          'Monitor heart rate to stay in fat-burning zone'
        ]
      },
      {
        category: 'Strength & Cardio Combo',
        frequency: '3-4 times per week',
        duration: '40-50 minutes',
        intensity: 'Moderate',
        exercises: [
          { name: 'Circuit Training', sets: '3-4', reps: '45 seconds work, 15 seconds rest', description: 'Combines strength and cardio' },
          { name: 'Bodyweight Squats', sets: '3', reps: '12-15', description: 'Lower body strength' },
          { name: 'Modified Push-ups', sets: '3', reps: '8-12', description: 'Upper body strength' },
          { name: 'Step-ups', sets: '3', reps: '10 each leg', description: 'Leg strength and cardio' }
        ],
        tips: [
          'Keep rest periods short to maintain heart rate',
          'Focus on proper form to prevent injury',
          'Combine with healthy eating for best results'
        ]
      }
    ];
  } else {
    // Obese (BMI >= 30) - Low-impact focus
    workouts = [
      {
        category: 'Low-Impact Cardio',
        frequency: '5-6 times per week',
        duration: '30-45 minutes',
        intensity: 'Low to Moderate',
        exercises: [
          { name: 'Water Walking/Swimming', sets: '1', reps: '30-45 minutes', description: 'Joint-friendly full body workout' },
          { name: 'Seated Exercise', sets: '3', reps: '10-15', description: 'Upper body and core strengthening' },
          { name: 'Gentle Walking', sets: '1', reps: '20-30 minutes', description: 'Start building endurance' },
          { name: 'Chair Yoga', sets: '1', reps: '20-30 minutes', description: 'Flexibility and gentle movement' },
          { name: 'Stationary Bike (recumbent)', sets: '1', reps: '20-30 minutes', description: 'Low-impact leg exercise' }
        ],
        tips: [
          'Start with short sessions and gradually increase duration',
          'Focus on consistency over intensity',
          'Listen to your body and rest when needed',
          'Consult with healthcare provider before starting',
          'Choose exercises that don\'t stress joints'
        ]
      },
      {
        category: 'Gentle Strength Training',
        frequency: '2-3 times per week',
        duration: '20-30 minutes',
        intensity: 'Low',
        exercises: [
          { name: 'Wall Push-ups', sets: '2-3', reps: '5-10', description: 'Gentle upper body strengthening' },
          { name: 'Seated Leg Extensions', sets: '2-3', reps: '8-12', description: 'Quadriceps strengthening' },
          { name: 'Arm Circles', sets: '2-3', reps: '10-15', description: 'Shoulder mobility and strength' },
          { name: 'Seated Marching', sets: '2-3', reps: '20-30', description: 'Core and leg activation' }
        ],
        tips: [
          'Use light weights or no weights initially',
          'Focus on range of motion and control',
          'Progress very gradually to avoid injury',
          'Consider working with a qualified trainer'
        ]
      }
    ];
  }

  // Add age-specific modifications
  if (age > 65) {
    workouts.forEach(workout => {
      workout.tips.push('Include balance exercises to prevent falls');
      workout.tips.push('Warm up thoroughly before exercising');
      workout.tips.push('Cool down with gentle stretching');
    });
  } else if (age > 40) {
    workouts.forEach(workout => {
      workout.tips.push('Pay extra attention to recovery time');
      workout.tips.push('Include flexibility exercises in your routine');
    });
  }

  return workouts;
};

export const getBMICategory = (bmi) => {
  if (bmi < 18.5) return { category: 'Underweight', color: 'text-blue-600', bgColor: 'bg-blue-50' };
  if (bmi < 25) return { category: 'Normal weight', color: 'text-green-600', bgColor: 'bg-green-50' };
  if (bmi < 30) return { category: 'Overweight', color: 'text-yellow-600', bgColor: 'bg-yellow-50' };
  if (bmi < 35) return { category: 'Obesity Class 1', color: 'text-orange-600', bgColor: 'bg-orange-50' };
  if (bmi < 40) return { category: 'Obesity Class 2', color: 'text-red-600', bgColor: 'bg-red-50' };
  return { category: 'Obesity Class 3', color: 'text-red-800', bgColor: 'bg-red-100' };
};

export const getWeeklySchedule = (workouts) => {
  const schedule = {
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: []
  };

  workouts.forEach((workout, index) => {
    const days = ['Monday', 'Wednesday', 'Friday', 'Tuesday', 'Thursday', 'Saturday'];
    const frequency = parseInt(workout.frequency);
    
    for (let i = 0; i < Math.min(frequency, 6); i++) {
      if (days[i] && schedule[days[i]]) {
        schedule[days[i]].push({
          category: workout.category,
          duration: workout.duration,
          intensity: workout.intensity
        });
      }
    }
  });

  return schedule;
};

export const getProgressTracker = () => {
  return {
    week1: { target: 'Build routine consistency', focus: 'Form and technique' },
    week2: { target: 'Increase duration by 10%', focus: 'Endurance building' },
    week3: { target: 'Add intensity variations', focus: 'Progressive overload' },
    week4: { target: 'Full routine mastery', focus: 'Assessment and adjustment' },
  };
};