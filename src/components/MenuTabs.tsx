import React from 'react';
import { Home, Clock, Star, Settings } from 'lucide-react';

const tabs = [
  { id: 'home', label: 'Início', icon: Home },
  { id: 'orders', label: 'Pedidos', icon: Clock },
  { id: 'favorites', label: 'Favoritos', icon: Star },
  { id: 'settings', label: 'Configurações', icon: Settings },
];

interface MenuTabsProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
  onClose: () => void;
}

export function MenuTabs({ activeTab, onTabChange, onClose }: MenuTabsProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={onClose}>
      <div 
        className="w-64 h-full bg-white shadow-lg"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800">Menu</h2>
        </div>
        
        <nav className="p-2">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  onTabChange(tab.id);
                  onClose();
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-green-50 text-green-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}