import { Product } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Hambúrguer Clássico',
    description: 'Hambúrguer suculento com queijo, alface e molho especial',
    price: 18.90,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    category: 'meals'
  },
  {
    id: '2',
    name: 'Asinhas de Frango',
    description: 'Asinhas crocantes com molho buffalo',
    price: 24.90,
    image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=800&q=80',
    category: 'snacks'
  },
  {
    id: '3',
    name: 'Coca-Cola',
    description: '350ml',
    price: 5.90,
    image: 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?auto=format&fit=crop&w=800&q=80',
    category: 'drinks'
  },
  {
    id: '4',
    name: 'Brownie de Chocolate',
    description: 'Brownie de chocolate com sorvete',
    price: 12.90,
    image: 'https://images.unsplash.com/photo-1564355808539-22fda35bed7e?auto=format&fit=crop&w=800&q=80',
    category: 'desserts'
  }
];