import React, { useRef } from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearchChange }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClearAndFocus = () => {
    onSearchChange('');
    inputRef.current?.focus();
  };

  return (
    <div className="relative w-full">
      <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
      <input
        ref={inputRef}
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Buscar por nome ou descrição (ex: RTX, Monitor, SSD)..."
        className="w-full pl-11 pr-10 py-3 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      {searchTerm && (
        <button
          onClick={handleClearAndFocus}
          type="button"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
          title="Limpar busca"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};