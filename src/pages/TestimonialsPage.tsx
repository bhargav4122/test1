import React from 'react';
import SEO from '@/components/common/SEO';
import Layout from '@/components/layout/Layout';
import ConsistentPageHeader from '@/components/layout/ConsistentPageHeader';
import { motion } from 'framer-motion';
import { Quote, Star, User } from 'lucide-react';
import OptimizedImage from '@/components/core/OptimizedImage';
import { cn } from '@/lib/utils';
import { useTheme } from '@/providers/ThemeProvider';
import CallToAction from '@/components/home/CallToAction';

const testimonials = [
    {
        name: "Thomas R.",
        role: "CEO, NexaCorp Systems",
        content: "BDS transformed our data infrastructure. Their AI-driven insights helped us increase operational efficiency by 35% within the first six months. A true strategic partner.",
        stars: 5,
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&auto=format&fit=crop"
    },
    {
        name: "Sarah Jenkins",
        role: "Director of Operations, Global Logistics",
        content: "The digital transformation roadmap provided by BDS was clear, actionable, and delivered exactly what was promised. Their team is exceptionally professional.",
        stars: 5,
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&h=200&auto=format&fit=crop"
    },
    {
        name: "Michael Chen",
        role: "CTO, FinTech Innovation",
        content: "Working with BDS on our cloud migration was seamless. They understood our security concerns and implemented a robust architecture that scales effortlessly.",
        stars: 5,
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&h=200&auto=format&fit=crop"
    },
    {
        name: "Elena Rodriguez",
        role: "Head of Marketing, Retail Evolution",
        content: "Their market research and consumer voice analysis gave us a competitive edge we didn't know we were missing. Highly recommend their consulting services.",
        stars: 5,
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop"
    }
];

const TestimonialsPage = () => {
    const { theme } = useTheme();

    return (
        <>
            <SEO
                title="Client Success Stories | Testimonials"
                description="Read what our clients have to say about their experience working with Business and Data Solutions."
                keywords="testimonials, client reviews, customer success stories, business solutions feedback"
            />

            <ConsistentPageHeader
                title="Client Success Stories"
                description="Hear from the leaders and organizations we've helped transform through data, technology, and strategic innovation."
                categoryLabel="Testimonials"
                backgroundImage="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80"
            />

            <div className="max-w-7xl mx-auto px-4 py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={cn(
                                "p-8 rounded-3xl border relative group overflow-hidden",
                                theme === 'dark'
                                    ? "bg-gray-900/50 border-gray-800 hover:border-blue-500/30"
                                    : "bg-white border-gray-100 shadow-sm hover:shadow-xl"
                            )}
                        >
                            {/* Decorative elements */}
                            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                <Quote size={80} />
                            </div>

                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-blue-500/20">
                                    <OptimizedImage
                                        src={testimonial.image}
                                        alt={testimonial.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div>
                                    <h3 className={cn(
                                        "font-bold text-lg",
                                        theme === 'dark' ? "text-white" : "text-gray-900"
                                    )}>
                                        {testimonial.name}
                                    </h3>
                                    <p className="text-sm text-blue-500 font-medium">{testimonial.role}</p>
                                </div>
                            </div>

                            <div className="flex gap-1 mb-4">
                                {[...Array(testimonial.stars)].map((_, i) => (
                                    <Star key={i} size={16} className="fill-yellow-500 text-yellow-500" />
                                ))}
                            </div>

                            <p className={cn(
                                "text-lg leading-relaxed italic relative z-10",
                                theme === 'dark' ? "text-gray-300" : "text-gray-600"
                            )}>
                                "{testimonial.content}"
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Call to Action */}
                <CallToAction pageType="testimonials" />
            </div>
        </>
    );
};

export default TestimonialsPage;
