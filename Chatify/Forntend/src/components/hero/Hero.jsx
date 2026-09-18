import React from 'react';
import { useProgress } from '../../context/ProgressContext';
import { tutorialSteps } from '../../data/tutorialData';
import { InteractiveArchitecture } from '../hero/InteractiveArchitecture';
import { MessageSquare, Layers, Zap, ArrowRight, Code2, CheckCircle2, Shield } from 'lucide-react';

export const Hero = () => {
  const { completedCount, totalSteps, percentComplete, firstIncompleteStep, setActiveStepId, theme } = useProgress();
  const isDark = theme === 'dark';

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleStart = () => {
    const first = tutorialSteps[0];
    setActiveStepId(first.id);
    scrollTo(first.id);
  };

  const techBadges = [
    { label: 'Meta Cloud API v20.0', bg: '#e3f2fd', color: '#1565c0' },
    { label: 'Node.js + Express',    bg: '#e8f5e9', color: '#2e7d32' },
    { label: 'Webhook',              bg: '#f3e5f5', color: '#6a1b9a' },
    { label: 'MongoDB',              bg: '#e0f2f1', color: '#00695c' },
    { label: 'ngrok',                bg: '#fff3e0', color: '#e65100' },
    { label: 'Google Gemini / OpenAI', bg: '#fce4ec', color: '#880e4f' },
  ];

  const stats = [
    { value: `${totalSteps}`, label: 'Tutorial Steps', icon: Code2, color: '#128C7E' },
    { value: '1,000', label: 'Free Messages/Month', icon: MessageSquare, color: '#25D366' },
    { value: 'v20.0', label: 'Graph API Version', icon: Zap, color: '#128C7E' },
    { value: `${completedCount}/${totalSteps}`, label: 'Your Progress', icon: CheckCircle2, color: '#25D366' },
  ];

  return (
    <div id="hero">
      {/* ── Hero Banner ── */}
      <div
        style={{
          background: isDark ? '#202c33' : '#ffffff',
          borderBottom: `1px solid ${isDark ? '#374147' : '#e9edef'}`,
        }}
      >
        {/* Top green accent line */}
        <div style={{ height: 4, background: 'linear-gradient(90deg, #25D366, #128C7E, #075E54)' }} />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">

          {/* Live badge */}
          <div className="flex items-center gap-2 mb-6">
            <span
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-bold"
              style={{
                background: isDark ? 'rgba(37,211,102,0.12)' : '#d9fdd3',
                color: '#128C7E',
                border: '1px solid #b7ecc9',
              }}
            >
              <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
              Meta Graph API v20.0 · 2026 Edition
            </span>
          </div>

          {/* ── Main Headline ── */}
          <h1
            className="font-extrabold tracking-tight leading-tight mb-6"
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              color: isDark ? '#e9edef' : '#111b21',
            }}
          >
            Build Your Own{' '}
            <span style={{ color: '#25D366' }}>WhatsApp Chatbot</span>
            <br />
            <span
              style={{
                fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)',
                color: isDark ? '#8696a0' : '#54656f',
                fontWeight: 700,
              }}
            >
              with Meta WhatsApp Cloud API
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className="text-lg sm:text-xl font-medium max-w-2xl leading-relaxed mb-8"
            style={{ color: isDark ? '#8696a0' : '#54656f' }}
          >
            Complete step-by-step developer masterclass — from Meta Developer Account setup
            to production-ready Node.js webhook backend with MongoDB, AI integration, and deployment.
          </p>

          {/* Tech Badges */}
          <div className="flex flex-wrap gap-2 mb-10">
            {techBadges.map((b) => (
              <span
                key={b.label}
                className="text-sm font-bold px-3 py-1.5 rounded-full"
                style={{
                  background: isDark ? 'rgba(255,255,255,0.06)' : b.bg,
                  color: isDark ? '#aebac1' : b.color,
                  border: `1px solid ${isDark ? '#374147' : 'transparent'}`,
                }}
              >
                {b.label}
              </span>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-3 mb-12">
            <button
              onClick={handleStart}
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl text-base font-bold text-white transition-all hover:opacity-90 shadow-lg"
              style={{ background: 'linear-gradient(135deg, #25D366, #128C7E)' }}
            >
              <Zap className="w-5 h-5" />
              {completedCount > 0 ? 'Continue Tutorial' : 'Start Tutorial'}
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={() => scrollTo('architecture')}
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl text-base font-semibold transition-all"
              style={{
                background: isDark ? '#2a3942' : '#f0f2f5',
                color: isDark ? '#e9edef' : '#111b21',
                border: `1px solid ${isDark ? '#374147' : '#e9edef'}`,
              }}
            >
              <Layers className="w-5 h-5" />
              View Architecture
            </button>

            <button
              onClick={() => scrollTo('interactive-demo')}
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl text-base font-semibold transition-all"
              style={{
                background: isDark ? '#2a3942' : '#f0f2f5',
                color: isDark ? '#e9edef' : '#111b21',
                border: `1px solid ${isDark ? '#374147' : '#e9edef'}`,
              }}
            >
              <MessageSquare className="w-5 h-5" />
              Try Bot Simulator
            </button>
          </div>

          {/* ── Stats Cards ── */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {stats.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.label}
                  className="rounded-2xl p-5 text-center transition-all hover:scale-[1.02]"
                  style={{
                    background: isDark ? '#1a2730' : '#ffffff',
                    border: `1px solid ${isDark ? '#374147' : '#e9edef'}`,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                  }}
                >
                  <Icon className="w-5 h-5 mx-auto mb-2" style={{ color: s.color }} />
                  <div
                    className="text-2xl font-extrabold mb-1"
                    style={{ color: isDark ? '#e9edef' : '#111b21' }}
                  >
                    {s.value}
                  </div>
                  <div
                    className="text-xs font-semibold"
                    style={{ color: isDark ? '#8696a0' : '#54656f' }}
                  >
                    {s.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Architecture Section ── */}
      <div
        id="architecture"
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14"
        style={{ scrollMarginTop: '5rem' }}
      >
        <div className="mb-6">
          <p
            className="text-xs font-extrabold uppercase tracking-widest mb-2"
            style={{ color: '#25D366' }}
          >
            System Architecture
          </p>
          <h2
            className="text-3xl font-extrabold mb-2"
            style={{ color: isDark ? '#e9edef' : '#111b21' }}
          >
            How the WhatsApp Bot Works End-to-End
          </h2>
          <p style={{ color: isDark ? '#8696a0' : '#54656f' }} className="text-base font-medium">
            Click each node card to understand its role in the data pipeline.
          </p>
        </div>
        <InteractiveArchitecture />
      </div>
    </div>
  );
};
