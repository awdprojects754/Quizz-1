import React, { useState } from 'react';

const MarketingSuite = () => {
  const [activeTab, setActiveTab] = useState('campaigns');
  const [campaigns, setCampaigns] = useState([
    {
      id: 1,
      name: 'Weekend Special Offer',
      type: 'email',
      status: 'active',
      audience: 'all_customers',
      sent: 1250,
      opened: 450,
      clicked: 120,
      conversions: 35,
      startDate: '2024-01-12',
      endDate: '2024-01-14',
      budget: 200,
      spent: 85
    },
    {
      id: 2,
      name: 'Loyalty Program Launch',
      type: 'sms',
      status: 'scheduled',
      audience: 'vip_customers',
      sent: 0,
      opened: 0,
      clicked: 0,
      conversions: 0,
      startDate: '2024-01-20',
      endDate: '2024-01-25',
      budget: 500,
      spent: 0
    },
    {
      id: 3,
      name: 'January Discount',
      type: 'social',
      status: 'completed',
      audience: 'inactive_customers',
      sent: 800,
      opened: 320,
      clicked: 85,
      conversions: 28,
      startDate: '2024-01-01',
      endDate: '2024-01-10',
      budget: 150,
      spent: 150
    }
  ]);

  const [reviews, setReviews] = useState([
    {
      id: 1,
      customer: 'John Smith',
      rating: 5,
      comment: 'Amazing food and great service! Will definitely come back.',
      platform: 'Google',
      date: '2024-01-12',
      response: 'Thank you, John! We look forward to serving you again.'
    },
    {
      id: 2,
      customer: 'Sarah Johnson',
      rating: 4,
      comment: 'Good food but waiting time was a bit long.',
      platform: 'Yelp',
      date: '2024-01-11',
      response: ''
    },
    {
      id: 3,
      customer: 'Mike Chen',
      rating: 5,
      comment: 'Best pizza in town! Delivery was quick and hot.',
      platform: 'Website',
      date: '2024-01-10',
      response: 'Thanks Mike! We take pride in our pizza quality.'
    }
  ]);

  const [newCampaign, setNewCampaign] = useState({
    name: '',
    type: 'email',
    audience: 'all_customers',
    budget: 100,
    startDate: '',
    endDate: ''
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'email': return '📧';
      case 'sms': return '💬';
      case 'social': return '📱';
      case 'push': return '🔔';
      default: return '📢';
    }
  };

  const calculateROI = (campaign) => {
    if (campaign.spent === 0) return 0;
    // Mock ROI calculation - in real app, this would use actual revenue data
    return ((campaign.conversions * 50 - campaign.spent) / campaign.spent * 100).toFixed(1);
  };

  const respondToReview = (reviewId, response) => {
    setReviews(prev => prev.map(review => 
      review.id === reviewId ? { ...review, response } : review
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Digital Marketing Suite</h2>
          <p className="text-gray-600">Grow your restaurant with smart marketing</p>
        </div>
        <button className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700">
          Create Campaign
        </button>
      </div>

      {/* Marketing Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm font-medium text-gray-600">Active Campaigns</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">
            {campaigns.filter(c => c.status === 'active').length}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm font-medium text-gray-600">Total Reach</p>
          <p className="text-2xl font-bold text-blue-600 mt-2">
            {campaigns.reduce((acc, c) => acc + c.sent, 0).toLocaleString()}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm font-medium text-gray-600">Avg. Open Rate</p>
          <p className="text-2xl font-bold text-green-600 mt-2">
            {((campaigns.reduce((acc, c) => acc + c.opened, 0) / campaigns.reduce((acc, c) => acc + c.sent, 0)) * 100 || 0).toFixed(1)}%
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm font-medium text-gray-600">Total ROI</p>
          <p className="text-2xl font-bold text-purple-600 mt-2">
            {campaigns.filter(c => c.status === 'completed').reduce((acc, c) => acc + parseFloat(calculateROI(c)), 0).toFixed(1)}%
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex">
            {['campaigns', 'reviews', 'audience', 'analytics'].map(tab => (
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
          {/* Campaigns Tab */}
          {activeTab === 'campaigns' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Marketing Campaigns</h3>
                <select className="rounded-md border border-gray-300 px-3 py-2 text-sm">
                  <option>All Status</option>
                  <option>Active</option>
                  <option>Scheduled</option>
                  <option>Completed</option>
                </select>
              </div>

              <div className="space-y-4">
                {campaigns.map(campaign => (
                  <div key={campaign.id} className="border border-gray-200 rounded-lg p-6 hover:border-primary-300 transition-colors">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{getTypeIcon(campaign.type)}</span>
                        <div>
                          <h4 className="font-bold text-gray-900">{campaign.name}</h4>
                          <p className="text-sm text-gray-600 capitalize">
                            {campaign.type} • {campaign.audience.replace('_', ' ')}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(campaign.status)}`}>
                          {campaign.status}
                        </span>
                        <p className="text-sm text-gray-600 mt-1">
                          {campaign.startDate} to {campaign.endDate}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-lg font-bold text-gray-900">{campaign.sent}</div>
                        <div className="text-xs text-gray-600">Sent</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-blue-600">{campaign.opened}</div>
                        <div className="text-xs text-gray-600">Opened</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-green-600">{campaign.clicked}</div>
                        <div className="text-xs text-gray-600">Clicked</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-purple-600">{campaign.conversions}</div>
                        <div className="text-xs text-gray-600">Conversions</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-orange-600">
                          {calculateROI(campaign)}%
                        </div>
                        <div className="text-xs text-gray-600">ROI</div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="text-sm">
                        Budget: <span className="font-bold">${campaign.budget}</span> • 
                        Spent: <span className="font-bold">${campaign.spent}</span>
                      </div>
                      <div className="flex space-x-2">
                        <button className="text-primary-600 hover:text-primary-900 text-sm">
                          Edit
                        </button>
                        <button className="text-green-600 hover:text-green-900 text-sm">
                          Analytics
                        </button>
                        {campaign.status === 'active' && (
                          <button className="text-yellow-600 hover:text-yellow-900 text-sm">
                            Pause
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Campaign Templates */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-4">Quick Campaign Templates</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button className="p-4 border border-gray-300 rounded-lg hover:border-primary-300 text-center">
                    <div className="text-lg mb-2">🎉</div>
                    <div className="font-medium">Special Offer</div>
                    <div className="text-sm text-gray-600">20% off weekend orders</div>
                  </button>
                  <button className="p-4 border border-gray-300 rounded-lg hover:border-primary-300 text-center">
                    <div className="text-lg mb-2">🎂</div>
                    <div className="font-medium">Birthday Deal</div>
                    <div className="text-sm text-gray-600">Free dessert on birthday</div>
                  </button>
                  <button className="p-4 border border-gray-300 rounded-lg hover:border-primary-300 text-center">
                    <div className="text-lg mb-2">⭐</div>
                    <div className="font-medium">Loyalty Reward</div>
                    <div className="text-sm text-gray-600">Earn points with every order</div>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Reviews Tab */}
          {activeTab === 'reviews' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Customer Reviews</h3>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="text-2xl font-bold text-yellow-600">4.8</div>
                    <div className="text-sm text-gray-600">Average Rating</div>
                  </div>
                  <select className="rounded-md border border-gray-300 px-3 py-2 text-sm">
                    <option>All Platforms</option>
                    <option>Google</option>
                    <option>Yelp</option>
                    <option>Website</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                {reviews.map(review => (
                  <div key={review.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-bold text-gray-900">{review.customer}</h4>
                        <div className="flex items-center space-x-2 mt-1">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <span key={i} className={i < review.rating ? 'text-yellow-400' : 'text-gray-300'}>
                                ⭐
                              </span>
                            ))}
                          </div>
                          <span className="text-sm text-gray-600">{review.platform}</span>
                          <span className="text-sm text-gray-500">{review.date}</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-4">{review.comment}</p>

                    {review.response ? (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <p className="text-sm text-blue-800">
                          <strong>Your Response:</strong> {review.response}
                        </p>
                      </div>
                    ) : (
                      <div className="flex space-x-3">
                        <textarea
                          placeholder="Write a response..."
                          rows="2"
                          className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm"
                        ></textarea>
                        <button 
                          onClick={() => respondToReview(review.id, 'Thank you for your feedback!')}
                          className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 self-end"
                        >
                          Respond
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Audience Tab */}
          {activeTab === 'audience' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Customer Segments</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="border border-gray-200 rounded-lg p-6 text-center">
                  <div className="text-3xl mb-2">👥</div>
                  <h4 className="font-bold text-gray-900">All Customers</h4>
                  <p className="text-2xl font-bold text-primary-600 my-2">1,250</p>
                  <p className="text-sm text-gray-600">Total customer base</p>
                  <button className="mt-3 bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 text-sm">
                    Create Campaign
                  </button>
                </div>

                <div className="border border-gray-200 rounded-lg p-6 text-center">
                  <div className="text-3xl mb-2">⭐</div>
                  <h4 className="font-bold text-gray-900">VIP Customers</h4>
                  <p className="text-2xl font-bold text-purple-600 my-2">85</p>
                  <p className="text-sm text-gray-600">Top 10% spenders</p>
                  <button className="mt-3 bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 text-sm">
                    Create Campaign
                  </button>
                </div>

                <div className="border border-gray-200 rounded-lg p-6 text-center">
                  <div className="text-3xl mb-2">💤</div>
                  <h4 className="font-bold text-gray-900">Inactive Customers</h4>
                  <p className="text-2xl font-bold text-orange-600 my-2">320</p>
                  <p className="text-sm text-gray-600">No orders in 30+ days</p>
                  <button className="mt-3 bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 text-sm">
                    Win Back
                  </button>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-4">Audience Insights</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-medium text-gray-900 mb-3">Top Locations</h5>
                    <div className="space-y-2">
                      {['Downtown (45%)', 'North Side (25%)', 'East End (15%)', 'West District (10%)', 'Other (5%)'].map(location => (
                        <div key={location} className="flex justify-between text-sm">
                          <span>{location.split(' (')[0]}</span>
                          <span className="font-medium">{location.split(' (')[1]}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-900 mb-3">Popular Times</h5>
                    <div className="space-y-2">
                      {['Dinner (45%)', 'Lunch (35%)', 'Weekend Brunch (15%)', 'Late Night (5%)'].map(time => (
                        <div key={time} className="flex justify-between text-sm">
                          <span>{time.split(' (')[0]}</span>
                          <span className="font-medium">{time.split(' (')[1]}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MarketingSuite;