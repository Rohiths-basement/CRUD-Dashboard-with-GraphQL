import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client/react';
import { gql } from '@apollo/client';
import { Toaster } from 'react-hot-toast';
import SimpleHeader from './SimpleHeader';
import SimpleKPICards from './SimpleKPICards';
import SimpleChart from './SimpleChart';
import SimpleProductTable from './SimpleProductTable';
import ProductDrawer from './ProductDrawer';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';

const GET_PRODUCTS = gql`
  query GetProducts($search: String, $status: String, $warehouse: String) {
    products(search: $search, status: $status, warehouse: $warehouse) {
      id
      name
      sku
      warehouse
      stock
      demand
    }
  }
`;

const GET_WAREHOUSES = gql`
  query GetWarehouses {
    warehouses {
      code
      name
      city
      country
    }
  }
`;

const GET_KPIS = gql`
  query GetKPIs($range: String!) {
    kpis(range: $range) {
      date
      stock
      demand
    }
  }
`;

export default function Dashboard() {
  const [dateRange, setDateRange] = useState('7d');
  const [filters, setFilters] = useState({
    search: '',
    warehouse: 'all',
    status: 'all'
  });
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const { data: productsData, loading: productsLoading, error: productsError, refetch: refetchProducts, networkStatus } = useQuery(GET_PRODUCTS, {
    variables: filters,
    errorPolicy: 'all',
    fetchPolicy: 'cache-and-network',
    notifyOnNetworkStatusChange: true,
  });

  const { data: warehousesData, loading: warehousesLoading } = useQuery(GET_WAREHOUSES, {
    fetchPolicy: 'cache-and-network',
    notifyOnNetworkStatusChange: true,
  });

  const { data: kpisData, loading: kpisLoading } = useQuery(GET_KPIS, {
    variables: { range: dateRange },
    fetchPolicy: 'cache-and-network',
    notifyOnNetworkStatusChange: true,
  });

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
    setSelectedProduct(null);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };


  const handleRefresh = () => {
    refetchProducts();
  };

  const initialLoading = (!productsData && productsLoading) || (!warehousesData && warehousesLoading) || (!kpisData && kpisLoading);
  if (initialLoading) {
    return <LoadingSpinner />;
  }

  if (productsError) {
    return <ErrorMessage error={productsError} onRetry={handleRefresh} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      
      <SimpleHeader 
        dateRange={dateRange} 
        onDateRangeChange={setDateRange}
        onRefresh={handleRefresh}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">Inventory Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">
            Monitor your inventory levels, demand patterns, and product performance.
          </p>
        </div>

        <div className="space-y-8">
          {/* KPI Cards */}
          <SimpleKPICards 
            products={productsData?.products || []} 
            kpis={kpisData?.kpis || []}
          />

          {/* Chart */}
          <SimpleChart 
            data={kpisData?.kpis || []} 
            dateRange={dateRange}
          />

          {/* Products Table */}
          <SimpleProductTable
            products={productsData?.products || []}
            warehouses={warehousesData?.warehouses || []}
            onProductClick={handleProductClick}
            loading={productsLoading && !productsData}
          />
        </div>
      </main>

      {/* Product Drawer */}
      <ProductDrawer
        product={selectedProduct}
        isOpen={isDrawerOpen}
        onClose={handleDrawerClose}
        warehouses={warehousesData?.warehouses || []}
        onUpdate={handleRefresh}
      />
    </div>
  );
}
