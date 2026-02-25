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

export function BulkNotificationSection() {
    const { token } = useAuth();
    const { sendBulkNotification, loading, success, error } =
        useSendBulkNotification();

    const [type, setType] = useState("ALL");
    const [subject, setSubject] = useState("");
    const [html, setHtml] = useState(TEMPLATE_HTML);

    async function handleSend() {
        if (!token) return;
        await sendBulkNotification(type as any, subject, html, token);
    }

    return (
        <div className="relative rounded-[32px] bg-white/[0.04] border border-white/[0.08] backdrop-blur-2xl p-10">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">
                    Bulk Email Notification
                </h2>
                <span className="text-xs uppercase tracking-widest text-neutral-500">
          Messaging
        </span>
            </div>

            <div className="flex flex-col gap-6 max-w-3xl">

                {/* USER TYPE */}
                <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="bg-white text-black rounded-lg px-5 py-3 border border-white/[0.1]"
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
                    className="bg-white text-black rounded-lg px-5 py-3 border border-white/[0.1]"
                />

                {/* HTML BODY */}
                <textarea
                    value={html}
                    onChange={(e) => setHtml(e.target.value)}
                    rows={10}
                    className="bg-white text-black rounded-lg px-5 py-4 border border-white/[0.1] font-mono text-sm"
                />

                {/* ACTION */}
                <div className="flex items-center gap-4">
                    <button
                        disabled={loading || !subject || !html}
                        onClick={handleSend}
                        className="px-8 py-3 rounded-lg cursor-pointer bg-white text-black font-medium transition hover:scale-105 disabled:opacity-30"
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