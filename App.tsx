
import React, { useState, useCallback, useEffect } from 'react';
import { View, CartItem, OrderDetails, Product } from './types';
import { MOCK_PRODUCTS } from './constants';
import LoginView from './views/LoginView';
import DashboardView from './views/DashboardView';
import ScannerView from './views/ScannerView';
import ReviewOrderView from './views/ReviewOrderView';
import SuccessView from './views/SuccessView';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('LOGIN');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [lastOrder, setLastOrder] = useState<OrderDetails | null>(null);
  const [darkMode, setDarkMode] = useState<boolean>(false);

  // Sync dark mode class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const addToCart = useCallback((product: Product, quantity: number) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
    setCurrentView('DASHBOARD');
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    setCart(prev => {
      if (quantity <= 0) return prev.filter(item => item.id !== productId);
      return prev.map(item => 
        item.id === productId ? { ...item, quantity } : item
      );
    });
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const submitOrder = useCallback(() => {
    const totalValue = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const order: OrderDetails = {
      orderId: Math.floor(10000 + Math.random() * 90000).toString(),
      items: [...cart],
      totalValue,
      timestamp: new Date().toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };
    setLastOrder(order);
    setCart([]);
    setCurrentView('SUCCESS');
  }, [cart]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-0 md:p-4 bg-slate-200 dark:bg-slate-950 transition-colors duration-300">
      {/* Mobile Shell Wrapper */}
      <div className="relative w-full max-w-[430px] h-screen md:h-[844px] bg-white dark:bg-slate-900 md:rounded-[50px] shadow-2xl overflow-hidden border-0 md:border-[8px] border-slate-900 dark:border-slate-800 flex flex-col">
        
        {/* iOS StatusBar Mockup */}
        <div className="px-8 pt-6 pb-2 flex justify-between items-center w-full z-10 shrink-0">
          <span className="text-sm font-semibold dark:text-white">9:41</span>
          <div className="flex gap-1.5 items-center">
            <span className="material-symbols-rounded text-[18px] dark:text-white">signal_cellular_4_bar</span>
            <span className="material-symbols-rounded text-[18px] dark:text-white">wifi</span>
            <span className="material-symbols-rounded text-[18px] dark:text-white rotate-90">battery_full</span>
          </div>
        </div>

        {/* View Content */}
        <div className="flex-1 relative overflow-hidden flex flex-col">
          {currentView === 'LOGIN' && <LoginView onLogin={() => setCurrentView('DASHBOARD')} />}
          {currentView === 'DASHBOARD' && (
            <DashboardView 
              cart={cart} 
              onScan={() => setCurrentView('SCANNER')}
              onReview={() => setCurrentView('REVIEW')}
              onClear={clearCart}
              updateQuantity={updateQuantity}
            />
          )}
          {currentView === 'SCANNER' && (
            <ScannerView 
              onBack={() => setCurrentView('DASHBOARD')} 
              onProductFound={addToCart}
            />
          )}
          {currentView === 'REVIEW' && (
            <ReviewOrderView 
              cart={cart}
              onBack={() => setCurrentView('DASHBOARD')}
              onReview={() => {}} // already here
              onCheckout={submitOrder}
            />
          )}
          {currentView === 'SUCCESS' && (
            <SuccessView 
              order={lastOrder} 
              onNewOrder={() => setCurrentView('DASHBOARD')} 
            />
          )}
        </div>

        {/* Home Indicator */}
        <div className="shrink-0 pb-2">
          <div className="home-indicator text-slate-300 dark:text-slate-600"></div>
        </div>

        {/* Floating Dark Mode Toggle */}
        <button 
          onClick={toggleDarkMode}
          className="fixed top-8 right-8 md:right-auto md:left-[calc(50%+230px)] p-3 bg-white dark:bg-slate-800 rounded-full shadow-lg border border-slate-200 dark:border-slate-700 z-[100]"
        >
          <span className="material-symbols-rounded dark:hidden text-slate-600">dark_mode</span>
          <span className="material-symbols-rounded hidden dark:block text-amber-400">light_mode</span>
        </button>
      </div>
    </div>
  );
};

export default App;
