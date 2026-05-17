import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";

/**
 * Geomag-style REAL 3D floating structures using Three.js.
 * Bars = thin cylinders, Nodes = glowing spheres.
 * True 3D rotation via useFrame.
 */

// ── Types ──

type GeomagType = "tetrahedron" | "cube" | "octahedron" | "diamond3d";

interface GeomagConfig {
    type: GeomagType;
    /** Position as fraction of viewport (0-1) */
    px: number;
    py: number;
    /** Scale multiplier */
    scale: number;
    color: string;
    glowIntensity: number;
    /** Rotation speed per axis (radians/sec) */
    rotSpeed: [number, number, number];
    /** Float amplitude and frequency */
    floatAmp: [number, number];
    floatFreq: [number, number];
    delay: number;
}

interface FloatingShapesProps {
    shapes: GeomagConfig[];
    isDark: boolean;
    /** Scale multiplier for mobile (default 0.5) */
    mobileScale?: number;
}

// ── 3D geometry definitions ──

interface Geo3D {
    vertices: [number, number, number][];
    edges: [number, number][];
}

function getGeo3D(type: GeomagType): Geo3D {
    switch (type) {
        case "tetrahedron":
            return {
                vertices: [
                    [0, 1, 0],
                    [-0.94, -0.33, 0.55],
                    [0.94, -0.33, 0.55],
                    [0, -0.33, -0.88],
                ],
                edges: [[0, 1], [0, 2], [0, 3], [1, 2], [1, 3], [2, 3]],
            };
        case "cube":
            return {
                vertices: [
                    [-0.6, -0.6, -0.6], [0.6, -0.6, -0.6], [0.6, 0.6, -0.6], [-0.6, 0.6, -0.6],
                    [-0.6, -0.6, 0.6], [0.6, -0.6, 0.6], [0.6, 0.6, 0.6], [-0.6, 0.6, 0.6],
                ],
                edges: [
                    [0, 1], [1, 2], [2, 3], [3, 0],
                    [4, 5], [5, 6], [6, 7], [7, 4],
                    [0, 4], [1, 5], [2, 6], [3, 7],
                ],
            };
        case "octahedron":
            return {
                vertices: [
                    [0, 1.1, 0], [1, 0, 0], [0, 0, 1], [-1, 0, 0], [0, 0, -1], [0, -1.1, 0],
                ],
                edges: [
                    [0, 1], [0, 2], [0, 3], [0, 4],
                    [5, 1], [5, 2], [5, 3], [5, 4],
                    [1, 2], [2, 3], [3, 4], [4, 1],
                ],
            };
        case "diamond3d":
            return {
                vertices: [
                    [0, 1.3, 0],
                    [-0.7, 0.3, 0.7], [0.7, 0.3, 0.7], [0.7, 0.3, -0.7], [-0.7, 0.3, -0.7],
                    [-0.7, -0.3, 0.7], [0.7, -0.3, 0.7], [0.7, -0.3, -0.7], [-0.7, -0.3, -0.7],
                    [0, -1.3, 0],
                ],
                edges: [
                    [0, 1], [0, 2], [0, 3], [0, 4],
                    [1, 2], [2, 3], [3, 4], [4, 1],
                    [1, 5], [2, 6], [3, 7], [4, 8],
                    [5, 6], [6, 7], [7, 8], [8, 5],
                    [9, 5], [9, 6], [9, 7], [9, 8],
                ],
            };
    }
}

// ── Bar (cylinder between two points) ──

function Bar({ from, to, color, opacity, radius }: {
    from: [number, number, number];
    to: [number, number, number];
    color: string;
    opacity: number;
    radius: number;
}) {
    const { position, quaternion, length } = useMemo(() => {
        const a = new THREE.Vector3(...from);
        const b = new THREE.Vector3(...to);
        const mid = a.clone().add(b).multiplyScalar(0.5);
        const dir = b.clone().sub(a);
        const len = dir.length();
        dir.normalize();
        const quat = new THREE.Quaternion();
        quat.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
        return { position: [mid.x, mid.y, mid.z] as [number, number, number], quaternion: quat, length: len };
    }, [from, to]);

    return (
        <mesh position={position} quaternion={quaternion}>
            <cylinderGeometry args={[radius, radius, length, 6]} />
            <meshBasicMaterial color={color} transparent opacity={opacity} depthWrite={false} />
        </mesh>
    );
}

// ── Node (sphere with glow halo) ──

function Node({ position, color, opacity, radius, glowRadius }: {
    position: [number, number, number];
    color: string;
    opacity: number;
    radius: number;
    glowRadius: number;
}) {
    return (
        <group position={position}>
            {/* Glow halo */}
            <mesh>
                <sphereGeometry args={[glowRadius, 12, 12]} />
                <meshBasicMaterial color={color} transparent opacity={opacity * 0.1} depthWrite={false} />
            </mesh>
            {/* Core sphere */}
            <mesh>
                <sphereGeometry args={[radius, 12, 12]} />
                <meshBasicMaterial color={color} transparent opacity={opacity * 0.7} depthWrite={false} />
            </mesh>
        </group>
    );
}

// ── Single geomag shape ──

