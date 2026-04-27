import { useRef, useEffect, useState } from "react";
import { useTheme } from "../../Context/ThemeContext.tsx";

// ── Types ──────────────────────────────────────────────────────────────────────

type V2 = [number, number];

// tier: 0=hub, 1=inner ring, 2=outer ring
interface NodeDef {
    id: string; label: string; x: number; y: number;
    tier: 0 | 1 | 2;
    fp: number; fs: number; fa: number;
}

// type: "spoke"=to hub, "inner"=tier1↔tier1, "outer"=tier2↔tier2, "bridge"=tier1↔tier2
type EdgeType = "spoke" | "inner" | "bridge" | "outer";
interface EdgeDef {
    from: string;
    to:   string;
    type: EdgeType;
}

interface NodeState {
    bx: number; by: number;   // base (normalized, updated on resize)
    cx: number; cy: number;   // current (normalized)
    vx: number; vy: number;   // velocity (normalized/s)
    dragged: boolean;
}

interface Packet { t: number; speed: number; }
interface Ring   { t: number; }

// ── Scene data ─────────────────────────────────────────────────────────────────

// Hub at 0.46,0.50. Tier1 inner ring r≈0.18. Tier2 outer ring r≈0.30.
// x clamped 0.20–0.76 to stay inside canvas.
const NODES: NodeDef[] = [
    // Hub
    { id: "hub",       label: "DATA HUB",  tier: 0, x: 0.46, y: 0.50, fp: 0.0, fs: 0.30, fa: 0.003 },
    // Tier 1 — inner ring, warm gold
    { id: "crm",       label: "CRM",       tier: 1, x: 0.30, y: 0.34, fp: 0.0, fs: 0.58, fa: 0.007 },
    { id: "analytics", label: "Analytics", tier: 1, x: 0.46, y: 0.26, fp: 1.1, fs: 0.72, fa: 0.006 },
    { id: "sales",     label: "Sales",     tier: 1, x: 0.55, y: 0.34, fp: 2.2, fs: 0.65, fa: 0.008 },
    { id: "finance",   label: "Finance",   tier: 1, x: 0.57, y: 0.64, fp: 3.3, fs: 0.50, fa: 0.006 },
    { id: "ops",       label: "Ops",       tier: 1, x: 0.38, y: 0.70, fp: 4.4, fs: 0.82, fa: 0.007 },
    // Tier 2 — outer ring, steel blue
    { id: "leads",     label: "Leads",     tier: 2, x: 0.20, y: 0.22, fp: 0.5, fs: 0.64, fa: 0.008 },
    { id: "reports",   label: "Reports",   tier: 2, x: 0.46, y: 0.14, fp: 1.6, fs: 0.70, fa: 0.007 },
    { id: "forecast",  label: "Forecast",  tier: 2, x: 0.62, y: 0.20, fp: 2.7, fs: 0.60, fa: 0.009 },
    { id: "pipeline",  label: "Pipeline",  tier: 2, x: 0.66, y: 0.50, fp: 3.8, fs: 0.55, fa: 0.006 },
    { id: "invoicing", label: "Invoicing", tier: 2, x: 0.60, y: 0.80, fp: 4.9, fs: 0.75, fa: 0.008 },
    { id: "support",   label: "Support",   tier: 2, x: 0.30, y: 0.84, fp: 0.3, fs: 0.68, fa: 0.007 },
    { id: "hr",        label: "HR",        tier: 2, x: 0.20, y: 0.62, fp: 1.4, fs: 0.62, fa: 0.009 },
];

const EDGES: EdgeDef[] = [
    // Spokes: tier1 → hub (gold)
    { from: "crm",       to: "hub",       type: "spoke"  },
    { from: "analytics", to: "hub",       type: "spoke"  },
    { from: "sales",     to: "hub",       type: "spoke"  },
    { from: "finance",   to: "hub",       type: "spoke"  },
    { from: "ops",       to: "hub",       type: "spoke"  },
    // Inner cross-links: tier1 ↔ tier1 (soft gold)
    { from: "crm",       to: "analytics", type: "inner"  },
    { from: "analytics", to: "sales",     type: "inner"  },
    { from: "sales",     to: "finance",   type: "inner"  },
    { from: "finance",   to: "ops",       type: "inner"  },
    // Bridges: tier2 → tier1 (steel blue)
    { from: "leads",     to: "crm",       type: "bridge" },
    { from: "reports",   to: "analytics", type: "bridge" },
    { from: "forecast",  to: "sales",     type: "bridge" },
    { from: "pipeline",  to: "sales",     type: "bridge" },
    { from: "pipeline",  to: "finance",   type: "bridge" },
    { from: "invoicing", to: "finance",   type: "bridge" },
    { from: "invoicing", to: "ops",       type: "bridge" },
    { from: "support",   to: "ops",       type: "bridge" },
    { from: "support",   to: "crm",       type: "bridge" },
    { from: "hr",        to: "ops",       type: "bridge" },
    { from: "hr",        to: "crm",       type: "bridge" },
    // Outer cross-links: tier2 ↔ tier2 (dim steel)
    { from: "leads",     to: "reports",   type: "outer"  },
    { from: "forecast",  to: "pipeline",  type: "outer"  },
    { from: "invoicing", to: "support",   type: "outer"  },
    { from: "hr",        to: "leads",     type: "outer"  },
];

