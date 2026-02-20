import { Navigate } from "react-router-dom";
import type { JSX } from "react";
import { useAuth } from "../../auth/AuthContext";
import { jwtDecode } from "jwt-decode";

type JwtPayload = {
    sub: string;
    role: string;
    exp: number;
};

type Props = {
    children: JSX.Element;
    role: string;
};

export function RoleProtected({ children, role }: Props) {
    const { token, logout, isAuthenticated } = useAuth();

    if (!token || !isAuthenticated) {
        return <Navigate to="/" />;
    }

    try {
        const decoded = jwtDecode<JwtPayload>(token);
        const now = Math.floor(Date.now() / 1000);

        // Token scaduto
        if (decoded.exp < now) {
            logout();
            return <Navigate to="/" />;
        }

        // Ruolo non autorizzato
        if (decoded.role !== role) {
            return <Navigate to="/" />;
        }

    } catch {
        logout();
        return <Navigate to="/" />;
    }

    return children;
}
