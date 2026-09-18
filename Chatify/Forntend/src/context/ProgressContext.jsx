import React, { createContext, useContext, useState, useEffect } from 'react';
import { tutorialSteps } from '../data/tutorialData';

const ProgressContext = createContext();

export const ProgressProvider = ({ children }) => {
  // Theme: always start light (clear any saved dark preference)
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('whatsapp-guide-theme');
    // If saved dark, reset to light for fresh experience
    if (saved === 'dark') {
      localStorage.setItem('whatsapp-guide-theme', 'light');
      return 'light';
    }
    return saved || 'light';
  });

  // Completed step IDs state
  const [completedSteps, setCompletedSteps] = useState(() => {
    const saved = localStorage.getItem('whatsapp-guide-progress');
    return saved ? JSON.parse(saved) : [];
  });

  // Active step ID state
  const [activeStepId, setActiveStepId] = useState(() => {
    return localStorage.getItem('whatsapp-guide-last-step') || 'step-01';
  });

  // Search modal state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Sync theme attribute on documentElement
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('whatsapp-guide-theme', theme);
  }, [theme]);

  // Sync progress state to localStorage
  useEffect(() => {
    localStorage.setItem('whatsapp-guide-progress', JSON.stringify(completedSteps));
  }, [completedSteps]);

  // Sync active step state to localStorage
  useEffect(() => {
    if (activeStepId) {
      localStorage.setItem('whatsapp-guide-last-step', activeStepId);
    }
  }, [activeStepId]);

  // Toggle theme handler
  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Toggle step completion status
  const toggleStepCompletion = (stepId) => {
    setCompletedSteps(prev => {
      if (prev.includes(stepId)) {
        return prev.filter(id => id !== stepId);
      } else {
        return [...prev, stepId];
      }
    });
  };

  // Check if step is completed
  const isStepCompleted = (stepId) => {
    return completedSteps.includes(stepId);
  };

  // Reset all progress
  const resetProgress = () => {
    if (window.confirm('Are you sure you want to reset your course progress?')) {
      setCompletedSteps([]);
      localStorage.removeItem('whatsapp-guide-progress');
    }
  };

  // Calculate progress stats
  const totalSteps = tutorialSteps.length;
  const completedCount = completedSteps.length;
  const percentComplete = totalSteps > 0 ? Math.round((completedCount / totalSteps) * 100) : 0;

  // Find first incomplete step for "Continue Learning"
  const firstIncompleteStep = tutorialSteps.find(step => !completedSteps.includes(step.id)) || tutorialSteps[0];

  return (
    <ProgressContext.Provider
      value={{
        theme,
        toggleTheme,
        completedSteps,
        toggleStepCompletion,
        isStepCompleted,
        resetProgress,
        activeStepId,
        setActiveStepId,
        completedCount,
        totalSteps,
        percentComplete,
        firstIncompleteStep,
        isSearchOpen,
        setIsSearchOpen,
        searchQuery,
        setSearchQuery
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};
