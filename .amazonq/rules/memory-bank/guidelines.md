# Development Guidelines

## Code Quality Standards

### TypeScript Conventions
- Use `type` keyword for object shapes and unions; use `enum` for fixed value sets
- Enums use `// @ts-ignore` above declaration (workaround for isolatedModules)
- Type-only imports use `import type { ... }` syntax
- Local types defined at top of file when used only in that file
- Avoid `any` except in catch blocks (`err: any`) and legacy API payloads

### Naming Conventions
- Components: PascalCase, named exports (`export function MyComponent`)
- Hooks: camelCase prefixed with `use` (`useLogin`, `useGetAllUsers`)
- Types/interfaces: PascalCase (`UserType`, `JwtPayload`, `LoginInput`)
- Enums: PascalCase name, SCREAMING_SNAKE_CASE values (`UserRoles.Admin = "ADMIN"`)
- Context files: `<Name>Context.tsx`, export both Provider and `use<Name>` hook
- Files: PascalCase for components/pages, camelCase for hooks/utils/types

### File Organization
- One component per file; filename matches exported component name
- Types local to a hook/component defined inline at top of that file
- Shared types live in `src/types/` with descriptive filenames

---

## Custom Hook Pattern
All API interactions are encapsulated in custom hooks. Every hook follows this exact structure:

```ts
export function useActionName() {
    const { token } = useAuth();                          // get auth token
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function doAction(params): Promise<ReturnType> {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`${import.meta.env.VITE_*_BASE_URL}/v1/...`, {
                method: "POST" | "GET" | "PUT" | "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(payload),  // omit for GET
            });
            if (!res.ok) {
                const msg = await res.json();
                throw new Error(msg?.message || "Fallback error message");
            }
            return await res.json();
        } catch (err: any) {
            setError(err.message || "Errore imprevisto");
            throw err;
        } finally {
            setLoading(false);
        }
    }

    return { doAction, loading, error };
}
```

- Hooks that fetch on mount use `useEffect` with `.then().catch().finally()` chain instead of async/await
- Always destructure `{ token }` or `{ token, id }` from `useAuth()`
- Always re-throw errors after setting error state so callers can handle them

---

## Context Pattern
Contexts follow a consistent structure:

```tsx
const MyContext = createContext<ContextType>(null!);  // or default value object

export function MyProvider({ children }: { children: ReactNode }) {
    const [state, setState] = useState(initialValue);
    // side effects with useEffect
    return <MyContext.Provider value={{ state, action }}>{children}</MyContext.Provider>;
}

export const useMyContext = () => useContext(MyContext);
```

- Export both the Provider component and a `use<Name>` convenience hook from the same file
- `AuthContext` uses `null!` as default (requires Provider to always be present)
- `ThemeContext` uses a safe default object so it works without Provider

---

## API & Environment Variables
- Multiple backend services, each with its own env var:
  - `VITE_USER_BASE_URL` — user/auth service
  - `VITE_SURVEY_BASE_URL` — survey service
  - `VITE_CAREERS_BASE_URL` — careers service
- URL pattern: `${import.meta.env.VITE_*_BASE_URL}/v1/<service>/<endpoint>`
- Always include `/v1/` version prefix in paths
- Auth header format: `Authorization: \`Bearer ${token}\``
- Always include `"Content-Type": "application/json"` for POST/PUT requests
- Use `credentials: "include"` only when cookies are needed (login endpoint)

---

## Route Protection
Two guard components in `src/Components/Protected/`:

- `<Protected>` — redirects to `/` if not authenticated
- `<RoleProtected role="ADMIN">` — redirects to `/` if not authenticated or wrong role

Usage in `App.tsx`:
```tsx
<Route path="/dashboard" element={
    <RoleProtected role="ADMIN">
        <LayoutHomepage><AdminDashboard /></LayoutHomepage>
    </RoleProtected>
} />
```

---

## Styling Patterns
- Tailwind utility classes are primary styling method
- Dark mode via `dark:` prefix (toggled by adding `dark` class to `<html>`)
- MUI components used for complex UI (modals, tables, icons)
- Framer Motion / `motion` for animations
- Glass-morphism aesthetic: `backdrop-blur`, `bg-white/10`, `border border-white/20`
- Common pattern: conditional dark/light classes `dark:bg-gray-900 bg-white`

---

## Enum Usage
Enums are string enums used for roles and statuses:

```ts
// @ts-ignore
export enum UserRoles {
    Admin = "ADMIN",
    User = "USER",
}

// @ts-ignore
export enum CompanyRoles {
    Founder = "FOUNDER",
    CEO = "CEO",
    // ...
}
```

Always use enum values (not raw strings) when comparing roles in components.

---

## Module Declarations
Untyped third-party packages get a minimal declaration file in `src/types/`:

```ts
// src/types/react-globe.d.ts
declare module "react-globe";
```

---

## ESLint Configuration
Flat config (`eslint.config.js`) with:
- `@eslint/js` recommended
- `typescript-eslint` recommended
- `eslint-plugin-react-hooks` recommended
- `eslint-plugin-react-refresh` vite preset
- `dist/` folder ignored
- Target: `ecmaVersion: 2020`, browser globals

---

## Key Anti-Patterns to Avoid
- Do NOT use Axios — use native `fetch()`
- Do NOT use Redux/Zustand — use React Context + custom hooks
- Do NOT use react-hook-form — use `useState` for form state
- Do NOT hardcode API URLs — always use `import.meta.env.VITE_*`
- Do NOT call APIs directly in components — always go through a custom hook
- Do NOT forget to handle `loading` and `error` states returned from hooks
