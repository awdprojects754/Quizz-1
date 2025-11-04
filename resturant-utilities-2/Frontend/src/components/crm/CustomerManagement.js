import React, { useState } from 'react';

const CustomerManagement = () => {
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@email.com',
      phone: '+1 (555) 123-4567',
      totalVisits: 12,
      totalSpent: 485.50,
      lastVisit: '2024-01-10',
      favoriteItems: ['Margherita Pizza', 'Caesar Salad'],
      preferences: ['Window seat', 'No onions'],
      loyaltyPoints: 1250,
      customerType: 'VIP'
    },
    {
      id: 2,
      name: 'Emma Wilson',
      email: 'emma.wilson@email.com',
      phone: '+1 (555) 987-6543',
      totalVisits: 8,
      totalSpent: 320.75,
      lastVisit: '2024-01-12',
      favoriteItems: ['Pepperoni Pizza'],
      preferences: ['Extra cheese'],
      loyaltyPoints: 800,
      customerType: 'Regular'
    }
  ]);

  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  const getCustomerTypeColor = (type) => {
    switch (type) {
      case 'VIP': return 'bg-purple-100 text-purple-800';
      case 'Regular': return 'bg-blue-100 text-blue-800';
      case 'New': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const calculateAverageSpend = (customer) => {
    return customer.totalSpent / customer.totalVisits;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Customer Management</h2>
          <p className="text-gray-600">Build relationships and grow your customer base</p>
        </div>
        <button className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700">
          Add Customer
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Customer List */}
        <div className="lg:col-span-1 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Customers</h3>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {customers.map(customer => (
              <div
                key={customer.id}
                onClick={() => setSelectedCustomer(customer)}
                className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                  selectedCustomer?.id === customer.id
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:border-primary-300'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-gray-900">{customer.name}</h4>
                    <p className="text-sm text-gray-600">{customer.email}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getCustomerTypeColor(customer.customerType)}`}>
                    {customer.customerType}
                  </span>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>{customer.totalVisits} visits</span>
                  <span>${customer.totalSpent}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Details */}
        <div className="lg:col-span-3 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          {selectedCustomer ? (
            <div>
              {/* Customer Header */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{selectedCustomer.name}</h3>
                  <p className="text-gray-600">{selectedCustomer.email} • {selectedCustomer.phone}</p>
                </div>
                <div className="text-right">
                  <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getCustomerTypeColor(selectedCustomer.customerType)}`}>
                    {selectedCustomer.customerType}
                  </span>
                  <p className="text-sm text-gray-600 mt-1">{selectedCustomer.loyaltyPoints} points</p>
                </div>
              </div>

              {/* Tabs */}
              <div className="border-b border-gray-200 mb-6">
                <nav className="-mb-px flex space-x-8">
                  {['overview', 'history', 'preferences', 'marketing'].map(tab => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`py-2 px-1 border-b-2 font-medium text-sm capitalize ${
                        activeTab === tab
                          ? 'border-primary-500 text-primary-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Tab Content */}
              {activeTab === 'overview' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 border border-gray-200 rounded-lg">
                    <div className="text-2xl font-bold text-primary-600">{selectedCustomer.totalVisits}</div>
                    <div className="text-sm text-gray-600">Total Visits</div>
                  </div>
                  <div className="text-center p-4 border border-gray-200 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">${selectedCustomer.totalSpent}</div>
                    <div className="text-sm text-gray-600">Total Spent</div>
                  </div>
                  <div className="text-center p-4 border border-gray-200 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">${calculateAverageSpend(selectedCustomer).toFixed(2)}</div>
                    <div className="text-sm text-gray-600">Average Spend</div>
                  </div>

                  <div className="md:col-span-3">
                    <h4 className="font-semibold text-gray-900 mb-3">Favorite Items</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedCustomer.favoriteItems.map((item, index) => (
                        <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'preferences' && (
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">Preferences & Notes</h4>
                  <div className="space-y-2">
                    {selectedCustomer.preferences.map((pref, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                        <span className="text-gray-700">{pref}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Add Note</h4>
                    <textarea
                      rows="3"
                      className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Add customer notes or preferences..."
                    ></textarea>
                    <button className="mt-2 bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700">
                      Save Note
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'marketing' && (
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">Marketing Actions</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button className="p-4 border border-gray-200 rounded-lg hover:border-primary-300 text-center">
                      <div className="text-2xl mb-2">🎁</div>
                      <div className="font-medium">Send Special Offer</div>
                    </button>
                    <button className="p-4 border border-gray-200 rounded-lg hover:border-primary-300 text-center">
                      <div className="text-2xl mb-2">🎂</div>
                      <div className="font-medium">Birthday Gift</div>
                    </button>
                    <button className="p-4 border border-gray-200 rounded-lg hover:border-primary-300 text-center">
                      <div className="text-2xl mb-2">⭐</div>
                      <div className="font-medium">Loyalty Reward</div>
                    </button>
                    <button className="p-4 border border-gray-200 rounded-lg hover:border-primary-300 text-center">
                      <div className="text-2xl mb-2">📧</div>
                      <div className="font-medium">Email Campaign</div>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">👥</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Customer</h3>
              <p className="text-gray-600">Choose a customer from the list to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerManagement;