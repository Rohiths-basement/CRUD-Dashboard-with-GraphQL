import { motion } from 'framer-motion';
import { AlertCircle, RefreshCcw } from 'lucide-react';

export default function ErrorMessage({ error, onRetry }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <motion.div
        className="max-w-md w-full mx-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="card p-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-red-100 dark:bg-red-900 rounded-full">
              <AlertCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
            </div>
          </div>
          
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Something went wrong
          </h2>
          
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {error?.message || 'An unexpected error occurred while loading the dashboard.'}
          </p>
          
          <button
            onClick={onRetry}
            className="flex items-center justify-center space-x-2 btn-primary w-full"
          >
            <RefreshCcw className="w-4 h-4" />
            <span>Try Again</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
