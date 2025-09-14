import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Dumbbell, Clock, Target, TrendingUp, User, Calendar } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { useTheme } from '../contexts/ThemeContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WorkoutRecommendations from '../components/WorkoutRecommendations';
import { generateBMIReport } from '../utils/pdfGenerator';
import { useToast } from '../hooks/use-toast';

const WorkoutPage = () => {
  const { theme, getThemeConfig } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const themeConfig = getThemeConfig();
  
  const bmiData = location.state;

  const handleDownloadPDF = async () => {
    if (!bmiData) {
      toast({
        title: "No BMI Data",
        description: "Please calculate your BMI first to generate a personalized report.",
        variant: "destructive",
      });
      return;
    }

    try {
      toast({
        title: "Generating PDF...",
        description: "Please wait while we create your personalized report.",
      });

      const fileName = await generateBMIReport(bmiData);
      
      toast({
        title: "Success!",
        description: `Your BMI report has been downloaded as ${fileName}`,
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast({
        title: "Error",
        description: "Failed to generate PDF report. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getBackgroundGradient = () => {
    switch(theme) {
      case 'white':
        return 'bg-gradient-to-br from-blue-50 via-teal-50 to-cyan-50';
      case 'dark':
        return 'bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900';
      case 'black':
        return 'bg-gradient-to-br from-black via-gray-900 to-black';
      default:
        return 'bg-gradient-to-br from-blue-50 via-teal-50 to-cyan-50';
    }
  };

  // Default workout plans for all fitness levels
  const defaultWorkoutPlans = [
    {
      level: "Beginner",
      description: "Perfect for those starting their fitness journey",
      workouts: [
        {
          category: "Full Body Strength",
          frequency: "2-3 times per week",
          exercises: [
            { name: "Bodyweight Squats", sets: "3 sets of 8-12 reps", description: "Build lower body strength" },
            { name: "Push-ups (Modified if needed)", sets: "3 sets of 5-10 reps", description: "Upper body and core" },
            { name: "Plank Hold", sets: "3 sets of 15-30 seconds", description: "Core stability" },
            { name: "Walking Lunges", sets: "2 sets of 8 each leg", description: "Leg strength and balance" }
          ]
        },
        {
          category: "Cardio Foundation",
          frequency: "3-4 times per week",
          exercises: [
            { name: "Brisk Walking", sets: "20-30 minutes", description: "Low-impact cardiovascular exercise" },
            { name: "Light Jogging (intervals)", sets: "15-20 minutes", description: "Build endurance gradually" },
            { name: "Dancing or Swimming", sets: "20-30 minutes", description: "Fun cardiovascular activities" }
          ]
        }
      ]
    },
    {
      level: "Intermediate",
      description: "For those with some fitness experience",
      workouts: [
        {
          category: "Strength Training",
          frequency: "3-4 times per week",  
          exercises: [
            { name: "Goblet Squats", sets: "3 sets of 12-15 reps", description: "Lower body with added weight" },
            { name: "Push-ups/Chest Press", sets: "3 sets of 10-15 reps", description: "Upper body strength" },
            { name: "Deadlifts (Dumbbell)", sets: "3 sets of 8-12 reps", description: "Full body compound movement" },
            { name: "Plank Variations", sets: "3 sets of 30-60 seconds", description: "Core strength and stability" }
          ]
        },
        {
          category: "HIIT Cardio",
          frequency: "2-3 times per week",
          exercises: [
            { name: "Burpees", sets: "4 sets of 30 seconds", description: "Full body explosive movement" },
            { name: "Mountain Climbers", sets: "4 sets of 45 seconds", description: "Cardio and core" },
            { name: "Jump Squats", sets: "4 sets of 12-15 reps", description: "Lower body power" },
            { name: "High Knees", sets: "4 sets of 30 seconds", description: "Cardiovascular endurance" }
          ]
        }
      ]
    },
    {
      level: "Advanced",
      description: "Challenging workouts for experienced fitness enthusiasts",
      workouts: [
        {
          category: "Strength & Power",
          frequency: "4-5 times per week",
          exercises: [
            { name: "Barbell Squats", sets: "4 sets of 6-10 reps", description: "Heavy compound lower body" },
            { name: "Pull-ups/Chin-ups", sets: "4 sets of 8-12 reps", description: "Upper body pulling strength" },
            { name: "Deadlifts (Barbell)", sets: "4 sets of 5-8 reps", description: "Full body strength" },
            { name: "Overhead Press", sets: "3 sets of 8-10 reps", description: "Shoulder and core strength" }
          ]
        },
        {
          category: "Advanced HIIT",
          frequency: "3-4 times per week",
          exercises: [
            { name: "Plyometric Circuits", sets: "5 rounds of 45 seconds", description: "Explosive power training" },
            { name: "Sprint Intervals", sets: "8 x 30 seconds", description: "High-intensity cardio" },
            { name: "Complex Movements", sets: "4 sets of 8-10 reps", description: "Multi-joint exercises" },
            { name: "Metabolic Finishers", sets: "3-5 minutes", description: "High-intensity finish" }
          ]
        }
      ]
    }
  ];

  const [selectedLevel, setSelectedLevel] = useState("Beginner");

  return (
    <div className={`min-h-screen transition-all duration-700 ${getBackgroundGradient()}`}>
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="relative">
            <h1 className={`text-4xl md:text-6xl font-bold mb-6 transition-all duration-500 ${
              theme === 'white' ? 'text-gray-900' : 'text-white'
            }`}>
              Workout Plans
            </h1>
            <div className={`w-32 h-1 mx-auto mb-6 rounded-full transition-all duration-500 ${
              theme === 'white' ? 'bg-gradient-to-r from-teal-400 to-cyan-500' :
              theme === 'dark' ? 'bg-gradient-to-r from-purple-400 to-pink-500' :
              'bg-gradient-to-r from-green-400 to-emerald-500'
            }`} />
          </div>
          <p className={`text-xl md:text-2xl mb-8 max-w-3xl mx-auto transition-colors duration-500 ${
            theme === 'white' ? 'text-gray-600' : 'text-gray-300'
          }`}>
            Comprehensive workout plans designed for all fitness levels. Choose your level and start your fitness journey today.
          </p>

          {/* Feature badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {['All Fitness Levels', 'Detailed Instructions', 'Progressive Training', 'Flexible Schedule'].map((feature, index) => (
              <Badge 
                key={feature}
                variant="secondary" 
                className={`px-4 py-2 text-sm font-medium transition-all duration-500 transform hover:scale-105 animate-slide-in ${
                  theme === 'white' ? 'bg-teal-100 text-teal-800 hover:bg-teal-200' :
                  theme === 'dark' ? 'bg-purple-900/50 text-purple-200 hover:bg-purple-800/50' :
                  'bg-green-900/50 text-green-200 hover:bg-green-800/50'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {feature}
              </Badge>
            ))}
          </div>
        </div>

        {/* BMI Data Section (if available) */}
        {bmiData && (
          <Card className={`mb-8 backdrop-blur-md border-0 shadow-2xl ${
            theme === 'white' 
              ? 'bg-white/80 border-teal-200/20' 
              : theme === 'dark'
              ? 'bg-gray-800/80 border-purple-500/20'
              : 'bg-black/80 border-green-500/20'
          }`}>
            <CardHeader>
              <CardTitle className={`flex items-center gap-3 text-xl transition-colors duration-500 ${
                theme === 'white' ? 'text-gray-900' : 'text-white'
              }`}>
                <User className={`h-5 w-5 ${themeConfig.accent}`} />
                Your Personalized Data
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className={`text-2xl font-bold ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                    {bmiData.bmi}
                  </div>
                  <div className={`text-sm ${theme === 'white' ? 'text-gray-600' : 'text-gray-400'}`}>
                    BMI Score
                  </div>
                </div>
                <div>
                  <div className={`text-2xl font-bold ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                    {bmiData.bodyFat}%
                  </div>
                  <div className={`text-sm ${theme === 'white' ? 'text-gray-600' : 'text-gray-400'}`}>
                    Body Fat
                  </div>
                </div>
                <div>
                  <div className={`text-2xl font-bold ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                    {bmiData.age}
                  </div>
                  <div className={`text-sm ${theme === 'white' ? 'text-gray-600' : 'text-gray-400'}`}>
                    Age
                  </div>
                </div>
                <div>
                  <div className={`text-2xl font-bold capitalize ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                    {bmiData.gender}
                  </div>
                  <div className={`text-sm ${theme === 'white' ? 'text-gray-600' : 'text-gray-400'}`}>
                    Gender
                  </div>
                </div>
              </div>
              <div className="mt-4 text-center">
                <Button 
                  onClick={handleDownloadPDF}
                  className={`${themeConfig.buttonPrimary} hover:scale-105 transition-all duration-300`}
                >
                  Download Personalized PDF Report
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Workout Level Selection */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-4">
            {defaultWorkoutPlans.map((plan) => (
              <Button
                key={plan.level}
                onClick={() => setSelectedLevel(plan.level)}
                variant={selectedLevel === plan.level ? "default" : "outline"}
                className={`px-6 py-3 text-lg transition-all duration-300 hover:scale-105 ${
                  selectedLevel === plan.level 
                    ? themeConfig.buttonPrimary
                    : theme === 'white' 
                      ? 'border-teal-300 text-teal-700 hover:bg-teal-50' 
                      : theme === 'dark'
                      ? 'border-purple-500/50 text-purple-300 hover:bg-purple-900/20'
                      : 'border-green-500/50 text-green-300 hover:bg-green-900/20'
                }`}
              >
                {plan.level}
              </Button>
            ))}
          </div>
        </div>

        {/* Selected Workout Plan */}
        {defaultWorkoutPlans.find(plan => plan.level === selectedLevel) && (
          <div className="space-y-6">
            {/* Plan Description */}
            <Card className={`backdrop-blur-md border-0 shadow-xl ${
              theme === 'white' 
                ? 'bg-white/80 border-teal-200/20' 
                : theme === 'dark'
                ? 'bg-gray-800/80 border-purple-500/20'
                : 'bg-black/80 border-green-500/20'
            }`}>
              <CardHeader>
                <CardTitle className={`flex items-center gap-3 text-2xl transition-colors duration-500 ${
                  theme === 'white' ? 'text-gray-900' : 'text-white'
                }`}>
                  <Target className={`h-6 w-6 ${themeConfig.accent}`} />
                  {selectedLevel} Workout Plan
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className={`text-lg ${theme === 'white' ? 'text-gray-600' : 'text-gray-300'}`}>
                  {defaultWorkoutPlans.find(plan => plan.level === selectedLevel)?.description}
                </p>
              </CardContent>
            </Card>

            {/* Workout Categories */}
            {defaultWorkoutPlans.find(plan => plan.level === selectedLevel)?.workouts.map((workout, index) => (
              <Card key={index} className={`backdrop-blur-md border-0 shadow-xl transition-all duration-500 hover:scale-[1.01] ${
                theme === 'white' 
                  ? 'bg-white/80 border-teal-200/20' 
                  : theme === 'dark'
                  ? 'bg-gray-800/80 border-purple-500/20'
                  : 'bg-black/80 border-green-500/20'
              }`}>
                <CardHeader>
                  <CardTitle className={`flex items-center gap-3 text-xl transition-colors duration-500 ${
                    theme === 'white' ? 'text-gray-900' : 'text-white'
                  }`}>
                    <Dumbbell className={`h-5 w-5 ${themeConfig.accent}`} />
                    {workout.category}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Clock className={`h-4 w-4 ${themeConfig.accent}`} />
                    <span className={`text-sm ${theme === 'white' ? 'text-gray-600' : 'text-gray-400'}`}>
                      {workout.frequency}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {workout.exercises.map((exercise, exerciseIndex) => (
                      <div key={exerciseIndex} className={`p-4 rounded-lg ${
                        theme === 'white' ? 'bg-gray-50/80' : 
                        theme === 'dark' ? 'bg-gray-700/50' : 
                        'bg-gray-800/50'
                      }`}>
                        <div className="flex justify-between items-start mb-2">
                          <h4 className={`font-semibold ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                            {exercise.name}
                          </h4>
                          <Badge variant="secondary" className={`${
                            theme === 'white' ? 'bg-teal-100 text-teal-800' :
                            theme === 'dark' ? 'bg-purple-100 text-purple-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {exercise.sets}
                          </Badge>
                        </div>
                        <p className={`text-sm ${theme === 'white' ? 'text-gray-600' : 'text-gray-400'}`}>
                          {exercise.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* BMI-based Personalized Recommendations */}
        {bmiData && (
          <div className="mt-12">
            <WorkoutRecommendations 
              bmi={bmiData.bmi}
              age={bmiData.age}
              gender={bmiData.gender}
              onDownloadPDF={handleDownloadPDF}
            />
          </div>
        )}

        {/* Call to Action for BMI Calculation */}
        {!bmiData && (
          <Card className={`mt-12 backdrop-blur-md border-0 shadow-xl text-center ${
            theme === 'white' 
              ? 'bg-white/80 border-teal-200/20' 
              : theme === 'dark'
              ? 'bg-gray-800/80 border-purple-500/20'
              : 'bg-black/80 border-green-500/20'
          }`}>
            <CardContent className="py-8">
              <TrendingUp className={`h-12 w-12 mx-auto mb-4 ${themeConfig.accent}`} />
              <h3 className={`text-2xl font-bold mb-4 ${theme === 'white' ? 'text-gray-900' : 'text-white'}`}>
                Get Personalized Workout Recommendations
              </h3>
              <p className={`text-lg mb-6 ${theme === 'white' ? 'text-gray-600' : 'text-gray-300'}`}>
                Calculate your BMI to receive customized workout plans based on your body composition, age, and fitness goals.
              </p>
              <Link to="/">
                <Button className={`${themeConfig.buttonPrimary} text-lg px-8 py-3 hover:scale-105 transition-all duration-300`}>
                  Calculate BMI Now
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default WorkoutPage;