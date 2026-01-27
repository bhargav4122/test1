import React, { useRef } from 'react';
import SEO from '@/components/common/SEO';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';


// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Terms = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!containerRef.current) return;

    // Animate sections as they come into view
    const sections = containerRef.current.querySelectorAll('section');

    sections.forEach((section) => {
      gsap.from(section, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none none",
        }
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-muted/10">
      <SEO
        title="Terms of Service"
        description="Read our Terms of Service to understand the rules and regulations for using Business and Data Solutions' website and services."
        keywords="terms of service, terms and conditions, user agreement, legal terms"
      />


      <main className="flex-1 py-20" ref={containerRef}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-16 p-8 bg-background rounded-xl border border-muted shadow-sm"
          >
            <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
              Terms of Service
            </h1>
            <p className="text-muted-foreground text-lg">
              Last updated: {new Date().toLocaleDateString()}
            </p>
            <div className="mt-4 p-4 bg-muted/10 rounded-lg border border-muted/20">
              <p className="text-muted-foreground">
                By accessing and using DataSphere's services, you agree to these terms.
              </p>
            </div>
          </motion.div>

          {/* Acceptance of Terms */}
          <section className="mb-16 p-8 bg-background rounded-xl border border-muted shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center mb-6">
              <div className="h-10 w-10 mr-4 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold">1</div>
              <h2 className="text-3xl font-bold text-primary">Acceptance of Terms</h2>
            </div>
            <div className="space-y-4 text-lg leading-relaxed">
              <div className="p-6 bg-muted/10 rounded-lg border border-muted/20 flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-4 mt-1 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <p>
                  By accessing and using DataSphere's services, you accept and agree to be bound by the terms and provision of this agreement.
                </p>
              </div>
            </div>
          </section>

          {/* Use License */}
          <section className="mb-16 p-8 bg-background rounded-xl border border-muted shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center mb-6">
              <div className="h-10 w-10 mr-4 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 font-bold">2</div>
              <h2 className="text-3xl font-bold text-primary">Use License</h2>
            </div>
            <div className="space-y-4 text-lg leading-relaxed">
              <div className="p-6 bg-blue-50/30 rounded-lg border border-blue-100">
                <p className="mb-4">
                  Permission is granted to temporarily download one copy of DataSphere's materials for personal, non-commercial transitory viewing only.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-background rounded-lg border border-muted/30">
                    <h3 className="font-semibold text-blue-800 mb-2 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      Permitted Use
                    </h3>
                    <ul className="space-y-2 pl-2">
                      <li className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span>Personal, non-commercial use</span>
                      </li>
                      <li className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span>Temporary viewing</span>
                      </li>
                    </ul>
                  </div>
                  <div className="p-4 bg-background rounded-lg border border-muted/30">
                    <h3 className="font-semibold text-red-600 mb-2 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                      </svg>
                      Prohibited Use
                    </h3>
                    <ul className="space-y-2 pl-2">
                      <li className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        <span>Modify or copy materials</span>
                      </li>
                      <li className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        <span>Commercial use or public display</span>
                      </li>
                      <li className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        <span>Reverse engineer any software</span>
                      </li>
                      <li className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        <span>Remove copyright notices</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Service Availability */}
          <section className="mb-16 p-8 bg-background rounded-xl border border-muted shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center mb-6">
              <div className="h-10 w-10 mr-4 rounded-lg bg-green-100 flex items-center justify-center text-green-600 font-bold">3</div>
              <h2 className="text-3xl font-bold text-primary">Service Availability</h2>
            </div>
            <div className="space-y-4 text-lg leading-relaxed">
              <div className="p-6 bg-green-50/30 rounded-lg border border-green-100">
                <div className="flex items-start mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-4 mt-1 text-green-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p>
                      DataSphere strives to maintain 99.9% uptime but cannot guarantee uninterrupted service. We reserve the right to modify or discontinue services with reasonable notice.
                    </p>
                  </div>
                </div>
                <div className="mt-6 grid md:grid-cols-3 gap-4">
                  <div className="p-4 bg-background rounded-lg border border-muted/30">
                    <p className="font-medium text-sm text-muted-foreground mb-1">Uptime Goal</p>
                    <p className="text-2xl font-bold text-green-600">99.9%</p>
                  </div>
                  <div className="p-4 bg-background rounded-lg border border-muted/30">
                    <p className="font-medium text-sm text-muted-foreground mb-1">Maintenance</p>
                    <p className="text-lg">Scheduled with notice</p>
                  </div>
                  <div className="p-4 bg-background rounded-lg border border-muted/30">
                    <p className="font-medium text-sm text-muted-foreground mb-1">Support</p>
                    <p className="text-lg">24/7 monitoring</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Data Protection */}
          <section className="mb-16 p-8 bg-background rounded-xl border border-muted shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center mb-6">
              <div className="h-10 w-10 mr-4 rounded-lg bg-yellow-100 flex items-center justify-center text-yellow-600 font-bold">4</div>
              <h2 className="text-3xl font-bold text-primary">Data Protection</h2>
            </div>
            <div className="space-y-4 text-lg leading-relaxed">
              <div className="p-6 bg-yellow-50/30 rounded-lg border border-yellow-100">
                <div className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-4 mt-1 text-yellow-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <div>
                    <p className="mb-4">
                      We implement industry-standard security measures to protect your data. However, no method of transmission over the Internet is 100% secure.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-4 bg-background rounded-lg border border-muted/30">
                        <h3 className="font-semibold text-sm text-muted-foreground mb-1">Encryption</h3>
                        <p className="text-lg">TLS 1.2+</p>
                      </div>
                      <div className="p-4 bg-background rounded-lg border border-muted/30">
                        <h3 className="font-semibold text-sm text-muted-foreground mb-1">Data Centers</h3>
                        <p className="text-lg">Geo-redundant</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Limitation of Liability */}
          <section className="mb-16 p-8 bg-background rounded-xl border border-muted shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center mb-6">
              <div className="h-10 w-10 mr-4 rounded-lg bg-red-100 flex items-center justify-center text-red-600 font-bold">5</div>
              <h2 className="text-3xl font-bold text-primary">Limitation of Liability</h2>
            </div>
            <div className="space-y-4 text-lg leading-relaxed">
              <div className="p-6 bg-red-50/20 rounded-lg border border-red-100">
                <div className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-4 mt-1 text-red-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <div>
                    <p className="font-medium text-red-800 mb-2">Important Notice</p>
                    <p>
                      In no event shall DataSphere or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our website.
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-6 bg-background rounded-lg border border-muted/30 mt-4">
                <h3 className="font-semibold mb-3">Exclusions may include:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="mr-3 mt-1 text-red-500">•</span>
                    <span>Incidental or consequential damages</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 mt-1 text-red-500">•</span>
                    <span>Loss of data or profits</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 mt-1 text-red-500">•</span>
                    <span>Business interruption</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 mt-1 text-red-500">•</span>
                    <span>Unauthorized access to or use of your account</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Contact Information */}
          <section className="mb-16 p-8 bg-background rounded-xl border border-muted shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center mb-6">
              <div className="h-10 w-10 mr-4 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600 font-bold">6</div>
              <h2 className="text-3xl font-bold text-primary">Contact Information</h2>
            </div>
            <div className="space-y-4 text-lg leading-relaxed">
              <p className="p-4 bg-muted/10 rounded-lg border border-muted/20">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-background rounded-lg border border-muted/30">
                  <h3 className="font-semibold text-lg mb-4 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Legal Department
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 mt-0.5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span>legal@datasphere.com</span>
                    </li>
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 mt-0.5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span>+1 (555) 123-4567</span>
                    </li>
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 mt-0.5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>123 Tech Street, Silicon Valley, CA 94000</span>
                    </li>
                  </ul>
                </div>
                <div className="p-6 bg-background rounded-lg border border-muted/30">
                  <h3 className="font-semibold text-lg mb-4 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Office Hours
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Monday - Friday</span>
                      <span>9:00 AM - 5:00 PM PST</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Weekends</span>
                      <span>Closed</span>
                    </li>
                  </ul>
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                    <p className="text-sm text-blue-800">
                      For legal notices, please use certified mail and mark "Legal Department" on the envelope.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

    </div>
  );
};

export default Terms;
