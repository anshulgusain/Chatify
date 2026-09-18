import React from 'react';
import { useProgress } from '../../context/ProgressContext';
import { tutorialSteps } from '../../data/tutorialData';
import { CodeBlock, TerminalBlock } from './CodeBlock';
import { CalloutBox } from './CalloutBoxes';
import {
  CheckCircle2, Circle, ChevronRight, ChevronLeft, Award,
  Clock, ListChecks, Zap, AlertTriangle, ArrowRight,
  MessageSquare, Target, HelpCircle
} from 'lucide-react';

const AnnotatedMockup = ({ mockup }) => {
  if (!mockup) return null;
  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden shadow-md my-4">
      <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-yellow-400" />
          <div className="w-3 h-3 rounded-full bg-green-400" />
        </div>
        <span className="font-mono text-xs text-slate-500 dark:text-slate-400 ml-2">
          {mockup.headerText || mockup.url || 'Meta Developer Portal'}
        </span>
      </div>
      <div className="bg-white dark:bg-[#0f1923] p-6 space-y-3">
        <div className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
          {mockup.screenTitle || mockup.title}
        </div>
        {mockup.actionText && (
          <div className="flex items-center gap-3 p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 rounded-xl">
            <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center flex-shrink-0 text-xs font-bold">
              →
            </div>
            <div>
              <div className="text-xs font-bold text-emerald-700 dark:text-emerald-300">Action Required</div>
              <div className="text-xs text-emerald-600 dark:text-emerald-400 font-medium mt-0.5">{mockup.actionText}</div>
            </div>
          </div>
        )}
        {mockup.targetButton && (
          <div className="flex items-center gap-2 mt-2">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Target button:</span>
            <span className="px-3 py-1 bg-blue-600 text-white rounded-lg text-xs font-bold shadow-sm">
              {mockup.targetButton}
            </span>
            <span className="text-lg animate-bounce">↑</span>
          </div>
        )}
        <p className="text-[10px] text-slate-400 dark:text-slate-500 italic mt-2">
          Meta frequently updates its Developer Dashboard. Menu names and screen layouts may differ slightly.
        </p>
      </div>
    </div>
  );
};

