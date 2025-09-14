import React, { createContext, useContext, useEffect, useState } from 'react';

const BMIContext = createContext();

export const useBMI = () => {
  const context = useContext(BMIContext);
  if (!context) {
    throw new Error('useBMI must be used within a BMIProvider');
  }
  return context;
};

export const BMIProvider = ({ children }) => {
  const [history, setHistory] = useState([]); // Default empty array
  const [goals, setGoals] = useState([]); // Default empty array
  const [units, setUnits] = useState('metric'); // Default metric
  const [isLoaded, setIsLoaded] = useState(false);

  // Load data from localStorage after hydration
  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem('bmi-history');
      const savedGoals = localStorage.getItem('bmi-goals');
      const savedUnits = localStorage.getItem('bmi-units');
      
      if (savedHistory) {
        setHistory(JSON.parse(savedHistory));
      }
      if (savedGoals) {
        setGoals(JSON.parse(savedGoals));
      }
      if (savedUnits) {
        setUnits(savedUnits);
      }
    } catch (error) {
      console.warn('Error loading data from localStorage:', error);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) return; // Don't update localStorage before hydration
    localStorage.setItem('bmi-history', JSON.stringify(history));
  }, [history, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return; // Don't update localStorage before hydration
    localStorage.setItem('bmi-goals', JSON.stringify(goals));
  }, [goals, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return; // Don't update localStorage before hydration
    localStorage.setItem('bmi-units', units);
  }, [units, isLoaded]);

  const addBMIRecord = (record) => {
    const newRecord = {
      ...record,
      id: Date.now(),
      date: new Date().toISOString(),
    };
    setHistory(prev => [newRecord, ...prev]);
  };

  const deleteBMIRecord = (id) => {
    setHistory(prev => prev.filter(record => record.id !== id));
  };

  const addGoal = (goal) => {
    const newGoal = {
      ...goal,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      completed: false,
    };
    setGoals(prev => [newGoal, ...prev]);
  };

  const updateGoal = (id, updates) => {
    setGoals(prev => prev.map(goal => 
      goal.id === id ? { ...goal, ...updates } : goal
    ));
  };

  const deleteGoal = (id) => {
    setGoals(prev => prev.filter(goal => goal.id !== id));
  };

  const toggleUnits = () => {
    setUnits(prev => prev === 'metric' ? 'imperial' : 'metric');
  };

  return (
    <BMIContext.Provider value={{
      history,
      goals,
      units,
      isLoaded,
      addBMIRecord,
      deleteBMIRecord,
      addGoal,
      updateGoal,
      deleteGoal,
      toggleUnits,
    }}>
      {children}
    </BMIContext.Provider>
  );
};