// ── Node info (shown on double-click expand) ───────────────────────────────────

const NODE_INFO: Record<string, { metric: string; desc: string }> = {
    hub:       { metric: "13 sistemi",    desc: "connessi in tempo reale"       },
    crm:       { metric: "+24% lead",     desc: "tasso di conversione"          },
    analytics: { metric: "Real-time",     desc: "dati aggiornati ogni 30s"      },
    sales:     { metric: "€2.4M",         desc: "pipeline commerciale"          },
    finance:   { metric: "−12% costi",    desc: "risparmio operativo"           },
    ops:       { metric: "85% auto",      desc: "processi senza intervento"     },
    leads:     { metric: "340",           desc: "nuovi lead questo mese"        },
    reports:   { metric: "28 report",     desc: "generati automaticamente"      },
    forecast:  { metric: "94% acc.",      desc: "precisione forecast"           },
    pipeline:  { metric: "€890K",         desc: "valore in lavorazione"         },
    invoicing: { metric: "48h",           desc: "tempo medio di incasso"        },
    support:   { metric: "4.8 / 5",       desc: "soddisfazione clienti"         },
    hr:        { metric: "91 / 100",      desc: "engagement del team"           },
};

// ── Math ───────────────────────────────────────────────────────────────────────

function qbez(p0: V2, cp: V2, p1: V2, t: number): V2 {
    const m = 1 - t;
    return [
        m * m * p0[0] + 2 * m * t * cp[0] + t * t * p1[0],
        m * m * p0[1] + 2 * m * t * cp[1] + t * t * p1[1],
    ];
}

function ctrlPt(a: V2, b: V2, k = 0.22): V2 {
    return [
        (a[0] + b[0]) / 2 - (b[1] - a[1]) * k,
        (a[1] + b[1]) / 2 + (b[0] - a[0]) * k,
    ];
}

// ── Component ──────────────────────────────────────────────────────────────────

