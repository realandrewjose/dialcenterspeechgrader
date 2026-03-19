# Symposium Research Grading App

A grading app for public speaking courses, built with Vite + React and styled with Tailwind.

The app includes three graders:
- Symposium Research Presentation (150 pts)
- Informative Speech (200 pts)
- Persuasive Speech (250 pts)

It supports both:
- Browser-based usage (development + static web build)
- Desktop usage via Electron (Windows build output in `release/`)

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Grade Scale Used by the App](#grade-scale-used-by-the-app)
- [Getting Started](#getting-started)
- [Scripts](#scripts)
- [Run Modes](#run-modes)
- [Deployment Options](#deployment-options)
- [Desktop App Notes](#desktop-app-notes)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

---

## Features

- Assignment dashboard to choose grading mode
- Detailed rubric sections with per-item toggles (`Did` / `Did Not`)
- Section scoring + automatic total, percentage, and letter grade
- Informative/Persuasive “Glows” and “Grows” quick-feedback chips
- Citation counters and policy warnings (assignment-specific)
- Copy-to-clipboard summary output
- Print-friendly grading reports

---

## Tech Stack

- React 19
- Vite 8
- Tailwind CSS 4 (`tailwind.config.js`, `postcss.config.js`)
- Electron (for desktop app packaging)
- Express (for serving the prebuilt `web-build/` folder)

Main entry points:
- `src/main.jsx`
- `src/App.jsx`

---

## Project Structure

Key paths:

```text
src/
   App.jsx                 # Main grading UI + rubric logic
   main.jsx                # React entry point
   style.css               # Tailwind + global styles

electron/
   main.js                 # Electron main process
   preload.js              # Electron preload

public/
   manifest.json           # PWA metadata
   sw.js                   # Service worker source

dist/                     # Vite build output (web + electron build input)
web-build/                # Prebuilt static web/PWA bundle used by server.js
release/                  # Electron build output

server.js                 # Express static server for web-build/
serve.py                  # Python fallback static server for web-build/
```

---

## Grade Scale Used by the App

Current percent-to-letter mapping:

| Percent | Letter | Grade Points |
|---|---|---|
| 90–100 | A | 4.0 |
| 87–89 | B+ | 3.33 |
| 80–86 | B | 3.0 |
| 77–79 | C+ | 2.33 |
| 70–76 | C | 2.0 |
| 67–69 | D+ | 1.33 |
| 60–66 | D | 1.0 |
| 0–59 | E | 0 |

This scale is applied consistently in all three graders for:
- on-screen grade display
- copied summaries
- printed reports

---

## Getting Started

### Prerequisites

- Node.js 18+ (recommended)
- npm

### Install

```bash
npm install
```

### Start development server

```bash
npm run dev
```

Open `http://localhost:5173`.

---

## Scripts

| Script | Purpose |
|---|---|
| `npm run dev` | Run Vite dev server |
| `npm run build` | Build production web assets to `dist/` |
| `npm run build:web` | Alias of `build` |
| `npm run build-electron` | Build app with Electron target env |
| `npm run preview` | Preview the `dist/` build |
| `npm run start` | Start Express server (`server.js`) for `web-build/` |
| `npm run serve` | Alias of `start` |
| `npm run electron-dev` | Build electron target then launch Electron |
| `npm run electron-dev-watch` | Run Vite + Electron together for desktop dev |
| `npm run electron-build` | Build Electron Windows portable output to `release/` |

---

## Run Modes

### 1) Browser development mode (recommended for coding)

```bash
npm run dev
```

- Fast HMR updates
- Uses source files directly

### 2) Static production preview (`dist/`)

```bash
npm run build
npm run preview
```

### 3) Serve existing `web-build/` bundle

```bash
npm run start
```

or

```bash
python serve.py 3000
```

Then open `http://localhost:3000`.

---

## Deployment Options

### Static host (GitHub Pages / Vercel / Netlify)

You can deploy static assets to any standard host.

Typical flow:
1. Build assets (`npm run build`)
2. Deploy static output
3. Ensure SPA fallback routes to `index.html`

If you are using the prebuilt PWA package in this repo, deploy contents of `web-build/`.

Additional guides in this repository:
- `CHROMEBOOK_DEPLOYMENT.md`
- `CHROMEBOOK_README.md`

---

## Desktop App Notes

Electron configuration is in:
- `electron/main.js`
- `electron/preload.js`
- `package.json` (`build` section)

Build desktop output:

```bash
npm run electron-build
```

Windows portable output is written to `release/`.

Launch helpers included:
- `Launch App.bat`
- `Run App.bat`

Desktop usage details:
- `DESKTOP_APP_README.md`
- `README_LAUNCHER.md`

---

## Troubleshooting

### App fails to start in dev mode

- Reinstall dependencies: `npm install`
- Ensure supported Node version
- Check for port conflicts on `5173`

### Static server shows old content

- Rebuild assets (`npm run build`)
- If serving `web-build/`, ensure that folder contains your latest deployed files

### Electron window opens blank

- Confirm `dist/index.html` exists after build
- Use `npm run electron-dev-watch` during development

### Service worker/PWA behavior seems stale

- Hard refresh browser (`Ctrl+Shift+R`)
- Clear site storage/cache and reopen

---

## Contributing

- Keep rubric logic and grade scale changes centralized in `src/App.jsx`
- If adding new UI/components, ensure styles are imported through `src/style.css`
- When adding Tailwind classes or scanning paths, update `tailwind.config.js` as needed
- Validate changes by running:

```bash
npm run dev
```

and/or

```bash
npm run build
```

