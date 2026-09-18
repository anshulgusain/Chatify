import React from 'react';
import { ProgressProvider, useProgress } from './context/ProgressContext';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { Footer } from './components/layout/Footer';
import { SearchModal } from './components/search/SearchModal';
import { Hero } from './components/hero/Hero';
import { StepSection } from './components/tutorial/StepSection';
import { BotSimulator } from './components/interactive/BotSimulator';
import { Troubleshooter, FAQ } from './components/support/TroubleshooterFAQ';
import { tutorialSteps } from './data/tutorialData';
import './index.css';

const AppContent = () => {
  const { theme, isSearchOpen } = useProgress();
  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen flex flex-col ${isDark ? 'dark' : ''}`}>
      <div
        className="min-h-screen flex flex-col transition-colors duration-300"
        style={{ color: isDark ? '#e9edef' : '#111b21' }}
      >

        {/* Fixed Top Navbar */}
        <Navbar />

        {/* Search Modal (Portal) */}
        {isSearchOpen && <SearchModal />}

        {/* Body: Sidebar + Main Content */}
        <div className="flex flex-1 pt-16">

          {/* Sticky Left Sidebar (desktop only) */}
          <aside className="hidden lg:block w-72 xl:w-80 flex-shrink-0">
            <div
              className="sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto"
              style={{
                borderRight: `1px solid ${isDark ? '#374147' : '#e9edef'}`,
                background: isDark ? '#111b21' : '#ffffff',
              }}
            >
              <Sidebar />
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">

            {/* Hero Section */}
            <Hero />

            {/* ── Tutorial Steps ── */}
            <div id="tutorial-steps" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 scroll-mt-16">
              <div className="mb-8 pt-6 bg-white dark:bg-[#202c33] rounded-2xl px-6 py-5 border border-[#e9edef] dark:border-slate-700 shadow-sm">
                <div className="text-xs font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-2">
                  Full Tutorial
                </div>
                <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                  25-Step WhatsApp Bot Masterclass
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 font-medium">
                  Follow each step in order. Mark steps complete to track your progress — saved automatically in your browser.
                </p>

                {/* Progress Banner */}
                <ProgressBanner />
              </div>

              {/* All Steps */}
              {tutorialSteps.map((step) => (
                <StepSection key={step.id} step={step} />
              ))}
            </div>

            {/* ── Bot Simulator ── */}
            <BotSimulator />

            {/* ── Troubleshooter ── */}
            <Troubleshooter />

            {/* ── FAQ ── */}
            <FAQ />

            {/* ── Footer ── */}
            <Footer />
          </main>
        </div>
      </div>
    </div>
  );
};

const ProgressBanner = () => {
  const { completedCount, totalSteps, percentComplete, resetProgress } = useProgress();
  if (completedCount === 0) return null;

  return (
    <div className="mt-6 p-4 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 rounded-2xl flex flex-wrap items-center gap-4">
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-sm font-bold text-emerald-700 dark:text-emerald-300">
            Your Progress
          </span>
          <span className="text-sm font-extrabold text-emerald-700 dark:text-emerald-300">
            {completedCount}/{totalSteps} ({percentComplete}%)
          </span>
        </div>
        <div className="h-2 rounded-full bg-emerald-200 dark:bg-emerald-900 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-700"
            style={{ width: `${percentComplete}%` }}
          />
        </div>
      </div>
      <button
        onClick={resetProgress}
        className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:text-red-500 dark:hover:text-red-400 transition-colors whitespace-nowrap"
      >
        Reset Progress
      </button>
    </div>
  );
};

function App() {
  return (
    <ProgressProvider>
      <AppContent />
    </ProgressProvider>
  );
}

export default App;
