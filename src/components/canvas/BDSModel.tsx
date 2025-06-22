// src/components/canvas/BDSModel.tsx
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Torus, Line, Points } from '@react-three/drei';
import * as THREE from 'three';

interface BDSModelProps {
  isMobile: boolean;
}

const BDSModel: React.FC<BDSModelProps> = ({ isMobile }) => {
  const groupRef = useRef<THREE.Group>(null);
  const mainSphereRef = useRef<THREE.Mesh>(null);
  const outerTorusRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.05; // Slow rotation of the whole group
    }
    if (mainSphereRef.current) {
      mainSphereRef.current.rotation.x += delta * 0.1;
      mainSphereRef.current.rotation.y += delta * 0.08;
    }
    if (outerTorusRef.current) {
        outerTorusRef.current.rotation.z += delta * 0.15;
    }
  });

  const particleCount = 150;
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < particleCount; i++) {
      const x = (Math.random() - 0.5) * (isMobile ? 3 : 4);
      const y = (Math.random() - 0.5) * (isMobile ? 3 : 4);
      const z = (Math.random() - 0.5) * (isMobile ? 3 : 4);
      temp.push(x, y, z);
    }
    return new Float32Array(temp);
  }, [particleCount, isMobile]);

  const modelScale = isMobile ? 0.8 : 1;
  const modelPosition: [number, number, number] = isMobile ? [0, -1.8, 0] : [0, -2.2, 0];

  return (
    <group ref={groupRef} scale={modelScale} position={modelPosition}>
      {/* Main Core Sphere */}
      <Sphere ref={mainSphereRef} args={[0.7, 32, 32]}>
        <meshStandardMaterial
          color="#00AFFF" // Bright blue
          emissive="#0059B3" // Darker emissive blue
          roughness={0.2}
          metalness={0.7}
        />
      </Sphere>

      {/* Orbiting Torus */}
      <Torus ref={outerTorusRef} args={[1.2, 0.04, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#87CEEB" emissive="#007BFF" metalness={0.6} roughness={0.4} />
      </Torus>
      <Torus args={[1.5, 0.03, 16, 100]} rotation={[Math.PI / 2.2, Math.PI / 3, 0]}>
         <meshStandardMaterial color="#FFFFFF" emissive="#ADD8E6" metalness={0.5} roughness={0.5} />
      </Torus>


      {/* Abstract Connections / Data Flow (simple lines) */}
      {[...Array(6)].map((_, i) => (
        <Line
          key={i}
          points={[
            [0,0,0] as [number,number,number],
            [
              Math.cos((i / 6) * Math.PI * 2) * 1.8,
              Math.sin((i / 12) * Math.PI * 2) * 0.5, // less y variation
              Math.sin((i / 6) * Math.PI * 2) * 1.8,
            ] as [number,number,number]
          ]}
          color="#FFFFFF"
          opacity={0.3}
          transparent
          lineWidth={1}
        />
      ))}

      {/* Data Particles */}
      <Points positions={particles}>
        <pointsMaterial size={0.015} color="#FFFFFF" transparent opacity={0.6} sizeAttenuation />
      </Points>

      {/* Lighting specific to the model */}
      <hemisphereLight intensity={0.25} groundColor="black" />
      <spotLight
        position={[-15, 30, 10]}
        angle={0.15}
        penumbra={1}
        intensity={0.8}
        castShadow
        shadow-mapSize-width={1024} // kebab-case for R3F props
        shadow-mapSize-height={1024}
      />
      <pointLight intensity={0.5} position={[5,5,5]} />
      <pointLight intensity={0.3} position={[-5,-5,-5]} color="#00AFFF"/>
    </group>
  );
};

export default BDSModel;