import { useState } from "react";
import { Send } from "lucide-react";
import { FallingLines } from "react-loader-spinner";
import { motion } from "framer-motion";
import { useSendBulkNotification } from "../../hooks/useSendBulkNotification";
import { useAuth } from "../../auth/AuthContext";

const TEMPLATE_HTML = `<h1 style="color:#111">Important update</h1>
<p>This is a system communication from the platform.<br/>Please read carefully.</p>
<p>— The Team</p>`;

export function BulkNotificationSection({ theme }: { theme: string }) {
    const isDark = theme === "dark";
    const { token } = useAuth();
    const { sendBulkNotification, loading, success, error } = useSendBulkNotification();
    const border = isDark ? "border-stone-800/30" : "border-slate-200";

    const [type,    setType]    = useState("ALL");
    const [subject, setSubject] = useState("");
    const [html,    setHtml]    = useState(TEMPLATE_HTML);

    const inputClass = `w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-colors
        ${isDark
            ? "bg-[#111110] border-stone-800/30 text-slate-200 focus:border-rose-700 focus:ring-rose-600/20"
            : "bg-white border-slate-200 text-slate-900 focus:border-rose-600 focus:ring-rose-600/10"
        }`;

    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className={`rounded-2xl border overflow-hidden ${border}`}
            style={{ background: isDark ? "#161614" : "#FAFAF8" }}
        >
            <div className="h-[2px] w-full bg-rose-700/40" />
            <div className="p-7">
                <div className="flex items-center justify-between mb-7">
                    <h2 className={`text-sm font-semibold ${isDark ? "text-slate-100" : "text-slate-900"}`}>
                        Bulk Email Notification
                    </h2>
                    <span className={`text-[10px] font-mono uppercase tracking-[0.18em] ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                        Messaging
                    </span>
                </div>

                <div className="flex flex-col gap-4 max-w-2xl">
                    <select value={type} onChange={e => setType(e.target.value)} className={inputClass + " appearance-none cursor-pointer"}>
                        <option value="ALL">All Users</option>
                        <option value="ADMIN">Admins</option>
                        <option value="VIP">VIP Users</option>
                        <option value="INACTIVE">Inactive Users</option>
                    </select>

                    <input
                        value={subject}
                        onChange={e => setSubject(e.target.value)}
                        placeholder="Email subject"
                        className={inputClass}
                    />

                    <textarea
                        value={html}
                        onChange={e => setHtml(e.target.value)}
                        rows={8}
                        className={inputClass + " font-mono resize-none"}
                    />

                    <div className="flex items-center gap-4">
                        <button
                            disabled={loading || !subject || !html}
                            onClick={async () => { if (token) await sendBulkNotification(type as any, subject, html, token); }}
                            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl
                                bg-rose-700 hover:bg-rose-600 disabled:opacity-40
                                text-white text-sm font-semibold transition-all hover:-translate-y-0.5 duration-200"
                        >
                            {loading
                                ? <FallingLines color="#fff" width="20" visible ariaLabel="loading" />
                                : <><Send size={13} /> Send Email</>
                            }
                        </button>
                        {success && <span className="text-xs text-green-400">Emails sent successfully</span>}
                        {error   && <span className="text-xs text-red-400">{error}</span>}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
