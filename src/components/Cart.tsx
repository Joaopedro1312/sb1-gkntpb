import React, { useState } from 'react';
import { X } from 'lucide-react';
import { CartItem, Address } from '../types';
import { PaymentMethods } from './PaymentMethods';
import { AddressForm } from './AddressForm';

interface CartProps {
  items: CartItem[];
  onClose: () => void;
  onRemoveItem: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
}

export function Cart({ items, onClose, onRemoveItem, onUpdateQuantity }: CartProps) {
  const [showPayment, setShowPayment] = useState(false);
  const [showAddress, setShowAddress] = useState(false);
  const [address, setAddress] = useState<Address>({
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
    zipCode: ''
  });

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleAddressSubmit = () => {
    setShowAddress(false);
    setShowPayment(true);
  };

  const renderContent = () => {
    if (showAddress) {
      return (
        <AddressForm
          address={address}
          onChange={setAddress}
          onSubmit={handleAddressSubmit}
        />
      );
    }

    if (showPayment) {
      return (
        <PaymentMethods
          total={total}
          onBack={() => setShowPayment(false)}
          deliveryAddress={address}
        />
      );
    }

    return (
      <>
        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <p className="text-center text-gray-500">Seu carrinho está vazio</p>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 bg-gray-50 p-3 rounded-lg">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-600">R$ {item.price.toFixed(2)}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                        className="px-2 py-1 bg-gray-200 rounded"
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="px-2 py-1 bg-gray-200 rounded"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-4 border-t">
          <div className="flex justify-between items-center mb-4">
            <span className="font-semibold">Total:</span>
            <span className="text-lg font-bold">R$ {total.toFixed(2)}</span>
          </div>
          {items.length > 0 && (
            <button
              onClick={() => setShowAddress(true)}
              className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors"
            >
              Continuar para Entrega
            </button>
          )}
        </div>
      </>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      <div className="w-full max-w-md bg-white h-full">
        <div className="flex flex-col h-full">
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="text-lg font-semibold">
              {showAddress ? 'Endereço de Entrega' : showPayment ? 'Pagamento' : 'Carrinho'}
            </h2>
            <button onClick={onClose} className="p-2">
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="p-4">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}