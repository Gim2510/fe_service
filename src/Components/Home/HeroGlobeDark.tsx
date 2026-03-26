import Globe from "react-globe.gl";
import { useEffect, useRef, useMemo } from "react";
import { useTheme } from "../../Context/ThemeContext.tsx";

interface Arc {
    startLat: number;
    startLng: number;
    endLat: number;
    endLng: number;
    color: string;
    dashTime: number;
}

interface Point {
    name: string;
    lat: number;
    lng: number;
}

export const HeroGlobeDark = () => {
    const globeRef = useRef<any | null>(null);
    const { theme } = useTheme();
    const isDark = theme === "dark";

    // ✅ MEMOIZED POINTS (created once)
    const points = useMemo<Point[]>(() => [
        { name: "Milano", lat: 45.46, lng: 9.19 },
        { name: "London", lat: 51.5, lng: -0.12 },
        { name: "Berlin", lat: 52.52, lng: 13.4 },
        { name: "Paris", lat: 48.85, lng: 2.35 },
        { name: "Madrid", lat: 40.42, lng: -3.7 },
        { name: "Rome", lat: 41.9, lng: 12.49 },
        { name: "New York", lat: 40.71, lng: -74.0 },
        { name: "Tokyo", lat: 35.68, lng: 139.76 },
        { name: "Dubai", lat: 25.2, lng: 55.27 },
        { name: "Sydney", lat: -33.87, lng: 151.21 },
    ], []);

    // ✅ MEMOIZED ARCS (CRITICAL FIX)
    const arcs = useMemo<Arc[]>(() => {
        const arcPalette = ["#FF6B6B", "#4ECDC4", "#FFD93D", "#556270"];
        const arcs: Arc[] = [];

        // Milano hub connections
        arcs.push(
            ...points
                .filter(p => p.name !== "Milano")
                .map(p => ({
                    startLat: 45.46,
                    startLng: 9.19,
                    endLat: p.lat,
                    endLng: p.lng,
                    color: arcPalette[Math.floor(Math.random() * arcPalette.length)],
                    dashTime: 8000 + Math.random() * 4000
                }))
        );

        // Random interconnections
        const existingConnections = new Set<string>();
        const makeKey = (a: string, b: string) => [a, b].sort().join("-");

        points.forEach((from, i) => {
            if (i % 2 !== 0) return;

            const others = points.filter(p => p.name !== from.name);
            const shuffled = [...others].sort(() => 0.5 - Math.random());

            for (let to of shuffled) {
                const key = makeKey(from.name, to.name);
                if (!existingConnections.has(key)) {
                    existingConnections.add(key);
                    arcs.push({
                        startLat: from.lat,
                        startLng: from.lng,
                        endLat: to.lat,
                        endLng: to.lng,
                        color: arcPalette[Math.floor(Math.random() * arcPalette.length)],
                        dashTime: 10000 + Math.random() * 2000
                    });
                    break;
                }
            }
        });

        return arcs;
    }, [points]);

    // ✅ SAFE EFFECT (runs once)
    useEffect(() => {
        if (!globeRef.current) return;

        const controls = globeRef.current.controls();
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.4;

        const timeout = setTimeout(() => {
            globeRef.current.pointOfView({ lat: 33, lng: 9, altitude: 1 });
        }, 100);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <div className="absolute inset-0 w-full h-full pointer-events-none top-0 left-0 lg:left-120 z-50">
            <Globe
                ref={globeRef}
                backgroundColor="rgba(0,0,0,0)"
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
                showAtmosphere
                atmosphereColor={isDark ? "#999" : "#555"}
                atmosphereAltitude={0.15}

                pointsData={points}
                pointColor={() => (isDark ? "#ffffff" : "#222222")}
                pointRadius={0.16}
                pointAltitude={0.01}

                arcsData={arcs}
                arcColor={(obj: any) => (obj as Arc).color}
                arcStroke={0.1}
                arcDashLength={0.02}
                arcDashGap={0.002}
                arcDashAnimateTime={(obj: any) => (obj as Arc).dashTime}
            />
        </div>
    );
};