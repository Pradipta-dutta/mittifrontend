import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRightIcon, PlayIcon, SparklesIcon, BeakerIcon, CloudIcon } from '@heroicons/react/24/outline';

const EnhancedHero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Enhanced Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1500595046743-ee5a8a800c31?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
          alt="Sustainable Agriculture - Thriving Crops"
          fill
          className="object-cover"
          priority
        />
        {/* Multi-layered gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/85 via-primary-800/70 to-secondary-800/75 dark:from-earth-900/90 dark:via-earth-800/85 dark:to-primary-900/80" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-primary-900/30" />
      </div>

      {/* Floating Animation Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary-400/20 rounded-full blur-xl animate-float" />
        <div className="absolute top-40 right-20 w-32 h-32 bg-secondary-400/20 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-40 left-20 w-24 h-24 bg-primary-300/20 rounded-full blur-xl animate-float" style={{ animationDelay: '4s' }} />
        <div className="absolute top-60 left-1/2 w-16 h-16 bg-accent-success/20 rounded-full blur-xl animate-bounce-gentle" style={{ animationDelay: '1s' }} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in">
          {/* Enhanced Badge */}
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-white/15 backdrop-blur-md border border-white/30 text-white text-sm font-medium mb-8 shadow-lg">
            <SparklesIcon className="w-4 h-4 mr-2 text-primary-300 animate-pulse-slow" />
            <span className="bg-gradient-to-r from-primary-300 to-secondary-300 bg-clip-text text-transparent font-semibold">
              Empowering Sustainable Agriculture
            </span>
          </div>

          {/* Enhanced Main Heading */}
          <h1 className="text-4xl sm:text-6xl lg:text-8xl font-display font-bold text-white mb-6 leading-tight">
            Grow Smarter,{' '}
            <span className="bg-gradient-to-r from-primary-300 via-secondary-300 to-primary-400 bg-clip-text text-transparent animate-pulse-slow">
              Sustainably
            </span>
            <br />
            <span className="text-3xl sm:text-4xl lg:text-6xl font-medium">
              with Mitti
            </span>
          </h1>

          {/* Enhanced Subtitle */}
          <p className="text-xl sm:text-2xl lg:text-3xl text-white/95 mb-8 max-w-4xl mx-auto leading-relaxed font-light">
            Revolutionary real-time soil analysis, AI-powered fertilizer recommendations, 
            and comprehensive crop health monitoring for the future of farming.
          </p>

          {/* Enhanced Feature Pills */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {[
              { icon: BeakerIcon, text: 'Real-time Soil Analysis' },
              { icon: SparklesIcon, text: 'AI Recommendations' },
              { icon: CloudIcon, text: 'Weather Integration' },
              { icon: ArrowRightIcon, text: 'Crop Health Reports' }
            ].map((feature, index) => (
              <div 
                key={feature.text} 
                className="flex items-center px-5 py-3 bg-white/15 backdrop-blur-md rounded-full border border-white/25 text-white text-sm font-medium shadow-lg hover:bg-white/20 transition-all duration-300 hover:scale-105"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <feature.icon className="w-4 h-4 mr-2 text-primary-300" />
                {feature.text}
              </div>
            ))}
          </div>

          {/* Enhanced CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Link href="/dashboard">
              <button className="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-semibold rounded-full shadow-2xl hover:shadow-primary-500/25 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-primary-500/50 min-w-[220px]">
                <span className="relative z-10">Get Started</span>
                <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-r from-primary-700 to-secondary-700 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            </Link>
            
            <button className="group inline-flex items-center px-8 py-4 bg-white/15 backdrop-blur-md border-2 border-white/30 text-white font-semibold rounded-full hover:bg-white/25 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white/25 min-w-[220px]">
              <PlayIcon className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
              Watch Demo
            </button>
          </div>

          {/* Enhanced Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              { value: '10K+', label: 'Farmers Helped', color: 'from-primary-400 to-primary-600' },
              { value: '95%', label: 'Accuracy Rate', color: 'from-secondary-400 to-secondary-600' },
              { value: '30%', label: 'Yield Increase', color: 'from-accent-success to-primary-500' },
              { value: '24/7', label: 'Monitoring', color: 'from-primary-500 to-secondary-500' }
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className={`text-4xl sm:text-5xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300`}>
                  {stat.value}
                </div>
                <div className="text-white/90 text-sm sm:text-base font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center backdrop-blur-sm">
          <div className="w-1 h-3 bg-white/80 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default EnhancedHero;