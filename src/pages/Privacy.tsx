import React, { useRef } from 'react';
import SEO from '@/components/common/SEO';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';


// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Privacy = () => {
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
        title="Privacy Policy"
        description="Learn how Business and Data Solutions collects, uses, and protects your personal information. Your privacy is important to us."
        keywords="privacy policy, data protection, privacy notice, personal information security"
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
              Privacy Policy
            </h1>
            <p className="text-muted-foreground text-lg">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </motion.div>

          {/* Information We Collect */}
          <section className="mb-16 p-8 bg-background rounded-xl border border-muted shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center mb-6">
              <div className="h-10 w-10 mr-4 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold">1</div>
              <h2 className="text-3xl font-bold text-primary">Information We Collect</h2>
            </div>
            <div className="space-y-4 text-lg leading-relaxed">
              <p className="p-4 bg-muted/10 rounded-lg border border-muted/20">
                We collect information you provide directly to us, such as when you create an account, use our services, or contact us.
              </p>
              <ul className="space-y-3 pl-2">
                <li className="flex items-start p-4 bg-muted/10 rounded-lg border border-muted/20">
                  <span className="mr-3 mt-1 text-primary">•</span>
                  <span>Personal information (name, email, phone number)</span>
                </li>
                <li className="flex items-start p-4 bg-muted/10 rounded-lg border border-muted/20">
                  <span className="mr-3 mt-1 text-primary">•</span>
                  <span>Business information (company name, industry, role)</span>
                </li>
                <li className="flex items-start p-4 bg-muted/10 rounded-lg border border-muted/20">
                  <span className="mr-3 mt-1 text-primary">•</span>
                  <span>Usage data and analytics</span>
                </li>
                <li className="flex items-start p-4 bg-muted/10 rounded-lg border border-muted/20">
                  <span className="mr-3 mt-1 text-primary">•</span>
                  <span>Device and browser information</span>
                </li>
              </ul>
            </div>
          </section>

          {/* How We Use Your Information */}
          <section className="mb-16 p-8 bg-background rounded-xl border border-muted shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center mb-6">
              <div className="h-10 w-10 mr-4 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 font-bold">2</div>
              <h2 className="text-3xl font-bold text-primary">How We Use Your Information</h2>
            </div>
            <div className="space-y-4 text-lg leading-relaxed">
              <p className="p-4 bg-muted/10 rounded-lg border border-muted/20">
                We use the information we collect to:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50/50 rounded-lg border border-blue-100">
                  <h3 className="font-semibold text-blue-800 mb-2 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    Service Operations
                  </h3>
                  <p className="text-muted-foreground">Provide, maintain, and improve our services</p>
                </div>
                <div className="p-4 bg-blue-50/50 rounded-lg border border-blue-100">
                  <h3 className="font-semibold text-blue-800 mb-2 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                    </svg>
                    Transactions
                  </h3>
                  <p className="text-muted-foreground">Process transactions and send related information</p>
                </div>
                <div className="p-4 bg-blue-50/50 rounded-lg border border-blue-100">
                  <h3 className="font-semibold text-blue-800 mb-2 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
                    </svg>
                    Support
                  </h3>
                  <p className="text-muted-foreground">Send technical notices and support messages</p>
                </div>
                <div className="p-4 bg-blue-50/50 rounded-lg border border-blue-100">
                  <h3 className="font-semibold text-blue-800 mb-2 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    Communications
                  </h3>
                  <p className="text-muted-foreground">Communicate about products, services, and events</p>
                </div>
              </div>
            </div>
          </section>

          {/* Information Sharing */}
          <section className="mb-16 p-8 bg-background rounded-xl border border-muted shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center mb-6">
              <div className="h-10 w-10 mr-4 rounded-lg bg-green-100 flex items-center justify-center text-green-600 font-bold">3</div>
              <h2 className="text-3xl font-bold text-primary">Information Sharing</h2>
            </div>
            <div className="space-y-4 text-lg leading-relaxed">
              <div className="p-6 bg-green-50/30 rounded-xl border border-green-100 flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-4 mt-1 text-green-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <div>
                  <p className="font-medium text-green-800 mb-2">We respect your privacy</p>
                  <p className="text-muted-foreground">
                    We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Data Security */}
          <section className="mb-16 p-8 bg-background rounded-xl border border-muted shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center mb-6">
              <div className="h-10 w-10 mr-4 rounded-lg bg-yellow-100 flex items-center justify-center text-yellow-600 font-bold">4</div>
              <h2 className="text-3xl font-bold text-primary">Data Security</h2>
            </div>
            <div className="space-y-4 text-lg leading-relaxed">
              <div className="p-6 bg-yellow-50/30 rounded-xl border border-yellow-100">
                <div className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-4 mt-1 text-yellow-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <div>
                    <p className="font-medium mb-2">Enterprise-grade protection</p>
                    <p className="text-muted-foreground">
                      We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
                    </p>
                  </div>
                </div>
                <div className="mt-6 grid md:grid-cols-3 gap-4">
                  <div className="p-4 bg-background rounded-lg border border-muted/30">
                    <p className="font-medium text-sm text-muted-foreground mb-1">Encryption</p>
                    <p className="text-lg">AES-256</p>
                  </div>
                  <div className="p-4 bg-background rounded-lg border border-muted/30">
                    <p className="font-medium text-sm text-muted-foreground mb-1">Compliance</p>
                    <p className="text-lg">GDPR, CCPA</p>
                  </div>
                  <div className="p-4 bg-background rounded-lg border border-muted/30">
                    <p className="font-medium text-sm text-muted-foreground mb-1">Audits</p>
                    <p className="text-lg">Annual</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Your Rights */}
          <section className="mb-16 p-8 bg-background rounded-xl border border-muted shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center mb-6">
              <div className="h-10 w-10 mr-4 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600 font-bold">5</div>
              <h2 className="text-3xl font-bold text-primary">Your Rights</h2>
            </div>
            <div className="space-y-4 text-lg leading-relaxed">
              <p className="p-4 bg-muted/10 rounded-lg border border-muted/20">
                You have the following rights regarding your personal data:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { icon: '👁️', title: 'Access', desc: 'View your personal information' },
                  { icon: '✏️', title: 'Correction', desc: 'Correct inaccurate data' },
                  { icon: '🗑️', title: 'Deletion', desc: 'Delete your personal information' },
                  { icon: '🚫', title: 'Objection', desc: 'Object to processing' },
                  { icon: '📤', title: 'Portability', desc: 'Request data transfer' },
                  { icon: '⏸️', title: 'Restriction', desc: 'Limit data processing' },
                ].map((right, index) => (
                  <div key={index} className="p-4 bg-background rounded-lg border border-muted/30 hover:border-primary/50 transition-colors">
                    <div className="flex items-start">
                      <span className="text-2xl mr-3">{right.icon}</span>
                      <div>
                        <p className="font-medium">{right.title}</p>
                        <p className="text-sm text-muted-foreground">{right.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Cookies */}
          <section className="mb-16 p-8 bg-background rounded-xl border border-muted shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center mb-6">
              <div className="h-10 w-10 mr-4 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600 font-bold">6</div>
              <h2 className="text-3xl font-bold text-primary">Cookies</h2>
            </div>
            <div className="space-y-4 text-lg leading-relaxed">
              <div className="p-6 bg-orange-50/30 rounded-xl border border-orange-100 flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-4 mt-1 text-orange-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
                <div>
                  <p className="font-medium text-orange-800 mb-2">Cookie Usage</p>
                  <p className="text-muted-foreground">
                    We use cookies and similar technologies to enhance your experience. You can control cookie preferences through our cookie settings.
                  </p>
                  <button className="mt-4 px-4 py-2 bg-orange-100 text-orange-800 rounded-lg text-sm font-medium hover:bg-orange-200 transition-colors">
                    Manage Cookie Preferences
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Us */}
          <section className="mb-16 p-8 bg-background rounded-xl border border-muted shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center mb-6">
              <div className="h-10 w-10 mr-4 rounded-lg bg-pink-100 flex items-center justify-center text-pink-600 font-bold">7</div>
              <h2 className="text-3xl font-bold text-primary">Contact Us</h2>
            </div>
            <div className="space-y-4 text-lg leading-relaxed">
              <p className="p-4 bg-muted/10 rounded-lg border border-muted/20">
                For privacy-related questions, contact our Data Protection Officer:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-6 bg-background rounded-xl border border-muted/30">
                  <h3 className="font-semibold text-lg mb-4 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Contact Information
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 mt-0.5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span>privacy@datasphere.com</span>
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
                <div className="p-6 bg-background rounded-xl border border-muted/30">
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
                      <span className="text-muted-foreground">Saturday</span>
                      <span>10:00 AM - 2:00 PM PST</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Sunday</span>
                      <span>Closed</span>
                    </li>
                  </ul>
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                    <p className="text-sm text-blue-800">
                      For urgent privacy matters outside business hours, please email with "URGENT" in the subject line.
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

export default Privacy;
