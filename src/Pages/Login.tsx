import  {useState} from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useLogin.ts";

export function Login() {
    const navigate = useNavigate();
    const { doLogin, loading, error } = useLogin();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await doLogin({ email, password });
            navigate("/");
        } catch (_) {}
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-main-white">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-8 rounded-xl shadow-lg w-96 bg-white">
                <h2 className="text-2xl font-bold text-center">Accedi</h2>
                {error && <div className="text-red-600 text-sm">{error}</div>}

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border rounded-xl p-3 focus:outline-none focus:ring-2"
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border rounded-xl p-3 focus:outline-none focus:ring-2"
                    required
                />

                <button
                    type="submit"
                    disabled={loading}
                    className={`mt-2 py-3 rounded-xl text-white font-semibold transition-all ${
                        loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-buttons hover:scale-105"
                    }`}
                >
                    {loading ? "Caricamento…" : "Login"}
                </button>

                <p className="text-sm text-center">
                    Non hai un account?{" "}
                    <span className="text-blue-600 cursor-pointer hover:underline" onClick={() => navigate("/register")}>
            Registrati
          </span>
                </p>
            </form>
        </div>
    );
}
