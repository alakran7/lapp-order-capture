
/**
 * LAPP OrderCapture Pro - Core Application Logic
 * Pure Vanilla JavaScript Implementation
 */

// --- Constants & Data ---

const MOCK_PRODUCTS = [
  { id: '1', sku: '1119003', name: 'ÖLFLEX® CLASSIC 110', description: 'Control cable with PVC insulation and inner sheath.', price: 12.50, unit: 'm', image: 'https://picsum.photos/seed/cable1/600/600', category: 'Cables' },
  { id: '2', sku: '53112000', name: 'SKINTOP® MS-M', description: 'Nickel-plated brass cable gland for industrial use.', price: 4.25, unit: 'pcs', image: 'https://picsum.photos/seed/gland1/600/600', category: 'Accessories' },
  { id: '3', sku: '2170280', name: 'ETHERLINE® CAT.5e', description: 'Industrial Ethernet cable for fixed installation.', price: 142.50, unit: 'reel', image: 'https://picsum.photos/seed/ether1/600/600', category: 'Data' },
  { id: '4', sku: 'SKU-2091', name: 'Premium Matte Finish', description: 'High-quality industrial coating for metallic surfaces.', price: 12.50, unit: 'pcs', image: 'https://picsum.photos/seed/paint1/600/600', category: 'Chemicals' },
  { id: '5', sku: 'SKU-1044', name: 'Industrial Adhesive', description: 'High-strength structural adhesive for metals.', price: 4.25, unit: 'pcs', image: 'https://picsum.photos/seed/glue1/600/600', category: 'Chemicals' },
  { id: '6', sku: 'SKU-8821', name: 'Steel Fasteners Box', description: 'M8 Grade 8.8 Galvanized Hex Bolts, set of 100.', price: 45.00, unit: 'box', image: 'https://picsum.photos/seed/fasten1/600/600', category: 'Hardware' },
  { id: '7', sku: 'SKU-3320', name: 'Copper Wiring Reel', description: 'Standard 2.5mm copper wire for industrial loops.', price: 120.00, unit: 'reel', image: 'https://picsum.photos/seed/wire1/600/600', category: 'Cables' },
  { id: '8', sku: 'EPIC-HBE-16', name: 'EPIC® H-BE 16', description: 'Inserts for high-voltage industrial connectors.', price: 18.90, unit: 'pcs', image: 'https://picsum.photos/seed/conn1/600/600', category: 'Connectors' },
  { id: '9', sku: 'UNITRONIC-LIYY', name: 'UNITRONIC® LiYY', description: 'Data transmission cable for low frequency apps.', price: 8.75, unit: 'm', image: 'https://picsum.photos/seed/data1/600/600', category: 'Cables' },
  { id: '10', sku: 'SILVYN-RILL', name: 'SILVYN® RILL PA6', description: 'Corrugated conduit for dynamic cable protection.', price: 6.30, unit: 'm', image: 'https://picsum.photos/seed/conduit1/600/600', category: 'Protection' }
];

// --- Application State ---

let state = {
  view: 'LOGIN', // LOGIN, DASHBOARD, SCANNER, REVIEW, SUCCESS
  cart: [],
  darkMode: localStorage.getItem('lapp-dark-mode') === 'true',
  lastOrder: null,
  isScanning: false,
  scannedProduct: null,
  scanQuantity: 1
};

// --- Core Functions ---

function setState(newState) {
  state = { ...state, ...newState };
  render();
}

function addToCart(product, quantity) {
  const existingIndex = state.cart.findIndex(item => item.id === product.id);
  let newCart = [...state.cart];
  
  if (existingIndex > -1) {
    newCart[existingIndex].quantity += quantity;
  } else {
    newCart.push({ ...product, quantity });
  }
  
  setState({ cart: newCart, view: 'DASHBOARD' });
}

function updateQuantity(productId, quantity) {
  let newCart = state.cart.map(item => {
    if (item.id === productId) return { ...item, quantity };
    return item;
  }).filter(item => item.quantity > 0);
  
  setState({ cart: newCart });
}

function submitOrder() {
  const totalValue = state.cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const order = {
    orderId: Math.floor(10000 + Math.random() * 90000).toString(),
    items: [...state.cart],
    totalValue,
    timestamp: new Date().toLocaleString()
  };
  setState({ lastOrder: order, cart: [], view: 'SUCCESS' });
}

// --- View Templates ---

