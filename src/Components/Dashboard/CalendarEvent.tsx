import { motion } from "framer-motion";
import { Clock, MapPin, User } from "lucide-react";

interface CalendlyEvent {
  uri: string;
  name: string;
  start_time: string;
  end_time: string;
  status: "active" | "canceled" | "rescheduled";
  location?: { type: string; location?: string };
  invitees: { name: string; email: string }[];
  event_type?: string;
}

interface CalendarEventProps {
  event: CalendlyEvent;
  theme: string;
  onClick: () => void;
  compact?: boolean;
}

const statusStyles = {
  active: {
    dark: "bg-sky-500/20 border-sky-500/40 text-sky-300 hover:bg-sky-500/30",
    light: "bg-sky-100 border-sky-300 text-sky-800 hover:bg-sky-200",
  },
  canceled: {
    dark: "bg-rose-500/15 border-rose-500/30 text-rose-300 hover:bg-rose-500/25",
    light: "bg-rose-100 border-rose-300 text-rose-700 hover:bg-rose-200",
  },
  rescheduled: {
    dark: "bg-amber-500/15 border-amber-500/30 text-amber-300 hover:bg-amber-500/25",
    light: "bg-amber-100 border-amber-300 text-amber-700 hover:bg-amber-200",
  },
};

export function CalendarEventCard({ event, theme, onClick, compact = false }: CalendarEventProps) {
  const isDark = theme === "dark";
  const styles = statusStyles[event.status][isDark ? "dark" : "light"];
  const startTime = new Date(event.start_time);
  const endTime = new Date(event.end_time);
  const primaryInvitee = event.invitees[0];

  if (compact) {
    return (
      <motion.button
        layout
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.02, zIndex: 10 }}
        onClick={onClick}
        className={`w-full text-left px-2 py-1 rounded-lg border text-xs truncate transition-all duration-200 ${styles}`}
        title={`${event.name} — ${primaryInvitee?.name || "Nessun invitato"}`}
      >
        <span className="font-medium">{startTime.toLocaleTimeString("it-IT", { hour: "2-digit", minute: "2-digit" })}</span>
        {" "}{event.name}
      </motion.button>
    );
  }

  return (
    <motion.button
      layout
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2, transition: { duration: 0.15 } }}
      onClick={onClick}
      className={`w-full text-left p-3 rounded-xl border backdrop-blur-sm transition-all duration-200 ${styles} ${
        isDark ? "shadow-lg shadow-black/20" : "shadow-sm"
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-sm truncate">{event.name}</p>
          {primaryInvitee && (
            <div className="flex items-center gap-1 mt-1 opacity-80">
              <User size={12} />
              <span className="text-xs truncate">{primaryInvitee.name}</span>
            </div>
          )}
        </div>
        <span className={`text-[10px] font-mono uppercase px-1.5 py-0.5 rounded ${
          isDark ? "bg-black/20" : "bg-white/60"
        }`}>
          {event.status}
        </span>
      </div>

      <div className="mt-2 space-y-1 opacity-75">
        <div className="flex items-center gap-1.5">
          <Clock size={11} />
          <span className="text-xs">
            {startTime.toLocaleTimeString("it-IT", { hour: "2-digit", minute: "2-digit" })}
            {" — "}
            {endTime.toLocaleTimeString("it-IT", { hour: "2-digit", minute: "2-digit" })}
          </span>
        </div>
        {event.location?.location && (
          <div className="flex items-center gap-1.5">
            <MapPin size={11} />
            <span className="text-xs truncate">{event.location.location}</span>
          </div>
        )}
      </div>
    </motion.button>
  );
}
