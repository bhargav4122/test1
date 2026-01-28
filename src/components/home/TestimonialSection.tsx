import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight, Star, ArrowRight, ExternalLink, Check, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/providers/ThemeProvider';
import OptimizedImage from '@/components/core/OptimizedImage';
import { Link } from 'react-router-dom';

const testimonials = [
    {
        name: "Nexmin",
        role: "Online Grocery Store",
        content: "Business and Data Solutions helped us automate our operations end-to-end, reducing manual work and improving order accuracy across our platform.",
        stars: 5,
        logo: "https://res.cloudinary.com/dsf4d41i8/image/upload/v1769445144/58e265cd-9fea-44a8-9b87-10aa277477a9.png",
        website: "https://www.nexmin.co.uk/",
        industry: "Retail",
        results: ["80% faster operations", "95% order accuracy", "40% cost reduction"]
    },
    {
        name: "Validation Networks",
        role: "Pharmaceutical Validation Services",
        content: "Business and Data Solutions delivered clear, actionable dashboards that changed how we monitor performance and make decisions.",
        stars: 5,
        logo: "https://res.cloudinary.com/dsf4d41i8/image/upload/v1769445214/058ac7dc-2649-4aa7-aae3-0caec6c22091.png",
        website: "https://www.validationnetwork.com/",
        industry: "Healthcare",
        results: ["Real-time analytics", "Improved compliance", "Faster reporting"]
    },
    {
        name: "Nam Solicitors",
        role: "Legal Practice",
        content: "The branding services from Business and Data Solutions gave our firm a strong, professional identity that resonates with our clients.",
        stars: 5,
        logo: "https://res.cloudinary.com/dsf4d41i8/image/upload/v1769445314/Logo_Transperant_Background_grfdou.png",
        website: "", // No website link
        industry: "Legal",
        results: ["Strong brand identity", "Client engagement +60%", "Modern visual system"]
    },
    {
        name: "Gloucester Shawarma",
        role: "Takeaway Restaurant",
        content: "Business and Data Solutions boosted our digital presence, helping us reach new customers and grow our online orders significantly.",
        stars: 5,
        logo: "", // No logo - will show initials
        website: "https://gloucestershawarma.co.uk/",
        industry: "Food & Beverage",
        results: ["Online orders +150%", "Social media growth", "Brand recognition"]
    },
    {
        name: "Super E Twin Bikes",
        role: "E-Moped Rentals",
        content: "Their business growth consulting helped us refine operations and unlock new revenue streams in the e-mobility space.",
        stars: 5,
        logo: "https://res.cloudinary.com/dsf4d41i8/image/upload/v1769445414/6f037f86-6db7-42df-a6db-373ef27fbf35.png",
        website: "https://superetwins.co.uk/",
        industry: "Transportation",
        results: ["New revenue streams", "Operational efficiency", "Market expansion"]
    }
];

