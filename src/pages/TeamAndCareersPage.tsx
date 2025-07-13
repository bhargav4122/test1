import React, { useState, useEffect  } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import TeamMember from '@/components/Careers/TeamMember';
import CareersSection from '@/components/Careers/CareersSection';
import ApplicationModal from '@/components/Careers/ApplicationModal';
import { useTheme } from '@/providers/ThemeProvider';
import { Button } from '@/components/ui/button';

const teamMembers = [
  {
    name: "Sarah Johnson",
    role: "Chief Technology Officer",
    bio: "15+ years of experience in enterprise software and AI solutions. Led digital transformation projects for Fortune 500 companies.",
    image: "https://images.pexels.com/photos/3796217/pexels-photo-3796217.jpeg?auto=compress&cs=tinysrgb&w=800",
    expertise: ["AI/ML", "Cloud Architecture", "Digital Transformation"],
    socialLinks: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      email: "sarah@example.com"
    }
  },
  {
    name: "Michael Chen",
    role: "Lead Data Scientist",
    bio: "PhD in Computer Science, specializing in machine learning and predictive analytics. Published researcher in AI applications.",
    image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=800",
    expertise: ["Machine Learning", "Data Analytics", "Python"],
    socialLinks: {
      linkedin: "https://linkedin.com",
      website: "https://example.com"
    }
  },
  {
    name: "Emily Rodriguez",
    role: "UX Director",
    bio: "Award-winning designer with expertise in user-centered design and accessibility. Former design lead at major tech companies.",
    image: "https://images.pexels.com/photos/3776932/pexels-photo-3776932.jpeg?auto=compress&cs=tinysrgb&w=800",
    expertise: ["UI/UX Design", "User Research", "Design Systems"],
    socialLinks: {
      twitter: "https://twitter.com",
      website: "https://example.com"
    }
  },
  {
    name: "David Kim",
    role: "Solutions Architect",
    bio: "Cloud architecture expert with extensive experience in AWS and Azure. Specialized in scalable enterprise solutions.",
    image: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=800",
    expertise: ["Cloud Infrastructure", "DevOps", "Security"],
    socialLinks: {
      linkedin: "https://linkedin.com",
      email: "david@example.com"
    }
  },
  {
    name: "Lisa Thompson",
    role: "Product Manager",
    bio: "Strategic product leader with a track record of launching successful enterprise software solutions.",
    image: "https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=800",
    expertise: ["Product Strategy", "Agile", "Market Research"],
    socialLinks: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com"
    }
  },
  {
    name: "James Wilson",
    role: "Security Engineer",
    bio: "Cybersecurity expert with CISSP certification. Specializes in enterprise security architecture and threat prevention.",
    image: "https://images.pexels.com/photos/2379xxx/pexels-photo-2379xxx.jpeg?auto=compress&cs=tinysrgb&w=800",
    expertise: ["Cybersecurity", "Risk Management", "Compliance"],
    socialLinks: {
      linkedin: "https://linkedin.com",
      website: "https://example.com"
    }
  },
  {
    name: "Bhargav Allu",
    role: "Director",
    bio: "Director with experience in business consulting, data engineering, and BI development. Passionate about driving data-powered business growth.",
    image: "/public/bhargav.jpg",
    expertise: ["Business Consulting", "Data Engineering", "Power BI", "Cloud Analytics"],
    socialLinks: {
      linkedin: "https://linkedin.com/in/bhargavallu",
      website: "https://yourcompany.com"
    }
  },
  {
    name: "Trinath Gottipatti",
    role: "Financial Data Analyst",
    bio: "Finance professional with strong expertise in financial forecasting, compliance (IFRS), and predictive analytics.",
    image: "https://yourdomain.com/images/trinath.jpg",
    expertise: [
      "Financial Analysis", "Risk Management", "Predictive Analytics", "IFRS", "VAT & Payroll"
    ],
    socialLinks: {
      linkedin: "https://linkedin.com/in/trinathgottipatti",
      website: "https://yourcompany.com"
    }
  },
  {
    name: "Sai Bindu",
    role: "Client Engagement Manager",
    bio: "Experienced in market research and research development with over 3 years in driving client engagement strategies.",
    image: "https://yourdomain.com/images/saibindu.jpg",
    expertise: ["Client Engagement", "Market Research", "Research Development"],
    socialLinks: {
      linkedin: "https://linkedin.com/in/saibindu",
      website: "https://yourcompany.com"
    }
  },
  {
    name: "Swaroop",
    role: "BI Analyst & Product Tester",
    bio: "BI analyst and product tester with over 8 years of experience in market analysis and analytics implementation.",
    image: "https://yourdomain.com/images/swaroop.jpg",
    expertise: ["BI Tools", "Market Analysis", "Product Testing", "Data Strategy"],
    socialLinks: {
      linkedin: "https://linkedin.com/in/swaroop",
      website: "https://yourcompany.com"
    }
  },
 {
  name: "Saradhi",
  role: "Project Manager & Cloud Engineer",
  bio: "Experienced Project Manager and Cloud Engineer with 10+ years of experience managing technical teams and implementing scalable cloud solutions.",
  image: "https://yourdomain.com/images/saradhi.jpg", // Replace with actual image URL
  expertise: ["Project Management", "Cloud Engineering", "Team Coordination", "Agile Delivery", "Cloud Infrastructure"],
  socialLinks: {
    linkedin: "https://linkedin.com/in/saradhi", // Replace with real link
    website: "https://yourcompany.com"
  }
  },
  {
    name: "Sadik",
    role: "UI/UX Designer & Brand Manager",
    bio: "UI/UX designer and branding expert with over 5 years of experience building seamless digital experiences.",
    image: "https://yourdomain.com/images/sadik.jpg",
    expertise: ["UI/UX Design", "Brand Strategy", "App/Web Development"],
    socialLinks: {
      linkedin: "https://linkedin.com/in/sadik",
      website: "https://yourcompany.com"
    }
  },
  {
    name: "Siva",
    role: "Junior Digital Marketer & Content Writer",
    bio: "Creative digital marketer and content creator with a passion for SEO, storytelling, and branding communication.",
    image: "https://yourdomain.com/images/siva.jpg",
    expertise: ["Digital Marketing", "Content Writing", "SEO", "Social Media"],
    socialLinks: {
      linkedin: "https://linkedin.com/in/siva",
      website: "https://yourcompany.com"
    }
  },
  {
    name: "Sai Jageesha Mutyala",
    role: "Frontend Developer",
    bio: "Frontend developer with 3 years of experience building responsive and dynamic web interfaces using modern JS frameworks.",
    image: "https://yourdomain.com/images/jageesha.jpg",
    expertise: ["React.js", "HTML/CSS", "JavaScript", "Responsive Design"],
    socialLinks: {
      linkedin: "https://linkedin.com/in/sai-jageesha",
      website: "https://yourcompany.com"
    }
  }


];

