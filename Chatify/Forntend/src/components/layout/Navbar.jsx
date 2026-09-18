import React, { useState, useEffect } from 'react';
import { useProgress } from '../../context/ProgressContext';
import { siteConfig } from '../../config/siteConfig';
import {
  MessageSquare,
  Search,
  Sun,
  Moon,
  Menu,
  Sparkles,
  Layers,
  Webhook,
  ShieldCheck,
  HelpCircle,
  GitBranch,
  X
} from 'lucide-react';

export const Navbar = ({ onOpenMobileMenu }) => {
  const { theme, toggleTheme, percentComplete, completedCount, totalSteps, setIsSearchOpen } = useProgress();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Tutorial', href: '#step-01', icon: Sparkles },
    { label: 'Architecture', href: '#architecture', icon: Layers },
    { label: 'Simulator', href: '#interactive-demo', icon: MessageSquare },
    { label: 'Troubleshoot', href: '#troubleshoot', icon: Webhook },
    { label: 'FAQ', href: '#faq', icon: HelpCircle },
  ];

  const scrollTo = (href) => {
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-200 ${
          isScrolled
            ? 'shadow-md'
            : 'shadow-sm'
        }`}
        style={{
          background: theme === 'dark' ? '#202c33' : '#ffffff',
          borderBottom: theme === 'dark' ? '1px solid #374147' : '1px solid #e9edef',
        }}
      >
        {/* Progress bar at very top */}
        <div
          className="absolute top-0 left-0 h-[3px] transition-all duration-500"
          style={{
            width: `${percentComplete}%`,
            background: 'linear-gradient(90deg, #25D366, #128C7E)',
          }}
        />

        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 gap-4">

          {/* Left: Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(o => !o)}
              className="lg:hidden p-2 rounded-lg transition-colors"
              style={{ color: theme === 'dark' ? '#aebac1' : '#54656f' }}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <a href="#" className="flex items-center gap-2.5 group">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-md flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, #25D366, #128C7E)' }}
              >
                <MessageSquare className="w-5 h-5 fill-white" />
              </div>
              <div className="hidden sm:block">
                <div className="flex items-center gap-2">
                  <span
                    className="font-extrabold text-base tracking-tight"
                    style={{ color: theme === 'dark' ? '#e9edef' : '#111b21' }}
                  >
                    WA Cloud API
                  </span>
                  <span
                    className="text-[11px] font-bold px-2 py-0.5 rounded-full"
                    style={{
                      background: theme === 'dark' ? 'rgba(37,211,102,0.15)' : '#d9fdd3',
                      color: '#128C7E',
                    }}
                  >
                    {siteConfig.version}
                  </span>
                </div>
                <p
                  className="text-[12px] font-medium leading-none mt-0.5"
                  style={{ color: theme === 'dark' ? '#8696a0' : '#54656f' }}
                >
                  Developer Masterclass Guide
                </p>
              </div>
            </a>
          </div>

          {/* Center: Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  onClick={() => scrollTo(item.href)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold transition-all hover:bg-[#f0f2f5] dark:hover:bg-slate-800"
                  style={{ color: theme === 'dark' ? '#aebac1' : '#54656f' }}
                >
                  <Icon className="w-3.5 h-3.5 opacity-70" />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium border transition-colors"
              style={{
                background: theme === 'dark' ? '#2a3942' : '#f0f2f5',
                border: theme === 'dark' ? '1px solid #374147' : '1px solid #e9edef',
                color: theme === 'dark' ? '#8696a0' : '#54656f',
              }}
            >
              <Search className="w-4 h-4" />
              <span className="hidden sm:inline">Search docs...</span>
              <kbd
                className="hidden sm:inline text-[10px] font-mono px-1.5 py-0.5 rounded"
                style={{
                  background: theme === 'dark' ? '#111b21' : '#ffffff',
                  border: theme === 'dark' ? '1px solid #374147' : '1px solid #d1d7db',
                  color: theme === 'dark' ? '#8696a0' : '#54656f',
                }}
              >
                ⌘K
              </kbd>
            </button>

            {/* Progress pill */}
            <div
              className="hidden lg:flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold border"
              style={{
                background: theme === 'dark' ? 'rgba(37,211,102,0.08)' : '#d9fdd3',
                border: theme === 'dark' ? '1px solid rgba(37,211,102,0.2)' : '1px solid #b7ecc9',
                color: theme === 'dark' ? '#25D366' : '#128C7E',
              }}
            >
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ background: '#25D366' }}
              />
              {completedCount}/{totalSteps} Steps
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl border transition-colors"
              style={{
                background: theme === 'dark' ? '#2a3942' : '#f0f2f5',
                border: theme === 'dark' ? '1px solid #374147' : '1px solid #e9edef',
                color: theme === 'dark' ? '#aebac1' : '#54656f',
              }}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* GitHub */}
            <a
              href={siteConfig.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex p-2.5 rounded-xl border transition-colors"
              style={{
                background: theme === 'dark' ? '#2a3942' : '#f0f2f5',
                border: theme === 'dark' ? '1px solid #374147' : '1px solid #e9edef',
                color: theme === 'dark' ? '#aebac1' : '#54656f',
              }}
              title="View on GitHub"
            >
              <GitBranch className="w-4 h-4" />
            </a>
          </div>
        </div>
      </header>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div
          className="fixed top-16 left-0 right-0 z-30 shadow-xl border-b"
          style={{
            background: theme === 'dark' ? '#202c33' : '#ffffff',
            borderColor: theme === 'dark' ? '#374147' : '#e9edef',
          }}
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                onClick={() => scrollTo(item.href)}
                className="w-full flex items-center gap-3 px-5 py-4 text-left text-base font-semibold border-b transition-colors hover:bg-[#f0f2f5] dark:hover:bg-slate-800"
                style={{
                  borderColor: theme === 'dark' ? '#374147' : '#f0f2f5',
                  color: theme === 'dark' ? '#e9edef' : '#111b21',
                }}
              >
                <Icon className="w-5 h-5 text-[#25D366]" />
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </>
  );
};
