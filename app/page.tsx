"use client";

import { useState } from "react";
import TheWatcher from "@/components/TheWatcher";
import DataTerminal from "@/components/DataTerminal";
import PrivacyToggle from "@/components/PrivacyToggle";
import Manifesto from "@/components/Manifesto";

export default function Home() {
  const [privacyMode, setPrivacyMode] = useState(false);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-300 selection:bg-green-900 selection:text-green-100 overflow-x-hidden">
      {/* Header / Nav */}
      <header className="fixed top-0 left-0 w-full p-6 z-40 pointer-events-none">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold tracking-tighter text-slate-100">
              ALETHEIA
            </h1>
            <p className="text-xs text-slate-500 font-mono mt-1">
              VER. 0.1.0 // PUBLIC BETA
            </p>
          </div>
        </div>
      </header>

      {/* 3D Visualization Layer */}
      <section className="relative w-full h-[60vh] flex items-center justify-center">
        <TheWatcher privacyMode={privacyMode} />

        {/* Overlay Text */}
        <div className="absolute bottom-10 left-0 w-full text-center pointer-events-none">
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
      </section>

      {/* Content Layer */}
      <Manifesto />

      {/* UI Overlays */}
      <DataTerminal privacyMode={privacyMode} />
      <PrivacyToggle
        privacyMode={privacyMode}
        setPrivacyMode={setPrivacyMode}
      />
    </main>
  );
}
