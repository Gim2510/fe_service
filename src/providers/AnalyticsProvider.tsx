import { useEffect, useState, createContext, useContext, type ReactNode } from "react";
import posthog from "posthog-js";
import { track } from "@vercel/analytics";

type Consent = {
    necessary: boolean;
    preferences: boolean;
    analytics: boolean;
    marketing: boolean;
};

interface AnalyticsContextType {
    consent: Consent | null;
    trackEvent: (name: string, properties?: Record<string, unknown>) => void;
    trackPageview: (path: string) => void;
}

const AnalyticsContext = createContext<AnalyticsContextType>({
    consent: null,
    trackEvent: () => {},
    trackPageview: () => {},
});

export function useAnalytics(): AnalyticsContextType {
    return useContext(AnalyticsContext);
}

export function AnalyticsProvider({ children }: { children: ReactNode }) {
    const [consent, setConsent] = useState<Consent | null>(null);

    useEffect(() => {
        const stored = localStorage.getItem("gdprConsent");
        if (stored) {
            const parsed = JSON.parse(stored);
            setConsent(parsed);
            if (parsed.analytics) {
                initPostHog();
            }
        }
    }, []);

    const initPostHog = () => {
        const key = import.meta.env.VITE_POSTHOG_KEY;
        if (!key) return;
        posthog.init(key, {
            api_host: "https://eu.i.posthog.com",
            capture_pageview: false,
            autocapture: true,
            disable_session_recording: false,
            loaded: (ph) => {
                if (import.meta.env.DEV) ph.opt_out_capturing();
            },
        });
    };

    const trackEvent = (name: string, properties?: Record<string, unknown>) => {
        if (!consent?.analytics) return;
        posthog.capture(name, properties);
        track(name, properties);
    };

    const trackPageview = (path: string) => {
        if (!consent?.analytics) return;
        posthog.capture("$pageview", { path });
        track("pageview", { path });
    };

    const value = { consent, trackEvent, trackPageview };

    return (
        <AnalyticsContext.Provider value={value}>
            {children}
        </AnalyticsContext.Provider>
    );
}

export function updateAnalyticsConsent(consent: Consent): void {
    if (consent.analytics) {
        const key = import.meta.env.VITE_POSTHOG_KEY;
        if (key && !posthog.__loaded) {
            posthog.init(key, {
                api_host: "https://eu.i.posthog.com",
                capture_pageview: false,
                autocapture: true,
            });
        }
        if (posthog.__loaded) {
            posthog.opt_in_capturing();
        }
    } else {
        if (posthog.__loaded) {
            posthog.opt_out_capturing();
        }
    }
    localStorage.setItem("gdprConsent", JSON.stringify(consent));
}
