import { useState } from "react";
import { useAuth } from "../auth/AuthContext.tsx";

type LoginInput = {
    email: string;
    password: string;
};

export function useLogin() {
    const { login } = useAuth(); // <-- usa login del contesto
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function doLogin({ email, password }: LoginInput) {
        setLoading(true);
        setError(null);

        try {
            const res = await fetch(`${import.meta.env.VITE_USER_BASE_URL}/v1/user/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ email, password }),
            });

            if (!res.ok) {
                const msg = await res.json();
                const errorText = typeof msg === "string"
                    ? msg
                    : (msg?.message || "Login fallito");
                const italianMap: Record<string, string> = {
                    "email or password incorrect": "Email o password non corretti",
                    "missing params: email=undefined, password=undefined": "Email e password obbligatorie",
                };
                throw new Error(italianMap[errorText] ?? errorText);
            }

            const data = await res.json();
            login(data.accessToken); // <-- qui sostituisce setAuthState
            return data;
        } catch (err: any) {
            setError(err.message || "Errore imprevisto");
            throw err;
        } finally {
            setLoading(false);
        }
    }

    return { doLogin, loading, error };
}
