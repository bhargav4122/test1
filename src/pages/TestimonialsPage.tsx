import React, { useState } from 'react';
import SEO from '@/components/common/SEO';
import Layout from '@/components/layout/Layout';
import ConsistentPageHeader from '@/components/layout/ConsistentPageHeader';
import { motion } from 'framer-motion';
import { Quote, Star, ExternalLink, Sparkles, Award, TrendingUp, Target, Zap, Filter } from 'lucide-react';
import OptimizedImage from '@/components/core/OptimizedImage';
import { cn } from '@/lib/utils';
import { useTheme } from '@/providers/ThemeProvider';
import CallToAction from '@/components/home/CallToAction';

const testimonials = [
    {
        name: "Nexmin",
        role: "Online Grocery Store",
        content: "Business and Data Solutions helped us automate our operations end-to-end, reducing manual work and improving order accuracy across our platform.",
        stars: 5,
        logo: "https://res.cloudinary.com/dsf4d41i8/image/upload/v1769445144/58e265cd-9fea-44a8-9b87-10aa277477a9.png",
        website: "https://www.nexmin.co.uk/",
        industry: "Retail",
        results: ["80% faster operations", "95% order accuracy", "40% cost reduction"],
        featured: true
    },
    {
        name: "Validation Networks",
        role: "Pharmaceutical Validation Services",
        content: "Business and Data Solutions delivered clear, actionable dashboards that changed how we monitor performance and make decisions.",
        stars: 5,
        logo: "https://res.cloudinary.com/dsf4d41i8/image/upload/v1769445214/058ac7dc-2649-4aa7-aae3-0caec6c22091.png",
        website: "https://www.validationnetwork.com/",
        industry: "Healthcare",
        results: ["Real-time analytics", "Improved compliance", "Faster reporting"],
        featured: true
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
        results: ["Online orders +150%", "Social media growth", "Brand recognition"],
        featured: true
    },
    {
        name: "Super E Twin Bikes",
        role: "E-Moped Rentals",
        content: "Their business growth consulting helped us refine operations and unlock new revenue streams in the e-mobility space.",
        stars: 5,
        logo: "https://res.cloudinary.com/dsf4d41i8/image/upload/v1769445414/6f037f86-6db7-42df-a6db-373ef27fbf35.png",
        website: "https://superetwins.co.uk/",
        industry: "Transportation",
        results: ["New revenue streams", "Operational efficiency", "Market expansion"],
        featured: true
    }
];

const industries = ["All", "Retail", "Healthcare", "Legal", "Food & Beverage", "Transportation", "Technology", "Fitness", "Agriculture"];

