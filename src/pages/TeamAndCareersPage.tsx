// Updated TeamAndCareersPage.tsx with fixes
import { teamMembers } from '@/data/teamMembers';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import TeamMember from '@/components/Careers/TeamMember';
import { useTheme } from '@/providers/ThemeProvider';
import { Button } from '@/components/ui/button';
import { Users, Briefcase, Mail, Shield, Sparkles, Linkedin, Github, Twitter, Globe } from 'lucide-react';
import SEO from '@/components/common/SEO';

const TeamAndCareersPage = () => {
  const { theme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'PrintScreen' || (e.ctrlKey && e.key === 'p')) {
        e.preventDefault();
        alert('Print screen is disabled for privacy protection');
      }
    };

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Separate CEO/Founder from other team members
  const ceo = teamMembers.find(member =>
    member.role.toLowerCase().includes('director') ||
    member.role.toLowerCase().includes('ceo') ||
    member.role.toLowerCase().includes('founder')
  );

  const otherMembers = teamMembers.filter(member => member !== ceo);

  // Categorize other members
  const technicalTeam = otherMembers.filter(member =>
    member.department?.toLowerCase().includes('delivery') ||
    member.department?.toLowerCase().includes('data') ||
    member.role.toLowerCase().includes('engineer') ||
    member.role.toLowerCase().includes('developer') ||
    member.role.toLowerCase().includes('analyst')
  );

  const businessTeam = otherMembers.filter(member =>
    !technicalTeam.includes(member)
  );

  return (
    <div className="min-h-screen">
      <SEO
        title="Our Team | Business & Data Solutions"
        description="Meet the brilliant minds and experts behind Business and Data Solutions - A team dedicated to innovation and excellence."
        keywords="BDS team, data experts, business solutions team, professionals, leadership"
        url="https://businessanddatasolutions.com/team"
      />

      {/* Privacy notice */}
      <div className="fixed bottom-4 left-4 bg-black/80 backdrop-blur-sm text-white text-xs p-2 rounded-lg z-50 flex items-center gap-2 border border-gray-700">
        <Shield className="h-3 w-3" />
        <span>Team images protected</span>
      </div>

      <div className="container mx-auto px-4 py-8 pt-24 dark:bg-black dark:text-gray-100">
        {/* Premium Hero section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-200/20 dark:border-blue-500/20">
            <Sparkles className="h-4 w-4 text-blue-500" />
            <span className={cn(
              "text-sm font-medium",
              theme === "dark" ? "text-blue-300" : "text-blue-600"
            )}>
              Meet the Visionaries
            </span>
          </div>

          <h1 className={cn(
            "text-4xl md:text-6xl font-bold mb-6 tracking-tight",
            theme === "dark" ? "text-white" : "text-gray-900",
            "bg-clip-text text-transparent bg-gradient-to-r",
            theme === "dark"
              ? "from-blue-300 via-purple-300 to-blue-300"
              : "from-primary via-purple-600 to-blue-600"
          )}>
            Our Expert Team
          </h1>

          <p className={cn(
            "text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed",
            theme === "dark" ? "text-gray-300" : "text-gray-600"
          )}>
            The brilliant minds and innovative thinkers powering the future of business and data solutions
          </p>
        </motion.div>

        {/* Team stats */}

        {/* Leadership Section - CEO First */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="space-y-16"
        >
          {/* Founder/Director - Prominent Display */}
          {ceo && (
            <div>
              <h2 className={cn(
                "text-3xl font-bold mb-8 text-center",
                theme === "dark" ? "text-white" : "text-gray-900"
              )}>
                <span className={cn(
                  "bg-clip-text text-transparent bg-gradient-to-r",
                  theme === "dark"
                    ? "from-blue-300 to-purple-300"
                    : "from-primary to-purple-600"
                )}>
                  Leadership
                </span>
              </h2>
              <div className="flex justify-center">
                <div className="w-full max-w-2xl">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className={cn(
                      "relative rounded-3xl overflow-hidden group",
                      "bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-gray-900/50 dark:to-gray-800/50",
                      "border border-blue-200/30 dark:border-blue-500/20",
                      "shadow-2xl"
                    )}
                  >
                    <div className="absolute inset-0" />
                    <div className="relative p-8 md:p-10 flex flex-col md:flex-row items-center gap-8">
                      {/* CEO Image - Fixed with proper object-fit */}
                      <div className="relative w-48 h-48 md:w-56 md:h-56 flex-shrink-0">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full blur-xl opacity-30" />
                        <div className="relative w-full h-full rounded-full overflow-hidden  shadow-2xl">
                          <img
                            src={ceo.image}
                            alt={ceo.name}
                            className="w-full h-full object-cover"
                            style={{ objectPosition: 'center 25%' }}
                            onContextMenu={(e) => e.preventDefault()}
                          />
                        </div>
                      </div>

                      {/* CEO Info */}
                      <div className="flex-1 text-center md:text-left">
                        <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-200/20 dark:border-blue-500/20">
                          <Sparkles className="h-4 w-4 text-blue-500" />
                          <span className="text-sm font-medium text-blue-600 dark:text-blue-300">
                            Founder & Director
                          </span>
                        </div>

                        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                          {ceo.name}
                        </h3>
                        <p className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 mb-4">
                          {ceo.role}
                        </p>

                        <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                          {ceo.bio}
                        </p>

                        {/* CEO Social Links */}
                        {ceo.socialLinks && Object.keys(ceo.socialLinks).length > 0 && (
                          <div className="flex justify-center md:justify-start gap-4">
                            {ceo.socialLinks.linkedin && (
                              <a
                                href={ceo.socialLinks.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                              >
                                <Linkedin className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                              </a>
                            )}
                            {ceo.socialLinks.website && (
                              <a
                                href={ceo.socialLinks.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors"
                              >
                                <Globe className="h-5 w-5 text-green-600 dark:text-green-400" />
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          )}

          {/* Technical Team Section */}
          {technicalTeam.length > 0 && (
            <div>
              <h2 className={cn(
                "text-3xl font-bold mb-8 text-center",
                theme === "dark" ? "text-white" : "text-gray-900"
              )}>
                <span className={cn(
                  "bg-clip-text text-transparent bg-gradient-to-r",
                  theme === "dark"
                    ? "from-green-300 to-blue-300"
                    : "from-green-600 to-blue-600"
                )}>
                  Technical Experts
                </span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {technicalTeam.map((member, index) => (
                  <TeamMember
                    key={`${member.name}-${index}`}
                    {...member}
                    premiumLayout={true}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Business & Operations Section */}
          {businessTeam.length > 0 && (
            <div>
              <h2 className={cn(
                "text-3xl font-bold mb-8 text-center",
                theme === "dark" ? "text-white" : "text-gray-900"
              )}>
                <span className={cn(
                  "bg-clip-text text-transparent bg-gradient-to-r",
                  theme === "dark"
                    ? "from-purple-300 to-pink-300"
                    : "from-purple-600 to-pink-600"
                )}>
                  Business & Operations
                </span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {businessTeam.map((member, index) => (
                  <TeamMember
                    key={`${member.name}-${index}`}
                    {...member}
                    premiumLayout={true}
                  />
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* Coming Soon - Careers Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className={cn(
            "mt-24 rounded-3xl p-12 text-center relative overflow-hidden",
            theme === "dark"
              ? "bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700"
              : "bg-gradient-to-br from-gray-50 to-white shadow-2xl border border-gray-200"
          )}
        >
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-grid-pattern"></div>
          </div>

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-200/20 dark:border-blue-500/20">
              <Briefcase className="h-4 w-4 text-blue-500" />
              <span className={cn(
                "text-sm font-medium",
                theme === "dark" ? "text-blue-300" : "text-blue-600"
              )}>
                Coming Soon
              </span>
            </div>

            <h2 className={cn(
              "text-3xl md:text-4xl font-bold mb-4",
              theme === "dark" ? "text-white" : "text-gray-900"
            )}>
              Want to Join Our Team?
            </h2>

            <p className={cn(
              "text-lg md:text-xl max-w-2xl mx-auto mb-8",
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            )}>
              We're building exciting career opportunities for passionate individuals.
              Our careers page is currently under development and will be launching soon!
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Button
                variant="outline"
                className="gap-2"
                onClick={() => window.open('mailto:hr@businessanddatasolutions.com')}
              >
                <Mail className="h-4 w-4" />
                Express Interest
              </Button>

              <Button
                variant="outline"
                className="gap-2"
                onClick={() => window.open('https://linkedin.com/company/business-and-data-solutions')}
              >
                <Linkedin className="h-4 w-4" />
                Follow on LinkedIn
              </Button>
            </div>

            <div className="inline-flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              <span>Stay tuned for updates</span>
              <div className="flex gap-2">
                <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse"></div>
                <div className="h-2 w-2 rounded-full bg-purple-500 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .bg-grid-pattern {
          background-image: 
            linear-gradient(to right, #8882 1px, transparent 1px),
            linear-gradient(to bottom, #8882 1px, transparent 1px);
          background-size: 50px 50px;
        }
      `}</style>
    </div>
  );
};

export default TeamAndCareersPage;
