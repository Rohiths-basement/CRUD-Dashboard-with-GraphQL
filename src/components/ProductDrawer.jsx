import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Package, Building2, TrendingUp, TrendingDown, Save, ArrowRightLeft } from 'lucide-react';
import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client/react';
import toast from 'react-hot-toast';
import { getProductStatus, formatNumber, cn } from '../lib/utils';

const UPDATE_DEMAND = gql`
  mutation UpdateDemand($id: ID!, $demand: Int!) {
    updateDemand(id: $id, demand: $demand) {
      id
      demand
    }
  }
`;

const TRANSFER_STOCK = gql`
  mutation TransferStock($id: ID!, $from: String!, $to: String!, $qty: Int!) {
    transferStock(id: $id, from: $from, to: $to, qty: $qty) {
      id
      stock
      warehouse
    }
  }
`;

export default function ProductDrawer({ product, isOpen, onClose, warehouses, onUpdate }) {
  const [demandValue, setDemandValue] = useState('');
  const [transferQty, setTransferQty] = useState('');
  const [transferTo, setTransferTo] = useState('');
  const [activeTab, setActiveTab] = useState('details');

  const [updateDemand, { loading: updateLoading }] = useMutation(UPDATE_DEMAND, {
    onCompleted: () => {
      toast.success('Demand updated successfully!');
      onUpdate();
      setDemandValue('');
    },
    onError: (error) => {
      toast.error(`Error updating demand: ${error.message}`);
    }
  });

  const [transferStock, { loading: transferLoading }] = useMutation(TRANSFER_STOCK, {
    onCompleted: () => {
      toast.success('Stock transferred successfully!');
      onUpdate();
      setTransferQty('');
      setTransferTo('');
    },
    onError: (error) => {
      toast.error(`Error transferring stock: ${error.message}`);
    }
  });

  const handleUpdateDemand = (e) => {
    e.preventDefault();
    const newDemand = parseInt(demandValue);
    if (isNaN(newDemand) || newDemand < 0) {
      toast.error('Please enter a valid demand value');
      return;
    }
    updateDemand({ variables: { id: product.id, demand: newDemand } });
  };

  const handleTransferStock = (e) => {
    e.preventDefault();
    const qty = parseInt(transferQty);
    if (isNaN(qty) || qty <= 0) {
      toast.error('Please enter a valid quantity');
      return;
    }
    if (qty > product.stock) {
      toast.error('Transfer quantity cannot exceed current stock');
      return;
    }
    if (!transferTo) {
      toast.error('Please select a destination warehouse');
      return;
    }
    transferStock({
      variables: {
        id: product.id,
        from: product.warehouse,
        to: transferTo,
        qty: qty
      }
    });
  };

  if (!product) return null;

  const status = getProductStatus(product.stock, product.demand);
  const statusConfig = {
    healthy: { 
      label: 'Healthy', 
      icon: TrendingUp, 
      className: 'text-green-800 bg-green-100' 
    },
    low: { 
      label: 'Low Stock', 
      icon: TrendingDown, 
      className: 'text-yellow-800 bg-yellow-100' 
    },
    critical: { 
      label: 'Critical', 
      icon: TrendingDown, 
      className: 'text-red-800 bg-red-100' 
    },
  };

  const currentStatus = statusConfig[status];
  const availableWarehouses = warehouses.filter(w => w.code !== product.warehouse);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-50 overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Package className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    {product.name}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {product.sku}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-200">
              {[
                { id: 'details', label: 'Details' },
                { id: 'demand', label: 'Update Demand' },
                { id: 'transfer', label: 'Transfer Stock' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    'flex-1 py-3 px-4 text-sm font-medium border-b-2 transition-colors duration-200',
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="p-6">
              {activeTab === 'details' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  {/* Status */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-500 ">
                      Status
                    </span>
                    <div className={cn('flex items-center space-x-2 px-3 py-1 rounded-full', currentStatus.className)}>
                      <currentStatus.icon className="w-4 h-4" />
                      <span className="text-sm font-medium">{currentStatus.label}</span>
                    </div>
                  </div>

                  {/* Warehouse */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-500 ">
                      Warehouse
                    </span>
                    <div className="flex items-center space-x-2">
                      <Building2 className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-medium text-gray-900">
                        {product.warehouse}
                      </span>
                    </div>
                  </div>

                  {/* Stock & Demand */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm font-medium text-gray-500 mb-1">
                        Current Stock
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {formatNumber(product.stock)}
                      </p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm font-medium text-gray-500 mb-1">
                        Demand
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {formatNumber(product.demand)}
                      </p>
                    </div>
                  </div>

                  {/* Fill Rate */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm font-medium text-gray-500 mb-2">
                      Fill Rate
                    </p>
                    <div className="flex items-center space-x-3">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className={cn(
                            'h-2 rounded-full transition-all duration-300',
                            status === 'healthy' ? 'bg-green-500' :
                            status === 'low' ? 'bg-yellow-500' : 'bg-red-500'
                          )}
                          style={{
                            width: `${Math.min((product.stock / product.demand) * 100, 100)}%`
                          }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        {((Math.min(product.stock, product.demand) / product.demand) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'demand' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <div>
                    <p className="text-sm text-gray-600  mb-4">
                      Current demand: <span className="font-semibold">{formatNumber(product.demand)}</span>
                    </p>
                    <form onSubmit={handleUpdateDemand} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700  mb-2">
                          New Demand
                        </label>
                        <input
                          type="number"
                          min="0"
                          value={demandValue}
                          onChange={(e) => setDemandValue(e.target.value)}
                          placeholder="Enter new demand value"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={updateLoading}
                        className="w-full flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Save className="w-4 h-4" />
                        <span>{updateLoading ? 'Updating...' : 'Update Demand'}</span>
                      </button>
                    </form>
                  </div>
                </motion.div>
              )}

              {activeTab === 'transfer' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <div>
                    <p className="text-sm text-gray-600  mb-4">
                      Available stock: <span className="font-semibold">{formatNumber(product.stock)}</span>
                    </p>
                    <form onSubmit={handleTransferStock} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700  mb-2">
                          Transfer Quantity
                        </label>
                        <input
                          type="number"
                          min="1"
                          max={product.stock}
                          value={transferQty}
                          onChange={(e) => setTransferQty(e.target.value)}
                          placeholder="Enter quantity to transfer"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700  mb-2">
                          Destination Warehouse
                        </label>
                        <select
                          value={transferTo}
                          onChange={(e) => setTransferTo(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                          required
                        >
                          <option value="">Select warehouse</option>
                          {availableWarehouses.map((warehouse) => (
                            <option key={warehouse.code} value={warehouse.code}>
                              {warehouse.name} ({warehouse.city})
                            </option>
                          ))}
                        </select>
                      </div>
                      <button
                        type="submit"
                        disabled={transferLoading}
                        className="w-full flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ArrowRightLeft className="w-4 h-4" />
                        <span>{transferLoading ? 'Transferring...' : 'Transfer Stock'}</span>
                      </button>
                    </form>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
