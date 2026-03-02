import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "../auth/AuthContext.tsx";

type PremiumContextType = {
    isPremium: boolean;
    loading: boolean;
    refreshPremium: () => Promise<void>;
};

const PremiumContext = createContext<PremiumContextType>(null!);

export function PremiumProvider({ children }: { children: React.ReactNode }) {
    const {id} = useAuth()
    const { token } = useAuth();

    const [isPremium, setIsPremium] = useState(false);
    const [loading, setLoading] = useState(false);

    const user_base_url = import.meta.env.VITE_USER_BASE_URL
    const refreshPremium = async () => {
        if (!token) {
            setIsPremium(false);
            return;
        }

        setLoading(true);

        try {
            const res = await fetch(
                `${user_base_url}/v1/user/me/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!res.ok) throw new Error("Errore recupero premium");

            const data = await res.json();

            setIsPremium(data.premium === true);
        } catch (err) {
            console.error(err);
            setIsPremium(false);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (token) {
            refreshPremium();
        } else {
            setIsPremium(false);
        }
    }, [token]);

    return (
        <PremiumContext.Provider
            value={{ isPremium, loading, refreshPremium }}
        >
            {children}
        </PremiumContext.Provider>
    );
}

export const usePremium = () => useContext(PremiumContext);