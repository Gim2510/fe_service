import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Briefcase,
  CheckCircle2,
  Clock,
  ListTodo,
  ArrowRight,
  AlertCircle,
} from "lucide-react";
import { useAuth } from "../auth/AuthContext.tsx";
import { useClientData } from "../hooks/useClientData.ts";
import { useProjects } from "../hooks/useProjects.ts";
import { useTheme } from "../Context/ThemeContext.tsx";
import { FallingLines } from "react-loader-spinner";
import { PROJECT_STATUS_LABELS } from "../types/clientTypes.ts";
import type { Project, ProjectStatus } from "../types/clientTypes.ts";

const STATUS_STYLE: Record<
  ProjectStatus,
  { text: string; bg: string; border: string; dot: string }
> = {
  planning: {
    text: "text-slate-400",
    bg: "bg-slate-500/10",
    border: "border-slate-500/20",
    dot: "bg-slate-500",
  },
  active: {
    text: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
    dot: "bg-cyan-500",
  },
  on_hold: {
    text: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    dot: "bg-amber-500",
  },
  completed: {
    text: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    dot: "bg-emerald-500",
  },
  cancelled: {
    text: "text-red-400",
    bg: "bg-red-500/10",
    border: "border-red-500/20",
    dot: "bg-red-500",
  },
};

