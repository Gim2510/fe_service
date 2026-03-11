import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import { useAuth } from "../auth/AuthContext.tsx";
import { FallingLines } from "react-loader-spinner";
import { useTheme } from "../Context/ThemeContext"; // <- importiamo il tema
import { useSetUserImage } from "../hooks/useSetUserImage";
import {LiquidGlassButton} from "../Components/Buttons/LiquidGlassButton.tsx";

export function UserDashboard() {
    const {setUserImage, loading: uploading} = useSetUserImage();
    const { theme } = useTheme(); // light / dark
    const { user, loading, error, refetch } = useUser();
    const { id, logout, token } = useAuth();
    const navigate = useNavigate();
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [showImageModal, setShowImageModal] = useState(false);

    const [activeTab, setActiveTab] = useState("account");

    if (loading) {
        return (
            <main className={`${theme === "dark" ? "bg-neutral-950 text-white" : "bg-neutral-50 text-neutral-900"} min-h-screen flex items-center justify-center`}>
                <FallingLines
                    color={theme === "dark" ? "#fff" : "#000"}
                    width={100}
                    visible={true}
                    ariaLabel="falling-circles-loading"
                />
            </main>
        );
    }

    if (error) {
        return (
            <main className={`${theme === "dark" ? "bg-neutral-950 text-white" : "bg-neutral-50 text-neutral-900"} min-h-screen flex items-center justify-center`}>
                <div className="text-center">
                    <p className={`${theme === "dark" ? "text-red-400" : "text-red-600"} mb-4`}>{error}</p>
                    <button
                        onClick={refetch}
                        className={`${theme === "dark" ? "bg-white text-neutral-900" : "bg-neutral-900 text-white"} px-6 py-3 rounded-full`}
                    >
                        Riprova
                    </button>
                </div>
            </main>
        );
    }

    if (!user) return null;

    const tabs = [
        { id: "account", label: "Informazioni account" },
        { id: "status", label: "Stato account" },
        { id: "security", label: "Sicurezza" },
        { id: "activity", label: "Attività" },
        { id: "actions", label: "Azioni" },
    ];

    // Color helper
    const bgSection = theme === "dark" ? "bg-neutral-900/70 border-neutral-800" : "bg-white/70 border-gray-200";
    const textSecondary = theme === "dark" ? "text-neutral-400" : "text-neutral-600";
    const textPrimary = theme === "dark" ? "text-white" : "text-neutral-900";
    const tabActiveBg = theme === "dark" ? "bg-neutral-900 text-white border-neutral-800" : "bg-neutral-100 text-neutral-900 border-gray-200";
    const tabInactiveText = theme === "dark" ? "text-neutral-400 hover:text-white" : "text-neutral-600 hover:text-neutral-900";
    const cardBg = theme === "dark" ? "bg-neutral-900/70 border-neutral-800 hover:bg-neutral-900" : "bg-white/70 border-gray-200 hover:bg-neutral-100";
    const highlightColor = "text-yellow-400";

    return (
        <main className={`${theme === "dark" ? "bg-neutral-950 text-white" : "bg-neutral-50 text-neutral-900"} min-h-screen px-8 pt-30 pb-40`}>
            <div className="max-w-6xl mx-auto space-y-8">

                {/* HEADER */}
                <section>
                    <h1 className="text-4xl font-semibold mb-2">{textPrimary && "Area personale"}</h1>
                    <p className={`${textSecondary}`}>Panoramica completa del tuo account e delle attività collegate.</p>
                </section>
                {/* USER IMAGE */}
                <section className={`${bgSection} border rounded-3xl p-10`}>
                    <h2 className={`text-2xl font-medium mb-8 ${textPrimary}`}>Immagine profilo</h2>

                    <div className="flex items-center gap-8">

                        {/* preview */}
                        <div className="w-28 h-28 rounded-full overflow-hidden border border-neutral-700 flex items-center justify-center bg-neutral-800">
                            {selectedImage ? (
                                <img alt='user_image' src={selectedImage} className="w-full h-full object-cover"/>
                            ) : user.user_image ? (
                                <img alt='user_image' src={user.user_image} className="w-full h-full object-cover"/>
                            ) : (
                                <span className="text-sm text-neutral-400">No image</span>
                            )}
                        </div>

                        {/* upload */}
                        <div className="space-y-3">
                            <label
                                className={`inline-flex items-center gap-3 px-5 py-3 rounded-xl border border-neutral-700 hover:border-neutral-500 transition cursor-pointer ${theme === "dark" ? "bg-neutral-900/60 hover:bg-neutral-900" : " bg-white/40 hover:bg-white hover:scale-105"} text-sm`}>

                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-5 h-5 opacity-80"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M3 15a4 4 0 014-4h1m4-4l4 4m0 0l-4 4m4-4H7"
                                    />
                                </svg>

                                <span>Carica immagine</span>

                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (!file) return;

                                        const reader = new FileReader();
                                        reader.onloadend = () => {
                                            setSelectedImage(reader.result as string);
                                            setShowImageModal(true);
                                        };
                                        reader.readAsDataURL(file);
                                    }}
                                />
                            </label>

                            <p className="text-xs text-neutral-500">
                                PNG, JPG – max 2MB
                            </p>
                        </div>

                    </div>
                </section>

                {/* TAB NAVIGATION */}
                <div
                    className={`flex space-x-4 overflow-x-auto border-b mb-6 ${theme === "dark" ? "border-neutral-800" : "border-gray-300"}`}>
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-4 py-2 font-medium rounded-t-xl transition cursor-pointer
                                ${activeTab === tab.id ? tabActiveBg : tabInactiveText}`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* TAB CONTENT */}
                <div className="space-y-8">
                    {activeTab === "account" && (
                        <Section title="Informazioni account" bgSection={bgSection} textSecondary={textSecondary}
                                 textPrimary={textPrimary}>
                            <div className="grid md:grid-cols-3 gap-8 text-sm">
                                <InfoRow label="Nome" value={user.given_name} highlightColor={highlightColor}/>
                                <InfoRow label="Cognome" value={user.family_name} highlightColor={highlightColor} />
                                <InfoRow label="Email" value={user.email} highlightColor={highlightColor} />
                                <InfoRow label="Codice fiscale" value={user.fiscal_code} highlightColor={highlightColor} />
                                <InfoRow label="Partita IVA" value={user.partita_iva || "—"} highlightColor={highlightColor} />
                                <InfoRow label="Company Name" value={user.company_name?.toLowerCase() || "-"} highlightColor={highlightColor} />
                                <InfoRow label="Company Role" value={user.company_role?.toLowerCase() || "—"} highlightColor={highlightColor} />
                                <InfoRow label="Email verificata" value={user.emailVerified ? "Sì" : "No"} highlight={!user.emailVerified} highlightColor={highlightColor} />
                                <InfoRow label="Ruolo" value={user.role} highlightColor={highlightColor} />
                                <InfoRow label="VIP" value={user.vip ? "Sì" : "No"} highlightColor={highlightColor} />
                                <div className="md:col-span-3">
                                    <span className={`${textSecondary}`}>ID Utente</span>
                                    <p className="text-xs break-all" style={{ color: theme === "dark" ? "#aaa" : "#555" }}>{user._id}</p>
                                </div>
                            </div>
                        </Section>
                    )}

                    {activeTab === "status" && (
                        <Section title="Stato account" bgSection={bgSection} textSecondary={textSecondary} textPrimary={textPrimary}>
                            <div className="grid md:grid-cols-3 gap-8 text-sm">
                                <InfoRow label="Sospeso" value={user.isSuspended ? "Sì" : "No"} highlight={user.isSuspended} highlightColor={highlightColor} />
                                <InfoRow label="Inattivo" value={user.inactive ? "Sì" : "No"} highlight={user.inactive} highlightColor={highlightColor} />
                                <InfoRow label="Scadenza" value={user.expirationDate ? new Date(user.expirationDate).toLocaleDateString() : "Nessuna"} />
                            </div>
                        </Section>
                    )}

                    {activeTab === "security" && (
                        <Section title="Sicurezza e accesso" bgSection={bgSection} textSecondary={textSecondary} textPrimary={textPrimary}>
                            <div className="grid md:grid-cols-2 gap-8 text-sm">
                                <InfoRow label="Metodo di accesso" value={user.auth.type} />
                                {user.auth.provider && <InfoRow label="Provider OAuth" value={user.auth.provider} />}
                                <InfoRow label="Ultimo accesso" value={user.last_login ? new Date(user.last_login).toLocaleString() : "Mai"} />
                                <InfoRow label="Ultima modifica email" value={user.lastEmailChange ? new Date(user.lastEmailChange).toLocaleString() : "—"} />
                            </div>
                        </Section>
                    )}

                    {activeTab === "activity" && (
                        <Section title="Attività" bgSection={bgSection} textSecondary={textSecondary} textPrimary={textPrimary}>
                            <div className="grid md:grid-cols-3 gap-8 text-sm">
                                <InfoRow label="Score proprietario" value={user.ownerTotalScore?.toString() || "—"} />
                                <InfoRow label="Score utente" value={user.userTotalScore?.toString() || "—"} />
                                <InfoRow label="Preferiti" value={user.favorites?.length?.toString() || "0"} />
                            </div>
                        </Section>
                    )}
                    {activeTab === "actions" && (
                        <section>
                            <h2 className={`text-2xl font-medium mb-8 ${textPrimary}`}>Azioni disponibili</h2>
                            <div className="grid md:grid-cols-3 gap-8">
                                <ActionCard title="Modifica profilo" description="Aggiorna le informazioni del tuo account." onClick={() => navigate("/user/edit")} bg={cardBg} textSecondary={textSecondary} />
                                <ActionCard title="Visualizza analisi" description="Consulta i risultati della tua maturità digitale." onClick={() => navigate("/survey")} bg={cardBg} textSecondary={textSecondary} />
                                <ActionCard title="Logout" description="Termina la sessione corrente." onClick={logout} bg={cardBg} textSecondary={textSecondary} />
                            </div>
                        </section>
                    )}
                </div>
            </div>
            {showImageModal && selectedImage && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

                    <div className={`${bgSection} p-8 rounded-2xl w-full max-w-md space-y-6`}>

                        <h2 className={`text-xl font-semibold ${textPrimary}`}>
                            Conferma immagine profilo
                        </h2>

                        <img
                            alt='user_'
                            src={selectedImage}
                            className="w-40 h-40 rounded-full object-cover mx-auto"
                        />

                        <p className={`text-sm text-center ${textSecondary}`}>
                            Vuoi impostare questa immagine come foto profilo?
                        </p>

                        <div className="flex justify-end gap-4 pt-4">

                            <LiquidGlassButton
                                variant='navbar'
                                className='!bg-white !text-black'
                                onClick={() => {
                                    setShowImageModal(false);
                                    setSelectedImage(null);
                                }}
                            >
                                Annulla
                            </LiquidGlassButton>

                            <LiquidGlassButton
                                onClick={async () => {
                                    await setUserImage(id, selectedImage, token);
                                    setShowImageModal(false);
                                    setSelectedImage(null);
                                    refetch();
                                }}
                                disabled={uploading}
                                variant='navbar'
                                className='!bg-white !text-black min-w-30'
                            >
                                {uploading ? <FallingLines
                                    color={theme === "dark" ? "#fff" : "#000"}
                                    width="15"
                                    visible={true}
                                    ariaLabel="falling-circles-loading"
                                /> : "Conferma"}
                            </LiquidGlassButton>

                        </div>
                    </div>

                </div>
            )}
        </main>
    );
}

/* ───────────── Helpers ───────────── */

function Section({ title, children, bgSection, textPrimary }: { title: string; children: React.ReactNode; bgSection: string; textSecondary: string; textPrimary: string }) {
    return (
        <div className={`${bgSection} border rounded-3xl p-10`}>
            <h2 className={`text-2xl font-medium mb-8 ${textPrimary}`}>{title}</h2>
            {children}
        </div>
    );
}

function InfoRow({ label, value, highlight, highlightColor }: { label: string; value?: string; highlight?: boolean; highlightColor?: string }) {
    return (
        <div>
            <span className="text-neutral-500">{label}</span>
            <p className={`text-lg ${highlight ? highlightColor : ""}`}>{value || "Non impostato"}</p>
        </div>
    );
}

function ActionCard({ title, description, onClick, bg, textSecondary }: { title: string; description: string; onClick: () => void; bg: string; textSecondary: string }) {
    return (
        <div
            onClick={onClick}
            className={`cursor-pointer group border rounded-3xl p-8 transition ${bg}`}
        >
            <h3 className="text-lg font-medium mb-4">{title}</h3>
            <p className={`text-sm ${textSecondary}`}>{description}</p>
            <div className="mt-6 h-px bg-gradient-to-r from-transparent via-neutral-600 to-transparent opacity-0 group-hover:opacity-100 transition" />
        </div>
    );
}