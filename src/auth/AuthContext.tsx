import {
    createContext,
    useContext,
    useState,
    useEffect,
    useRef,
    type ReactNode,
} from "react";
import { jwtDecode } from "jwt-decode";
import { logoutApi } from "../api/auth.api.ts";

type JwtPayload = {
    sub: string;
    role: string;
    emailVer: boolean;
    isPremium: boolean;
    exp: number; // seconds
};

type AuthContextType = {
    token: string | null;
    role: string | null;
    emailVer: boolean | null;
    id: string | null;
    login: (token: string) => void;
    logout: () => void;
    isAuthenticated: boolean;
    isPremium: boolean | null;
    sessionRestored: boolean;
};

export const AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [token, setToken] = useState<string | null>(null);
    const [sessionRestored, setSessionRestored] = useState(false);

    const logoutTimer = useRef<number | null>(null);

    const clearLogoutTimer = () => {
        if (logoutTimer.current) {
            clearTimeout(logoutTimer.current);
            logoutTimer.current = null;
        }
    };

    const logout = () => {
        clearLogoutTimer();
        setToken(null);
        localStorage.removeItem("auth_token");
        logoutApi().catch(() => {});
    };

    const login = (newToken: string) => {
        clearLogoutTimer();
        setToken(newToken);
        localStorage.setItem("auth_token", newToken);
    };

    // Ripristina sessione da localStorage al mount
    useEffect(() => {
        const stored = localStorage.getItem("auth_token");
        if (stored) {
            setToken(stored);
        }
        setSessionRestored(true);
    }, []);

    let role: string | null = null;
    let id: string | null = null;
    let emailVer: boolean | null = null;
    let isPremium: boolean | null = null;

    // ⏱️ Auto logout su scadenza token
    useEffect(() => {
        if (!token) return;

        try {
            const decoded = jwtDecode<JwtPayload>(token);
            role = decoded.role;
            id = decoded.sub;
            emailVer = decoded.emailVer;
            isPremium = decoded.isPremium;

            const expiresAt = decoded.exp * 1000;
            const timeout = expiresAt - Date.now();

            if (timeout <= 0) {
                logout();
                return;
            }

            logoutTimer.current = window.setTimeout(logout, timeout);
        } catch {
            logout();
        }

        return clearLogoutTimer;
    }, [token]);

    if (token) {
        try {
            const decoded = jwtDecode<JwtPayload>(token);
            role = decoded.role;
            id = decoded.sub;
            emailVer = decoded.emailVer;
            isPremium = decoded.isPremium;
        } catch {
            role = null;
            id = null;
            emailVer = null;
            isPremium = null;
        }
    }

    return (
        <AuthContext.Provider
            value={{
                token,
                role,
                emailVer,
                id,
                login,
                logout,
                isAuthenticated: !!token,
                isPremium,
                sessionRestored,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
