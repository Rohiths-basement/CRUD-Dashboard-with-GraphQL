import { useState } from 'react';
import { RefreshCcw, Sun, Moon, Download } from 'lucide-react';
import { motion } from 'framer-motion';

const dateRangeOptions = [
  { value: '7d', label: '7 Days' },
  { value: '14d', label: '14 Days' },
  { value: '30d', label: '30 Days' },
];

export default function Header({ dateRange, onDateRangeChange, onRefresh }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const handleExport = () => {
    // In a real app, this would export data to CSV/Excel
    console.log('Exporting data...');
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div 
            className="flex items-center space-x-3"
            initial={false}
          >
            <div className="flex items-center">
              <img 
                src="/logo.png" 
                alt="SupplySight" 
                className="h-12 w-auto"
              />
            </div>
          </motion.div>

          {/* Date Range Chips & Actions */}
          <motion.div 
            className="flex items-center space-x-4"
            initial={false}
          >
            {/* Date Range Chips */}
            <div className="flex items-center space-x-2">
              {dateRangeOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => onDateRangeChange(option.value)}
                  className={`px-4 py-2 text-sm font-semibold rounded-xl transition-colors duration-200 ${
                    dateRange === option.value
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-2">
              <button
                onClick={handleExport}
                className="p-2.5 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 bg-white hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-xl transition-colors duration-200 border border-gray-200 dark:border-gray-600"
                title="Export Data"
              >
                <Download className="w-5 h-5" />
              </button>
              
              <button
                onClick={toggleDarkMode}
                className="p-2.5 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 bg-white hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-xl transition-colors duration-200 border border-gray-200 dark:border-gray-600"
                title="Toggle Dark Mode"
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              
              <button
                onClick={onRefresh}
                className="p-2.5 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 bg-white hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-xl transition-colors duration-200 border border-gray-200 dark:border-gray-600"
                title="Refresh Data"
              >
                <RefreshCcw className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </header>
  );
}
