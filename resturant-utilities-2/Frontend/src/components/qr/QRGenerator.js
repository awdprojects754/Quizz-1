import React, { useState } from 'react';

const QRGenerator = () => {
  const [qrType, setQrType] = useState('menu');
  const [generatedQR, setGeneratedQR] = useState(null);
  const [qrData, setQrData] = useState({
    tableNumber: '',
    menuItem: '',
    feedbackUrl: ''
  });

  const menuItems = [
    { id: 1, name: 'Margherita Pizza' },
    { id: 2, name: 'Caesar Salad' },
    { id: 3, name: 'Garlic Bread' },
    { id: 4, name: 'Chocolate Cake' }
  ];

  const generateQRCode = () => {
    // In a real app, this would generate an actual QR code
    // For demo, we'll create a mock QR code
    const mockQR = {
      type: qrType,
      data: qrData,
      url: `https://restaurantpro.com/qr/${Date.now()}`,
      timestamp: new Date().toISOString()
    };
    setGeneratedQR(mockQR);
  };

  const downloadQR = () => {
    // Mock download functionality
    alert('QR Code downloaded! In a real app, this would download the QR image.');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">QR Code Generator</h2>
        <p className="text-gray-600">Create QR codes for menus, tables, and feedback</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* QR Configuration */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Generate QR Code</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                QR Code Type
              </label>
              <select
                value={qrType}
                onChange={(e) => setQrType(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="menu">Digital Menu</option>
                <option value="table">Table QR</option>
                <option value="feedback">Feedback Form</option>
                <option value="payment">Quick Payment</option>
              </select>
            </div>

            {qrType === 'table' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Table Number
                </label>
                <input
                  type="number"
                  value={qrData.tableNumber}
                  onChange={(e) => setQrData(prev => ({ ...prev, tableNumber: e.target.value }))}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Enter table number"
                />
              </div>
            )}

            {qrType === 'menu' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Menu Item (Optional)
                </label>
                <select
                  value={qrData.menuItem}
                  onChange={(e) => setQrData(prev => ({ ...prev, menuItem: e.target.value }))}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">All Menu</option>
                  {menuItems.map(item => (
                    <option key={item.id} value={item.id}>{item.name}</option>
                  ))}
                </select>
              </div>
            )}

            {qrType === 'feedback' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Custom Feedback URL
                </label>
                <input
                  type="url"
                  value={qrData.feedbackUrl}
                  onChange={(e) => setQrData(prev => ({ ...prev, feedbackUrl: e.target.value }))}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="https://your-restaurant.com/feedback"
                />
              </div>
            )}

            <button
              onClick={generateQRCode}
              className="w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700"
            >
              Generate QR Code
            </button>
          </div>
        </div>

        {/* QR Preview */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">QR Code Preview</h3>
          
          {generatedQR ? (
            <div className="text-center space-y-4">
              <div className="mx-auto w-48 h-48 bg-gray-200 flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300">
                <div className="text-center">
                  <div className="text-4xl mb-2">🔲</div>
                  <div className="text-sm text-gray-600">QR Code Preview</div>
                </div>
              </div>
              
              <div className="text-sm text-gray-600 space-y-1">
                <p><strong>Type:</strong> {generatedQR.type}</p>
                <p><strong>URL:</strong> {generatedQR.url}</p>
                <p><strong>Generated:</strong> {new Date(generatedQR.timestamp).toLocaleString()}</p>
              </div>

              <div className="flex space-x-3 justify-center">
                <button
                  onClick={downloadQR}
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                >
                  Download QR
                </button>
                <button
                  onClick={() => setGeneratedQR(null)}
                  className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
                >
                  Generate New
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔲</div>
              <p className="text-gray-500">Generate a QR code to see preview</p>
            </div>
          )}
        </div>
      </div>

      {/* Batch QR Generation */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Batch QR Generation</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-300 text-center">
            <div className="text-2xl mb-2">🍽️</div>
            <div className="font-medium">Table QR Codes</div>
            <div className="text-sm text-gray-600">Generate for all tables</div>
          </button>
          <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-300 text-center">
            <div className="text-2xl mb-2">📋</div>
            <div className="font-medium">Menu QR Codes</div>
            <div className="text-sm text-gray-600">Generate for menu categories</div>
          </button>
          <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-300 text-center">
            <div className="text-2xl mb-2">💬</div>
            <div className="font-medium">Feedback QR</div>
            <div className="text-sm text-gray-600">Generate feedback forms</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default QRGenerator;