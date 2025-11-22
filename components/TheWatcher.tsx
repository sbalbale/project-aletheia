"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial } from "@react-three/drei";
import { useRef, useEffect } from "react";
import * as THREE from "three";

interface WatcherProps {
  privacyMode: boolean;
}

function Eye({ privacyMode }: { privacyMode: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const targetRotation = useRef({ x: 0, y: 0 });
  const hasOrientation = useRef(false);

  useEffect(() => {
    const handleOrientation = (event: DeviceOrientationEvent) => {
      if (privacyMode) return;

      // Desktop browsers might fire this event with null data.
      // We only want to switch to orientation mode if we actually have sensor data.
      if (event.beta === null || event.gamma === null) return;

      hasOrientation.current = true;

      // Beta is x-axis tilt (-180 to 180), Gamma is y-axis tilt (-90 to 90)
      const beta = event.beta || 0;
      const gamma = event.gamma || 0;

      // Normalize roughly:
      const x = Math.min(Math.max(gamma / 45, -1), 1); // Left/Right
      const y = Math.min(Math.max((beta - 45) / 45, -1), 1); // Up/Down (centered at 45deg tilt)

      targetRotation.current = { x, y };
    };

    if (typeof window !== "undefined" && window.DeviceOrientationEvent) {
      window.addEventListener("deviceorientation", handleOrientation);
    }

    return () => {
      if (typeof window !== "undefined" && window.DeviceOrientationEvent) {
        window.removeEventListener("deviceorientation", handleOrientation);
      }
    };
  }, [privacyMode]);

  useFrame((state) => {
    if (!meshRef.current) return;

    let targetX = 0;
    let targetY = 0;

    if (!privacyMode) {
      // If we have orientation data, use it exclusively to avoid touch/scroll interference
      if (hasOrientation.current) {
        targetX = targetRotation.current.x * 2;
        targetY = targetRotation.current.y * 2;
      } else {
        // Fallback to mouse/touch
        targetX = state.mouse.x * 2;
        targetY = state.mouse.y * 2;
      }

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
