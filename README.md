# Project Aletheia: The Right to Your Own Reality

> "The internet isn't nowhere... It has a physical space."

**Project Aletheia** is a digital rhetorical artifact and a functional proof-of-concept for **Privacy-by-Design** in Extended Reality (XR).

It serves as a living manifesto that visualizes the invisible: how browser-based systems can passively track user biometrics (head motion, gaze patterns) to infer psychological states ("Biometric Psychography").

## 🚩 The Mission

We tend to think of the internet as a place we visit, but with Extended Reality (XR), the internet visits us. Unlike previous eras of "active" data collection (clicks and text), immersive technologies require the continuous collection of intimate, passive data.

Research shows that VR users can be uniquely recognized with **90% accuracy** using head motions alone. This data allows corporations to infer medical conditions, sexual preferences, and concentration levels without consent.

**Project Aletheia demands a shift in architecture:** from Surveillance Capitalism to Privacy-by-Design.

## 🛠 Technical Philosophy

**The Medium is the Message.**
To argue against invasive data extraction, this website must embody the solution. It is built on a **Zero-Knowledge Architecture**:

1.  **Static Export:** The site is built as a static HTML/JS bundle (`output: 'export'`). There is no backend server to collect logs.
2.  **Client-Side Only:** All biometric simulation (The Watcher) and inference logic happens strictly on your device (Local Processing).
3.  **No Trackers:** There are no cookies, no Google Analytics, and no third-party scripts.

## 🧰 The Stack

This project is engineered for transparency and minimalism:

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **3D Engine:** [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) (Three.js)
- **Deployment:** GitHub Pages
- **License:** MIT

## 📂 Project Structure

```text
project-aletheia/
├── app/
│   ├── layout.tsx       # Global font and metadata
│   └── page.tsx         # Main landing page assembly
├── components/
│   ├── TheWatcher.tsx   # R3F Canvas and Logic
│   ├── DataTerminal.tsx # The text readout overlay
│   ├── Manifesto.tsx    # Static text content sections
│   └── PrivacyToggle.tsx # Global state switch
├── public/
│   └── PLEDGE.md        # The Bodyright Compact
└── next.config.js       # Static export config
```

## 🚀 Getting Started

To run this project locally and inspect the "inference" logic yourself:

```bash
# 1. Clone the repository
git clone https://github.com/sbalbale/project-aletheia.git

# 2. Enter the directory
cd project-aletheia

# 3. Install dependencies
# We use 'three' for the 3D visualization and 'lucide-react' for UI icons
npm install

# 4. Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🧩 Key Features

### 1. The Watcher (Biometric Visualization)

A 3D mesh that tracks your mouse movements in real-time. This visualizes the "passive data" stream usually hidden from users.

- _Located in:_ `components/TheWatcher.tsx`

### 2. The Inference Terminal

A debugger-style overlay that displays raw coordinate data and "Inferred Intent" (e.g., Hesitation, Focus). This demonstrates how raw data is processed into behavioral profiles.

- _Located in:_ `components/DataTerminal.tsx`

### 3. Privacy Mode

A toggle that instantly cuts the data feed. This demonstrates **Data Minimization**: collecting only what is necessary to support the spatial experience, not to expand ad audiences.

## 🤝 The Developer's Pledge

We are calling on engineers to adopt the **IEEE "Bodyright" Framework**, treating biometric data as a human property right.

**To sign the pledge:**

1.  Read [`public/PLEDGE.md`](public/PLEDGE.md).
2.  Fork this repository.
3.  Add your name/handle to the Signatories list.
4.  Submit a Pull Request.

## 📄 License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.

---

_Created by Sean Balbale for RHET 125._
