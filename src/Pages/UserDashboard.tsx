import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import {useAuth} from "../auth/AuthContext.tsx";

export function UserDashboard() {
    const { user, loading, error, refetch } = useUser();
    const {logout} = useAuth()
    const navigate = useNavigate();

    if (loading) {
        return (
            <main className="min-h-screen flex items-center justify-center bg-neutral-950 text-white">
                <p className="text-neutral-400">Caricamento dati utente...</p>
            </main>
        );
    }

    if (error) {
        return (
            <main className="min-h-screen flex items-center justify-center bg-neutral-950 text-white">
                <div className="text-center">
                    <p className="text-red-400 mb-4">{error}</p>
                    <button
                        onClick={refetch}
                        className="px-6 py-3 rounded-full bg-white text-neutral-900"
                    >
                        Riprova
                    </button>
                </div>
            </main>
        );
    }

    if (!user) return null;

    return (
        <main className="min-h-screen bg-neutral-950 text-white px-8 pt-20 pb-40">
            <div className="max-w-6xl mx-auto space-y-20">

                {/* HEADER */}
                <section>
                    <h1 className="text-4xl font-semibold mb-2">Area personale</h1>
                    <p className="text-neutral-400">
                        Panoramica completa del tuo account e delle attività collegate.
                    </p>
                </section>

                {/* INFORMAZIONI ACCOUNT */}
                <Section title="Informazioni account">
                    <div className="grid md:grid-cols-3 gap-8 text-sm">
                        <InfoRow label="Nome" value={user.given_name} />
                        <InfoRow label="Cognome" value={user.family_name} />
                        <InfoRow label="Email" value={user.email} />

                        <InfoRow label="Codice fiscale" value={user.fiscal_code} />
                        <InfoRow label="Partita IVA" value={user.partita_iva || "—"} />

                        <InfoRow
                            label="Email verificata"
                            value={user.emailVerified ? "Sì" : "No"}
                            highlight={!user.emailVerified}
                        />

                        <InfoRow label="Ruolo" value={user.role} />
                        <InfoRow label="VIP" value={user.vip ? "Sì" : "No"} />

                        <div className="md:col-span-3">
                            <span className="text-neutral-500">ID Utente</span>
                            <p className="text-xs text-neutral-400 break-all">{user._id}</p>
                        </div>
                    </div>
                </Section>

                {/* STATO ACCOUNT */}
                <Section title="Stato account">
                    <div className="grid md:grid-cols-3 gap-8 text-sm">
                        <InfoRow
                            label="Sospeso"
                            value={user.isSuspended ? "Sì" : "No"}
                            highlight={user.isSuspended}
                        />
                        <InfoRow
                            label="Inattivo"
                            value={user.inactive ? "Sì" : "No"}
                            highlight={user.inactive}
                        />
                        <InfoRow
                            label="Scadenza"
                            value={
                                user.expirationDate
                                    ? new Date(user.expirationDate).toLocaleDateString()
                                    : "Nessuna"
                            }
                        />
                    </div>
                </Section>

                {/* SICUREZZA */}
                <Section title="Sicurezza e accesso">
                    <div className="grid md:grid-cols-2 gap-8 text-sm">
                        <InfoRow label="Metodo di accesso" value={user.auth.type} />
                        {user.auth.provider && (
                            <InfoRow label="Provider OAuth" value={user.auth.provider} />
                        )}
                        <InfoRow
                            label="Ultimo accesso"
                            value={
                                user.last_login
                                    ? new Date(user.last_login).toLocaleString()
                                    : "Mai"
                            }
                        />
                        <InfoRow
                            label="Ultima modifica email"
                            value={
                                user.lastEmailChange
                                    ? new Date(user.lastEmailChange).toLocaleString()
                                    : "—"
                            }
                        />
                    </div>
                </Section>

                {/* ATTIVITÀ */}
                <Section title="Attività">
                    <div className="grid md:grid-cols-3 gap-8 text-sm">
                        <InfoRow
                            label="Score proprietario"
                            value={
                                user.ownerTotalScore !== undefined
                                    ? user.ownerTotalScore.toString()
                                    : "—"
                            }
                        />
                        <InfoRow
                            label="Score utente"
                            value={
                                user.userTotalScore !== undefined
                                    ? user.userTotalScore.toString()
                                    : "—"
                            }
                        />
                        <InfoRow
                            label="Preferiti"
                            value={user.favorites?.length?.toString() || "0"}
                        />
                    </div>
                </Section>

                {/* AZIONI */}
                <section>
                    <h2 className="text-2xl font-medium mb-8">Azioni disponibili</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <ActionCard
                            title="Modifica profilo"
                            description="Aggiorna le informazioni del tuo account."
                            onClick={() => navigate("/user/edit")}
                        />
                        <ActionCard
                            title="Visualizza analisi"
                            description="Consulta i risultati della tua maturità digitale."
                            onClick={() => navigate("/survey")}
                        />
                        <ActionCard
                            title="Logout"
                            description="Termina la sessione corrente."
                            onClick={logout}
                        />
                    </div>
                </section>
            </div>
        </main>
    );
}

/* ───────────── Helpers ───────────── */

function Section({
                     title,
                     children,
                 }: {
    title: string;
    children: React.ReactNode;
}) {
    return (
        <section className="bg-neutral-900/70 border border-neutral-800 rounded-3xl p-10">
            <h2 className="text-2xl font-medium mb-8">{title}</h2>
            {children}
        </section>
    );
}

function InfoRow({
                     label,
                     value,
                     highlight,
                 }: {
    label: string;
    value?: string;
    highlight?: boolean;
}) {
    return (
        <div>
            <span className="text-neutral-500">{label}</span>
            <p className={`text-lg ${highlight ? "text-yellow-400" : ""}`}>
                {value || "Non impostato"}
            </p>
        </div>
    );
}

function ActionCard({
                        title,
                        description,
                        onClick,
                    }: {
    title: string;
    description: string;
    onClick: () => void;
}) {
    return (
        <div
            onClick={onClick}
            className="cursor-pointer group border border-neutral-800 bg-neutral-900/70 hover:bg-neutral-900 rounded-3xl p-8 transition"
        >
            <h3 className="text-lg font-medium mb-4">{title}</h3>
            <p className="text-neutral-400 text-sm">{description}</p>
            <div className="mt-6 h-px bg-gradient-to-r from-transparent via-neutral-600 to-transparent opacity-0 group-hover:opacity-100 transition" />
        </div>
    );
}
