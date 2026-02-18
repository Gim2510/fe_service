import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const systemData = [
    { label: "Utenti attivi", value: 1283 },
    { label: "Richieste al secondo", value: 57 },
    { label: "Uptime", value: "99.98%" },
    { label: "Processi attivi", value: 12 },
];

export function HeroSystemStatus() {
    const [index, setIndex] = useState(0);
    const [displayValue, setDisplayValue] = useState(systemData[0].value);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((i) => (i + 1) % systemData.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const current = systemData[index];
        if (typeof current.value === "number") {
            let start = typeof displayValue === "number" ? displayValue : 0;
            const end = current.value;
            const steps = 40;
            let stepCount = 0;

            const counter = setInterval(() => {
                stepCount++;
                const val = Math.floor(start + ((end - start) * stepCount) / steps);
                setDisplayValue(val);
                if (stepCount >= steps) clearInterval(counter);
            }, 20);

            return () => clearInterval(counter);
        } else {
            setDisplayValue(current.value);
        }
    }, [index]);

    return (
        <div className="space-y-4">
            <div className="text-neutral-400 text-sm mb-2">Stato del sistema</div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ type: "spring", stiffness: 260, damping: 30 }}
                    className="text-white text-lg font-semibold"
                >
          <span className="text-yellow-400 mr-2">
            {systemData[index].label}:
          </span>
                    <span>{displayValue}</span>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
