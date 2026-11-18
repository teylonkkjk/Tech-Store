import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/ProductCard';
import { SearchBar } from '../components/SearchBar';

export const Home: React.FC = () => {
  const { products, loading } = useShop();
  const [searchTerm, setSearchTerm] = useState('');

  const featuredProducts = useMemo(() => {
    return products
      .filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .slice(0, 6);
  }, [products, searchTerm]);

  return (
    <div className="space-y-10">
      <section className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-8 md:p-12 shadow-xl">
        <div className="max-w-2xl space-y-4">
          <span className="inline-flex items-center gap-1.5 bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold px-3 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5" />
            Hardware & Periféricos de Alta Performance
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
            Equipe seu Setup com Tecnologia de Ponta
          </h1>
          <p className="text-slate-300 text-sm md:text-base">
            Confira ofertas em notebooks, monitores ultrawide e periféricos mecânicos com estoque integrado em tempo real via API REST.
          </p>
          <div className="pt-2 flex flex-wrap gap-3">
            <Link to="/catalogo" className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-6 py-3 rounded-xl text-sm inline-flex items-center gap-2 transition">
              Explorar Catálogo Completo
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/dashboard" className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold px-6 py-3 rounded-xl text-sm transition">
              Acessar Dashboard
            </Link>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Produtos em Destaque</h2>
            <p className="text-sm text-slate-500">Pesquise ou adicione itens diretamente ao seu carrinho</p>
          </div>
          <div className="w-full md:w-96">
            <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12 text-slate-500">Carregando produtos da API...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};