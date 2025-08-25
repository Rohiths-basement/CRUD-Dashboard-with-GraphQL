import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Package, Building2, TrendingUp, TrendingDown, Activity, Eye, Star, Grid, List } from 'lucide-react';
import { getProductStatus, formatNumber, cn, debounce } from '../lib/utils';

const ITEMS_PER_PAGE = 12;

const statusOptions = [
  { value: 'all', label: 'All Status', color: 'from-gray-400 to-gray-600' },
  { value: 'healthy', label: 'Healthy', color: 'from-green-400 to-green-600' },
  { value: 'low', label: 'Low Stock', color: 'from-yellow-400 to-yellow-600' },
  { value: 'critical', label: 'Critical', color: 'from-red-400 to-red-600' },
];

const VIEW_MODES = [
  { id: 'grid', icon: Grid, label: 'Grid View' },
  { id: 'list', icon: List, label: 'List View' },
];

export default function ProductExplorer({ products, warehouses, onProductClick, loading }) {
  const [searchInput, setSearchInput] = useState('');
  const [filters, setFilters] = useState({ search: '', warehouse: 'all', status: 'all' });
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [viewMode, setViewMode] = useState('grid');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [hoveredProduct, setHoveredProduct] = useState(null);

  // Debounced search
  const onFilterChangeRef = useRef((newFilters) => setFilters(prev => ({ ...prev, ...newFilters })));
  const debouncedRef = useRef(
    debounce((value) => {
      onFilterChangeRef.current({ search: value });
    }, 300)
  );

  useEffect(() => {
    debouncedRef.current(searchInput);
  }, [searchInput]);

  // Filter and sort products
  const filteredProducts = products.filter(product => {
    const matchesSearch = !filters.search || 
      product.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      product.sku.toLowerCase().includes(filters.search.toLowerCase());
    
    const matchesWarehouse = filters.warehouse === 'all' || product.warehouse === filters.warehouse;
    const matchesStatus = filters.status === 'all' || getProductStatus(product.stock, product.demand) === filters.status;
    
    return matchesSearch && matchesWarehouse && matchesStatus;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    let aValue = a[sortField];
    let bValue = b[sortField];
    
    if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }
    
    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  // Pagination
  const totalPages = Math.ceil(sortedProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = sortedProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters, sortField, sortDirection]);

  const getStatusInfo = (product) => {
    const status = getProductStatus(product.stock, product.demand);
    const statusConfig = {
      healthy: { label: 'Healthy', className: 'status-pill status-healthy', trend: 'up' },
      low: { label: 'Low Stock', className: 'status-pill status-low', trend: 'stable' },
      critical: { label: 'Critical', className: 'status-pill status-critical', trend: 'down' },
    };
    return statusConfig[status];
  };

  const ProductCard = ({ product, index }) => {
    const statusInfo = getStatusInfo(product);
    const fillRate = (product.stock / product.demand) * 100;

    return (
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, delay: index * 0.05 }}
        whileHover={{ scale: 1.02, y: -5 }}
        onHoverStart={() => setHoveredProduct(product.id)}
        onHoverEnd={() => setHoveredProduct(null)}
        onClick={() => onProductClick(product)}
        className="glass-card cursor-pointer group relative overflow-hidden"
      >
        {/* Glow Effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Content */}
        <div className="relative p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-lg">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-white text-lg group-hover:text-blue-300 transition-colors">
                  {product.name}
                </h3>
                <p className="text-gray-400 text-sm font-mono">{product.sku}</p>
              </div>
            </div>
            <div className={statusInfo.className}>
              {statusInfo.label}
            </div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center">
              <p className="text-2xl font-black text-white">{formatNumber(product.stock)}</p>
              <p className="text-gray-400 text-sm">Stock</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-black text-white">{formatNumber(product.demand)}</p>
              <p className="text-gray-400 text-sm">Demand</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-400 text-sm">Fill Rate</span>
              <span className="text-white font-bold text-sm">{fillRate.toFixed(1)}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
              <motion.div
                className={`h-full rounded-full ${
                  fillRate >= 100 ? 'bg-gradient-to-r from-green-400 to-green-600' :
                  fillRate >= 50 ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' :
                  'bg-gradient-to-r from-red-400 to-red-600'
                }`}
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(100, fillRate)}%` }}
                transition={{ duration: 1, delay: 0.3 + index * 0.05 }}
              />
            </div>
          </div>

          {/* Warehouse */}
          <div className="flex items-center space-x-2 text-gray-300">
            <Building2 className="w-4 h-4" />
            <span className="text-sm font-medium">{product.warehouse}</span>
          </div>

          {/* Hover Overlay */}
          <AnimatePresence>
            {hoveredProduct === product.id && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-3xl flex items-center justify-center"
              >
                <div className="text-center">
                  <Eye className="w-8 h-8 text-white mx-auto mb-2" />
                  <p className="text-white font-semibold">View Details</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    );
  };

  const ProductListItem = ({ product, index }) => {
    const statusInfo = getStatusInfo(product);

    return (
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: index * 0.03 }}
        whileHover={{ scale: 1.01, x: 5 }}
        onClick={() => onProductClick(product)}
        className="glass-card p-4 cursor-pointer group"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 flex-1">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
              <Package className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-white group-hover:text-blue-300 transition-colors">
                {product.name}
              </h3>
              <p className="text-gray-400 text-sm">{product.sku}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <p className="text-white font-bold">{formatNumber(product.stock)}</p>
              <p className="text-gray-400 text-xs">Stock</p>
            </div>
            <div className="text-center">
              <p className="text-white font-bold">{formatNumber(product.demand)}</p>
              <p className="text-gray-400 text-xs">Demand</p>
            </div>
            <div className="flex items-center space-x-2">
              <Building2 className="w-4 h-4 text-gray-400" />
              <span className="text-gray-300 text-sm">{product.warehouse}</span>
            </div>
            <div className={statusInfo.className}>
              {statusInfo.label}
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  if (loading) {
    return (
      <div className="glass-card p-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-700 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-64 bg-gray-700 rounded-2xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="glass-card"
    >
      {/* Header */}
      <div className="p-6 border-b border-white/10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
          <div>
            <h2 className="text-2xl font-black text-white mb-2">Product Explorer</h2>
            <p className="text-gray-300">
              {formatNumber(filteredProducts.length)} products found
            </p>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center space-x-2 bg-black/20 rounded-2xl p-2">
            {VIEW_MODES.map((mode) => (
              <motion.button
                key={mode.id}
                onClick={() => setViewMode(mode.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                  viewMode === mode.id
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-white/10'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <mode.icon className="w-4 h-4" />
                <span className="text-sm font-semibold hidden sm:block">{mode.label}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mt-6 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products by name or SKU..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-black/20 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors backdrop-blur-sm"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-4">
            <select
              value={filters.warehouse}
              onChange={(e) => setFilters(prev => ({ ...prev, warehouse: e.target.value }))}
              className="px-4 py-2 bg-black/20 border border-white/20 rounded-xl text-white focus:outline-none focus:border-blue-500 transition-colors backdrop-blur-sm"
            >
              <option value="all">All Warehouses</option>
              {warehouses.map(warehouse => (
                <option key={warehouse.code} value={warehouse.code}>
                  {warehouse.name}
                </option>
              ))}
            </select>

            <div className="flex items-center space-x-2">
              {statusOptions.map(status => (
                <button
                  key={status.value}
                  onClick={() => setFilters(prev => ({ ...prev, status: status.value }))}
                  className={`px-4 py-2 text-sm font-semibold rounded-xl transition-all duration-300 ${
                    filters.status === status.value
                      ? `bg-gradient-to-r ${status.color} text-white shadow-lg`
                      : 'bg-white/10 text-gray-400 hover:text-white hover:bg-white/20'
                  }`}
                >
                  {status.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid/List */}
      <div className="p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={viewMode}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {paginatedProducts.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {paginatedProducts.map((product, index) => (
                  <ProductListItem key={product.id} product={product} index={index} />
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-between mt-8 pt-6 border-t border-white/10"
          >
            <div className="text-sm text-gray-400">
              Showing {startIndex + 1} to {Math.min(startIndex + ITEMS_PER_PAGE, sortedProducts.length)} of {sortedProducts.length} results
            </div>
            
            <div className="flex items-center space-x-2">
              {[...Array(totalPages)].map((_, i) => {
                const page = i + 1;
                return (
                  <motion.button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={`w-10 h-10 rounded-xl font-bold transition-all duration-300 ${
                      currentPage === page
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                        : 'bg-white/10 text-gray-400 hover:text-white hover:bg-white/20'
                    }`}
                  >
                    {page}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
