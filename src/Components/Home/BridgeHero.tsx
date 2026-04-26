import { useRef, useEffect } from "react";

interface BridgeHeroProps {
    theme: string;
}

function easeOut(t: number): number {
    return 1 - Math.pow(1 - t, 3);
}

function catenary(x: number, x1: number, y1: number, x2: number, y2: number, sag: number): number {
    const t = (x - x1) / (x2 - x1);
    return y1 + (y2 - y1) * t + sag * 4 * t * (1 - t);
}

interface Particle {
    t: number;
    speed: number;
    dir: 1 | -1;
    size: number;
    alpha: number;
}

interface Spark {
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
}

export function BridgeHero({ theme }: BridgeHeroProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const isDark = theme === "dark";
        const GOLD = "#C9A84C";
        const GOLD_GLOW = "rgba(201,168,76,";
        const TOWER_FILL_A = isDark ? "#2A2820" : "#1E1C14";
        const TOWER_FILL_B = isDark ? "#3A3830" : "#2E2C20";
        const TOWER_STROKE = isDark ? "rgba(201,168,76,0.22)" : "rgba(201,168,76,0.32)";
        const DECK_TOP = isDark ? "#3A3830" : "#2E2C20";
        const DECK_BOT = isDark ? "#252320" : "#1A1810";
        const CONSTRUCTION_DURATION = 5200;

        // Particles
        const particles: Particle[] = Array.from({ length: 30 }, (_, i) => ({
            t: Math.random(),
            speed: 0.0005 + Math.random() * 0.0009,
            dir: (i % 2 === 0 ? 1 : -1) as 1 | -1,
            size: 1.5 + Math.random() * 2,
            alpha: 0.45 + Math.random() * 0.55,
        }));

        const sparks: Spark[] = [];
        let lastSpark = 0;

        const addSparks = (x: number, y: number, n: number) => {
            for (let i = 0; i < n; i++) {
                const angle = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 1.2;
                const speed = 0.8 + Math.random() * 2.5;
                sparks.push({
                    x, y,
                    vx: Math.cos(angle) * speed,
                    vy: Math.sin(angle) * speed,
                    life: 1,
                });
            }
        };

        let dpr = window.devicePixelRatio || 1;

        const resize = () => {
            dpr = window.devicePixelRatio || 1;
            canvas.width = canvas.offsetWidth * dpr;
            canvas.height = canvas.offsetHeight * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };
        resize();
        window.addEventListener("resize", resize);

        let rafId: number;
        let startTime: number | null = null;

        const render = (ts: number) => {
            if (!startTime) startTime = ts;
            const elapsed = ts - startTime;
            const rawP = Math.min(elapsed / CONSTRUCTION_DURATION, 1);

            const W = canvas.offsetWidth;
            const H = canvas.offsetHeight;

            ctx.clearRect(0, 0, W, H);

            // ── Layout ──────────────────────────────────────────────
            const bLeft  = W * 0.02;
            const bRight = W * 0.98;
            const span   = bRight - bLeft;
            const tW     = span * 0.022;
            const tLeftX  = bLeft + span * 0.20;
            const tRightX = bLeft + span * 0.80;
            const centerX = (tLeftX + tRightX) / 2;
            const deckY   = H * 0.66;
            const tTopY   = H * 0.18;
            const tHeight = deckY - tTopY;
            const waterY  = H * 0.76;
            const sag     = H * 0.15;

            const cabY  = (x: number) => catenary(x, tLeftX, tTopY, tRightX, tTopY, sag);
            const pPos  = (t: number) => {
                const x = tLeftX + (tRightX - tLeftX) * t;
                return { x, y: cabY(x) };
            };

            // ── Phase progress ───────────────────────────────────────
            const towerP  = easeOut(Math.min(rawP / 0.26, 1));
            const cableP  = rawP < 0.26 ? 0 : easeOut(Math.min((rawP - 0.26) / 0.22, 1));
            const hangerP = rawP < 0.48 ? 0 : easeOut(Math.min((rawP - 0.48) / 0.22, 1));
            const deckP   = rawP < 0.70 ? 0 : easeOut(Math.min((rawP - 0.70) / 0.20, 1));
            const finalP  = rawP < 0.90 ? 0 : easeOut(Math.min((rawP - 0.90) / 0.10, 1));
            const DONE    = rawP >= 1;

            // ── Water line ───────────────────────────────────────────
            ctx.beginPath();
            ctx.moveTo(0, waterY);
            ctx.lineTo(W, waterY);
            ctx.strokeStyle = isDark ? "rgba(201,168,76,0.10)" : "rgba(201,168,76,0.18)";
            ctx.lineWidth = 1;
            ctx.stroke();

            // Water shimmer dots
            for (let i = 0; i < 8; i++) {
                const wx = bLeft + span * (0.05 + i * 0.12) + Math.sin(ts * 0.0008 + i) * 8;
                const wy = waterY + 4 + Math.sin(ts * 0.001 + i * 1.3) * 2;
                ctx.beginPath();
                ctx.arc(wx, wy, 1, 0, Math.PI * 2);
                ctx.fillStyle = isDark ? "rgba(201,168,76,0.15)" : "rgba(201,168,76,0.22)";
                ctx.fill();
            }

            // ── Reflection (mirror of cable + deck) ──────────────────
            if (deckP > 0) {
                ctx.save();
                ctx.globalAlpha = 0.06 * deckP;
                ctx.transform(1, 0, 0, -1, 0, waterY * 2);
                ctx.beginPath();
                for (let i = 0; i <= 80; i++) {
                    const t = i / 80;
                    const x = tLeftX + (tRightX - tLeftX) * t;
                    const y = cabY(x);
                    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
                }
                ctx.strokeStyle = GOLD;
                ctx.lineWidth = 2;
                ctx.stroke();
                ctx.restore();
            }

            // ── Towers ───────────────────────────────────────────────
            if (towerP > 0) {
                const drawTower = (cx: number, emitSparks: boolean) => {
                    const h   = tHeight * towerP;
                    const ty  = deckY - h;

                    // Tower body gradient
                    const tg = ctx.createLinearGradient(cx - tW, 0, cx + tW, 0);
                    tg.addColorStop(0,   TOWER_FILL_A);
                    tg.addColorStop(0.5, TOWER_FILL_B);
                    tg.addColorStop(1,   TOWER_FILL_A);

                    ctx.fillStyle   = tg;
                    ctx.strokeStyle = TOWER_STROKE;
                    ctx.lineWidth   = 1;
                    ctx.fillRect(cx - tW / 2, ty, tW, h);
                    ctx.strokeRect(cx - tW / 2, ty, tW, h);

                    // Internal vertical groove
                    ctx.beginPath();
                    ctx.moveTo(cx, ty + 4);
                    ctx.lineTo(cx, ty + h - 4);
                    ctx.strokeStyle = isDark ? "rgba(0,0,0,0.3)" : "rgba(0,0,0,0.2)";
                    ctx.lineWidth = 0.5;
                    ctx.stroke();

                    // Cross braces
                    if (towerP > 0.45) {
                        const ba = Math.min((towerP - 0.45) / 0.55, 1);
                        ctx.globalAlpha = ba;
                        ctx.fillStyle   = TOWER_FILL_A;
                        ctx.strokeStyle = TOWER_STROKE;
                        ctx.lineWidth   = 1;
                        const bW = tW * 3.4;
                        const bH = tW * 0.5;
                        [ty + h * 0.20, ty + h * 0.43, ty + h * 0.64].forEach(by => {
                            ctx.fillRect(cx - bW / 2, by, bW, bH);
                            ctx.strokeRect(cx - bW / 2, by, bW, bH);
                        });
                        ctx.globalAlpha = 1;
                    }

                    // Top cap + glow
                    if (towerP > 0.82) {
                        const ca = Math.min((towerP - 0.82) / 0.18, 1);
                        ctx.globalAlpha = ca;
                        ctx.fillStyle = GOLD;
                        ctx.fillRect(cx - tW / 2 - 1.5, ty - 4, tW + 3, 5);

                        const gr = ctx.createRadialGradient(cx, ty, 0, cx, ty, 30);
                        gr.addColorStop(0, `${GOLD_GLOW}${0.28 * ca})`);
                        gr.addColorStop(1, "transparent");
                        ctx.fillStyle = gr;
                        ctx.beginPath();
                        ctx.arc(cx, ty, 30, 0, Math.PI * 2);
                        ctx.fill();
                        ctx.globalAlpha = 1;
                    }

                    // Sparks at tip during construction
                    if (emitSparks && towerP < 1 && ts - lastSpark > 65) {
                        addSparks(cx, ty, 5);
                        lastSpark = ts;
                    }
                };

                drawTower(tLeftX,  true);
                drawTower(tRightX, false);
            }

            // ── Main cable ───────────────────────────────────────────
            if (cableP > 0) {
                const endX = tLeftX + (tRightX - tLeftX) * cableP;
                const STEPS = 90;

                const drawCableSegment = (from: number, to: number, lineWidth: number, style: string | CanvasGradient, blur = 0) => {
                    ctx.beginPath();
                    for (let i = 0; i <= STEPS; i++) {
                        const t   = i / STEPS;
                        const x   = from + (to - from) * t;
                        const y   = cabY(x);
                        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
                    }
                    ctx.strokeStyle = style;
                    ctx.lineWidth   = lineWidth;
                    ctx.shadowBlur  = blur;
                    ctx.shadowColor = `${GOLD_GLOW}0.5)`;
                    ctx.stroke();
                    ctx.shadowBlur  = 0;
                };

                // Outer glow
                drawCableSegment(tLeftX, endX, 10, `${GOLD_GLOW}0.12)`, 14);
                // Mid glow
                drawCableSegment(tLeftX, endX, 5,  `${GOLD_GLOW}0.22)`, 6);
                // Core cable
                drawCableSegment(tLeftX, endX, 2,  GOLD, 0);

                // Cable tip plasma
                if (cableP < 1) {
                    const tx = endX;
                    const ty = cabY(endX);
                    const gr = ctx.createRadialGradient(tx, ty, 0, tx, ty, 16);
                    gr.addColorStop(0,   "rgba(255,230,120,0.95)");
                    gr.addColorStop(0.35, `${GOLD_GLOW}0.65)`);
                    gr.addColorStop(1,   "transparent");
                    ctx.fillStyle = gr;
                    ctx.beginPath();
                    ctx.arc(tx, ty, 16, 0, Math.PI * 2);
                    ctx.fill();
                    if (ts - lastSpark > 45) {
                        addSparks(tx, ty, 4);
                        lastSpark = ts;
                    }
                }

                // Anchor cables
                if (cableP > 0.55) {
                    const aa = Math.min((cableP - 0.55) / 0.45, 1);
                    ctx.globalAlpha = aa;
                    ctx.strokeStyle = GOLD;
                    ctx.lineWidth   = 1.8;
                    ctx.shadowBlur  = 4;
                    ctx.shadowColor = `${GOLD_GLOW}0.4)`;
                    ctx.beginPath();
                    ctx.moveTo(tLeftX,  tTopY);
                    ctx.lineTo(bLeft + span * 0.025, waterY - 2);
                    ctx.stroke();
                    if (cableP >= 1) {
                        ctx.beginPath();
                        ctx.moveTo(tRightX, tTopY);
                        ctx.lineTo(bLeft + span * 0.975, waterY - 2);
                        ctx.stroke();
                    }
                    ctx.shadowBlur  = 0;
                    ctx.globalAlpha = 1;
                }
            }

            // ── Hangers ──────────────────────────────────────────────
            if (hangerP > 0) {
                const N = 22;
                for (let i = 0; i < N; i++) {
                    const reveal = Math.min(hangerP * (N + 2) - i, 1);
                    if (reveal <= 0) continue;
                    const t   = (i + 1) / (N + 1);
                    const x   = tLeftX + (tRightX - tLeftX) * t;
                    const top = cabY(x);
                    const len = (deckY - top) * reveal;

                    ctx.beginPath();
                    ctx.moveTo(x, top);
                    ctx.lineTo(x, top + len);
                    ctx.strokeStyle = `${GOLD_GLOW}0.38)`;
                    ctx.lineWidth   = 1;
                    ctx.stroke();
                }
            }

            // ── Deck ─────────────────────────────────────────────────
            if (deckP > 0) {
                const halfSpan = ((tRightX - tLeftX) / 2 + tW * 0.8) * deckP;
                const dH = H * 0.014;

                // Deck body
                const dg = ctx.createLinearGradient(0, deckY, 0, deckY + dH);
                dg.addColorStop(0, DECK_TOP);
                dg.addColorStop(1, DECK_BOT);
                ctx.fillStyle   = dg;
                ctx.strokeStyle = `${GOLD_GLOW}0.28)`;
                ctx.lineWidth   = 1;
                ctx.fillRect(centerX - halfSpan, deckY, halfSpan * 2, dH);
                ctx.strokeRect(centerX - halfSpan, deckY, halfSpan * 2, dH);

                // Top edge highlight
                ctx.beginPath();
                ctx.moveTo(centerX - halfSpan, deckY);
                ctx.lineTo(centerX + halfSpan, deckY);
                ctx.strokeStyle = `${GOLD_GLOW}0.18)`;
                ctx.lineWidth   = 0.5;
                ctx.stroke();

                // Center road line
                if (deckP > 0.55) {
                    const la = (deckP - 0.55) / 0.45;
                    ctx.globalAlpha = la * 0.30;
                    ctx.strokeStyle = GOLD;
                    ctx.lineWidth   = 0.5;
                    ctx.setLineDash([10, 8]);
                    ctx.beginPath();
                    ctx.moveTo(centerX - halfSpan + 10, deckY + dH * 0.5);
                    ctx.lineTo(centerX + halfSpan - 10, deckY + dH * 0.5);
                    ctx.stroke();
                    ctx.setLineDash([]);
                    ctx.globalAlpha = 1;
                }
            }

            // ── Final ambiance glow ──────────────────────────────────
            if (finalP > 0) {
                const fg = ctx.createRadialGradient(centerX, deckY, 0, centerX, deckY, tRightX - centerX + 60);
                fg.addColorStop(0,   `${GOLD_GLOW}${0.04 * finalP})`);
                fg.addColorStop(0.5, `${GOLD_GLOW}${0.02 * finalP})`);
                fg.addColorStop(1,   "transparent");
                ctx.fillStyle = fg;
                ctx.fillRect(bLeft, tTopY - 30, span, waterY - tTopY + 60);
            }

            // ── Data particles ───────────────────────────────────────
            if (DONE) {
                for (const p of particles) {
                    p.t += p.speed * p.dir;
                    if (p.t > 1) p.t = 0;
                    if (p.t < 0) p.t = 1;

                    const pos = pPos(p.t);
                    const gr  = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, p.size * 3);
                    gr.addColorStop(0,   `rgba(255,225,120,${p.alpha})`);
                    gr.addColorStop(0.4, `${GOLD_GLOW}${p.alpha * 0.55})`);
                    gr.addColorStop(1,   "transparent");
                    ctx.fillStyle = gr;
                    ctx.beginPath();
                    ctx.arc(pos.x, pos.y, p.size * 3, 0, Math.PI * 2);
                    ctx.fill();
                }
            }

            // ── Sparks ───────────────────────────────────────────────
            for (let i = sparks.length - 1; i >= 0; i--) {
                const s = sparks[i];
                s.x  += s.vx;
                s.y  += s.vy;
                s.vy += 0.09;
                s.life -= 0.032;
                if (s.life <= 0) { sparks.splice(i, 1); continue; }

                ctx.globalAlpha = s.life * 0.85;
                // Trail
                ctx.beginPath();
                ctx.moveTo(s.x, s.y);
                ctx.lineTo(s.x - s.vx * 2, s.y - s.vy * 2);
                ctx.strokeStyle = "rgba(255,210,80,0.7)";
                ctx.lineWidth   = 1;
                ctx.stroke();
                // Head
                ctx.fillStyle = "rgba(255,240,160,0.95)";
                ctx.beginPath();
                ctx.arc(s.x, s.y, 1.5, 0, Math.PI * 2);
                ctx.fill();
                ctx.globalAlpha = 1;
            }

            rafId = requestAnimationFrame(render);
        };

        rafId = requestAnimationFrame(render);

        return () => {
            cancelAnimationFrame(rafId);
            window.removeEventListener("resize", resize);
        };
    }, [theme]);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            style={{ pointerEvents: "none" }}
        />
    );
}
