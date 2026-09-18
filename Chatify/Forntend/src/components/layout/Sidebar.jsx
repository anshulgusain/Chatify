import React from 'react';
import { useProgress } from '../../context/ProgressContext';
import { tutorialSteps } from '../../data/tutorialData';
import { CheckCircle2, Circle, ChevronRight, RotateCcw, Zap } from 'lucide-react';

export const Sidebar = () => {
  const {
    isStepCompleted,
    activeStepId,
    setActiveStepId,
    percentComplete,
    completedCount,
    totalSteps,
    resetProgress,
    firstIncompleteStep,
    theme,
  } = useProgress();

  const handleStepClick = (stepId) => {
    setActiveStepId(stepId);
    const el = document.getElementById(stepId);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const isDark = theme === 'dark';

  // Group steps by category label
  const grouped = tutorialSteps.reduce((acc, step) => {
    const g = step.categoryLabel || 'TUTORIAL';
    if (!acc[g]) acc[g] = [];
    acc[g].push(step);
    return acc;
  }, {});

  return (
    <div
      className="h-full flex flex-col"
      style={{ background: isDark ? '#111b21' : '#ffffff' }}
    >
      {/* ── Progress Section ── */}
      <div
        className="px-4 pt-5 pb-4"
        style={{
          borderBottom: `1px solid ${isDark ? '#374147' : '#e9edef'}`,
        }}
      >
        {/* Title */}
        <div className="flex items-center justify-between mb-3">
          <span
            className="text-base font-extrabold"
            style={{ color: isDark ? '#e9edef' : '#111b21' }}
          >
            Your Progress
          </span>
          <span
            className="text-sm font-bold"
            style={{ color: '#25D366' }}
          >
            {percentComplete}%
          </span>
        </div>

        {/* Progress Bar */}
        <div
          className="h-2.5 rounded-full overflow-hidden mb-2"
          style={{ background: isDark ? '#2a3942' : '#e9edef' }}
        >
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${percentComplete}%`,
              background: 'linear-gradient(90deg, #25D366, #128C7E)',
            }}
          />
        </div>

        <div className="flex items-center justify-between mb-3">
          <span
            className="text-sm font-semibold"
            style={{ color: isDark ? '#8696a0' : '#54656f' }}
          >
            {completedCount} of {totalSteps} steps done
          </span>
          {completedCount > 0 && (
            <button
              onClick={resetProgress}
              className="flex items-center gap-1 text-xs font-bold text-rose-500 hover:text-rose-600 transition-colors"
            >
              <RotateCcw className="w-3 h-3" /> Reset
            </button>
          )}
        </div>

        {/* Continue Button */}
        {percentComplete < 100 && firstIncompleteStep && (
          <button
            onClick={() => handleStepClick(firstIncompleteStep.id)}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90 shadow-md"
            style={{ background: 'linear-gradient(135deg, #25D366, #128C7E)' }}
          >
            <Zap className="w-4 h-4" />
            Continue Learning
            <ChevronRight className="w-4 h-4 ml-auto" />
          </button>
        )}
      </div>

      {/* ── Steps List ── */}
      <nav
        className="flex-1 overflow-y-auto py-3"
        style={{ '--scrollbar-color': isDark ? '#374147' : '#d1d7db' }}
      >
        {Object.entries(grouped).map(([groupTitle, steps]) => (
          <div key={groupTitle} className="mb-6">
            {/* Group Heading — Bold Black */}
            <div
              className="flex items-center gap-2 px-4 mb-2"
            >
              <div
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ background: '#25D366' }}
              />
              <span
                className="text-xs font-extrabold uppercase tracking-widest"
                style={{ color: isDark ? '#8696a0' : '#3b4a54' }}
              >
                {groupTitle}
              </span>
            </div>

            {/* Steps */}
            {steps.map((step) => {
              const completed = isStepCompleted(step.id);
              const isActive = activeStepId === step.id;

              return (
                <button
                  key={step.id}
                  onClick={() => handleStepClick(step.id)}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left transition-all"
                  style={{
                    background: isActive
                      ? isDark ? 'rgba(37,211,102,0.12)' : '#d9fdd3'
                      : 'transparent',
                    borderLeft: isActive ? '3px solid #25D366' : '3px solid transparent',
                  }}
                  onMouseEnter={e => {
                    if (!isActive) e.currentTarget.style.background = isDark ? '#1a2730' : '#f0f2f5';
                  }}
                  onMouseLeave={e => {
                    if (!isActive) e.currentTarget.style.background = 'transparent';
                  }}
                >
                  {/* Status Icon */}
                  <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center">
                    {completed ? (
                      <CheckCircle2 className="w-5 h-5" style={{ color: '#25D366' }} />
                    ) : isActive ? (
                      <div
                        className="w-5 h-5 rounded-full border-2 flex items-center justify-center"
                        style={{ borderColor: '#25D366' }}
                      >
                        <div className="w-2 h-2 rounded-full" style={{ background: '#25D366' }} />
                      </div>
                    ) : (
                      <Circle className="w-5 h-5" style={{ color: isDark ? '#374147' : '#c4cdd2' }} />
                    )}
                  </div>

                  {/* Step Title — Bold, Dark, Full Text */}
                  <div className="flex-1 min-w-0">
                    <p
                      className="text-sm font-semibold leading-snug"
                      style={{
                        color: isActive
                          ? '#128C7E'
                          : completed
                          ? isDark ? '#54656f' : '#8696a0'
                          : isDark ? '#d1d7db' : '#111b21',
                        textDecoration: completed ? 'line-through' : 'none',
                      }}
                    >
                      {step.title}
                    </p>
                  </div>

                  {/* Step Number */}
                  <span
                    className="flex-shrink-0 text-xs font-mono font-bold px-1.5 py-0.5 rounded-md"
                    style={{
                      color: isActive
                        ? '#ffffff'
                        : completed
                        ? isDark ? '#8696a0' : '#54656f'
                        : isDark ? '#d1d7db' : '#3b4a54',
                      background: isActive
                        ? '#25D366'
                        : completed
                        ? isDark ? '#1a2730' : '#e9edef'
                        : isDark ? '#2a3942' : '#f0f2f5',
                    }}
                  >
                    {step.number}
                  </span>
                </button>
              );
            })}
          </div>
        ))}
      </nav>
    </div>
  );
};
