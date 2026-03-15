"use client";
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';

function FloatingGeometry() {
  const meshRef = useRef<THREE.Group>(null);
  
  // Create a collection of random geometric shards
  const shards = useMemo(() => {
    return Array.from({ length: 15 }).map(() => ({
      position: [Math.random() * 20 - 10, Math.random() * 20 - 10, Math.random() * 10 - 5],
      rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI],
      scale: Math.random() * 0.5 + 0.1,
      color: Math.random() > 0.5 ? '#00f3ff' : '#b026ff'
    }));
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.001;
      meshRef.current.rotation.x += 0.0005;
    }
  });

  return (
    <group ref={meshRef}>
      {shards.map((shard, i) => (
        <Float key={i} speed={2} rotationIntensity={2} floatIntensity={1}>
          <mesh 
            position={shard.position as [number, number, number]} 
            rotation={shard.rotation as [number, number, number]}
            scale={shard.scale}
          >
            <octahedronGeometry args={[1, 0]} />
            <meshStandardMaterial 
              color={shard.color} 
              emissive={shard.color} 
              emissiveIntensity={2} 
              transparent 
              opacity={0.3} 
              wireframe
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

export default function Atmosphere() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";
  return (
    <div className="fixed inset-0 pointer-events-none z-[1] bg-[#050505]">
      {/* 3D Background Layer */}
      <div className="absolute inset-0 z-0 opacity-40">
        <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#00f3ff" />
          <pointLight position={[-10, -10, -10]} intensity={1} color="#b026ff" />
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          <Sparkles count={100} scale={20} size={2} speed={0.5} opacity={0.5} color="#00f3ff" />
          <FloatingGeometry />
        </Canvas>
      </div>

      {/* Persistent Neon Glows (Multiply intensity) */}
      <motion.div 
        animate={{ 
          scale: [1, 1.5, 1],
          opacity: [0.3, 0.6, 0.3],
          x: [-100, 100, -100]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-1/4 -left-1/4 w-full h-full bg-neon-cyan/20 blur-[200px] rounded-full"
      />
      
      <motion.div 
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.5, 0.2],
          y: [-100, 100, -100]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 5 }}
        className="absolute top-1/2 -right-1/4 w-full h-full bg-neon-purple/20 blur-[250px] rounded-full"
      />

      {/* Scanning Line (Vibrant) */}
      <motion.div 
        initial={{ y: "-100%" }}
        animate={{ y: "200%" }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        className="absolute inset-x-0 h-[3px] bg-gradient-to-r from-transparent via-neon-cyan/30 to-transparent z-10 shadow-[0_0_20px_rgba(0,243,255,0.5)]"
      />

      {/* Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 z-20" />
      
      {/* Grid Pattern (Always visible) */}
      <div className="absolute inset-0 bg-grid-white opacity-20 pointer-events-none z-30" />
    </div>
  );
}
