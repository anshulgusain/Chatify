import React, { useState } from 'react';
import { 
  Smartphone, 
  Cloud, 
  Zap, 
  Server, 
  Bot, 
  Database, 
  ArrowRight,
  Info,
  X
} from 'lucide-react';

export const InteractiveArchitecture = () => {
  const [selectedNode, setSelectedNode] = useState(null);

  const architectureNodes = [
    {
      id: "user",
      name: "WhatsApp User",
      subtitle: "Customer Device",
      icon: Smartphone,
      color: "bg-blue-500",
      badge: "Step 1",
      detail: "Customer sends a text message ('hi', 'menu', 'pricing') from their personal mobile phone using WhatsApp app."
    },
    {
      id: "meta-cloud",
      name: "Meta Cloud API",
      subtitle: "WhatsApp Servers",
      icon: Cloud,
      color: "bg-emerald-500",
      badge: "Step 2",
      detail: "Meta receives the message and dispatches a POST Webhook request to your registered HTTPS server callback endpoint."
    },
    {
      id: "webhook",
      name: "Webhook Route",
      subtitle: "POST /webhook",
      icon: Zap,
      color: "bg-amber-500",
      badge: "Step 3",
      detail: "Express server receives HTTP POST payload, verifies security headers, and extracts sender phone number & message text."
    },
    {
      id: "express",
      name: "Node.js Express",
      subtitle: "Backend Server",
      icon: Server,
      color: "bg-purple-500",
      badge: "Step 4",
      detail: "Node.js processes business logic, executes keyword routing, and communicates with MongoDB to fetch context."
    },
    {
      id: "bot-logic",
      name: "Bot Logic / AI",
      subtitle: "Keyword or Gemini",
      icon: Bot,
      color: "bg-indigo-500",
      badge: "Step 5",
      detail: "Evaluates keyword rules or invokes Google Gemini / OpenAI LLM API to format exact reply response text."
    },
    {
      id: "mongodb",
      name: "MongoDB Database",
      subtitle: "Session Store",
      icon: Database,
      color: "bg-teal-500",
      badge: "Step 6",
      detail: "Stores user conversation history, order statuses, multi-step form progress, and lead generation details."
    }
  ];

  return (
    <div className="bg-white dark:bg-[#111b21] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            Interactive Data Pipeline
          </div>
          <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mt-1">
            WhatsApp Cloud API Pipeline Visualizer
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Click any node card below to inspect its role and data payload structure.
          </p>
        </div>

        <span className="text-[11px] font-semibold px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-full w-fit">
          💡 Click node for details
        </span>
      </div>

      {/* Nodes Horizontal Flow Container */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 pt-2">
        {architectureNodes.map((node, index) => {
          const Icon = node.icon;
          const isSelected = selectedNode?.id === node.id;

          return (
            <div key={node.id} className="relative group">
              <button
                onClick={() => setSelectedNode(node)}
                className={`w-full h-full text-left p-4 rounded-2xl border transition-all duration-200 flex flex-col justify-between space-y-3 ${
                  isSelected
                    ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/40 shadow-md ring-2 ring-emerald-500/20 scale-[1.02]'
                    : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:border-emerald-300 dark:hover:border-emerald-700 hover:bg-white dark:hover:bg-slate-800 hover:-translate-y-1'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500">
                    {node.badge}
                  </span>
                  <div className={`w-8 h-8 rounded-xl ${node.color} text-white flex items-center justify-center shadow-xs`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-extrabold text-slate-900 dark:text-white leading-tight">
                    {node.name}
                  </h4>
                  <p className="text-[10px] font-medium text-slate-500 dark:text-slate-400 mt-0.5">
                    {node.subtitle}
                  </p>
                </div>
              </button>

              {/* Arrow Connector Indicator for Desktop */}
              {index < architectureNodes.length - 1 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
                  <div className="w-6 h-6 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-400 shadow-xs">
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Selected Node Detail Modal / Panel */}
      {selectedNode && (
        <div className="bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/80 rounded-2xl p-4 sm:p-5 flex items-start gap-4 animate-in fade-in duration-200">
          <div className={`w-10 h-10 rounded-xl ${selectedNode.color} text-white flex items-center justify-center flex-shrink-0 shadow-md`}>
            <selectedNode.icon className="w-5 h-5" />
          </div>

          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                {selectedNode.badge} — {selectedNode.subtitle}
              </span>
              <button 
                onClick={() => setSelectedNode(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">
              {selectedNode.name}
            </h4>

            <p className="text-xs text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
              {selectedNode.detail}
            </p>
          </div>
        </div>
      )}

    </div>
  );
};
