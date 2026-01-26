import React, { useState, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { cn } from "@/lib/utils";

interface VideoSource {
    webm?: string;
    mp4: string;
    poster?: string;
}

interface MultiDeviceVideoSources {
    desktop: VideoSource;
    mobile?: VideoSource;
}

interface OptimizedVideoProps {
    sources: MultiDeviceVideoSources;
    isMobile: boolean;
    controls?: boolean;
    autoPlay?: boolean;
    muted?: boolean;
    loop?: boolean;
    className?: string;
    title?: string;
    triggerOnce?: boolean;
}

const OptimizedVideo: React.FC<OptimizedVideoProps> = ({
    sources,
    isMobile,
    controls = false,
    autoPlay = true,
    muted = true,
    loop = true,
    className = "",
    title = "",
    triggerOnce = true
}) => {
    const [videoLoaded, setVideoLoaded] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const { ref, inView } = useInView({
        triggerOnce: triggerOnce,
        rootMargin: '200px',
    });

    const source = (isMobile && sources.mobile) ? sources.mobile : sources.desktop;

    return (
        <div ref={ref} className="relative w-full h-full">
            {inView && (
                <video
                    ref={videoRef}
                    className={cn(
                        "w-full h-full object-cover transition-opacity duration-700",
                        videoLoaded ? "opacity-100" : "opacity-0",
                        className
                    )}
                    autoPlay={autoPlay}
                    muted={muted}
                    loop={loop}
                    playsInline
                    controls={controls}
                    preload="metadata"
                    poster={source.poster}
                    title={title}
                    onLoadedData={() => setVideoLoaded(true)}
                >
                    {source.webm && <source src={source.webm} type="video/webm" />}
                    <source src={source.mp4} type="video/mp4" />
                </video>
            )}
            {!videoLoaded && inView && (
                <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 animate-pulse" />
            )}
        </div>
    );
};

export default OptimizedVideo;
