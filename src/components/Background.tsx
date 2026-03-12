import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

const WebMesh = () => {
  const meshRef = useRef<THREE.Group>(null);
  const count = 40;
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.01 + Math.random() / 200;
      const xFactor = -50 + Math.random() * 100;
      const yFactor = -50 + Math.random() * 100;
      const zFactor = -50 + Math.random() * 100;
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = time * 0.1;
      meshRef.current.rotation.x = state.mouse.y * 0.2;
      meshRef.current.rotation.z = state.mouse.x * 0.2;
    }
  });

  return (
    <group ref={meshRef}>
      {particles.map((p, i) => (
        <Float key={i} speed={p.speed * 10} rotationIntensity={2} floatIntensity={2}>
          <mesh position={[p.xFactor, p.yFactor, p.zFactor]}>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshStandardMaterial color="#00f2ff" emissive="#00f2ff" emissiveIntensity={2} />
          </mesh>
        </Float>
      ))}
      
      {/* Web connecting lines */}
      <lineSegments>
        <bufferGeometry>
           <bufferAttribute 
              attach="attributes-position"
              count={particles.length * 2}
              array={new Float32Array(particles.flatMap(p => [p.xFactor, p.yFactor, p.zFactor, 0, 0, 0]))}
              itemSize={3}
           />
        </bufferGeometry>
        <lineBasicMaterial color="#ffffff" transparent opacity={0.1} />
      </lineSegments>
    </group>
  );
};

const Background = () => {
  return (
    <div className="fixed inset-0 -z-10 bg-black">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 30]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#ff0000" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#003767" />
        
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        
        <WebMesh />
        
        <fog attach="fog" args={['#000', 30, 90]} />
      </Canvas>
    </div>
  );
};

export default Background;
