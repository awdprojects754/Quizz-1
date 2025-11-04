import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  const [activeTab, setActiveTab] = useState('story');
  const [isVisible, setIsVisible] = useState(false);
  const [activeMilestone, setActiveMilestone] = useState(0);
  const [hoveredTeam, setHoveredTeam] = useState(null);
  const statsRef = useRef(null);
  const teamRef = useRef(null);
  const timelineRef = useRef(null);

  useEffect(() => {
    setIsVisible(true);
    
    // Auto rotate milestones
    const milestoneInterval = setInterval(() => {
      setActiveMilestone(prev => (prev + 1) % milestones.length);
    }, 4000);

    // Intersection Observer for animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
            if (entry.target.classList.contains('timeline-item')) {
              entry.target.classList.add('animate-slide-in');
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const observedElements = document.querySelectorAll('.observe-me, .timeline-item');
    observedElements.forEach(el => observer.observe(el));

    return () => {
      clearInterval(milestoneInterval);
      observer.disconnect();
    };
  }, []);

  // Fixed image placeholders with emojis
  const getRandomEmoji = () => {
    const emojis = ['🏢', '👥', '💻', '📊', '🚀', '🌟', '🎯', '💡'];
    const randomIndex = Math.floor(Math.random() * emojis.length);
    return emojis[randomIndex];
  };

  const stats = [
    { number: '500+', label: 'Restaurants Transformed', icon: '🏪', color: 'from-blue-500 to-blue-600' },
    { number: '10K+', label: 'Daily Orders Processed', icon: '📦', color: 'from-green-500 to-green-600' },
    { number: '98%', label: 'Customer Satisfaction', icon: '⭐', color: 'from-yellow-500 to-yellow-600' },
    { number: '15+', label: 'Hours Saved Weekly', icon: '⏰', color: 'from-purple-500 to-purple-600' },
    { number: '50+', label: 'Team Members', icon: '👥', color: 'from-red-500 to-red-600' },
    { number: '25+', label: 'Countries Served', icon: '🌍', color: 'from-indigo-500 to-indigo-600' }
  ];

  const values = [
    {
      icon: '🎯',
      title: 'Customer First',
      description: 'Everything we build is designed to solve real problems for restaurant owners.',
      color: 'from-blue-500 to-blue-600',
      image: getRandomEmoji()
    },
    {
      icon: '🚀',
      title: 'Innovation',
      description: 'We constantly evolve our platform with the latest technology and features.',
      color: 'from-green-500 to-green-600',
      image: getRandomEmoji()
    },
    {
      icon: '🤝',
      title: 'Partnership',
      description: 'We work closely with our customers to ensure their success is our success.',
      color: 'from-purple-500 to-purple-600',
      image: getRandomEmoji()
    },
    {
      icon: '💡',
      title: 'Excellence',
      description: 'We strive for excellence in every feature, every update, every interaction.',
      color: 'from-orange-500 to-orange-600',
      image: getRandomEmoji()
    },
    {
      icon: '🔒',
      title: 'Security',
      description: 'Your data security and privacy are our top priorities.',
      color: 'from-teal-500 to-teal-600',
      image: getRandomEmoji()
    },
    {
      icon: '🌱',
      title: 'Sustainability',
      description: 'We build solutions that help restaurants reduce waste and operate sustainably.',
      color: 'from-emerald-500 to-emerald-600',
      image: getRandomEmoji()
    }
  ];

  const milestones = [
    { 
      year: '2020', 
      event: 'Company Founded', 
      description: 'Started with a vision to transform restaurant operations',
      icon: '🚀',
      image: getRandomEmoji(),
      achievements: ['First office space', 'Initial team of 5', 'First prototype']
    },
    { 
      year: '2021', 
      event: 'First 100 Restaurants', 
      description: 'Reached our first major milestone with 100 happy customers',
      icon: '🏆',
      image: getRandomEmoji(),
      achievements: ['Seed funding round', 'Mobile app launch', 'Team growth to 15']
    },
    { 
      year: '2022', 
      event: 'Mobile App Launch', 
      description: 'Expanded our platform with dedicated mobile applications',
      icon: '📱',
      image: getRandomEmoji(),
      achievements: ['iOS & Android apps', '500+ daily active users', 'New office space']
    },
    { 
      year: '2023', 
      event: '500+ Restaurants', 
      description: 'Grew our community to over 500 restaurant partners',
      icon: '📈',
      image: getRandomEmoji(),
      achievements: ['Series A funding', 'International expansion', '50+ team members']
    },
    { 
      year: '2024', 
      event: 'AI Features Launch', 
      description: 'Introduced AI-powered analytics and recommendations',
      icon: '🤖',
      image: getRandomEmoji(),
      achievements: ['AI menu optimization', 'Predictive analytics', 'Smart inventory']
    }
  ];

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      bio: 'Former restaurant owner with 15+ years in hospitality industry. Passionate about leveraging technology to solve real-world challenges.',
      image: '👩‍💼',
      social: { linkedin: '#', twitter: '#', email: '#' },
      expertise: ['Restaurant Operations', 'Business Strategy', 'Customer Experience'],
      funFact: 'Owned a Michelin-starred restaurant for 8 years',
      joinDate: '2020',
      projects: 45
    },
    {
      name: 'Mike Chen',
      role: 'CTO',
      bio: 'Tech entrepreneur with a background in scalable SaaS platforms. Previously led engineering teams at multiple startups.',
      image: '👨‍💻',
      social: { linkedin: '#', twitter: '#', github: '#' },
      expertise: ['Software Architecture', 'AI/ML', 'Cloud Infrastructure'],
      funFact: 'Built his first restaurant app at 16',
      joinDate: '2020',
      projects: 38
    },
    {
      name: 'Emma Davis',
      role: 'Head of Product',
      bio: 'Product manager with expertise in SaaS solutions for SMEs. Focused on creating intuitive user experiences.',
      image: '👩‍🎨',
      social: { linkedin: '#', twitter: '#', dribbble: '#' },
      expertise: ['Product Strategy', 'UX Design', 'User Research'],
      funFact: 'Former professional chef turned tech enthusiast',
      joinDate: '2021',
      projects: 52
    },
   
  ];

  const tabs = [
    { id: 'story', label: 'Our Story', icon: '📖' },
    { id: 'mission', label: 'Mission & Vision', icon: '🎯' },
    { id: 'values', label: 'Our Values', icon: '💎' },
    { id: 'impact', label: 'Impact', icon: '🌍' }
  ];

  const awards = [
    { name: 'Best Restaurant Tech 2023', issuer: 'Tech Awards', icon: '🏆', year: '2023' },
    { name: 'Innovation Excellence', issuer: 'Hospitality Tech', icon: '💡', year: '2023' },
    { name: 'Customer Choice Award', issuer: 'Restaurant Association', icon: '⭐', year: '2024' },
    { name: 'Fastest Growing Startup', issuer: 'Business Weekly', icon: '🚀', year: '2024' }
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
        @keyframes slide-in-right {
          0% { opacity: 0; transform: translateX(30px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        @keyframes scale-in {
          0% { opacity: 0; transform: scale(0.8); }
          100% { opacity: 1; transform: scale(1); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; }
        .animate-slide-in-left { animation: slide-in-left 0.8s ease-out forwards; }
        .animate-slide-in-right { animation: slide-in-right 0.8s ease-out forwards; }
        .animate-scale-in { animation: scale-in 0.6s ease-out forwards; }
        .animate-slide-in { animation: slide-in-left 0.8s ease-out forwards; }
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

        .timeline-dot {
          transition: all 0.3s ease;
        }
        .timeline-dot:hover {
          transform: scale(1.2);
          box-shadow: 0 0 20px rgba(99, 102, 241, 0.5);
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
            {/* Company Logo/Image */}
            <div className="mb-8 flex justify-center">
              <div className="relative w-32 h-32 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center animate-float">
                <span className="text-4xl">🍽️</span>
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              About
              <span className="block bg-gradient-to-r from-white to-primary-200 bg-clip-text text-transparent">
                RestaurantPro
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100 max-w-3xl mx-auto leading-relaxed">
              We're revolutionizing the restaurant industry through innovative technology solutions 
              that empower owners and delight customers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="group bg-white text-primary-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105"
              >
                Join Our Journey
              </Link>
              <Link
                to="/features"
                className="group border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-primary-600 transition-all duration-300 transform hover:scale-105"
              >
                Explore Features
              </Link>
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

      {/* Enhanced Stats Section */}
      <section ref={statsRef} className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 observe-me">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              By The
              <span className="block gradient-text">Numbers</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our impact in the restaurant industry speaks for itself
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="text-center group observe-me opacity-0"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`w-20 h-20 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center text-2xl text-white mb-4 mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  {stat.icon}
                </div>
                <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-600 group-hover:text-primary-600 transition-colors duration-300 leading-relaxed">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Image Gallery Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 observe-me">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Behind The
              <span className="block gradient-text">Scenes</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A glimpse into our world at RestaurantPro
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 observe-me">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div key={item} className="relative group overflow-hidden rounded-2xl shadow-lg hover-lift">
                <div className="aspect-square image-placeholder rounded-2xl flex items-center justify-center">
                  <span className="text-3xl">{getRandomEmoji()}</span>
                </div>
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white text-sm font-semibold">RestaurantPro Team</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Tabs Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 observe-me">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our Journey of
              <span className="block bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
                Innovation
              </span>
            </h2>
          </div>

          {/* Tabs Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-12 observe-me">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-3 px-6 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                  activeTab === tab.id
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'
                }`}
              >
                <span className="text-xl">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 observe-me">
            {activeTab === 'story' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-6">Our Humble Beginnings</h3>
                  <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
                    <p>
                      RestaurantPro was born from a simple observation: while technology has transformed many industries, 
                      most restaurants still rely on outdated, disconnected systems to manage their operations.
                    </p>
                    <p>
                      Our founder, Sarah Johnson, experienced these challenges firsthand while running her own restaurant. 
                      She saw how manual processes, paper-based systems, and multiple disconnected tools were holding back 
                      restaurant owners from focusing on what they do best - creating amazing dining experiences.
                    </p>
                    <p>
                      Today, RestaurantPro brings together everything a restaurant needs into one seamless platform - 
                      from menu management and order tracking to inventory control and customer analytics.
                    </p>
                  </div>
                </div>
                <div className="relative">
                  <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl p-8 text-white text-center transform hover:scale-105 transition-transform duration-500">
                    <div className="text-6xl mb-4">🍽️</div>
                    <h4 className="text-2xl font-bold mb-2">From Restaurant to Tech</h4>
                    <p className="text-primary-100">
                      Built by restaurant owners, for restaurant owners
                    </p>
                  </div>
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-white animate-pulse">
                    ⭐
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'mission' && (
              <div className="text-center">
                <div className="max-w-4xl mx-auto">
                  <h3 className="text-3xl font-bold text-gray-900 mb-8">Our Mission & Vision</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-primary-50 rounded-2xl p-8 transform hover:scale-105 transition-transform duration-300">
                      <div className="text-4xl mb-4">🎯</div>
                      <h4 className="text-xl font-bold text-gray-900 mb-3">Our Mission</h4>
                      <p className="text-gray-600">
                        To empower restaurant owners with technology that simplifies operations, 
                        enhances customer experiences, and drives sustainable business growth.
                      </p>
                    </div>
                    <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl p-8 text-white transform hover:scale-105 transition-transform duration-300">
                      <div className="text-4xl mb-4">🔭</div>
                      <h4 className="text-xl font-bold mb-3">Our Vision</h4>
                      <p className="text-primary-100">
                        To become the operating system for every restaurant worldwide, 
                        enabling them to thrive in the digital age.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'values' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {values.map((value, index) => (
                  <div
                    key={index}
                    className="bg-white border-2 border-gray-100 rounded-2xl p-6 text-center hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group"
                  >
                    <div className="relative overflow-hidden rounded-xl mb-4 h-32 image-placeholder flex items-center justify-center">
                      <span className="text-3xl">{value.image}</span>
                      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                    </div>
                    <div className={`w-12 h-12 bg-gradient-to-r ${value.color} rounded-2xl flex items-center justify-center text-xl text-white mb-3 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                      {value.icon}
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'impact' && (
              <div className="text-center">
                <h3 className="text-3xl font-bold text-gray-900 mb-8">Making a Difference</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-green-50 rounded-2xl p-6 transform hover:scale-105 transition-transform duration-300">
                    <div className="text-4xl mb-4">💰</div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">Increased Revenue</h4>
                    <p className="text-gray-600 text-sm">Average 35% revenue growth for our partners</p>
                  </div>
                  <div className="bg-blue-50 rounded-2xl p-6 transform hover:scale-105 transition-transform duration-300">
                    <div className="text-4xl mb-4">⏱️</div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">Time Saved</h4>
                    <p className="text-gray-600 text-sm">15+ hours weekly saved on administrative tasks</p>
                  </div>
                  <div className="bg-purple-50 rounded-2xl p-6 transform hover:scale-105 transition-transform duration-300">
                    <div className="text-4xl mb-4">😊</div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">Happy Customers</h4>
                    <p className="text-gray-600 text-sm">98% customer satisfaction rate</p>
                  </div>
                  <div className="bg-orange-50 rounded-2xl p-6 transform hover:scale-105 transition-transform duration-300">
                    <div className="text-4xl mb-4">🌱</div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">Waste Reduction</h4>
                    <p className="text-gray-600 text-sm">30% less food waste through smart inventory</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
{/* Enhanced Timeline Section */}
<section ref={timelineRef} className="py-24 bg-gradient-to-b from-gray-50 via-white to-gray-100 relative overflow-hidden">
  <div className="max-w-6xl mx-auto px-6">
    {/* Section Header */}
    <div className="text-center mb-20">
      <h2 className="text-5xl font-extrabold text-primary-700 tracking-tight mb-4 drop-shadow-sm">
        Our Journey Timeline
      </h2>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        A glimpse into how we evolved from a small dream to an industry leader.
      </p>
    </div>

    {/* Vertical Line */}
    <div className="relative">
      <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-primary-400 via-primary-500 to-primary-700 h-full rounded-full"></div>

      <div className="space-y-20 relative z-10">
        {milestones.map((milestone, index) => (
          <div
            key={index}
            className={`relative flex flex-col lg:flex-row items-center lg:items-start ${
              index % 2 === 0 ? 'lg:justify-start' : 'lg:justify-end'
            }`}
          >
            {/* Connector Curve */}
            <div
              className={`hidden lg:block absolute top-1/2 w-32 h-32 border-t-4 border-primary-300 rounded-full transform ${
                index % 2 === 0
                  ? '-translate-x-[75%] -translate-y-[50%] border-r-4 left-1/2'
                  : 'translate-x-[75%] -translate-y-[50%] border-l-4 right-1/2'
              }`}
            ></div>

            {/* Timeline Card */}
            <div
              className={`relative w-full lg:w-5/12 p-8 rounded-3xl shadow-xl transition-all duration-500 hover:scale-[1.04] hover:shadow-2xl bg-white border border-gray-100 ${
                index % 2 === 0 ? 'lg:mr-auto lg:pr-10' : 'lg:ml-auto lg:pl-10'
              }`}
            >
              <div className="flex items-center mb-5">
                <div className="w-14 h-14 flex items-center justify-center bg-gradient-to-r from-primary-500 to-primary-700 text-white text-2xl rounded-xl shadow-md mr-4">
                  {milestone.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{milestone.event}</h3>
                  <p className="text-primary-600 font-semibold text-sm">{milestone.year}</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4 leading-relaxed">{milestone.description}</p>
              <div className="flex flex-wrap gap-2">
                {milestone.achievements.map((achievement, achIndex) => (
                  <span
                    key={achIndex}
                    className="bg-primary-100 text-primary-700 text-xs px-3 py-1 rounded-full font-medium shadow-sm"
                  >
                    {achievement}
                  </span>
                ))}
              </div>
            </div>

            {/* Center Dot */}
            <div className="absolute left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-primary-600 to-primary-700 w-7 h-7 rounded-full border-4 border-white shadow-md"></div>

            {/* Year Badge */}
            <div
              className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-8`}
            >
              <div className="bg-white border border-primary-300 shadow-md text-primary-700 px-4 py-1 rounded-full text-sm font-semibold backdrop-blur-sm hover:bg-primary-600 hover:text-white transition">
                {milestone.year}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>


      {/* Awards & Recognition Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 observe-me">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Awards & Recognition</h2>
            <p className="text-xl text-gray-600">Celebrating our achievements and industry recognition</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {awards.map((award, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 group"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {award.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{award.name}</h3>
                <p className="text-gray-600 text-sm mb-1">{award.issuer}</p>
                <p className="text-primary-600 font-semibold">{award.year}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Team Section */}
      <section ref={teamRef} className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 observe-me">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Amazing Team</h2>
            <p className="text-xl text-gray-600">The passionate people behind RestaurantPro</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group opacity-0 observe-me"
                style={{ animationDelay: `${index * 100}ms` }}
                onMouseEnter={() => setHoveredTeam(index)}
                onMouseLeave={() => setHoveredTeam(null)}
              >
                <div className="p-6 text-center">
                  <div className="relative mb-4">
                    <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center text-3xl text-white mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      {member.image}
                    </div>
                    {hoveredTeam === index && (
                      <div className="absolute -top-2 -right-2 bg-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm animate-scale-in">
                        ✓
                      </div>
                    )}
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-primary-600 font-semibold mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">{member.bio}</p>
                  
                  <div className="flex justify-center flex-wrap gap-2 mb-4">
                    {member.expertise.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="bg-primary-100 text-primary-700 text-xs px-3 py-1 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="border-t border-gray-100 pt-4 mt-4">
                    <p className="text-sm text-gray-500 mb-2">Fun Fact: {member.funFact}</p>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Since {member.joinDate}</span>
                      <span>{member.projects} projects</span>
                    </div>
                  </div>

                  <div className="flex justify-center space-x-4 mt-4">
                    {Object.entries(member.social).map(([platform, url], socialIndex) => (
                      <button
                        key={socialIndex}
                        className="text-gray-400 hover:text-primary-600 transition-colors duration-300 transform hover:scale-110"
                        title={platform}
                      >
                        <span className="text-lg">
                          {platform === 'linkedin' && '💼'}
                          {platform === 'twitter' && '🐦'}
                          {platform === 'github' && '💻'}
                          {platform === 'email' && '✉️'}
                          {platform === 'dribbble' && '🎨'}
                          {platform === 'instagram' && '📷'}
                          {platform === 'medium' && '📝'}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-700 text-white relative overflow-hidden">
        {/* Enhanced Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black opacity-5"></div>
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full animate-float"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 bg-white/10 rounded-full animate-float animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/10 rounded-full animate-float animation-delay-4000"></div>
        </div>

        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Join Our Story?</h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Be part of the revolution transforming the restaurant industry.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-white text-primary-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105"
            >
              Get Started Today
            </Link>
            <Link
              to="/careers"
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-primary-600 transition-all duration-300 transform hover:scale-105"
            >
              Join Our Team
            </Link>
          </div>
          
          {/* Additional trust element */}
          <div className="mt-8 text-primary-200">
            <p>✨ Trusted by 500+ restaurants worldwide • 98% satisfaction rate</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;