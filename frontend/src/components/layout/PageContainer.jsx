import { motion } from 'framer-motion';

const maxWidthClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  '3xl': 'max-w-3xl',
  '4xl': 'max-w-4xl',
  '5xl': 'max-w-5xl',
  '6xl': 'max-w-6xl',
  '7xl': 'max-w-7xl',
  full: 'max-w-full',
};

export default function PageContainer({ children, className = "", maxWidth = "7xl" }) {
  const widthClass = maxWidthClasses[maxWidth] || 'max-w-7xl';

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className={`${widthClass} mx-auto px-6 lg:px-8 py-6 ${className}`}
    >
      {children}
    </motion.div>
  );
}
