import React from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, Sparkles, ChevronDown } from "lucide-react"; // Changed from ChevronRight to ChevronDown
import { cn } from "@/lib/utils";
import { useTheme } from "@/providers/ThemeProvider";

interface ConsistentPageHeaderProps {
    title: string;
    description: string;
    categoryLabel?: string;
    backLink?: string;
    backLinkLabel?: string;
    className?: string;
    contentPosition?: "left" | "center" | "right";
    height?: "small" | "medium" | "large";
    showCategoryIcon?: boolean;
    titleSize?: "sm" | "md" | "lg" | "xl";
    animatedLetters?: boolean;
    showDivider?: boolean;
    showScrollButton?: boolean; // New prop for scroll button
    scrollTargetId?: string; // ID of element to scroll to
}

const ConsistentPageHeader = ({
    title,
    description,
    categoryLabel,
    backLink,
    backLinkLabel,
    className,
    contentPosition = "center",
    height = "medium",
    showCategoryIcon = true,
    titleSize = "lg",
    animatedLetters = true,
    showDivider = true,
    showScrollButton = false, // Default false, set to true when you want it
    scrollTargetId = "content", // Default target ID
}: ConsistentPageHeaderProps) => {
    const { theme } = useTheme();
    const headerRef = React.useRef<HTMLElement>(null);

    const { scrollYProgress } = useScroll({
        target: headerRef,
        offset: ["start start", "end start"],
    });

    const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

    // REDUCED: Space between navbar and back link
    const heightClasses = {
        small: "min-h-[45vh] pt-24 pb-8",
        medium: "min-h-[55vh] pt-28 pb-10",
        large: "min-h-[65vh] pt-32 pb-12",
    };

    const titleSizeClasses = {
        sm: "text-4xl md:text-5xl lg:text-6xl",
        md: "text-5xl md:text-6xl lg:text-7xl",
        lg: "text-6xl md:text-7xl lg:text-8xl",
        xl: "text-7xl md:text-8xl lg:text-9xl",
    };

    const contentAlignment = {
        left: "items-start text-left",
        center: "items-center text-center",
        right: "items-end text-right",
    };

    // Split title into words for animation
    const titleWords = title.split(" ");
    const descriptionWords = description.split(" ");

    // Function to handle scroll to content
    const handleScrollToContent = () => {
        if (scrollTargetId) {
            const element = document.getElementById(scrollTargetId);
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            } else {
                // Fallback: scroll down by viewport height
                window.scrollBy({ top: window.innerHeight * 0.8, behavior: "smooth" });
            }
        }
    };

    return (
        <section
            ref={headerRef}
            className={cn(
                "relative overflow-hidden",
                heightClasses[height],
                className
            )}
        >
            {/* Subtle Animated Background Effects */}
            <div className="absolute inset-0 z-0">
                {/* Floating particles */}
                <div className="absolute inset-0 overflow-hidden">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <motion.div
                            key={i}
                            className={cn(
                                "absolute rounded-full blur-xl"
                            )}
                            animate={{
                                x: [0, Math.random() * 100 - 50],
                                y: [0, Math.random() * 100 - 50],
                                scale: [1, 1.2, 1],
                            }}
                            transition={{
                                duration: Math.random() * 10 + 15,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            style={{
                                width: Math.random() * 200 + 100,
                                height: Math.random() * 200 + 100,
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                            }}
                        />
                    ))}
                </div>


            </div>

            {/* Main Content */}
            <motion.div
                style={{ opacity, scale }}
                className="relative z-10 h-full"
            >
                <div className={cn(
                    "h-full container-custom px-4 sm:px-6 lg:px-8",
                    "flex flex-col",
                    contentAlignment[contentPosition]
                )}>
                    <div className={cn(
                        "w-full",
                        contentPosition === "center" && "flex flex-col items-center text-center",
                        contentPosition === "left" && "flex flex-col items-start text-left",
                        contentPosition === "right" && "flex flex-col items-end text-right"
                    )}>
                        {/* Back Link - REDUCED margin and simplified styling */}
                        {backLink && (
                            <motion.div
                                initial={{ opacity: 0, x: contentPosition === "center" ? 0 : contentPosition === "left" ? -20 : 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                                className={cn(
                                    "mb-6", // Reduced from mb-8
                                    contentPosition === "center" && "mx-auto",
                                    contentPosition === "left" && "mr-auto",
                                    contentPosition === "right" && "ml-auto"
                                )}
                            >
                                <Link to={backLink}>
                                    <div className={cn(
                                        "group inline-flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-300 p-2",
                                        theme === 'dark'
                                            ? "text-gray-400 hover:text-white hover:bg-white/5 border border-white/10"
                                            : "text-gray-600 hover:text-gray-900 hover:bg-black/5 border border-gray-200"
                                    )}>
                                        <ArrowLeft
                                            size={14}
                                            className="transition-transform group-hover:-translate-x-1"
                                        />
                                        <span className="text-xs font-medium tracking-wide">
                                            {backLinkLabel || "Back"}
                                        </span>
                                    </div>
                                </Link>
                            </motion.div>
                        )}

                        {/* Category Label - REDUCED margin */}
                        {categoryLabel && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
                                className={cn(
                                    "mb-4", // Reduced from mb-6
                                    contentPosition === "center" && "mx-auto",
                                    contentPosition === "left" && "mr-auto",
                                    contentPosition === "right" && "ml-auto"
                                )}
                            >
                                <span className={cn(
                                    "inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-full", // Reduced padding
                                    "transition-all duration-300 backdrop-blur-md border",
                                    theme === 'dark'
                                        ? "bg-white/5 text-blue-300 border-white/10 hover:bg-white/10"
                                        : "bg-black/5 text-blue-600 border-gray-200 hover:bg-black/10"
                                )}>
                                    {showCategoryIcon && (
                                        <Sparkles size={12} className="animate-pulse" /> // Smaller icon
                                    )}
                                    {categoryLabel}
                                </span>
                            </motion.div>
                        )}

                        {/* Main Title with Letter Animation - REDUCED margin */}
                        <div className="mb-6"> {/* Reduced from mb-8 */}
                            <h1 className={cn(
                                "font-bold leading-tight tracking-tight",
                                titleSizeClasses[titleSize],
                                theme === 'dark' ? "text-white" : "text-gray-900"
                            )}>
                                {animatedLetters ? (
                                    <span className="flex flex-wrap justify-center gap-x-2">
                                        {titleWords.map((word, wordIndex) => (
                                            <span key={wordIndex} className="inline-block">
                                                {word.split("").map((letter, letterIndex) => (
                                                    <motion.span
                                                        key={`${wordIndex}-${letterIndex}`}
                                                        initial={{ opacity: 0, y: 20 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{
                                                            delay: 0.1 + wordIndex * 0.05 + letterIndex * 0.01,
                                                            duration: 0.4,
                                                            ease: "backOut",
                                                        }}
                                                        className="inline-block"
                                                    >
                                                        {letter}
                                                    </motion.span>
                                                ))}
                                                <span className="inline-block w-2" />
                                            </span>
                                        ))}
                                    </span>
                                ) : (
                                    title
                                )}
                            </h1>
                        </div>

                        {/* Description with Word-by-Word Animation - REDUCED margin */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
                            className={cn(
                                "mb-2",
                                contentPosition === "center" && "flex flex-col items-center text-center",
                                contentPosition === "left" && "flex flex-col items-start text-left",
                                contentPosition === "right" && "flex flex-col items-end text-right"
                            )}
                        >
                            <p className={cn(
                                "text-lg md:text-xl lg:text-2xl leading-relaxed font-light", // Slightly smaller text
                                "max-w-3xl",
                                theme === 'dark' ? "text-gray-300" : "text-gray-700",
                                contentPosition === "center" && "mx-auto text-center",
                                contentPosition === "left" && "text-left",
                                contentPosition === "right" && "ml-auto text-right"
                            )}>
                                {animatedLetters ? (
                                    <span>
                                        {descriptionWords.map((word, index) => (
                                            <motion.span
                                                key={index}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{
                                                    delay: 0.6 + index * 0.05,
                                                    duration: 0.3,
                                                    ease: "easeOut",
                                                }}
                                                className="inline-block mr-2"
                                            >
                                                {word}
                                            </motion.span>
                                        ))}
                                    </span>
                                ) : (
                                    description
                                )}
                            </p>
                        </motion.div>

                        {/* Animated Divider Line - REDUCED margin */}
                        {showDivider && (
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "100%" }}
                                transition={{ delay: 0.8, duration: 1.5, ease: "easeOut" }}
                                className={cn(
                                    "h-px mt-1",
                                    theme === 'dark'
                                        ? "bg-gradient-to-r from-transparent via-blue-600/30 via-30% to-transparent"
                                        : "bg-gradient-to-r from-transparent via-blue-500/40 via-30% to-transparent",
                                    contentPosition === "center" && "w-full max-w-2xl",
                                    contentPosition === "left" && "w-full max-w-2xl",
                                    contentPosition === "right" && "w-full max-w-2xl ml-auto"
                                )}
                            />
                        )}


                    </div>
                </div>
            </motion.div>



        </section>
    );
};

export default ConsistentPageHeader;
