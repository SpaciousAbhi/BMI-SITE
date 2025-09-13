import React, { useState } from 'react';
import { Target, Plus, Trash2, CheckCircle, Circle, Calendar, Weight, TrendingDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Badge } from '../components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useTheme } from '../contexts/ThemeContext';
import { useBMI } from '../contexts/BMIContext';
import { useToast } from '../hooks/use-toast';

const GoalsPage = () => {
  const { theme } = useTheme();
  const { goals, addGoal, updateGoal, deleteGoal, units } = useBMI();
  const { toast } = useToast();
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [goalForm, setGoalForm] = useState({
    type: '',
    targetValue: '',
    targetDate: '',
    description: '',
  });

  const goalTypes = [
    { value: 'weight_loss', label: 'Weight Loss', icon: TrendingDown },
    { value: 'weight_gain', label: 'Weight Gain', icon: TrendingDown },
    { value: 'bmi_target', label: 'BMI Target', icon: Target },
    { value: 'body_fat', label: 'Body Fat %', icon: Target },
  ];

  const handleFormChange = (field, value) => {
    setGoalForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!goalForm.type || !goalForm.targetValue || !goalForm.targetDate) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    addGoal({
      ...goalForm,
      targetValue: parseFloat(goalForm.targetValue),
    });

    toast({
      title: "Goal Added!",
      description: "Your health goal has been created successfully.",
    });

    setGoalForm({ type: '', targetValue: '', targetDate: '', description: '' });
    setIsDialogOpen(false);
  };

  const toggleGoalCompletion = (goalId, completed) => {
    updateGoal(goalId, { completed: !completed });
    
    toast({
      title: completed ? "Goal Reopened" : "Goal Completed!",
      description: completed ? "Goal marked as incomplete." : "Congratulations on reaching your goal!",
    });
  };

  const handleDelete = (goalId) => {
    deleteGoal(goalId);
    toast({
      title: "Goal Deleted",
      description: "Goal has been removed from your list.",
    });
  };

  const getGoalTypeInfo = (type) => {
    return goalTypes.find(gt => gt.value === type) || goalTypes[0];
  };

  const getTargetUnit = (type) => {
    switch (type) {
      case 'weight_loss':
      case 'weight_gain':
        return 'kg/lbs';
      case 'bmi_target':
        return 'BMI';
      case 'body_fat':
        return '%';
      default:
        return '';
    }
  };

  const isGoalOverdue = (targetDate) => {
    return new Date(targetDate) < new Date();
  };

  const completedGoals = goals.filter(goal => goal.completed);
  const activeGoals = goals.filter(goal => !goal.completed);

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900' 
        : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
    }`}>
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className={`text-3xl md:text-4xl font-bold mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Health Goals
            </h1>
            <p className={`text-lg mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              Set and track your fitness and health objectives
            </p>
            
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold px-6 py-3 transform hover:scale-105 transition-all duration-300 shadow-lg">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Goal
                </Button>
              </DialogTrigger>
              <DialogContent className={`${theme === 'dark' ? 'bg-gray-900 border-gray-700' : 'bg-white'}`}>
                <DialogHeader>
                  <DialogTitle className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
                    Create New Health Goal
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label className={theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}>
                      Goal Type
                    </Label>
                    <Select value={goalForm.type} onValueChange={(value) => handleFormChange('type', value)}>
                      <SelectTrigger className={theme === 'dark' ? 'bg-gray-800 border-gray-600 text-white' : ''}>
                        <SelectValue placeholder="Select goal type" />
                      </SelectTrigger>
                      <SelectContent>
                        {goalTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className={theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}>
                      Target Value ({getTargetUnit(goalForm.type)})
                    </Label>
                    <Input
                      type="number"
                      step="0.1"
                      placeholder="Enter target value"
                      value={goalForm.targetValue}
                      onChange={(e) => handleFormChange('targetValue', e.target.value)}
                      className={theme === 'dark' ? 'bg-gray-800 border-gray-600 text-white' : ''}
                    />
                  </div>

                  <div>
                    <Label className={theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}>
                      Target Date
                    </Label>
                    <Input
                      type="date"
                      value={goalForm.targetDate}
                      onChange={(e) => handleFormChange('targetDate', e.target.value)}
                      className={theme === 'dark' ? 'bg-gray-800 border-gray-600 text-white' : ''}
                    />
                  </div>

                  <div>
                    <Label className={theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}>
                      Description (Optional)
                    </Label>
                    <Input
                      placeholder="Describe your goal"
                      value={goalForm.description}
                      onChange={(e) => handleFormChange('description', e.target.value)}
                      className={theme === 'dark' ? 'bg-gray-800 border-gray-600 text-white' : ''}
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    Create Goal
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className={`backdrop-blur-md border-0 shadow-xl ${
              theme === 'dark' ? 'bg-white/10' : 'bg-white/70'
            }`}>
              <CardContent className="p-6 text-center">
                <Target className={`h-12 w-12 mx-auto mb-4 ${
                  theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                }`} />
                <div className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {goals.length}
                </div>
                <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  Total Goals
                </div>
              </CardContent>
            </Card>

            <Card className={`backdrop-blur-md border-0 shadow-xl ${
              theme === 'dark' ? 'bg-white/10' : 'bg-white/70'
            }`}>
              <CardContent className="p-6 text-center">
                <CheckCircle className={`h-12 w-12 mx-auto mb-4 ${
                  theme === 'dark' ? 'text-green-400' : 'text-green-600'
                }`} />
                <div className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {completedGoals.length}
                </div>
                <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  Completed
                </div>
              </CardContent>
            </Card>

            <Card className={`backdrop-blur-md border-0 shadow-xl ${
              theme === 'dark' ? 'bg-white/10' : 'bg-white/70'
            }`}>
              <CardContent className="p-6 text-center">
                <Circle className={`h-12 w-12 mx-auto mb-4 ${
                  theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600'
                }`} />
                <div className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {activeGoals.length}
                </div>
                <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  Active
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Active Goals */}
          {activeGoals.length > 0 && (
            <div className="mb-8">
              <h2 className={`text-2xl font-bold mb-4 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Active Goals
              </h2>
              <div className="space-y-4">
                {activeGoals.map((goal) => {
                  const typeInfo = getGoalTypeInfo(goal.type);
                  const IconComponent = typeInfo.icon;
                  const isOverdue = isGoalOverdue(goal.targetDate);
                  
                  return (
                    <Card key={goal.id} className={`backdrop-blur-md border-0 shadow-xl transform hover:scale-105 transition-all duration-300 ${
                      theme === 'dark' ? 'bg-white/10 hover:bg-white/15' : 'bg-white/70 hover:bg-white/80'
                    }`}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 flex-1">
                            <Button
                              onClick={() => toggleGoalCompletion(goal.id, goal.completed)}
                              variant="outline"
                              size="sm"
                              className={`p-2 ${
                                theme === 'dark' 
                                  ? 'border-white/30 text-white hover:bg-white/10' 
                                  : 'border-gray-300 hover:bg-gray-50'
                              }`}
                            >
                              <Circle className="h-4 w-4" />
                            </Button>
                            
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <IconComponent className={`h-5 w-5 ${
                                  theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                                }`} />
                                <h3 className={`text-lg font-semibold ${
                                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                                }`}>
                                  {typeInfo.label}
                                </h3>
                                <Badge variant="outline" className={`text-xs ${
                                  isOverdue ? 'border-red-500 text-red-500' : 
                                  theme === 'dark' ? 'border-white/30 text-white' : 'border-gray-300'
                                }`}>
                                  {isOverdue ? 'Overdue' : 'Active'}
                                </Badge>
                              </div>
                              
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                  <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                                    Target: 
                                  </span>
                                  <span className={`ml-1 font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                    {goal.targetValue} {getTargetUnit(goal.type)}
                                  </span>
                                </div>
                                <div>
                                  <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                                    Due: 
                                  </span>
                                  <span className={`ml-1 font-medium ${
                                    isOverdue ? 'text-red-500' : theme === 'dark' ? 'text-white' : 'text-gray-900'
                                  }`}>
                                    {new Date(goal.targetDate).toLocaleDateString()}
                                  </span>
                                </div>
                              </div>
                              
                              {goal.description && (
                                <p className={`text-sm mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                                  {goal.description}
                                </p>
                              )}
                            </div>
                          </div>
                          
                          <Button
                            onClick={() => handleDelete(goal.id)}
                            variant="outline"
                            size="sm"
                            className={`ml-4 p-2 hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition-colors ${
                              theme === 'dark' 
                                ? 'border-white/30 text-white hover:bg-red-900/20 hover:border-red-500 hover:text-red-400' 
                                : 'border-gray-300'
                            }`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}

          {/* Completed Goals */}
          {completedGoals.length > 0 && (
            <div>
              <h2 className={`text-2xl font-bold mb-4 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Completed Goals
              </h2>
              <div className="space-y-4">
                {completedGoals.map((goal) => {
                  const typeInfo = getGoalTypeInfo(goal.type);
                  const IconComponent = typeInfo.icon;
                  
                  return (
                    <Card key={goal.id} className={`backdrop-blur-md border-0 shadow-xl opacity-75 ${
                      theme === 'dark' ? 'bg-white/10' : 'bg-white/70'
                    }`}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 flex-1">
                            <Button
                              onClick={() => toggleGoalCompletion(goal.id, goal.completed)}
                              variant="outline"
                              size="sm"
                              className={`p-2 ${
                                theme === 'dark' 
                                  ? 'border-green-500 text-green-400 bg-green-500/10' 
                                  : 'border-green-500 text-green-600 bg-green-50'
                              }`}
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                            
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <IconComponent className={`h-5 w-5 ${
                                  theme === 'dark' ? 'text-green-400' : 'text-green-600'
                                }`} />
                                <h3 className={`text-lg font-semibold ${
                                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                                }`}>
                                  {typeInfo.label}
                                </h3>
                                <Badge className="bg-green-500 text-white text-xs">
                                  Completed
                                </Badge>
                              </div>
                              
                              <div className="text-sm">
                                <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                                  Target achieved: 
                                </span>
                                <span className={`ml-1 font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                  {goal.targetValue} {getTargetUnit(goal.type)}
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          <Button
                            onClick={() => handleDelete(goal.id)}
                            variant="outline"
                            size="sm"
                            className={`ml-4 p-2 hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition-colors ${
                              theme === 'dark' 
                                ? 'border-white/30 text-white hover:bg-red-900/20 hover:border-red-500 hover:text-red-400' 
                                : 'border-gray-300'
                            }`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}

          {/* Empty State */}
          {goals.length === 0 && (
            <Card className={`backdrop-blur-md border-0 shadow-xl ${
              theme === 'dark' ? 'bg-white/10' : 'bg-white/70'
            }`}>
              <CardContent className="p-12 text-center">
                <Target className={`h-16 w-16 mx-auto mb-4 ${
                  theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                }`} />
                <h3 className={`text-xl font-semibold mb-2 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  No Goals Set Yet
                </h3>
                <p className={`mb-6 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  Create your first health goal to start tracking your progress.
                </p>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white">
                      <Plus className="h-4 w-4 mr-2" />
                      Create Your First Goal
                    </Button>
                  </DialogTrigger>
                </Dialog>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default GoalsPage;