import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";
import { Suspense, useRef, useMemo, useEffect, useState } from "react";
import * as THREE from "three";
import { useTheme } from "../../Context/ThemeContext.tsx";

// ── City data ─────────────────────────────────────────────────────────────────

interface Point { name: string; lat: number; lng: number }
interface ArcData {
    startLat: number; startLng: number;
    endLat:   number; endLng:   number;
    altitude: number; speed: number;
    phase:    number;
}

const POINTS: Point[] = [
    { name: "Milano",        lat:  45.46, lng:   9.19 },
    { name: "London",        lat:  51.50, lng:  -0.12 },
    { name: "Berlin",        lat:  52.52, lng:  13.40 },
    { name: "Paris",         lat:  48.85, lng:   2.35 },
    { name: "Madrid",        lat:  40.42, lng:  -3.70 },
    { name: "Rome",          lat:  41.90, lng:  12.49 },
    { name: "Moscow",        lat:  55.75, lng:  37.62 },
    { name: "Amsterdam",     lat:  52.37, lng:   4.90 },
    { name: "Vienna",        lat:  48.21, lng:  16.37 },
    { name: "Stockholm",     lat:  59.33, lng:  18.07 },
    { name: "Warsaw",        lat:  52.23, lng:  21.01 },
    { name: "Barcelona",     lat:  41.38, lng:   2.17 },
    { name: "Istanbul",      lat:  41.01, lng:  28.97 },
    { name: "Zürich",        lat:  47.37, lng:   8.54 },
    { name: "New York",      lat:  40.71, lng: -74.00 },
    { name: "San Francisco", lat:  37.77, lng:-122.42 },
    { name: "Toronto",       lat:  43.65, lng: -79.38 },
    { name: "Tokyo",         lat:  35.68, lng: 139.76 },
    { name: "Singapore",     lat:   1.35, lng: 103.82 },
    { name: "Shanghai",      lat:  31.23, lng: 121.47 },
    { name: "Dubai",         lat:  25.20, lng:  55.27 },
    { name: "Mumbai",        lat:  19.07, lng:  72.87 },
    { name: "Seoul",         lat:  37.56, lng: 126.97 },
    { name: "Sydney",        lat: -33.87, lng: 151.21 },
    { name: "Cape Town",     lat: -33.92, lng:  18.42 },
    { name: "Cairo",         lat:  30.04, lng:  31.23 },
    { name: "São Paulo",     lat: -23.55, lng: -46.63 },
    { name: "Chicago",       lat:  41.88, lng: -87.63 },
];

function buildArcs(): ArcData[] {
    const hub  = POINTS[0]; // Milano
    const seen = new Set<string>();
    const key  = (a: string, b: string) => [a, b].sort().join("|");
    const arcs: ArcData[] = [];

    // Hub → tutti
    POINTS.slice(1).forEach(p => {
        seen.add(key(hub.name, p.name));
        arcs.push({
            startLat: hub.lat, startLng: hub.lng,
            endLat:   p.lat,   endLng:   p.lng,
            altitude: 0.18 + Math.random() * 0.28,
            speed:    0.06  + Math.random() * 0.08,
            phase:    Math.random() * Math.PI * 2,
        });
    });

    // Inter-city
    POINTS.forEach((from, i) => {
        if (i % 2 !== 0) return;
        const shuffled = [...POINTS].sort(() => 0.5 - Math.random());
        for (const to of shuffled) {
            if (to.name === from.name) continue;
            const k = key(from.name, to.name);
            if (!seen.has(k)) {
                seen.add(k);
                arcs.push({
                    startLat: from.lat, startLng: from.lng,
                    endLat:   to.lat,   endLng:   to.lng,
                    altitude: 0.12 + Math.random() * 0.22,
                    speed:    0.04 + Math.random() * 0.07,
                    phase:    Math.random() * Math.PI * 2,
                });
                break;
            }
        }
    });

    return arcs;
}

const ARCS = buildArcs();

// ── Utilities ─────────────────────────────────────────────────────────────────

function latLngToVec3(lat: number, lng: number, r = 1.0): THREE.Vector3 {
    const phi   = (90 - lat)  * (Math.PI / 180);
    const theta = (lng + 180) * (Math.PI / 180);
    return new THREE.Vector3(
        -r * Math.sin(phi) * Math.cos(theta),
         r * Math.cos(phi),
         r * Math.sin(phi) * Math.sin(theta),
    );
}

