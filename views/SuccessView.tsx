
import React from 'react';
import { OrderDetails } from '../types';

interface SuccessViewProps {
  order: OrderDetails | null;
  onNewOrder: () => void;
}

const SuccessView: React.FC<SuccessViewProps> = ({ order, onNewOrder }) => {
  if (!order) return null;

  const totalItemsCount = order.items.reduce((acc, i) => acc + i.quantity, 0);

  return (
    <div className="flex-1 flex flex-col p-6 pt-12 items-center text-center overflow-y-auto hide-scrollbar">
      <div className="mb-10 flex flex-col items-center">
        <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center animate-bounce-in mb-6">
          <span className="material-symbols-rounded text-green-500 text-6xl">check_circle</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight mb-2 px-4 leading-tight dark:text-white">
          Order #{order.orderId} Submitted Successfully
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-lg">
          Everything looks good!
        </p>
      </div>

      <div className="w-full bg-slate-50 dark:bg-slate-800/50 p-6 rounded-[32px] space-y-4 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center">
              <span className="material-symbols-rounded">inventory_2</span>
            </div>
            <span className="font-medium dark:text-slate-300">Total Items</span>
          </div>
          <span className="text-xl font-bold dark:text-white">{totalItemsCount} units</span>
        </div>
        
        <div className="h-px bg-slate-200 dark:bg-slate-700"></div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-xl flex items-center justify-center">
              <span className="material-symbols-rounded">schedule</span>
            </div>
            <span className="font-medium dark:text-slate-300">Timestamp</span>
          </div>
          <span className="text-sm text-slate-600 dark:text-slate-400 text-right">{order.timestamp}</span>
        </div>
        
        <div className="h-px bg-slate-200 dark:bg-slate-700"></div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-xl flex items-center justify-center">
              <span className="material-symbols-rounded">receipt_long</span>
            </div>
            <span className="font-medium dark:text-slate-300">Total Value</span>
          </div>
          <span className="text-xl font-bold text-primary">${order.totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 w-full opacity-60 mb-8">
        <div className="h-20 bg-green-50 dark:bg-green-900/10 rounded-3xl border border-green-100 dark:border-green-800/20 flex items-center justify-center space-x-2">
          <span className="material-symbols-rounded text-green-500">sync</span>
          <span className="text-sm font-medium text-green-700 dark:text-green-400">API Synced</span>
        </div>
        <div className="h-20 bg-slate-50 dark:bg-slate-800/30 rounded-3xl border border-slate-100 dark:border-slate-700/30 flex items-center justify-center space-x-2">
          <span className="material-symbols-rounded text-slate-400">cloud_done</span>
          <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Cloud Saved</span>
        </div>
      </div>

      <div className="w-full space-y-4 mt-auto">
        <button 
          onClick={onNewOrder}
          className="w-full bg-primary hover:bg-orange-600 transition-colors text-white text-lg font-bold py-5 rounded-[24px] shadow-lg shadow-orange-200 dark:shadow-none flex items-center justify-center space-x-2 active:scale-95 duration-100"
        >
          <span className="material-symbols-rounded">add_circle</span>
          <span>Start New Order</span>
        </button>
        <button className="w-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-slate-700 dark:text-slate-300 text-lg font-semibold py-5 rounded-[24px] active:scale-95 duration-100">
          View Order History
        </button>
      </div>
    </div>
  );
};

export default SuccessView;
