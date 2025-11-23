"use client";

import { useState, useEffect } from "react";
import TheWatcher from "@/components/TheWatcher";
import DataTerminal from "@/components/DataTerminal";
import PrivacyToggle from "@/components/PrivacyToggle";
import Manifesto from "@/components/Manifesto";
import SensorRequest from "@/components/SensorRequest";

export default function Home() {
  const [privacyMode, setPrivacyMode] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [scrollTransitionSpeed, setScrollTransitionSpeed] = useState(500);
  const [watcherHeight, setWatcherHeight] = useState<number | null>(null);

  // Lock the watcher container height on mount to prevent resizing during scroll
  useEffect(() => {
    // Scale based on window size but lock it on mount
    // Use less height on mobile to show scroll indicator
    const isMobile = window.innerWidth < 768;
    const scaledHeight = window.innerHeight * (isMobile ? 0.4 : 0.5);
    const clampedHeight = Math.max(250, Math.min(600, scaledHeight));
    setWatcherHeight(clampedHeight);
  }, []);

  useEffect(() => {
    let lastScrollY = 0;
    let lastScrollTime = Date.now();

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const currentTime = Date.now();
      const timeDelta = currentTime - lastScrollTime;
      const scrollDelta = Math.abs(currentScrollY - lastScrollY);

      // Calculate velocity (pixels per millisecond)
      const velocity = timeDelta > 0 ? scrollDelta / timeDelta : 0;

      // Map velocity to transition speed (faster scroll = faster fade)
      // Clamp between 100ms (very fast) and 500ms (slow)
      const transitionSpeed = Math.max(
        100,
        Math.min(500, 500 - velocity * 200)
      );
      setScrollTransitionSpeed(transitionSpeed);

      if (currentScrollY > 50) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }

      lastScrollY = currentScrollY;
      lastScrollTime = currentTime;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-300 selection:bg-green-900 selection:text-green-100 overflow-x-hidden relative">
      {/* Full Height Hero Section */}
      <div className="min-h-[100dvh] flex flex-col relative">
        {/* Header / Nav */}
        <header className="relative w-full p-4 md:p-6 z-40 flex flex-col md:flex-row justify-between items-start gap-4 shrink-0">
          <div>
            <h1 className="text-2xl font-bold tracking-tighter text-slate-100">
              ALETHEIA
            </h1>
            <p className="text-xs text-slate-500 font-mono mt-1">
              VER. 0.1.0 // PUBLIC BETA
            </p>
          </div>

          {/* Terminal moved into flow */}
          <DataTerminal privacyMode={privacyMode} />
        </header>

        {/* 3D Visualization Layer - Fixed height to prevent resize during scroll */}
        <section
          className="relative w-full flex flex-col items-center justify-center"
          style={{ height: watcherHeight ? `${watcherHeight}px` : "400px" }}
        >
          <TheWatcher privacyMode={privacyMode} />
        </section>

        {/* Recording Status Text - In Flow */}
        <div className="w-full flex justify-center py-2 shrink-0 relative z-40">
          <p
            className={`text-sm font-mono tracking-widest transition-colors duration-500 ${
              privacyMode ? "text-green-500" : "text-red-500"
            }`}
          >
            {privacyMode
              ? "/// SENSORS DISABLED ///"
              : "/// RECORDING BIOMETRICS ///"}
          </p>
        </div>

        {/* Sensor Request - In Flow on Mobile */}
        <SensorRequest />

        {/* Privacy Toggle (In Flow) - Padded to sit above fixed elements */}
        <div className="w-full flex justify-center py-3 pb-8 md:pb-32 shrink-0 relative z-50">
          <PrivacyToggle
            privacyMode={privacyMode}
            setPrivacyMode={setPrivacyMode}
          />
        </div>

        {/* Scroll Indicator - In Flow on Mobile */}
        <div
          className={`w-full flex justify-center py-4 relative md:fixed md:bottom-8 md:left-0 pointer-events-none transition-opacity z-30 ${
            hasScrolled ? "opacity-0" : "opacity-100"
          }`}
          style={{
            transitionDuration: `${scrollTransitionSpeed}ms`,
          }}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] font-mono text-slate-200 tracking-[0.2em] uppercase">
              Scroll for Truth
            </span>
            <svg
              className="w-4 h-4 text-slate-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              style={{
                animation: "arrowDrift 2s ease-in-out infinite",
              }}
            >
              <style jsx>{`
                @keyframes arrowDrift {
                  0%,
                  100% {
                    transform: translateY(0px);
                  }
                  50% {
                    transform: translateY(4px);
                  }
                }
              `}</style>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Content Layer */}
      <Manifesto />

      {/* UI Overlays */}
    </main>
  );
}
