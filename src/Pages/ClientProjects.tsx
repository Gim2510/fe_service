import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Briefcase, Users, FileText, Crown, User, Upload, Trash2, CheckCircle, Clock, AlertCircle, Calendar, Plus } from "lucide-react";
import { useClientData } from "../hooks/useClientData";
import { useProjects } from "../hooks/useProjects";
import { useTheme } from "../Context/ThemeContext.tsx";
import { useAuth } from "../auth/AuthContext.tsx";
import { FallingLines } from "react-loader-spinner";
import type { Project, TeamMember, ProjectDocument } from "../types/clientTypes";
import { PROJECT_STATUS_LABELS, type ProjectStatus } from "../types/clientTypes";

const STATUS_STYLES: Record<ProjectStatus, { color: string; bg: string; border: string; icon: React.ReactNode }> = {
  active:    { color: "text-cyan-400",   bg: "bg-cyan-500/10",   border: "border-cyan-500/30",   icon: <Clock size={11} /> },
  completed: { color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/30", icon: <CheckCircle size={11} /> },
  on_hold:   { color: "text-amber-400",  bg: "bg-amber-500/10",  border: "border-amber-500/30",  icon: <AlertCircle size={11} /> },
  planning:  { color: "text-slate-400",  bg: "bg-slate-500/10",  border: "border-slate-500/30",  icon: <Calendar size={11} /> },
  cancelled: { color: "text-red-400",    bg: "bg-red-500/10",    border: "border-red-500/30",    icon: <AlertCircle size={11} /> },
};

const DOC_TYPE_ICONS: Record<string, string> = { pdf: "PDF", xlsx: "XLSX", docx: "DOCX", txt: "TXT", other: "FILE" };

export function ClientProjects() {
  const { theme } = useTheme(); const A = theme === "dark";
  const navigate = useNavigate();
  const { client, loading: loadingClient } = useClientData();
  const { token, role } = useAuth();
  const clientId = client?._id ?? null;
  const { projects, loading: loadingProjects, refetch: refetchProjects } = useProjects(clientId);
  const card = `rounded-2xl border overflow-hidden backdrop-blur-sm ${A ? "border-cyan-500/30 bg-[#0E0E0D]/80 shadow-lg shadow-cyan-500/10" : "border-cyan-500/60 bg-white shadow-md shadow-cyan-400/15"}`;
  const mute = A ? "text-slate-500" : "text-slate-400";
  const body = A ? "text-slate-300" : "text-slate-600";
  const isAdmin = role === "ADMIN";
  const BASE_URL = (import.meta as any).env.VITE_CLIENT_BASE_URL || "http://localhost:3010";

  const [uploadingDoc, setUploadingDoc] = useState<string | null>(null);
  const [newDocFile, setNewDocFile] = useState<File | null>(null);
  const [newDocCategory, setNewDocCategory] = useState<ProjectDocument["category"]>("requirements");
  const [addDocProjectId, setAddDocProjectId] = useState<string | null>(null);

  if (loadingClient || loadingProjects) return <div className={`min-h-screen flex items-center justify-center ${A ? "bg-[#0E0E0D]" : "bg-[#FAFAF8]"}`}><FallingLines color={A ? "#fff" : "#B45309"} width="60" visible /></div>;

  const handleAddDocument = async (projectId: string) => {
    if (!newDocFile || !token) return;
    setUploadingDoc(projectId);
    try {
      const formData = new FormData();
      formData.append("file", newDocFile);
      formData.append("category", newDocCategory);
      await fetch(`${BASE_URL}/v1/project/${projectId}/document`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      setNewDocFile(null);
      setAddDocProjectId(null);
      refetchProjects();
    } catch { /* ignore */ }
    finally { setUploadingDoc(null); }
  };

  const handleDeleteDocument = async (projectId: string, docName: string) => {
    if (!token || !isAdmin) return;
    try {
      await fetch(`${BASE_URL}/v1/project/${projectId}/document/${encodeURIComponent(docName)}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      refetchProjects();
    } catch { /* ignore */ }
  };

  const allTeamMembers = projects.flatMap((p: Project) => p.team_members ?? []);
  const uniqueTeam = allTeamMembers.filter((m: TeamMember, i: number, arr: TeamMember[]) => arr.findIndex((x: TeamMember) => x.user_id === m.user_id) === i);
  return (
    <main className={`min-h-screen ${A ? "bg-[#0E0E0D] text-white" : "bg-[#FAFAF8] text-slate-900"}`}>
      <div className="fixed inset-0 pointer-events-none opacity-[0.04]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48'%3E%3Crect x='0' y='0' width='48' height='48' fill='none' stroke='%2306B6D4' stroke-width='0.4'/%3E%3C/svg%3E")`, backgroundSize: "48px 48px" }} />
      {A && <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-950/10 via-transparent to-transparent" />}

      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-24 pb-20 space-y-12">

        {/* ═══ HEADER ═══ */}
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
          <span className={`inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] px-3 py-1.5 rounded-full border ${A ? "text-cyan-400 border-cyan-500/20 bg-cyan-950/30" : "text-sky-700 border-sky-300 bg-sky-50"}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
            {client?.company_name ?? "Area Clienti"}
          </span>
          <h1 className={`text-2xl sm:text-3xl font-semibold ${A ? "text-slate-100" : "text-slate-900"}`}>I Miei Progetti</h1>
        </motion.div>

        {/* ═══ SECTION: PROGETTI ═══ */}
        <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="space-y-4">
          <div className="flex items-center gap-3">
            <div className={`h-px flex-1 ${A ? "bg-gradient-to-r from-cyan-500/30 to-transparent" : "bg-gradient-to-r from-sky-300 to-transparent"}`} />
            <span className={`text-[11px] font-mono uppercase tracking-[0.2em] whitespace-nowrap flex items-center gap-1.5 ${mute}`}><Briefcase size={12} /> Progetti</span>
            <div className={`h-px flex-1 ${A ? "bg-gradient-to-l from-cyan-500/30 to-transparent" : "bg-gradient-to-l from-sky-300 to-transparent"}`} />
          </div>
          {projects.length === 0 ? (
            <div className={`text-center py-16 rounded-2xl border border-dashed ${A ? "border-stone-800/30" : "border-slate-200"}`}>
              <Briefcase size={28} className={`mx-auto mb-3 ${mute}`} />
              <p className={`text-sm ${body}`}>Nessun progetto attivo al momento.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {projects.map((project: Project, i: number) => {
                const st = STATUS_STYLES[project.status];
                const team = project.team_members ?? [];
                const lead = team.find((m: TeamMember) => m.is_lead);
                return (
                  <motion.div key={project._id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 + i * 0.05 }} className={card}>
                    <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-cyan-500/60 to-transparent" />
                    <div className="p-6">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2">
                            <span className={`inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded-md border ${st.bg} ${st.border} ${st.color}`}>{st.icon} {PROJECT_STATUS_LABELS[project.status]}</span>
                            {lead && <span className={`text-[11px] font-mono px-2 py-0.5 rounded-md border ${A ? "border-cyan-500/20 bg-cyan-500/10 text-cyan-400" : "border-cyan-200 bg-cyan-50 text-cyan-700"}`}>
                              <Crown size={9} className="inline mr-1" />{lead.role}
                            </span>}
                          </div>
                          <h3 className={`text-lg font-semibold ${A ? "text-slate-100" : "text-slate-900"}`}>{project.name}</h3>
                          {project.description && <p className={`text-sm leading-relaxed ${body}`}>{project.description}</p>}
                          <div className="flex gap-4 text-xs">
                            {project.start_date && <span className={mute}>Inizio: {new Date(project.start_date).toLocaleDateString("it-IT")}</span>}
                            {project.end_date && <span className={mute}>Consegna: {new Date(project.end_date).toLocaleDateString("it-IT")}</span>}
                          </div>
                        </div>
                        <button onClick={() => navigate(`/client/${project._id}`)}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-semibold transition-all shadow-lg shadow-cyan-500/25 shrink-0">
                          Vedi progetto <ArrowRight size={14} />
                        </button>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-5 pt-4 border-t border-stone-800/20">
                        {/* Mini team */}
                        <div>
                          <p className={`text-[11px] font-mono uppercase tracking-widest mb-2 ${mute}`}>Team ({team.length})</p>
                          {team.length === 0 ? <p className={`text-xs ${mute}`}>—</p> : (
                            <div className="flex flex-wrap gap-1.5">
                              {team.map((m: TeamMember, j: number) => (
                                <span key={j} className={`inline-flex items-center gap-1 text-[11px] px-2 py-1 rounded-md ${m.is_lead ? (A ? "bg-cyan-500/15 text-cyan-300 border border-cyan-500/20" : "bg-cyan-50 text-cyan-700 border border-cyan-200") : (A ? "bg-stone-800/30 text-slate-400 border border-stone-700/20" : "bg-slate-100 text-slate-500 border border-slate-200")}`}>
                                  {m.is_lead ? <Crown size={9} /> : <User size={9} />}{m.role}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                        {/* Mini docs */}
                        <div>
                          <p className={`text-[11px] font-mono uppercase tracking-widest mb-2 ${mute}`}>Documenti ({(project.documents ?? []).length})</p>
                          {(project.documents ?? []).slice(0, 3).map((d: ProjectDocument, j: number) => (
                            <a key={j} href={`${BASE_URL}${d.url ?? ''}`} target="_blank" rel="noopener noreferrer"
                              className={`flex items-center gap-2 text-[11px] py-0.5 ${body} hover:text-cyan-400 transition-colors`}>
                              <span className={`w-6 h-5 rounded flex items-center justify-center text-[8px] font-mono font-bold ${A ? "bg-stone-800/40 text-slate-400" : "bg-slate-100 text-slate-500"}`}>{DOC_TYPE_ICONS[d.type] ?? "FILE"}</span>
                              <span className="truncate">{d.name}</span>
                            </a>
                          ))}
                          {(project.documents ?? []).length > 3 && <p className={`text-[11px] ${mute}`}>+{(project.documents ?? []).length - 3} altri</p>}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </motion.section>

        {/* ═══ SECTION: TEAM ═══ */}
        <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }} className="space-y-4">
          <div className="flex items-center gap-3">
            <div className={`h-px flex-1 ${A ? "bg-gradient-to-r from-cyan-500/30 to-transparent" : "bg-gradient-to-r from-sky-300 to-transparent"}`} />
            <span className={`text-[11px] font-mono uppercase tracking-[0.2em] whitespace-nowrap flex items-center gap-1.5 ${mute}`}><Users size={12} /> Team</span>
            <div className={`h-px flex-1 ${A ? "bg-gradient-to-l from-cyan-500/30 to-transparent" : "bg-gradient-to-l from-sky-300 to-transparent"}`} />
          </div>
          {uniqueTeam.length === 0 ? (
            <div className={`text-center py-12 rounded-2xl border border-dashed ${A ? "border-stone-800/30" : "border-slate-200"}`}>
              <Users size={24} className={`mx-auto mb-2 ${mute}`} />
              <p className={`text-sm ${body}`}>Nessun membro del team assegnato.</p>
            </div>
          ) : (
            <div className={card}>
              <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />
              <div className="p-6">
                <div className="grid sm:grid-cols-2 gap-3">
                  {uniqueTeam.map((m: TeamMember, i: number) => {
                    const projectCount = projects.filter((p: Project) => (p.team_members ?? []).some((tm: TeamMember) => tm.user_id === m.user_id)).length;
                    return (
                      <div key={i} className={`flex items-center gap-3 p-3 rounded-xl border ${m.is_lead ? (A ? "border-cyan-500/20 bg-cyan-500/5" : "border-cyan-200 bg-cyan-50") : (A ? "border-stone-800/20" : "border-slate-200")}`}>
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${m.is_lead ? (A ? "bg-cyan-500/20 text-cyan-400" : "bg-cyan-100 text-cyan-700") : (A ? "bg-stone-800/30 text-slate-400" : "bg-slate-100 text-slate-500")}`}>
                          {m.is_lead ? <Crown size={14} /> : <User size={14} />}
                        </div>
                        <div className="min-w-0">
                          <p className={`text-sm font-medium ${A ? "text-slate-200" : "text-slate-800"}`}>{m.role}</p>
                          <p className={`text-[11px] font-mono ${mute}`}>{m.is_lead ? "Referente" : "Membro"} • {projectCount} progetto{projectCount !== 1 ? "i" : ""}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </motion.section>

        {/* ═══ SECTION: DOCUMENTI ═══ */}
        <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16 }} className="space-y-4">
          <div className="flex items-center gap-3">
            <div className={`h-px flex-1 ${A ? "bg-gradient-to-r from-cyan-500/30 to-transparent" : "bg-gradient-to-r from-sky-300 to-transparent"}`} />
            <span className={`text-[11px] font-mono uppercase tracking-[0.2em] whitespace-nowrap flex items-center gap-1.5 ${mute}`}><FileText size={12} /> Documenti</span>
            <div className={`h-px flex-1 ${A ? "bg-gradient-to-l from-cyan-500/30 to-transparent" : "bg-gradient-to-l from-sky-300 to-transparent"}`} />
          </div>
          {projects.flatMap((p: Project) => p.documents ?? []).length === 0 ? (
            <div className={`text-center py-12 rounded-2xl border border-dashed ${A ? "border-stone-800/30" : "border-slate-200"}`}>
              <FileText size={24} className={`mx-auto mb-2 ${mute}`} />
              <p className={`text-sm ${body}`}>Nessun documento caricato.</p>
            </div>
          ) : (
            <div className={card}>
              <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />
              <div className="p-6 space-y-1">
                {projects.flatMap((p: Project) => (p.documents ?? []).map((d: ProjectDocument, j: number) => ({ ...d, projectId: p._id, projectName: p.name, idx: j }))).map((doc, _i) => (
                  <div key={`${doc.projectId}-${doc.idx}`} className={`flex items-center gap-3 p-2.5 rounded-lg group ${A ? "hover:bg-stone-800/20" : "hover:bg-slate-50"}`}>
                    <span className={`w-7 h-6 rounded flex items-center justify-center text-[9px] font-mono font-bold shrink-0 ${A ? "bg-stone-800/40 text-slate-400" : "bg-slate-100 text-slate-500"}`}>{DOC_TYPE_ICONS[doc.type] ?? "FILE"}</span>
                    <div className="flex-1 min-w-0">
                      <a href={`${BASE_URL}${doc.url ?? ''}`} target="_blank" rel="noopener noreferrer" className={`text-sm truncate ${body} hover:text-cyan-400 transition-colors`}>{doc.name}</a>
                      <p className={`text-[10px] font-mono ${mute}`}>{doc.projectName} • {new Date(doc.uploaded_at).toLocaleDateString("it-IT")}</p>
                    </div>
                    <span className={`text-[10px] font-mono uppercase ${A ? "text-slate-600" : "text-slate-400"}`}>{doc.category === "requirements" ? "Requisiti" : doc.category === "contract" ? "Contratto" : doc.category === "report" ? "Report" : "Altro"}</span>
                    {isAdmin && (
                      <button onClick={() => handleDeleteDocument(doc.projectId as string, doc.name)} className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-red-500/10 text-red-400 transition-all" title="Elimina documento">
                        <Trash2 size={12} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          {/* Add document */}
          {isAdmin && (
            <div className="space-y-2">
              {addDocProjectId ? (
                <div className={`rounded-xl border p-4 space-y-3 backdrop-blur-sm ${A ? "border-cyan-500/20 bg-[#0E0E0D]/60" : "border-sky-200 bg-white"}`}>
                  <p className={`text-[11px] font-mono uppercase tracking-widest ${mute}`}>Nuovo documento</p>
                  <div className="flex flex-wrap items-center gap-2">
                    <select value={addDocProjectId} onChange={e => setAddDocProjectId(e.target.value)} className={`h-9 px-3 rounded-lg border text-xs ${A ? "bg-[#111110] border-stone-800/30 text-slate-200" : "bg-white border-slate-200 text-slate-900"}`}>
                      {projects.map((p: Project) => <option key={p._id} value={p._id}>{p.name}</option>)}
                    </select>
                    <select value={newDocCategory} onChange={e => setNewDocCategory(e.target.value as ProjectDocument["category"])} className={`h-9 px-3 rounded-lg border text-xs ${A ? "bg-[#111110] border-stone-800/30 text-slate-200" : "bg-white border-slate-200 text-slate-900"}`}>
                      <option value="requirements">Requisiti</option><option value="contract">Contratto</option><option value="report">Report</option><option value="other">Altro</option>
                    </select>
                    <label className={`h-9 px-3 rounded-lg border text-xs flex items-center gap-1.5 cursor-pointer transition-colors ${A ? "border-stone-800/30 text-slate-400 hover:text-slate-200 hover:border-stone-700/50" : "border-slate-200 text-slate-500 hover:text-slate-700"}`}>
                      <Upload size={11} />
                      {newDocFile ? newDocFile.name : "Scegli file"}
                      <input type="file" className="hidden" accept=".pdf,.xlsx,.docx,.txt" onChange={e => setNewDocFile(e.target.files?.[0] ?? null)} />
                    </label>
                    <button onClick={() => handleAddDocument(addDocProjectId)} disabled={uploadingDoc === addDocProjectId || !newDocFile}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-medium transition-colors disabled:opacity-40">
                      <Upload size={11} /> Carica
                    </button>
                    <button onClick={() => { setAddDocProjectId(null); setNewDocFile(null); }} className="px-2 py-1.5 rounded-lg text-xs text-slate-500 hover:text-slate-300">
                      Annulla
                    </button>
                  </div>
                </div>
              ) : (
                <button onClick={() => { setAddDocProjectId(projects[0]?._id ?? ""); setNewDocFile(null); }} className={`inline-flex items-center gap-1.5 text-xs font-medium transition-colors ${A ? "text-cyan-400 hover:text-cyan-300" : "text-cyan-600 hover:text-cyan-700"}`}>
                  <Plus size={12} /> Aggiungi documento
                </button>
              )}
            </div>
          )}
        </motion.section>

      </div>
    </main>
  );
}
