import { useEffect, useState } from "react";
import { useUser } from "../hooks/useUser";
import { Input } from "../Components/Input.tsx";
import type { UserEditForm } from "../types/userEditForm.ts";
import { Section } from "../Components/SurveyQuestion/Section.tsx";
import { useDeleteUser } from "../hooks/useDeleteUser.ts";
import { useAuth } from "../auth/AuthContext.tsx";
import { useUpdateUserInfo } from "../hooks/useUpdateUserInfo.ts";
import { LiquidGlassButton } from "../Components/Buttons/LiquidGlassButton.tsx";
import { FallingLines } from "react-loader-spinner";
import { useTheme } from "../Context/ThemeContext";

export function UserEditProfile() {
    const { theme } = useTheme(); // "dark" / "light"
    const { user, loading, error, refetch } = useUser();
    const { id, token, logout } = useAuth();
    const { doUpdateUserInfo, loading: loadingUpdate } = useUpdateUserInfo();
    const { deleteUser, loading: deleting, error: deleteError, success: deleteSuccess } = useDeleteUser();

    const [form, setForm] = useState<UserEditForm>({
        given_name: "",
        family_name: "",
        email: "",
        partita_iva: "",
        fiscal_code: "",
    });

    const [success, setSuccess] = useState(false);
    const [formError, setFormError] = useState<string | null>(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    // Logout automatico dopo eliminazione
    useEffect(() => {
        if (deleteSuccess) {
            setTimeout(() => logout(), 1500);
        }
    }, [deleteSuccess, logout]);

    // Popola form al caricamento user
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

    if (loading)
        return (
            <div
                className={`min-h-screen flex justify-center items-center ${
                    theme === "dark" ? "bg-neutral-950 text-white" : "bg-neutral-50 text-neutral-900"
                }`}
            >
                <FallingLines color={theme === "dark" ? "#fff" : "#000"} width={100} visible={true} ariaLabel="loading" />
            </div>
        );

    if (error)
        return (
            <div
                className={`min-h-screen flex justify-center items-center ${
                    theme === "dark" ? "bg-neutral-950 text-white" : "bg-neutral-50 text-neutral-900"
                }`}
            >
                <div className="text-center">
                    <p className={`${theme === "dark" ? "text-red-400" : "text-red-600"} mb-4`}>{error}</p>
                    <button
                        onClick={refetch}
                        className={`${theme === "dark" ? "bg-white text-neutral-900" : "bg-neutral-900 text-white"} px-6 py-3 rounded-full`}
                    >
                        Riprova
                    </button>
                </div>
            </div>
        );

    if (!user) return null;

    const bgMain = theme === "dark" ? "bg-neutral-950 text-white" : "bg-neutral-50 text-neutral-900";
    const sectionBg = theme === "dark" ? "bg-neutral-900/70 border-neutral-800" : "bg-white/70 border-gray-200";
    const textPrimary = theme === "dark" ? "text-white" : "text-neutral-900";
    const textSecondary = theme === "dark" ? "text-neutral-400" : "text-neutral-600";

    return (
        <main className={`${bgMain} min-h-screen px-8 pt-30 pb-40`}>
            <div className="max-w-3xl mx-auto space-y-12">
                <header>
                    <h1 className={`text-4xl font-semibold mb-2 ${textPrimary}`}>Modifica profilo</h1>
                    <p className={textSecondary}>Aggiorna le informazioni personali del tuo account.</p>
                </header>

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        setShowConfirmModal(true);
                    }}
                    className="space-y-10"
                >
                    {/* Informazioni personali */}
                    <Section title="Informazioni personali" bgSection={sectionBg} textPrimary={textPrimary} textSecondary={textSecondary}>
                        <Input label="Nome" value={form.given_name} onChange={(v) => setForm((f) => ({ ...f, given_name: v }))} />
                        <Input label="Cognome" value={form.family_name} onChange={(v) => setForm((f) => ({ ...f, family_name: v }))} />
                    </Section>

                    {/* Dati fiscali */}
                    <Section title="Dati fiscali" bgSection={sectionBg} textPrimary={textPrimary} textSecondary={textSecondary}>
                        <Input label="Codice fiscale" value={form.fiscal_code} onChange={(v) => setForm((f) => ({ ...f, fiscal_code: v }))} />
                        <Input label="Partita IVA" value={form.partita_iva} onChange={(v) => setForm((f) => ({ ...f, partita_iva: v }))} />
                    </Section>

                    {/* Email */}
                    <Section title="Email" bgSection={sectionBg} textPrimary={textPrimary} textSecondary={textSecondary}>
                        <Input label="Email" value={form.email} onChange={(v) => setForm((f) => ({ ...f, email: v }))} />
                        <p className={`text-sm ${textSecondary}`}>Cambiare email richiederà una nuova verifica.</p>
                    </Section>

                    {/* Elimina profilo */}
                    <Section title="Elimina profilo" bgSection={sectionBg} textPrimary={textPrimary} textSecondary={textSecondary}>
                        <div className="space-y-4">
                            <p className={`text-sm ${textSecondary}`}>
                                Eliminando il tuo profilo, l’account verrà disattivato immediatamente.
                            </p>
                            <p className={`text-sm ${textSecondary}`}>
                                Potrai riattivarlo effettuando nuovamente il login entro{" "}
                                <span className="text-white font-medium">60 giorni</span>. Dopo questo periodo, i dati verranno eliminati definitivamente.
                            </p>
                            <button
                                type="button"
                                disabled={deleting}
                                onClick={async () => {
                                    if (!window.confirm("Sei sicuro di voler eliminare il tuo profilo?")) return;
                                    await deleteUser(id, token);
                                }}
                                className="px-6 py-3 cursor-pointer rounded-full border border-red-600 text-red-400 hover:bg-red-600 hover:text-white transition disabled:opacity-50"
                            >
                                {deleting ? "Eliminazione…" : "Elimina profilo"}
                            </button>
                            {deleteError && <p className="text-red-400 text-sm">{deleteError}</p>}
                            {deleteSuccess && <p className="text-green-400 text-sm">Profilo eliminato. Verrai disconnesso.</p>}
                        </div>
                    </Section>

                    {formError && <p className="text-red-400">{formError}</p>}
                    {success && <p className="text-green-400">Profilo aggiornato correttamente</p>}

                    <LiquidGlassButton type="submit" disabled={loadingUpdate}>
                        Salva modifiche
                    </LiquidGlassButton>
                </form>
            </div>

            {/* MODALE CONFERMA */}
            {showConfirmModal && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                    <div className={`${sectionBg} p-8 rounded-2xl w-full max-w-md space-y-6`}>
                        <h2 className={`text-xl font-semibold ${textPrimary}`}>Conferma aggiornamento</h2>
                        <p className={`text-sm ${textSecondary}`}>Sei sicuro di voler salvare le modifiche?</p>
                        <div className="flex justify-end gap-4 pt-4">
                            <button
                                onClick={() => setShowConfirmModal(false)}
                                className={`px-6 py-2 rounded-full border ${theme === "dark" ? "border-neutral-600 text-white" : "border-gray-300 text-neutral-900"}`}
                            >
                                Annulla
                            </button>
                            <button
                                onClick={confirmUpdate}
                                disabled={loadingUpdate}
                                className="px-6 py-2 rounded-full bg-white text-black flex items-center justify-center"
                            >
                                {loadingUpdate ? (
                                    <FallingLines color="#000" width={30} visible={true} ariaLabel="loading" />
                                ) : (
                                    "Conferma"
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}