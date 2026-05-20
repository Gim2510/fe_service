import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Calendar, Clock, User, FileText, ExternalLink, Loader2 } from "lucide-react";

interface CalendlyInvitee {
  name: string;
  email: string;
  questions_and_answers?: { question: string; answer: string }[];
}

interface CalendlyEvent {
  uri: string;
  name: string;
  start_time: string;
  end_time: string;
  status: "active" | "canceled" | "rescheduled";
  location?: { type: string; location?: string };
  invitees: CalendlyInvitee[];
  event_type?: string;
}

interface SurveyInfo {
  survey_id?: string;
  status?: string;
  score?: number;
  created_at?: string;
}

interface BookingDetailModalProps {
  event: CalendlyEvent | null;
  theme: string;
  onClose: () => void;
}

const SURVEY_BASE_URL = import.meta.env.VITE_SURVEY_BASE_URL || "http://localhost:3002";

export function BookingDetailModal({ event, theme, onClose }: BookingDetailModalProps) {
  const isDark = theme === "dark";
  const [surveyInfo, setSurveyInfo] = useState<SurveyInfo | null>(null);
  const [loadingSurvey, setLoadingSurvey] = useState(false);

  useEffect(() => {
    if (!event || !event.invitees.length) {
      setSurveyInfo(null);
      return;
    }

    const email = event.invitees[0].email;
    if (!email) return;

    setLoadingSurvey(true);
    fetch(`${SURVEY_BASE_URL}/v1/survey/surveys?email=${encodeURIComponent(email)}`)
      .then((res) => res.json())
      .then((res) => {
        const surveys = res.data?.surveys || res.data || [];
        if (surveys.length > 0) {
          const latest = surveys[0];
          setSurveyInfo({
            survey_id: latest._id || latest.survey_id,
            status: latest.status,
            score: latest.total_score || latest.score,
            created_at: latest.created_at,
          });
        } else {
          setSurveyInfo(null);
        }
      })
      .catch(() => setSurveyInfo(null))
      .finally(() => setLoadingSurvey(false));
  }, [event]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!event) return null;

  const startTime = new Date(event.start_time);
  const endTime = new Date(event.end_time);
  const primaryInvitee = event.invitees[0];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className={`relative w-full max-w-lg rounded-2xl border backdrop-blur-md overflow-hidden ${
            isDark
              ? "bg-[#1A1A18]/95 border-stone-700/40 shadow-2xl shadow-sky-900/20"
              : "bg-white/95 border-slate-200 shadow-2xl"
          }`}
        >
          <div className={`h-1 w-full bg-gradient-to-r from-sky-600 via-cyan-500 to-sky-600`} />

          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <h2 className={`text-lg font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
                {event.name}
              </h2>
              <button
                onClick={onClose}
                className={`p-1.5 rounded-lg transition-colors ${
                  isDark ? "hover:bg-white/10 text-slate-400" : "hover:bg-slate-100 text-slate-500"
                }`}
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4">
              <div className={`flex items-center gap-3 p-3 rounded-xl ${isDark ? "bg-white/5" : "bg-slate-50"}`}>
                <User size={16} className="text-sky-500 shrink-0" />
                <div className="min-w-0">
                  <p className={`text-sm font-medium ${isDark ? "text-slate-200" : "text-slate-800"}`}>
                    {primaryInvitee?.name || "N/D"}
                  </p>
                  <p className={`text-xs ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                    {primaryInvitee?.email || "N/D"}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className={`flex items-center gap-2 p-3 rounded-xl ${isDark ? "bg-white/5" : "bg-slate-50"}`}>
                  <Calendar size={14} className="text-sky-500 shrink-0" />
                  <div>
                    <p className={`text-[10px] uppercase tracking-wider ${isDark ? "text-slate-500" : "text-slate-400"}`}>Data</p>
                    <p className={`text-xs font-medium ${isDark ? "text-slate-200" : "text-slate-700"}`}>
                      {startTime.toLocaleDateString("it-IT", { day: "2-digit", month: "short", year: "numeric" })}
                    </p>
                  </div>
                </div>
                <div className={`flex items-center gap-2 p-3 rounded-xl ${isDark ? "bg-white/5" : "bg-slate-50"}`}>
                  <Clock size={14} className="text-sky-500 shrink-0" />
                  <div>
                    <p className={`text-[10px] uppercase tracking-wider ${isDark ? "text-slate-500" : "text-slate-400"}`}>Orario</p>
                    <p className={`text-xs font-medium ${isDark ? "text-slate-200" : "text-slate-700"}`}>
                      {startTime.toLocaleTimeString("it-IT", { hour: "2-digit", minute: "2-digit" })}
                      {" — "}
                      {endTime.toLocaleTimeString("it-IT", { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                </div>
              </div>

              {event.location?.location && (
                <div className={`flex items-center gap-2 p-3 rounded-xl ${isDark ? "bg-white/5" : "bg-slate-50"}`}>
                  <ExternalLink size={14} className="text-sky-500 shrink-0" />
                  <div>
                    <p className={`text-[10px] uppercase tracking-wider ${isDark ? "text-slate-500" : "text-slate-400"}`}>Luogo</p>
                    <p className={`text-xs font-medium ${isDark ? "text-slate-200" : "text-slate-700"}`}>
                      {event.location.location}
                    </p>
                  </div>
                </div>
              )}

              {primaryInvitee?.questions_and_answers && primaryInvitee.questions_and_answers.length > 0 && (
                <div className={`p-3 rounded-xl ${isDark ? "bg-white/5" : "bg-slate-50"}`}>
                  <p className={`text-[10px] uppercase tracking-wider mb-2 ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                    Note dalla prenotazione
                  </p>
                  <div className="space-y-1.5">
                    {primaryInvitee.questions_and_answers.map((qa, i) => (
                      <div key={i}>
                        <p className={`text-xs font-medium ${isDark ? "text-slate-300" : "text-slate-600"}`}>{qa.question}</p>
                        <p className={`text-xs ${isDark ? "text-slate-400" : "text-slate-500"}`}>{qa.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className={`p-3 rounded-xl border ${
                isDark ? "bg-white/5 border-stone-700/30" : "bg-slate-50 border-slate-200"
              }`}>
                <div className="flex items-center gap-2 mb-2">
                  <FileText size={14} className="text-sky-500 shrink-0" />
                  <p className={`text-[10px] uppercase tracking-wider ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                    Survey associato
                  </p>
                </div>

                {loadingSurvey ? (
                  <div className="flex items-center gap-2 py-2">
                    <Loader2 size={14} className="animate-spin text-sky-500" />
                    <span className={`text-xs ${isDark ? "text-slate-400" : "text-slate-500"}`}>Ricerca survey...</span>
                  </div>
                ) : surveyInfo ? (
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        surveyInfo.status === "completed"
                          ? "bg-emerald-500/20 text-emerald-400"
                          : surveyInfo.status === "in_progress"
                          ? "bg-amber-500/20 text-amber-400"
                          : "bg-slate-500/20 text-slate-400"
                      }`}>
                        {surveyInfo.status || "N/D"}
                      </span>
                      {surveyInfo.score != null && (
                        <span className={`text-xs font-bold ${isDark ? "text-sky-400" : "text-sky-600"}`}>
                          Score: {surveyInfo.score}
                        </span>
                      )}
                    </div>
                    {surveyInfo.survey_id && (
                      <a
                        href={`/survey/${surveyInfo.survey_id}/recap`}
                        className="inline-flex items-center gap-1 text-xs text-sky-500 hover:text-sky-400 transition-colors"
                      >
                        Vai al survey <ExternalLink size={11} />
                      </a>
                    )}
                  </div>
                ) : (
                  <p className={`text-xs ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                    Nessun survey trovato per questo utente
                  </p>
                )}
              </div>

              {primaryInvitee?.email && (
                <a
                  href={`mailto:${primaryInvitee.email}`}
                  className={`flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isDark
                      ? "bg-sky-600/20 text-sky-400 hover:bg-sky-600/30 border border-sky-500/30"
                      : "bg-sky-50 text-sky-700 hover:bg-sky-100 border border-sky-200"
                  }`}
                >
                  <Mail size={14} />
                  Contatta {primaryInvitee.name?.split(" ")[0]}
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
