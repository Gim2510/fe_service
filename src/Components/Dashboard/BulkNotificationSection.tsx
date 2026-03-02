import { useState } from "react";
import { useSendBulkNotification } from "../../hooks/useSendBulkNotification";
import { useAuth } from "../../auth/AuthContext";

const TEMPLATE_HTML = `
<h1 style="color:#111">Important update</h1>
<p>
  This is a system communication from the platform.<br/>
  Please read carefully.
</p>
<p>
  — The Team
</p>
`;

type Props = {
    theme: string;
};

export function BulkNotificationSection({ theme }: Props) {
    const isDark = theme === "dark";

    const { token } = useAuth();
    const { sendBulkNotification, loading, success, error } = useSendBulkNotification();

    const [type, setType] = useState("ALL");
    const [subject, setSubject] = useState("");
    const [html, setHtml] = useState(TEMPLATE_HTML);

    async function handleSend() {
        if (!token) return;
        await sendBulkNotification(type as any, subject, html, token);
    }

    // glass background for theme
    const glassBg = isDark
        ? "bg-white/[0.04] border border-white/[0.08]"
        : "bg-white/50 border border-gray-200";

    const textPrimary = isDark ? "text-white" : "text-gray-900";
    const textSecondary = isDark ? "text-neutral-500" : "text-gray-500";
    const inputBg = isDark ? "bg-white/[0.05] text-white border-white/[0.1]" : "bg-white/60 text-gray-900 border-gray-300";

    return (
        <div className={`relative rounded-[32px] p-10 backdrop-blur-2xl shadow-[0_0_80px_rgba(0,0,0,0.04)] ${glassBg}`}>

            {/* HEADER */}
            <div className="flex items-center justify-between mb-8">
                <h2 className={`text-xl sm:text-2xl font-semibold tracking-tight ${textPrimary}`}>
                    Bulk Email Notification
                </h2>
                <span className={`text-xs uppercase tracking-widest ${textSecondary}`}>
                    Messaging
                </span>
            </div>

            {/* FORM */}
            <div className="flex flex-col gap-6 max-w-3xl">

                {/* USER TYPE */}
                <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className={`rounded-lg px-5 py-3 border ${inputBg} cursor-pointer`}
                >
                    <option value="ALL">All Users</option>
                    <option value="ADMIN">Admins</option>
                    <option value="VIP">VIP Users</option>
                    <option value="INACTIVE">Inactive Users</option>
                </select>

                {/* SUBJECT */}
                <input
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Email subject"
                    className={`rounded-lg px-5 py-3 border ${inputBg}`}
                />

                {/* HTML BODY */}
                <textarea
                    value={html}
                    onChange={(e) => setHtml(e.target.value)}
                    rows={10}
                    className={`rounded-lg px-5 py-4 border ${inputBg} font-mono text-sm`}
                />

                {/* ACTION */}
                <div className="flex items-center gap-4">
                    <button
                        disabled={loading || !subject || !html}
                        onClick={handleSend}
                        className={`px-8 py-3 rounded-lg cursor-pointer font-medium transition hover:scale-105 disabled:opacity-30 ${isDark ? "bg-white text-black" : "bg-gray-900 text-white"}`}
                    >
                        {loading ? "Sending..." : "Send Email"}
                    </button>

                    {success && (
                        <span className="text-green-400 text-sm">
                            Emails sent successfully
                        </span>
                    )}

                    {error && (
                        <span className="text-red-400 text-sm">
                            {error}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}