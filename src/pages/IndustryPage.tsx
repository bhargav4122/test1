import React, { useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight, CheckCircle, ChevronRight, ArrowLeft,
  BarChart3, Target, Shield, Zap, TrendingUp, Users,
  Lightbulb, Rocket, Globe, MessageSquare, X,
  Sparkles, Award, Clock, DollarSign, Cpu, LineChart
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

const FadeIn = ({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const FloatingElement = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <motion.div
    className={className}
    animate={{
      y: [0, -15, 0],
    }}
    transition={{
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  >
    {children}
  </motion.div>
);

export default function IndustryPage() {
  const { industryId } = useParams<{ industryId: string }>();
  const industry = industryId ? industriesData[industryId] : null;
  const { theme } = useTheme();
  const navigate = useNavigate();

  const relatedServices = useMemo(() => {
    return [
      { id: 'business-intelligence', title: 'Business Intelligence', icon: BarChart3, description: 'Advanced analytics for data-driven decisions' },
      { id: 'core-data-cloud', title: 'Cloud Solutions', icon: Globe, description: 'Scalable infrastructure for modern needs' },
      { id: 'digital-transformation', title: 'Digital Transformation', icon: Zap, description: 'Future-proof your operations' }
    ];
  }, []);

  if (!industry) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 blur-3xl opacity-20" />
          <h1 className="relative text-5xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent mb-6">
            Industry not found
          </h1>
        </div>
        <Button
          onClick={() => navigate('/industries')}
          variant="outline"
          className="rounded-full px-8 py-6 border-2 hover:scale-105 transition-all"
        >
          <ArrowLeft className="mr-2 h-5 w-5" /> Back to Industries
        </Button>
      </div>
    );
  }

  const industryStats = [
    { label: "Efficiency Boost", value: "40%", icon: TrendingUp, color: "from-green-500 to-emerald-500" },
    { label: "Cost Reduction", value: "25%", icon: DollarSign, color: "from-blue-500 to-cyan-500" },
    { label: "Client Satisfaction", value: "98%", icon: Users, color: "from-purple-500 to-green-500" },
    { label: "Implementation Speed", value: "3x", icon: Clock, color: "from-orange-500 to-red-500" },
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-transparent to-background/50">
      {/* Premium Background Elements */}
      <div className="absolute inset-0 pointer-events-none -z-20 overflow-hidden">
        <div className={cn(
          "absolute inset-0",
          theme === 'dark'
            ? "bg-gradient-to-br from-gray-900 via-black to-gray-950"
            : "bg-gradient-to-br from-white via-blue-50/30 to-white"
        )} />

        {/* Animated Gradient Orbs */}
        <div className="absolute top-1/4 -right-32 w-[600px] h-[600px]">
          <div className={cn(
            "absolute inset-0 rounded-full blur-[120px] animate-pulse",
            theme === 'dark' ? "bg-blue-500/10" : "bg-blue-400/20"
          )} />
        </div>

        <div className="absolute top-[60%] -left-48 w-[700px] h-[700px]">
          <div className={cn(
            "absolute inset-0 rounded-full blur-[150px]",
            theme === 'dark' ? "bg-purple-500/8" : "bg-purple-400/15"
          )} />
        </div>

        {/* Geometric Pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, ${theme === 'dark' ? '#ffffff' : '#000000'} 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>

        {/* Floating Elements */}
        <FloatingElement className="absolute top-20 left-[10%] opacity-[0.08] rotate-12">
          <Cpu size={140} />
        </FloatingElement>

        <FloatingElement className="absolute bottom-40 right-[5%] opacity-[0.08] -rotate-12">
          <LineChart size={160} />
        </FloatingElement>
      </div>

      <ConsistentPageHeader
        title={industry.title}
        description={industry.description}
        backgroundImage={industry.heroImage}
        categoryLabel="Industry Solutions"
        backLink="/industries"
        backLinkLabel="Back to All Industries"
      />

      {/* Premium Stats Section */}
      <section className="container-custom -mt-12 relative z-30 mb-20 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {industryStats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + idx * 0.1, duration: 0.5 }}
            >
              <div className={cn(
                "relative p-6 md:p-8 rounded-3xl overflow-hidden group",
                theme === 'dark'
                  ? "bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-800"
                  : "bg-white border border-gray-200 shadow-2xl shadow-blue-500/10"
              )}>
                {/* Gradient Border Effect */}
                <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-opacity duration-500" />

                {/* Animated Background */}
                <div className={cn(                                                                                                                           
                  "absolute -inset-[1px]",
                  stat.color
                )} />

                <div className="relative z-10 text-center flex flex-col items-center">

                  <div className={cn(
                    "text-4xl md:text-5xl font-bold mb-2 font-mono bg-gradient-to-r bg-clip-text text-transparent",
                    stat.color
                  )}>
                    {stat.value}
                  </div>
                  <div className={cn(
                    "text-sm font-semibold uppercase tracking-wider mt-2",
                    theme === 'dark' ? "text-gray-400" : "text-gray-600"
                  )}>
                    {stat.label}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Premium Challenges vs Solutions */}
      <section className="container-custom mb-24 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Challenges Column */}
          <FadeIn className="space-y-6">
            <div className="flex items-center gap-4 mb-6">
              <div className={cn(
                "p-3 rounded-2xl",
                theme === 'dark'
                  ? "bg-gradient-to-br from-red-500/20 to-orange-500/10"
                  : "bg-gradient-to-br from-red-50 to-orange-50"
              )}>
                <Shield className="text-red-500" size={28} />
              </div>
              <div>
                <span className="text-sm font-bold text-red-500 uppercase tracking-widest">Industry Hurdles</span>
                <h2 className="text-3xl md:text-4xl font-bold mt-1">Key Challenges</h2>
              </div>
            </div>

            <p className={cn(
              "text-lg leading-relaxed mb-8",
              theme === 'dark' ? "text-gray-300" : "text-gray-700"
            )}>
              Modern {industry.title.toLowerCase()} organizations navigate complex operational and technological barriers that demand specialized solutions.
            </p>

            <div className="grid gap-3">
              {industry.challenges.map((challenge, index) => (
                <motion.div
                  key={index}
                  whileHover={{ x: 8 }}
                  whileTap={{ scale: 0.98 }}
                  className={cn(
                    "p-5 rounded-xl border transition-all duration-300 cursor-pointer group",
                    theme === 'dark'
                      ? "bg-gradient-to-r from-gray-900/50 to-gray-800/30 border-gray-800 hover:border-red-500/30"
                      : "bg-gradient-to-r from-white to-gray-50 border-gray-200 hover:border-red-200 shadow-lg hover:shadow-red-500/10"
                  )}
                >
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "p-2 rounded-lg transition-transform group-hover:scale-110",
                      theme === 'dark'
                        ? "bg-red-500/10 border border-red-500/20"
                        : "bg-red-50 border border-red-100"
                    )}>
                      <X size={18} className="text-red-500" />
                    </div>
                    <span className={cn(
                      "font-medium flex-1",
                      theme === 'dark' ? "text-gray-200" : "text-gray-800"
                    )}>
                      {challenge}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </FadeIn>

          {/* Solutions Column */}
          <FadeIn delay={0.2} className="space-y-6">
            <div className="flex items-center gap-4 mb-6">
              <div className={cn(
                "p-3 rounded-2xl",
                theme === 'dark'
                  ? "bg-gradient-to-br from-blue-500/20 to-cyan-500/10"
                  : "bg-gradient-to-br from-blue-50 to-cyan-50"
              )}>
                <Rocket className="text-blue-500" size={28} />
              </div>
              <div>
                <span className="text-sm font-bold text-blue-500 uppercase tracking-widest">Strategic Approach</span>
                <h2 className="text-3xl md:text-4xl font-bold mt-1">Our Solutions</h2>
              </div>
            </div>

            <p className={cn(
              "text-lg leading-relaxed mb-8",
              theme === 'dark' ? "text-gray-300" : "text-gray-700"
            )}>
              Tailored digital transformation strategies that convert challenges into measurable opportunities for growth and resilience.
            </p>

            <div className="grid gap-4">
              {industry.solutions.map((solution, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className={cn(
                    "p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 group cursor-pointer",
                    theme === 'dark'
                      ? "bg-gradient-to-br from-gray-900/50 to-gray-800/30 border-gray-800 hover:border-blue-500/40 hover:shadow-2xl hover:shadow-blue-500/10"
                      : "bg-white border-gray-200 hover:border-blue-300 shadow-xl hover:shadow-2xl hover:shadow-blue-500/20"
                  )}>
                    <div className="flex items-start gap-4">
                      <div className={cn(
                        "p-3 rounded-xl transition-all group-hover:scale-110",
                        theme === 'dark'
                          ? "bg-gradient-to-br from-blue-500/20 to-cyan-500/10"
                          : "bg-gradient-to-br from-blue-50 to-cyan-50"
                      )}>
                        <CheckCircle size={22} className="text-blue-500" />
                      </div>
                      <div>
                        <h3 className={cn(
                          "text-xl font-bold mb-2 transition-colors",
                          theme === 'dark'
                            ? "text-gray-100 group-hover:text-blue-400"
                            : "text-gray-900 group-hover:text-blue-600"
                        )}>
                          {solution}
                        </h3>
                        <div className={cn(
                          "text-sm opacity-0 group-hover:opacity-100 transition-opacity",
                          theme === 'dark' ? "text-gray-400" : "text-gray-600"
                        )}>
                          Tap to explore detailed implementation →
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Premium Success Stories */}
      <section className={cn(
        "py-20 mb-24 relative overflow-hidden",
        theme === 'dark'
          ? "bg-gradient-to-b from-gray-900/50 to-black/30"
          : "bg-gradient-to-b from-blue-50/50 to-white"
      )}>
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }} />
        </div>

        {/* Floating Badge */}
        <div className="absolute top-10 right-10 hidden lg:block">
          <div className={cn(
            "px-4 py-2 rounded-full text-sm font-bold uppercase tracking-widest rotate-12",
            theme === 'dark'
              ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
              : "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
          )}>
            <Sparkles size={14} className="inline mr-2" />
            Case Studies
          </div>
        </div>

        <div className="container-custom px-4 relative z-10">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <FadeIn>
              <span className="text-sm font-bold text-blue-500 uppercase tracking-widest mb-4 inline-block">
                <Award size={16} className="inline mr-2" />
                Proven Impact
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-4">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Success Stories
                </span>
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-6" />
              <p className={cn(
                "text-xl leading-relaxed",
                theme === 'dark' ? "text-gray-300" : "text-gray-600"
              )}>
                Real-world transformations that demonstrate our commitment to delivering measurable results.
              </p>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industry.caseStudies.map((study, index) => (
              <FadeIn key={index} delay={index * 0.1}>
                <div className={cn(
                  "relative group h-full",
                  theme === 'dark' ? "hover:shadow-2xl hover:shadow-blue-500/10" : "hover:shadow-2xl hover:shadow-blue-500/20"
                )}>
                  {/* Card Glow Effect */}
                  <div className={cn(
                    "absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl opacity-0 group-hover:opacity-30 blur transition duration-500"
                  )} />

                  <div className={cn(
                    "relative p-8 rounded-3xl h-full transition-all duration-500",
                    theme === 'dark'
                      ? "bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-800 group-hover:border-blue-500/30"
                      : "bg-white border border-gray-200 group-hover:border-blue-300 shadow-xl"
                  )}>
                    <div className="flex items-start gap-4 mb-6">
                      <div className="flex-shrink-0">
                        <div className={cn(
                          "p-3 rounded-xl",
                          theme === 'dark'
                            ? "bg-gradient-to-br from-blue-500/20 to-purple-500/10"
                            : "bg-gradient-to-br from-blue-50 to-purple-50"
                        )}>
                          <Target size={24} className="text-blue-500" />
                        </div>
                      </div>
                      <h3 className={cn(
                        "text-xl font-bold leading-tight",
                        theme === 'dark'
                          ? "text-gray-100 group-hover:text-blue-400"
                          : "text-gray-900 group-hover:text-blue-600"
                      )}>
                        {study.title}
                      </h3>
                    </div>

                    <p className={cn(
                      "mb-8 leading-relaxed line-clamp-3",
                      theme === 'dark' ? "text-gray-400" : "text-gray-600"
                    )}>
                      {study.description}
                    </p>

                    <div className="pt-8 border-t mt-auto">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-bold uppercase text-blue-500 tracking-widest">
                          Results Achieved
                        </span>
                        <div className={cn(
                          "px-3 py-1 rounded-full text-xs font-bold",
                          theme === 'dark'
                            ? "bg-blue-500/10 text-blue-400"
                            : "bg-blue-100 text-blue-600"
                        )}>
                          {study.results.length} Metrics
                        </div>
                      </div>

                      <div className="space-y-3">
                        {study.results.map((result, idx) => (
                          <div key={idx} className="flex items-center">
                            <div className="h-2 w-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 mr-3 flex-shrink-0" />
                            <span className={cn(
                              "text-sm font-medium leading-tight",
                              theme === 'dark' ? "text-gray-300" : "text-gray-700"
                            )}>
                              {result}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Hover Indicator */}
                    <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ChevronRight className={cn(
                        "w-5 h-5",
                        theme === 'dark' ? "text-blue-400" : "text-blue-600"
                      )} />
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Related Services */}
      <section className="container-custom mb-24 px-4">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <FadeIn>
              <span className="text-sm font-bold text-blue-500 uppercase tracking-widest mb-4 block">
                Technology Stack
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Services for {industry.title}
              </h2>
              <p className={cn(
                "text-xl leading-relaxed",
                theme === 'dark' ? "text-gray-300" : "text-gray-600"
              )}>
                Our specialized services are engineered to meet the unique demands and opportunities within your sector.
              </p>
            </FadeIn>
          </div>
          <Link to="/services" className="lg:self-end">
            <Button
              variant={theme === 'dark' ? "secondary" : "default"}
              className="rounded-full px-8 py-6 text-lg font-semibold group"
            >
              Explore All Services
              <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-2 transition-transform" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {relatedServices.map((service, idx) => (
            <FadeIn key={idx} delay={idx * 0.1}>
              <Link to={`/service-detail/${service.id}`}>
                <div className={cn(
                  "group relative h-full overflow-hidden rounded-3xl transition-all duration-500 hover:-translate-y-2",
                  theme === 'dark'
                    ? "bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-800 hover:border-blue-500/50"
                    : "bg-white border border-gray-200 hover:border-blue-300 shadow-2xl hover:shadow-3xl hover:shadow-blue-500/30"
                )}>
                  {/* Service Icon with Gradient */}
                  <div className="absolute top-6 right-6">
                    <div className={cn(
                      "p-4 rounded-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-12",
                      theme === 'dark'
                        ? "bg-gradient-to-br from-blue-500/10 to-purple-500/10"
                        : "bg-gradient-to-br from-blue-50 to-purple-50"
                    )}>
                      <service.icon size={32} className="text-blue-500" />
                    </div>
                  </div>

                  <div className="p-8">
                    <div className="mb-6">
                      <div className={cn(
                        "inline-flex items-center px-3 py-1 rounded-full text-xs font-bold mb-4",
                        theme === 'dark'
                          ? "bg-blue-500/10 text-blue-400"
                          : "bg-blue-100 text-blue-600"
                      )}>
                        {idx + 1}
                      </div>
                      <h3 className={cn(
                        "text-2xl font-bold mb-3",
                        theme === 'dark'
                          ? "text-gray-100 group-hover:text-blue-400"
                          : "text-gray-900 group-hover:text-blue-600"
                      )}>
                        {service.title}
                      </h3>
                      <p className={cn(
                        "mb-8",
                        theme === 'dark' ? "text-gray-400" : "text-gray-600"
                      )}>
                        {service.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-6 border-t">
                      <span className={cn(
                        "text-sm font-bold",
                        theme === 'dark'
                          ? "text-blue-400 group-hover:text-blue-300"
                          : "text-blue-600 group-hover:text-blue-500"
                      )}>
                        Learn More
                      </span>
                      <div className={cn(
                        "p-2 rounded-full transition-all group-hover:bg-blue-500/10",
                        theme === 'dark'
                          ? "group-hover:border-blue-500/30"
                          : "group-hover:border-blue-200"
                      )}>
                        <ArrowRight className={cn(
                          "h-5 w-5 transition-transform group-hover:translate-x-2",
                          theme === 'dark' ? "text-blue-400" : "text-blue-600"
                        )} />
                      </div>
                    </div>
                  </div>

                  {/* Hover Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:via-blue-500/2 group-hover:to-purple-500/5 transition-all duration-500 pointer-events-none" />
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Premium CTA Section */}
      <CallToAction
        pageType="industries"
        title={`Lead the Future of ${industry.title}`}
        description={`Partner with us to deploy scalable, secure, and intelligent solutions designed specifically for the complexities of the ${industry.title} industry.`}
        theme={theme}
        className="mb-24"
      />
    </main>
  );
}
