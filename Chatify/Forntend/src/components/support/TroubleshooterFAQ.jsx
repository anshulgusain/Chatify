import React, { useState } from 'react';
import { Search, ChevronDown, ChevronUp, AlertTriangle, CheckCircle2, HelpCircle, X } from 'lucide-react';
import { troubleshootItems } from '../../data/troubleshootData';
import { faqItems } from '../../data/faqData';

/* ─────────────── Troubleshooter ─────────────── */
const TroubleshootCard = ({ item }) => {
  const [open, setOpen] = useState(false);

  const badgeStyle = {
    red:   'bg-red-100 dark:bg-red-950/40 border-red-300 dark:border-red-800 text-red-700 dark:text-red-400',
    amber: 'bg-amber-100 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800 text-amber-700 dark:text-amber-400',
    green: 'bg-emerald-100 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400',
  };

  return (
    <div className={`border rounded-2xl overflow-hidden transition-all ${
      open
        ? 'border-emerald-300 dark:border-emerald-800 shadow-md shadow-emerald-500/5'
        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
    }`}>
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center gap-3 p-4 text-left bg-white dark:bg-[#1a2730] hover:bg-slate-50 dark:hover:bg-[#1e2f38] transition-colors"
      >
        <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="text-sm font-bold text-slate-900 dark:text-white truncate">{item.title}</div>
          {item.code && (
            <span className="font-mono text-[11px] text-slate-500 dark:text-slate-500">{item.code}</span>
          )}
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase ${badgeStyle[item.badgeColor] || badgeStyle.amber}`}>
            {item.category}
          </span>
          {open ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </div>
      </button>

      {open && (
        <div className="px-4 pb-4 pt-0 bg-white dark:bg-[#1a2730] border-t border-slate-100 dark:border-slate-800">
          <div className="space-y-3 pt-3">
            {item.cause && (
              <div>
                <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">Root Cause</div>
                <p className="text-xs text-slate-600 dark:text-slate-400 font-medium leading-relaxed">{item.cause}</p>
              </div>
            )}
            {item.howToCheck && item.howToCheck.length > 0 && (
              <div>
                <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">How to Diagnose</div>
                <ul className="space-y-1">
                  {item.howToCheck.map((s, i) => (
                    <li key={i} className="flex gap-2 text-xs text-slate-600 dark:text-slate-400 font-medium">
                      <span className="text-amber-500 flex-shrink-0">•</span> {s}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {item.howToFix && item.howToFix.length > 0 && (
              <div>
                <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                  Fix ({item.howToFix.length} step{item.howToFix.length > 1 ? 's' : ''})
                </div>
                <ol className="space-y-2">
                  {item.howToFix.map((sol, i) => (
                    <li key={i} className="flex gap-2.5 text-xs text-slate-700 dark:text-slate-300 font-medium">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center flex-shrink-0 font-extrabold text-[10px]">
                        {i + 1}
                      </span>
                      <span className="leading-relaxed">{sol}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export const Troubleshooter = () => {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', ...Array.from(new Set(troubleshootItems.map(i => i.category)))];

  const filtered = troubleshootItems.filter(item => {
    const matchesQuery =
      !query ||
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      (item.code && item.code.toLowerCase().includes(query.toLowerCase())) ||
      (item.cause && item.cause.toLowerCase().includes(query.toLowerCase()));
    const matchesCat = activeCategory === 'All' || item.category === activeCategory;
    return matchesQuery && matchesCat;
  });

  return (
    <div id="troubleshoot" className="scroll-mt-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-slate-200 dark:border-slate-800">
      <div className="mb-6">
        <div className="text-xs font-extrabold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-2">
          Debugging Guide
        </div>
        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
          Troubleshooter
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 font-medium">
          Find fixes for common errors quickly. Search by error code, symptom, or category.
        </p>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-wrap gap-3 mb-5">
        <div className="flex-1 min-w-[200px] relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search errors (e.g. 401, webhook, token)…"
            className="w-full pl-9 pr-4 py-2.5 bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 placeholder-slate-400 outline-none focus:border-emerald-400 dark:focus:border-emerald-600 transition-colors"
          />
          {query && (
            <button onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
        <div className="flex items-center gap-1.5 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all ${
                activeCategory === cat
                  ? 'bg-emerald-500 border-emerald-500 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-emerald-300 dark:hover:border-emerald-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="text-center py-10 text-slate-500 dark:text-slate-400 font-medium text-sm">
            No results found for "{query}". Try a different keyword.
          </div>
        ) : (
          filtered.map(item => <TroubleshootCard key={item.id} item={item} />)
        )}
      </div>
    </div>
  );
};

/* ─────────────── FAQ ─────────────── */
const FaqCard = ({ item }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={`border rounded-2xl overflow-hidden transition-all ${
      open
        ? 'border-emerald-300 dark:border-emerald-800'
        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
    }`}>
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center gap-3 p-4 text-left bg-white dark:bg-[#1a2730] hover:bg-slate-50 dark:hover:bg-[#1e2f38] transition-colors"
      >
        <HelpCircle className="w-4 h-4 text-blue-500 flex-shrink-0" />
        <span className="flex-1 text-sm font-bold text-slate-900 dark:text-white">{item.question}</span>
        {open ? <ChevronUp className="w-4 h-4 text-slate-400 flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />}
      </button>
      {open && (
        <div className="px-4 pb-4 bg-white dark:bg-[#1a2730] border-t border-slate-100 dark:border-slate-800">
          <p className="text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed pt-3">{item.answer}</p>
          {item.link && (
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 mt-3 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
            >
              Learn more →
            </a>
          )}
        </div>
      )}
    </div>
  );
};

export const FAQ = () => {
  const [query, setQuery] = useState('');
  const filtered = faqItems.filter(item =>
    !query ||
    item.question.toLowerCase().includes(query.toLowerCase()) ||
    item.answer.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div id="faq" className="scroll-mt-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-slate-200 dark:border-slate-800">
      <div className="mb-6">
        <div className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2">
          Reference
        </div>
        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
          Frequently Asked Questions
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 font-medium">
          Common questions about WhatsApp Cloud API, pricing, limits, and best practices.
        </p>
      </div>

      <div className="relative mb-5">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search questions…"
          className="w-full pl-9 pr-4 py-2.5 bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 placeholder-slate-400 outline-none focus:border-blue-400 dark:focus:border-blue-600 transition-colors"
        />
      </div>

      <div className="space-y-2.5">
        {filtered.length === 0 ? (
          <div className="text-center py-10 text-slate-500 dark:text-slate-400 font-medium text-sm">
            No matching questions for "{query}".
          </div>
        ) : (
          filtered.map(item => <FaqCard key={item.id} item={item} />)
        )}
      </div>
    </div>
  );
};