export function ClientProjects() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { isAuthenticated } = useAuth();
  const { client, loading: clientLoading, error: clientError } = useClientData();
  const { projects, loading: projectsLoading } = useProjects(client?._id ?? null);

  const loading = clientLoading || projectsLoading;

  const activeProjects = projects.filter((p) => p.status === "active").length;
  const completedProjects = projects.filter((p) => p.status === "completed").length;
  const totalTasks = projects.reduce((sum, p) => sum + (p.task_count ?? 0), 0);
  const avgProgress = projects.length > 0
    ? Math.round(projects.reduce((sum, p) => sum + (p.progress ?? 0), 0) / projects.length)
    : 0;

  if (!isAuthenticated) {
    return (
      <main className={`relative min-h-screen flex items-center justify-center ${isDark ? "bg-[#0E0E0D]" : "bg-[#FAFAF8]"}`}>
        <p className={isDark ? "text-slate-400" : "text-slate-600"}>
          Devi effettuare l&apos;accesso per visualizzare questa pagina.
        </p>
      </main>
    );
  }

  return (
    <main className={`relative min-h-screen overflow-hidden ${isDark ? "bg-[#0E0E0D] text-white" : "bg-[#FAFAF8] text-slate-900"}`}>
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <FallingLines width="60" color="#fff" visible />
        </div>
      )}

      <div
        className={`absolute inset-0 pointer-events-none ${isDark ? "opacity-[0.04]" : "opacity-[0.12]"}`}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48'%3E%3Crect x='0' y='0' width='48' height='48' fill='none' stroke='${isDark ? "%2306B6D4" : "%23453A30"}' stroke-width='0.4'/%3E%3C/svg%3E")`,
          backgroundSize: "48px 48px",
        }}
      />
      {isDark && (
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-950/20 via-transparent to-transparent pointer-events-none" />
      )}

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-32 space-y-16">
        {clientError && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-6 pt-20"
          >
            <div className={`inline-flex items-center gap-3 px-5 py-3 rounded-xl border ${isDark ? "border-red-500/20 bg-red-500/5 text-red-400" : "border-red-200 bg-red-50 text-red-600"}`}>
              <AlertCircle size={20} />
              <span className="text-sm">Nessun profilo cliente associato a questo account.</span>
            </div>
          </motion.div>
        )}

        {client && !loading && (
          <>
            <motion.header
              className="space-y-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
                <div className="space-y-3">
                  <span
                    className={`inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] px-3 py-1.5 rounded-full border ${
                      isDark
                        ? "text-cyan-400 border-cyan-500/20 bg-cyan-950/30"
                        : "text-sky-700 border-sky-300 bg-sky-50"
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
                    Client Dashboard
                  </span>
                  <h1 className={`font-fjalla text-4xl sm:text-5xl font-semibold leading-tight ${isDark ? "text-slate-100" : "text-slate-900"}`}>
                    {client.company_name}
                  </h1>
                  <div className="flex flex-wrap gap-2">
                    <span className={`text-xs font-mono uppercase tracking-wider px-2 py-1 rounded-md border ${isDark ? "text-slate-400 border-stone-800/30 bg-stone-900/30" : "text-slate-500 border-slate-200 bg-slate-50"}`}>
                      {client.industry ?? "Settore non specificato"}
                    </span>
                    {client.city && (
                      <span className={`text-xs font-mono uppercase tracking-wider px-2 py-1 rounded-md border ${isDark ? "text-slate-400 border-stone-800/30 bg-stone-900/30" : "text-slate-500 border-slate-200 bg-slate-50"}`}>
                        {client.city}
                      </span>
                    )}
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate(`/client/new`)}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg shadow-cyan-500/25`}
                >
                  <Briefcase size={16} />
                  Nuovo Progetto
                </motion.button>
              </div>

              <div className={`h-px w-full bg-gradient-to-r from-transparent via-cyan-500/60 to-transparent`} />

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Progetti Attivi", value: activeProjects, icon: <Briefcase size={16} />, color: "text-cyan-400" },
                  { label: "Completati", value: completedProjects, icon: <CheckCircle2 size={16} />, color: "text-emerald-400" },
                  { label: "Task Totali", value: totalTasks, icon: <ListTodo size={16} />, color: "text-amber-400" },
                  { label: "Progresso Medio", value: `${avgProgress}%`, icon: <Clock size={16} />, color: "text-blue-400" },
                ].map((kpi) => (
                  <div
                    key={kpi.label}
                    className={`relative rounded-xl border backdrop-blur-sm p-4 ${isDark ? "bg-[#0E0E0D]/70 border-stone-800/30" : "bg-white/80 border-slate-200"}`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className={kpi.color}>{kpi.icon}</span>
                      <span className={`text-[10px] font-mono uppercase tracking-wider ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                        {kpi.label}
                      </span>
                    </div>
                    <p className={`text-2xl font-semibold tabular-nums ${isDark ? "text-slate-100" : "text-slate-900"}`}>
                      {kpi.value}
                    </p>
                  </div>
                ))}
              </div>
            </motion.header>

            {projects.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-center py-20 space-y-4"
              >
                <Briefcase size={48} className={`mx-auto ${isDark ? "text-stone-700" : "text-slate-300"}`} />
                <p className={`text-lg ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                  Nessun progetto ancora creato.
                </p>
                <button
                  onClick={() => navigate(`/client/new`)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-cyan-600 hover:bg-cyan-500 text-white transition-all duration-200"
                >
                  Crea il tuo primo progetto
                  <ArrowRight size={14} />
                </button>
              </motion.div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project, i) => (
                  <ProjectCard
                    key={project._id}
                    project={project}
                    index={i}
                    isDark={isDark}
                    onClick={() => navigate(`/client/${project._id}`)}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}

function ProjectCard({
  project,
  index,
  isDark,
  onClick,
}: {
  project: Project;
  index: number;
  isDark: boolean;
  onClick: () => void;
}) {
  const st = STATUS_STYLE[project.status] ?? STATUS_STYLE.planning;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: "easeOut" }}
    >
      <motion.button
        onClick={onClick}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
        className={`w-full text-left relative rounded-2xl border overflow-hidden backdrop-blur-sm transition-all duration-200 ${
          isDark
            ? "bg-[#0E0E0D]/70 border-cyan-500/30 shadow-lg shadow-cyan-500/10 hover:shadow-cyan-500/20 hover:border-cyan-500/50"
            : "bg-white/80 border-slate-200 shadow-sm hover:shadow-md"
        }`}
      >
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-cyan-500/60 to-transparent" />

        <div className="p-6 space-y-4">
          <div className="flex items-start justify-between gap-3">
            <h3 className={`text-lg font-semibold leading-snug line-clamp-2 ${isDark ? "text-slate-100" : "text-slate-900"}`}>
              {project.name}
            </h3>
            <span className={`shrink-0 inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-md border ${st.bg} ${st.border} ${st.text}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${st.dot}`} />
              {PROJECT_STATUS_LABELS[project.status]}
            </span>
          </div>

          {project.description && (
            <p className={`text-sm line-clamp-2 ${isDark ? "text-slate-400" : "text-slate-500"}`}>
              {project.description}
            </p>
          )}

          <div className="space-y-2">
            {(project.progress !== undefined || project.progress !== null) && (
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] font-mono">
                  <span className={isDark ? "text-slate-500" : "text-slate-400"}>Progresso</span>
                  <span className={isDark ? "text-cyan-400" : "text-cyan-600"}>{project.progress ?? 0}%</span>
                </div>
                <div className={`h-2 rounded-full overflow-hidden ${isDark ? "bg-stone-800" : "bg-slate-200"}`}>
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-600 to-cyan-400"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${project.progress ?? 0}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-4 pt-2 border-t border-stone-800/20">
            <div className="flex items-center gap-1.5">
              <ListTodo size={13} className={isDark ? "text-slate-500" : "text-slate-400"} />
              <span className={`text-xs font-mono ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                {project.task_count ?? 0} task
              </span>
            </div>
            {project.deadline && (
              <div className="flex items-center gap-1.5">
                <Clock size={13} className={isDark ? "text-slate-500" : "text-slate-400"} />
                <span className={`text-xs font-mono ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                  {new Date(project.deadline).toLocaleDateString("it-IT")}
                </span>
              </div>
            )}
            <div className="ml-auto">
              <ArrowRight size={14} className={isDark ? "text-cyan-500" : "text-sky-500"} />
            </div>
          </div>
        </div>
      </motion.button>
    </motion.div>
  );
}
