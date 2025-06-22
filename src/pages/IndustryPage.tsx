
import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle, ChevronRight, ArrowLeft } from 'lucide-react';
import HolographicCard from '../components/HolographicCard';
import { industriesData } from '../data/industriesData';
import CTASection from '../components/CTASection';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from '@/components/ui/button';

export default function IndustryPage() {
  const { industryId } = useParams<{ industryId: string }>();
  const industry = industryId ? industriesData[industryId] : null;
  const navigate = useNavigate();

  if (!industry) {
    return (
      <div className="container mx-auto px-4 py-16">
        <Navbar />
        <div className="text-center mt-24">
          <h1 className="text-4xl font-bold text-red-500">Industry not found</h1>
          <Link to="/industries" className="btn-future mt-8">Back to Industries</Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
     
      {/* Hero Section */}
      <div className="relative h-[400px] overflow-hidden mt-20">
        <div className="absolute inset-0">
          <img
            src={industry.heroImage}
            alt={industry.title}
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40" />
        </div>
        <div className="container mx-auto px-4 h-full flex items-center relative z-10">
          <div>
            <Button 
              variant="ghost" 
              onClick={() => navigate('/industries')}
              className="mb-6 text-white hover:bg-white/10 flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" /> Back to All Industries
            </Button>
            <h1 className="text-5xl text-white font-bold gradient-text mb-4">{industry.title}</h1>
            <p className="text-xl text-gray-300 max-w-2xl">{industry.description}</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Challenges Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Industry Challenges</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {industry.challenges.map((challenge, index) => (
                <HolographicCard key={index} className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center">
                  <CheckCircle className="h-6 w-6 text-blue-400 mr-3 flex-shrink-0"  />
               <span className="text-lg text-gray-900 dark:text-white">{challenge}</span>
                </div>
              </HolographicCard>
            ))}
          </div>
        </section>

        {/* Solutions Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold gradient-text mb-8">Our Solutions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {industry.solutions.map((solution, index) => (
             <HolographicCard key={index} className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{solution}</h3>
                
              </HolographicCard>
            ))}
          </div>
        </section>

        {/* Case Studies Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold gradient-text mb-8">Success Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industry.caseStudies.map((study, index) => (
              <HolographicCard key={index} className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{study.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">{study.description}</p>
                <div className="space-y-2">
                  {study.results.map((result, idx) => (
                    <div key={idx} className="flex items-center text-gray-700 dark:text-gray-300">
                      <ArrowRight className="h-4 w-4 text-blue-500 mr-2 flex-shrink-0" />
                      <span className="text-sm">{result}</span>
                    </div>
                  ))}
                </div>
              </HolographicCard>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <CTASection
          theme="purple"
          layout="split"
          title={`Transform Your ${industry.title}`}
          description="Let's discuss how our industry-specific solutions can help you overcome challenges and achieve your goals."
          primaryButtonText="Schedule Consultation"
          secondaryButtonText="Learn More"
          benefits={[
            'Industry-specific expertise',
            'Proven implementation methodology',
            'Continuous optimization'
          ]}
        />
      </div>
      
    </div>
  );
}