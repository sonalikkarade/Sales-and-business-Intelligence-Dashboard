import { motion } from 'framer-motion';
import { AlertCircle, RefreshCw } from 'lucide-react';

export default function ErrorState({ message = "Something went wrong", onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-14 h-14 bg-red-50 border border-red-100 rounded-xl flex items-center justify-center mb-5"
      >
        <AlertCircle className="w-6 h-6 text-red-500" />
      </motion.div>
      <h3 className="text-base font-semibold text-slate-900 mb-1.5">Unable to load data</h3>
      <p className="text-sm text-slate-500 text-center max-w-sm mb-5 leading-relaxed">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-xl transition-colors shadow-sm shadow-blue-500/20"
        >
          <RefreshCw className="w-4 h-4" />
          Try Again
        </button>
      )}
    </div>
  );
}
