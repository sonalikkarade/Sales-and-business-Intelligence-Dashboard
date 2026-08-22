import { motion } from 'framer-motion';

export default function ChartContainer({ title, subtitle, children, className = "", padding = "p-6" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`bg-white rounded-xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-300 ${padding} ${className}`}
    >
      {(title || subtitle) && (
        <div className="mb-5">
          {title && <h3 className="text-sm font-semibold text-slate-900 tracking-tight">{title}</h3>}
          {subtitle && <p className="text-xs text-slate-500 mt-0.5 font-medium">{subtitle}</p>}
        </div>
      )}
      <div className="w-full min-h-[280px]">
        {children}
      </div>
    </motion.div>
  );
}
