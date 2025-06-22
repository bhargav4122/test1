import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useSpring, animated } from '@react-spring/three';
import { OrbitControls, Text, Float } from '@react-three/drei';
import { ArrowRight, Circle, CheckCircle2, Clock, FileCode, Check, BarChart, type LucideIcon } from 'lucide-react';
import { cn } from "@/lib/utils";

interface WorkflowStep {
  title: string;
  description: string;
  icon?: LucideIcon;
}

interface ServiceWorkflowProps {
  steps: WorkflowStep[];
}

function WorkflowNode({ position, color, text, isActive }: any) {
  const mesh = useRef();
  const springs = useSpring({
    scale: isActive ? 1.2 : 1,
    color: isActive ? '#60A5FA' : color,
  });

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x = Math.sin(state.clock.getElapsedTime()) * 0.1;
      mesh.current.rotation.y = Math.cos(state.clock.getElapsedTime()) * 0.1;
    }
  });

  return (
    <group position={position}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <animated.mesh ref={mesh} scale={springs.scale}>
          <sphereGeometry args={[0.5, 32, 32]} />
          <animated.meshStandardMaterial color={springs.color} />
        </animated.mesh>
        <Text
          position={[0, -1, 0]}
          fontSize={0.3}
          color={color}
          anchorX="center"
          anchorY="middle"
        >
          {text}
        </Text>
      </Float>
    </group>
  );
}

function WorkflowLine({ start, end, progress }: any) {
  const springs = useSpring({
    scale: [1, progress, 1],
    color: '#60A5FA',
  });

  return (
    <animated.mesh position={start}>
      <boxGeometry args={[0.1, 0.1, 5]} />
      <animated.meshStandardMaterial color={springs.color} />
    </animated.mesh>
  );
}

const ServiceWorkflow = ({ steps }: ServiceWorkflowProps) => {
  const defaultIcons: LucideIcon[] = [Clock, FileCode, Check, BarChart];
  
  return (
    <div className="relative">
      {/* 3D Workflow Visualization */}
      <div className="h-[400px] mb-12">
        <Canvas camera={{ position: [0, 0, 10] }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <OrbitControls enableZoom={false} />
          
          {steps.map((_, index) => {
            const x = (index - (steps.length - 1) / 2) * 4;
            return (
              <WorkflowNode
                key={index}
                position={[x, 0, 0]}
                color="#60A5FA"
                text={`Step ${index + 1}`}
                isActive={index === 0}
              />
            );
          })}
          
          {steps.slice(0, -1).map((_, index) => {
            const startX = (index - (steps.length - 1) / 2) * 4;
            const endX = ((index + 1) - (steps.length - 1) / 2) * 4;
            return (
              <WorkflowLine
                key={index}
                start={[startX + 2, 0, 0]}
                end={[endX - 2, 0, 0]}
                progress={1}
              />
            );
          })}
        </Canvas>
      </div>

      {/* Traditional Workflow Steps */}
      <div className="space-y-12">
        {steps.map((step, index) => {
          const StepIcon = step.icon || defaultIcons[index % defaultIcons.length];
          
          return (
            <div key={index} className={cn(
              "flex gap-6 relative z-10",
              "transition-all duration-300 hover:translate-x-1",
            )}>
              {/* Step number bubble with icon */}
              <div className="flex-shrink-0 w-[50px] h-[50px] rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                <StepIcon className="h-5 w-5 text-primary" />
              </div>
              
              {/* Step content */}
              <div className="pt-1">
                <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                  <span className="inline-block rounded-full bg-primary/10 text-primary w-6 h-6 text-sm flex items-center justify-center mr-2">
                    {index + 1}
                  </span>
                  {step.title}
                </h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Workflow End Point */}
      <div className="flex items-center gap-3 mt-8 ml-[25px] md:ml-[28px] relative z-10">
        <div className="w-[50px] h-[50px] rounded-full bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700 flex items-center justify-center">
          <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
        </div>
        <span className="text-green-600 dark:text-green-400 font-medium">Project Complete</span>
      </div>
    </div>
  );
};

export default ServiceWorkflow;