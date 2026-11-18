import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  colorClass?: string;
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, subtitle, colorClass = 'text-indigo-600' }) => {
  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">{title}</p>
      <p className={`text-2xl font-extrabold mt-1 ${colorClass}`}>{value}</p>
      <p className="text-xs text-slate-500 mt-1">{subtitle}</p>
    </div>
  );
};