export const StepSection = ({ step }) => {
  const { isStepCompleted, toggleStepCompletion, setActiveStepId, theme } = useProgress();
  const isDark = theme === 'dark';
  const completed = isStepCompleted(step.id);
  const currentIndex = tutorialSteps.findIndex(s => s.id === step.id);
  const prevStep = currentIndex > 0 ? tutorialSteps[currentIndex - 1] : null;
  const nextStep = currentIndex < tutorialSteps.length - 1 ? tutorialSteps[currentIndex + 1] : null;

  const handleNav = (targetStep) => {
    if (!targetStep) return;
    setActiveStepId(targetStep.id);
    const el = document.getElementById(targetStep.id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section
      id={step.id}
      className="py-10 px-6 rounded-2xl mb-3 shadow-sm scroll-mt-20"
      style={{
        background: isDark ? '#1a2730' : '#ffffff',
        border: `1px solid ${isDark ? '#374147' : '#e9edef'}`,
      }}
    >
      {/* Step Header */}
      <div className="flex flex-wrap items-start gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white font-mono font-extrabold text-base shadow-lg ${
            completed ? 'bg-emerald-500 shadow-emerald-500/30' : 'bg-slate-800 dark:bg-slate-700'
          }`}>
            {completed ? <CheckCircle2 className="w-6 h-6" /> : step.number}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-900 px-2.5 py-0.5 rounded-full">
              {step.categoryLabel}
            </span>
            <span className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400 font-medium">
              <Clock className="w-3 h-3" /> ~{step.estimatedMinutes} min
            </span>
            {completed && (
              <span className="flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full">
                <Award className="w-3 h-3" /> Completed
              </span>
            )}
          </div>
          <h2
            className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight"
            style={{ color: isDark ? '#e9edef' : '#111b21' }}
          >
            {step.title}
          </h2>
          <p
            className="text-base font-medium mt-2 leading-relaxed"
            style={{ color: isDark ? '#8696a0' : '#54656f' }}
          >
            {step.summary}
          </p>
        </div>
      </div>

      {/* WHAT YOU'LL DO */}
      {step.whatYouWillDo && (
        <div className="rounded-2xl p-5 mb-5" style={{ background: '#f0f9ff', border: '1.5px solid #128C7E' }}>
          <div className="flex items-center gap-2 mb-3">
            <ListChecks className="w-4 h-4" style={{ color: '#128C7E' }} />
            <h3 className="text-sm font-extrabold uppercase tracking-wider" style={{ color: '#075E54' }}>
              What You'll Do
            </h3>
          </div>
          <ol className="space-y-2">
            {step.whatYouWillDo.map((item, i) => {
              const colors = [
                { bg: '#d9fdd3', color: '#075E54' },  // green
                { bg: '#fef9c3', color: '#854d0e' },  // yellow
                { bg: '#fce7f3', color: '#9d174d' },  // pink
                { bg: '#dbeafe', color: '#1e40af' },  // blue
                { bg: '#ede9fe', color: '#4c1d95' },  // purple
                { bg: '#ffedd5', color: '#7c2d12' },  // orange
              ];
              const c = colors[i % colors.length];
              return (
                <li key={i} className="flex gap-3 text-base font-medium" style={{ color: '#111b21' }}>
                  <span
                    className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-extrabold mt-0.5"
                    style={{ background: c.bg, color: c.color }}
                  >
                    {i + 1}
                  </span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              );
            })}
          </ol>
        </div>
      )}

      {/* WHY IT MATTERS */}
      {step.whyItMatters && (
        <CalloutBox type="info" title="Why This Matters">
          {step.whyItMatters}
        </CalloutBox>
      )}

      {/* ANNOTATED MOCKUP */}
      {step.mockup && <AnnotatedMockup mockup={step.mockup} />}

      {/* WHAT TO ENTER */}
      {step.whatToEnter && (
        <div className="my-4 p-4 rounded-xl" style={{ background: '#eff6ff', border: '1.5px solid #3b82f6' }}>
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-5 h-5" style={{ color: '#2563eb' }} />
            <span className="text-sm font-extrabold uppercase tracking-wider" style={{ color: '#1e3a8a' }}>
              What to Enter
            </span>
          </div>
          <p className="font-mono text-base font-semibold" style={{ color: '#1a1a1a' }}>{step.whatToEnter}</p>
        </div>
      )}

      {/* CODE SNIPPET */}
      {step.codeSnippet && (
        <CodeBlock
          code={step.codeSnippet.code}
          language={step.codeSnippet.language}
          fileName={step.codeSnippet.fileName}
        />
      )}

      {/* HINGLISH HELPER NOTE */}
      {step.hinglishNote && (
        <div className="my-4 flex gap-3 p-4 rounded-xl" style={{ background: '#fff8e1', border: '1.5px solid #f59e0b' }}>
          <MessageSquare className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#d97706' }} />
          <p className="text-base font-medium leading-relaxed" style={{ color: '#1a1a1a' }}>
            💡 <em>{step.hinglishNote}</em>
          </p>
        </div>
      )}

      {/* EXPECTED RESULT */}
      {step.expectedResult && (
        <div className="my-4 flex gap-3 p-4 rounded-xl" style={{ background: '#f0fdf4', border: '1.5px solid #25D366' }}>
          <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#16a34a' }} />
          <div>
            <span className="block text-sm font-extrabold uppercase tracking-wider mb-1" style={{ color: '#14532d' }}>
              Expected Result
            </span>
            <p className="text-base font-medium" style={{ color: '#1a1a1a' }}>{step.expectedResult}</p>
          </div>
        </div>
      )}

      {/* COMMON MISTAKES */}
      {step.commonMistakes && step.commonMistakes.length > 0 && (
        <div className="my-4 p-4 rounded-xl" style={{ background: '#fff1f2', border: '1.5px solid #ef4444' }}>
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-5 h-5" style={{ color: '#dc2626' }} />
            <span className="text-sm font-extrabold uppercase tracking-wider" style={{ color: '#7f1d1d' }}>
              Common Mistakes
            </span>
          </div>
          <ul className="space-y-2">
            {step.commonMistakes.map((m, i) => (
              <li key={i} className="flex gap-2 text-base font-medium" style={{ color: '#1a1a1a' }}>
                <span className="font-bold flex-shrink-0" style={{ color: '#dc2626' }}>✗</span>
                {m}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* NEXT ACTION */}
      {step.nextAction && step.nextStepId && (
        <div className="my-6 flex items-center justify-between p-4 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 rounded-2xl">
          <div className="flex items-center gap-3">
            <ArrowRight className="w-5 h-5 text-emerald-500" />
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                Next Action
              </div>
              <div className="text-sm font-semibold text-emerald-800 dark:text-emerald-200 mt-0.5">
                {step.nextAction}
              </div>
            </div>
          </div>
          <button
            onClick={() => handleNav(nextStep)}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-sm font-bold transition-all shadow-md shadow-emerald-500/20 hover:scale-[1.02]"
          >
            Continue <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* CHECKPOINT / NAVIGATION ROW */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-4 mt-6 border-t border-slate-200 dark:border-slate-800">
        {/* Previous */}
        <button
          onClick={() => handleNav(prevStep)}
          disabled={!prevStep}
          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        >
          <ChevronLeft className="w-4 h-4" />
          {prevStep ? `Step ${prevStep.number}` : 'Previous'}
        </button>

        {/* Mark Complete */}
        <button
          onClick={() => toggleStepCompletion(step.id)}
          className={`flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-bold transition-all shadow-sm ${
            completed
              ? 'bg-emerald-500 text-white shadow-emerald-500/20 hover:bg-emerald-600'
              : 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:opacity-90'
          }`}
        >
          {completed ? (
            <><CheckCircle2 className="w-4 h-4" /> Completed ✓</>
          ) : (
            <><Circle className="w-4 h-4" /> Mark as Complete</>
          )}
        </button>

        {/* Next */}
        <button
          onClick={() => handleNav(nextStep)}
          disabled={!nextStep}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        >
          {nextStep ? `Step ${nextStep.number}` : 'Finish'}
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};
