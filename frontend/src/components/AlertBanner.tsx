import React from 'react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const AlertBanner: React.FC = () => {
  const { notification, clearNotification } = useShop();

  if (!notification) return null;

  const isSuccess = notification.type === 'success';

  return (
    <div className="fixed bottom-5 right-5 z-50 max-w-md animate-bounce">
      <div className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-xl border ${isSuccess ? 'bg-emerald-950 text-emerald-200 border-emerald-700' : 'bg-rose-950 text-rose-200 border-rose-700'}`}>
        {isSuccess ? <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" /> : <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />}
        <span className="text-sm font-medium">{notification.message}</span>
        <button onClick={clearNotification} className="p-1 hover:opacity-75">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};