// ── GLSL Shaders ──────────────────────────────────────────────────────────────

const atmVert = /* glsl */`
varying vec3 vNormal;
void main() {
    vNormal     = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`;

const atmFrag = /* glsl */`
uniform vec3  uColor;
uniform float uCoeff;
uniform float uPower;
varying vec3  vNormal;
void main() {
    float i = pow(uCoeff - dot(vNormal, vec3(0.0, 0.0, 1.0)), uPower);
    gl_FragColor = vec4(uColor, i);
}`;

const arcVert = /* glsl */`
varying vec2 vUv;
void main() {
    vUv         = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`;

const arcFrag = /* glsl */`
uniform float uTime;
uniform float uSpeed;
uniform float uPhase;
uniform vec3  uColor;
varying vec2  vUv;

void main() {
    float progress = mod(uTime * uSpeed + uPhase, 1.0);
    float behind   = mod(progress - vUv.x + 1.0, 1.0);
    float tailLen  = 0.16;
    float headR    = 0.022;
    float dist     = abs(vUv.x - progress);
    dist           = min(dist, 1.0 - dist);

    float alpha = 0.0;
    if (behind < tailLen) {
        float t = 1.0 - (behind / tailLen);
        alpha   = t * t * 0.8;
    }
    if (dist < headR) {
        alpha = max(alpha, 1.0 - (dist / headR) * 0.25);
    }
    if (alpha < 0.01) discard;
    gl_FragColor = vec4(uColor, alpha);
}`;

// ── GlobeEarth ────────────────────────────────────────────────────────────────

function GlobeEarth({ isDark, onLoaded }: { isDark: boolean; onLoaded?: () => void }) {
    const [dayTex, nightTex, bumpTex, waterTex] = useTexture([
        "//unpkg.com/three-globe/example/img/earth-blue-marble.jpg",
        "//unpkg.com/three-globe/example/img/earth-night.jpg",
        "//unpkg.com/three-globe/example/img/earth-topology.png",
        "//unpkg.com/three-globe/example/img/earth-water.png",
    ]);

    useEffect(() => { onLoaded?.(); }, []);

    return (
        <mesh>
            <sphereGeometry args={[1, 72, 72]} />
            <meshPhongMaterial
                map={isDark ? nightTex : dayTex}
                bumpMap={bumpTex}
                bumpScale={isDark ? 0.04 : 0.06}
                specularMap={waterTex}
                specular={new THREE.Color(isDark ? "#112233" : "#336699")}
                shininess={isDark ? 6 : 18}
            />
        </mesh>
    );
}

// ── GlobeAtmosphere ───────────────────────────────────────────────────────────

function GlobeAtmosphere({ isDark }: { isDark: boolean }) {
    const uniforms = useMemo(() => ({
        uColor: { value: new THREE.Color(isDark ? "#2255CC" : "#3377CC") },
        uCoeff: { value: 0.55 },
        uPower: { value: 5.0 },
    }), [isDark]);

    return (
        <mesh scale={[1.14, 1.14, 1.14]}>
            <sphereGeometry args={[1, 40, 40]} />
            <shaderMaterial
                vertexShader={atmVert}
                fragmentShader={atmFrag}
                uniforms={uniforms}
                side={THREE.BackSide}
                transparent
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </mesh>
    );
}

// ── GlobeArcs ─────────────────────────────────────────────────────────────────

