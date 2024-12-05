import React, { useState } from 'react';
import { ShoppingCart, Menu } from 'lucide-react';
import { MenuTabs } from './MenuTabs';

interface HeaderProps {
  onCartClick: () => void;
  cartItemsCount: number;
}

export function Header({ onCartClick, cartItemsCount }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home');

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button 
                onClick={() => setIsMenuOpen(true)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Menu className="h-6 w-6 text-gray-600" />
              </button>
              <h1 className="ml-4 text-xl font-bold text-gray-800">DeliveryExpress</h1>
            </div>
            
            <button 
              onClick={onCartClick} 
              className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ShoppingCart className="h-6 w-6 text-gray-600" />
              {cartItemsCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                  {cartItemsCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {isMenuOpen && (
        <MenuTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onClose={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );
}