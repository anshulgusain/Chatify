import React from 'react';
import { MessageSquare, Heart, Shield, ExternalLink, GitBranch } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';

export const Footer = () => {
  return (
    <footer className="mt-20 border-t border-[#d1c9c0] dark:border-slate-800 bg-[#f0ebe4] dark:bg-[#202c33] py-12 px-4 sm:px-6 lg:px-8 text-xs text-slate-500 dark:text-slate-400">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-emerald-500 flex items-center justify-center text-white font-bold shadow-md shadow-emerald-500/20">
            <MessageSquare className="w-4 h-4" />
          </div>
          <div>
            <div className="font-extrabold text-sm text-slate-900 dark:text-white">
              {siteConfig.name}
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Crafted for developers building production WhatsApp chatbots.
            </p>
          </div>
        </div>

        {/* Links */}
        <div className="flex items-center gap-6 font-semibold">
          <a 
            href={siteConfig.metaDocsUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-emerald-600 dark:hover:text-emerald-400 flex items-center gap-1 transition-colors"
          >
            <span>Meta Official Docs</span>
            <ExternalLink className="w-3 h-3 opacity-60" />
          </a>

          <a 
            href={siteConfig.githubUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-emerald-600 dark:hover:text-emerald-400 flex items-center gap-1 transition-colors"
          >
            <GitBranch className="w-3.5 h-3.5" />
            <span>GitHub Repository</span>
          </a>
        </div>

        {/* Copyright */}
        <div className="text-center md:text-right">
          <p>© 2026 Node.js & Meta Graph API Masterclass.</p>
          <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">
            Meta, Facebook & WhatsApp are registered trademarks of Meta Platforms, Inc.
          </p>
        </div>

      </div>
    </footer>
  );
};
