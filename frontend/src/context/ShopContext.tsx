import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { Product, CartItem, User, Order } from '../types';

interface ShopContextData {
  products: Product[];
  cart: CartItem[];
  user: User | null;
  orders: Order[];
  loading: boolean;
  notification: { type: 'success' | 'error'; message: string } | null;
  cartTotal: number;
  cartCount: number;
  addToCart: (product: Product) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  createProduct: (data: Omit<Product, 'id'>) => Promise<boolean>;
  deleteProduct: (id: number) => Promise<void>;
  checkoutOrder: (customerName: string, customerEmail: string) => Promise<boolean>;
  fetchOrders: () => Promise<void>;
  clearNotification: () => void;
}

const ShopContext = createContext<ShopContextData>({} as ShopContextData);
export const API_URL = 'http://localhost:3001/api';

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('@TechStore:cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('@TechStore:user');
    return saved ? JSON.parse(saved) : null;
  });

  const notify = useCallback((type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  }, []);

  const clearNotification = useCallback(() => setNotification(null), []);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/products`);
      if (!response.ok) throw new Error('Falha ao carregar produtos');
      const data: Product[] = await response.json();
      setProducts(data);
    } catch {
      notify('error', 'Servidor backend offline. Inicie o backend na porta 3001.');
    } finally {
      setLoading(false);
    }
  }, [notify]);

  const fetchOrders = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/orders`);
      if (response.ok) {
        const data: Order[] = await response.json();
        setOrders(data);
      }
    } catch {}
  }, []);

  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, [fetchProducts, fetchOrders]);

  useEffect(() => {
    localStorage.setItem('@TechStore:cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = useCallback((product: Product) => {
    if (product.stock <= 0) {
      notify('error', 'Produto esgotado!');
      return;
    }
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        if (existing.quantity + 1 > product.stock) {
          notify('error', 'Limite de estoque atingido!');
          return prev;
        }
        notify('success', `Quantidade de "${product.name}" atualizada!`);
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      notify('success', `"${product.name}" adicionado ao carrinho!`);
      return [...prev, { product, quantity: 1 }];
    });
  }, [notify]);

  const updateQuantity = useCallback((productId: number, quantity: number) => {
    if (quantity <= 0) {
      setCart((prev) => prev.filter((item) => item.product.id !== productId));
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        if (item.product.id === productId) {
          const validQty = Math.min(quantity, item.product.stock);
          return { ...item, quantity: validQty };
        }
        return item;
      })
    );
  }, []);

  const removeFromCart = useCallback((productId: number) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    notify('success', 'Item removido do carrinho.');
  }, [notify]);

  const clearCart = useCallback(() => setCart([]), []);

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (!response.ok) {
        notify('error', 'Credenciais inválidas.');
        return false;
      }
      const userData: User = await response.json();
      setUser(userData);
      localStorage.setItem('@TechStore:user', JSON.stringify(userData));
      notify('success', `Bem-vindo(a), ${userData.name}!`);
      return true;
    } catch {
      notify('error', 'Erro ao conectar com o servidor.');
      return false;
    }
  }, [notify]);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('@TechStore:user');
    notify('success', 'Sessão encerrada com sucesso.');
  }, [notify]);

  const createProduct = useCallback(async (data: Omit<Product, 'id'>): Promise<boolean> => {
    try {
      const response = await fetch(`${API_URL}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error();
      const created: Product = await response.json();
      setProducts((prev) => [...prev, created]);
      notify('success', 'Produto cadastrado na API com sucesso!');
      return true;
    } catch {
      notify('error', 'Erro ao cadastrar produto.');
      return false;
    }
  }, [notify]);

  const deleteProduct = useCallback(async (id: number): Promise<void> => {
    try {
      const response = await fetch(`${API_URL}/products/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error();
      setProducts((prev) => prev.filter((p) => p.id !== id));
      notify('success', 'Produto removido com sucesso.');
    } catch {
      notify('error', 'Não foi possível excluir o produto.');
    }
  }, [notify]);

  const checkoutOrder = useCallback(async (customerName: string, customerEmail: string): Promise<boolean> => {
    try {
      const payload = {
        customerName,
        customerEmail,
        items: cart.map((item) => ({
          productId: item.product.id,
          name: item.product.name,
          price: item.product.price,
          quantity: item.quantity
        }))
      };
      const response = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      if (!response.ok) {
        notify('error', result.error || 'Erro ao processar pedido.');
        return false;
      }
      setProducts(result.updatedProducts);
      setOrders((prev) => [result.order, ...prev]);
      setCart([]);
      notify('success', `Pedido #${result.order.id} realizado com sucesso!`);
      return true;
    } catch {
      notify('error', 'Erro de comunicação ao finalizar compra.');
      return false;
    }
  }, [cart, notify]);

  const cartTotal = useMemo(() => cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0), [cart]);
  const cartCount = useMemo(() => cart.reduce((acc, item) => acc + item.quantity, 0), [cart]);

  return (
    <ShopContext.Provider
      value={{
        products, cart, user, orders, loading, notification, cartTotal, cartCount,
        addToCart, updateQuantity, removeFromCart, clearCart, login, logout,
        createProduct, deleteProduct, checkoutOrder, fetchOrders, clearNotification
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = (): ShopContextData => useContext(ShopContext);