import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, Building2, Heart, GraduationCap, Factory, ShoppingCart, Utensils, Home, Truck, Wheat, Scale, Megaphone, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const IndustrySection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }
    }
  };

  const industries = [
    {
      id: "it-cloud",
      icon: <Building2 className="h-6 w-6" />,
      title: "IT & Cloud",
      description: "Cutting-edge technology solutions for modern businesses",
      gradient: "from-blue-500 to-indigo-600"
    },
    {
      id: "finance",
      icon: <Scale className="h-6 w-6" />,
      title: "Financial Services",
      description: "Digital solutions for banking and financial institutions",
      gradient: "from-emerald-500 to-green-600"
    },
    {
      id: "healthcare",
      icon: <Heart className="h-6 w-6" />,
      title: "Healthcare",
      description: "Digital transformation for healthcare providers",
      gradient: "from-red-500 to-pink-600"
    },
    {
      id: "education",
      icon: <GraduationCap className="h-6 w-6" />,
      title: "Education",
      description: "Digital solutions for modern education",
      gradient: "from-purple-500 to-violet-600"
    },
    {
      id: "manufacturing",
      icon: <Factory className="h-6 w-6" />,
      title: "Manufacturing",
      description: "Smart manufacturing solutions for Industry 4.0",
      gradient: "from-orange-500 to-red-600"
    },
    {
      id: "retail",
      icon: <ShoppingCart className="h-6 w-6" />,
      title: "Retail & E-Commerce",
      description: "Digital solutions for modern retail experiences",
      gradient: "from-teal-500 to-cyan-600"
    },
    {
      id: "restaurants",
      icon: <Utensils className="h-6 w-6" />,
      title: "Restaurants",
      description: "Digital solutions for the food service industry",
      gradient: "from-yellow-500 to-orange-600"
    },
    {
      id: "real-estate",
      icon: <Home className="h-6 w-6" />,
      title: "Real Estate",
      description: "Digital solutions for property management",
      gradient: "from-indigo-500 to-blue-600"
    },
    {
      id: "transport",
      icon: <Truck className="h-6 w-6" />,
      title: "Transport & Logistics",
      description: "Digital solutions for transportation and logistics",
      gradient: "from-gray-500 to-slate-600"
    },
    {
      id: "agriculture",
      icon: <Wheat className="h-6 w-6" />,
      title: "Agriculture",
      description: "Digital solutions for modern farming",
      gradient: "from-lime-500 to-green-600"
    },
    {
      id: "legal",
      icon: <Scale className="h-6 w-6" />,
      title: "Professional Services",
      description: "Digital solutions for legal and professional services",
      gradient: "from-slate-500 to-gray-600"
    },
    {
      id: "marketing",
      icon: <Megaphone className="h-6 w-6" />,
      title: "Marketing & Creative",
      description: "Digital solutions for marketing and creative agencies",
      gradient: "from-pink-500 to-rose-600"
    }
  ];

  const handleIndustryClick = (industryId: string) => {
    navigate(`/industries/${industryId}`);
  };

  return (
    <section className="relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-violet-500/5 blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-emerald-500/5 blur-[100px]" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4">
            Industries We Serve
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Transforming <span className="text-primary">Every Industry</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            We deliver industry-specific solutions across diverse sectors, helping businesses modernize and thrive in the digital age.
          </p>
        </div>

        <motion.div 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {industries.map((industry, index) => (
            <motion.div
              key={industry.id}
              variants={itemVariants}
              className="group relative cursor-pointer"
              onClick={() => handleIndustryClick(industry.id)}
            >
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${industry.gradient} opacity-0 group-hover:opacity-10 blur transition-opacity duration-300 -z-10`}></div>
              <div className="relative overflow-hidden rounded-2xl bg-white/5 dark:bg-white/5 backdrop-blur-sm border border-white/10 dark:border-white/10 p-6 h-full transition-all duration-300 group-hover:translate-y-[-3px] group-hover:shadow-lg group-hover:bg-white/10">
                <div className={`rounded-xl p-3 bg-gradient-to-br ${industry.gradient} mb-4 inline-block text-white`}>
                  {industry.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{industry.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{industry.description}</p>
                <div className="mt-auto">
                  <Button variant="ghost" className="p-0 h-auto flex items-center text-primary hover:text-primary hover:bg-transparent text-sm">
                    Learn more <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-16 text-center"
        >
          <Button 
            onClick={() => navigate('/industries')}
            className="rounded-full px-8 py-6 text-base bg-gradient-to-r from-primary/80 to-primary hover:from-primary hover:to-primary/80 shadow-lg shadow-primary/20 transition-all duration-300"
          >
            View all industries <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default IndustrySection;