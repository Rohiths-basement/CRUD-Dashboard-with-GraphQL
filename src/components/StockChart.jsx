import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format, parseISO } from 'date-fns';

export default function StockChart({ data, dateRange }) {
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
        <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl p-4 rounded-xl shadow-xl border border-gray-200/50 dark:border-gray-700/50">
          <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
            {formatTooltipLabel(label)}
          </p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value.toLocaleString()}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Stock vs Demand Trend
          </h2>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {dateRange === '7d' ? 'Last 7 days' : dateRange === '14d' ? 'Last 14 days' : 'Last 30 days'}
          </p>
        </div>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full shadow-sm"></div>
            <span className="text-gray-600 dark:text-gray-400 font-medium">Stock</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-violet-500 rounded-full shadow-sm"></div>
            <span className="text-gray-600 dark:text-gray-400 font-medium">Demand</span>
          </div>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <defs>
              <linearGradient id="blueGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#6366f1" />
              </linearGradient>
              <linearGradient id="purpleGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" strokeOpacity={0.3} />
            <XAxis 
              dataKey="date" 
              tickFormatter={formatXAxisLabel}
              tick={{ fill: '#64748b', fontSize: 12 }}
              interval="preserveStartEnd"
              minTickGap={20}
              allowDecimals={false}
              allowDuplicatedCategory={false}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              padding={{ left: 12, right: 12 }}
            />
            <YAxis tick={{ fill: '#64748b', fontSize: 12 }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line
              type="monotone"
              dataKey="stock"
              stroke="url(#blueGradient)"
              strokeWidth={3}
              dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2, fill: '#ffffff' }}
              isAnimationActive={false}
              animationDuration={0}
              name="Stock"
            />
            <Line
              type="monotone"
              dataKey="demand"
              stroke="url(#purpleGradient)"
              strokeWidth={3}
              dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#8b5cf6', strokeWidth: 2, fill: '#ffffff' }}
              isAnimationActive={false}
              animationDuration={0}
              name="Demand"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
