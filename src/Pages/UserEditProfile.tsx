import { useEffect, useState } from "react";
import { useUser } from "../hooks/useUser";
import { Input } from "../Components/Input.tsx";
import type { UserEditForm } from "../types/userEditForm.ts";
import { Section } from "../Components/SurveyQuestion/Section.tsx";
import { useDeleteUser } from "../hooks/useDeleteUser.ts";
import { useAuth } from "../auth/AuthContext.tsx";
import { useUpdateUserInfo } from "../hooks/useUpdateUserInfo.ts";

export function UserEditProfile() {
    const { user, loading, error, refetch } = useUser();
    const { id, token, logout } = useAuth();
    const { doUpdateUserInfo, loading: loadingUpdate } = useUpdateUserInfo();

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

    const {
        deleteUser,
        loading: deleting,
        error: deleteError,
        success: deleteSuccess,
    } = useDeleteUser();

    // Logout dopo eliminazione
    useEffect(() => {
        if (deleteSuccess) {
            setTimeout(() => {
                logout();
            }, 1500);
        }
    }, [deleteSuccess, logout]);

    // Popola form quando arriva user
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

    // 🔥 Calcola solo campi modificati (dinamico)
    function getChangedFields() {
        if (!user) return {};

        const changed: Partial<UserEditForm> = {};

        Object.keys(form).forEach((key) => {
            const k = key as keyof UserEditForm;

            if ((form[k] ?? "") !== (user[k] ?? "")) {
                changed[k] = form[k];
            }
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

    if (loading) return <div>Caricamento…</div>;
    if (error) return <div>{error}</div>;
    if (!user) return null;

    return (
        <main className="min-h-screen bg-neutral-950 text-white px-8 pt-20 pb-40">
            <div className="max-w-3xl mx-auto space-y-12">
                <header>
                    <h1 className="text-4xl font-semibold mb-2">
                        Modifica profilo
                    </h1>
                    <p className="text-neutral-400">
                        Aggiorna le informazioni personali del tuo account.
                    </p>
                </header>

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        setShowConfirmModal(true);
                    }}
                    className="space-y-10"
                >
                    <Section title="Informazioni personali">
                        <Input
                            label="Nome"
                            value={form.given_name}
                            onChange={(v) =>
                                setForm((f) => ({ ...f, given_name: v }))
                            }
                        />
                        <Input
                            label="Cognome"
                            value={form.family_name}
                            onChange={(v) =>
                                setForm((f) => ({ ...f, family_name: v }))
                            }
                        />
                    </Section>

                    <Section title="Dati fiscali">
                        <Input
                            label="Codice fiscale"
                            value={form.fiscal_code}
                            onChange={(v) =>
                                setForm((f) => ({ ...f, fiscal_code: v }))
                            }
                        />
                        <Input
                            label="Partita IVA"
                            value={form.partita_iva}
                            onChange={(v) =>
                                setForm((f) => ({ ...f, partita_iva: v }))
                            }
                        />
                    </Section>

                    <Section title="Email">
                        <Input
                            label="Email"
                            value={form.email}
                            onChange={(v) =>
                                setForm((f) => ({ ...f, email: v }))
                            }
                        />
                        <p className="text-sm text-neutral-500">
                            Cambiare email richiederà una nuova verifica.
                        </p>
                    </Section>

                    <Section title="Elimina profilo">
                        <div className="space-y-4">
                            <p className="text-sm text-neutral-400">
                                Eliminando il tuo profilo, l’account verrà disattivato immediatamente.
                            </p>

                            <p className="text-sm text-neutral-400">
                                Potrai riattivarlo effettuando nuovamente il login entro
                                <span className="text-white font-medium"> 60 giorni</span>.
                                Dopo questo periodo, i dati verranno eliminati definitivamente.
                            </p>

                            <button
                                type="button"
                                disabled={deleting}
                                onClick={async () => {
                                    const confirmed = window.confirm(
                                        "Sei sicuro di voler eliminare il tuo profilo?"
                                    );
                                    if (!confirmed) return;

                                    await deleteUser(id, token);
                                }}
                                className="px-6 py-3 cursor-pointer rounded-full border border-red-600 text-red-400 hover:bg-red-600 hover:text-white transition disabled:opacity-50"
                            >
                                {deleting ? "Eliminazione…" : "Elimina profilo"}
                            </button>

                            {deleteError && (
                                <p className="text-red-400 text-sm">{deleteError}</p>
                            )}

                            {deleteSuccess && (
                                <p className="text-green-400 text-sm">
                                    Profilo eliminato. Verrai disconnesso.
                                </p>
                            )}
                        </div>
                    </Section>

                    {formError && (
                        <p className="text-red-400">{formError}</p>
                    )}

                    {success && (
                        <p className="text-green-400">
                            Profilo aggiornato correttamente
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loadingUpdate}
                        className="px-8 py-3 rounded-full bg-white text-neutral-900 disabled:opacity-50"
                    >
                        Salva modifiche
                    </button>
                </form>
            </div>

            {/* 🔥 MODALE CONFERMA */}
            {showConfirmModal && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                    <div className="bg-neutral-900 p-8 rounded-2xl w-full max-w-md space-y-6">
                        <h2 className="text-xl font-semibold">
                            Conferma aggiornamento
                        </h2>

                        <p className="text-neutral-400 text-sm">
                            Sei sicuro di voler salvare le modifiche?
                        </p>

                        <div className="flex justify-end gap-4 pt-4">
                            <button
                                onClick={() => setShowConfirmModal(false)}
                                className="px-6 py-2 rounded-full border border-neutral-600"
                            >
                                Annulla
                            </button>

                            <button
                                onClick={confirmUpdate}
                                disabled={loadingUpdate}
                                className="px-6 py-2 rounded-full bg-white text-black"
                            >
                                {loadingUpdate ? "Salvataggio…" : "Conferma"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
