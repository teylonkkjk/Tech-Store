import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Cpu, User as UserIcon, LogOut, LayoutDashboard } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Navbar: React.FC = () => {
  const { cartCount, user, logout } = useShop();
  const location = useLocation();

  const isActive = (path: string) =>
    location.pathname === path ? 'text-indigo-400 font-semibold' : 'text-slate-300 hover:text-white';

  return (
    <header className="bg-slate-900 text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold tracking-tight">
          <Cpu className="w-7 h-7 text-indigo-400" />
          <span>Tech<span className="text-indigo-400">Store</span></span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link to="/" className={isActive('/')}>Home</Link>
          <Link to="/catalogo" className={isActive('/catalogo')}>Catálogo</Link>
          <Link to="/dashboard" className={isActive('/dashboard')}>Dashboard</Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link to="/carrinho" className="relative p-2 text-slate-300 hover:text-white transition" title="Carrinho de Compras">
            <ShoppingCart className="w-6 h-6" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-indigo-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {user ? (
            <div className="flex items-center gap-3">
              <Link to="/dashboard" className="hidden sm:flex items-center gap-1.5 text-xs bg-slate-800 px-3 py-1.5 rounded-full border border-slate-700">
                <LayoutDashboard className="w-3.5 h-3.5 text-indigo-400" />
                <span>{user.name}</span>
              </Link>
              <button onClick={logout} className="p-2 text-slate-400 hover:text-red-400 transition" title="Sair">
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <Link to="/login" className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium px-4 py-2 rounded-lg transition">
              <UserIcon className="w-4 h-4" />
              <span>Entrar</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};