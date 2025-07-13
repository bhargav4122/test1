import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import TeamMember from '@/components/TeamMember';
import CareersSection from '@/components/Careers/CareersSection';
import ApplicationModal from '@/components/Careers/ApplicationModal';
import { useTheme } from '@/providers/ThemeProvider';

// Example team data (can be moved to a separate file or fetched from API)
const teamMembers = [
  {
    name: "Sarah Johnson",
    role: "Chief Technology Officer",
    bio: "15+ years in enterprise software and AI. Led digital transformation for Fortune 500s.",
    image: "https://images.pexels.com/photos/3796217/pexels-photo-3796217.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    name: "Michael Chen",
    role: "Lead Data Scientist",
    bio: "PhD in ML & predictive analytics. Published AI researcher.",
    image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    name: "Emily Rodriguez",
    role: "UX Director",
    bio: "Award-winning designer. Ex-design lead at major tech firms.",
    image: "https://images.pexels.com/photos/3776932/pexels-photo-3776932.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    name: "David Kim",
    role: "Solutions Architect",
    bio: "Expert in AWS & Azure. Architect of scalable enterprise systems.",
    image: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    name: "Lisa Thompson",
    role: "Product Manager",
    bio: "Strategic leader in enterprise SaaS launches.",
    image: "https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    name: "James Wilson",
    role: "Security Engineer",
    bio: "CISSP certified. Specialized in threat prevention & compliance.",
    image: "https://images.pexels.com/photos/3776815/pexels-photo-3776815.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
];

const TeamAndCareersPage = () => {
  const { theme } = useTheme();
  const [tab, setTab] = useState('team');
  const [formOpen, setFormOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const handleApplyClick = (job: any) => {
    setSelectedJob(job);
    setFormOpen(true);
  };

  return (
    <div className={cn(
      'min-h-screen',
      theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
    )}>
      <div className="container mx-auto py-12 px-4">
        <Tabs value={tab} onValueChange={setTab} className="w-full">
          {/* Tab Navigation */}
          <TabsList className="mb-10 justify-center">
            <TabsTrigger value="team">Our Team</TabsTrigger>
            <TabsTrigger value="careers">Careers</TabsTrigger>
          </TabsList>

          {/* Team Tab */}
          <TabsContent value="team">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-12"
            >
              <div className="text-center">
                <h1 className="text-4xl font-bold">Meet the Team</h1>
                <p className="text-lg mt-2 text-muted-foreground">
                  Talented individuals behind our innovation
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {teamMembers.map((member, index) => (
                  <TeamMember key={index} {...member} />
                ))}
              </div>

              <div className="text-center">
                <button
                  onClick={() => setTab('careers')}
                  className="btn-primary mt-6 px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
                >
                  Explore Careers
                </button>
              </div>
            </motion.div>
          </TabsContent>

          {/* Careers Tab */}
          <TabsContent value="careers">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-16"
            >
              <CareersSection onApply={handleApplyClick} />
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Job Application Modal */}
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
