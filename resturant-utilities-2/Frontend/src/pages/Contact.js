import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
    inquiryType: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [activeField, setActiveField] = useState(null);
  const formRef = useRef(null);

  const inquiryTypes = [
    { value: 'general', label: 'General Inquiry', icon: '💬' },
    { value: 'sales', label: 'Sales Question', icon: '💰' },
    { value: 'support', label: 'Technical Support', icon: '🔧' },
    { value: 'partnership', label: 'Partnership', icon: '🤝' },
    { value: 'demo', label: 'Request Demo', icon: '🎬' }
  ];

  const contactMethods = [
    {
      icon: '📧',
      title: 'Email Us',
      details: 'hello@restaurantpro.com',
      description: 'We respond within 2 hours during business hours',
      action: 'mailto:hello@restaurantpro.com',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: '📞',
      title: 'Call Us',
      details: '+1 (555) 123-4567',
      description: 'Mon-Fri from 9am to 6pm PST',
      action: 'tel:+15551234567',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: '💬',
      title: 'Live Chat',
      details: 'Start Chat Now',
      description: 'Instant help from our support team',
      action: '#chat',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: '🏢',
      title: 'Visit Our Office',
      details: '123 Innovation Drive, Suite 500',
      description: 'San Francisco, CA 94107',
      action: 'https://maps.google.com',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const faqs = [
    {
      question: 'How quickly do you respond to inquiries?',
      answer: 'We typically respond within 2 hours during business hours and within 24 hours maximum.'
    },
    {
      question: 'Do you offer custom solutions for large restaurants?',
      answer: 'Yes! We specialize in custom implementations for multi-location restaurant groups.'
    },
    {
      question: 'Is there a free trial available?',
      answer: 'Absolutely! We offer a 14-day free trial with full access to all features.'
    },
    {
      question: 'What kind of support do you provide?',
      answer: 'We provide 24/7 email support, live chat during business hours, and dedicated account management for enterprise clients.'
    }
  ];

  useEffect(() => {
    // Add intersection observer for animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.contact-card, .faq-item').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleFocus = (fieldName) => {
    setActiveField(fieldName);
  };

  const handleBlur = () => {
    setActiveField(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setSubmitStatus('success');
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      subject: '',
      message: '',
      inquiryType: 'general'
    });

    // Reset status after 5 seconds
    setTimeout(() => setSubmitStatus(null), 5000);
  };

  const getFieldClass = (fieldName) => {
    const baseClass = "w-full px-4 py-4 border-2 rounded-xl focus:outline-none transition-all duration-300 transform";
    
    if (activeField === fieldName) {
      return `${baseClass} border-primary-500 ring-4 ring-primary-100 scale-105`;
    }
    
    return `${baseClass} border-gray-300 focus:border-primary-500 focus:ring-4 focus:ring-primary-100`;
  };

  return (
    <div className="bg-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white py-32 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-primary-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-96 h-96 bg-primary-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Get In
            <span className="block bg-gradient-to-r from-white to-primary-200 bg-clip-text text-transparent">
              Touch
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-primary-100 max-w-3xl mx-auto leading-relaxed">
            Ready to transform your restaurant? Let's start the conversation. 
            Our team is here to help you succeed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#contact-form"
              className="group bg-white text-primary-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105"
            >
              Send Message
            </a>
            <a
              href="#contact-methods"
              className="group border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-primary-600 transition-all duration-300 transform hover:scale-105"
            >
              Other Ways to Connect
            </a>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section id="contact-methods" className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Multiple Ways to
              <span className="block bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
                Connect
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose the method that works best for you. We're here to help!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactMethods.map((method, index) => (
              <div
                key={index}
                className="contact-card bg-white rounded-2xl shadow-lg hover:shadow-2xl p-6 text-center group opacity-0 transition-all duration-500 transform hover:-translate-y-2"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${method.color} rounded-2xl flex items-center justify-center text-2xl text-white mb-4 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                  {method.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{method.title}</h3>
                <p className="text-gray-900 font-semibold mb-2">{method.details}</p>
                <p className="text-gray-600 text-sm mb-4">{method.description}</p>
                <a
                  href={method.action}
                  className="inline-block bg-primary-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary-700 transform hover:scale-105 transition-all duration-300"
                >
                  Connect
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact-form" className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Form Side */}
            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Send Us a Message</h2>
                <p className="text-gray-600">Fill out the form below and we'll get back to you within 2 hours</p>
              </div>

              {submitStatus === 'success' && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-6 animate-fade-in">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white mr-3">
                      ✓
                    </div>
                    <div>
                      <h4 className="font-semibold text-green-800">Message Sent Successfully!</h4>
                      <p className="text-green-700 text-sm">We'll get back to you within 2 hours.</p>
                    </div>
                  </div>
                </div>
              )}

              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                {/* Inquiry Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">What can we help you with?</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {inquiryTypes.map((type) => (
                      <button
                        key={type.value}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, inquiryType: type.value }))}
                        className={`p-3 rounded-xl border-2 text-center transition-all duration-300 transform hover:scale-105 ${
                          formData.inquiryType === type.value
                            ? 'border-primary-500 bg-primary-50 text-primary-700 scale-105'
                            : 'border-gray-300 text-gray-700 hover:border-primary-300'
                        }`}
                      >
                        <div className="text-lg mb-1">{type.icon}</div>
                        <div className="text-xs font-medium">{type.label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name & Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => handleFocus('name')}
                      onBlur={handleBlur}
                      className={getFieldClass('name')}
                      required
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => handleFocus('email')}
                      onBlur={handleBlur}
                      className={getFieldClass('email')}
                      required
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                {/* Phone & Company */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      onFocus={() => handleFocus('phone')}
                      onBlur={handleBlur}
                      className={getFieldClass('phone')}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      onFocus={() => handleFocus('company')}
                      onBlur={handleBlur}
                      className={getFieldClass('company')}
                      placeholder="Your restaurant name"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    onFocus={() => handleFocus('subject')}
                    onBlur={handleBlur}
                    className={getFieldClass('subject')}
                    required
                    placeholder="Brief summary of your inquiry"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                  <textarea
                    name="message"
                    rows="6"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => handleFocus('message')}
                    onBlur={handleBlur}
                    className={getFieldClass('message')}
                    required
                    placeholder="Tell us more about your needs and how we can help..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-primary-600 hover:to-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Sending Message...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </form>
            </div>

            {/* Info Side */}
            <div className="space-y-8">
              {/* Quick Stats */}
              <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-3xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Why Choose RestaurantPro?</h3>
                <div className="space-y-4">
                  {[
                    { stat: '2h', label: 'Average Response Time' },
                    { stat: '98%', label: 'Customer Satisfaction' },
                    { stat: '24/7', label: 'Support Available' },
                    { stat: '500+', label: 'Restaurants Helped' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center font-bold">
                        {item.stat}
                      </div>
                      <span className="font-medium">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* FAQ Section */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Quick Answers</h3>
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <div key={index} className="faq-item bg-gray-50 rounded-xl p-4 opacity-0">
                      <h4 className="font-semibold text-gray-900 mb-2">{faq.question}</h4>
                      <p className="text-gray-600 text-sm">{faq.answer}</p>
                    </div>
                  ))}
                </div>
                <Link
                  to="/help"
                  className="inline-block mt-4 text-primary-600 font-semibold hover:text-primary-700 transition-colors"
                >
                  View all FAQs →
                </Link>
              </div>

              {/* Support Hours */}
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Support Hours</h3>
                <div className="space-y-3">
                  {[
                    { day: 'Monday - Friday', hours: '9:00 AM - 6:00 PM PST' },
                    { day: 'Saturday', hours: '10:00 AM - 4:00 PM PST' },
                    { day: 'Sunday', hours: 'Emergency Support Only' }
                  ].map((schedule, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="font-medium">{schedule.day}</span>
                      <span className="text-primary-200">{schedule.hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-700 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Restaurant?</h2>
          <p className="text-xl text-primary-100 mb-8">
            Join thousands of restaurants already using our platform to streamline their operations and grow their business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/demo"
              className="bg-white text-primary-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105"
            >
              Schedule a Demo
            </Link>
            <a
              href="tel:+15551234567"
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-primary-600 transition-all duration-300 transform hover:scale-105"
            >
              Call Us Now
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;