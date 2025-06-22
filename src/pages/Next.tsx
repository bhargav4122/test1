import { useRef, useState, useEffect  } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import * as THREE from 'three';

// ===== 1. Subtle Particle Background ===== //
const SubtleParticles = () => {
  const particles = useRef<THREE.Points>(null);
  const [sphere] = useState(() => random.inSphere(new Float32Array(4000), { radius: 1.5 }));

  useFrame((_, delta) => {
    if (particles.current) {
      particles.current.rotation.x -= delta / 20; // Slower rotation
      particles.current.rotation.y -= delta / 30;
    }
  });

  return (
    <Points ref={particles} positions={sphere} stride={3}>
      <PointMaterial
        color="#4f46e5" // Single brand color
        size={0.008} // Smaller particles
        sizeAttenuation={true}
        transparent
        opacity={0.4} // More transparent
      />
    </Points>
  );
};

// ===== 2. Professional Gradient Overlay ===== //



// Replace your GradientMesh component with this:
const OrganicWaves = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const time = useRef(0);

  useFrame(() => {
    time.current += 0.002;
    if (meshRef.current?.material) {
      (meshRef.current.material as THREE.ShaderMaterial).uniforms.time.value = time.current;
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[10, 10]} />
      <shaderMaterial
        uniforms={{
          time: { value: 0 },
          primaryColor: { value: new THREE.Color('#4f46e5') }, // Brand blue
          secondaryColor: { value: new THREE.Color('#312e81') }, // Darker blue
        }}
        fragmentShader={`
          uniform float time;
          uniform vec3 primaryColor;
          uniform vec3 secondaryColor;
          varying vec2 vUv;
          
          void main() {
            vec2 uv = vUv * 2.0 - 1.0;
            
            // Organic wave pattern
            float wave = sin(uv.x * 3.0 + time) * 
                         cos(uv.y * 2.0 + time * 0.7) * 
                         0.3;
            
            // Soft gradient
            float gradient = smoothstep(0.0, 1.0, uv.y * 0.5 + 0.5);
            
            // Combine effects
            vec3 color = mix(primaryColor, secondaryColor, gradient + wave);
            
            gl_FragColor = vec4(color, 0.08); // Very subtle opacity
          }
        `}
        transparent
      />
    </mesh>
  );
};





const GeometricGrid = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const time = useRef(0);

  useFrame(() => {
    time.current += 0.001;
    if (meshRef.current?.material) {
      (meshRef.current.material as THREE.ShaderMaterial).uniforms.time.value = time.current;
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[10, 10]} />
      <shaderMaterial
        uniforms={{
          time: { value: 0 },
          lineColor: { value: new THREE.Color('#4f46e5') },
        }}
        fragmentShader={`
          uniform float time;
          uniform vec3 lineColor;
          varying vec2 vUv;
          
          void main() {
            vec2 uv = vUv * 20.0;
            
            // Animated grid lines
            vec2 grid = abs(fract(uv - time * 0.05) - 0.5);
            float line = smoothstep(0.48, 0.5, max(grid.x, grid.y));
            
            // Fade out toward edges
            vec2 center = vUv - 0.5;
            float fade = 1.0 - smoothstep(0.2, 0.5, length(center));
            
            gl_FragColor = vec4(lineColor, line * fade * 0.15);
          }
        `}
        transparent
      />
    </mesh>
  );
};


// ===== 3. Professional Floating Cards ===== //
const ProfessionalCard = ({ title, description, index }: { title: string, description: string, index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered && cardRef.current) {
      gsap.to(cardRef.current, {
        y: -5, // More subtle lift
        boxShadow: "0 10px 25px -5px rgba(79, 70, 229, 0.2)", // Softer shadow
        duration: 0.3,
      });
    } else if (cardRef.current) {
      gsap.to(cardRef.current, {
        y: 0,
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        duration: 0.3,
      });
    }
  }, [isHovered]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="bg-white bg-opacity-90 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-gray-100 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }} // More subtle hover effect
    >
      <h3 className="text-xl font-semibold text-gray-800 mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
};

// ===== 4. Refined Magnetic Button ===== //
const RefinedButton = ({ children }: { children: React.ReactNode }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent) => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPosition({
        x: (e.clientX - rect.left - rect.width / 2) * 0.2, // Less movement
        y: (e.clientY - rect.top - rect.height / 2) * 0.2,
      });
    }
  };

  useEffect(() => {
    const button = buttonRef.current;
    if (button) {
      button.addEventListener('mousemove', handleMouseMove as EventListener);
      return () => button.removeEventListener('mousemove', handleMouseMove as EventListener);
    }
  }, []);

  return (
    <motion.button
      ref={buttonRef}
      className="relative bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
    >
      {children}
    </motion.button>
  );
};

// ===== 5. Main Homepage Component ===== //
const ProfessionalHomepage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const yOffset = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div ref={containerRef} className="relative min-h-screen bg-gray-50">
      {/* === Subtle Background === */}
      <div className="fixed inset-0 z-0 opacity-30">
        <Canvas camera={{ position: [0, 0, 1] }}>
          <SubtleParticles />
          

          <GeometricGrid/>
        </Canvas>
      </div>

      {/* === Main Content === */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.h1
              className="text-5xl md:text-7xl font-bold text-gray-900 mb-6"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Modern <span className="text-blue-600">Digital Solutions</span>
            </motion.h1>
            <motion.p
              className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Professional web experiences that engage without overwhelming
            </motion.p>
            <RefinedButton>Discover More</RefinedButton>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-6 bg-white bg-opacity-70 backdrop-blur-sm">
          <motion.div
            className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.15,
                },
              },
            }}
          >
            {[
              {
                title: "Elegant Animations",
                description: "Subtle motion that enhances usability",
              },
              {
                title: "Responsive Design",
                description: "Flawless experience on all devices",
              },
              {
                title: "Performance Focused",
                description: "Lightning fast loading times",
              },
            ].map((feature, index) => (
              <ProfessionalCard
                key={feature.title}
                title={feature.title}
                description={feature.description}
                index={index}
              />
            ))}
          </motion.div>
        </section>

        {/* Parallax Section */}
        <motion.section
          className="py-32 px-6 bg-gray-100"
          style={{ y: yOffset }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              className="text-3xl md:text-5xl font-bold text-gray-800 mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Designed for <span className="text-blue-600">Clarity</span>
            </motion.h2>
            <motion.p
              className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              Every element crafted for optimal user experience
            </motion.p>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default ProfessionalHomepage;