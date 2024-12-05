export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'snacks' | 'meals' | 'drinks' | 'desserts';
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export type PaymentMethod = 'pix' | 'credit' | 'cash';

export interface PaymentInfo {
  method: PaymentMethod;
  total: number;
  change?: number;
  installments?: number;
}

export interface Address {
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface DeliveryInfo {
  address: Address;
  instructions?: string;
}