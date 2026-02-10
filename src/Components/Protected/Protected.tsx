import { Navigate } from "react-router-dom";
import type { JSX } from "react";
import { useAuth } from "../../auth/AuthContext.tsx";
import {jwtDecode} from "jwt-decode";

type JwtPayload = {
    sub: string;
    role: string;
    exp: number;
};

export function Protected({ children }: { children: JSX.Element }) {
    const { token, logout, isAuthenticated } = useAuth();

    // Se c'è un token, verifica se è scaduto
    if (token) {
        try {
            const decoded = jwtDecode<JwtPayload>(token);
            const now = Math.floor(Date.now() / 1000); // tempo attuale in secondi
            if (decoded.exp < now) {
                logout(); // token scaduto → logout
                return <Navigate to="/" />;
            }
        } catch (error) {
            // token non valido → logout
            logout();
            return <Navigate to="/" />;
        }
    }

    // Se non autenticato, redirect al login
    if (!isAuthenticated) {
        return <Navigate to="/" />;
    }

    return children;
}
