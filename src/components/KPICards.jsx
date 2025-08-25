import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Package, Target, BarChart3 } from 'lucide-react';
import { formatNumber, formatPercentage, calculateFillRate } from '../lib/utils';

export default function KPICards({ products, kpis }) {
  const totalStock = products.reduce((sum, p) => sum + p.stock, 0);
  const totalDemand = products.reduce((sum, p) => sum + p.demand, 0);
  const fillRate = calculateFillRate(products);
  
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
      color: 'blue',
      description: 'Units in inventory'
    },
    {
      title: 'Total Demand',
      value: formatNumber(totalDemand),
      icon: Target,
      trend: demandTrend,
      color: 'purple',
      description: 'Units requested'
    },
    {
      title: 'Fill Rate',
      value: formatPercentage(fillRate),
      icon: BarChart3,
      trend: fillRate > 80 ? 5 : fillRate > 60 ? 0 : -5,
      color: fillRate > 80 ? 'green' : fillRate > 60 ? 'yellow' : 'red',
      description: 'Demand fulfillment'
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: 'border-l-4 border-blue-400/70',
      purple: 'border-l-4 border-purple-400/70',
      green: 'border-l-4 border-emerald-400/70',
      yellow: 'border-l-4 border-amber-400/70',
      red: 'border-l-4 border-rose-400/70'
    };
    return colors[color] || colors.blue;
  };

  const getIconColorClasses = (color) => {
    const colors = {
      blue: 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30',
      purple: 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/30',
      green: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30',
      yellow: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30',
      red: 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/30'
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((card, index) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className={`card p-6 ${getColorClasses(card.color)}`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`p-3 rounded-xl shadow-sm ${getIconColorClasses(card.color)}`}>
                <card.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                  {card.title}
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {card.value}
                </p>
              </div>
            </div>
            
            {/* Trend Indicator */}
            <div className="flex items-center space-x-1">
              {card.trend > 0 ? (
                <TrendingUp className="w-4 h-4 text-green-500" />
              ) : card.trend < 0 ? (
                <TrendingDown className="w-4 h-4 text-red-500" />
              ) : null}
              <span className={`text-sm font-semibold ${
                card.trend > 0 ? 'text-emerald-600 dark:text-emerald-400' : 
                card.trend < 0 ? 'text-rose-600 dark:text-rose-400' : 'text-gray-500 dark:text-gray-400'
              }`}>
                {card.trend !== 0 && `${card.trend > 0 ? '+' : ''}${card.trend.toFixed(1)}%`}
              </span>
            </div>
          </div>
          
          <p className="mt-3 text-xs font-medium text-gray-500 dark:text-gray-400">
            {card.description}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
