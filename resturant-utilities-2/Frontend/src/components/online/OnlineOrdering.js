import React, { useState } from 'react';

const OnlineOrdering = () => {
  const [onlineOrders, setOnlineOrders] = useState([
    {
      id: 'ONL-1001',
      customer: {
        name: 'Alex Thompson',
        email: 'alex@email.com',
        phone: '+1 (555) 123-9999'
      },
      type: 'delivery',
      items: [
        { name: 'Margherita Pizza', quantity: 1, price: 12.99 },
        { name: 'Garlic Bread', quantity: 2, price: 5.99 }
      ],
      status: 'pending',
      orderTime: new Date().toISOString(),
      deliveryAddress: '123 Main St, Apt 4B, New York, NY 10001',
      specialInstructions: 'Leave at door, please ring bell',
      paymentStatus: 'paid',
      total: 24.97
    },
    {
      id: 'ONL-1002',
      customer: {
        name: 'Jessica Miller',
        email: 'jessica@email.com',
        phone: '+1 (555) 456-8888'
      },
      type: 'pickup',
      items: [
        { name: 'Pepperoni Pizza', quantity: 1, price: 14.99 },
        { name: 'Caesar Salad', quantity: 1, price: 8.99 }
      ],
      status: 'preparing',
      orderTime: new Date(Date.now() - 15 * 60000).toISOString(),
      pickupTime: '19:30',
      paymentStatus: 'paid',
      total: 23.98
    }
  ]);

  const [integrationSettings, setIntegrationSettings] = useState({
    websiteOrders: true,
    mobileApp: true,
    uberEats: false,
    doorDash: false,
    grubhub: false,
    autoAccept: true,
    prepTime: 25,
    deliveryRadius: 5
  });

  const orderStatuses = [
    { value: 'pending', label: 'Pending', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'confirmed', label: 'Confirmed', color: 'bg-blue-100 text-blue-800' },
    { value: 'preparing', label: 'Preparing', color: 'bg-orange-100 text-orange-800' },
    { value: 'ready', label: 'Ready', color: 'bg-green-100 text-green-800' },
    { value: 'pickedup', label: 'Picked Up', color: 'bg-gray-100 text-gray-800' },
    { value: 'delivered', label: 'Delivered', color: 'bg-purple-100 text-purple-800' },
    { value: 'cancelled', label: 'Cancelled', color: 'bg-red-100 text-red-800' }
  ];

  const updateOrderStatus = (orderId, newStatus) => {
    setOnlineOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const getStatusColor = (status) => {
    const statusObj = orderStatuses.find(s => s.value === status);
    return statusObj ? statusObj.color : 'bg-gray-100 text-gray-800';
  };

  const toggleIntegration = (integration) => {
    setIntegrationSettings(prev => ({
      ...prev,
      [integration]: !prev[integration]
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Online Ordering</h2>
          <p className="text-gray-600">Manage online orders and delivery integrations</p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700">
            Order Settings
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
            View Analytics
          </button>
        </div>
      </div>

      {/* Order Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm font-medium text-gray-600">Today's Orders</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">12</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm font-medium text-gray-600">Pending</p>
          <p className="text-2xl font-bold text-yellow-600 mt-2">
            {onlineOrders.filter(o => o.status === 'pending').length}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm font-medium text-gray-600">Delivery</p>
          <p className="text-2xl font-bold text-blue-600 mt-2">
            {onlineOrders.filter(o => o.type === 'delivery').length}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm font-medium text-gray-600">Pickup</p>
          <p className="text-2xl font-bold text-green-600 mt-2">
            {onlineOrders.filter(o => o.type === 'pickup').length}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm font-medium text-gray-600">Revenue</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">
            ${onlineOrders.reduce((acc, order) => acc + order.total, 0).toFixed(2)}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Online Orders List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Online Orders</h3>
            
            <div className="space-y-4">
              {onlineOrders.map(order => (
                <div key={order.id} className="border border-gray-200 rounded-lg p-4 hover:border-primary-300 transition-colors">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-bold text-gray-900">{order.id}</h4>
                      <p className="text-sm text-gray-600">
                        {order.customer.name} • {order.type === 'delivery' ? '🚚 Delivery' : '🏃 Pickup'}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(order.orderTime).toLocaleTimeString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                        {orderStatuses.find(s => s.value === order.status)?.label}
                      </span>
                      <p className="text-sm font-bold text-gray-900 mt-1">${order.total}</p>
                    </div>
                  </div>

                  <div className="space-y-2 mb-3">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span>
                          {item.quantity}x {item.name}
                        </span>
                        <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  {order.deliveryAddress && (
                    <div className="mb-3 p-2 bg-blue-50 border border-blue-200 rounded text-sm">
                      <strong>Delivery:</strong> {order.deliveryAddress}
                    </div>
                  )}

                  {order.pickupTime && (
                    <div className="mb-3 p-2 bg-green-50 border border-green-200 rounded text-sm">
                      <strong>Pickup Time:</strong> {order.pickupTime}
                    </div>
                  )}

                  {order.specialInstructions && (
                    <div className="mb-3 p-2 bg-yellow-50 border border-yellow-200 rounded text-sm">
                      <strong>Note:</strong> {order.specialInstructions}
                    </div>
                  )}

                  <div className="flex justify-between items-center">
                    <span className={`text-xs font-semibold ${
                      order.paymentStatus === 'paid' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      Payment: {order.paymentStatus.toUpperCase()}
                    </span>
                    <div className="flex space-x-2">
                      {order.status === 'pending' && (
                        <button
                          onClick={() => updateOrderStatus(order.id, 'confirmed')}
                          className="bg-blue-600 text-white px-3 py-1 text-xs rounded hover:bg-blue-700"
                        >
                          Accept
                        </button>
                      )}
                      {order.status === 'confirmed' && (
                        <button
                          onClick={() => updateOrderStatus(order.id, 'preparing')}
                          className="bg-orange-600 text-white px-3 py-1 text-xs rounded hover:bg-orange-700"
                        >
                          Start Prep
                        </button>
                      )}
                      {order.status === 'preparing' && (
                        <button
                          onClick={() => updateOrderStatus(order.id, 'ready')}
                          className="bg-green-600 text-white px-3 py-1 text-xs rounded hover:bg-green-700"
                        >
                          Ready
                        </button>
                      )}
                      <button className="bg-gray-600 text-white px-3 py-1 text-xs rounded hover:bg-gray-700">
                        Message
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Integration Settings */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Integrations</h3>
            
            <div className="space-y-4">
              {[
                { key: 'websiteOrders', label: 'Website Orders', description: 'Accept orders from your website' },
                { key: 'mobileApp', label: 'Mobile App', description: 'Orders through restaurant app' },
                { key: 'uberEats', label: 'Uber Eats', description: 'Integrate with Uber Eats' },
                { key: 'doorDash', label: 'DoorDash', description: 'Integrate with DoorDash' },
                { key: 'grubhub', label: 'Grubhub', description: 'Integrate with Grubhub' }
              ].map(integration => (
                <div key={integration.key} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900">{integration.label}</div>
                    <div className="text-sm text-gray-600">{integration.description}</div>
                  </div>
                  <button
                    onClick={() => toggleIntegration(integration.key)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                      integrationSettings[integration.key] ? 'bg-primary-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                        integrationSettings[integration.key] ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Order Settings */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Settings</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Default Prep Time (minutes)
                </label>
                <input
                  type="number"
                  value={integrationSettings.prepTime}
                  onChange={(e) => setIntegrationSettings(prev => ({ ...prev, prepTime: e.target.value }))}
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Delivery Radius (miles)
                </label>
                <input
                  type="number"
                  value={integrationSettings.deliveryRadius}
                  onChange={(e) => setIntegrationSettings(prev => ({ ...prev, deliveryRadius: e.target.value }))}
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={integrationSettings.autoAccept}
                  onChange={(e) => setIntegrationSettings(prev => ({ ...prev, autoAccept: e.target.checked }))}
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <label className="ml-2 text-sm text-gray-700">Auto-accept orders</label>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-4">
              <button className="p-3 border border-gray-300 rounded-lg hover:border-primary-300 text-center">
                <div className="text-lg mb-1">📱</div>
                <div className="text-sm font-medium">Mobile App</div>
              </button>
              <button className="p-3 border border-gray-300 rounded-lg hover:border-primary-300 text-center">
                <div className="text-lg mb-1">🌐</div>
                <div className="text-sm font-medium">Website</div>
              </button>
              <button className="p-3 border border-gray-300 rounded-lg hover:border-primary-300 text-center">
                <div className="text-lg mb-1">📊</div>
                <div className="text-sm font-medium">Analytics</div>
              </button>
              <button className="p-3 border border-gray-300 rounded-lg hover:border-primary-300 text-center">
                <div className="text-lg mb-1">⚙️</div>
                <div className="text-sm font-medium">Settings</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnlineOrdering;