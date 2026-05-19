export const CATEGORY_LABELS: Record<string, string> = {
    leadership:   "Leadership",
    azienda:      "Maturità aziendale",
    software:     "Software & Strumenti",
    processi:     "Processi operativi",
    integrazione: "Integrazione sistemi",
    it_security:  "Sicurezza IT",
    budget:       "Readiness investimenti",
};

export function scoreGrade(pct: number): { label: string; color: string; barColor: string } {
    if (pct >= 70) return { label: "Avanzato",    color: "#4ade80", barColor: "bg-green-500" };
    if (pct >= 40) return { label: "In sviluppo", color: "#f59e0b", barColor: "bg-cyan-500" };
    return             { label: "Iniziale",       color: "#f87171", barColor: "bg-red-400" };
}
