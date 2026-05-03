import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { SectionBase } from "./SectionBase.tsx";
import { GlassCard } from "./GlassCard.tsx";

function ConsultingIllustration({ isDark }: { isDark: boolean }) {
    const surface  = isDark ? "#1C1C1A" : "#FFFFFF";
    const gold     = "#C9A84C";
    const goldGlow = isDark ? "rgba(201,168,76,0.18)" : "rgba(201,168,76,0.22)";
    const text2    = isDark ? "#78716C" : "#7C6F60";
    const green    = "#4ADE80";
    const blue     = "#60A5FA";
    const purple   = "#A78BFA";
    const red      = "#F87171";
    const teal     = "#2DD4BF";
    const orange   = "#FB923C";
    const pink     = "#F472B6";
    const lime     = "#A3E635";
    const indigo   = "#818CF8";
    const rose     = "#FB7185";
    const cyan     = "#22D3EE";

    const cx = 190, cy = 142, R = 88, Rs = 138;

    const nodes = [
        { angle: 90,  label: "CRM",        sub: "+24% lead",   color: gold,   metric: true  },
        { angle: 30,  label: "Analytics",  sub: "Real-time",   color: blue,   metric: false },
        { angle: 330, label: "Finance",    sub: "−12% costi",  color: green,  metric: true  },
        { angle: 270, label: "Operations", sub: "Automatizzato",color: purple, metric: false },
        { angle: 210, label: "Marketing",  sub: "€2.4M pipe",  color: red,    metric: true  },
        { angle: 150, label: "HR",         sub: "Score 91/100",color: teal,   metric: false },
    ];

    const satellites = [
        { angle: 60,  label: "Legal",      color: orange },
        { angle: 0,   label: "IT",         color: cyan   },
        { angle: 300, label: "Payroll",    color: pink   },
        { angle: 240, label: "ESG",        color: lime   },
        { angle: 180, label: "Training",   color: indigo },
        { angle: 120, label: "Recruiting", color: rose   },
    ];

    const toRad = (deg: number) => (deg * Math.PI) / 180;

    return (
        <svg viewBox="0 0 380 284" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <defs>
                <radialGradient id="hubGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor={gold} stopOpacity="0.55"/>
                    <stop offset="60%" stopColor={gold} stopOpacity="0.18"/>
                    <stop offset="100%" stopColor={gold} stopOpacity="0"/>
                </radialGradient>
                {/* glow filter for hub */}
                <filter id="glowHub" x="-60%" y="-60%" width="220%" height="220%">
                    <feGaussianBlur stdDeviation="6" result="blur"/>
                    <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                </filter>
                {/* glow filter for nodes */}
                <filter id="glowNode" x="-40%" y="-40%" width="180%" height="180%">
                    <feGaussianBlur stdDeviation="3.5" result="blur"/>
                    <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                </filter>
                {/* glow for packets */}
                <filter id="glowPacket" x="-100%" y="-100%" width="300%" height="300%">
                    <feGaussianBlur stdDeviation="2.5" result="blur"/>
                    <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                </filter>
                <style>{`
                    @keyframes nodeFloat0 { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-5px)} }
                    @keyframes nodeFloat1 { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-4px)} }
                    @keyframes nodeFloat2 { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-6px)} }
                    @keyframes nodeFloat3 { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-4px)} }
                    @keyframes nodeFloat4 { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-5px)} }
                    @keyframes nodeFloat5 { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-3px)} }
                    .node-0 { animation: nodeFloat0 3.2s ease-in-out infinite; transform-origin: center; transform-box: fill-box; }
                    .node-1 { animation: nodeFloat1 3.8s ease-in-out 0.4s infinite; transform-origin: center; transform-box: fill-box; }
                    .node-2 { animation: nodeFloat2 3.5s ease-in-out 0.8s infinite; transform-origin: center; transform-box: fill-box; }
                    .node-3 { animation: nodeFloat3 4.0s ease-in-out 1.2s infinite; transform-origin: center; transform-box: fill-box; }
                    .node-4 { animation: nodeFloat4 3.3s ease-in-out 0.6s infinite; transform-origin: center; transform-box: fill-box; }
                    .node-5 { animation: nodeFloat5 3.7s ease-in-out 1.0s infinite; transform-origin: center; transform-box: fill-box; }
                    @keyframes hubPulse { 0%,100%{opacity:0.18} 50%{opacity:0.35} }
                    .hub-glow { animation: hubPulse 2.4s ease-in-out infinite; }
                `}</style>
            </defs>

            {/* ── ambient glow behind hub ── */}
            <circle cx={cx} cy={cy} r="130" fill="url(#hubGlow)" className="hub-glow"/>

            {/* ── satellite outer nodes ── */}
            {satellites.map((s, i) => {
                const sx = cx + Rs * Math.cos(toRad(s.angle));
                const sy = cy - Rs * Math.sin(toRad(s.angle));
                // find parent node at same sector
                const parent = nodes.find(n => n.angle === s.angle) ??
                    nodes.reduce((a, b) =>
                        Math.abs(a.angle - s.angle) < Math.abs(b.angle - s.angle) ? a : b
                    );
                const px2 = cx + R * Math.cos(toRad(parent.angle));
                const py2 = cy - R * Math.sin(toRad(parent.angle));
                return (
                    <g key={i}>
                        <line x1={px2} y1={py2} x2={sx} y2={sy}
                            stroke={s.color} strokeWidth="0.9" strokeOpacity="0.20" strokeDasharray="3 4"/>
                        <circle r="2.2" fill={s.color} opacity="0.80" filter="url(#glowPacket)">
                            <animateMotion
                                dur={`${2.8 + i * 0.4}s`}
                                begin={`${i * 0.6}s`}
                                repeatCount="indefinite"
                                path={`M ${px2},${py2} L ${sx},${sy}`}
                            />
                            <animate attributeName="opacity" values="0;0.85;0.85;0" keyTimes="0;0.1;0.85;1"
                                dur={`${2.8 + i * 0.4}s`} begin={`${i * 0.6}s`} repeatCount="indefinite"/>
                        </circle>
                        <circle cx={sx} cy={sy} r="15" fill={surface} stroke={s.color} strokeWidth="1.0" strokeOpacity="0.65" filter="url(#glowNode)"/>
                        <circle cx={sx} cy={sy} r="15" fill={s.color} fillOpacity="0.10"/>
                        <text x={sx} y={sy + 4} fontSize="7.5" fill={s.color} fontFamily="system-ui"
                            fontWeight="700" textAnchor="middle" letterSpacing="0.2">{s.label}</text>
                    </g>
                );
            })}

            {/* ── satellite outer ring ── */}
            <circle cx={cx} cy={cy} r={Rs} stroke={gold} strokeWidth="0.5" strokeOpacity="0.07" strokeDasharray="4 8"/>

            {/* ── connection lines + animated packets ── */}
            {nodes.map((n, i) => {
                const nx = cx + R * Math.cos(toRad(n.angle));
                const ny = cy - R * Math.sin(toRad(n.angle));
                const dur = `${2.2 + i * 0.35}s`;
                const delay = `${i * 0.5}s`;
                return (
                    <g key={i}>
                        <line x1={cx} y1={cy} x2={nx} y2={ny}
                            stroke={n.color} strokeWidth="1.2" strokeOpacity="0.25" strokeDasharray="4 4"/>
                        {/* animated packet */}
                        <circle r="3" fill={n.color} opacity="0.85" filter="url(#glowPacket)">
                            <animateMotion
                                dur={dur}
                                begin={delay}
                                repeatCount="indefinite"
                                path={`M ${cx},${cy} L ${nx},${ny}`}
                            />
                            <animate attributeName="opacity" values="0;0.9;0.9;0" keyTimes="0;0.1;0.85;1" dur={dur} begin={delay} repeatCount="indefinite"/>
                        </circle>
                    </g>
                );
            })}

            {/* ── outer ring ── */}
            <circle cx={cx} cy={cy} r={R} stroke={gold} strokeWidth="0.8" strokeOpacity="0.12" strokeDasharray="6 6"/>

            {/* ── satellite nodes (floating) ── */}
            {nodes.map((n, i) => {
                const nx = cx + R * Math.cos(toRad(n.angle));
                const ny = cy - R * Math.sin(toRad(n.angle));
                const isLeft = nx < cx - 10;
                const isRight = nx > cx + 10;
                const badgeX = isLeft ? nx - 56 : isRight ? nx + 4 : nx - 26;
                const badgeY = ny < cy ? ny - 30 : ny + 14;
                return (
                    <g key={i} className={`node-${i}`}>
                        <circle cx={nx} cy={ny} r="22" fill={surface} stroke={n.color} strokeWidth="1.4" strokeOpacity="0.7" filter="url(#glowNode)"/>
                        <circle cx={nx} cy={ny} r="22" fill={n.color} fillOpacity="0.10"/>
                        <text x={nx} y={ny - 4} fontSize="9" fill={n.color} fontFamily="system-ui"
                            fontWeight="700" textAnchor="middle" letterSpacing="0.2">{n.label}</text>
                        <text x={nx} y={ny + 8} fontSize="7.5" fill={text2} fontFamily="system-ui"
                            textAnchor="middle">{n.sub}</text>
                        {n.metric && (
                            <g>
                                <rect x={badgeX} y={badgeY} width="52" height="18" rx="5"
                                    fill={surface} stroke={n.color} strokeWidth="0.8" strokeOpacity="0.5"/>
                                <text x={badgeX + 26} y={badgeY + 12} fontSize="8" fill={n.color}
                                    fontFamily="system-ui" fontWeight="600" textAnchor="middle">{n.sub}</text>
                            </g>
                        )}
                    </g>
                );
            })}

            {/* ── Central hub ── */}
            <circle cx={cx} cy={cy} r="36" fill={surface} stroke={gold} strokeWidth="2.5" strokeOpacity="0.9" filter="url(#glowHub)"/>
            <circle cx={cx} cy={cy} r="36" fill={goldGlow}/>
            <circle cx={cx} cy={cy} r="28" stroke={gold} strokeWidth="0.8" strokeOpacity="0.25"/>
            <text x={cx} y={cy - 6} fontSize="11" fill={gold} fontFamily="system-ui"
                fontWeight="700" textAnchor="middle" letterSpacing="1">PMI</text>
            <text x={cx} y={cy + 8} fontSize="7.5" fill={text2} fontFamily="system-ui"
                textAnchor="middle">Digital Core</text>
            {/* expanding pulse rings via SMIL */}
            <circle cx={cx} cy={cy} r="44" stroke={gold} strokeWidth="1.2" fill="none">
                <animate attributeName="r" values="44;58" dur="2.4s" repeatCount="indefinite"/>
                <animate attributeName="opacity" values="0.3;0" dur="2.4s" repeatCount="indefinite"/>
            </circle>
            <circle cx={cx} cy={cy} r="44" stroke={gold} strokeWidth="1" fill="none">
                <animate attributeName="r" values="44;58" dur="2.4s" begin="1.2s" repeatCount="indefinite"/>
                <animate attributeName="opacity" values="0.2;0" dur="2.4s" begin="1.2s" repeatCount="indefinite"/>
            </circle>
        </svg>
    );
}

