import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { User, ShieldCheck, Activity, Settings, LogOut, Upload, BarChart2, ArrowRight } from "lucide-react";
import { useUser } from "../hooks/useUser";
import { useAuth } from "../auth/AuthContext.tsx";
import { FallingLines } from "react-loader-spinner";
import { useTheme } from "../Context/ThemeContext";
import { useSetUserImage } from "../hooks/useSetUserImage";

const TABS = [
    { id: "account",  label: "Account",   icon: User },
    { id: "status",   label: "Stato",     icon: ShieldCheck },
    { id: "security", label: "Sicurezza", icon: ShieldCheck },
    { id: "activity", label: "Attività",  icon: Activity },
    { id: "actions",  label: "Azioni",    icon: Settings },
];

export function UserDashboard() {
    const { setUserImage, loading: uploading } = useSetUserImage();
    const { theme } = useTheme();
    const { user, loading, error, refetch } = useUser();
    const { id, logout, token } = useAuth();
    const navigate = useNavigate();
    const isDark = theme === "dark";

    const [selectedImage,  setSelectedImage]  = useState<string | null>(null);
    const [showImageModal, setShowImageModal] = useState(false);
    const [activeTab,      setActiveTab]      = useState("account");

    const border    = isDark ? "border-stone-800/30" : "border-slate-200";
    const mutedText = isDark ? "text-slate-500" : "text-slate-400";

    if (loading) {
        return (
            <main className={`${isDark ? "bg-[#111110]" : "bg-[#FAF8F4]"} min-h-screen flex items-center justify-center`}>
                <FallingLines color={isDark ? "#fff" : "#B45309"} width={60} visible ariaLabel="loading" />
            </main>
        );
    }

    if (error || !user) {
        return (
            <main className={`${isDark ? "bg-[#111110] text-white" : "bg-[#FAF8F4] text-slate-900"} min-h-screen flex items-center justify-center`}>
                <div className="text-center space-y-4">
                    <p className="text-sm text-red-400">{error || "Utente non trovato"}</p>
                    <button onClick={refetch} className="px-5 py-2.5 rounded-xl bg-amber-700 hover:bg-amber-600 text-white text-sm font-semibold transition-colors">
                        Riprova
                    </button>
                </div>
            </main>
        );
    }

    return (
        <main className={`${isDark ? "bg-[#111110] text-white" : "bg-[#FAF8F4] text-slate-900"} min-h-screen`}>

            {/* grid bg */}
            <div
                className="fixed inset-0 opacity-[0.08] pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='100'%3E%3Cpath d='M28 0 L56 16 L56 50 L28 66 L0 50 L0 16 Z' fill='none' stroke='${isDark ? '%23F59E0B' : '%23B45309'}' stroke-width='0.8'/%3E%3Cpath d='M28 66 L56 50 L56 84 L28 100 L0 84 L0 50 Z' fill='none' stroke='${isDark ? '%23F59E0B' : '%23B45309'}' stroke-width='0.8'/%3E%3C/svg%3E")`,
                    backgroundSize: "56px 100px",
                }}
            />

            <div className="relative max-w-4xl mx-auto px-6 pt-24 pb-20 space-y-6">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                    <span className={`text-[10px] font-mono uppercase tracking-[0.22em] ${isDark ? "text-amber-600" : "text-amber-700"}`}>
                        Pannello personale
                    </span>
                    <h1 className={`text-2xl font-semibold mt-1.5 ${isDark ? "text-slate-100" : "text-slate-900"}`}>
                        Area personale
                    </h1>
                    <p className={`mt-1 text-sm ${mutedText}`}>
                        Panoramica completa del tuo account e delle attività collegate.
                    </p>
                </motion.div>

                {/* Profile hero card */}
                <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.06 }}
                    className={`rounded-2xl border overflow-hidden ${border}`}
                    style={{ background: isDark ? "#161614" : "#FAFAF8" }}
                >
                    <div className="h-[2px] w-full bg-amber-700/60" />

                    <div className="flex flex-col sm:flex-row min-h-[140px]">
                        {/* left — avatar */}
                        <div
                            className="relative flex flex-col justify-center items-center p-8 sm:w-[220px] shrink-0 overflow-hidden gap-4"
                            style={{ background: isDark ? "#111110" : "#F0EDE8" }}
                        >
                            {/* grid pattern */}
                            <div
                                className="absolute inset-0 opacity-[0.035] pointer-events-none"
                                style={{
                                    backgroundImage: `linear-gradient(${isDark ? "#fff" : "#000"} 1px, transparent 1px),
                                                      linear-gradient(90deg, ${isDark ? "#fff" : "#000"} 1px, transparent 1px)`,
                                    backgroundSize: "32px 32px",
                                }}
                            />
                            <div className={`relative w-20 h-20 rounded-full overflow-hidden border-2 flex items-center justify-center
                                ${isDark ? "border-stone-700/40 bg-stone-900" : "border-slate-300 bg-slate-200"}`}>
                                {selectedImage ? (
                                    <img alt="profile" src={selectedImage} className="w-full h-full object-cover" />
                                ) : user.user_image ? (
                                    <img alt="profile" src={user.user_image} className="w-full h-full object-cover" />
                                ) : (
                                    <User size={28} className={isDark ? "text-slate-600" : "text-slate-400"} />
                                )}
                            </div>

                            <label className={`relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium cursor-pointer transition-colors
                                ${isDark
                                    ? "border-stone-800/40 text-slate-500 hover:text-slate-300 hover:border-stone-700/60"
                                    : "border-slate-300 text-slate-500 hover:bg-slate-200/60"
                                }`}>
                                <Upload size={12} />
                                Carica foto
                                <input type="file" accept="image/*" className="hidden" onChange={e => {
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
                        </div>

                        {/* vertical divider */}
                        <div className={`hidden sm:block w-px shrink-0 ${isDark ? "bg-stone-800/40" : "bg-slate-200"}`} />

                        {/* right — name + quick info */}
                        <div className="flex flex-col justify-center p-8 gap-3">
                            <div>
                                <h2 className={`text-lg font-semibold ${isDark ? "text-slate-100" : "text-slate-900"}`}>
                                    {user.given_name} {user.family_name}
                                </h2>
                                <p className={`text-xs mt-0.5 font-mono ${mutedText}`}>{user.email}</p>
                            </div>
                            <div className="flex flex-wrap gap-2 mt-1">
                                <span className={`px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-widest rounded-full border
                                    ${isDark ? "border-stone-800/40 text-slate-400" : "border-slate-200 text-slate-500"}`}>
                                    {user.role}
                                </span>
                                {user.vip && (
                                    <span className={`px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-widest rounded-full border
                                        ${isDark ? "bg-amber-500/15 text-amber-400 border-amber-500/30" : "bg-amber-50 text-amber-700 border-amber-200"}`}>
                                        VIP
                                    </span>
                                )}
                                {user.emailVerified && (
                                    <span className={`px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-widest rounded-full border
                                        ${isDark ? "bg-green-500/15 text-green-400 border-green-500/30" : "bg-green-50 text-green-700 border-green-200"}`}>
                                        Verificato
                                    </span>
                                )}
                                {user.isSuspended && (
                                    <span className={`px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-widest rounded-full border
                                        ${isDark ? "bg-red-500/15 text-red-400 border-red-500/30" : "bg-red-50 text-red-700 border-red-200"}`}>
                                        Sospeso
                                    </span>
                                )}
                            </div>
                            <p className={`text-[10px] font-mono mt-1 ${isDark ? "text-slate-700" : "text-slate-400"}`}>
                                ID: {user._id}
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Tabs */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.3 }}
                    className="flex gap-1 overflow-x-auto"
                >
                    {TABS.map(tab => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium
                                    whitespace-nowrap transition-colors border
                                    ${isActive
                                        ? isDark
                                            ? "bg-amber-700/15 border-amber-600/30 text-amber-400"
                                            : "bg-amber-50 border-amber-400 text-amber-800"
                                        : isDark
                                            ? "border-stone-800/20 text-slate-500 hover:text-slate-300 hover:border-stone-800/40"
                                            : "border-slate-200 text-slate-500 hover:text-slate-700 hover:bg-[#EDF2F7]"
                                    }`}
                            >
                                <Icon size={13} />
                                {tab.label}
                            </button>
                        );
                    })}
                </motion.div>

                {/* Tab content */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2, ease: "easeOut" as const }}
                    >
                        {activeTab === "account" && (
                            <InfoCard title="Informazioni account" isDark={isDark} border={border}>
                                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    <InfoRow isDark={isDark} label="Nome"             value={user.given_name} />
                                    <InfoRow isDark={isDark} label="Cognome"          value={user.family_name} />
                                    <InfoRow isDark={isDark} label="Email"            value={user.email} />
                                    <InfoRow isDark={isDark} label="Codice fiscale"   value={user.fiscal_code} />
                                    <InfoRow isDark={isDark} label="Partita IVA"      value={user.partita_iva || "—"} />
                                    <InfoRow isDark={isDark} label="Azienda"          value={user.company_name?.toLowerCase() || "—"} />
                                    <InfoRow isDark={isDark} label="Ruolo aziendale"  value={user.company_role?.toLowerCase() || "—"} />
                                    <InfoRow isDark={isDark} label="Email verificata" value={user.emailVerified ? "Sì" : "No"} highlight={!user.emailVerified} />
                                    <InfoRow isDark={isDark} label="Ruolo piattaforma" value={user.role} />
                                    <InfoRow isDark={isDark} label="VIP"              value={user.vip ? "Sì" : "No"} />
                                </div>
                            </InfoCard>
                        )}

                        {activeTab === "status" && (
                            <InfoCard title="Stato account" isDark={isDark} border={border}>
                                <div className="grid sm:grid-cols-3 gap-6">
                                    <InfoRow isDark={isDark} label="Sospeso"  value={user.isSuspended ? "Sì" : "No"} highlight={user.isSuspended} />
                                    <InfoRow isDark={isDark} label="Inattivo" value={user.inactive ? "Sì" : "No"} highlight={user.inactive} />
                                    <InfoRow isDark={isDark} label="Scadenza" value={user.expirationDate ? new Date(user.expirationDate).toLocaleDateString() : "Nessuna"} />
                                </div>
                            </InfoCard>
                        )}

                        {activeTab === "security" && (
                            <InfoCard title="Sicurezza e accesso" isDark={isDark} border={border}>
                                <div className="grid sm:grid-cols-2 gap-6">
                                    <InfoRow isDark={isDark} label="Metodo accesso"       value={user.auth.type} />
                                    {user.auth.provider && <InfoRow isDark={isDark} label="Provider OAuth" value={user.auth.provider} />}
                                    <InfoRow isDark={isDark} label="Ultimo accesso"       value={user.last_login ? new Date(user.last_login).toLocaleString() : "Mai"} />
                                    <InfoRow isDark={isDark} label="Ultima modifica email" value={user.lastEmailChange ? new Date(user.lastEmailChange).toLocaleString() : "—"} />
                                </div>
                            </InfoCard>
                        )}

                        {activeTab === "activity" && (
                            <InfoCard title="Attività" isDark={isDark} border={border}>
                                <div className="grid sm:grid-cols-3 gap-6">
                                    <InfoRow isDark={isDark} label="Score proprietario" value={user.ownerTotalScore?.toString() || "—"} />
                                    <InfoRow isDark={isDark} label="Score utente"       value={user.userTotalScore?.toString() || "—"} />
                                    <InfoRow isDark={isDark} label="Preferiti"          value={user.favorites?.length?.toString() || "0"} />
                                </div>
                            </InfoCard>
                        )}

                        {activeTab === "actions" && (
                            <div className="grid sm:grid-cols-3 gap-4">
                                <UserActionCard
                                    isDark={isDark} border={border}
                                    icon={Settings} title="Modifica profilo"
                                    description="Aggiorna le informazioni del tuo account."
                                    onClick={() => navigate("/user/edit")}
                                    index={0}
                                />
                                <UserActionCard
                                    isDark={isDark} border={border}
                                    icon={BarChart2} title="Maturità digitale"
                                    description="Consulta i risultati del tuo assessment."
                                    onClick={() => navigate("/survey")}
                                    index={1}
                                />
                                <UserActionCard
                                    isDark={isDark} border={border}
                                    icon={LogOut} title="Logout"
                                    description="Termina la sessione corrente."
                                    onClick={logout}
                                    danger index={2}
                                />
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Image modal */}
            {showImageModal && selectedImage && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <motion.div
                        initial={{ scale: 0.96, opacity: 0, y: 8 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.96, opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeOut" as const }}
                        className={`rounded-2xl border overflow-hidden w-full max-w-sm ${border}`}
                        style={{ background: isDark ? "#161614" : "#FAFAF8" }}
                    >
                        <div className="h-[2px] w-full bg-amber-700/60" />
                        <div className="p-8 space-y-6">
                            <h2 className={`text-sm font-semibold ${isDark ? "text-slate-100" : "text-slate-900"}`}>
                                Conferma immagine profilo
                            </h2>
                            <img alt="preview" src={selectedImage} className="w-28 h-28 rounded-full object-cover mx-auto border-2 border-amber-600/20" />
                            <p className={`text-xs text-center ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                                Vuoi impostare questa immagine come foto profilo?
                            </p>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => { setShowImageModal(false); setSelectedImage(null); }}
                                    className={`flex-1 py-2.5 rounded-xl border text-sm font-medium transition-colors
                                        ${isDark ? "border-stone-800/30 text-slate-400 hover:text-slate-200" : "border-slate-200 text-slate-600 hover:bg-[#EDF2F7]"}`}
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
                                    className="flex-1 py-2.5 rounded-xl bg-amber-700 hover:bg-amber-600 disabled:opacity-40 text-white text-sm font-semibold transition-colors flex items-center justify-center"
                                >
                                    {uploading
                                        ? <FallingLines color="white" width="15" visible ariaLabel="loading" />
                                        : "Conferma"
                                    }
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </main>
    );
}

function InfoCard({ title, children, isDark, border }: {
    title: string; children: React.ReactNode; isDark: boolean; border: string;
}) {
    return (
        <div
            className={`rounded-2xl border overflow-hidden ${border}`}
            style={{ background: isDark ? "#161614" : "#FAFAF8" }}
        >
            <div className="h-[2px] w-full bg-amber-700/40" />
            <div className="p-7">
                <p className={`text-[10px] font-mono uppercase tracking-[0.18em] mb-6
                    ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                    {title}
                </p>
                {children}
            </div>
        </div>
    );
}

function InfoRow({ label, value, highlight, isDark }: {
    label: string; value?: string; highlight?: boolean; isDark: boolean;
}) {
    return (
        <div>
            <span className={`text-[10px] font-mono uppercase tracking-[0.15em]
                ${isDark ? "text-slate-600" : "text-slate-400"}`}>
                {label}
            </span>
            <p className={`mt-1 text-sm font-medium
                ${highlight ? "text-amber-400" : isDark ? "text-slate-200" : "text-slate-800"}`}>
                {value || "Non impostato"}
            </p>
        </div>
    );
}

function UserActionCard({ title, description, onClick, isDark, border, icon: Icon, danger = false, index = 0 }: {
    title: string; description: string; onClick: () => void; isDark: boolean; border: string;
    icon: React.ComponentType<{ size?: number; className?: string }>; danger?: boolean; index?: number;
}) {
    return (
        <motion.button
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: index * 0.07 }}
            onClick={onClick}
            className={`text-left w-full rounded-2xl border overflow-hidden transition-all duration-200
                hover:-translate-y-0.5 group ${danger
                    ? isDark ? "border-red-900/30" : "border-red-200"
                    : border
                }`}
            style={{ background: isDark ? "#161614" : "#FAFAF8" }}
        >
            <div className={`h-[2px] w-full ${danger ? "bg-red-600/40" : "bg-amber-700/40"}`} />
            <div className="p-6">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-5
                    ${danger
                        ? isDark ? "bg-red-500/10 border border-red-900/30" : "bg-red-50 border border-red-200"
                        : isDark ? "bg-amber-700/10 border border-amber-700/20" : "bg-amber-50 border border-amber-200"
                    }`}>
                    <Icon size={15} className={danger ? "text-red-400" : isDark ? "text-amber-500" : "text-amber-700"} />
                </div>
                <h3 className={`text-sm font-semibold mb-1 ${isDark ? "text-slate-200" : "text-slate-800"}`}>{title}</h3>
                <p className={`text-xs ${isDark ? "text-slate-500" : "text-slate-500"}`}>{description}</p>
                <div className={`flex items-center gap-1 mt-4 text-[10px] font-mono uppercase tracking-widest
                    ${danger
                        ? "text-red-400"
                        : isDark ? "text-amber-600" : "text-amber-700"
                    } opacity-0 group-hover:opacity-100 transition-opacity duration-200`}>
                    Vai <ArrowRight size={10} />
                </div>
            </div>
        </motion.button>
    );
}
