"use client";

import { useState, useEffect } from "react";

export default function SensorRequest() {
  const [showRequest, setShowRequest] = useState(false);

  useEffect(() => {
    // Check if DeviceOrientationEvent is defined and has requestPermission (iOS 13+)
    if (
      typeof DeviceOrientationEvent !== "undefined" &&
      // @ts-ignore - requestPermission is not in standard types yet
      typeof DeviceOrientationEvent.requestPermission === "function"
    ) {
      setShowRequest(true);
    }
  }, []);

  const requestAccess = async () => {
    // Check for secure context (HTTPS or localhost)
    if (
      typeof window !== "undefined" &&
      window.location.protocol !== "https:" &&
      window.location.hostname !== "localhost"
    ) {
      alert(
        "⚠️ SENSOR ERROR: HTTPS REQUIRED\n\nDevice sensors require a secure connection (HTTPS). If you are testing locally on your phone, you must use a secure tunnel (like ngrok) or deploy to a secure host (like Vercel/GitHub Pages)."
      );
      return;
    }

    try {
      // @ts-ignore
      const response = await DeviceOrientationEvent.requestPermission();
      if (response === "granted") {
        setShowRequest(false);
      } else {
        alert(
          "⚠️ PERMISSION DENIED\n\nYou denied access to device motion sensors. The Watcher cannot see you.\n\nTo fix this:\n1. Close this tab.\n2. Clear site settings for this URL.\n3. Reload and try again."
        );
        setShowRequest(false);
      }
    } catch (error: any) {
      console.error(error);
      alert(
        `⚠️ ERROR: ${error.message || "Unknown error requesting sensors."}`
      );
    }
  };

  if (!showRequest) return null;

  return (
    <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50">
      <button
        onClick={requestAccess}
        className="bg-red-500/20 hover:bg-red-500/40 text-red-400 border border-red-500/50 px-4 py-2 rounded font-mono text-xs backdrop-blur-sm transition-colors animate-pulse"
      >
        [ ENABLE SENSORS ]
      </button>
    </div>
  );
}
