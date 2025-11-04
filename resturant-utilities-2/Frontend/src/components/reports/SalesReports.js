import React, { useState } from 'react';

const SalesReports = () => {
  const [reportType, setReportType] = useState('daily');

  // Mock data for demonstration
  const salesData = {
    daily: [
      { time: '12:00 PM', amount: 450, orders: 15 },
      { time: '1:00 PM', amount: 620, orders: 20 },
      { time: '2:00 PM', amount: 380, orders: 12 },
      { time: '3:00 PM', amount: 290, orders: 9 },
      { time: '4:00 PM', amount: 510, orders: 17 },
    ],
    weekly: [
      { day: 'Monday', amount: 2450, orders: 78 },
      { day: 'Tuesday', amount: 3120, orders: 95 },
      { day: 'Wednesday', amount: 2980, orders: 88 },
      { day: 'Thursday', amount: 3670, orders: 112 },
      { day: 'Friday', amount: 4210, orders: 135 },
      { day: 'Saturday', amount: 5380, orders: 168 },
      { day: 'Sunday', amount: 3890, orders: 124 },
    ]
  };

  const currentData = salesData[reportType];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Sales Reports</h2>
          <p className="text-gray-600">Analyze your restaurant performance</p>
        </div>
        <div className="flex space-x-4">
          <select
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="daily">Daily Report</option>
            <option value="weekly">Weekly Report</option>
            <option value="monthly">Monthly Report</option>
          </select>
          <button className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700">
            Export Report
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm font-medium text-gray-600">Total Revenue</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">$12,450</p>
          <p className="text-sm text-green-600 mt-1">+15% from last period</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm font-medium text-gray-600">Total Orders</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">382</p>
          <p className="text-sm text-green-600 mt-1">+8% from last period</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm font-medium text-gray-600">Average Order Value</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">$32.58</p>
          <p className="text-sm text-green-600 mt-1">+5% from last period</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm font-medium text-gray-600">Busiest Hour</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">1:00 PM</p>
          <p className="text-sm text-gray-600 mt-1">20 orders</p>
        </div>
      </div>

      {/* Sales Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            {reportType === 'daily' ? 'Hourly Sales' : 'Daily Sales'}
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {reportType === 'daily' ? 'Time' : 'Day'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Orders
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Revenue
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Average Order
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentData.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {reportType === 'daily' ? item.time : item.day}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.orders}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${item.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${(item.amount / item.orders).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SalesReports;