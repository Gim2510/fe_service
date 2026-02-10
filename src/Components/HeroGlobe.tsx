import Globe from "react-globe.gl";
import { useEffect, useRef } from "react";

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

export function HeroGlobe() {
    const globeRef = useRef<any | null>(null);

    const points: Point[] = [
        { name: "Milano", lat: 45.46, lng: 9.19 },
        { name: "New York", lat: 40.71, lng: -74.0 },
        { name: "London", lat: 51.50, lng: -0.12 },
        { name: "Tokyo", lat: 35.68, lng: 139.76 },
        { name: "Sydney", lat: -33.87, lng: 151.21 },
        { name: "Sao Paulo", lat: -23.55, lng: -46.63 },
        { name: "Cape Town", lat: -33.92, lng: 18.42 },
        { name: "Berlin", lat: 52.52, lng: 13.40 },
        { name: "Moscow", lat: 55.75, lng: 37.62 },
        { name: "Beijing", lat: 39.90, lng: 116.40 },
        { name: "Los Angeles", lat: 34.05, lng: -118.25 },
        { name: "Singapore", lat: 1.35, lng: 103.82 },
    ];

    const arcPalette = ["#FF6B6B", "#4ECDC4", "#FFD93D", "#556270"];

    const arcs: Arc[] = [];

    // Milano hub
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

    // Inter-city: 1 arco casuale ogni 3 città
    const existingConnections = new Set<string>();
    const makeKey = (a: string, b: string) => [a, b].sort().join("-");

    points.forEach((from, i) => {
        if (i % 3 !== 0) return;

        const others = points.filter(p => p.name !== from.name);
        const shuffled = others.sort(() => 0.5 - Math.random());

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

    useEffect(() => {
        if (!globeRef.current) return;

        const controls = globeRef.current.controls();
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.4;

        setTimeout(() => {
            globeRef.current.pointOfView({ lat: 20, lng: 0, altitude: 1.5 });
        }, 100);
    }, []);

    return (
        <div className="absolute inset-0 w-full h-full pointer-events-none top-0 lg:top-20 left-0 lg:left-40">
            <Globe
                ref={globeRef}
                backgroundColor="rgba(0,0,0,0)"
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
                showAtmosphere
                atmosphereColor="#666"
                atmosphereAltitude={0.15}

                pointsData={points}
                pointColor={() => "#ffffff"}
                pointRadius={0.16}
                pointAltitude={0.01}

                arcsData={arcs}
                arcColor={(obj: any) => (obj as Arc).color}
                arcStroke={0.7}
                arcDashLength={0.2}
                arcDashGap={0.05}
                arcDashAnimateTime={(obj: any) => (obj as Arc).dashTime}
            />
        </div>
    );
}
