import React from 'react';
import { AlertTriangle, Lightbulb, CheckCircle, XCircle, Info, Shield } from 'lucide-react';

const variants = {
  warning: {
    icon: AlertTriangle,
    bg: '#fff8e1',
    border: '#f59e0b',
    iconColor: '#d97706',
    label: 'Warning',
    textColor: '#1a1a1a',
    labelColor: '#92400e',
  },
  tip: {
    icon: Lightbulb,
    bg: '#eff6ff',
    border: '#3b82f6',
    iconColor: '#2563eb',
    label: 'Pro Tip',
    textColor: '#1a1a1a',
    labelColor: '#1e40af',
  },
  success: {
    icon: CheckCircle,
    bg: '#f0fdf4',
    border: '#25D366',
    iconColor: '#16a34a',
    label: 'Success',
    textColor: '#1a1a1a',
    labelColor: '#14532d',
  },
  error: {
    icon: XCircle,
    bg: '#fff1f2',
    border: '#ef4444',
    iconColor: '#dc2626',
    label: 'Error',
    textColor: '#1a1a1a',
    labelColor: '#7f1d1d',
  },
  info: {
    icon: Info,
    bg: '#f8fafc',
    border: '#94a3b8',
    iconColor: '#64748b',
    label: 'Note',
    textColor: '#1a1a1a',
    labelColor: '#1e293b',
  },
  security: {
    icon: Shield,
    bg: '#faf5ff',
    border: '#a855f7',
    iconColor: '#9333ea',
    label: 'Security',
    textColor: '#1a1a1a',
    labelColor: '#581c87',
  },
};

export const CalloutBox = ({ type = 'info', title, children }) => {
  const v = variants[type] || variants.info;
  const Icon = v.icon;

  return (
    <div
      className="flex gap-3 p-4 rounded-xl my-4"
      style={{
        background: v.bg,
        border: `1.5px solid ${v.border}`,
      }}
    >
      <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: v.iconColor }} />
      <div className="flex-1 space-y-1 text-sm">
        {/* Label — bold, very dark */}
        <div className="font-extrabold text-sm" style={{ color: v.labelColor }}>
          {title || v.label}
        </div>
        {/* Content — always very dark, high contrast */}
        <div className="font-medium leading-relaxed" style={{ color: '#1a1a1a' }}>
          {children}
        </div>
      </div>
    </div>
  );
};