const punti = [
    "CRM progettati sul tuo processo di vendita reale",
    "Automazione che elimina il lavoro ripetitivo ad alto costo",
    "Integrazione dei tuoi software esistenti senza sostituire tutto",
    "Dashboard operative con i KPI che contano davvero",
    "AI applicata dove genera ROI misurabile",
    "Soluzioni che scalano con la tua crescita, senza rilavorare",
];

export function WAWD({ theme }: { theme: string }) {
    const isDark = theme === "dark";

    return (
        <SectionBase theme={theme}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                {/* Image card */}
                <motion.div
                    initial={{ opacity: 0, x: -24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                    <GlassCard theme={theme} hover={false} className="overflow-hidden">
                        <div className={`aspect-[4/3] rounded-2xl flex items-center justify-center p-6 ${
                            isDark ? "bg-[#161614]" : "bg-[#F7F4F0]"
                        }`}>
                            <ConsultingIllustration isDark={isDark} />
                        </div>
                    </GlassCard>
                </motion.div>

                {/* Text content */}
                <motion.div
                    className="flex flex-col gap-7"
                    initial={{ opacity: 0, x: 24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
                >
                    <div>
                        <span className={`text-xs font-semibold uppercase tracking-widest ${
                            isDark ? "text-amber-500" : "text-amber-700"
                        }`}>
                            Soluzioni su misura
                        </span>
                        <h2 className={`font-fjalla text-3xl sm:text-4xl font-semibold leading-tight mt-3 ${
                            isDark ? "text-slate-100" : "text-slate-900"
                        }`}>
                            Non vendiamo software. Risolviamo i problemi specifici della tua azienda.
                        </h2>
                        <p className={`mt-4 text-base leading-relaxed ${
                            isDark ? "text-slate-400" : "text-slate-600"
                        }`}>
                            Partiamo dall'analisi dei tuoi processi reali — non da un template. Ogni soluzione è progettata per il tuo contesto, integrata con ciò che già usi e misurabile fin dal primo giorno.
                        </p>
                    </div>

                    {/* Checklist */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {punti.map((item, i) => (
                            <motion.div
                                key={item}
                                className={`flex items-start gap-3 text-sm ${
                                    isDark ? "text-slate-400" : "text-slate-600"
                                }`}
                                initial={{ opacity: 0, x: 12 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ duration: 0.4, delay: 0.1 + i * 0.07 }}
                            >
                                <CheckCircle2 size={15} className="text-amber-600 shrink-0 mt-0.5" />
                                <span>{item}</span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </SectionBase>
    );
}
