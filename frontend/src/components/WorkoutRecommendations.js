import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Dumbbell, 
  Timer, 
  TrendingUp, 
  Calendar,
  Target,
  CheckCircle,
  Play,
  Pause,
  RotateCcw,
  Download
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { getWorkoutRecommendations, getWeeklySchedule, getProgressTracker } from '../utils/workoutRecommendations';

const WorkoutRecommendations = ({ bmi, age, gender, onDownloadPDF }) => {
  const { theme } = useTheme();
  const [selectedWorkout, setSelectedWorkout] = useState(0);
  const [completedExercises, setCompletedExercises] = useState(new Set());
  const [activeTimer, setActiveTimer] = useState(null);
  const [timerSeconds, setTimerSeconds] = useState(0);

  const workouts = getWorkoutRecommendations(bmi, age, gender);
  const weeklySchedule = getWeeklySchedule(workouts);
  const progressTracker = getProgressTracker();

  const toggleExerciseComplete = (exerciseIndex) => {
    const newCompleted = new Set(completedExercises);
    if (newCompleted.has(exerciseIndex)) {
      newCompleted.delete(exerciseIndex);
    } else {
      newCompleted.add(exerciseIndex);
    }
    setCompletedExercises(newCompleted);
  };

  const startTimer = (duration) => {
    if (activeTimer) {
      clearInterval(activeTimer);
    }
    
    const seconds = duration === '30-60 seconds' ? 45 : 
                   duration === '45 seconds work, 15 seconds rest' ? 45 : 
                   parseInt(duration) * 60 || 30;
    
    setTimerSeconds(seconds);
    
    const interval = setInterval(() => {
      setTimerSeconds(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          setActiveTimer(null);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    setActiveTimer(interval);
  };

  const stopTimer = () => {
    if (activeTimer) {
      clearInterval(activeTimer);
      setActiveTimer(null);
    }
  };

  const resetTimer = () => {
    stopTimer();
    setTimerSeconds(0);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getIntensityColor = (intensity) => {
    switch (intensity.toLowerCase()) {
      case 'low': return 'bg-green-500';
      case 'moderate': return 'bg-yellow-500';
      case 'high':
      case 'moderate to high': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className={`backdrop-blur-md border-0 shadow-2xl ${
        theme === 'dark' ? 'bg-white/10' : 'bg-white/70'
      }`}>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className={`text-2xl flex items-center gap-2 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              <Dumbbell className="h-6 w-6" />
              Personalized Workout Plan
            </CardTitle>
            <Button onClick={onDownloadPDF} className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Download PDF Report
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Workout Plans Tabs */}
      <Tabs defaultValue="workouts" className="space-y-4">
        <TabsList className={`grid w-full grid-cols-3 ${
          theme === 'dark' ? 'bg-white/10' : 'bg-gray-100'
        }`}>
          <TabsTrigger value="workouts">Workout Plans</TabsTrigger>
          <TabsTrigger value="schedule">Weekly Schedule</TabsTrigger>
          <TabsTrigger value="progress">Progress Tracker</TabsTrigger>
        </TabsList>

        {/* Workout Plans Tab */}
        <TabsContent value="workouts" className="space-y-4">
          {workouts.map((workout, workoutIndex) => (
            <Card key={workoutIndex} className={`backdrop-blur-md border-0 shadow-lg ${
              theme === 'dark' ? 'bg-white/5' : 'bg-white/90'
            }`}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className={`text-xl ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      {workout.category}
                    </CardTitle>
                    <div className="flex gap-2 mt-2">
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {workout.frequency}
                      </Badge>
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <Timer className="h-3 w-3" />
                        {workout.duration}
                      </Badge>
                      <Badge className={`text-white ${getIntensityColor(workout.intensity)}`}>
                        {workout.intensity}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Exercise List */}
                <div className="space-y-3">
                  <h4 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    Exercises
                  </h4>
                  {workout.exercises.map((exercise, exerciseIndex) => {
                    const globalIndex = `${workoutIndex}-${exerciseIndex}`;
                    const isCompleted = completedExercises.has(globalIndex);
                    
                    return (
                      <div 
                        key={exerciseIndex}
                        className={`p-4 rounded-lg border-l-4 transition-all ${
                          isCompleted 
                            ? 'border-green-500 bg-green-50 dark:bg-green-500/10' 
                            : 'border-blue-500 bg-blue-50 dark:bg-blue-500/10'
                        } ${theme === 'dark' ? 'bg-white/5' : 'bg-gray-50'}`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <button
                                onClick={() => toggleExerciseComplete(globalIndex)}
                                className={`p-1 rounded-full ${
                                  isCompleted 
                                    ? 'text-green-600 bg-green-100 dark:bg-green-500/20' 
                                    : 'text-gray-400 hover:text-blue-600'
                                }`}
                              >
                                <CheckCircle className="h-5 w-5" />
                              </button>
                              <h5 className={`font-medium ${
                                isCompleted 
                                  ? 'line-through text-gray-500' 
                                  : theme === 'dark' ? 'text-white' : 'text-gray-900'
                              }`}>
                                {exercise.name}
                              </h5>
                            </div>
                            <p className={`text-sm mb-2 ${
                              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                            }`}>
                              {exercise.description}
                            </p>
                            <div className="flex gap-4 text-sm">
                              <span className={`font-medium ${
                                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                              }`}>
                                Sets: {exercise.sets}
                              </span>
                              <span className={`font-medium ${
                                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                              }`}>
                                Reps: {exercise.reps}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {/* Timer Controls */}
                            {exercise.reps.includes('seconds') && (
                              <div className="flex items-center gap-1">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => startTimer(exercise.reps)}
                                  disabled={activeTimer !== null}
                                >
                                  <Play className="h-3 w-3" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={stopTimer}
                                  disabled={activeTimer === null}
                                >
                                  <Pause className="h-3 w-3" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={resetTimer}
                                >
                                  <RotateCcw className="h-3 w-3" />
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Timer Display */}
                {timerSeconds > 0 && (
                  <div className={`text-center p-4 rounded-lg ${
                    theme === 'dark' ? 'bg-blue-500/10 border border-blue-500/20' : 'bg-blue-50 border border-blue-200'
                  }`}>
                    <div className={`text-4xl font-bold ${
                      theme === 'dark' ? 'text-blue-300' : 'text-blue-600'
                    }`}>
                      {formatTime(timerSeconds)}
                    </div>
                    <p className={`text-sm ${
                      theme === 'dark' ? 'text-blue-400' : 'text-blue-700'
                    }`}>
                      Time Remaining
                    </p>
                  </div>
                )}

                {/* Tips */}
                <div className="space-y-2">
                  <h4 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    Tips for Success
                  </h4>
                  <ul className="space-y-1">
                    {workout.tips.map((tip, tipIndex) => (
                      <li 
                        key={tipIndex}
                        className={`text-sm flex items-start gap-2 ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}
                      >
                        <Target className="h-3 w-3 mt-0.5 flex-shrink-0 text-green-500" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Weekly Schedule Tab */}
        <TabsContent value="schedule" className="space-y-4">
          <Card className={`backdrop-blur-md border-0 shadow-lg ${
            theme === 'dark' ? 'bg-white/5' : 'bg-white/90'
          }`}>
            <CardHeader>
              <CardTitle className={`text-xl ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Weekly Schedule
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(weeklySchedule).map(([day, activities]) => (
                  <div 
                    key={day}
                    className={`p-4 rounded-lg ${
                      theme === 'dark' ? 'bg-white/5' : 'bg-gray-50'
                    }`}
                  >
                    <h4 className={`font-semibold mb-2 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      {day}
                    </h4>
                    {activities.length > 0 ? (
                      <div className="space-y-2">
                        {activities.map((activity, index) => (
                          <div key={index} className="text-sm">
                            <div className={`font-medium ${
                              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                            }`}>
                              {activity.category}
                            </div>
                            <div className={`text-xs ${
                              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                            }`}>
                              {activity.duration} • {activity.intensity}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className={`text-sm ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        Rest Day
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Progress Tracker Tab */}
        <TabsContent value="progress" className="space-y-4">
          <Card className={`backdrop-blur-md border-0 shadow-lg ${
            theme === 'dark' ? 'bg-white/5' : 'bg-white/90'
          }`}>
            <CardHeader>
              <CardTitle className={`text-xl ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                4-Week Progress Plan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(progressTracker).map(([week, plan]) => (
                  <div 
                    key={week}
                    className={`p-4 rounded-lg border-l-4 border-blue-500 ${
                      theme === 'dark' ? 'bg-blue-500/10' : 'bg-blue-50'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-5 w-5 text-blue-500" />
                      <h4 className={`font-semibold capitalize ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>
                        {week.replace('week', 'Week ')}
                      </h4>
                    </div>
                    <div className={`text-sm ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      <div className="mb-1">
                        <strong>Target:</strong> {plan.target}
                      </div>
                      <div>
                        <strong>Focus:</strong> {plan.focus}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WorkoutRecommendations;