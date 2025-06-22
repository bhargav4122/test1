import React, { useRef, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";

// Define props interfaces
interface SkyscraperProps {
  position: [number, number, number];
  visible: boolean;
}

interface DashboardProps {
  visible: boolean;
  position: [number, number, number];
}

interface CameraRigProps {
  scrollY: React.MutableRefObject<number>;
  cameraRef: React.RefObject<THREE.PerspectiveCamera>;
}

interface HeroSceneProps {
  scrollY: React.MutableRefObject<number>;
}

// Load Skyscraper model
const Skyscraper: React.FC<SkyscraperProps> = ({ position, visible }) => {
  const { scene } = useGLTF("/models/skyscraper.glb");
  return visible ? (
    <primitive object={scene} scale={[1.5, 1.5, 1.5]} position={position} />
  ) : null;
};

// Load BI Dashboard model
const Dashboard: React.FC<DashboardProps> = ({ visible, position }) => {
  const { scene } = useGLTF("/models/dashboard.glb");
  return visible ? (
    <primitive object={scene} scale={[1.2, 1.2, 1.2]} position={position} />
  ) : null;
};

// Camera animation based on scroll
const CameraRig: React.FC<CameraRigProps> = ({ scrollY, cameraRef }) => {
  useFrame(() => {
    if (!cameraRef.current) return;
    
    const progress = Math.min(scrollY.current / window.innerHeight, 1);
    cameraRef.current.position.z = 10 - progress * 6; // Move closer
    cameraRef.current.position.y = 1 + progress * 2; // Elevate
  });
  return null;
};

const HeroScene: React.FC<HeroSceneProps> = ({ scrollY }) => {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const [showDashboard, setShowDashboard] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      scrollY.current = window.scrollY;
      setShowDashboard(scrollY.current > window.innerHeight * 0.5);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollY]);

  return (
    <Canvas camera={{ position: [0, 1, 10], fov: 45 }} shadows>
      <ambientLight intensity={0.6} />
      <directionalLight position={[2, 5, 5]} intensity={1} />
      <Skyscraper position={[-2, 0, 0]} visible={!showDashboard} />
      <Skyscraper position={[2, 0, 0]} visible={!showDashboard} />
      <Dashboard position={[0, -1, 0]} visible={showDashboard} />
      <CameraRig scrollY={scrollY} cameraRef={cameraRef} />
      <OrbitControls enableZoom={false} enablePan={false} />
    </Canvas>
  );
};

const HeroSection: React.FC = () => {
  const scrollY = useRef<number>(0);
  return (
    <div style={{ height: "200vh", background: "#0c0c0c" }}>
      <div style={{ position: "sticky", top: 0, height: "100vh" }}>
        <HeroScene scrollY={scrollY} />
      </div>
      <div className="text-white text-center mt-[100vh] px-10">
        <h2 className="text-4xl font-bold">Welcome to Business & Data Solutions</h2>
        <p className="text-xl mt-4">
          From skyscrapers of innovation to BI dashboards of insight —
          we transform data into strategy.
        </p>
      </div>
    </div>
  );
};

export default HeroSection;