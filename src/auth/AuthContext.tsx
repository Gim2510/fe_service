import {
    createContext,
    useContext,
    useState,
    useEffect,
    useRef,
    type ReactNode,
} from "react";
import { jwtDecode } from "jwt-decode";

type JwtPayload = {
    sub: string;
    role: string;
    emailVer: boolean;
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
};

export const AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [token, setToken] = useState<string | null>(() =>
        localStorage.getItem("token")
    );

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
    };

    const login = (newToken: string) => {
        clearLogoutTimer();
        setToken(newToken);
    };

    // Persist token
    useEffect(() => {
        if (token) {
            localStorage.setItem("token", token);
        } else {
            localStorage.removeItem("token");
        }
    }, [token]);

    let role: string | null = null;
    let id: string | null = null;
    let emailVer: boolean | null = null

    // ⏱️ Auto logout su scadenza token
    useEffect(() => {
        if (!token) return;

        try {
            const decoded = jwtDecode<JwtPayload>(token);
            role = decoded.role;
            id = decoded.sub;
            emailVer = decoded.emailVer

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
        } catch {
            role = null;
            id = null;
            emailVer = null;
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
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
