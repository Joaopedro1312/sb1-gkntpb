import React from 'react';
import { Plus } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img 
        src={product.image} 
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
        <p className="mt-1 text-sm text-gray-600">{product.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900">
            R$ {product.price.toFixed(2)}
          </span>
          <button
            onClick={() => onAddToCart(product)}
            className="flex items-center justify-center p-2 rounded-full bg-green-500 text-white hover:bg-green-600 transition-colors"
            aria-label="Adicionar ao carrinho"
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}