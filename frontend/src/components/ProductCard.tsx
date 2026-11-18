import React from 'react';
import { ShoppingCart, PackageCheck, PackageX } from 'lucide-react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useShop();
  const hasStock = product.stock > 0;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col">
      <div className="relative h-48 bg-slate-100 overflow-hidden">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover hover:scale-105 transition duration-300" />
        <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-full">
          {product.category}
        </span>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-slate-800 text-base line-clamp-2 mb-1">{product.name}</h3>
          <p className="text-slate-500 text-xs line-clamp-2 mb-4">{product.description}</p>
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xl font-extrabold text-indigo-600">
              {product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </span>
            <span className={`flex items-center gap-1 text-xs font-medium ${hasStock ? 'text-emerald-600' : 'text-rose-600'}`}>
              {hasStock ? (
                <>
                  <PackageCheck className="w-4 h-4" />
                  {product.stock} em estoque
                </>
              ) : (
                <>
                  <PackageX className="w-4 h-4" />
                  Esgotado
                </>
              )}
            </span>
          </div>

          <button
            onClick={() => addToCart(product)}
            disabled={!hasStock}
            className={`w-full py-2.5 px-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition ${
              hasStock ? 'bg-indigo-600 hover:bg-indigo-500 text-white cursor-pointer' : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            {hasStock ? 'Adicionar ao Carrinho' : 'Indisponível'}
          </button>
        </div>
      </div>
    </div>
  );
};