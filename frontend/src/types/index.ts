export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  image: string;
  description: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'customer';
  token: string;
}

export interface Order {
  id: number;
  customerName: string;
  customerEmail: string;
  items: {
    productId: number;
    name: string;
    price: number;
    quantity: number;
  }[];
  total: number;
  createdAt: string;
}