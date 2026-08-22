import { motion } from 'framer-motion';
import { Lightbulb, TrendingUp, TrendingDown, AlertTriangle, Target } from 'lucide-react';

const typeConfig = {
  region: { icon: TrendingUp, color: 'blue' },
  category: { color: 'purple' },
  product: { color: 'orange' },
  segment: { color: 'teal' },
  trend: { color: 'green' },
  profitability: { icon: AlertTriangle, color: 'rose' },
};

const colorBorders = {
  blue: 'border-l-blue-500',
  purple: 'border-l-purple-500',
  orange: 'border-l-orange-500',
  teal: 'border-l-teal-500',
  green: 'border-l-emerald-500',
  rose: 'border-l-rose-500',
  slate: 'border-l-slate-300',
};

const iconBgColors = {
  blue: 'text-blue-600 bg-blue-50',
  purple: 'text-purple-600 bg-purple-50',
  orange: 'text-orange-600 bg-orange-50',
  teal: 'text-teal-600 bg-teal-50',
  green: 'text-emerald-600 bg-emerald-50',
  rose: 'text-rose-600 bg-rose-50',
  slate: 'text-slate-600 bg-slate-50',
};

export default function InsightCard({ insight, index = 0 }) {
  const config = typeConfig[insight.type] || { color: 'slate' };
  const Icon = config.icon || Lightbulb;
  const borderColor = colorBorders[config.color] || colorBorders.slate;
  const iconBg = iconBgColors[config.color] || iconBgColors.slate;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      whileHover={{ y: -1 }}
      className={`group rounded-lg border border-slate-200/80 bg-white p-5 shadow-sm hover:shadow-md transition-all duration-300 border-l-4 ${borderColor}`}
    >
      <div className="flex items-start gap-4">
        <div className={`flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center ${iconBg}`}>
          <Icon className="w-4 h-4" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-slate-900 mb-1 leading-tight">{insight.title}</h4>
          <p className="text-xs text-slate-600 leading-relaxed mb-3">{insight.description}</p>
          {insight.recommendation && (
            <div className="flex items-start gap-2.5 bg-slate-50/80 rounded-lg p-3 border border-slate-100">
              <Target className="w-3.5 h-3.5 text-slate-400 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-slate-600 font-medium leading-relaxed">{insight.recommendation}</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
