# NovaCare Hospital Karachi

A fictional/demo premium hospital website built with React, Vite, React Router, Framer Motion and React Three Fiber.

**Important:** All doctors, departments' specialist counts, statistics, testimonials, and contact details are fictional/demo content created for a portfolio project. This does not represent a real hospital.

## Getting started

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually http://localhost:5173).

To build for production:

```bash
npm run build
npm run preview
```

## Tech stack

- React 18 + Vite
- React Router v6 (client-side routing, all routes work on refresh via Vite's dev server SPA fallback)
- Framer Motion (page transitions, scroll reveals, micro-interactions)
- React Three Fiber / Three.js (hero 3D visual — an abstract glowing medical sphere with orbit rings and particles, disabled/reduced on small screens and when `prefers-reduced-motion` is set)
- Lucide React (icons)

## Project structure

```
src/
  components/   Reusable UI: Navbar, Footer, cards, forms, Hero3D, Stats, Testimonials...
  pages/        One file per route
  data/         Structured data: departments, doctors, services, blog, testimonials
  styles/       Global CSS and design tokens (variables.css)
```

## Notes on deployment

Because this is a client-side SPA, when deploying to a static host (Netlify, Vercel, etc.) make sure to configure a fallback so that all routes serve `index.html` (Vite's dev server does this automatically; most static hosts need a rewrite rule such as `/* -> /index.html`).

## A note on this build

This project was generated in a sandboxed environment without npm registry access, so `npm install` / `npm run build` could not be executed to verify a clean build here. Every file was written carefully and cross-checked (import paths, icon names, JSX/bracket balance, route-to-page mapping), but please run `npm install && npm run build` locally as your first step and let me know if anything needs fixing.
