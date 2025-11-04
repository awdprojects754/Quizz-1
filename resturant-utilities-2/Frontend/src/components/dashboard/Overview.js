import React from 'react';

const Overview = () => {
  const stats = [
    { label: 'Today\'s Revenue', value: '$1,250', change: '+12%' },
    { label: 'Active Reservations', value: '8', change: '+2' },
    { label: 'Menu Items', value: '45', change: 'Active' },
    { label: 'Customer Feedback', value: '4.8/5', change: '+0.2' },
  ];

  const quickActions = [
    { label: 'Add Menu Item', icon: '➕', section: 'menu' },
    { label: 'Generate QR', icon: '🔲', section: 'qr' },
    { label: 'Create Bill', icon: '🧾', section: 'billing' },
    { label: 'View Reports', icon: '📈', section: 'reports' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
        <p className="text-gray-600">Quick insights and actions for your restaurant</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <p className="text-sm font-medium text-gray-600">{stat.label}</p>
            <div className="flex items-baseline justify-between mt-2">
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <span className="text-sm text-green-600 bg-green-50 px-2 py-1 rounded-full">
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <button
              key={index}
              className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors"
            >
              <span className="text-2xl mb-2">{action.icon}</span>
              <span className="text-sm font-medium text-gray-700">{action.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Orders</h3>
          <div className="space-y-3">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex justify-between items-center py-2 border-b border-gray-100">
                <div>
                  <p className="font-medium">Order #100{item}</p>
                  <p className="text-sm text-gray-600">Table {item + 2} • 30 mins ago</p>
                </div>
                <span className="font-bold text-primary-600">${45 + item * 10}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Reservations</h3>
          <div className="space-y-3">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex justify-between items-center py-2 border-b border-gray-100">
                <div>
                  <p className="font-medium">Party of {item + 2}</p>
                  <p className="text-sm text-gray-600">Today • {6 + item}:00 PM</p>
                </div>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                  Confirmed
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;