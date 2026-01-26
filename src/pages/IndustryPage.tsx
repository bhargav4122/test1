import React, { useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight, CheckCircle, ChevronRight, ArrowLeft,
  BarChart3, Target, Shield, Zap, TrendingUp, Users,
  Lightbulb, Rocket, Globe, MessageSquare, X
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import HolographicCard from '../components/HolographicCard';
import { industriesData } from '../data/industriesData';
import { useTheme } from '@/providers/ThemeProvider';
import { cn } from "@/lib/utils";
import ConsistentPageHeader from "@/components/layout/ConsistentPageHeader";
import { Button } from '@/components/ui/button';
import { ConsultationButton } from "@/components/consultation/ConsultationButton";
import CallToAction from "@/components/home/CallToAction";

const FadeIn = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
};

export default function IndustryPage() {
  const { industryId } = useParams<{ industryId: string }>();
  const industry = industryId ? industriesData[industryId] : null;
  const { theme } = useTheme();
  const navigate = useNavigate();

  // Invert serviceIndustries mapping if we had it easily accessible, 
  // but for now let's use some logic to show related services
  const relatedServices = useMemo(() => {
    // This is a placeholder logic. In a real app, we'd query the services data.
    return [
      { id: 'business-intelligence', title: 'Business Intelligence', icon: BarChart3 },
      { id: 'core-data-cloud', title: 'Cloud Solutions', icon: Globe },
      { id: 'digital-transformation', title: 'Digital Transformation', icon: Zap }
    ];
  }, []);

  if (!industry) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <h1 className="text-4xl font-bold text-red-500 mb-6">Industry not found</h1>
        <Button onClick={() => navigate('/industries')} variant="outline" className="rounded-full">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Industries
        </Button>
      </div>
    );
  }

  const industryStats = [
    { label: "Efficiency Boost", value: "40%", icon: TrendingUp },
    { label: "Cost Reduction", value: "25%", icon: Target },
    { label: "Client Satisfaction", value: "98%", icon: Users },
  ];

  return (
    <main className="relative pb-20 overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.03),transparent_70%)]" />
        <div className="absolute top-1/4 -right-20 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute top-[60%] -left-40 w-[600px] h-[600px] bg-purple-500/8 rounded-full blur-[150px]" />

        {/* Floating background icons */}
        <div className="absolute top-20 left-[10%] opacity-[0.03] rotate-12">
          <Globe size={120} />
        </div>
        <div className="absolute bottom-40 right-[5%] opacity-[0.03] -rotate-12">
          <Zap size={150} />
        </div>
      </div>

      <ConsistentPageHeader
        title={industry.title}
        description={industry.description}
        backgroundImage={industry.heroImage}
        categoryLabel="Industry Solutions"
        backLink="/industries"
        backLinkLabel="Back to All Industries"
      />

      {/* Stats Section */}
      <section className="container-custom -mt-16 relative z-30 mb-16 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {industryStats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + idx * 0.1 }}
            >
              <HolographicCard className="p-8 text-center flex flex-col items-center">
                <div className={cn(
                  "p-3 rounded-2xl mb-4",
                  theme === 'dark' ? "bg-blue-500/10 text-blue-400" : "bg-blue-100 text-blue-600"
                )}>
                  <stat.icon size={32} />
                </div>
                <div className="text-4xl font-bold mb-2 tabular-nums">
                  {stat.value}
                </div>
                <div className="text-muted-foreground font-medium uppercase tracking-wider text-xs">
                  {stat.label}
                </div>
              </HolographicCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Deep Dive Section: Challenges vs Solutions */}
      <section className="container-custom mb-20 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <FadeIn>
              <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
                <Shield className="text-red-500" /> Key Challenges
              </h2>
              <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
                Modern {industry.title.toLowerCase()} organizations face a complex landscape of operational and technological barriers. We help you navigate these hurdles.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
                {industry.challenges.map((challenge, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ x: 5, backgroundColor: theme === 'dark' ? "rgba(239, 68, 68, 0.1)" : "rgba(254, 242, 242, 1)" }}
                    className={cn(
                      "p-4 rounded-xl border flex items-center gap-4 transition-all",
                      theme === 'dark' ? "bg-red-500/5 border-red-500/10" : "bg-red-50 border-red-100"
                    )}
                  >
                    <div className="p-1 rounded-full bg-red-500/20 flex-shrink-0">
                      <X className="h-3 w-3 text-red-500" />
                    </div>
                    <span className="font-medium text-sm md:text-base text-gray-800 dark:text-gray-200">{challenge}</span>
                  </motion.div>
                ))}
              </div>
            </FadeIn>
          </div>

          <div className="space-y-6">
            <FadeIn delay={0.2}>
              <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
                <Rocket className="text-blue-500" /> Strategic Solutions
              </h2>
              <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
                BDS provides tailored digital transformation strategies that turn these challenges into opportunities for growth and resilience.
              </p>
              <div className="grid gap-4">
                {industry.solutions.map((solution, index) => (
                  <HolographicCard key={index} className="p-5 group hover:border-blue-500/30 transition-all">
                    <div className="flex items-center gap-4">
                      <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-500 group-hover:scale-105 transition-transform flex-shrink-0">
                        <CheckCircle size={20} />
                      </div>
                      <h3 className="text-lg font-bold">{solution}</h3>
                    </div>
                  </HolographicCard>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="bg-gray-50/50 dark:bg-gray-900/30 py-16 mb-20 border-y border-gray-200/50 dark:border-gray-800/50 relative overflow-hidden">
        {/* Background text decoration */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15rem] font-bold text-gray-200/20 dark:text-white/5 pointer-events-none select-none uppercase tracking-tighter -z-10">
          Impact
        </div>

        <div className="container-custom px-4">
          <div className="text-center mb-12">
            <FadeIn>
              <span className="text-blue-500 font-bold uppercase tracking-widest text-xs">Proven Implementation</span>
              <h2 className="text-3xl md:text-5xl font-bold mt-3 mb-4">Success Stories</h2>
              <div className="w-16 h-1 bg-blue-600 mx-auto rounded-full" />
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industry.caseStudies.map((study, index) => (
              <FadeIn key={index} delay={index * 0.1}>
                <div className={cn(
                  "p-8 rounded-3xl border h-full transition-all hover:shadow-2xl group",
                  theme === 'dark' ? "bg-gray-900 border-gray-800 hover:border-blue-500/30" : "bg-white border-gray-100 shadow-xl shadow-blue-500/5"
                )}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
                      <Target size={20} />
                    </div>
                    <h3 className="text-xl font-bold leading-tight group-hover:text-blue-500 transition-colors">{study.title}</h3>
                  </div>

                  <p className="text-muted-foreground mb-8 line-clamp-3 leading-relaxed">
                    {study.description}
                  </p>

                  <div className="space-y-3 pt-6 border-t border-gray-100 dark:border-gray-800">
                    <div className="text-xs font-bold uppercase text-blue-500 tracking-widest mb-3">Results Achieved</div>
                    {study.results.map((result, idx) => (
                      <div key={idx} className="flex items-start text-gray-700 dark:text-gray-300">
                        <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mr-3 mt-1.5 flex-shrink-0" />
                        <span className="text-sm font-medium leading-tight">{result}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Related Services Section */}
      <section className="container-custom mb-20 px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div className="max-w-2xl">
            <FadeIn>
              <h2 className="text-3xl md:text-4xl font-bold mb-3">Empowering {industry.title}</h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Our suite of specialized services is engineered to meet the unique demands of your sector.
              </p>
            </FadeIn>
          </div>
          <Link to="/services" className="mt-4 md:mt-0">
            <Button variant="ghost" className="group h-auto py-2 px-4">
              View All Services <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedServices.map((service, idx) => (
            <FadeIn key={idx} delay={idx * 0.1}>
              <Link to={`/service-detail/${service.id}`}>
                <HolographicCard className="p-6 md:p-8 h-full group hover:-translate-y-2 transition-transform cursor-pointer border-gray-200/50 dark:border-gray-800/50">
                  <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-500 mb-5 group-hover:bg-blue-500 group-hover:text-white transition-colors w-fit">
                    <service.icon size={28} />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-3 group-hover:text-blue-500 transition-colors">{service.title}</h3>
                  <div className="flex items-center text-sm font-bold text-blue-500 opacity-70 group-hover:opacity-100 transition-all">
                    Explore Solution <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </HolographicCard>
              </Link>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* CTA Section - Redesigned for High Impact */}
      <CallToAction
        pageType="industries"
        title={`Ready to Lead the Future of ${industry.title}?`}
        description="Partner with BDS to deploy scalable, secure, and intelligent solutions designed for the specific complexities of your industry."
      />
    </main>
  );
}
