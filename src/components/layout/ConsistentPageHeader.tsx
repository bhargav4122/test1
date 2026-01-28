import React from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, Sparkles, ChevronDown } from "lucide-react";
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
    showScrollButton?: boolean;
    scrollTargetId?: string;

    // NEW: Font customization props
    titleFont?: "sans" | "serif" | "mono" | "display";
    descriptionFont?: "sans" | "serif" | "mono";
    titleWeight?: "light" | "normal" | "medium" | "semibold" | "bold" | "extrabold";
    letterSpacing?: "tight" | "normal" | "wide";
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
    showScrollButton = false,
    scrollTargetId = "content",

    // Font customization defaults
    titleFont = "sans",
    descriptionFont = "sans",
    titleWeight = "bold",
    letterSpacing = "normal",
}: ConsistentPageHeaderProps) => {
    const { theme } = useTheme();
    const headerRef = React.useRef<HTMLElement>(null);

    const { scrollYProgress } = useScroll({
        target: headerRef,
        offset: ["start start", "end start"],
    });

    const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

    // Height classes
    const heightClasses = {
        small: "min-h-[45vh] pt-20 pb-4",
        medium: "min-h-[55vh] pt-24 pb-6",
        large: "min-h-[65vh] pt-28 pb-8",
    };

    // Title size classes with different font styles
    const titleSizeClasses = {
        sm: {
            sans: "text-4xl md:text-5xl lg:text-6xl",
            serif: "text-4xl md:text-5xl lg:text-6xl font-serif",
            mono: "text-4xl md:text-5xl lg:text-6xl font-mono",
            display: "text-4xl md:text-5xl lg:text-6xl font-display", // You need to set up this font
        },
        md: {
            sans: "text-5xl md:text-6xl lg:text-7xl",
            serif: "text-5xl md:text-6xl lg:text-7xl font-serif",
            mono: "text-5xl md:text-6xl lg:text-7xl font-mono",
            display: "text-5xl md:text-6xl lg:text-7xl font-display",
        },
        lg: {
            sans: "text-6xl md:text-7xl lg:text-8xl",
            serif: "text-6xl md:text-7xl lg:text-8xl font-serif",
            mono: "text-6xl md:text-7xl lg:text-8xl font-mono",
            display: "text-6xl md:text-7xl lg:text-8xl font-display",
        },
        xl: {
            sans: "text-7xl md:text-8xl lg:text-9xl",
            serif: "text-7xl md:text-8xl lg:text-9xl font-serif",
            mono: "text-7xl md:text-8xl lg:text-9xl font-mono",
            display: "text-7xl md:text-8xl lg:text-9xl font-display",
        },
    };

    // Font weight classes
    const fontWeightClasses = {
        light: "font-light",
        normal: "font-normal",
        medium: "font-medium",
        semibold: "font-semibold",
        bold: "font-bold",
        extrabold: "font-extrabold",
    };

    // Letter spacing classes
    const letterSpacingClasses = {
        tight: "tracking-tight",
        normal: "tracking-normal",
        wide: "tracking-wide",
    };

    // Description font classes
    const descriptionFontClasses = {
        sans: "font-sans",
        serif: "font-serif",
        mono: "font-mono",
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
                window.scrollBy({ top: window.innerHeight * 0.8, behavior: "smooth" });
            }
        }
    };

    // Get title classes based on font choice
    const getTitleClasses = () => {
        const sizeClass = titleSizeClasses[titleSize][titleFont];
        const weightClass = fontWeightClasses[titleWeight];
        const spacingClass = letterSpacingClasses[letterSpacing];

        return cn(
            sizeClass,
            weightClass,
            spacingClass,
            "leading-tight"
        );
    };

    // Get description classes
    const getDescriptionClasses = () => {
        return cn(
            descriptionFontClasses[descriptionFont],
            "font-light leading-relaxed"
        );
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

                {/* Animated grid lines */}
                <div className="absolute inset-0">
                    <motion.div
                        className={cn(
                            "absolute inset-0",
                            theme === 'dark'
                                ? "bg-gradient-to-b from-transparent via-gray-900/5 to-transparent"
                                : "bg-gradient-to-b from-transparent via-gray-100/5 to-transparent"
                        )}
                        animate={{
                            opacity: [0.3, 0.6, 0.3],
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
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
                        {/* Back Link */}
                        {backLink && (
                            <motion.div
                                initial={{ opacity: 0, x: contentPosition === "center" ? 0 : contentPosition === "left" ? -20 : 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                                className={cn(
                                    "mb-6",
                                    contentPosition === "center" && "mx-auto",
                                    contentPosition === "left" && "mr-auto",
                                    contentPosition === "right" && "ml-auto"
                                )}
                            >
                                <Link to={backLink}>
                                    <div className={cn(
                                        "group inline-flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-300",
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

                        {/* Category Label */}
                        {categoryLabel && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
                                className={cn(
                                    "mb-4",
                                    contentPosition === "center" && "mx-auto",
                                    contentPosition === "left" && "mr-auto",
                                    contentPosition === "right" && "ml-auto"
                                )}
                            >
                                <span className={cn(
                                    "inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-full",
                                    "transition-all duration-300 backdrop-blur-md border",
                                    theme === 'dark'
                                        ? "bg-white/5 text-blue-300 border-white/10 hover:bg-white/10"
                                        : "bg-black/5 text-blue-600 border-gray-200 hover:bg-black/10"
                                )}>
                                    {showCategoryIcon && (
                                        <Sparkles size={12} className="animate-pulse" />
                                    )}
                                    {categoryLabel}
                                </span>
                            </motion.div>
                        )}

                        {/* Main Title with Letter Animation - UPDATED FONT STYLE */}
                        <div className="mb-6">
                            <h1 className={cn(
                                getTitleClasses(),
                                theme === 'dark' ? "text-white" : "text-primary"
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

                        {/* Description with Word-by-Word Animation - UPDATED FONT STYLE */}
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
                                getDescriptionClasses(),
                                "text-lg md:text-xl lg:text-2xl",
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

                        {/* Animated Divider Line */}
                        {showDivider && (
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "100%" }}
                                transition={{ delay: 0.8, duration: 1.5, ease: "easeOut" }}
                                className={cn(
                                    "h-px mt-6",
                                    theme === 'dark'
                                        ? "bg-gradient-to-r from-transparent via-blue-500/30 via-30% to-transparent"
                                        : "bg-gradient-to-r from-transparent via-blue-400/40 via-30% to-transparent",
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
