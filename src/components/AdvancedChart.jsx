import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, BarChart, Bar, RadialBarChart, RadialBar, PieChart, Pie, Cell } from 'recharts';
import { format, parseISO } from 'date-fns';
import { BarChart3, TrendingUp, PieChart as PieChartIcon, Activity, Zap, Eye } from 'lucide-react';

const CHART_TYPES = [
  { id: 'line', name: 'Line Chart', icon: TrendingUp, color: 'from-blue-400 to-purple-600' },
  { id: 'area', name: 'Area Chart', icon: Activity, color: 'from-green-400 to-blue-500' },
  { id: 'bar', name: 'Bar Chart', icon: BarChart3, color: 'from-purple-400 to-pink-600' },
  { id: 'radial', name: 'Radial Chart', icon: Zap, color: 'from-orange-400 to-red-500' },
];

const COLORS = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#00f2fe'];

export default function AdvancedChart({ data, dateRange }) {
  const [activeChart, setActiveChart] = useState('line');
  const [isHovered, setIsHovered] = useState(false);

  const formatXAxisLabel = (tickItem) => {
    const date = parseISO(tickItem);
    return format(date, 'MMM dd');
  };

  const formatTooltipLabel = (label) => {
    const date = parseISO(label);
    return format(date, 'MMM dd, yyyy');
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-4 border-2 border-white/20"
        >
          <p className="text-sm font-bold text-white mb-2">
            {formatTooltipLabel(label)}
          </p>
          {payload.map((entry, index) => (
            <motion.p 
              key={index} 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="text-sm font-semibold" 
              style={{ color: entry.color }}
            >
              {entry.name}: {entry.value?.toLocaleString()}
            </motion.p>
          ))}
        </motion.div>
      );
    }
    return null;
  };

  const renderChart = () => {
    const commonProps = {
      data,
      margin: { top: 20, right: 30, left: 20, bottom: 20 }
    };

    switch (activeChart) {
      case 'area':
        return (
          <AreaChart {...commonProps}>
            <defs>
              <linearGradient id="stockGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#667eea" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#667eea" stopOpacity={0.1}/>
              </linearGradient>
              <linearGradient id="demandGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#764ba2" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#764ba2" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis 
              dataKey="date" 
              tickFormatter={formatXAxisLabel}
              tick={{ fill: '#94a3b8', fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Area
              type="monotone"
              dataKey="stock"
              stroke="#667eea"
              strokeWidth={3}
              fill="url(#stockGradient)"
              name="Stock"
            />
            <Area
              type="monotone"
              dataKey="demand"
              stroke="#764ba2"
              strokeWidth={3}
              fill="url(#demandGradient)"
              name="Demand"
            />
          </AreaChart>
        );

      case 'bar':
        return (
          <BarChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis 
              dataKey="date" 
              tickFormatter={formatXAxisLabel}
              tick={{ fill: '#94a3b8', fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="stock" fill="#667eea" radius={[4, 4, 0, 0]} name="Stock" />
            <Bar dataKey="demand" fill="#764ba2" radius={[4, 4, 0, 0]} name="Demand" />
          </BarChart>
        );

      case 'radial':
        const radialData = data.slice(-5).map((item, index) => ({
          ...item,
          fill: COLORS[index % COLORS.length]
        }));
        return (
          <div className="flex justify-center items-center h-full">
            <RadialBarChart width={400} height={400} cx={200} cy={200} innerRadius="20%" outerRadius="90%" data={radialData}>
              <RadialBar dataKey="stock" cornerRadius={10} fill="#667eea" />
              <RadialBar dataKey="demand" cornerRadius={10} fill="#764ba2" />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
            </RadialBarChart>
          </div>
        );

      default: // line
        return (
          <LineChart {...commonProps}>
            <defs>
              <linearGradient id="lineStockGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#667eea" />
                <stop offset="100%" stopColor="#764ba2" />
              </linearGradient>
              <linearGradient id="lineDemandGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#f093fb" />
                <stop offset="100%" stopColor="#f5576c" />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis 
              dataKey="date" 
              tickFormatter={formatXAxisLabel}
              tick={{ fill: '#94a3b8', fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              allowDuplicatedCategory={false}
              interval="preserveStartEnd"
            />
            <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line
              type="monotone"
              dataKey="stock"
              stroke="url(#lineStockGradient)"
              strokeWidth={4}
              dot={{ fill: '#667eea', strokeWidth: 3, r: 6 }}
              activeDot={{ r: 8, stroke: '#667eea', strokeWidth: 3, fill: '#ffffff' }}
              isAnimationActive={false}
              name="Stock"
            />
            <Line
              type="monotone"
              dataKey="demand"
              stroke="url(#lineDemandGradient)"
              strokeWidth={4}
              dot={{ fill: '#f5576c', strokeWidth: 3, r: 6 }}
              activeDot={{ r: 8, stroke: '#f5576c', strokeWidth: 3, fill: '#ffffff' }}
              isAnimationActive={false}
              name="Demand"
            />
          </LineChart>
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="glass-card relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 space-y-4 lg:space-y-0">
        <div>
          <h2 className="text-2xl font-black text-white mb-2">
            Stock vs Demand Analytics
          </h2>
          <p className="text-gray-300 font-medium">
            {dateRange === '7d' ? 'Last 7 days' : dateRange === '14d' ? 'Last 14 days' : 'Last 30 days'}
          </p>
        </div>

        {/* Chart Type Selector */}
        <div className="flex items-center space-x-2 bg-black/20 rounded-2xl p-2">
          {CHART_TYPES.map((type) => (
            <motion.button
              key={type.id}
              onClick={() => setActiveChart(type.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                activeChart === type.id
                  ? 'bg-gradient-to-r text-white shadow-lg'
                  : 'text-gray-400 hover:text-white hover:bg-white/10'
              }`}
              style={{
                background: activeChart === type.id ? `linear-gradient(135deg, ${type.color.split(' ')[1]}, ${type.color.split(' ')[3]})` : undefined
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <type.icon className="w-4 h-4" />
              <span className="text-sm font-semibold hidden sm:block">{type.name}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Chart Container */}
      <div className="relative h-96 lg:h-[500px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeChart}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full"
          >
            <ResponsiveContainer width="100%" height="100%">
              {renderChart()}
            </ResponsiveContainer>
          </motion.div>
        </AnimatePresence>

        {/* Floating Stats */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="absolute top-4 right-4 glass-card p-4 min-w-[200px]"
            >
              <div className="flex items-center space-x-2 mb-3">
                <Eye className="w-4 h-4 text-blue-400" />
                <span className="text-sm font-bold text-white">Quick Stats</span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-300">Avg Stock:</span>
                  <span className="text-white font-semibold">
                    {Math.round(data.reduce((sum, d) => sum + d.stock, 0) / data.length).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Avg Demand:</span>
                  <span className="text-white font-semibold">
                    {Math.round(data.reduce((sum, d) => sum + d.demand, 0) / data.length).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Data Points:</span>
                  <span className="text-white font-semibold">{data.length}</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center space-x-8 mt-6">
        <div className="flex items-center space-x-3">
          <div className="w-4 h-4 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full shadow-lg"></div>
          <span className="text-gray-300 font-semibold">Stock Levels</span>
        </div>
        <div className="flex items-center space-x-3">
          <div className="w-4 h-4 bg-gradient-to-r from-purple-400 to-pink-600 rounded-full shadow-lg"></div>
          <span className="text-gray-300 font-semibold">Demand Trends</span>
        </div>
      </div>
    </motion.div>
  );
}
