import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { user } = useAuth();
  const [isVisible, setIsVisible] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activeFAQ, setActiveFAQ] = useState(null);
  const statsRef = useRef(null);
  const featuresRef = useRef(null);

  useEffect(() => {
    setIsVisible(true);

    // Auto rotate testimonials
    const testimonialInterval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(testimonialInterval);
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-in-up");
        }
      });
    }, observerOptions);

    const observedElements = document.querySelectorAll(".observe-me");
    observedElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const toggleFAQ = (index) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  // Fixed image placeholders with emojis
  const getRandomEmoji = () => {
    const emojis = ["🍕", "🍔", "🍟", "🌮", "🍣", "🍜", "☕", "🍰", "🥗", "🍝"];
    const randomIndex = Math.floor(Math.random() * emojis.length);
    return emojis[randomIndex];
  };

  const features = [
    {
      name: "Menu Management",
      description:
        "Create and manage your digital menu with real-time updates and pricing.",
      icon: "📋",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      image: getRandomEmoji(),
    },
    {
      name: "Order Tracking",
      description:
        "Real-time order management from kitchen to table with status updates.",
      icon: "🛒",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      image: getRandomEmoji(),
    },
    {
      name: "Inventory Control",
      description: "Track stock levels and get automatic low-stock alerts.",
      icon: "📦",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      image: getRandomEmoji(),
    },
    {
      name: "Staff Management",
      description: "Schedule shifts and track employee performance.",
      icon: "👥",
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      image: getRandomEmoji(),
    },
    {
      name: "Customer CRM",
      description:
        "Build customer relationships with loyalty programs and marketing.",
      icon: "💼",
      color: "from-red-500 to-red-600",
      bgColor: "bg-red-50",
      image: getRandomEmoji(),
    },
    {
      name: "Analytics & Reports",
      description: "Get insights into sales, profits, and customer behavior.",
      icon: "📊",
      color: "from-indigo-500 to-indigo-600",
      bgColor: "bg-indigo-50",
      image: getRandomEmoji(),
    },
  ];

  const stats = [
    { label: "Restaurants Using Our Platform", value: "500+", delay: "100" },
    { label: "Orders Processed Daily", value: "10,000+", delay: "200" },
    { label: "Customer Satisfaction", value: "98%", delay: "300" },
    { label: "Time Saved Weekly", value: "15+ hours", delay: "400" },
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Owner, Bistro Modern",
      content:
        "This platform revolutionized how we manage our restaurant. Orders are 40% faster and customer satisfaction has never been higher!",
      avatar: "👩‍💼",
      rating: 5,
      image: getRandomEmoji(),
    },
    {
      name: "Marcus Rodriguez",
      role: "Manager, Taqueria Central",
      content:
        "The inventory management alone saved us thousands in reduced waste. The analytics helped us optimize our menu for maximum profit.",
      avatar: "👨‍💼",
      rating: 5,
      image: getRandomEmoji(),
    },
    {
      name: "Emily Watson",
      role: "CEO, Urban Eats Group",
      content:
        "From staff scheduling to customer loyalty programs, this platform does it all. Our efficiency improved by 60% across all locations.",
      avatar: "👩‍💼",
      rating: 5,
      image: getRandomEmoji(),
    },
  ];

  const integrations = [
    { name: "Uber Eats", logo: "🚗", color: "from-green-500 to-green-600" },
    { name: "DoorDash", logo: "📦", color: "from-red-500 to-red-600" },
    { name: "Grubhub", logo: "🍔", color: "from-orange-500 to-orange-600" },
    { name: "Square", logo: "💳", color: "from-blue-500 to-blue-600" },
    { name: "QuickBooks", logo: "📊", color: "from-teal-500 to-teal-600" },
    { name: "Slack", logo: "💬", color: "from-purple-500 to-purple-600" },
  ];

  const pricingPlans = [
    {
      name: "Starter",
      price: "$49",
      period: "/month",
      description: "Perfect for small restaurants and cafes",
      features: [
        "Menu Management",
        "Basic Order Tracking",
        "Email Support",
        "Up to 2 staff accounts",
        "Basic Analytics",
      ],
      popular: false,
      color: "from-gray-500 to-gray-600",
    },
    {
      name: "Professional",
      price: "$99",
      period: "/month",
      description: "Ideal for growing restaurants",
      features: [
        "Everything in Starter",
        "Advanced Inventory",
        "Staff Management",
        "Phone & Email Support",
        "Up to 10 staff accounts",
        "Advanced Analytics",
        "CRM Features",
      ],
      popular: true,
      color: "from-primary-500 to-primary-600",
    },
    {
      name: "Enterprise",
      price: "$199",
      period: "/month",
      description: "For multi-location restaurants",
      features: [
        "Everything in Professional",
        "Multi-location Support",
        "Custom Integrations",
        "24/7 Priority Support",
        "Unlimited staff accounts",
        "Custom Reporting",
        "Dedicated Account Manager",
      ],
      popular: false,
      color: "from-purple-500 to-purple-600",
    },
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={i < rating ? "text-yellow-400" : "text-gray-300"}
      >
        ★
      </span>
    ));
  };

  return (
    <div className="bg-white overflow-hidden">
      {/* Custom CSS for additional animations */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slide-in-left {
          0% {
            opacity: 0;
            transform: translateX(-30px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slide-in-right {
          0% {
            opacity: 0;
            transform: translateX(30px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        .animate-slide-in-left {
          animation: slide-in-left 0.8s ease-out forwards;
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.8s ease-out forwards;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }

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
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }

        .food-image-placeholder {
          background: linear-gradient(45deg, #f3f4f6, #e5e7eb, #f3f4f6);
          background-size: 200% 200%;
          animation: shimmer 2s infinite;
        }

        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white overflow-hidden">
        {/* Enhanced Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="absolute top-0 left-0 w-72 h-72 bg-primary-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-0 right-0 w-72 h-72 bg-primary-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-primary-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
          <div className="absolute bottom-20 right-20 w-48 h-48 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div
            className={`transition-all duration-1000 transform ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            {/* Restaurant Image */}
            <div className="mb-8 flex justify-center">
              <div className="relative w-32 h-32 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center animate-float">
                <span className="text-4xl">🍽️</span>
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Transform Your
              <span className="block bg-gradient-to-r from-white to-primary-200 bg-clip-text text-transparent">
                Restaurant
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100 max-w-3xl mx-auto leading-relaxed">
              All-in-one platform to manage orders, inventory, staff, and grow
              your restaurant business efficiently.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {user ? (
                <Link
                  to="/dashboard"
                  className="group bg-white text-primary-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105"
                >
                  <span className="flex items-center">
                    Go to Dashboard
                    <svg
                      className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      ></path>
                    </svg>
                  </span>
                </Link>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="group bg-white text-primary-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105"
                  >
                    <span className="flex items-center">
                      Start Free Trial
                      <svg
                        className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        ></path>
                      </svg>
                    </span>
                  </Link>
                  <Link
                    to="/demo"
                    className="group border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-primary-600 transition-all duration-300 transform hover:scale-105"
                  >
                    View Live Demo
                  </Link>
                </>
              )}
            </div>

            {/* Trust badges */}
            <div className="mt-12 flex flex-col items-center">
              <p className="text-primary-200 mb-4">
                Trusted by 500+ restaurants worldwide
              </p>
              <div className="flex flex-wrap justify-center gap-6 opacity-80">
                {["⭐️⭐️⭐️⭐️⭐️", "🏆 Top Rated", "💯 Recommended"].map(
                  (badge, index) => (
                    <span
                      key={index}
                      className="text-sm bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm"
                    >
                      {badge}
                    </span>
                  )
                )}
              </div>
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

      {/* Image Gallery Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 observe-me">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Beautiful Restaurants
              <span className="block gradient-text">Using Our Platform</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              See how restaurants worldwide are transforming their operations
              with our platform
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 observe-me">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div
                key={item}
                className="relative group overflow-hidden rounded-2xl shadow-lg hover-lift"
              >
                <div className="aspect-square food-image-placeholder rounded-2xl flex items-center justify-center">
                  <span className="text-4xl">{getRandomEmoji()}</span>
                </div>
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section
        ref={statsRef}
        className="py-20 bg-gradient-to-b from-gray-50 to-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center group observe-me"
                style={{ animationDelay: `${stat.delay}ms` }}
              >
                <div className="relative inline-block">
                  <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2 group-hover:scale-110 transition-transform duration-300">
                    {stat.value}
                  </div>
                  <div className="absolute -inset-2 bg-primary-100 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                </div>
                <div className="text-sm md:text-base text-gray-600 group-hover:text-primary-600 transition-colors duration-300">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 observe-me">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Everything You Need to
              <span className="block bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
                Succeed
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive tools designed specifically for restaurant owners
              and managers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl border border-gray-100 hover:border-primary-200 transition-all duration-500 transform hover:-translate-y-2 observe-me"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Feature Image */}
                <div className="relative overflow-hidden rounded-xl mb-6 h-48 food-image-placeholder flex items-center justify-center">
                  <span className="text-4xl">{feature.image}</span>
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                </div>

                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center text-2xl text-white mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors duration-300">
                  {feature.name}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <span className="text-primary-600 font-semibold group-hover:underline cursor-pointer flex items-center">
                    Learn more
                    <svg
                      className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      ></path>
                    </svg>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 observe-me">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Loved by
              <span className="block gradient-text">Restaurant Owners</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our customers have to
              say.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-2xl p-6 hover-lift transition-all duration-300 observe-me"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {testimonial.name}
                    </h4>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex mb-3">
                  {renderStars(testimonial.rating)}
                </div>
                <p className="text-gray-700 italic">"{testimonial.content}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 observe-me">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Works with Your
              <span className="block gradient-text">Favorite Tools</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Seamlessly integrate with the platforms you already use and love.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 observe-me">
            {integrations.map((integration, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-2xl p-6 flex items-center justify-center hover-lift border border-gray-200"
              >
                <div className="text-center">
                  <div
                    className={`w-12 h-12 bg-gradient-to-r ${integration.color} rounded-lg flex items-center justify-center text-white text-lg font-bold mb-2 mx-auto`}
                  >
                    {integration.logo}
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {integration.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-700 relative overflow-hidden">
        {/* Enhanced Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black opacity-5"></div>
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full animate-float"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 bg-white/10 rounded-full animate-float animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/10 rounded-full animate-float animation-delay-4000"></div>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Restaurant?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Join thousands of restaurants already using our platform to
            streamline their operations and grow their business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {user ? (
              <Link
                to="/dashboard"
                className="group bg-white text-primary-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105"
              >
                <span className="flex items-center justify-center">
                  Go to Dashboard
                  <svg
                    className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    ></path>
                  </svg>
                </span>
              </Link>
            ) : (
              <>
                <Link
                  to="/register"
                  className="group bg-white text-primary-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105"
                >
                  <span className="flex items-center justify-center">
                    Get Started Free
                    <svg
                      className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      ></path>
                    </svg>
                  </span>
                </Link>
                <Link
                  to="/contact"
                  className="group border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-primary-600 transition-all duration-300 transform hover:scale-105"
                >
                  Contact Sales
                </Link>
              </>
            )}
          </div>

          {/* Additional trust element */}
          <div className="mt-8 text-primary-200">
            <p>
              ✨ No credit card required • 14-day free trial • Setup in minutes
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
