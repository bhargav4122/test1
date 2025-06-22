import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Text } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import * as THREE from 'three';

// ===== 1. Data Particle Network ===== //
const DataParticles = () => {
  const particlesRef = useRef<THREE.Points>(null);
  const [positions] = useState(() => {
    const pos = random.inSphere(new Float32Array(3000), { radius: 2 });
    return pos.some(isNaN) ? new Float32Array(3000).fill(0) : pos;
  });

  useFrame((_, delta) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.x -= delta / 25;
      particlesRef.current.rotation.y -= delta / 35;
    }
  });

  return (
    <Points ref={particlesRef} positions={positions} stride={3}>
      <PointMaterial
        color="#4f46e5"
        size={0.008}
        sizeAttenuation
        transparent
        opacity={0.6}
        depthWrite={false}
      />
    </Points>
  );
};

// ===== 2. Data Flow Visualization ===== //
const DataFlow = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const time = useRef(0);

  useFrame(() => {
    time.current += 0.003;
    if (meshRef.current?.material) {
      (meshRef.current.material as THREE.ShaderMaterial).uniforms.time.value = time.current;
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[10, 10, 64, 64]} />
      <shaderMaterial
        uniforms={{
          time: { value: 0 },
          primaryColor: { value: new THREE.Color('#4f46e5') },
          accentColor: { value: new THREE.Color('#7c3aed') },
        }}
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          uniform float time;
          uniform vec3 primaryColor;
          uniform vec3 accentColor;
          varying vec2 vUv;
          
          void main() {
            // Data flow pattern
            float flow = sin(vUv.x * 10.0 + time * 2.0) * 
                         cos(vUv.y * 8.0 + time * 1.5) * 
                         0.3;
            
            // Connection lines
            float lines = smoothstep(0.45, 0.5, fract(vUv.x * 10.0 + time * 0.5));
            
            vec3 color = mix(primaryColor, accentColor, flow + lines * 0.3);
            gl_FragColor = vec4(color, 0.1);
          }
        `}
        transparent
        wireframe={false}
      />
    </mesh>
  );
};

// ===== 3. Service Card Component ===== //
const ServiceCard = ({ 
  title, 
  description,
  icon,
  index 
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardRef.current) {
      gsap.from(cardRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        delay: index * 0.1,
        ease: "power3.out"
      });
    }
  }, []);

  return (
    <motion.div
      ref={cardRef}
      className="bg-white bg-opacity-90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-100 overflow-hidden"
      whileHover={{ 
        y: -5,
        boxShadow: "0 10px 25px -5px rgba(79, 70, 229, 0.2)"
      }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="text-blue-600 mb-4 text-3xl">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
      <motion.div 
        className="mt-4 pt-4 border-t border-gray-100"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <button className="text-sm text-blue-600 hover:text-blue-800 transition-colors">
          Learn more →
        </button>
      </motion.div>
    </motion.div>
  );
};

// ===== 4. Main Homepage Component ===== //
const Bds = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const yOffset = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div 
      ref={containerRef} 
      className="relative min-h-screen bg-gray-50 overflow-hidden"
      style={{ position: 'relative' }}
    >
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 1.5], fov: 75 }}>
          <DataParticles />
          <DataFlow />
        </Canvas>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-6">
          <motion.div 
            className="text-center max-w-5xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-6"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <span className="text-gray-900">Transforming </span>
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Data Into Value
              </span>
            </motion.h1>
            
            <motion.p
              className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              BDS delivers cutting-edge business intelligence and data solutions that drive innovation and growth.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-col sm:flex-row justify-center gap-4"
            >
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg transition-colors">
                Explore Solutions
              </button>
              <button className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors">
                Case Studies
              </button>
            </motion.div>
          </motion.div>
        </section>

        {/* Services Section */}
        <motion.section 
          className="py-20 px-6 bg-white bg-opacity-80 backdrop-blur-sm"
          style={{ opacity }}
        >
          <div className="max-w-7xl mx-auto">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Our <span className="text-blue-600">Comprehensive</span> Services
            </motion.h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <ServiceCard
                title="Data Analytics"
                description="Transform raw data into actionable insights with our advanced analytics platform."
                icon="📊"
                index={0}
              />
              <ServiceCard
                title="Business Intelligence"
                description="Real-time dashboards and reporting for informed decision making."
                icon="📈"
                index={1}
              />
              <ServiceCard
                title="AI Solutions"
                description="Custom machine learning models to automate and optimize your operations."
                icon="🤖"
                index={2}
              />
              <ServiceCard
                title="Cloud Integration"
                description="Seamless migration and optimization of your data infrastructure."
                icon="☁️"
                index={3}
              />
              <ServiceCard
                title="Data Governance"
                description="Ensure data quality, security, and compliance across your organization."
                icon="🔒"
                index={4}
              />
              <ServiceCard
                title="Custom Development"
                description="Tailored software solutions for your unique business needs."
                icon="💻"
                index={5}
              />
            </div>
          </div>
        </motion.section>

        {/* Clients Section */}
        <motion.section 
          className="py-20 bg-gray-100"
          style={{ y: yOffset }}
        >
          <div className="max-w-6xl mx-auto px-6">
            <h3 className="text-2xl font-semibold text-center text-gray-700 mb-12">
              Trusted by innovative companies worldwide
            </h3>
            <div className="flex flex-wrap justify-center items-center gap-12 opacity-80">
              {['Fortune 500', 'Tech Startups', 'Financial Institutions', 
                'Healthcare Providers', 'Retail Giants', 'Manufacturers'].map((industry) => (
                <div key={industry} className="text-lg font-medium text-gray-600">
                  {industry}
                </div>
              ))}
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default Bds