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
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('bmi-history');
    return saved ? JSON.parse(saved) : [];
  });

  const [goals, setGoals] = useState(() => {
    const saved = localStorage.getItem('bmi-goals');
    return saved ? JSON.parse(saved) : [];
  });

  const [units, setUnits] = useState(() => {
    const saved = localStorage.getItem('bmi-units');
    return saved || 'metric';
  });

  useEffect(() => {
    localStorage.setItem('bmi-history', JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    localStorage.setItem('bmi-goals', JSON.stringify(goals));
  }, [goals]);

  useEffect(() => {
    localStorage.setItem('bmi-units', units);
  }, [units]);

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