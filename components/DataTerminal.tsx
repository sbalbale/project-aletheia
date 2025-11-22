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

    const handleMouseMove = (e: MouseEvent) => {
      clearTimeout(idleTimer);

      const now = Date.now();
      const dt = now - lastTime;

      if (dt > 50) {
        // Update every 50ms to calculate velocity
        const dx = e.clientX - lastX;
        const dy = e.clientY - lastY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const v = dist / dt; // pixels per ms

        setVelocity(v);
        setMousePos({ x: e.clientX, y: e.clientY });

        if (v > 0.3) {
          setStatus("DECISIVE");
        } else {
          setStatus("HESITANT");
        }

        lastX = e.clientX;
        lastY = e.clientY;
        lastTime = now;
      }

      // Reset to IDLE if no movement for 100ms
      idleTimer = setTimeout(() => {
        setStatus("IDLE");
        setVelocity(0);
      }, 200);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(idleTimer);
    };
  }, [privacyMode]);

  return (
    <div className="fixed top-4 right-4 p-4 bg-slate-900/80 border border-slate-700 rounded font-mono text-xs md:text-sm z-50 w-64">
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
