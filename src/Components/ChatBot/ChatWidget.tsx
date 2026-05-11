import { useState, useEffect } from "react";
import { FallingLines } from "react-loader-spinner";
import { MessageCircle, X, Send } from "lucide-react";
import { useChatBot } from "../../hooks/useChatBot.ts";

export function ChatWidget({ open, setOpen, theme }: { open: boolean; setOpen: (open: boolean) => void; theme: string }) {
    const [input, setInput] = useState("");
    const [show, setShow] = useState(false);
    const { messages, loading, error, sendMessage, messagesEndRef } = useChatBot();
    const isDark = theme === "dark";

    useEffect(() => {
        if (open) {
            setShow(true);
        } else {
            const timeout = setTimeout(() => setShow(false), 300);
            return () => clearTimeout(timeout);
        }
    }, [open]);

    const handleSend = async () => {
        if (!input.trim()) return;
        await sendMessage(input);
        setInput("");
    };

    return (
        <>
            {/* Floating button */}
            <button
                onClick={() => setOpen(!open)}
                aria-label="Chat"
                className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full
                    flex items-center justify-center border transition-all duration-200
                    hover:scale-105 active:scale-95 shadow-lg
                    ${isDark
                        ? "bg-[#1C1C1A] border-stone-800/30 text-emerald-500 shadow-black/40 hover:border-emerald-800/40"
                        : "bg-[#F8FAFB] border-slate-200 text-emerald-700 shadow-slate-200 hover:border-emerald-400"
                    }`}
            >
                {open
                    ? <X size={18} />
                    : <MessageCircle size={18} />
                }
            </button>

            {/* Chat panel */}
            {(show || open) && (
                <div
                    className={`fixed bottom-24 right-6 w-[320px] sm:w-[380px] h-[500px]
                        rounded-2xl border flex flex-col z-50 overflow-hidden shadow-2xl
                        transform transition-all duration-300
                        ${open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}
                        ${isDark
                            ? "bg-[#1C1C1A] border-stone-800/30 shadow-black/60"
                            : "bg-[#F8FAFB] border-slate-200 shadow-slate-300/50"
                        }`}
                >
                    {/* Header */}
                    <div className={`px-5 py-4 border-b flex items-center gap-3
                        ${isDark ? "border-stone-800/20 bg-[#111110]" : "border-slate-200 bg-[#EDF2F7]"}`}>
                        {/* AI avatar */}
                        <div className="w-8 h-8 shrink-0">
                            <svg viewBox="0 0 100 100" className="w-full h-full">
                                <circle cx="50" cy="50" r="40" fill={isDark ? "white" : "#1e3a5f"} opacity="0.08">
                                    <animate attributeName="r" values="38;42;38" dur="2.5s" repeatCount="indefinite" />
                                </circle>
                                <rect x="25" y="30" width="50" height="40" rx="14" fill={isDark ? "white" : "#6B8E7B"} opacity="0.9" />
                                <g>
                                    <circle cx="42" cy="50" r="4" fill={isDark ? "black" : "white"}>
                                        <animate attributeName="ry" values="4;0.5;4" dur="3s" repeatCount="indefinite" />
                                    </circle>
                                    <circle cx="58" cy="50" r="4" fill={isDark ? "black" : "white"}>
                                        <animate attributeName="ry" values="4;0.5;4" dur="3s" begin="0.2s" repeatCount="indefinite" />
                                    </circle>
                                </g>
                                <rect x="42" y="62" width="16" height="3" rx="2" fill={isDark ? "black" : "white"} opacity="0.7" />
                                <line x1="50" y1="30" x2="50" y2="18" stroke={isDark ? "white" : "#6B8E7B"} strokeWidth="2.5" />
                                <circle cx="50" cy="15" r="2.5" fill={isDark ? "white" : "#6B8E7B"}>
                                    <animate attributeName="opacity" values="1;0.3;1" dur="1.5s" repeatCount="indefinite" />
                                </circle>
                            </svg>
                        </div>
                        <div>
                            <p className={`text-sm font-semibold ${isDark ? "text-slate-200" : "text-slate-800"}`}>
                                Consulente AI
                            </p>
                            <p className={`text-xs ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                                Online
                            </p>
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-3">
                        {messages.map((msg, i) => (
                            <div
                                key={i}
                                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                            >
                                <div className={`max-w-[78%] px-4 py-2.5 rounded-2xl text-xs leading-relaxed
                                    ${msg.role === "user"
                                        ? isDark
                                            ? "bg-emerald-700 text-white"
                                            : "bg-emerald-700 text-white"
                                        : isDark
                                            ? "bg-[#111110] border border-stone-800/20 text-slate-300"
                                            : "bg-[#EDF2F7] text-slate-700"
                                    }`}>
                                    {msg.content}
                                </div>
                            </div>
                        ))}

                        {loading && (
                            <div className="flex justify-start">
                                <div className={`px-4 py-2.5 rounded-2xl border
                                    ${isDark ? "bg-[#111110] border-stone-800/20" : "bg-[#EDF2F7]"}`}>
                                    <FallingLines color={isDark ? "#fff" : "#3B82F6"} width="28" visible ariaLabel="loading" />
                                </div>
                            </div>
                        )}

                        {error && (
                            <p className="text-xs text-red-400 px-2">{error}</p>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className={`p-4 border-t flex gap-2 ${isDark ? "border-stone-800/20" : "border-slate-200"}`}>
                        <input
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyDown={e => e.key === "Enter" && handleSend()}
                            placeholder="Scrivi la tua domanda..."
                            className={`flex-1 text-xs px-4 py-2.5 rounded-xl border outline-none transition-colors
                                focus:ring-2 placeholder:text-slate-500
                                ${isDark
                                    ? "bg-[#111110] border-stone-800/30 text-slate-200 focus:border-emerald-700 focus:ring-emerald-600/20"
                                    : "bg-[#EDF2F7] border-slate-200 text-slate-900 focus:border-emerald-600 focus:ring-emerald-600/10"
                                }`}
                        />
                        <button
                            onClick={handleSend}
                            disabled={loading || !input.trim()}
                            className="shrink-0 w-9 h-9 rounded-xl flex items-center justify-center
                                bg-emerald-700 hover:bg-emerald-600 disabled:opacity-40
                                text-white transition-colors"
                        >
                            <Send size={13} />
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
