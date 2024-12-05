import React, { useState } from 'react';
import { QrCode, CreditCard, Banknote, ArrowLeft } from 'lucide-react';
import { PaymentMethod, Address } from '../types';

interface PaymentMethodsProps {
  total: number;
  onBack: () => void;
  deliveryAddress: Address;
}

export function PaymentMethods({ total, onBack, deliveryAddress }: PaymentMethodsProps) {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);
  const [cashAmount, setCashAmount] = useState<string>('');
  const [installments, setInstallments] = useState<number>(1);

  const handlePayment = () => {
    if (!selectedMethod) return;

    const orderSummary = `
Endereço de entrega:
${deliveryAddress.street}, ${deliveryAddress.number}
${deliveryAddress.complement ? deliveryAddress.complement + ' - ' : ''}
${deliveryAddress.neighborhood}
${deliveryAddress.city}/${deliveryAddress.state}
CEP: ${deliveryAddress.zipCode}
    `;

    switch (selectedMethod) {
      case 'pix':
        alert('QR Code do PIX gerado!\n' + orderSummary + '\nValor: R$ ' + total.toFixed(2));
        break;
      case 'credit':
        alert(`Pagamento em ${installments}x de R$ ${(total / installments).toFixed(2)}\n${orderSummary}`);
        break;
      case 'cash':
        const change = parseFloat(cashAmount) - total;
        if (change >= 0) {
          alert(`Troco: R$ ${change.toFixed(2)}\n${orderSummary}`);
        } else {
          alert('Valor insuficiente!');
          return;
        }
        break;
    }
  };

  return (
    <div className="space-y-4">
      <button onClick={onBack} className="flex items-center text-gray-600 hover:text-gray-800">
        <ArrowLeft className="h-5 w-5 mr-2" />
        Voltar
      </button>

      <div className="bg-gray-50 p-3 rounded-lg mb-4">
        <h4 className="font-semibold mb-2">Endereço de entrega:</h4>
        <p className="text-sm text-gray-600">
          {deliveryAddress.street}, {deliveryAddress.number}
          {deliveryAddress.complement && ` - ${deliveryAddress.complement}`}<br />
          {deliveryAddress.neighborhood}<br />
          {deliveryAddress.city}/{deliveryAddress.state}<br />
          CEP: {deliveryAddress.zipCode}
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <button
          onClick={() => setSelectedMethod('pix')}
          className={`p-4 rounded-lg border flex flex-col items-center gap-2 ${
            selectedMethod === 'pix' ? 'border-green-500 bg-green-50' : 'border-gray-200'
          }`}
        >
          <QrCode className="h-6 w-6" />
          <span>PIX</span>
        </button>

        <button
          onClick={() => setSelectedMethod('credit')}
          className={`p-4 rounded-lg border flex flex-col items-center gap-2 ${
            selectedMethod === 'credit' ? 'border-green-500 bg-green-50' : 'border-gray-200'
          }`}
        >
          <CreditCard className="h-6 w-6" />
          <span>Cartão</span>
        </button>

        <button
          onClick={() => setSelectedMethod('cash')}
          className={`p-4 rounded-lg border flex flex-col items-center gap-2 ${
            selectedMethod === 'cash' ? 'border-green-500 bg-green-50' : 'border-gray-200'
          }`}
        >
          <Banknote className="h-6 w-6" />
          <span>Dinheiro</span>
        </button>
      </div>

      {selectedMethod === 'credit' && (
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Parcelas
          </label>
          <select
            value={installments}
            onChange={(e) => setInstallments(Number(e.target.value))}
            className="w-full p-2 border rounded-lg"
          >
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <option key={n} value={n}>
                {n}x de R$ {(total / n).toFixed(2)}
                {n === 1 ? ' (à vista)' : ''}
              </option>
            ))}
          </select>
        </div>
      )}

      {selectedMethod === 'cash' && (
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Valor em dinheiro
          </label>
          <input
            type="number"
            value={cashAmount}
            onChange={(e) => setCashAmount(e.target.value)}
            placeholder="Digite o valor"
            className="w-full p-2 border rounded-lg"
            min={total}
            step="0.01"
          />
          {parseFloat(cashAmount) >= total && (
            <p className="text-sm text-gray-600 mt-2">
              Troco: R$ {(parseFloat(cashAmount) - total).toFixed(2)}
            </p>
          )}
        </div>
      )}

      <button
        onClick={handlePayment}
        disabled={!selectedMethod || (selectedMethod === 'cash' && parseFloat(cashAmount) < total)}
        className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        Confirmar Pagamento
      </button>
    </div>
  );
}