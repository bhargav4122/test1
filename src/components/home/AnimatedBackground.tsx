import React, { useEffect, useRef, useCallback, memo } from 'react';

const AnimatedBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mountRef = useRef(false);
  const animationRef = useRef<number>();
  const particlesCountRef = useRef<number>(0);

  // Debounced resize handler
  const handleResize = useCallback(() => {
    if (!containerRef.current) return;
    
    // Use simpler resize logic for mobile
    const isMobile = window.innerWidth < 768;
    particlesCountRef.current = isMobile ? 800 : 2000;
  }, []);

  // Throttled animation frame
  const animate = useCallback((renderer: any, scene: any, camera: any, particlesMesh: any) => {
    animationRef.current = requestAnimationFrame(() => animate(renderer, scene, camera, particlesMesh));
    
    // Reduced rotation speed and skip frames on mobile
    if (Date.now() % 2 === 0) { // Render every other frame
      particlesMesh.rotation.x += 0.00005;
      particlesMesh.rotation.y += 0.00005;
      renderer.render(scene, camera);
    }
  }, []);

  useEffect(() => {
    if (!containerRef.current || mountRef.current) return;
    
    // Check if device can handle WebGL
    const isLowEndDevice = 
      window.innerWidth < 768 || 
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
      (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4);
    
    if (isLowEndDevice) {
      console.log('WebGL disabled for low-end device');
      return;
    }

    let THREE: any;
    let renderer: any;
    let scene: any;
    let camera: any;
    let particlesMesh: any;

    const initializeWebGL = async () => {
      try {
        // Dynamically import Three.js only when needed
        THREE = await import('three');
        
        mountRef.current = true;

        // Scene setup
        scene = new THREE.Scene();

        // Camera setup with optimized settings
        camera = new THREE.PerspectiveCamera(
          75,
          window.innerWidth / window.innerHeight,
          0.1,
          1000
        );
        camera.position.z = 8; // Increased distance for better performance

        // Determine particle count based on device
        const isMobile = window.innerWidth < 768;
        particlesCountRef.current = isMobile ? 800 : 2000;

        // Renderer setup with performance optimizations
        renderer = new THREE.WebGLRenderer({
          alpha: true,
          antialias: false, // Disabled for performance
          powerPreference: "high-performance"
        });
        
        if (!renderer.getContext()) {
          throw new Error("WebGL not supported");
        }
        
        // Optimized renderer settings
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5)); // Limit pixel ratio
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x000000, 0);
        renderer.domElement.style.willChange = 'transform'; // Performance hint
        
        containerRef.current.appendChild(renderer.domElement);

        // Optimized particles setup
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = particlesCountRef.current;
        const posArray = new Float32Array(particlesCount * 3);

        // Create more spread out particles
        for (let i = 0; i < particlesCount * 3; i += 3) {
          posArray[i] = (Math.random() - 0.5) * 15;     // x
          posArray[i + 1] = (Math.random() - 0.5) * 15; // y
          posArray[i + 2] = (Math.random() - 0.5) * 15; // z
        }

        particlesGeometry.setAttribute(
          'position', 
          new THREE.BufferAttribute(posArray, 3)
        );

        // Optimized material with simpler shader
        const particlesMaterial = new THREE.PointsMaterial({
          size: isMobile ? 0.008 : 0.005,
          color: 0x3b82f6, // Simpler color
          transparent: true,
          opacity: 0.6, // Reduced opacity
          sizeAttenuation: true,
        });

        particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particlesMesh);

        // Start optimized animation
        animate(renderer, scene, camera, particlesMesh);

      } catch (error) {
        console.error("WebGL initialization failed:", error);
        mountRef.current = false;
      }
    };

    initializeWebGL();

    // Optimized resize handler with debouncing
    let resizeTimeout: NodeJS.Timeout;
    const debouncedResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(handleResize, 250);
    };

    window.addEventListener('resize', debouncedResize);
    handleResize(); // Initial call

    // Cleanup function
    return () => {
      window.removeEventListener('resize', debouncedResize);
      clearTimeout(resizeTimeout);
      
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      
      // Proper disposal of Three.js resources
      if (particlesMesh) {
        scene?.remove(particlesMesh);
        particlesMesh.geometry?.dispose();
        particlesMesh.material?.dispose();
      }
      
      if (renderer && containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
        renderer.dispose();
      }
      
      mountRef.current = false;
    };
  }, [animate, handleResize]);

  // Fallback: Simple CSS gradient background when WebGL fails or on mobile
  return (
    <>
      <div
        ref={containerRef}
        className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
      />
      {/* Fallback background */}
      <div 
        className="fixed top-0 left-0 w-full h-full -z-20 pointer-events-none bg-gradient-to-br from-blue-50/20 via-transparent to-purple-50/10"
        aria-hidden="true"
      />
    </>
  );
};

export default memo(AnimatedBackground);