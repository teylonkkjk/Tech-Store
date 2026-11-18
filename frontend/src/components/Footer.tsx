import React from 'react';
import { Link } from 'react-router-dom';
import { Cpu } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-10 mt-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2 text-white text-lg font-bold mb-3">
            <Cpu className="w-6 h-6 text-indigo-400" />
            <span>TechStore</span>
          </div>
          <p className="text-sm leading-relaxed">
            Sua loja especializada em hardware de alta performance, notebooks gamers e periféricos profissionais com envio rápido para todo o Brasil.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Navegação</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-white">Página Inicial</Link></li>
            <li><Link to="/catalogo" className="hover:text-white">Catálogo de Produtos</Link></li>
            <li><Link to="/carrinho" className="hover:text-white">Carrinho de Compras</Link></li>
            <li><Link to="/dashboard" className="hover:text-white">Painel Administrativo</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Pagamentos & Segurança</h4>
          <p className="text-xs leading-relaxed">
            • Pix com aprovação imediata<br />
            • Cartão de Crédito em até 12x sem juros<br />
            • Garantia oficial de 12 meses em toda a linha<br />
            • Compra 100% segura
          </p>
        </div>
      </div>
    </footer>
  );
};