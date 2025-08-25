import { motion } from 'framer-motion';

export default function LoadingSpinner() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <motion.div
        className="flex flex-col items-center space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative">
          <motion.div
            className="w-12 h-12 border-4 border-blue-200 dark:border-blue-800 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute top-0 left-0 w-12 h-12 border-4 border-transparent border-t-blue-600 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </div>
        <div className="text-center">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Loading Dashboard
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Fetching inventory data...
          </p>
        </div>
      </motion.div>
    </div>
  );
}
