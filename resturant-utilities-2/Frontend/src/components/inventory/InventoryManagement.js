import React, { useState } from 'react';

const InventoryManagement = () => {
  const [inventory, setInventory] = useState([
    {
      id: 1,
      name: 'Flour',
      category: 'Dry Goods',
      currentStock: 45,
      minStock: 20,
      unit: 'kg',
      costPerUnit: 1.75,
      supplier: 'Bakery Supplies Co.',
      lastRestocked: '2024-01-10',
      shelfLife: 180 // days
    },
    {
      id: 2,
      name: 'Mozzarella Cheese',
      category: 'Dairy',
      currentStock: 12,
      minStock: 8,
      unit: 'kg',
      costPerUnit: 8.50,
      supplier: 'Dairy Fresh Inc.',
      lastRestocked: '2024-01-12',
      shelfLife: 21
    },
    {
      id: 3,
      name: 'Tomato Sauce',
      category: 'Canned Goods',
      currentStock: 8,
      minStock: 10,
      unit: 'kg',
      costPerUnit: 2.80,
      supplier: 'Italian Imports',
      lastRestocked: '2024-01-08',
      shelfLife: 365
    }
  ]);

  const [lowStockItems, setLowStockItems] = useState(
    inventory.filter(item => item.currentStock <= item.minStock)
  );

  const categories = ['Dry Goods', 'Dairy', 'Canned Goods', 'Produce', 'Meat', 'Beverages', 'Spices'];

  const getStockStatus = (item) => {
    if (item.currentStock === 0) return { status: 'Out of Stock', color: 'bg-red-100 text-red-800' };
    if (item.currentStock <= item.minStock) return { status: 'Low Stock', color: 'bg-orange-100 text-orange-800' };
    if (item.currentStock <= item.minStock * 2) return { status: 'Adequate', color: 'bg-yellow-100 text-yellow-800' };
    return { status: 'In Stock', color: 'bg-green-100 text-green-800' };
  };

  const updateStock = (itemId, newStock) => {
    setInventory(prev => prev.map(item => 
      item.id === itemId ? { ...item, currentStock: newStock } : item
    ));
  };

  const calculateTotalInventoryValue = () => {
    return inventory.reduce((total, item) => total + (item.currentStock * item.costPerUnit), 0);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Inventory Management</h2>
          <p className="text-gray-600">Track and manage your restaurant inventory</p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700">
            Add Item
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
            Restock Order
          </button>
        </div>
      </div>

      {/* Inventory Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm font-medium text-gray-600">Total Items</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">{inventory.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm font-medium text-gray-600">Low Stock Items</p>
          <p className="text-2xl font-bold text-red-600 mt-2">
            {inventory.filter(item => item.currentStock <= item.minStock).length}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm font-medium text-gray-600">Inventory Value</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">
            ${calculateTotalInventoryValue().toFixed(2)}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm font-medium text-gray-600">Categories</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">{categories.length}</p>
        </div>
      </div>

      {/* Low Stock Alerts */}
      {lowStockItems.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-red-400">⚠️</span>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                Low Stock Alert ({lowStockItems.length} items)
              </h3>
              <div className="mt-2 text-sm text-red-700">
                <p>The following items are running low and need restocking:</p>
                <ul className="list-disc list-inside mt-1">
                  {lowStockItems.slice(0, 3).map(item => (
                    <li key={item.id}>
                      {item.name} - {item.currentStock} {item.unit} remaining
                    </li>
                  ))}
                  {lowStockItems.length > 3 && (
                    <li>...and {lowStockItems.length - 3} more</li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Inventory Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Inventory Items</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Item
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Current Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Min Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Unit Cost
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {inventory.map(item => {
                const stockStatus = getStockStatus(item);
                return (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{item.name}</div>
                        <div className="text-sm text-gray-500">{item.supplier}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{item.currentStock} {item.unit}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.minStock} {item.unit}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${item.costPerUnit}/{item.unit}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${stockStatus.color}`}>
                        {stockStatus.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button className="text-primary-600 hover:text-primary-900">
                        Update
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        Restock
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h4 className="font-semibold text-gray-900 mb-3">Stock Adjustment</h4>
          <div className="space-y-3">
            <select className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500">
              <option>Select Item</option>
              {inventory.map(item => (
                <option key={item.id} value={item.id}>{item.name}</option>
              ))}
            </select>
            <input
              type="number"
              placeholder="Adjustment quantity"
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <button className="w-full bg-primary-600 text-white py-2 rounded-md hover:bg-primary-700">
              Update Stock
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h4 className="font-semibold text-gray-900 mb-3">Quick Reports</h4>
          <div className="space-y-2">
            <button className="w-full text-left p-3 border border-gray-200 rounded hover:border-primary-300">
              📊 Low Stock Report
            </button>
            <button className="w-full text-left p-3 border border-gray-200 rounded hover:border-primary-300">
              💰 Inventory Valuation
            </button>
            <button className="w-full text-left p-3 border border-gray-200 rounded hover:border-primary-300">
              📦 Restock Orders
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h4 className="font-semibold text-gray-900 mb-3">Supplier Info</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Total Suppliers:</span>
              <span className="font-medium">8</span>
            </div>
            <div className="flex justify-between">
              <span>Pending Orders:</span>
              <span className="font-medium">3</span>
            </div>
            <div className="flex justify-between">
              <span>This Month Spend:</span>
              <span className="font-medium">$2,450</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryManagement;