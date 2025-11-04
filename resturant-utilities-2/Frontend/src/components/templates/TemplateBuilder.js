import React, { useState } from 'react';

const TemplateBuilder = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [customization, setCustomization] = useState({
    primaryColor: '#f97316',
    fontFamily: 'Inter',
    layout: 'modern',
    sections: ['menu', 'about', 'contact']
  });

  const templates = [
    {
      id: 1,
      name: 'Modern Bistro',
      description: 'Clean and contemporary design',
      image: '🛋️',
      category: 'Modern'
    },
    {
      id: 2,
      name: 'Classic Elegance',
      description: 'Traditional and sophisticated',
      image: '🏛️',
      category: 'Classic'
    },
    {
      id: 3,
      name: 'Rustic Charm',
      description: 'Warm and cozy atmosphere',
      image: '🪵',
      category: 'Rustic'
    },
    {
      id: 4,
      name: 'Minimalist',
      description: 'Simple and focused',
      image: '⚪',
      category: 'Minimal'
    }
  ];

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
  };

  const handleCustomizationChange = (key, value) => {
    setCustomization(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Website Templates</h2>
        <p className="text-gray-600">Choose and customize your restaurant website</p>
      </div>

      {/* Template Selection */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Select a Template</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {templates.map(template => (
            <div
              key={template.id}
              onClick={() => handleTemplateSelect(template)}
              className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                selectedTemplate?.id === template.id
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-200 hover:border-primary-300'
              }`}
            >
              <div className="text-4xl text-center mb-3">{template.image}</div>
              <h4 className="font-semibold text-gray-900 text-center">{template.name}</h4>
              <p className="text-sm text-gray-600 text-center mt-1">{template.description}</p>
              <div className="text-xs text-gray-500 text-center mt-2">{template.category}</div>
            </div>
          ))}
        </div>
      </div>

      {selectedTemplate && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Customize {selectedTemplate.name}
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Customization Options */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Primary Color
                </label>
                <input
                  type="color"
                  value={customization.primaryColor}
                  onChange={(e) => handleCustomizationChange('primaryColor', e.target.value)}
                  className="w-full h-10 rounded border border-gray-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Font Family
                </label>
                <select
                  value={customization.fontFamily}
                  onChange={(e) => handleCustomizationChange('fontFamily', e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="Inter">Inter</option>
                  <option value="Playfair Display">Playfair Display</option>
                  <option value="Roboto">Roboto</option>
                  <option value="Open Sans">Open Sans</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Website Sections
                </label>
                <div className="space-y-2">
                  {['menu', 'about', 'contact', 'gallery', 'reservations'].map(section => (
                    <label key={section} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={customization.sections.includes(section)}
                        onChange={(e) => {
                          const newSections = e.target.checked
                            ? [...customization.sections, section]
                            : customization.sections.filter(s => s !== section);
                          handleCustomizationChange('sections', newSections);
                        }}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="ml-2 text-sm text-gray-700 capitalize">{section}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Preview */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50">
              <div className="text-center text-gray-500 mb-4">Live Preview</div>
              <div 
                className="bg-white rounded shadow-sm p-4 mx-auto"
                style={{ 
                  maxWidth: '300px',
                  fontFamily: customization.fontFamily,
                  color: customization.primaryColor 
                }}
              >
                <div className="text-center font-bold text-xl mb-4">{selectedTemplate.name}</div>
                <div className="space-y-2 text-sm">
                  {customization.sections.map(section => (
                    <div key={section} className="text-center capitalize py-1 border-b">
                      {section}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
              Save as Draft
            </button>
            <button className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700">
              Publish Website
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplateBuilder;