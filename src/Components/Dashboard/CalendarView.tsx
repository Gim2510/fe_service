import { useState, useMemo } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  CalendarDays,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { useCalendlyEvents } from "../../hooks/useCalendlyEvents";
import { CalendarEventCard } from "./CalendarEvent";
import { BookingDetailModal } from "./BookingDetailModal";

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

type ViewMode = "week" | "month";

const DAYS_IT = ["Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"];
const MONTHS_IT = [
  "Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno",
  "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre",
];

export function CalendarView({ theme }: { theme: string }) {
  const isDark = theme === "dark";
  const [viewMode, setViewMode] = useState<ViewMode>("week");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState<CalendlyEvent | null>(null);

  const { from, to } = useMemo(() => {
    const d = new Date(currentDate);
    if (viewMode === "week") {
      const day = d.getDay();
      const diff = d.getDate() - day + (day === 0 ? -6 : 1);
      const monday = new Date(d.setDate(diff));
      monday.setHours(0, 0, 0, 0);
      const sunday = new Date(monday);
      sunday.setDate(monday.getDate() + 6);
      sunday.setHours(23, 59, 59, 999);
      return { from: monday.toISOString(), to: sunday.toISOString() };
    }
    const first = new Date(d.getFullYear(), d.getMonth(), 1);
    const last = new Date(d.getFullYear(), d.getMonth() + 1, 0, 23, 59, 59, 999);
    return { from: first.toISOString(), to: last.toISOString() };
  }, [currentDate, viewMode]);

  const { events, loading, error, refresh } = useCalendlyEvents(from, to);

  const navigate = (dir: number) => {
    const d = new Date(currentDate);
    if (viewMode === "week") {
      d.setDate(d.getDate() + dir * 7);
    } else {
      d.setMonth(d.getMonth() + dir);
    }
    setCurrentDate(d);
  };

  const goToToday = () => setCurrentDate(new Date());

  const weekDays = useMemo(() => {
    if (viewMode !== "week") return [];
    const d = new Date(currentDate);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(d);
      date.setDate(diff + i);
      return date;
    });
  }, [currentDate, viewMode]);

  const monthDays = useMemo(() => {
    if (viewMode !== "month") return [];
    const d = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const startDay = d.getDay();
    const offset = startDay === 0 ? 6 : startDay - 1;
    d.setDate(d.getDate() - offset);
    return Array.from({ length: 42 }, (_, i) => {
      const date = new Date(d);
      date.setDate(d.getDate() + i);
      return date;
    });
  }, [currentDate, viewMode]);

  const getEventsForDate = (date: Date) => {
    return events.filter((e) => {
      const ed = new Date(e.start_time);
      return (
        ed.getFullYear() === date.getFullYear() &&
        ed.getMonth() === date.getMonth() &&
        ed.getDate() === date.getDate()
      );
    });
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate()
    );
  };

  const isCurrentMonth = (date: Date) => date.getMonth() === currentDate.getMonth();

  const headerLabel = useMemo(() => {
    if (viewMode === "week") {
      const first = weekDays[0];
      const last = weekDays[6];
      if (first.getMonth() === last.getMonth()) {
        return `${first.getDate()} — ${last.getDate()} ${MONTHS_IT[first.getMonth()]} ${first.getFullYear()}`;
      }
      return `${first.getDate()} ${MONTHS_IT[first.getMonth()].slice(0, 3)} — ${last.getDate()} ${MONTHS_IT[last.getMonth()].slice(0, 3)} ${last.getFullYear()}`;
    }
    return `${MONTHS_IT[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
  }, [viewMode, weekDays, currentDate]);

  const hours = Array.from({ length: 14 }, (_, i) => i + 8);

  if (loading) {
    return (
      <div className={`flex items-center justify-center py-20 ${isDark ? "text-slate-400" : "text-slate-500"}`}>
        <Loader2 size={24} className="animate-spin mr-2" />
        <span className="text-sm">Caricamento calendario...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`flex flex-col items-center justify-center py-20 ${isDark ? "text-rose-400" : "text-rose-600"}`}>
        <AlertCircle size={32} className="mb-3" />
        <p className="text-sm font-medium">{error}</p>
        <button
          onClick={() => refresh()}
          className={`mt-3 px-4 py-2 rounded-lg text-xs font-medium transition-colors ${
            isDark ? "bg-rose-500/20 hover:bg-rose-500/30" : "bg-rose-100 hover:bg-rose-200"
          }`}
        >
          Riprova
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className={`p-2 rounded-lg transition-colors ${
              isDark ? "hover:bg-white/10 text-slate-400" : "hover:bg-slate-100 text-slate-500"
            }`}
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={goToToday}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              isDark
                ? "bg-sky-600/20 text-sky-400 hover:bg-sky-600/30 border border-sky-500/30"
                : "bg-sky-50 text-sky-700 hover:bg-sky-100 border border-sky-200"
            }`}
          >
            Oggi
          </button>
          <button
            onClick={() => navigate(1)}
            className={`p-2 rounded-lg transition-colors ${
              isDark ? "hover:bg-white/10 text-slate-400" : "hover:bg-slate-100 text-slate-500"
            }`}
          >
            <ChevronRight size={18} />
          </button>
          <h2 className={`text-lg font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
            {headerLabel}
          </h2>
        </div>

        <div className={`flex rounded-lg overflow-hidden border ${isDark ? "border-stone-700/40" : "border-slate-200"}`}>
          <button
            onClick={() => setViewMode("week")}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium transition-colors ${
              viewMode === "week"
                ? isDark
                  ? "bg-sky-600/20 text-sky-400"
                  : "bg-sky-50 text-sky-700"
                : isDark
                ? "text-slate-500 hover:text-slate-300"
                : "text-slate-400 hover:text-slate-600"
            }`}
          >
            <CalendarIcon size={13} /> Settimana
          </button>
          <button
            onClick={() => setViewMode("month")}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium transition-colors ${
              viewMode === "month"
                ? isDark
                  ? "bg-sky-600/20 text-sky-400"
                  : "bg-sky-50 text-sky-700"
                : isDark
                ? "text-slate-500 hover:text-slate-300"
                : "text-slate-400 hover:text-slate-600"
            }`}
          >
            <CalendarDays size={13} /> Mese
          </button>
        </div>
      </div>

      {viewMode === "week" ? (
        <div className={`rounded-2xl border overflow-hidden ${isDark ? "border-stone-800/30 bg-[#161614]/60" : "border-slate-200 bg-white/60"} backdrop-blur-sm`}>
          <div className={`grid grid-cols-8 border-b ${isDark ? "border-stone-800/30" : "border-slate-200"}`}>
            <div className={`p-3 text-center text-[10px] font-mono uppercase tracking-wider ${isDark ? "text-stone-600" : "text-slate-400"}`}>
              Ora
            </div>
            {weekDays.map((day, i) => (
              <div
                key={i}
                className={`p-3 text-center border-l ${isDark ? "border-stone-800/20" : "border-slate-100"}`}
              >
                <p className={`text-[10px] font-mono uppercase tracking-wider ${isDark ? "text-stone-600" : "text-slate-400"}`}>
                  {DAYS_IT[i]}
                </p>
                <p className={`text-lg font-bold mt-0.5 ${
                  isToday(day)
                    ? "text-sky-500"
                    : isDark ? "text-slate-200" : "text-slate-700"
                }`}>
                  {day.getDate()}
                </p>
              </div>
            ))}
          </div>

          <div className="relative overflow-y-auto max-h-[600px]">
            {hours.map((hour) => (
              <div
                key={hour}
                className={`grid grid-cols-8 border-b ${isDark ? "border-stone-800/15" : "border-slate-100"}`}
              >
                <div className={`p-2 text-right pr-3 text-[11px] font-mono ${isDark ? "text-stone-600" : "text-slate-400"}`}>
                  {String(hour).padStart(2, "0")}:00
                </div>
                {weekDays.map((day, di) => {
                  const dayEvents = getEventsForDate(day).filter((e) => new Date(e.start_time).getHours() === hour);
                  return (
                    <div
                      key={di}
                      className={`p-1 border-l min-h-[48px] ${isDark ? "border-stone-800/10" : "border-slate-100"}`}
                    >
                      {dayEvents.map((event) => (
                        <CalendarEventCard
                          key={event.uri}
                          event={event}
                          theme={theme}
                          onClick={() => setSelectedEvent(event)}
                          compact
                        />
                      ))}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className={`rounded-2xl border overflow-hidden ${isDark ? "border-stone-800/30 bg-[#161614]/60" : "border-slate-200 bg-white/60"} backdrop-blur-sm`}>
          <div className={`grid grid-cols-7 border-b ${isDark ? "border-stone-800/30" : "border-slate-200"}`}>
            {DAYS_IT.map((d) => (
              <div
                key={d}
                className={`p-2 text-center text-[10px] font-mono uppercase tracking-wider ${isDark ? "text-stone-600" : "text-slate-400"}`}
              >
                {d}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7">
            {monthDays.map((day, i) => {
              const dayEvents = getEventsForDate(day);
              const today = isToday(day);
              const current = isCurrentMonth(day);

              return (
                <div
                  key={i}
                  className={`min-h-[80px] p-1.5 border-r border-b transition-colors ${
                    isDark
                      ? `border-stone-800/15 ${today ? "bg-sky-500/5" : ""}`
                      : `border-slate-100 ${today ? "bg-sky-50" : ""}`
                  }`}
                >
                  <p className={`text-xs font-medium mb-1 ${
                    today
                      ? "text-sky-500"
                      : current
                      ? isDark ? "text-slate-300" : "text-slate-700"
                      : isDark ? "text-stone-700" : "text-slate-300"
                  }`}>
                    {day.getDate()}
                  </p>
                  <div className="space-y-0.5">
                    {dayEvents.slice(0, 3).map((event) => (
                      <CalendarEventCard
                        key={event.uri}
                        event={event}
                        theme={theme}
                        onClick={() => setSelectedEvent(event)}
                        compact
                      />
                    ))}
                    {dayEvents.length > 3 && (
                      <p className={`text-[10px] px-1 ${isDark ? "text-stone-500" : "text-slate-400"}`}>
                        +{dayEvents.length - 3} altri
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <BookingDetailModal
        event={selectedEvent}
        theme={theme}
        onClose={() => setSelectedEvent(null)}
      />
    </div>
  );
}
