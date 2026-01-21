
import React from 'react';
import { CartItem } from '../types';

interface ReviewOrderViewProps {
  cart: CartItem[];
  onBack: () => void;
  onReview: () => void;
  onCheckout: () => void;
}

const ReviewOrderView: React.FC<ReviewOrderViewProps> = ({ cart, onBack, onCheckout }) => {
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalValue = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <div className="flex-1 flex flex-col h-full bg-white dark:bg-slate-900 overflow-hidden">
      <header className="px-6 py-4 flex items-center shrink-0">
        <button onClick={onBack} className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
          <span className="material-symbols-rounded">chevron_left</span>
        </button>
        <h1 className="flex-1 text-center text-xl font-bold dark:text-white">Review Order</h1>
        <div className="w-10"></div>
      </header>

      <main className="flex-1 overflow-y-auto hide-scrollbar px-6 pb-48">
        <div className="mt-2 mb-6 text-center">
          <p className="text-slate-500 dark:text-slate-400 text-sm">Review your scanned items before final submission.</p>
        </div>

        <div className="space-y-3">
          {cart.map((item) => (
            <div key={item.id} className="p-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-3xl flex items-center gap-4">
              <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center border border-slate-100 dark:border-slate-700 flex-shrink-0 overflow-hidden">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover opacity-80" />
              </div>
              <div className="flex-1">
                <div className="flex flex-col">
                  <span className="text-lg font-extrabold text-slate-900 dark:text-white leading-tight">SKU-{item.sku}</span>
                  <h3 className="text-xs font-medium text-slate-500 dark:text-slate-400">{item.name}</h3>
                </div>
                <div className="mt-2 flex justify-between items-end">
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    <span className="block font-semibold text-slate-600 dark:text-slate-300">Qty: {item.quantity} {item.unit}</span>
                    <span className="block">${item.price.toFixed(2)} / unit</span>
                  </div>
                  <span className="font-bold text-slate-900 dark:text-white text-lg">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <div className="absolute bottom-0 left-0 right-0 p-6 pb-8 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-t border-slate-100 dark:border-slate-800">
        <div className="flex justify-between items-center mb-6 px-1">
          <div>
            <span className="text-sm text-slate-500 dark:text-slate-400 block font-medium">Total Items</span>
            <span className="text-lg font-bold dark:text-white">{totalItems} units</span>
          </div>
          <div className="text-right">
            <span className="text-sm text-slate-500 dark:text-slate-400 block font-medium">Estimated Total</span>
            <span className="text-2xl font-black text-primary">${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <button 
            onClick={onCheckout}
            className="w-full py-4 bg-primary hover:bg-orange-600 text-white font-bold rounded-2xl shadow-lg shadow-orange-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <span className="material-symbols-rounded">send</span>
            Submit Order
          </button>
          <button 
            onClick={onBack}
            className="w-full py-4 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold rounded-2xl hover:bg-slate-200 dark:hover:bg-slate-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <span className="material-symbols-rounded">qr_code_scanner</span>
            Back to Scanning
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewOrderView;
