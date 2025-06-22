import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCookieConsent } from '@/hooks/useCookieConsent';
import { Button } from '@/components/ui/button';


// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Cookies = () => {
  const { preferences, updatePreferences } = useCookieConsent();
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

    // Animate the cookie settings panel
    const settingsPanel = containerRef.current.querySelector('.settings-panel');
    if (settingsPanel) {
      gsap.from(settingsPanel, {
        scale: 0.95,
        opacity: 0,
        duration: 0.6,
        scrollTrigger: {
          trigger: settingsPanel,
          start: "top 75%",
          toggleActions: "play none none none",
        }
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-muted/10">
    
      
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
              Cookie Policy
            </h1>
            <p className="text-muted-foreground text-lg">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </motion.div>

          {/* What Are Cookies */}
          <section className="mb-16 p-8 bg-background rounded-xl border border-muted shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-3xl font-bold mb-6 text-primary">What Are Cookies</h2>
            <div className="space-y-4 text-lg leading-relaxed">
              <p className="p-4 bg-muted/10 rounded-lg border border-muted/20">
                Cookies are small text files that are placed on your computer or mobile device when you visit our website. 
                They help us provide you with a better experience by remembering your preferences and improving our services.
              </p>
            </div>
          </section>

          {/* Types of Cookies */}
          <section className="mb-16 p-8 bg-background rounded-xl border border-muted shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-3xl font-bold mb-6 text-primary">Types of Cookies We Use</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 rounded-xl border border-muted bg-gradient-to-b from-background to-muted/5 hover:border-primary transition-all hover:shadow-lg">
                <div className="h-12 w-12 mb-4 rounded-lg bg-primary/10 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Essential Cookies</h3>
                <p className="text-muted-foreground">
                  These cookies are necessary for the website to function properly. They enable basic functions like page navigation and access to secure areas.
                </p>
              </div>

              <div className="p-6 rounded-xl border border-muted bg-gradient-to-b from-background to-muted/5 hover:border-primary transition-all hover:shadow-lg">
                <div className="h-12 w-12 mb-4 rounded-lg bg-blue-100 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Analytics Cookies</h3>
                <p className="text-muted-foreground">
                  These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.
                </p>
              </div>

              <div className="p-6 rounded-xl border border-muted bg-gradient-to-b from-background to-muted/5 hover:border-primary transition-all hover:shadow-lg">
                <div className="h-12 w-12 mb-4 rounded-lg bg-purple-100 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Marketing Cookies</h3>
                <p className="text-muted-foreground">
                  These cookies track visitors across websites to display relevant and engaging advertisements.
                </p>
              </div>
            </div>
          </section>

          {/* Cookie Preferences */}
          <section className="mb-16 p-8 bg-background rounded-xl border border-muted shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-3xl font-bold mb-6 text-primary">Your Cookie Preferences</h2>
            <p className="mb-6 text-lg p-4 bg-muted/10 rounded-lg border border-muted/20">
              You can manage your cookie preferences below. Note that disabling certain cookies may affect your experience on our website.
            </p>
            
            <div className="settings-panel p-8 rounded-xl border border-primary/20 bg-gradient-to-br from-background via-background to-primary/5 shadow-lg">
              <h3 className="text-2xl font-semibold mb-6 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Current Settings
              </h3>
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 rounded-lg bg-background border border-muted/30 hover:border-primary/50 transition-colors">
                  <div className="mb-3 sm:mb-0">
                    <p className="font-medium text-lg">Essential Cookies</p>
                    <p className="text-sm text-muted-foreground">Required for basic website functionality</p>
                  </div>
                  <span className="px-4 py-2 rounded-full bg-green-100 text-green-800 text-sm font-medium flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Always Active
                  </span>
                </div>
                
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 rounded-lg bg-background border border-muted/30 hover:border-primary/50 transition-colors">
                  <div className="mb-3 sm:mb-0">
                    <p className="font-medium text-lg">Analytics Cookies</p>
                    <p className="text-sm text-muted-foreground">Help us improve our website</p>
                  </div>
                  <Button
                    variant={preferences.analytics ? "default" : "outline"}
                    size="lg"
                    onClick={() => updatePreferences({ analytics: !preferences.analytics })}
                    className="min-w-[120px]"
                  >
                    {preferences.analytics ? "Enabled" : "Disabled"}
                  </Button>
                </div>
                
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 rounded-lg bg-background border border-muted/30 hover:border-primary/50 transition-colors">
                  <div className="mb-3 sm:mb-0">
                    <p className="font-medium text-lg">Marketing Cookies</p>
                    <p className="text-sm text-muted-foreground">Personalize ads and content</p>
                  </div>
                  <Button
                    variant={preferences.marketing ? "default" : "outline"}
                    size="lg"
                    onClick={() => updatePreferences({ marketing: !preferences.marketing })}
                    className="min-w-[120px]"
                  >
                    {preferences.marketing ? "Enabled" : "Disabled"}
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* How to Control Cookies */}
          <section className="mb-16 p-8 bg-background rounded-xl border border-muted shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-3xl font-bold mb-6 text-primary">How to Control Cookies</h2>
            <div className="space-y-4 text-lg leading-relaxed">
              <p className="p-4 bg-muted/10 rounded-lg border border-muted/20">
                You can control and/or delete cookies as you wish. You can delete all cookies that are already on your computer and you can set most browsers to prevent them from being placed.
              </p>
             
            </div>
          </section>

          {/* Contact Us */}
          <section className="mb-16 p-8 bg-background rounded-xl border border-muted shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-3xl font-bold mb-6 text-primary">Contact Us</h2>
            <div className="space-y-4 text-lg leading-relaxed">
              <p className="p-4 bg-muted/10 rounded-lg border border-muted/20">
                If you have any questions about our use of cookies, please contact us:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start p-4 bg-muted/10 rounded-lg border border-muted/20">
                  <span className="mr-3 mt-1 flex-shrink-0 text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </span>
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-muted-foreground">privacy@datasphere.com</p>
                  </div>
                </li>
                <li className="flex items-start p-4 bg-muted/10 rounded-lg border border-muted/20">
                  <span className="mr-3 mt-1 flex-shrink-0 text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </span>
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-muted-foreground">+1 (555) 123-4567</p>
                  </div>
                </li>
              </ul>
            </div>
          </section>
        </div>
      </main>
      
    </div>
  );
};

export default Cookies;