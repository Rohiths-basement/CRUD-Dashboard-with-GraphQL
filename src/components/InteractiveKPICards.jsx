import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Package, Target, BarChart3, Zap, Activity, DollarSign } from 'lucide-react';
import { formatNumber, formatPercentage, calculateFillRate } from '../lib/utils';

export default function InteractiveKPICards({ products, kpis }) {
  const totalStock = products.reduce((sum, p) => sum + p.stock, 0);
  const totalDemand = products.reduce((sum, p) => sum + p.demand, 0);
  const fillRate = calculateFillRate(products);
  const totalValue = products.reduce((sum, p) => sum + (p.stock * 25), 0); // Assuming $25 per unit
  
  // Calculate trends from KPI data
  const stockTrend = kpis.length >= 2 ? 
    ((kpis[kpis.length - 1]?.stock - kpis[0]?.stock) / kpis[0]?.stock * 100) : 0;
  const demandTrend = kpis.length >= 2 ? 
    ((kpis[kpis.length - 1]?.demand - kpis[0]?.demand) / kpis[0]?.demand * 100) : 0;

  const cards = [
    {
      title: 'Total Stock',
      value: formatNumber(totalStock),
      icon: Package,
      trend: stockTrend,
      color: 'from-blue-400 via-blue-500 to-blue-600',
      glowColor: 'rgba(59, 130, 246, 0.4)',
      description: 'Units in inventory',
      prefix: '',
      suffix: ' units'
    },
    {
      title: 'Total Demand',
      value: formatNumber(totalDemand),
      icon: Target,
      trend: demandTrend,
      color: 'from-purple-400 via-purple-500 to-purple-600',
      glowColor: 'rgba(147, 51, 234, 0.4)',
      description: 'Units requested',
      prefix: '',
      suffix: ' units'
    },
    {
      title: 'Fill Rate',
      value: formatPercentage(fillRate),
      icon: BarChart3,
      trend: fillRate > 80 ? 5 : fillRate > 60 ? 0 : -5,
      color: fillRate > 80 ? 'from-green-400 via-green-500 to-green-600' : fillRate > 60 ? 'from-yellow-400 via-yellow-500 to-yellow-600' : 'from-red-400 via-red-500 to-red-600',
      glowColor: fillRate > 80 ? 'rgba(34, 197, 94, 0.4)' : fillRate > 60 ? 'rgba(234, 179, 8, 0.4)' : 'rgba(239, 68, 68, 0.4)',
      description: 'Demand fulfillment',
      prefix: '',
      suffix: ''
    },
    {
      title: 'Inventory Value',
      value: formatNumber(Math.round(totalValue / 1000)) + 'K',
      icon: DollarSign,
      trend: 8.2,
      color: 'from-emerald-400 via-emerald-500 to-emerald-600',
      glowColor: 'rgba(16, 185, 129, 0.4)',
      description: 'Total asset value',
      prefix: '$',
      suffix: ''
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {cards.map((card, index) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 50, rotateX: -15 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ 
            duration: 0.8, 
            delay: index * 0.1,
            type: "spring",
            stiffness: 100
          }}
          whileHover={{ 
            scale: 1.05, 
            rotateY: 5,
            z: 50
          }}
          className="group relative"
        >
          {/* Glow Effect */}
          <div 
            className="absolute -inset-1 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ 
              background: `linear-gradient(135deg, ${card.glowColor}, transparent)`,
              boxShadow: `0 0 60px ${card.glowColor}`
            }}
          />
          
          {/* Main Card */}
          <div className="relative glass-card h-full overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-32 h-32 transform rotate-45 translate-x-16 -translate-y-16">
                <div className={`w-full h-full bg-gradient-to-br ${card.color} rounded-lg`} />
              </div>
            </div>
            
            {/* Content */}
            <div className="relative z-10 p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <motion.div 
                    className={`p-3 rounded-2xl bg-gradient-to-br ${card.color} shadow-2xl`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <card.icon className="w-6 h-6 text-white" />
                  </motion.div>
                  <div>
                    <p className="text-sm font-semibold text-gray-300 uppercase tracking-wider">
                      {card.title}
                    </p>
                  </div>
                </div>
                
                {/* Trend Indicator */}
                <motion.div 
                  className="flex items-center space-x-1"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  {card.trend > 0 ? (
                    <TrendingUp className="w-5 h-5 text-green-400" />
                  ) : card.trend < 0 ? (
                    <TrendingDown className="w-5 h-5 text-red-400" />
                  ) : (
                    <Activity className="w-5 h-5 text-gray-400" />
                  )}
                  <span className={`text-sm font-bold ${
                    card.trend > 0 ? 'text-green-400' : 
                    card.trend < 0 ? 'text-red-400' : 'text-gray-400'
                  }`}>
                    {card.trend !== 0 && `${card.trend > 0 ? '+' : ''}${card.trend.toFixed(1)}%`}
                  </span>
                </motion.div>
              </div>

              {/* Value */}
              <motion.div 
                className="mb-4"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <div className="flex items-baseline">
                  {card.prefix && (
                    <span className="text-2xl font-bold text-gray-300 mr-1">
                      {card.prefix}
                    </span>
                  )}
                  <span className="text-4xl md:text-5xl font-black text-white">
                    {card.value}
                  </span>
                  {card.suffix && (
                    <span className="text-lg font-semibold text-gray-300 ml-1">
                      {card.suffix}
                    </span>
                  )}
                </div>
              </motion.div>

              {/* Description */}
              <p className="text-sm text-gray-400 font-medium">
                {card.description}
              </p>

              {/* Progress Bar */}
              <div className="mt-4 w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                <motion.div
                  className={`h-full bg-gradient-to-r ${card.color} rounded-full`}
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(100, Math.abs(card.trend) * 10)}%` }}
                  transition={{ duration: 1, delay: 0.8 + index * 0.1 }}
                />
              </div>
            </div>

            {/* Hover Effect Overlay */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={false}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
