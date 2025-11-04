import React, { useState, useEffect } from 'react';

const OrderManagement = () => {
  const [orders, setOrders] = useState([
    {
      id: 1001,
      tableNumber: 5,
      customerName: 'John Smith',
      items: [
        { name: 'Margherita Pizza', quantity: 1, price: 12.99 },
        { name: 'Caesar Salad', quantity: 1, price: 8.99 }
      ],
      status: 'pending',
      timestamp: new Date().toISOString(),
      estimatedTime: 20,
      specialInstructions: 'Extra cheese'
    },
    {
      id: 1002,
      tableNumber: 3,
      customerName: 'Emma Wilson',
      items: [
        { name: 'Pepperoni Pizza', quantity: 1, price: 14.99 },
        { name: 'Garlic Bread', quantity: 2, price: 5.99 }
      ],
      status: 'preparing',
      timestamp: new Date(Date.now() - 10 * 60000).toISOString(),
      estimatedTime: 15,
      specialInstructions: 'Well done'
    }
  ]);

  const [newOrder, setNewOrder] = useState({
    tableNumber: '',
    customerName: '',
    items: [],
    specialInstructions: ''
  });

  const orderStatuses = [
    { value: 'pending', label: 'Pending', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'confirmed', label: 'Confirmed', color: 'bg-blue-100 text-blue-800' },
    { value: 'preparing', label: 'Preparing', color: 'bg-orange-100 text-orange-800' },
    { value: 'ready', label: 'Ready to Serve', color: 'bg-green-100 text-green-800' },
    { value: 'served', label: 'Served', color: 'bg-gray-100 text-gray-800' },
    { value: 'cancelled', label: 'Cancelled', color: 'bg-red-100 text-red-800' }
  ];

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setOrders(prev => prev.map(order => {
        if (order.status === 'preparing') {
          // Update estimated time
          return { ...order, estimatedTime: Math.max(0, order.estimatedTime - 1) };
        }
        return order;
      }));
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const getStatusColor = (status) => {
    const statusObj = orderStatuses.find(s => s.value === status);
    return statusObj ? statusObj.color : 'bg-gray-100 text-gray-800';
  };

  const calculateOrderTotal = (items) => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Order Management</h2>
          <p className="text-gray-600">Real-time order tracking and management</p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700">
            New Order
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
            Kitchen View
          </button>
        </div>
      </div>

      {/* Order Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {orderStatuses.map(status => (
          <div key={status.value} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{status.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  {orders.filter(order => order.status === status.value).length}
                </p>
              </div>
              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${status.color}`}>
                {status.label}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Orders Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {orders.map(order => (
          <div key={order.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            {/* Order Header */}
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900">Order #{order.id}</h3>
                <p className="text-sm text-gray-600">
                  Table {order.tableNumber} • {order.customerName}
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(order.timestamp).toLocaleTimeString()}
                </p>
              </div>
              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                {orderStatuses.find(s => s.value === order.status)?.label}
              </span>
            </div>

            {/* Order Items */}
            <div className="space-y-2 mb-4">
              {order.items.map((item, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span>
                    {item.quantity}x {item.name}
                  </span>
                  <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            {/* Special Instructions */}
            {order.specialInstructions && (
              <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
                <p className="text-sm text-yellow-800">
                  <strong>Note:</strong> {order.specialInstructions}
                </p>
              </div>
            )}

            {/* Order Footer */}
            <div className="flex justify-between items-center border-t border-gray-200 pt-4">
              <div className="text-sm">
                <p className="font-bold text-gray-900">${calculateOrderTotal(order.items).toFixed(2)}</p>
                {order.status === 'preparing' && (
                  <p className="text-orange-600">ETA: {order.estimatedTime} min</p>
                )}
              </div>
              
              <div className="flex space-x-2">
                {order.status === 'pending' && (
                  <button
                    onClick={() => updateOrderStatus(order.id, 'confirmed')}
                    className="bg-blue-600 text-white px-3 py-1 text-sm rounded hover:bg-blue-700"
                  >
                    Confirm
                  </button>
                )}
                {order.status === 'confirmed' && (
                  <button
                    onClick={() => updateOrderStatus(order.id, 'preparing')}
                    className="bg-orange-600 text-white px-3 py-1 text-sm rounded hover:bg-orange-700"
                  >
                    Start Prep
                  </button>
                )}
                {order.status === 'preparing' && (
                  <button
                    onClick={() => updateOrderStatus(order.id, 'ready')}
                    className="bg-green-600 text-white px-3 py-1 text-sm rounded hover:bg-green-700"
                  >
                    Mark Ready
                  </button>
                )}
                {order.status === 'ready' && (
                  <button
                    onClick={() => updateOrderStatus(order.id, 'served')}
                    className="bg-gray-600 text-white px-3 py-1 text-sm rounded hover:bg-gray-700"
                  >
                    Mark Served
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-300 text-center">
            <div className="text-2xl mb-2">📝</div>
            <div className="font-medium">Quick Order</div>
          </button>
          <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-300 text-center">
            <div className="text-2xl mb-2">🔄</div>
            <div className="font-medium">Bulk Update</div>
          </button>
          <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-300 text-center">
            <div className="text-2xl mb-2">📊</div>
            <div className="font-medium">Order Analytics</div>
          </button>
          <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-300 text-center">
            <div className="text-2xl mb-2">🔔</div>
            <div className="font-medium">Notifications</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderManagement;