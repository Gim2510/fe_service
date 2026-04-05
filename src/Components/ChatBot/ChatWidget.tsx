import { useState, useEffect } from "react";
import { useChatBot } from "../../hooks/useChatBot.ts";
import ChatIcon from '@mui/icons-material/Chat';
import { LiquidGlassButton } from "../Buttons/LiquidGlassButton.tsx";
import {FallingLines} from "react-loader-spinner";

export function ChatWidget({ open, setOpen, theme }: { open: boolean; setOpen: (open: boolean) => void, theme: string }) {
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
                className={`fixed bottom-6 cursor-pointer right-6 z-50 w-14 h-14 sm:w-16 sm:h-16 rounded-full backdrop-blur-lg ${ theme === "dark" ? "bg-white/20" : "bg-black/40"} border border-white/20 shadow-lg flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-all ease-in-out duration-500`}
            >
                <ChatIcon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </button>

            {/* Chat Box Animata */}
            {(show || open) && (
                <div
                    className={`
                        fixed bottom-24 right-6 w-[300px] sm:w-[380px] h-[520px] bg-black/30 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl flex flex-col z-50 overflow-hidden
                        transform transition-all duration-600
                        ${open ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}
                    `}
                >
                    {/* Header */}
                    <div className={`px-6 py-4  border-b border-white/10 ${theme === 'dark' ? 'text-white' : 'text-white'} font-semibold backdrop-blur-md bg-black/30`}>
                        <div className="gap-3 flex justify-between items-center">
                            Consulente AI
                            {/* Avatar AI */}
                            <div className="w-9 h-9">
                                <svg viewBox="0 0 100 100" className="w-full h-full">

                                    {/* Glow */}
                                    <circle cx="50" cy="50" r="40" fill="white" opacity="0.08">
                                        <animate attributeName="r" values="38;42;38" dur="2.5s"
                                                 repeatCount="indefinite"/>
                                    </circle>

                                    {/* Corpo */}
                                    <rect x="25" y="30" width="50" height="40" rx="14" fill="white" opacity="0.9"/>

                                    {/* Floating animation */}
                                    <animateTransform
                                        attributeName="transform"
                                        type="translate"
                                        values="0 0; 0 -2; 0 0"
                                        dur="2s"
                                        repeatCount="indefinite"
                                    />

                                    {/* Occhi */}
                                    <g>
                                        <circle cx="42" cy="50" r="4" fill="black">
                                            {/* blink */}
                                            <animate attributeName="ry" values="4;0.5;4" dur="3s"
                                                     repeatCount="indefinite"/>
                                        </circle>
                                        <circle cx="58" cy="50" r="4" fill="black">
                                            <animate attributeName="ry" values="4;0.5;4" dur="3s" begin="0.2s"
                                                     repeatCount="indefinite"/>
                                        </circle>
                                    </g>

                                    {/* Mouth subtle */}
                                    <rect x="42" y="62" width="16" height="3" rx="2" fill="black" opacity="0.7"/>

                                    {/* Antenna */}
                                    <line x1="50" y1="30" x2="50" y2="18" stroke="white" strokeWidth="2.5"/>
                                    <circle cx="50" cy="15" r="2.5" fill="white">
                                        <animate attributeName="opacity" values="1;0.3;1" dur="1.5s"
                                                 repeatCount="indefinite"/>
                                    </circle>

                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages.map((msg, i) => (
                            <div key={i}
                                 className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} font-semibold tracking-wide`}>
                                <div className={`max-w-[75%] px-4 py-1 rounded-2xl text-sm
                                    ${msg.role === "user"
                                    ? "bg-black/30 text-white backdrop-blur-sm border border-white/10"
                                    : "bg-black/10 text-white backdrop-blur-sm border border-white/10"}`}>
                                    {msg.content}
                                </div>
                            </div>
                        ))}

                        {loading && <div className="text-white/60 text-sm"><FallingLines
                            color={theme === "dark" ? "#fff" : "#000"} width="30" visible={true}
                            ariaLabel="falling-circles-loading"/></div>}
                        {error && <div
                            className="text-red-400 text-sm font-semibold py-1 px-4 bg-black/30 backdrop-blur-sm w-fit rounded-4xl shadow-lg border border-white/10">{error}</div>}
                        <div ref={messagesEndRef}/>
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