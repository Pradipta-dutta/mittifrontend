import React from 'react';
import Image from 'next/image';
import { 
  CpuChipIcon, 
  ClockIcon, 
  ChartBarIcon,
  ShieldCheckIcon,
  GlobeAltIcon,
  BoltIcon 
} from '@heroicons/react/24/outline';

const EnhancedFeatures = () => {
  const features = [
    {
      id: 'ai-powered',
      title: 'AI-Powered Intelligence',
      description: 'Advanced machine learning algorithms analyze your soil data and provide intelligent recommendations for optimal crop growth.',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      icon: CpuChipIcon,
      gradient: 'from-purple-500 to-primary-500',
      stats: '95% Accuracy'
    },
    {
      id: 'real-time',
      title: 'Real-Time Monitoring',
      description: 'Continuous monitoring of soil conditions, weather patterns, and crop health with instant alerts and updates.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      icon: ClockIcon,
      gradient: 'from-blue-500 to-secondary-500',
      stats: '24/7 Updates'
    },
    {
      id: 'data-insights',
      title: 'Comprehensive Analytics',
      description: 'Deep insights from comprehensive data analysis help you make informed decisions for sustainable farming practices.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      icon: ChartBarIcon,
      gradient: 'from-secondary-500 to-accent-success',
      stats: '10K+ Data Points'
    },
    {
      id: 'reliability',
      title: 'Proven Reliability',
      description: 'Trusted by thousands of farmers worldwide with consistent, accurate results that improve crop yields.',
      image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      icon: ShieldCheckIcon,
      gradient: 'from-green-500 to-primary-600',
      stats: '99.9% Uptime'
    },
    {
      id: 'global-reach',
      title: 'Global Weather Data',
      description: 'Access to worldwide weather data and climate patterns to optimize your farming strategies.',
      image: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      icon: GlobeAltIcon,
      gradient: 'from-cyan-500 to-blue-600',
      stats: 'Global Coverage'
    },
    {
      id: 'fast-processing',
      title: 'Lightning Fast',
      description: 'Rapid data processing and instant recommendations ensure you never miss critical farming windows.',
      image: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      icon: BoltIcon,
      gradient: 'from-yellow-500 to-orange-500',
      stats: '<1s Response'
    }
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-earth-900 dark:via-earth-800 dark:to-primary-900/20">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-200/20 dark:bg-primary-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary-200/20 dark:bg-secondary-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-medium mb-6">
            <BoltIcon className="w-4 h-4 mr-2" />
            Why Choose Mitti?
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-earth-900 dark:text-earth-100 mb-6">
            Cutting-Edge Features for{' '}
            <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              Smart Farming
            </span>
          </h2>
          <p className="text-xl text-earth-600 dark:text-earth-400 max-w-3xl mx-auto leading-relaxed">
            Discover the advanced capabilities that make Mitti the preferred choice for modern, 
            sustainable agriculture practices.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              className={`group relative bg-white/80 dark:bg-earth-800/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden hover:-translate-y-2 animate-fade-in border border-earth-200/50 dark:border-earth-700/50`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image Background */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-80 group-hover:opacity-90 transition-opacity duration-300`} />
                
                {/* Icon and Stats Overlay */}
                <div className="absolute inset-0 flex flex-col justify-between p-6">
                  <div className="flex justify-between items-start">
                    <div className="p-3 bg-white/20 backdrop-blur-md rounded-xl">
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-sm font-medium">
                      {feature.stats}
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-earth-900 dark:text-earth-100 mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-earth-600 dark:text-earth-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Hover Border Effect */}
              <div className={`absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary-200 dark:group-hover:border-primary-700 transition-colors duration-300`} />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer">
            <span>Experience All Features</span>
            <BoltIcon className="w-5 h-5 ml-2" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedFeatures;