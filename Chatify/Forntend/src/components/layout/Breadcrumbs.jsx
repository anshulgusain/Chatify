import React from 'react';
import { ChevronRight, Home, BookOpen } from 'lucide-react';
import { tutorialSteps } from '../../data/tutorialData';
import { useProgress } from '../../context/ProgressContext';

export const Breadcrumbs = () => {
  const { activeStepId } = useProgress();
  const currentStep = tutorialSteps.find(s => s.id === activeStepId) || tutorialSteps[0];

  return (
    <nav className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 py-3 px-4 sm:px-6 bg-slate-50/60 dark:bg-slate-900/40 border-b border-slate-200/60 dark:border-slate-800/60 font-medium">
      <a href="#" className="flex items-center gap-1 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
        <Home className="w-3.5 h-3.5" />
        <span>Docs</span>
      </a>

      <ChevronRight className="w-3.5 h-3.5 text-slate-400 opacity-60" />

      <span className="flex items-center gap-1">
        <BookOpen className="w-3.5 h-3.5 opacity-60" />
        <span>{currentStep.categoryLabel}</span>
      </span>

      <ChevronRight className="w-3.5 h-3.5 text-slate-400 opacity-60" />

      <span className="font-bold text-slate-900 dark:text-slate-200 truncate">
        Step {currentStep.number} — {currentStep.title}
      </span>
    </nav>
  );
};
