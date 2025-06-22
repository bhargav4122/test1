
import React, { useState } from 'react';
import ServiceCard from './ServiceCard';
import { getServicesByStatus, type ServiceStatus } from '@/lib/services';


const ServiceSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ServiceStatus>('active');
  
  const tabs: { id: ServiceStatus; label: string }[] = [
    { id: 'active', label: '✅ Active Services' },
    { id: 'pilot', label: '🚀 Pilot Services' },
    { id: 'development', label: '🧪 In Development' },
    { id: 'upcoming', label: '🔜 Upcoming Services' },
  ];
  
  const services = getServicesByStatus(activeTab);
  
  return (
    <section id="services" className="py-20 -50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
          <p className="text-lg text-gray-600">
            Comprehensive business and data solutions tailored to your specific needs.
            From data infrastructure to AI-powered insights, we've got you covered.
          </p>
        </div>
        

     




        {/* Service Tabs */}
        <div className="max-w-4xl mx-auto mb-8 overflow-x-auto">
          <div className="flex space-x-2 md:space-x-4 min-w-max p-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg transition-all ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-bds-purple to-bds-accent text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {services.map((service) => (
            <div key={service.id} className="animate-slide-up" style={{ animationDelay: `${service.id * 100}ms` }}>
              <ServiceCard service={service} 
                imageUrl={service.imageUrl}  // Pass the imageUrl from service data
                stats={service.stats}       // Pass the stats from service data
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;
