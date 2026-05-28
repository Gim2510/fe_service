import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Activity, Settings, LogOut, Upload, BarChart2, ArrowRight, ClipboardList, ShieldAlert, TrendingUp, Check, Target } from "lucide-react";
import { useUser } from "../hooks/useUser";
import { useAuth } from "../auth/AuthContext.tsx";
import { FallingLines } from "react-loader-spinner";
import { useTheme } from "../Context/ThemeContext";
import { useSetUserImage } from "../hooks/useSetUserImage";
import { useSurveyDashboard } from "../hooks/useSurveyDashboard";
import { useUserSurvey } from "../hooks/useUserSurvey";
import { getSurveyConfig, ALL_SURVEY_TYPES } from "../types/survey.ts";

const SURVEY_ICONS: Record<string, React.ReactNode> = { diagnostic: <ClipboardList size={18} />, compliance: <ShieldAlert size={18} />, processes: <Settings size={18} />, growth: <TrendingUp size={18} /> };
const SURVEY_COLORS: Record<string, string> = { diagnostic: "#06b6d4", compliance: "#38bdf8", processes: "#f59e0b", growth: "#10b981" };

function StatCard({ label, value, sub, icon, color }: { label: string; value: string | number; sub?: string; icon: React.ReactNode; color?: string }) {
    return (
        <div className={`flex items-center gap-3 p-4 rounded-xl border backdrop-blur-sm bg-[#0E0E0D]/60 border-cyan-500/20`}>
            <div className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center bg-cyan-500/10"><span style={{ color }}>{icon}</span></div>
            <div className="min-w-0">
                <p className="text-lg font-semibold tabular-nums text-slate-100">{value}</p>
                <p className="text-[10px] font-mono uppercase tracking-wider text-slate-500">{label}</p>
                {sub && <p className="text-[10px] text-slate-600 mt-0.5">{sub}</p>}
            </div>
        </div>
    );
}

export function UserDashboard() {
    const { setUserImage, loading: uploading } = useSetUserImage();
    const { theme } = useTheme();
    const { user, loading, error, refetch } = useUser();
    const { id, logout, token } = useAuth();
    const navigate = useNavigate();
    const isDark = theme === "dark";
    const { data: stats } = useSurveyDashboard();
    const { allSurveys } = useUserSurvey();
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [showImageModal, setShowImageModal] = useState(false);
    const [showAccountDetails, setShowAccountDetails] = useState(false);

    const A = isDark;
    const mute = A ? "text-slate-500" : "text-slate-400";
    const body = A ? "text-slate-300" : "text-slate-600";
    const card = `rounded-2xl border overflow-hidden backdrop-blur-sm ${A ? "border-cyan-500/30 bg-[#0E0E0D]/80 shadow-lg shadow-cyan-500/10" : "border-cyan-500/60 bg-white shadow-md shadow-cyan-400/15"}`;

    if (loading) return <main className={`${A ? "bg-[#0E0E0D]" : "bg-[#FAF8F4]"} min-h-screen flex items-center justify-center`}><FallingLines color={A ? "#fff" : "#B45309"} width={60} visible /></main>;
    if (error || !user) return <main className={`${A ? "bg-[#0E0E0D] text-white" : "bg-[#FAF8F4] text-slate-900"} min-h-screen flex items-center justify-center`}><div className="text-center space-y-4"><p className="text-sm text-red-400">{error || "Utente non trovato"}</p><button onClick={refetch} className="px-5 py-2.5 rounded-xl bg-sky-700 hover:bg-sky-600 text-white text-sm font-semibold">Riprova</button></div></main>;

    const publishedSurveys = allSurveys.filter(s => s.status === "published");
    const completedCount = publishedSurveys.length;

    return (
        <main className={`min-h-screen ${A ? "bg-[#0E0E0D] text-white" : "bg-[#FAF8F4] text-slate-900"}`}>
            <div className="fixed inset-0 pointer-events-none opacity-[0.04]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48'%3E%3Crect x='0' y='0' width='48' height='48' fill='none' stroke='%2306B6D4' stroke-width='0.4'/%3E%3C/svg%3E")`, backgroundSize: "48px 48px" }} />
            {A && <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-950/15 via-transparent to-transparent" />}

            <div className="relative z-10 max-w-5xl mx-auto px-6 pt-24 pb-20 space-y-10">

                {/* ═══ SECTION: PROFILE HERO ═══ */}
                <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: "easeOut" }} className={card}>
                    <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-cyan-500/60 to-transparent" />
                    <div className="p-6 sm:p-8">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                            <div className="relative">
                                <div className={`w-16 h-16 rounded-full overflow-hidden border-2 flex items-center justify-center ${A ? "border-cyan-500/30 bg-stone-900" : "border-sky-300 bg-slate-200"}`}>
                                    {selectedImage ? <img alt="" src={selectedImage} className="w-full h-full object-cover" /> : user.user_image ? <img alt="" src={user.user_image} className="w-full h-full object-cover" /> : <User size={24} className="text-slate-600" />}
                                </div>
                                <label className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer border ${A ? "bg-cyan-600 border-cyan-500 hover:bg-cyan-500" : "bg-sky-500 border-sky-400 hover:bg-sky-400"}`}>
                                    <Upload size={10} className="text-white" />
                                    <input type="file" accept="image/*" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (!f) return; const r = new FileReader(); r.onloadend = () => { setSelectedImage(r.result as string); setShowImageModal(true); }; r.readAsDataURL(f); }} />
                                </label>
                            </div>
                            <div className="flex-1 min-w-0">
                                <h2 className={`text-xl font-semibold ${A ? "text-slate-100" : "text-slate-900"}`}>{user.given_name} {user.family_name}</h2>
                                <p className={`text-sm font-mono mt-0.5 ${mute}`}>{user.email}</p>
                                <div className="flex flex-wrap gap-1.5 mt-2">
                                    {user.vip && <span className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-widest rounded-full border bg-sky-500/15 text-sky-400 border-sky-500/30">VIP</span>}
                                    {user.emailVerified ? <span className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-widest rounded-full border bg-green-500/15 text-green-400 border-green-500/30">Verificato</span> : <span className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-widest rounded-full border bg-red-500/15 text-red-400 border-red-500/30">Non verificato</span>}
                                    <span className={`px-2 py-0.5 text-[10px] font-mono uppercase tracking-widest rounded-full border ${A ? "border-stone-800/40 text-slate-400" : "border-slate-200 text-slate-500"}`}>{user.role}</span>
                                    {user.company_name && <span className={`px-2 py-0.5 text-[10px] font-mono uppercase tracking-widest rounded-full border ${A ? "border-stone-800/40 text-slate-400" : "border-slate-200 text-slate-500"}`}>{user.company_name.toLowerCase()}</span>}
                                </div>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                                <button onClick={() => navigate("/user/edit")} className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-medium transition-colors ${A ? "border-stone-800/30 text-slate-400 hover:text-slate-200" : "border-slate-200 text-slate-600 hover:bg-[#EDF2F7]"}`}><Settings size={13} /> Modifica</button>
                                <button onClick={logout} className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-medium transition-colors ${A ? "border-red-900/30 text-red-400 hover:text-red-300" : "border-red-200 text-red-500 hover:text-red-700"}`}><LogOut size={13} /> Esci</button>
                            </div>
                        </div>
                    </div>
                </motion.section>

                {/* ═══ SECTION: I TUOI ASSESSMENT ═══ */}
                <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }} className="space-y-4">
                    <div className="flex items-center gap-3">
                        <div className={`h-px flex-1 ${A ? "bg-gradient-to-r from-cyan-500/30 to-transparent" : "bg-gradient-to-r from-sky-300 to-transparent"}`} />
                        <span className={`text-[10px] font-mono uppercase tracking-[0.2em] whitespace-nowrap ${mute}`}>I tuoi assessment</span>
                        <div className={`h-px flex-1 ${A ? "bg-gradient-to-l from-cyan-500/30 to-transparent" : "bg-gradient-to-l from-sky-300 to-transparent"}`} />
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        {ALL_SURVEY_TYPES.map((type, i) => {
                            const cfg = getSurveyConfig(type);
                            const entry = allSurveys.find(s => s.surveyType === type);
                            const isPublished = entry?.status === "published";
                            const color = SURVEY_COLORS[type];
                            return (
                                <motion.div key={type} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 + i * 0.06 }}
                                    className={`rounded-2xl border overflow-hidden backdrop-blur-sm transition-all duration-300 group cursor-pointer ${isPublished
                                        ? `${A ? "border-cyan-500/30 bg-[#0E0E0D]/70 shadow-lg shadow-cyan-500/10" : "border-cyan-500/60 bg-white shadow-md shadow-cyan-400/15"} hover:-translate-y-1`
                                        : entry
                                            ? `${A ? "border-amber-500/20 bg-[#0E0E0D]/50" : "border-amber-200 bg-amber-50"} hover:-translate-y-0.5`
                                            : `${A ? "border-stone-800/20 bg-[#0E0E0D]/30 opacity-60" : "border-stone-200 bg-stone-50 opacity-60"}`}`}
                                    onClick={() => {
                                        if (isPublished && entry) navigate(`/survey/${entry.surveyId}/recap`);
                                        else if (entry) navigate(`/survey/minor/${type}`);
                                        else navigate("/survey/start");
                                    }}>
                                    <div className="h-[2px] w-full" style={{ background: `linear-gradient(90deg, transparent, ${color}88, transparent)` }} />
                                    <div className="p-5">
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${color}20` }}><span style={{ color }}>{SURVEY_ICONS[type]}</span></div>
                                            {isPublished && <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-green-500/10 text-green-400 border border-green-500/20"><Check size={9} className="inline mr-0.5" />Fatto</span>}
                                            {entry && !isPublished && <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20">In corso</span>}
                                        </div>
                                        <h3 className={`text-sm font-semibold mb-1.5 ${A ? "text-slate-200" : "text-slate-800"}`}>{cfg.label}</h3>
                                        <p className={`text-xs leading-relaxed mb-3 ${mute}`}>{isPublished ? "Completato" : entry ? "Riprendi la compilazione" : "Non ancora iniziato"}</p>
                                        <div className={`flex items-center gap-1.5 text-xs font-medium ${isPublished ? "text-cyan-400" : entry ? "text-amber-400" : "text-stone-500"}`}>
                                            {isPublished ? "Vedi report" : entry ? "Continua" : "Inizia"} <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform" />
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.section>

                {/* ═══ SECTION: STATISTICHE ═══ */}
                {stats && (
                    <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.14 }} className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className={`h-px flex-1 ${A ? "bg-gradient-to-r from-cyan-500/30 to-transparent" : ""}`} />
                            <span className={`text-[10px] font-mono uppercase tracking-[0.2em] whitespace-nowrap ${mute}`}>Statistiche piattaforma</span>
                            <div className={`h-px flex-1 ${A ? "bg-gradient-to-l from-cyan-500/30 to-transparent" : ""}`} />
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            {[
                                { icon: <Target size={15} />, label: "Score medio", value: `${Math.round(stats.averageScore)}%`, color: "#06b6d4" },
                                { icon: <BarChart2 size={15} />, label: "Survey pubblicati", value: stats.publishedResponses, color: "#4ade80" },
                                { icon: <Activity size={15} />, label: "Ultimi 7 giorni", value: stats.responsesLast7Days, color: "#f59e0b" },
                                { icon: <Check size={15} />, label: "Completati da te", value: `${completedCount}/${allSurveys.length}`, color: "#38bdf8" },
                            ].map(k => <StatCard key={k.label} {...k} />)}
                        </div>

                        {/* Score distribution + Category averages */}
                        <div className="grid md:grid-cols-2 gap-4">
                            {stats.scoreDistribution && stats.scoreDistribution.length > 0 && (
                                <div className={card}>
                                    <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />
                                    <div className="p-6">
                                        <p className={`text-[10px] font-mono uppercase tracking-[0.18em] mb-4 ${mute}`}>Distribuzione score</p>
                                        <div className="space-y-2">
                                            {stats.scoreDistribution.map(d => {
                                                const max = Math.max(...stats.scoreDistribution!.map(x => x.count), 1);
                                                const pct = Math.round((d.count / max) * 100);
                                                return (
                                                    <div key={d.range} className="flex items-center gap-3">
                                                        <span className={`text-[10px] font-mono w-14 text-right ${mute}`}>{d.range}</span>
                                                        <div className="flex-1 h-3 rounded-full overflow-hidden bg-white/5">
                                                            <motion.div className="h-full rounded-full bg-cyan-500/60" initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.8, delay: 0.2 }} />
                                                        </div>
                                                        <span className={`text-xs font-mono tabular-nums w-8 ${body}`}>{d.count}</span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            )}
                            {stats.averageScoreByCategory && stats.averageScoreByCategory.length > 0 && (
                                <div className={card}>
                                    <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />
                                    <div className="p-6">
                                        <p className={`text-[10px] font-mono uppercase tracking-[0.18em] mb-4 ${mute}`}>Score medio per categoria</p>
                                        <div className="space-y-2">
                                            {stats.averageScoreByCategory.slice(0, 7).map(c => (
                                                <div key={c.category} className="flex items-center gap-3">
                                                    <span className={`text-[11px] font-medium w-28 truncate ${body}`}>{c.category}</span>
                                                    <div className="flex-1 h-3 rounded-full overflow-hidden bg-white/5">
                                                        <motion.div className="h-full rounded-full bg-cyan-500/60" initial={{ width: 0 }} animate={{ width: `${c.averagePercentage}%` }} transition={{ duration: 0.8, delay: 0.2 }} />
                                                    </div>
                                                    <span className={`text-xs font-mono tabular-nums w-10 text-right ${body}`}>{Math.round(c.averagePercentage)}%</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Min/Max score */}
                        <div className="grid grid-cols-2 gap-3">
                            <div className={`rounded-xl border p-4 backdrop-blur-sm ${A ? "bg-[#0E0E0D]/60 border-cyan-500/20" : "bg-white border-slate-200"}`}>
                                <p className={`text-[10px] font-mono uppercase tracking-wider mb-1 ${mute}`}>Score minimo</p>
                                <p className={`text-lg font-semibold tabular-nums ${body}`}>{stats.minScore != null ? `${stats.minScore}%` : "N/D"}</p>
                            </div>
                            <div className={`rounded-xl border p-4 backdrop-blur-sm ${A ? "bg-[#0E0E0D]/60 border-cyan-500/20" : "bg-white border-slate-200"}`}>
                                <p className={`text-[10px] font-mono uppercase tracking-wider mb-1 ${mute}`}>Score massimo</p>
                                <p className={`text-lg font-semibold tabular-nums ${body}`}>{stats.maxScore != null ? `${stats.maxScore}%` : "N/D"}</p>
                            </div>
                        </div>
                    </motion.section>
                )}

                {/* ═══ SECTION: DETTAGLIO ACCOUNT ═══ */}
                <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }} className="space-y-4">
                    <button onClick={() => setShowAccountDetails(!showAccountDetails)}
                        className={`flex items-center gap-3 w-full group ${A ? "text-slate-400 hover:text-slate-200" : "text-slate-500 hover:text-slate-700"}`}>
                        <div className={`h-px flex-1 ${A ? "bg-gradient-to-r from-cyan-500/20 to-transparent" : ""}`} />
                        <span className={`text-[10px] font-mono uppercase tracking-[0.2em] whitespace-nowrap flex items-center gap-1.5`}>
                            Dettaglio account
                            <span className={`transition-transform ${showAccountDetails ? "rotate-180" : ""}`}>
                                <svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1L5 5L9 1" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            </span>
                        </span>
                        <div className={`h-px flex-1 ${A ? "bg-gradient-to-l from-cyan-500/20 to-transparent" : ""}`} />
                    </button>
                    {showAccountDetails && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} transition={{ duration: 0.3 }} className="overflow-hidden space-y-4">
                            <div className={card}>
                                <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />
                                <div className="p-6">
                                    <p className={`text-[10px] font-mono uppercase tracking-[0.18em] mb-5 ${mute}`}>Informazioni account</p>
                                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {[
                                            ["Nome", user.given_name], ["Cognome", user.family_name], ["Email", user.email],
                                            ["Azienda", user.company_name || "—"], ["Ruolo aziendale", user.company_role || "—"],
                                            ["Codice fiscale", user.fiscal_code], ["Partita IVA", user.partita_iva || "—"],
                                            ["Ruolo", user.role], ["VIP", user.vip ? "Si" : "No"],
                                            ["Email verificata", user.emailVerified ? "Si" : "No"], ["Sospeso", user.isSuspended ? "Si" : "No"],
                                            ["Metodo accesso", user.auth.type], ["Ultimo accesso", user.last_login ? new Date(user.last_login).toLocaleString() : "Mai"],
                                        ].map(([label, value]) => (
                                            <div key={label}>
                                                <span className={`text-[10px] font-mono uppercase tracking-[0.12em] text-slate-600`}>{label}</span>
                                                <p className={`mt-0.5 text-sm font-medium ${A ? "text-slate-200" : "text-slate-800"}`}>{value || "—"}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </motion.section>

            </div>

            {/* Image modal */}
            {showImageModal && selectedImage && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <motion.div initial={{ scale: 0.96, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className={`rounded-2xl border overflow-hidden w-full max-w-sm ${A ? "bg-[#0E0E0D]/80 border-stone-800/20 shadow-lg" : "bg-white border-slate-200"}`}>
                        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-cyan-500/60 to-transparent" />
                        <div className="p-8 space-y-5">
                            <h2 className={`text-sm font-semibold ${A ? "text-slate-100" : "text-slate-900"}`}>Conferma immagine profilo</h2>
                            <img alt="" src={selectedImage} className="w-24 h-24 rounded-full object-cover mx-auto border-2 border-sky-600/20" />
                            <div className="flex gap-3">
                                <button onClick={() => { setShowImageModal(false); setSelectedImage(null); }} className={`flex-1 py-2.5 rounded-xl border text-sm font-medium ${A ? "border-stone-800/30 text-slate-400" : "border-slate-200 text-slate-600"}`}>Annulla</button>
                                <button onClick={async () => { await setUserImage(id, selectedImage, token); setShowImageModal(false); setSelectedImage(null); refetch(); }} disabled={uploading} className="flex-1 py-2.5 rounded-xl bg-sky-700 hover:bg-sky-600 disabled:opacity-40 text-white text-sm font-semibold flex items-center justify-center">{uploading ? <FallingLines color="white" width="15" visible /> : "Conferma"}</button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </main>
    );
}
