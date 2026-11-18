import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Login: React.FC = () => {
  const { login } = useShop();
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@techstore.com');
  const [password, setPassword] = useState('123456');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await login(email, password);
    if (ok) navigate('/dashboard');
  };

  return (
    <div className="max-w-md mx-auto my-8 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
      <div className="text-center space-y-1">
        <h1 className="text-2xl font-extrabold text-slate-900">Acessar Conta</h1>
        <p className="text-xs text-slate-500">
          Autenticação integrada à rota <code className="bg-slate-100 px-1 py-0.5 rounded">POST /api/auth/login</code>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 text-sm">
        <div>
          <label className="block font-semibold text-slate-700 mb-1">E-mail</label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full pl-9 pr-3 py-2.5 border border-slate-300 rounded-xl" />
          </div>
        </div>

        <div>
          <label className="block font-semibold text-slate-700 mb-1">Senha</label>
          <div className="relative">
            <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full pl-9 pr-3 py-2.5 border border-slate-300 rounded-xl" />
          </div>
        </div>

        <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-xl transition">
          Entrar no Sistema
        </button>
      </form>

      <div className="bg-slate-50 p-3 rounded-xl text-xs text-slate-600 border border-slate-200">
        <strong>Credencial Admin preenchida por padrão:</strong><br />
        E-mail: <code>admin@techstore.com</code> | Senha: <code>123456</code>
      </div>
    </div>
  );
};