const Views = {
  LOGIN: () => `
    <div class="flex-1 flex flex-col p-8 pt-4">
      <div class="mb-12 flex items-center justify-center">
        <div class="flex items-center">
          <svg class="mr-3" height="48" viewBox="0 0 100 100" width="48">
            <circle cx="50" cy="50" fill="currentColor" class="text-slate-900 dark:text-white" r="50"></circle>
            <circle cx="50" cy="28" fill="#FF5C00" r="11"></circle>
            <circle cx="28" cy="44" fill="white" r="11"></circle>
            <circle cx="72" cy="44" fill="white" r="11"></circle>
            <circle cx="36" cy="70" fill="white" r="11"></circle>
            <circle cx="64" cy="70" fill="white" r="11"></circle>
          </svg>
          <span class="text-primary text-5xl font-black italic tracking-tighter">LAPP</span>
        </div>
      </div>
      <div class="mb-10 text-center">
        <h1 class="text-4xl font-bold tracking-tight mb-2 dark:text-white">Welcome.</h1>
        <p class="text-slate-500 dark:text-slate-400 text-lg">Sign in to capture orders.</p>
      </div>
      <form class="space-y-4" onsubmit="event.preventDefault(); window.app.setView('DASHBOARD')">
        <div class="space-y-1.5">
          <label class="px-2 text-xs font-semibold uppercase tracking-wider text-slate-400">Username</label>
          <input required class="w-full h-16 px-6 bg-white dark:bg-slate-800 border-0 ring-1 ring-slate-200 dark:ring-slate-700 rounded-2xl focus:ring-2 focus:ring-primary transition-all outline-none dark:text-white" value="sales.demo" type="text" />
        </div>
        <div class="space-y-1.5">
          <label class="px-2 text-xs font-semibold uppercase tracking-wider text-slate-400">Password</label>
          <input required class="w-full h-16 px-6 bg-white dark:bg-slate-800 border-0 ring-1 ring-slate-200 dark:ring-slate-700 rounded-2xl focus:ring-2 focus:ring-primary transition-all outline-none dark:text-white" value="••••••••" type="password" />
        </div>
        <button class="w-full h-16 bg-primary text-white font-bold text-lg rounded-2xl shadow-xl shadow-orange-500/30 active:scale-[0.98] transition-all flex items-center justify-center space-x-2 mt-8">
          <span>Log In</span>
          <span class="material-symbols-rounded">arrow_forward</span>
        </button>
      </form>
    </div>
  `,

  DASHBOARD: () => {
    const totalItems = state.cart.reduce((acc, item) => acc + item.quantity, 0);
    const totalValue = state.cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    return `
    <div class="flex-1 flex flex-col h-full bg-slate-50 dark:bg-slate-950 overflow-hidden">
      <header class="px-6 pt-2 pb-4 shrink-0">
        <div class="flex justify-between items-center mb-6">
          <div class="bg-white dark:bg-slate-800 p-2 rounded-full flex items-center justify-center w-10 h-10 shadow-sm">
            <span class="material-symbols-rounded text-slate-600 dark:text-slate-300">person</span>
          </div>
          <div class="flex space-x-3">
            <button class="bg-white dark:bg-slate-800 p-2 rounded-full w-10 h-10 shadow-sm"><span class="material-symbols-rounded text-slate-600 dark:text-slate-300">notifications</span></button>
            <button class="bg-white dark:bg-slate-800 p-2 rounded-full w-10 h-10 shadow-sm"><span class="material-symbols-rounded text-slate-600 dark:text-slate-300">history</span></button>
          </div>
        </div>
        <h1 class="text-3xl font-extrabold tracking-tight dark:text-white">Order <span class="text-primary">Dashboard</span></h1>
      </header>
      <main class="px-6 flex-1 flex flex-col min-h-0">
        <div class="mt-2 mb-8">
          <button onclick="window.app.setView('SCANNER')" class="w-full bg-primary py-8 rounded-[28px] flex flex-col items-center shadow-lg active:scale-[0.98] transition-all">
            <span class="material-symbols-rounded text-white text-4xl mb-2">barcode_scanner</span>
            <span class="text-white text-lg font-bold">Scan Product</span>
          </button>
        </div>
        <div class="flex-1 flex flex-col min-h-0">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-lg font-bold dark:text-white">Current Order</h2>
            <button onclick="window.app.clearCart()" class="text-primary font-bold text-xs uppercase">Clear All</button>
          </div>
          <div class="space-y-4 overflow-y-auto hide-scrollbar flex-1 pb-4">
            ${state.cart.length === 0 ? `
              <div class="h-40 flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl">
                <span class="material-symbols-rounded text-4xl mb-2">shopping_basket</span>
                <p class="text-sm">Scan a product to start</p>
              </div>
            ` : state.cart.map(item => `
              <div class="bg-white dark:bg-slate-900 p-4 rounded-[20px] shadow-sm flex gap-4">
                <img src="${item.image}" class="w-14 h-14 rounded-2xl object-cover shrink-0" />
                <div class="flex-1 min-w-0">
                  <h3 class="font-bold text-sm truncate dark:text-white">${item.name}</h3>
                  <p class="text-[10px] text-slate-400 font-bold uppercase">SKU: ${item.sku}</p>
                  <p class="text-[11px] font-bold text-primary mt-1">$${item.price.toFixed(2)} / ${item.unit}</p>
                </div>
                <div class="flex flex-col items-center">
                  <input type="number" value="${item.quantity}" onchange="window.app.updateQuantity('${item.id}', this.value)" class="w-12 h-8 text-center bg-slate-50 dark:bg-slate-800 border-0 rounded-lg text-xs font-bold dark:text-white" />
                  <button onclick="window.app.updateQuantity('${item.id}', 0)" class="text-slate-300 mt-2"><span class="material-symbols-rounded text-lg">delete</span></button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </main>
      <footer class="p-6 bg-white dark:bg-slate-900 border-t dark:border-slate-800">
        <div class="flex justify-between mb-4">
          <p class="text-lg font-black dark:text-white">${totalItems} Items</p>
          <p class="text-lg font-black text-primary">$${totalValue.toFixed(2)}</p>
        </div>
        <button onclick="window.app.setView('REVIEW')" ${state.cart.length === 0 ? 'disabled' : ''} class="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-4 rounded-[18px] font-extrabold disabled:opacity-50">Checkout</button>
      </footer>
    </div>
    `;
  },

  SCANNER: () => {
    return `
    <div class="flex-1 flex flex-col bg-black h-full relative overflow-hidden">
      <button onclick="window.app.setView('DASHBOARD')" class="absolute top-6 left-6 z-50 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white"><span class="material-symbols-rounded">arrow_back</span></button>
      
      <div id="camera-container" class="flex-1 flex flex-col items-center justify-center relative bg-slate-900">
        <video id="scanner-video" autoplay playsinline muted class="absolute inset-0 w-full h-full object-cover"></video>
        <div class="absolute inset-0 pointer-events-none flex flex-col items-center justify-center">
            <div class="w-64 h-40 border-2 border-primary/50 rounded-2xl relative">
                <div class="absolute top-0 left-0 w-full h-0.5 bg-primary/80 animate-scan"></div>
            </div>
            <p class="mt-8 text-white/70 font-medium text-sm">Center barcode in frame</p>
        </div>
        <div class="absolute bottom-10 flex justify-center w-full px-10">
          <button onclick="window.app.simulateScan()" class="w-20 h-20 rounded-full border-4 border-white flex items-center justify-center active:scale-90 transition-all">
            <div class="w-16 h-16 bg-primary rounded-full flex items-center justify-center"><span class="material-symbols-rounded text-white text-3xl">qr_code_scanner</span></div>
          </button>
        </div>
      </div>

      ${state.scannedProduct ? `
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-end">
          <div class="bg-white dark:bg-slate-900 w-full rounded-t-[40px] p-8 pb-12">
            <h2 class="text-3xl font-black mb-1 dark:text-white">${state.scannedProduct.name}</h2>
            <p class="text-slate-400 mb-6 font-bold">SKU: ${state.scannedProduct.sku}</p>
            <div class="bg-slate-50 dark:bg-slate-800 p-4 rounded-3xl flex items-center justify-between mb-8">
              <div class="flex items-center gap-4">
                <button onclick="window.app.setScanQty(-1)" class="w-10 h-10 bg-white dark:bg-slate-700 rounded-xl shadow-sm"><span class="material-symbols-rounded dark:text-white">remove</span></button>
                <span class="text-xl font-black dark:text-white">${state.scanQuantity}</span>
                <button onclick="window.app.setScanQty(1)" class="w-10 h-10 bg-primary text-white rounded-xl shadow-lg"><span class="material-symbols-rounded">add</span></button>
              </div>
              <button onclick="window.app.confirmScan()" class="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-3 rounded-2xl font-bold">Add to Order</button>
            </div>
            <button onclick="window.app.cancelScan()" class="w-full text-slate-400 font-bold">Cancel</button>
          </div>
        </div>
      ` : ''}
    </div>
    `;
  },

  REVIEW: () => {
    const totalValue = state.cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    return `
    <div class="flex-1 flex flex-col h-full bg-white dark:bg-slate-900">
      <header class="px-6 py-4 flex items-center shrink-0">
        <button onclick="window.app.setView('DASHBOARD')" class="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center"><span class="material-symbols-rounded">chevron_left</span></button>
        <h1 class="flex-1 text-center text-xl font-bold dark:text-white">Review Order</h1>
      </header>
      <main class="flex-1 overflow-y-auto px-6 pb-40">
        <div class="space-y-3 mt-4">
          ${state.cart.map(item => `
            <div class="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-3xl flex items-center gap-4">
              <img src="${item.image}" class="w-14 h-14 rounded-2xl object-cover shrink-0" />
              <div class="flex-1">
                <p class="font-extrabold text-sm dark:text-white">SKU-${item.sku}</p>
                <p class="text-xs text-slate-500">${item.name}</p>
              </div>
              <div class="text-right">
                <p class="text-xs font-bold dark:text-white">${item.quantity} ${item.unit}</p>
                <p class="text-sm font-black text-primary">$${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </main>
      <footer class="p-6 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-t dark:border-slate-800 absolute bottom-0 left-0 right-0">
        <div class="flex justify-between items-center mb-6">
          <span class="text-slate-500 font-bold">Total Estimated</span>
          <span class="text-2xl font-black text-primary">$${totalValue.toFixed(2)}</span>
        </div>
        <button onclick="window.app.submitOrder()" class="w-full py-4 bg-primary text-white font-bold rounded-2xl shadow-lg shadow-orange-500/20 active:scale-95 transition-all flex items-center justify-center gap-2">
          <span class="material-symbols-rounded">send</span> Submit Order
        </button>
      </footer>
    </div>
    `;
  },

  SUCCESS: () => `
    <div class="flex-1 flex flex-col p-6 pt-12 items-center text-center overflow-y-auto">
      <div class="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center animate-bounce-in mb-6">
        <span class="material-symbols-rounded text-green-500 text-6xl">check_circle</span>
      </div>
      <h1 class="text-3xl font-bold mb-2 dark:text-white">Order Submitted!</h1>
      <p class="text-slate-500 mb-8">Order ID: #${state.lastOrder?.orderId}</p>
      
      <div class="w-full bg-slate-50 dark:bg-slate-800/50 p-6 rounded-[32px] space-y-4 mb-8">
        <div class="flex justify-between font-bold dark:text-white"><span>Total Items</span><span>${state.lastOrder?.items.reduce((a,b)=>a+b.quantity,0)} units</span></div>
        <div class="flex justify-between font-bold text-primary text-xl"><span>Total Value</span><span>$${state.lastOrder?.totalValue.toFixed(2)}</span></div>
      </div>

      <div class="w-full space-y-4 mt-auto">
        <button onclick="window.app.setView('DASHBOARD')" class="w-full bg-primary text-white text-lg font-bold py-5 rounded-[24px] shadow-lg">Start New Order</button>
      </div>
    </div>
  `
};

// --- Rendering Logic ---

function render() {
  const container = document.getElementById('view-container');
  const viewContent = Views[state.view] ? Views[state.view]() : 'View not found';
  
  // Transition effect
  container.classList.add('fade-out');
  
  setTimeout(() => {
    container.innerHTML = viewContent;
    container.classList.remove('fade-out');
    container.classList.add('fade-in');
    
    // Handle specific view setup
    if (state.view === 'SCANNER') startScanner();
    else stopScanner();
  }, 100);
}

// --- Scanner Integration ---

let activeStream = null;

async function startScanner() {
  const video = document.getElementById('scanner-video');
  if (!video) return;

  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environment' },
      audio: false
    });
    video.srcObject = stream;
    activeStream = stream;
  } catch (err) {
    console.warn("Camera failed, using simulation mode.", err);
  }
}

