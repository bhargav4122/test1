import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useLenis } from '@studio-freight/lenis';
import gsap from 'gsap';

// ===== 1. 3D PARTICLE BACKGROUND ===== //
const ParticleBackground = () => {
  const particles = useRef();
  const [sphere] = useState(() => random.inSphere(new Float32Array(5000), { radius: 2 }));

  useFrame((state, delta) => {
    particles.current.rotation.x -= delta / 10;
    particles.current.rotation.y -= delta / 15;
  });

  return (
    <Points ref={particles} positions={sphere} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#4f46e5"
        size={0.01}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </Points>
  );
};

// ===== 2. DYNAMIC GRADIENT MESH ===== //
const GradientMesh = () => {
  const meshRef = useRef();
  const time = useRef(0);

  useFrame(() => {
    time.current += 0.005;
    meshRef.current.material.uniforms.time.value = time.current;
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[10, 10]} />
      <shaderMaterial
        uniforms={{
          time: { value: 0 },
          resolution: { value: [window.innerWidth, window.innerHeight] },
        }}
        fragmentShader={`
          uniform float time;
          uniform vec2 resolution;
          
          void main() {
            vec2 uv = gl_FragCoord.xy / resolution.xy;
            vec3 color = vec3(0.0);
            
            // Animated gradient
            color.r = sin(uv.x * 3.0 + time) * 0.5 + 0.5;
            color.g = cos(uv.y * 2.0 + time * 1.5) * 0.5 + 0.5;
            color.b = sin(uv.x * 4.0 + uv.y * 3.0 + time * 2.0) * 0.5 + 0.5;
            
            // Noise distortion
            float noise = fract(sin(dot(uv, vec2(12.9898, 78.233))) * 43758.5453);
            color += noise * 0.1;
            
            gl_FragColor = vec4(color, 0.8);
          }
        `}
        transparent
      />
    </mesh>
  );
};

// ===== 3. HOLOGRAPHIC FLOATING CARDS ===== //
const HolographicCard = ({ title, description, index }) => {
  const cardRef = useRef();
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) {
      gsap.to(cardRef.current, {
        y: -10,
        boxShadow: "0 25px 50px -12px rgba(124, 58, 237, 0.5)",
        duration: 0.5,
      });
    } else {
      gsap.to(cardRef.current, {
        y: 0,
        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
        duration: 0.5,
      });
    }
  }, [isHovered]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.8 }}
      className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-8 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.03 }}
    >
      <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </motion.div>
  );
};

// ===== 4. MAGNETIC BUTTONS ===== //
const MagneticButton = ({ children }) => {
  const buttonRef = useRef();
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = buttonRef.current.getBoundingClientRect();
    setPosition({
      x: (e.clientX - rect.left - rect.width / 2) * 0.3,
      y: (e.clientY - rect.top - rect.height / 2) * 0.3,
    });
  };

  return (
    <motion.button
      ref={buttonRef}
      className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-full"
      whileHover={{ scale: 1.05 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setPosition({ x: 0, y: 0 })}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
    >
      {children}
    </motion.button>
  );
};

// ===== 5. MAIN HOMEPAGE COMPONENT ===== //
export default function NextGenHomepage() {
  const containerRef = useRef();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth scrolling with Lenis
  useLenis(({ scroll }) => {
    // Custom scroll effects can be added here
  });

  // Parallax effects
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div ref={containerRef} className="relative min-h-screen overflow-hidden">
      {/* === 3D PARTICLE BACKGROUND === */}
      <div className="fixed inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 1] }}>
          <ParticleBackground />
          <GradientMesh />
        </Canvas>
      </div>

      {/* === MAIN CONTENT === */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.h1
              className="text-6xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              The Future of Web Experiences
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl text-gray-300 mb-12"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Powered by React, Three.js, and cutting-edge animations
            </motion.p>
            <MagneticButton>Explore the Future</MagneticButton>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-6">
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
                  staggerChildren: 0.2,
                },
              },
            }}
          >
            {[
              {
                title: "3D WebGL Effects",
                description: "Immersive particle systems & shaders",
              },
              {
                title: "Cinematic Scrolling",
                description: "Buttery-smooth parallax animations",
              },
              {
                title: "AI-Powered UI",
                description: "Dynamic layouts that adapt to users",
              },
            ].map((feature, index) => (
              <HolographicCard
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
          className="py-40 px-6 bg-black/50 backdrop-blur-sm"
          style={{ y: y1 }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              className="text-4xl md:text-6xl font-bold mb-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Designed to <span className="text-purple-400">Wow</span>
            </motion.h2>
            <motion.p
              className="text-xl text-gray-300 mb-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
            >
              Every pixel is optimized for maximum impact.
            </motion.p>
          </div>
        </motion.section>
      </div>
    </div>
  );
}