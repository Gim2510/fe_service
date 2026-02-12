import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const data = {
    labels: ["Prima", "1 mese", "3 mesi", "6 mesi"],
    datasets: [
        {
            label: "Efficienza (%)",
            data: [50, 70, 82, 90],
            borderColor: "#34d399",
            backgroundColor: "rgba(52,211,153,0.3)",
            fill: true,
            tension: 0.3,
            pointRadius: 6,
            pointHoverRadius: 9,
        },
        {
            label: "Controllo (%)",
            data: [45, 63, 75, 85],
            borderColor: "#60a5fa",
            backgroundColor: "rgba(96,165,250,0.3)",
            fill: true,
            tension: 0.3,
            pointRadius: 6,
            pointHoverRadius: 9,
        },
        {
            label: "Vendite (%)",
            data: [40, 58, 72, 88],
            borderColor: "#facc15",
            backgroundColor: "rgba(250,204,21,0.3)",
            fill: true,
            tension: 0.3,
            pointRadius: 6,
            pointHoverRadius: 9,
        },
    ],
};

const options = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
        legend: {
            labels: { color: "#ccc", font: { size: 14 } },
            position: "top" as const,
        },
        tooltip: {
            backgroundColor: "#111",
            titleColor: "#fff",
            bodyColor: "#fff",
            borderColor: "#444",
            borderWidth: 1,
            padding: 10,
        },
    },

    scales: {
        x: {
            ticks: { color: "#aaa", font: { size: 14 } },
            grid: { display: false },
        },
        y: {
            ticks: { color: "#aaa", font: { size: 14 } },
            grid: { color: "#333" },
        },
    },
};

export function ImprovementChart() {
    return (
        <section className="relative bg-gradient-to-b to-white from-neutral-950 text-white pt-32 pb-40 overflow-hidden">
            {/* Texture a punti coerente con altre sezioni */}
            <div
                className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)]
                           bg-[size:32px_32px] bg-[position:0_40px]"
            />

            {/* Layer grafico visivo dietro (nuvole gradient soft o forme vettoriali) */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute left-50 top-0 w-[600px] h-[600px] bg-gradient-to-tr from-[#111] via-[#222] to-transparent rounded-full opacity-30"></div>
                <div className="absolute right-50 bottom-10 w-[500px] h-[500px] bg-gradient-to-bl from-[#111] via-[#222] to-transparent rounded-full opacity-30"></div>
            </div>

            <div className="relative mx-auto max-w-7xl px-8">
                <div className="text-center mb-24">
                    <span className="text-sm uppercase tracking-widest text-neutral-400">
                        Potenziale di miglioramento
                    </span>
                    <h2 className="text-4xl font-semibold mt-2 leading-tight">
                        Il progresso tangibile di efficienza, controllo e vendite
                    </h2>
                    <p className="mt-4 text-neutral-400 text-lg">
                        Queste curve mostrano come un intervento strutturato trasforma realmente i processi aziendali.
                    </p>
                </div>

                {/* Chart container con bordo soft */}
                <div className="bg-black/80 backdrop-blur-lg border border-neutral-800 rounded-3xl p-8 shadow-xl h-[500px]">
                    <Line data={data} options={options} />
                </div>
            </div>
        </section>
    );
}

