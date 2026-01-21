
export interface Product {
  id: string;
  sku: string;
  name: string;
  description: string;
  price: number;
  unit: string;
  image: string;
  category: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export type View = 'LOGIN' | 'DASHBOARD' | 'SCANNER' | 'REVIEW' | 'SUCCESS';

export interface OrderDetails {
  orderId: string;
  items: CartItem[];
  totalValue: number;
  timestamp: string;
}
