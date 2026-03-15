"use client";
import { useRef, useEffect, Suspense, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, ContactShadows, useGLTF, Float, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { motion, useScroll, useTransform } from 'framer-motion';

// Global silence for missing 3D model textures to keep the console clean
if (typeof window !== 'undefined') {
  const originalError = console.error;
  const originalWarn = console.warn;

  console.error = (...args) => {
    const msg = args[0];
    if (typeof msg === 'string' && (
      msg.includes('THREE.GLTFLoader') || 
      msg.includes('image_') || 
      msg.includes('Not Found') ||
      msg.includes('404')
    )) return;
    originalError.apply(console, args);
  };

  console.warn = (...args) => {
    const msg = args[0];
    if (typeof msg === 'string' && (
      msg.includes('ensure that the container has a non-static position') ||
      msg.includes('THREE.Clock')
    )) return;
    originalWarn.apply(console, args);
  };
}

gsap.registerPlugin(ScrollTrigger);

function RealBikeModel() {
  const { scene } = useGLTF('/assets/bike/bike.glb');
  const group = useRef<THREE.Group>(null);
  const { camera } = useThree();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!group.current) return;
    
    // Initial State: Hidden at bottom
    group.current.position.set(0, -5, 0);
    group.current.rotation.set(0, -Math.PI / 2, 0);
    
    // Apply Premium Material Overrides
    scene.traverse((child: any) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        const name = child.name.toLowerCase();
        
        if (name.includes('frame') || name.includes('carbon')) {
          child.material = new THREE.MeshStandardMaterial({ color: '#0a0a0a', roughness: 0.1, metalness: 0.8 });
        } else if (name.includes('rim') || name.includes('spoke') || name.includes('metal')) {
          child.material = new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: 0.05, metalness: 1 });
        } else if (name.includes('light') || name.includes('neon')) {
          child.material = new THREE.MeshStandardMaterial({ color: '#00f3ff', emissive: '#00f3ff', emissiveIntensity: 2 });
        } else {
          child.material = new THREE.MeshStandardMaterial({ color: '#151515', roughness: 0.2, metalness: 0.6 });
        }
      }
    });

    // Fade in and move up after a short delay
    gsap.to(group.current.position, {
      y: -0.5,
      duration: 2,
      delay: 1,
      ease: "power3.out",
      onComplete: () => setIsLoaded(true)
    });

    // Scroll Animation Sequence
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
      }
    });

    // Stage 1: Moving forward and tilting (Riding start)
    tl.to(group.current.position, { z: 2, x: -1, duration: 2 })
      .to(group.current.rotation, { z: 0.1, y: -Math.PI / 1.8, duration: 2 }, 0)
      .to(camera.position, { z: 6, x: 1, duration: 2 }, 0);

    // Stage 2: S-curve tilt (Tilting left/right)
    tl.to(group.current.rotation, { z: -0.2, y: -Math.PI / 2.5, duration: 2 })
      .to(group.current.position, { x: 2, duration: 2 }, "-=2");

    // Stage 3: Stabilization and Stop
    tl.to(group.current.position, { x: 0, z: 0, y: -0.8, duration: 2 })
      .to(group.current.rotation, { z: 0, y: -Math.PI / 2, duration: 2 }, "-=1");

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [camera, scene]);

  return (
    <primitive 
      object={scene} 
      ref={group} 
      scale={2.2} 
    />
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div ref={containerRef} className="w-full h-screen relative bg-black overflow-hidden sticky top-0 isolate">
      {/* Cinematic Background with Parallax */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/80 z-10" />
        <img 
          src="/assets/hero-bg.png" 
          alt="Night Bridge" 
          className="w-full h-[120%] object-cover"
        />
      </motion.div>

      {/* 3D Scene */}
      <div className="absolute inset-0 z-10">
        <Canvas shadows={{ type: THREE.PCFShadowMap }} gl={{ antialias: true }}>
          <PerspectiveCamera makeDefault position={[0, 0, 7]} fov={35} />
          <fog attach="fog" args={['#050505', 5, 15]} />
          
          <ambientLight intensity={0.2} />
          
          {/* Streetlight Effect */}
          <spotLight 
            position={[10, 10, 5]} 
            angle={0.2} 
            penumbra={1} 
            intensity={2} 
            castShadow 
            color="#fff"
          />
          
          <directionalLight position={[-5, 5, 5]} intensity={1.5} color="#00f3ff" />
          <directionalLight position={[5, -5, -5]} intensity={1} color="#b026ff" />
          
          <Suspense fallback={null}>
            <RealBikeModel />
            <Environment preset="night" />
          </Suspense>
          
          <ContactShadows 
            position={[0, -1.8, 0]} 
            opacity={0.6} 
            scale={20} 
            blur={2.5} 
            far={10} 
            color="#000000"
          />
        </Canvas>
      </div>

      {/* Content Overlay */}
      <motion.div 
        style={{ opacity }}
        className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none"
      >
        <motion.div
           initial={{ opacity: 0, y: 50 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1.5, delay: 0.5, ease: [0.23, 1, 0.32, 1] }}
           className="text-center px-6"
        >
           <h1 className="font-display text-[8rem] md:text-[15rem] leading-[0.7] text-white tracking-tighter mb-4 opacity-90 drop-shadow-2xl">
              ELITE<span className="text-neon-cyan">BMW</span>
           </h1>
           <p className="tracking-premium text-[10px] md:text-[14px] text-white/60 uppercase mt-8 max-w-xl mx-auto leading-relaxed">
              Experience the pinnacle of night cycling. <br/>
              Charni Road — Marine Drive — Mumbai Loop
           </p>
           
           <div className="mt-20 pointer-events-auto">
              <button 
                onClick={() => document.getElementById('aboutride')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-premium btn-neon-cyan px-16 py-6 text-[10px] tracking-[0.3em]"
              >
                 JOIN THE EXPERIENCE
              </button>
           </div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4 opacity-30">
        <div className="w-[1px] h-12 bg-white/50 animate-bounce" />
        <span className="text-[7px] font-bold uppercase tracking-[0.8em] text-white">Scroll to Explore</span>
      </div>
    </div>
  );
}

