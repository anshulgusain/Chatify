import React, { useEffect, useState, useRef } from 'react';
import { useProgress } from '../../context/ProgressContext';
import { tutorialSteps } from '../../data/tutorialData';
import { troubleshootItems } from '../../data/troubleshootData';
import { faqItems } from '../../data/faqData';
import { Search, X, BookOpen, AlertTriangle, HelpCircle, ArrowRight, CornerDownLeft } from 'lucide-react';

export const SearchModal = () => {
  const { isSearchOpen, setIsSearchOpen, setActiveStepId } = useProgress();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  // Keyboard shortcut listener (Cmd+K / Ctrl+K / Escape)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      } else if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  // Focus input when modal opens
  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  // Build unified search dataset
  const stepResults = tutorialSteps
    .filter(step => 
      step.title.toLowerCase().includes(query.toLowerCase()) ||
      step.number.includes(query) ||
      step.summary.toLowerCase().includes(query.toLowerCase()) ||
      (step.codeSnippet && step.codeSnippet.code.toLowerCase().includes(query.toLowerCase()))
    )
    .map(step => ({
      id: step.id,
      title: `Step ${step.number} — ${step.title}`,
      subtitle: step.summary,
      category: step.categoryLabel,
      type: 'step',
      icon: BookOpen
    }));

  const troubleshootResults = troubleshootItems
    .filter(item => 
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.code.toLowerCase().includes(query.toLowerCase()) ||
      item.cause.toLowerCase().includes(query.toLowerCase())
    )
    .map(item => ({
      id: 'troubleshooting',
      title: `${item.code} — ${item.title}`,
      subtitle: item.cause,
      category: 'TROUBLESHOOTING',
      type: 'troubleshoot',
      icon: AlertTriangle
    }));

  const faqResults = faqItems
    .filter(item => 
      item.question.toLowerCase().includes(query.toLowerCase()) ||
      item.answer.toLowerCase().includes(query.toLowerCase())
    )
    .map(item => ({
      id: 'faq',
      title: item.question,
      subtitle: item.answer,
      category: 'FAQ',
      type: 'faq',
      icon: HelpCircle
    }));

  const allResults = [...stepResults, ...troubleshootResults, ...faqResults];

  const handleSelectResult = (result) => {
    setIsSearchOpen(false);
    if (result.type === 'step') {
      setActiveStepId(result.id);
    }
    const el = document.getElementById(result.id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4">
      {/* Backdrop */}
      <div 
        onClick={() => setIsSearchOpen(false)}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
      />

      {/* Search Card Container */}
      <div className="relative w-full max-w-2xl bg-white dark:bg-[#111b21] rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[80vh] z-10 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Input Bar */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-emerald-500 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setSelectedIndex(0); }}
            placeholder="Search documentation, steps, code, errors, FAQs..."
            className="w-full bg-transparent text-sm font-semibold text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs font-semibold"
            >
              Clear
            </button>
          )}
          <button 
            onClick={() => setIsSearchOpen(false)}
            className="p-1 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results Body */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          {allResults.length === 0 ? (
            <div className="py-12 text-center space-y-2">
              <Search className="w-8 h-8 text-slate-300 dark:text-slate-600 mx-auto" />
              <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                No documentation matches "{query}"
              </p>
              <p className="text-xs text-slate-400 dark:text-slate-500">
                Try searching for 'webhook', 'token', 'express', or 'mongodb'
              </p>
            </div>
          ) : (
            allResults.map((result, idx) => {
              const Icon = result.icon;
              const isSelected = idx === selectedIndex;

              return (
                <button
                  key={`${result.id}-${idx}`}
                  onClick={() => handleSelectResult(result)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full flex items-start gap-3 p-3 rounded-xl text-left transition-all group ${
                    isSelected 
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/80 shadow-2xs' 
                      : 'hover:bg-slate-50 dark:hover:bg-slate-800/60 border border-transparent'
                  }`}
                >
                  <div className={`p-2 rounded-lg ${
                    isSelected ? 'bg-emerald-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                        {result.title}
                      </span>
                      <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                        {result.category}
                      </span>
                    </div>

                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5 font-medium">
                      {result.subtitle}
                    </p>
                  </div>

                  <ArrowRight className={`w-4 h-4 self-center transition-transform ${
                    isSelected ? 'text-emerald-500 translate-x-1' : 'opacity-0'
                  }`} />
                </button>
              );
            })
          )}
        </div>

        {/* Footer shortcuts helper */}
        <div className="p-3 bg-slate-50 dark:bg-[#1a252c] border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500 font-medium">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-white dark:bg-slate-900 border rounded text-[10px]">↵</kbd> Select
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-white dark:bg-slate-900 border rounded text-[10px]">ESC</kbd> Close
            </span>
          </div>
          <span>{allResults.length} Results</span>
        </div>

      </div>

    </div>
  );
};
