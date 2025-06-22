// src/components/canvas/BDSCanvas.tsx
import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, Environment } from "@react-three/drei";

import CanvasLoader from "./CanvasLoader";
import BDSModel from "./BDSModel"; // Import our custom model

const BDSCanvas: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)"); // Adjusted breakpoint for typical mobile/tablet
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
      frameloop="demand" // Renders on demand, good for performance
      shadows
      dpr={[1, 2]} // Device pixel ratio
      camera={{ position: [15, 3, 8], fov: isMobile ? 35 : 28 }} // Adjusted camera
      gl={{ preserveDrawingBuffer: true }}
      style={{ touchAction: 'none' }} // Important for touch interactions with OrbitControls
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          autoRotate // Make it auto-rotate slowly
          autoRotateSpeed={0.5}
          enableZoom={false} // Keep zoom disabled as per example
          maxPolarAngle={Math.PI / 2} // Prevent looking from below
          minPolarAngle={Math.PI / 2} // Prevent looking from above (keeps it fairly level)
        />
        <BDSModel isMobile={isMobile} />
        {/* <Environment preset="city" intensity={0.5} /> Optionally add an environment for reflections */}
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default BDSCanvas;