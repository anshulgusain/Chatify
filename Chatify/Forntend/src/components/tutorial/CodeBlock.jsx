import React, { useState } from 'react';
import { Copy, Check, Terminal, ChevronDown, ChevronUp } from 'lucide-react';

export const CodeBlock = ({ code, language = 'javascript', fileName = '', title = '' }) => {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(true);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = code;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.split('\n');
  const langColors = {
    javascript: 'text-yellow-400 bg-yellow-950/40 border-yellow-800/50',
    bash: 'text-green-400 bg-green-950/40 border-green-800/50',
    env: 'text-blue-400 bg-blue-950/40 border-blue-800/50',
    json: 'text-orange-400 bg-orange-950/40 border-orange-800/50',
    html: 'text-red-400 bg-red-950/40 border-red-800/50',
    css: 'text-purple-400 bg-purple-950/40 border-purple-800/50',
    jsx: 'text-cyan-400 bg-cyan-950/40 border-cyan-800/50',
  };
  const langClass = langColors[language] || langColors.javascript;

  return (
    <div className="rounded-2xl overflow-hidden border border-slate-700/60 shadow-xl my-4">
      {/* macOS Window Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#1e2b32] border-b border-slate-700/50">
        {/* Traffic Lights */}
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500 hover:opacity-80 transition-opacity cursor-default" />
            <div className="w-3 h-3 rounded-full bg-yellow-500 hover:opacity-80 transition-opacity cursor-default" />
            <div className="w-3 h-3 rounded-full bg-green-500 hover:opacity-80 transition-opacity cursor-default" />
          </div>
          {fileName && (
            <span className="font-mono text-xs text-slate-400 font-medium">{fileName}</span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <span className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded-md border uppercase tracking-wider ${langClass}`}>
            {language}
          </span>
          <button
            onClick={() => setExpanded(e => !e)}
            className="p-1 text-slate-500 hover:text-slate-300 transition-colors"
            title={expanded ? 'Collapse' : 'Expand'}
          >
            {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={handleCopy}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold transition-all duration-200 ${
              copied
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                : 'bg-slate-700/60 text-slate-400 hover:bg-slate-700 hover:text-slate-200 border border-slate-700'
            }`}
          >
            {copied ? (
              <><Check className="w-3 h-3" /> Copied!</>
            ) : (
              <><Copy className="w-3 h-3" /> Copy</>
            )}
          </button>
        </div>
      </div>

      {/* Code Body with Line Numbers */}
      {expanded && (
        <div className="bg-[#111b21] overflow-x-auto custom-scrollbar">
          <table className="w-full text-left font-mono text-sm">
            <tbody>
              {lines.map((line, i) => (
                <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                  <td className="pl-4 pr-4 py-0 text-slate-600 select-none text-right w-8 text-xs border-r border-slate-800 align-top pt-0.5">
                    {i + 1}
                  </td>
                  <td className="pl-4 pr-4 py-0.5 text-slate-200 whitespace-pre text-xs leading-relaxed">
                    {line || ' '}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export const TerminalBlock = ({ commands = [] }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const text = commands.join('\n');
    try { await navigator.clipboard.writeText(text); } catch { /* fallback */ }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-2xl overflow-hidden border border-slate-700/60 shadow-xl my-4">
      <div className="flex items-center justify-between px-4 py-3 bg-[#1e2b32] border-b border-slate-700/50">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400">
            <Terminal className="w-3.5 h-3.5" />
            <span>Terminal</span>
          </div>
        </div>
        <button
          onClick={handleCopy}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
            copied ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-700/60 text-slate-400 hover:text-slate-200'
          }`}
        >
          {copied ? <><Check className="w-3 h-3" /> Copied</> : <><Copy className="w-3 h-3" /> Copy</>}
        </button>
      </div>
      <div className="bg-[#0b141a] p-4 space-y-1.5">
        {commands.map((cmd, i) => (
          <div key={i} className="flex items-start gap-2 font-mono text-sm">
            <span className="text-emerald-500 select-none flex-shrink-0">$</span>
            <span className="text-slate-200">{cmd}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
