
import React from 'react';
import { CartItem } from '../types';

interface DashboardViewProps {
  cart: CartItem[];
  onScan: () => void;
  onReview: () => void;
  onClear: () => void;
  updateQuantity: (id: string, q: number) => void;
}

const DashboardView: React.FC<DashboardViewProps> = ({ cart, onScan, onReview, onClear, updateQuantity }) => {
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalValue = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-50 dark:bg-slate-950 overflow-hidden">
      <header className="px-6 pt-2 pb-4 shrink-0">
        <div className="flex justify-between items-center mb-6">
          <div className="bg-white dark:bg-slate-800 p-2 rounded-full flex items-center justify-center w-10 h-10 shadow-sm">
            <span className="material-symbols-rounded text-slate-600 dark:text-slate-300">person</span>
          </div>
          <div className="flex space-x-3">
            <button className="relative bg-white dark:bg-slate-800 p-2 rounded-full flex items-center justify-center w-10 h-10 shadow-sm">
              <span className="material-symbols-rounded text-slate-600 dark:text-slate-300 text-[22px]">notifications</span>
              <span className="absolute top-2 right-2 bg-primary w-2 h-2 rounded-full border-2 border-white dark:border-slate-800"></span>
            </button>
            <button className="bg-white dark:bg-slate-800 p-2 rounded-full flex items-center justify-center w-10 h-10 shadow-sm">
              <span className="material-symbols-rounded text-slate-600 dark:text-slate-300 text-[22px]">history</span>
            </button>
          </div>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight leading-tight dark:text-white">
          Order <span className="text-primary">Dashboard</span>
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Manage sales items and scan barcodes.</p>
      </header>

      <main className="px-6 flex-1 flex flex-col min-h-0">
        <div className="mt-2 mb-8 shrink-0">
          <button 
            onClick={onScan}
            className="w-full bg-primary hover:bg-orange-600 transition-colors py-8 rounded-[28px] flex flex-col items-center justify-center shadow-lg shadow-orange-500/20 active:scale-[0.98] duration-150"
          >
            <div className="bg-white/20 p-3 rounded-2xl mb-2 backdrop-blur-sm">
              <span className="material-symbols-rounded text-white text-4xl">barcode_scanner</span>
            </div>
            <span className="text-white text-lg font-bold">Scan Product</span>
          </button>
        </div>

        <div className="flex-1 flex flex-col min-h-0">
          <div className="flex justify-between items-center mb-4 px-1">
            <h2 className="text-lg font-bold flex items-center dark:text-white">
              Current Order
              <span className="ml-2 bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] py-0.5 px-2 rounded-full">
                {cart.length} ITEMS
              </span>
            </h2>
            <button onClick={onClear} className="text-primary font-bold text-xs uppercase tracking-wider hover:opacity-70">Clear All</button>
          </div>

          <div className="space-y-4 overflow-y-auto hide-scrollbar flex-1 pb-4 pr-1">
            {cart.length === 0 ? (
              <div className="h-40 flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl">
                <span className="material-symbols-rounded text-4xl mb-2">shopping_basket</span>
                <p className="text-sm">Scan a product to start</p>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="bg-white dark:bg-slate-900 p-4 rounded-[20px] shadow-sm border border-slate-100 dark:border-slate-800 transition-colors">
                  <div className="flex gap-4">
                    <div className="w-14 h-14 bg-slate-50 dark:bg-slate-800 rounded-2xl flex-shrink-0 flex items-center justify-center border border-slate-100 dark:border-slate-700 overflow-hidden">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-slate-800 dark:text-slate-100 truncate text-sm">{item.name}</h3>
                      <div className="flex items-center mt-1">
                        <span className="text-[10px] font-bold text-slate-400 bg-slate-50 dark:bg-slate-800 px-2 py-0.5 rounded uppercase tracking-tighter shrink-0">SKU: {item.sku}</span>
                      </div>
                      <p className="text-[11px] font-bold text-primary mt-1">${item.price.toFixed(2)} / {item.unit}</p>
                    </div>
                    <div className="flex flex-col items-center justify-between py-0.5 shrink-0">
                      <div className="flex flex-col items-center">
                        <span className="text-[9px] font-bold text-slate-400 uppercase mb-1">Qty</span>
                        <input 
                          className="w-12 h-9 text-center font-bold text-sm bg-slate-50 dark:bg-slate-800 border-none rounded-lg focus:ring-1 focus:ring-primary p-0 dark:text-white" 
                          type="number" 
                          value={item.quantity} 
                          onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 0)}
                        />
                      </div>
                      <button onClick={() => updateQuantity(item.id, 0)} className="text-slate-300 hover:text-red-500 transition-colors mt-2">
                        <span className="material-symbols-rounded text-xl">delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>

      <footer className="shrink-0 p-6 pt-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
        <div className="flex items-center justify-between mb-4 px-2">
          <div>
            <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest">Order Summary</p>
            <p className="text-lg font-black dark:text-white">{totalItems} Items</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest">Est. Total</p>
            <p className="text-lg font-black text-primary">${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
          </div>
        </div>
        <button 
          onClick={onReview}
          disabled={cart.length === 0}
          className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-4 rounded-[18px] font-extrabold text-base flex items-center justify-center shadow-lg active:scale-[0.98] transition-all disabled:opacity-50 disabled:grayscale"
        >
          Checkout
          <span className="material-symbols-rounded ml-2 text-xl font-bold">arrow_forward</span>
        </button>
      </footer>
    </div>
  );
};

export default DashboardView;
