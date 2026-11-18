import React, { useState, useMemo } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { StatCard } from '../components/StatCard';
import { ProductFormModal } from '../components/ProductFormModal';

export const Dashboard: React.FC = () => {
  const { products, orders, deleteProduct } = useShop();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const metrics = useMemo(() => {
    const totalRevenue = orders.reduce((acc, o) => acc + o.total, 0);
    const totalStock = products.reduce((acc, p) => acc + p.stock, 0);
    return { totalRevenue, totalStock };
  }, [orders, products]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Dashboard Administrativo</h1>
          <p className="text-sm text-slate-500">Gerenciamento em tempo real conectado ao Back-end Node.js</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-4 py-2.5 rounded-xl text-sm flex items-center gap-2 self-start">
          <Plus className="w-4 h-4" />
          Novo Produto
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard title="Faturamento Total" value={metrics.totalRevenue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} subtitle={`${orders.length} pedido(s) faturado(s)`} colorClass="text-emerald-600" />
        <StatCard title="Produtos Cadastrados" value={products.length} subtitle="Itens ativos no catálogo" />
        <StatCard title="Unidades em Estoque" value={metrics.totalStock} subtitle="Soma total de disponibilidade" />
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="p-4 border-b bg-slate-50 font-bold text-slate-800 text-sm">Estoque de Produtos (API REST)</div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase border-b">
              <tr>
                <th className="py-3 px-4">Produto</th>
                <th className="py-3 px-4">Categoria</th>
                <th className="py-3 px-4">Preço</th>
                <th className="py-3 px-4">Estoque</th>
                <th className="py-3 px-4 text-right">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50">
                  <td className="py-3 px-4 font-semibold text-slate-800">{p.name}</td>
                  <td className="py-3 px-4 text-slate-600">{p.category}</td>
                  <td className="py-3 px-4 font-medium">{p.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                  <td className="py-3 px-4">{p.stock} un.</td>
                  <td className="py-3 px-4 text-right">
                    <button onClick={() => deleteProduct(p.id)} className="text-rose-500 hover:bg-rose-50 p-1.5 rounded-lg" title="Excluir produto">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="p-4 border-b bg-slate-50 font-bold text-slate-800 text-sm">Últimos Pedidos Realizados</div>
        {orders.length === 0 ? (
          <p className="p-6 text-sm text-slate-500">Nenhum pedido registrado até o momento.</p>
        ) : (
          <div className="divide-y">
            {orders.map((order) => (
              <div key={order.id} className="p-4 flex flex-col sm:flex-row justify-between gap-2 text-sm">
                <div>
                  <span className="font-bold text-slate-800">Pedido #{order.id}</span> — <span className="text-slate-600">{order.customerName} ({order.customerEmail})</span>
                  <p className="text-xs text-slate-400">Itens: {order.items.map((i) => `${i.quantity}x ${i.name}`).join(', ')}</p>
                </div>
                <div className="font-extrabold text-emerald-600">{order.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      <ProductFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};