import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Plus,
  MessageSquare,
  X,
  Send,
  Calendar,
  Users,
  Edit3,
  GanttChart,
  Columns3,
} from "lucide-react";
import { useAuth } from "../auth/AuthContext.tsx";
import { useClientData } from "../hooks/useClientData.ts";
import { useProjects } from "../hooks/useProjects.ts";
import { useProjectTasks } from "../hooks/useProjectTasks.ts";
import { useTheme } from "../Context/ThemeContext.tsx";
import { FallingLines } from "react-loader-spinner";
import {
  TASK_STATUS_LABELS,
  PROJECT_STATUS_LABELS,
  PRIORITY_LABELS,
  PRIORITY_COLORS,
  STATUS_COLORS,
} from "../types/clientTypes.ts";
import type { Task, TaskStatus, TaskPriority } from "../types/clientTypes.ts";

type ViewMode = "timeline" | "board";

const BOARD_COLUMNS: TaskStatus[] = ["backlog", "in_progress", "in_review", "completed"];

export function ClientProjectDetail() {
  const { project_id } = useParams<{ project_id: string }>();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { role } = useAuth();
  const isAdmin = role === "ADMIN";

  const { client, loading: clientLoading } = useClientData();
  const { projects, loading: projectsLoading } = useProjects(client?._id ?? null);
  const project = projects.find((p) => p._id === project_id) ?? null;
  const {
    tasks,
    loading: tasksLoading,
    createTask,
    updateTask,
    addComment,
    refetch,
  } = useProjectTasks(project_id ?? null);

  const [viewMode, setViewMode] = useState<ViewMode>("board");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showNewTask, setShowNewTask] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loading = clientLoading || projectsLoading || tasksLoading;

  const handleCreateTask = async (payload: {
    title: string;
    description?: string;
    priority: TaskPriority;
    start_date?: string;
    deadline?: string;
  }) => {
    setIsSubmitting(true);
    try {
      await createTask(payload);
      setShowNewTask(false);
    } catch {
      // error handled in hook
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateTask = async (
    taskId: string,
    payload: Partial<Pick<Task, "title" | "description" | "status" | "priority" | "start_date" | "deadline">>,
  ) => {
    try {
      await updateTask(taskId, payload);
    } catch {
      await refetch();
    }
  };

  const handleAddComment = async (taskId: string, text: string) => {
    try {
      await addComment(taskId, text);
      await refetch();
    } catch {
      // error handled in hook
    }
  };

  const handleStatusChange = async (taskId: string, newStatus: TaskStatus) => {
    await handleUpdateTask(taskId, { status: newStatus });
  };

  if (loading) {
    return (
      <main className={`relative min-h-screen flex items-center justify-center ${isDark ? "bg-[#0E0E0D]" : "bg-[#FAFAF8]"}`}>
        <FallingLines width="60" color={isDark ? "#fff" : "#333"} visible />
      </main>
    );
  }

  if (!project) {
    return (
      <main className={`relative min-h-screen flex items-center justify-center ${isDark ? "bg-[#0E0E0D]" : "bg-[#FAFAF8]"}`}>
        <div className="text-center space-y-4">
          <p className={`text-lg ${isDark ? "text-slate-400" : "text-slate-600"}`}>
            Progetto non trovato.
          </p>
          <button
            onClick={() => navigate("/client/all_projects")}
            className="inline-flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300"
          >
            <ArrowLeft size={14} />
            Torna ai progetti
          </button>
        </div>
      </main>
    );
  }

  const projectSt = STATUS_COLORS[project.status as TaskStatus] ?? STATUS_COLORS.backlog;

  return (
    <main className={`relative min-h-screen overflow-hidden ${isDark ? "bg-[#0E0E0D] text-white" : "bg-[#FAFAF8] text-slate-900"}`}>
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

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-32 space-y-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="space-y-6"
        >
          <button
            onClick={() => navigate("/client/all_projects")}
            className={`inline-flex items-center gap-1.5 text-sm transition-colors ${isDark ? "text-slate-400 hover:text-slate-200" : "text-slate-500 hover:text-slate-700"}`}
          >
            <ArrowLeft size={14} />
            Torna ai progetti
          </button>

          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
            <div className="space-y-3 flex-1">
              <span
                className={`inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] px-3 py-1.5 rounded-full border ${
                  isDark
                    ? "text-cyan-400 border-cyan-500/20 bg-cyan-950/30"
                    : "text-sky-700 border-sky-300 bg-sky-50"
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
                {client?.company_name ?? "Cliente"}
              </span>
              <h1 className={`font-fjalla text-3xl sm:text-4xl font-semibold leading-tight ${isDark ? "text-slate-100" : "text-slate-900"}`}>
                {project.name}
              </h1>
              {project.description && (
                <p className={`text-sm max-w-2xl ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                  {project.description}
                </p>
              )}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <span className={`inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-md border ${projectSt.bg} ${projectSt.border} ${projectSt.text}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${projectSt.text.replace("text-", "bg-")}`} />
                  {PROJECT_STATUS_LABELS[project.status]}
                </span>
                {project.start_date && (
                  <span className={`text-xs font-mono ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                    {new Date(project.start_date).toLocaleDateString("it-IT")} - {project.deadline ? new Date(project.deadline).toLocaleDateString("it-IT") : "In corso"}
                  </span>
                )}
                {project.deadline && (
                  <span className={`text-xs font-mono px-2 py-1 rounded-md border ${isDark ? "text-slate-400 border-stone-800/30 bg-stone-900/30" : "text-slate-500 border-slate-200 bg-slate-50"}`}>
                    Scadenza: {new Date(project.deadline).toLocaleDateString("it-IT")}
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <div className={`flex rounded-xl border p-0.5 ${isDark ? "border-stone-800/30 bg-stone-900/30" : "border-slate-200 bg-slate-100"}`}>
                {([{ mode: "board" as const, icon: Columns3, label: "Board" }, { mode: "timeline" as const, icon: GanttChart, label: "Timeline" }] as const).map(({ mode, icon: Icon, label }) => (
                  <button
                    key={mode}
                    onClick={() => setViewMode(mode)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                      viewMode === mode
                        ? isDark
                          ? "bg-stone-800 text-slate-200"
                          : "bg-white text-slate-900 shadow-sm"
                        : isDark
                          ? "text-slate-500 hover:text-slate-300"
                          : "text-slate-400 hover:text-slate-600"
                    }`}
                  >
                    <Icon size={14} />
                    {label}
                  </button>
                ))}
              </div>
              {isAdmin && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowNewTask(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg shadow-cyan-500/25 transition-all duration-200"
                >
                  <Plus size={16} />
                  Nuovo Task
                </motion.button>
              )}
            </div>
          </div>

          <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan-500/60 to-transparent" />
        </motion.div>

        {/* View Content */}
        <AnimatePresence mode="wait">
          {viewMode === "board" ? (
            <BoardView
              key="board"
              tasks={tasks}
              isDark={isDark}
              isAdmin={isAdmin}
              onStatusChange={handleStatusChange}
              onTaskClick={setSelectedTask}
            />
          ) : (
            <TimelineView
              key="timeline"
              tasks={tasks}
              isDark={isDark}
              onTaskClick={setSelectedTask}
            />
          )}
        </AnimatePresence>

        {/* Task Detail Modal */}
        <AnimatePresence>
          {selectedTask && (
            <TaskDetailModal
              task={selectedTask}
              isDark={isDark}
              isAdmin={isAdmin}
              onClose={() => setSelectedTask(null)}
              onUpdate={(payload) => handleUpdateTask(selectedTask._id, payload)}
              onAddComment={(text) => handleAddComment(selectedTask._id, text)}
            />
          )}
        </AnimatePresence>

        {/* New Task Modal */}
        <AnimatePresence>
          {showNewTask && (
            <NewTaskModal
              isDark={isDark}
              isSubmitting={isSubmitting}
              onClose={() => setShowNewTask(false)}
              onCreate={handleCreateTask}
            />
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}

/* ─── Board View ─── */
function BoardView({
  tasks,
  isDark,
  isAdmin,
  onStatusChange,
  onTaskClick,
}: {
  tasks: Task[];
  isDark: boolean;
  isAdmin: boolean;
  onStatusChange: (taskId: string, newStatus: TaskStatus) => void;
  onTaskClick: (task: Task) => void;
}) {
  const tasksByStatus = (status: TaskStatus) => tasks.filter((t) => t.status === status);
  const [dragOverStatus, setDragOverStatus] = useState<TaskStatus | null>(null);

  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    e.dataTransfer.setData("text/plain", taskId);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent, status: TaskStatus) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOverStatus(status);
  };

  const handleDragLeave = () => setDragOverStatus(null);

  const handleDrop = (e: React.DragEvent, status: TaskStatus) => {
    e.preventDefault();
    setDragOverStatus(null);
    const taskId = e.dataTransfer.getData("text/plain");
    if (taskId) onStatusChange(taskId, status);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
    >
      {BOARD_COLUMNS.map((status, colIdx) => {
        const colTasks = tasksByStatus(status);
        const st = STATUS_COLORS[status];
        const isDragTarget = dragOverStatus === status;

        return (
          <motion.div
            key={status}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: colIdx * 0.06 }}
            onDragOver={isAdmin ? (e) => handleDragOver(e, status) : undefined}
            onDragLeave={isAdmin ? handleDragLeave : undefined}
            onDrop={isAdmin ? (e) => handleDrop(e, status) : undefined}
            className={`rounded-2xl border backdrop-blur-sm p-4 transition-all duration-200 ${
              isDragTarget
                ? (isDark ? "border-cyan-500/60 bg-cyan-500/5 shadow-lg shadow-cyan-500/10" : "border-cyan-400 bg-cyan-50")
                : (isDark ? "bg-[#0E0E0D]/50 border-stone-800/30" : "bg-white/70 border-slate-200")
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${st.text.replace("text-", "bg-")}`} />
                <h3 className={`text-xs font-mono uppercase tracking-wider ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                  {TASK_STATUS_LABELS[status]}
                </h3>
              </div>
              <span className={`text-xs font-mono tabular-nums ${isDark ? "text-slate-600" : "text-slate-400"}`}>
                {colTasks.length}
              </span>
            </div>

            <div className={`space-y-3 min-h-[120px] rounded-xl transition-colors duration-200 ${isDragTarget && isDark ? "bg-cyan-500/3" : ""} ${isDragTarget && !isDark ? "bg-cyan-50/50" : ""}`}>
              {colTasks.map((task, taskIdx) => (
                <BoardTaskCard
                  key={task._id}
                  task={task}
                  index={taskIdx}
                  isDark={isDark}
                  isAdmin={isAdmin}
                  onStatusChange={onStatusChange}
                  onClick={() => onTaskClick(task)}
                  onDragStart={isAdmin ? (e) => handleDragStart(e, task._id) : undefined}
                />
              ))}
              {colTasks.length === 0 && (
                <div className={`text-center py-8 rounded-xl border border-dashed ${isDark ? "border-stone-800/30" : "border-slate-200"}`}>
                  <p className={`text-xs font-mono ${isDark ? "text-slate-700" : "text-slate-400"}`}>
                    {isDragTarget ? "Rilascia qui" : "Nessun task"}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

/* ─── Board Task Card ─── */
function BoardTaskCard({
  task,
  index,
  isDark,
  isAdmin,
  onStatusChange,
  onClick,
  onDragStart,
}: {
  task: Task;
  index: number;
  isDark: boolean;
  isAdmin: boolean;
  onStatusChange: (taskId: string, newStatus: TaskStatus) => void;
  onClick: () => void;
  onDragStart?: (e: React.DragEvent) => void;
}) {
  const pr = PRIORITY_COLORS[task.priority];
  const statusIdx = BOARD_COLUMNS.indexOf(task.status);
  const [isDragging, setIsDragging] = useState(false);

  return (
    <motion.button
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: index * 0.04 }}
      onClick={onClick}
      draggable={!!onDragStart}
      onDragStart={(e) => { setIsDragging(true); onDragStart?.(e); }}
      onDragEnd={() => setIsDragging(false)}
      className={`w-full text-left rounded-xl border p-3.5 backdrop-blur-sm transition-all duration-200 cursor-grab active:cursor-grabbing ${
        isDragging ? "opacity-50" : ""
      } ${
        isDark
          ? "bg-[#0A0A09]/60 border-stone-800/30 hover:border-cyan-500/30 hover:bg-stone-900/40"
          : "bg-white border-slate-200 hover:border-sky-300 hover:shadow-sm"
      }`}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <h4 className={`text-sm font-medium leading-snug ${isDark ? "text-slate-200" : "text-slate-800"}`}>
          {task.title}
        </h4>
        <span className={`shrink-0 text-[9px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded ${pr.bg} ${pr.border} ${pr.text}`}>
          {PRIORITY_LABELS[task.priority]}
        </span>
      </div>

      <div className="flex items-center gap-3 text-[10px] font-mono">
        {task.assigned_to && task.assigned_to.length > 0 && (
          <span className={`flex items-center gap-1 ${isDark ? "text-slate-500" : "text-slate-400"}`}>
            <Users size={10} />
            {task.assigned_to.length}
          </span>
        )}
        {task.deadline && (
          <span className={isDark ? "text-slate-500" : "text-slate-400"}>
            {new Date(task.deadline).toLocaleDateString("it-IT")}
          </span>
        )}
      </div>

      {isAdmin && (
        <div className="flex items-center gap-1 mt-3 pt-2.5 border-t border-stone-800/10">
          {statusIdx > 0 && (
            <button
              onClick={(e) => { e.stopPropagation(); onStatusChange(task._id, BOARD_COLUMNS[statusIdx - 1]); }}
              className={`text-[10px] font-mono px-2 py-0.5 rounded hover:bg-stone-800/30 ${isDark ? "text-slate-500 hover:text-slate-300" : "text-slate-400 hover:text-slate-600"}`}
              title={`Sposta a ${TASK_STATUS_LABELS[BOARD_COLUMNS[statusIdx - 1]]}`}
            >
              ←
            </button>
          )}
          <div className="flex-1" />
          {statusIdx < BOARD_COLUMNS.length - 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); onStatusChange(task._id, BOARD_COLUMNS[statusIdx + 1]); }}
              className={`text-[10px] font-mono px-2 py-0.5 rounded hover:bg-stone-800/30 ${isDark ? "text-slate-500 hover:text-slate-300" : "text-slate-400 hover:text-slate-600"}`}
              title={`Sposta a ${TASK_STATUS_LABELS[BOARD_COLUMNS[statusIdx + 1]]}`}
            >
              →
            </button>
          )}
        </div>
      )}
    </motion.button>
  );
}

/* ─── Timeline View ─── */
function TimelineView({
  tasks,
  isDark,
  onTaskClick,
}: {
  tasks: Task[];
  isDark: boolean;
  onTaskClick: (task: Task) => void;
}) {
  const sorted = [...tasks].sort((a, b) => {
    if (!a.start_date) return 1;
    if (!b.start_date) return -1;
    return new Date(a.start_date).getTime() - new Date(b.start_date).getTime();
  });

  const allDates = sorted.flatMap((t) => [t.start_date, t.deadline].filter(Boolean) as string[]);
  const minDate = allDates.length > 0
    ? new Date(Math.min(...allDates.map((d) => new Date(d).getTime())))
    : new Date();
  const maxDate = allDates.length > 0
    ? new Date(Math.max(...allDates.map((d) => new Date(d).getTime())))
    : new Date(Date.now() + 30 * 86400000);

  const totalDays = Math.max(1, Math.ceil((maxDate.getTime() - minDate.getTime()) / 86400000));

  const monthLabels: { label: string; left: number }[] = [];
  const current = new Date(minDate);
  current.setDate(1);
  while (current <= maxDate) {
    const left = ((current.getTime() - minDate.getTime()) / (maxDate.getTime() - minDate.getTime())) * 100;
    monthLabels.push({
      label: current.toLocaleDateString("it-IT", { month: "short", year: "2-digit" }),
      left,
    });
    current.setMonth(current.getMonth() + 1);
  }

  if (sorted.length === 0) {
    return (
      <div className={`text-center py-20 rounded-2xl border ${isDark ? "border-stone-800/30 bg-[#0E0E0D]/30" : "border-slate-200 bg-white/30"}`}>
        <GanttChart size={40} className={`mx-auto mb-3 ${isDark ? "text-stone-700" : "text-slate-300"}`} />
        <p className={isDark ? "text-slate-500" : "text-slate-400"}>Nessun task ancora creato.</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className={`rounded-2xl border backdrop-blur-sm overflow-hidden ${isDark ? "bg-[#0E0E0D]/50 border-stone-800/30" : "bg-white/70 border-slate-200"}`}
    >
      <div className="flex">
        {/* Left labels column */}
        <div className="shrink-0 w-56 border-r border-stone-800/20">
          <div className="h-10 border-b border-stone-800/20 px-4 flex items-center">
            <span className={`text-[10px] font-mono uppercase tracking-wider ${isDark ? "text-slate-500" : "text-slate-400"}`}>
              Task
            </span>
          </div>
          {sorted.map((task, i) => {
            const pr = PRIORITY_COLORS[task.priority];
            return (
              <motion.button
                key={task._id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: i * 0.03 }}
                onClick={() => onTaskClick(task)}
                className={`w-full text-left px-4 py-3 border-b border-stone-800/10 transition-colors ${isDark ? "hover:bg-stone-900/30" : "hover:bg-slate-50"}`}
                style={{ height: "56px" }}
              >
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-medium truncate ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                    {task.title}
                  </span>
                  <span className={`shrink-0 text-[9px] font-mono uppercase px-1.5 py-0.5 rounded ${pr.bg} ${pr.border} ${pr.text}`}>
                    {PRIORITY_LABELS[task.priority]}
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Right gantt area */}
        <div className="flex-1 overflow-x-auto">
          <div style={{ minWidth: `${totalDays * 2}px` }}>
            {/* Month header */}
            <div className="h-10 border-b border-stone-800/20 relative">
              {monthLabels.map((m) => (
                <span
                  key={m.label}
                  className={`absolute top-1/2 -translate-y-1/2 text-[10px] font-mono ${isDark ? "text-slate-500" : "text-slate-400"}`}
                  style={{ left: `${m.left}%` }}
                >
                  {m.label}
                </span>
              ))}
            </div>

            {/* Bars */}
            {sorted.map((task, i) => {
              const pr = PRIORITY_COLORS[task.priority];
              const start = task.start_date ? new Date(task.start_date) : new Date(minDate);
              const end = task.deadline ? new Date(task.deadline) : new Date(start.getTime() + 7 * 86400000);
              const left = Math.max(0, ((start.getTime() - minDate.getTime()) / (maxDate.getTime() - minDate.getTime())) * 100);
              const width = Math.max(2, ((end.getTime() - start.getTime()) / (maxDate.getTime() - minDate.getTime())) * 100);

              return (
                <div
                  key={task._id}
                  className="border-b border-stone-800/10 relative"
                  style={{ height: "56px" }}
                >
                  <motion.button
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    transition={{ duration: 0.3, delay: i * 0.04 }}
                    onClick={() => onTaskClick(task)}
                    className={`absolute top-2 bottom-2 rounded-lg border cursor-pointer transition-all duration-200 hover:brightness-110 ${pr.bar.replace("bg-", "bg-")}/80 ${pr.border}`}
                    style={{ left: `${left}%`, width: `${width}%` }}
                    title={`${task.title}: ${start.toLocaleDateString("it-IT")} - ${end.toLocaleDateString("it-IT")}`}
                  >
                    <span className="absolute inset-0 flex items-center px-2 text-[10px] font-mono text-white/80 truncate">
                      {task.title}
                    </span>
                  </motion.button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Task Detail Modal ─── */
function TaskDetailModal({
  task,
  isDark,
  isAdmin,
  onClose,
  onUpdate,
  onAddComment,
}: {
  task: Task;
  isDark: boolean;
  isAdmin: boolean;
  onClose: () => void;
  onUpdate: (payload: Partial<Pick<Task, "title" | "description" | "status" | "priority" | "start_date" | "deadline">>) => Promise<void>;
  onAddComment: (text: string) => Promise<void>;
}) {
  const pr = PRIORITY_COLORS[task.priority];
  const st = STATUS_COLORS[task.status];
  const [isEditing, setIsEditing] = useState(false);
  const [comment, setComment] = useState("");
  const [sending, setSending] = useState(false);
  const [editForm, setEditForm] = useState({
    title: task.title,
    description: task.description ?? "",
    priority: task.priority,
    status: task.status,
    start_date: task.start_date ?? "",
    deadline: task.deadline ?? "",
  });

  const handleSendComment = async () => {
    if (!comment.trim()) return;
    setSending(true);
    try {
      await onAddComment(comment.trim());
      setComment("");
    } catch {
      // error handled in hook
    } finally {
      setSending(false);
    }
  };

  const handleSaveEdit = async () => {
    try {
      await onUpdate({
        title: editForm.title,
        description: editForm.description,
        priority: editForm.priority,
        status: editForm.status,
        start_date: editForm.start_date || undefined,
        deadline: editForm.deadline || undefined,
      });
      setIsEditing(false);
    } catch {
      // error handled in hook
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 pb-10 px-4"
      onClick={onClose}
    >
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
        className={`relative z-10 w-full max-w-2xl max-h-[80vh] overflow-y-auto rounded-2xl border backdrop-blur-sm ${
          isDark
            ? "bg-[#0E0E0D]/95 border-cyan-500/30 shadow-lg shadow-cyan-500/10"
            : "bg-white/95 border-slate-200 shadow-xl"
        }`}
      >
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-cyan-500/60 to-transparent" />

        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2 flex-1 min-w-0">
              {isEditing ? (
                <input
                  value={editForm.title}
                  onChange={(e) => setEditForm((f) => ({ ...f, title: e.target.value }))}
                  className={`w-full text-xl font-semibold bg-transparent border-b outline-none ${isDark ? "text-slate-100 border-stone-700" : "text-slate-900 border-slate-300"}`}
                />
              ) : (
                <h2 className={`text-xl font-semibold ${isDark ? "text-slate-100" : "text-slate-900"}`}>
                  {task.title}
                </h2>
              )}
              <div className="flex flex-wrap items-center gap-2">
                <span className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-md border ${pr.bg} ${pr.border} ${pr.text}`}>
                  {PRIORITY_LABELS[task.priority]}
                </span>
                <span className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-md border ${st.bg} ${st.border} ${st.text}`}>
                  {TASK_STATUS_LABELS[task.status]}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {isAdmin && !isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className={`p-2 rounded-lg transition-colors ${isDark ? "text-slate-400 hover:text-slate-200 hover:bg-stone-800" : "text-slate-500 hover:text-slate-700 hover:bg-slate-100"}`}
                >
                  <Edit3 size={16} />
                </button>
              )}
              <button
                onClick={onClose}
                className={`p-2 rounded-lg transition-colors ${isDark ? "text-slate-400 hover:text-slate-200 hover:bg-stone-800" : "text-slate-500 hover:text-slate-700 hover:bg-slate-100"}`}
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Edit form */}
          {isEditing && (
            <div className="space-y-4 p-4 rounded-xl border border-cyan-500/20 bg-cyan-500/5">
              <div>
                <label className={`text-[10px] font-mono uppercase tracking-wider block mb-1 ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                  Priorità
                </label>
                <select
                  value={editForm.priority}
                  onChange={(e) => setEditForm((f) => ({ ...f, priority: e.target.value as TaskPriority }))}
                  className={`w-full rounded-lg border px-3 py-2 text-sm ${isDark ? "bg-stone-900 border-stone-700 text-slate-200" : "bg-white border-slate-300 text-slate-800"}`}
                >
                  {Object.entries(PRIORITY_LABELS).map(([k, v]) => (
                    <option key={k} value={k}>{v}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={`text-[10px] font-mono uppercase tracking-wider block mb-1 ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                  Stato
                </label>
                <select
                  value={editForm.status}
                  onChange={(e) => setEditForm((f) => ({ ...f, status: e.target.value as TaskStatus }))}
                  className={`w-full rounded-lg border px-3 py-2 text-sm ${isDark ? "bg-stone-900 border-stone-700 text-slate-200" : "bg-white border-slate-300 text-slate-800"}`}
                >
                  {Object.entries(TASK_STATUS_LABELS).map(([k, v]) => (
                    <option key={k} value={k}>{v}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`text-[10px] font-mono uppercase tracking-wider block mb-1 ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                    Data Inizio
                  </label>
                  <input
                    type="date"
                    value={editForm.start_date ? editForm.start_date.slice(0, 10) : ""}
                    onChange={(e) => setEditForm((f) => ({ ...f, start_date: e.target.value }))}
                    className={`w-full rounded-lg border px-3 py-2 text-sm ${isDark ? "bg-stone-900 border-stone-700 text-slate-200" : "bg-white border-slate-300 text-slate-800"}`}
                  />
                </div>
                <div>
                  <label className={`text-[10px] font-mono uppercase tracking-wider block mb-1 ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                    Scadenza
                  </label>
                  <input
                    type="date"
                    value={editForm.deadline ? editForm.deadline.slice(0, 10) : ""}
                    onChange={(e) => setEditForm((f) => ({ ...f, deadline: e.target.value }))}
                    className={`w-full rounded-lg border px-3 py-2 text-sm ${isDark ? "bg-stone-900 border-stone-700 text-slate-200" : "bg-white border-slate-300 text-slate-800"}`}
                  />
                </div>
              </div>
              <div>
                <label className={`text-[10px] font-mono uppercase tracking-wider block mb-1 ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                  Descrizione
                </label>
                <textarea
                  value={editForm.description}
                  onChange={(e) => setEditForm((f) => ({ ...f, description: e.target.value }))}
                  rows={3}
                  className={`w-full rounded-lg border px-3 py-2 text-sm resize-none ${isDark ? "bg-stone-900 border-stone-700 text-slate-200" : "bg-white border-slate-300 text-slate-800"}`}
                />
              </div>
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={handleSaveEdit}
                  className="px-4 py-2 rounded-xl text-sm font-semibold bg-cyan-600 hover:bg-cyan-500 text-white transition-all duration-200"
                >
                  Salva modifiche
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${isDark ? "text-slate-400 hover:text-slate-200" : "text-slate-500 hover:text-slate-700"}`}
                >
                  Annulla
                </button>
              </div>
            </div>
          )}

          {/* Description */}
          {task.description && !isEditing && (
            <div className="space-y-2">
              <h3 className={`text-xs font-mono uppercase tracking-wider ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                Descrizione
              </h3>
              <p className={`text-sm leading-relaxed ${isDark ? "text-slate-300" : "text-slate-600"}`}>
                {task.description}
              </p>
            </div>
          )}

          {/* Dates & Assignees */}
          <div className={`flex flex-wrap gap-6 p-4 rounded-xl border ${isDark ? "border-stone-800/30 bg-[#0A0A09]/50" : "border-slate-200 bg-slate-50"}`}>
            {task.start_date && (
              <div className="space-y-1">
                <span className={`text-[10px] font-mono uppercase tracking-wider ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                  Inizio
                </span>
                <p className={`text-sm flex items-center gap-1.5 ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                  <Calendar size={13} />
                  {new Date(task.start_date).toLocaleDateString("it-IT")}
                </p>
              </div>
            )}
            {task.deadline && (
              <div className="space-y-1">
                <span className={`text-[10px] font-mono uppercase tracking-wider ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                  Scadenza
                </span>
                <p className={`text-sm flex items-center gap-1.5 ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                  <Calendar size={13} />
                  {new Date(task.deadline).toLocaleDateString("it-IT")}
                </p>
              </div>
            )}
            {task.assigned_to && task.assigned_to.length > 0 && (
              <div className="space-y-1">
                <span className={`text-[10px] font-mono uppercase tracking-wider ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                  Assegnato a
                </span>
                <p className={`text-sm flex items-center gap-1.5 ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                  <Users size={13} />
                  {task.assigned_to.length} utenti
                </p>
              </div>
            )}
          </div>

          {/* Comments */}
          <div className="space-y-4">
            <h3 className={`text-xs font-mono uppercase tracking-wider flex items-center gap-2 ${isDark ? "text-slate-500" : "text-slate-400"}`}>
              <MessageSquare size={12} />
              Commenti ({task.comments?.length ?? 0})
            </h3>

            <div className="space-y-3 max-h-[200px] overflow-y-auto">
              {task.comments && task.comments.length > 0 ? (
                task.comments.map((c) => (
                  <div
                    key={c._id}
                    className={`rounded-xl border p-3 ${isDark ? "bg-[#0A0A09]/50 border-stone-800/30" : "bg-slate-50 border-slate-200"}`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-xs font-medium ${isDark ? "text-cyan-400" : "text-cyan-600"}`}>
                        {c.author_name ?? c.author}
                      </span>
                      <span className={`text-[10px] font-mono ${isDark ? "text-slate-600" : "text-slate-400"}`}>
                        {new Date(c.created_at).toLocaleDateString("it-IT", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </div>
                    <p className={`text-sm ${isDark ? "text-slate-300" : "text-slate-600"}`}>{c.text}</p>
                  </div>
                ))
              ) : (
                <p className={`text-xs ${isDark ? "text-slate-600" : "text-slate-400"}`}>Nessun commento</p>
              )}
            </div>

            {/* Add comment */}
            <div className="flex items-start gap-3 pt-2">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Aggiungi un commento..."
                rows={2}
                className={`flex-1 rounded-xl border px-3 py-2 text-sm resize-none outline-none transition-colors ${
                  isDark
                    ? "bg-[#0A0A09]/50 border-stone-800/30 text-slate-200 placeholder-slate-600 focus:border-cyan-500/40"
                    : "bg-white border-slate-200 text-slate-800 placeholder-slate-400 focus:border-sky-400"
                }`}
              />
              <button
                onClick={handleSendComment}
                disabled={sending || !comment.trim()}
                className="shrink-0 p-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── New Task Modal ─── */
function NewTaskModal({
  isDark,
  isSubmitting,
  onClose,
  onCreate,
}: {
  isDark: boolean;
  isSubmitting: boolean;
  onClose: () => void;
  onCreate: (payload: { title: string; description?: string; priority: TaskPriority; start_date?: string; deadline?: string }) => Promise<void>;
}) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "medium" as TaskPriority,
    start_date: "",
    deadline: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    await onCreate({
      title: form.title.trim(),
      description: form.description.trim() || undefined,
      priority: form.priority,
      start_date: form.start_date || undefined,
      deadline: form.deadline || undefined,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 pb-10 px-4"
      onClick={onClose}
    >
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" />

      <motion.form
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        className={`relative z-10 w-full max-w-lg rounded-2xl border backdrop-blur-sm ${
          isDark
            ? "bg-[#0E0E0D]/95 border-cyan-500/30 shadow-lg shadow-cyan-500/10"
            : "bg-white/95 border-slate-200 shadow-xl"
        }`}
      >
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-cyan-500/60 to-transparent" />

        <div className="p-6 space-y-5">
          <div className="flex items-center justify-between">
            <h2 className={`text-lg font-semibold ${isDark ? "text-slate-100" : "text-slate-900"}`}>
              Nuovo Task
            </h2>
            <button
              type="button"
              onClick={onClose}
              className={`p-2 rounded-lg transition-colors ${isDark ? "text-slate-400 hover:text-slate-200 hover:bg-stone-800" : "text-slate-500 hover:text-slate-700 hover:bg-slate-100"}`}
            >
              <X size={18} />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className={`text-[10px] font-mono uppercase tracking-wider block mb-1.5 ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                Titolo *
              </label>
              <input
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                required
                placeholder="Nome del task"
                className={`w-full rounded-xl border px-3 py-2.5 text-sm outline-none transition-colors ${
                  isDark
                    ? "bg-[#0A0A09]/50 border-stone-800/30 text-slate-200 placeholder-slate-600 focus:border-cyan-500/40"
                    : "bg-white border-slate-200 text-slate-800 placeholder-slate-400 focus:border-sky-400"
                }`}
              />
            </div>

            <div>
              <label className={`text-[10px] font-mono uppercase tracking-wider block mb-1.5 ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                Descrizione
              </label>
              <textarea
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                rows={3}
                placeholder="Dettagli opzionali"
                className={`w-full rounded-xl border px-3 py-2.5 text-sm resize-none outline-none transition-colors ${
                  isDark
                    ? "bg-[#0A0A09]/50 border-stone-800/30 text-slate-200 placeholder-slate-600 focus:border-cyan-500/40"
                    : "bg-white border-slate-200 text-slate-800 placeholder-slate-400 focus:border-sky-400"
                }`}
              />
            </div>

            <div>
              <label className={`text-[10px] font-mono uppercase tracking-wider block mb-1.5 ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                Priorità
              </label>
              <select
                value={form.priority}
                onChange={(e) => setForm((f) => ({ ...f, priority: e.target.value as TaskPriority }))}
                className={`w-full rounded-xl border px-3 py-2.5 text-sm outline-none ${isDark ? "bg-[#0A0A09]/50 border-stone-800/30 text-slate-200" : "bg-white border-slate-200 text-slate-800"}`}
              >
                {Object.entries(PRIORITY_LABELS).map(([k, v]) => (
                  <option key={k} value={k}>{v}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={`text-[10px] font-mono uppercase tracking-wider block mb-1.5 ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                  Data Inizio
                </label>
                <input
                  type="date"
                  value={form.start_date}
                  onChange={(e) => setForm((f) => ({ ...f, start_date: e.target.value }))}
                  className={`w-full rounded-xl border px-3 py-2.5 text-sm outline-none ${isDark ? "bg-[#0A0A09]/50 border-stone-800/30 text-slate-200" : "bg-white border-slate-200 text-slate-800"}`}
                />
              </div>
              <div>
                <label className={`text-[10px] font-mono uppercase tracking-wider block mb-1.5 ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                  Scadenza
                </label>
                <input
                  type="date"
                  value={form.deadline}
                  onChange={(e) => setForm((f) => ({ ...f, deadline: e.target.value }))}
                  className={`w-full rounded-xl border px-3 py-2.5 text-sm outline-none ${isDark ? "bg-[#0A0A09]/50 border-stone-800/30 text-slate-200" : "bg-white border-slate-200 text-slate-800"}`}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${isDark ? "text-slate-400 hover:text-slate-200" : "text-slate-500 hover:text-slate-700"}`}
            >
              Annulla
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !form.title.trim()}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg shadow-cyan-500/25 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Creazione..." : "Crea Task"}
            </button>
          </div>
        </div>
      </motion.form>
    </motion.div>
  );
}
