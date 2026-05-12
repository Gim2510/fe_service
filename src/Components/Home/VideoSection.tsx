import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { useState } from "react";
import { SectionBase } from "./SectionBase.tsx";

// Replace with your actual video URL (YouTube embed, Vimeo, or direct MP4)
const VIDEO_URL = ""; // e.g. "https://www.youtube.com/embed/YOUR_ID?autoplay=1"

export function VideoSection({ theme }: { theme: string }) {
    const isDark = theme === "dark";
    const [playing, setPlaying] = useState(false);

    return (
        <SectionBase theme={theme}>
            {/* Header */}
            <motion.div
                className="text-center mb-12"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
                <span className={`text-xs font-semibold uppercase tracking-widest ${
                    isDark ? "text-emerald-500" : "text-emerald-700"
                }`}>
                    Come funziona
                </span>
                <h2 className={`font-fjalla text-4xl sm:text-5xl font-semibold mt-3 ${
                    isDark ? "text-slate-100" : "text-slate-900"
                }`}>
                    Dal problema al risultato.{" "}
                    <span className={isDark ? "text-emerald-500" : "text-emerald-700"}>
                        In tre passi.
                    </span>
                </h2>
                <p className={`mt-5 text-lg max-w-2xl mx-auto ${
                    isDark ? "text-slate-400" : "text-slate-600"
                }`}>
                    Guarda come accompagniamo una PMI dalla diagnosi iniziale
                    all'implementazione — con risultati misurabili a ogni fase.
                </p>
            </motion.div>

            {/* Video player */}
            <motion.div
                className="relative max-w-4xl mx-auto"
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            >
                {/* Glow behind player */}
                {isDark && (
                    <div className="absolute -inset-4 rounded-3xl blur-2xl opacity-20 bg-emerald-600 pointer-events-none" />
                )}

                <div className={`relative rounded-2xl overflow-hidden border aspect-video ${
                    isDark
                        ? "border-stone-800/40 bg-[#1C1C1A]"
                        : "border-slate-200 bg-slate-100"
                }`}>
                    {playing && VIDEO_URL ? (
                        <iframe
                            src={VIDEO_URL}
                            className="absolute inset-0 w-full h-full"
                            allow="autoplay; fullscreen"
                            allowFullScreen
                            title="AxiomLab — Come funziona"
                        />
                    ) : (
                        <>
                            {/* Thumbnail / placeholder */}
                            <div className={`absolute inset-0 flex items-center justify-center ${
                                isDark
                                    ? "bg-gradient-to-br from-[#1C1C1A] via-[#222220] to-[#161614]"
                                    : "bg-gradient-to-br from-slate-100 via-emerald-50 to-slate-100"
                            }`}>
                                {/* rose glow rings */}
                                <div className={`absolute w-64 h-64 rounded-full blur-3xl pointer-events-none ${
                                    isDark ? "bg-emerald-700/15" : "bg-emerald-300/25"
                                }`} />

                                {/* Play button */}
                                <button
                                    onClick={() => VIDEO_URL ? setPlaying(true) : undefined}
                                    className={`relative z-10 group flex items-center justify-center w-20 h-20 rounded-full border-2 transition-all duration-300 ${
                                        isDark
                                            ? "border-emerald-600/60 bg-emerald-700/20 hover:bg-emerald-700/40 hover:border-emerald-500"
                                            : "border-emerald-500/60 bg-emerald-50 hover:bg-emerald-100 hover:border-emerald-600"
                                    } hover:scale-110 shadow-xl`}
                                    aria-label="Guarda il video"
                                >
                                    <Play
                                        size={28}
                                        className={`ml-1 transition-colors duration-200 ${
                                            isDark ? "text-emerald-400 group-hover:text-emerald-300" : "text-emerald-700 group-hover:text-emerald-800"
                                        }`}
                                        fill="currentColor"
                                    />
                                    {/* Pulse ring */}
                                    <span className={`absolute inset-0 rounded-full border-2 animate-ping opacity-30 ${
                                        isDark ? "border-emerald-500" : "border-emerald-400"
                                    }`} />
                                </button>

                                {/* Coming soon label if no VIDEO_URL */}
                                {!VIDEO_URL && (
                                    <span className={`absolute bottom-6 text-xs font-semibold uppercase tracking-widest ${
                                        isDark ? "text-stone-700" : "text-slate-400"
                                    }`}>
                                        Video in arrivo
                                    </span>
                                )}
                            </div>
                        </>
                    )}
                </div>

                {/* Caption */}
                <p className={`mt-4 text-center text-sm ${isDark ? "text-slate-600" : "text-slate-400"}`}>
                    Durata: ~3 minuti • Nessuna registrazione richiesta
                </p>
            </motion.div>
        </SectionBase>
    );
}
