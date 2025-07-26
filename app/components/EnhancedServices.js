import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  BeakerIcon, 
  SparklesIcon, 
  CloudIcon, 
  ArrowRightIcon,
  ChartBarIcon 
} from '@heroicons/react/24/outline';

const EnhancedServices = () => {
  const services = [
    {
      id: 'soil-analysis',
      title: 'Soil Health Analysis',
      description: 'Advanced NPK analysis with real-time sensor data to determine optimal nutrient levels for healthier, more productive crops.',
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      icon: BeakerIcon,
      href: '/soilHealth',
      gradient: 'from-primary-500 to-secondary-500',
      bgGradient: 'from-primary-50 to-secondary-50',
      darkBgGradient: 'from-primary-900/20 to-secondary-900/20'
    },
    {
      id: 'fertilizer-recommendations',
      title: 'AI Fertilizer Engine',
      description: 'Machine learning-powered recommendations based on soil health, crop type, and weather patterns to maximize yield sustainably.',
      image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      icon: SparklesIcon,
      href: '/fertilizerType',
      gradient: 'from-secondary-500 to-accent-success',
      bgGradient: 'from-secondary-50 to-green-50',
      darkBgGradient: 'from-secondary-900/20 to-green-900/20'
    },
    {
      id: 'weather-integration',
      title: 'Smart Weather Integration',
      description: 'Real-time weather data integration with crop recommendations, delivering precise insights for optimal farming decisions.',
      image: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      icon: CloudIcon,
      href: '/weather',
      gradient: 'from-blue-500 to-primary-500',
      bgGradient: 'from-blue-50 to-primary-50',
      darkBgGradient: 'from-blue-900/20 to-primary-900/20'
    }
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-earth-50 via-white to-primary-50 dark:from-earth-900 dark:via-earth-800 dark:to-primary-900/20">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_theme(colors.primary.500)_1px,_transparent_0)] bg-[size:20px_20px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {/* Enhanced Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-medium mb-6">
            <ChartBarIcon className="w-4 h-4 mr-2" />
            Our Services
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-earth-900 dark:text-earth-100 mb-6">
            Comprehensive Solutions for{' '}
            <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              Modern Agriculture
            </span>
          </h2>
          <p className="text-xl text-earth-600 dark:text-earth-400 max-w-3xl mx-auto leading-relaxed">
            Discover our suite of intelligent farming tools designed to optimize your agricultural practices 
            and maximize sustainable yields.
          </p>
        </div>

        {/* Enhanced Service Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`group relative bg-white dark:bg-earth-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden hover:-translate-y-2 animate-fade-in`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Card Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.bgGradient} dark:${service.darkBgGradient} opacity-50`} />
              
              {/* Image Section */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${service.gradient} opacity-20 group-hover:opacity-30 transition-opacity duration-300`} />
                
                {/* Icon Overlay */}
                <div className="absolute top-6 left-6">
                  <div className={`p-3 bg-white/90 dark:bg-earth-800/90 rounded-xl shadow-lg backdrop-blur-sm`}>
                    <service.icon className={`w-6 h-6 bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent`} />
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="relative p-8">
                <h3 className="text-2xl font-bold text-earth-900 dark:text-earth-100 mb-4 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-earth-600 dark:text-earth-400 mb-6 leading-relaxed">
                  {service.description}
                </p>
                
                {/* CTA Button */}
                <Link href={service.href}>
                  <button className={`group/btn inline-flex items-center px-6 py-3 bg-gradient-to-r ${service.gradient} text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-primary-500/50`}>
                    <span>Explore Service</span>
                    <ArrowRightIcon className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </button>
                </Link>
              </div>

              {/* Hover Effect Border */}
              <div className={`absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary-200 dark:group-hover:border-primary-700 transition-colors duration-300`} />
            </div>
          ))}
        </div>

        {/* Call to Action Section */}
        <div className="text-center mt-16">
          <div className="inline-flex flex-col sm:flex-row gap-4">
            <Link href="/dashboard">
              <button className="px-8 py-4 bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-primary-500/50">
                View Dashboard
              </button>
            </Link>
            <Link href="/cropType">
              <button className="px-8 py-4 bg-white dark:bg-earth-800 text-primary-600 dark:text-primary-400 border-2 border-primary-500 font-semibold rounded-full hover:bg-primary-50 dark:hover:bg-earth-700 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-primary-500/50">
                Crop Recommendations
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedServices;