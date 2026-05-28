import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { User, ShieldCheck, Activity, Settings, LogOut, Upload, BarChart2, ArrowRight, ClipboardList, ShieldAlert, TrendingUp, Check, Target } from "lucide-react";
import { useUser } from "../hooks/useUser";
import { useAuth } from "../auth/AuthContext.tsx";
import { FallingLines } from "react-loader-spinner";
import { useTheme } from "../Context/ThemeContext";
import { useSetUserImage } from "../hooks/useSetUserImage";
import { useSurveyDashboard } from "../hooks/useSurveyDashboard";
import { useUserSurvey } from "../hooks/useUserSurvey";
import { Badge } from "../Components/Badge.tsx";
import { getSurveyConfig, ALL_SURVEY_TYPES } from "../types/survey.ts";

const TABS = [
    { id: "account",  label: "Account",    icon: User },
    { id: "survey",   label: "Survey",     icon: ClipboardList },
    { id: "security", label: "Sicurezza",   icon: ShieldCheck },
    { id: "actions",  label: "Azioni",      icon: Settings },
];

function SectionCard({ title, children, isDark }: { title: string; children: React.ReactNode; isDark: boolean }) {
    const border = isDark ? "border-stone-800/20" : "border-slate-200";
    return (
        <div className={`rounded-2xl border overflow-hidden backdrop-blur-sm ${isDark ? `bg-[#0E0E0D]/80 ${border} shadow-lg` : `${border} bg-[#FAFAF8] shadow-lg shadow-sky-700/3`}`}>
            <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />
            <div className="p-7">
                <p className={`text-[10px] font-mono uppercase tracking-[0.18em] mb-6 ${isDark ? "text-slate-500" : "text-slate-400"}`}>{title}</p>
                {children}
            </div>
        </div>
    );
}

function InfoRow({ label, value, highlight, isDark }: { label: string; value?: string; highlight?: boolean; isDark: boolean }) {
    return (
        <div>
            <span className={`text-[10px] font-mono uppercase tracking-[0.15em] ${isDark ? "text-slate-600" : "text-slate-400"}`}>{label}</span>
            <p className={`mt-1 text-sm font-medium ${highlight ? "text-sky-400" : isDark ? "text-slate-200" : "text-slate-800"}`}>{value || "Non impostato"}</p>
        </div>
    );
}

function ActionCard({ title, description, onClick, isDark, icon: Icon, danger = false, index = 0 }: {
    title: string; description: string; onClick: () => void; isDark: boolean;
    icon: React.ComponentType<{ size?: number; className?: string }>; danger?: boolean; index?: number;
}) {
    const border = isDark ? "border-stone-800/20" : "border-slate-200";
    return (
        <motion.button initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: index * 0.07 }}
            onClick={onClick}
            className={`text-left w-full rounded-2xl border overflow-hidden backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 group ${danger
                ? `${isDark ? "border-red-900/30 bg-[#0E0E0D]/80 shadow-lg" : "border-red-200 bg-[#FAFAF8] shadow-lg shadow-red-700/3"}`
                : `${isDark ? `bg-[#0E0E0D]/80 ${border} shadow-lg` : `${border} bg-[#FAFAF8] shadow-lg shadow-sky-700/3`}`}`}>
            <div className={`h-[2px] w-full ${danger ? "bg-gradient-to-r from-transparent via-red-500/60 to-transparent" : "bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent"}`} />
            <div className="p-6">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-5 ${danger ? (isDark ? "bg-red-500/10 border border-red-900/30" : "bg-red-50 border border-red-200")
                    : (isDark ? "bg-sky-700/10 border border-sky-700/20" : "bg-sky-50 border border-sky-200")}`}>
                    <Icon size={15} className={danger ? "text-red-400" : isDark ? "text-sky-500" : "text-sky-700"} />
                </div>
                <h3 className={`text-sm font-semibold mb-1 ${isDark ? "text-slate-200" : "text-slate-800"}`}>{title}</h3>
                <p className={`text-xs ${isDark ? "text-slate-500" : "text-slate-500"}`}>{description}</p>
                <div className={`flex items-center gap-1 mt-4 text-[10px] font-mono uppercase tracking-widest ${danger ? "text-red-400" : isDark ? "text-sky-600" : "text-sky-700"} opacity-0 group-hover:opacity-100 transition-opacity duration-200`}>Vai <ArrowRight size={10} /></div>
            </div>
        </motion.button>
    );
}

export function UserDashboard() {
    const { setUserImage, loading: uploading } = useSetUserImage();
    const { theme } = useTheme();
    const { user, loading, error, refetch } = useUser();
    const { id, logout, token } = useAuth();
    const navigate = useNavigate();
    const isDark = theme === "dark";
    const { data: dashboardStats } = useSurveyDashboard();
    const { allSurveys } = useUserSurvey();
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [showImageModal, setShowImageModal] = useState(false);
    const [activeTab, setActiveTab] = useState("account");

    const mutedText = isDark ? "text-slate-500" : "text-slate-400";
    const cardBorder = isDark ? "border-stone-800/20" : "border-slate-200";

    if (loading) return <main className={`${isDark ? "bg-[#111110]" : "bg-[#FAF8F4]"} min-h-screen flex items-center justify-center`}><FallingLines color={isDark ? "#fff" : "#B45309"} width={60} visible /></main>;
    if (error || !user) return <main className={`${isDark ? "bg-[#111110] text-white" : "bg-[#FAF8F4] text-slate-900"} min-h-screen flex items-center justify-center`}><div className="text-center space-y-4"><p className="text-sm text-red-400">{error || "Utente non trovato"}</p><button onClick={refetch} className="px-5 py-2.5 rounded-xl bg-sky-700 hover:bg-sky-600 text-white text-sm font-semibold transition-colors">Riprova</button></div></main>;

    const publishedSurveys = allSurveys.filter(s => s.status === "published");
    const completedCount = publishedSurveys.length;

    const SURVEY_ICONS: Record<string, React.ReactNode> = { diagnostic: <ClipboardList size={18} />, compliance: <ShieldAlert size={18} />, processes: <Settings size={18} />, growth: <TrendingUp size={18} /> };

    return (
        <main className={`${isDark ? "bg-[#0E0E0D] text-white" : "bg-[#FAF8F4] text-slate-900"} min-h-screen`}>
            <div className="fixed inset-0 opacity-[0.06] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Crect x='0' y='0' width='40' height='40' fill='none' stroke='${isDark ? '%230EA5E9' : '%230369A1'}' stroke-width='0.5'/%3E%3C/svg%3E")`, backgroundSize: "40px 40px" }} />
            <div className="relative max-w-4xl mx-auto px-6 pt-24 pb-20 space-y-6">
                <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}>
                    <Badge label="Pannello personale" color="sky" theme={theme} />
                    <h1 className={`text-2xl font-semibold mt-3 ${isDark ? "text-slate-100" : "text-slate-900"}`}>Area personale</h1>
                    <p className={`mt-1 text-sm ${mutedText}`}>Panoramica completa del tuo account e dei tuoi assessment.</p>
                </motion.div>

                {/* Profile card */}
                <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.06 }}
                    className={`rounded-2xl border overflow-hidden backdrop-blur-sm ${isDark ? `bg-[#0E0E0D]/80 ${cardBorder} shadow-lg` : `${cardBorder} bg-[#FAFAF8] shadow-lg shadow-sky-700/5`}`}>
                    <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-cyan-500/60 to-transparent" />
                    <div className="flex flex-col sm:flex-row min-h-[140px]">
                        <div className="relative flex flex-col justify-center items-center p-8 sm:w-[220px] shrink-0 overflow-hidden gap-4" style={{ background: isDark ? "#111110" : "#F0EDE8" }}>
                            <div className="absolute inset-0 opacity-[0.035] pointer-events-none" style={{ backgroundImage: `linear-gradient(${isDark ? "#fff" : "#000"} 1px, transparent 1px), linear-gradient(90deg, ${isDark ? "#fff" : "#000"} 1px, transparent 1px)`, backgroundSize: "32px 32px" }} />
                            <div className={`relative w-20 h-20 rounded-full overflow-hidden border-2 flex items-center justify-center ${isDark ? "border-stone-700/40 bg-stone-900" : "border-slate-300 bg-slate-200"}`}>
                                {selectedImage ? <img alt="profile" src={selectedImage} className="w-full h-full object-cover" /> : user.user_image ? <img alt="profile" src={user.user_image} className="w-full h-full object-cover" /> : <User size={28} className={isDark ? "text-slate-600" : "text-slate-400"} />}
                            </div>
                            <label className={`relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium cursor-pointer transition-colors ${isDark ? "border-stone-800/40 text-slate-500 hover:text-slate-300" : "border-slate-300 text-slate-500 hover:bg-slate-200/60"}`}>
                                <Upload size={12} /> Carica foto
                                <input type="file" accept="image/*" className="hidden" onChange={e => { const file = e.target.files?.[0]; if (!file) return; const r = new FileReader(); r.onloadend = () => { setSelectedImage(r.result as string); setShowImageModal(true); }; r.readAsDataURL(file); }} />
                            </label>
                        </div>
                        <div className={`hidden sm:block w-px shrink-0 ${isDark ? "bg-stone-800/40" : "bg-slate-200"}`} />
                        <div className="flex flex-col justify-center p-8 gap-3">
                            <div><h2 className={`text-lg font-semibold ${isDark ? "text-slate-100" : "text-slate-900"}`}>{user.given_name} {user.family_name}</h2><p className={`text-xs mt-0.5 font-mono ${mutedText}`}>{user.email}</p></div>
                            <div className="flex flex-wrap gap-2 mt-1">
                                <span className={`px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-widest rounded-full border ${isDark ? "border-stone-800/40 text-slate-400" : "border-slate-200 text-slate-500"}`}>{user.role}</span>
                                {user.vip && <span className="px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-widest rounded-full border bg-sky-500/15 text-sky-400 border-sky-500/30">VIP</span>}
                                {user.emailVerified && <span className="px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-widest rounded-full border bg-green-500/15 text-green-400 border-green-500/30">Verificato</span>}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* KPI Strip */}
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }} className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                        { icon: <ClipboardList size={15} />, label: "Survey completati", value: `${completedCount}/${allSurveys.length}` },
                        { icon: <Target size={15} />, label: "Score medio globale", value: dashboardStats?.averageScore != null ? `${Math.round(dashboardStats.averageScore)}%` : "—" },
                        { icon: <Check size={15} />, label: "Risposte totali", value: `${dashboardStats?.totalResponses ?? "—"}` },
                        { icon: <Activity size={15} />, label: "Ultimi 7 giorni", value: `${dashboardStats?.responsesLast7Days ?? "—"}` },
                    ].map(kpi => (
                        <div key={kpi.label} className={`flex items-center gap-3 px-4 py-3 rounded-xl border backdrop-blur-sm ${isDark ? "bg-[#0E0E0D]/60 border-cyan-500/20" : "bg-white border-slate-200"}`}>
                            <div className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${isDark ? "bg-cyan-500/10" : "bg-cyan-50"}`}>
                                <span className="text-cyan-400">{kpi.icon}</span>
                            </div>
                            <div className="min-w-0">
                                <p className={`text-lg font-semibold tabular-nums leading-tight ${isDark ? "text-slate-100" : "text-slate-800"}`}>{kpi.value}</p>
                                <p className={`text-[10px] font-mono uppercase tracking-wider truncate ${mutedText}`}>{kpi.label}</p>
                            </div>
                        </div>
                    ))}
                </motion.div>

                {/* Tabs */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.12 }} className="flex gap-1 overflow-x-auto scrollbar-none">
                    {TABS.map(tab => {
                        const Icon = tab.icon; const isActive = activeTab === tab.id;
                        return (
                            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                                className={`relative inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all border overflow-hidden
                                    ${isActive ? (isDark ? "bg-sky-700/15 border-sky-600/30 text-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.15)]" : "bg-sky-50 border-sky-400 text-sky-800")
                                        : (isDark ? "border-stone-800/20 text-slate-500 hover:text-sky-400" : "border-slate-200 text-slate-500 hover:text-sky-700 hover:bg-[#EDF2F7]")}`}>
                                <Icon size={13} />{tab.label}
                                {isActive && isDark && <span className="absolute inset-x-0 bottom-0 h-[2px] bg-sky-500 shadow-[0_0_8px_rgba(56,189,248,0.6)]" />}
                            </button>
                        );
                    })}
                </motion.div>

                {/* Content */}
                <AnimatePresence mode="wait">
                    <motion.div key={activeTab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2, ease: "easeOut" as const }}>

                        {activeTab === "account" && (
                            <SectionCard title="Informazioni account" isDark={isDark}>
                                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    <InfoRow isDark={isDark} label="Nome" value={user.given_name} />
                                    <InfoRow isDark={isDark} label="Cognome" value={user.family_name} />
                                    <InfoRow isDark={isDark} label="Email" value={user.email} />
                                    <InfoRow isDark={isDark} label="Codice fiscale" value={user.fiscal_code} />
                                    <InfoRow isDark={isDark} label="Partita IVA" value={user.partita_iva || "—"} />
                                    <InfoRow isDark={isDark} label="Azienda" value={user.company_name?.toLowerCase() || "—"} />
                                    <InfoRow isDark={isDark} label="Ruolo aziendale" value={user.company_role?.toLowerCase() || "—"} />
                                    <InfoRow isDark={isDark} label="Email verificata" value={user.emailVerified ? "Si" : "No"} highlight={!user.emailVerified} />
                                    <InfoRow isDark={isDark} label="Ruolo piattaforma" value={user.role} />
                                    <InfoRow isDark={isDark} label="VIP" value={user.vip ? "Si" : "No"} />
                                    <InfoRow isDark={isDark} label="Sospeso" value={user.isSuspended ? "Si" : "No"} highlight={user.isSuspended} />
                                </div>
                            </SectionCard>
                        )}

                        {activeTab === "survey" && (
                            <div className="space-y-6">
                                <SectionCard title="I tuoi assessment" isDark={isDark}>
                                    <div className="space-y-3">
                                        {ALL_SURVEY_TYPES.map(type => {
                                            const cfg = getSurveyConfig(type);
                                            const entry = allSurveys.find(s => s.surveyType === type);
                                            const isPublished = entry?.status === "published";
                                            const rowClass = isPublished
                                                ? (isDark ? "border-cyan-500/30 bg-cyan-500/5" : "border-cyan-200 bg-cyan-50")
                                                : entry
                                                    ? (isDark ? "border-amber-500/20 bg-[#0E0E0D]/40" : "border-amber-200 bg-amber-50")
                                                    : (isDark ? "border-stone-800/20 bg-[#0E0E0D]/30 opacity-50" : "border-slate-200 bg-slate-50 opacity-50");
                                            return (
                                                <div key={type} className={`flex items-center gap-4 p-4 rounded-xl border ${rowClass}`}>
                                                    <div className={`shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${isPublished ? (isDark ? "bg-cyan-500/15" : "bg-cyan-100") : entry ? (isDark ? "bg-amber-500/10" : "bg-amber-100") : (isDark ? "bg-stone-800/30" : "bg-slate-200")}`}>
                                                        <span className={isPublished ? "text-cyan-400" : entry ? (isDark ? "text-amber-400" : "text-amber-600") : (isDark ? "text-stone-600" : "text-stone-400")}>{SURVEY_ICONS[type]}</span>
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className={`text-sm font-semibold ${isDark ? "text-slate-200" : "text-slate-800"}`}>{cfg.label}</p>
                                                        <p className={`text-xs ${mutedText}`}>{isPublished ? "Completato" : entry ? "In corso" : "Non iniziato"}</p>
                                                    </div>
                                                    {isPublished && entry ? (
                                                        <button onClick={() => navigate(`/survey/${entry.surveyId}/recap`)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-cyan-600 hover:bg-cyan-500 text-white transition-colors shrink-0">Report <ArrowRight size={11} /></button>
                                                    ) : entry ? (
                                                        <button onClick={() => navigate(`/survey/minor/${type}`)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors shrink-0 ${isDark ? "border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10" : "border-cyan-300 text-cyan-700 hover:bg-cyan-50"}`}>Continua <ArrowRight size={11} /></button>
                                                    ) : (
                                                        <button onClick={() => navigate("/survey/start")} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors shrink-0 ${isDark ? "border-stone-800/30 text-slate-500 hover:text-slate-300" : "border-slate-200 text-slate-500 hover:bg-[#EDF2F7]"}`}>Inizia <ArrowRight size={11} /></button>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </SectionCard>
                                {dashboardStats && (
                                    <SectionCard title="Statistiche piattaforma" isDark={isDark}>
                                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                            {[
                                                { l: "Survey pubblicati", v: dashboardStats.publishedResponses },
                                                { l: "Survey in bozza", v: dashboardStats.draftResponses },
                                                { l: "Score minimo", v: dashboardStats.minScore != null ? `${dashboardStats.minScore}%` : "—" },
                                                { l: "Score massimo", v: dashboardStats.maxScore != null ? `${dashboardStats.maxScore}%` : "—" },
                                            ].map(s => (
                                                <div key={s.l}><span className={`text-[10px] font-mono uppercase tracking-[0.15em] ${isDark ? "text-slate-600" : "text-slate-400"}`}>{s.l}</span><p className={`mt-1 text-sm font-medium ${isDark ? "text-slate-200" : "text-slate-800"}`}>{s.v}</p></div>
                                            ))}
                                        </div>
                                    </SectionCard>
                                )}
                            </div>
                        )}

                        {activeTab === "security" && (
                            <SectionCard title="Sicurezza e accesso" isDark={isDark}>
                                <div className="grid sm:grid-cols-2 gap-6">
                                    <InfoRow isDark={isDark} label="Metodo accesso" value={user.auth.type} />
                                    {user.auth.provider && <InfoRow isDark={isDark} label="Provider OAuth" value={user.auth.provider} />}
                                    <InfoRow isDark={isDark} label="Ultimo accesso" value={user.last_login ? new Date(user.last_login).toLocaleString() : "Mai"} />
                                    <InfoRow isDark={isDark} label="Ultima modifica email" value={user.lastEmailChange ? new Date(user.lastEmailChange).toLocaleString() : "—"} />
                                </div>
                            </SectionCard>
                        )}

                        {activeTab === "actions" && (
                            <div className="grid sm:grid-cols-3 gap-4">
                                <ActionCard isDark={isDark} icon={Settings} title="Modifica profilo" description="Aggiorna le informazioni del tuo account." onClick={() => navigate("/user/edit")} index={0} />
                                <ActionCard isDark={isDark} icon={BarChart2} title="Maturità digitale" description="Consulta i risultati dei tuoi assessment." onClick={() => navigate("/survey/start")} index={1} />
                                <ActionCard isDark={isDark} icon={LogOut} title="Logout" description="Termina la sessione corrente." onClick={logout} danger index={2} />
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>

            {showImageModal && selectedImage && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <motion.div initial={{ scale: 0.96, opacity: 0, y: 8 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.96, opacity: 0 }} transition={{ duration: 0.2, ease: "easeOut" as const }}
                        className={`rounded-2xl border overflow-hidden w-full max-w-sm ${isDark ? "bg-[#0E0E0D]/80 border-stone-800/20 shadow-lg" : `${cardBorder} bg-[#FAFAF8]`}`}>
                        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-cyan-500/60 to-transparent" />
                        <div className="p-8 space-y-6">
                            <h2 className={`text-sm font-semibold ${isDark ? "text-slate-100" : "text-slate-900"}`}>Conferma immagine profilo</h2>
                            <img alt="preview" src={selectedImage} className="w-28 h-28 rounded-full object-cover mx-auto border-2 border-sky-600/20" />
                            <p className={`text-xs text-center ${mutedText}`}>Vuoi impostare questa immagine come foto profilo?</p>
                            <div className="flex gap-3">
                                <button onClick={() => { setShowImageModal(false); setSelectedImage(null); }} className={`flex-1 py-2.5 rounded-xl border text-sm font-medium transition-colors ${isDark ? "border-stone-800/30 text-slate-400 hover:text-slate-200" : "border-slate-200 text-slate-600 hover:bg-[#EDF2F7]"}`}>Annulla</button>
                                <button onClick={async () => { await setUserImage(id, selectedImage, token); setShowImageModal(false); setSelectedImage(null); refetch(); }} disabled={uploading} className="flex-1 py-2.5 rounded-xl bg-sky-700 hover:bg-sky-600 disabled:opacity-40 text-white text-sm font-semibold transition-colors flex items-center justify-center">{uploading ? <FallingLines color="white" width="15" visible /> : "Conferma"}</button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </main>
    );
}
