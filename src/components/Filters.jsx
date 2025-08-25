import { useState, useEffect, useRef } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { debounce } from '../lib/utils';

const statusOptions = [
  { value: 'all', label: 'All Status' },
  { value: 'healthy', label: '🟢 Healthy' },
  { value: 'low', label: '🟡 Low' },
  { value: 'critical', label: '🔴 Critical' },
];

export default function Filters({ filters, warehouses, onFilterChange }) {
  const [searchInput, setSearchInput] = useState(filters.search);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Debounced search (stable across renders)
  const onFilterChangeRef = useRef(onFilterChange);
  useEffect(() => {
    onFilterChangeRef.current = onFilterChange;
  }, [onFilterChange]);

  const debouncedRef = useRef(
    debounce((value) => {
      onFilterChangeRef.current({ search: value });
    }, 300)
  );

  useEffect(() => {
    debouncedRef.current(searchInput);
  }, [searchInput]);

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleWarehouseChange = (e) => {
    onFilterChange({ warehouse: e.target.value });
  };

  const handleStatusChange = (e) => {
    onFilterChange({ status: e.target.value });
  };

  const clearFilters = () => {
    setSearchInput('');
    onFilterChange({ search: '', warehouse: 'all', status: 'all' });
  };

  const hasActiveFilters = filters.search || filters.warehouse !== 'all' || filters.status !== 'all';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="card p-6"
    >
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
        {/* Search Box */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by name, SKU, or ID..."
            value={searchInput}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
          />
        </div>

        {/* Filter Controls */}
        <div className="flex items-center space-x-4">
          {/* Warehouse Filter */}
          <div className="min-w-0">
            <select
              value={filters.warehouse}
              onChange={handleWarehouseChange}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
            >
              <option value="all">All Warehouses</option>
              {warehouses.map((warehouse) => (
                <option key={warehouse.code} value={warehouse.code}>
                  {warehouse.name}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="min-w-0">
            <select
              value={filters.status}
              onChange={handleStatusChange}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
            >
              <X className="w-4 h-4" />
              <span>Clear</span>
            </button>
          )}

          {/* Filter Toggle (Mobile) */}
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="lg:hidden flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
          >
            <Filter className="w-4 h-4" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* Active Filters Summary (reserve space to avoid layout shift) */}
      <div className="mt-4 min-h-[28px]">
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">Active filters:</span>
            {filters.search && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                Search: "{filters.search}"
              </span>
            )}
            {filters.warehouse !== 'all' && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                Warehouse: {warehouses.find(w => w.code === filters.warehouse)?.name || filters.warehouse}
              </span>
            )}
            {filters.status !== 'all' && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                Status: {statusOptions.find(s => s.value === filters.status)?.label || filters.status}
              </span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
