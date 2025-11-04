import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const Services = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredService, setHoveredService] = useState(null);
  const [activeFAQ, setActiveFAQ] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const servicesRef = useRef(null);
  const processRef = useRef(null);

  useEffect(() => {
    setIsVisible(true);
    
    // Intersection Observer for animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const observedElements = document.querySelectorAll('.observe-me');
    observedElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Random service images
  const getRandomImage = () => {
    const images = [
      '/images/service-1.jpg',
      '/images/service-2.jpg',
      '/images/service-3.jpg',
      '/images/service-4.jpg',
      '/images/service-5.jpg',
      '/images/service-6.jpg',
      '/images/consulting-1.jpg',
      '/images/consulting-2.jpg',
      '/images/support-1.jpg',
      '/images/training-1.jpg'
    ];
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
  };

  const serviceCategories = [
    { id: 'all', label: 'All Services', icon: '⭐', count: 8 },
    { id: 'implementation', label: 'Implementation', icon: '🚀', count: 3 },
    { id: 'support', label: 'Support', icon: '🔧', count: 2 },
    { id: 'consulting', label: 'Consulting', icon: '💼', count: 2 },
    { id: 'training', label: 'Training', icon: '🎓', count: 1 }
  ];

  const allServices = [
    {
      id: 'full-implementation',
      name: 'Full Platform Implementation',
      description: 'Complete setup and configuration of RestaurantPro platform tailored to your restaurant\'s specific needs.',
      icon: '🚀',
      category: 'implementation',
      color: 'from-blue-500 to-blue-600',
      features: ['Platform setup', 'Menu configuration', 'Staff training', 'Data migration', 'Custom branding'],
      duration: '2-4 weeks',
      price: 'Starting at $2,500',
      popular: true,
      image: getRandomImage(),
      benefits: ['Quick setup process', 'Minimal disruption', 'Expert configuration', 'Ongoing support']
    },
    {
      id: 'menu-digitalization',
      name: 'Menu Digitalization',
      description: 'Transform your paper menus into beautiful digital experiences with QR codes and online ordering.',
      icon: '📱',
      category: 'implementation',
      color: 'from-green-500 to-green-600',
      features: ['Digital menu design', 'QR code generation', 'Online ordering setup', 'Menu analytics'],
      duration: '1-2 weeks',
      price: 'Starting at $800',
      popular: true,
      image: getRandomImage(),
      benefits: ['Increase online orders', 'Reduce printing costs', 'Real-time updates', 'Customer analytics']
    },
    {
      id: 'inventory-setup',
      name: 'Inventory System Setup',
      description: 'Comprehensive inventory management system implementation with supplier integration and waste tracking.',
      icon: '📦',
      category: 'implementation',
      color: 'from-purple-500 to-purple-600',
      features: ['Inventory setup', 'Supplier database', 'Waste tracking', 'Automated ordering'],
      duration: '3-5 weeks',
      price: 'Starting at $1,200',
      popular: false,
      image: getRandomImage(),
      benefits: ['Reduce food waste', 'Optimize inventory', 'Save time', 'Cost savings']
    },
    {
      id: 'premium-support',
      name: 'Premium Support',
      description: '24/7 dedicated support with guaranteed response times and priority issue resolution.',
      icon: '🔧',
      category: 'support',
      color: 'from-orange-500 to-orange-600',
      features: ['24/7 phone support', '15-min response time', 'Dedicated support agent', 'Priority bug fixes'],
      duration: 'Ongoing',
      price: '$299/month',
      popular: true,
      image: getRandomImage(),
      benefits: ['Minimal downtime', 'Expert assistance', 'Quick resolutions', 'Peace of mind']
    },
    {
      id: 'technical-support',
      name: 'Technical Support',
      description: 'Standard technical support for platform issues and general troubleshooting.',
      icon: '💻',
      category: 'support',
      color: 'from-red-500 to-red-600',
      features: ['Email support', '4-hour response', 'Online resources', 'Community access'],
      duration: 'Ongoing',
      price: 'Included with platform',
      popular: false,
      image: getRandomImage(),
      benefits: ['Reliable support', 'Knowledge base', 'Community help', 'Cost-effective']
    },
    {
      id: 'business-consulting',
      name: 'Business Consulting',
      description: 'Strategic consulting to optimize your restaurant operations and maximize profitability.',
      icon: '💼',
      category: 'consulting',
      color: 'from-teal-500 to-teal-600',
      features: ['Operations audit', 'Profitability analysis', 'Process optimization', 'Growth strategy'],
      duration: 'Custom',
      price: '$150/hour',
      popular: false,
      image: getRandomImage(),
      benefits: ['Increase efficiency', 'Boost profits', 'Strategic insights', 'Competitive advantage']
    },
    {
      id: 'marketing-consulting',
      name: 'Marketing Consulting',
      description: 'Digital marketing strategy development and implementation for restaurant growth.',
      icon: '📢',
      category: 'consulting',
      color: 'from-yellow-500 to-yellow-600',
      features: ['Marketing strategy', 'Campaign setup', 'Social media management', 'Customer acquisition'],
      duration: 'Custom',
      price: '$125/hour',
      popular: true,
      image: getRandomImage(),
      benefits: ['Increase visibility', 'Grow customer base', 'Boost sales', 'Build brand']
    },
    {
      id: 'staff-training',
      name: 'Staff Training',
      description: 'Comprehensive training programs for your team to maximize platform utilization.',
      icon: '🎓',
      category: 'training',
      color: 'from-indigo-500 to-indigo-600',
      features: ['Group training sessions', 'Individual coaching', 'Training materials', 'Ongoing support'],
      duration: '1-3 days',
      price: 'Starting at $500',
      popular: false,
      image: getRandomImage(),
      benefits: ['Increase efficiency', 'Reduce errors', 'Boost confidence', 'Improve service']
    }
  ];

  const filteredServices = activeCategory === 'all' 
    ? allServices 
    : allServices.filter(service => service.category === activeCategory);

  const servicePackages = [
    {
      name: 'Essential',
      description: 'Perfect for getting started with basic implementation',
      price: '$1,500',
      features: [
        'Platform Setup',
        'Basic Training',
        'Email Support',
        'Menu Digitalization',
        '30-day Support'
      ],
      bestFor: 'Small restaurants & cafes',
      color: 'from-gray-500 to-gray-600',
      popular: false
    },
    {
      name: 'Professional',
      description: 'Comprehensive implementation with ongoing support',
      price: '$3,500',
      features: [
        'Full Platform Implementation',
        'Staff Training',
        'Premium Support (3 months)',
        'Menu Digitalization',
        'Inventory Setup',
        'Business Consulting (5 hours)',
        'Marketing Setup'
      ],
      bestFor: 'Growing restaurants',
      color: 'from-primary-500 to-primary-600',
      popular: true
    },
    {
      name: 'Enterprise',
      description: 'Complete transformation with dedicated support',
      price: '$7,500',
      features: [
        'Everything in Professional',
        'Dedicated Implementation Manager',
        'Premium Support (12 months)',
        'Custom Development',
        'Advanced Analytics Setup',
        'Business Consulting (20 hours)',
        'Marketing Strategy',
        'Staff Training Program'
      ],
      bestFor: 'Multi-location restaurants',
      color: 'from-purple-500 to-purple-600',
      popular: false
    }
  ];

  const processSteps = [
    {
      step: 1,
      title: 'Discovery & Assessment',
      description: 'We analyze your current operations and identify opportunities for improvement.',
      icon: '🔍',
      duration: '1-2 days',
      deliverables: ['Needs assessment', 'Implementation plan', 'Timeline']
    },
    {
      step: 2,
      title: 'Planning & Strategy',
      description: 'Develop a customized implementation strategy tailored to your restaurant.',
      icon: '📋',
      duration: '3-5 days',
      deliverables: ['Project roadmap', 'Resource allocation', 'Success metrics']
    },
    {
      step: 3,
      title: 'Implementation',
      description: 'Execute the plan with minimal disruption to your daily operations.',
      icon: '🚀',
      duration: '2-4 weeks',
      deliverables: ['Platform setup', 'Data migration', 'System configuration']
    },
    {
      step: 4,
      title: 'Training & Onboarding',
      description: 'Train your team to effectively use the new systems and processes.',
      icon: '🎓',
      duration: '1 week',
      deliverables: ['Staff training', 'Documentation', 'Support materials']
    },
    {
      step: 5,
      title: 'Optimization & Support',
      description: 'Continuous improvement and ongoing support to ensure long-term success.',
      icon: '🔧',
      duration: 'Ongoing',
      deliverables: ['Performance review', 'Optimization plan', 'Support access']
    }
  ];

  const stats = [
    { number: '500+', label: 'Successful Implementations', icon: '🏆', color: 'from-blue-500 to-blue-600' },
    { number: '98%', label: 'Client Satisfaction', icon: '😊', color: 'from-green-500 to-green-600' },
    { number: '24/7', label: 'Support Availability', icon: '🔧', color: 'from-orange-500 to-orange-600' },
    { number: '15min', label: 'Average Response Time', icon: '⏰', color: 'from-purple-500 to-purple-600' }
  ];

  const faqs = [
    {
      question: "How long does implementation typically take?",
      answer: "Implementation timelines vary based on your restaurant's size and complexity. Most implementations take 2-4 weeks from start to finish. We work efficiently to minimize disruption to your daily operations."
    },
    {
      question: "Do you offer ongoing support after implementation?",
      answer: "Yes! We offer various support packages ranging from basic email support to 24/7 premium support. All our implementation packages include at least 30 days of support, and you can choose to extend this based on your needs."
    },
    {
      question: "Can you work with our existing systems?",
      answer: "Absolutely. We have experience integrating with various POS systems, accounting software, and other restaurant management tools. During the discovery phase, we'll assess your current systems and create a seamless integration plan."
    },
    {
      question: "What training do you provide for our staff?",
      answer: "We provide comprehensive training tailored to different staff roles - from managers to servers and kitchen staff. Training includes hands-on sessions, detailed documentation, and ongoing support materials to ensure your team feels confident using the new system."
    },
    {
      question: "Do you offer custom development for unique needs?",
      answer: "Yes, we offer custom development services for restaurants with specific requirements not covered by our standard features. This includes custom integrations, specialized reporting, and unique workflow automations."
    }
  ];

  const caseStudies = [
    {
      restaurant: "Bella Italia",
      challenge: "Manual processes causing order errors and slow service",
      solution: "Full platform implementation with digital ordering",
      results: "45% faster service, 80% reduction in order errors",
      image: getRandomImage()
    },
    {
      restaurant: "Urban Grill",
      challenge: "Inefficient inventory management leading to food waste",
      solution: "Inventory system setup with automated ordering",
      results: "35% reduction in food waste, $12k annual savings",
      image: getRandomImage()
    },
    {
      restaurant: "Sushi Zen",
      challenge: "Low online presence and digital ordering",
      solution: "Menu digitalization and marketing consulting",
      results: "65% increase in online orders, 40% revenue growth",
      image: getRandomImage()
    }
  ];

  return (
    <div className="bg-white overflow-hidden">
      {/* Custom CSS for additional animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-in-left {
          0% { opacity: 0; transform: translateX(-30px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        @keyframes scale-in {
          0% { opacity: 0; transform: scale(0.8); }
          100% { opacity: 1; transform: scale(1); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; }
        .animate-slide-in-left { animation: slide-in-left 0.8s ease-out forwards; }
        .animate-scale-in { animation: scale-in 0.6s ease-out forwards; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
        
        .gradient-text {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .hover-lift {
          transition: all 0.3s ease;
        }
        .hover-lift:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }

        .image-placeholder {
          background: linear-gradient(45deg, #f3f4f6, #e5e7eb, #f3f4f6);
          background-size: 200% 200%;
          animation: shimmer 2s infinite;
        }

        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        .process-line {
          background: linear-gradient(180deg, #3b82f6, #8b5cf6, #ec4899);
          background-size: 100% 300%;
          animation: gradient 3s ease infinite;
        }

        @keyframes gradient {
          0%, 100% { background-position: 0% 0%; }
          50% { background-position: 0% 100%; }
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white py-32 overflow-hidden">
        {/* Enhanced Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="absolute top-0 left-0 w-96 h-96 bg-primary-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-96 h-96 bg-primary-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
          <div className="absolute bottom-20 right-20 w-48 h-48 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className={`transition-all duration-1000 transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            {/* Service Icon */}
            <div className="mb-8 flex justify-center">
              <div className="relative w-32 h-32 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center animate-float">
                <span className="text-4xl">🔧</span>
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Professional
              <span className="block bg-gradient-to-r from-white to-primary-200 bg-clip-text text-transparent">
                Services
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100 max-w-3xl mx-auto leading-relaxed">
              End-to-end implementation, support, and consulting services to transform your restaurant operations and drive growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#services-grid"
                className="group bg-white text-primary-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105"
              >
                Explore Services
              </a>
              <a
                href="#consultation"
                className="group border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-primary-600 transition-all duration-300 transform hover:scale-105"
              >
                Get Free Consultation
              </a>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 observe-me">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Proven Results for
              <span className="block gradient-text">Restaurants</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Trusted by hundreds of restaurants to deliver exceptional service and results
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="text-center group observe-me opacity-0"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`w-20 h-20 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center text-2xl text-white mb-4 mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  {stat.icon}
                </div>
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.number}
                </div>
                <div className="text-sm md:text-base text-gray-600 group-hover:text-primary-600 transition-colors duration-300">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services-grid" ref={servicesRef} className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 observe-me">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Comprehensive
              <span className="block bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
                Service Offerings
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From implementation to ongoing support, we have the services you need to succeed
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12 observe-me">
            {serviceCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center space-x-3 px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                  activeCategory === category.id
                    ? 'bg-primary-600 text-white shadow-lg scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span className="text-lg">{category.icon}</span>
                <span>{category.label}</span>
                <span className="bg-white/20 px-2 py-1 rounded-full text-xs">
                  {category.count}
                </span>
              </button>
            ))}
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service, index) => (
              <div
                key={service.id}
                className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl border-2 transition-all duration-500 transform hover:-translate-y-2 group opacity-0 observe-me ${
                  service.popular ? 'border-primary-200 ring-1 ring-primary-100' : 'border-white'
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
                onMouseEnter={() => setHoveredService(service.id)}
                onMouseLeave={() => setHoveredService(null)}
              >
                {service.popular && (
                  <div className="absolute -top-3 -right-3 z-10">
                    <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-pulse">
                      POPULAR
                    </span>
                  </div>
                )}

                {/* Service Image */}
                <div className="relative overflow-hidden rounded-t-2xl h-32 image-placeholder flex items-center justify-center">
                  <span className="text-3xl">{service.icon}</span>
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                </div>

                <div className="p-6">
                  <div className={`w-12 h-12 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center text-xl text-white mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    {service.icon}
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors duration-300">
                    {service.name}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 leading-relaxed text-sm">
                    {service.description}
                  </p>

                  <div className="space-y-2 mb-4">
                    {service.features.slice(0, 3).map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center text-sm text-gray-700">
                        <div className="w-2 h-2 bg-primary-500 rounded-full mr-3 flex-shrink-0"></div>
                        <span className="truncate">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Pricing & Duration */}
                  <div className="flex justify-between items-center mb-4 text-sm">
                    <span className="text-primary-600 font-semibold">{service.price}</span>
                    <span className="text-gray-500">{service.duration}</span>
                  </div>

                  {/* Benefits & CTA */}
                  <div className={`mt-4 pt-4 border-t border-gray-100 transition-all duration-300 ${
                    hoveredService === service.id ? 'opacity-100' : 'opacity-0'
                  }`}>
                    <div className="flex justify-between items-center text-xs text-gray-500 mb-2">
                      <span>⭐ {service.benefits.length} key benefits</span>
                    </div>
                    <Link
                      to="/contact"
                      className="w-full bg-primary-600 text-white py-2 px-4 rounded-xl font-semibold text-center block hover:bg-primary-700 transition-colors duration-300 transform hover:scale-105"
                    >
                      Get Started
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Packages */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 observe-me">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Complete Service
              <span className="block gradient-text">Packages</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Bundled services designed to meet the specific needs of different types of restaurants
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {servicePackages.map((pkg, index) => (
              <div
                key={index}
                className={`bg-white rounded-3xl p-8 relative transition-all duration-500 transform hover:scale-105 observe-me ${
                  pkg.popular ? 'ring-4 ring-primary-200 shadow-2xl' : 'shadow-lg'
                }`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                  <div className="flex items-baseline justify-center mb-2">
                    <span className="text-4xl font-bold text-gray-900">{pkg.price}</span>
                  </div>
                  <p className="text-gray-600 mb-2">{pkg.description}</p>
                  <p className="text-sm text-primary-600 font-semibold">{pkg.bestFor}</p>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button
                  onClick={() => setSelectedPackage(pkg.name)}
                  className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                    pkg.popular
                      ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-600 hover:to-primary-700 shadow-lg hover:shadow-xl'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  Select Package
                </button>
              </div>
            ))}
          </div>

          {selectedPackage && (
            <div className="mt-8 text-center observe-me animate-scale-in">
              <p className="text-gray-600 mb-4">
                Selected: <span className="font-semibold text-primary-600">{selectedPackage}</span>
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-700 transition-colors duration-300"
              >
                Proceed with {selectedPackage}
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Process Section */}
      <section ref={processRef} className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 observe-me">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our Proven
              <span className="block gradient-text">Process</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A structured approach to ensure successful implementation and maximum value
            </p>
          </div>

          <div className="relative">
            {/* Process Line */}
            <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 w-2 h-full process-line rounded-full"></div>
            
            <div className="space-y-12">
              {processSteps.map((step, index) => (
                <div
                  key={index}
                  className={`relative flex items-start md:items-center ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  } timeline-item opacity-0 observe-me`}
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  {/* Content */}
                  <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'} ml-16 md:ml-0`}>
                    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl flex items-center justify-center text-white text-lg font-bold mr-4">
                          {step.icon}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                          <p className="text-primary-600 text-sm">{step.duration}</p>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-4">{step.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {step.deliverables.map((deliverable, delIndex) => (
                          <span
                            key={delIndex}
                            className="bg-primary-100 text-primary-700 text-xs px-3 py-1 rounded-full"
                          >
                            {deliverable}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Step Number */}
                  <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 -translate-y-1/2 top-1/2">
                    <div className="w-16 h-16 bg-white border-4 border-primary-500 rounded-full flex items-center justify-center text-primary-600 font-bold text-xl shadow-lg">
                      {step.step}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 observe-me">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Success Stories</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              See how we've helped restaurants like yours achieve remarkable results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 observe-me"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="h-32 image-placeholder flex items-center justify-center">
                  <span className="text-3xl">🏆</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{study.restaurant}</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="font-semibold text-gray-700">Challenge:</span>
                      <p className="text-gray-600 mt-1">{study.challenge}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700">Solution:</span>
                      <p className="text-gray-600 mt-1">{study.solution}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700">Results:</span>
                      <p className="text-primary-600 font-semibold mt-1">{study.results}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 observe-me">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Get answers to common questions about our services</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden observe-me"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-200"
                  onClick={() => setActiveFAQ(activeFAQ === index ? null : index)}
                >
                  <span className="text-lg font-semibold text-gray-900">{faq.question}</span>
                  <svg
                    className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                      activeFAQ === index ? 'transform rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {activeFAQ === index && (
                  <div className="px-6 py-4 bg-gray-50 animate-fade-in-up">
                    <p className="text-gray-700">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section id="consultation" className="py-20 bg-gradient-to-r from-primary-600 to-primary-700 text-white relative overflow-hidden">
        {/* Enhanced Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black opacity-5"></div>
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full animate-float"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 bg-white/10 rounded-full animate-float animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/10 rounded-full animate-float animation-delay-4000"></div>
        </div>

        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Transform Your Restaurant?</h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Get a free consultation and discover how our services can help you achieve your goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-white text-primary-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105"
            >
              Get Free Consultation
            </Link>
            <Link
              to="/demo"
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-primary-600 transition-all duration-300 transform hover:scale-105"
            >
              View Service Details
            </Link>
          </div>
          
          {/* Additional trust element */}
          <div className="mt-8 text-primary-200">
            <p>✨ Free 30-minute consultation • No obligation • Expert advice</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;