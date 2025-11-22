"use client";

import { Shield, ShieldAlert } from "lucide-react";

interface PrivacyToggleProps {
  privacyMode: boolean;
  setPrivacyMode: (mode: boolean) => void;
}

export default function PrivacyToggle({
  privacyMode,
  setPrivacyMode,
}: PrivacyToggleProps) {
  return (
    <button
      onClick={() => setPrivacyMode(!privacyMode)}
      className={`
        flex items-center gap-3 px-6 py-3 rounded-full 
        border transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95
        ${
          privacyMode
            ? "bg-green-950/50 border-green-500 text-green-400 hover:bg-green-900/50"
            : "bg-red-950/50 border-red-500 text-red-400 hover:bg-red-900/50"
        }
      `}
    >
      {privacyMode ? (
        <Shield className="w-5 h-5" />
      ) : (
        <ShieldAlert className="w-5 h-5" />
      )}
      <span className="font-mono font-bold tracking-wider">
        {privacyMode ? "PRIVACY: ACTIVE" : "PRIVACY: COMPROMISED"}
      </span>
    </button>
  );
}
