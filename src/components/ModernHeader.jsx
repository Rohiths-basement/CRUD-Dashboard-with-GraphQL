import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCcw, Sun, Moon, Download, Settings, Bell, Search, Menu, X } from 'lucide-react';

const dateRangeOptions = [
  { value: '7d', label: '7D', fullLabel: '7 Days' },
  { value: '14d', label: '14D', fullLabel: '14 Days' },
  { value: '30d', label: '30D', fullLabel: '30 Days' },
];

export default function ModernHeader({ dateRange, onDateRangeChange, onRefresh }) {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [notifications] = useState(3);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('light');
  };

  const handleExport = () => {
    console.log('Exporting data...');
  };

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
      className="glass-card sticky top-0 z-50 border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Section */}
          <motion.div 
            className="flex items-center space-x-4"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl">
                <img 
                  src="/logo.png" 
                  alt="SupplySight" 
                  className="w-8 h-8 object-contain"
                />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-2xl font-black gradient-text">SupplySight</h1>
              <p className="text-xs text-gray-400 font-medium">Real-time Analytics</p>
            </div>
          </motion.div>

          {/* Center Navigation - Date Range */}
          <div className="hidden lg:flex items-center space-x-2 bg-black/20 rounded-2xl p-2">
            {dateRangeOptions.map((option, index) => (
              <motion.button
                key={option.value}
                onClick={() => onDateRangeChange(option.value)}
                className={`relative px-6 py-3 text-sm font-bold rounded-xl transition-all duration-300 ${
                  dateRange === option.value
                    ? 'text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {dateRange === option.value && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{option.label}</span>
              </motion.button>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-3">
            {/* Search */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="hidden sm:flex p-3 text-gray-400 hover:text-white bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-300 backdrop-blur-sm"
              title="Search"
            >
              <Search className="w-5 h-5" />
            </motion.button>

            {/* Notifications */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="relative p-3 text-gray-400 hover:text-white bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-300 backdrop-blur-sm"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              {notifications > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold"
                >
                  {notifications}
                </motion.span>
              )}
            </motion.button>

            {/* Export */}
            <motion.button
              onClick={handleExport}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="hidden sm:flex p-3 text-gray-400 hover:text-white bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-300 backdrop-blur-sm"
              title="Export Data"
            >
              <Download className="w-5 h-5" />
            </motion.button>
            
            {/* Theme Toggle */}
            <motion.button
              onClick={toggleDarkMode}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 text-gray-400 hover:text-white bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-300 backdrop-blur-sm"
              title="Toggle Theme"
            >
              <AnimatePresence mode="wait">
                {isDarkMode ? (
                  <motion.div
                    key="sun"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Sun className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Moon className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
            
            {/* Refresh */}
            <motion.button
              onClick={onRefresh}
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 text-gray-400 hover:text-white bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-300 backdrop-blur-sm"
              title="Refresh Data"
            >
              <RefreshCcw className="w-5 h-5" />
            </motion.button>

            {/* Mobile Menu */}
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="lg:hidden p-3 text-gray-400 hover:text-white bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-300 backdrop-blur-sm"
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                  >
                    <X className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                  >
                    <Menu className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden border-t border-white/10 py-4 overflow-hidden"
            >
              <div className="space-y-4">
                {/* Mobile Date Range */}
                <div>
                  <p className="text-sm font-semibold text-gray-400 mb-2">Time Range</p>
                  <div className="grid grid-cols-3 gap-2">
                    {dateRangeOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          onDateRangeChange(option.value);
                          setIsMenuOpen(false);
                        }}
                        className={`p-3 text-sm font-bold rounded-xl transition-all duration-300 ${
                          dateRange === option.value
                            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                            : 'bg-white/10 text-gray-400 hover:text-white'
                        }`}
                      >
                        {option.fullLabel}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mobile Actions */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={handleExport}
                    className="flex items-center justify-center space-x-2 p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-300"
                  >
                    <Download className="w-4 h-4" />
                    <span className="text-sm font-semibold">Export</span>
                  </button>
                  <button className="flex items-center justify-center space-x-2 p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-300">
                    <Search className="w-4 h-4" />
                    <span className="text-sm font-semibold">Search</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
