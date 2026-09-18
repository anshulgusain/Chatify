import React, { useEffect, useState } from 'react';
import { AlignLeft } from 'lucide-react';

export const TableOfContents = () => {
  const [activeId, setActiveId] = useState('');

  const tocItems = [
    { id: "hero", label: "Overview & Architecture" },
    { id: "step-01", label: "01 Cloud API Overview" },
    { id: "step-03", label: "03 Meta Account & App" },
    { id: "step-06", label: "06 Test Phone & Tokens" },
    { id: "step-09", label: "09 Node.js Backend" },
    { id: "step-11", label: "11 Webhook Verification" },
    { id: "interactive-demo", label: "⚡ WhatsApp Simulator" },
    { id: "webhook-visualizer", label: "🔄 Webhook Flow Visualizer" },
    { id: "step-15", label: "15 MongoDB Integration" },
    { id: "step-17", label: "17 Business Verification" },
    { id: "step-21", label: "21 Cloud Deployment" },
    { id: "troubleshooting", label: "🛠️ Troubleshooting" },
    { id: "faq", label: "❓ FAQ" }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -70% 0px' }
    );

    tocItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleClick = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <aside className="hidden xl:block w-64 flex-shrink-0 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto p-4 space-y-4 text-xs">
      <div className="flex items-center gap-2 font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
        <AlignLeft className="w-3.5 h-3.5 text-emerald-500" />
        <span>On This Page</span>
      </div>

      <nav className="space-y-1 border-l border-slate-200 dark:border-slate-800 pl-3">
        {tocItems.map((item) => {
          const isActive = activeId === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleClick(item.id)}
              className={`block w-full text-left py-1.5 px-2 rounded-lg font-medium transition-all ${
                isActive
                  ? 'text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/40 -ml-3.5 border-l-2 border-emerald-500 pl-3'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </nav>
    </aside>
  );
};
