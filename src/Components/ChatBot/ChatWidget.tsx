import { useState } from "react";
import {useChatBot} from "../../hooks/useChatBot.ts";
import ChatIcon from '@mui/icons-material/Chat';

export function ChatWidget({open, setOpen}: {open: boolean, setOpen: (open: boolean) => void}) {
    const [input, setInput] = useState("");

    const {
        messages,
        loading,
        error,
        sendMessage,
        messagesEndRef
    } = useChatBot();

    const handleSend = async () => {
        await sendMessage(input);
        setInput("");
    };

    return (
        <>
            {/* Floating Button */}
            <button
                onClick={() => setOpen(!open)}
                className="fixed bottom-6 right-6 z-50 bg-white cursor-pointer text-black rounded-full px-6 py-3 shadow-xl hover:scale-110 active:scale-95 transition-all"
            >
                <ChatIcon width={20} height={20} fill='black' />
            </button>

            {open && (
                <div className="fixed bottom-24 right-6 w-[380px] h-[520px] bg-neutral-900 border border-neutral-700 rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden">

                    {/* Header */}
                    <div className="px-6 py-4 border-b border-neutral-800 text-white font-semibold">
                        Consulente Digitale
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages.map((msg, i) => (
                            <div
                                key={i}
                                className={`flex ${
                                    msg.role === "user"
                                        ? "justify-end"
                                        : "justify-start"
                                }`}
                            >
                                <div
                                    className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm ${
                                        msg.role === "user"
                                            ? "bg-white text-black"
                                            : "bg-neutral-800 text-neutral-200"
                                    }`}
                                >
                                    {msg.content}
                                </div>
                            </div>
                        ))}

                        {loading && (
                            <div className="text-neutral-400 text-sm">
                                Scrivendo...
                            </div>
                        )}

                        {error && (
                            <div className="text-red-400 text-sm">
                                {error}
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className="p-4 border-t border-neutral-800 flex gap-2">
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) =>
                                e.key === "Enter" && handleSend()
                            }
                            className="flex-1 bg-neutral-800 text-white rounded-xl px-4 py-2 outline-none focus:ring-1 focus:ring-white"
                            placeholder="Scrivi la tua domanda..."
                        />
                        <button
                            onClick={handleSend}
                            disabled={loading}
                            className="bg-white text-black px-4 rounded-xl hover:scale-105 active:scale-95 transition-all cursor-pointer"
                        >
                            →
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