function GeomagMesh({ config, isDark, mobileScale }: { config: GeomagConfig; isDark: boolean; mobileScale: number }) {
    const groupRef = useRef<THREE.Group>(null);
    const { viewport } = useThree();
    const geo = useMemo(() => getGeo3D(config.type), [config.type]);
    const timeOffset = useMemo(() => config.delay * 3, [config.delay]);
    const effectiveScale = config.scale * mobileScale;

    // Map 0-1 position to world coordinates (orthographic, centered origin)
    const baseX = (config.px - 0.5) * viewport.width;
    const baseY = (0.5 - config.py) * viewport.height;
    const fAmpX = config.floatAmp[0] * viewport.width * 0.1;
    const fAmpY = config.floatAmp[1] * viewport.height * 0.1;

    const barOpacity = isDark ? 0.45 : 0.3;
    const nodeOpacity = isDark ? 0.5 : 0.35;
    const barRadius = 0.012 * effectiveScale;
    const nodeRadius = 0.035 * effectiveScale;
    const glowNodeRadius = 0.07 * effectiveScale;

    useFrame((state) => {
        if (!groupRef.current) return;
        const t = state.clock.elapsedTime + timeOffset;

        // Continuous rotation
        groupRef.current.rotation.x += config.rotSpeed[0] * 0.016;
        groupRef.current.rotation.y += config.rotSpeed[1] * 0.016;
        groupRef.current.rotation.z += config.rotSpeed[2] * 0.016;

        // Floating
        groupRef.current.position.x = baseX + Math.sin(t * config.floatFreq[0]) * fAmpX;
        groupRef.current.position.y = baseY + Math.sin(t * config.floatFreq[1] + 1.3) * fAmpY;
    });

    return (
        <group ref={groupRef} scale={effectiveScale}>
            {geo.edges.map(([i, j], idx) => (
                <Bar
                    key={`b${idx}`}
                    from={geo.vertices[i]}
                    to={geo.vertices[j]}
                    color={config.color}
                    opacity={barOpacity}
                    radius={barRadius}
                />
            ))}
            {geo.vertices.map((v, idx) => (
                <Node
                    key={`n${idx}`}
                    position={v}
                    color={config.color}
                    opacity={nodeOpacity}
                    radius={nodeRadius}
                    glowRadius={glowNodeRadius}
                />
            ))}
        </group>
    );
}

// ── Scene wrapper ──

function Scene({ shapes, isDark, mobileScale }: FloatingShapesProps) {
    return (
        <>
            {shapes.map((s, i) => (
                <GeomagMesh key={i} config={s} isDark={isDark} mobileScale={mobileScale ?? 1} />
            ))}
        </>
    );
}

// ── Main export ──

export function FloatingShapes({ shapes, isDark, mobileScale }: FloatingShapesProps) {
    return (
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
            <Canvas
                orthographic
                camera={{ zoom: 50, near: 0.1, far: 100, position: [0, 0, 10] }}
                gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
                dpr={[1, 1.5]}
                style={{ background: "transparent" }}
            >
                <Scene shapes={shapes} isDark={isDark} mobileScale={mobileScale ?? 1} />
            </Canvas>
        </div>
    );
}

// ── Preset configs (1-2 per section, large, inset from edges, wide float) ──

export const shapesRed: GeomagConfig[] = [
    { type: "tetrahedron", px: 0.18, py: 0.45, scale: 2.0, color: "#EF4444", glowIntensity: 0.4, rotSpeed: [0.12, 0.18, 0.06], floatAmp: [1.0, 0.9], floatFreq: [0.12, 0.16], delay: 0 },
    { type: "diamond3d",   px: 0.80, py: 0.70, scale: 1.8, color: "#F59E0B", glowIntensity: 0.35, rotSpeed: [0.15, 0.1, 0.12], floatAmp: [0.9, 1.0], floatFreq: [0.16, 0.12], delay: 2 },
];

export const shapesRedMobile: GeomagConfig[] = [
    { type: "tetrahedron", px: 0.18, py: 0.30, scale: 2.0, color: "#EF4444", glowIntensity: 0.4, rotSpeed: [0.12, 0.18, 0.06], floatAmp: [1.0, 0.9], floatFreq: [0.12, 0.16], delay: 0 },
];

export const shapesCyan: GeomagConfig[] = [
    { type: "cube",        px: 0.18, py: 0.20, scale: 2.0, color: "#06B6D4", glowIntensity: 0.4, rotSpeed: [0.14, 0.18, 0.08], floatAmp: [1.0, 0.9], floatFreq: [0.14, 0.18], delay: 0 },
    { type: "octahedron",  px: 0.82, py: 0.72, scale: 1.7, color: "#8B5CF6", glowIntensity: 0.35, rotSpeed: [0.12, 0.15, 0.1], floatAmp: [0.9, 1.0], floatFreq: [0.16, 0.13], delay: 1.5 },
];

export const shapesCyanViolet: GeomagConfig[] = [];

export const shapesSky: GeomagConfig[] = [];

export const shapesEmerald: GeomagConfig[] = [
    { type: "tetrahedron", px: 0.82, py: 0.28, scale: 2.0, color: "#34D399", glowIntensity: 0.4, rotSpeed: [0.14, 0.16, 0.08], floatAmp: [0.95, 0.9], floatFreq: [0.14, 0.18], delay: 0 },
    { type: "diamond3d",   px: 0.20, py: 0.68, scale: 1.6, color: "#6366F1", glowIntensity: 0.35, rotSpeed: [0.12, 0.2, 0.1], floatAmp: [0.9, 0.95], floatFreq: [0.17, 0.13], delay: 1.5 },
];

export const shapesNone: GeomagConfig[] = [];

// Light mode — boost opacity for visibility on bright bg
export function lightShapes(shapes: GeomagConfig[]): GeomagConfig[] {
    return shapes.map(s => ({
        ...s,
        glowIntensity: Math.min(s.glowIntensity * 1.8, 0.65),
        scale: s.scale * 1.1,
    }));
}
