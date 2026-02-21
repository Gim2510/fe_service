import { useState, useEffect } from "react";
import { useChatBot } from "../../hooks/useChatBot.ts";
import ChatIcon from '@mui/icons-material/Chat';
import { LiquidGlassButton } from "../Buttons/LiquidGlassButton.tsx";

export function ChatWidget({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) {
    const [input, setInput] = useState("");
    const [show, setShow] = useState(false);
    const { messages, loading, error, sendMessage, messagesEndRef } = useChatBot();

    // Gestione animazione comparsa
    useEffect(() => {
        if (open) {
            setShow(true); // Mostra il box
        } else {
            // Delay per permettere transizione fade-out
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
            {/* Floating Chat Button */}
            <button
                onClick={() => setOpen(!open)}
                className="fixed bottom-6 right-6 z-50 w-14 h-14 sm:w-16 sm:h-16 rounded-full backdrop-blur-lg bg-white/20 border border-white/20 shadow-lg flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-all"
            >
                <ChatIcon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </button>

            {/* Chat Box Animata */}
            {(show || open) && (
                <div
                    className={`
                        fixed bottom-24 right-6 w-[300px] sm:w-[380px] h-[520px] bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl flex flex-col z-50 overflow-hidden
                        transform transition-all duration-600
                        ${open ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}
                    `}
                >
                    {/* Header */}
                    <div className="px-6 py-4 border-b border-white/10 text-white font-semibold backdrop-blur-md bg-white/10">
                        Consulente Digitale
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages.map((msg, i) => (
                            <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                                <div className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm
                                    ${msg.role === "user"
                                    ? "bg-white/30 text-black backdrop-blur-sm border border-white/20"
                                    : "bg-white/10 text-white backdrop-blur-sm border border-white/20"}`}>
                                    {msg.content}
                                </div>
                            </div>
                        ))}

                        {loading && <div className="text-white/60 text-sm">Scrivendo...</div>}
                        {error && <div className="text-red-400 text-sm">{error}</div>}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className="p-4 border-t border-white/10 flex gap-2">
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSend()}
                            className="flex-1 bg-white/10 backdrop-blur-md text-white rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-white/50 transition placeholder-white/50"
                            placeholder="Scrivi la tua domanda..."
                        />
                        <LiquidGlassButton
                            onClick={handleSend}
                            disabled={loading}
                            color_text="white"
                            variant="navbar"
                        >
                            →
                        </LiquidGlassButton>
                    </div>
                </div>
            )}
        </>
    );
}