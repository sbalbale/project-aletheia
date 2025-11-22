"use client";

import { useEffect, useState } from "react";

interface DataTerminalProps {
  privacyMode: boolean;
}

export default function DataTerminal({ privacyMode }: DataTerminalProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [velocity, setVelocity] = useState(0);
  const [status, setStatus] = useState("ANALYZING...");

  useEffect(() => {
    if (privacyMode) {
      setStatus("ENCRYPTED");
      return;
    }

    let lastX = 0;
    let lastY = 0;
    let lastTime = Date.now();
    let idleTimer: NodeJS.Timeout;

    const handleInteraction = (clientX: number, clientY: number) => {
      clearTimeout(idleTimer);

      const now = Date.now();
      const dt = now - lastTime;

      if (dt > 50) {
        // Update every 50ms to calculate velocity
        const dx = clientX - lastX;
        const dy = clientY - lastY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const v = dist / dt; // pixels per ms

        setVelocity(v);
        setMousePos({ x: Math.round(clientX), y: Math.round(clientY) });

        if (v > 0.3) {
          setStatus("DECISIVE");
        } else {
          setStatus("HESITANT");
        }

        lastX = clientX;
        lastY = clientY;
        lastTime = now;
      }

      // Reset to IDLE if no movement for 100ms
      idleTimer = setTimeout(() => {
        setStatus("IDLE");
        setVelocity(0);
      }, 200);
    };

    const handleMouseMove = (e: MouseEvent) => {
      handleInteraction(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        handleInteraction(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const handleMotion = (e: DeviceMotionEvent) => {
      if (!e.rotationRate) return;

      clearTimeout(idleTimer);

      // Calculate magnitude of rotation
      const alpha = e.rotationRate.alpha || 0;
      const beta = e.rotationRate.beta || 0;
      const gamma = e.rotationRate.gamma || 0;

      // Simple magnitude check
      const rotationMagnitude = Math.sqrt(
        alpha * alpha + beta * beta + gamma * gamma
      );

      // Normalize to a "velocity" like metric (deg/s)
      // Typical fast movement might be > 100 deg/s
      setVelocity(rotationMagnitude / 10); // Scale down to look similar to pixel velocity

      if (rotationMagnitude > 50) {
        setStatus("DECISIVE");
      } else if (rotationMagnitude > 5) {
        setStatus("HESITANT");
      } else {
        // Very still
        setStatus("IDLE"); // Or let the timer handle it
      }

      // Reset to IDLE if no movement
      idleTimer = setTimeout(() => {
        setStatus("IDLE");
        setVelocity(0);
      }, 200);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);

    // Check if DeviceMotionEvent is available
    if (typeof window !== "undefined" && "DeviceMotionEvent" in window) {
      window.addEventListener("devicemotion", handleMotion);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      if (typeof window !== "undefined" && "DeviceMotionEvent" in window) {
        window.removeEventListener("devicemotion", handleMotion);
      }
      clearTimeout(idleTimer);
    };
  }, [privacyMode]);

  return (
    <div className="w-full md:w-64 p-4 bg-slate-900/90 md:bg-slate-900/80 border-y md:border border-slate-700 md:rounded font-mono text-xs md:text-sm z-50">
      <div className="flex justify-between items-center mb-2 border-b border-slate-700 pb-1">
        <span className="text-slate-400">TERMINAL_01</span>
        <span
          className={`w-2 h-2 rounded-full ${
            privacyMode ? "bg-green-500" : "bg-red-500 animate-pulse"
          }`}
        ></span>
      </div>

      <div className="space-y-1">
        <div className="flex justify-between">
          <span className="text-slate-500">COORDS:</span>
          <span className="text-slate-300">
            {privacyMode ? "***, ***" : `[${mousePos.x}, ${mousePos.y}]`}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-slate-500">VELOCITY:</span>
          <span className="text-slate-300">
            {privacyMode ? "***" : velocity.toFixed(2)} px/ms
          </span>
        </div>

        <div className="flex justify-between mt-2 pt-2 border-t border-slate-800">
          <span className="text-slate-500">INFERENCE:</span>
          <span
            className={`${
              privacyMode ? "text-green-500" : "text-red-400"
            } font-bold`}
          >
            {status}
          </span>
        </div>
      </div>
    </div>
  );
}
