import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem } from '../types';
import { useShop } from '../context/ShopContext';

interface CartItemRowProps {
  item: CartItem;
}

export const CartItemRow: React.FC<CartItemRowProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useShop();
  const { product, quantity } = item;
  const subtotal = product.price * quantity;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200">
      <div className="flex items-center gap-4 w-full sm:w-auto">
        <img src={product.image} alt={product.name} className="w-20 h-20 rounded-lg object-cover bg-slate-100 shrink-0" />
        <div>
          <span className="text-xs text-indigo-600 font-semibold">{product.category}</span>
          <h4 className="font-bold text-slate-800 text-sm">{product.name}</h4>
          <p className="text-xs text-slate-500">
            Unitário: {product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
        <div className="flex items-center border border-slate-300 rounded-lg">
          <button onClick={() => updateQuantity(product.id, quantity - 1)} className="p-2 text-slate-600 hover:bg-slate-100" title="Diminuir">
            <Minus className="w-3.5 h-3.5" />
          </button>
          <span className="px-3 text-sm font-semibold">{quantity}</span>
          <button onClick={() => updateQuantity(product.id, quantity + 1)} disabled={quantity >= product.stock} className="p-2 text-slate-600 hover:bg-slate-100 disabled:opacity-40" title="Aumentar">
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="text-right min-w-[100px]">
          <p className="text-sm font-extrabold text-slate-900">
            {subtotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </p>
        </div>

        <button onClick={() => removeFromCart(product.id)} className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition" title="Remover item">
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};