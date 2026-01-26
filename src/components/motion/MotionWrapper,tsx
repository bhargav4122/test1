import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";

interface MotionWrapperProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    duration?: number;
    once?: boolean;
}

const fadeUpVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: (delay: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            delay: delay,
            ease: [0.25, 0.46, 0.45, 0.94],
        },
    }),
};

const fadeInVariants: Variants = {
    hidden: { opacity: 0 },
    visible: (delay: number) => ({
        opacity: 1,
        transition: {
            duration: 0.5,
            delay: delay,
            ease: "easeOut",
        },
    }),
};

const scaleUpVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: (delay: number) => ({
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.5,
            delay: delay,
            ease: [0.25, 0.46, 0.45, 0.94],
        },
    }),
};

const slideInLeftVariants: Variants = {
    hidden: { opacity: 0, x: -50 },
    visible: (delay: number) => ({
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.6,
            delay: delay,
            ease: [0.25, 0.46, 0.45, 0.94],
        },
    }),
};

const slideInRightVariants: Variants = {
    hidden: { opacity: 0, x: 50 },
    visible: (delay: number) => ({
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.6,
            delay: delay,
            ease: [0.25, 0.46, 0.45, 0.94],
        },
    }),
};

export const FadeUp = ({ children, className, delay = 0, once = true }: MotionWrapperProps) => (
    <motion.div
        className={className}
        initial="hidden"
        whileInView="visible"
        viewport={{ once, margin: "-50px" }}
        variants={fadeUpVariants}
        custom={delay}
    >
        {children}
    </motion.div>
);

export const FadeIn = ({ children, className, delay = 0, once = true }: MotionWrapperProps) => (
    <motion.div
        className={className}
        initial="hidden"
        whileInView="visible"
        viewport={{ once, margin: "-50px" }}
        variants={fadeInVariants}
        custom={delay}
    >
        {children}
    </motion.div>
);

export const ScaleUp = ({ children, className, delay = 0, once = true }: MotionWrapperProps) => (
    <motion.div
        className={className}
        initial="hidden"
        whileInView="visible"
        viewport={{ once, margin: "-50px" }}
        variants={scaleUpVariants}
        custom={delay}
    >
        {children}
    </motion.div>
);

export const SlideInLeft = ({ children, className, delay = 0, once = true }: MotionWrapperProps) => (
    <motion.div
        className={className}
        initial="hidden"
        whileInView="visible"
        viewport={{ once, margin: "-50px" }}
        variants={slideInLeftVariants}
        custom={delay}
    >
        {children}
    </motion.div>
);

export const SlideInRight = ({ children, className, delay = 0, once = true }: MotionWrapperProps) => (
    <motion.div
        className={className}
        initial="hidden"
        whileInView="visible"
        viewport={{ once, margin: "-50px" }}
        variants={slideInRightVariants}
        custom={delay}
    >
        {children}
    </motion.div>
);

// Stagger container for lists
interface StaggerContainerProps {
    children: ReactNode;
    className?: string;
    staggerDelay?: number;
    once?: boolean;
}

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: (staggerDelay: number) => ({
        opacity: 1,
        transition: {
            staggerChildren: staggerDelay,
            delayChildren: 0.1,
        },
    }),
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: [0.25, 0.46, 0.45, 0.94],
        },
    },
};

export const StaggerContainer = ({ children, className, staggerDelay = 0.1, once = true }: StaggerContainerProps) => (
    <motion.div
        className={className}
        initial="hidden"
        whileInView="visible"
        viewport={{ once, margin: "-50px" }}
        variants={containerVariants}
        custom={staggerDelay}
    >
        {children}
    </motion.div>
);

export const StaggerItem = ({ children, className }: { children: ReactNode; className?: string }) => (
    <motion.div className={className} variants={itemVariants}>
        {children}
    </motion.div>
);

// Section header animation
export const SectionHeader = ({ children, className }: { children: ReactNode; className?: string }) => (
    <FadeUp className={className}>
        {children}
    </FadeUp>
);
