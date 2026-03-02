import { LiquidGlassButton } from "../Components/Buttons/LiquidGlassButton";
import { useState } from "react";
import { useCreateCheckoutSession } from "../hooks/useCreateCheckoutSession.ts";
import { CheckoutConfirmModal } from "../Components/Payments/CheckoutConfirmModal.tsx";
import {useTheme} from "../Context/ThemeContext.tsx";


export function PremiumPreCheckout() {
    const {theme} = useTheme()
    const isDark = theme === "dark";

    const [showModal, setShowModal] = useState(false);
    const { createCheckoutSession, loading, error } = useCreateCheckoutSession();

    const handleConfirmCheckout = async () => {
        const data = await createCheckoutSession();
        if (data?.url) {
            window.location.href = data.url; // redirect immediato a Stripe
        }
    };

    // Condizioni per classi di background/testo
    const bgClass = isDark ? "bg-neutral-950 text-white" : "bg-white text-black";
    const textMainClass = isDark ? "text-neutral-300" : "text-neutral-700";
    const cardBgClass = isDark
        ? "bg-neutral-900/70 border border-neutral-800"
        : "bg-white/90 border border-neutral-300";
    const cardTextClass = isDark ? "text-neutral-400" : "text-neutral-800";

    return (
        <main className={`relative min-h-screen overflow-hidden ${bgClass}`}>

            {/* Background grid */}
            {isDark && (
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] bg-[size:32px_32px]" />
            )}

            {/* Liquid gradients */}
            {isDark && (
                <>
                    <div className="absolute -top-60 -left-60 w-[700px] h-[700px] bg-gradient-to-br from-indigo-500/20 via-cyan-400/20 to-blue-500/20 rounded-full blur-3xl opacity-30" />
                    <div className="absolute bottom-[-300px] right-[-200px] w-[600px] h-[600px] bg-gradient-to-tr from-purple-500/20 via-fuchsia-400/20 to-indigo-500/20 rounded-full blur-3xl opacity-30" />
                </>
            )}

            <div className="relative max-w-7xl mx-auto px-8 py-32 space-y-32">

                {/* HERO */}
                <section className="max-w-4xl space-y-8">
                    <span className={`text-sm uppercase tracking-widest ${cardTextClass}`}>
                        Abbonamento Premium
                    </span>

                    <h1 className={`text-5xl md:text-6xl font-semibold leading-tight ${cardTextClass}`}>
                        Trasforma un semplice questionario
                        <br />
                        in un <span className={isDark ? "text-neutral-400" : "text-neutral-500"}>report strategico operativo.</span>
                    </h1>

                    <p className={`text-xl max-w-3xl ${textMainClass}`}>
                        Con l’abbonamento Premium ricevi analisi approfondite,
                        insight strutturati e raccomandazioni operative personalizzate
                        dopo ogni survey compilato.
                    </p>

                    <div className="flex items-center gap-8 pt-6">
                        <LiquidGlassButton onClick={() => setShowModal(true)}>
                            Attiva Premium — 15€/mese
                        </LiquidGlassButton>
                        <span className={`text-sm ${cardTextClass}`}>
                            Disdici in qualsiasi momento
                        </span>
                    </div>
                </section>

                {/* WHAT YOU GET */}
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    <div className="space-y-6">
                        <h2 className={`text-4xl font-semibold ${cardTextClass}`}>
                            Cosa include il piano Premium
                        </h2>

                        <p className={`text-lg ${textMainClass}`}>
                            Non si tratta di un semplice riepilogo automatico.
                            Ogni report viene generato con un modello avanzato di sintesi,
                            progettato per offrire chiarezza decisionale e priorità operative.
                        </p>

                        <ul className={`space-y-4 ${cardTextClass}`}>
                            <li>• Analisi strutturata delle risposte</li>
                            <li>• Identificazione delle inefficienze operative</li>
                            <li>• Evidenziazione delle aree a maggior impatto</li>
                            <li>• Raccomandazioni strategiche personalizzate</li>
                            <li>• Sintesi executive pronta per condivisione</li>
                        </ul>
                    </div>

                    <div className={`relative p-10 rounded-3xl ${cardBgClass} backdrop-blur-xl shadow-2xl`}>
                        <h3 className={`text-2xl font-medium mb-6 ${cardTextClass}`}>
                            Output del report
                        </h3>

                        <div className={`space-y-6 text-sm leading-relaxed ${cardTextClass}`}>
                            <p>→ Mappatura dello stato attuale dei processi</p>
                            <p>→ Valutazione del livello di digitalizzazione</p>
                            <p>→ Analisi dei colli di bottiglia</p>
                            <p>→ Opportunità di automazione</p>
                            <p>→ Roadmap suggerita a breve e medio termine</p>
                        </div>
                    </div>
                </section>

                {/* VALUE SECTION */}
                <section className="max-w-4xl space-y-10">
                    <h2 className={`text-4xl font-semibold ${cardTextClass}`}>Perché 15€ al mese?</h2>

                    <p className={`text-lg leading-relaxed ${textMainClass}`}>
                        Un’analisi consulenziale tradizionale può costare centinaia di euro.
                        Con Premium ottieni una valutazione strutturata ogni volta che
                        completi un survey, a un costo mensile sostenibile.
                    </p>

                    <div className="grid md:grid-cols-3 gap-10">
                        {["Chiarezza","Priorità","Velocità"].map(title => (
                            <div key={title} className={`p-8 rounded-3xl ${cardBgClass} backdrop-blur`}>
                                <h3 className="text-xl font-medium mb-4">{title}</h3>
                                <p className={`${cardTextClass} text-sm`}>
                                    {title === "Chiarezza" && "Decisioni basate su dati organizzati e leggibili."}
                                    {title === "Priorità" && "Focus su ciò che genera reale impatto operativo."}
                                    {title === "Velocità" && "Insight immediati senza settimane di attesa."}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* PRICING BLOCK */}
                <section className="relative flex justify-center">
                    <div className={`w-full max-w-2xl p-12 rounded-3xl ${cardBgClass} backdrop-blur-2xl shadow-2xl text-center space-y-8`}>
                        <h2 className={`text-4xl font-semibold ${cardTextClass}`}>Premium</h2>

                        <div className={`text-6xl font-semibold ${cardTextClass}`}>
                            15€ <span className={isDark ? "text-neutral-400" : "text-neutral-500"}>/ mese</span>
                        </div>

                        <p className={cardTextClass}>
                            Accesso illimitato ai report avanzati generati
                            dopo ogni compilazione del survey.
                        </p>

                        <LiquidGlassButton onClick={() => setShowModal(true)}>
                            Attiva ora
                        </LiquidGlassButton>

                        <p className={`text-xs ${cardTextClass}`}>
                            Pagamento sicuro tramite Stripe. Nessun vincolo annuale. Disattivazione immediata.
                        </p>
                    </div>
                </section>
            </div>

            <CheckoutConfirmModal
                open={showModal}
                onConfirm={handleConfirmCheckout}
                onCancel={() => setShowModal(false)}
                loading={loading}
                variant={theme} // passa il tema al modal
            />

            {error && (
                <p className="text-red-400 text-sm text-center mt-4">
                    {error}
                </p>
            )}
        </main>
    );
}