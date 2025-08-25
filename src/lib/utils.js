import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function getProductStatus(stock, demand) {
  if (stock > demand) return 'healthy';
  if (stock === demand) return 'low';
  return 'critical';
}

export function calculateFillRate(products) {
  const totalDemand = products.reduce((sum, p) => sum + p.demand, 0);
  const totalFulfilled = products.reduce((sum, p) => sum + Math.min(p.stock, p.demand), 0);
  return totalDemand > 0 ? (totalFulfilled / totalDemand) * 100 : 0;
}

export function formatNumber(num) {
  return new Intl.NumberFormat().format(num);
}

export function formatPercentage(num) {
  return `${num.toFixed(1)}%`;
}

export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
