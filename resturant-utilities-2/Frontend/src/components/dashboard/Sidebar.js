import React from 'react';
import { useAuth } from '../../context/AuthContext';

const Sidebar = ({ activeSection, setActiveSection }) => {
  const { user, logout } = useAuth();

 // Add these to the menuItems array in Sidebar.js
const menuItems = [
 { id: 'overview', label: 'Dashboard', icon: '📊' },
  { id: 'templates', label: 'Website Templates', icon: '🎨' },
  { id: 'menu', label: 'Menu Management', icon: '📋' },
  { id: 'orders', label: 'Order Management', icon: '🛒' },
  { id: 'online', label: 'Online Orders', icon: '📱' }, // NEW
  { id: 'inventory', label: 'Inventory', icon: '📦' },
  { id: 'staff', label: 'Staff Management', icon: '👥' }, // NEW
  { id: 'crm', label: 'Customer CRM', icon: '💼' },
  { id: 'marketing', label: 'Marketing', icon: '📢' }, // NEW
  { id: 'qr', label: 'QR Code Generator', icon: '🔲' },
  { id: 'billing', label: 'Billing System', icon: '🧾' },
  { id: 'reservations', label: 'Table Reservations', icon: '🪑' },
  { id: 'reports', label: 'Sales Reports', icon: '📈' },
  { id: 'profit', label: 'Profit Calculator', icon: '💰' },
];

  return (
    <div className="bg-white w-64 flex-shrink-0 border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-800">RestaurantPro</h1>
        <p className="text-sm text-gray-600">{user?.restaurantName}</p>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map(item => (
          <button
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
              activeSection === item.id
                ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-500'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>
      
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={logout}
          className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left text-gray-700 hover:bg-gray-100 transition-colors"
        >
          <span className="text-lg">🚪</span>
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;