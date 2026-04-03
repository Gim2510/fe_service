import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import { LiquidGlassButton } from "../Components/Buttons/LiquidGlassButton.tsx";
import { FallingLines } from "react-loader-spinner";
import { useTheme } from "../Context/ThemeContext.tsx";
import { Input } from "../Components/Inputs/Input.tsx";

type RestoreInfo = {
    restored: boolean;
    daysSinceDeletion?: number;
};

export function Login() {
    const { theme } = useTheme();
    const navigate = useNavigate();
    const { doLogin, loading, error } = useLogin();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [restoreInfo, setRestoreInfo] = useState<RestoreInfo | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const res = await doLogin({ email, password });

            // 🔥 Restore flow
            if (res?.restored) {
                setRestoreInfo({
                    restored: true,
                    daysSinceDeletion: res.daysSinceDeletion,
                });
                return;
            }

            // normal login
            navigate("/");
        } catch (_) {}
    };

    const handleContinue = () => {
        navigate("/");
    };

    return (
        <main className="relative min-h-screen flex items-center overflow-hidden bg-neutral-950 text-white">

            {/* Gradient background */}
            <div
                className={`absolute inset-0 ${
                    theme === "dark"
                        ? "bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-800"
                        : "bg-primary-white"
                }`}
            />

            {/* Grid texture */}
            <div
                className={`absolute inset-0 opacity-10 bg-[size:32px_32px] ${
                    theme === "dark"
                        ? "bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)]"
                        : "bg-[radial-gradient(circle_at_1px_1px,black_1px,transparent_0)]"
                }`}
            />

            <div
                className={`relative z-10 mx-auto w-full max-w-5xl px-8 py-24 grid lg:grid-cols-2 gap-20 items-center ${
                    theme === "dark" ? "text-white" : "text-black"
                }`}
            >
                {/* LEFT COPY */}
                <div className="hidden lg:flex flex-col gap-8">
                    <span
                        className={`text-sm uppercase tracking-widest ${
                            theme === "dark" ? "text-neutral-400" : "text-black"
                        }`}
                    >
                        Bentornato
                    </span>

                    <h1 className="text-5xl font-semibold leading-tight">
                        Accedi al tuo
                        <br />
                        <span className="text-main-red">
                            spazio di controllo.
                        </span>
                    </h1>

                    <p
                        className={`text-lg ${
                            theme === "dark"
                                ? "text-neutral-300"
                                : "text-black"
                        } max-w-lg`}
                    >
                        Visualizza dati, analisi e strumenti progettati per
                        rendere il tuo business più chiaro, misurabile e
                        scalabile.
                    </p>
                </div>

                {/* LOGIN CARD */}
                <div className="relative">
                    <div
                        className={`rounded-3xl ${
                            theme === "dark"
                                ? "bg-neutral-900/70 border border-neutral-800"
                                : "bg-white/40 shadow-3xl"
                        } backdrop-blur-xl p-10 shadow-2xl`}
                    >
                        {/* 🔥 RESTORE BANNER */}
                        {restoreInfo?.restored && (
                            <div className="mb-6 rounded-2xl border border-green-500/30 bg-green-500/10 p-4 text-sm text-green-300 flex flex-col gap-3">
                                <div>
                                    Bentornato! Il tuo account è stato
                                    ripristinato
                                    {restoreInfo.daysSinceDeletion !== undefined && (
                                        <span>
                                            {" "}
                                            dopo{" "}
                                            <b>
                                                {restoreInfo.daysSinceDeletion}
                                            </b>{" "}
                                            giorni
                                        </span>
                                    )}
                                    .
                                </div>

                                <button
                                    type="button"
                                    onClick={handleContinue}
                                    className="self-end px-4 py-2 rounded-xl bg-green-500/20 hover:bg-green-500/30 transition"
                                >
                                    Chiudi e continua
                                </button>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="flex flex-col gap-6">

                            <div className="text-center mb-2">
                                <h2 className="text-2xl font-semibold">
                                    Accedi
                                </h2>
                                <p className="text-sm text-neutral-500 mt-1">
                                    Inserisci le tue credenziali
                                </p>
                            </div>

                            {error && (
                                <div className="text-sm px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400">
                                    {error}
                                </div>
                            )}

                            <Input
                                name="email"
                                type="email"
                                label="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                theme={theme}
                            />

                            <Input
                                name="password"
                                type="password"
                                label="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                theme={theme}
                            />

                            <LiquidGlassButton
                                type="submit"
                                disabled={loading}
                                variant="navbar"
                                scale={false}
                                fillBackground='main'
                                className="mt-4"
                            >
                                {loading ? (
                                    <FallingLines
                                        color={theme === "dark" ? "white" : "black"}
                                        width="20"
                                        visible={true}
                                        ariaLabel="loading"
                                    />
                                ) : (
                                    "Accedi"
                                )}
                            </LiquidGlassButton>

                            <div className="text-center text-sm text-neutral-500 mt-2">
                                <button
                                    type="button"
                                    onClick={() => navigate("/password-reset")}
                                    className={`${
                                        theme === "dark"
                                            ? "text-neutral-300 hover:text-white"
                                            : "text-black hover:text-neutral-400"
                                    } transition cursor-pointer`}
                                >
                                    Password dimenticata?
                                </button>
                            </div>

                            <div
                                className={`text-center text-sm mt-4 ${
                                    theme === "dark"
                                        ? "text-neutral-500"
                                        : "text-black"
                                }`}
                            >
                                Non hai un account?{" "}
                                <button
                                    type="button"
                                    onClick={() => navigate("/register")}
                                    className={`${
                                        theme === "dark"
                                            ? "text-neutral-300 hover:text-white"
                                            : "text-black hover:text-neutral-400"
                                    } transition cursor-pointer`}
                                >
                                    Registrati
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}