export function HeroNetwork() {
    const canvasRef   = useRef<HTMLCanvasElement>(null);
    const { theme }   = useTheme();
    const isDark      = theme === "dark";
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d")!;

        // ── DPR / resize ───────────────────────────────────────────────────────
        const dpr = Math.min(window.devicePixelRatio, 2);

        // Node state (normalized coords + physics)
        const states = new Map<string, NodeState>();
        const initStates = (W: number, H: number) => {
            NODES.forEach(n => {
                const existing = states.get(n.id);
                if (existing) {
                    // Update base only; keep current relative offset
                    const dx = existing.cx - existing.bx;
                    const dy = existing.cy - existing.by;
                    existing.bx = n.x;
                    existing.by = n.y;
                    existing.cx = n.x + dx;
                    existing.cy = n.y + dy;
                } else {
                    states.set(n.id, {
                        bx: n.x, by: n.y,
                        cx: n.x, cy: n.y,
                        vx: 0,   vy: 0,
                        dragged: false,
                    });
                }
            });
            void W; void H;
        };

        const resize = () => {
            const r = canvas.getBoundingClientRect();
            canvas.width  = r.width  * dpr;
            canvas.height = r.height * dpr;
            initStates(r.width, r.height);
        };
        resize();
        const ro = new ResizeObserver(resize);
        ro.observe(canvas);

        // ── Packet state ───────────────────────────────────────────────────────
        const packetMap = new Map<string, Packet[]>();
        EDGES.forEach(e => {
            const key = `${e.from}→${e.to}`;
            const n   = e.type === "spoke" ? 2 : 1;
            packetMap.set(key, Array.from({ length: n }, (_, i) => ({
                t:     (i / n) + Math.random() * (1 / n),
                speed: e.type === "spoke"
                    ? 0.052 + Math.random() * 0.038
                    : e.type === "bridge"
                    ? 0.038 + Math.random() * 0.028
                    : 0.028 + Math.random() * 0.018,
            })));
        });

        // ── Hub rings ──────────────────────────────────────────────────────────
        const rings: Ring[] = [];

        // ── Ambient particles ──────────────────────────────────────────────────
        const ambients = Array.from({ length: 28 }, () => ({
            x:  Math.random(), y: Math.random(),
            vx: (Math.random() - 0.5) * 4.5e-5,
            vy: (Math.random() - 0.5) * 4.5e-5,
            a:  0.04 + Math.random() * 0.13,
            r:  0.4  + Math.random() * 1.1,
        }));

        // ── Drag state ─────────────────────────────────────────────────────────
        let dragId:     string | null = null;
        let prevMx = 0, prevMy = 0;
        let throwVx = 0, throwVy = 0;
        let dragMoved = false; void dragMoved; // reserved for future click-vs-drag distinction

        // ── Expand state ───────────────────────────────────────────────────────
        let expandedId:   string | null = null;
        let expandT       = 0;     // 0=collapsed → 1=expanded
        let expandDir     = 0;     // +1 expanding, -1 collapsing, 0 idle
        let lastClickId:  string | null = null;
        let lastClickTime = 0;

        // ── Auto-demo state ────────────────────────────────────────────────────
        type DemoPhase = "waiting" | "expanding" | "open" | "collapsing";
        let autoDemo      = true;
        let demoPhase:    DemoPhase = "waiting";
        let demoTimer     = 2.0;   // initial delay before first expand
        let lastDemoId:   string | null = null;
        const DEMO_NODES  = NODES.map(n => n.id); // all nodes eligible
        const pickDemoNode = () => {
            const pool = DEMO_NODES.filter(id => id !== lastDemoId);
            return pool[Math.floor(Math.random() * pool.length)];
        };

        const clientXY = (e: PointerEvent): V2 => {
            const r = canvas.getBoundingClientRect();
            return [(e.clientX - r.left) / r.width, (e.clientY - r.top) / r.height];
        };

        const findClosestNode = (nx: number, ny: number, W: number, H: number): string | null => {
            let closest: string | null = null;
            let minD = 60 / Math.min(W, H);
            states.forEach((ns, id) => {
                const d = Math.hypot(nx - ns.cx, (ny - ns.cy) * (W / H));
                if (d < minD) { minD = d; closest = id; }
            });
            return closest;
        };

        const onPointerDown = (e: PointerEvent) => {
            const [nx, ny] = clientXY(e);
            const W = canvas.getBoundingClientRect().width;
            const H = canvas.getBoundingClientRect().height;
            const closest = findClosestNode(nx, ny, W, H);

            if (closest) {
                // Double-click detection
                const now = performance.now();
                if (closest === lastClickId && now - lastClickTime < 350) {
                    // Double-click → toggle expand, stop auto-demo
                    autoDemo = false;
                    if (expandedId === closest) {
                        expandDir = -1;
                    } else {
                        expandedId = closest;
                        expandT    = 0;
                        expandDir  = 1;
                    }
                    lastClickTime = 0;
                    lastClickId   = null;
                    e.preventDefault();
                    return;
                }
                lastClickTime = now;
                lastClickId   = closest;

                dragId  = closest;
                dragMoved = false;
                const ns = states.get(closest)!;
                ns.dragged = true;
                ns.vx = 0; ns.vy = 0;
                prevMx = nx; prevMy = ny;
                throwVx = 0; throwVy = 0;
                canvas.setPointerCapture(e.pointerId);
                canvas.style.cursor = "grabbing";
                e.preventDefault();
            } else {
                // Click outside → collapse
                if (expandedId) {
                    expandDir = -1;
                }
                lastClickId   = null;
                lastClickTime = 0;
            }
        };

        const onPointerMove = (e: PointerEvent) => {
            if (!dragId) {
                // Hover: check if near a node
                const [nx, ny] = clientXY(e);
                const W = canvas.getBoundingClientRect().width;
                const H = canvas.getBoundingClientRect().height;
                let near = false;
                states.forEach(ns => {
                    if (Math.hypot(nx - ns.cx, (ny - ns.cy) * (W / H)) < 40 / Math.min(W, H)) {
                        near = true;
                    }
                });
                canvas.style.cursor = near ? "grab" : "default";
                return;
            }

            const [nx, ny] = clientXY(e);
            dragMoved = true;
            const ns = states.get(dragId)!;
            throwVx = (nx - prevMx) / (1 / 60);   // approx velocity
            throwVy = (ny - prevMy) / (1 / 60);
            prevMx = nx; prevMy = ny;
            ns.cx = nx;
            ns.cy = ny;
            e.preventDefault();
        };

        const onPointerUp = (e: PointerEvent) => {
            if (!dragId) return;
            const ns    = states.get(dragId)!;
            ns.dragged  = false;
            ns.vx       = throwVx * 0.15;   // scale throw velocity
            ns.vy       = throwVy * 0.15;
            canvas.style.cursor = "default";
            dragId = null;
            e.preventDefault();
        };

        canvas.addEventListener("pointerdown",  onPointerDown,  { passive: false });
        canvas.addEventListener("pointermove",  onPointerMove,  { passive: false });
        canvas.addEventListener("pointerup",    onPointerUp,    { passive: false });
        canvas.addEventListener("pointerleave", onPointerUp,    { passive: false });

        // Trigger fade-in
        requestAnimationFrame(() => setVisible(true));

        // ── Render loop ────────────────────────────────────────────────────────
        let last = performance.now();
        let raf:  number;

        const easeInOut = (t: number) => t < 0.5 ? 2*t*t : -1+(4-2*t)*t;

        const frame = (now: number) => {
            const dt = Math.min((now - last) / 1000, 0.05);
            last = now;

            // ── Expand animation ───────────────────────────────────────────────
            if (expandDir !== 0) {
                expandT += expandDir * dt * 2.0; // ~0.5s duration
                if (expandT >= 1) { expandT = 1; expandDir = 0; }
                if (expandT <= 0) { expandT = 0; expandDir = 0; expandedId = null; }
            }

            // ── Auto-demo driver ───────────────────────────────────────────────
            if (autoDemo) {
                switch (demoPhase) {
                    case "waiting":
                        demoTimer -= dt;
                        if (demoTimer <= 0) {
                            const id   = pickDemoNode();
                            lastDemoId = id;
                            expandedId = id;
                            expandT    = 0;
                            expandDir  = 1;
                            demoPhase  = "expanding";
                        }
                        break;
                    case "expanding":
                        if (expandDir === 0 && expandT >= 1) {
                            demoPhase  = "open";
                            demoTimer  = 2.8; // seconds to stay open
                        }
                        break;
                    case "open":
                        demoTimer -= dt;
                        if (demoTimer <= 0) {
                            expandDir = -1;
                            demoPhase = "collapsing";
                        }
                        break;
                    case "collapsing":
                        if (expandDir === 0 && expandT <= 0) {
                            demoPhase = "waiting";
                            demoTimer = 1.2; // pause between nodes
                        }
                        break;
                }
            }

            const W = canvas.width  / dpr;
            const H = canvas.height / dpr;
            const T = now / 1000;

            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            ctx.clearRect(0, 0, W, H);

            // ── Palette ────────────────────────────────────────────────────────
            // alpha multiplier: light mode needs higher values to pop on cream bg
            const aM = isDark ? 1.0 : 2.4;
            const clamp = (v: number) => Math.min(1, v);

            // Amber — exact Tailwind values used in text/CTAs across the page
            const Gw   = isDark ? [245, 158,  11] : [180,  83,   9]; // amber-500 / amber-700
            const ga   = (a: number) => `rgba(${Gw[0]},${Gw[1]},${Gw[2]},${clamp(a * aM).toFixed(3)})`;
            const gHex = isDark ? "#F59E0B"       : "#B45309";
            const gBrt = isDark ? "#FCD34D"       : "#F59E0B";
            // Steel blue (tier2)
            const Gs   = isDark ? [ 91, 155, 213] : [ 43, 108, 176];
            const sa   = (a: number) => `rgba(${Gs[0]},${Gs[1]},${Gs[2]},${clamp(a * aM).toFixed(3)})`;
            const sHex = isDark ? "#5B9BD5"       : "#2B6CB0";
            const sBrt = isDark ? "#A8D4FF"       : "#5B9BD5";
            // Shared
            const gBg  = isDark ? "rgba(22,20,14,0.90)" : "rgba(255,250,240,0.97)";
            const tCol = isDark ? "#FCD34D"       : "#1C1917"; // amber-300 / stone-900
            const tCo2 = isDark ? "#94BAD8"       : "#0F172A"; // / slate-900

            // Edge color helpers
            const edgeColor = (type: EdgeType, alpha: number) => {
                if (type === "spoke" || type === "inner") return ga(alpha);
                return sa(alpha);
            };
            const packetColor = (type: EdgeType, bright: boolean) => {
                if (type === "spoke" || type === "inner") return bright ? gBrt : gHex;
                return bright ? sBrt : sHex;
            };

            // ── Spring physics ─────────────────────────────────────────────────
            const SPRING  = 8.0;
            const DAMPING = 5.8;
            states.forEach(ns => {
                if (ns.dragged) return;
                const ax = (ns.bx - ns.cx) * SPRING - ns.vx * DAMPING;
                const ay = (ns.by - ns.cy) * SPRING - ns.vy * DAMPING;
                ns.vx += ax * dt;
                ns.vy += ay * dt;
                ns.cx += ns.vx * dt;
                ns.cy += ns.vy * dt;
            });

            // ── Collision resolution ───────────────────────────────────────────
            for (let i = 0; i < NODES.length; i++) {
                for (let j = i + 1; j < NODES.length; j++) {
                    const na  = NODES[i];
                    const nb  = NODES[j];
                    const nsa = states.get(na.id)!;
                    const nsb = states.get(nb.id)!;

                    const dx   = (nsb.cx - nsa.cx) * W;
                    const dy   = (nsb.cy - nsa.cy) * H;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    const ra   = na.tier === 0 ? 32 : na.tier === 2 ? 18 : 22;
                    const rb   = nb.tier === 0 ? 32 : nb.tier === 2 ? 18 : 22;
                    const minD = ra + rb + 8;

                    if (dist < minD && dist > 0.5) {
                        const nx  = dx / dist;
                        const ny  = dy / dist;
                        const pen = minD - dist;

                        // Positional correction — push apart proportionally
                        const corr = pen * 0.5;
                        nsa.cx -= (nx * corr) / W;
                        nsa.cy -= (ny * corr) / H;
                        nsb.cx += (nx * corr) / W;
                        nsb.cy += (ny * corr) / H;

                        // Elastic impulse along collision normal
                        const dvx = (nsb.vx - nsa.vx) * W;
                        const dvy = (nsb.vy - nsa.vy) * H;
                        const dvn = dvx * nx + dvy * ny;

                        if (dvn < 0) {   // only if approaching
                            const restitution = 0.55;
                            const impulse = -(1 + restitution) * dvn / 2;
                            nsa.vx -= (nx * impulse) / W;
                            nsa.vy -= (ny * impulse) / H;
                            nsb.vx += (nx * impulse) / W;
                            nsb.vy += (ny * impulse) / H;
                        }
                    }
                }
            }

            // Helper: normalized → pixels (float added on top of spring position)
            const px = (ns: NodeState, n: NodeDef): V2 => {
                const floatX = ns.dragged ? 0 : Math.sin(T * n.fs         + n.fp    ) * n.fa;
                const floatY = ns.dragged ? 0 : Math.cos(T * n.fs * 1.31  + n.fp + 1) * n.fa;
                return [(ns.cx + floatX) * W, (ns.cy + floatY) * H];
            };

            // Node def lookup
            const ndMap = new Map(NODES.map(n => [n.id, n]));

            // ── Ambient particles ──────────────────────────────────────────────
            ambients.forEach(p => {
                p.x = ((p.x + p.vx * dt) + 1) % 1;
                p.y = ((p.y + p.vy * dt) + 1) % 1;
                ctx.beginPath();
                ctx.arc(p.x * W, p.y * H, p.r, 0, Math.PI * 2);
                ctx.fillStyle = ga(p.a);
                ctx.fill();
            });

            // ── Dot grid ───────────────────────────────────────────────────────
            {
                const sp   = 36;
                const dotA = isDark ? 0.055 : 0.14;
                ctx.fillStyle = ga(dotA);
                for (let gx = sp / 2; gx < W; gx += sp) {
                    for (let gy = sp / 2; gy < H; gy += sp) {
                        ctx.beginPath();
                        ctx.arc(gx, gy, 0.7, 0, Math.PI * 2);
                        ctx.fill();
                    }
                }
            }

            // ── Base edges ─────────────────────────────────────────────────────
            EDGES.forEach(e => {
                const a  = px(states.get(e.from)!, ndMap.get(e.from)!);
                const b  = px(states.get(e.to)!, ndMap.get(e.to)!);
                const cp = ctrlPt(a, b);
                ctx.beginPath();
                ctx.moveTo(a[0], a[1]);
                ctx.quadraticCurveTo(cp[0], cp[1], b[0], b[1]);
                const baseAlpha = e.type === "spoke" ? (isDark ? 0.14 : 0.38)
                                : e.type === "inner"  ? (isDark ? 0.10 : 0.28)
                                : e.type === "bridge" ? (isDark ? 0.11 : 0.30)
                                :                       (isDark ? 0.06 : 0.18);
                ctx.strokeStyle = edgeColor(e.type, baseAlpha);
                ctx.lineWidth   = e.type === "spoke" ? 1.1 : e.type === "outer" ? 0.6 : 0.85;
                ctx.stroke();
            });

            // ── Packets ────────────────────────────────────────────────────────
            EDGES.forEach(e => {
                const key  = `${e.from}→${e.to}`;
                const pArr = packetMap.get(key)!;
                const a    = px(states.get(e.from)!, ndMap.get(e.from)!);
                const b    = px(states.get(e.to)!, ndMap.get(e.to)!);
                const cp   = ctrlPt(a, b);

                pArr.forEach(p => {
                    p.t += p.speed * dt;
                    if (p.t >= 1) {
                        p.t -= 1;
                        if (e.to === "hub") rings.push({ t: 0 });
                    }

                    // Comet tail
                    const TAIL = 0.20;
                    const ts   = Math.max(0, p.t - TAIL);
                    const SEGS = 22;
                    for (let s = 0; s < SEGS; s++) {
                        const f0   = ts + (p.t - ts) * (s       / SEGS);
                        const f1   = ts + (p.t - ts) * ((s + 1) / SEGS);
                        const frac = s / SEGS;
                        const [x0, y0] = qbez(a, cp, b, f0);
                        const [x1, y1] = qbez(a, cp, b, f1);
                        ctx.beginPath();
                        ctx.moveTo(x0, y0);
                        ctx.lineTo(x1, y1);
                        ctx.strokeStyle = edgeColor(e.type, frac * frac * 0.70);
                        ctx.lineWidth   = 0.7 + frac * 2.2;
                        ctx.stroke();
                    }

                    // Head halo
                    const [hx, hy] = qbez(a, cp, b, p.t);
                    const isWarm   = e.type === "spoke" || e.type === "inner";
                    const haloFn   = isWarm ? ga : sa;
                    const halo     = ctx.createRadialGradient(hx, hy, 0, hx, hy, 8);
                    halo.addColorStop(0,   haloFn(0.85));
                    halo.addColorStop(0.4, haloFn(0.35));
                    halo.addColorStop(1,   haloFn(0));
                    ctx.beginPath();
                    ctx.arc(hx, hy, 8, 0, Math.PI * 2);
                    ctx.fillStyle = halo;
                    ctx.fill();

                    // Bright core
                    ctx.beginPath();
                    ctx.arc(hx, hy, 2.2, 0, Math.PI * 2);
                    ctx.fillStyle = packetColor(e.type, true);
                    ctx.fill();

                    // White hot center
                    ctx.beginPath();
                    ctx.arc(hx, hy, 0.9, 0, Math.PI * 2);
                    ctx.fillStyle = "#FFFFFF";
                    ctx.globalAlpha = 0.92;
                    ctx.fill();
                    ctx.globalAlpha = 1;
                });
            });

            // ── Hub rings ──────────────────────────────────────────────────────
            const hubPos = px(states.get("hub")!, ndMap.get("hub")!);
            for (let i = rings.length - 1; i >= 0; i--) {
                rings[i].t += dt;
                if (rings[i].t > 1.5) { rings.splice(i, 1); continue; }
                const prog = rings[i].t / 1.5;
                const rr   = 32 + prog * 70;
                const al   = (1 - prog) * (1 - prog) * (isDark ? 0.50 : 0.80);
                ctx.beginPath();
                ctx.arc(hubPos[0], hubPos[1], rr, 0, Math.PI * 2);
                ctx.strokeStyle = ga(al);
                ctx.lineWidth   = 1.5;
                ctx.stroke();
            }

            // ── Nodes (skip expanded — drawn last) ────────────────────────────
            NODES.forEach(n => {
                if (n.id === expandedId && expandT > 0) return; // drawn in expanded pass
                const ns       = states.get(n.id)!;
                const [x, y]   = px(ns, n);
                const isHub    = n.tier === 0;
                const isTier2  = n.tier === 2;
                const r        = isHub ? 32 : isTier2 ? 18 : 22;
                const isDragging = ns.dragged;

                // Color helpers per tier
                const nodeGa = isTier2 ? sa : ga;
                const nodeHex = isTier2 ? sHex : gHex;

                // Wide outer glow
                const glowR = isDragging ? r * 3.2 : r * 2.8;
                const glowA = isDragging
                    ? (isHub ? 0.40 : 0.22)
                    : (isHub ? 0.26 : isTier2 ? 0.12 : 0.14);
                const og = ctx.createRadialGradient(x, y, r * 0.3, x, y, glowR);
                og.addColorStop(0, nodeGa(glowA));
                og.addColorStop(1, nodeGa(0));
                ctx.beginPath();
                ctx.arc(x, y, glowR, 0, Math.PI * 2);
                ctx.fillStyle = og;
                ctx.fill();

                // Secondary inner glow
                const ig = ctx.createRadialGradient(x, y, r * 0.5, x, y, r * 1.4);
                ig.addColorStop(0, nodeGa(isHub ? 0.18 : 0.07));
                ig.addColorStop(1, nodeGa(0));
                ctx.beginPath();
                ctx.arc(x, y, r * 1.4, 0, Math.PI * 2);
                ctx.fillStyle = ig;
                ctx.fill();

                // Body — backdrop blur: sample already-drawn canvas content, blur it inside clip
                ctx.save();
                ctx.beginPath();
                ctx.arc(x, y, r, 0, Math.PI * 2);
                ctx.clip();
                ctx.filter = `blur(${isHub ? 7 : 5}px)`;
                ctx.drawImage(canvas, 0, 0, W, H);
                ctx.filter = "none";
                // Tint overlay on top of blur
                if (isDark) {
                    ctx.fillStyle = gBg;
                } else {
                    const bubble = ctx.createRadialGradient(
                        x - r * 0.20, y - r * 0.25, r * 0.05,
                        x, y, r
                    );
                    bubble.addColorStop(0,    nodeGa(0.08));
                    bubble.addColorStop(0.55, nodeGa(0.16));
                    bubble.addColorStop(1,    nodeGa(0.36));
                    ctx.fillStyle = bubble;
                }
                ctx.beginPath();
                ctx.arc(x, y, r, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();

                // Border
                ctx.beginPath();
                ctx.arc(x, y, r, 0, Math.PI * 2);
                ctx.strokeStyle = isDragging
                    ? nodeGa(0.90)
                    : isHub ? nodeHex : nodeGa(isDark ? 0.42 : 0.85);
                ctx.lineWidth = isHub ? (isDark ? 1.8 : 2.2) : (isDark ? 1.0 : 1.6);
                ctx.stroke();

                // Glossy shine — top-left specular (bubble effect, light mode only)
                if (!isDark) {
                    ctx.save();
                    ctx.beginPath();
                    ctx.arc(x, y, r, 0, Math.PI * 2);
                    ctx.clip();
                    const shine = ctx.createRadialGradient(
                        x - r * 0.35, y - r * 0.38, 0,
                        x - r * 0.20, y - r * 0.20, r * 0.72
                    );
                    shine.addColorStop(0,   "rgba(255,255,255,0.62)");
                    shine.addColorStop(0.45, "rgba(255,255,255,0.18)");
                    shine.addColorStop(1,    "rgba(255,255,255,0)");
                    ctx.fillStyle = shine;
                    ctx.fillRect(x - r, y - r, r * 2, r * 2);
                    ctx.restore();
                }

                // Top-left rim highlight (dark only — light uses shine instead)
                if (isDark) {
                    ctx.save();
                    ctx.beginPath();
                    ctx.arc(x, y, r - 0.5, -Math.PI * 0.95, -Math.PI * 0.15);
                    ctx.strokeStyle = nodeGa(0.28);
                    ctx.lineWidth   = 1.5;
                    ctx.stroke();
                    ctx.restore();
                }

                // Hub: dual counter-rotating dashed rings
                if (isHub) {
                    ctx.save();
                    ctx.translate(x, y);
                    ctx.rotate(T * 0.22);
                    ctx.beginPath();
                    ctx.arc(0, 0, r + 11, 0, Math.PI * 2);
                    ctx.setLineDash([6, 10]);
                    ctx.strokeStyle = ga(isDark ? 0.30 : 0.60);
                    ctx.lineWidth   = isDark ? 0.9 : 1.2;
                    ctx.stroke();
                    ctx.setLineDash([]);
                    ctx.restore();

                    ctx.save();
                    ctx.translate(x, y);
                    ctx.rotate(-T * 0.14);
                    ctx.beginPath();
                    ctx.arc(0, 0, r + 5, 0, Math.PI * 2);
                    ctx.setLineDash([3, 14]);
                    ctx.strokeStyle = ga(isDark ? 0.18 : 0.40);
                    ctx.lineWidth   = 0.7;
                    ctx.stroke();
                    ctx.setLineDash([]);
                    ctx.restore();
                }

                // Inner fill highlight (dark only)
                if (isDark) {
                    const hl = ctx.createRadialGradient(x - r * 0.28, y - r * 0.32, 0, x, y, r);
                    hl.addColorStop(0, nodeGa(isHub ? 0.22 : 0.10));
                    hl.addColorStop(1, nodeGa(0));
                    ctx.beginPath();
                    ctx.arc(x, y, r, 0, Math.PI * 2);
                    ctx.fillStyle = hl;
                    ctx.fill();
                }

                // Label
                ctx.textAlign    = "center";
                ctx.textBaseline = "middle";
                if (isHub) {
                    ctx.fillStyle = isDark ? gHex : "#1C1917";
                    ctx.font      = `600 9.5px system-ui, -apple-system, sans-serif`;
                    ctx.letterSpacing = "0.08em";
                    ctx.fillText("DATA", x, y - 6);
                    ctx.font      = `500 8px system-ui, -apple-system, sans-serif`;
                    ctx.globalAlpha = 0.65;
                    ctx.fillText("HUB", x, y + 6);
                    ctx.globalAlpha = 1;
                    ctx.letterSpacing = "0px";
                } else {
                    const sz = n.label.length > 7 ? 7.5 : isTier2 ? 8.5 : 9.0;
                    ctx.fillStyle = isTier2 ? tCo2 : tCol;
                    ctx.font      = `600 ${sz}px system-ui, -apple-system, sans-serif`;
                    ctx.fillText(n.label, x, y);
                }
            });

            // ── Diamond pulse on spoke edges ───────────────────────────────────
            EDGES.filter(e => e.type === "spoke").forEach(e => {
                const a     = px(states.get(e.from)!, ndMap.get(e.from)!);
                const b     = px(states.get(e.to)!, ndMap.get(e.to)!);
                const cp    = ctrlPt(a, b);
                const mid   = qbez(a, cp, b, 0.42);
                const pulse = 0.5 + 0.5 * Math.sin(T * 1.4 + a[0] * 0.05);
                ctx.fillStyle    = ga(pulse * (isDark ? 0.22 : 0.55));
                ctx.font         = `400 7px monospace`;
                ctx.textAlign    = "center";
                ctx.textBaseline = "middle";
                ctx.fillText("◆", mid[0], mid[1]);
            });

            // ── Expanded node (drawn last = on top) ────────────────────────────
            if (expandedId && expandT > 0) {
                const n    = ndMap.get(expandedId)!;
                const ns   = states.get(expandedId)!;
                const [x, y] = px(ns, n);
                const isHub  = n.tier === 0;
                const isTier2 = n.tier === 2;
                const rBase  = isHub ? 32 : isTier2 ? 18 : 22;
                const rMax   = isHub ? 82 : 70;
                const prog   = easeInOut(expandT);
                const r      = rBase + (rMax - rBase) * prog;
                const nodeGa = isTier2 ? sa : ga;
                const nodeHex = isTier2 ? sHex : gHex;
                const info   = NODE_INFO[expandedId] ?? { metric: "", desc: "" };

                // Outer glow
                const og = ctx.createRadialGradient(x, y, r * 0.3, x, y, r * 2.6);
                og.addColorStop(0, nodeGa(isHub ? 0.28 : 0.18));
                og.addColorStop(1, nodeGa(0));
                ctx.beginPath();
                ctx.arc(x, y, r * 2.6, 0, Math.PI * 2);
                ctx.fillStyle = og;
                ctx.fill();

                // Backdrop blur body
                ctx.save();
                ctx.beginPath();
                ctx.arc(x, y, r, 0, Math.PI * 2);
                ctx.clip();
                ctx.filter = `blur(${isHub ? 9 : 7}px)`;
                ctx.drawImage(canvas, 0, 0, W, H);
                ctx.filter = "none";
                // Tint
                if (isDark) {
                    ctx.fillStyle = gBg;
                } else {
                    const bub = ctx.createRadialGradient(x - r * 0.2, y - r * 0.25, r * 0.05, x, y, r);
                    bub.addColorStop(0,    nodeGa(0.08));
                    bub.addColorStop(0.55, nodeGa(0.18));
                    bub.addColorStop(1,    nodeGa(0.42));
                    ctx.fillStyle = bub;
                }
                ctx.beginPath();
                ctx.arc(x, y, r, 0, Math.PI * 2);
                ctx.fill();
                // Glossy shine (light mode)
                if (!isDark) {
                    const shine = ctx.createRadialGradient(x - r * 0.35, y - r * 0.38, 0, x - r * 0.2, y - r * 0.2, r * 0.72);
                    shine.addColorStop(0,   "rgba(255,255,255,0.55)");
                    shine.addColorStop(0.45, "rgba(255,255,255,0.15)");
                    shine.addColorStop(1,    "rgba(255,255,255,0)");
                    ctx.fillStyle = shine;
                    ctx.fillRect(x - r, y - r, r * 2, r * 2);
                }
                ctx.restore();

                // Border
                ctx.beginPath();
                ctx.arc(x, y, r, 0, Math.PI * 2);
                ctx.strokeStyle = nodeHex;
                ctx.lineWidth   = isHub ? 2.2 : 1.8;
                ctx.stroke();

                // Counter-rotating dashed ring (hub style for all expanded)
                ctx.save();
                ctx.translate(x, y);
                ctx.rotate(T * 0.28);
                ctx.beginPath();
                ctx.arc(0, 0, r + 8, 0, Math.PI * 2);
                ctx.setLineDash([5, 9]);
                ctx.strokeStyle = nodeGa(isDark ? 0.28 : 0.55);
                ctx.lineWidth   = 0.9;
                ctx.stroke();
                ctx.setLineDash([]);
                ctx.restore();

                // Content — fades in with prog
                ctx.globalAlpha = Math.max(0, (prog - 0.55) / 0.45); // appear in last 45% of anim
                ctx.textAlign    = "center";
                ctx.textBaseline = "middle";

                // Node label (small, dimmed)
                ctx.fillStyle = isTier2 ? tCo2 : tCol;
                ctx.font      = `500 9px system-ui, -apple-system, sans-serif`;
                ctx.globalAlpha *= 0.65;
                ctx.fillText(n.label.toUpperCase(), x, y - r * 0.44);
                ctx.globalAlpha /= 0.65;

                // Metric (large, colored)
                ctx.fillStyle = nodeHex;
                const metricSz = info.metric.length > 8 ? 13 : 16;
                ctx.font      = `700 ${metricSz}px system-ui, -apple-system, sans-serif`;
                ctx.fillText(info.metric, x, y - r * 0.08);

                // Description (small, muted)
                ctx.fillStyle = isTier2 ? tCo2 : tCol;
                ctx.font      = `400 8.5px system-ui, -apple-system, sans-serif`;
                ctx.globalAlpha *= 0.70;
                ctx.fillText(info.desc, x, y + r * 0.35);
                ctx.globalAlpha = 1;
            }

            raf = requestAnimationFrame(frame);
        };

        raf = requestAnimationFrame(frame);

        return () => {
            cancelAnimationFrame(raf);
            ro.disconnect();
            canvas.removeEventListener("pointerdown",  onPointerDown);
            canvas.removeEventListener("pointermove",  onPointerMove);
            canvas.removeEventListener("pointerup",    onPointerUp);
            canvas.removeEventListener("pointerleave", onPointerUp);
        };
    }, [isDark]);

    return (
        <div
            className="absolute inset-0 w-full h-full pointer-events-none top-0 left-0 lg:left-[30%] z-20"
            style={{
                opacity:    visible ? 1 : 0,
                transition: "opacity 1.4s ease-in",
            }}
        >
            <canvas
                ref={canvasRef}
                className="w-full h-full"
                style={{ pointerEvents: "auto", touchAction: "none" }}
            />
        </div>
    );
}
