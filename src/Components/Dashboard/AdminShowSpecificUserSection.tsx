import { motion } from "framer-motion";
import type { UserType } from "../../types/userTypes.ts";
import { useAuth } from "../../auth/AuthContext.tsx";
import { useSelectedUser } from "../../hooks/useUserById.ts";
import { useUserSurveyById } from "../../hooks/useUserSurveyById.ts";
import { FallingLines } from "react-loader-spinner";
import { CATEGORY_LABELS, scoreGrade } from "../../utils/surveyUtils.ts";
import { getSurveyConfig } from "../../types/survey.ts";
import { ClipboardList, ShieldAlert, Settings, TrendingUp } from "lucide-react";

type Props = {
    allUsers: UserType[];
    selectedUserIdToShow: string;
    setSelectedUserIdToShow: (v: string) => void;
    theme: string;
};

export function AdminShowSpecificUserSection({ allUsers, selectedUserIdToShow, setSelectedUserIdToShow, theme }: Props) {
    const { id } = useAuth();
    const { user, loading, error } = useSelectedUser(selectedUserIdToShow);
    const { survey: userSurvey, surveys: allUserSurveys, loading: surveyLoading } = useUserSurveyById(selectedUserIdToShow);
    const isDark = theme === "dark";

    const border   = isDark ? "border-stone-800/30" : "border-slate-200";

    const selectClass = `w-full sm:w-80 h-11 px-4 rounded-xl border text-sm appearance-none cursor-pointer focus:outline-none
        ${isDark ? "bg-[#111110] border-stone-800/30 text-slate-200 focus:border-sky-700"
                 : "bg-white border-slate-200 text-slate-900 focus:border-sky-600"}`;

    const badgeBg = {
        VIP:       isDark ? "bg-sky-500/15 text-sky-400 border-sky-500/30"   : "bg-sky-50 text-sky-700 border-sky-200",
        Verified:  isDark ? "bg-green-500/15 text-green-400 border-green-500/30"   : "bg-green-50 text-green-700 border-green-200",
        Suspended: isDark ? "bg-red-500/15 text-red-400 border-red-500/30"         : "bg-red-50 text-red-700 border-red-200",
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className={`rounded-2xl border overflow-hidden ${border}`}
            style={{ background: isDark ? "#0E0E0D" : "#FAFAF8" }}
        >
            <div className="h-[2px] w-full bg-sky-700/40" />
            <div className="p-7 space-y-7">
                <div>
                    <h2 className={`text-sm font-semibold ${isDark ? "text-slate-100" : "text-slate-900"}`}>
                        Inspect Specific User
                    </h2>
                    <p className={`text-xs mt-0.5 ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                        View detailed account information
                    </p>
                </div>

                <select
                    value={selectedUserIdToShow}
                    onChange={e => setSelectedUserIdToShow(e.target.value)}
                    className={selectClass}
                >
                    <option value="">Select user</option>
                    {allUsers.filter(u => u._id !== id).map(u => (
                        <option key={u._id} value={u._id}>{u.email}</option>
                    ))}
                </select>

                {loading && (
                    <div className="flex justify-center py-8">
                        <FallingLines color={isDark ? "#fff" : "#0369A1"} width="50" visible ariaLabel="loading" />
                    </div>
                )}

                {error && <p className="text-sm text-red-400">Error loading user data</p>}

                {user && !loading && (
                    <div className="space-y-4">
                        {/* Profile card */}
                        <div className={`rounded-2xl border overflow-hidden ${border}`}>
                            <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-sky-500/40 to-transparent" />
                            <div className="p-6">
                                <div className="flex items-center gap-5">
                                    <img
                                        src={user.user_image || "https://via.placeholder.com/150"}
                                        alt="User profile"
                                        className="w-16 h-16 rounded-full object-cover border-2 border-sky-600/20 shrink-0"
                                    />
                                    <div className="flex-1 min-w-0">
                                        <h3 className={`text-sm font-semibold ${isDark ? "text-slate-100" : "text-slate-900"}`}>
                                            {user.given_name} {user.family_name}
                                        </h3>
                                        <p className={`text-xs mt-0.5 truncate ${isDark ? "text-slate-500" : "text-slate-400"}`}>{user.email}</p>
                                        <div className="flex gap-1.5 mt-2.5 flex-wrap">
                                            <span className={`px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-widest rounded-full border
                                                ${isDark ? "border-stone-800/40 text-slate-400" : "border-slate-200 text-slate-500"}`}>
                                                {user.role}
                                            </span>
                                            {user.vip       && <span className={`px-2.5 py-0.5 text-[10px] rounded-full border ${badgeBg.VIP}`}>VIP</span>}
                                            {user.emailVerified && <span className={`px-2.5 py-0.5 text-[10px] rounded-full border ${badgeBg.Verified}`}>Verified</span>}
                                            {user.isSuspended   && <span className={`px-2.5 py-0.5 text-[10px] rounded-full border ${badgeBg.Suspended}`}>Suspended</span>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Details grid */}
                        <div className={`rounded-2xl border overflow-hidden ${border}`}>
                            <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-sky-500/40 to-transparent" />
                            <div className="p-6">
                                <p className={`text-[10px] font-mono uppercase tracking-[0.18em] mb-4 ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                                    Account Details
                                </p>
                                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-5">
                                    {[
                                        { label: "Fiscal Code",   value: user.fiscal_code },
                                        { label: "Partita IVA",   value: user.partita_iva },
                                        { label: "Company",       value: user.company_name  || "—" },
                                        { label: "Role",          value: user.company_role },
                                        { label: "Auth Type",     value: user.auth.type },
                                        { label: "Provider",      value: user.auth.provider || "—" },
                                        { label: "Last Login",    value: user.last_login     ? new Date(user.last_login).toLocaleDateString("it-IT")     : "—" },
                                        { label: "Expiration",    value: user.expirationDate ? new Date(user.expirationDate).toLocaleDateString("it-IT") : "—" },
                                        { label: "Owner Score",   value: user.ownerTotalScore?.toString() || "0" },
                                        { label: "User Score",    value: user.userTotalScore?.toString()  || "0" },
                                    ].map(({ label, value }) => (
                                        <div key={label}>
                                            <p className={`text-[10px] font-mono uppercase tracking-[0.15em] mb-1
                                                ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                                                {label}
                                            </p>
                                            <p className={`text-sm font-medium ${isDark ? "text-slate-200" : "text-slate-700"}`}>
                                                {value || "—"}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Main Survey Recap */}
                {userSurvey && !surveyLoading && (
                    <SurveyRecapSection survey={userSurvey} theme={theme} />
                )}

                {/* Minor Survey Mini Cards */}
                {!surveyLoading && allUserSurveys.filter(s => s.surveyType !== 'diagnostic' && s.survey).length > 0 && (
                    <div className="space-y-3">
                        <p className={`text-[11px] font-mono uppercase tracking-[0.15em] ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                            Survey specialistici
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {allUserSurveys.filter(s => s.surveyType !== 'diagnostic' && s.survey).map(s => {
                                const cfg = getSurveyConfig(s.surveyType as any);
                                const score = s.survey?.score ?? 0;
                                const grade = scoreGrade(score);
                                const icons: Record<string, React.ReactNode> = { compliance: <ShieldAlert size={14} />, processes: <Settings size={14} />, growth: <TrendingUp size={14} /> };
                                return (
                                    <div key={s.surveyId} className={`rounded-xl border p-4 backdrop-blur-sm ${isDark ? "bg-[#0E0E0D]/60 border-cyan-500/20" : "bg-white border-slate-200"}`}>
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="text-cyan-400">{icons[s.surveyType] || <ClipboardList size={14} />}</span>
                                            <p className="text-xs font-semibold truncate">{cfg.label}</p>
                                        </div>
                                        <div className="flex items-end justify-between">
                                            <div>
                                                <p className="text-lg font-semibold tabular-nums" style={{ color: grade.color }}>{score}%</p>
                                                <p className="text-[10px] font-mono uppercase tracking-wider text-slate-500">{grade.label}</p>
                                            </div>
                                            <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${s.survey?.status === "published" ? "bg-green-500/10 text-green-400" : "bg-amber-500/10 text-amber-400"}`}>
                                                {s.survey?.status === "published" ? "Pub." : "Draft"}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {!surveyLoading && !userSurvey && allUserSurveys.length === 0 && user && (
                    <div className={`rounded-2xl border p-6 text-center ${border}`}>
                        <p className={`text-sm ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                            Nessun survey completato da questo utente
                        </p>
                    </div>
                )}
            </div>
        </motion.div>
    );
}

function SurveyRecapSection({ survey, theme }: { survey: any; theme: string }) {
    const isDark = theme === "dark";
    const border = isDark ? "border-stone-800/20" : "border-slate-200";
    const mutedText = isDark ? "text-slate-500" : "text-slate-400";
    const bodyText = isDark ? "text-slate-300" : "text-slate-600";

    const totalScore = survey.score ?? 0;
    const byCategory = survey.score_by_category ?? [];
    const grade = scoreGrade(totalScore);
    const answerEntries = Object.entries(survey.answers || {});
    const answerCount = answerEntries.length;

    return (
        <div className={`rounded-2xl border overflow-hidden ${border}`}>
            <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-sky-500/40 to-transparent" />
            <div className="p-6 space-y-6">
                {/* Header */}
                <div>
                    <h2 className={`text-sm font-semibold ${isDark ? "text-slate-100" : "text-slate-900"}`}>
                        Survey Recap
                    </h2>
                    <p className={`text-xs mt-0.5 ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                        Digital Maturity Assessment Results
                    </p>
                </div>

                {/* Two-column layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* LEFT — Score overview */}
                    <div className="space-y-5">
                        {/* Main score */}
                        <div className="flex items-center gap-6">
                            <div className="relative">
                                <div
                                    className="text-5xl font-semibold tabular-nums"
                                    style={{ color: grade.color }}
                                >
                                    {totalScore}<span className="text-2xl align-top opacity-70">%</span>
                                </div>
                                <p className={`text-[10px] font-mono uppercase tracking-widest mt-1 ${mutedText}`}>
                                    Digital Readiness Score
                                </p>
                            </div>
                            <div className={`w-px h-12 ${isDark ? "bg-stone-800/40" : "bg-slate-200"}`} />
                            <div>
                                <p className={`text-[10px] font-mono uppercase tracking-widest mb-1 ${mutedText}`}>Livello</p>
                                <p className="text-sm font-semibold uppercase tracking-widest" style={{ color: grade.color }}>
                                    {grade.label}
                                </p>
                                <p className={`text-[10px] font-mono uppercase tracking-widest mt-2 mb-1 ${mutedText}`}>Risposte</p>
                                <p className={`text-lg font-semibold tabular-nums ${isDark ? "text-slate-200" : "text-slate-800"}`}>
                                    {answerCount}
                                </p>
                            </div>
                        </div>

                        {/* Score bar */}
                        <div className="space-y-1.5">
                            <div className={`h-[3px] rounded-full overflow-hidden ${isDark ? "bg-white/6" : "bg-black/8"}`}>
                                <div
                                    className="h-full rounded-full transition-all"
                                    style={{ width: `${totalScore}%`, backgroundColor: grade.color }}
                                />
                            </div>
                            <div className="flex justify-between">
                                {[0, 25, 50, 75, 100].map(v => (
                                    <span key={v} className={`text-[9px] font-mono ${mutedText}`}>{v}</span>
                                ))}
                            </div>
                        </div>

                        {/* KPI strip */}
                        <div className={`flex items-center gap-4 pt-3 border-t ${isDark ? "border-stone-800/30" : "border-slate-200"}`}>
                            <div>
                                <p className={`text-[9px] font-mono uppercase tracking-widest ${mutedText}`}>Survey ID</p>
                                <p className={`text-[10px] font-mono truncate max-w-[180px] mt-0.5 ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                                    {survey._id}
                                </p>
                            </div>
                            <div className={`w-px h-5 self-center ${isDark ? "bg-stone-800/40" : "bg-slate-200"}`} />
                            <div className={`flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-mono uppercase
                                ${survey.status === "published"
                                    ? isDark ? "bg-green-500/10 text-green-400 border border-green-500/20" : "bg-green-50 text-green-600 border border-green-200"
                                    : isDark ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" : "bg-amber-50 text-amber-600 border border-amber-200"
                                }`}>
                                {survey.status || "draft"}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT — Category scores */}
                    <div>
                        <p className={`text-[10px] font-mono uppercase tracking-[0.18em] mb-3 ${mutedText}`}>
                            Score per area
                        </p>
                        {byCategory.length === 0 ? (
                            <p className={`text-sm text-center py-6 ${mutedText}`}>Nessun dato disponibile</p>
                        ) : (
                            <div className="space-y-2.5">
                                {byCategory.map((cat: any) => {
                                    const label = CATEGORY_LABELS[cat.category] ?? cat.category;
                                    const g = scoreGrade(cat.percentage);
                                    return (
                                        <div key={cat.category}>
                                            <div className="flex items-center justify-between mb-1">
                                                <span className={`text-xs font-medium ${bodyText}`}>{label}</span>
                                                <span className="text-xs font-mono font-semibold tabular-nums" style={{ color: g.color }}>
                                                    {cat.percentage}%
                                                </span>
                                            </div>
                                            <div className={`h-[3px] rounded-full overflow-hidden ${isDark ? "bg-white/6" : "bg-black/8"}`}>
                                                <div className={`h-full rounded-full transition-all ${g.barColor}`} style={{ width: `${cat.percentage}%` }} />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

