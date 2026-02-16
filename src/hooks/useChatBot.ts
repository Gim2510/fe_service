import { useEffect, useRef, useState } from "react";
import {useAuth} from "../auth/AuthContext.tsx";

export type ChatMessage = {
    role: "user" | "assistant";
    content: string;
};

export function useChatBot() {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const {token, id} = useAuth()

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const chatbot_base_url = import.meta.env.VITE_CHATBOT_BASE_URL;

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const sendMessage = async (content: string) => {
        if (!content.trim()) return;

        const userMessage: ChatMessage = {
            role: "user",
            content
        };

        setMessages(prev => [...prev, userMessage]);
        setLoading(true);
        setError(null);

        try {

            const response = await fetch(`${chatbot_base_url}/v1/chat/ask/${id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(userMessage)
            });

            if (!response.ok) {
                throw new Error("Errore nella risposta del server");
            }

            const data = await response.json();

            if (data?.result) {
                setMessages(prev => [
                    ...prev,
                    { role: "assistant", content: data.result }
                ]);
            }

        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return {
        messages,
        loading,
        error,
        sendMessage,
        messagesEndRef
    };
}
