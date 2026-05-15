import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import { useUser } from "../hooks/useUser";
import { Input } from "../Components/Input.tsx";
import type { UserEditForm } from "../types/userEditForm.ts";
import { Section } from "../Components/Survey/SurveyQuestion/Section.tsx";
import { useDeleteUser } from "../hooks/useDeleteUser.ts";
import { useAuth } from "../auth/AuthContext.tsx";
import { useUpdateUserInfo } from "../hooks/useUpdateUserInfo.ts";
import { FallingLines } from "react-loader-spinner";
import { useTheme } from "../Context/ThemeContext";

export function UserEditProfile() {
    const { theme } = useTheme();
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

    const card = isDark
        ? "bg-[#1C1C1A]/80 border-stone-800/20"
        : "bg-[#F8FAFB] border-slate-200";

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
        <main className={`${isDark ? "bg-[#111110] text-white" : "bg-[#FAF8F4] text-slate-900"} min-h-screen px-6 sm:px-8 pt-28 pb-24`}>
            <div className="max-w-2xl mx-auto space-y-10">
                <motion.header initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                    <span className={`text-xs font-semibold uppercase tracking-widest ${isDark ? "text-sky-500" : "text-sky-700"}`}>
                        Profilo
                    </span>
                    <h1 className={`text-3xl font-semibold mt-2 ${isDark ? "text-slate-100" : "text-slate-900"}`}>Modifica profilo</h1>
                    <p className={`mt-1 text-sm ${isDark ? "text-slate-500" : "text-slate-500"}`}>Aggiorna le informazioni personali del tuo account.</p>
                </motion.header>

                <form onSubmit={(e) => { e.preventDefault(); setShowConfirmModal(true); }} className="space-y-6">
                    <Section title="Informazioni personali" bgSection={`rounded-2xl border p-6 sm:p-8 ${card}`} textPrimary={isDark ? "text-slate-200" : "text-slate-800"} textSecondary={isDark ? "text-slate-500" : "text-slate-500"}>
                        <Input theme={theme} label="Nome" value={form.given_name} onChange={(v) => setForm((f) => ({ ...f, given_name: v }))} />
                        <Input theme={theme} label="Cognome" value={form.family_name} onChange={(v) => setForm((f) => ({ ...f, family_name: v }))} />
                    </Section>

                    <Section title="Dati fiscali" bgSection={`rounded-2xl border p-6 sm:p-8 ${card}`} textPrimary={isDark ? "text-slate-200" : "text-slate-800"} textSecondary={isDark ? "text-slate-500" : "text-slate-500"}>
                        <Input theme={theme} label="Codice fiscale" value={form.fiscal_code} onChange={(v) => setForm((f) => ({ ...f, fiscal_code: v }))} />
                        <Input theme={theme} label="Partita IVA" value={form.partita_iva} onChange={(v) => setForm((f) => ({ ...f, partita_iva: v }))} />
                    </Section>

                    <Section title="Email" bgSection={`rounded-2xl border p-6 sm:p-8 ${card}`} textPrimary={isDark ? "text-slate-200" : "text-slate-800"} textSecondary={isDark ? "text-slate-500" : "text-slate-500"}>
                        <Input theme={theme} label="Email" value={form.email} onChange={(v) => setForm((f) => ({ ...f, email: v }))} />
                        <p className={`text-xs ${isDark ? "text-slate-500" : "text-slate-400"}`}>Cambiare email richiederà una nuova verifica.</p>
                    </Section>

                    <Section title="Elimina profilo" bgSection={`rounded-2xl border p-6 sm:p-8 ${isDark ? "border-red-900/30 bg-red-900/5" : "border-red-200 bg-red-50"}`} textPrimary={isDark ? "text-slate-200" : "text-slate-800"} textSecondary={isDark ? "text-slate-500" : "text-slate-500"}>
                        <div className="space-y-3">
                            <p className={`text-sm ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                                L'account verrà disattivato immediatamente. Potrai riattivarlo entro{" "}
                                <span className="text-red-400 font-medium">60 giorni</span>. Dopo, i dati verranno eliminati definitivamente.
                            </p>
                            <button
                                type="button"
                                disabled={deleting}
                                onClick={async () => {
                                    if (!window.confirm("Sei sicuro di voler eliminare il tuo profilo?")) return;
                                    await deleteUser(id, token);
                                }}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600/10 border border-red-500/20 text-red-400 hover:bg-red-600/20 text-sm font-medium transition-colors"
                            >
                                <Trash2 size={14} />
                                {deleting ? "Eliminazione…" : "Elimina profilo"}
                            </button>
                            {deleteError && <p className="text-red-400 text-xs">{deleteError}</p>}
                            {deleteSuccess && <p className="text-green-400 text-xs">Profilo eliminato. Disconnessione in corso…</p>}
                        </div>
                    </Section>

                    {formError && <p className="text-red-400 text-sm">{formError}</p>}
                    {success && <p className="text-green-400 text-sm">Profilo aggiornato correttamente.</p>}

                    <button
                        type="submit"
                        disabled={loadingUpdate}
                        className="w-full py-2.5 rounded-xl bg-sky-700 hover:bg-sky-600 disabled:opacity-50 text-white text-sm font-semibold transition-colors shadow-lg shadow-sky-700/20"
                    >
                        Salva modifiche
                    </button>
                </form>
            </div>

            {/* Confirm modal */}
            {showConfirmModal && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className={`rounded-2xl border p-8 w-full max-w-sm space-y-5 ${
                        isDark ? "bg-[#1C1C1A] border-stone-800/20" : "bg-[#F8FAFB] border-slate-200"
                    }`}>
                        <h2 className={`text-lg font-semibold ${isDark ? "text-slate-100" : "text-slate-900"}`}>Conferma aggiornamento</h2>
                        <p className={`text-sm ${isDark ? "text-slate-400" : "text-slate-500"}`}>Sei sicuro di voler salvare le modifiche?</p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowConfirmModal(false)}
                                className={`flex-1 py-2.5 rounded-xl border text-sm font-medium transition-colors ${
                                    isDark ? "border-stone-800/30 text-slate-400 hover:text-slate-200" : "border-slate-200 text-slate-600 hover:bg-[#EDF2F7]"
                                }`}
                            >
                                Annulla
                            </button>
                            <button
                                onClick={confirmUpdate}
                                disabled={loadingUpdate}
                                className="flex-1 py-2.5 rounded-xl bg-sky-700 hover:bg-sky-600 text-white text-sm font-semibold transition-colors flex items-center justify-center"
                            >
                                {loadingUpdate
                                    ? <FallingLines color="white" width="20" visible ariaLabel="loading" />
                                    : "Conferma"
                                }
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