const TestimonialsPage = () => {
    const { theme } = useTheme();
    const [selectedIndustry, setSelectedIndustry] = useState("All");
    const [showFeatured, setShowFeatured] = useState(false);
    const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

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
        setImageErrors(prev => ({ ...prev, [index]: true }));
    };

    // Filter testimonials
    const filteredTestimonials = testimonials.filter(testimonial => {
        if (showFeatured && !testimonial.featured) return false;
        if (selectedIndustry !== "All" && testimonial.industry !== selectedIndustry) return false;
        return true;
    });

    // Stats for header
    const stats = [
        { value: "100%", label: "Client Satisfaction", icon: Star },
        { value: "5.0", label: "Average Rating", icon: Award },
        { value: "15+", label: "Projects Delivered", icon: Target },
        { value: "95%", label: "Retention Rate", icon: TrendingUp }
    ];

    return (
        <>
            <SEO
                title="Client Success Stories | Testimonials"
                description="Read what our clients have to say about their experience working with Business and Data Solutions. Discover real results and transformations."
                keywords="testimonials, client reviews, customer success stories, business solutions feedback, case studies"
            />

            <ConsistentPageHeader
                title="Client Success Stories"
                description="Discover how businesses across industries have transformed their operations, achieved measurable results, and accelerated growth with our solutions."
                categoryLabel="Testimonials"
                backgroundImage="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80"
            />

            {/* Stats Section */}
            <div className="relative overflow-hidden py-2">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className={cn(
                                    "p-6 rounded-2xl backdrop-blur-sm border",
                                    theme === 'dark'
                                        ? "bg-gray-900/30 border-gray-800"
                                        : "bg-white/80 border-gray-100 shadow-lg"
                                )}
                            >
                                <div className="flex items-center gap-3 mb-2">
                                    <div className={cn(
                                        "p-2 rounded-lg",
                                        theme === 'dark' ? "bg-blue-500/10" : "bg-blue-50"
                                    )}>
                                        <stat.icon className="w-5 h-5 text-blue-500" />
                                    </div>
                                    <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                                        {stat.value}
                                    </span>
                                </div>
                                <p className={cn(
                                    "text-sm font-medium",
                                    theme === 'dark' ? "text-gray-400" : "text-gray-600"
                                )}>
                                    {stat.label}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div className="flex items-center gap-3">
                        <Filter className="w-5 h-5 text-blue-500" />
                        <h3 className={cn(
                            "text-lg font-semibold",
                            theme === 'dark' ? "text-gray-200" : "text-gray-800"
                        )}>
                            Filter by Industry
                        </h3>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {industries.map((industry) => (
                            <button
                                key={industry}
                                onClick={() => setSelectedIndustry(industry)}
                                className={cn(
                                    "px-4 py-2 rounded-full text-sm font-medium transition-all",
                                    selectedIndustry === industry
                                        ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg"
                                        : theme === 'dark'
                                            ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                )}
                            >
                                {industry}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={() => setShowFeatured(!showFeatured)}
                        className={cn(
                            "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all",
                            showFeatured
                                ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg"
                                : theme === 'dark'
                                    ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        )}
                    >
                        <Sparkles className="w-4 h-4" />
                        {showFeatured ? "Showing Featured" : "Show Featured"}
                    </button>
                </div>

                {/* Testimonials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredTestimonials.map((testimonial, index) => {
                        const hasWebsite = testimonial.website && testimonial.website.trim() !== '' && testimonial.website.startsWith('http');
                        const hasLogo = testimonial.logo && testimonial.logo.trim() !== '';
                        const shouldShowInitials = !hasLogo || imageErrors[index];

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ delay: index * 0.05, duration: 0.5 }}
                                className={cn(
                                    "group relative overflow-hidden rounded-3xl border transition-all duration-300 hover:scale-[1.02]",
                                    theme === 'dark'
                                        ? "bg-gray-900/50 border-gray-800 hover:border-blue-500/30"
                                        : "bg-white border-gray-100 shadow-lg hover:shadow-2xl"
                                )}
                            >
                                {/* Decorative background elements */}
                                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                {/* Content */}
                                <div className="relative z-10 p-6">
                                    {/* Header with badges */}
                                    <div className="flex items-start justify-between mb-6">
                                        {/* Logo/Initials and Name */}
                                        <div className="flex items-center gap-4 flex-1 min-w-0">
                                            {!shouldShowInitials ? (
                                                // Display Logo - USING BACKGROUND COVER
                                                <div className="relative flex-shrink-0">
                                                    <div className="
                                                                        w-25 h-25 sm:w-24 sm:h-24
                                                                        flex items-center justify-center
                                                                        p-3
                                                                        transition-all
                                                                        duration-300
                                                                        hover:scale-105
                                                                    ">
                                                        {!imageErrors[index] ? (
                                                            <img
                                                                src={testimonial.logo}
                                                                alt={testimonial.name}
                                                                className="
                                                                        max-w-full
                                                                        max-h-full
                                                                        object-contain
                                                                        opacity-70
                                                                        grayscale
                                                                        transition-all
                                                                        duration-300
                                                                        hover:opacity-100
                                                                        hover:grayscale-0
                                                                        hover:drop-shadow-md
                                                                    "
                                                                onError={() => handleImageError(index)}
                                                            />
                                                        ) : (
                                                            <div className={cn(
                                                                "w-full h-full rounded-xl flex items-center justify-center",
                                                                getGradient(testimonial.name)
                                                            )}>
                                                                <span className="text-xl font-semibold text-white">
                                                                    {getInitials(testimonial.name)}
                                                                </span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>

                                            ) : (
                                                // Display Initials - Circle shape
                                                <div className={cn(
                                                    "w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0",
                                                    getGradient(testimonial.name)
                                                )}>
                                                    <span className="text-2xl font-bold text-primary">
                                                        {getInitials(testimonial.name)}
                                                    </span>
                                                </div>
                                            )}

                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h3 className={cn(
                                                        "font-bold text-lg truncate",
                                                        theme === 'dark' ? "text-white" : "text-gray-900"
                                                    )}>
                                                        {testimonial.name}
                                                    </h3>
                                                    {testimonial.featured && (
                                                        <div className="flex items-center gap-1 px-2 py-0.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold rounded-full flex-shrink-0">
                                                            <Sparkles className="w-3 h-3" />
                                                        </div>
                                                    )}
                                                </div>
                                                <p className="text-sm font-medium bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent truncate">
                                                    {testimonial.role}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Industry badge - now positioned to the right */}
                                        <div className="ml-2">
                                            <div className="px-3 py-1.5 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 backdrop-blur-sm border border-blue-500/20 text-blue-500 text-xs font-semibold rounded-full whitespace-nowrap">
                                                {testimonial.industry}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Stars - now below header */}
                                    <div className="flex gap-1 mb-4">
                                        {[...Array(testimonial.stars)].map((_, i) => (
                                            <Star key={i} size={18} className="fill-amber-400 text-amber-400 drop-shadow-sm" />
                                        ))}
                                    </div>

                                    {/* Quote - Fixed positioning */}
                                    <div className="relative mb-6">
                                        <div className="absolute -left-3 -top-4 text-6xl font-serif text-gray-300 dark:text-gray-700 opacity-50 select-none">
                                            "
                                        </div>
                                        <p className={cn(
                                            "text-base leading-relaxed italic relative z-10 pl-6 line-clamp-4",
                                            theme === 'dark' ? "text-gray-300" : "text-gray-600"
                                        )}>
                                            {testimonial.content}
                                        </p>
                                    </div>

                                    {/* Key Results */}
                                    <div className="space-y-2 mb-6">
                                        <h4 className={cn(
                                            "text-xs font-semibold uppercase tracking-wider",
                                            theme === 'dark' ? "text-gray-400" : "text-gray-500"
                                        )}>
                                            Key Results
                                        </h4>
                                        <div className="space-y-1">
                                            {testimonial.results?.slice(0, 2).map((result, i) => (
                                                <div key={i} className="flex items-center gap-2">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                                    <span className={cn(
                                                        "text-sm line-clamp-1",
                                                        theme === 'dark' ? "text-gray-400" : "text-gray-600"
                                                    )}>
                                                        {result}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Website Link */}
                                    {hasWebsite && (
                                        <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
                                            <a
                                                href={testimonial.website}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 text-sm font-medium text-blue-500 hover:text-blue-600 transition-colors group/link"
                                            >
                                                <span>Visit their website</span>
                                                <ExternalLink className="w-4 h-4 group-hover/link:translate-x-0.5 transition-transform" />
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* No results message */}
                {filteredTestimonials.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center py-16"
                    >
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 mb-4">
                            <Zap className="w-10 h-10 text-blue-500" />
                        </div>
                        <h3 className={cn(
                            "text-xl font-bold mb-2",
                            theme === 'dark' ? "text-white" : "text-gray-900"
                        )}>
                            No testimonials found
                        </h3>
                        <p className={cn(
                            "text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto"
                        )}>
                            Try adjusting your filters or browse all our client success stories.
                        </p>
                        <button
                            onClick={() => {
                                setSelectedIndustry("All");
                                setShowFeatured(false);
                            }}
                            className="px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-medium rounded-full hover:shadow-lg transition-all"
                        >
                            Show All Testimonials
                        </button>
                    </motion.div>
                )}
            </div>

            {/* Call to Action */}
            <CallToAction pageType="testimonials" />
        </>
    );
};

TestimonialsPage.layout = Layout;
export default TestimonialsPage;

