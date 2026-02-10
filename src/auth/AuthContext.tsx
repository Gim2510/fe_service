import {createContext, type ReactNode, useContext} from "react";
import {jwtDecode} from "jwt-decode";
import { useLocalStorage } from "../hooks/useLocalStorage";

type JwtPayload = {
    sub: string;
    role: string;
    exp: number;
};

type AuthContextType = {
    token: string | null;
    role: string | null;
    id: string | null;
    login: (token: string) => void;
    logout: () => void;
    isAuthenticated: boolean;
};

export const AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: ReactNode }) {
    const { value: token, setStoredValue, clear } =
        useLocalStorage<string | null>("token", null);

    let role = null;
    let id = null;

    if (token) {
        const decoded = jwtDecode<JwtPayload>(token);
        role = decoded.role;
        id = decoded.sub;
    }

    function login(token: string) {
        setStoredValue(token);
    }

    function logout() {
        clear();
    }

    return (
        <AuthContext.Provider value={{token, role, id, login, logout, isAuthenticated: !!token,}}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
