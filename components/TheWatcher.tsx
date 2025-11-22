"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

interface WatcherProps {
  privacyMode: boolean;
}

function Eye({ privacyMode }: { privacyMode: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;

    if (!privacyMode) {
      // Look at mouse position
      // state.mouse.x and state.mouse.y are normalized coordinates (-1 to 1)
      const targetX = state.mouse.x * 2;
      const targetY = state.mouse.y * 2;

      // Smoothly interpolate rotation
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        targetX,
        0.1
      );
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        -targetY,
        0.1
      );
    } else {
      // Reset rotation
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        0,
        0.1
      );
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        0,
        0.1
      );
    }
  });

  return (
    <Sphere ref={meshRef} args={[1, 32, 32]} scale={1.5}>
      <MeshDistortMaterial
        color={privacyMode ? "#22c55e" : "#ef4444"} // Green for privacy, Red for recording
        wireframe
        distort={0.4}
        speed={2}
        roughness={0}
      />
    </Sphere>
  );
}

export default function TheWatcher({ privacyMode }: WatcherProps) {
  return (
    <div className="w-full h-[500px] relative">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Eye privacyMode={privacyMode} />
      </Canvas>
    </div>
  );
}
