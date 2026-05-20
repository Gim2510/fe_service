import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, User, CreditCard, Mail, ShieldAlert, Save, CheckCircle, ArrowLeft } from "lucide-react";
import { useUser } from "../hooks/useUser";
import { Input } from "../Components/Input.tsx";
import type { UserEditForm } from "../types/userEditForm.ts";
import { useDeleteUser } from "../hooks/useDeleteUser.ts";
import { useAuth } from "../auth/AuthContext.tsx";
import { useUpdateUserInfo } from "../hooks/useUpdateUserInfo.ts";
import { FallingLines } from "react-loader-spinner";
import { useTheme } from "../Context/ThemeContext";
import { Badge } from "../Components/Badge.tsx";
import { useNavigate } from "react-router-dom";

export function UserEditProfile() {
    const { theme } = useTheme();
    const navigate = useNavigate();
    const { user, loading, error, refetch } = useUser();
    const { id, token, logout } = useAuth();
    const { doUpdateUserInfo, loading: loadingUpdate } = useUpdateUserInfo();
    const { deleteUser, loading: deleting, error: deleteError, success: deleteSuccess } = useDeleteUser();
    const isDark = theme === "dark";

    const [form, setForm] = useState<UserEditForm>({
        given_name: "", family_name: "", email: "", partita_iva: "", fiscal_code: "",
    });
    const [success, setSuccess] = useState(false);
    const [formError, setFormError] = useState<string | null>(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [activeSection, setActiveSection] = useState<string>("personal");

    useEffect(() => {
        if (deleteSuccess) setTimeout(() => logout(), 1500);
    }, [deleteSuccess, logout]);

    useEffect(() => {
        if (user) {
            setForm({
                given_name: user.given_name ?? "",
                family_name: user.family_name ?? "",
                email: user.email ?? "",
                partita_iva: user.partita_iva ?? "",
                fiscal_code: user.fiscal_code ?? "",
            });
        }
    }, [user]);

    function getChangedFields() {
        if (!user) return {};
        const changed: Partial<UserEditForm> = {};
        Object.keys(form).forEach((key) => {
            const k = key as keyof UserEditForm;
            if ((form[k] ?? "") !== (user[k] ?? "")) changed[k] = form[k];
        });
        return changed;
    }

    async function confirmUpdate() {
        setFormError(null);
        setSuccess(false);
        const changedFields = getChangedFields();
        if (Object.keys(changedFields).length === 0) {
            setFormError("Nessuna modifica rilevata");
            setShowConfirmModal(false);
            return;
        }
        try {
            await doUpdateUserInfo(changedFields);
            setSuccess(true);
            refetch();
            setShowConfirmModal(false);
        } catch {
            setFormError("Errore durante l'aggiornamento");
        }
    }

    const sections = [
        { id: "personal", label: "Personali", icon: User },
        { id: "fiscal", label: "Fiscali", icon: CreditCard },
        { id: "email", label: "Email", icon: Mail },
        { id: "danger", label: "Elimina", icon: ShieldAlert },
    ];

    if (loading) {
        return (
            <div className={`min-h-screen flex justify-center items-center ${isDark ? "bg-[#111110]" : "bg-[#FAF8F4]"}`}>
                <FallingLines color={isDark ? "#fff" : "#000"} width={80} visible ariaLabel="loading" />
            </div>
        );
    }

    if (error || !user) {
        return (
            <div className={`min-h-screen flex justify-center items-center ${isDark ? "bg-[#111110] text-white" : "bg-[#FAF8F4] text-slate-900"}`}>
                <div className="text-center">
                    <p className="text-red-400 mb-4">{error}</p>
                    <button onClick={refetch} className="px-5 py-2 rounded-xl bg-sky-700 hover:bg-sky-600 text-white text-sm">Riprova</button>
                </div>
            </div>
        );
    }

    return (
        <main className={`relative min-h-screen ${isDark ? "bg-[#111110] text-white" : "bg-[#FAF8F4] text-slate-900"}`}>
            {/* Grid background */}
            <div
                className={`absolute inset-0 pointer-events-none ${isDark ? "opacity-[0.06]" : "opacity-[0.12]"}`}
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32'%3E%3Crect x='0' y='0' width='32' height='32' fill='none' stroke='${isDark ? '%2306B6D4' : '%23453A30'}' stroke-width='0.4'/%3E%3C/svg%3E")`,
                    backgroundSize: "32px 32px",
                }}
            />

            <div className="relative z-10 max-w-4xl mx-auto px-6 py-24 space-y-8">
                {/* Back button */}
                <motion.button
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                    onClick={() => navigate(-1)}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border text-xs font-medium transition-all hover:-translate-y-0.5 duration-200
                        ${isDark
                            ? "border-stone-800/20 text-slate-400 hover:text-slate-200 hover:border-stone-800/40 bg-[#0E0E0D]/80"
                            : "border-slate-200 text-slate-500 hover:text-slate-700 hover:bg-slate-50"
                        }`}
                >
                    <ArrowLeft size={13} /> Torna al profilo
                </motion.button>

                {/* Header */}
                <motion.header initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
                    <Badge label="Profilo" color="sky" theme={theme} />
                    <h1 className={`text-3xl font-semibold mt-3 ${isDark ? "text-slate-100" : "text-slate-900"}`}>Modifica profilo</h1>
                    <p className={`mt-1 text-sm ${isDark ? "text-slate-500" : "text-slate-500"}`}>Aggiorna le informazioni personali del tuo account.</p>
                </motion.header>

                {/* Section tabs */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="flex gap-2 overflow-x-auto pb-2">
                    {sections.map((s) => {
                        const Icon = s.icon;
                        const isActive = activeSection === s.id;
                        return (
                            <button
                                key={s.id}
                                onClick={() => setActiveSection(s.id)}
                                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all border
                                    ${isActive
                                        ? isDark
                                            ? "bg-sky-700/15 border-sky-600/30 text-sky-400"
                                            : "bg-sky-50 border-sky-400 text-sky-800"
                                        : isDark
                                            ? "border-stone-800/20 text-slate-500 hover:text-slate-300"
                                            : "border-slate-200 text-slate-500 hover:bg-slate-100"
                                    }`}
                            >
                                <Icon size={13} />
                                {s.label}
                            </button>
                        );
                    })}
                </motion.div>

                {/* Form */}
                <form onSubmit={(e) => { e.preventDefault(); setShowConfirmModal(true); }}>
                    <AnimatePresence mode="wait">
                        {activeSection === "personal" && (
                            <motion.div
                                key="personal"
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -12 }}
                                transition={{ duration: 0.2 }}
                            >
                                <div className={`rounded-2xl border overflow-hidden backdrop-blur-sm transition-all duration-300 ${
                                    isDark ? "bg-[#0E0E0D]/80 border-stone-800/20 shadow-lg" : "bg-white border-slate-200 shadow-lg shadow-sky-700/5"
                                }`}>
                                    {isDark && <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-cyan-500/60 to-transparent" />}
                                    <div className="p-6 sm:p-8 space-y-6">
                                        <div>
                                            <h2 className={`text-lg font-semibold ${isDark ? "text-slate-100" : "text-slate-900"}`}>Informazioni personali</h2>
                                            <p className={`text-sm mt-1 ${isDark ? "text-slate-500" : "text-slate-500"}`}>Nome e cognome come appaiono nei documenti.</p>
                                        </div>
                                        <div className="grid sm:grid-cols-2 gap-5">
                                            <Input theme={theme} label="Nome" value={form.given_name} onChange={(v) => setForm((f) => ({ ...f, given_name: v }))} />
                                            <Input theme={theme} label="Cognome" value={form.family_name} onChange={(v) => setForm((f) => ({ ...f, family_name: v }))} />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {activeSection === "fiscal" && (
                            <motion.div
                                key="fiscal"
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -12 }}
                                transition={{ duration: 0.2 }}
                            >
                                <div className={`rounded-2xl border overflow-hidden backdrop-blur-sm transition-all duration-300 ${
                                    isDark ? "bg-[#0E0E0D]/80 border-stone-800/20 shadow-lg" : "bg-white border-slate-200 shadow-lg shadow-sky-700/5"
                                }`}>
                                    {isDark && <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-cyan-500/60 to-transparent" />}
                                    <div className="p-6 sm:p-8 space-y-6">
                                        <div>
                                            <h2 className={`text-lg font-semibold ${isDark ? "text-slate-100" : "text-slate-900"}`}>Dati fiscali</h2>
                                            <p className={`text-sm mt-1 ${isDark ? "text-slate-500" : "text-slate-500"}`}>Codice fiscale e partita IVA per la fatturazione.</p>
                                        </div>
                                        <div className="grid sm:grid-cols-2 gap-5">
                                            <Input theme={theme} label="Codice fiscale" value={form.fiscal_code} onChange={(v) => setForm((f) => ({ ...f, fiscal_code: v }))} />
                                            <Input theme={theme} label="Partita IVA" value={form.partita_iva} onChange={(v) => setForm((f) => ({ ...f, partita_iva: v }))} />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {activeSection === "email" && (
                            <motion.div
                                key="email"
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -12 }}
                                transition={{ duration: 0.2 }}
                            >
                                <div className={`rounded-2xl border overflow-hidden backdrop-blur-sm transition-all duration-300 ${
                                    isDark ? "bg-[#0E0E0D]/80 border-stone-800/20 shadow-lg" : "bg-white border-slate-200 shadow-lg shadow-sky-700/5"
                                }`}>
                                    {isDark && <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-cyan-500/60 to-transparent" />}
                                    <div className="p-6 sm:p-8 space-y-6">
                                        <div>
                                            <h2 className={`text-lg font-semibold ${isDark ? "text-slate-100" : "text-slate-900"}`}>Email</h2>
                                            <p className={`text-sm mt-1 ${isDark ? "text-slate-500" : "text-slate-500"}`}>L'indirizzo email per accedere al tuo account.</p>
                                        </div>
                                        <Input theme={theme} label="Email" value={form.email} onChange={(v) => setForm((f) => ({ ...f, email: v }))} />
                                        <p className={`text-xs ${isDark ? "text-slate-500" : "text-slate-400"}`}>Cambiare email richiederà una nuova verifica.</p>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {activeSection === "danger" && (
                            <motion.div
                                key="danger"
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -12 }}
                                transition={{ duration: 0.2 }}
                            >
                                <div className={`rounded-2xl border overflow-hidden backdrop-blur-sm transition-all duration-300 ${
                                    isDark ? "bg-[#0E0E0D]/80 border-red-900/30 shadow-lg" : "bg-white border-red-200 shadow-lg shadow-red-700/5"
                                }`}>
                                    {isDark && <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-red-500/60 to-transparent" />}
                                    <div className="p-6 sm:p-8 space-y-6">
                                        <div>
                                            <h2 className={`text-lg font-semibold ${isDark ? "text-slate-100" : "text-slate-900"}`}>Elimina profilo</h2>
                                            <p className={`text-sm mt-1 ${isDark ? "text-slate-500" : "text-slate-500"}`}>
                                                L'account verrà disattivato immediatamente. Potrai riattivarlo entro <span className="text-red-400 font-medium">60 giorni</span>.
                                            </p>
                                        </div>
                                        <button
                                            type="button"
                                            disabled={deleting}
                                            onClick={async () => {
                                                if (!window.confirm("Sei sicuro di voler eliminare il tuo profilo?")) return;
                                                await deleteUser(id, token);
                                            }}
                                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600/10 border border-red-500/20 text-red-400 hover:bg-red-600/20 text-sm font-medium transition-colors"
                                        >
                                            <Trash2 size={14} />
                                            {deleting ? "Eliminazione…" : "Elimina profilo"}
                                        </button>
                                        {deleteError && <p className="text-red-400 text-xs">{deleteError}</p>}
                                        {deleteSuccess && <p className="text-green-400 text-xs">Profilo eliminato. Disconnessione in corso…</p>}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Submit button */}
                    {activeSection !== "danger" && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mt-6">
                            {formError && <p className="text-red-400 text-sm mb-3">{formError}</p>}
                            {success && (
                                <p className="flex items-center gap-2 text-green-400 text-sm mb-3">
                                    <CheckCircle size={14} /> Profilo aggiornato correttamente.
                                </p>
                            )}
                            <button
                                type="submit"
                                disabled={loadingUpdate}
                                className="w-full py-3 rounded-xl bg-sky-700 hover:bg-sky-600 disabled:opacity-50 text-white text-sm font-semibold transition-all hover:-translate-y-0.5 duration-200 shadow-lg shadow-sky-700/20 flex items-center justify-center gap-2"
                            >
                                {loadingUpdate ? <FallingLines color="white" width="20" visible /> : <><Save size={15} /> Salva modifiche</>}
                            </button>
                        </motion.div>
                    )}
                </form>
            </div>

            {/* Confirm modal */}
            <AnimatePresence>
                {showConfirmModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.96, y: 8 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.96, y: 8 }}
                            transition={{ duration: 0.2 }}
                            className={`rounded-2xl border overflow-hidden w-full max-w-sm ${
                                isDark ? "bg-[#0E0E0D]/90 border-stone-800/20 shadow-lg" : "bg-white border-slate-200 shadow-lg"
                            }`}
                        >
                            {isDark && <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-cyan-500/60 to-transparent" />}
                            <div className="p-8 space-y-5">
                                <h2 className={`text-lg font-semibold ${isDark ? "text-slate-100" : "text-slate-900"}`}>Conferma aggiornamento</h2>
                                <p className={`text-sm ${isDark ? "text-slate-400" : "text-slate-500"}`}>Sei sicuro di voler salvare le modifiche?</p>
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => setShowConfirmModal(false)}
                                        className={`flex-1 py-2.5 rounded-xl border text-sm font-medium transition-all hover:-translate-y-0.5 duration-200 ${
                                            isDark ? "border-stone-800/30 text-slate-400 hover:text-slate-200" : "border-slate-200 text-slate-600 hover:bg-slate-100"
                                        }`}
                                    >
                                        Annulla
                                    </button>
                                    <button
                                        onClick={confirmUpdate}
                                        disabled={loadingUpdate}
                                        className="flex-1 py-2.5 rounded-xl bg-sky-700 hover:bg-sky-600 text-white text-sm font-semibold transition-all hover:-translate-y-0.5 duration-200 shadow-lg shadow-sky-700/20 flex items-center justify-center"
                                    >
                                        {loadingUpdate ? <FallingLines color="white" width="20" visible /> : "Conferma"}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}
