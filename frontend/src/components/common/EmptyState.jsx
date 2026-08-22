import { motion } from 'framer-motion';
import { Database } from 'lucide-react';

export default function EmptyState({ title = "No data found", description = "Try adjusting your filters" }) {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-14 h-14 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-center mb-5"
      >
        <Database className="w-6 h-6 text-slate-400" />
      </motion.div>
      <h3 className="text-base font-semibold text-slate-900 mb-1.5">{title}</h3>
      <p className="text-sm text-slate-500 text-center max-w-sm leading-relaxed">{description}</p>
    </div>
  );
}
