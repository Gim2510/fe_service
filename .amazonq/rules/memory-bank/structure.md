# Project Structure

## Directory Layout
```
fe_service/
├── public/               # Static assets (logos, background images)
├── src/
│   ├── api/              # Raw fetch API functions (auth.api.ts)
│   ├── auth/             # AuthContext - JWT token management, auto-logout
│   ├── Components/       # Reusable UI components grouped by domain
│   │   ├── Buttons/      # Custom button components (LiquidGlassButton)
│   │   ├── Careers/      # Job application flow components
│   │   ├── ChatBot/      # Chat widget
│   │   ├── Dashboard/    # Admin/user dashboard components
│   │   │   ├── DashboardModals/  # Modal dialogs for dashboard actions
│   │   │   └── Panels/           # Slide-in panels for dashboard actions
│   │   ├── Home/         # Homepage sections (Hero, CTA, Globe, etc.)
│   │   ├── Inputs/       # Reusable input components
│   │   ├── Navbar/       # Navigation bar and mobile menu
│   │   ├── Payments/     # Checkout modal
│   │   ├── Protected/    # Route guards (Protected, RoleProtected)
│   │   └── Survey/       # Survey question components
│   ├── Context/          # React contexts (Theme, Premium, Scroll)
│   ├── hooks/            # Custom hooks - all API calls live here
│   ├── Layout/           # Page layout wrappers (Homepage, Survey)
│   ├── Pages/            # Route-level page components
│   │   └── Payments/     # Payment result pages
│   ├── staticData/       # Static data (logos list)
│   ├── types/            # TypeScript type definitions
│   ├── utils/            # Pure utility functions
│   ├── App.tsx           # Root component with all routes
│   ├── main.tsx          # Entry point, wraps App in BrowserRouter
│   ├── props.ts          # Shared prop types
│   └── types.ts          # Root-level shared types
├── .env                  # Environment variables (VITE_USER_BASE_URL, etc.)
├── vite.config.ts        # Vite + Sentry build config
├── tailwind.config.ts    # Tailwind CSS v4 config
├── eslint.config.js      # ESLint flat config
└── vercel.json           # Vercel deployment config (SPA rewrites)
```

## Core Architectural Patterns

### Routing
All routes defined in `App.tsx` using react-router-dom v7. Protected routes use `<Protected>` (auth check) or `<RoleProtected role="ADMIN">` (role check) wrappers.

### State & Data Fetching
- No external state manager (no Redux/Zustand)
- All API calls encapsulated in custom hooks under `src/hooks/`
- Each hook returns `{ data, loading, error }` + action function
- Auth state managed globally via `AuthContext` (JWT in localStorage)
- Theme, Premium, Scroll state via dedicated Context providers

### Context Provider Hierarchy (App.tsx)
```
ThemeProvider
  └── AuthProvider
        └── PremiumProvider
              └── ScrollProvider + Routes
```

### Component Relationships
- Pages import Components and Hooks
- Components use Hooks for data, Context for global state
- Hooks call `fetch()` directly using `VITE_USER_BASE_URL` env var
- Types are imported from `src/types/` across all layers
