import React, { useState } from 'react';
import { CheckCircle, ShieldCheck } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const OrderSummary: React.FC = () => {
  const { cartTotal, user, checkoutOrder } = useShop();
  const [customerName, setCustomerName] = useState(user?.name || '');
  const [customerEmail, setCustomerEmail] = useState(user?.email || '');
  const [submitting, setSubmitting] = useState(false);

  const shipping = cartTotal > 500 ? 0 : 39.9;
  const finalTotal = cartTotal + shipping;

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerEmail) return;
    setSubmitting(true);
    await checkoutOrder(customerName, customerEmail);
    setSubmitting(false);
  };

  return (
    <form onSubmit={handleCheckout} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
      <h3 className="text-lg font-bold text-slate-800 border-b pb-3">Resumo do Pedido</h3>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between text-slate-600">
          <span>Subtotal dos produtos</span>
          <span>{cartTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
        </div>
        <div className="flex justify-between text-slate-600">
          <span>Frete estimado</span>
          <span>{shipping === 0 ? 'Grátis' : shipping.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
        </div>
        <div className="flex justify-between text-base font-extrabold text-slate-900 pt-2 border-t">
          <span>Total a pagar</span>
          <span className="text-indigo-600">{finalTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
        </div>
      </div>

      <div className="pt-3 space-y-3">
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Nome Completo</label>
          <input type="text" required value={customerName} onChange={(e) => setCustomerName(e.target.value)} placeholder="Seu nome para emissão do pedido" className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">E-mail</label>
          <input type="email" required value={customerEmail} onChange={(e) => setCustomerEmail(e.target.value)} placeholder="cliente@email.com" className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" />
        </div>
      </div>

      <button type="submit" disabled={submitting} className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl text-sm flex items-center justify-center gap-2 transition disabled:opacity-50">
        <CheckCircle className="w-4 h-4" />
        {submitting ? 'Processando na API...' : 'Finalizar Compra'}
      </button>

      <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400 pt-1">
        <ShieldCheck className="w-4 h-4 text-emerald-500" />
        <span>Estoque validado em tempo real no Back-end</span>
      </div>
    </form>
  );
};