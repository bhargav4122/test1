import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowUpRight, Phone, CheckCircle, Sparkles } from 'lucide-react';
import HolographicCard from './HolographicCard';

interface CTASectionProps {
  title?: string;
  description?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  benefits?: string[];
  theme?: 'blue' | 'purple' | 'green' | 'cyan' | 'gradient';
  layout?: 'default' | 'centered' | 'split';
  showParallax?: boolean;
}

export default function CTASection({
  title = "Ready to Transform Your Business?",
  description = "Let's discuss how our solutions can help you achieve your goals.",
  primaryButtonText = "Schedule Consultation",
  secondaryButtonText = "Contact Sales",
  benefits = [
    'Free 45-minute consultation',
    'Custom solution blueprint',
    'ROI assessment'
  ],
  theme = 'gradient',
  layout = 'default',
  showParallax = true
}: CTASectionProps) {
  // Theme-based gradient backgrounds
  const gradients = {
    blue: 'from-blue-600/20 via-blue-500/20 to-blue-600/20 dark:from-blue-600/20 dark:via-blue-500/20 dark:to-blue-600/20',
    purple: 'from-purple-600/20 via-purple-500/20 to-purple-600/20 dark:from-purple-600/20 dark:via-purple-500/20 dark:to-purple-600/20',
    green: 'from-emerald-600/20 via-emerald-500/20 to-emerald-600/20 dark:from-emerald-600/20 dark:via-emerald-500/20 dark:to-emerald-600/20',
    cyan: 'from-cyan-600/20 via-cyan-500/20 to-cyan-600/20 dark:from-cyan-600/20 dark:via-cyan-500/20 dark:to-cyan-600/20',
    gradient: 'from-blue-600/20 via-purple-600/20 to-blue-600/20 dark:from-blue-600/20 dark:via-purple-600/20 dark:to-blue-600/20'
  };

  // Theme-based button gradients
  const buttonGradients = {
    blue: 'from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800',
    purple: 'from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800',
    green: 'from-emerald-500 to-emerald-700 hover:from-emerald-600 hover:to-emerald-800',
    cyan: 'from-cyan-500 to-cyan-700 hover:from-cyan-600 hover:to-cyan-800',
    gradient: 'from-blue-500 to-purple-700 hover:from-blue-600 hover:to-purple-800'
  };

  // Theme-based text gradients
  const textGradients = {
    blue: 'from-blue-400 to-blue-600 dark:from-blue-400 dark:to-blue-600',
    purple: 'from-purple-400 to-purple-600 dark:from-purple-400 dark:to-purple-600',
    green: 'from-emerald-400 to-emerald-600 dark:from-emerald-400 dark:to-emerald-600',
    cyan: 'from-cyan-400 to-cyan-600 dark:from-cyan-400 dark:to-cyan-600',
    gradient: 'from-blue-400 to-purple-600 dark:from-blue-400 dark:to-purple-600'
  };

  return (
    <HolographicCard className="relative overflow-hidden bg-white dark:bg-gray-900">
      {/* Animated Background with Parallax */}
      <div className="absolute inset-0">
        <div 
          className={`absolute inset-0 bg-gradient-to-br ${gradients[theme]} animate-gradient`}
          style={showParallax ? {
            transform: 'translateZ(-10px)',
            transition: 'transform 0.3s ease-out'
          } : undefined}
        />
        
        {/* Animated Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <Sparkles
              key={i}
              className={`absolute text-gray-400/20 dark:text-white/10 animate-pulse`}
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                transform: `scale(${Math.random() * 0.5 + 0.5})`
              }}
            />
          ))}
        </div>
      </div>
      
      <div className="relative z-10 p-8 md:p-12">
        <div className={`max-w-4xl mx-auto ${layout === 'centered' ? 'text-center' : ''}`}>
          <div className={`
            ${layout === 'default' ? 'flex flex-col md:flex-row items-center justify-between gap-8' : ''}
            ${layout === 'centered' ? 'flex flex-col items-center' : ''}
            ${layout === 'split' ? 'grid md:grid-cols-2 gap-12' : ''}
          `}>
            {/* Content */}
            <div className={`${layout === 'default' ? 'text-center md:text-left flex-1' : ''}`}>
              <h2 className={`text-3xl md:text-4xl font-bold bg-gradient-to-r ${textGradients[theme]} bg-clip-text text-transparent mb-4`}>
                {title}
              </h2>
              <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-6 max-w-2xl">
                {description}
              </p>
              
              {/* Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Link 
                  to="/contact" 
                  className={`relative overflow-hidden bg-gradient-to-r ${buttonGradients[theme]} 
                    text-white px-8 py-4 rounded-lg transition-all duration-300 
                    focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2
                    group flex items-center justify-center w-full sm:w-auto text-lg shadow-lg hover:shadow-xl`}
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  <span>{primaryButtonText}</span>
                  <ArrowUpRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  
                  {/* Button Shine Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-20 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </Link>
                
                <Link 
                  to="/contact" 
                  className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors flex items-center justify-center w-full sm:w-auto px-8 py-4 text-lg group border border-gray-300 dark:border-gray-600 rounded-lg hover:border-gray-400 dark:hover:border-gray-500 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  <span>{secondaryButtonText}</span>
                  <ArrowUpRight className="ml-2 w-5 h-5 opacity-0 group-hover:opacity-100 transition-all transform translate-x-0 -translate-y-0 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </Link>
              </div>
            </div>
            
            {/* Benefits */}
            {layout !== 'centered' && (
              <div className="hidden lg:block border-l border-gray-200 dark:border-white/10 pl-8">
                <div className="flex flex-col gap-4">
                  {benefits.map((benefit, index) => (
                    <div 
                      key={index} 
                      className="flex items-center text-gray-700 dark:text-gray-300 group"
                      style={{
                        transform: showParallax ? `translateZ(${index * 5}px)` : undefined,
                        transition: 'transform 0.3s ease-out'
                      }}
                    >
                      <CheckCircle className={`w-5 h-5 ${
                        theme === 'blue' ? 'text-blue-500' :
                        theme === 'purple' ? 'text-purple-500' :
                        theme === 'green' ? 'text-emerald-500' :
                        theme === 'cyan' ? 'text-cyan-500' :
                        'text-blue-500'
                      } mr-3 transform group-hover:scale-110 transition-transform`} />
                      <span className="group-hover:text-gray-900 dark:group-hover:text-white transition-colors">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </HolographicCard>
  );
}