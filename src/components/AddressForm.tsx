import React from 'react';
import { Address } from '../types';
import { MapPin } from 'lucide-react';

interface AddressFormProps {
  address: Address;
  onChange: (address: Address) => void;
  onSubmit: () => void;
}

export function AddressForm({ address, onChange, onSubmit }: AddressFormProps) {
  const handleChange = (field: keyof Address, value: string) => {
    onChange({ ...address, [field]: value });
  };

  const isFormValid = () => {
    const requiredFields: (keyof Address)[] = ['street', 'number', 'neighborhood', 'city', 'state', 'zipCode'];
    return requiredFields.every(field => address[field]?.trim());
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-gray-700">
        <MapPin className="h-5 w-5" />
        <h3 className="text-lg font-semibold">Endereço de Entrega</h3>
      </div>

      <div className="space-y-3">
        <div className="grid grid-cols-3 gap-3">
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">CEP</label>
            <input
              type="text"
              value={address.zipCode}
              onChange={(e) => handleChange('zipCode', e.target.value)}
              className="w-full p-2 border rounded-lg"
              placeholder="00000-000"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Rua</label>
          <input
            type="text"
            value={address.street}
            onChange={(e) => handleChange('street', e.target.value)}
            className="w-full p-2 border rounded-lg"
            placeholder="Nome da rua"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Número</label>
            <input
              type="text"
              value={address.number}
              onChange={(e) => handleChange('number', e.target.value)}
              className="w-full p-2 border rounded-lg"
              placeholder="123"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Complemento</label>
            <input
              type="text"
              value={address.complement}
              onChange={(e) => handleChange('complement', e.target.value)}
              className="w-full p-2 border rounded-lg"
              placeholder="Apto 101"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Bairro</label>
          <input
            type="text"
            value={address.neighborhood}
            onChange={(e) => handleChange('neighborhood', e.target.value)}
            className="w-full p-2 border rounded-lg"
            placeholder="Nome do bairro"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cidade</label>
            <input
              type="text"
              value={address.city}
              onChange={(e) => handleChange('city', e.target.value)}
              className="w-full p-2 border rounded-lg"
              placeholder="Cidade"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
            <input
              type="text"
              value={address.state}
              onChange={(e) => handleChange('state', e.target.value)}
              className="w-full p-2 border rounded-lg"
              placeholder="UF"
              maxLength={2}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Instruções para entrega</label>
          <textarea
            className="w-full p-2 border rounded-lg"
            placeholder="Ex: Tocar interfone, deixar na portaria..."
            rows={2}
          />
        </div>
      </div>

      <button
        onClick={onSubmit}
        disabled={!isFormValid()}
        className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        Continuar para Pagamento
      </button>
    </div>
  );
}