const TestimonialSection = () => {
    const { theme } = useTheme();
    const [current, setCurrent] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [imageError, setImageError] = useState<boolean[]>(
        testimonials.map(testimonial => !testimonial.logo)
    );

    const next = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setCurrent((prev) => (prev + 1) % testimonials.length);
        setTimeout(() => setIsAnimating(false), 500);
    };

    const prev = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
        setTimeout(() => setIsAnimating(false), 500);
    };

    // Generate initials from company name
    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    // Generate gradient based on name
    const getGradient = (name: string) => {
        const colors = [
            'from-blue-500 to-purple-600',
            'from-emerald-500 to-cyan-600',
            'from-amber-500 to-orange-600',
            'from-rose-500 to-pink-600',
            'from-indigo-500 to-blue-600',
            'from-teal-500 to-emerald-600',
            'from-violet-500 to-purple-600',
            'from-sky-500 to-blue-600'
        ];
        const index = name.length % colors.length;
        return colors[index];
    };

    const handleImageError = (index: number) => {
        const newErrors = [...imageError];
        newErrors[index] = true;
        setImageError(newErrors);
    };

    useEffect(() => {
        // Reset image errors when testimonial changes
        setImageError(testimonials.map(testimonial => !testimonial.logo));
    }, [current]);

    const shouldShowInitials = !testimonials[current].logo || imageError[current];
    const hasWebsite = testimonials[current].website &&
        testimonials[current].website.trim() !== '' &&
        testimonials[current].website.startsWith('http');

    return (
        <section className="relative py-1 sm:py-2 md:py-2 px-4 sm:px-6 overflow-hidden">
            {/* Premium background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 -left-20 w-72 h-72 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-gradient-to-l from-purple-500/5 to-pink-500/5 rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-500/3 to-purple-500/3 rounded-full blur-3xl" />

                {/* Grid pattern */}
                <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-12 sm:mb-16 md:mb-20">
                    <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 backdrop-blur-sm border border-blue-500/20">
                        <Sparkles className="w-4 h-4 text-blue-500" />
                        <span className="text-sm font-semibold text-blue-500">TRUSTED BY INDUSTRY LEADERS</span>
                    </div>

                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-200 dark:to-white bg-clip-text text-transparent">
                        Client Success Stories
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Discover how businesses transformed their operations with our solutions
                    </p>
                </div>

                {/* Main Content */}
                <div className="relative">
                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                        {/* Logo/Visual Side - Premium Design */}
                        <div className="order-2 lg:order-1">
                            <div className="relative">
                                {/* Decorative border */}
                                <div className="absolute -inset-4 lg:-inset-6 -z-10">
                                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/5 via-transparent to-purple-500/5" />
                                    <div className="absolute inset-0 rounded-3xl border border-gray-200/50 dark:border-gray-700/50" />
                                </div>

                                {/* Main logo container */}
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={current}
                                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                                        transition={{ duration: 0.5 }}
                                        className="relative bg-gradient-to-br from-white/90 to-gray-50/90 dark:from-gray-900/90 dark:to-gray-800/90 backdrop-blur-xl rounded-2xl lg:rounded-3xl p-6 lg:p-8 shadow-2xl border border-gray-100/50 dark:border-gray-700/50"
                                    >
                                        {/* Logo display area */}
                                        <div className="relative">
                                            {/* Logo or Initials */}
                                            <div className="flex flex-col items-center justify-center p-6 lg:p-8">
                                                {!shouldShowInitials ? (
                                                    // Display Logo
                                                    <div className="relative w-full max-w-xs h-32">
                                                        <OptimizedImage
                                                            src={testimonials[current].logo}
                                                            alt={`${testimonials[current].name} logo`}
                                                            className="object-contain object-center w-full h-full p-4"
                                                            fill
                                                            onError={() => handleImageError(current)}
                                                        />
                                                    </div>
                                                ) : (
                                                    // Display Initials
                                                    <div className={cn(
                                                        "w-48 h-48 rounded-2xl flex items-center justify-center bg-gradient-to-br shadow-xl",
                                                        getGradient(testimonials[current].name)
                                                    )}>
                                                        <span className="text-5xl lg:text-6xl font-bold text-white">
                                                            {getInitials(testimonials[current].name)}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Industry badge */}
                                            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                                <div className="px-4 py-1.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-semibold rounded-full shadow-lg">
                                                    {testimonials[current].industry}
                                                </div>
                                            </div>

                                            {/* Website link - Only show if there's a valid URL */}
                                            {hasWebsite && (
                                                <motion.a
                                                    href={testimonials[current].website}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="absolute -bottom-3 right-4 inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm font-semibold rounded-full shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 border border-gray-200 dark:border-gray-700"
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    <span>Visit Site</span>
                                                    <ExternalLink className="w-3 h-3" />
                                                </motion.a>
                                            )}
                                        </div>

                                        {/* Key results */}
                                        <div className="mt-8 lg:mt-10 space-y-3">
                                            <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                                                Key Results
                                            </h4>
                                            <div className="space-y-2">
                                                {testimonials[current].results?.map((result, index) => (
                                                    <div key={index} className="flex items-center gap-2">
                                                        <Check className="w-4 h-4 text-green-500" />
                                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                            {result}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                </AnimatePresence>

                                {/* Quote icon */}
                                <div className="absolute -top-4 -right-4 z-20">
                                    <div className="p-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-full shadow-xl">
                                        <Quote className="w-6 h-6" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Content Side */}
                        <div className="order-1 lg:order-2">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={current}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    transition={{ duration: 0.5 }}
                                    className="space-y-6 lg:space-y-8"
                                >
                                    {/* Stars */}
                                    <div className="flex gap-1">
                                        {[...Array(testimonials[current].stars)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className="w-6 h-6 lg:w-7 lg:h-7 fill-amber-400 text-amber-400 drop-shadow-sm"
                                            />
                                        ))}
                                    </div>

                                    {/* Quote */}
                                    <blockquote className="relative">
                                        <div className="absolute -left-6 top-0 text-8xl font-serif text-gray-200 dark:text-gray-800 select-none">
                                            "
                                        </div>
                                        <p className={cn(
                                            "text-xl lg:text-2xl xl:text-3xl leading-relaxed lg:leading-relaxed font-medium relative z-10 pl-6",
                                            theme === 'dark' ? "text-gray-100" : "text-gray-800"
                                        )}>
                                            {testimonials[current].content}
                                        </p>
                                    </blockquote>

                                    {/* Author info */}
                                    <div className="space-y-2">
                                        <h3 className={cn(
                                            "text-2xl lg:text-3xl font-bold",
                                            theme === 'dark' ? "text-white" : "text-gray-900"
                                        )}>
                                            {testimonials[current].name}
                                        </h3>
                                        <p className="text-lg font-medium bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                                            {testimonials[current].role}
                                        </p>
                                    </div>

                                    {/* Navigation */}
                                    <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-800">
                                        <div className="flex items-center gap-4">
                                            <button
                                                onClick={prev}
                                                disabled={isAnimating}
                                                className={cn(
                                                    "p-3 rounded-full transition-all duration-300 hover:scale-110 active:scale-95 disabled:opacity-50",
                                                    theme === 'dark'
                                                        ? "bg-gray-800 hover:bg-gray-700 text-white border border-gray-700"
                                                        : "bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 shadow-sm"
                                                )}
                                                aria-label="Previous testimonial"
                                            >
                                                <ChevronLeft className="w-5 h-5 lg:w-6 lg:h-6" />
                                            </button>
                                            <button
                                                onClick={next}
                                                disabled={isAnimating}
                                                className={cn(
                                                    "p-3 rounded-full transition-all duration-300 hover:scale-110 active:scale-95 disabled:opacity-50",
                                                    theme === 'dark'
                                                        ? "bg-gray-800 hover:bg-gray-700 text-white border border-gray-700"
                                                        : "bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 shadow-sm"
                                                )}
                                                aria-label="Next testimonial"
                                            >
                                                <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6" />
                                            </button>
                                        </div>

                                        {/* Pagination */}
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                                {String(current + 1).padStart(2, '0')} / {String(testimonials.length).padStart(2, '0')}
                                            </span>
                                            <div className="flex gap-1.5">
                                                {testimonials.map((_, i) => (
                                                    <button
                                                        key={i}
                                                        onClick={() => !isAnimating && setCurrent(i)}
                                                        disabled={isAnimating}
                                                        className={cn(
                                                            "h-1.5 transition-all duration-300 rounded-full",
                                                            i === current
                                                                ? "w-8 bg-gradient-to-r from-blue-600 to-cyan-600"
                                                                : "w-2 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600"
                                                        )}
                                                        aria-label={`Go to testimonial ${i + 1}`}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

                {/* View All Link */}
                <div className="mt-16 lg:mt-20 text-center">
                    <Link
                        to="/testimonials"
                        className={cn(
                            "group inline-flex items-center gap-3 px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:shadow-xl",
                            theme === 'dark'
                                ? "bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 text-white border border-gray-700"
                                : "bg-gradient-to-r from-white to-gray-50 hover:from-gray-50 hover:to-gray-100 text-gray-900 border border-gray-200 shadow-md"
                        )}
                    >
                        <span className="text-base lg:text-lg">Explore All Case Studies</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default TestimonialSection;
