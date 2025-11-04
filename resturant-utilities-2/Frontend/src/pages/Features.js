import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [isVisible, setIsVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [featuredPost, setFeaturedPost] = useState(null);
  const blogRef = useRef(null);
  const articlesRef = useRef(null);

  useEffect(() => {
    setIsVisible(true);
    
    // Set featured post
    setFeaturedPost(blogPosts[0]);

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

  // Fixed blog images - using reliable placeholder service
  const getBlogImage = (index) => {
    const images = [
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1467003909585-2f8a72700288?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    ];
    return images[index % images.length];
  };

  const blogCategories = [
    { id: 'all', label: 'All Articles', icon: '📚', count: 12 },
    { id: 'industry', label: 'Industry Trends', icon: '📈', count: 4 },
    { id: 'technology', label: 'Technology', icon: '💻', count: 3 },
    { id: 'marketing', label: 'Marketing', icon: '📢', count: 2 },
    { id: 'operations', label: 'Operations', icon: '⚙️', count: 2 },
    { id: 'tips', label: 'Tips & Tricks', icon: '💡', count: 1 }
  ];

  const blogPosts = [
    {
      id: 'future-restaurant-tech',
      title: 'The Future of Restaurant Technology: 5 Trends to Watch in 2024',
      excerpt: 'Discover how AI, automation, and contactless solutions are reshaping the restaurant industry and what it means for your business.',
      category: 'industry',
      author: 'Sarah Johnson',
      authorRole: 'Industry Analyst',
      readTime: '8 min read',
      publishDate: '2024-01-15',
      image: getBlogImage(0),
      featured: true,
      tags: ['Technology', 'Innovation', 'Future Trends'],
      content: 'Artificial Intelligence is no longer a futuristic concept—it\'s here and transforming how restaurants operate. From predictive ordering to personalized customer experiences, AI is set to revolutionize the industry...'
    },
    {
      id: 'ai-menu-optimization',
      title: 'How AI is Revolutionizing Menu Optimization and Pricing',
      excerpt: 'Learn how artificial intelligence can analyze customer data to optimize your menu items and maximize profitability.',
      category: 'technology',
      author: 'Mike Chen',
      authorRole: 'CTO',
      readTime: '6 min read',
      publishDate: '2024-01-12',
      image: getBlogImage(1),
      featured: false,
      tags: ['AI', 'Menu Management', 'Data Analytics'],
      content: 'Menu optimization has traditionally been more art than science, but AI is changing that. By analyzing order patterns, customer preferences, and ingredient costs...'
    },
    {
      id: 'reduce-food-waste',
      title: '10 Proven Strategies to Reduce Food Waste and Save Thousands',
      excerpt: 'Practical tips and technology solutions to minimize food waste in your restaurant while improving your bottom line.',
      category: 'operations',
      author: 'Emma Davis',
      authorRole: 'Operations Expert',
      readTime: '10 min read',
      publishDate: '2024-01-10',
      image: getBlogImage(2),
      featured: false,
      tags: ['Sustainability', 'Cost Saving', 'Inventory'],
      content: 'Food waste costs the restaurant industry billions annually. The good news is that with the right strategies and tools, you can significantly reduce waste while...'
    },
    {
      id: 'social-media-restaurant',
      title: 'Social Media Strategies That Actually Drive Restaurant Sales',
      excerpt: 'Effective social media tactics that convert followers into customers and increase your restaurant\'s visibility.',
      category: 'marketing',
      author: 'Lisa Rodriguez',
      authorRole: 'Marketing Director',
      readTime: '7 min read',
      publishDate: '2024-01-08',
      image: getBlogImage(3),
      featured: false,
      tags: ['Social Media', 'Marketing', 'Growth'],
      content: 'In today\'s digital age, a strong social media presence is crucial for restaurant success. But it\'s not just about posting pretty food photos...'
    },
    {
      id: 'contactless-dining',
      title: 'The Rise of Contactless Dining: What Customers Really Want',
      excerpt: 'Understanding customer preferences for contactless experiences and how to implement them effectively.',
      category: 'industry',
      author: 'David Wilson',
      authorRole: 'Customer Experience',
      readTime: '5 min read',
      publishDate: '2024-01-05',
      image: getBlogImage(4),
      featured: false,
      tags: ['Contactless', 'Customer Experience', 'Technology'],
      content: 'The pandemic accelerated the adoption of contactless technology, but customer expectations have evolved. Today\'s diners expect seamless digital experiences...'
    },
    {
      id: 'staff-retention',
      title: 'Improving Staff Retention in the Restaurant Industry',
      excerpt: 'Strategies to reduce turnover and create a positive work environment that keeps your team motivated.',
      category: 'operations',
      author: 'James Wilson',
      authorRole: 'HR Specialist',
      readTime: '9 min read',
      publishDate: '2024-01-03',
      image: getBlogImage(5),
      featured: false,
      tags: ['HR', 'Staff Management', 'Retention'],
      content: 'High staff turnover is one of the biggest challenges facing restaurants today. The costs of constantly hiring and training new employees can be staggering...'
    },
    {
      id: 'data-analytics',
      title: 'Leveraging Data Analytics for Smarter Restaurant Decisions',
      excerpt: 'How to use data insights to make informed decisions about menu items, pricing, and customer service.',
      category: 'technology',
      author: 'Mike Chen',
      authorRole: 'CTO',
      readTime: '6 min read',
      publishDate: '2024-01-02',
      image: getBlogImage(6),
      featured: false,
      tags: ['Analytics', 'Data', 'Business Intelligence'],
      content: 'Data is the new oil, and restaurants are sitting on a goldmine of valuable information. From sales patterns to customer preferences...'
    },
    {
      id: 'loyalty-programs',
      title: 'Creating Loyalty Programs That Actually Work',
      excerpt: 'Designing effective loyalty programs that keep customers coming back and increase lifetime value.',
      category: 'marketing',
      author: 'Lisa Rodriguez',
      authorRole: 'Marketing Director',
      readTime: '7 min read',
      publishDate: '2023-12-28',
      image: getBlogImage(7),
      featured: false,
      tags: ['Loyalty', 'CRM', 'Customer Retention'],
      content: 'A well-designed loyalty program can be the difference between one-time visitors and lifelong customers. But many restaurant loyalty programs fail because...'
    },
    {
      id: 'seasonal-menus',
      title: 'Mastering Seasonal Menu Changes: A Complete Guide',
      excerpt: 'Best practices for planning and executing successful seasonal menu updates that delight customers.',
      category: 'tips',
      author: 'Sarah Johnson',
      authorRole: 'Industry Analyst',
      readTime: '8 min read',
      publishDate: '2023-12-25',
      image: getBlogImage(0),
      featured: false,
      tags: ['Menu Planning', 'Seasonal', 'Best Practices'],
      content: 'Seasonal menu changes offer an excellent opportunity to keep your offerings fresh and exciting. However, they also present operational challenges...'
    },
    {
      id: 'sustainable-restaurant',
      title: 'Building a Sustainable Restaurant: Beyond the Basics',
      excerpt: 'Advanced sustainability practices that benefit both the environment and your bottom line.',
      category: 'industry',
      author: 'Emma Davis',
      authorRole: 'Operations Expert',
      readTime: '10 min read',
      publishDate: '2023-12-20',
      image: getBlogImage(1),
      featured: false,
      tags: ['Sustainability', 'Eco-friendly', 'Green'],
      content: 'Sustainability is no longer just a buzzword—it\'s a business imperative. Customers increasingly prefer restaurants that demonstrate environmental responsibility...'
    },
    {
      id: 'mobile-ordering',
      title: 'Optimizing Your Mobile Ordering Experience',
      excerpt: 'Key elements of a successful mobile ordering system that converts browsers into buyers.',
      category: 'technology',
      author: 'Mike Chen',
      authorRole: 'CTO',
      readTime: '5 min read',
      publishDate: '2023-12-18',
      image: getBlogImage(2),
      featured: false,
      tags: ['Mobile', 'Ordering', 'UX'],
      content: 'Mobile ordering has become table stakes in the restaurant industry. But not all mobile ordering experiences are created equal...'
    },
    {
      id: 'restaurant-metrics',
      title: 'The 7 Key Metrics Every Restaurant Owner Should Track',
      excerpt: 'Essential performance indicators that provide insights into your restaurant\'s health and opportunities.',
      category: 'tips',
      author: 'David Wilson',
      authorRole: 'Customer Experience',
      readTime: '8 min read',
      publishDate: '2023-12-15',
      image: getBlogImage(3),
      featured: false,
      tags: ['Metrics', 'Analytics', 'Performance'],
      content: 'You can\'t improve what you don\'t measure. While many restaurant owners track basic sales numbers, the most successful operators monitor a broader set of metrics...'
    }
  ];

  const filteredPosts = activeCategory === 'all' 
    ? blogPosts.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : blogPosts.filter(post => 
        post.category === activeCategory &&
        (post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
      );

  const featuredPosts = blogPosts.filter(post => post.featured);
  const recentPosts = blogPosts.slice(0, 4);
  const popularCategories = [
    { name: 'Technology', count: 8, icon: '💻' },
    { name: 'Operations', count: 12, icon: '⚙️' },
    { name: 'Marketing', count: 6, icon: '📢' },
    { name: 'Industry News', count: 15, icon: '📰' }
  ];

  const authors = [
    {
      name: 'Sarah Johnson',
      role: 'Industry Analyst',
      bio: '15+ years in restaurant industry analysis and consulting',
      articles: 24,
      image: '👩‍💼'
    },
    {
      name: 'Mike Chen',
      role: 'CTO',
      bio: 'Technology expert specializing in restaurant SaaS solutions',
      articles: 18,
      image: '👨‍💻'
    },
    {
      name: 'Emma Davis',
      role: 'Operations Expert',
      bio: 'Former restaurant owner turned operations consultant',
      articles: 16,
      image: '👩‍🎓'
    }
  ];

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

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

        .blog-card {
          transition: all 0.3s ease;
        }
        .blog-card:hover {
          transform: translateY(-5px);
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
            {/* Blog Icon */}
            <div className="mb-8 flex justify-center">
              <div className="relative w-32 h-32 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center animate-float">
                <span className="text-4xl">📝</span>
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              RestaurantPro
              <span className="block bg-gradient-to-r from-white to-primary-200 bg-clip-text text-transparent">
                Blog
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100 max-w-3xl mx-auto leading-relaxed">
              Industry insights, technology updates, and expert tips to help you grow and optimize your restaurant business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#featured"
                className="group bg-white text-primary-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105"
              >
                Read Latest Articles
              </a>
              <a
                href="#newsletter"
                className="group border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-primary-600 transition-all duration-300 transform hover:scale-105"
              >
                Subscribe to Newsletter
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

      {/* Featured Post Section */}
      {featuredPost && (
        <section id="featured" className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 observe-me">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Featured
                <span className="block gradient-text">Article</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Dive into our latest and most popular insights
              </p>
            </div>

            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden observe-me hover-lift">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Featured Image */}
                <div className="relative h-64 lg:h-full">
                  <img 
                    src={featuredPost.image} 
                    alt={featuredPost.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="absolute inset-0 image-placeholder flex items-center justify-center hidden">
                    <span className="text-4xl">📸</span>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Featured
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 lg:p-12">
                  <div className="flex items-center mb-4">
                    <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-semibold mr-3">
                      {blogCategories.find(cat => cat.id === featuredPost.category)?.label}
                    </span>
                    <span className="text-gray-500 text-sm">{featuredPost.readTime}</span>
                  </div>

                  <h3 className="text-3xl font-bold text-gray-900 mb-4">
                    {featuredPost.title}
                  </h3>

                  <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>

                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white text-lg font-bold mr-4">
                      {featuredPost.author.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{featuredPost.author}</p>
                      <p className="text-gray-500 text-sm">{featuredPost.authorRole}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {featuredPost.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <Link
                    to={`/blog/${featuredPost.id}`}
                    className="inline-flex items-center bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-700 transition-colors duration-300 transform hover:scale-105"
                  >
                    Read Full Article
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Blog Content Section */}
      <section ref={blogRef} className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Search and Filter Bar */}
              <div className="flex flex-col lg:flex-row gap-4 mb-8 observe-me">
                <div className="flex-1">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search articles..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full px-6 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                    />
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                      🔍
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {blogCategories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`flex items-center space-x-2 px-4 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
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
              </div>

              {/* Articles Grid */}
              <div ref={articlesRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredPosts.map((post, index) => (
                  <article
                    key={post.id}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 group opacity-0 observe-me blog-card"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {/* Post Image */}
                    <div className="relative overflow-hidden rounded-t-2xl h-48">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      <div className="absolute inset-0 image-placeholder flex items-center justify-center hidden">
                        <span className="text-3xl">📷</span>
                      </div>
                      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className="bg-primary-100 text-primary-700 px-2 py-1 rounded-full text-xs font-semibold">
                          {blogCategories.find(cat => cat.id === post.category)?.label}
                        </span>
                        <span className="text-gray-500 text-sm">{post.readTime}</span>
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors duration-300 line-clamp-2">
                        {post.title}
                      </h3>

                      <p className="text-gray-600 mb-4 leading-relaxed text-sm line-clamp-3">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white text-xs font-bold mr-3">
                            {post.author.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900">{post.author}</p>
                            <p className="text-gray-500 text-xs">{formatDate(post.publishDate)}</p>
                          </div>
                        </div>

                        <Link
                          to={`/blog/${post.id}`}
                          className="text-primary-600 hover:text-primary-700 font-semibold text-sm flex items-center"
                        >
                          Read
                          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {filteredPosts.length === 0 && (
                <div className="text-center py-12 observe-me">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">No articles found</h3>
                  <p className="text-gray-600">Try adjusting your search or filter criteria</p>
                </div>
              )}

              {/* Load More Button */}
              {filteredPosts.length > 0 && (
                <div className="text-center mt-12 observe-me">
                  <button className="bg-primary-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-primary-700 transition-colors duration-300 transform hover:scale-105">
                    Load More Articles
                  </button>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Newsletter Signup */}
              <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl p-6 text-white mb-8 observe-me">
                <div className="text-4xl mb-4">📧</div>
                <h3 className="text-xl font-bold mb-2">Stay Updated</h3>
                <p className="text-primary-100 text-sm mb-4">
                  Get the latest restaurant industry insights delivered to your inbox.
                </p>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
                  />
                  <button className="w-full bg-white text-primary-600 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors duration-300">
                    Subscribe
                  </button>
                </div>
              </div>

              {/* Popular Categories */}
              <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 observe-me">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Popular Categories</h3>
                <div className="space-y-3">
                  {popularCategories.map((category, index) => (
                    <button
                      key={index}
                      className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors duration-200"
                    >
                      <div className="flex items-center">
                        <span className="text-lg mr-3">{category.icon}</span>
                        <span className="font-semibold text-gray-900">{category.name}</span>
                      </div>
                      <span className="bg-primary-100 text-primary-700 px-2 py-1 rounded-full text-xs font-semibold">
                        {category.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Recent Posts */}
              <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 observe-me">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Posts</h3>
                <div className="space-y-4">
                  {recentPosts.map((post, index) => (
                    <div key={index} className="flex items-start space-x-3 group cursor-pointer">
                      <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
                        <img 
                          src={post.image} 
                          alt={post.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                        <div className="w-full h-full image-placeholder flex items-center justify-center hidden">
                          <span className="text-sm">📄</span>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 text-sm group-hover:text-primary-600 transition-colors duration-200 line-clamp-2">
                          {post.title}
                        </h4>
                        <p className="text-gray-500 text-xs mt-1">{formatDate(post.publishDate)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Meet Our Authors */}
              <div className="bg-white rounded-2xl shadow-lg p-6 observe-me">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Meet Our Authors</h3>
                <div className="space-y-4">
                  {authors.map((author, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white text-lg font-bold">
                        {author.image}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{author.name}</h4>
                        <p className="text-gray-500 text-sm">{author.role}</p>
                        <p className="text-primary-600 text-xs font-semibold">{author.articles} articles</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section id="newsletter" className="py-20 bg-gradient-to-r from-primary-600 to-primary-700 text-white relative overflow-hidden">
        {/* Enhanced Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black opacity-5"></div>
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full animate-float"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 bg-white/10 rounded-full animate-float animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/10 rounded-full animate-float animation-delay-4000"></div>
        </div>

        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Stay In the Loop</h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Join thousands of restaurant owners who receive our weekly insights and industry updates.
          </p>
          <div className="bg-white rounded-2xl p-2 max-w-md mx-auto observe-me">
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none rounded-xl"
              />
              <button className="bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-700 transition-colors duration-300 transform hover:scale-105 whitespace-nowrap">
                Subscribe Now
              </button>
            </div>
          </div>
          <p className="text-primary-200 text-sm mt-4">
            ✨ No spam, unsubscribe at any time
          </p>
        </div>
      </section>
    </div>
  );
};

export default Blog;