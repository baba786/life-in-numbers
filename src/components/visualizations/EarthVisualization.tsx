'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function Earth({ rotations }: { rotations: number }) {
  const earthRef = useRef<THREE.Mesh>(null);
  const speed = 0.1; // Rotation speed

  useFrame((state) => {
    if (earthRef.current) {
      // Rotate based on elapsed time
      earthRef.current.rotation.y = state.clock.getElapsedTime() * speed;
    }
  });

  return (
    <mesh ref={earthRef} castShadow receiveShadow>
      <sphereGeometry args={[1, 64, 64]} />
      <meshPhongMaterial
        color={new THREE.Color(0x2233ff)}
        emissive={new THREE.Color(0x112244)}
        specular={new THREE.Color(0x222222)}
        shininess={25}
        opacity={0.9}
        transparent={true}
      >
        <gridHelper args={[2, 10]} />
      </meshPhongMaterial>
    </mesh>
  );
}

export function EarthVisualization({ rotations }: { rotations: number }) {
  return (
    <div className="w-full h-64 bg-gradient-to-b from-black to-blue-900 rounded-lg overflow-hidden">
      <Canvas camera={{ position: [0, 0, 3], fov: 45 }}>
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        <Earth rotations={rotations} />
        <OrbitControls 
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.5}
        />
        <gridHelper args={[20, 40]} position={[0, -1.5, 0]} />
        <fog attach="fog" args={['#000', 3, 10]} />
      </Canvas>
    </div>
  );
}