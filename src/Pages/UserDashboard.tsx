import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { User, ShieldCheck, Activity, Settings, LogOut, Upload, BarChart2 } from "lucide-react";
import { useUser } from "../hooks/useUser";
import { useAuth } from "../auth/AuthContext.tsx";
import { FallingLines } from "react-loader-spinner";
import { useTheme } from "../Context/ThemeContext";
import { useSetUserImage } from "../hooks/useSetUserImage";

const tabs = [
    { id: "account", label: "Account", icon: User },
    { id: "status", label: "Stato", icon: ShieldCheck },
    { id: "security", label: "Sicurezza", icon: ShieldCheck },
    { id: "activity", label: "Attività", icon: Activity },
    { id: "actions", label: "Azioni", icon: Settings },
];

export function UserDashboard() {
    const { setUserImage, loading: uploading } = useSetUserImage();
    const { theme } = useTheme();
    const { user, loading, error, refetch } = useUser();
    const { id, logout, token } = useAuth();
    const navigate = useNavigate();
    const isDark = theme === "dark";

    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [showImageModal, setShowImageModal] = useState(false);
    const [activeTab, setActiveTab] = useState("account");

    const card = isDark
        ? "bg-[#1C1C1A]/80 border-stone-800/20"
        : "bg-[#F8FAFB] border-slate-200";

    if (loading) {
        return (
            <main className={`${isDark ? "bg-[#111110]" : "bg-[#E8EDF3]"} min-h-screen flex items-center justify-center`}>
                <FallingLines color={isDark ? "#fff" : "#000"} width={80} visible ariaLabel="loading" />
            </main>
        );
    }

    if (error || !user) {
        return (
            <main className={`${isDark ? "bg-[#111110] text-white" : "bg-[#E8EDF3] text-slate-900"} min-h-screen flex items-center justify-center`}>
                <div className="text-center">
                    <p className="text-red-400 mb-4">{error || "Utente non trovato"}</p>
                    <button onClick={refetch} className="px-5 py-2 rounded-xl bg-amber-700 hover:bg-amber-600 text-white text-sm">
                        Riprova
                    </button>
                </div>
            </main>
        );
    }

    return (
        <main className={`${isDark ? "bg-[#111110] text-white" : "bg-[#E8EDF3] text-slate-900"} min-h-screen px-6 sm:px-8 pt-28 pb-24`}>
            <div className="max-w-5xl mx-auto space-y-8">

                {/* Header */}
                <motion.section
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <span className={`text-xs font-semibold uppercase tracking-widest ${isDark ? "text-amber-500" : "text-amber-700"}`}>
                        Pannello personale
                    </span>
                    <h1 className={`text-3xl font-semibold mt-2 ${isDark ? "text-slate-100" : "text-slate-900"}`}>
                        Area personale
                    </h1>
                    <p className={`mt-1 text-sm ${isDark ? "text-slate-500" : "text-slate-500"}`}>
                        Panoramica completa del tuo account e delle attività collegate.
                    </p>
                </motion.section>

                {/* Avatar section */}
                <motion.section
                    className={`rounded-2xl border p-6 sm:p-8 ${card}`}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.06 }}
                >
                    <h2 className={`text-base font-semibold mb-6 ${isDark ? "text-slate-200" : "text-slate-800"}`}>
                        Immagine profilo
                    </h2>
                    <div className="flex items-center gap-6">
                        <div className={`w-20 h-20 rounded-full overflow-hidden border flex items-center justify-center ${isDark ? "border-stone-800/30 bg-[#111110]" : "border-slate-200 bg-[#EDF2F7]"}`}>
                            {selectedImage ? (
                                <img alt="profile" src={selectedImage} className="w-full h-full object-cover" />
                            ) : user.user_image ? (
                                <img alt="profile" src={user.user_image} className="w-full h-full object-cover" />
                            ) : (
                                <User size={28} className={isDark ? "text-slate-600" : "text-slate-400"} />
                            )}
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium cursor-pointer transition-colors ${
                                isDark
                                    ? "border-stone-800/30 text-slate-400 hover:text-slate-200 hover:border-stone-700/50 bg-[#F8FAFB]/3"
                                    : "border-slate-200 text-slate-600 hover:bg-[#EDF2F7]"
                            }`}>
                                <Upload size={14} />
                                Carica immagine
                                <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (!file) return;
                                    const reader = new FileReader();
                                    reader.onloadend = () => {
                                        setSelectedImage(reader.result as string);
                                        setShowImageModal(true);
                                    };
                                    reader.readAsDataURL(file);
                                }} />
                            </label>
                            <p className={`text-xs ${isDark ? "text-slate-600" : "text-slate-400"}`}>PNG, JPG – max 2MB</p>
                        </div>
                    </div>
                </motion.section>

                {/* Tabs */}
                <div className={`flex gap-1 overflow-x-auto border-b pb-0 ${isDark ? "border-stone-800/20" : "border-slate-200"}`}>
                    {tabs.map(tab => {
                        const Icon = tab.icon;
                        const active = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium rounded-t-lg transition-colors whitespace-nowrap border-b-2 -mb-px ${
                                    active
                                        ? isDark
                                            ? "text-amber-500 border-amber-600"
                                            : "text-amber-700 border-amber-600"
                                        : isDark
                                            ? "text-slate-500 border-transparent hover:text-slate-300"
                                            : "text-slate-500 border-transparent hover:text-slate-700"
                                }`}
                            >
                                <Icon size={14} />
                                {tab.label}
                            </button>
                        );
                    })}
                </div>

                {/* Tab content */}
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {activeTab === "account" && (
                        <InfoSection title="Informazioni account" card={card} isDark={isDark}>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                <InfoRow isDark={isDark} label="Nome" value={user.given_name} />
                                <InfoRow isDark={isDark} label="Cognome" value={user.family_name} />
                                <InfoRow isDark={isDark} label="Email" value={user.email} />
                                <InfoRow isDark={isDark} label="Codice fiscale" value={user.fiscal_code} />
                                <InfoRow isDark={isDark} label="Partita IVA" value={user.partita_iva || "—"} />
                                <InfoRow isDark={isDark} label="Azienda" value={user.company_name?.toLowerCase() || "—"} />
                                <InfoRow isDark={isDark} label="Ruolo" value={user.company_role?.toLowerCase() || "—"} />
                                <InfoRow isDark={isDark} label="Email verificata" value={user.emailVerified ? "Sì" : "No"} highlight={!user.emailVerified} />
                                <InfoRow isDark={isDark} label="Ruolo piattaforma" value={user.role} />
                                <InfoRow isDark={isDark} label="VIP" value={user.vip ? "Sì" : "No"} />
                                <div className="sm:col-span-2 lg:col-span-3">
                                    <span className={`text-xs font-medium uppercase tracking-wide ${isDark ? "text-slate-500" : "text-slate-400"}`}>ID Utente</span>
                                    <p className={`text-xs font-mono mt-1 break-all ${isDark ? "text-slate-600" : "text-slate-400"}`}>{user._id}</p>
                                </div>
                            </div>
                        </InfoSection>
                    )}

                    {activeTab === "status" && (
                        <InfoSection title="Stato account" card={card} isDark={isDark}>
                            <div className="grid sm:grid-cols-3 gap-6">
                                <InfoRow isDark={isDark} label="Sospeso" value={user.isSuspended ? "Sì" : "No"} highlight={user.isSuspended} />
                                <InfoRow isDark={isDark} label="Inattivo" value={user.inactive ? "Sì" : "No"} highlight={user.inactive} />
                                <InfoRow isDark={isDark} label="Scadenza" value={user.expirationDate ? new Date(user.expirationDate).toLocaleDateString() : "Nessuna"} />
                            </div>
                        </InfoSection>
                    )}

                    {activeTab === "security" && (
                        <InfoSection title="Sicurezza e accesso" card={card} isDark={isDark}>
                            <div className="grid sm:grid-cols-2 gap-6">
                                <InfoRow isDark={isDark} label="Metodo accesso" value={user.auth.type} />
                                {user.auth.provider && <InfoRow isDark={isDark} label="Provider OAuth" value={user.auth.provider} />}
                                <InfoRow isDark={isDark} label="Ultimo accesso" value={user.last_login ? new Date(user.last_login).toLocaleString() : "Mai"} />
                                <InfoRow isDark={isDark} label="Ultima modifica email" value={user.lastEmailChange ? new Date(user.lastEmailChange).toLocaleString() : "—"} />
                            </div>
                        </InfoSection>
                    )}

                    {activeTab === "activity" && (
                        <InfoSection title="Attività" card={card} isDark={isDark}>
                            <div className="grid sm:grid-cols-3 gap-6">
                                <InfoRow isDark={isDark} label="Score proprietario" value={user.ownerTotalScore?.toString() || "—"} />
                                <InfoRow isDark={isDark} label="Score utente" value={user.userTotalScore?.toString() || "—"} />
                                <InfoRow isDark={isDark} label="Preferiti" value={user.favorites?.length?.toString() || "0"} />
                            </div>
                        </InfoSection>
                    )}

                    {activeTab === "actions" && (
                        <div className="grid sm:grid-cols-3 gap-5">
                            <ActionCard isDark={isDark} icon={Settings} title="Modifica profilo" description="Aggiorna le informazioni del tuo account." onClick={() => navigate("/user/edit")} />
                            <ActionCard isDark={isDark} icon={BarChart2} title="Visualizza analisi" description="Consulta i risultati della tua maturità digitale." onClick={() => navigate("/survey")} />
                            <ActionCard isDark={isDark} icon={LogOut} title="Logout" description="Termina la sessione corrente." onClick={logout} danger />
                        </div>
                    )}
                </motion.div>
            </div>

            {/* Image modal */}
            {showImageModal && selectedImage && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className={`rounded-2xl border p-8 w-full max-w-sm space-y-6 ${
                        isDark ? "bg-[#1C1C1A] border-stone-800/20" : "bg-[#F8FAFB] border-slate-200"
                    }`}>
                        <h2 className={`text-lg font-semibold ${isDark ? "text-slate-100" : "text-slate-900"}`}>
                            Conferma immagine profilo
                        </h2>
                        <img alt="preview" src={selectedImage} className="w-32 h-32 rounded-full object-cover mx-auto border-4 border-amber-600/20" />
                        <p className={`text-sm text-center ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                            Vuoi impostare questa immagine come foto profilo?
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => { setShowImageModal(false); setSelectedImage(null); }}
                                className={`flex-1 py-2.5 rounded-xl border text-sm font-medium transition-colors ${
                                    isDark ? "border-stone-800/30 text-slate-400 hover:text-slate-200" : "border-slate-200 text-slate-600 hover:bg-[#EDF2F7]"
                                }`}
                            >
                                Annulla
                            </button>
                            <button
                                onClick={async () => {
                                    await setUserImage(id, selectedImage, token);
                                    setShowImageModal(false);
                                    setSelectedImage(null);
                                    refetch();
                                }}
                                disabled={uploading}
                                className="flex-1 py-2.5 rounded-xl bg-amber-700 hover:bg-amber-600 text-white text-sm font-semibold transition-colors flex items-center justify-center"
                            >
                                {uploading
                                    ? <FallingLines color="white" width="15" visible ariaLabel="loading" />
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

function InfoSection({ title, children, card, isDark }: { title: string; children: React.ReactNode; card: string; isDark: boolean }) {
    return (
        <div className={`rounded-2xl border p-6 sm:p-8 ${card}`}>
            <h2 className={`text-base font-semibold mb-6 ${isDark ? "text-slate-200" : "text-slate-800"}`}>{title}</h2>
            {children}
        </div>
    );
}

function InfoRow({ label, value, highlight, isDark }: { label: string; value?: string; highlight?: boolean; isDark: boolean }) {
    return (
        <div>
            <span className={`text-xs font-medium uppercase tracking-wide ${isDark ? "text-slate-500" : "text-slate-400"}`}>{label}</span>
            <p className={`mt-1 text-sm font-medium ${highlight ? "text-amber-400" : isDark ? "text-slate-200" : "text-slate-800"}`}>
                {value || "Non impostato"}
            </p>
        </div>
    );
}

function ActionCard({ title, description, onClick, isDark, icon: Icon, danger = false }: {
    title: string; description: string; onClick: () => void; isDark: boolean; icon: React.ElementType; danger?: boolean;
}) {
    return (
        <button
            onClick={onClick}
            className={`text-left group rounded-2xl border p-6 transition-all duration-200 cursor-pointer ${
                danger
                    ? isDark
                        ? "border-red-900/30 bg-red-900/5 hover:border-red-700/40 hover:bg-red-900/10"
                        : "border-red-200 bg-red-50 hover:border-red-300"
                    : isDark
                        ? "border-stone-800/20 bg-[#1C1C1A]/80 hover:border-stone-700/40"
                        : "border-slate-200 bg-[#F8FAFB] hover:border-amber-400"
            }`}
        >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-4 ${
                danger
                    ? "bg-red-500/10"
                    : isDark ? "bg-amber-700/10" : "bg-amber-50"
            }`}>
                <Icon size={16} className={danger ? "text-red-400" : isDark ? "text-amber-500" : "text-amber-700"} />
            </div>
            <h3 className={`text-sm font-semibold mb-1 ${isDark ? "text-slate-200" : "text-slate-800"}`}>{title}</h3>
            <p className={`text-xs ${isDark ? "text-slate-500" : "text-slate-500"}`}>{description}</p>
        </button>
    );
}
