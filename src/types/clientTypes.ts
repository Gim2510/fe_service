export interface Client {
  _id: string;
  user_id: string;
  company_name: string;
  vat_number?: string;
  address?: string;
  city?: string;
  phone?: string;
  website?: string;
  industry?: string;
  created_at?: string;
}

export type ProjectStatus = "planning" | "active" | "on_hold" | "completed" | "cancelled";

export interface TeamMember {
  user_id: string;
  role: string;
  is_lead: boolean;
}

export interface ProjectDocument {
  name: string;
  url: string;
  type: "pdf" | "xlsx" | "docx" | "txt" | "other";
  category: "requirements" | "contract" | "report" | "other";
  uploaded_at: string;
}

export interface Project {
  _id: string;
  client_id: string;
  name: string;
  description?: string;
  status: ProjectStatus;
  start_date?: string;
  end_date?: string;
  team_members?: TeamMember[];
  documents?: ProjectDocument[];
  created_at?: string;
  updated_at?: string;
}

export type TaskStatus = "backlog" | "in_progress" | "in_review" | "completed";

export type TaskPriority = "urgent" | "high" | "medium" | "low";

export interface TaskComment {
  _id: string;
  author: string;
  author_name?: string;
  text: string;
  created_at: string;
}

export interface Task {
  _id: string;
  project_id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  start_date?: string;
  deadline?: string;
  assigned_to?: string[];
  comments?: TaskComment[];
  created_at?: string;
  updated_at?: string;
}

export const TASK_STATUS_LABELS: Record<TaskStatus, string> = {
  backlog: "Backlog",
  in_progress: "In Corso",
  in_review: "In Review",
  completed: "Completato",
};

export const PROJECT_STATUS_LABELS: Record<ProjectStatus, string> = {
  planning: "Pianificato",
  active: "Attivo",
  on_hold: "In Pausa",
  completed: "Completato",
  cancelled: "Annullato",
};

export const PRIORITY_LABELS: Record<TaskPriority, string> = {
  urgent: "Urgente",
  high: "Alta",
  medium: "Media",
  low: "Bassa",
};

export const PRIORITY_COLORS: Record<TaskPriority, { bar: string; text: string; bg: string; border: string }> = {
  urgent: { bar: "bg-red-500", text: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/30" },
  high: { bar: "bg-amber-500", text: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/30" },
  medium: { bar: "bg-blue-500", text: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/30" },
  low: { bar: "bg-emerald-500", text: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/30" },
};

export const STATUS_COLORS: Record<TaskStatus, { text: string; bg: string; border: string }> = {
  backlog: { text: "text-slate-400", bg: "bg-slate-500/10", border: "border-slate-500/20" },
  in_progress: { text: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/20" },
  in_review: { text: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20" },
  completed: { text: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
};
