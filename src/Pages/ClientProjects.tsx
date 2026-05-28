import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Briefcase, Users, FileText, Calendar, CheckCircle, Clock, AlertCircle, User, Crown } from "lucide-react";
import { useClientData } from "../hooks/useClientData";
import { useProjects } from "../hooks/useProjects";
import { useTheme } from "../Context/ThemeContext.tsx";
import { FallingLines } from "react-loader-spinner";
import type { Project, TeamMember, ProjectDocument } from "../types/clientTypes";
import { PROJECT_STATUS_LABELS, type ProjectStatus } from "../types/clientTypes";

const STATUS_STYLES: Record<ProjectStatus, { color: string; bg: string; border: string; icon: React.ReactNode }> = {
  active:    { color: "text-cyan-400",   bg: "bg-cyan-500/10",   border: "border-cyan-500/30",   icon: <Clock size={11} /> },
  completed: { color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/30", icon: <CheckCircle size={11} /> },
  on_hold:   { color: "text-amber-400",  bg: "bg-amber-500/10",  border: "border-amber-500/30",  icon: <AlertCircle size={11} /> },
  planning:  { color: "text-slate-400",  bg: "bg-slate-500/10",  border: "border-slate-500/30",  icon: <Calendar size={11} /> },
};

export function ClientProjects() {
  const { theme } = useTheme(); const A = theme === "dark";
  const navigate = useNavigate();
  const { client, loading: loadingClient } = useClientData();
  const clientId = client?._id ?? null;
  const { projects, loading: loadingProjects } = useProjects(clientId);
  const card = `rounded-2xl border overflow-hidden backdrop-blur-sm ${A ? "border-cyan-500/30 bg-[#0E0E0D]/80 shadow-lg shadow-cyan-500/10" : "border-cyan-500/60 bg-white shadow-md shadow-cyan-400/15"}`;
  const mute = A ? "text-slate-500" : "text-slate-400";
  const body = A ? "text-slate-300" : "text-slate-600";

  if (loadingClient || loadingProjects) return <div className={`min-h-screen flex items-center justify-center ${A ? "bg-[#0E0E0D]" : "bg-[#FAFAF8]"}`}><FallingLines color={A ? "#fff" : "#B45309"} width="60" visible /></div>;

  const activeProjects = projects.filter((p: Project) => p.status === "active").length;
  const completedProjects = projects.filter((p: Project) => p.status === "completed").length;
  const allTeamMembers = projects.flatMap((p: Project) => p.team_members ?? []);
  const uniqueTeam = allTeamMembers.filter((m: TeamMember, i: number, arr: TeamMember[]) => arr.findIndex((x: TeamMember) => x.user_id === m.user_id) === i);
  const allDocs = projects.flatMap((p: Project) => p.documents ?? []);
  const nextDeadline = projects.filter((p: Project) => p.status === "active" && p.end_date).sort((a: Project, b: Project) => new Date(a.end_date!).getTime() - new Date(b.end_date!).getTime())[0];

  return (
    <main className={`min-h-screen ${A ? "bg-[#0E0E0D] text-white" : "bg-[#FAFAF8] text-slate-900"}`}>
      <div className="fixed inset-0 pointer-events-none opacity-[0.04]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48'%3E%3Crect x='0' y='0' width='48' height='48' fill='none' stroke='%2306B6D4' stroke-width='0.4'/%3E%3C/svg%3E")`, backgroundSize: "48px 48px" }} />
      {A && <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-950/10 via-transparent to-transparent" />}

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-20 space-y-10">

        {/* ═══ HEADER ═══ */}
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="space-y-2">
          <span className={`inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] px-3 py-1.5 rounded-full border ${A ? "text-cyan-400 border-cyan-500/20 bg-cyan-950/30" : "text-sky-700 border-sky-300 bg-sky-50"}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
            {client?.company_name ?? "Area Clienti"}
          </span>
          <h1 className={`text-2xl sm:text-3xl font-semibold ${A ? "text-slate-100" : "text-slate-900"}`}>I Miei Progetti</h1>
          <p className={`text-sm ${mute}`}>Panoramica completa dei progetti attivi, team e documentazione.</p>
        </motion.div>

        {/* ═══ KPI STRIP ═══ */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { icon: <Briefcase size={14} />, label: "Progetti Attivi", value: activeProjects, sub: `${completedProjects} completati` },
            { icon: <Users size={14} />, label: "Team", value: uniqueTeam.length, sub: "membri assegnati" },
            { icon: <FileText size={14} />, label: "Documenti", value: allDocs.length, sub: "caricati" },
            { icon: <Calendar size={14} />, label: "Prossima Scadenza", value: nextDeadline?.end_date ? new Date(nextDeadline.end_date).toLocaleDateString("it-IT") : "—", sub: nextDeadline?.name ?? "" },
          ].map((kpi, i) => (
            <motion.div key={kpi.label} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 + i * 0.03 }}
              className={`flex items-center gap-3 p-3.5 rounded-xl border backdrop-blur-sm ${A ? "bg-[#0E0E0D]/60 border-cyan-500/20" : "bg-white border-slate-200"}`}>
              <div className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${A ? "bg-cyan-500/10" : "bg-cyan-50"}`}>
                <span className="text-cyan-400">{kpi.icon}</span>
              </div>
              <div className="min-w-0">
                <p className={`text-lg font-semibold tabular-nums leading-tight ${A ? "text-slate-100" : "text-slate-800"}`}>{kpi.value}</p>
                <p className={`text-[11px] font-mono uppercase tracking-wider ${mute}`}>{kpi.label}</p>
                {kpi.sub && <p className={`text-[11px] mt-0.5 truncate ${mute}`}>{kpi.sub}</p>}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ═══ PROJECT CARDS ═══ */}
        <div className="space-y-6">
          {projects.map((project: Project, i: number) => {
            const st = STATUS_STYLES[project.status];
            const team = project.team_members ?? [];
            const docs = project.documents ?? [];
            const lead = team.find((m: TeamMember) => m.is_lead);
            return (
              <motion.div key={project._id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.06 }} className={card}>
                <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-cyan-500/60 to-transparent" />
                <div className="p-6 sm:p-8">
                  <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                    {/* Left: Project info */}
                    <div className="flex-1 min-w-0 space-y-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded-md border ${st.bg} ${st.border} ${st.color}`}>
                          {st.icon} {PROJECT_STATUS_LABELS[project.status]}
                        </span>
                        {lead && <span className={`text-[11px] font-mono px-2 py-0.5 rounded-md border ${A ? "border-cyan-500/20 bg-cyan-500/10 text-cyan-400" : "border-cyan-200 bg-cyan-50 text-cyan-700"}`}>
                          <Crown size={9} className="inline mr-1" />{lead.role}
                        </span>}
                      </div>
                      <h2 className={`text-xl font-semibold ${A ? "text-slate-100" : "text-slate-900"}`}>{project.name}</h2>
                      {project.description && <p className={`text-sm leading-relaxed ${body}`}>{project.description}</p>}
                      <div className="flex flex-wrap gap-4 text-xs">
                        {project.start_date && <span className={mute}>Inizio: {new Date(project.start_date).toLocaleDateString("it-IT")}</span>}
                        {project.end_date && <span className={mute}>Consegna: {new Date(project.end_date).toLocaleDateString("it-IT")}</span>}
                      </div>
                    </div>
                    {/* Right: Actions */}
                    <div className="shrink-0 flex flex-row lg:flex-col items-end gap-2">
                      <button onClick={() => navigate(`/client/${project._id}`)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-semibold transition-all shadow-lg shadow-cyan-500/25">
                        Dettaglio <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>

                  {/* ═══ SUB-SECTIONS ═══ */}
                  <div className="grid sm:grid-cols-2 gap-4 mt-6 pt-5 border-t border-stone-800/20">
                    {/* Team */}
                    <div>
                      <p className={`text-[11px] font-mono uppercase tracking-widest mb-3 flex items-center gap-1.5 ${mute}`}><Users size={11} /> Team ({team.length})</p>
                      {team.length === 0 ? <p className={`text-xs ${mute}`}>Nessun membro assegnato</p> : (
                        <div className="space-y-1.5">
                          {team.map((m: TeamMember, j: number) => (
                            <div key={j} className={`flex items-center gap-2 text-xs p-1.5 rounded-lg ${m.is_lead ? (A ? "bg-cyan-500/10" : "bg-cyan-50") : ""}`}>
                              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${m.is_lead ? (A ? "bg-cyan-500/20 text-cyan-400" : "bg-cyan-100 text-cyan-700") : (A ? "bg-stone-800/40 text-slate-400" : "bg-slate-100 text-slate-500")}`}>
                                {m.is_lead ? <Crown size={10} /> : <User size={10} />}
                              </div>
                              <span className={`${m.is_lead ? (A ? "text-cyan-300 font-medium" : "text-cyan-800 font-medium") : (A ? "text-slate-400" : "text-slate-600")}`}>{m.role}</span>
                              {m.is_lead && <span className={`text-[10px] font-mono ${mute}`}>• Referente</span>}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    {/* Documents */}
                    <div>
                      <p className={`text-[11px] font-mono uppercase tracking-widest mb-3 flex items-center gap-1.5 ${mute}`}><FileText size={11} /> Documenti ({docs.length})</p>
                      {docs.length === 0 ? <p className={`text-xs ${mute}`}>Nessun documento</p> : (
                        <div className="space-y-1.5">
                          {docs.map((d: ProjectDocument, j: number) => (
                            <div key={j} className={`flex items-center gap-2 text-xs p-1.5 rounded-lg ${A ? "hover:bg-stone-800/20" : "hover:bg-slate-50"}`}>
                              <span className={`w-6 h-6 rounded flex items-center justify-center text-[9px] font-mono uppercase ${A ? "bg-stone-800/40 text-slate-400" : "bg-slate-100 text-slate-500"}`}>{d.type}</span>
                              <span className={`truncate ${body}`}>{d.name}</span>
                              <span className={`text-[10px] font-mono ml-auto shrink-0 ${mute}`}>{new Date(d.uploaded_at).toLocaleDateString("it-IT")}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ═══ EMPTY STATE ═══ */}
        {projects.length === 0 && (
          <div className={`text-center py-16 rounded-2xl border border-dashed ${A ? "border-stone-800/30" : "border-slate-200"}`}>
            <Briefcase size={28} className={`mx-auto mb-3 ${mute}`} />
            <p className={`text-sm ${body}`}>Nessun progetto attivo al momento.</p>
          </div>
        )}
      </div>
    </main>
  );
}
