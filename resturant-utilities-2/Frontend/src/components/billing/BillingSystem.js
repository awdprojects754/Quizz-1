import React, { useState } from 'react';

const BillingSystem = () => {
  const [currentOrder, setCurrentOrder] = useState([]);
  const [selectedTable, setSelectedTable] = useState('');
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    email: ''
  });

  const menuItems = [
    { id: 1, name: 'Margherita Pizza', price: 12.99, category: 'Main Course' },
    { id: 2, name: 'Pepperoni Pizza', price: 14.99, category: 'Main Course' },
    { id: 3, name: 'Caesar Salad', price: 8.99, category: 'Appetizers' },
    { id: 4, name: 'Garlic Bread', price: 5.99, category: 'Appetizers' },
    { id: 5, name: 'Coca Cola', price: 2.99, category: 'Beverages' },
    { id: 6, name: 'Chocolate Cake', price: 6.99, category: 'Desserts' }
  ];

  const tables = Array.from({ length: 12 }, (_, i) => i + 1);

  const addToOrder = (item) => {
    const existingItem = currentOrder.find(orderItem => orderItem.id === item.id);
    if (existingItem) {
      setCurrentOrder(prev => 
        prev.map(orderItem => 
          orderItem.id === item.id 
            ? { ...orderItem, quantity: orderItem.quantity + 1 }
            : orderItem
        )
      );
    } else {
      setCurrentOrder(prev => [...prev, { ...item, quantity: 1 }]);
    }
  };

  const removeFromOrder = (itemId) => {
    setCurrentOrder(prev => prev.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromOrder(itemId);
      return;
    }
    setCurrentOrder(prev =>
      prev.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const calculateSubtotal = () => {
    return currentOrder.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.08; // 8% tax
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  const generateBill = () => {
    if (currentOrder.length === 0) {
      alert('Please add items to the order');
      return;
    }

    const bill = {
      orderId: `ORD-${Date.now()}`,
      table: selectedTable,
      customer: customerInfo,
      items: currentOrder,
      subtotal: calculateSubtotal(),
      tax: calculateTax(),
      total: calculateTotal(),
      timestamp: new Date().toISOString(),
      qrCode: `https://restaurantpro.com/bill/${Date.now()}`
    };

    // In real app, this would print or save the bill
    console.log('Generated Bill:', bill);
    alert(`Bill generated for Order ${bill.orderId}! Total: $${bill.total.toFixed(2)}`);
    
    // Reset order
    setCurrentOrder([]);
    setSelectedTable('');
    setCustomerInfo({ name: '', phone: '', email: '' });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Billing System</h2>
        <p className="text-gray-600">Create and manage restaurant bills</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Menu Items */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Menu Items</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {menuItems.map(item => (
                <div
                  key={item.id}
                  className="border border-gray-200 rounded-lg p-4 hover:border-primary-300 cursor-pointer transition-colors"
                  onClick={() => addToOrder(item)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-gray-900">{item.name}</h4>
                      <p className="text-sm text-gray-600">{item.category}</p>
                    </div>
                    <span className="font-bold text-primary-600">${item.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Details */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Details</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Table Number
                  </label>
                  <select
                    value={selectedTable}
                    onChange={(e) => setSelectedTable(e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="">Select Table</option>
                    {tables.map(table => (
                      <option key={table} value={table}>Table {table}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Customer Name
                  </label>
                  <input
                    type="text"
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Optional"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Current Order */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Order</h3>
          
          {currentOrder.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <div className="text-4xl mb-2">🛒</div>
              <p>No items added yet</p>
              <p className="text-sm">Click on menu items to add them</p>
            </div>
          ) : (
            <>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {currentOrder.map(item => (
                  <div key={item.id} className="flex justify-between items-center border-b border-gray-100 pb-3">
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{item.name}</div>
                      <div className="text-sm text-gray-600">${item.price} each</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-sm"
                      >
                        -
                      </button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-sm"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeFromOrder(item.id)}
                        className="text-red-600 hover:text-red-800 ml-2"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bill Summary */}
              <div className="mt-6 space-y-2 border-t border-gray-200 pt-4">
                <div className="flex justify-between text-sm">
                  <span>Subtotal:</span>
                  <span>${calculateSubtotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax (8%):</span>
                  <span>${calculateTax().toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg border-t border-gray-200 pt-2">
                  <span>Total:</span>
                  <span>${calculateTotal().toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={generateBill}
                className="w-full bg-primary-600 text-white py-3 px-4 rounded-md hover:bg-primary-700 mt-4"
              >
                Generate Bill with QR Code
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BillingSystem;