import { RefreshCcw, Download } from 'lucide-react';

const dateRangeOptions = [
  { value: '7d', label: '7 Days' },
  { value: '14d', label: '14 Days' },
  { value: '30d', label: '30 Days' },
];

export default function SimpleHeader({ dateRange, onDateRangeChange, onRefresh }) {
  const handleExport = () => {
    console.log('Exporting data...');
  };

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <img 
              src="/logo.png" 
              alt="SupplySight" 
              className="h-8 w-auto"
            />
            <h1 className="ml-3 text-xl font-semibold text-gray-900">SupplySight</h1>
          </div>

          {/* Date Range & Actions */}
          <div className="flex items-center space-x-4">
            {/* Date Range */}
            <div className="flex items-center space-x-1">
              {dateRangeOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => onDateRangeChange(option.value)}
                  className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                    dateRange === option.value
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-2">
              <button
                onClick={handleExport}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                title="Export Data"
              >
                <Download className="w-4 h-4" />
              </button>
              
              <button
                onClick={onRefresh}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                title="Refresh Data"
              >
                <RefreshCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