function stopScanner() {
  if (activeStream) {
    activeStream.getTracks().forEach(track => track.stop());
    activeStream = null;
  }
}

// --- Global API for Events ---

window.app = {
  setView: (view) => setState({ view }),
  updateQuantity: (id, q) => updateQuantity(id, parseInt(q) || 0),
  clearCart: () => setState({ cart: [] }),
  submitOrder: () => submitOrder(),
  
  simulateScan: () => {
    const randomProduct = MOCK_PRODUCTS[Math.floor(Math.random() * MOCK_PRODUCTS.length)];
    setState({ scannedProduct: randomProduct, scanQuantity: 1 });
  },
  
  setScanQty: (delta) => {
    setState({ scanQuantity: Math.max(1, state.scanQuantity + delta) });
  },
  
  confirmScan: () => {
    if (state.scannedProduct) {
      addToCart(state.scannedProduct, state.scanQuantity);
      setState({ scannedProduct: null, scanQuantity: 1 });
    }
  },
  
  cancelScan: () => {
    setState({ scannedProduct: null, scanQuantity: 1 });
  }
};

// --- Initialization ---

// Dark Mode logic
const darkToggle = document.getElementById('dark-mode-toggle');
darkToggle.addEventListener('click', () => {
  const isDark = document.documentElement.classList.toggle('dark');
  state.darkMode = isDark;
  localStorage.setItem('lapp-dark-mode', isDark);
});

if (state.darkMode) document.documentElement.classList.add('dark');

// Clock Update
function updateClock() {
  const now = new Date();
  document.getElementById('clock').textContent = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
}
setInterval(updateClock, 1000);
updateClock();

// Initial Render
render();
