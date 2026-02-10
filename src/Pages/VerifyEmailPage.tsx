import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export function VerifyEmailPage() {
    const { _id } = useParams<{ _id: string }>();
    const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

    useEffect(() => {
        if (!_id) return;

        fetch(`https://${import.meta.env.VITE_USER_BASE_URL}/v1/user/verify/${_id}`)
            .then(res => {
                if (res.ok) return res.json();
                throw new Error("Verification failed");
            })
            .then(() => setStatus("success"))
            .catch(() => setStatus("error"));
    }, [_id]);

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", fontFamily: "Arial, sans-serif" }}>
            {status === "loading" && <p>Verifying your email...</p>}
            {status === "success" && <p style={{ color: "green" }}>✅ Email verified successfully!</p>}
            {status === "error" && <p style={{ color: "red" }}>❌ Verification failed or link invalid.</p>}
        </div>
    );
}
