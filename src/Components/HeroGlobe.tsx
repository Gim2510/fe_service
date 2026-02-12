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
        // Europa
        { name: "Milano", lat: 45.46, lng: 9.19 },
        { name: "London", lat: 51.50, lng: -0.12 },
        { name: "Berlin", lat: 52.52, lng: 13.40 },
        { name: "Paris", lat: 48.85, lng: 2.35 },
        { name: "Madrid", lat: 40.42, lng: -3.70 },
        { name: "Rome", lat: 41.90, lng: 12.49 },
        { name: "Moscow", lat: 55.75, lng: 37.62 },
        { name: "Amsterdam", lat: 52.37, lng: 4.90 },
        { name: "Vienna", lat: 48.21, lng: 16.37 },
        { name: "Stockholm", lat: 59.33, lng: 18.07 },

        // Nord America
        { name: "New York", lat: 40.71, lng: -74.0 },
        { name: "Los Angeles", lat: 34.05, lng: -118.25 },
        { name: "Chicago", lat: 41.88, lng: -87.63 },
        { name: "Toronto", lat: 43.65, lng: -79.38 },
        { name: "Mexico City", lat: 19.43, lng: -99.13 },

        // Sud America
        { name: "Sao Paulo", lat: -23.55, lng: -46.63 },
        { name: "Buenos Aires", lat: -34.60, lng: -58.38 },
        { name: "Rio de Janeiro", lat: -22.91, lng: -43.17 },
        { name: "Lima", lat: -12.04, lng: -77.03 },
        { name: "Bogota", lat: 4.71, lng: -74.07 },

        // Africa
        { name: "Cape Town", lat: -33.92, lng: 18.42 },
        { name: "Johannesburg", lat: -26.20, lng: 28.04 },
        { name: "Cairo", lat: 30.04, lng: 31.23 },
        { name: "Nairobi", lat: -1.29, lng: 36.82 },
        { name: "Lagos", lat: 6.52, lng: 3.38 },

        // Asia
        { name: "Tokyo", lat: 35.68, lng: 139.76 },
        { name: "Beijing", lat: 39.90, lng: 116.40 },
        { name: "Shanghai", lat: 31.23, lng: 121.47 },
        { name: "Singapore", lat: 1.35, lng: 103.82 },
        { name: "Mumbai", lat: 19.07, lng: 72.87 },
        { name: "Delhi", lat: 28.61, lng: 77.21 },
        { name: "Bangkok", lat: 13.75, lng: 100.50 },
        { name: "Seoul", lat: 37.56, lng: 126.97 },
        { name: "Jakarta", lat: -6.21, lng: 106.85 },

        // Oceania
        { name: "Sydney", lat: -33.87, lng: 151.21 },
        { name: "Melbourne", lat: -37.81, lng: 144.96 },
        { name: "Auckland", lat: -36.85, lng: 174.76 },
        { name: "Brisbane", lat: -27.47, lng: 153.03 },

        // Medio Oriente
        { name: "Dubai", lat: 25.20, lng: 55.27 },
        { name: "Riyadh", lat: 24.71, lng: 46.67 },
        { name: "Tel Aviv", lat: 32.08, lng: 34.78 },
        { name: "Istanbul", lat: 41.01, lng: 28.97 },

        // Altre città globali
        { name: "Hong Kong", lat: 22.28, lng: 114.15 },
        { name: "Kuala Lumpur", lat: 3.14, lng: 101.69 },
        { name: "Vancouver", lat: 49.28, lng: -123.12 },
        { name: "San Francisco", lat: 37.77, lng: -122.42 },
        { name: "Barcelona", lat: 41.38, lng: 2.17 },
        { name: "Lisbon", lat: 38.72, lng: -9.14 },
        { name: "Warsaw", lat: 52.23, lng: 21.01 },
        { name: "Helsinki", lat: 60.17, lng: 24.94 },
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
        <div className="absolute inset-0 w-full h-full pointer-events-none top-0 left-0 lg:left-100">
            <Globe
                ref={globeRef}
                backgroundColor="rgba(0,0,0,0)"
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
                showAtmosphere
                atmosphereColor="#999"
                atmosphereAltitude={0.15}

                pointsData={points}
                pointColor={() => "#ffffff"}
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
}
