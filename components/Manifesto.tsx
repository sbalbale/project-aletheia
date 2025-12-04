import React from "react";

export default function Manifesto() {
  return (
    <article className="prose prose-invert prose-slate max-w-2xl mx-auto mt-20 mb-32 px-6">
      <h1 className="text-4xl font-bold mb-8 tracking-tighter text-slate-100">
        The Medium is the Message.
      </h1>

      <p className="lead text-xl text-slate-300 mb-8">
        In the age of Extended Reality (XR), your body is no longer just a
        vessel—it is a data stream.
      </p>

      <h2 className="text-2xl font-semibold text-green-400 mt-12 mb-4">
        Biometric Psychography
      </h2>
      <p>
        Every hesitation, every glance, every micro-movement of your head
        reveals the architecture of your mind. Systems do not need to ask you
        what you want; they simply observe what you look at, and for how long.
        This is <strong>Biometric Psychography</strong>: the inference of
        psychological states from involuntary physiological data.
      </p>

      <h2 className="text-2xl font-semibold text-red-400 mt-12 mb-4">
        Inferred Data & Embodied Harms
      </h2>
      <p>
        Current browser specifications allow access to device orientation and
        motion sensors without explicit permission in many contexts. This
        "Inferred Data" can predict:
      </p>
      <ul className="list-disc pl-6 space-y-2 text-slate-400">
        <li>Emotional valence (Stress vs. Calm)</li>
        <li>Cognitive load (Confusion vs. Focus)</li>
        <li>Subconscious preferences</li>
      </ul>
      <p className="mt-4">
        When these inferences are commodified, they lead to{" "}
        <strong>Embodied Harms</strong>—manipulation that bypasses the conscious
        mind and targets the nervous system directly.
      </p>

      <h2 className="text-2xl font-semibold text-slate-200 mt-12 mb-4">
        Claim Your Bodyright
      </h2>
      <p>
        We advocate for a new digital human right: <strong>Bodyright</strong>.
        The right to exist in digital spaces without your biometric data being
        harvested, analyzed, or sold.
      </p>

      <div className="mt-8">
        <a
          href="https://github.com/sbalbale/project-aletheia/blob/main/public/PLEDGE.md"
          target="_blank"
          className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 underline decoration-green-500/30 hover:decoration-green-500 transition-all"
        >
          <span>Read the Developer's Pledge</span>
          <span className="text-xs bg-green-900/30 px-1.5 py-0.5 rounded border border-green-800">
            .MD
          </span>
        </a>
      </div>

      <div className="mt-12 p-6 border border-slate-700 bg-slate-900/50 rounded-lg">
        <p className="text-sm font-mono text-slate-500 mb-2">SYSTEM_MESSAGE:</p>
        <p className="italic text-slate-300">
          "Privacy is not an option setting. It is the default state of a free
          human being."
        </p>
      </div>
    </article>
  );
}
