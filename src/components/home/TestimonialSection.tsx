import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight, Star, ArrowRight, Sparkles, Target, Zap, Award } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/providers/ThemeProvider';
import OptimizedImage from '@/components/core/OptimizedImage';
import { Link } from 'react-router-dom';

const testimonials = [
    {
        name: "Thomas R.",
        role: "CEO, NexaCorp Systems",
        content: "BDS transformed our data infrastructure. Their AI-driven insights helped us increase operational efficiency by 35%.",
        stars: 5,
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&h=300&auto=format&fit=crop"
    },
    {
        name: "Sarah Jenkins",
        role: "Director of Operations",
        content: "The digital transformation roadmap provided by BDS was clear, actionable, and delivered exactly what was promised.",
        stars: 5,
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300&h=300&auto=format&fit=crop"
    },
    {
        name: "Michael Chen",
        role: "CTO, FinTech Innovation",
        content: "Working with BDS on our cloud migration was seamless. They understood our security concerns perfectly.",
        stars: 5,
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&h=300&auto=format&fit=crop"
    }
];

const TestimonialSection = () => {
    const { theme } = useTheme();
    const [current, setCurrent] = useState(0);

    const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
    const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

    return (
        <section className="py-12 sm:py-16 md:py-1 px-2 sm:px-6 relative overflow-hidden">
            {/* Background decoration */}
            <div className="hidden sm:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[400px] md:w-[500px] h-[300px] sm:h-[400px] md:h-[500px] bg-blue-500/5 dark:bg-blue-400/5 blur-[60px] sm:blur-[80px] rounded-full -z-10" />

            {/* Left side decorative elements */}
            <div className="hidden lg:block absolute left-4 top-1/4 -translate-y-1/2 opacity-30">
                <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="p-4 rounded-full bg-blue-500/10 backdrop-blur-sm"
                >
                    <Target className="w-8 h-8 text-blue-500" />
                </motion.div>
            </div>

            <div className="hidden xl:block absolute left-10 bottom-1/3 opacity-20">
                <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="p-3 rounded-lg bg-gradient-to-br from-blue-500/10 to-purple-500/10"
                >
                    <Sparkles className="w-6 h-6 text-purple-500" />
                </motion.div>
            </div>

            {/* Right side decorative elements */}
            <div className="hidden lg:block absolute right-4 top-1/3 -translate-y-1/2 opacity-30">
                <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="p-4 rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 backdrop-blur-sm"
                >
                    <Zap className="w-8 h-8 text-cyan-500" />
                </motion.div>
            </div>

            <div className="hidden xl:block absolute right-10 bottom-1/4 opacity-20">
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="p-3 rounded-lg bg-gradient-to-tr from-blue-500/10 to-pink-500/10"
                >
                    <Award className="w-6 h-6 text-pink-500" />
                </motion.div>
            </div>

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-10 sm:mb-12 md:mb-16">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-blue-500 font-bold uppercase tracking-widest text-xs"
                    >
                        Client Impressions
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className={cn(
                            "text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mt-2 sm:mt-3 mb-3 sm:mb-4",
                            theme === 'dark' ? "text-white" : "text-gray-900"
                        )}
                    >
                        What Leaders Say About Us
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className={cn(
                            "max-w-2xl mx-auto text-sm sm:text-base md:text-lg",
                            theme === 'dark' ? "text-gray-400" : "text-gray-600"
                        )}
                    >
                        We pride ourselves on building lasting partnerships based on trust and exceptional results.
                    </motion.p>
                </div>

                {/* Testimonial Content */}
                <div className="relative">
                    <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-10 md:gap-1">
                        {/* Visual Part */}
                        <div className="w-full lg:w-1/2 relative order-2 lg:order-1">
                            <div className="flex items-center justify-center">
                                <div className="relative">
                                    {/* Decorative background circles */}
                                    <div className="absolute -inset-4 sm:-inset-6 -z-10">
                                        <div className="absolute inset-0 border-2 border-blue-500/5 dark:border-blue-400/5 rounded-[3rem] sm:rounded-[4rem] animate-pulse" />
                                        <div className="absolute inset-4 border-2 border-blue-500/10 dark:border-blue-400/10 rounded-[3rem] sm:rounded-[4rem] animate-[spin_8s_linear_infinite]" />
                                    </div>

                                    {/* Main image container */}
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={current}
                                            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                            exit={{ opacity: 0, scale: 0.8, rotate: 10 }}
                                            className="relative z-10"
                                        >
                                            <div className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden shadow-xl sm:shadow-2xl border-4 border-white dark:border-gray-800">
                                                <OptimizedImage
                                                    src={testimonials[current].image}
                                                    alt={testimonials[current].name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>

                                            {/* Quote icon */}
                                            <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 bg-blue-600 text-white p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl z-20">
                                                <Quote className="w-5 h-5 sm:w-6 sm:h-6" />
                                            </div>
                                        </motion.div>
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>

                        {/* Content Part */}
                        <div className="w-full lg:w-1/2 order-1 lg:order-2">
                            <div className="flex flex-col justify-center">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={current}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-4 sm:space-y-5 md:space-y-6"
                                    >
                                        {/* Stars */}
                                        <div className="flex gap-1">
                                            {[...Array(testimonials[current].stars)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className="w-5 h-5 sm:w-6 sm:h-6 fill-yellow-500 text-yellow-500"
                                                />
                                            ))}
                                        </div>

                                        {/* Quote text */}
                                        <p className={cn(
                                            "text-lg sm:text-xl md:text-2xl leading-relaxed font-medium italic",
                                            theme === 'dark' ? "text-gray-200" : "text-gray-800"
                                        )}>
                                            "{testimonials[current].content}"
                                        </p>

                                        {/* Author info */}
                                        <div className="space-y-1">
                                            <h4 className={cn(
                                                "text-xl sm:text-2xl font-bold",
                                                theme === 'dark' ? "text-white" : "text-gray-900"
                                            )}>
                                                {testimonials[current].name}
                                            </h4>
                                            <p className="text-blue-500 font-medium text-base sm:text-lg">
                                                {testimonials[current].role}
                                            </p>
                                        </div>
                                    </motion.div>
                                </AnimatePresence>

                                {/* Navigation */}
                                <div className="flex items-center justify-between mt-8 sm:mt-5">
                                    <div className="flex gap-3">
                                        <button
                                            onClick={prev}
                                            className={cn(
                                                "p-3 rounded-full border transition-all hover:scale-110 active:scale-95",
                                                theme === 'dark' ? "border-gray-700 hover:bg-gray-800 text-white" : "border-gray-200 hover:bg-gray-100 text-gray-900"
                                            )}
                                            aria-label="Previous testimonial"
                                        >
                                            <ChevronLeft className="w-6 h-6" />
                                        </button>
                                        <button
                                            onClick={next}
                                            className={cn(
                                                "p-3 rounded-full border transition-all hover:scale-110 active:scale-95",
                                                theme === 'dark' ? "border-gray-700 hover:bg-gray-800 text-white" : "border-gray-200 hover:bg-gray-100 text-gray-900"
                                            )}
                                            aria-label="Next testimonial"
                                        >
                                            <ChevronRight className="w-6 h-6" />
                                        </button>
                                    </div>

                                    {/* Pagination dots */}
                                    <div className="flex gap-1.5">
                                        {testimonials.map((_, i) => (
                                            <button
                                                key={i}
                                                onClick={() => setCurrent(i)}
                                                className={cn(
                                                    "h-1.5 transition-all rounded-full",
                                                    i === current ? "w-8 bg-blue-500" : "w-2 bg-blue-500/20 hover:bg-blue-500/40"
                                                )}
                                                aria-label={`Go to testimonial ${i + 1}`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* View all link */}
                <div className="mt-12 sm:mt-16 text-center">
                    <Link
                        to="/testimonials"
                        className={cn(
                            "inline-flex items-center gap-2 font-bold transition-all group px-4 py-2 rounded-lg hover:shadow-lg",
                            theme === 'dark'
                                ? "text-gray-300 hover:text-white bg-gray-800/30 hover:bg-gray-800/50"
                                : "text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200"
                        )}
                    >
                        <span className="text-base sm:text-lg">View all success stories</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>


            </div>
        </section>
    );
};

export default TestimonialSection;