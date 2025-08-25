import { Package, Target, BarChart3, TrendingUp, TrendingDown } from 'lucide-react';
import { formatNumber, formatPercentage, calculateFillRate } from '../lib/utils';

export default function SimpleKPICards({ products, kpis }) {
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
      description: 'Units in inventory'
    },
    {
      title: 'Total Demand',
      value: formatNumber(totalDemand),
      icon: Target,
      trend: demandTrend,
      description: 'Units requested'
    },
    {
      title: 'Fill Rate',
      value: formatPercentage(fillRate),
      icon: BarChart3,
      trend: fillRate > 80 ? 5 : fillRate > 60 ? 0 : -5,
      description: 'Demand fulfillment'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((card) => (
        <div key={card.title} className="card p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <card.icon className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">
                  {card.title}
                </dt>
                <dd className="flex items-baseline">
                  <div className="text-2xl font-semibold text-gray-900">
                    {card.value}
                  </div>
                  {card.trend !== 0 && (
                    <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                      card.trend > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {card.trend > 0 ? (
                        <TrendingUp className="self-center flex-shrink-0 h-4 w-4 text-green-500" />
                      ) : (
                        <TrendingDown className="self-center flex-shrink-0 h-4 w-4 text-red-500" />
                      )}
                      <span className="sr-only">
                        {card.trend > 0 ? 'Increased' : 'Decreased'} by
                      </span>
                      {Math.abs(card.trend).toFixed(1)}%
                    </div>
                  )}
                </dd>
              </dl>
            </div>
          </div>
          <div className="mt-3">
            <p className="text-sm text-gray-500">{card.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