const TeamAndCareersPage = () => {
  const { theme } = useTheme();
  const [tab, setTab] = useState('team');
  const [formOpen, setFormOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

   // Add additional security measures
  useEffect(() => {
    // Disable print screen
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'PrintScreen' || (e.ctrlKey && e.key === 'p')) {
        e.preventDefault();
        alert('Print screen is disabled for privacy protection');
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);





  const handleApplyClick = (job: any) => {
    setSelectedJob(job);
    setFormOpen(true);
  };

  return (
    <div className={cn(
      'min-h-screen',
      theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
    )}>
            {/* Add privacy notice */}
      <div className="fixed bottom-4 right-4 bg-black/80 text-white text-xs p-2 rounded z-50">
        Team images are protected by copyright
      </div>

      <div className="container mx-auto px-4 py-8 pt-20">
        {/* Proper Tabs structure with direct children */}
        <Tabs value={tab} onValueChange={setTab} className="w-full">
          {/* Tab Navigation */}
          <div className="flex justify-center mb-8">
            <TabsList>
              <TabsTrigger value="team">Our Team</TabsTrigger>
              <TabsTrigger value="careers">Careers</TabsTrigger>
            </TabsList>
          </div>

          {/* Team Tab Content - must be direct child of Tabs */}
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
                <Button 
                  onClick={() => setTab('careers')}
                  className="mt-6"
                  variant="default"
                >
                  Explore Careers
                </Button>
              </div>
            </motion.div>
          </TabsContent>

          {/* Careers Tab Content - must be direct child of Tabs */}
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