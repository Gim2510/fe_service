# fe_service

## Overview
Web frontend for the boat rental platform. React SPA with rich UI components and 3D visualizations.

- **Stack**: React 18, TypeScript, Vite, Tailwind CSS, MUI (Material UI)
- **3D**: Three.js + `@react-three/fiber` + `@react-three/drei`, `cobe` globe
- **Charts**: Chart.js, Recharts
- **Auth**: Google OAuth (`@react-oauth/google`), JWT decode
- **Monitoring**: Sentry (`@sentry/react`)
- **Animation**: Framer Motion

## Architecture
- Vite dev server (default port 5173)
- Tailwind via `@tailwindcss/vite` plugin
- Routing: React Router DOM
- UI: MUI + Tailwind hybrid
- Password strength: `zxcvbn`

## Key Scripts
```
npm run dev        # Vite dev server
npm run build      # production build
npm run lint       # eslint
npm run preview    # preview production build
```

## Env Vars (VITE_ prefix — exposed to client)
| Var | Purpose |
|-----|---------|
| `VITE_REPORT_BASE_URL` | report_service URL (default: http://localhost:3003) |
| `VITE_SURVEY_REPORT_TO_EMAIL` | survey report recipient email |
| `VITE_*_BASE_URL` | other service base URLs |

## Service URL Map (local dev)
| Service | URL |
|---------|-----|
| user_platform_service | http://localhost:3001 |
| survey_service | http://localhost:3002 |
| report_service | http://localhost:3003 |
| notification_service | http://localhost:3004 |
| chat_bot_service | http://localhost:3005 |
| dashboard_service | http://localhost:3006 |
| payment_service | http://localhost:3007 |
| invoices_service | http://localhost:3008 |
| careers_service | http://localhost:3009 |
