import React from 'react';
import { Utensils, Coffee, Beer, IceCream } from 'lucide-react';

const categories = [
  { id: 'all', name: 'Todos', icon: Utensils },
  { id: 'meals', name: 'Refeições', icon: Utensils },
  { id: 'snacks', name: 'Lanches', icon: Coffee },
  { id: 'drinks', name: 'Bebidas', icon: Beer },
  { id: 'desserts', name: 'Sobremesas', icon: IceCream },
];

interface CategoryFilterProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export function CategoryFilter({ selectedCategory, onSelectCategory }: CategoryFilterProps) {
  return (
    <div className="flex gap-4 overflow-x-auto py-4 px-4 -mx-4">
      {categories.map((category) => {
        const Icon = category.icon;
        return (
          <button
            key={category.id}
            onClick={() => onSelectCategory(category.id)}
            className={`flex flex-col items-center min-w-[80px] p-2 rounded-lg transition-colors ${
              selectedCategory === category.id
                ? 'bg-green-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Icon className="h-6 w-6 mb-1" />
            <span className="text-sm whitespace-nowrap">{category.name}</span>
          </button>
        );
      })}
    </div>
  );
}