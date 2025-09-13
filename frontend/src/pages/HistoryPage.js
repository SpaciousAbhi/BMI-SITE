import React, { useState } from 'react';
import { History, Trash2, TrendingUp, TrendingDown, Calendar, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import Header from '../components/Header';
import { useTheme } from '../contexts/ThemeContext';
import { useBMI } from '../contexts/BMIContext';
import { useToast } from '../hooks/use-toast';
import { getBMICategory, formatWeight, formatHeight } from '../utils/bmiCalculations';

const HistoryPage = () => {
  const { theme } = useTheme();
  const { history, deleteBMIRecord } = useBMI();
  const { toast } = useToast();
  const [filterPeriod, setFilterPeriod] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  const filterHistory = () => {
    let filtered = [...history];
    
    // Filter by period
    if (filterPeriod !== 'all') {
      const now = new Date();
      let cutoffDate;
      
      switch (filterPeriod) {
        case 'week':
          cutoffDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          break;
        case 'month':
          cutoffDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          break;
        case '3months':
          cutoffDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
          break;
        default:
          cutoffDate = new Date(0);
      }
      
      filtered = filtered.filter(record => new Date(record.date) >= cutoffDate);
    }
    
    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'bmi':
          return b.bmi - a.bmi;
        case 'weight':
          return b.weight - a.weight;
        case 'date':
        default:
          return new Date(b.date) - new Date(a.date);
      }
    });
    
    return filtered;
  };

  const handleDelete = (id) => {
    deleteBMIRecord(id);
    toast({
      title: "Record Deleted",
      description: "BMI record has been removed from your history.",
    });
  };

  const getTrend = () => {
    if (history.length < 2) return null;
    
    const latest = history[0];
    const previous = history[1];
    const change = latest.bmi - previous.bmi;
    
    return {
      change: Math.abs(change).toFixed(1),
      direction: change > 0 ? 'up' : change < 0 ? 'down' : 'stable',
      color: change > 0 ? 'text-red-500' : change < 0 ? 'text-green-500' : 'text-gray-500'
    };
  };

  const filteredHistory = filterHistory();
  const trend = getTrend();

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
              BMI History
            </h1>
            <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              Track your BMI progress over time
            </p>
          </div>

          {/* Trend Summary */}
          {trend && (
            <Card className={`mb-6 backdrop-blur-md border-0 shadow-xl ${
              theme === 'dark' ? 'bg-white/10' : 'bg-white/70'
            }`}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      Recent Trend
                    </h3>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      Compared to your previous measurement
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {trend.direction === 'up' ? (
                      <TrendingUp className="h-5 w-5 text-red-500" />
                    ) : trend.direction === 'down' ? (
                      <TrendingDown className="h-5 w-5 text-green-500" />
                    ) : (
                      <div className="h-5 w-5 bg-gray-400 rounded-full" />
                    )}
                    <span className={`text-xl font-bold ${trend.color}`}>
                      {trend.direction !== 'stable' ? '±' : ''}{trend.change}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Filters */}
          <Card className={`mb-6 backdrop-blur-md border-0 shadow-xl ${
            theme === 'dark' ? 'bg-white/10' : 'bg-white/70'
          }`}>
            <CardContent className="p-6">
              <div className="flex flex-wrap gap-4 items-center">
                <div className="flex items-center gap-2">
                  <Filter className={`h-4 w-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`} />
                  <span className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    Filters:
                  </span>
                </div>
                
                <Select value={filterPeriod} onValueChange={setFilterPeriod}>
                  <SelectTrigger className={`w-40 ${
                    theme === 'dark' 
                      ? 'bg-white/20 border-white/30 text-white' 
                      : 'bg-white/50 border-gray-300'
                  }`}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Time</SelectItem>
                    <SelectItem value="week">Last Week</SelectItem>
                    <SelectItem value="month">Last Month</SelectItem>
                    <SelectItem value="3months">Last 3 Months</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className={`w-40 ${
                    theme === 'dark' 
                      ? 'bg-white/20 border-white/30 text-white' 
                      : 'bg-white/50 border-gray-300'
                  }`}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="date">Sort by Date</SelectItem>
                    <SelectItem value="bmi">Sort by BMI</SelectItem>
                    <SelectItem value="weight">Sort by Weight</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* History Records */}
          {filteredHistory.length === 0 ? (
            <Card className={`backdrop-blur-md border-0 shadow-xl ${
              theme === 'dark' ? 'bg-white/10' : 'bg-white/70'
            }`}>
              <CardContent className="p-12 text-center">
                <History className={`h-16 w-16 mx-auto mb-4 ${
                  theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                }`} />
                <h3 className={`text-xl font-semibold mb-2 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  No BMI Records Yet
                </h3>
                <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                  Start calculating your BMI to see your history here.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredHistory.map((record) => {
                const category = getBMICategory(record.bmi);
                return (
                  <Card key={record.id} className={`backdrop-blur-md border-0 shadow-xl transform hover:scale-105 transition-all duration-300 ${
                    theme === 'dark' ? 'bg-white/10 hover:bg-white/15' : 'bg-white/70 hover:bg-white/80'
                  }`}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div>
                            <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                              Date
                            </div>
                            <div className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                              {new Date(record.date).toLocaleDateString()}
                            </div>
                          </div>
                          
                          <div>
                            <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                              BMI
                            </div>
                            <div className="flex items-center gap-2">
                              <span className={`text-xl font-bold ${category.color}`}>
                                {record.bmi}
                              </span>
                              <Badge className={`${category.bgColor} ${category.color} border-0 text-xs`}>
                                {category.category}
                              </Badge>
                            </div>
                          </div>
                          
                          <div>
                            <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                              Weight
                            </div>
                            <div className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                              {record.weight} {record.weightUnit || 'kg'}
                            </div>
                          </div>
                          
                          <div>
                            <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                              Body Fat
                            </div>
                            <div className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                              {record.bodyFat}%
                            </div>
                          </div>
                        </div>
                        
                        <Button
                          onClick={() => handleDelete(record.id)}
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
          )}
        </div>
      </main>
    </div>
  );
};

export default HistoryPage;