function GlobeArcs() {
    const matsRef = useRef<(THREE.ShaderMaterial | null)[]>([]);

    // Stable geometries — never recreated
    const geometries = useMemo(() =>
        ARCS.map(arc => {
            const startV = latLngToVec3(arc.startLat, arc.startLng, 1).normalize();
            const endV   = latLngToVec3(arc.endLat,   arc.endLng,   1).normalize();
            const N      = 64;
            const pts: THREE.Vector3[] = [];
            for (let j = 0; j <= N; j++) {
                const t  = j / N;
                const pt = new THREE.Vector3().lerpVectors(startV, endV, t).normalize();
                pts.push(pt.clone().multiplyScalar(1.0 + arc.altitude * Math.sin(t * Math.PI)));
            }
            return new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 64, 0.0025, 4, false);
        }),
    []);

    // Stable uniforms — same objects mutated by useFrame
    const uniformsArr = useRef(
        ARCS.map(arc => ({
            uTime:  { value: 0 },
            uSpeed: { value: arc.speed },
            uPhase: { value: arc.phase },
            uColor: { value: new THREE.Color("#C9A84C") },
        }))
    );

    useFrame(({ clock }) => {
        const t = clock.getElapsedTime();
        matsRef.current.forEach(m => {
            if (m) m.uniforms.uTime.value = t;
        });
    });

    return (
        <>
            {ARCS.map((_arc, i) => (
                <mesh key={i} geometry={geometries[i]}>
                    <shaderMaterial
                        ref={el => { matsRef.current[i] = el; }}
                        vertexShader={arcVert}
                        fragmentShader={arcFrag}
                        uniforms={uniformsArr.current[i]}
                        transparent
                        depthWrite={false}
                        blending={THREE.AdditiveBlending}
                    />
                </mesh>
            ))}
        </>
    );
}

// ── GlobeCityPoints ───────────────────────────────────────────────────────────

function GlobeCityPoints({ isDark }: { isDark: boolean }) {
    const meshRef = useRef<THREE.InstancedMesh>(null);

    useEffect(() => {
        const m = meshRef.current;
        if (!m) return;
        const dummy = new THREE.Object3D();
        POINTS.forEach((p, i) => {
            const pos = latLngToVec3(p.lat, p.lng, 1.015);
            dummy.position.copy(pos);
            dummy.lookAt(0, 0, 0);
            dummy.updateMatrix();
            m.setMatrixAt(i, dummy.matrix);
        });
        m.instanceMatrix.needsUpdate = true;
    }, []);

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, POINTS.length]}>
            <sphereGeometry args={[0.009, 8, 8]} />
            <meshBasicMaterial
                color={isDark ? "#E8C86A" : "#A07830"}
                transparent
                opacity={0.9}
            />
        </instancedMesh>
    );
}

// ── GlobeScene ────────────────────────────────────────────────────────────────

// Europa (lng=10) su sfera THREE → +X direction (U=0.5 in SphereGeometry)
// Per portare +X → +Z camera: rotazione Y = -100° = -1.745 rad
const EUROPE_ROTATION_Y = -1.745;

function GlobeScene({ isDark, onLoaded }: { isDark: boolean; onLoaded: () => void }) {
    return (
        <>
            {/* Sun — luce solare da destra-alto (Europa in luce) */}
            <directionalLight
                position={[4, 3, 3]}
                intensity={isDark ? 0.7 : 1.4}
                color={isDark ? "#AABCFF" : "#FFFFFF"}
            />
            <ambientLight intensity={isDark ? 0.08 : 0.35} />

            {/* Globo ruotato per mostrare Europa al centro */}
            <Suspense fallback={null}>
                <group rotation={[0, EUROPE_ROTATION_Y, 0]}>
                    <GlobeEarth isDark={isDark} onLoaded={onLoaded} />
                    <GlobeAtmosphere isDark={isDark} />
                    <GlobeArcs />
                    <GlobeCityPoints isDark={isDark} />
                </group>
            </Suspense>

            {/* Camera controls — orbita attorno all'origine */}
            <OrbitControls
                autoRotate
                autoRotateSpeed={0.28}
                enableZoom={false}
                enablePan={false}
                minPolarAngle={Math.PI * 0.20}
                maxPolarAngle={Math.PI * 0.80}
                rotateSpeed={0.4}
            />
        </>
    );
}

// ── Export ────────────────────────────────────────────────────────────────────

export function HeroGlobeDark() {
    const { theme } = useTheme();
    const isDark    = theme === "dark";
    const [visible, setVisible] = useState(false);

    return (
        <div
            className="absolute inset-0 w-full h-full pointer-events-none top-0 left-0 lg:left-[30%] z-20"
            style={{
                opacity: visible ? 1 : 0,
                transition: "opacity 1.4s ease-in",
            }}
        >
            <Canvas
                camera={{ position: [0, 0.85, 2.7], fov: 42 }}
                gl={{ antialias: true, alpha: true }}
                style={{ background: "transparent" }}
            >
                <GlobeScene isDark={isDark} onLoaded={() => setVisible(true)} />
            </Canvas>
        </div>
    );
}
