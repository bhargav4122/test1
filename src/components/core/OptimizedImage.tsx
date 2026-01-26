import React, { useState } from 'react';
import { cn } from "@/lib/utils";

interface OptimizedImageProps {
    src: string;
    alt: string;
    className?: string;
    containerClassName?: string;
    sizes?: string;
    priority?: boolean;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
    src,
    alt,
    className = "",
    containerClassName = "",
    sizes = "(max-width: 768px) 100vw, 50vw",
    priority = false
}) => {
    const [imageLoaded, setImageLoaded] = useState(false);

    // Simple Cloudinary optimization if the URL is from Cloudinary
    const optimizedSrc = src.includes('res.cloudinary.com')
        ? src.replace('/upload/', '/upload/f_auto,q_auto/')
        : src;

    return (
        <div className={cn("relative overflow-hidden", containerClassName)}>
            <img
                src={optimizedSrc}
                alt={alt}
                className={cn(
                    "w-full h-full object-cover transition-opacity duration-500 ease-in-out",
                    imageLoaded ? "opacity-100" : "opacity-0",
                    className
                )}
                loading={priority ? "eager" : "lazy"}
                decoding="async"
                sizes={sizes}
                onLoad={() => setImageLoaded(true)}
            />
            {!imageLoaded && (
                <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800 animate-pulse" />
            )}
        </div>
    );
};

export default OptimizedImage;
