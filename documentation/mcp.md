# Master Context Plan (MCP): Project Aletheia

> **System Role:** You are the Senior Architect and Lead Developer for Project Aletheia. This file serves as your primary context. You must adhere to the constraints below, specifically the "Privacy-by-Design" principles.

## 1. Project Context & Mission

**Project Aletheia** is a rhetorical digital artifact and single-page web application.

- **Mission:** To demonstrate the privacy risks of Extended Reality (XR)—specifically "Biometric Psychography" and "Inferred Data"—and advocate for a **Privacy-by-Design** architecture.
- **Core Philosophy:** "The Medium is the Message." The site itself must be a proof-of-concept for data minimization.

### 🛑 CRITICAL CONSTRAINTS (Non-Negotiable)

1.  **Zero Server-Side Tracking:** No Google Analytics, no Vercel Analytics, no cookies, no local storage logging.
2.  **Client-Side Containment:** All biometric simulation (mouse tracking, gaze simulation, inference logic) must occur strictly within the client's browser memory.
3.  **Static Export:** The final build must be a static HTML export.

---

## 2. Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Build Output:** `output: 'export'` (Static Site Generation for GitHub Pages)
- **Styling:** Tailwind CSS (v3.4+)
- **3D Engine:** React Three Fiber (R3F) / Three.js / @react-three/drei
- **Language:** TypeScript (Strict Mode)
- **Package Manager:** npm

---

## 3. Design System & Aesthetics

- **Theme:** "Engineering Dark Mode" / Cyberpunk Minimalist.
- **Typography:** Monospace only (e.g., `Courier Prime`, `JetBrains Mono`, or `font-mono`).
- **Color Palette:**
  - **Background:** `bg-slate-950` (#020617)
  - **Text Primary:** `text-slate-300`
  - **Text Danger (Recording/Tracking):** `text-red-500`
  - **Text Safe (Privacy Mode):** `text-green-500`
  - **Borders:** `border-slate-800`

---

## 4. Component Architecture

The application is modular, broken down into specific functional units:

### A. `components/TheWatcher.tsx`

- **Role:** The 3D Hook / Visual Metaphor.
- **Logic:** Renders a 3D mesh (Abstract Sphere or Head) inside a generic R3F Canvas.
- **Behavior:**
  - **If `privacyMode === false`:** The mesh rotates to track `state.mouse.x` / `state.mouse.y` (The "Gaze").
  - **If `privacyMode === true`:** The mesh resets rotation to `[0,0,0]` and stops tracking.

### B. `components/DataTerminal.tsx`

- **Role:** The "Inferred Data" visualizer.
- **Logic:** Displays a raw JSON-like stream of coordinates and inferred states.
- **Inference Engine (Client-Side Only):**
  - Display generic coordinates: `X: 0.12, Y: -0.45`
  - **State "TRACKING_BIOMETRICS":** Default when privacy is off.
  - **Inference "USER_HESITANT":** Trigger if mouse velocity drops below a certain threshold but is still moving.
  - **Inference "FOCUSED_CENTER":** Trigger if mouse lingers near center `[0,0]`.

### C. `components/PrivacyToggle.tsx`

- **Role:** The Global State Switch.
- **Logic:** Toggles a boolean state (`isPrivacyMode`) that controls _The Watcher_ and _Data Terminal_.

### D. `components/Manifesto.tsx`

- **Role:** The Rhetorical Argument.
- **Content:** Static text advocating for the "Bodyright" framework and "Privacy-by-Design."

---

## 5. Directory Structure

```text
/
├── app/
│   ├── layout.tsx       # Metadata: "Project Aletheia", Monospace font, Viewport settings
│   ├── page.tsx         # Composition: Watcher + Terminal + Manifesto (State Lifting lives here)
│   └── globals.css      # Tailwind directives + specific resets
├── components/
│   ├── TheWatcher.tsx   # R3F Component
│   ├── DataTerminal.tsx # UI Overlay
│   ├── PrivacyToggle.tsx
│   └── Manifesto.tsx
├── public/
│   └── PLEDGE.md        # The open-source pledge file
├── next.config.js       # MUST contain: output: 'export', images: unoptimized
├── tailwind.config.ts
└── package.json
```
