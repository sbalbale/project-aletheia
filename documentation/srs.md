# Software Requirements Specification (SRS)

## Project Name: Project Aletheia

**Author:** Sean Balbale  
**Date:** November 21, 2025  
**Version:** 1.0  
**Repository Target:** GitHub Pages (Static)

---

## 1. Project Overview

**Project Aletheia** is a single-page, static web application designed as a rhetorical artifact. Its primary purpose is to advocate for **"Privacy-by-Design"** in Extended Reality (XR) technologies.

Current XR systems rely on the continuous collection of intimate, passive user data. This application serves as a "living manifesto," utilizing an interactive 3D visualization to demonstrate to users how easily their passive data (specifically head motion and gaze patterns) can be tracked and used for inference by browser-based systems.

---

## 2. Technical Stack & Environment

To strictly adhere to the ethical principle of **Data Minimization**, the project must operate entirely client-side with no external data extraction.

- **Framework:** Next.js 14+ (App Router)
  - _Configuration:_ Must use `output: 'export'` for Static Site Generation (SSG).
- **Language:** TypeScript (Strict Mode).
- **Styling:** Tailwind CSS (v3.4+).
- **3D Graphics:** React Three Fiber (R3F) ecosystem:
  - `three` (Core library)
  - `@react-three/fiber` (React renderer)
  - `@react-three/drei` (Helpers for geometry/lighting)
- **Deployment:** GitHub Pages.
  - _Constraint:_ No server-side processing or database storage.
- **Analytics:** **NONE.**
  - _Strict Requirement:_ No cookies, no Google Analytics, no tracking pixels.

---

## 3. Functional Requirements (FR)

### FR-01: The "Watcher" Component (Hero Interaction)

- **Description:** A 3D mesh (sphere or abstract head) rendered in the center of the viewport.
- **Behavior:** The mesh must rotate to face the user's mouse cursor coordinates `(x, y)` in real-time.
- **Rationale:** Visualizes the "passive collection" of head movements, which technical analyses have shown can uniquely identify users with 90% accuracy.

### FR-02: Privacy Mode Toggle

- **Description:** A boolean state switch (`true`/`false`) accessible via the UI.
- **Behavior (State = Active):** \* The Watcher tracks the mouse.
  - UI displays status: "RECORDING."
- **Behavior (State = Privacy):** \* The Watcher snaps to center `(0,0,0)` and halts tracking.
  - UI displays status: "PRIVACY MODE."
- **Rationale:** Demonstrates the architectural difference between **Surveillance Capitalism** models and **Privacy-by-Design** models .

### FR-03: Real-Time Data Inference Terminal

- **Description:** A text-based overlay simulating a debugger console.
- **Data Display:** Must show live raw coordinates and "Inferred Intent" string.
- **Logic:** Simple conditional logic based on cursor velocity and position (e.g., if velocity is low over an element, output "User is Hesitant").
- **Rationale:** Exposes the risk of **Biometric Psychography**, where systems infer sensitive information (health, concentration) without explicit consent.

### FR-04: The Developer Pledge

- **Description:** A "Call to Action" section.
- **Action:** An external link to the GitHub repository's `PLEDGE.md` file.
- **Rationale:** Encourages a shift toward the IEEE "Bodyright" framework, treating biometric identity as a human right.

---

## 4. UI/UX Design Specifications

### 4.1. Aesthetic Theme

- **Style:** "Engineering Dark Mode" / "Cyberpunk Minimalist."
- **Font:** Monospace (e.g., `JetBrains Mono` or `Courier Prime`) to reflect the coding environment and the technical nature of the argument.

### 4.2. Color Palette (Tailwind Classes)

- **Background:** `bg-slate-950` (Deep dark blue/black).
- **Primary Text:** `text-slate-300`.
- **Surveillance/Danger:** `text-red-500` (Used when Privacy Mode is OFF).
- **Privacy/Safe:** `text-green-500` (Used when Privacy Mode is ON).
- **Accent:** `border-slate-700`.

### 4.3. Accessibility (A11y)

- **Requirement:** High contrast text (WCAG AA standard).
- **Requirement:** Reduced motion preference support.
  - _Logic:_ If system setting `prefers-reduced-motion` is detected, the 3D animation must be disabled by default.
- **Rationale:** Aligns with the engineering focus on assisting visually impaired individuals, as explored in the "Haptic Horizon" project.

---

## 5. Content Strategy & Copy

The rhetorical text must be integrated directly into the React components as static content.

- **Hero Headline:** "THE INTERNET IS VISITING YOU."
- **Sub-Header:** "XR turns you into the data source. Stop the surveillance."
- **Key Terminology:**
  - "Biometric Psychography"
  - "Inferred Data"
  - "Embodied Harms"
  - "Bodyright"

---

## 6. Directory Structure (Architecture)

To ensure modularity and maintainability (similar to the code breakdown in the Haptic Horizon report), the project will follow this structure:

```text
project-aletheia/
├── app/
│   ├── layout.tsx       # Global font and metadata
│   └── page.tsx         # Main landing page assembly
├── components/
│   ├── TheWatcher.tsx   # R3F Canvas and Logic
│   ├── DataTerminal.tsx # The text readout overlay
│   ├── Manifesto.tsx    # Static text content sections
│   └── PrivacyToggle.tsx       # Contains the Privacy Toggle
├── public/
│   └── PLEDGE.md        # The Bodyright Compact
├── styles/
│   └── globals.css      # Tailwind directives
└── next.config.js       # Static export config
```
