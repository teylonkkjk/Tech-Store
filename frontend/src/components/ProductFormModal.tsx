import React, { useState } from 'react';
import { PlusCircle, X } from 'lucide-react';
import { useShop } from '../context/ShopContext';

interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProductFormModal: React.FC<ProductFormModalProps> = ({ isOpen, onClose }) => {
  const { createProduct } = useShop();
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Periféricos');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('10');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await createProduct({
      name,
      category,
      price: Number(price),
      stock: Number(stock),
      image,
      description
    });
    if (success) {
      setName('');
      setPrice('');
      setImage('');
      setDescription('');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl">
        <div className="flex items-center justify-between border-b pb-3 mb-4">
          <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
            <PlusCircle className="w-5 h-5 text-indigo-600" />
            Cadastrar Novo Produto na API
          </h3>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-sm">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Nome do Produto</label>
            <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="w-full border border-slate-300 rounded-lg px-3 py-2" placeholder="Ex: Placa de Vídeo RTX 4070 Super" />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Categoria</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full border border-slate-300 rounded-lg px-3 py-2 bg-white">
                <option value="Notebooks">Notebooks</option>
                <option value="Periféricos">Periféricos</option>
                <option value="Monitores">Monitores</option>
                <option value="Hardware">Hardware</option>
                <option value="Áudio">Áudio</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Preço (R$)</label>
              <input type="number" step="0.01" required value={price} onChange={(e) => setPrice(e.target.value)} className="w-full border border-slate-300 rounded-lg px-3 py-2" placeholder="1999.90" />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Estoque</label>
              <input type="number" required value={stock} onChange={(e) => setStock(e.target.value)} className="w-full border border-slate-300 rounded-lg px-3 py-2" />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">URL da Imagem (opcional)</label>
            <input type="url" value={image} onChange={(e) => setImage(e.target.value)} className="w-full border border-slate-300 rounded-lg px-3 py-2" placeholder="https://images.unsplash.com/..." />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Descrição Técnica</label>
            <textarea rows={3} required value={description} onChange={(e) => setDescription(e.target.value)} className="w-full border border-slate-300 rounded-lg px-3 py-2" placeholder="Especificações principais do produto..." />
          </div>

          <div className="flex justify-end gap-2 pt-3">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 font-medium">Cancelar</button>
            <button type="submit" className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-500">Salvar Produto</button>
          </div>
        </form>
      </div>
    </div>
  );
};