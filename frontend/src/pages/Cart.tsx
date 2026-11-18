import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Trash } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { CartItemRow } from '../components/CartItemRow';
import { OrderSummary } from '../components/OrderSummary';

export const Cart: React.FC = () => {
  const { cart, clearCart } = useShop();

  if (cart.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 max-w-xl mx-auto my-8 space-y-4">
        <ShoppingBag className="w-12 h-12 text-indigo-500 mx-auto" />
        <h2 className="text-xl font-bold text-slate-800">Seu carrinho está vazio</h2>
        <p className="text-sm text-slate-500">Adicione produtos do nosso catálogo para simular ou finalizar um pedido integrado ao Back-end.</p>
        <Link to="/catalogo" className="inline-block bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-6 py-2.5 rounded-xl text-sm">
          Ir para o Catálogo
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Carrinho de Compras</h1>
          <p className="text-sm text-slate-500">Revise as quantidades antes de confirmar o pedido</p>
        </div>
        <button onClick={clearCart} className="flex items-center gap-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 px-3 py-2 rounded-lg transition">
          <Trash className="w-4 h-4" />
          Esvaziar Carrinho
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-3">
          {cart.map((item) => (
            <CartItemRow key={item.product.id} item={item} />
          ))}
        </div>
        <OrderSummary />
      </div>
    </div>
  );
};