# Technology Stack

## Core Languages & Runtime
- TypeScript ~5.9.3 (strict mode via tsconfig)
- React 19.2.0
- Node.js (dev environment)

## Build System
- Vite (via `rolldown-vite@7.2.5` override) with `@vitejs/plugin-react-swc` (SWC compiler, not Babel)
- `@tailwindcss/vite` plugin for CSS processing
- Deployed on Vercel with SPA rewrite rule (`vercel.json`)

## Styling
- Tailwind CSS v4.1.18 — utility-first, dark mode via `class` strategy
- MUI (Material UI) v7.3.7 + `@emotion/react` + `@emotion/styled` — component library
- Framer Motion v12 + `motion` v12 — animations
- Custom `wave` keyframe animation defined in `tailwind.config.ts`

## Routing
- react-router-dom v7.13.0 — `BrowserRouter` in `main.tsx`, all routes in `App.tsx`

## HTTP / API
- Native `fetch()` — no Axios or React Query
- Base URL from `import.meta.env.VITE_USER_BASE_URL`
- JWT stored in `localStorage`, sent as `Authorization: Bearer <token>` header

## Auth
- `jwt-decode` v4 — client-side JWT decoding
- `jsonwebtoken` v9 — (available but jwt-decode used in practice)
- Auto-logout via `window.setTimeout` on token expiry

## Data Visualization
- Chart.js v4 + react-chartjs-2 v5
- Recharts v3.7.0
- 3D Globe: `cobe` v0.6.5, `react-globe.gl` v2.37.0, `react-globe` v2.0.1
- Three.js v0.182 + `@react-three/fiber` v9 + `@react-three/drei` v10

## Forms & Validation
- `zxcvbn` v4 — password strength estimation
- Manual form state with `useState` (no form library like react-hook-form)

## Monitoring
- `@sentry/react` v10.47.0

## Icons
- `lucide-react` v0.563.0
- `@mui/icons-material` v7.3.7

## Loading States
- `react-loader-spinner` v8.0.2

## Dev Tools
- ESLint v9 (flat config) with `typescript-eslint`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`
- TypeScript compiler for type checking (`tsc -b`)

## Development Commands
```bash
npm run dev       # Start dev server (Vite HMR)
npm run build     # Type-check + production build (tsc -b && vite build)
npm run lint      # Run ESLint
npm run preview   # Preview production build locally
```

## Environment Variables
- `VITE_USER_BASE_URL` — backend API base URL (required)
- Additional vars in `.env` (not committed)

## tsconfig Setup
- `tsconfig.json` — root references config
- `tsconfig.app.json` — app source config
- `tsconfig.node.json` — Vite config / Node tooling config
