import React from 'react';
import SEO from '@/components/common/SEO';
import Layout from '@/components/layout/Layout';
import ConsistentPageHeader from '@/components/layout/ConsistentPageHeader';
import { motion } from 'framer-motion';
import { Lightbulb, Rocket, Shield, LineChart, Cpu, Cloud, Database } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/providers/ThemeProvider';
import OptimizedImage from '@/components/core/OptimizedImage';

const useCases = [
    {
        title: "AI-Powered Customer Support",
        category: "Automation",
        icon: Cpu,
        description: "Reducing response times by 80% using intelligent LLM-based agents integrated with existing CRM systems.",
        image: "https://res.cloudinary.com/dsf4d41i8/image/upload/v1769603365/Copilot_20260128_122627_tj8qpp.webp",
        impact: ["80% faster response", "24/7 availability", "40% cost reduction"]
    },
    {
        title: "Real-time Supply Chain Digital Twin",
        category: "Cloud & Data",
        icon: Database,
        description: "Creating a virtualization of logistics processes to predict bottlenecks and optimize routing in real-time.",
        image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=300&fit=crop&q=80",
        impact: ["15% fuel savings", "Real-time tracking", "Predictive maintenance"]
    },
    {
        title: "Secure Enterprise Cloud Migration",
        category: "Cloud",
        icon: Cloud,
        description: "Transitioning legacy on-premise infrastructure to an encrypted, zero-trust hybrid cloud environment.",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop&q=80",
        impact: ["99.99% Uptime", "Zero-trust security", "30% cheaper ops"]
    },
    {
        title: "Automated Compliance Reporting",
        category: "Business Intelligence",
        icon: Shield,
        description: "Streamlining financial auditing processes using automated data extraction and validation pipelines.",
        image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=300&fit=crop&q=80",
        impact: ["Error-free reporting", "90% less manual work", "Instant audit trails"]
    }
];

const UseCasesPage = () => {
    const { theme } = useTheme();

    return (
        <>
            <SEO
                title="Strategic Use Cases | Digital Transformation in Action"
                description="Explore real-world examples of how BDS implements data and technology solutions to solve complex business challenges."
                keywords="use cases, case studies, business success stories, digital transformation examples, solution implementation"
            />

            <ConsistentPageHeader
                title="Solutions in Action"
                description="Explore how we apply our core services to solve real-world business challenges across different industries."
                categoryLabel="Use Cases"
            />

            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
                    {useCases.map((useCase, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className={cn(
                                "group flex flex-col md:flex-row rounded-3xl overflow-hidden border transition-all duration-500",
                                theme === 'dark'
                                    ? "bg-gray-900/50 border-gray-800 hover:border-blue-500/30"
                                    : "bg-white border-gray-100 shadow-sm hover:shadow-2xl"
                            )}
                        >
                            <div className="w-full md:w-1/2 aspect-video md:aspect-auto">
                                <OptimizedImage
                                    src={useCase.image}
                                    alt={useCase.title}
                                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                                />
                            </div>

                            <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
                                <div className="flex items-center gap-2 mb-4">
                                    <useCase.icon className="text-blue-500" size={20} />
                                    <span className="text-xs font-bold uppercase tracking-widest text-blue-500/80">
                                        {useCase.category}
                                    </span>
                                </div>

                                <h3 className={cn(
                                    "text-2xl font-bold mb-4",
                                    theme === 'dark' ? "text-white" : "text-gray-900"
                                )}>
                                    {useCase.title}
                                </h3>

                                <p className={cn(
                                    "text-sm mb-6 line-clamp-3",
                                    theme === 'dark' ? "text-gray-400" : "text-gray-600"
                                )}>
                                    {useCase.description}
                                </p>

                                <div className="space-y-2">
                                    <h4 className={cn(
                                        "text-xs font-bold uppercase",
                                        theme === 'dark' ? "text-gray-500" : "text-gray-400"
                                    )}>Key Impact</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {useCase.impact.map((item, i) => (
                                            <span
                                                key={i}
                                                className={cn(
                                                    "px-3 py-1 text-[10px] font-bold rounded-full",
                                                    theme === 'dark' ? "bg-blue-900/40 text-blue-300" : "bg-blue-50 text-blue-700"
                                                )}
                                            >
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Dynamic CTA */}
                <div className="mt-24 text-center">
                    <div className={cn(
                        "inline-block p-1 rounded-full",
                        theme === 'dark' ? "bg-gray-800" : "bg-gray-100"
                    )}>
                        <div className={cn(
                            "flex flex-col md:flex-row items-center gap-4 px-8 py-6 rounded-full border",
                            theme === 'dark' ? "bg-black border-gray-700" : "bg-white border-gray-200 shadow-xl"
                        )}>
                            <div className="flex -space-x-4">
                                {[
                                    "https://res.cloudinary.com/dsf4d41i8/image/upload/v1769445214/058ac7dc-2649-4aa7-aae3-0caec6c22091.webp",
                                    "https://res.cloudinary.com/dsf4d41i8/image/upload/v1769445144/58e265cd-9fea-44a8-9b87-10aa277477a9.webp",
                                    "https://res.cloudinary.com/dsf4d41i8/image/upload/v1769445414/6f037f86-6db7-42df-a6db-373ef27fbf35.webp",
                                    "https://res.cloudinary.com/dsf4d41i8/image/upload/v1769445314/Logo_Transperant_Background_grfdou.webp"
                                ].map((logoUrl, index) => (
                                    <div key={index} className="w-10 h-10 rounded-full border-2 border-black dark:border-gray-900 bg-white flex items-center justify-center overflow-hidden">
                                        <img
                                            src={logoUrl}
                                            alt={`Client ${index + 1}`}
                                            className="w-8 h-8 object-contain"
                                            loading="lazy"
                                        />
                                    </div>
                                ))}
                            </div>

                            <div className="text-left">
                                <p className={cn("text-sm font-bold", theme === 'dark' ? "text-white" : "text-gray-900")}>
                                    Trusted by industry leaders
                                </p>
                                <p className="text-xs text-gray-500">More than 10+ successful implementations</p>
                            </div>
                            <div className="h-8 w-px bg-gray-200 dark:bg-gray-800 hidden md:block mx-4" />
                            <a href="/testimonials" className="text-blue-500 font-bold hover:underline flex items-center gap-1">
                                Read testimonials <Rocket size={16} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UseCasesPage;
