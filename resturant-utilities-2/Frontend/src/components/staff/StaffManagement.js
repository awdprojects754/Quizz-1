import React, { useState } from 'react';

const StaffManagement = () => {
  const [staff, setStaff] = useState([
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Manager',
      email: 'sarah@restaurant.com',
      phone: '+1 (555) 123-4567',
      hireDate: '2023-01-15',
      salary: 52000,
      hoursPerWeek: 40,
      status: 'active',
      skills: ['Management', 'Customer Service', 'Inventory'],
      performance: 4.8,
      shifts: ['Monday 9AM-5PM', 'Tuesday 9AM-5PM', 'Wednesday 9AM-5PM']
    },
    {
      id: 2,
      name: 'Mike Chen',
      role: 'Head Chef',
      email: 'mike@restaurant.com',
      phone: '+1 (555) 234-5678',
      hireDate: '2023-03-10',
      salary: 48000,
      hoursPerWeek: 45,
      status: 'active',
      skills: ['Culinary Arts', 'Menu Planning', 'Kitchen Management'],
      performance: 4.9,
      shifts: ['Tuesday 2PM-10PM', 'Wednesday 2PM-10PM', 'Friday 2PM-10PM']
    },
    {
      id: 3,
      name: 'Emily Davis',
      role: 'Wait Staff',
      email: 'emily@restaurant.com',
      phone: '+1 (555) 345-6789',
      hireDate: '2024-01-08',
      salary: 32000,
      hoursPerWeek: 35,
      status: 'active',
      skills: ['Customer Service', 'POS Systems', 'Wine Knowledge'],
      performance: 4.5,
      shifts: ['Friday 6PM-11PM', 'Saturday 6PM-11PM', 'Sunday 5PM-10PM']
    }
  ]);

  const [schedule, setSchedule] = useState({
    '2024-01-15': [
      { staffId: 1, name: 'Sarah Johnson', role: 'Manager', start: '09:00', end: '17:00' },
      { staffId: 2, name: 'Mike Chen', role: 'Chef', start: '14:00', end: '22:00' },
      { staffId: 3, name: 'Emily Davis', role: 'Wait Staff', start: '18:00', end: '23:00' }
    ],
    '2024-01-16': [
      { staffId: 1, name: 'Sarah Johnson', role: 'Manager', start: '09:00', end: '17:00' },
      { staffId: 3, name: 'Emily Davis', role: 'Wait Staff', start: '17:00', end: '22:00' }
    ]
  });

  const [activeTab, setActiveTab] = useState('team');
  const [showAddStaff, setShowAddStaff] = useState(false);

  const roles = ['Manager', 'Head Chef', 'Sous Chef', 'Line Cook', 'Wait Staff', 'Bartender', 'Host', 'Cleaner'];

  const getPerformanceColor = (rating) => {
    if (rating >= 4.5) return 'text-green-600 bg-green-100';
    if (rating >= 4.0) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const calculateTotalLaborCost = () => {
    return staff.reduce((total, employee) => {
      const weeklySalary = employee.salary / 52;
      return total + weeklySalary;
    }, 0);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Staff Management</h2>
          <p className="text-gray-600">Manage your team, schedules, and performance</p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={() => setShowAddStaff(true)}
            className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700"
          >
            Add Staff
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
            Generate Schedule
          </button>
        </div>
      </div>

      {/* Staff Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm font-medium text-gray-600">Total Staff</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">{staff.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm font-medium text-gray-600">Active Staff</p>
          <p className="text-2xl font-bold text-green-600 mt-2">
            {staff.filter(s => s.status === 'active').length}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm font-medium text-gray-600">Weekly Labor Cost</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">
            ${calculateTotalLaborCost().toFixed(2)}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm font-medium text-gray-600">Avg Performance</p>
          <p className="text-2xl font-bold text-blue-600 mt-2">
            {(staff.reduce((acc, s) => acc + s.performance, 0) / staff.length).toFixed(1)}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex">
            {['team', 'schedule', 'performance', 'payroll'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm capitalize ${
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

        <div className="p-6">
          {/* Team Management Tab */}
          {activeTab === 'team' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Team Members</h3>
                <div className="flex space-x-2">
                  <select className="rounded-md border border-gray-300 px-3 py-2 text-sm">
                    <option>All Roles</option>
                    {roles.map(role => (
                      <option key={role}>{role}</option>
                    ))}
                  </select>
                  <select className="rounded-md border border-gray-300 px-3 py-2 text-sm">
                    <option>All Status</option>
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {staff.map(employee => (
                  <div key={employee.id} className="border border-gray-200 rounded-lg p-6 hover:border-primary-300 transition-colors">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-bold text-gray-900">{employee.name}</h4>
                        <p className="text-sm text-gray-600">{employee.role}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getPerformanceColor(employee.performance)}`}>
                        {employee.performance}
                      </span>
                    </div>
                    
                    <div className="space-y-2 text-sm text-gray-600 mb-4">
                      <div className="flex justify-between">
                        <span>Email:</span>
                        <span className="text-gray-900">{employee.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Phone:</span>
                        <span className="text-gray-900">{employee.phone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Hours/Week:</span>
                        <span className="text-gray-900">{employee.hoursPerWeek}</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-primary-600">
                        ${(employee.salary / 52).toFixed(2)}/wk
                      </span>
                      <div className="flex space-x-2">
                        <button className="text-primary-600 hover:text-primary-900 text-sm">
                          Edit
                        </button>
                        <button className="text-red-600 hover:text-red-900 text-sm">
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Schedule Tab */}
          {activeTab === 'schedule' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Weekly Schedule</h3>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Staff Member
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Monday
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tuesday
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Wednesday
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Thursday
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Friday
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Saturday
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Sunday
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {staff.map(employee => (
                      <tr key={employee.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                          <div className="text-sm text-gray-500">{employee.role}</div>
                        </td>
                        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                          <td key={day} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {employee.shifts.find(s => s.includes(day)) || 'Off'}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">Quick Schedule Actions</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <button className="p-3 border border-gray-300 rounded-lg hover:border-primary-300 text-center">
                    <div className="text-lg mb-1">📅</div>
                    <div className="text-sm font-medium">Copy Last Week</div>
                  </button>
                  <button className="p-3 border border-gray-300 rounded-lg hover:border-primary-300 text-center">
                    <div className="text-lg mb-1">🔄</div>
                    <div className="text-sm font-medium">Auto Schedule</div>
                  </button>
                  <button className="p-3 border border-gray-300 rounded-lg hover:border-primary-300 text-center">
                    <div className="text-lg mb-1">📤</div>
                    <div className="text-sm font-medium">Export</div>
                  </button>
                  <button className="p-3 border border-gray-300 rounded-lg hover:border-primary-300 text-center">
                    <div className="text-lg mb-1">👥</div>
                    <div className="text-sm font-medium">Share</div>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Performance Tab */}
          {activeTab === 'performance' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Staff Performance</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {staff.map(employee => (
                  <div key={employee.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="font-bold text-gray-900">{employee.name}</h4>
                        <p className="text-sm text-gray-600">{employee.role}</p>
                      </div>
                      <div className="text-right">
                        <div className={`text-2xl font-bold ${getPerformanceColor(employee.performance).split(' ')[0]}`}>
                          {employee.performance}
                        </div>
                        <div className="text-sm text-gray-600">Rating</div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Punctuality</span>
                          <span>95%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-green-600 h-2 rounded-full" style={{ width: '95%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Customer Satisfaction</span>
                          <span>92%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: '92%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Upselling</span>
                          <span>78%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '78%' }}></div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <h5 className="font-medium text-gray-900 mb-2">Skills</h5>
                      <div className="flex flex-wrap gap-2">
                        {employee.skills.map(skill => (
                          <span key={skill} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Staff Modal */}
      {showAddStaff && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Staff Member</h3>
            <div className="space-y-4">
              <input type="text" placeholder="Full Name" className="w-full rounded-md border border-gray-300 px-3 py-2" />
              <select className="w-full rounded-md border border-gray-300 px-3 py-2">
                <option>Select Role</option>
                {roles.map(role => (
                  <option key={role}>{role}</option>
                ))}
              </select>
              <input type="email" placeholder="Email" className="w-full rounded-md border border-gray-300 px-3 py-2" />
              <input type="tel" placeholder="Phone" className="w-full rounded-md border border-gray-300 px-3 py-2" />
              <input type="number" placeholder="Annual Salary" className="w-full rounded-md border border-gray-300 px-3 py-2" />
              <div className="flex justify-end space-x-3">
                <button 
                  onClick={() => setShowAddStaff(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700">
                  Add Staff
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffManagement;