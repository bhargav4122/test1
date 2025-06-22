import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF, Text } from "@react-three/drei";
import * as THREE from "three";
import { GLTF } from "three-stdlib";
import CanvasLoader from "./Loader";

// Type definitions
type Service = {
  name: string;
  color: string;
  subservices: string[];
  status: "active" | "pilot" | "development" | "upcoming";
};

type ServiceModuleProps = {
  position: [number, number, number];
  color: string;
  service: string;
  subservices: string[];
  onClick: () => void;
};

type BDSModelProps = {
  isMobile: boolean;
};

// Service Module Component
const ServiceModule: React.FC<ServiceModuleProps> = ({
  position,
  color,
  service,
  subservices,
  onClick,
}) => {
  const [hovered, setHover] = useState(false);
  
  return (
    <group position={position} onClick={onClick}>
      <mesh 
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
      >
        <boxGeometry args={[1.2, 1.2, 1.2]} />
        <meshStandardMaterial 
          color={hovered ? "#4f46e5" : color} 
          opacity={hovered ? 1 : 0.8}
          transparent
        />
      </mesh>
      <Text
        position={[0, -1.5, 0]}
        color="white"
        fontSize={0.3}
        maxWidth={2}
        lineHeight={1}
        letterSpacing={0.02}
        textAlign="center"
        anchorX="center"
        anchorY="middle"
      >
        {service}
      </Text>
    </group>
  );
};

// Main BDS Model Component
const BDSModel: React.FC<BDSModelProps> = ({ isMobile }) => {
  const [activeService, setActiveService] = useState<Service | null>(null);
  
  // Service data with complete typing
  const services: Record<string, Service[]> = {
    active: [
      { 
        name: "Core Data & Cloud", 
        color: "#10b981", 
        subservices: ["Data Storage", "Cloud Infrastructure", "Data Protection"],
        status: "active"
      },
      { 
        name: "Business Intelligence", 
        color: "#3b82f6", 
        subservices: ["BI Dashboards", "Custom KPIs", "Data Visualization"],
        status: "active"
      },
      // Add other active services...
    ],
    pilot: [
      { 
        name: "Consumer Analytics", 
        color: "#06b6d4", 
        subservices: ["Sentiment Analysis", "Social Listening"],
        status: "pilot"
      },
      // Add other pilot services...
    ],
    development: [
      { 
        name: "Training & Talent", 
        color: "#f97316", 
        subservices: ["Upskilling", "Custom Programs"],
        status: "development"
      },
      // Add other in-development services...
    ],
    upcoming: [
      { 
        name: "AI & ML", 
        color: "#d946ef", 
        subservices: ["Predictive Analytics", "RPA"],
        status: "upcoming"
      },
      // Add other upcoming services...
    ]
  };

  // Calculate positions for service modules with proper typing
  const getPositions = (count: number, radius: number, yPos: number): [number, number, number][] => {
    return Array.from({ length: count }).map((_, i) => {
      const angle = (i / count) * Math.PI * 2;
      return [
        Math.cos(angle) * radius,
        yPos,
        Math.sin(angle) * radius
      ];
    });
  };

  return (
    <group>
      {/* Central Data Cube */}
      <mesh>
        <boxGeometry args={[3, 3, 3]} />
        <meshStandardMaterial 
          color="#1e40af" 
          emissive="#3b82f6"
          emissiveIntensity={0.5}
          transparent
          opacity={0.9}
        />
        <Text
          position={[0, 0, 1.6]}
          rotation={[0, 0, 0]}
          color="white"
          fontSize={0.5}
          maxWidth={2.8}
          lineHeight={1}
          letterSpacing={0.02}
          textAlign="center"
          anchorX="center"
          anchorY="middle"
        >
          BDS
        </Text>
      </mesh>

      {/* Active Services Orbit */}
      {services.active.map((service, i) => {
        const positions = getPositions(services.active.length, 5, 0);
        return (
          <ServiceModule
            key={`active-${i}`}
            position={positions[i]}
            color={service.color}
            service={service.name}
            subservices={service.subservices}
            onClick={() => setActiveService(service)}
          />
        );
      })}

      {/* Render other service categories similarly */}
      {services.pilot.map((service, i) => {
        const positions = getPositions(services.pilot.length, 4, 3);
        return (
          <ServiceModule
            key={`pilot-${i}`}
            position={positions[i]}
            color={service.color}
            service={service.name}
            subservices={service.subservices}
            onClick={() => setActiveService(service)}
          />
        );
      })}

      {/* Add development and upcoming services similarly */}
    </group>
  );
};

const BDSCanvas: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 500px)");
    setIsMobile(mediaQuery.matches);
    
    const handleMediaQueryChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };
    
    mediaQuery.addEventListener("change", handleMediaQueryChange);
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <Canvas
      frameloop="demand"
      shadows
      dpr={[1, 2]}
      camera={{ position: [0, 0, 15], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <ambientLight intensity={0.5} />
      <spotLight
        position={[20, 20, 10]}
        angle={0.15}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
      
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={!isMobile}
          maxPolarAngle={Math.PI}
          minPolarAngle={0}
          autoRotate
          autoRotateSpeed={0.5}
        />
        <BDSModel isMobile={isMobile} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default BDSCanvas;