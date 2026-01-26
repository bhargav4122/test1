import React from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/providers/ThemeProvider";
import OptimizedVideo from "@/components/core/OptimizedVideo";
import { useIsMobile } from "@/hooks/useWindowSize";

interface ConsistentPageHeaderProps {
    title: string;
    description: string;
    categoryLabel?: string;
    backLink?: string;
    backLinkLabel?: string;
    backgroundImage?: string;
    backgroundVideo?: {
        desktop: { webm?: string; mp4: string; poster?: string };
        mobile?: { webm?: string; mp4: string; poster?: string };
    };
    className?: string;
    overlayOpacity?: number;
}

const ConsistentPageHeader = ({
    title,
    description,
    categoryLabel,
    backLink,
    backLinkLabel,
    backgroundImage,
    backgroundVideo,
    className,
    overlayOpacity = 0.4,
}: ConsistentPageHeaderProps) => {
    const { theme } = useTheme();
    const isMobile = useIsMobile();
    const headerRef = React.useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: headerRef,
        offset: ["start start", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.5]);
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

    const words = title.split(" ");

    return (
        <section
            ref={headerRef}
            className={cn(
                "relative min-h-[30vh] md:min-h-[40vh] flex items-center justify-center overflow-hidden pt-28 pb-8",
                className
            )}
        >
            {/* Background Layer */}
            <div className="absolute inset-0 z-0">
                {backgroundVideo ? (
                    <div className="h-full w-full">
                        <OptimizedVideo
                            sources={backgroundVideo}
                            isMobile={isMobile}
                            className="h-full w-full"
                        />
                    </div>
                ) : backgroundImage ? (
                    <motion.div style={{ y, scale }} className="h-full w-full">
                        <img
                            src={backgroundImage}
                            alt={title}
                            className="w-full h-full object-cover"
                        />
                    </motion.div>
                ) : (
                    <div
                        className={cn(
                            "h-full w-full",
                            theme === "dark"
                                ? "bg-gradient-to-br from-gray-900 via-blue-900/20 to-black"
                                : "bg-gradient-to-br from-blue-50 via-indigo-50/30 to-white"
                        )}
                    />
                )}
                {/* Overlay */}
                <div
                    className={cn(
                        "absolute inset-0 transition-opacity duration-300",
                        theme === "dark" ? "bg-black" : "bg-white"
                    )}
                    style={{ opacity: overlayOpacity }}
                />
            </div>

            {/* Content Layer */}
            <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    {backLink && (
                        <Link to={backLink}>
                            <motion.button
                                whileHover={{ x: -5 }}
                                className={cn(
                                    "flex items-center gap-2 text-sm font-bold mb-6 mx-auto",
                                    theme === "dark" ? "text-blue-400" : "text-blue-600"
                                )}
                            >
                                <ArrowLeft size={16} />
                                <span>{backLinkLabel || "Back"}</span>
                            </motion.button>
                        </Link>
                    )}
                    {categoryLabel && (
                        <span className={cn(
                            "inline-block px-4 py-1.5 text-xs font-bold uppercase tracking-widest rounded-full mb-6",
                            theme === "dark"
                                ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                                : "bg-blue-100 text-blue-700 border border-blue-200"
                        )}>
                            {categoryLabel}
                        </span>
                    )}

                    <h1 className={cn(
                        "text-4xl md:text-5xl lg:text-7xl font-bold leading-tight mb-8",
                        theme === "dark" ? "text-white" : "text-gray-900"
                    )}>
                        {words.map((word, i) => (
                            <motion.span
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 + i * 0.1, duration: 0.4 }}
                                className="inline-block mr-[0.2em]"
                            >
                                {word}
                            </motion.span>
                        ))}
                    </h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                        className={cn(
                            "max-w-2xl mx-auto text-lg md:text-xl leading-relaxed",
                            theme === "dark" ? "text-gray-300" : "text-gray-600"
                        )}
                    >
                        {description}
                    </motion.p>
                </motion.div>
            </div>

            {/* Decorative Bottom Curve */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent pointer-events-none" />
        </section>
    );
};

export default ConsistentPageHeader;
