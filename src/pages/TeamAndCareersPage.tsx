// src/pages/TeamAndCareersPage.tsx
import { teamMembers } from '@/data/teamMembers';
import React, { useState, useEffect } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import TeamMember from '@/components/Careers/TeamMember';
import CareersSection from '@/components/Careers/CareersSection';
import ApplicationModal from '@/components/Careers/ApplicationModal';
import { useTheme } from '@/providers/ThemeProvider';
import { Button } from '@/components/ui/button';
import { Users, Briefcase, ArrowRight, Mail, Shield } from 'lucide-react';

const TeamAndCareersPage = () => {
  const { theme } = useTheme();
  const [tab, setTab] = useState('team');
  const [formOpen, setFormOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  // Security and scroll effects
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

  const handleApplyClick = (job: any) => {
    setSelectedJob(job);
    setFormOpen(true);
  };

  return (
    <div className=''>
      {/* Sticky floating action buttons */}
   

      {/* Privacy notice */}
      <div className="fixed bottom-4 left-4 bg-black/80 text-white text-xs p-2 rounded z-50 flex items-center gap-1">
        <Shield className="h-3 w-3" />
        <span>Team images protected</span>
      </div>

      <div className="container mx-auto px-4 py-8 pt-20  dark:bg-black dark:text-gray-100">
        {/* Hero section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h1 className={cn(
            "text-4xl md:text-5xl font-bold",
            theme === "dark" ? "text-white" : "text-gray-900",
            "bg-clip-text text-transparent bg-gradient-to-r",
            theme === "dark" ? "from-blue-400 to-blue-500" : "from-primary to-blue-600"
          )}>
            {tab === 'team' ? 'Meet Our Dream Team' : 'Build Your Future'}
          </h1>
          <p className={cn(
            "text-lg md:text-xl max-w-3xl mx-auto",
            theme === "dark" ? "text-gray-300" : "text-gray-600"
          )}>
            {tab === 'team' 
              ? 'The brilliant minds powering our innovation and success' 
              : 'Join us in shaping the future of technology and business'}
          </p>
        </motion.div>

        {/* Enhanced tab navigation */}
        <div className="mb-12 ">
          <Tabs value={tab} onValueChange={setTab} className="w-full">
           <div className="flex justify-center">
  <TabsList className="w-full max-w-md mx-auto bg-transparent rounded-xl p-10">
    <TabsTrigger 
      value="team" 
      className={cn(
        "flex-1 py-3 rounded-lg transition-all",
        theme === "dark" ? "data-[state=active]:bg-gray-800" : "data-[state=active]:bg-white",
        "data-[state=active]:shadow-lg"
      )}
    >
      <div className="flex items-center gap-2">
        <Users className="h-5 w-5" />
        <span>Our Team</span>
      </div>
    </TabsTrigger>
    <TabsTrigger 
      value="careers" 
      className={cn(
        "flex-1 py-3 rounded-lg transition-all",
        theme === "dark" ? "data-[state=active]:bg-gray-800" : "data-[state=active]:bg-white",
        "data-[state=active]:shadow-lg"
      )}
    >
      <div className="flex items-center gap-2">
        <Briefcase className="h-5 w-5" />
        <span>Careers</span>
      </div>
    </TabsTrigger>
  </TabsList>
</div>

            {/* Team Tab Content */}
            <TabsContent value="team">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-12"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-5">
                  {teamMembers.map((member) => (
                    <TeamMember key={`${member.name}-${member.role}`} {...member} />
                  ))}
                </div>

                <div className="text-center">
                  <Button 
                    onClick={() => setTab('careers')}
                    size="lg"
                    className="gap-2"
                  >
                    <ArrowRight className="h-5 w-5" />
                    Explore Career Opportunities
                  </Button>
                </div>
              </motion.div>
            </TabsContent>

            {/* Careers Tab Content */}
            <TabsContent value="careers">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-16"
              >
                <CareersSection onApply={handleApplyClick} />

                {/* General application CTA */}
                <div className={cn(
                  "rounded-2xl p-8 md:p-12 text-center",
                  theme === "dark" 
                    ? "bg-gradient-to-r" 
                    : "bg-white border border-gray-200 shadow-lg"
                )}>
                  <h2 className={cn(
                    "text-2xl font-bold mb-4",
                    theme === "dark" ? "text-white" : "text-gray-900"
                  )}>
                    Don't See Your Perfect Role?
                  </h2>
                  <p className={cn(
                    "text-lg mb-6 max-w-2xl mx-auto",
                    theme === "dark" ? "text-gray-300" : "text-gray-600"
                  )}>
                    We're always looking for talented individuals. Send us your resume and tell us how you can contribute!
                  </p>
                  <Button 
                    onClick={() => handleApplyClick({ title: "General Application" })}
                    size="lg"
                    className="gap-2"
                  >
                    <Mail className="h-5 w-5" />
                    Submit General Application
                  </Button>
                </div>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <ApplicationModal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        job={selectedJob}
        theme={theme}
      />
    </div>
  );
};

export default TeamAndCareersPage;
