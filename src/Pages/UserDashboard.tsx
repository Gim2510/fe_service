// src/pages/UserDashboard.tsx
import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";

export function UserDashboard() {
    const { user, loading, error, refetch } = useUser();
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
            <div className="max-w-6xl mx-auto space-y-16">

                {/* HEADER */}
                <section>
                    <h1 className="text-4xl font-semibold mb-2">
                        Area personale
                    </h1>
                    <p className="text-neutral-400">
                        Gestisci informazioni e azioni legate al tuo account.
                    </p>
                </section>

                {/* INFO UTENTE */}
                <section className="bg-neutral-900/70 border border-neutral-800 rounded-3xl p-10">
                    <h2 className="text-2xl font-medium mb-8">
                        Informazioni account
                    </h2>

                    <div className="grid md:grid-cols-2 gap-8 text-sm">
                        <div>
                            <span className="text-neutral-500">Nome</span>
                            <p className="text-lg">{user.given_name || "Non impostato"}</p>
                        </div>

                        <div>
                            <span className="text-neutral-500">Email</span>
                            <p className="text-lg">{user.email}</p>
                        </div>

                        <div>
                            <span className="text-neutral-500">Ruolo</span>
                            <p className="text-lg">{user.role || "Utente"}</p>
                        </div>

                        <div>
                            <span className="text-neutral-500">ID Utente</span>
                            <p className="text-xs text-neutral-400 break-all">
                                {user._id}
                            </p>
                        </div>
                    </div>
                </section>

                {/* AZIONI */}
                <section>
                    <h2 className="text-2xl font-medium mb-8">
                        Azioni disponibili
                    </h2>

                    <div className="grid md:grid-cols-3 gap-8">
                        <ActionCard
                            title="Modifica profilo"
                            description="Aggiorna le informazioni del tuo account."
                            onClick={() => navigate("/user/edit")}
                        />

                        <ActionCard
                            title="Visualizza analisi"
                            description="Consulta i risultati della tua maturità digitale."
                            onClick={() => navigate("/survey/results")}
                        />

                        <ActionCard
                            title="Logout"
                            description="Termina la sessione corrente."
                            onClick={() => navigate("/logout")}
                        />
                    </div>
                </section>
            </div>
        </main>
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
            <h3 className="text-lg font-medium mb-4">
                {title}
            </h3>
            <p className="text-neutral-400 text-sm">
                {description}
            </p>

            <div className="mt-6 h-px bg-gradient-to-r from-transparent via-neutral-600 to-transparent opacity-0 group-hover:opacity-100 transition" />
        </div>
    );
}
