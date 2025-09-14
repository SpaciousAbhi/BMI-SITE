import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { getBMICategory } from './bmiCalculations';
import { getWorkoutRecommendations } from './workoutRecommendations';

export const generateBMIReport = async (bmiData) => {
  const { bmi, bodyFat, idealWeight, weight, height, age, gender, recommendations, weightUnit, heightUnit } = bmiData;
  const category = getBMICategory(bmi);
  const workouts = getWorkoutRecommendations(bmi, age, gender);

  // Create PDF
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 20;
  let yPosition = margin;

  // Helper function to add text with word wrap
  const addText = (text, fontSize = 12, style = 'normal', maxWidth = pageWidth - 2 * margin) => {
    pdf.setFontSize(fontSize);
    pdf.setFont('helvetica', style);
    
    const lines = pdf.splitTextToSize(text, maxWidth);
    lines.forEach(line => {
      if (yPosition > pageHeight - margin) {
        pdf.addPage();
        yPosition = margin;
      }
      pdf.text(line, margin, yPosition);
      yPosition += fontSize * 0.4;
    });
    yPosition += 5; // Add some spacing after text block
  };

  // Helper function to add section header
  const addSectionHeader = (title, fontSize = 16) => {
    yPosition += 10;
    pdf.setFillColor(59, 130, 246); // Blue color
    pdf.rect(margin, yPosition - 8, pageWidth - 2 * margin, 10, 'F');
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(fontSize);
    pdf.setFont('helvetica', 'bold');
    pdf.text(title, margin + 5, yPosition);
    pdf.setTextColor(0, 0, 0);
    yPosition += 15;
  };

  // Helper function to create BMI chart
  const createBMIChart = () => {
    const chartY = yPosition;
    const chartHeight = 30;
    const chartWidth = pageWidth - 2 * margin;
    
    // BMI ranges
    const ranges = [
      { min: 0, max: 18.5, color: [135, 206, 235], label: 'Underweight' },
      { min: 18.5, max: 25, color: [144, 238, 144], label: 'Normal' },
      { min: 25, max: 30, color: [255, 255, 0], label: 'Overweight' },
      { min: 30, max: 35, color: [255, 165, 0], label: 'Obese I' },
      { min: 35, max: 40, color: [255, 99, 71], label: 'Obese II' },
      { min: 40, max: 50, color: [220, 20, 60], label: 'Obese III' }
    ];

    // Draw chart background
    pdf.setFillColor(245, 245, 245);
    pdf.rect(margin, chartY, chartWidth, chartHeight, 'F');

    // Draw BMI ranges
    let currentX = margin;
    ranges.forEach(range => {
      const rangeWidth = (chartWidth * (range.max - range.min)) / 50;
      pdf.setFillColor(range.color[0], range.color[1], range.color[2]);
      pdf.rect(currentX, chartY, rangeWidth, chartHeight, 'F');
      
      // Add range labels
      pdf.setFontSize(8);
      pdf.setTextColor(0, 0, 0);
      pdf.text(range.label, currentX + 2, chartY + 15);
      pdf.text(`${range.min}-${range.max}`, currentX + 2, chartY + 22);
      
      currentX += rangeWidth;
    });

    // Mark user's BMI
    const userBMIPosition = margin + (chartWidth * Math.min(bmi, 50)) / 50;
    pdf.setFillColor(255, 0, 0);
    pdf.circle(userBMIPosition, chartY + chartHeight/2, 3, 'F');
    
    // Add BMI value label
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'bold');
    pdf.text(`Your BMI: ${bmi}`, userBMIPosition - 15, chartY - 5);

    yPosition = chartY + chartHeight + 20;
  };

  // Title Page
  pdf.setFontSize(24);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(59, 130, 246);
  pdf.text('BMI Health & Fitness Report', pageWidth/2, 40, { align: 'center' });

  pdf.setFontSize(16);
  pdf.setTextColor(100, 100, 100);
  pdf.text('Personalized Health Analysis & Workout Plan', pageWidth/2, 55, { align: 'center' });

  // Add date
  pdf.setFontSize(12);
  pdf.setTextColor(0, 0, 0);
  pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, pageWidth/2, 70, { align: 'center' });

  yPosition = 90;

  // Personal Information Section
  addSectionHeader('Personal Information');
  addText(`Age: ${age} years`, 12, 'normal');
  addText(`Gender: ${gender.charAt(0).toUpperCase() + gender.slice(1)}`, 12, 'normal');
  addText(`Height: ${height} ${heightUnit}`, 12, 'normal');
  addText(`Weight: ${weight} ${weightUnit}`, 12, 'normal');

  // BMI Results Section
  addSectionHeader('BMI Analysis Results');
  addText(`BMI Score: ${bmi}`, 14, 'bold');
  addText(`Category: ${category.category}`, 12, 'normal');
  addText(`Body Fat Percentage: ${bodyFat}%`, 12, 'normal');
  addText(`Ideal Weight: ${idealWeight.toFixed(1)} ${weightUnit}`, 12, 'normal');
  
  const weightDifference = Math.abs(weight - idealWeight).toFixed(1);
  const weightStatus = weight > idealWeight ? 'above' : weight < idealWeight ? 'below' : 'at';
  addText(`Weight Status: ${weightDifference} ${weightUnit} ${weightStatus} ideal weight`, 12, 'normal');

  // BMI Chart
  yPosition += 10;
  addText('BMI Category Chart:', 14, 'bold');
  createBMIChart();

  // Health Recommendations Section
  addSectionHeader('Health Recommendations');
  recommendations.forEach((rec, index) => {
    addText(`${index + 1}. ${rec.title}`, 12, 'bold');
    addText(`   ${rec.description}`, 11, 'normal');
    addText(`   Priority: ${rec.priority.toUpperCase()}`, 10, 'italic');
    yPosition += 3;
  });

  // Workout Plan Section
  addSectionHeader('Personalized Workout Plan');
  workouts.forEach((workout, workoutIndex) => {
    addText(`${workout.category}`, 14, 'bold');
    addText(`Frequency: ${workout.frequency}`, 11, 'normal');
    addText(`Duration: ${workout.duration}`, 11, 'normal');
    addText(`Intensity: ${workout.intensity}`, 11, 'normal');
    
    yPosition += 5;
    addText('Exercises:', 12, 'bold');
    
    workout.exercises.forEach((exercise, exerciseIndex) => {
      addText(`• ${exercise.name}`, 11, 'bold');
      addText(`  Sets: ${exercise.sets} | Reps: ${exercise.reps}`, 10, 'normal');
      addText(`  ${exercise.description}`, 10, 'italic');
      yPosition += 2;
    });

    yPosition += 5;
    addText('Tips for Success:', 12, 'bold');
    workout.tips.forEach(tip => {
      addText(`• ${tip}`, 10, 'normal');
    });
    
    yPosition += 10;
  });

  // Weekly Schedule
  addSectionHeader('Weekly Workout Schedule');
  const schedule = {
    Monday: workouts[0] ? [{ category: workouts[0].category, duration: workouts[0].duration }] : [],
    Tuesday: workouts[1] ? [{ category: workouts[1].category, duration: workouts[1].duration }] : [],
    Wednesday: workouts[0] ? [{ category: workouts[0].category, duration: workouts[0].duration }] : [],
    Thursday: workouts[1] ? [{ category: workouts[1].category, duration: workouts[1].duration }] : [],
    Friday: workouts[0] ? [{ category: workouts[0].category, duration: workouts[0].duration }] : [],
    Saturday: workouts[1] ? [{ category: workouts[1].category, duration: workouts[1].duration }] : [],
    Sunday: []
  };

  Object.entries(schedule).forEach(([day, activities]) => {
    addText(`${day}:`, 12, 'bold');
    if (activities.length > 0) {
      activities.forEach(activity => {
        addText(`  • ${activity.category} (${activity.duration})`, 11, 'normal');
      });
    } else {
      addText('  • Rest Day', 11, 'italic');
    }
  });

  // Progress Tracking Section
  addSectionHeader('4-Week Progress Plan');
  const progressPlan = [
    { week: 1, target: 'Build routine consistency', focus: 'Form and technique' },
    { week: 2, target: 'Increase duration by 10%', focus: 'Endurance building' },
    { week: 3, target: 'Add intensity variations', focus: 'Progressive overload' },
    { week: 4, target: 'Full routine mastery', focus: 'Assessment and adjustment' }
  ];

  progressPlan.forEach(week => {
    addText(`Week ${week.week}:`, 12, 'bold');
    addText(`  Target: ${week.target}`, 11, 'normal');
    addText(`  Focus: ${week.focus}`, 11, 'normal');
    yPosition += 3;
  });

  // Important Notes Section
  addSectionHeader('Important Notes & Disclaimers');
  addText('• Consult with a healthcare provider before starting any new exercise program', 11, 'normal');
  addText('• Listen to your body and adjust intensity as needed', 11, 'normal');
  addText('• Stay hydrated and maintain proper nutrition', 11, 'normal');
  addText('• This report is for informational purposes only and should not replace professional medical advice', 11, 'normal');
  addText('• BMI calculations may not be accurate for athletes, pregnant women, or individuals with certain medical conditions', 11, 'normal');

  // Footer
  yPosition = pageHeight - 30;
  pdf.setFontSize(10);
  pdf.setTextColor(100, 100, 100);
  pdf.text('Generated by BMI Calculator Pro', pageWidth/2, yPosition, { align: 'center' });
  pdf.text(`Page ${pdf.internal.getNumberOfPages()}`, pageWidth/2, yPosition + 10, { align: 'center' });

  // Save the PDF
  const fileName = `BMI_Report_${new Date().toISOString().split('T')[0]}.pdf`;
  pdf.save(fileName);
  
  return fileName;
};

export const generateWorkoutCard = async (elementId) => {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error('Element not found');
    }

    const canvas = await html2canvas(element, {
      backgroundColor: '#ffffff',
      scale: 2,
      useCORS: true,
      allowTaint: true
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    const imgWidth = 210;
    const pageHeight = 295;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    const fileName = `Workout_Plan_${new Date().toISOString().split('T')[0]}.pdf`;
    pdf.save(fileName);
    
    return fileName;
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};