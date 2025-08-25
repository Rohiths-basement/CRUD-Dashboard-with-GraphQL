import { motion } from 'framer-motion';
import { Sparkles, TrendingUp, Zap, Globe } from 'lucide-react';
import { formatNumber } from '../lib/utils';

export default function HeroSection({ products, kpis }) {
  const totalStock = products.reduce((sum, p) => sum + p.stock, 0);
  const totalDemand = products.reduce((sum, p) => sum + p.demand, 0);
  const totalProducts = products.length;
  
  const metrics = [
    { label: 'Total Products', value: formatNumber(totalProducts), icon: Globe, color: 'from-blue-400 to-purple-600' },
    { label: 'Stock Units', value: formatNumber(totalStock), icon: TrendingUp, color: 'from-green-400 to-blue-500' },
    { label: 'Demand Units', value: formatNumber(totalDemand), icon: Zap, color: 'from-purple-400 to-pink-600' },
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 left-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          {/* Main Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight">
              <span className="gradient-text">Supply</span>
              <span className="text-white">Sight</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Experience the future of inventory management with real-time insights, 
              predictive analytics, and immersive data visualization.
            </p>
          </motion.div>

          {/* Floating Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          >
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                className="glass-card neon-border floating"
                style={{ animationDelay: `${index * 0.5}s` }}
              >
                <div className="flex items-center justify-center mb-4">
                  <div className={`p-4 rounded-2xl bg-gradient-to-r ${metric.color} shadow-2xl`}>
                    <metric.icon className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h3 className="text-3xl md:text-4xl font-black text-white mb-2">
                  {metric.value}
                </h3>
                <p className="text-gray-300 font-medium">{metric.label}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <button className="btn-3d text-white flex items-center space-x-3 group">
              <Sparkles className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
              <span>Explore Dashboard</span>
            </button>
            <button className="btn-secondary-3d text-white flex items-center space-x-3">
              <TrendingUp className="w-6 h-6" />
              <span>View Analytics</span>
            </button>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-bounce"></div>
        </div>
      </motion.div>
    </div>
  );
}
