'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

function Earth({ rotations }: { rotations: number }) {
  const earthRef = useRef<THREE.Mesh>(null);
  const { nodes, materials } = useGLTF('/earth.glb');

  useFrame((state) => {
    if (earthRef.current) {
      earthRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <mesh ref={earthRef} castShadow receiveShadow>
      <sphereGeometry args={[1, 32, 32]} />
      <meshPhongMaterial
        map={new THREE.TextureLoader().load('/earth_texture.jpg')}
        bumpMap={new THREE.TextureLoader().load('/earth_bump.jpg')}
        bumpScale={0.05}
        specularMap={new THREE.TextureLoader().load('/earth_specular.jpg')}
      />
    </mesh>
  );
}

export function EarthVisualization({ rotations }: { rotations: number }) {
  return (
    <div className="w-full h-64 bg-black rounded-lg">
      <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Earth rotations={rotations} />
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
}