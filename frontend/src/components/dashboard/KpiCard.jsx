import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

const colorConfig = {
  blue: {
    bg: 'bg-blue-50/80',
    border: 'border-blue-100',
    iconBg: 'bg-blue-600',
    iconShadow: 'shadow-blue-500/25',
    trendUp: 'text-blue-700',
    trendDown: 'text-red-600',
    accent: 'text-blue-600',
  },
  green: {
    bg: 'bg-emerald-50/80',
    border: 'border-emerald-100',
    iconBg: 'bg-emerald-600',
    iconShadow: 'shadow-emerald-500/25',
    trendUp: 'text-emerald-700',
    trendDown: 'text-red-600',
    accent: 'text-emerald-600',
  },
  purple: {
    bg: 'bg-purple-50/80',
    border: 'border-purple-100',
    iconBg: 'bg-purple-600',
    iconShadow: 'shadow-purple-500/25',
    trendUp: 'text-purple-700',
    trendDown: 'text-red-600',
    accent: 'text-purple-600',
  },
  orange: {
    bg: 'bg-orange-50/80',
    border: 'border-orange-100',
    iconBg: 'bg-orange-600',
    iconShadow: 'shadow-orange-500/25',
    trendUp: 'text-orange-700',
    trendDown: 'text-red-600',
    accent: 'text-orange-600',
  },
  teal: {
    bg: 'bg-teal-50/80',
    border: 'border-teal-100',
    iconBg: 'bg-teal-600',
    iconShadow: 'shadow-teal-500/25',
    trendUp: 'text-teal-700',
    trendDown: 'text-red-600',
    accent: 'text-teal-600',
  },
  rose: {
    bg: 'bg-rose-50/80',
    border: 'border-rose-100',
    iconBg: 'bg-rose-600',
    iconShadow: 'shadow-rose-500/25',
    trendUp: 'text-rose-700',
    trendDown: 'text-red-600',
    accent: 'text-rose-600',
  },
};

export default function KpiCard({ title, value, metricType = 'currency', icon: Icon, trend, trendValue, color = 'blue' }) {
  const config = colorConfig[color] || colorConfig.blue;

  const formatValue = (val, type) => {
    if (val === null || val === undefined || isNaN(val)) return '0';
    if (type === 'currency') return `₹${Number(val).toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;
    if (type === 'percentage') return `${Number(val).toFixed(1)}%`;
    if (type === 'number') return Number(val).toLocaleString('en-IN');
    return String(val);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      whileHover={{ y: -2 }}
      className={`group relative overflow-hidden rounded-xl border ${config.border} ${config.bg} p-5 transition-all duration-300 hover:shadow-lg`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1.5">{title}</p>
          <p className="text-xl font-bold text-slate-900 tracking-tight truncate">
            {formatValue(value, metricType)}
          </p>
          {trend && trendValue && (
            <div className={`flex items-center gap-1 mt-2 text-xs font-semibold ${trend === 'up' ? config.trendUp : 'text-red-600'}`}>
              {trend === 'up' ? (
                <TrendingUp className="w-3.5 h-3.5" />
              ) : (
                <TrendingDown className="w-3.5 h-3.5" />
              )}
              <span>{trendValue}</span>
            </div>
          )}
        </div>
        <div className={`flex-shrink-0 w-10 h-10 ${config.iconBg} rounded-lg flex items-center justify-center shadow-lg ${config.iconShadow}`}>
          {Icon && <Icon className="w-5 h-5 text-white" />}
        </div>
      </div>
    </motion.div>
  );
}
