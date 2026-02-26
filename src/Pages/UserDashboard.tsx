import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import { useAuth } from "../auth/AuthContext.tsx";
import { FallingLines } from "react-loader-spinner";

export function UserDashboard() {
    const { user, loading, error, refetch } = useUser();
    const { logout } = useAuth();
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState("account"); // tab attivo

    if (loading) {
        return (
            <main className="min-h-screen flex items-center justify-center bg-neutral-950 text-white">
                <FallingLines
                    color="#fff"
                    width={100}
                    visible={true}
                    ariaLabel="falling-circles-loading"
                />
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

    // ─── Tab configuration ───
    const tabs = [
        { id: "account", label: "Informazioni account" },
        { id: "status", label: "Stato account" },
        { id: "security", label: "Sicurezza" },
        { id: "activity", label: "Attività" },
        { id: "actions", label: "Azioni" },
    ];

    return (
        <main className="min-h-screen bg-neutral-950 text-white px-8 pt-30 pb-40">
            <div className="max-w-6xl mx-auto space-y-8">

                {/* HEADER */}
                <section>
                    <h1 className="text-4xl font-semibold mb-2">Area personale</h1>
                    <p className="text-neutral-400">
                        Panoramica completa del tuo account e delle attività collegate.
                    </p>
                </section>

                {/* TAB NAVIGATION */}
                <div className="flex space-x-4 overflow-x-auto border-b border-neutral-800 mb-6">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-4 py-2 font-medium rounded-t-xl transition cursor-pointer
                ${activeTab === tab.id
                                ? "bg-neutral-900 text-white border-t border-l border-r border-neutral-800"
                                : "text-neutral-400 hover:text-white"
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* TAB CONTENT */}
                <div className="space-y-8">
                    {activeTab === "account" && (
                        <Section title="Informazioni account">
                            <div className="grid md:grid-cols-3 gap-8 text-sm">
                                <InfoRow label="Nome" value={user.given_name}/>
                                <InfoRow label="Cognome" value={user.family_name}/>
                                <InfoRow label="Email" value={user.email}/>
                                <InfoRow label="Codice fiscale" value={user.fiscal_code} />
                                <InfoRow label="Partita IVA" value={user.partita_iva || "—"} />
                                <InfoRow label="Company Name" value={user.company_name?.toLowerCase() || "-"} />
                                <InfoRow label="Company Role" value={user.company_role?.toLowerCase() || "—"} />
                                <InfoRow label="Email verificata" value={user.emailVerified ? "Sì" : "No"} highlight={!user.emailVerified} />
                                <InfoRow label="Ruolo" value={user.role} />
                                <InfoRow label="VIP" value={user.vip ? "Sì" : "No"} />
                                <div className="md:col-span-3">
                                    <span className="text-neutral-500">ID Utente</span>
                                    <p className="text-xs text-neutral-400 break-all">{user._id}</p>
                                </div>
                            </div>
                        </Section>
                    )}

                    {activeTab === "status" && (
                        <Section title="Stato account">
                            <div className="grid md:grid-cols-3 gap-8 text-sm">
                                <InfoRow label="Sospeso" value={user.isSuspended ? "Sì" : "No"} highlight={user.isSuspended} />
                                <InfoRow label="Inattivo" value={user.inactive ? "Sì" : "No"} highlight={user.inactive} />
                                <InfoRow
                                    label="Scadenza"
                                    value={user.expirationDate ? new Date(user.expirationDate).toLocaleDateString() : "Nessuna"}
                                />
                            </div>
                        </Section>
                    )}

                    {activeTab === "security" && (
                        <Section title="Sicurezza e accesso">
                            <div className="grid md:grid-cols-2 gap-8 text-sm">
                                <InfoRow label="Metodo di accesso" value={user.auth.type} />
                                {user.auth.provider && <InfoRow label="Provider OAuth" value={user.auth.provider} />}
                                <InfoRow
                                    label="Ultimo accesso"
                                    value={user.last_login ? new Date(user.last_login).toLocaleString() : "Mai"}
                                />
                                <InfoRow
                                    label="Ultima modifica email"
                                    value={user.lastEmailChange ? new Date(user.lastEmailChange).toLocaleString() : "—"}
                                />
                            </div>
                        </Section>
                    )}

                    {activeTab === "activity" && (
                        <Section title="Attività">
                            <div className="grid md:grid-cols-3 gap-8 text-sm">
                                <InfoRow label="Score proprietario" value={user.ownerTotalScore?.toString() || "—"} />
                                <InfoRow label="Score utente" value={user.userTotalScore?.toString() || "—"} />
                                <InfoRow label="Preferiti" value={user.favorites?.length?.toString() || "0"} />
                            </div>
                        </Section>
                    )}

                    {activeTab === "actions" && (
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
                    )}
                </div>
            </div>
        </main>
    );
}

/* ───────────── Helpers ───────────── */

function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="bg-neutral-900/70 border border-neutral-800 rounded-3xl p-10">
            <h2 className="text-2xl font-medium mb-8">{title}</h2>
            {children}
        </div>
    );
}

function InfoRow({ label, value, highlight }: { label: string; value?: string; highlight?: boolean }) {
    return (
        <div>
            <span className="text-neutral-500">{label}</span>
            <p className={`text-lg ${highlight ? "text-yellow-400" : ""}`}>{value || "Non impostato"}</p>
        </div>
    );
}

function ActionCard({ title, description, onClick }: { title: string; description: string; onClick: () => void }) {
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