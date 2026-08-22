import { motion } from 'framer-motion';

export default function LoadingState({ message = "Loading data...", count = 6 }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="rounded-xl border border-slate-200/80 bg-white p-5 space-y-3">
            <div className="skeleton-shimmer h-3 w-20 rounded-md" />
            <div className="skeleton-shimmer h-6 w-24 rounded-md" />
            <div className="skeleton-shimmer h-3 w-16 rounded-md" />
          </div>
        ))}
      </div>
      <div className="rounded-xl border border-slate-200/80 bg-white p-6 space-y-4">
        <div className="skeleton-shimmer h-4 w-32 rounded-md" />
        <div className="skeleton-shimmer h-4 w-full rounded-md" />
        <div className="skeleton-shimmer h-4 w-3/4 rounded-md" />
      </div>
      {message && (
        <p className="text-xs text-slate-400 text-center font-medium">{message}</p>
      )}
    </motion.div>
  );
}
